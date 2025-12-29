import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RefreshCw, CheckCircle2, AlertCircle, Loader2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export type PhaseStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'skipped';

interface PhaseStatusBarProps {
  status: PhaseStatus;
  phaseName: string;
  phaseNumber: number;
  isCompleted?: boolean;
  progress?: number;
  estimatedTime?: string;
  errorMessage?: string;
  onRefresh?: () => void;
  onRetry?: () => void;
  isRefreshing?: boolean;
  className?: string;
}

export function PhaseStatusBar({
  status,
  phaseName,
  phaseNumber,
  isCompleted = false,
  progress = 0,
  estimatedTime,
  errorMessage,
  onRefresh,
  onRetry,
  isRefreshing = false,
  className,
}: PhaseStatusBarProps) {
  const getStatusBadge = () => {
    if (isCompleted) {
      return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">✓ Complete</Badge>;
    }
    
    switch (status) {
      case 'processing':
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">Processing</Badge>;
      case 'completed':
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Complete</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'skipped':
        return <Badge variant="outline">Skipped</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  const getStatusIcon = () => {
    if (isCompleted || status === 'completed') {
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    }
    if (status === 'processing') {
      return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
    }
    if (status === 'failed') {
      return <AlertCircle className="h-5 w-5 text-destructive" />;
    }
    return <Clock className="h-5 w-5 text-muted-foreground" />;
  };

  return (
    <div className={cn("rounded-lg border bg-card p-4 space-y-3", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <div>
            <h4 className="font-medium text-sm">Phase {phaseNumber}: {phaseName}</h4>
            {estimatedTime && status === 'processing' && (
              <p className="text-xs text-muted-foreground">{estimatedTime}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge()}
          {onRefresh && (
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8"
              onClick={onRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
            </Button>
          )}
        </div>
      </div>

      {/* Progress bar for processing state */}
      {status === 'processing' && (
        <Progress value={progress} className="h-2" />
      )}

      {/* Error message and retry */}
      {status === 'failed' && errorMessage && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3">
          <p className="text-xs text-destructive">{errorMessage}</p>
          {onRetry && (
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={onRetry}
            >
              <RefreshCw className="mr-2 h-3 w-3" />
              Retry
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
