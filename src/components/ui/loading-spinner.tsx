import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
};

export function LoadingSpinner({
  size = 'md',
  className = '',
  text,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn('flex items-center justify-center gap-2', className)}
      role="status"
      aria-label={text || 'Loading'}
    >
      <Loader2
        className={cn('animate-spin text-primary', sizeClasses[size])}
        aria-hidden="true"
      />
      {text && <span className="text-sm text-muted-foreground">{text}</span>}
      <span className="sr-only">{text || 'Loading...'}</span>
    </div>
  );
}

export function PageLoader({ text }: { text?: string }) {
  return (
    <div className="flex h-64 items-center justify-center">
      <LoadingSpinner size="lg" text={text} />
    </div>
  );
}

export function InlineLoader({ text }: { text?: string }) {
  return (
    <div className="flex items-center gap-2 py-2">
      <LoadingSpinner size="sm" />
      {text && <span className="text-sm text-muted-foreground">{text}</span>}
    </div>
  );
}
