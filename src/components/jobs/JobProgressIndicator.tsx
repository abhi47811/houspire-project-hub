import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Loader2, 
  CheckCircle, 
  XCircle, 
  Clock, 
  RefreshCw,
  AlertCircle 
} from 'lucide-react';
import { Job } from '@/hooks/useJobQueue';
import { formatDistanceToNow } from 'date-fns';

interface JobProgressIndicatorProps {
  job?: Job | null;
  onRetry?: () => void;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function JobProgressIndicator({ 
  job, 
  onRetry, 
  showDetails = true,
  size = 'md' 
}: JobProgressIndicatorProps) {
  if (!job) return null;

  const statusConfig: Record<string, {
    icon: typeof Clock;
    color: string;
    bgColor: string;
    label: string;
    animate?: boolean;
  }> = {
    pending: {
      icon: Clock,
      color: 'text-muted-foreground',
      bgColor: 'bg-muted',
      label: 'Queued',
    },
    processing: {
      icon: Loader2,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      label: 'Processing',
      animate: true,
    },
    completed: {
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      label: 'Completed',
    },
    failed: {
      icon: XCircle,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
      label: 'Failed',
    },
    cancelled: {
      icon: AlertCircle,
      color: 'text-muted-foreground',
      bgColor: 'bg-muted',
      label: 'Cancelled',
    },
  };

  const config = statusConfig[job.status];
  const Icon = config.icon;

  const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4';
  const textSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm';

  return (
    <div className={`flex items-center gap-2 ${textSize}`}>
      <Icon 
        className={`${iconSize} ${config.color} ${config.animate ? 'animate-spin' : ''}`} 
      />
      <span className={config.color}>{config.label}</span>
      
      {showDetails && (
        <>
          {job.retry_count > 0 && (
            <Badge variant="outline" className="text-xs">
              Retry {job.retry_count}/{job.max_retries}
            </Badge>
          )}
          
          {job.status === 'processing' && job.started_at && (
            <span className="text-xs text-muted-foreground">
              Started {formatDistanceToNow(new Date(job.started_at), { addSuffix: true })}
            </span>
          )}
          
          {job.status === 'failed' && onRetry && job.retry_count < job.max_retries && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onRetry}
              className="h-6 px-2"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Retry
            </Button>
          )}
        </>
      )}

      {job.status === 'failed' && job.error_message && showDetails && (
        <span className="text-xs text-destructive truncate max-w-[200px]" title={job.error_message}>
          {job.error_message}
        </span>
      )}
    </div>
  );
}

interface BulkJobProgressProps {
  summary: {
    total: number;
    pending: number;
    processing: number;
    completed: number;
    failed: number;
  };
  isProcessing: boolean;
  onStart?: () => void;
  onCancel?: () => void;
  label?: string;
  isStarting?: boolean;
}

export function BulkJobProgress({ 
  summary, 
  isProcessing, 
  onStart, 
  onCancel,
  label = 'Processing',
  isStarting = false,
}: BulkJobProgressProps) {
  const progress = summary.total > 0 
    ? Math.round((summary.completed / summary.total) * 100) 
    : 0;

  if (summary.total === 0 && !isStarting) {
    return onStart ? (
      <Button onClick={onStart} disabled={isStarting}>
        {isStarting ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : null}
        Start {label} for All Rooms
      </Button>
    ) : null;
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isProcessing && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
          <span className="text-sm font-medium">
            {label}: {summary.completed}/{summary.total}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {summary.failed > 0 && (
            <Badge variant="destructive">
              {summary.failed} failed
            </Badge>
          )}
          
          {isProcessing && onCancel && (
            <Button variant="outline" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </div>

      <Progress value={progress} className="h-2" />

      <div className="flex gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {summary.pending} pending
        </span>
        <span className="flex items-center gap-1">
          <Loader2 className="h-3 w-3" />
          {summary.processing} processing
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3 text-green-600" />
          {summary.completed} completed
        </span>
      </div>
    </div>
  );
}
