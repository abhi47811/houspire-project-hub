/**
 * Smart AI Recommendations Hooks
 * Feature 2: React hooks for recommendations, similar projects, and trends
 * 
 * 3 hooks | 6 mutations | ~280-350 lines
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
  recommendationService,
  AIRecommendation,
  RoomContext,
  SimilarProject,
  TrendAnalysis,
  RecommendationFeedback,
} from "@/services/features/recommendationService";

// ============================================
// HOOK 1: useRecommendations
// Main hook for fetching and managing recommendations
// ============================================

interface UseRecommendationsOptions {
  roomId: string;
  type?: AIRecommendation['recommendation_type'];
  enabled?: boolean;
}

interface UseRecommendationsResult {
  recommendations: AIRecommendation[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  // Mutations
  generateStyles: ReturnType<typeof useMutation<AIRecommendation | null, Error, RoomContext>>;
  generateFurniture: ReturnType<typeof useMutation<AIRecommendation | null, Error, RoomContext>>;
  acceptRecommendation: ReturnType<typeof useMutation<boolean, Error, { id: string; option?: string }>>;
  rejectRecommendation: ReturnType<typeof useMutation<boolean, Error, { id: string; reason?: string }>>;
  submitFeedback: ReturnType<typeof useMutation<RecommendationFeedback | null, Error, Omit<RecommendationFeedback, 'id' | 'created_at'>>>;
}

export function useRecommendations({
  roomId,
  type,
  enabled = true,
}: UseRecommendationsOptions): UseRecommendationsResult {
  const queryClient = useQueryClient();
  const queryKey = ['recommendations', roomId, type];

  // Main query
  const {
    data: recommendations = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: async () => {
      const { data, error } = await recommendationService.getRecommendations(roomId, type);
      if (error) throw error;
      return data || [];
    },
    enabled: enabled && !!roomId,
    staleTime: 30000, // 30 seconds
  });

  // Real-time subscription
  useEffect(() => {
    if (!roomId || !enabled) return;

    const channel = supabase
      .channel(`recommendations-${roomId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ai_recommendations',
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          console.log('📡 Recommendation update:', payload.eventType);
          queryClient.invalidateQueries({ queryKey });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, enabled, queryClient, queryKey]);

  // Mutation 1: Generate style recommendations
  const generateStyles = useMutation({
    mutationFn: async (roomContext: RoomContext) => {
      const { data, error } = await recommendationService.generateStyleRecommendations(roomContext);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Style Recommendations Generated",
        description: "AI has generated personalized style recommendations for your room.",
      });
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error) => {
      toast({
        title: "Failed to Generate Styles",
        description: error.message || "Could not generate style recommendations. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Mutation 2: Generate furniture placement
  const generateFurniture = useMutation({
    mutationFn: async (roomContext: RoomContext) => {
      const { data, error } = await recommendationService.generateFurniturePlacement(roomContext);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Furniture Layout Generated",
        description: "AI has suggested an optimal furniture arrangement.",
      });
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error) => {
      toast({
        title: "Failed to Generate Layout",
        description: error.message || "Could not generate furniture placement. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Mutation 3: Accept recommendation
  const acceptRecommendation = useMutation({
    mutationFn: async ({ id, option }: { id: string; option?: string }) => {
      const { success, error } = await recommendationService.acceptRecommendation(id, option);
      if (error) throw error;
      return success;
    },
    onSuccess: () => {
      toast({
        title: "Recommendation Accepted",
        description: "Your selection has been saved.",
      });
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error) => {
      toast({
        title: "Failed to Accept",
        description: error.message || "Could not save your selection.",
        variant: "destructive",
      });
    },
  });

  // Mutation 4: Reject recommendation
  const rejectRecommendation = useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason?: string }) => {
      const { success, error } = await recommendationService.rejectRecommendation(id, reason);
      if (error) throw error;
      return success;
    },
    onSuccess: () => {
      toast({
        title: "Recommendation Rejected",
        description: "Your feedback has been recorded.",
      });
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error) => {
      toast({
        title: "Failed to Reject",
        description: error.message || "Could not save your feedback.",
        variant: "destructive",
      });
    },
  });

  // Mutation 5: Submit feedback
  const submitFeedback = useMutation({
    mutationFn: async (feedback: Omit<RecommendationFeedback, 'id' | 'created_at'>) => {
      const { data, error } = await recommendationService.submitFeedback(feedback);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Feedback Submitted",
        description: "Thank you for helping us improve!",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to Submit Feedback",
        description: error.message || "Could not submit your feedback.",
        variant: "destructive",
      });
    },
  });

  return {
    recommendations,
    isLoading,
    error: error as Error | null,
    refetch,
    generateStyles,
    generateFurniture,
    acceptRecommendation,
    rejectRecommendation,
    submitFeedback,
  };
}

// ============================================
// HOOK 2: useSimilarProjects
// Hook for finding similar projects
// ============================================

interface UseSimilarProjectsOptions {
  roomId: string;
  limit?: number;
  enabled?: boolean;
}

interface UseSimilarProjectsResult {
  similarProjects: SimilarProject[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  // Mutation 6
  refreshSimilar: ReturnType<typeof useMutation<SimilarProject[] | null, Error, void>>;
}

export function useSimilarProjects({
  roomId,
  limit = 10,
  enabled = true,
}: UseSimilarProjectsOptions): UseSimilarProjectsResult {
  const queryClient = useQueryClient();
  const queryKey = ['similar-projects', roomId, limit];

  const {
    data: similarProjects = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: async () => {
      const { data, error } = await recommendationService.findSimilarProjects(roomId, limit);
      if (error) throw error;
      return data || [];
    },
    enabled: enabled && !!roomId,
    staleTime: 60000, // 1 minute
  });

  // Mutation 6: Refresh similar projects
  const refreshSimilar = useMutation({
    mutationFn: async () => {
      const { data, error } = await recommendationService.refreshSimilarProjects(roomId);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Similar Projects Refreshed",
        description: "Found updated similar projects for your room.",
      });
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error) => {
      toast({
        title: "Failed to Refresh",
        description: error.message || "Could not refresh similar projects.",
        variant: "destructive",
      });
    },
  });

  return {
    similarProjects,
    isLoading,
    error: error as Error | null,
    refetch,
    refreshSimilar,
  };
}

// ============================================
// HOOK 3: useTrendAnalysis
// Hook for fetching trend data
// ============================================

interface UseTrendAnalysisOptions {
  city?: string;
  roomType?: string;
  enabled?: boolean;
}

interface UseTrendAnalysisResult {
  trendData: TrendAnalysis | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useTrendAnalysis({
  city,
  roomType,
  enabled = true,
}: UseTrendAnalysisOptions): UseTrendAnalysisResult {
  const queryKey = ['trend-analysis', city, roomType];

  const {
    data: trendData = null,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: async () => {
      const { data, error } = await recommendationService.getTrendAnalysis(city, roomType);
      if (error) throw error;
      return data;
    },
    enabled,
    staleTime: 300000, // 5 minutes
  });

  return {
    trendData,
    isLoading,
    error: error as Error | null,
    refetch,
  };
}

// ============================================
// ADDITIONAL UTILITY HOOKS
// ============================================

/**
 * Hook for getting trending styles globally
 */
