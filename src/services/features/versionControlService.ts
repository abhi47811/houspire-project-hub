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
  styleChanges: string[];
  paramChanges: string[];
  qualityDelta: number;
}

class VersionControlService {
  async getRenderVersions(roomId: string): Promise<RenderVersion[]> {
    const { data, error } = await supabase
      .from('render_versions')
      .select('*')
      .eq('room_id', roomId)
      .order('version_number', { ascending: false });

    if (error) throw error;
    return (data || []) as RenderVersion[];
  }

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

  async createVersion(input: CreateVersionInput): Promise<RenderVersion> {
    const { data: { user } } = await supabase.auth.getUser();
    
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
        created_by: user?.id || null,
      })
      .select()
      .single();

    if (error) throw error;
    return data as RenderVersion;
  }

  async compareVersions(v1Id: string, v2Id: string): Promise<VersionComparison> {
    const [version1, version2] = await Promise.all([
      this.getVersionById(v1Id),
      this.getVersionById(v2Id),
    ]);

    if (!version1 || !version2) throw new Error('Version not found');

    const styleChanges = this.getObjectDiff(version1.style_config, version2.style_config);
    const paramChanges = this.getObjectDiff(version1.generation_params, version2.generation_params);
    const qualityDelta = (version2.quality_score || 0) - (version1.quality_score || 0);

    return { version1, version2, styleChanges, paramChanges, qualityDelta };
  }

  async approveVersion(versionId: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase
      .from('render_versions')
      .update({ is_approved: true, approved_by: user?.id, approved_at: new Date().toISOString() })
      .eq('id', versionId);
    if (error) throw error;
  }

  async markAsFinal(versionId: string): Promise<void> {
    const { error } = await supabase
      .from('render_versions')
      .update({ is_final: true, is_approved: true })
      .eq('id', versionId);
    if (error) throw error;
  }

  async revertToVersion(versionId: string): Promise<RenderVersion> {
    const source = await this.getVersionById(versionId);
    if (!source) throw new Error('Version not found');

    const versions = await this.getRenderVersions(source.room_id);
    return this.createVersion({
      room_id: source.room_id,
      parent_version_id: versions[0]?.id || null,
      render_url: source.render_url,
      thumbnail_url: source.thumbnail_url,
      storage_path: source.storage_path,
      style_config: source.style_config,
      generation_params: source.generation_params,
      prompt_used: source.prompt_used || undefined,
      quality_score: source.quality_score,
      notes: `Reverted from v${source.version_number}`,
      tags: [...(source.tags || []), 'reverted'],
    });
  }

  async updateNotes(versionId: string, notes: string): Promise<void> {
    const { error } = await supabase.from('render_versions').update({ notes }).eq('id', versionId);
    if (error) throw error;
  }

  async addTags(versionId: string, newTags: string[]): Promise<void> {
    const version = await this.getVersionById(versionId);
    if (!version) throw new Error('Version not found');
    const merged = [...new Set([...(version.tags || []), ...newTags])];
    const { error } = await supabase.from('render_versions').update({ tags: merged }).eq('id', versionId);
    if (error) throw error;
  }

  async rateVersion(versionId: string, rating: number): Promise<void> {
    if (rating < 1 || rating > 5) throw new Error('Rating must be 1-5');
    const { error } = await supabase.from('render_versions').update({ user_rating: rating }).eq('id', versionId);
    if (error) throw error;
  }

  async deleteVersion(versionId: string): Promise<void> {
    const { error } = await supabase.from('render_versions').delete().eq('id', versionId);
    if (error) throw error;
  }

  private getObjectDiff(obj1: Record<string, any>, obj2: Record<string, any>): string[] {
    const diffs: string[] = [];
    const allKeys = new Set([...Object.keys(obj1 || {}), ...Object.keys(obj2 || {})]);
    allKeys.forEach(key => {
      if (JSON.stringify(obj1?.[key]) !== JSON.stringify(obj2?.[key])) {
        diffs.push(`${key}: ${JSON.stringify(obj1?.[key])} → ${JSON.stringify(obj2?.[key])}`);
      }
    });
    return diffs;
  }
}

export const versionControlService = new VersionControlService();
