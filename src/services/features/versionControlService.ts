/**
 * Render Version Control Service
 * 
 * Manages render versions, comparisons, and history.
 */

import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

// ============================================================================
// TYPES
// ============================================================================

export interface RenderVersion {
  id: string;
  room_id: string;
  version_number: number;
  parent_version_id: string | null;
  render_url: string;
  thumbnail_url: string | null;
  storage_path: string;
  style_config: Record<string, any>;
  generation_params: Record<string, any>;
  prompt_used: string | null;
  quality_score: number | null;
  ai_validation_score: number | null;
  user_rating: number | null;
  changes_from_parent: any[];
  change_summary: string | null;
  is_approved: boolean;
  is_final: boolean;
  approved_by: string | null;
  approved_at: string | null;
  notes: string | null;
  tags: string[];
  created_by: string | null;
  created_at: string;
}

export interface CreateVersionInput {
  room_id: string;
  parent_version_id?: string;
  render_url: string;
  thumbnail_url?: string;
  storage_path: string;
  style_config: Record<string, any>;
  generation_params: Record<string, any>;
  prompt_used?: string;
  quality_score?: number;
  notes?: string;
  tags?: string[];
}

export interface VersionComparison {
  version1: RenderVersion;
  version2: RenderVersion;
  differences: {
    style_changes: string[];
    param_changes: string[];
    quality_delta: number;
    visual_diff_url?: string;
  };
}

// Helper function to map database row to interface
function mapDbRowToVersion(row: any): RenderVersion {
  return {
    id: row.id,
    room_id: row.room_id,
    version_number: row.version_number,
    parent_version_id: row.parent_version_id,
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
    is_approved: row.is_approved || false,
    is_final: row.is_final || false,
    approved_by: row.approved_by,
    approved_at: row.approved_at,
    notes: row.notes,
    tags: row.tags || [],
    created_by: row.created_by,
    created_at: row.created_at,
  };
}

// ============================================================================
// SERVICE CLASS
// ============================================================================

class VersionControlService {
  /**
   * Get all versions for a room, sorted by version number
   */
  async getRenderVersions(roomId: string): Promise<RenderVersion[]> {
    const { data, error } = await supabase
      .from('render_versions')
      .select('*')
      .eq('room_id', roomId)
      .order('version_number', { ascending: false });

    if (error) {
      console.error('Error fetching render versions:', error);
      throw new Error(`Failed to fetch versions: ${error.message}`);
    }

    return (data || []).map(mapDbRowToVersion);
  }

  /**
   * Get a specific version by ID
   */
  async getVersionById(versionId: string): Promise<RenderVersion | null> {
    const { data, error } = await supabase
      .from('render_versions')
      .select('*')
      .eq('id', versionId)
      .single();

    if (error) {
      console.error('Error fetching version:', error);
      return null;
    }

    return data ? mapDbRowToVersion(data) : null;
  }

  /**
   * Create a new render version
   */
  async createVersion(input: CreateVersionInput): Promise<RenderVersion> {
    // Get next version number
    const { data: versionNumber } = await supabase
      .rpc('get_next_version_number', { p_room_id: input.room_id });

    // Calculate changes from parent if parent exists
    let changes_from_parent: any[] = [];
    let change_summary = 'Initial version';

    if (input.parent_version_id) {
      const parent = await this.getVersionById(input.parent_version_id);
      if (parent) {
        changes_from_parent = this.calculateChanges(parent, input);
        change_summary = `Refined from v${parent.version_number}`;
      }
    }

    const insertData = {
      room_id: input.room_id,
      version_number: versionNumber || 1,
      parent_version_id: input.parent_version_id || null,
      render_url: input.render_url,
      thumbnail_url: input.thumbnail_url || null,
      storage_path: input.storage_path,
      style_config: input.style_config as unknown as Json,
      generation_params: input.generation_params as unknown as Json,
      prompt_used: input.prompt_used || null,
      quality_score: input.quality_score || null,
      changes_from_parent: changes_from_parent as unknown as Json,
      change_summary,
      notes: input.notes || null,
      tags: input.tags || [],
      is_approved: false,
      is_final: false,
    };

    const { data, error } = await supabase
      .from('render_versions')
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error('Error creating version:', error);
      throw new Error(`Failed to create version: ${error.message}`);
    }

