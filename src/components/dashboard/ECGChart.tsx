import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from "recharts";

// Generate realistic ECG-like data
const generateECGData = () => {
  const data = [];
  for (let i = 0; i < 100; i++) {
    let value = 0;
    
    // Create ECG pattern (P-QRS-T wave simulation)
    const position = i % 20;
    if (position < 2) {
      // P wave
      value = Math.sin(position * Math.PI) * 0.3;
    } else if (position >= 7 && position <= 10) {
      // QRS complex
      if (position === 8) value = -0.4;
      else if (position === 9) value = 1.2;
      else if (position === 10) value = -0.6;
      else value = 0.1;
    } else if (position >= 12 && position <= 15) {
      // T wave
      value = Math.sin((position - 12) * Math.PI / 3) * 0.4;
    } else {
      // Baseline with small noise
      value = (Math.random() - 0.5) * 0.05;
    }
    
    data.push({
      time: i,
      ecg: value,
    });
  }
  return data;
};

export function ECGChart() {
  const data = generateECGData();

  return (
    <Card className="mb-8 shadow-medium animate-slide-up border-border/50" style={{ animationDelay: "200ms" }}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">
            Real-time ECG Monitor
          </CardTitle>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-xs text-muted-foreground">Live</span>
            </div>
            <div className="text-xs text-muted-foreground">
              25 mm/s, 10 mm/mV
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="ecgGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={false}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={false}
                domain={[-1, 1.5]}
              />
              <Area
                type="monotone"
                dataKey="ecg"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#ecgGradient)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm font-medium text-foreground">Amplitude</div>
            <div className="text-xs text-muted-foreground">1.2 mV</div>
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">Rhythm</div>
            <div className="text-xs text-muted-foreground">Regular</div>
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">Rate</div>
            <div className="text-xs text-muted-foreground">82 BPM</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}