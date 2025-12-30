/**
 * F-069 to F-073: Budget Management React Hook
 * 
 * React hook for managing budget calculations, tier selection,
 * and cost estimations in the UI.
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  generateBudgetFromSmartDefaults,
  saveBudget,
  getBudget,
  calculateItemCost,
  compareBudgetTiers,
  type BudgetSummary,
  type BudgetTier,
} from '@/services/features/budgetService';
import { toast } from '@/hooks/use-toast';

export function useBudget(roomId?: string) {
  const queryClient = useQueryClient();

  /**
   * Fetch existing budget for room
   */
  const budget = useQuery({
    queryKey: ['budget', roomId],
    queryFn: async () => {
      if (!roomId) return null;
      return await getBudget(roomId);
    },
    enabled: !!roomId,
  });

  /**
   * Generate budget from smart defaults
   */
  const generateBudget = useMutation({
    mutationFn: async ({
      smartDefaultId,
      tier,
      city,
      roomArea,
    }: {
      smartDefaultId: string;
      tier: BudgetTier;
      city: string;
      roomArea: number;
    }) => {
      if (!roomId) throw new Error('Room ID is required');

      const budgetSummary = await generateBudgetFromSmartDefaults(
        roomId,
        smartDefaultId,
        tier,
        city,
        roomArea
      );

      await saveBudget(budgetSummary);

      return budgetSummary;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['budget', roomId] });

      toast({
        title: 'Budget Generated',
        description: `Total cost: ₹${data.total_cost.toLocaleString('en-IN')} (${data.items.length} items)`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Budget Generation Failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  /**
   * Update budget tier
   */
  const updateBudgetTier = useMutation({
    mutationFn: async ({
      newTier,
      city,
    }: {
      newTier: BudgetTier;
      city: string;
    }) => {
      const currentBudget = budget.data;
      if (!currentBudget) throw new Error('No budget found');

      // Recalculate all items with new tier
      const updatedItems = currentBudget.items.map((item) => {
        const costs = calculateItemCost(
          item.base_cost,
          newTier,
          city,
          item.category,
          item.quantity
        );

        return {
          ...item,
          tier_multiplier: newTier === 'premium' ? 2.5 : newTier === 'mid_range' ? 1.0 : 0.5,
          cost_before_gst: costs.cost_before_gst,
          gst_amount: costs.gst_amount,
          total_cost: costs.total_cost,
        };
      });

      const subtotal = updatedItems.reduce((sum, item) => sum + item.cost_before_gst, 0);
      const totalGST = updatedItems.reduce((sum, item) => sum + item.gst_amount, 0);
      const totalCost = updatedItems.reduce((sum, item) => sum + item.total_cost, 0);

      const updatedBudget: BudgetSummary = {
        ...currentBudget,
        budget_tier: newTier,
        items: updatedItems,
        subtotal,
        total_gst: totalGST,
        total_cost: totalCost,
        updated_at: new Date().toISOString(),
      };

      await saveBudget(updatedBudget);

      return updatedBudget;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['budget', roomId] });

      toast({
        title: 'Budget Tier Updated',
        description: `New total: ₹${data.total_cost.toLocaleString('en-IN')}`,
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
   * Compare budget across tiers
   */
  const getBudgetComparison = (
    baseCost: number,
    city: string,
    category: string
  ) => {
    return compareBudgetTiers(baseCost, city, category);
  };

  return {
    // Queries
    budget: budget.data,
    isLoading: budget.isLoading,
    error: budget.error,

    // Mutations
    generateBudget,
    updateBudgetTier,

    // Utilities
    getBudgetComparison,

    // States
    isGenerating: generateBudget.isPending,
    isUpdating: updateBudgetTier.isPending,
  };
}
