import { useBatches, useCancelBatch } from '@/hooks/useBatches';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Upload, 
  Scan, 
  Eraser, 
  Sparkles, 
  Download, 
  Loader2, 
  X,
  Check,
  AlertCircle,
} from 'lucide-react';

interface BatchProgressIndicatorProps {
  projectId: string;
}

const batchTypeConfig: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  upload: { label: 'Uploading', icon: <Upload className="h-4 w-4" />, color: 'bg-blue-500' },
  analyze: { label: 'Analyzing', icon: <Scan className="h-4 w-4" />, color: 'bg-purple-500' },
  cleanup: { label: 'Cleaning', icon: <Eraser className="h-4 w-4" />, color: 'bg-orange-500' },
  generate: { label: 'Generating', icon: <Sparkles className="h-4 w-4" />, color: 'bg-green-500' },
  export: { label: 'Exporting', icon: <Download className="h-4 w-4" />, color: 'bg-cyan-500' },
};

export function BatchProgressIndicator({ projectId }: BatchProgressIndicatorProps) {
  const { activeBatch, recentBatches } = useBatches(projectId);
  const cancelBatch = useCancelBatch();

  if (!activeBatch && recentBatches.length === 0) {
    return null;
  }

  const progress = activeBatch 
    ? ((activeBatch.completed_items + activeBatch.failed_items) / activeBatch.total_items) * 100
    : 0;

  const config = activeBatch ? batchTypeConfig[activeBatch.batch_type] : null;

  return (
    <div className="space-y-2">
      {/* Active Batch */}
      {activeBatch && config && (
        <Card className="border-primary/20">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded ${config.color} text-white`}>
                    {config.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{config.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {activeBatch.completed_items} of {activeBatch.total_items} complete
                      {activeBatch.failed_items > 0 && (
                        <span className="text-destructive ml-1">
                          ({activeBatch.failed_items} failed)
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => cancelBatch.mutate(activeBatch.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Batches (completed) */}
      {!activeBatch && recentBatches.length > 0 && (
        <div className="space-y-1">
          {recentBatches.slice(0, 3).map(batch => {
            const batchConfig = batchTypeConfig[batch.batch_type];
            const isCompleted = batch.status === 'completed';
            const hasFailed = batch.failed_items > 0;
            
            return (
              <div
                key={batch.id}
                className="flex items-center justify-between py-2 px-3 bg-muted/50 rounded-lg text-sm"
              >
                <div className="flex items-center gap-2">
                  {batchConfig?.icon}
                  <span>{batchConfig?.label || batch.batch_type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">
                    {batch.completed_items}/{batch.total_items}
                  </span>
                  {isCompleted && !hasFailed && (
                    <Check className="h-4 w-4 text-success" />
                  )}
                  {isCompleted && hasFailed && (
                    <AlertCircle className="h-4 w-4 text-warning" />
                  )}
                  {batch.status === 'cancelled' && (
                    <Badge variant="outline" className="text-xs">Cancelled</Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
