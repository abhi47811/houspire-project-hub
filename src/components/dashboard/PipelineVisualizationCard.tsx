import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart3, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePipelineStatus } from '@/hooks/useDashboardData';

const phaseColors = [
  'bg-muted',
  'bg-blue-500/20 text-blue-700',
  'bg-purple-500/20 text-purple-700',
  'bg-indigo-500/20 text-indigo-700',
  'bg-amber-500/20 text-amber-700',
  'bg-orange-500/20 text-orange-700',
  'bg-cyan-500/20 text-cyan-700',
];

export function PipelineVisualizationCard() {
  const { data: phases, isLoading } = usePipelineStatus();

  if (isLoading) {
    return <PipelineVisualizationSkeleton />;
  }

  const pipelinePhases = phases || [];
  
  // Find bottleneck (phase with most projects stuck)
  const maxCount = Math.max(...pipelinePhases.map(p => p.count), 0);
  const bottleneckIndex = pipelinePhases.findIndex(p => p.count === maxCount && p.count > 0);

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">Pipeline Status</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center gap-1">
          {pipelinePhases.map((phase, index) => (
            <React.Fragment key={phase.name}>
              <div
                className={cn(
                  'flex flex-col items-center rounded-lg px-3 py-2 transition-all',
                  phaseColors[index],
                  phase.count > 0 && 'ring-2 ring-primary/20',
                  index === bottleneckIndex && phase.count > 0 && 'ring-warning bg-warning/10'
                )}
              >
                <span className={cn(
                  'text-lg font-bold',
                  phase.count > 0 ? 'text-foreground' : 'text-muted-foreground'
                )}>
                  {phase.count}
                </span>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {phase.name}
                </span>
                {phase.count > 0 && (
                  <div className="mt-1 h-1 w-full rounded-full bg-primary/30">
                    <div 
                      className="h-full rounded-full bg-primary animate-pulse" 
                      style={{ width: `${Math.min((phase.count / Math.max(maxCount, 1)) * 100, 100)}%` }}
                    />
                  </div>
                )}
              </div>
              {index < pipelinePhases.length - 1 && (
                <ArrowRight className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
        
        {bottleneckIndex >= 0 && pipelinePhases[bottleneckIndex]?.count > 0 && (
          <p className="mt-3 text-xs text-warning">
            Bottleneck: {pipelinePhases[bottleneckIndex].name} ({pipelinePhases[bottleneckIndex].count} projects)
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function PipelineVisualizationSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-5 w-28" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5, 6, 7].map(i => (
            <React.Fragment key={i}>
              <Skeleton className="h-16 w-14 rounded-lg" />
              {i < 7 && <Skeleton className="h-4 w-4" />}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
