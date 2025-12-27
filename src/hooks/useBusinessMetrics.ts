import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { startOfDay, subDays, format } from 'date-fns';

interface DailyMetric {
  date: string;
  count: number;
  value?: number;
}

interface BusinessMetrics {
  // Project metrics
  projectsCreatedToday: number;
  projectsCompletedToday: number;
  totalActiveProjects: number;
  averageCompletionDays: number;
  
  // Room metrics
  totalRoomsProcessed: number;
  roomsProcessedToday: number;
  averagePhaseTime: Record<string, number>;
  
  // Cost metrics
  totalApiCost: number;
  apiCostToday: number;
  averageCostPerProject: number;
  costByService: Record<string, number>;
  
  // Revenue metrics
  totalRevenue: number;
  averageRevenuePerProject: number;
  
  // Daily trends
  dailyProjectsCreated: DailyMetric[];
  dailyProjectsCompleted: DailyMetric[];
  dailyApiCosts: DailyMetric[];
  
  // Conversion funnel
  conversionFunnel: {
    phase: string;
    count: number;
    rate: number;
  }[];
}

export function useBusinessMetrics(days: number = 30) {
  return useQuery({
    queryKey: ['business-metrics', days],
    queryFn: async (): Promise<BusinessMetrics> => {
      const startDate = subDays(new Date(), days).toISOString();
      const todayStart = startOfDay(new Date()).toISOString();

      // Fetch all necessary data in parallel
      const [
        projectsResult,
        roomsResult,
        apiLogsResult,
        todayProjectsResult,
        todayLogsResult,
      ] = await Promise.all([
        // All projects
        supabase.from('projects').select('id, status, created_at, actual_cost, estimated_budget'),
        // All rooms
        supabase.from('rooms').select('id, current_phase, phase_1_completed, phase_2_completed, phase_3_completed, phase_4_completed, phase_5_completed, created_at'),
        // API logs for the period
        supabase.from('api_logs').select('service, cost_usd, created_at, project_id').gte('created_at', startDate),
        // Today's projects
        supabase.from('projects').select('id, status').gte('created_at', todayStart),
        // Today's API logs
        supabase.from('api_logs').select('cost_usd').gte('created_at', todayStart),
      ]);

      const projects = projectsResult.data || [];
      const rooms = roomsResult.data || [];
      const apiLogs = apiLogsResult.data || [];
      const todayProjects = todayProjectsResult.data || [];
      const todayLogs = todayLogsResult.data || [];

      // Calculate project metrics
      const completedProjects = projects.filter(p => p.status === 'completed');
      const activeProjects = projects.filter(p => ['in_progress', 'review'].includes(p.status || ''));
      
      // Calculate average completion time (mock for now - would need start/end timestamps)
      const averageCompletionDays = 14; // Placeholder

      // Calculate room metrics
      const completedRooms = rooms.filter(r => r.phase_5_completed);

      // Calculate cost metrics
      const totalApiCost = apiLogs.reduce((sum, log) => sum + Number(log.cost_usd || 0), 0);
      const apiCostToday = todayLogs.reduce((sum, log) => sum + Number(log.cost_usd || 0), 0);
      
      const costByService: Record<string, number> = {};
      apiLogs.forEach(log => {
        costByService[log.service] = (costByService[log.service] || 0) + Number(log.cost_usd || 0);
      });

      // Calculate revenue metrics
      const totalRevenue = projects.reduce((sum, p) => 
        sum + Number(p.actual_cost || p.estimated_budget || 0), 0
      );
      const averageRevenuePerProject = completedProjects.length > 0 
        ? totalRevenue / completedProjects.length 
        : 0;

      const averageCostPerProject = completedProjects.length > 0 
        ? totalApiCost / completedProjects.length 
        : 0;

      // Calculate daily trends
      const dailyProjectsCreated = calculateDailyMetrics(projects, days, 'created_at');
      const dailyProjectsCompleted = calculateDailyMetrics(
        completedProjects, 
        days, 
        'created_at'
      );
      
      const dailyApiCosts = calculateDailyCosts(apiLogs, days);

      // Calculate conversion funnel
      const totalRooms = rooms.length || 1;
      const conversionFunnel = [
        { phase: 'Upload', count: rooms.filter(r => r.phase_1_completed).length, rate: 0 },
        { phase: 'Analyze', count: rooms.filter(r => r.phase_2_completed).length, rate: 0 },
        { phase: 'Clean', count: rooms.filter(r => r.phase_3_completed).length, rate: 0 },
        { phase: 'Customize', count: rooms.filter(r => r.phase_4_completed).length, rate: 0 },
        { phase: 'Generate', count: rooms.filter(r => r.phase_5_completed).length, rate: 0 },
      ].map((item, index, arr) => ({
        ...item,
        rate: index === 0 
          ? Math.round(item.count / totalRooms * 100)
          : arr[index - 1].count > 0 
            ? Math.round(item.count / arr[index - 1].count * 100)
            : 0
      }));

      return {
        projectsCreatedToday: todayProjects.length,
        projectsCompletedToday: todayProjects.filter(p => p.status === 'completed').length,
        totalActiveProjects: activeProjects.length,
        averageCompletionDays,
        
        totalRoomsProcessed: completedRooms.length,
        roomsProcessedToday: rooms.filter(r => 
          r.phase_5_completed && r.created_at && r.created_at >= todayStart
        ).length,
        averagePhaseTime: {}, // Would need timing data
        
        totalApiCost,
        apiCostToday,
        averageCostPerProject,
        costByService,
        
        totalRevenue,
        averageRevenuePerProject,
        
        dailyProjectsCreated,
        dailyProjectsCompleted,
        dailyApiCosts,
        
        conversionFunnel,
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Refresh every 5 minutes
  });
}

function calculateDailyMetrics(
  items: { created_at?: string | null }[],
  days: number,
  dateField: 'created_at'
): DailyMetric[] {
  const dailyMap: Record<string, number> = {};
  
  // Initialize all days
  for (let i = 0; i < days; i++) {
    const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
    dailyMap[date] = 0;
  }

  // Count items per day
  items.forEach(item => {
    const dateValue = item[dateField];
    if (dateValue) {
      const date = format(new Date(dateValue), 'yyyy-MM-dd');
      if (dailyMap[date] !== undefined) {
        dailyMap[date]++;
      }
    }
  });

  return Object.entries(dailyMap)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function calculateDailyCosts(
  logs: { cost_usd: number; created_at: string }[],
  days: number
): DailyMetric[] {
  const dailyMap: Record<string, number> = {};
  
  // Initialize all days
  for (let i = 0; i < days; i++) {
    const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
    dailyMap[date] = 0;
  }

  // Sum costs per day
  logs.forEach(log => {
    const date = format(new Date(log.created_at), 'yyyy-MM-dd');
    if (dailyMap[date] !== undefined) {
      dailyMap[date] += Number(log.cost_usd || 0);
    }
  });

  return Object.entries(dailyMap)
    .map(([date, value]) => ({ date, count: 0, value }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

// Hook for cost alerts
export function useCostAlerts(dailyThreshold: number = 10) {
  const { data: metrics } = useBusinessMetrics(1);
  
  return {
    isOverBudget: metrics ? metrics.apiCostToday > dailyThreshold : false,
    currentCost: metrics?.apiCostToday || 0,
    threshold: dailyThreshold,
    percentUsed: metrics ? (metrics.apiCostToday / dailyThreshold) * 100 : 0,
  };
}
