import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { X, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProgressProps {
  fileName: string;
  progress: number;
  status: 'uploading' | 'complete' | 'error';
  onCancel?: () => void;
  onRetry?: () => void;
  errorMessage?: string;
  className?: string;
}

export function FileUploadProgress({
  fileName,
  progress,
  status,
  onCancel,
  onRetry,
  errorMessage,
  className,
}: FileUploadProgressProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-lg border p-3',
        status === 'error' && 'border-destructive/50 bg-destructive/5',
        status === 'complete' && 'border-success/50 bg-success/5',
        className
      )}
      role="status"
      aria-label={`File upload: ${fileName}`}
    >
      <div className="flex-shrink-0">
        {status === 'uploading' && (
          <Upload className="h-5 w-5 text-muted-foreground animate-pulse" aria-hidden="true" />
        )}
        {status === 'complete' && (
          <CheckCircle className="h-5 w-5 text-success" aria-hidden="true" />
        )}
        {status === 'error' && (
          <AlertCircle className="h-5 w-5 text-destructive" aria-hidden="true" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{fileName}</p>
        {status === 'uploading' && (
          <div className="mt-1.5">
            <Progress value={progress} className="h-1.5" aria-label={`${progress}% complete`} />
            <span className="sr-only">{progress}% complete</span>
          </div>
        )}
        {status === 'error' && errorMessage && (
          <p className="text-xs text-destructive mt-1">{errorMessage}</p>
        )}
        {status === 'complete' && (
          <p className="text-xs text-success mt-1">Upload complete</p>
        )}
      </div>

      <div className="flex-shrink-0">
        {status === 'uploading' && onCancel && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={onCancel}
            aria-label="Cancel upload"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        {status === 'error' && onRetry && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRetry}
            className="text-xs"
            aria-label="Retry upload"
          >
            Retry
          </Button>
        )}
      </div>
    </div>
  );
}

interface MultiFileUploadProps {
  files: Array<{
    id: string;
    name: string;
    progress: number;
    status: 'uploading' | 'complete' | 'error';
    error?: string;
  }>;
  onCancel?: (id: string) => void;
  onRetry?: (id: string) => void;
  className?: string;
}

export function MultiFileUpload({
  files,
  onCancel,
  onRetry,
  className,
}: MultiFileUploadProps) {
  if (files.length === 0) return null;

  const totalProgress = files.reduce((acc, f) => acc + f.progress, 0) / files.length;
  const uploading = files.filter((f) => f.status === 'uploading').length;
  const complete = files.filter((f) => f.status === 'complete').length;
  const errors = files.filter((f) => f.status === 'error').length;

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {uploading > 0 && `Uploading ${uploading} file(s)...`}
          {uploading === 0 && complete > 0 && `${complete} file(s) uploaded`}
          {errors > 0 && ` • ${errors} failed`}
        </span>
        {uploading > 0 && (
          <span className="font-medium">{Math.round(totalProgress)}%</span>
        )}
      </div>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {files.map((file) => (
          <FileUploadProgress
            key={file.id}
            fileName={file.name}
            progress={file.progress}
            status={file.status}
            errorMessage={file.error}
            onCancel={onCancel ? () => onCancel(file.id) : undefined}
            onRetry={onRetry ? () => onRetry(file.id) : undefined}
          />
        ))}
      </div>
    </div>
  );
}
