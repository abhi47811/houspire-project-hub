/**
 * Refinement Service
 * 
 * Simplified render refinement and version control system.
 */

import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

export interface RenderVersion {
  id: string;
  room_id: string;
  version_number: number;
  render_url: string;
  thumbnail_url?: string | null;
  storage_path: string;
  style_config: Record<string, any>;
  generation_params: Record<string, any>;
  prompt_used?: string | null;
  quality_score?: number | null;
  ai_validation_score?: number | null;
  user_rating?: number | null;
  changes_from_parent: any[];
  change_summary?: string | null;
  parent_version_id?: string | null;
  is_approved: boolean;
  is_final: boolean;
  approved_by?: string | null;
  approved_at?: string | null;
  notes?: string | null;
  tags: string[];
  created_by?: string | null;
  created_at: string;
  updated_at: string;
}

export interface RefinementRequest {
  type: 'color_adjustment' | 'furniture_change' | 'lighting_change' | 'style_tweak' | 'custom';
  description: string;
  specific_areas?: string[];
  priority: 'low' | 'medium' | 'high';
}

export interface RenderHistory {
  room_id: string;
  versions: RenderVersion[];
  total_versions: number;
  approved_version_id?: string;
  favorite_versions: string[];
}

/**
 * Create a new render version
 */
export async function createRenderVersion(
  roomId: string,
  imageUrl: string,
  generationParams: any,
  styleConfig: any,
  options: {
    parentVersionId?: string;
    promptUsed?: string;
    qualityScore?: number;
    notes?: string;
    tags?: string[];
  } = {}
): Promise<RenderVersion> {
  // Get next version number
  const { data: versionNum } = await supabase
    .rpc('get_next_version_number', { p_room_id: roomId });

  const insertData = {
    room_id: roomId,
    version_number: versionNum || 1,
    render_url: imageUrl,
    storage_path: imageUrl,
    style_config: styleConfig as unknown as Json,
    generation_params: generationParams as unknown as Json,
    prompt_used: options.promptUsed,
    quality_score: options.qualityScore,
    parent_version_id: options.parentVersionId,
    notes: options.notes,
    tags: options.tags || [],
    is_approved: false,
    is_final: false,
  };

  const { data, error } = await supabase
    .from('render_versions')
    .insert([insertData])
    .select()
    .single();

  if (error) throw new Error(`Failed to create render version: ${error.message}`);

  return mapDbToRenderVersion(data);
}

/**
 * Get all versions for a room
 */
export async function getRenderHistory(roomId: string): Promise<RenderHistory> {
  const { data, error } = await supabase
    .from('render_versions')
    .select('*')
    .eq('room_id', roomId)
    .order('version_number', { ascending: false });

  if (error) throw new Error(`Failed to fetch render history: ${error.message}`);

  const versions = (data || []).map(mapDbToRenderVersion);
  const approvedVersion = versions.find(v => v.is_approved);
  const favoriteVersions = versions.filter(v => v.user_rating && v.user_rating >= 4).map(v => v.id);

  return {
    room_id: roomId,
    versions,
    total_versions: versions.length,
    approved_version_id: approvedVersion?.id,
    favorite_versions: favoriteVersions,
  };
}

/**
 * Compare two versions
 */
export async function compareVersions(
  versionId1: string,
  versionId2: string
): Promise<{ version1: RenderVersion; version2: RenderVersion }> {
  const { data: v1Data, error: e1 } = await supabase
    .from('render_versions')
    .select('*')
    .eq('id', versionId1)
    .single();

  const { data: v2Data, error: e2 } = await supabase
    .from('render_versions')
    .select('*')
    .eq('id', versionId2)
    .single();

  if (e1 || e2) throw new Error('Failed to fetch versions for comparison');

  return {
    version1: mapDbToRenderVersion(v1Data),
    version2: mapDbToRenderVersion(v2Data),
  };
}

/**
 * Request refinement on a version
 */
export async function requestRefinement(
  versionId: string,
  request: RefinementRequest
): Promise<void> {
  const { data: version } = await supabase
    .from('render_versions')
    .select('*')
    .eq('id', versionId)
    .single();

  if (!version) throw new Error('Version not found');

  // Store refinement request in generation_params
  const updatedParams = {
    ...(version.generation_params as Record<string, any> || {}),
    refinement_request: request,
    refinement_requested_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from('render_versions')
    .update({
      generation_params: updatedParams as unknown as Json,
      change_summary: `Refinement requested: ${request.description}`,
    })
    .eq('id', versionId);

  if (error) throw new Error(`Failed to request refinement: ${error.message}`);
}

/**
 * Approve a version
 */
export async function approveVersion(versionId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();

  const { error } = await supabase
    .from('render_versions')
    .update({
      is_approved: true,
      approved_by: user?.id,
      approved_at: new Date().toISOString(),
    })
    .eq('id', versionId);

  if (error) throw new Error(`Failed to approve version: ${error.message}`);
}

/**
 * Mark version as final
 */
export async function markAsFinal(versionId: string): Promise<void> {
  const { error } = await supabase
    .from('render_versions')
    .update({ is_final: true })
    .eq('id', versionId);

  if (error) throw new Error(`Failed to mark as final: ${error.message}`);
}

/**
 * Rate a version
 */
export async function rateVersion(versionId: string, rating: number): Promise<void> {
  const { error } = await supabase
    .from('render_versions')
    .update({ user_rating: rating })
    .eq('id', versionId);

  if (error) throw new Error(`Failed to rate version: ${error.message}`);
}

/**
 * Delete a version (only if not approved or final)
 */
export async function deleteVersion(versionId: string): Promise<void> {
  const { data: version } = await supabase
    .from('render_versions')
    .select('is_approved, is_final')
    .eq('id', versionId)
    .single();

  if (version?.is_approved || version?.is_final) {
    throw new Error('Cannot delete approved or final versions');
  }

  const { error } = await supabase
    .from('render_versions')
    .delete()
    .eq('id', versionId);

  if (error) throw new Error(`Failed to delete version: ${error.message}`);
}

// Helper function to map database row to interface
function mapDbToRenderVersion(row: any): RenderVersion {
  return {
    id: row.id,
    room_id: row.room_id,
    version_number: row.version_number,
    render_url: row.render_url,
    thumbnail_url: row.thumbnail_url,
    storage_path: row.storage_path,
    style_config: (row.style_config || {}) as Record<string, any>,
    generation_params: (row.generation_params || {}) as Record<string, any>,
    prompt_used: row.prompt_used,
    quality_score: row.quality_score,
    ai_validation_score: row.ai_validation_score,
    user_rating: row.user_rating,
    changes_from_parent: (row.changes_from_parent || []) as any[],
    change_summary: row.change_summary,
    parent_version_id: row.parent_version_id,
    is_approved: row.is_approved || false,
    is_final: row.is_final || false,
    approved_by: row.approved_by,
    approved_at: row.approved_at,
    notes: row.notes,
    tags: row.tags || [],
    created_by: row.created_by,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}
