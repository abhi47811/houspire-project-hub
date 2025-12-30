import { supabase } from '@/integrations/supabase/client';

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
  updated_at: string;
}

export interface CreateVersionInput {
  room_id: string;
  parent_version_id?: string | null;
  render_url: string;
  thumbnail_url?: string | null;
  storage_path: string;
  style_config?: Record<string, any>;
  generation_params?: Record<string, any>;
  prompt_used?: string;
  quality_score?: number | null;
  notes?: string;
  tags?: string[];
}

export interface VersionComparison {
  version1: RenderVersion;
  version2: RenderVersion;
  styleChanges: StyleChange[];
  paramChanges: ParamChange[];
  qualityDelta: number;
  changeSummary: string;
}

export interface StyleChange {
  field: string;
  oldValue: any;
  newValue: any;
  changeType: 'added' | 'removed' | 'modified';
}

export interface ParamChange {
  field: string;
  oldValue: any;
  newValue: any;
  changeType: 'added' | 'removed' | 'modified';
}

export interface VersionHistory {
  versions: RenderVersion[];
  totalCount: number;
  lineage: RenderVersion[];
}

class VersionControlService {
  // 1. Get all render versions for a room
  async getRenderVersions(roomId: string): Promise<RenderVersion[]> {
    const { data, error } = await supabase
      .from('render_versions')
      .select('*')
      .eq('room_id', roomId)
      .order('version_number', { ascending: false });

    if (error) throw error;
    return (data || []) as RenderVersion[];
  }

