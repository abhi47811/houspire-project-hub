// ============================================================================
// USE RENDER VERSIONS HOOK
// ============================================================================
// Purpose: React hook for managing render versions
// Location: src/hooks/useRenderVersions.ts
// ============================================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { versionControlService } from '@/services/features/versionControlService';
import { toast } from 'sonner';
import type { CreateVersionInput, RenderVersion } from '@/services/features/versionControlService';

export function useRenderVersions(roomId: string) {
  const queryClient = useQueryClient();

  // Query: Get all versions
  const {
    data: versions,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['render-versions', roomId],
    queryFn: () => versionControlService.getRenderVersions(roomId),
    enabled: !!roomId,
  });

  // Mutation: Create version
  const createVersionMutation = useMutation({
    mutationFn: (input: CreateVersionInput) =>
      versionControlService.createVersion(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['render-versions', roomId] });
      toast.success('New version created successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to create version: ${error.message}`);
    },
  });

  // Mutation: Approve version
  const approveVersionMutation = useMutation({
    mutationFn: (versionId: string) =>
      versionControlService.approveVersion(versionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['render-versions', roomId] });
      toast.success('Version approved');
    },
    onError: (error: Error) => {
      toast.error(`Failed to approve version: ${error.message}`);
    },
  });

  // Mutation: Mark as final
  const markAsFinalMutation = useMutation({
    mutationFn: (versionId: string) =>
      versionControlService.markAsFinal(versionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['render-versions', roomId] });
      toast.success('Marked as final version');
    },
    onError: (error: Error) => {
      toast.error(`Failed to mark as final: ${error.message}`);
    },
  });

  // Mutation: Revert to version
  const revertToVersionMutation = useMutation({
    mutationFn: (versionId: string) =>
      versionControlService.revertToVersion(versionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['render-versions', roomId] });
      toast.success('Reverted to previous version');
    },
    onError: (error: Error) => {
      toast.error(`Failed to revert: ${error.message}`);
    },
  });

  // Mutation: Update notes
  const updateNotesMutation = useMutation({
    mutationFn: ({ versionId, notes }: { versionId: string; notes: string }) =>
      versionControlService.updateNotes(versionId, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['render-versions', roomId] });
      toast.success('Notes updated');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update notes: ${error.message}`);
    },
  });

  // Mutation: Add tags
  const addTagsMutation = useMutation({
    mutationFn: ({ versionId, tags }: { versionId: string; tags: string[] }) =>
      versionControlService.addTags(versionId, tags),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['render-versions', roomId] });
      toast.success('Tags added');
    },
    onError: (error: Error) => {
      toast.error(`Failed to add tags: ${error.message}`);
    },
  });

  // Mutation: Rate version
  const rateVersionMutation = useMutation({
    mutationFn: ({ versionId, rating }: { versionId: string; rating: number }) =>
      versionControlService.rateVersion(versionId, rating),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['render-versions', roomId] });
      toast.success('Rating submitted');
    },
    onError: (error: Error) => {
      toast.error(`Failed to rate version: ${error.message}`);
    },
  });

  // Mutation: Delete version
  const deleteVersionMutation = useMutation({
    mutationFn: (versionId: string) =>
      versionControlService.deleteVersion(versionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['render-versions', roomId] });
      toast.success('Version deleted');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete version: ${error.message}`);
    },
  });

  // Derived data
  const latestVersion = versions?.[0];
  const approvedVersions = versions?.filter((v) => v.is_approved);
  const finalVersion = versions?.find((v) => v.is_final);
  const versionCount = versions?.length || 0;

  return {
    // Data
    versions,
    latestVersion,
    approvedVersions,
    finalVersion,
    versionCount,
    isLoading,
    error,

    // Actions
    createVersion: createVersionMutation.mutate,
    approveVersion: approveVersionMutation.mutate,
    markAsFinal: markAsFinalMutation.mutate,
    revertToVersion: revertToVersionMutation.mutate,
    updateNotes: updateNotesMutation.mutate,
    addTags: addTagsMutation.mutate,
    rateVersion: rateVersionMutation.mutate,
    deleteVersion: deleteVersionMutation.mutate,
    refetch,

    // Loading states
    isCreating: createVersionMutation.isPending,
    isApproving: approveVersionMutation.isPending,
    isMarking: markAsFinalMutation.isPending,
    isReverting: revertToVersionMutation.isPending,
    isUpdating: updateNotesMutation.isPending,
    isDeleting: deleteVersionMutation.isPending,
  };
}

// Hook for comparing versions
export function useVersionComparison(version1Id?: string, version2Id?: string) {
  return useQuery({
    queryKey: ['version-comparison', version1Id, version2Id],
    queryFn: () => {
      if (!version1Id || !version2Id) {
        throw new Error('Both version IDs are required');
      }
      return versionControlService.compareVersions(version1Id, version2Id);
    },
    enabled: !!version1Id && !!version2Id,
  });
}

// Hook for version history
export function useVersionHistory(versionId?: string) {
  return useQuery({
    queryKey: ['version-history', versionId],
    queryFn: () => {
      if (!versionId) {
        throw new Error('Version ID is required');
      }
      return versionControlService.getVersionHistory(versionId);
    },
    enabled: !!versionId,
  });
}
