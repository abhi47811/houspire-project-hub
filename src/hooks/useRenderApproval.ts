import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'

interface UseRenderApprovalProps {
  onSuccess?: () => void
}

export function useRenderApproval({ onSuccess }: UseRenderApprovalProps = {}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ renderId, projectId, roomId }: { 
      renderId: string
      projectId: string
      roomId: string
    }) => {
      console.log('🎯 Approving render and triggering budget extraction:', { renderId, projectId, roomId })

      // 1. Update render status to approved
      const { error: updateError } = await supabase
        .from('renders')
        .update({ 
          status: 'approved',
          approved_at: new Date().toISOString()
        })
        .eq('id', renderId)

      if (updateError) {
        console.error('❌ Error updating render status:', updateError)
        throw updateError
      }

      console.log('✅ Render status updated to approved')

      // 2. Trigger AI budget extraction (Edge Function)
      toast.info('Starting budget extraction... This may take 30-60 seconds', {
        duration: 5000
      })

      const { data, error: functionError } = await supabase.functions.invoke('extract-budget-items', {
        body: { 
          render_id: renderId,
          project_id: projectId,
          room_id: roomId
        }
      })

      if (functionError) {
        console.error('❌ Error invoking extract-budget-items function:', functionError)
        throw functionError
      }

      console.log('✅ Budget extraction completed:', data)

      return data
    },
    onSuccess: (data) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['renders'] })
      queryClient.invalidateQueries({ queryKey: ['budget-items'] })
      
      toast.success(
        `Render approved! ${data?.items_extracted || 0} items extracted. ${data?.items_matched || 0} matched to pricing database.`,
        { duration: 5000 }
      )

      if (onSuccess) onSuccess()
    },
    onError: (error: any) => {
      console.error('❌ Render approval failed:', error)
      toast.error(`Failed to approve render: ${error.message}`)
    }
  })
}
