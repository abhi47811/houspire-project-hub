/**
 * Smart AI Recommendations Service
 * Feature 2: AI-powered style, furniture, budget, and trend recommendations
 * 
 * 14+ methods | 8 interfaces | ~550-650 lines
 */

import { supabase } from "@/integrations/supabase/client";

// ============================================
// INTERFACES (8 Required)
// ============================================

export interface RoomContext {
  room_id: string;
  room_type: string;
  room_name?: string;
  dimensions: {
    length_feet?: number;
    width_feet?: number;
    height_feet?: number;
  };
  budget_tier: 'economy' | 'mid_range' | 'premium' | 'luxury';
  city?: string;
  selected_style?: string;
  analysis_data?: {
    window_count?: number;
    door_count?: number;
    ceiling_fan_detected?: boolean;
    natural_light?: 'low' | 'medium' | 'high';
    room_shape?: string;
  };
  project_context?: {
    project_id: string;
    total_rooms?: number;
    project_style?: string;
    estimated_budget?: number;
  };
  existing_furniture?: Array<{
    item: string;
    category: string;
    keep: boolean;
  }>;
}

export interface StyleRecommendation {
  id: string;
  style_name: string;
  confidence_score: number;
  estimated_cost_range: {
    min: number;
    max: number;
    currency: string;
  };
  budget_fit: 'under_budget' | 'within_budget' | 'over_budget';
  pros: string[];
  cons: string[];
  sample_image_url?: string;
  color_palette: string[];
  key_elements: string[];
  reasoning: string;
  match_factors: string[];
}

export interface FurniturePlacement {
  id: string;
  item_name: string;
  category: 'seating' | 'table' | 'storage' | 'lighting' | 'decor' | 'bed' | 'appliance' | 'other';
  dimensions: {
    width: number;
    depth: number;
    height: number;
    unit: 'feet' | 'inches' | 'cm';
  };
  placement: {
    x: number;
    y: number;
    rotation: number;
    zone: string;
  };
  estimated_cost: number;
  priority: 'essential' | 'recommended' | 'optional';
  rationale: string;
  alternatives?: Array<{
    name: string;
    cost: number;
    pros: string[];
  }>;
}

export interface BudgetAlternative {
  id: string;
  original_item: {
    name: string;
    category: string;
    cost: number;
    specification?: string;
  };
  alternative_item: {
    name: string;
    category: string;
    cost: number;
    specification?: string;
    brand_suggestion?: string;
  };
  savings_amount: number;
  savings_percent: number;
  quality_impact: 'none' | 'minimal' | 'moderate' | 'significant';
  recommendation_strength: 'strongly_recommend' | 'recommend' | 'consider' | 'caution';
  reasoning: string;
  trade_offs?: string[];
}

export interface TrendAnalysis {
  city?: string;
  room_type?: string;
  analysis_date: string;
  city_trends?: {
    top_styles: Array<{
      style_name: string;
      adoption_rate: number;
      trend_direction: 'rising' | 'stable' | 'declining';
      popularity_rank: number;
    }>;
    trending_items: Array<{
      item_name: string;
      category: string;
      growth_rate: number;
    }>;
    seasonal_recommendations: string[];
  };
  global_trends?: {
    rising_styles: string[];
    stable_styles: string[];
    declining_styles: string[];
    regional_insights: Array<{
      region: string;
      top_style: string;
      unique_preference?: string;
    }>;
  };
}

export interface SimilarProject {
  id: string;
  room_id: string;
  room_name?: string;
  room_type: string;
  project_id: string;
  project_name?: string;
  design_style?: string;
  similarity_score: number;
  matching_factors: string[];
  preview_image_url?: string;
  final_render_url?: string;
  city?: string;
  budget_tier?: string;
}