export function useTrendingStyles(enabled = true) {
  return useQuery({
    queryKey: ['trending-styles'],
    queryFn: async () => {
      const { data, error } = await recommendationService.getTrendingStyles();
      if (error) throw error;
      return data || [];
    },
    enabled,
    staleTime: 300000, // 5 minutes
  });
}

/**
 * Hook for generating budget alternatives
 */
export function useBudgetOptimization(roomId: string) {
  const queryClient = useQueryClient();

  const generateBudgetAlternatives = useMutation({
    mutationFn: async ({
      roomContext,
      budgetItems,
    }: {
      roomContext: RoomContext;
      budgetItems: Array<{ name: string; category: string; cost: number; specification?: string }>;
    }) => {
      const { data, error } = await recommendationService.generateBudgetAlternatives(
        roomContext,
        budgetItems
      );
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Budget Optimized",
        description: "AI has found cost-saving alternatives for your budget.",
      });
      queryClient.invalidateQueries({ queryKey: ['recommendations', roomId, 'budget'] });
    },
    onError: (error) => {
      toast({
        title: "Failed to Optimize Budget",
        description: error.message || "Could not generate budget alternatives.",
        variant: "destructive",
      });
    },
  });

  const calculateSavings = useQuery({
    queryKey: ['potential-savings', roomId],
    queryFn: async () => {
      const { data, error } = await recommendationService.calculatePotentialSavings(roomId);
      if (error) throw error;
      return data;
    },
    enabled: !!roomId,
    staleTime: 60000,
  });

  return {
    generateBudgetAlternatives,
    potentialSavings: calculateSavings.data,
    isCalculatingSavings: calculateSavings.isLoading,
  };
}

// Export all hooks
export default {
  useRecommendations,
  useSimilarProjects,
  useTrendAnalysis,
  useTrendingStyles,
  useBudgetOptimization,
};
