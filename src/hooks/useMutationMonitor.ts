import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { flowTracker } from '@/components/debug/FlowTracker';

interface MutationLog {
  name: string;
  startTime: number;
  endTime?: number;
  status: 'pending' | 'success' | 'error';
  error?: string;
  variables?: unknown;
}

const mutationLogs: MutationLog[] = [];
const MAX_LOGS = 50;

export function useMutationMonitor() {
  const queryClient = useQueryClient();
  const isDev = import.meta.env.DEV;

  useEffect(() => {
    if (!isDev) return;

    const mutationCache = queryClient.getMutationCache();
    
    const unsubscribe = mutationCache.subscribe((event) => {
      if (!event.mutation) return;

      const mutation = event.mutation;
      const mutationKey = mutation.options.mutationKey;
      const mutationName = mutationKey 
        ? (Array.isArray(mutationKey) ? mutationKey.join('.') : String(mutationKey))
        : 'anonymous';

      switch (event.type) {
        case 'added': {
          const log: MutationLog = {
            name: mutationName,
            startTime: Date.now(),
            status: 'pending',
            variables: mutation.state.variables,
          };
          mutationLogs.unshift(log);
          if (mutationLogs.length > MAX_LOGS) mutationLogs.pop();
          
          // Track in FlowTracker
          const trackId = flowTracker.trackMutation(mutationName);
          (mutation as any).__flowTrackerId = trackId;
          
          console.log(`[Mutation] Started: ${mutationName}`, mutation.state.variables);
          break;
        }
        
        case 'updated': {
          const existingLog = mutationLogs.find(l => l.name === mutationName && l.status === 'pending');
          const trackId = (mutation as any).__flowTrackerId;
          
          if (mutation.state.status === 'success') {
            if (existingLog) {
              existingLog.status = 'success';
              existingLog.endTime = Date.now();
            }
            
            const duration = existingLog ? existingLog.endTime! - existingLog.startTime : undefined;
            if (trackId) flowTracker.success(trackId, duration);
            
            console.log(`[Mutation] Success: ${mutationName}`, {
              duration: duration ? `${duration}ms` : 'unknown',
              data: mutation.state.data,
            });
          } else if (mutation.state.status === 'error') {
            const errorMessage = mutation.state.error instanceof Error 
              ? mutation.state.error.message 
              : String(mutation.state.error);
            
            if (existingLog) {
              existingLog.status = 'error';
              existingLog.endTime = Date.now();
              existingLog.error = errorMessage;
            }
            
            if (trackId) flowTracker.error(trackId, errorMessage);
            
            console.error(`[Mutation] Failed: ${mutationName}`, {
              error: errorMessage,
              variables: mutation.state.variables,
            });
          }
          break;
        }
      }
    });

    return unsubscribe;
  }, [queryClient, isDev]);
}

// Export stats for debugging
export function getMutationStats() {
  const success = mutationLogs.filter(l => l.status === 'success').length;
  const failed = mutationLogs.filter(l => l.status === 'error').length;
  const pending = mutationLogs.filter(l => l.status === 'pending').length;
  
  const avgDuration = mutationLogs
    .filter(l => l.endTime)
    .reduce((sum, l) => sum + (l.endTime! - l.startTime), 0) / 
    (mutationLogs.filter(l => l.endTime).length || 1);

  return {
    total: mutationLogs.length,
    success,
    failed,
    pending,
    successRate: mutationLogs.length ? (success / mutationLogs.length * 100).toFixed(1) : '0',
    avgDuration: Math.round(avgDuration),
    recentFailures: mutationLogs.filter(l => l.status === 'error').slice(0, 5),
  };
}

export function getRecentMutationLogs() {
  return mutationLogs.slice(0, 20);
}
