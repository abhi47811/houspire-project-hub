import { supabase } from '@/integrations/supabase/client';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

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
  times_viewed: number;
  times_led_to_approval: number;
  times_led_to_rejection: number;
  initial_performance_known: boolean;
  tags: string[] | null;
  ranking_score: number;
  color_palette: Record<string, string> | null;
  created_at: string;
  last_used_at: string | null;
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

export interface RankingFactors {
  source_bonus: number;        // 0-40 points
  performance_score: number;   // 0-30 points
  city_match_bonus: number;    // 0-20 points
  freshness_bonus: number;     // 0-10 points
  tier_bonus: number;          // 0-10 points
  confidence_bonus: number;    // 0-5 points
  total: number;               // 0-115 max
}

export interface RankingRequest {
  roomType: string;
  designStyle: string;
  userCity: string;
  limit?: number;
  sourceType?: 'all' | 'user_upload' | 'houspire_generated';
  minQuality?: number;
}

// ============================================================================
// CITY SIMILARITY MAPPING
// ============================================================================

const SIMILAR_CITIES: Record<string, string[]> = {
  'Mumbai': ['Pune', 'Thane', 'Navi Mumbai'],
  'Delhi': ['Noida', 'Gurgaon', 'Ghaziabad', 'Faridabad'],
  'Bangalore': ['Mysore', 'Mangalore'],
  'Chennai': ['Coimbatore', 'Madurai'],
  'Kolkata': ['Howrah'],
  'Hyderabad': ['Secunderabad', 'Visakhapatnam'],
  'Pune': ['Mumbai', 'Nashik'],
  'Ahmedabad': ['Surat', 'Vadodara'],
  'Jaipur': ['Jodhpur', 'Udaipur'],
  'Lucknow': ['Kanpur', 'Agra'],
  'Surat': ['Ahmedabad', 'Vadodara']
};

// ============================================================================
// RANKING CALCULATION
// ============================================================================

