// Bulk Operations Service for HOUSPIRE
// Handles batch processing of multiple rooms

import { supabase } from '@/integrations/supabase/client';

export interface BulkRoomOperation {
  projectId: string;
  roomIds: string[];
  operation: 'generate' | 'clean' | 'approve' | 'export';
  options?: {
    style?: string;
    smartDefaultId?: string;
    customRequirements?: string;
  };
}

export interface BulkOperationProgress {
  total: number;
  completed: number;
  failed: number;
  inProgress: number;
  results: Array<{
    roomId: string;
    roomName: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    error?: string;
    result?: any;
  }>;
}

/**
 * Start a bulk operation on multiple rooms
 * Uses the bulk_operations table which has: operation_type enum, affected_rooms array, 
 * total_count, success_count, failed_count
 */
export async function startBulkOperation(
  operation: BulkRoomOperation
): Promise<{ success: boolean; jobId: string; error?: string }> {
  try {
    console.log(`🔄 Starting bulk ${operation.operation} for ${operation.roomIds.length} rooms`);

    // Map our operation type to the enum values in bulk_operations
    const operationTypeMap: Record<string, string> = {
      generate: 'apply_style_to_all',
      clean: 'approve_all_analysis',
      approve: 'approve_all_budget_items',
      export: 'auto_assign_best_vendors',
    };

    const operationType = operationTypeMap[operation.operation] || 'apply_style_to_all';

    // Create bulk operation record
    const { data: bulkJob, error: jobError } = await supabase
      .from('bulk_operations')
      .insert({
        project_id: operation.projectId,
        operation_type: operationType as any,
        affected_rooms: operation.roomIds,
        status: 'pending' as const,
        total_count: operation.roomIds.length,
        success_count: 0,
        failed_count: 0,
      })
      .select()
      .single();

    if (jobError) throw jobError;

    // Process rooms in parallel (with concurrency limit)
    processBulkOperation(bulkJob.id, operation);

    return { success: true, jobId: bulkJob.id };
  } catch (error: any) {
    console.error('❌ Bulk operation failed:', error);
    return { success: false, jobId: '', error: error.message };
  }
}

/**
 * Process bulk operation with concurrency control
 */
async function processBulkOperation(jobId: string, operation: BulkRoomOperation) {
  const CONCURRENCY = 3; // Process 3 rooms at a time
  const queue = [...operation.roomIds];
  let successCount = 0;
  let failedCount = 0;

  while (queue.length > 0) {
    const batch = queue.splice(0, CONCURRENCY);
    const batchPromises = batch.map((roomId) =>
      processRoom(roomId, operation)
    );

    const batchResults = await Promise.allSettled(batchPromises);
    
    batchResults.forEach((result) => {
      if (result.status === 'fulfilled' && result.value.success) {
        successCount++;
      } else {
        failedCount++;
      }
    });

    // Update progress
    await supabase
      .from('bulk_operations')
      .update({
        success_count: successCount,
        failed_count: failedCount,
      })
      .eq('id', jobId);
  }

  // Mark job as completed
  await supabase
    .from('bulk_operations')
    .update({
      status: 'completed' as const,
      completed_at: new Date().toISOString(),
    })
    .eq('id', jobId);

  console.log(`✅ Bulk operation ${jobId} completed`);
}

/**
 * Process a single room in bulk operation
 */
async function processRoom(
  roomId: string,
  operation: BulkRoomOperation
): Promise<{ success: boolean; roomId: string; error?: string }> {
  try {
    console.log(`🔄 Processing room ${roomId} for ${operation.operation}`);

    let result;
    switch (operation.operation) {
      case 'generate':
        result = await generateRoomRender(roomId, operation.options);
        break;
      case 'clean':
        result = await cleanRoomImage(roomId);
        break;
      case 'approve':
        result = await approveRoom(roomId);
        break;
      case 'export':
        result = await exportRoom(roomId);
        break;
      default:
        throw new Error(`Unknown operation: ${operation.operation}`);
    }

    return { success: true, roomId };
  } catch (error: any) {
    console.error(`❌ Failed to process room ${roomId}:`, error);
    return { success: false, roomId, error: error.message };
  }
}

/**
 * Generate render for a room
 */
async function generateRoomRender(roomId: string, options: any = {}) {
  console.log(`🎨 Generating render for room ${roomId}`);

  // Call the generate-ai edge function
  const { data, error } = await supabase.functions.invoke('generate-ai', {
    body: {
      roomId,
      ...options,
    },
  });

  if (error) throw error;
  return data;
}

/**
 * Clean room image
 */
async function cleanRoomImage(roomId: string) {
  console.log(`🧹 Cleaning image for room ${roomId}`);

  // Call the image-processing edge function
  const { data, error } = await supabase.functions.invoke('image-processing', {
    body: { roomId, action: 'clean' },
  });

  if (error) throw error;
  return data;
}

/**
 * Approve room render
 */
async function approveRoom(roomId: string) {
  console.log(`✅ Approving room ${roomId}`);

  const { data, error } = await supabase
    .from('rooms')
    .update({
      current_phase: 5,
      phase_5_completed: true,
    })
    .eq('id', roomId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Export room data
 */
async function exportRoom(roomId: string) {
  console.log(`📦 Exporting room ${roomId}`);

  // Fetch room with all related data
  const { data, error } = await supabase
    .from('rooms')
    .select(`
      *,
      project:projects(*),
      renders(*),
      room_images(*)
    `)
    .eq('id', roomId)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get bulk operation status
 */
export async function getBulkOperationStatus(
  jobId: string
): Promise<BulkOperationProgress | null> {
  try {
    const { data: operation, error: opError } = await supabase
      .from('bulk_operations')
      .select('*')
      .eq('id', jobId)
      .single();

    if (opError) throw opError;

    // Calculate progress based on actual schema fields
    const progress: BulkOperationProgress = {
      total: operation.total_count,
      completed: operation.success_count,
      failed: operation.failed_count,
      inProgress: operation.total_count - operation.success_count - operation.failed_count,
      results: (operation.affected_rooms || []).map((roomId: string) => ({
        roomId,
        roomName: 'Room',
        status: operation.status === 'completed' ? 'completed' : 'processing',
      })),
    };

    return progress;
  } catch (error: any) {
    console.error('❌ Failed to get bulk operation status:', error);
    return null;
  }
}

/**
 * Cancel bulk operation
 */
export async function cancelBulkOperation(jobId: string): Promise<boolean> {
  try {
    await supabase
      .from('bulk_operations')
      .update({
        status: 'failed' as const,
        completed_at: new Date().toISOString(),
        error_message: 'Cancelled by user',
      })
      .eq('id', jobId);

    console.log(`🛑 Bulk operation ${jobId} cancelled`);
    return true;
  } catch (error: any) {
    console.error('❌ Failed to cancel bulk operation:', error);
    return false;
  }
}

/**
 * Get all bulk operations for a project
 */
export async function getProjectBulkOperations(projectId: string) {
  try {
    const { data, error } = await supabase
      .from('bulk_operations')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('❌ Failed to get bulk operations:', error);
    return [];
  }
}