  // 2. Get a single version by ID
  async getVersionById(versionId: string): Promise<RenderVersion | null> {
    const { data, error } = await supabase
      .from('render_versions')
      .select('*')
      .eq('id', versionId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data as RenderVersion;
  }

  // 3. Create a new version with change tracking
  async createVersion(input: CreateVersionInput): Promise<RenderVersion> {
    const { data: { user } } = await supabase.auth.getUser();
    
    // Calculate changes from parent if exists
    let changes_from_parent: any[] = [];
    let change_summary: string | null = null;
    
    if (input.parent_version_id) {
      const parent = await this.getVersionById(input.parent_version_id);
      if (parent) {
        changes_from_parent = this.calculateChanges(parent, input);
        change_summary = this.generateChangeSummary(changes_from_parent);
      }
    }

    const { data, error } = await supabase
      .from('render_versions')
      .insert({
        room_id: input.room_id,
        parent_version_id: input.parent_version_id || null,
        render_url: input.render_url,
        thumbnail_url: input.thumbnail_url || null,
        storage_path: input.storage_path,
        style_config: input.style_config || {},
        generation_params: input.generation_params || {},
        prompt_used: input.prompt_used || null,
        quality_score: input.quality_score || null,
        notes: input.notes || null,
        tags: input.tags || [],
        changes_from_parent,
        change_summary,
        created_by: user?.id || null,
      })
      .select()
      .single();

    if (error) throw error;
    return data as RenderVersion;
  }

  // 4. Compare two versions with detailed diff
  async compareVersions(v1Id: string, v2Id: string): Promise<VersionComparison> {
    const [version1, version2] = await Promise.all([
      this.getVersionById(v1Id),
      this.getVersionById(v2Id),
    ]);

    if (!version1 || !version2) throw new Error('Version not found');

    const styleChanges = this.getStyleDifferences(version1.style_config, version2.style_config);
    const paramChanges = this.getParamDifferences(version1.generation_params, version2.generation_params);
    const qualityDelta = (version2.quality_score || 0) - (version1.quality_score || 0);
    const changeSummary = this.generateComparisonSummary(styleChanges, paramChanges, qualityDelta);

    return { version1, version2, styleChanges, paramChanges, qualityDelta, changeSummary };
  }

  // 5. Approve a version
  async approveVersion(versionId: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase
      .from('render_versions')
      .update({ 
        is_approved: true, 
        approved_by: user?.id, 
        approved_at: new Date().toISOString() 
      })
      .eq('id', versionId);
    if (error) throw error;
  }

  // 6. Mark version as final (DB trigger ensures only one final per room)
  async markAsFinal(versionId: string): Promise<void> {
    const { error } = await supabase
      .from('render_versions')
      .update({ is_final: true, is_approved: true })
      .eq('id', versionId);
    if (error) throw error;
  }

  // 7. Revert to an older version (creates new version based on old one)
  async revertToVersion(versionId: string): Promise<RenderVersion> {
    const source = await this.getVersionById(versionId);
    if (!source) throw new Error('Version not found');

    const versions = await this.getRenderVersions(source.room_id);
    const latestVersion = versions[0];

    return this.createVersion({
      room_id: source.room_id,
      parent_version_id: latestVersion?.id || null,
      render_url: source.render_url,
      thumbnail_url: source.thumbnail_url,
      storage_path: source.storage_path,
      style_config: source.style_config,
      generation_params: source.generation_params,
      prompt_used: source.prompt_used || undefined,
      quality_score: source.quality_score,
      notes: `Reverted from v${source.version_number}`,
      tags: [...new Set([...(source.tags || []), 'reverted'])],
    });
  }

  // 8. Update notes for a version
  async updateNotes(versionId: string, notes: string): Promise<void> {
    const { error } = await supabase
      .from('render_versions')
      .update({ notes, updated_at: new Date().toISOString() })
      .eq('id', versionId);
    if (error) throw error;
  }

  // 9. Add tags to a version
  async addTags(versionId: string, newTags: string[]): Promise<void> {
    const version = await this.getVersionById(versionId);
    if (!version) throw new Error('Version not found');
    
    const mergedTags = [...new Set([...(version.tags || []), ...newTags])];
    const { error } = await supabase
      .from('render_versions')
      .update({ tags: mergedTags, updated_at: new Date().toISOString() })
      .eq('id', versionId);
    if (error) throw error;
  }

  // 10. Rate a version (1-5 stars)
  async rateVersion(versionId: string, rating: number): Promise<void> {
    if (rating < 1 || rating > 5) throw new Error('Rating must be between 1 and 5');
    const { error } = await supabase
      .from('render_versions')
      .update({ user_rating: rating, updated_at: new Date().toISOString() })
      .eq('id', versionId);
    if (error) throw error;
  }

  // 11. Delete a version (not allowed for final versions per RLS)
  async deleteVersion(versionId: string): Promise<void> {
    const { error } = await supabase
      .from('render_versions')
      .delete()
      .eq('id', versionId);
    if (error) throw error;
  }

  // 12. Get version history with lineage
  async getVersionHistory(roomId: string): Promise<VersionHistory> {
    const versions = await this.getRenderVersions(roomId);
    const lineage = this.buildLineage(versions);
    
    return {
      versions,
      totalCount: versions.length,
      lineage,
    };
  }

  // 13. Calculate changes between parent and new version (private)
  private calculateChanges(parent: RenderVersion, input: CreateVersionInput): any[] {
    const changes: any[] = [];
    
    // Compare style config
    const styleChanges = this.getStyleDifferences(parent.style_config, input.style_config || {});
    styleChanges.forEach(change => {
      changes.push({ type: 'style', ...change });
    });

    // Compare generation params
    const paramChanges = this.getParamDifferences(parent.generation_params, input.generation_params || {});
    paramChanges.forEach(change => {
      changes.push({ type: 'param', ...change });
    });

    // Compare quality score
    if (parent.quality_score !== input.quality_score) {
      changes.push({
        type: 'quality',
        field: 'quality_score',
        oldValue: parent.quality_score,
        newValue: input.quality_score,
        changeType: 'modified',
      });
    }

    return changes;
  }

  // 14. Generate human-readable change summary (private)
  private generateChangeSummary(changes: any[]): string {
    if (changes.length === 0) return 'No changes from parent';
    
    const styleCount = changes.filter(c => c.type === 'style').length;
    const paramCount = changes.filter(c => c.type === 'param').length;
    const qualityChange = changes.find(c => c.type === 'quality');

    const parts: string[] = [];
    if (styleCount > 0) parts.push(`${styleCount} style change${styleCount > 1 ? 's' : ''}`);
    if (paramCount > 0) parts.push(`${paramCount} param change${paramCount > 1 ? 's' : ''}`);
    if (qualityChange) {
      const delta = (qualityChange.newValue || 0) - (qualityChange.oldValue || 0);
      parts.push(`quality ${delta >= 0 ? '+' : ''}${delta}%`);
    }

    return parts.join(', ') || 'Minor changes';
  }

  // 15. Get style differences (private)
  private getStyleDifferences(old: Record<string, any>, current: Record<string, any>): StyleChange[] {
    const changes: StyleChange[] = [];
    const allKeys = new Set([...Object.keys(old || {}), ...Object.keys(current || {})]);
    
    allKeys.forEach(key => {
      const oldVal = old?.[key];
      const newVal = current?.[key];
      
      if (oldVal === undefined && newVal !== undefined) {
        changes.push({ field: key, oldValue: null, newValue: newVal, changeType: 'added' });
      } else if (oldVal !== undefined && newVal === undefined) {
        changes.push({ field: key, oldValue: oldVal, newValue: null, changeType: 'removed' });
      } else if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
        changes.push({ field: key, oldValue: oldVal, newValue: newVal, changeType: 'modified' });
      }
    });
    
    return changes;
  }

