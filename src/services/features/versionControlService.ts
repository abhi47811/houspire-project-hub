// ============================================================================
// RENDER VERSION CONTROL SERVICE
// ============================================================================
// Purpose: Manage render versions, comparisons, and history
// Location: src/services/features/versionControlService.ts
// ============================================================================

import { supabase } from '@/integrations/supabase/client';

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

    return data || [];
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

    return data;
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
        changes_from_parent = this.calculateChanges(
          parent.style_config,
          input.style_config,
          parent.generation_params,
          input.generation_params
        );
        change_summary = this.generateChangeSummary(changes_from_parent);
      }
    }

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();

    // Insert new version
    const { data, error } = await supabase
      .from('render_versions')
      .insert({
        room_id: input.room_id,
        version_number: versionNumber || 1,
        parent_version_id: input.parent_version_id || null,
        render_url: input.render_url,
        thumbnail_url: input.thumbnail_url || null,
        storage_path: input.storage_path,
        style_config: input.style_config,
        generation_params: input.generation_params,
        prompt_used: input.prompt_used || null,
        quality_score: input.quality_score || null,
        changes_from_parent,
        change_summary,
        notes: input.notes || null,
        tags: input.tags || [],
        created_by: user?.id || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating version:', error);
      throw new Error(`Failed to create version: ${error.message}`);
    }

    return data;
  }

  /**
   * Compare two versions
   */
  async compareVersions(
    version1Id: string,
    version2Id: string
  ): Promise<VersionComparison> {
    const [v1, v2] = await Promise.all([
      this.getVersionById(version1Id),
      this.getVersionById(version2Id),
    ]);

    if (!v1 || !v2) {
      throw new Error('One or both versions not found');
    }

    const differences = {
      style_changes: this.getStyleDifferences(v1.style_config, v2.style_config),
      param_changes: this.getParamDifferences(
        v1.generation_params,
        v2.generation_params
      ),
      quality_delta: (v2.quality_score || 0) - (v1.quality_score || 0),
    };

    return {
      version1: v1,
      version2: v2,
      differences,
    };
  }

  /**
   * Approve a version
   */
  async approveVersion(versionId: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('render_versions')
      .update({
        is_approved: true,
        approved_by: user?.id || null,
        approved_at: new Date().toISOString(),
      })
      .eq('id', versionId);

    if (error) {
      throw new Error(`Failed to approve version: ${error.message}`);
    }
  }

  /**
   * Mark version as final
   */
  async markAsFinal(versionId: string): Promise<void> {
    const version = await this.getVersionById(versionId);
    if (!version) {
      throw new Error('Version not found');
    }

    // Unmark other versions as final
    await supabase
      .from('render_versions')
      .update({ is_final: false })
      .eq('room_id', version.room_id);

    // Mark this version as final
    const { error } = await supabase
      .from('render_versions')
      .update({ is_final: true })
      .eq('id', versionId);

    if (error) {
      throw new Error(`Failed to mark as final: ${error.message}`);
    }
  }

  /**
   * Revert to a previous version (creates new version with old config)
   */
  async revertToVersion(versionId: string): Promise<RenderVersion> {
    const version = await this.getVersionById(versionId);
    if (!version) {
      throw new Error('Version not found');
    }

    // Create new version with reverted config
    return this.createVersion({
      room_id: version.room_id,
      parent_version_id: versionId,
      render_url: version.render_url, // Will be regenerated
      storage_path: version.storage_path,
      style_config: version.style_config,
      generation_params: version.generation_params,
      prompt_used: version.prompt_used || undefined,
      notes: `Reverted to version ${version.version_number}`,
      tags: [...(version.tags || []), 'reverted'],
    });
  }

  /**
   * Update version notes
   */
  async updateNotes(versionId: string, notes: string): Promise<void> {
    const { error } = await supabase
      .from('render_versions')
      .update({ notes })
      .eq('id', versionId);

    if (error) {
      throw new Error(`Failed to update notes: ${error.message}`);
    }
  }

  /**
   * Add tags to version
   */
  async addTags(versionId: string, tags: string[]): Promise<void> {
    const version = await this.getVersionById(versionId);
    if (!version) {
      throw new Error('Version not found');
    }

    const existingTags = version.tags || [];
    const newTags = [...new Set([...existingTags, ...tags])];

    const { error } = await supabase
      .from('render_versions')
      .update({ tags: newTags })
      .eq('id', versionId);

    if (error) {
      throw new Error(`Failed to add tags: ${error.message}`);
    }
  }

  /**
   * Rate a version
   */
  async rateVersion(versionId: string, rating: number): Promise<void> {
    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    const { error } = await supabase
      .from('render_versions')
      .update({ user_rating: rating })
      .eq('id', versionId);

    if (error) {
      throw new Error(`Failed to rate version: ${error.message}`);
    }
  }

  /**
   * Delete a version
   */
  async deleteVersion(versionId: string): Promise<void> {
    const { error } = await supabase
      .from('render_versions')
      .delete()
      .eq('id', versionId);

    if (error) {
      throw new Error(`Failed to delete version: ${error.message}`);
    }
  }

  /**
   * Get version history (parent chain)
   */
  async getVersionHistory(versionId: string): Promise<RenderVersion[]> {
    const history: RenderVersion[] = [];
    let currentId: string | null = versionId;

    while (currentId) {
      const version = await this.getVersionById(currentId);
      if (!version) break;

      history.push(version);
      currentId = version.parent_version_id;
    }

    return history;
  }

  // ============================================================================
  // PRIVATE HELPER METHODS
  // ============================================================================

  private calculateChanges(
    oldStyle: Record<string, any>,
    newStyle: Record<string, any>,
    oldParams: Record<string, any>,
    newParams: Record<string, any>
  ): any[] {
    const changes: any[] = [];

    // Style changes
    Object.keys(newStyle).forEach((key) => {
      if (JSON.stringify(oldStyle[key]) !== JSON.stringify(newStyle[key])) {
        changes.push({
          type: 'style',
          field: key,
          old_value: oldStyle[key],
          new_value: newStyle[key],
        });
      }
    });

    // Parameter changes
    Object.keys(newParams).forEach((key) => {
      if (JSON.stringify(oldParams[key]) !== JSON.stringify(newParams[key])) {
        changes.push({
          type: 'parameter',
          field: key,
          old_value: oldParams[key],
          new_value: newParams[key],
        });
      }
    });

    return changes;
  }

  private generateChangeSummary(changes: any[]): string {
    if (changes.length === 0) return 'No changes';

    const summaryParts: string[] = [];

    const styleChanges = changes.filter((c) => c.type === 'style');
    const paramChanges = changes.filter((c) => c.type === 'parameter');

    if (styleChanges.length > 0) {
      summaryParts.push(
        `${styleChanges.length} style change${styleChanges.length > 1 ? 's' : ''}`
      );
    }

    if (paramChanges.length > 0) {
      summaryParts.push(
        `${paramChanges.length} parameter change${paramChanges.length > 1 ? 's' : ''}`
      );
    }

    return summaryParts.join(', ');
  }

  private getStyleDifferences(
    style1: Record<string, any>,
    style2: Record<string, any>
  ): string[] {
    const diffs: string[] = [];

    const allKeys = new Set([...Object.keys(style1), ...Object.keys(style2)]);

    allKeys.forEach((key) => {
      const val1 = style1[key];
      const val2 = style2[key];

      if (JSON.stringify(val1) !== JSON.stringify(val2)) {
        diffs.push(`${key}: ${val1} → ${val2}`);
      }
    });

    return diffs;
  }

  private getParamDifferences(
    params1: Record<string, any>,
    params2: Record<string, any>
  ): string[] {
    const diffs: string[] = [];

    const allKeys = new Set([...Object.keys(params1), ...Object.keys(params2)]);

    allKeys.forEach((key) => {
      const val1 = params1[key];
      const val2 = params2[key];

      if (JSON.stringify(val1) !== JSON.stringify(val2)) {
        diffs.push(`${key}: ${val1} → ${val2}`);
      }
    });

    return diffs;
  }
}

// ============================================================================
// EXPORT SINGLETON
// ============================================================================

export const versionControlService = new VersionControlService();
