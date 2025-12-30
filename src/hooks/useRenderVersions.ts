import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  versionControlService, 
  RenderVersion, 
  CreateVersionInput, 
  VersionComparison,
  VersionHistory 
} from '@/services/features/versionControlService';
import { useToast } from '@/hooks/use-toast';

// Hook 1: Main hook for render versions with all mutations
export function useRenderVersions(roomId: string | undefined) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Query: Fetch all versions for a room
  const { data: versions = [], isLoading, error, refetch } = useQuery({
    queryKey: ['render-versions', roomId],
    queryFn: () => versionControlService.getRenderVersions(roomId!),
    enabled: !!roomId,
  });

  // Real-time subscription for version updates
  useEffect(() => {
    if (!roomId) return;
    
    const channel = supabase
      .channel(`render-versions-${roomId}`)
      .on(
        'postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'render_versions', 
          filter: `room_id=eq.${roomId}` 
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

  // Mutation 1: Create version
  const createVersion = useMutation({
    mutationFn: (input: CreateVersionInput) => versionControlService.createVersion(input),
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ['render-versions', roomId] }); 
      toast({ title: 'Version created successfully' }); 
    },
    onError: (e: Error) => toast({ 
      title: 'Failed to create version', 
      description: e.message, 
      variant: 'destructive' 
    }),
  });

  // Mutation 2: Approve version
  const approveVersion = useMutation({
    mutationFn: (id: string) => versionControlService.approveVersion(id),
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ['render-versions', roomId] }); 
      toast({ title: 'Version approved' }); 
    },
    onError: (e: Error) => toast({ 
      title: 'Failed to approve', 
      description: e.message, 
      variant: 'destructive' 
    }),
  });

  // Mutation 3: Mark as final
  const markAsFinal = useMutation({
    mutationFn: (id: string) => versionControlService.markAsFinal(id),
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ['render-versions', roomId] }); 
      toast({ title: 'Version set as final' }); 
    },
    onError: (e: Error) => toast({ 
      title: 'Failed to set as final', 
      description: e.message, 
      variant: 'destructive' 
    }),
  });

  // Mutation 4: Revert to version
  const revertToVersion = useMutation({
    mutationFn: (id: string) => versionControlService.revertToVersion(id),
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ['render-versions', roomId] }); 
      toast({ title: 'Version reverted - new version created' }); 
    },
    onError: (e: Error) => toast({ 
      title: 'Failed to revert', 
      description: e.message, 
      variant: 'destructive' 
    }),
  });

  // Mutation 5: Update notes
  const updateNotes = useMutation({
    mutationFn: ({ id, notes }: { id: string; notes: string }) => 
      versionControlService.updateNotes(id, notes),
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ['render-versions', roomId] }); 
      toast({ title: 'Notes updated' }); 
    },
    onError: (e: Error) => toast({ 
      title: 'Failed to update notes', 
      description: e.message, 
      variant: 'destructive' 
    }),
  });

  // Mutation 6: Add tags
  const addTags = useMutation({
    mutationFn: ({ id, tags }: { id: string; tags: string[] }) => 
      versionControlService.addTags(id, tags),
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ['render-versions', roomId] }); 
      toast({ title: 'Tags added' }); 
    },
    onError: (e: Error) => toast({ 
      title: 'Failed to add tags', 
      description: e.message, 
      variant: 'destructive' 
    }),
  });

  // Mutation 7: Rate version
  const rateVersion = useMutation({
    mutationFn: ({ id, rating }: { id: string; rating: number }) => 
      versionControlService.rateVersion(id, rating),
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ['render-versions', roomId] }); 
      toast({ title: 'Rating saved' }); 
    },
    onError: (e: Error) => toast({ 
      title: 'Failed to save rating', 
      description: e.message, 
      variant: 'destructive' 
    }),
  });

  // Mutation 8: Delete version
  const deleteVersion = useMutation({
    mutationFn: (id: string) => versionControlService.deleteVersion(id),
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ['render-versions', roomId] }); 
      toast({ title: 'Version deleted' }); 
    },
    onError: (e: Error) => toast({ 
      title: 'Failed to delete', 
      description: e.message, 
      variant: 'destructive' 
    }),
  });

  return {
    // Data
    versions,
    isLoading,
    error,
    refetch,
    
    // Computed
    versionCount: versions.length,
    finalVersion: versions.find(v => v.is_final),
    approvedVersions: versions.filter(v => v.is_approved),
    latestVersion: versions[0],
    
    // Mutations (all 8)
    createVersion: createVersion.mutate,
    approveVersion: approveVersion.mutate,
    markAsFinal: markAsFinal.mutate,
    revertToVersion: revertToVersion.mutate,
    updateNotes: (id: string, notes: string) => updateNotes.mutate({ id, notes }),
    addTags: (id: string, tags: string[]) => addTags.mutate({ id, tags }),
    rateVersion: (id: string, rating: number) => rateVersion.mutate({ id, rating }),
    deleteVersion: deleteVersion.mutate,
    
    // Loading states
    isCreating: createVersion.isPending,
    isApproving: approveVersion.isPending,
    isMarkingFinal: markAsFinal.isPending,
    isReverting: revertToVersion.isPending,
    isUpdatingNotes: updateNotes.isPending,
    isAddingTags: addTags.isPending,
    isRating: rateVersion.isPending,
    isDeleting: deleteVersion.isPending,
  };
}

// Hook 2: Compare two versions
export function useVersionComparison(v1Id?: string, v2Id?: string) {
  return useQuery<VersionComparison>({
    queryKey: ['version-comparison', v1Id, v2Id],
    queryFn: () => versionControlService.compareVersions(v1Id!, v2Id!),
    enabled: !!v1Id && !!v2Id,
  });
}

// Hook 3: Get version history with lineage
export function useVersionHistory(roomId: string | undefined) {
  return useQuery<VersionHistory>({
    queryKey: ['version-history', roomId],
    queryFn: () => versionControlService.getVersionHistory(roomId!),
    enabled: !!roomId,
  });
}

export type { RenderVersion, CreateVersionInput, VersionComparison, VersionHistory };
