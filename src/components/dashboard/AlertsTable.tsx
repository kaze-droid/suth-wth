import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Info, CheckCircle } from "lucide-react";

const alerts = [
  {
    timestamp: "2024-01-15 14:32:15",
    type: "Info",
    details: "Device connection established",
    severity: "low"
  },
  {
    timestamp: "2024-01-15 14:28:42",
    type: "Normal",
    details: "Heart rate returned to normal range",
    severity: "success"
  },
  {
    timestamp: "2024-01-15 14:25:18",
    type: "Warning",
    details: "Brief signal interference detected",
    severity: "medium"
  },
  {
    timestamp: "2024-01-15 14:20:03",
    type: "Info",
    details: "Automatic rhythm analysis completed",
    severity: "low"
  },
  {
    timestamp: "2024-01-15 14:15:36",
    type: "Normal",
    details: "ECG quality check passed",
    severity: "success"
  }
];

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case "success":
      return CheckCircle;
    case "medium":
      return AlertCircle;
    default:
      return Info;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "success":
      return "bg-success/10 text-success border-success/20";
    case "medium":
      return "bg-warning/10 text-warning border-warning/20";
    default:
      return "bg-primary/10 text-primary border-primary/20";
  }
};

export function AlertsTable() {
  return (
    <Card className="shadow-soft animate-slide-up border-border/50" style={{ animationDelay: "500ms" }}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Recent Events
        </CardTitle>
        <p className="text-sm text-muted-foreground">Latest system activities and alerts</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert, index) => {
            const IconComponent = getSeverityIcon(alert.severity);
            return (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30 border border-border/50">
                <div className={`p-2 rounded-lg ${getSeverityColor(alert.severity)}`}>
                  <IconComponent className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                      {alert.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {alert.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-foreground mt-1">
                    {alert.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}