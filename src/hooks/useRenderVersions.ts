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

  // Mutation: Approve version (uses current user from auth)
  const approveVersionMutation = useMutation({
    mutationFn: async (versionId: string) => {
      // Get current user for approval
      const { supabase } = await import('@/integrations/supabase/client');
      const { data: { user } } = await supabase.auth.getUser();
      return versionControlService.approveVersion(versionId, user?.id || '');
    },
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

  // Mutation: Update version (notes/tags/rating)
  const updateVersionMutation = useMutation({
    mutationFn: ({ versionId, updates }: { versionId: string; updates: Partial<{ notes: string; tags: string[]; user_rating: number }> }) =>
      versionControlService.updateVersion(versionId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['render-versions', roomId] });
      toast.success('Version updated');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update version: ${error.message}`);
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

  // Revert to version - creates a new version copying the old one
  const revertToVersion = (versionId: string) => {
    const targetVersion = versions?.find((v) => v.id === versionId);
    if (targetVersion) {
      createVersionMutation.mutate({
        room_id: roomId,
        render_url: targetVersion.render_url,
        storage_path: targetVersion.storage_path,
        prompt_used: targetVersion.prompt_used || undefined,
        style_config: (targetVersion.style_config as Record<string, unknown>) || {},
        generation_params: (targetVersion.generation_params as Record<string, unknown>) || {},
        notes: `Reverted to version ${targetVersion.version_number}`,
      });
    }
  };

  // Rate version helper
  const rateVersion = ({ versionId, rating }: { versionId: string; rating: number }) => {
    updateVersionMutation.mutate({ versionId, updates: { user_rating: rating } });
  };

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
    updateVersion: updateVersionMutation.mutate,
    deleteVersion: deleteVersionMutation.mutate,
    revertToVersion,
    rateVersion,
    refetch,

    // Loading states
    isCreating: createVersionMutation.isPending,
    isApproving: approveVersionMutation.isPending,
    isMarking: markAsFinalMutation.isPending,
    isUpdating: updateVersionMutation.isPending,
    isDeleting: deleteVersionMutation.isPending,
    isReverting: createVersionMutation.isPending, // Revert uses create mutation
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

// Hook for getting a single version by ID
export function useVersionById(versionId?: string) {
  return useQuery({
    queryKey: ['render-version', versionId],
    queryFn: () => {
      if (!versionId) {
        throw new Error('Version ID is required');
      }
      return versionControlService.getVersionById(versionId);
    },
    enabled: !!versionId,
  });
}
