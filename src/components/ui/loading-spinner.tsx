import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  text?: string;
  variant?: 'default' | 'primary' | 'muted';
}

const sizeClasses = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
};

const variantClasses = {
  default: 'text-primary',
  primary: 'text-primary',
  muted: 'text-muted-foreground',
};

export const LoadingSpinner = forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  function LoadingSpinner({ size = 'md', className = '', text, variant = 'default' }, ref) {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-center gap-2', className)}
        role="status"
        aria-label={text || 'Loading'}
      >
        <Loader2
          className={cn('animate-spin', sizeClasses[size], variantClasses[variant])}
          aria-hidden="true"
        />
        {text && <span className="text-sm text-muted-foreground">{text}</span>}
        <span className="sr-only">{text || 'Loading...'}</span>
      </div>
    );
  }
);

export const PageLoader = forwardRef<HTMLDivElement, { text?: string; className?: string }>(
  function PageLoader({ text, className }, ref) {
    return (
      <div 
        ref={ref} 
        className={cn(
          "flex min-h-[400px] flex-col items-center justify-center gap-4",
          className
        )}
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse" />
          <LoadingSpinner size="xl" variant="primary" />
        </div>
        {text && (
          <p className="text-sm font-medium text-muted-foreground animate-pulse">
            {text}
          </p>
        )}
      </div>
    );
  }
);

export const FullPageLoader = forwardRef<HTMLDivElement, { text?: string }>(
  function FullPageLoader({ text }, ref) {
    return (
      <div 
        ref={ref} 
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl scale-150 animate-pulse" />
            <LoadingSpinner size="xl" variant="primary" />
          </div>
          {text && (
            <p className="text-base font-medium text-foreground">
              {text}
            </p>
          )}
        </div>
      </div>
    );
  }
);

export const InlineLoader = forwardRef<HTMLDivElement, { text?: string }>(
  function InlineLoader({ text }, ref) {
    return (
      <div ref={ref} className="flex items-center gap-2 py-2">
        <LoadingSpinner size="sm" variant="muted" />
        {text && <span className="text-sm text-muted-foreground">{text}</span>}
      </div>
    );
  }
);

export const CardLoader = forwardRef<HTMLDivElement, { rows?: number }>(
  function CardLoader({ rows = 3 }, ref) {
    return (
      <div ref={ref} className="space-y-3 p-4" role="status" aria-label="Loading content">
        {Array.from({ length: rows }).map((_, i) => (
          <div 
            key={i} 
            className="h-4 rounded bg-muted animate-pulse"
            style={{ 
              width: `${Math.max(40, 100 - i * 20)}%`,
              animationDelay: `${i * 100}ms`
            }}
          />
        ))}
        <span className="sr-only">Loading content...</span>
      </div>
    );
  }
);
