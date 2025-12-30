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
 */
export async function startBulkOperation(
  operation: BulkRoomOperation
): Promise<{ success: boolean; jobId: string; error?: string }> {
  try {
    console.log(`🔄 Starting bulk ${operation.operation} for ${operation.roomIds.length} rooms`);

    // Create bulk operation record
    const { data: bulkJob, error: jobError } = await supabase
      .from('bulk_operations')
      .insert({
        project_id: operation.projectId,
        operation_type: operation.operation,
        room_ids: operation.roomIds,
        options: operation.options || {},
        status: 'pending',
        total_rooms: operation.roomIds.length,
        completed_rooms: 0,
        failed_rooms: 0,
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
  const results: any[] = [];

  while (queue.length > 0) {
    const batch = queue.splice(0, CONCURRENCY);
    const batchPromises = batch.map((roomId) =>
      processRoom(jobId, roomId, operation)
    );

    const batchResults = await Promise.allSettled(batchPromises);
    results.push(...batchResults);

    // Update progress
    await updateBulkOperationProgress(jobId, results);
  }

  // Mark job as completed
  await supabase
    .from('bulk_operations')
    .update({
      status: 'completed',
      completed_at: new Date().toISOString(),
    })
    .eq('id', jobId);

  console.log(`✅ Bulk operation ${jobId} completed`);
}

/**
 * Process a single room in bulk operation
 */
async function processRoom(
  jobId: string,
  roomId: string,
  operation: BulkRoomOperation
): Promise<any> {
  try {
    console.log(`🔄 Processing room ${roomId} for ${operation.operation}`);

    // Update room status
    await supabase
      .from('bulk_operation_items')
      .insert({
        bulk_operation_id: jobId,
        room_id: roomId,
        status: 'processing',
      });

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

    // Update success status
    await supabase
      .from('bulk_operation_items')
      .update({
        status: 'completed',
        result: result,
        completed_at: new Date().toISOString(),
      })
      .eq('bulk_operation_id', jobId)
      .eq('room_id', roomId);

    return { success: true, roomId, result };
  } catch (error: any) {
    console.error(`❌ Failed to process room ${roomId}:`, error);

    // Update error status
    await supabase
      .from('bulk_operation_items')
      .update({
        status: 'failed',
        error: error.message,
        completed_at: new Date().toISOString(),
      })
      .eq('bulk_operation_id', jobId)
      .eq('room_id', roomId);

    return { success: false, roomId, error: error.message };
  }
}

/**
 * Update bulk operation progress
 */
async function updateBulkOperationProgress(jobId: string, results: any[]) {
  const completed = results.filter((r) => r.status === 'fulfilled').length;
  const failed = results.filter((r) => r.status === 'rejected').length;

  await supabase
    .from('bulk_operations')
    .update({
      completed_rooms: completed,
      failed_rooms: failed,
    })
    .eq('id', jobId);
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

  // Call the clean-room edge function
  const { data, error } = await supabase.functions.invoke('clean-room', {
    body: { roomId },
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
    .select(
      `
      *,
      project:projects(*),
      renders(*),
      room_images(*)
    `
    )
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
    // Fetch bulk operation
    const { data: operation, error: opError } = await supabase
      .from('bulk_operations')
      .select(
        `
        *,
        items:bulk_operation_items(*)
      `
      )
      .eq('id', jobId)
      .single();

    if (opError) throw opError;

    // Calculate progress
    const progress: BulkOperationProgress = {
      total: operation.total_rooms,
      completed: operation.completed_rooms,
      failed: operation.failed_rooms,
      inProgress: operation.total_rooms - operation.completed_rooms - operation.failed_rooms,
      results: operation.items.map((item: any) => ({
        roomId: item.room_id,
        roomName: item.room_name || 'Unknown Room',
        status: item.status,
        error: item.error,
        result: item.result,
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
        status: 'cancelled',
        completed_at: new Date().toISOString(),
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
      .select(
        `
        *,
        items:bulk_operation_items(count)
      `
      )
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('❌ Failed to get bulk operations:', error);
    return [];
  }
}
