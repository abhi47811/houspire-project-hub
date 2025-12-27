import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
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
  className = '',
}: EmptyStateProps) {
  return (
    <Card className={className}>
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div
          className="rounded-full bg-muted p-4 mb-4"
          role="img"
          aria-label={title}
        >
          <Icon className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground max-w-sm mb-6">{description}</p>
        {action && (
          <Button onClick={action.onClick} aria-label={action.label}>
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// Pre-built empty states for common scenarios
export function EmptyProjects({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <EmptyState
      icon={require('lucide-react').FolderOpen}
      title="No projects yet"
      description="Get started by creating your first interior design project."
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
      icon={require('lucide-react').Home}
      title="No rooms added"
      description="Add rooms to start the design process."
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
      icon={require('lucide-react').IndianRupee}
      title="No budget generated"
      description="Generate a budget estimate based on your room designs."
      action={{
        label: 'Generate Budget',
        onClick: onGenerateClick,
      }}
    />
  );
}

export function EmptyNotifications() {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="rounded-full bg-success/10 p-3 mb-3">
        <span className="text-2xl" role="img" aria-label="All caught up">
          ✓
        </span>
      </div>
      <p className="text-sm font-medium text-foreground">All caught up!</p>
      <p className="text-xs text-muted-foreground">No new notifications</p>
    </div>
  );
}

export function EmptySearch({ query }: { query: string }) {
  return (
    <EmptyState
      icon={require('lucide-react').Search}
      title="No results found"
      description={`We couldn't find anything matching "${query}". Try a different search term.`}
    />
  );
}
