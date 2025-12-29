import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { startOfDay, startOfMonth, subDays, addDays, addHours } from 'date-fns';

// Types
export interface DashboardMetrics {
  activeProjects: number;
  renderingCount: number;
  todaysCost: number;
  monthsCost: number;
  avgCostPerProject: number;
  avgQualityScore: number;
  qualityPassed: number;
  qualityFailed: number;
  totalQualityChecked: number;
  dueToday: number;
  dueTomorrow: number;
  atRisk: number;
  overdue: number;
  preservationValidated: number;
  preservationTotal: number;
  preservationSuccessRate: number;
  pipelineStatus: PipelinePhase[];
  cityBreakdown: CityData[];
  popularCombinations: CombinationData[];
  teamPerformance: TeamMember[];
  recentProjects: RecentProject[];
  teamActivity: ActivityItem[];
}

export interface PipelinePhase {
  name: string;
  status: string;
  count: number;
  avgHours?: number;
}

export interface CityData {
  city: string;
  count: number;
  percentage: number;
}

export interface CombinationData {
  combination: string;
  count: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  projectsHandled: number;
  avgQuality: number;
  avgHours: number;
}

export interface RecentProject {
  id: string;
  name: string;
  clientName: string | null;
  city: string | null;
  status: string;
  currentPhase: number;
  createdAt: string;
  deadline: string | null;
  roomCount: number;
  avgQuality: number | null;
  creatorName: string | null;
}

export interface ActivityItem {
  id: string;
  userName: string;
  userRole: string;
  projectName: string;
  activityType: string;
  description: string;
  timestamp: string;
}

// Cost tracking query
export function useCostTracking() {
  return useQuery({
    queryKey: ['dashboard', 'costs'],
    queryFn: async () => {
      const todayStart = startOfDay(new Date()).toISOString();
      const monthStart = startOfMonth(new Date()).toISOString();
      const last30Days = subDays(new Date(), 30).toISOString();

      const [todayResult, monthResult, projectCostsResult] = await Promise.all([
        supabase
          .from('api_logs')
          .select('cost_usd')
          .gte('created_at', todayStart),
        supabase
          .from('api_logs')
          .select('cost_usd')
          .gte('created_at', monthStart),
        supabase
          .from('api_logs')
          .select('cost_usd, project_id')
          .gte('created_at', last30Days)
          .not('project_id', 'is', null),
      ]);

      const todaysCost = (todayResult.data || []).reduce((sum, log) => sum + Number(log.cost_usd || 0), 0);
      const monthsCost = (monthResult.data || []).reduce((sum, log) => sum + Number(log.cost_usd || 0), 0);

      // Calculate avg cost per project
      const projectCosts = projectCostsResult.data || [];
      const projectCostMap: Record<string, number> = {};
      projectCosts.forEach(log => {
        if (log.project_id) {
          projectCostMap[log.project_id] = (projectCostMap[log.project_id] || 0) + Number(log.cost_usd || 0);
        }
      });
      const projectCount = Object.keys(projectCostMap).length;
      const avgCostPerProject = projectCount > 0 
        ? Object.values(projectCostMap).reduce((a, b) => a + b, 0) / projectCount 
        : 0;

      return {
        todaysCost,
        monthsCost,
        avgCostPerProject,
      };
    },
    refetchInterval: 30000, // 30 seconds
  });
}

// Active projects query
export function useActiveProjects() {
  return useQuery({
    queryKey: ['dashboard', 'activeProjects'],
    queryFn: async () => {
      const last30Days = subDays(new Date(), 30).toISOString();
      
      const { data, error } = await supabase
        .from('projects')
        .select('id, status')
        .not('status', 'in', '("completed","approved")')
        .gte('created_at', last30Days);

      if (error) throw error;
      return data?.length || 0;
    },
    refetchInterval: 60000, // 60 seconds
  });
}

// Rendering progress query
export function useRenderingProgress() {
  return useQuery({
    queryKey: ['dashboard', 'rendering'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('id')
        .eq('status', 'in_progress')
        .gte('current_phase', 5);

      if (error) throw error;
      return data?.length || 0;
    },
    refetchInterval: 10000, // 10 seconds for active rendering
  });
}

