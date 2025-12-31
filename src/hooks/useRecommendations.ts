/**
 * Recommendations Hooks
 * 
 * React hooks for managing AI recommendations including:
 * - Main recommendations hook with real-time updates
 * - Similar projects hook
 * - Trend analysis hook
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  recommendationService,
  type RoomContext,
  type AIRecommendation,
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
    mutationFn: () => recommendationService.generateStyleRecommendations(roomId!),
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
    mutationFn: () => recommendationService.generateFurniturePlacement(roomId!),
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
    mutationFn: () => recommendationService.generateBudgetAlternatives(roomId!),
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
    mutationFn: async ({ id, option }: { id: string; option: string }) => {
      const { error } = await supabase
        .from('ai_recommendations')
        .update({ was_accepted: true, selected_option: option })
        .eq('id', id);
      if (error) throw error;
    },
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
    mutationFn: async ({ id, reason }: { id: string; reason: string }) => {
      const { error } = await supabase
        .from('ai_recommendations')
        .update({ was_accepted: false, user_feedback: reason })
        .eq('id', id);
      if (error) throw error;
    },
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
      recommendationService.recordFeedback(feedback.recommendation_id, feedback),
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
// Placeholder - Similar projects functionality
// =====================================================

export interface SimilarProject {
  room_id: string;
  room_name: string;
  project_name: string;
  style: string;
  budget: number;
  final_image_url: string;
  similarity_score: number;
  matching_factors: string[];
  completion_date: string;
}

export function useSimilarProjects(roomId: string | undefined, limit: number = 5) {
  // Query: Fetch similar projects from similar_projects table
  const {
    data: similarProjects = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['similar-projects', roomId, limit],
    queryFn: async () => {
      if (!roomId) return [];
      
      const { data, error } = await supabase
        .from('similar_projects')
        .select('*')
        .eq('source_room_id', roomId)
        .order('similarity_score', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!roomId,
    staleTime: 30 * 60 * 1000,
  });

  const hasSimilarProjects = similarProjects.length > 0;
  const topSimilarProjects = similarProjects.slice(0, 3);

  return {
    similarProjects,
    topSimilarProjects,
    hasSimilarProjects,
    isLoading,
    error,
  };
}

// =====================================================
// HOOK 3: useTrendAnalysis
// Placeholder - Trend analysis functionality
// =====================================================

export function useTrendAnalysis(
  city: string | undefined,
  roomType: string | undefined
) {
  // Placeholder implementation
  const trendData: TrendAnalysis | null = null;
  
  return {
    trendData,
    globalTrends: [],
    hasTrendData: false,
    topTrendingStyle: null,
    risingStyles: [],
    decliningStyles: [],
    isLoading: false,
    error: null,
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
    staleTime: 5 * 60 * 1000,
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
    staleTime: 10 * 60 * 1000,
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

// Export types
export type {
  RoomContext,
  AIRecommendation,
  TrendAnalysis,
  RecommendationFeedback,
};
