import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Building2, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePreservationCompliance } from '@/hooks/useDashboardData';

export function PreservationComplianceCard() {
  const { data, isLoading } = usePreservationCompliance();

  if (isLoading) {
    return <PreservationComplianceSkeleton />;
  }

  const { validated = 0, total = 0, successRate = 100 } = data || {};

  const getStatusConfig = () => {
    if (successRate >= 100) {
      return {
        icon: CheckCircle,
        text: '✅ Perfect Compliance',
        color: 'text-success',
        bgColor: 'bg-success/10',
      };
    }
    if (successRate >= 90) {
      return {
        icon: AlertTriangle,
        text: '⚠️ Minor Issues',
        color: 'text-warning',
        bgColor: 'bg-warning/10',
      };
    }
    return {
      icon: XCircle,
      text: '🚨 Compliance Risk',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
    };
  };

  const status = getStatusConfig();
  const StatusIcon = status.icon;

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">Architectural Preservation</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{validated}/{total}</div>
              <div className="text-xs text-muted-foreground">Validated</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{Math.round(successRate)}%</div>
              <div className="text-xs text-muted-foreground">Success Rate</div>
            </div>
          </div>
          
          <div className={cn('flex items-center gap-2 rounded-lg px-3 py-2', status.bgColor)}>
            <StatusIcon className={cn('h-4 w-4', status.color)} />
            <span className={cn('text-sm font-medium', status.color)}>{status.text}</span>
          </div>
          
          <p className="text-xs text-muted-foreground">
            Required for real estate advertising compliance
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function PreservationComplianceSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-5 w-40" />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <div>
            <Skeleton className="h-8 w-12" />
            <Skeleton className="mt-1 h-3 w-16" />
          </div>
          <div className="text-right">
            <Skeleton className="h-8 w-12" />
            <Skeleton className="mt-1 h-3 w-20" />
          </div>
        </div>
        <Skeleton className="h-8 w-full rounded-lg" />
      </CardContent>
    </Card>
  );
}
