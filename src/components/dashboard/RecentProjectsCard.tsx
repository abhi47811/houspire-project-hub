import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { FolderOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRecentProjects } from '@/hooks/useDashboardData';
import { differenceInDays, differenceInHours, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';

const statusColors: Record<string, string> = {
  draft: 'bg-muted text-muted-foreground',
  in_progress: 'bg-primary/10 text-primary',
  review: 'bg-warning/10 text-warning',
  approved: 'bg-success/10 text-success',
  completed: 'bg-success/10 text-success',
};

export function RecentProjectsCard() {
  const { data: projects, isLoading } = useRecentProjects();

  if (isLoading) return <RecentProjectsSkeleton />;

  const getDeadlineInfo = (deadline: string | null) => {
    if (!deadline) return null;
    const now = new Date();
    const deadlineDate = parseISO(deadline);
    const hours = differenceInHours(deadlineDate, now);
    const days = differenceInDays(deadlineDate, now);
    
    if (hours < 0) return { text: 'Overdue', color: 'text-destructive' };
    if (hours < 24) return { text: `${hours}h left`, color: 'text-destructive' };
    if (hours < 48) return { text: `${days}d left`, color: 'text-warning' };
    return { text: `${days}d left`, color: 'text-success' };
  };

  return (
    <Card className="card-interactive">
      <CardHeader className="flex flex-row items-center justify-between">
        <div><CardTitle>Recent Projects</CardTitle><CardDescription>Most recently created projects</CardDescription></div>
        <Link to="/projects" className="text-sm text-primary hover:underline flex items-center gap-1 hover-lift transition-transform">View all <ArrowRight className="h-3 w-3" /></Link>
      </CardHeader>
      <CardContent>
        {(projects || []).length > 0 ? (
          <div className="space-y-3">
            {projects?.map((project) => {
              const deadline = getDeadlineInfo(project.deadline);
              return (
                <Link key={project.id} to={`/projects/${project.id}`} className="flex items-center justify-between rounded-lg border p-3 transition-all duration-200 hover:bg-muted/50 hover:shadow-sm hover:-translate-y-0.5">
                  <div className="space-y-1 min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{project.name}</p>
                    <p className="text-xs text-muted-foreground">{project.clientName || 'No client'} • {project.city || 'No city'}</p>
                    <div className="flex gap-2 text-xs text-muted-foreground">
                      <span>{project.roomCount} rooms</span>
                      {project.avgQuality && <span>• {project.avgQuality}% quality</span>}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge className={cn(statusColors[project.status] || statusColors.draft, 'flex items-center gap-1.5')}>
                      {project.status === 'in_progress' && <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />}
                      {project.status.replace('_', ' ')}
                    </Badge>
                    <span className="text-xs text-muted-foreground">Phase {project.currentPhase}</span>
                    {deadline && <span className={cn('text-xs font-medium', deadline.color)}>{deadline.text}</span>}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <FolderOpen className="h-10 w-10 text-muted-foreground/50" />
            <p className="mt-2 text-sm text-muted-foreground">No projects yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function RecentProjectsSkeleton() {
  return (
    <Card>
      <CardHeader><Skeleton className="h-5 w-32" /><Skeleton className="h-4 w-48" /></CardHeader>
      <CardContent className="space-y-3">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="flex items-center justify-between rounded-lg border p-3">
            <div className="space-y-2"><Skeleton className="h-4 w-32" /><Skeleton className="h-3 w-24" /></div>
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