function daysSince(dateString: string): number {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Calculate ranking factors for a library image
 * Total possible: 115 points (allows for tiebreakers beyond 100)
 */
export function calculateRankingFactors(
  image: LibraryImage,
  userCity: string
): RankingFactors {
  
  const factors: RankingFactors = {
    source_bonus: 0,
    performance_score: 0,
    city_match_bonus: 0,
    freshness_bonus: 0,
    tier_bonus: 0,
    confidence_bonus: 0,
    total: 0
  };
  
  // FACTOR 1: SOURCE TYPE BONUS (0-40 points)
  if (image.source_type === 'houspire_generated') {
    factors.source_bonus = 20;
    if (image.quality_score !== null) {
      if (image.quality_score >= 95) factors.source_bonus += 20;
      else if (image.quality_score >= 90) factors.source_bonus += 15;
      else if (image.quality_score >= 85) factors.source_bonus += 10;
    }
  } else {
    factors.source_bonus = 10;
    if (image.approval_rate !== null && image.times_selected >= 5) {
      if (image.approval_rate >= 0.9) factors.source_bonus += 25;
      else if (image.approval_rate >= 0.8) factors.source_bonus += 15;
      else if (image.approval_rate >= 0.7) factors.source_bonus += 5;
    }
  }
  
  // FACTOR 2: PERFORMANCE SCORE (0-30 points)
  if (image.times_selected > 0 && image.approval_rate !== null) {
    const baseScore = image.approval_rate * 30;
    factors.performance_score = Math.round(baseScore);
    
    if (image.times_selected >= 20) {
      // Very reliable, keep full score
    } else if (image.times_selected >= 10) {
      factors.performance_score *= 0.95;
    } else if (image.times_selected >= 5) {
      factors.performance_score *= 0.90;
    } else {
      factors.performance_score *= 0.85;
    }
    factors.performance_score = Math.round(factors.performance_score);
  } else {
    if (image.initial_performance_known) {
      factors.performance_score = 20;
    } else {
      factors.performance_score = 15;
    }
  }
  
  // FACTOR 3: CITY MATCH BONUS (0-20 points)
  if (image.city === userCity) {
    factors.city_match_bonus = 20;
  } else if (image.city && SIMILAR_CITIES[userCity]?.includes(image.city)) {
    factors.city_match_bonus = 10;
  }
  
  // FACTOR 4: FRESHNESS BONUS (0-10 points)
  const ageInDays = daysSince(image.created_at);
  if (ageInDays < 30) {
    factors.freshness_bonus = 10;
  } else if (ageInDays < 90) {
    factors.freshness_bonus = 7;
  } else if (ageInDays < 180) {
    factors.freshness_bonus = 4;
  } else if (ageInDays < 365) {
    factors.freshness_bonus = 2;
  }
  
  // FACTOR 5: TIER BONUS (0-10 points)
  if (image.tier === 'featured') {
    factors.tier_bonus = 10;
  } else if (image.tier === 'standard') {
    factors.tier_bonus = 6;
  } else if (image.tier === 'unverified') {
    factors.tier_bonus = 3;
  }
  
  // FACTOR 6: CONFIDENCE BONUS (0-5 points)
  if (image.times_selected >= 20) {
    factors.confidence_bonus = 5;
  } else if (image.times_selected >= 10) {
    factors.confidence_bonus = 3;
  } else if (image.times_selected >= 5) {
    factors.confidence_bonus = 1;
  }
  
  // CALCULATE TOTAL
  factors.total = 
    factors.source_bonus +
    factors.performance_score +
    factors.city_match_bonus +
    factors.freshness_bonus +
    factors.tier_bonus +
    factors.confidence_bonus;
  
  return factors;
}

// ============================================================================
// LIBRARY SERVICE
// ============================================================================

export const libraryService = {
  /**
   * Get ranked library images for user query with real-time scoring
   */
  async getRankedLibraryImages(request: RankingRequest): Promise<LibraryImage[]> {
    try {
      // Fetch candidate images from database
      let query = supabase
        .from('style_library')
        .select('*')
        .eq('room_type', request.roomType)
        .eq('design_style', request.designStyle)
        .eq('status', 'active')
        .in('tier', ['featured', 'standard', 'unverified'])
        .order('ranking_score', { ascending: false })
        .limit((request.limit || 20) * 2); // Get more for re-ranking

      if (request.sourceType && request.sourceType !== 'all') {
        query = query.eq('source_type', request.sourceType);
      }
      
      if (request.minQuality && request.minQuality > 0) {
        query = query.gte('quality_score', request.minQuality);
      }

      const { data: images, error } = await query;

      if (error || !images) {
        console.error('Error fetching library images:', error);
        return [];
      }

      // Calculate real-time ranking scores
      const scoredImages = images.map(img => {
        const typedImg = img as unknown as LibraryImage;
        const factors = calculateRankingFactors(typedImg, request.userCity);
        return {
          ...typedImg,
          ranking_score: factors.total,
          _ranking_factors: factors
        };
      });

      // Sort by calculated score
      scoredImages.sort((a, b) => {
        if (b.ranking_score !== a.ranking_score) {
          return b.ranking_score - a.ranking_score;
        }
        const aApproval = a.approval_rate || 0;
        const bApproval = b.approval_rate || 0;
        if (bApproval !== aApproval) {
          return bApproval - aApproval;
        }
        if (b.times_selected !== a.times_selected) {
          return b.times_selected - a.times_selected;
        }
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });

      return scoredImages.slice(0, request.limit || 20);
    } catch (error) {
      console.error('Error in getRankedLibraryImages:', error);
      return [];
    }
  },

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
      .in('tier', ['featured', 'standard', 'unverified'])
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
    if (filters.tier && ['featured', 'standard', 'unverified'].includes(filters.tier)) {
      query = query.eq('tier', filters.tier as 'featured' | 'standard' | 'unverified');
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
