/**
 * Recommendations Hooks
 * 
 * React hooks for managing AI recommendations including:
 * - Main recommendations hook with real-time updates
 * - Similar projects hook
 * - Trend analysis hook
 * 
 * Size Target: 8-10 KB | ~280-350 lines
 * Hooks: 3 hooks + 6 mutations required
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  recommendationService,
  type RoomContext,
  type AIRecommendation,
  type SimilarProject,
  type TrendAnalysis,
  type RecommendationFeedback,
} from '@/services/features/recommendationService';

// =====================================================
// HOOK 1: useRecommendations
// Main hook for fetching and managing recommendations
// =====================================================

export function useRecommendations(
  roomId: string | undefined,
  type?: 'style' | 'furniture_placement' | 'budget_optimization' | 'trend_analysis'
) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Query: Fetch recommendations
  const {
    data: recommendations = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['recommendations', roomId, type],
    queryFn: () => recommendationService.getRecommendations(roomId!, type),
    enabled: !!roomId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // Real-time subscription for recommendations
  useEffect(() => {
    if (!roomId) return;

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
        () => {
          queryClient.invalidateQueries({ queryKey: ['recommendations', roomId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, queryClient]);

  // Mutation 1: Generate style recommendations
  const generateStyles = useMutation({
    mutationFn: (context: RoomContext) =>
      recommendationService.generateStyleRecommendations(context),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recommendations', roomId] });
      toast({
        title: '✨ Style recommendations generated',
        description: 'AI has analyzed your room and suggested the best styles',
      });
    },
    onError: (e: Error) => {
      toast({
        title: '❌ Failed to generate recommendations',
        description: e.message,
        variant: 'destructive',
      });
    },
  });

  // Mutation 2: Generate furniture placement
  const generateFurniture = useMutation({
    mutationFn: (context: RoomContext) =>
      recommendationService.generateFurniturePlacement(context),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recommendations', roomId] });
      toast({
        title: '🛋️ Furniture suggestions generated',
        description: 'Optimal furniture placement has been calculated',
      });
    },
    onError: (e: Error) => {
      toast({
        title: '❌ Failed to generate furniture suggestions',
        description: e.message,
        variant: 'destructive',
      });
    },
  });

  // Mutation 3: Generate budget alternatives
  const generateBudgetAlternatives = useMutation({
    mutationFn: ({ context, items }: { context: RoomContext; items: any[] }) =>
      recommendationService.generateBudgetAlternatives(context, items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recommendations', roomId] });
      toast({
        title: '💰 Budget alternatives found',
        description: 'Cost-effective alternatives have been identified',
      });
    },
    onError: (e: Error) => {
      toast({
        title: '❌ Failed to find budget alternatives',
        description: e.message,
        variant: 'destructive',
      });
    },
  });

  // Mutation 4: Accept recommendation
  const acceptRecommendation = useMutation({
    mutationFn: ({ id, option }: { id: string; option: string }) =>
      recommendationService.acceptRecommendation(id, option),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recommendations', roomId] });
      toast({
        title: '✅ Recommendation accepted',
        description: 'Your selection has been saved',
      });
    },
    onError: (e: Error) => {
      toast({
        title: '❌ Failed to accept recommendation',
        description: e.message,
        variant: 'destructive',
      });
    },
  });

  // Mutation 5: Reject recommendation
  const rejectRecommendation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      recommendationService.rejectRecommendation(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recommendations', roomId] });
      toast({
        title: '🚫 Recommendation rejected',
        description: 'Your feedback has been recorded',
      });
    },
    onError: (e: Error) => {
      toast({
        title: '❌ Failed to reject recommendation',
        description: e.message,
        variant: 'destructive',
      });
    },
  });

  // Mutation 6: Submit feedback
  const submitFeedback = useMutation({
    mutationFn: (feedback: Omit<RecommendationFeedback, 'id' | 'created_at'>) =>
      recommendationService.submitFeedback(feedback),
    onSuccess: () => {
      toast({
        title: '📝 Feedback submitted',
        description: 'Thank you for helping us improve our recommendations',
      });
    },
    onError: (e: Error) => {
      toast({
        title: '❌ Failed to submit feedback',
        description: e.message,
        variant: 'destructive',
      });
    },
  });

  // Computed values
  const styleRecommendations = recommendations.filter(
    (r) => r.recommendation_type === 'style'
  );
  const furnitureRecommendations = recommendations.filter(
    (r) => r.recommendation_type === 'furniture_placement'
  );
  const budgetRecommendations = recommendations.filter(
    (r) => r.recommendation_type === 'budget_optimization'
  );
  const hasRecommendations = recommendations.length > 0;
  const hasStyleRecommendations = styleRecommendations.length > 0;
  const hasFurnitureRecommendations = furnitureRecommendations.length > 0;
  const hasBudgetRecommendations = budgetRecommendations.length > 0;

  return {
    // Data
    recommendations,
    styleRecommendations,
    furnitureRecommendations,
    budgetRecommendations,
    
    // Status flags
    hasRecommendations,
    hasStyleRecommendations,
    hasFurnitureRecommendations,
    hasBudgetRecommendations,
    isLoading,
    error,
    
    // Actions
    refetch,
    
    // Mutations
    generateStyles,
    generateFurniture,
    generateBudgetAlternatives,
    acceptRecommendation,
    rejectRecommendation,
    submitFeedback,
  };
}

// =====================================================
// HOOK 2: useSimilarProjects
// Fetch and manage similar project recommendations
// =====================================================

export function useSimilarProjects(roomId: string | undefined, limit: number = 5) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Query: Fetch similar projects
  const {
    data: similarProjects = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['similar-projects', roomId, limit],
    queryFn: () => recommendationService.findSimilarProjects(roomId!, limit),
    enabled: !!roomId,
    staleTime: 30 * 60 * 1000, // 30 minutes (similar projects don't change often)
    gcTime: 60 * 60 * 1000, // 1 hour
  });

  // Mutation: Refresh similar projects cache
  const refreshSimilar = useMutation({
    mutationFn: (roomId: string) =>
      recommendationService.refreshSimilarProjects(roomId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['similar-projects', roomId] });
      toast({
        title: '🔄 Similar projects refreshed',
        description: 'Updated list of similar projects is now available',
      });
    },
    onError: (e: Error) => {
      toast({
        title: '❌ Failed to refresh similar projects',
        description: e.message,
        variant: 'destructive',
      });
    },
  });

  // Computed values
  const hasSimilarProjects = similarProjects.length > 0;
  const topSimilarProjects = similarProjects.slice(0, 3); // Top 3 most similar

  return {
    similarProjects,
    topSimilarProjects,
    hasSimilarProjects,
    isLoading,
    error,
    refreshSimilar,
  };
}

// =====================================================
// HOOK 3: useTrendAnalysis
// Fetch trend analysis data for a city and room type
// =====================================================

export function useTrendAnalysis(
  city: string | undefined,
  roomType: string | undefined
) {
  const { toast } = useToast();

  // Query: Fetch trend analysis
  const {
    data: trendData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['trend-analysis', city, roomType],
    queryFn: () => recommendationService.getTrendAnalysis(city!, roomType!),
    enabled: !!city && !!roomType,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours (trends don't change rapidly)
    gcTime: 48 * 60 * 60 * 1000, // 48 hours
  });

  // Query: Fetch global trending styles
  const {
    data: globalTrends = [],
    isLoading: isLoadingGlobal,
  } = useQuery({
    queryKey: ['trending-styles'],
    queryFn: () => recommendationService.getTrendingStyles(),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    gcTime: 48 * 60 * 60 * 1000, // 48 hours
  });

  // Computed values
  const hasTrendData = !!trendData && trendData.popular_styles.length > 0;
  const topTrendingStyle = trendData?.popular_styles[0];
  const risingStyles = trendData?.popular_styles.filter(
    (s) => s.trend === 'rising'
  ) || [];
  const decliningStyles = trendData?.popular_styles.filter(
    (s) => s.trend === 'declining'
  ) || [];

  return {
    trendData,
    globalTrends,
    hasTrendData,
    topTrendingStyle,
    risingStyles,
    decliningStyles,
    isLoading: isLoading || isLoadingGlobal,
    error,
  };
}

// =====================================================
// UTILITY HOOK: useRecommendationById
// Fetch a single recommendation by ID
// =====================================================

export function useRecommendationById(recommendationId: string | undefined) {
  const {
    data: recommendation,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['recommendation', recommendationId],
    queryFn: () => recommendationService.getRecommendationById(recommendationId!),
    enabled: !!recommendationId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    recommendation,
    isLoading,
    error,
  };
}

// =====================================================
// UTILITY HOOK: usePotentialSavings
// Calculate potential savings from budget alternatives
// =====================================================

export function usePotentialSavings(roomId: string | undefined) {
  const {
    data: savings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['potential-savings', roomId],
    queryFn: () => recommendationService.calculatePotentialSavings(roomId!),
    enabled: !!roomId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  const hasSavings = (savings?.total_savings || 0) > 0;
  const formattedSavings = savings?.total_savings
    ? `₹${savings.total_savings.toLocaleString()}`
    : '₹0';

  return {
    savings,
    hasSavings,
    formattedSavings,
    isLoading,
    error,
  };
}

// Export all hooks
export type {
  RoomContext,
  AIRecommendation,
  SimilarProject,
  TrendAnalysis,
  RecommendationFeedback,
};
