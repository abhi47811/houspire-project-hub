import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface BulkOperationResult {
  success_count: number;
  total_count: number;
  operation_id: string;
}

interface VendorAssignResult {
  success_count: number;
  failed_count: number;
  total_count: number;
  operation_id: string;
}

export function useApproveAllAnalysis() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ projectId, userId }: { projectId: string; userId: string }) => {
      const { data, error } = await supabase
        .rpc('approve_all_analysis', {
          p_project_id: projectId,
          p_user_id: userId,
        });

      if (error) throw error;
      return data as BulkOperationResult[];
    },
    onSuccess: (data) => {
      const result = data[0];
      toast({
        title: 'Analysis Approved',
        description: `Successfully approved ${result.success_count} of ${result.total_count} rooms.`,
      });
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      queryClient.invalidateQueries({ queryKey: ['room-analysis'] });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useApplyStyleToAllRooms() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      projectId,
      designStyle,
      userId,
    }: {
      projectId: string;
      designStyle: string;
      userId: string;
    }) => {
      const { data, error } = await supabase
        .rpc('apply_style_to_all_rooms', {
          p_project_id: projectId,
          p_design_style: designStyle,
          p_user_id: userId,
        });

      if (error) throw error;
      return data as BulkOperationResult[];
    },
    onSuccess: (data, variables) => {
      const result = data[0];
      toast({
        title: 'Style Applied',
        description: `Applied "${variables.designStyle}" to ${result.success_count} rooms.`,
      });
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      queryClient.invalidateQueries({ queryKey: ['room-analysis'] });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useApproveAllBudgetItems() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      projectId,
      userId,
      category,
    }: {
      projectId: string;
      userId: string;
      category?: string;
    }) => {
      const { data, error } = await supabase
        .rpc('approve_all_budget_items', {
          p_project_id: projectId,
          p_user_id: userId,
          p_category: category || null,
        });

      if (error) throw error;
      return data as BulkOperationResult[];
    },
    onSuccess: (data, variables) => {
      const result = data[0];
      const categoryText = variables.category ? ` in ${variables.category}` : '';
      toast({
        title: 'Budget Items Approved',
        description: `Approved ${result.success_count} items${categoryText}.`,
      });
      queryClient.invalidateQueries({ queryKey: ['budget-items'] });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useAutoAssignBestVendors() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ projectId, userId }: { projectId: string; userId: string }) => {
      const { data, error } = await supabase
        .rpc('auto_assign_best_vendors', {
          p_project_id: projectId,
          p_user_id: userId,
        });

      if (error) throw error;
      return data as VendorAssignResult[];
    },
    onSuccess: (data) => {
      const result = data[0];
      toast({
        title: 'Vendors Assigned',
        description: `Assigned vendors to ${result.success_count} items. ${result.failed_count} items had no matches.`,
      });
      queryClient.invalidateQueries({ queryKey: ['budget-items'] });
      queryClient.invalidateQueries({ queryKey: ['vendor-matches'] });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}
