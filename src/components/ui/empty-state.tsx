import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon, FolderOpen, Home, IndianRupee, Search, Bell, FileQuestion, Inbox, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'premium';
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeConfig = {
  sm: {
    container: 'py-8 px-4',
    icon: 'h-8 w-8',
    iconWrapper: 'p-4',
    title: 'text-base',
    description: 'text-sm max-w-xs',
    gap: 'mb-4',
  },
  md: {
    container: 'py-12 px-6',
    icon: 'h-10 w-10',
    iconWrapper: 'p-5',
    title: 'text-lg',
    description: 'text-sm max-w-sm',
    gap: 'mb-6',
  },
  lg: {
    container: 'py-16 px-8',
    icon: 'h-12 w-12',
    iconWrapper: 'p-6',
    title: 'text-xl',
    description: 'text-base max-w-md',
    gap: 'mb-8',
  },
};

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  className = '',
  size = 'lg',
}: EmptyStateProps) {
  const config = sizeConfig[size];
  
  return (
    <Card className={cn('border-dashed bg-gradient-to-b from-card to-muted/20', className)}>
      <CardContent className={cn('flex flex-col items-center justify-center text-center', config.container)}>
        {/* Premium icon wrapper with animated gradient background */}
        <div
          className={cn('relative', config.gap)}
          role="img"
          aria-label={title}
        >
          {/* Animated glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-primary/10 to-transparent blur-2xl scale-[2] animate-pulse" />
          
          {/* Icon container with gradient border */}
          <div className={cn(
            'relative rounded-2xl bg-gradient-to-br from-background via-card to-muted shadow-premium-md',
            'ring-1 ring-border/50',
            config.iconWrapper
          )}>
            <Icon className={cn('text-primary', config.icon)} aria-hidden="true" />
          </div>
        </div>
        
        <h3 className={cn('font-semibold text-foreground tracking-tight mb-2', config.title)}>
          {title}
        </h3>
        <p className={cn('text-muted-foreground leading-relaxed mb-6', config.description)}>
          {description}
        </p>
        
        {(action || secondaryAction) && (
          <div className="flex flex-wrap items-center justify-center gap-3">
            {action && (
              <Button 
                onClick={action.onClick} 
                aria-label={action.label}
                variant={action.variant === 'premium' ? 'premium' : 'default'}
                size={size === 'sm' ? 'sm' : 'default'}
                className="gap-2"
              >
                {action.variant === 'premium' && <Sparkles className="h-4 w-4" />}
                {action.label}
              </Button>
            )}
            {secondaryAction && (
              <Button 
                onClick={secondaryAction.onClick} 
                aria-label={secondaryAction.label}
                variant="outline"
                size={size === 'sm' ? 'sm' : 'default'}
              >
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Pre-built empty states for common scenarios
export function EmptyProjects({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <EmptyState
      icon={FolderOpen}
      title="No projects yet"
      description="Get started by creating your first interior design project. We'll guide you through the entire process."
      action={{
        label: 'Create Your First Project',
        onClick: onCreateClick,
        variant: 'premium',
      }}
    />
  );
}

export function EmptyRooms({ onAddClick }: { onAddClick: () => void }) {
  return (
    <EmptyState
      icon={Home}
      title="No rooms added"
      description="Add rooms to start the design process. Each room will go through our AI-powered workflow."
      action={{
        label: 'Add Room',
        onClick: onAddClick,
      }}
    />
  );
}

export function EmptyBudget({ onGenerateClick }: { onGenerateClick: () => void }) {
  return (
    <EmptyState
      icon={IndianRupee}
      title="No budget generated"
      description="Generate a detailed budget estimate based on your room designs and selected finishes."
      action={{
        label: 'Generate Budget',
        onClick: onGenerateClick,
        variant: 'premium',
      }}
    />
  );
}

export function EmptyNotifications() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="relative mb-4">
        <div className="absolute inset-0 rounded-full bg-success/20 blur-xl scale-[2] animate-pulse" />
        <div className="relative rounded-2xl bg-gradient-to-br from-success/20 to-success/5 p-4 ring-1 ring-success/20">
          <Bell className="h-6 w-6 text-success" aria-hidden="true" />
        </div>
      </div>
      <p className="text-base font-semibold text-foreground">All caught up!</p>
      <p className="text-sm text-muted-foreground mt-1">No new notifications</p>
    </div>
  );
}

export function EmptySearch({ query }: { query: string }) {
  return (
    <EmptyState
      icon={Search}
      title="No results found"
      description={`We couldn't find anything matching "${query}". Try adjusting your search terms or check for typos.`}
      size="md"
    />
  );
}

export function EmptyData({ title = "No data available", description }: { title?: string; description?: string }) {
  return (
    <EmptyState
      icon={Inbox}
      title={title}
      description={description || "There's nothing to display here yet."}
      size="sm"
    />
  );
}

export function EmptyError({ 
  title = "Something went wrong", 
  description,
  onRetry 
}: { 
  title?: string; 
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <EmptyState
      icon={FileQuestion}
      title={title}
      description={description || "We encountered an error loading this content. Please try again."}
      action={onRetry ? {
        label: 'Try Again',
        onClick: onRetry,
      } : undefined}
      size="md"
    />
  );
}