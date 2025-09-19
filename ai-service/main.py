from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import torch
from transformers import AutoModelForSequenceClassification
import numpy as np
import uvicorn
import os
from influxdb_client import InfluxDBClient
from influxdb_client.client.write_api import SYNCHRONOUS

# --- Environment Variables ---
INFLUX_URL = os.getenv("INFLUX_URL", "http://influxdb:8086")
INFLUX_TOKEN = os.getenv("INFLUX_TOKEN")
INFLUX_ORG = os.getenv("INFLUX_ORG", "clover-health")
INFLUX_BUCKET = os.getenv("INFLUX_BUCKET", "ecg-data")

# --- InfluxDB Client ---
influx_client = InfluxDBClient(url=INFLUX_URL, token=INFLUX_TOKEN, org=INFLUX_ORG)
query_api = influx_client.query_api()

# --- Model Loading ---
MODEL_NAME = "ayoub-abouzaid/mit-bih-ecg-classification"
model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
model.eval()
labels = ["Normal", "Atrial Premature Beat", "Premature Ventricular Contraction", "Fusion Beat", "Unknown Beat"]

# --- FastAPI Application ---
app = FastAPI()

# --- Pydantic Models ---
class ECGRequest(BaseModel):
    data: List[float]

class ECGDataPoint(BaseModel):
    time: int
    ecg: float

# --- API Endpoints ---

@app.get("/api/ecg/latest", response_model=List[ECGDataPoint])
def get_latest_ecg():
    flux_query = f'''
    from(bucket: "{INFLUX_BUCKET}")
      |> range(start: -5m) 
      |> filter(fn: (r) => r._measurement == "ecg_signal")
      |> filter(fn: (r) => r._field == "voltage")
      |> sort(columns: ["_time"], desc: true)
      |> limit(n: 187)
      |> sort(columns: ["_time"])
    '''
    try:
        tables = query_api.query(flux_query, org=INFLUX_ORG)
        data = []
        for table in tables:
            for record in table.records:
                data.append({
                    "time": int(record.get_time().timestamp() * 1000),
                    "ecg": record.get_value()
                })
        return data
    except Exception as e:
        print(f"Error querying InfluxDB: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch data from InfluxDB")

@app.post("/api/ecg/analyze")
def analyze_ecg(request: ECGRequest):
    ecg_data = request.data
    if not ecg_data:
        raise HTTPException(status_code=400, detail="ECG data is required.")

    # Pad or truncate to the model's required input size (187)
    input_data = ecg_data[:187]
    while len(input_data) < 187:
        input_data.append(0.0)

    # Preprocess, Infer, Post-process
    input_tensor = torch.tensor([input_data], dtype=torch.float32) # Note the extra brackets for batch dimension
    with torch.no_grad():
        logits = model(input_tensor).logits
    
    prediction_idx = torch.argmax(logits, dim=1).item()
    predicted_label = labels[prediction_idx]

    return {"analysis": predicted_label}
