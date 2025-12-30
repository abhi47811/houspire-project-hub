/**
 * F-061 to F-063: Refinement System
 * 
 * Comprehensive render refinement and version control system.
 * Enables users to request specific changes, track render history,
 * and compare versions side-by-side.
 * 
 * Features:
 * - F-061: Version comparison UI
 * - F-062: Refinement request workflow
 * - F-063: Render history tracking
 */

import { supabase } from '@/integrations/supabase/client';

export interface RenderVersion {
  id: string;
  room_id: string;
  version_number: number;
  image_url: string;
  thumbnail_url?: string;
  
  // Generation details
  style_id: string;
  generation_params: {
    prompt: string;
    negative_prompt?: string;
    seed?: number;
    steps?: number;
    cfg_scale?: number;
    model?: string;
  };
  
  // Parent version (for refinements)
  parent_version_id?: string;
  refinement_request?: RefinementRequest;
  
  // Metadata
  quality_score?: number;
  is_approved: boolean;
  is_favorite: boolean;
  created_at: string;
  created_by: string;
}

export interface RefinementRequest {
  type: 'color_adjustment' | 'furniture_change' | 'lighting_change' | 'style_tweak' | 'custom';
  description: string;
  specific_areas?: string[];
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
}

export interface RenderHistory {
  room_id: string;
  versions: RenderVersion[];
  total_versions: number;
  approved_version_id?: string;
  favorite_versions: string[];
  created_at: string;
  updated_at: string;
}

export interface VersionComparison {
  version_a: RenderVersion;
  version_b: RenderVersion;
  differences: {
    style_changed: boolean;
    quality_difference: number;
    param_differences: string[];
  };
}

/**
 * Create a new render version
 */
export async function createRenderVersion(
  roomId: string,
  imageUrl: string,
  generationParams: any,
  parentVersionId?: string,
  refinementRequest?: RefinementRequest
): Promise<RenderVersion> {
  try {
    // Get current version count
    const { data: existing } = await supabase
      .from('render_versions')
      .select('version_number')
      .eq('room_id', roomId)
      .order('version_number', { ascending: false })
      .limit(1);

    const nextVersion = existing && existing.length > 0 
      ? existing[0].version_number + 1 
      : 1;

    // Create new version
    const { data, error } = await supabase
      .from('render_versions')
      .insert({
        room_id: roomId,
        version_number: nextVersion,
        image_url: imageUrl,
        style_id: generationParams.style_id,
        generation_params: generationParams,
        parent_version_id: parentVersionId,
        refinement_request: refinementRequest,
        is_approved: false,
        is_favorite: false,
      })
      .select()
      .single();

    if (error) throw error;

    return data as RenderVersion;
  } catch (error) {
    console.error('Error creating render version:', error);
    throw error;
  }
}

/**
 * Get render history for room
 */
export async function getRenderHistory(roomId: string): Promise<RenderHistory> {
  try {
    const { data, error } = await supabase
      .from('render_versions')
      .select('*')
      .eq('room_id', roomId)
      .order('version_number', { ascending: false });

    if (error) throw error;

    const versions = (data || []) as RenderVersion[];
    const approvedVersion = versions.find((v) => v.is_approved);
    const favorites = versions.filter((v) => v.is_favorite).map((v) => v.id);

    return {
      room_id: roomId,
      versions,
      total_versions: versions.length,
      approved_version_id: approvedVersion?.id,
      favorite_versions: favorites,
      created_at: versions[versions.length - 1]?.created_at || new Date().toISOString(),
      updated_at: versions[0]?.created_at || new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error fetching render history:', error);
    throw error;
  }
}

/**
 * Compare two render versions
 */
export async function compareVersions(
  versionIdA: string,
  versionIdB: string
): Promise<VersionComparison> {
  try {
    const { data, error } = await supabase
      .from('render_versions')
      .select('*')
      .in('id', [versionIdA, versionIdB]);

    if (error) throw error;
    if (!data || data.length !== 2) {
      throw new Error('One or both versions not found');
    }

    const versionA = data.find((v) => v.id === versionIdA) as RenderVersion;
    const versionB = data.find((v) => v.id === versionIdB) as RenderVersion;

    // Analyze differences
    const styleChanged = versionA.style_id !== versionB.style_id;
    const qualityDifference = (versionA.quality_score || 0) - (versionB.quality_score || 0);

    const paramDifferences: string[] = [];
    const paramsA = versionA.generation_params;
    const paramsB = versionB.generation_params;

    if (paramsA.prompt !== paramsB.prompt) {
      paramDifferences.push('Prompt changed');
    }
    if (paramsA.steps !== paramsB.steps) {
      paramDifferences.push(`Steps: ${paramsA.steps} → ${paramsB.steps}`);
    }
    if (paramsA.cfg_scale !== paramsB.cfg_scale) {
      paramDifferences.push(`CFG: ${paramsA.cfg_scale} → ${paramsB.cfg_scale}`);
    }

    return {
      version_a: versionA,
      version_b: versionB,
      differences: {
        style_changed: styleChanged,
        quality_difference: qualityDifference,
        param_differences: paramDifferences,
      },
    };
  } catch (error) {
    console.error('Error comparing versions:', error);
    throw error;
  }
}

/**
 * Submit refinement request
 */
export async function submitRefinementRequest(
  versionId: string,
  request: RefinementRequest
): Promise<void> {
  try {
    const { error } = await supabase
      .from('render_versions')
      .update({
        refinement_request: request,
      })
      .eq('id', versionId);

    if (error) throw error;
  } catch (error) {
    console.error('Error submitting refinement request:', error);
    throw error;
  }
}

/**
 * Approve render version
 */
export async function approveVersion(
  roomId: string,
  versionId: string
): Promise<void> {
  try {
    // Remove approval from all other versions
    await supabase
      .from('render_versions')
      .update({ is_approved: false })
      .eq('room_id', roomId);

    // Approve selected version
    const { error } = await supabase
      .from('render_versions')
      .update({ is_approved: true })
      .eq('id', versionId);

    if (error) throw error;
  } catch (error) {
    console.error('Error approving version:', error);
    throw error;
  }
}

/**
 * Toggle favorite status
 */
export async function toggleFavorite(
  versionId: string,
  isFavorite: boolean
): Promise<void> {
  try {
    const { error } = await supabase
      .from('render_versions')
      .update({ is_favorite: isFavorite })
      .eq('id', versionId);

    if (error) throw error;
  } catch (error) {
    console.error('Error toggling favorite:', error);
    throw error;
  }
}

/**
 * Delete render version
 */
export async function deleteVersion(versionId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('render_versions')
      .delete()
      .eq('id', versionId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting version:', error);
    throw error;
  }
}

/**
 * Get refinement suggestions based on quality score
 */
export function getRefinementSuggestions(
  version: RenderVersion,
  qualityScore: number
): string[] {
  const suggestions: string[] = [];

  if (qualityScore < 70) {
    suggestions.push('Consider adjusting the style prompt for better consistency');
    suggestions.push('Review architectural preservation settings');
  }

  if (qualityScore >= 70 && qualityScore < 85) {
    suggestions.push('Fine-tune color palette to better match style');
    suggestions.push('Adjust lighting for improved ambiance');
  }

  if (version.generation_params.steps && version.generation_params.steps < 30) {
    suggestions.push('Increase generation steps for better quality');
  }

  return suggestions;
}
