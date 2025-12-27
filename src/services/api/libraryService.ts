import { supabase } from '@/integrations/supabase/client';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export interface CatalogRequest {
  imageUrl: string;
  projectId: string;
  roomId: string;
  roomType: string;
  designStyle: string;
  uploadSource: 'pinterest' | 'instagram' | 'upload' | 'paste' | 'url';
  userConsent: boolean;
  analysisData?: Record<string, unknown>;
}

export interface CatalogResult {
  cataloged: boolean;
  reason?: string;
  library_id?: string;
  message: string;
  badge?: string;
  existing_image_id?: string;
  is_duplicate?: boolean;
}

export interface LibraryImage {
  id: string;
  image_url: string;
  thumbnail_url: string | null;
  source_type: 'user_upload' | 'houspire_generated';
  room_type: string;
  design_style: string;
  city: string | null;
  quality_score: number | null;
  tier: 'featured' | 'standard' | 'learning' | 'unverified';
  approval_rate: number | null;
  times_selected: number;
  tags: string[] | null;
  ranking_score: number;
}

export interface AutoCatalogResult {
  project_id: string;
  total_rooms: number;
  cataloged: number;
  featured: number;
  standard: number;
  learning: number;
  skipped: number;
  results: {
    room_id: string;
    cataloged: boolean;
    reason?: string;
    library_id?: string;
    tier?: string;
    message: string;
  }[];
}

export const libraryService = {
  /**
   * Catalog a user-uploaded reference image to the library
   */
  async catalogUserUpload(request: CatalogRequest): Promise<CatalogResult> {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return {
        cataloged: false,
        reason: 'not_authenticated',
        message: 'Please log in to share references.'
      };
    }

    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/catalog-user-upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const error = await response.json();
        return {
          cataloged: false,
          reason: 'api_error',
          message: error.error || 'Failed to catalog image.'
        };
      }

      return await response.json();
    } catch (error) {
      console.error('Catalog error:', error);
      return {
        cataloged: false,
        reason: 'network_error',
        message: 'Network error. Using for this project only.'
      };
    }
  },

  /**
   * Auto-catalog all approved renders from a project after Phase 7 export
   */
  async autoCatalogProjectRenders(projectId: string): Promise<AutoCatalogResult | null> {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      console.error('Not authenticated for auto-catalog');
      return null;
    }

    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/auto-catalog-renders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ projectId }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Auto-catalog failed:', error);
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('Auto-catalog error:', error);
      return null;
    }
  },

  /**
   * Browse library images with filters
   */
  async browseLibrary(filters: {
    roomType?: string;
    designStyle?: string;
    city?: string;
    tier?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ images: LibraryImage[]; total: number }> {
    let query = supabase
      .from('style_library')
      .select('*', { count: 'exact' })
      .eq('status', 'active')
      .order('ranking_score', { ascending: false });

    if (filters.roomType) {
      query = query.eq('room_type', filters.roomType);
    }
    if (filters.designStyle) {
      query = query.eq('design_style', filters.designStyle);
    }
    if (filters.city) {
      query = query.eq('city', filters.city);
    }
    if (filters.tier && ['featured', 'standard', 'learning', 'unverified'].includes(filters.tier)) {
      query = query.eq('tier', filters.tier as 'featured' | 'standard' | 'learning' | 'unverified');
    }

    const limit = filters.limit || 20;
    const offset = filters.offset || 0;
    query = query.range(offset, offset + limit - 1);

    const { data, count, error } = await query;

    if (error) {
      console.error('Browse library error:', error);
      return { images: [], total: 0 };
    }

    return {
      images: (data || []) as unknown as LibraryImage[],
      total: count || 0
    };
  },

  /**
   * Get top performing references for a room type
   */
  async getTopPerformers(roomType: string, designStyle?: string, limit = 10): Promise<LibraryImage[]> {
    let query = supabase
      .from('style_library')
      .select('*')
      .eq('status', 'active')
      .eq('room_type', roomType)
      .gte('times_selected', 5)
      .gte('approval_rate', 0.8)
      .order('approval_rate', { ascending: false })
      .order('times_selected', { ascending: false })
      .limit(limit);

    if (designStyle) {
      query = query.eq('design_style', designStyle);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Get top performers error:', error);
      return [];
    }

    return (data || []) as unknown as LibraryImage[];
  },

  /**
   * Record that user selected a library image
   */
  async trackSelection(
    libraryImageId: string,
    projectId: string,
    roomId: string
  ): Promise<string | null> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.error('Not authenticated');
      return null;
    }

    const { data, error } = await supabase.rpc('track_library_selection', {
      p_library_image_id: libraryImageId,
      p_project_id: projectId,
      p_room_id: roomId,
      p_user_id: user.id
    });

    if (error) {
      console.error('Track selection error:', error);
      return null;
    }

    return data as string;
  },

  /**
   * Record outcome of a render using a library reference
   */
  async recordOutcome(
    usageId: string,
    approved: boolean,
    qualityScore?: number
  ): Promise<boolean> {
    const { error } = await supabase.rpc('record_library_usage_outcome', {
      p_usage_id: usageId,
      p_approved: approved,
      p_quality_score: qualityScore || null
    });

    if (error) {
      console.error('Record outcome error:', error);
      return false;
    }

    return true;
  },

  /**
   * Increment view count for a library image
   */
  async incrementViews(libraryImageId: string): Promise<void> {
    const { error } = await supabase.rpc('increment_library_views', {
      lib_id: libraryImageId
    });

    if (error) {
      console.error('Increment views error:', error);
    }
  },

  /**
   * Get user's library contributions
   */
  async getUserContributions(): Promise<{
    total_contributions: number;
    featured_count: number;
    standard_count: number;
    total_times_selected: number;
    total_approvals: number;
    avg_approval_rate: number | null;
  } | null> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;

    const { data, error } = await supabase
      .from('user_library_contributions')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Get contributions error:', error);
      return null;
    }

    return data as {
      total_contributions: number;
      featured_count: number;
      standard_count: number;
      total_times_selected: number;
      total_approvals: number;
      avg_approval_rate: number | null;
    } | null;
  },

  /**
   * Search library by tags
   */
  async searchByTags(tags: string[], limit = 20): Promise<LibraryImage[]> {
    const { data, error } = await supabase
      .from('style_library')
      .select('*')
      .eq('status', 'active')
      .overlaps('tags', tags)
      .order('ranking_score', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Search by tags error:', error);
      return [];
    }

    return (data || []) as unknown as LibraryImage[];
  }
};
