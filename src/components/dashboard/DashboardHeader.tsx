import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between py-6 px-8 bg-card border-b border-border shadow-soft">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 9h-3l-1-3-2 6-2-3H7V9h3l1 3 2-6 2 3h3v2z"/>
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Clover ECG</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-sm font-medium text-foreground">Dr. Sarah Chen</p>
          <p className="text-xs text-muted-foreground">Cardiologist</p>
        </div>
        <Avatar className="h-10 w-10 ring-2 ring-primary/20">
          <AvatarImage src="/placeholder.svg" alt="Dr. Sarah Chen" />
          <AvatarFallback className="bg-primary text-primary-foreground font-semibold">SC</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}