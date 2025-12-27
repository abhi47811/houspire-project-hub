import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface ApiCostSummary {
  totalCost: number;
  callCount: number;
  byService: Record<string, { cost: number; count: number }>;
  byEndpoint: Record<string, { cost: number; count: number }>;
  recentCalls: {
    id: string;
    service: string;
    endpoint: string;
    cost_usd: number;
    created_at: string;
  }[];
}

export function useApiCost(projectId: string) {
  return useQuery({
    queryKey: ['api-cost', projectId],
    queryFn: async (): Promise<ApiCostSummary> => {
      const { data: logs, error } = await supabase
        .from('api_logs')
        .select('id, service, endpoint, cost_usd, created_at')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const byService: Record<string, { cost: number; count: number }> = {};
      const byEndpoint: Record<string, { cost: number; count: number }> = {};
      let totalCost = 0;

      for (const log of logs || []) {
        totalCost += Number(log.cost_usd) || 0;

        if (!byService[log.service]) {
          byService[log.service] = { cost: 0, count: 0 };
        }
        byService[log.service].cost += Number(log.cost_usd) || 0;
        byService[log.service].count += 1;

        const key = `${log.service}:${log.endpoint}`;
        if (!byEndpoint[key]) {
          byEndpoint[key] = { cost: 0, count: 0 };
        }
        byEndpoint[key].cost += Number(log.cost_usd) || 0;
        byEndpoint[key].count += 1;
      }

      return {
        totalCost,
        callCount: logs?.length || 0,
        byService,
        byEndpoint,
        recentCalls: (logs || []).slice(0, 10).map((log) => ({
          id: log.id,
          service: log.service,
          endpoint: log.endpoint,
          cost_usd: Number(log.cost_usd),
          created_at: log.created_at,
        })),
      };
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });
}

export function useProjectApiCostBadge(projectId: string) {
  const { data } = useApiCost(projectId);
  
  const formatCost = (cost: number) => {
    if (cost < 0.01) return `$${cost.toFixed(4)}`;
    if (cost < 1) return `$${cost.toFixed(2)}`;
    return `$${cost.toFixed(2)}`;
  };

  return {
    cost: data?.totalCost || 0,
    formattedCost: formatCost(data?.totalCost || 0),
    callCount: data?.callCount || 0,
    isLoading: !data,
  };
}
