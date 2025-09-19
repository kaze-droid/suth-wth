import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const hrvData = [
  { time: "14:00", hrv: 45 },
  { time: "14:15", hrv: 52 },
  { time: "14:30", hrv: 48 },
  { time: "14:45", hrv: 55 },
  { time: "15:00", hrv: 50 },
  { time: "15:15", hrv: 58 },
  { time: "15:30", hrv: 53 },
  { time: "15:45", hrv: 60 }
];

const rhythmData = [
  { name: "Normal Sinus", value: 95, color: "hsl(var(--chart-secondary))" },
  { name: "Arrhythmia", value: 5, color: "hsl(var(--chart-tertiary))" }
];

export function SecondaryCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* HRV Chart */}
      <Card className="shadow-soft hover:shadow-medium transition-all duration-300 animate-slide-up border-border/50" style={{ animationDelay: "300ms" }}>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-foreground">
            Heart Rate Variability
          </CardTitle>
          <p className="text-sm text-muted-foreground">Last hour trend</p>
        </CardHeader>
        <CardContent>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hrvData}>
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                />
                <Bar 
                  dataKey="hrv" 
                  fill="hsl(var(--chart-primary))" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center">
            <div className="text-sm font-medium text-foreground">Average HRV</div>
            <div className="text-lg font-bold text-primary">52 ms</div>
          </div>
        </CardContent>
      </Card>

      {/* Rhythm Analysis */}
      <Card className="shadow-soft hover:shadow-medium transition-all duration-300 animate-slide-up border-border/50" style={{ animationDelay: "400ms" }}>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-foreground">
            Rhythm Analysis
          </CardTitle>
          <p className="text-sm text-muted-foreground">Last 24 hours</p>
        </CardHeader>
        <CardContent>
          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={rhythmData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {rhythmData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {rhythmData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-foreground">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}