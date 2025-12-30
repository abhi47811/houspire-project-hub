/**
 * F-021 & F-028: Architectural Preservation React Hook
 * 
 * React hook for managing architectural preservation in the UI.
 * Integrates with room analysis and render generation workflows.
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { architecturalPreservationService } from '@/services/features/architecturalPreservationService';
import { toast } from '@/hooks/use-toast';
import type {
  ArchitecturalAnalysis,
  PreservationRules,
} from '@/services/features/architecturalPreservationService';

export function useArchitecturalPreservation(roomId?: string) {
  const queryClient = useQueryClient();

  /**
   * Extract and save architectural elements from AI analysis
   */
  const extractElements = useMutation({
    mutationFn: async ({
      aiAnalysis,
    }: {
      aiAnalysis: any;
    }) => {
      if (!roomId) throw new Error('Room ID is required');

      const analysis = await architecturalPreservationService.extractArchitecturalElements(
        roomId,
        aiAnalysis
      );

      await architecturalPreservationService.saveArchitecturalAnalysis(analysis);

      return analysis;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['room', roomId] });
      queryClient.invalidateQueries({ queryKey: ['architectural-analysis', roomId] });

      toast({
        title: 'Architectural Elements Extracted',
        description: `Detected ${data.elements.length} architectural elements`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Extraction Failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  /**
   * Update preservation preferences
   */
  const updatePreferences = useMutation({
    mutationFn: async (preferences: {
      preserve_doors?: boolean;
      preserve_windows?: boolean;
      preserve_built_ins?: boolean;
    }) => {
      if (!roomId) throw new Error('Room ID is required');

      await architecturalPreservationService.updatePreservationPreferences(
        roomId,
        preferences
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['room', roomId] });
      queryClient.invalidateQueries({ queryKey: ['preservation-rules', roomId] });

      toast({
        title: 'Preferences Updated',
        description: 'Preservation settings have been saved',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Update Failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  /**
   * Get preservation prompt additions
   */
  const preservationPrompt = useQuery({
    queryKey: ['preservation-prompt', roomId],
    queryFn: async () => {
      if (!roomId) return '';
      return await architecturalPreservationService.getPreservationPrompt(roomId);
    },
    enabled: !!roomId,
  });

  /**
   * Validate render against preservation rules
   */
  const validateRender = useMutation({
    mutationFn: async (renderMetadata: any) => {
      if (!roomId) throw new Error('Room ID is required');

      return await architecturalPreservationService.validateRender(
        roomId,
        renderMetadata
      );
    },
    onSuccess: (result) => {
      if (result.warnings.length > 0) {
        toast({
          title: 'Preservation Warnings',
          description: (
            <div className="space-y-1">
              {result.warnings.map((warning, idx) => (
                <div key={idx} className="text-sm">
                  • {warning}
                </div>
              ))}
            </div>
          ),
        });
      }

      if (result.errors.length > 0) {
        toast({
          title: 'Preservation Errors',
          description: (
            <div className="space-y-1">
              {result.errors.map((error, idx) => (
                <div key={idx} className="text-sm">
                  • {error}
                </div>
              ))}
            </div>
          ),
          variant: 'destructive',
        });
      }
    },
  });

  return {
    // Mutations
    extractElements,
    updatePreferences,
    validateRender,

    // Queries
    preservationPrompt: preservationPrompt.data || '',
    isLoadingPrompt: preservationPrompt.isLoading,

    // States
    isExtracting: extractElements.isPending,
    isUpdating: updatePreferences.isPending,
    isValidating: validateRender.isPending,
  };
}
