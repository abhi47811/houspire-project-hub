import { supabase } from '@/integrations/supabase/client';

export interface RenderVersion {
  id: string;
  version_number: number;
  image_url: string;
  storage_path: string | null;
  prompt_used: string | null;
  quality_score: number | null;
  created_at: string;
  is_final: boolean;
  style_config?: Record<string, unknown>;
  generation_params?: Record<string, unknown>;
}

interface CreateVersionParams {
  room_id: string;
  render_id: string;
  render_url: string;
  storage_path?: string;
  prompt_used?: string;
  quality_score?: number;
  style_config?: Record<string, unknown>;
  generation_params?: Record<string, unknown>;
}

export const versionControlService = {
  /**
   * Get all versions for a room from the renders table
   */
  async getVersions(roomId: string): Promise<RenderVersion[]> {
    const { data, error } = await supabase
      .from('renders')
      .select('id, image_url, storage_path, prompt_used, quality_score, created_at, version_number, approval_status, render_versions')
      .eq('room_id', roomId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Map renders to version format
    return (data || []).map((render, index) => ({
      id: render.id,
      version_number: render.version_number || data.length - index,
      image_url: render.image_url,
      storage_path: render.storage_path,
      prompt_used: render.prompt_used,
      quality_score: render.quality_score ? Number(render.quality_score) : null,
      created_at: render.created_at,
      is_final: render.approval_status === 'approved',
    }));
  },

  /**
   * Get a single version by ID
   */
  async getVersion(versionId: string): Promise<RenderVersion | null> {
    const { data, error } = await supabase
      .from('renders')
      .select('id, image_url, storage_path, prompt_used, quality_score, created_at, version_number, approval_status')
      .eq('id', versionId)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    return {
      id: data.id,
      version_number: data.version_number || 1,
      image_url: data.image_url,
      storage_path: data.storage_path,
      prompt_used: data.prompt_used,
      quality_score: data.quality_score ? Number(data.quality_score) : null,
      created_at: data.created_at,
      is_final: data.approval_status === 'approved',
    };
  },

  /**
   * Create a new version (new render record)
   */
  async createVersion(params: CreateVersionParams): Promise<RenderVersion> {
    // Get the current max version number for this room
    const { data: existing } = await supabase
      .from('renders')
      .select('version_number')
      .eq('room_id', params.room_id)
      .order('version_number', { ascending: false })
      .limit(1);

    const nextVersionNumber = (existing?.[0]?.version_number || 0) + 1;

    const { data, error } = await supabase
      .from('renders')
      .insert({
        room_id: params.room_id,
        image_url: params.render_url,
        storage_path: params.storage_path,
        prompt_used: params.prompt_used,
        quality_score: params.quality_score,
        version_number: nextVersionNumber,
        approval_status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      version_number: data.version_number || nextVersionNumber,
      image_url: data.image_url,
      storage_path: data.storage_path,
      prompt_used: data.prompt_used,
      quality_score: data.quality_score ? Number(data.quality_score) : null,
      created_at: data.created_at,
      is_final: false,
    };
  },

  /**
   * Set a version as the final/approved version
   */
  async setAsFinal(versionId: string, roomId: string): Promise<void> {
    // First, unapprove all other versions for this room
    await supabase
      .from('renders')
      .update({ approval_status: 'pending', approved_at: null })
      .eq('room_id', roomId);

    // Then approve this version
    const { error } = await supabase
      .from('renders')
      .update({ 
        approval_status: 'approved',
        approved_at: new Date().toISOString(),
      })
      .eq('id', versionId);

    if (error) throw error;
  },

  /**
   * Delete a version (soft delete by setting status)
   */
  async deleteVersion(versionId: string): Promise<void> {
    const { error } = await supabase
      .from('renders')
      .delete()
      .eq('id', versionId);

    if (error) throw error;
  },

  /**
   * Restore a previous version as the current active render
   */
  async restoreVersion(versionId: string, roomId: string): Promise<RenderVersion> {
    // Get the version to restore
    const version = await this.getVersion(versionId);
    if (!version) throw new Error('Version not found');

    // Create a new version based on this one
    return this.createVersion({
      room_id: roomId,
      render_id: versionId,
      render_url: version.image_url,
      storage_path: version.storage_path || undefined,
      prompt_used: version.prompt_used || undefined,
      quality_score: version.quality_score || undefined,
    });
  },
};
