import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export type ProjectStatus = 'draft' | 'in_progress' | 'review' | 'approved' | 'completed' | 'cancelled';
export type CityEnum = 'Mumbai' | 'Delhi' | 'Bangalore' | 'Chennai' | 'Hyderabad' | 'Pune' | 'Kolkata' | 'Ahmedabad' | 'Jaipur' | 'Surat' | 'Lucknow';
export type DeadlineStatus = 'on_track' | 'at_risk' | 'overdue' | 'no_deadline';

export interface RoomData {
  id: string;
  room_type: string | null;
  selected_style: string | null;
  quality_score: number | null;
  current_phase: number | null;
}

export interface EnrichedProject {
  id: string;
  name: string;
  description: string | null;
  client_name: string | null;
  city: CityEnum | null;
  max_rooms: number;
  total_rooms: number;
  status: ProjectStatus;
  current_phase: number;
  deadline: string | null;
  estimated_budget: number | null;
  budget_tier: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  assigned_to: string | null;
  
  // Enriched data
  creator_name: string | null;
  assigned_name: string | null;
  room_thumbnails: string[];
  total_cost: number;
  avg_quality_score: number | null;
  rooms_data: RoomData[];
  style_breakdown: Record<string, number>;
  room_type_breakdown: Record<string, number>;
  deadline_status: DeadlineStatus;
  days_remaining: number | null;
  progress_percentage: number;
}

export interface ProjectFilters {
  status: string;
  city: string;
  phase: string;
  assignedTo: string;
  deadlineFilter: string;
  qualityFilter: string;
  budgetFilter: string;
}

export interface ProjectSortOption {
  value: string;
  label: string;
}

export const sortOptions: ProjectSortOption[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'deadline_asc', label: 'Deadline (Soonest)' },
  { value: 'deadline_desc', label: 'Deadline (Latest)' },
  { value: 'budget_high', label: 'Budget (Highest)' },
  { value: 'budget_low', label: 'Budget (Lowest)' },
  { value: 'quality_high', label: 'Quality (Highest)' },
  { value: 'quality_low', label: 'Quality (Lowest)' },
  { value: 'progress_high', label: 'Progress (Most)' },
  { value: 'progress_low', label: 'Progress (Least)' },
  { value: 'name_asc', label: 'Name (A-Z)' },
  { value: 'name_desc', label: 'Name (Z-A)' },
];

export const cities: CityEnum[] = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad',
  'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow'
];

export const phases = [
  { value: '1', label: 'Setup' },
  { value: '2', label: 'Analyzing' },
  { value: '3', label: 'Cleaning' },
  { value: '4', label: 'Customizing' },
  { value: '5', label: 'Generating' },
  { value: '6', label: 'Reviewing' },
  { value: '7', label: 'Exporting' },
];

export const statusConfig: Record<ProjectStatus, { label: string; color: string; bgColor: string }> = {
  draft: { label: 'Draft', color: 'text-muted-foreground', bgColor: 'bg-muted' },
  in_progress: { label: 'In Progress', color: 'text-primary', bgColor: 'bg-primary/10' },
  review: { label: 'Review', color: 'text-warning', bgColor: 'bg-warning/10' },
  approved: { label: 'Approved', color: 'text-success', bgColor: 'bg-success/10' },
  completed: { label: 'Completed', color: 'text-success', bgColor: 'bg-success/10' },
  cancelled: { label: 'Cancelled', color: 'text-destructive', bgColor: 'bg-destructive/10' },
};

function calculateDeadlineStatus(deadline: string | null): { status: DeadlineStatus; daysRemaining: number | null } {
  if (!deadline) {
    return { status: 'no_deadline', daysRemaining: null };
  }
  
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const diffMs = deadlineDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return { status: 'overdue', daysRemaining: diffDays };
  } else if (diffDays <= 2) {
    return { status: 'at_risk', daysRemaining: diffDays };
  } else {
    return { status: 'on_track', daysRemaining: diffDays };
  }
}

function calculateProgress(currentPhase: number, maxPhase: number = 7): number {
  return Math.round(((currentPhase - 1) / (maxPhase - 1)) * 100);
}

