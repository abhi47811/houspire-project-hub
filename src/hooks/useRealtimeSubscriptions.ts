import { useEffect, useRef, useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ChangeEvent {
  id: string;
  entity_type: string;
  entity_id: string;
  project_id: string;
  room_id?: string;
  change_type: string;
  changed_fields: string[];
  changed_by: string;
  created_at: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  link?: string;
  is_read: boolean;
  created_at: string;
}

interface UseRealtimeOptions {
  projectId?: string;
  roomIds?: string[];
  debounceMs?: number;
  enableNotifications?: boolean;
  enableChangeEvents?: boolean;
  enableJobUpdates?: boolean;
}

export function useRealtimeSubscriptions(options: UseRealtimeOptions = {}) {
  const {
    projectId,
    roomIds = [],
    debounceMs = 500,
    enableNotifications = true,
    enableChangeEvents = true,
    enableJobUpdates = true,
  } = options;

  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const pendingUpdatesRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const [unreadCount, setUnreadCount] = useState(0);
  const [recentNotifications, setRecentNotifications] = useState<Notification[]>([]);

  // Debounced query invalidation
  const debouncedInvalidate = useCallback((queryKey: string[], entityKey: string) => {
    const existing = pendingUpdatesRef.current.get(entityKey);
    if (existing) {
      clearTimeout(existing);
    }

    const timeout = setTimeout(() => {
      queryClient.invalidateQueries({ queryKey });
      pendingUpdatesRef.current.delete(entityKey);
    }, debounceMs);

    pendingUpdatesRef.current.set(entityKey, timeout);
  }, [queryClient, debounceMs]);

  // Handle change events
  const handleChangeEvent = useCallback((event: ChangeEvent) => {
    // Skip if the change was made by current user (they already have the update)
    if (event.changed_by === user?.id) return;

    const entityKey = `${event.entity_type}:${event.entity_id}`;

    switch (event.entity_type) {
      case 'project':
        debouncedInvalidate(['project', event.project_id], entityKey);
        break;
      case 'room':
        debouncedInvalidate(['room', event.entity_id], entityKey);
        debouncedInvalidate(['rooms', event.project_id], entityKey);
        break;
      case 'room_analysis':
        debouncedInvalidate(['room-analysis', event.room_id], entityKey);
        break;
      case 'budget_item':
        debouncedInvalidate(['budget-items', event.project_id], entityKey);
        break;
      case 'job':
        debouncedInvalidate(['jobs', event.project_id], entityKey);
        if (event.room_id) {
          debouncedInvalidate(['jobs', event.room_id], entityKey);
        }
        break;
    }
  }, [user?.id, debouncedInvalidate]);

  // Handle new notifications
  const handleNotification = useCallback((notification: Notification) => {
    setRecentNotifications(prev => [notification, ...prev.slice(0, 9)]);
    setUnreadCount(prev => prev + 1);

    // Show toast for important notifications
    if (notification.type === 'success' || notification.type === 'error') {
      toast({
        title: notification.title,
        description: notification.message,
        variant: notification.type === 'error' ? 'destructive' : 'default',
      });
    }
  }, [toast]);

  // Handle job updates
  const handleJobUpdate = useCallback((job: any) => {
    if (job.status === 'completed') {
      toast({
        title: 'Job Completed',
        description: `${job.job_type} for room completed successfully.`,
      });
    } else if (job.status === 'failed') {
      toast({
        title: 'Job Failed',
        description: job.error_message || 'An error occurred.',
        variant: 'destructive',
      });
    }

    // Invalidate relevant queries
    debouncedInvalidate(['jobs', job.project_id], `job:${job.id}`);
    debouncedInvalidate(['room', job.room_id], `job-room:${job.room_id}`);
  }, [toast, debouncedInvalidate]);

  // Set up subscriptions
  useEffect(() => {
    if (!user) return;

    const channels: ReturnType<typeof supabase.channel>[] = [];

    // Subscribe to notifications
    if (enableNotifications) {
      const notificationChannel = supabase
        .channel('user-notifications')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'notifications',
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            handleNotification(payload.new as Notification);
          }
        )
        .subscribe();

      channels.push(notificationChannel);
    }

    // Subscribe to change events for the current project
    if (enableChangeEvents && projectId) {
      const changeEventChannel = supabase
        .channel(`project-changes-${projectId}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'change_events',
            filter: `project_id=eq.${projectId}`,
          },
          (payload) => {
            handleChangeEvent(payload.new as ChangeEvent);
          }
        )
        .subscribe();

      channels.push(changeEventChannel);
    }

    // Subscribe to job updates for project rooms
    if (enableJobUpdates && projectId) {
      const jobChannel = supabase
        .channel(`project-jobs-${projectId}`)
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'job_queue',
            filter: `project_id=eq.${projectId}`,
          },
          (payload) => {
            handleJobUpdate(payload.new);
          }
        )
        .subscribe();

      channels.push(jobChannel);
    }

    // Cleanup
    return () => {
      channels.forEach(channel => {
        supabase.removeChannel(channel);
      });
      
      // Clear pending debounced updates
      pendingUpdatesRef.current.forEach(timeout => clearTimeout(timeout));
      pendingUpdatesRef.current.clear();
    };
  }, [
    user,
    projectId,
    enableNotifications,
    enableChangeEvents,
    enableJobUpdates,
    handleNotification,
    handleChangeEvent,
    handleJobUpdate,
  ]);

  // Fetch initial unread count
  useEffect(() => {
    if (!user) return;

    const fetchUnreadCount = async () => {
      const { count } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('is_read', false);

      setUnreadCount(count || 0);
    };

    fetchUnreadCount();
  }, [user]);

  return {
    unreadCount,
    recentNotifications,
    setUnreadCount,
  };
}

// Hook for optimistic updates
export function useOptimisticUpdate() {
  const { user } = useAuth();
  const clientId = sessionStorage.getItem('lovable_client_id') || 'unknown';

  const recordOptimisticUpdate = useCallback(async (
    entityType: string,
    entityId: string,
    operation: 'create' | 'update' | 'delete',
    data: Record<string, any>
  ) => {
    if (!user) return null;

    try {
      const { data: update, error } = await supabase
        .from('optimistic_updates')
        .insert({
          user_id: user.id,
          client_id: clientId,
          entity_type: entityType,
          entity_id: entityId,
          operation,
          optimistic_data: data,
        })
        .select()
        .single();

      if (error) throw error;
      return update;
    } catch (e) {
      console.error('Failed to record optimistic update:', e);
      return null;
    }
  }, [user, clientId]);

  const confirmOptimisticUpdate = useCallback(async (updateId: string) => {
    try {
      await supabase
        .from('optimistic_updates')
        .update({ status: 'confirmed', confirmed_at: new Date().toISOString() })
        .eq('id', updateId);
    } catch (e) {
      console.error('Failed to confirm optimistic update:', e);
    }
  }, []);

  const rollbackOptimisticUpdate = useCallback(async (updateId: string, errorMessage?: string) => {
    try {
      await supabase
        .from('optimistic_updates')
        .update({ 
          status: errorMessage ? 'failed' : 'rolled_back',
          error_message: errorMessage 
        })
        .eq('id', updateId);
    } catch (e) {
      console.error('Failed to rollback optimistic update:', e);
    }
  }, []);

  return {
    recordOptimisticUpdate,
    confirmOptimisticUpdate,
    rollbackOptimisticUpdate,
  };
}
