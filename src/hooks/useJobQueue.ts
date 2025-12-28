import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Job {
  id: string;
  job_type: 'analysis' | 'cleaning' | 'generation' | 'upscale' | 'validation';
  room_id: string;
  project_id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  priority: number;
  retry_count: number;
  max_retries: number;
  error_message: string | null;
  payload: Record<string, any>;
  result: Record<string, any> | null;
  scheduled_at: string;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

interface JobSummary {
  total: number;
  pending: number;
  processing: number;
  completed: number;
  failed: number;
}

interface UseJobQueueOptions {
  projectId?: string;
  roomId?: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export function useJobQueue(options: UseJobQueueOptions = {}) {
  const { projectId, roomId, autoRefresh = true, refreshInterval = 5000 } = options;
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Query jobs for a project or room
  const { data: jobs, isLoading, refetch } = useQuery({
    queryKey: ['jobs', projectId, roomId],
    queryFn: async () => {
      let query = supabase
        .from('job_queue')
        .select('*')
        .order('created_at', { ascending: false });

      if (projectId) {
        query = query.eq('project_id', projectId);
      }
      if (roomId) {
        query = query.eq('room_id', roomId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Job[];
    },
    enabled: !!(projectId || roomId),
    refetchInterval: autoRefresh ? refreshInterval : false,
  });

  // Calculate summary
  const summary: JobSummary = {
    total: jobs?.length || 0,
    pending: jobs?.filter(j => j.status === 'pending').length || 0,
    processing: jobs?.filter(j => j.status === 'processing').length || 0,
    completed: jobs?.filter(j => j.status === 'completed').length || 0,
    failed: jobs?.filter(j => j.status === 'failed').length || 0,
  };

  // Set up realtime subscription
  useEffect(() => {
    if (!projectId && !roomId) return;

    const channel = supabase
      .channel('job-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'job_queue',
          filter: projectId ? `project_id=eq.${projectId}` : `room_id=eq.${roomId}`,
        },
        (payload) => {
          console.log('Job update:', payload);
          queryClient.invalidateQueries({ queryKey: ['jobs', projectId, roomId] });
          
          // Show toast for completed/failed jobs
          if (payload.eventType === 'UPDATE') {
            const newJob = payload.new as Job;
            if (newJob.status === 'completed') {
              toast({
                title: 'Job Completed',
                description: `${newJob.job_type} completed successfully`,
              });
            } else if (newJob.status === 'failed') {
              toast({
                title: 'Job Failed',
                description: newJob.error_message || 'Unknown error',
                variant: 'destructive',
              });
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId, roomId, queryClient, toast]);

  // Submit a single job
  const submitJob = useMutation({
    mutationFn: async ({ 
      roomId, 
      projectId, 
      phase, 
      payload 
    }: { 
      roomId: string; 
      projectId: string; 
      phase: number; 
      payload?: Record<string, any>;
    }) => {
      const { data, error } = await supabase.functions.invoke('process-room-phase', {
        body: {
          action: 'submit',
          roomId,
          projectId,
          phase,
          payload,
        },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({
        title: 'Job Submitted',
        description: 'Processing has started',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Submit bulk jobs for all rooms in a project
  const submitBulkJobs = useMutation({
    mutationFn: async ({ 
      projectId, 
      phase, 
      payload 
    }: { 
      projectId: string; 
      phase: number; 
      payload?: Record<string, any>;
    }) => {
      const { data, error } = await supabase.functions.invoke('process-room-phase', {
        body: {
          action: 'submitBulk',
          projectId,
          phase,
          payload,
        },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({
        title: 'Bulk Jobs Submitted',
        description: `${data.jobCount} jobs queued for processing`,
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Retry a failed job
  const retryJob = useMutation({
    mutationFn: async (jobId: string) => {
      const { data, error } = await supabase.functions.invoke('process-room-phase', {
        body: {
          action: 'retry',
          jobId,
        },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({
        title: 'Job Queued',
        description: 'Job has been queued for retry',
      });
    },
  });

  // Cancel a job
  const cancelJob = useMutation({
    mutationFn: async (jobId: string) => {
      const { data, error } = await supabase.functions.invoke('process-room-phase', {
        body: {
          action: 'cancel',
          jobId,
        },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({
        title: 'Job Cancelled',
        description: 'Job has been cancelled',
      });
    },
  });

  return {
    jobs,
    summary,
    isLoading,
    refetch,
    submitJob,
    submitBulkJobs,
    retryJob,
    cancelJob,
  };
}

// Hook for a single room's job status
export function useRoomJobStatus(roomId: string, jobType?: string) {
  const { jobs, isLoading } = useJobQueue({ roomId });

  const latestJob = jobs?.find(j => !jobType || j.job_type === jobType);

  const status = latestJob?.status;
  const errorMessage = latestJob?.error_message || null;

  const isProcessing =
    status === 'processing' || (status === 'pending' && !errorMessage);

  const hasCompleted = status === 'completed';
  const hasFailed = status === 'failed' || (status === 'pending' && !!errorMessage);

  return {
    job: latestJob,
    isProcessing,
    hasCompleted,
    hasFailed,
    errorMessage,
    isLoading,
  };
}

// Hook for project-wide job progress
export function useProjectJobProgress(projectId: string, phase?: number) {
  const { jobs, summary, isLoading, submitBulkJobs } = useJobQueue({ projectId });

  const jobType = phase === 2 ? 'analysis' : phase === 3 ? 'cleaning' : phase === 5 ? 'generation' : undefined;
  
  const phaseJobs = jobType ? jobs?.filter(j => j.job_type === jobType) : jobs;
  
  const phaseSummary = {
    total: phaseJobs?.length || 0,
    pending: phaseJobs?.filter(j => j.status === 'pending').length || 0,
    processing: phaseJobs?.filter(j => j.status === 'processing').length || 0,
    completed: phaseJobs?.filter(j => j.status === 'completed').length || 0,
    failed: phaseJobs?.filter(j => j.status === 'failed').length || 0,
  };

  const progress = phaseSummary.total > 0 
    ? Math.round((phaseSummary.completed / phaseSummary.total) * 100) 
    : 0;

  const isProcessing = phaseSummary.pending > 0 || phaseSummary.processing > 0;

  return {
    jobs: phaseJobs,
    summary: phaseSummary,
    progress,
    isProcessing,
    isLoading,
    startBulkProcessing: (payload?: Record<string, any>) => {
      if (phase) {
        submitBulkJobs.mutate({ projectId, phase, payload });
      }
    },
    isStarting: submitBulkJobs.isPending,
  };
}
