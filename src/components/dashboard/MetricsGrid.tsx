import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Activity, AlertTriangle, Wifi } from "lucide-react";

const metrics = [
  {
    title: "Heart Rate",
    value: "82",
    unit: "BPM",
    icon: Heart,
    status: "success",
    change: "+2 from last reading"
  },
  {
    title: "Signal Quality",
    value: "98",
    unit: "%",
    icon: Activity,
    status: "success",
    change: "Excellent connection"
  },
  {
    title: "Alerts",
    value: "0",
    unit: "Active",
    icon: AlertTriangle,
    status: "success",
    change: "All systems normal"
  },
  {
    title: "Device Status",
    value: "Online",
    unit: "",
    icon: Wifi,
    status: "success",
    change: "Connected 2h 34m"
  }
];

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => {
        const IconComponent = metric.icon;
        return (
          <Card 
            key={metric.title} 
            className="shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in border-border/50"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${
                metric.status === 'success' ? 'bg-success/10' : 'bg-warning/10'
              }`}>
                <IconComponent className={`h-4 w-4 ${
                  metric.status === 'success' ? 'text-success' : 'text-warning'
                }`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline space-x-2">
                <div className="text-2xl font-bold text-foreground">
                  {metric.value}
                </div>
                {metric.unit && (
                  <div className="text-sm text-muted-foreground">
                    {metric.unit}
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {metric.change}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}