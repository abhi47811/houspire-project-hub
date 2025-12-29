import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon, FolderOpen, Home, IndianRupee, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  className = '',
}: EmptyStateProps) {
  return (
    <Card className={cn('border-dashed', className)}>
      <CardContent className="flex flex-col items-center justify-center py-16 px-8 text-center">
        {/* Premium icon wrapper with gradient background */}
        <div
          className="relative mb-6"
          role="img"
          aria-label={title}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-xl scale-150" />
          <div className="relative rounded-full bg-gradient-to-br from-muted via-muted/80 to-muted/60 p-6 shadow-premium-sm">
            <Icon className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-foreground tracking-tight mb-2">
          {title}
        </h3>
        <p className="text-muted-foreground max-w-md leading-relaxed mb-8">
          {description}
        </p>
        
        <div className="flex items-center gap-3">
          {action && (
            <Button 
              onClick={action.onClick} 
              aria-label={action.label}
              size="lg"
              className="px-6"
            >
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button 
              onClick={secondaryAction.onClick} 
              aria-label={secondaryAction.label}
              variant="outline"
              size="lg"
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
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
      }}
    />
  );
}

export function EmptyNotifications() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="relative mb-4">
        <div className="absolute inset-0 rounded-full bg-success/20 blur-lg scale-150" />
        <div className="relative rounded-full bg-gradient-to-br from-success/20 to-success/5 p-4">
          <span className="text-2xl" role="img" aria-label="All caught up">
            ✓
          </span>
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
      description={`We couldn't find anything matching "${query}". Try adjusting your search terms.`}
    />
  );
}