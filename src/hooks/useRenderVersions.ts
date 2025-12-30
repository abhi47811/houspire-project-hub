import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { versionControlService, RenderVersion } from '@/services/features/versionControlService';
import { useToast } from '@/hooks/use-toast';

export function useRenderVersions(roomId: string | undefined) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch all versions for the room
  const {
    data: versions = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['render-versions', roomId],
    queryFn: () => versionControlService.getVersions(roomId!),
    enabled: !!roomId,
  });

  // Real-time subscription for render updates
  useEffect(() => {
    if (!roomId) return;

    const channel = supabase
      .channel(`render-versions-${roomId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'renders',
          filter: `room_id=eq.${roomId}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['render-versions', roomId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, queryClient]);

  // Set version as final
  const setAsFinal = useMutation({
    mutationFn: (versionId: string) => 
      versionControlService.setAsFinal(versionId, roomId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['render-versions', roomId] });
      toast({ title: 'Version set as final' });
    },
    onError: (error: Error) => {
      toast({ 
        title: 'Error', 
        description: error.message, 
        variant: 'destructive' 
      });
    },
  });

  // Delete version
  const deleteVersion = useMutation({
    mutationFn: (versionId: string) => 
      versionControlService.deleteVersion(versionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['render-versions', roomId] });
      toast({ title: 'Version deleted' });
    },
    onError: (error: Error) => {
      toast({ 
        title: 'Error', 
        description: error.message, 
        variant: 'destructive' 
      });
    },
  });

  // Restore version
  const restoreVersion = useMutation({
    mutationFn: (versionId: string) => 
      versionControlService.restoreVersion(versionId, roomId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['render-versions', roomId] });
      toast({ title: 'Version restored as new render' });
    },
    onError: (error: Error) => {
      toast({ 
        title: 'Error', 
        description: error.message, 
        variant: 'destructive' 
      });
    },
  });

  // Get the final/approved version
  const finalVersion = versions.find(v => v.is_final);

  // Get versions count
  const versionCount = versions.length;

  return {
    versions,
    isLoading,
    error,
    refetch,
    setAsFinal,
    deleteVersion,
    restoreVersion,
    finalVersion,
    versionCount,
  };
}

export type { RenderVersion };