// Quality metrics query
export function useQualityMetrics() {
  return useQuery({
    queryKey: ['dashboard', 'quality'],
    queryFn: async () => {
      const last30Days = subDays(new Date(), 30).toISOString();

      const { data, error } = await supabase
        .from('rooms')
        .select('quality_score')
        .not('quality_score', 'is', null)
        .gte('created_at', last30Days);

      if (error) throw error;

      const rooms = data || [];
      const avgScore = rooms.length > 0 
        ? rooms.reduce((sum, r) => sum + (r.quality_score || 0), 0) / rooms.length 
        : 0;
      const passed = rooms.filter(r => (r.quality_score || 0) >= 85).length;
      const failed = rooms.filter(r => (r.quality_score || 0) < 85).length;

      return {
        avgScore,
        passed,
        failed,
        total: rooms.length,
      };
    },
    refetchInterval: 60000, // 60 seconds
  });
}

// Deadline tracking query
export function useDeadlineTracking() {
  return useQuery({
    queryKey: ['dashboard', 'deadlines'],
    queryFn: async () => {
      const now = new Date();
      const todayStart = startOfDay(now).toISOString();
      const todayEnd = startOfDay(addDays(now, 1)).toISOString();
      const tomorrowEnd = startOfDay(addDays(now, 2)).toISOString();
      const in48Hours = addHours(now, 48).toISOString();

      const { data, error } = await supabase
        .from('projects')
        .select('id, deadline, status')
        .not('status', 'in', '("completed","approved")');

      if (error) throw error;

      const projects = data || [];
      
      const dueToday = projects.filter(p => 
        p.deadline && p.deadline >= todayStart && p.deadline < todayEnd
      ).length;
      
      const dueTomorrow = projects.filter(p => 
        p.deadline && p.deadline >= todayEnd && p.deadline < tomorrowEnd
      ).length;
      
      const overdue = projects.filter(p => 
        p.deadline && p.deadline < todayStart
      ).length;
      
      const atRisk = projects.filter(p => 
        p.deadline && 
        p.deadline >= todayEnd && 
        p.deadline < in48Hours &&
        p.deadline >= tomorrowEnd
      ).length;

      return {
        dueToday,
        dueTomorrow,
        atRisk,
        overdue,
      };
    },
    refetchInterval: 60000, // 60 seconds
  });
}

// Preservation compliance query
export function usePreservationCompliance() {
  return useQuery({
    queryKey: ['dashboard', 'preservation'],
    queryFn: async () => {
      const last30Days = subDays(new Date(), 30).toISOString();

      // Use room_analysis for window/door data since architectural_preservation is new
      const { data: analysisData, error: analysisError } = await supabase
        .from('room_analysis')
        .select('id, window_count, door_count, is_verified, room_id')
        .gte('created_at', last30Days);

      if (analysisError) throw analysisError;

      const total = analysisData?.length || 0;
      const validated = analysisData?.filter(a => a.is_verified).length || 0;
      const successRate = total > 0 ? (validated / total) * 100 : 100;

      return {
        validated,
        total,
        successRate,
      };
    },
    refetchInterval: 60000 * 5, // 5 minutes
  });
}

// Pipeline status query
export function usePipelineStatus() {
  return useQuery({
    queryKey: ['dashboard', 'pipeline'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('status, current_phase')
        .not('status', 'in', '("completed","approved")');

      if (error) throw error;

      const projects = data || [];
      
      const phases: PipelinePhase[] = [
        { name: 'Setup', status: 'draft', count: 0 },
        { name: 'Analyze', status: 'in_progress', count: 0 },
        { name: 'Clean', status: 'in_progress', count: 0 },
        { name: 'Customize', status: 'in_progress', count: 0 },
        { name: 'Generate', status: 'in_progress', count: 0 },
        { name: 'Review', status: 'review', count: 0 },
        { name: 'Export', status: 'approved', count: 0 },
      ];

      projects.forEach(p => {
        const phase = p.current_phase || 1;
        if (phase >= 1 && phase <= 7) {
          phases[phase - 1].count++;
        }
      });

      return phases;
    },
    refetchInterval: 30000, // 30 seconds
  });
}

