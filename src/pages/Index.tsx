import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { ECGChart } from "@/components/dashboard/ECGChart";
import { SecondaryCharts } from "@/components/dashboard/SecondaryCharts";
import { AlertsTable } from "@/components/dashboard/AlertsTable";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="px-8 py-6 max-w-7xl mx-auto">
        <MetricsGrid />
        <ECGChart />
        <SecondaryCharts />
        <AlertsTable />
      </main>
    </div>
  );
};

export default Index;
