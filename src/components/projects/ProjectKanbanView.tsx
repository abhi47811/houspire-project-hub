import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import {
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { format } from 'date-fns';
import { EnrichedProject, statusConfig, formatCurrency } from '@/hooks/useProjectsData';

interface ProjectKanbanViewProps {
  projects: EnrichedProject[];
  selectedProjects: Set<string>;
  onSelectProject: (id: string, selected: boolean) => void;
}

const kanbanColumns = [
  { phase: 1, label: 'Setup', emoji: '📋', color: 'bg-muted' },
  { phase: 2, label: 'Analyzing', emoji: '🔍', color: 'bg-primary/10' },
  { phase: 3, label: 'Cleaning', emoji: '🧹', color: 'bg-warning/10' },
  { phase: 4, label: 'Customizing', emoji: '🎨', color: 'bg-accent/10' },
  { phase: 5, label: 'Generating', emoji: '🖼️', color: 'bg-destructive/10' },
  { phase: 6, label: 'Reviewing', emoji: '👀', color: 'bg-success/10' },
  { phase: 7, label: 'Exporting', emoji: '📤', color: 'bg-secondary/10' },
];

export function ProjectKanbanView({
  projects,
  selectedProjects,
  onSelectProject,
}: ProjectKanbanViewProps) {
  // Group projects by phase
  const projectsByPhase = useMemo(() => {
    const grouped: Record<number, EnrichedProject[]> = {};
    kanbanColumns.forEach(col => {
      grouped[col.phase] = [];
    });
    
    projects.forEach(project => {
      const phase = project.current_phase || 1;
      if (grouped[phase]) {
        grouped[phase].push(project);
      } else {
        // Default to phase 1 if unknown
        grouped[1].push(project);
      }
    });
    
    return grouped;
  }, [projects]);

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {kanbanColumns.map((column) => (
        <div 
          key={column.phase} 
          className="flex-shrink-0 w-72"
        >
          <Card className={`${column.color} border-border`}>
            <CardHeader className="py-3 px-4">
              <CardTitle className="flex items-center justify-between text-sm font-medium">
                <span className="flex items-center gap-2">
                  <span>{column.emoji}</span>
                  {column.label}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {projectsByPhase[column.phase]?.length || 0}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-2 pb-2">
              <ScrollArea className="h-[60vh]">
                <div className="space-y-2 px-2">
                  {projectsByPhase[column.phase]?.map((project) => (
                    <KanbanCard
                      key={project.id}
                      project={project}
                      isSelected={selectedProjects.has(project.id)}
                      onSelect={onSelectProject}
                    />
                  ))}
                  {projectsByPhase[column.phase]?.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground text-sm">
                      No projects
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}

interface KanbanCardProps {
  project: EnrichedProject;
  isSelected: boolean;
  onSelect: (id: string, selected: boolean) => void;
}

function KanbanCard({ project, isSelected, onSelect }: KanbanCardProps) {
  const status = statusConfig[project.status] || statusConfig.draft;

  const deadlineStatusColors = {
    on_track: 'text-success',
    at_risk: 'text-warning',
    overdue: 'text-destructive',
    no_deadline: 'text-muted-foreground',
  };

  const deadlineStatusIcons = {
    on_track: <CheckCircle2 className="h-3 w-3" />,
    at_risk: <Clock className="h-3 w-3" />,
    overdue: <AlertTriangle className="h-3 w-3" />,
    no_deadline: null,
  };

  return (
    <Link to={`/projects/${project.id}`}>
      <Card className="bg-card hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-3 space-y-2">
          {/* Header */}
          <div className="flex items-start gap-2">
            <Checkbox
              checked={isSelected}
              onCheckedChange={(checked) => {
                onSelect(project.id, checked as boolean);
              }}
              onClick={(e) => e.stopPropagation()}
              className="mt-0.5"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm line-clamp-1">{project.name}</h4>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {project.client_name || 'No client'}
              </p>
            </div>
            <Badge className={`${status.bgColor} ${status.color} text-[10px] px-1.5`}>
              {status.label}
            </Badge>
          </div>

          {/* Info Row */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {project.city && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {project.city}
              </span>
            )}
            <span>{project.rooms_data.length} rooms</span>
          </div>

          {/* Deadline */}
          {project.deadline && (
            <div className={`flex items-center gap-1 text-xs ${deadlineStatusColors[project.deadline_status]}`}>
              {deadlineStatusIcons[project.deadline_status]}
              <span>
                {format(new Date(project.deadline), 'MMM d')}
                {project.days_remaining !== null && project.days_remaining >= 0 && (
                  <span className="ml-1">({project.days_remaining}d)</span>
                )}
              </span>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-1 border-t border-border">
            {project.assigned_name && (
              <Avatar className="h-5 w-5">
                <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                  {project.assigned_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            )}
            {project.avg_quality_score !== null && (
              <span className={`text-xs font-medium ${
                project.avg_quality_score >= 90 ? 'text-success' 
                  : project.avg_quality_score >= 85 ? 'text-warning' 
                  : 'text-destructive'
              }`}>
                {project.avg_quality_score}%
              </span>
            )}
            <span className="text-xs text-muted-foreground">
              {formatCurrency(project.total_cost)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
