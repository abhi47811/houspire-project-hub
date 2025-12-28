import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

export interface Batch {
  id: string;
  project_id: string;
  batch_type: string;
  total_items: number;
  completed_items: number;
  failed_items: number;
  status: string;
  started_at: string | null;
  completed_at: string | null;
  error_message: string | null;
  metadata: Record<string, any>;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface BatchProgress {
  total_items: number;
  completed_items: number;
  failed_items: number;
  progress_percent: number;
  status: string;
}

export function useBatches(projectId: string | undefined) {
  const queryClient = useQueryClient();

  const { data: batches = [], isLoading, refetch } = useQuery({
    queryKey: ['batches', projectId],
    queryFn: async () => {
      if (!projectId) return [];
      const { data, error } = await supabase
        .from('batches')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Batch[];
    },
    enabled: !!projectId,
  });

  // Realtime subscription for batch updates
  useEffect(() => {
    if (!projectId) return;

    const channel = supabase
      .channel(`batches-${projectId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'batches',
          filter: `project_id=eq.${projectId}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['batches', projectId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId, queryClient]);

  const activeBatch = batches.find(b => b.status === 'processing');
  const recentBatches = batches.slice(0, 5);

  return {
    batches,
    activeBatch,
    recentBatches,
    isLoading,
    refetch,
  };
}

export function useCreateBatch() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      projectId,
      batchType,
      totalItems,
      metadata = {},
    }: {
      projectId: string;
      batchType: string;
      totalItems: number;
      metadata?: Record<string, any>;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('batches')
        .insert({
          project_id: projectId,
          batch_type: batchType,
          total_items: totalItems,
          status: 'processing',
          started_at: new Date().toISOString(),
          metadata,
          created_by: user?.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data as Batch;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['batches', data.project_id] });
    },
    onError: (error) => {
      toast({
        title: 'Failed to create batch',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateBatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      batchId,
      updates,
    }: {
      batchId: string;
      updates: Partial<Batch>;
    }) => {
      const { data, error } = await supabase
        .from('batches')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', batchId)
        .select()
        .single();

      if (error) throw error;
      return data as Batch;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['batches', data.project_id] });
    },
  });
}

export function useCancelBatch() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (batchId: string) => {
      const { data, error } = await supabase
        .from('batches')
        .update({
          status: 'cancelled',
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', batchId)
        .select()
        .single();

      if (error) throw error;
      return data as Batch;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['batches', data.project_id] });
      toast({
        title: 'Batch cancelled',
        description: `${data.batch_type} batch has been cancelled.`,
      });
    },
    onError: (error) => {
      toast({
        title: 'Failed to cancel batch',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useBatchProgress(batchId: string | undefined) {
  return useQuery({
    queryKey: ['batch-progress', batchId],
    queryFn: async () => {
      if (!batchId) return null;
      
      const { data, error } = await supabase
        .rpc('get_batch_progress', { p_batch_id: batchId });

      if (error) throw error;
      return (data as BatchProgress[])?.[0] || null;
    },
    enabled: !!batchId,
    refetchInterval: 1000, // Poll every second during active batch
  });
}