export function useProjectsData(
  filters: ProjectFilters,
  sortBy: string,
  searchQuery: string
) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['enriched-projects', user?.id, filters, sortBy, searchQuery],
    queryFn: async (): Promise<EnrichedProject[]> => {
      // Fetch projects with creator info
      let projectsQuery = supabase
        .from('projects')
        .select(`
          *,
          creator:profiles!projects_created_by_fkey(full_name),
          assignee:profiles!projects_assigned_to_fkey(full_name)
        `);

      // Apply filters
      if (filters.status !== 'all') {
        if (filters.status === 'active') {
          projectsQuery = projectsQuery.not('status', 'in', '("completed","cancelled")');
        } else if (filters.status === 'overdue') {
          projectsQuery = projectsQuery
            .lt('deadline', new Date().toISOString())
            .not('status', 'in', '("completed","approved","cancelled")');
        } else {
          projectsQuery = projectsQuery.eq('status', filters.status as ProjectStatus);
        }
      }

      if (filters.city !== 'all') {
        projectsQuery = projectsQuery.eq('city', filters.city as CityEnum);
      }

      if (filters.phase !== 'all') {
        projectsQuery = projectsQuery.eq('current_phase', parseInt(filters.phase));
      }

      if (filters.assignedTo !== 'all') {
        projectsQuery = projectsQuery.eq('assigned_to', filters.assignedTo);
      }

      // Apply sorting
      switch (sortBy) {
        case 'newest':
          projectsQuery = projectsQuery.order('created_at', { ascending: false });
          break;
        case 'oldest':
          projectsQuery = projectsQuery.order('created_at', { ascending: true });
          break;
        case 'deadline_asc':
          projectsQuery = projectsQuery.order('deadline', { ascending: true, nullsFirst: false });
          break;
        case 'deadline_desc':
          projectsQuery = projectsQuery.order('deadline', { ascending: false, nullsFirst: true });
          break;
        case 'name_asc':
          projectsQuery = projectsQuery.order('name', { ascending: true });
          break;
        case 'name_desc':
          projectsQuery = projectsQuery.order('name', { ascending: false });
          break;
        default:
          projectsQuery = projectsQuery.order('created_at', { ascending: false });
      }

      const { data: projects, error: projectsError } = await projectsQuery;
      if (projectsError) throw projectsError;
      if (!projects || projects.length === 0) return [];

      const projectIds = projects.map(p => p.id);

      // Fetch rooms data for all projects
      const { data: rooms } = await supabase
        .from('rooms')
        .select('id, project_id, room_type, selected_style, quality_score, current_phase')
        .in('project_id', projectIds);

      // Fetch room images for thumbnails
      const { data: roomImages } = await supabase
        .from('room_images')
        .select('room_id, storage_path')
        .in('room_id', rooms?.map(r => r.id) || [])
        .eq('image_type', 'original')
        .order('created_at', { ascending: true });

      // Fetch cost data from api_logs
      const { data: costs } = await supabase
        .from('api_logs')
        .select('project_id, cost_usd')
        .in('project_id', projectIds);

      // Build enriched projects
      const enrichedProjects: EnrichedProject[] = projects.map((project: any) => {
        const projectRooms = rooms?.filter(r => r.project_id === project.id) || [];
        const projectRoomIds = projectRooms.map(r => r.id);
        const projectImages = roomImages?.filter(ri => projectRoomIds.includes(ri.room_id)) || [];
        const projectCosts = costs?.filter(c => c.project_id === project.id) || [];
        
        // Calculate style breakdown
        const styleBreakdown: Record<string, number> = {};
        projectRooms.forEach(room => {
          if (room.selected_style) {
            styleBreakdown[room.selected_style] = (styleBreakdown[room.selected_style] || 0) + 1;
          }
        });

        // Calculate room type breakdown
        const roomTypeBreakdown: Record<string, number> = {};
        projectRooms.forEach(room => {
          if (room.room_type) {
            roomTypeBreakdown[room.room_type] = (roomTypeBreakdown[room.room_type] || 0) + 1;
          }
        });

        // Calculate average quality
        const qualityScores = projectRooms
          .map(r => r.quality_score)
          .filter((s): s is number => s !== null);
        const avgQuality = qualityScores.length > 0
          ? Math.round(qualityScores.reduce((a, b) => a + b, 0) / qualityScores.length)
          : null;

        // Calculate total cost
        const totalCost = projectCosts.reduce((sum, c) => sum + (c.cost_usd || 0), 0);

        // Get thumbnails (first 3 unique)
        const thumbnails = projectImages
          .slice(0, 3)
          .map(img => img.storage_path);

        // Calculate deadline status
        const { status: deadlineStatus, daysRemaining } = calculateDeadlineStatus(project.deadline);

        return {
          id: project.id,
          name: project.name,
          description: project.description,
          client_name: project.client_name,
          city: project.city,
          max_rooms: project.max_rooms || 7,
          total_rooms: project.total_rooms || projectRooms.length,
          status: project.status,
          current_phase: project.current_phase || 1,
          deadline: project.deadline,
          estimated_budget: project.estimated_budget,
          budget_tier: project.budget_tier,
          created_at: project.created_at,
          updated_at: project.updated_at,
          created_by: project.created_by,
          assigned_to: project.assigned_to,
          creator_name: project.creator?.full_name || null,
          assigned_name: project.assignee?.full_name || null,
          room_thumbnails: thumbnails,
          total_cost: totalCost,
          avg_quality_score: avgQuality,
          rooms_data: projectRooms,
          style_breakdown: styleBreakdown,
          room_type_breakdown: roomTypeBreakdown,
          deadline_status: deadlineStatus,
          days_remaining: daysRemaining,
          progress_percentage: calculateProgress(project.current_phase || 1),
        };
      });

      // Apply client-side filters that require computed data
      let filteredProjects = enrichedProjects;

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredProjects = filteredProjects.filter(p =>
          p.name.toLowerCase().includes(query) ||
          p.client_name?.toLowerCase().includes(query) ||
          p.city?.toLowerCase().includes(query) ||
          Object.keys(p.style_breakdown).some(s => s.toLowerCase().includes(query)) ||
          Object.keys(p.room_type_breakdown).some(r => r.toLowerCase().includes(query))
        );
      }

      // Quality filter
      if (filters.qualityFilter !== 'all') {
        filteredProjects = filteredProjects.filter(p => {
          if (p.avg_quality_score === null) return false;
          switch (filters.qualityFilter) {
            case 'excellent': return p.avg_quality_score > 90;
            case 'good': return p.avg_quality_score >= 85 && p.avg_quality_score <= 90;
            case 'below': return p.avg_quality_score < 85;
            default: return true;
          }
        });
      }

      // Budget filter
      if (filters.budgetFilter !== 'all') {
        filteredProjects = filteredProjects.filter(p => {
          const budget = p.estimated_budget || 0;
          switch (filters.budgetFilter) {
            case 'under': return p.total_cost < budget * 0.8;
            case 'on_track': return p.total_cost >= budget * 0.8 && p.total_cost <= budget;
            case 'over': return p.total_cost > budget;
            default: return true;
          }
        });
      }

      // Deadline filter
      if (filters.deadlineFilter !== 'all') {
        const now = new Date();
        filteredProjects = filteredProjects.filter(p => {
          if (!p.deadline) return false;
          const deadline = new Date(p.deadline);
          switch (filters.deadlineFilter) {
            case 'today':
              return deadline.toDateString() === now.toDateString();
            case 'week':
              const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
              return deadline >= now && deadline <= weekFromNow;
            case 'month':
              const monthFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
              return deadline >= now && deadline <= monthFromNow;
            case 'overdue':
              return deadline < now;
            default:
              return true;
          }
        });
      }

      // Client-side sorting for computed fields
      switch (sortBy) {
        case 'budget_high':
          filteredProjects.sort((a, b) => (b.estimated_budget || 0) - (a.estimated_budget || 0));
          break;
        case 'budget_low':
          filteredProjects.sort((a, b) => (a.estimated_budget || 0) - (b.estimated_budget || 0));
          break;
        case 'quality_high':
          filteredProjects.sort((a, b) => (b.avg_quality_score || 0) - (a.avg_quality_score || 0));
          break;
        case 'quality_low':
          filteredProjects.sort((a, b) => (a.avg_quality_score || 0) - (b.avg_quality_score || 0));
          break;
        case 'progress_high':
          filteredProjects.sort((a, b) => b.progress_percentage - a.progress_percentage);
          break;
        case 'progress_low':
          filteredProjects.sort((a, b) => a.progress_percentage - b.progress_percentage);
          break;
      }

      return filteredProjects;
    },
    enabled: !!user,
    refetchInterval: 30000, // Refresh every 30 seconds
  });
}

// Hook for team members (for filter dropdown)
export function useTeamMembers() {
  return useQuery({
    queryKey: ['team-members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, role')
        .eq('is_active', true)
        .order('full_name');
      
      if (error) throw error;
      return data || [];
    },
  });
}

// Hook for project stats
export function useProjectStats() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['project-stats', user?.id],
    queryFn: async () => {
      const now = new Date().toISOString();
      
      const { data: projects, error } = await supabase
        .from('projects')
        .select('id, status, deadline');
      
      if (error) throw error;

      const active = projects?.filter(p => !['completed', 'cancelled'].includes(p.status)).length || 0;
      const overdue = projects?.filter(p => 
        p.deadline && 
        new Date(p.deadline) < new Date() && 
        !['completed', 'approved', 'cancelled'].includes(p.status)
      ).length || 0;
      const completed = projects?.filter(p => p.status === 'completed').length || 0;
      const total = projects?.length || 0;

      return { active, overdue, completed, total };
    },
    enabled: !!user,
  });
}

export function formatCurrency(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)}Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  } else if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(0)}K`;
  }
  return `₹${Math.round(amount)}`;
}

export function formatRoomType(roomType: string): string {
  return roomType
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function formatStyle(style: string): string {
  return style
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
