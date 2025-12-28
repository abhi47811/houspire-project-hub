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

export function useApproveAllCleaned() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ projectId, roomIds }: { projectId: string; roomIds: string[] }) => {
      const { error } = await supabase
        .from('rooms')
        .update({ phase_3_completed: true })
        .in('id', roomIds);

      if (error) throw error;
      return { success_count: roomIds.length, total_count: roomIds.length };
    },
    onSuccess: (data) => {
      toast({
        title: 'Cleanup Approved',
        description: `Successfully approved ${data.success_count} cleaned rooms.`,
      });
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
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

export function useBulkGenerateRenders() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ roomIds }: { roomIds: string[] }) => {
      // Trigger generation for all rooms in parallel
      const results = await Promise.allSettled(
        roomIds.map(roomId =>
          supabase.functions.invoke('generate-ai', {
            body: { roomId },
          })
        )
      );

      const successCount = results.filter(r => r.status === 'fulfilled').length;
      const failedCount = results.filter(r => r.status === 'rejected').length;

      return { success_count: successCount, failed_count: failedCount, total_count: roomIds.length };
    },
    onSuccess: (data) => {
      toast({
        title: 'Generation Started',
        description: `Started generation for ${data.success_count} rooms. ${data.failed_count > 0 ? `${data.failed_count} failed.` : ''}`,
      });
      queryClient.invalidateQueries({ queryKey: ['renders'] });
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
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

export function useBulkDownloadRenders() {
  return useMutation({
    mutationFn: async ({ roomIds, projectName }: { roomIds: string[]; projectName: string }) => {
      // Dynamically import jszip and file-saver
      const [JSZip, { saveAs }] = await Promise.all([
        import('jszip').then(m => m.default),
        import('file-saver'),
      ]);

      // Fetch all approved renders for selected rooms
      const { data: renders, error } = await supabase
        .from('renders')
        .select('id, room_id, image_url')
        .in('room_id', roomIds)
        .eq('approval_status', 'approved');

      if (error) throw error;

      if (!renders || renders.length === 0) {
        throw new Error('No approved renders found for selected rooms.');
      }

      // Create ZIP file
      const zip = new JSZip();

      for (const render of renders) {
        try {
          const response = await fetch(render.image_url);
          if (!response.ok) continue;
          const blob = await response.blob();
          const extension = render.image_url.split('.').pop()?.split('?')[0] || 'jpg';
          zip.file(`${render.room_id}_${render.id}.${extension}`, blob);
        } catch {
          // Skip failed downloads
        }
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      saveAs(zipBlob, `${projectName}-renders.zip`);

      return { downloaded_count: renders.length };
    },
    onSuccess: (data) => {
      toast({
        title: 'Download Complete',
        description: `Downloaded ${data.downloaded_count} renders.`,
      });
    },
    onError: (error) => {
      toast({
        title: 'Download Failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}
