import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Home,
  MapPin,
  Calendar,
  Clock,
  IndianRupee,
  Star,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Image as ImageIcon,
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { EnrichedProject, statusConfig, formatCurrency, formatRoomType, formatStyle } from '@/hooks/useProjectsData';
import { ProjectQuickActions } from './ProjectQuickActions';
import { supabase } from '@/integrations/supabase/client';
import { useState, useEffect } from 'react';

interface EnhancedProjectCardProps {
  project: EnrichedProject;
  isAdmin: boolean;
  isSelected: boolean;
  onSelect: (id: string, selected: boolean) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onArchive: (id: string) => void;
}

const phaseEmojis: Record<number, string> = {
  1: '📋',
  2: '🔍',
  3: '🧹',
  4: '🎨',
  5: '🖼️',
  6: '👀',
  7: '📤',
};

const phaseLabels: Record<number, string> = {
  1: 'Setup',
  2: 'Analyze',
  3: 'Clean',
  4: 'Customize',
  5: 'Generate',
  6: 'Review',
  7: 'Export',
};

export function EnhancedProjectCard({
  project,
  isAdmin,
  isSelected,
  onSelect,
  onDelete,
  onDuplicate,
  onArchive,
}: EnhancedProjectCardProps) {
  const status = statusConfig[project.status] || statusConfig.draft;
  const [thumbnailUrls, setThumbnailUrls] = useState<string[]>([]);

  // Get signed URLs for thumbnails
  useEffect(() => {
    async function fetchThumbnails() {
      if (project.room_thumbnails.length === 0) return;
      
      const urls: string[] = [];
      for (const path of project.room_thumbnails.slice(0, 3)) {
        const { data } = supabase.storage
          .from('room-images')
          .getPublicUrl(path);
        if (data?.publicUrl) {
          urls.push(data.publicUrl);
        }
      }
      setThumbnailUrls(urls);
    }
    
    fetchThumbnails();
  }, [project.room_thumbnails]);

  const deadlineStatusColors = {
    on_track: 'text-success',
    at_risk: 'text-warning',
    overdue: 'text-destructive',
    no_deadline: 'text-muted-foreground',
  };

  const deadlineStatusIcons = {
    on_track: <CheckCircle2 className="h-3.5 w-3.5" />,
    at_risk: <Clock className="h-3.5 w-3.5" />,
    overdue: <AlertTriangle className="h-3.5 w-3.5" />,
    no_deadline: null,
  };

  // Use estimated_budget from database if available, otherwise fall back to tier-based calculation
  const budgetMax = project.estimated_budget 
    ?? (project.budget_tier === 'premium' ? 500 
      : project.budget_tier === 'mid_range' ? 300 
      : 100);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg border-border group">
      {/* Header with gradient and thumbnails */}
      <div className="relative h-36 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/5">
        {/* Thumbnails or placeholder */}
        {thumbnailUrls.length > 0 ? (
          <div className="absolute inset-0 flex">
            {thumbnailUrls.map((url, idx) => (
              <div 
                key={idx} 
                className="flex-1 relative overflow-hidden"
                style={{ 
                  clipPath: idx === 0 
                    ? 'polygon(0 0, 85% 0, 70% 100%, 0 100%)' 
                    : idx === 1 
                    ? 'polygon(15% 0, 85% 0, 70% 100%, 30% 100%)' 
                    : 'polygon(30% 0, 100% 0, 100% 100%, 15% 100%)'
                }}
              >
                <img 
                  src={url} 
                  alt={`Room ${idx + 1}`}
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
              </div>
            ))}
            {project.rooms_data.length > 3 && (
              <div className="absolute bottom-2 right-2 bg-background/90 text-foreground px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1">
                <ImageIcon className="h-3 w-3" />
                +{project.rooms_data.length - 3}
              </div>
            )}
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Home className="h-12 w-12 text-primary/30" />
          </div>
        )}

        {/* Checkbox for selection */}
        <div className="absolute top-3 left-3 z-10">
          <Checkbox
            checked={isSelected}
            onCheckedChange={(checked) => onSelect(project.id, checked as boolean)}
            className="bg-background/90 border-border"
          />
        </div>

        {/* Status badge */}
        <Badge className={`absolute top-3 right-12 ${status.bgColor} ${status.color}`}>
          {status.label}
        </Badge>

        {/* Quick actions menu */}
        <div className="absolute top-3 right-3 z-10">
          <ProjectQuickActions
            projectId={project.id}
            projectName={project.name}
            isAdmin={isAdmin}
            onDelete={onDelete}
            onDuplicate={onDuplicate}
            onArchive={onArchive}
          />
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Project Name & Creator */}
        <div>
          <h3 className="font-semibold text-foreground line-clamp-1 text-base">{project.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-1 flex items-center gap-1.5">
            {project.creator_name || 'Unknown'} 
            {project.city && (
              <>
                <span>•</span>
                <MapPin className="h-3 w-3" />
                {project.city}
              </>
            )}
          </p>
        </div>

        {/* Dates */}
        <div className="flex flex-col gap-1 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>Created: {format(new Date(project.created_at), 'MMM d, yyyy')}</span>
          </div>
          {project.deadline && (
            <div className={`flex items-center gap-1.5 ${deadlineStatusColors[project.deadline_status]}`}>
              {deadlineStatusIcons[project.deadline_status]}
              <span>
                Deadline: {format(new Date(project.deadline), 'MMM d')}
                {project.days_remaining !== null && (
                  <span className="ml-1">
                    ({project.days_remaining >= 0 
                      ? `${project.days_remaining}d left` 
                      : `${Math.abs(project.days_remaining)}d overdue`})
                  </span>
                )}
              </span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{project.progress_percentage}%</span>
          </div>
          <Progress value={project.progress_percentage} className="h-2" />
        </div>

        {/* Phase Visualization */}
        <div className="flex items-center justify-between gap-0.5">
          {[1, 2, 3, 4, 5, 6, 7].map((phase) => (
            <div
              key={phase}
              className={`flex-1 flex flex-col items-center transition-all ${
                phase < project.current_phase
                  ? 'opacity-100'
                  : phase === project.current_phase
                  ? 'opacity-100'
                  : 'opacity-40'
              }`}
              title={phaseLabels[phase]}
            >
              <div
                className={`h-6 w-6 rounded-full flex items-center justify-center text-xs transition-colors ${
                  phase < project.current_phase
                    ? 'bg-success text-success-foreground'
                    : phase === project.current_phase
                    ? 'bg-primary text-primary-foreground ring-2 ring-primary/30'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {phaseEmojis[phase]}
              </div>
            </div>
          ))}
        </div>

        {/* Metrics Row */}
        <div className="flex items-center justify-between text-sm border-t border-border pt-3">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Home className="h-3.5 w-3.5" />
            <span>{project.rooms_data.length}/{project.max_rooms}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <IndianRupee className="h-3.5 w-3.5" />
            <span className={project.total_cost > budgetMax ? 'text-destructive' : ''}>
              {formatCurrency(project.total_cost)}/{formatCurrency(budgetMax)}
            </span>
          </div>
          {project.avg_quality_score !== null && (
            <div className={`flex items-center gap-1 ${
              project.avg_quality_score >= 90 ? 'text-success' 
                : project.avg_quality_score >= 85 ? 'text-warning' 
                : 'text-destructive'
            }`}>
              <Star className="h-3.5 w-3.5" />
              <span>{project.avg_quality_score}%</span>
            </div>
          )}
        </div>

        {/* Style & Room Type Breakdown */}
        {(Object.keys(project.style_breakdown).length > 0 || Object.keys(project.room_type_breakdown).length > 0) && (
          <div className="text-xs text-muted-foreground space-y-1 border-t border-border pt-3">
            {Object.keys(project.style_breakdown).length > 0 && (
              <div className="flex items-center gap-1 flex-wrap">
                <span className="font-medium">Styles:</span>
                {Object.entries(project.style_breakdown).slice(0, 2).map(([style, count]) => (
                  <Badge key={style} variant="outline" className="text-[10px] px-1.5 py-0">
                    {formatStyle(style)} ({count})
                  </Badge>
                ))}
                {Object.keys(project.style_breakdown).length > 2 && (
                  <span className="text-muted-foreground">+{Object.keys(project.style_breakdown).length - 2}</span>
                )}
              </div>
            )}
            {Object.keys(project.room_type_breakdown).length > 0 && (
              <div className="flex items-center gap-1 flex-wrap">
                <span className="font-medium">Rooms:</span>
                {Object.entries(project.room_type_breakdown).slice(0, 2).map(([type, count]) => (
                  <Badge key={type} variant="outline" className="text-[10px] px-1.5 py-0">
                    {formatRoomType(type)} ({count})
                  </Badge>
                ))}
                {Object.keys(project.room_type_breakdown).length > 2 && (
                  <span className="text-muted-foreground">+{Object.keys(project.room_type_breakdown).length - 2}</span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Assigned Team Member */}
        {project.assigned_name && (
          <div className="flex items-center gap-2 text-xs border-t border-border pt-3">
            <Avatar className="h-5 w-5">
              <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                {project.assigned_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <span className="text-muted-foreground">Assigned to {project.assigned_name}</span>
          </div>
        )}

        {/* View Details Button */}
        <Link to={`/projects/${project.id}`} className="block">
          <Button variant="outline" className="w-full">
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
