import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface AttentionCounts {
  pendingApprovals: number;
  unresolvedViolations: number;
  unreadNotifications: number;
  adminTotal: number;
  hasAnyAttention: boolean;
}

/**
 * Central hook for fetching all attention-needing counts
 * Used for notification badges across the app
 */
export function useAttentionCounts() {
  const { user, profile } = useAuth();
  const isAdmin = profile?.role === 'admin';

  // Fetch pending approvals count (admin only)
  const { data: pendingApprovals = 0 } = useQuery({
    queryKey: ['attention-pending-approvals'],
    queryFn: async () => {
      const { count } = await supabase
        .from('renders')
        .select('id', { count: 'exact', head: true })
        .eq('approval_status', 'pending');
      return count || 0;
    },
    enabled: isAdmin,
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // Refetch every minute
  });

  // Fetch unresolved quality violations count (admin only)
  const { data: unresolvedViolations = 0 } = useQuery({
    queryKey: ['attention-unresolved-violations'],
    queryFn: async () => {
      const { count } = await supabase
        .from('quality_violations')
        .select('id', { count: 'exact', head: true })
        .is('resolved_at', null);
      return count || 0;
    },
    enabled: isAdmin,
    staleTime: 30000,
    refetchInterval: 60000,
  });

  // Fetch unread notifications count (all users)
  const { data: unreadNotifications = 0 } = useQuery({
    queryKey: ['attention-unread-notifications', user?.id],
    queryFn: async () => {
      if (!user?.id) return 0;
      const { count } = await supabase
        .from('notifications')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('is_read', false);
      return count || 0;
    },
    enabled: !!user?.id,
    staleTime: 30000,
    refetchInterval: 60000,
  });

  const adminTotal = pendingApprovals + unresolvedViolations;
  const hasAnyAttention = adminTotal > 0 || unreadNotifications > 0;

  return {
    pendingApprovals,
    unresolvedViolations,
    unreadNotifications,
    adminTotal,
    hasAnyAttention,
  } as AttentionCounts;
}
