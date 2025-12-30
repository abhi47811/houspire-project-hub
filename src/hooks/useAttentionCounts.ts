import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient();
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
    staleTime: 15000,
    refetchInterval: 30000,
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
    staleTime: 15000,
    refetchInterval: 30000,
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
    staleTime: 15000,
    refetchInterval: 30000,
  });

  // Real-time subscriptions for instant badge updates
  useEffect(() => {
    if (!user) return;
    
    const channels: ReturnType<typeof supabase.channel>[] = [];

    // Subscribe to renders changes (for pending approvals badge)
    if (isAdmin) {
      const rendersChannel = supabase
        .channel('attention-renders')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'renders' },
          () => {
            queryClient.invalidateQueries({ queryKey: ['attention-pending-approvals'] });
          }
        )
        .subscribe();
      channels.push(rendersChannel);

      // Subscribe to quality_violations changes
      const violationsChannel = supabase
        .channel('attention-violations')
        .on('postgres_changes',
          { event: '*', schema: 'public', table: 'quality_violations' },
          () => {
            queryClient.invalidateQueries({ queryKey: ['attention-unresolved-violations'] });
          }
        )
        .subscribe();
      channels.push(violationsChannel);
    }

    // Subscribe to notifications changes for this user
    const notificationsChannel = supabase
      .channel('attention-notifications')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` },
        () => {
          queryClient.invalidateQueries({ queryKey: ['attention-unread-notifications', user.id] });
        }
      )
      .subscribe();
    channels.push(notificationsChannel);

    return () => {
      channels.forEach(channel => supabase.removeChannel(channel));
    };
  }, [user, isAdmin, queryClient]);

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
