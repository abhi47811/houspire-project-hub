/**
 * React Hook for Room Analysis
 * Provides easy access to AI-powered room analysis features
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from './use-toast';
import {
  roomAnalysisService,
  type RoomAnalysisResult,
} from '@/services/features/roomAnalysisService';

export function useRoomAnalysis(roomId?: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Mutation: Analyze room image
  const analyzeImage = useMutation({
    mutationFn: async ({ imageUrl }: { imageUrl: string }) => {
      if (!roomId) throw new Error('Room ID is required');
      return await roomAnalysisService.analyzeRoomImage(imageUrl, roomId);
    },
    onSuccess: async (data: RoomAnalysisResult) => {
      // Save analysis to database
      if (roomId) {
        await roomAnalysisService.saveRoomAnalysis(roomId, data);
      }

      // Invalidate room query to refresh data
      queryClient.invalidateQueries({ queryKey: ['room', roomId] });

      toast({
        title: 'Analysis Complete',
        description: `Detected: ${data.room_type.replace('_', ' ')} with ${data.confidence}% confidence`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Analysis Failed',
        description: error.message || 'Failed to analyze room image',
        variant: 'destructive',
      });
    },
  });

  return {
    analyzeImage,
    isAnalyzing: analyzeImage.isPending,
    analysisResult: analyzeImage.data,
    analysisError: analyzeImage.error,
  };
}