export interface AIRecommendation {
  id: string;
  room_id: string;
  recommendation_type: 'style' | 'furniture' | 'budget' | 'trend' | 'comprehensive';
  room_context: RoomContext;
  recommended_styles: StyleRecommendation[];
  furniture_suggestions: FurniturePlacement[];
  budget_alternatives: BudgetAlternative[];
  trend_data: TrendAnalysis;
  model_used: string;
  confidence_score: number | null;
  reasoning: string | null;
  was_accepted: boolean;
  selected_option: string | null;
  user_feedback: string | null;
  generated_at: string;
  expires_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface RecommendationFeedback {
  id?: string;
  recommendation_id: string;
  room_id: string;
  feedback_type: 'accept' | 'reject' | 'modify' | 'helpful' | 'not_helpful' | 'other';
  selected_option?: string;
  rejection_reason?: string;
  modification_details?: Record<string, unknown>;
  helpfulness_score?: number;
  user_comment?: string;
  feedback_data?: Record<string, unknown>;
  created_by?: string;
  created_at?: string;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Build room context from room, project, and analysis data
 */
export function buildRoomContext(
  room: {
    id: string;
    room_type?: string | null;
    room_name?: string | null;
    length_feet?: number | null;
    width_feet?: number | null;
    height_feet?: number | null;
    selected_style?: string | null;
    ceiling_fan_detected?: boolean | null;
  },
  project?: {
    id: string;
    budget_tier?: string | null;
    city?: string | null;
    total_rooms?: number | null;
    estimated_budget?: number | null;
    name?: string;
  },
  analysis?: {
    window_count?: number | null;
    door_count?: number | null;
    detected_length_feet?: number | null;
    detected_width_feet?: number | null;
    detected_height_feet?: number | null;
  }
): RoomContext {
  return {
    room_id: room.id,
    room_type: room.room_type || 'living_room',
    room_name: room.room_name || undefined,
    dimensions: {
      length_feet: analysis?.detected_length_feet || room.length_feet || undefined,
      width_feet: analysis?.detected_width_feet || room.width_feet || undefined,
      height_feet: analysis?.detected_height_feet || room.height_feet || undefined,
    },
    budget_tier: (project?.budget_tier as RoomContext['budget_tier']) || 'mid_range',
    city: project?.city || undefined,
    selected_style: room.selected_style || undefined,
    analysis_data: {
      window_count: analysis?.window_count || undefined,
      door_count: analysis?.door_count || undefined,
      ceiling_fan_detected: room.ceiling_fan_detected || false,
    },
    project_context: project ? {
      project_id: project.id,
      total_rooms: project.total_rooms || undefined,
      estimated_budget: project.estimated_budget || undefined,
    } : undefined,
  };
}

/**
 * Call the AI recommendations edge function
 */
async function callRecommendationAI(
  roomContext: RoomContext,
  type: 'style' | 'furniture' | 'budget' | 'trend' | 'comprehensive',
  additionalData?: Record<string, unknown>
): Promise<{
  success: boolean;
  data?: unknown;
  error?: string;
}> {
  try {
    const { data, error } = await supabase.functions.invoke('generate-recommendations', {
      body: {
        room_context: roomContext,
        recommendation_type: type,
        additional_data: additionalData,
      },
    });

    if (error) {
      console.error('AI recommendation error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('AI recommendation call failed:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

// ============================================
// CORE METHODS (4)
// ============================================

/**
 * 1. Get all recommendations for a room
 */
export async function getRecommendations(
  roomId: string,
  type?: AIRecommendation['recommendation_type']
): Promise<{ data: AIRecommendation[] | null; error: Error | null }> {
  try {
    let query = supabase
      .from('ai_recommendations')
      .select('*')
      .eq('room_id', roomId)
      .order('generated_at', { ascending: false });

    if (type) {
      query = query.eq('recommendation_type', type);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Transform data to match interface
    const transformed: AIRecommendation[] = (data || []).map((rec) => ({
      id: rec.id,
      room_id: rec.room_id,
      recommendation_type: rec.recommendation_type as AIRecommendation['recommendation_type'],
      room_context: rec.room_context as unknown as RoomContext,
      recommended_styles: (rec.recommended_styles || []) as unknown as StyleRecommendation[],
      furniture_suggestions: (rec.furniture_suggestions || []) as unknown as FurniturePlacement[],
      budget_alternatives: (rec.budget_alternatives || []) as unknown as BudgetAlternative[],
      trend_data: (rec.trend_data || { analysis_date: new Date().toISOString() }) as unknown as TrendAnalysis,
      model_used: rec.model_used || 'google/gemini-2.5-flash',
      confidence_score: rec.confidence_score ? Number(rec.confidence_score) : null,
      reasoning: rec.reasoning,
      was_accepted: rec.was_accepted || false,
      selected_option: rec.selected_option,
      user_feedback: rec.user_feedback,
      generated_at: rec.generated_at,
      expires_at: rec.expires_at,
      created_by: rec.created_by,
      created_at: rec.created_at,
      updated_at: rec.updated_at,
    }));

    return { data: transformed, error: null };
  } catch (err) {
    console.error('Error fetching recommendations:', err);
    return { data: null, error: err as Error };
  }
}

/**
 * 2. Get a single recommendation by ID
 */
export async function getRecommendationById(
  id: string
): Promise<{ data: AIRecommendation | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('ai_recommendations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!data) return { data: null, error: null };

    const transformed: AIRecommendation = {
      id: data.id,
      room_id: data.room_id,
      recommendation_type: data.recommendation_type as AIRecommendation['recommendation_type'],
      room_context: data.room_context as unknown as RoomContext,
      recommended_styles: (data.recommended_styles || []) as unknown as StyleRecommendation[],
      furniture_suggestions: (data.furniture_suggestions || []) as unknown as FurniturePlacement[],
      budget_alternatives: (data.budget_alternatives || []) as unknown as BudgetAlternative[],
      trend_data: (data.trend_data || { analysis_date: new Date().toISOString() }) as unknown as TrendAnalysis,
      model_used: data.model_used || 'google/gemini-2.5-flash',
      confidence_score: data.confidence_score ? Number(data.confidence_score) : null,
      reasoning: data.reasoning,
      was_accepted: data.was_accepted || false,
      selected_option: data.selected_option,
      user_feedback: data.user_feedback,
      generated_at: data.generated_at,
      expires_at: data.expires_at,
      created_by: data.created_by,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };

    return { data: transformed, error: null };
  } catch (err) {
    console.error('Error fetching recommendation:', err);
    return { data: null, error: err as Error };
  }
}

/**
 * 3. Generate style recommendations via AI
 */
export async function generateStyleRecommendations(
  roomContext: RoomContext
): Promise<{ data: AIRecommendation | null; error: Error | null }> {
  try {
    const result = await callRecommendationAI(roomContext, 'style');

    if (!result.success || !result.data) {
      throw new Error(result.error || 'Failed to generate style recommendations');
    }

    const aiResponse = result.data as {
      recommendation_id?: string;
      styles?: StyleRecommendation[];
      confidence_score?: number;
      reasoning?: string;
    };

    // Fetch the created recommendation
    if (aiResponse.recommendation_id) {
      return getRecommendationById(aiResponse.recommendation_id);
    }

    return { data: null, error: new Error('No recommendation ID returned') };
  } catch (err) {
    console.error('Error generating style recommendations:', err);
    return { data: null, error: err as Error };
  }
}

/**
 * 4. Generate furniture placement suggestions via AI
 */
export async function generateFurniturePlacement(
  roomContext: RoomContext
): Promise<{ data: AIRecommendation | null; error: Error | null }> {
  try {
    const result = await callRecommendationAI(roomContext, 'furniture');

    if (!result.success || !result.data) {
      throw new Error(result.error || 'Failed to generate furniture placement');
    }

    const aiResponse = result.data as { recommendation_id?: string };

    if (aiResponse.recommendation_id) {
      return getRecommendationById(aiResponse.recommendation_id);
    }

    return { data: null, error: new Error('No recommendation ID returned') };
  } catch (err) {
    console.error('Error generating furniture placement:', err);
    return { data: null, error: err as Error };
  }
}

// ============================================
// BUDGET METHODS (2)
// ============================================

/**
 * 5. Generate budget alternatives via AI
 */
export async function generateBudgetAlternatives(
  roomContext: RoomContext,
  budgetItems: Array<{ name: string; category: string; cost: number; specification?: string }>
): Promise<{ data: AIRecommendation | null; error: Error | null }> {
  try {
    const result = await callRecommendationAI(roomContext, 'budget', { budget_items: budgetItems });

    if (!result.success || !result.data) {
      throw new Error(result.error || 'Failed to generate budget alternatives');
    }

    const aiResponse = result.data as { recommendation_id?: string };

    if (aiResponse.recommendation_id) {
      return getRecommendationById(aiResponse.recommendation_id);
    }

    return { data: null, error: new Error('No recommendation ID returned') };
  } catch (err) {
    console.error('Error generating budget alternatives:', err);
    return { data: null, error: err as Error };
  }
}

/**
 * 6. Calculate potential savings for a room
 */
export async function calculatePotentialSavings(
  roomId: string
): Promise<{ data: { total_savings: number; savings_by_category: Record<string, number> } | null; error: Error | null }> {
  try {
    const { data: recommendations, error } = await getRecommendations(roomId, 'budget');

    if (error) throw error;

    if (!recommendations || recommendations.length === 0) {
      return { data: { total_savings: 0, savings_by_category: {} }, error: null };
    }

    let totalSavings = 0;
    const savingsByCategory: Record<string, number> = {};

    for (const rec of recommendations) {
      for (const alt of rec.budget_alternatives) {
        totalSavings += alt.savings_amount;
        const category = alt.original_item.category;
        savingsByCategory[category] = (savingsByCategory[category] || 0) + alt.savings_amount;
      }
    }

    return { data: { total_savings: totalSavings, savings_by_category: savingsByCategory }, error: null };
  } catch (err) {
    console.error('Error calculating savings:', err);
    return { data: null, error: err as Error };
  }
}

// ============================================
// TREND METHODS (2)
// ============================================

/**
 * 7. Get trend analysis for a city and room type
 */
export async function getTrendAnalysis(
  city?: string,
  roomType?: string
): Promise<{ data: TrendAnalysis | null; error: Error | null }> {
  try {
    // Query library data to compute trends
    let query = supabase
      .from('style_library')
      .select('design_style, room_type, city, times_selected, approval_rate, created_at')
      .eq('status', 'active')
      .order('times_selected', { ascending: false })
      .limit(100);

    if (city) {
      query = query.eq('city', city);
    }
    if (roomType) {
      query = query.eq('room_type', roomType);
    }

    const { data: libraryData, error } = await query;

    if (error) throw error;

    // Aggregate trend data
    const styleStats: Record<string, { count: number; approval_sum: number; selections: number }> = {};
    
    for (const item of libraryData || []) {
      const style = item.design_style;
      if (!styleStats[style]) {
        styleStats[style] = { count: 0, approval_sum: 0, selections: 0 };
      }
      styleStats[style].count += 1;
      styleStats[style].approval_sum += item.approval_rate || 0;
      styleStats[style].selections += item.times_selected || 0;
    }

    const topStyles = Object.entries(styleStats)
      .map(([style, stats]) => {
        const trendDir: 'rising' | 'stable' | 'declining' = stats.selections > 5 ? 'rising' : stats.selections > 2 ? 'stable' : 'declining';
        return {
          style_name: style,
          adoption_rate: stats.count > 0 ? Math.round((stats.approval_sum / stats.count) * 100) : 0,
          trend_direction: trendDir,
          popularity_rank: 0,
        };
      })
      .sort((a, b) => b.adoption_rate - a.adoption_rate)
      .slice(0, 10)
      .map((style, index) => ({ ...style, popularity_rank: index + 1 }));

    const trendAnalysis: TrendAnalysis = {
      city: city || undefined,
      room_type: roomType || undefined,
      analysis_date: new Date().toISOString(),
      city_trends: city ? {
        top_styles: topStyles.slice(0, 5),
        trending_items: [],
        seasonal_recommendations: ['Consider natural materials for summer', 'Warm textures for winter comfort'],
      } : undefined,
      global_trends: {
        rising_styles: topStyles.filter(s => s.trend_direction === 'rising').map(s => s.style_name).slice(0, 5),
        stable_styles: topStyles.filter(s => s.trend_direction === 'stable').map(s => s.style_name).slice(0, 5),
        declining_styles: topStyles.filter(s => s.trend_direction === 'declining').map(s => s.style_name).slice(0, 3),
        regional_insights: [],
      },
    };

    return { data: trendAnalysis, error: null };
  } catch (err) {
    console.error('Error fetching trend analysis:', err);
    return { data: null, error: err as Error };
  }
}

/**
 * 8. Get globally trending styles
 */
export async function getTrendingStyles(): Promise<{ data: Array<{ style: string; trend: 'rising' | 'stable' | 'declining'; adoption_rate: number }> | null; error: Error | null }> {
  try {
    const { data: libraryData, error } = await supabase
      .from('style_library')
      .select('design_style, times_selected, approval_rate')
      .eq('status', 'active')
      .order('times_selected', { ascending: false })
      .limit(200);

    if (error) throw error;

    const styleAgg: Record<string, { selections: number; approvalSum: number; count: number }> = {};

    for (const item of libraryData || []) {
      const style = item.design_style;
      if (!styleAgg[style]) {
        styleAgg[style] = { selections: 0, approvalSum: 0, count: 0 };
      }
      styleAgg[style].selections += item.times_selected || 0;
      styleAgg[style].approvalSum += item.approval_rate || 0;
      styleAgg[style].count += 1;
    }

    const trends = Object.entries(styleAgg)
      .map(([style, stats]) => {
        const trendDir: 'rising' | 'stable' | 'declining' = stats.selections > 10 ? 'rising' : stats.selections > 3 ? 'stable' : 'declining';
        return {
          style,
          trend: trendDir,
          adoption_rate: stats.count > 0 ? Math.round((stats.approvalSum / stats.count) * 100) : 0,
        };
      })
      .sort((a, b) => b.adoption_rate - a.adoption_rate)
      .slice(0, 10);

    return { data: trends, error: null };
  } catch (err) {
    console.error('Error fetching trending styles:', err);
    return { data: null, error: err as Error };
  }
}

// ============================================
// SIMILAR PROJECTS METHODS (3)
// ============================================

/**
 * 9. Find similar projects for a room
 */
export async function findSimilarProjects(
  roomId: string,
  limit: number = 10
): Promise<{ data: SimilarProject[] | null; error: Error | null }> {
  try {
    // First check cache
    const { data: cached, error: cacheError } = await supabase
      .from('similar_projects')
      .select('*')
      .eq('source_room_id', roomId)
      .gte('expires_at', new Date().toISOString())
      .order('similarity_score', { ascending: false })
      .limit(limit);

    if (!cacheError && cached && cached.length > 0) {
      const transformed: SimilarProject[] = cached.map((sp) => ({
        id: sp.id,
        room_id: sp.similar_room_id,
        similarity_score: Number(sp.similarity_score),
        matching_factors: sp.matching_factors || [],
        ...(sp.similar_room_preview as Record<string, unknown> || {}),
      } as SimilarProject));

      return { data: transformed, error: null };
    }

    // If no cache, compute similar rooms
    const { data: sourceRoom, error: roomError } = await supabase
      .from('rooms')
      .select(`
        id, room_type, selected_style, length_feet, width_feet, height_feet,
        project:projects(id, city, budget_tier)
      `)
      .eq('id', roomId)
      .single();

    if (roomError || !sourceRoom) {
      throw new Error('Source room not found');
    }

    // Find rooms with similar characteristics
    const { data: candidates, error: candError } = await supabase
      .from('rooms')
      .select(`
        id, room_type, room_name, selected_style, length_feet, width_feet,
        project:projects(id, name, city, budget_tier),
        renders(image_url)
      `)
      .eq('room_type', sourceRoom.room_type)
      .neq('id', roomId)
      .not('selected_style', 'is', null)
      .limit(50);

    if (candError) throw candError;

    // Calculate similarity scores
    const similarRooms: SimilarProject[] = [];

    for (const candidate of candidates || []) {
      const { score, factors } = calculateRoomSimilarity(sourceRoom, candidate);
      
      if (score >= 30) {
        const projectData = candidate.project as { id: string; name: string; city: string; budget_tier: string } | null;
        const renders = candidate.renders as Array<{ image_url: string }> | null;
        
        similarRooms.push({
          id: `${roomId}-${candidate.id}`,
          room_id: candidate.id,
          room_name: candidate.room_name || undefined,
          room_type: candidate.room_type || 'unknown',
          project_id: projectData?.id || '',
          project_name: projectData?.name || undefined,
          design_style: candidate.selected_style || undefined,
          similarity_score: score,
          matching_factors: factors,
          preview_image_url: renders?.[0]?.image_url,
          final_render_url: renders?.[0]?.image_url,
          city: projectData?.city || undefined,
          budget_tier: projectData?.budget_tier || undefined,
        });
      }
    }

    // Sort by similarity and limit
    similarRooms.sort((a, b) => b.similarity_score - a.similarity_score);
    const topSimilar = similarRooms.slice(0, limit);

    // Cache results
    if (topSimilar.length > 0) {
      const cacheRows = topSimilar.map((sp) => ({
        source_room_id: roomId,
        similar_room_id: sp.room_id,
        similarity_score: sp.similarity_score,
        matching_factors: sp.matching_factors,
        similar_room_preview: {
          room_name: sp.room_name,
          room_type: sp.room_type,
          project_id: sp.project_id,
          project_name: sp.project_name,
          design_style: sp.design_style,
          preview_image_url: sp.preview_image_url,
          city: sp.city,
          budget_tier: sp.budget_tier,
        },
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      }));

      await supabase.from('similar_projects').upsert(cacheRows, {
        onConflict: 'source_room_id,similar_room_id',
      });
    }

    return { data: topSimilar, error: null };
  } catch (err) {
    console.error('Error finding similar projects:', err);
    return { data: null, error: err as Error };
  }
}

/**
 * Helper: Calculate similarity between two rooms
 */
function calculateRoomSimilarity(
  source: Record<string, unknown>,
  target: Record<string, unknown>
): { score: number; factors: string[] } {
  let score = 0;
  const factors: string[] = [];

  // Room type match (base)
  if (source.room_type === target.room_type) {
    score += 20;
    factors.push('Same room type');
  }

  // Style match
  if (source.selected_style && source.selected_style === target.selected_style) {
    score += 30;
    factors.push('Same design style');
  }

  // Size similarity
  const sourceArea = ((source.length_feet as number) || 10) * ((source.width_feet as number) || 10);
  const targetArea = ((target.length_feet as number) || 10) * ((target.width_feet as number) || 10);
  const areaRatio = Math.min(sourceArea, targetArea) / Math.max(sourceArea, targetArea);
  
  if (areaRatio >= 0.8) {
    score += 20;
    factors.push('Similar room size');
  } else if (areaRatio >= 0.6) {
    score += 10;
    factors.push('Comparable room size');
  }

  // City match
  const sourceProject = source.project as { city?: string; budget_tier?: string } | null;
  const targetProject = target.project as { city?: string; budget_tier?: string } | null;

  if (sourceProject?.city && sourceProject.city === targetProject?.city) {
    score += 15;
    factors.push('Same city');
  }

  // Budget tier match
  if (sourceProject?.budget_tier && sourceProject.budget_tier === targetProject?.budget_tier) {
    score += 15;
    factors.push('Same budget tier');
  }

  return { score: Math.min(score, 100), factors };
}

/**
 * 10. Calculate similarity score between two specific rooms
 */
export async function calculateSimilarity(
  roomId1: string,
  roomId2: string
): Promise<{ data: { score: number; factors: string[] } | null; error: Error | null }> {
  try {
    const { data: rooms, error } = await supabase
      .from('rooms')
      .select(`
        id, room_type, selected_style, length_feet, width_feet, height_feet,
        project:projects(id, city, budget_tier)
      `)
      .in('id', [roomId1, roomId2]);

    if (error) throw error;
    if (!rooms || rooms.length !== 2) {
      throw new Error('Could not find both rooms');
    }

    const [room1, room2] = rooms;
    const result = calculateRoomSimilarity(room1, room2);

    return { data: result, error: null };
  } catch (err) {
    console.error('Error calculating similarity:', err);
    return { data: null, error: err as Error };
  }
}

/**
 * 11. Refresh similar projects cache for a room
 */
export async function refreshSimilarProjects(
  roomId: string
): Promise<{ data: SimilarProject[] | null; error: Error | null }> {
  try {
    // Delete existing cache
    await supabase
      .from('similar_projects')
      .delete()
      .eq('source_room_id', roomId);

    // Recalculate
    return findSimilarProjects(roomId);
  } catch (err) {
    console.error('Error refreshing similar projects:', err);
    return { data: null, error: err as Error };
  }
}

// ============================================
// FEEDBACK METHODS (3)
// ============================================

/**
 * 12. Submit feedback for a recommendation
 */
export async function submitFeedback(
  feedback: Omit<RecommendationFeedback, 'id' | 'created_at'>
): Promise<{ data: RecommendationFeedback | null; error: Error | null }> {
  try {
    const { data: userData } = await supabase.auth.getUser();
    
    if (!userData.user?.id) {
      throw new Error('User not authenticated');
    }
    
    const { data, error } = await supabase
      .from('recommendation_feedback')
      .insert([{
        recommendation_id: feedback.recommendation_id,
        room_id: feedback.room_id,
        feedback_type: feedback.feedback_type,
        selected_option: feedback.selected_option || null,
        rejection_reason: feedback.rejection_reason || null,
        modification_details: feedback.modification_details || {},
        helpfulness_score: feedback.helpfulness_score || null,
        user_comment: feedback.user_comment || null,
        feedback_data: feedback.feedback_data || {},
        created_by: userData.user.id,
      }])
      .select()
      .single();

    if (error) throw error;

    return { data: data as RecommendationFeedback, error: null };
  } catch (err) {
    console.error('Error submitting feedback:', err);
    return { data: null, error: err as Error };
  }
}

/**
 * 13. Accept a recommendation
 */
export async function acceptRecommendation(
  recommendationId: string,
  selectedOption?: string
): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { error } = await supabase
      .from('ai_recommendations')
      .update({
        was_accepted: true,
        selected_option: selectedOption || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', recommendationId);

    if (error) throw error;

    return { success: true, error: null };
  } catch (err) {
    console.error('Error accepting recommendation:', err);
    return { success: false, error: err as Error };
  }
}

/**
 * 14. Reject a recommendation
 */
export async function rejectRecommendation(
  recommendationId: string,
  reason?: string
): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { error } = await supabase
      .from('ai_recommendations')
      .update({
        was_accepted: false,
        user_feedback: reason || 'Rejected by user',
        updated_at: new Date().toISOString(),
      })
      .eq('id', recommendationId);

    if (error) throw error;

    return { success: true, error: null };
  } catch (err) {
    console.error('Error rejecting recommendation:', err);
    return { success: false, error: err as Error };
  }
}

// ============================================
// EXPORT DEFAULT SERVICE OBJECT
// ============================================

export const recommendationService = {
  // Core
  getRecommendations,
  getRecommendationById,
  generateStyleRecommendations,
  generateFurniturePlacement,
  // Budget
  generateBudgetAlternatives,
  calculatePotentialSavings,
  // Trends
  getTrendAnalysis,
  getTrendingStyles,
  // Similar
  findSimilarProjects,
  calculateSimilarity,
  refreshSimilarProjects,
  // Feedback
  submitFeedback,
  acceptRecommendation,
  rejectRecommendation,
  // Helpers
  buildRoomContext,
};

export default recommendationService;
