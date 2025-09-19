import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

// API fetching function
const fetchECGData = async () => {
    const res = await fetch("/api/ecg/latest");
    if (!res.ok) {
        throw new Error("Network response was not ok");
    }
    return res.json();
};

export function ECGChart() {
    // Use react-query to fetch data and refetch every 2 seconds
    const { data, isLoading, error } = useQuery({
        queryKey: ["ecgData"],
        queryFn: fetchECGData,
        refetchInterval: 2000, // Poll for new data every 2 seconds
    });

    // Display a skeleton loader while the initial data is being fetched
    if (isLoading) {
        return (
            <Card className="mb-8 shadow-medium border-border/50">
                <CardHeader>
                    <Skeleton className="h-6 w-1/2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-64 w-full" />
                </CardContent>
            </Card>
        );
    }

    // Display an error card if the data fetching fails
    if (error) {
        return (
            <Card className="mb-8 shadow-medium border-destructive/50 bg-destructive/10">
                <CardHeader>
                    <CardTitle className="text-destructive">Error Loading Chart</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-destructive-foreground">Could not fetch ECG data. Please ensure the backend server is running and accessible.</p>
                </CardContent>
            </Card>
        )
    }

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
                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
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
                                domain={[-1.5, 1.5]} // Adjust domain based on your Arduino's signal range
                            />
                            <Area
                                type="monotone"
                                dataKey="ecg"
                                stroke="hsl(var(--primary))"
                                strokeWidth={2}
                                fill="url(#ecgGradient)"
                                dot={false}
                                isAnimationActive={false} // Disable animation for smoother real-time updates
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