    return mapDbRowToVersion(data);
  }

  /**
   * Update a version
   */
  async updateVersion(
    versionId: string,
    updates: Partial<{
      notes: string;
      tags: string[];
      user_rating: number;
    }>
  ): Promise<RenderVersion> {
    const { data, error } = await supabase
      .from('render_versions')
      .update(updates)
      .eq('id', versionId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update version: ${error.message}`);
    }

    return mapDbRowToVersion(data);
  }

  /**
   * Approve a version
   */
  async approveVersion(versionId: string, userId: string): Promise<RenderVersion> {
    const { data, error } = await supabase
      .from('render_versions')
      .update({
        is_approved: true,
        approved_by: userId,
        approved_at: new Date().toISOString(),
      })
      .eq('id', versionId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to approve version: ${error.message}`);
    }

    return mapDbRowToVersion(data);
  }

  /**
   * Mark a version as final
   */
  async markAsFinal(versionId: string): Promise<RenderVersion> {
    const { data: version } = await supabase
      .from('render_versions')
      .select('room_id')
      .eq('id', versionId)
      .single();

    if (!version) {
      throw new Error('Version not found');
    }

    // First, unmark any existing final version
    await supabase
      .from('render_versions')
      .update({ is_final: false })
      .eq('room_id', version.room_id)
      .eq('is_final', true);

    // Then mark this version as final
    const { data, error } = await supabase
      .from('render_versions')
      .update({ is_final: true })
      .eq('id', versionId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to mark as final: ${error.message}`);
    }

    return mapDbRowToVersion(data);
  }

  /**
   * Delete a version
   */
  async deleteVersion(versionId: string): Promise<void> {
    const { data: version } = await supabase
      .from('render_versions')
      .select('is_final, is_approved')
      .eq('id', versionId)
      .single();

    if (version?.is_final) {
      throw new Error('Cannot delete a final version');
    }

    const { error } = await supabase
      .from('render_versions')
      .delete()
      .eq('id', versionId);

    if (error) {
      throw new Error(`Failed to delete version: ${error.message}`);
    }
  }

  /**
   * Compare two versions
   */
  async compareVersions(versionId1: string, versionId2: string): Promise<VersionComparison> {
    const [version1, version2] = await Promise.all([
      this.getVersionById(versionId1),
      this.getVersionById(versionId2),
    ]);

    if (!version1 || !version2) {
      throw new Error('One or both versions not found');
    }

    const differences = {
      style_changes: this.getStyleChanges(version1.style_config, version2.style_config),
      param_changes: this.getParamChanges(version1.generation_params, version2.generation_params),
      quality_delta: (version2.quality_score || 0) - (version1.quality_score || 0),
    };

    return {
      version1,
      version2,
      differences,
    };
  }

  /**
   * Get the final version for a room
   */
  async getFinalVersion(roomId: string): Promise<RenderVersion | null> {
    const { data, error } = await supabase
      .from('render_versions')
      .select('*')
      .eq('room_id', roomId)
      .eq('is_final', true)
      .single();

    if (error) {
      return null;
    }

    return data ? mapDbRowToVersion(data) : null;
  }

  /**
   * Get the latest version for a room
   */
  async getLatestVersion(roomId: string): Promise<RenderVersion | null> {
    const { data, error } = await supabase
      .from('render_versions')
      .select('*')
      .eq('room_id', roomId)
      .order('version_number', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      return null;
    }

    return data ? mapDbRowToVersion(data) : null;
  }

  // Private helper methods
  private calculateChanges(parent: RenderVersion, input: CreateVersionInput): any[] {
    const changes: any[] = [];

    // Check style changes
    const oldStyle = parent.style_config || {};
    const newStyle = input.style_config || {};
    
    Object.keys({ ...oldStyle, ...newStyle }).forEach(key => {
      if (JSON.stringify(oldStyle[key]) !== JSON.stringify(newStyle[key])) {
        changes.push({
          field: `style.${key}`,
          old_value: oldStyle[key],
          new_value: newStyle[key],
        });
      }
    });

    return changes;
  }

  private getStyleChanges(config1: Record<string, any>, config2: Record<string, any>): string[] {
    const changes: string[] = [];
    const allKeys = new Set([...Object.keys(config1 || {}), ...Object.keys(config2 || {})]);

    allKeys.forEach(key => {
      if (JSON.stringify(config1?.[key]) !== JSON.stringify(config2?.[key])) {
        changes.push(key);
      }
    });

    return changes;
  }

  private getParamChanges(params1: Record<string, any>, params2: Record<string, any>): string[] {
    const changes: string[] = [];
    const allKeys = new Set([...Object.keys(params1 || {}), ...Object.keys(params2 || {})]);

    allKeys.forEach(key => {
      if (JSON.stringify(params1?.[key]) !== JSON.stringify(params2?.[key])) {
        changes.push(key);
      }
    });

    return changes;
  }
}

// Export singleton instance
export const versionControlService = new VersionControlService();

// Export the class for testing
export { VersionControlService };
