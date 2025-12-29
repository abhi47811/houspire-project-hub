import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDeadlineTracking } from '@/hooks/useDashboardData';
import { Link } from 'react-router-dom';

export function DeadlineTrackerCard() {
  const { data, isLoading } = useDeadlineTracking();

  if (isLoading) {
    return <DeadlineTrackerSkeleton />;
  }

  const { dueToday = 0, dueTomorrow = 0, atRisk = 0, overdue = 0 } = data || {};

  return (
    <Card className="card-interactive">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">Deadline Tracker</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {overdue > 0 && (
          <div className="mb-3 flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive animate-pulse">
            <AlertTriangle className="h-4 w-4" />
            <span className="font-medium">{overdue} projects are overdue!</span>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-3">
          <Link 
            to="/projects?filter=due_today"
            className="rounded-lg border p-3 transition-all duration-200 hover:bg-muted/50 hover:shadow-sm hover:-translate-y-0.5"
          >
            <div className={cn(
              'text-2xl font-bold flex items-center gap-2',
              dueToday > 0 ? 'text-destructive' : 'text-foreground'
            )}>
              {dueToday > 0 && <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" />}
              {dueToday}
            </div>
            <div className="text-xs text-muted-foreground">Due Today</div>
          </Link>
          
          <Link 
            to="/projects?filter=due_tomorrow"
            className="rounded-lg border p-3 transition-all duration-200 hover:bg-muted/50 hover:shadow-sm hover:-translate-y-0.5"
          >
            <div className={cn(
              'text-2xl font-bold flex items-center gap-2',
              dueTomorrow > 0 ? 'text-warning' : 'text-foreground'
            )}>
              {dueTomorrow > 0 && <span className="h-2 w-2 rounded-full bg-warning animate-pulse" />}
              {dueTomorrow}
            </div>
            <div className="text-xs text-muted-foreground">Due Tomorrow</div>
          </Link>
          
          <Link 
            to="/projects?filter=at_risk"
            className="rounded-lg border p-3 transition-all duration-200 hover:bg-muted/50 hover:shadow-sm hover:-translate-y-0.5"
          >
            <div className={cn(
              'text-2xl font-bold flex items-center gap-2',
              atRisk > 0 ? 'text-yellow-500' : 'text-foreground'
            )}>
              {atRisk > 0 && <span className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />}
              {atRisk}
            </div>
            <div className="text-xs text-muted-foreground">At Risk (48h)</div>
          </Link>
          
          <Link 
            to="/projects?filter=overdue"
            className="rounded-lg border p-3 transition-all duration-200 hover:bg-muted/50 hover:shadow-sm hover:-translate-y-0.5"
          >
            <div className={cn(
              'text-2xl font-bold flex items-center gap-2',
              overdue > 0 ? 'text-destructive' : 'text-foreground'
            )}>
              {overdue > 0 && <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" />}
              {overdue}
            </div>
            <div className="text-xs text-muted-foreground">Overdue</div>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

function DeadlineTrackerSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-5 w-32" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="rounded-lg border p-3">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="mt-1 h-3 w-16" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
