import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { versionControlService, RenderVersion, CreateVersionInput } from '@/services/features/versionControlService';
import { useToast } from '@/hooks/use-toast';

export function useRenderVersions(roomId: string | undefined) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: versions = [], isLoading, error, refetch } = useQuery({
    queryKey: ['render-versions', roomId],
    queryFn: () => versionControlService.getRenderVersions(roomId!),
    enabled: !!roomId,
  });

  useEffect(() => {
    if (!roomId) return;
    const channel = supabase
      .channel(`render-versions-${roomId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'render_versions', filter: `room_id=eq.${roomId}` },
        () => queryClient.invalidateQueries({ queryKey: ['render-versions', roomId] })
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [roomId, queryClient]);

  const createVersion = useMutation({
    mutationFn: (input: CreateVersionInput) => versionControlService.createVersion(input),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['render-versions', roomId] }); toast({ title: 'Version created' }); },
    onError: (e: Error) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  const approveVersion = useMutation({
    mutationFn: (id: string) => versionControlService.approveVersion(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['render-versions', roomId] }); toast({ title: 'Version approved' }); },
    onError: (e: Error) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  const markAsFinal = useMutation({
    mutationFn: (id: string) => versionControlService.markAsFinal(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['render-versions', roomId] }); toast({ title: 'Set as final' }); },
    onError: (e: Error) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  const revertToVersion = useMutation({
    mutationFn: (id: string) => versionControlService.revertToVersion(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['render-versions', roomId] }); toast({ title: 'Version reverted' }); },
    onError: (e: Error) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  const updateNotes = useMutation({
    mutationFn: ({ id, notes }: { id: string; notes: string }) => versionControlService.updateNotes(id, notes),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['render-versions', roomId] }),
  });

  const addTags = useMutation({
    mutationFn: ({ id, tags }: { id: string; tags: string[] }) => versionControlService.addTags(id, tags),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['render-versions', roomId] }),
  });

  const rateVersion = useMutation({
    mutationFn: ({ id, rating }: { id: string; rating: number }) => versionControlService.rateVersion(id, rating),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['render-versions', roomId] }),
  });

  const deleteVersion = useMutation({
    mutationFn: (id: string) => versionControlService.deleteVersion(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['render-versions', roomId] }); toast({ title: 'Version deleted' }); },
    onError: (e: Error) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  return {
    versions,
    isLoading,
    error,
    refetch,
    versionCount: versions.length,
    finalVersion: versions.find(v => v.is_final),
    approvedVersions: versions.filter(v => v.is_approved),
    latestVersion: versions[0],
    createVersion: createVersion.mutate,
    approveVersion: approveVersion.mutate,
    markAsFinal: markAsFinal.mutate,
    revertToVersion: revertToVersion.mutate,
    updateNotes: (id: string, notes: string) => updateNotes.mutate({ id, notes }),
    addTags: (id: string, tags: string[]) => addTags.mutate({ id, tags }),
    rateVersion: (id: string, rating: number) => rateVersion.mutate({ id, rating }),
    deleteVersion: deleteVersion.mutate,
  };
}

export function useVersionComparison(v1Id?: string, v2Id?: string) {
  return useQuery({
    queryKey: ['version-comparison', v1Id, v2Id],
    queryFn: () => versionControlService.compareVersions(v1Id!, v2Id!),
    enabled: !!v1Id && !!v2Id,
  });
}

export type { RenderVersion };