  // 16. Get parameter differences (private)
  private getParamDifferences(old: Record<string, any>, current: Record<string, any>): ParamChange[] {
    const changes: ParamChange[] = [];
    const allKeys = new Set([...Object.keys(old || {}), ...Object.keys(current || {})]);
    
    allKeys.forEach(key => {
      const oldVal = old?.[key];
      const newVal = current?.[key];
      
      if (oldVal === undefined && newVal !== undefined) {
        changes.push({ field: key, oldValue: null, newValue: newVal, changeType: 'added' });
      } else if (oldVal !== undefined && newVal === undefined) {
        changes.push({ field: key, oldValue: oldVal, newValue: null, changeType: 'removed' });
      } else if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
        changes.push({ field: key, oldValue: oldVal, newValue: newVal, changeType: 'modified' });
      }
    });
    
    return changes;
  }

  // Helper: Generate comparison summary
  private generateComparisonSummary(
    styleChanges: StyleChange[], 
    paramChanges: ParamChange[], 
    qualityDelta: number
  ): string {
    const parts: string[] = [];
    
    if (styleChanges.length > 0) {
      const added = styleChanges.filter(c => c.changeType === 'added').length;
      const removed = styleChanges.filter(c => c.changeType === 'removed').length;
      const modified = styleChanges.filter(c => c.changeType === 'modified').length;
      parts.push(`Styles: ${added} added, ${removed} removed, ${modified} modified`);
    }
    
    if (paramChanges.length > 0) {
      const added = paramChanges.filter(c => c.changeType === 'added').length;
      const removed = paramChanges.filter(c => c.changeType === 'removed').length;
      const modified = paramChanges.filter(c => c.changeType === 'modified').length;
      parts.push(`Params: ${added} added, ${removed} removed, ${modified} modified`);
    }
    
    if (qualityDelta !== 0) {
      parts.push(`Quality: ${qualityDelta >= 0 ? '+' : ''}${qualityDelta}%`);
    }
    
    return parts.length > 0 ? parts.join(' | ') : 'No significant differences';
  }

  // Helper: Build version lineage tree
  private buildLineage(versions: RenderVersion[]): RenderVersion[] {
    if (versions.length === 0) return [];
    
    const versionMap = new Map(versions.map(v => [v.id, v]));
    const lineage: RenderVersion[] = [];
    
    // Start from the latest version and trace back
    let current = versions[0];
    while (current) {
      lineage.push(current);
      if (current.parent_version_id) {
        current = versionMap.get(current.parent_version_id)!;
      } else {
        break;
      }
    }
    
    return lineage;
  }
}

export const versionControlService = new VersionControlService();