// City breakdown query
export function useCityBreakdown() {
  return useQuery({
    queryKey: ['dashboard', 'cities'],
    queryFn: async () => {
      const last30Days = subDays(new Date(), 30).toISOString();

      const { data, error } = await supabase
        .from('projects')
        .select('city')
        .not('city', 'is', null)
        .gte('created_at', last30Days);

      if (error) throw error;

      const cityMap: Record<string, number> = {};
      (data || []).forEach(p => {
        if (p.city) {
          cityMap[p.city] = (cityMap[p.city] || 0) + 1;
        }
      });

      const total = Object.values(cityMap).reduce((a, b) => a + b, 0);
      
      const cities: CityData[] = Object.entries(cityMap)
        .map(([city, count]) => ({
          city,
          count,
          percentage: total > 0 ? Math.round((count / total) * 100 * 10) / 10 : 0,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      return cities;
    },
    refetchInterval: 60000 * 5, // 5 minutes
  });
}

// Popular combinations query
export function usePopularCombinations() {
  return useQuery({
    queryKey: ['dashboard', 'combinations'],
    queryFn: async () => {
      const last30Days = subDays(new Date(), 30).toISOString();

      const { data, error } = await supabase
        .from('rooms')
        .select('room_type, selected_style')
        .not('room_type', 'is', null)
        .not('selected_style', 'is', null)
        .gte('created_at', last30Days);

      if (error) throw error;

      const combinationMap: Record<string, number> = {};
      (data || []).forEach(r => {
        if (r.room_type && r.selected_style) {
          const key = `${r.selected_style} + ${r.room_type}`;
          combinationMap[key] = (combinationMap[key] || 0) + 1;
        }
      });

      const combinations: CombinationData[] = Object.entries(combinationMap)
        .map(([combination, count]) => ({ combination, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      return combinations;
    },
    refetchInterval: 60000 * 5, // 5 minutes
  });
}

// Team performance query
export function useTeamPerformance() {
  return useQuery({
    queryKey: ['dashboard', 'team'],
    queryFn: async () => {
      const last30Days = subDays(new Date(), 30).toISOString();

      // Get projects with assigned users
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select('id, assigned_to, created_at, updated_at')
        .not('assigned_to', 'is', null)
        .gte('created_at', last30Days);

      if (projectsError) throw projectsError;

      // Get profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, role');

      if (profilesError) throw profilesError;

      // Get rooms with quality scores
      const { data: rooms, error: roomsError } = await supabase
        .from('rooms')
        .select('project_id, quality_score')
        .not('quality_score', 'is', null);

      if (roomsError) throw roomsError;

      // Build team performance map
      const teamMap: Record<string, TeamMember> = {};
      
      (profiles || []).forEach(profile => {
        if (profile.role && ['renderer', 'budgeter', 'admin'].includes(profile.role)) {
          teamMap[profile.id] = {
            id: profile.id,
            name: profile.full_name || 'Unknown',
            role: profile.role,
            projectsHandled: 0,
            avgQuality: 0,
            avgHours: 0,
          };
        }
      });

      // Count projects and calculate metrics
      const projectQualityMap: Record<string, number[]> = {};
      (rooms || []).forEach(room => {
        if (room.project_id && room.quality_score) {
          if (!projectQualityMap[room.project_id]) {
            projectQualityMap[room.project_id] = [];
          }
          projectQualityMap[room.project_id].push(room.quality_score);
        }
      });

      (projects || []).forEach(project => {
        if (project.assigned_to && teamMap[project.assigned_to]) {
          teamMap[project.assigned_to].projectsHandled++;
          
          // Add quality scores
          const qualities = projectQualityMap[project.id] || [];
          if (qualities.length > 0) {
            const currentAvg = teamMap[project.assigned_to].avgQuality;
            const currentCount = teamMap[project.assigned_to].projectsHandled - 1;
            const newAvg = qualities.reduce((a, b) => a + b, 0) / qualities.length;
            teamMap[project.assigned_to].avgQuality = currentCount > 0 
              ? ((currentAvg * currentCount) + newAvg) / teamMap[project.assigned_to].projectsHandled
              : newAvg;
          }
        }
      });

      const teamMembers = Object.values(teamMap)
        .filter(m => m.projectsHandled > 0)
        .sort((a, b) => b.projectsHandled - a.projectsHandled)
        .slice(0, 5);

      return teamMembers;
    },
    refetchInterval: 60000 * 5, // 5 minutes
  });
}

// Recent projects query
export function useRecentProjects() {
  return useQuery({
    queryKey: ['dashboard', 'recentProjects'],
    queryFn: async () => {
      const { data: projects, error } = await supabase
        .from('projects')
        .select(`
          id,
          name,
          client_name,
          city,
          status,
          current_phase,
          created_at,
          deadline,
          created_by
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;

      // Get room counts and quality
      const projectIds = (projects || []).map(p => p.id);
      const { data: rooms } = await supabase
        .from('rooms')
        .select('project_id, quality_score')
        .in('project_id', projectIds);

      // Get creator names
      const creatorIds = [...new Set((projects || []).map(p => p.created_by).filter(Boolean))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', creatorIds);

      const profileMap = (profiles || []).reduce((acc, p) => {
        acc[p.id] = p.full_name;
        return acc;
      }, {} as Record<string, string | null>);

      // Build room stats map
      const roomStatsMap: Record<string, { count: number; totalQuality: number }> = {};
      (rooms || []).forEach(room => {
        if (!roomStatsMap[room.project_id]) {
          roomStatsMap[room.project_id] = { count: 0, totalQuality: 0 };
        }
        roomStatsMap[room.project_id].count++;
        if (room.quality_score) {
          roomStatsMap[room.project_id].totalQuality += room.quality_score;
        }
      });

      const recentProjects: RecentProject[] = (projects || []).map(p => ({
        id: p.id,
        name: p.name,
        clientName: p.client_name,
        city: p.city,
        status: p.status || 'draft',
        currentPhase: p.current_phase || 1,
        createdAt: p.created_at || '',
        deadline: p.deadline,
        roomCount: roomStatsMap[p.id]?.count || 0,
        avgQuality: roomStatsMap[p.id]?.count > 0 
          ? Math.round(roomStatsMap[p.id].totalQuality / roomStatsMap[p.id].count)
          : null,
        creatorName: p.created_by ? profileMap[p.created_by] || null : null,
      }));

      return recentProjects;
    },
    refetchInterval: 30000, // 30 seconds
  });
}

// Team activity query
export function useTeamActivity() {
  return useQuery({
    queryKey: ['dashboard', 'activity'],
    queryFn: async () => {
      const last24Hours = subDays(new Date(), 1).toISOString();

      const { data: activityLog, error } = await supabase
        .from('project_activity_log')
        .select(`
          id,
          activity_type,
          description,
          created_at,
          project_id,
          user_id
        `)
        .gte('created_at', last24Hours)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      // Get project names
      const projectIds = [...new Set((activityLog || []).map(a => a.project_id))];
      const { data: projects } = await supabase
        .from('projects')
        .select('id, name')
        .in('id', projectIds);

      const projectMap = (projects || []).reduce((acc, p) => {
        acc[p.id] = p.name;
        return acc;
      }, {} as Record<string, string>);

      // Get user names
      const userIds = [...new Set((activityLog || []).map(a => a.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, role')
        .in('id', userIds);

      const profileMap = (profiles || []).reduce((acc, p) => {
        acc[p.id] = { name: p.full_name || 'Unknown', role: p.role || 'renderer' };
        return acc;
      }, {} as Record<string, { name: string; role: string }>);

      const activities: ActivityItem[] = (activityLog || []).map(a => ({
        id: a.id,
        userName: profileMap[a.user_id]?.name || 'Unknown User',
        userRole: profileMap[a.user_id]?.role || 'renderer',
        projectName: projectMap[a.project_id] || 'Unknown Project',
        activityType: a.activity_type,
        description: a.description || '',
        timestamp: a.created_at || '',
      }));

      return activities;
    },
    refetchInterval: 30000, // 30 seconds
  });
}

// Combined dashboard data hook
export function useDashboardData() {
  const costData = useCostTracking();
  const activeProjects = useActiveProjects();
  const renderingProgress = useRenderingProgress();
  const qualityMetrics = useQualityMetrics();
  const deadlines = useDeadlineTracking();
  const preservation = usePreservationCompliance();
  const pipeline = usePipelineStatus();
  const cities = useCityBreakdown();
  const combinations = usePopularCombinations();
  const team = useTeamPerformance();
  const recentProjects = useRecentProjects();
  const activity = useTeamActivity();

  const isLoading = 
    costData.isLoading ||
    activeProjects.isLoading ||
    qualityMetrics.isLoading ||
    deadlines.isLoading;

  return {
    isLoading,
    costData: costData.data,
    activeProjects: activeProjects.data,
    renderingProgress: renderingProgress.data,
    qualityMetrics: qualityMetrics.data,
    deadlines: deadlines.data,
    preservation: preservation.data,
    pipeline: pipeline.data,
    cities: cities.data,
    combinations: combinations.data,
    team: team.data,
    recentProjects: recentProjects.data,
    activity: activity.data,
    // Refetch functions
    refetchAll: () => {
      costData.refetch();
      activeProjects.refetch();
      renderingProgress.refetch();
      qualityMetrics.refetch();
      deadlines.refetch();
      preservation.refetch();
      pipeline.refetch();
      cities.refetch();
      combinations.refetch();
      team.refetch();
      recentProjects.refetch();
      activity.refetch();
    },
  };
}
