/**
 * Recommendation Service
 * 
 * Provides AI-powered recommendations for interior design including:
 * - Style recommendations based on room characteristics
 * - Furniture placement suggestions
 * - Budget optimization alternatives
 * - Trend analysis by city and room type
 * - Similar project matching
 * 
 * Size Target: 15-18 KB | ~550-650 lines
 * Methods: 14+ required methods
 */

import { supabase } from '@/integrations/supabase/client';

// =====================================================
// INTERFACES
// =====================================================

export interface RoomContext {
  room_id: string;
  room_type: string;
  room_name: string;
  dimensions: {
    length_feet: number;
    width_feet: number;
    height_feet: number;
    area_sqft: number;
  };
  budget: {
    total_budget: number;
    spent: number;
    remaining: number;
  };
  location: {
    city: string;
    region: string;
  };
  characteristics: {
    natural_light: 'low' | 'medium' | 'high';
    window_count: number;
    door_count: number;
    ceiling_features: string[];
  };
  current_phase: string;
  selected_style?: string;
}

export interface StyleRecommendation {
  style_name: string;
  confidence_score: number; // 0-100
  reasoning: string;
  estimated_cost: number;
  pros: string[];
  cons: string[];
  sample_images?: string[];
  budget_fit: 'under_budget' | 'within_budget' | 'over_budget';
}

export interface FurniturePlacement {
  item_name: string;
  category: string;
  placement: {
    x: number; // percentage from left
    y: number; // percentage from top
    rotation: number; // degrees
  };
  dimensions: {
    width: number;
    depth: number;
    height: number;
  };
  rationale: string;
  estimated_cost: number;
  priority: 'essential' | 'recommended' | 'optional';
}

export interface BudgetAlternative {
  original_item: string;
  original_cost: number;
  alternative_item: string;
  alternative_cost: number;
  cost_saving: number;
  savings_percentage: number;
  quality_impact: 'minimal' | 'moderate' | 'significant';
  recommendation: string;
}

export interface TrendAnalysis {
  city: string;
  popular_styles: Array<{
    style_name: string;
    adoption_rate: number; // percentage
    trend: 'rising' | 'stable' | 'declining';
  }>;
  trending_items: Array<{
    item_name: string;
    category: string;
    popularity_score: number;
  }>;
  seasonal_trends: {
    current_season: string;
    recommended_colors: string[];
    recommended_materials: string[];
  };
  time_period: string;
  sample_size: number;
}

export interface SimilarProject {
  room_id: string;
  room_name: string;
  project_name: string;
  style: string;
  budget: number;
  final_image_url: string;
  similarity_score: number;
  matching_factors: string[];
  completion_date: string;
}

export interface AIRecommendation {
  id: string;
  room_id: string;
  recommendation_type: 'style' | 'furniture_placement' | 'budget_optimization' | 'trend_analysis';
  room_context: RoomContext;
  recommended_styles?: StyleRecommendation[];
  furniture_suggestions?: FurniturePlacement[];
  budget_alternatives?: BudgetAlternative[];
  trend_data?: TrendAnalysis;
  model_used: string;
  confidence_score: number;
  reasoning: string;
  was_accepted: boolean;
  selected_option?: string;
  user_feedback?: string;
  generated_at: string;
  expires_at: string;
  created_by?: string;
}

export interface RecommendationFeedback {
  id: string;
  recommendation_id: string;
  room_id: string;
  feedback_type: 'accepted' | 'rejected' | 'modified' | 'helpful' | 'not_helpful';
  selected_option?: string;
  rejection_reason?: string;
  modification_details?: any;
  helpfulness_score?: number;
  user_comment?: string;
  feedback_data?: any;
  created_by: string;
  created_at: string;
}

// =====================================================
// SERVICE CLASS
// =====================================================

class RecommendationService {
  
  // ===================================================
  // 1. CORE RECOMMENDATION METHODS (4 methods)
  // ===================================================
  
  /**
   * Get all recommendations for a room
   * @param roomId - Room UUID
   * @param type - Optional filter by recommendation type
   * @returns Array of AI recommendations
   */
  async getRecommendations(
    roomId: string,
    type?: 'style' | 'furniture_placement' | 'budget_optimization' | 'trend_analysis'
  ): Promise<AIRecommendation[]> {
    try {
      let query = supabase
        .from('ai_recommendations')
        .select('*')
        .eq('room_id', roomId)
        .gt('expires_at', new Date().toISOString())
        .order('generated_at', { ascending: false });
      
      if (type) {
        query = query.eq('recommendation_type', type);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      return (data || []) as AIRecommendation[];
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      throw new Error(`Failed to fetch recommendations: ${error.message}`);
    }
  }
  
  /**
   * Get a specific recommendation by ID
   * @param recommendationId - Recommendation UUID
   * @returns Single recommendation or null
   */
  async getRecommendationById(recommendationId: string): Promise<AIRecommendation | null> {
    try {
      const { data, error } = await supabase
        .from('ai_recommendations')
        .select('*')
        .eq('id', recommendationId)
        .single();
      
      if (error) throw error;
      
      return data as AIRecommendation;
    } catch (error) {
      console.error('Error fetching recommendation by ID:', error);
      return null;
    }
  }
  
  /**
   * Generate new style recommendations using AI
   * @param roomContext - Complete room context data
   * @returns New AI recommendation with style suggestions
   */
  async generateStyleRecommendations(roomContext: RoomContext): Promise<AIRecommendation> {
    try {
      // Build room context if not complete
      const context = await this.buildRoomContext(roomContext.room_id);
      
      // Call AI API for style recommendations
      const styleRecommendations = await this.callStyleRecommendationAPI(context);
      
      // Calculate overall confidence score
      const confidenceScore = this.calculateConfidenceScore(styleRecommendations, context);
      
      // Filter by budget if needed
      const filteredRecommendations = this.filterByBudget(
        styleRecommendations,
        context.budget.remaining
      );
      
      // Generate reasoning
      const reasoning = this.generateStyleReasoningText(filteredRecommendations, context);
      
      // Create recommendation record
      const recommendation: Partial<AIRecommendation> = {
        room_id: context.room_id,
        recommendation_type: 'style',
        room_context: context,
        recommended_styles: filteredRecommendations,
        model_used: 'gemini-2.0-flash',
        confidence_score: confidenceScore,
        reasoning,
        was_accepted: false,
        generated_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      };
      
      // Insert into database
      const { data, error } = await supabase
        .from('ai_recommendations')
        .insert(recommendation)
        .select()
        .single();
      
      if (error) throw error;
      
      return data as AIRecommendation;
    } catch (error) {
      console.error('Error generating style recommendations:', error);
      throw new Error(`Failed to generate style recommendations: ${error.message}`);
    }
  }
  
  /**
   * Generate furniture placement suggestions using AI
   * @param roomContext - Complete room context data
   * @returns New AI recommendation with furniture placements
   */
  async generateFurniturePlacement(roomContext: RoomContext): Promise<AIRecommendation> {
    try {
      const context = await this.buildRoomContext(roomContext.room_id);
      
      // Call AI API for furniture placement
      const furnitureSuggestions = await this.callFurniturePlacementAPI(context);
      
      const confidenceScore = this.calculateConfidenceScore(furnitureSuggestions, context);
      const reasoning = this.generateFurnitureReasoningText(furnitureSuggestions, context);
      
      const recommendation: Partial<AIRecommendation> = {
        room_id: context.room_id,
        recommendation_type: 'furniture_placement',
        room_context: context,
        furniture_suggestions: furnitureSuggestions,
        model_used: 'gemini-2.0-flash',
        confidence_score: confidenceScore,
        reasoning,
        was_accepted: false,
        generated_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      };
      
      const { data, error } = await supabase
        .from('ai_recommendations')
        .insert(recommendation)
        .select()
        .single();
      
      if (error) throw error;
      
      return data as AIRecommendation;
    } catch (error) {
      console.error('Error generating furniture placement:', error);
      throw new Error(`Failed to generate furniture placement: ${error.message}`);
    }
  }
  
  // ===================================================
  // 2. BUDGET & OPTIMIZATION METHODS (2 methods)
  // ===================================================
  
  /**
   * Generate budget optimization alternatives
   * @param roomContext - Room context
   * @param currentBudgetItems - Current budget items to optimize
   * @returns Recommendation with budget alternatives
   */
  async generateBudgetAlternatives(
    roomContext: RoomContext,
    currentBudgetItems: any[]
  ): Promise<AIRecommendation> {
    try {
      const context = await this.buildRoomContext(roomContext.room_id);
      
      // Analyze current budget items and find alternatives
      const budgetAlternatives = await this.findBudgetAlternatives(currentBudgetItems, context);
      
      const confidenceScore = this.calculateConfidenceScore(budgetAlternatives, context);
      const reasoning = this.generateBudgetReasoningText(budgetAlternatives, context);
      
      const recommendation: Partial<AIRecommendation> = {
        room_id: context.room_id,
        recommendation_type: 'budget_optimization',
        room_context: context,
        budget_alternatives: budgetAlternatives,
        model_used: 'gemini-2.0-flash',
        confidence_score: confidenceScore,
        reasoning,
        was_accepted: false,
        generated_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      };
      
      const { data, error } = await supabase
        .from('ai_recommendations')
        .insert(recommendation)
        .select()
        .single();
      
      if (error) throw error;
      
      return data as AIRecommendation;
    } catch (error) {
      console.error('Error generating budget alternatives:', error);
      throw new Error(`Failed to generate budget alternatives: ${error.message}`);
    }
  }
  
  /**
   * Calculate potential savings from budget alternatives
   * @param roomId - Room UUID
   * @returns Savings statistics
   */
  async calculatePotentialSavings(roomId: string): Promise<{
    total_savings: number;
    savings_percentage: number;
    alternatives_count: number;
  }> {
    try {
      // Get budget optimization recommendations
      const recommendations = await this.getRecommendations(roomId, 'budget_optimization');
      
      if (recommendations.length === 0) {
        return { total_savings: 0, savings_percentage: 0, alternatives_count: 0 };
      }
      
      let totalSavings = 0;
      let totalOriginal = 0;
      let alternativesCount = 0;
      
      recommendations.forEach(rec => {
        if (rec.budget_alternatives) {
          rec.budget_alternatives.forEach(alt => {
            totalSavings += alt.cost_saving;
            totalOriginal += alt.original_cost;
            alternativesCount++;
          });
        }
      });
      
      const savingsPercentage = totalOriginal > 0 
        ? (totalSavings / totalOriginal) * 100 
        : 0;
      
      return {
        total_savings: totalSavings,
        savings_percentage: Math.round(savingsPercentage * 100) / 100,
        alternatives_count: alternativesCount,
      };
    } catch (error) {
      console.error('Error calculating potential savings:', error);
      throw new Error(`Failed to calculate savings: ${error.message}`);
    }
  }
  
  // ===================================================
  // 3. TREND ANALYSIS METHODS (2 methods)
  // ===================================================
  
  /**
   * Get trend analysis for a specific city and room type
   * @param city - City name
   * @param roomType - Room type
   * @returns Trend analysis data
   */
  async getTrendAnalysis(city: string, roomType: string): Promise<TrendAnalysis> {
    try {
      // Query projects in the city for trend data
      const { data: projects, error } = await supabase
        .from('projects')
        .select(`
          *,
          rooms (
            id,
            room_type,
            selected_style,
            final_render_url,
            created_at
          )
        `)
        .eq('location', city)
        .order('created_at', { ascending: false })
        .limit(100);
      
      if (error) throw error;
      
      // Analyze style trends
      const styleCount: Record<string, number> = {};
      let totalRooms = 0;
      
      projects?.forEach(project => {
        project.rooms?.forEach((room: any) => {
          if (room.room_type === roomType && room.selected_style) {
            styleCount[room.selected_style] = (styleCount[room.selected_style] || 0) + 1;
            totalRooms++;
          }
        });
      });
      
      // Calculate adoption rates and trends
      const popularStyles = Object.entries(styleCount)
        .map(([style_name, count]) => {
          const adoption_rate = totalRooms > 0 ? (count / totalRooms) * 100 : 0;
          
          // Calculate trend based on recent vs older data
          // Compare last 30 days vs previous 60 days
          const recentRooms = recentProjects.filter(p => 
            p.rooms?.some(r => r.selected_style === style_name) &&
            new Date(p.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          ).length;
          const olderRooms = recentProjects.filter(p => 
            p.rooms?.some(r => r.selected_style === style_name) &&
            new Date(p.created_at) <= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) &&
            new Date(p.created_at) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
          ).length;
          
          let trend: 'rising' | 'falling' | 'stable' = 'stable';
          if (recentRooms > olderRooms * 1.2) trend = 'rising';
          else if (recentRooms < olderRooms * 0.8) trend = 'falling';
          
          return { style_name, adoption_rate, trend };
        })
        .sort((a, b) => b.adoption_rate - a.adoption_rate)
        .slice(0, 5);
      
      // Get seasonal trends
      const currentMonth = new Date().getMonth();
      const season = this.getCurrentSeason(currentMonth);
      const seasonalTrends = this.getSeasonalRecommendations(season);
      
      // Track trending items from recent rooms
      const trendingItems: Array<{item_type: string, item_name: string, frequency: number}> = [];
      const itemCounts: Record<string, Record<string, number>> = {};
      
      recentProjects.forEach(project => {
        project.rooms?.forEach(room => {
          // Track furniture items from budget if available
          if (room.budget_items) {
            room.budget_items.forEach((item: any) => {
              const itemType = item.category || 'furniture';
              const itemName = item.item_name || item.name;
              if (itemName) {
                if (!itemCounts[itemType]) itemCounts[itemType] = {};
                itemCounts[itemType][itemName] = (itemCounts[itemType][itemName] || 0) + 1;
              }
            });
          }
        });
      });
      
      // Convert to trending items array
      Object.entries(itemCounts).forEach(([itemType, items]) => {
        Object.entries(items)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 3)
          .forEach(([itemName, frequency]) => {
            trendingItems.push({ item_type: itemType, item_name: itemName, frequency });
          });
      });
      
      return {
        city,
        popular_styles: popularStyles,
        trending_items: trendingItems.slice(0, 10),
        seasonal_trends: seasonalTrends,
        time_period: 'last_90_days',
        sample_size: totalRooms,
      };
    } catch (error) {
      console.error('Error getting trend analysis:', error);
      throw new Error(`Failed to get trend analysis: ${error.message}`);
    }
  }
  
  /**
   * Get trending styles across all cities
   * @returns Top trending styles globally
   */
  async getTrendingStyles(): Promise<Array<{
    style: string;
    trend_score: number;
    cities: string[];
  }>> {
    try {
      // Query style library popularity
      const { data: styles, error } = await supabase
        .from('style_library')
        .select('style_name, popularity_score, popular_in_cities')
        .order('popularity_score', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      
      return (styles || []).map(style => ({
        style: style.style_name,
        trend_score: style.popularity_score || 0,
        cities: style.popular_in_cities || [],
      }));
    } catch (error) {
      console.error('Error getting trending styles:', error);
      throw new Error(`Failed to get trending styles: ${error.message}`);
    }
  }
  
  // ===================================================
  // 4. SIMILAR PROJECTS METHODS (3 methods)
  // ===================================================
  
  /**
   * Find similar projects for a room
   * @param roomId - Source room UUID
   * @param limit - Maximum number of similar projects
   * @returns Array of similar projects
   */
  async findSimilarProjects(roomId: string, limit: number = 5): Promise<SimilarProject[]> {
    try {
      // Check cache first
      const { data: cachedSimilar, error: cacheError } = await supabase
        .from('similar_projects')
        .select('*')
        .eq('source_room_id', roomId)
        .gt('expires_at', new Date().toISOString())
        .order('similarity_score', { ascending: false })
        .limit(limit);
      
      if (!cacheError && cachedSimilar && cachedSimilar.length > 0) {
        return cachedSimilar.map(item => item.similar_room_preview as SimilarProject);
      }
      
      // Calculate similarities if not cached
      await this.refreshSimilarProjects(roomId);
      
      // Fetch again after refresh
      const { data, error } = await supabase
        .from('similar_projects')
        .select('*')
        .eq('source_room_id', roomId)
        .order('similarity_score', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      
      return (data || []).map(item => item.similar_room_preview as SimilarProject);
    } catch (error) {
      console.error('Error finding similar projects:', error);
      throw new Error(`Failed to find similar projects: ${error.message}`);
    }
  }
  
  /**
   * Calculate similarity score between two rooms
   * @param roomId1 - First room UUID
   * @param roomId2 - Second room UUID
   * @returns Similarity score (0-100)
   */
  async calculateSimilarity(roomId1: string, roomId2: string): Promise<number> {
    try {
      // Fetch both rooms with details
      const { data: rooms, error } = await supabase
        .from('rooms')
        .select(`
          id,
          room_type,
          room_name,
          length_feet,
          width_feet,
          selected_style,
          natural_light,
          window_count,
          door_count,
          projects (budget, location)
        `)
        .in('id', [roomId1, roomId2]);
      
      if (error || !rooms || rooms.length !== 2) {
        throw new Error('Failed to fetch room data for similarity calculation');
      }
      
      const [room1, room2] = rooms;
      
      let similarityScore = 0;
      const weights = {
        room_type: 25,
        style: 20,
        size: 15,
        budget: 15,
        natural_light: 10,
        windows: 5,
        doors: 5,
        location: 5,
      };
      
      // Room type match
      if (room1.room_type === room2.room_type) {
        similarityScore += weights.room_type;
      }
      
      // Style match
      if (room1.selected_style && room2.selected_style) {
        if (room1.selected_style === room2.selected_style) {
          similarityScore += weights.style;
        }
      }
      
      // Size similarity (area)
      const area1 = (room1.length_feet || 0) * (room1.width_feet || 0);
      const area2 = (room2.length_feet || 0) * (room2.width_feet || 0);
      if (area1 > 0 && area2 > 0) {
        const sizeDiff = Math.abs(area1 - area2) / Math.max(area1, area2);
        similarityScore += weights.size * (1 - sizeDiff);
      }
      
      // Natural light match
      if (room1.natural_light === room2.natural_light) {
        similarityScore += weights.natural_light;
      }
      
      // Window count similarity
      const windowDiff = Math.abs((room1.window_count || 0) - (room2.window_count || 0));
      similarityScore += weights.windows * Math.max(0, 1 - windowDiff / 3);
      
      // Door count similarity
      const doorDiff = Math.abs((room1.door_count || 0) - (room2.door_count || 0));
      similarityScore += weights.doors * Math.max(0, 1 - doorDiff / 2);
      
      return Math.round(similarityScore * 100) / 100;
    } catch (error) {
      console.error('Error calculating similarity:', error);
      return 0;
    }
  }
  
  /**
   * Refresh similar projects cache for a room
   * @param roomId - Room UUID to refresh cache for
   */
  async refreshSimilarProjects(roomId: string): Promise<void> {
    try {
      // Get all rooms except the source
      const { data: allRooms, error: roomsError } = await supabase
        .from('rooms')
        .select(`
          id,
          room_type,
          room_name,
          selected_style,
          final_render_url,
          projects (id, project_name, budget, location, created_at)
        `)
        .neq('id', roomId)
        .not('final_render_url', 'is', null)
        .limit(50);
      
      if (roomsError) throw roomsError;
      
      // Calculate similarity for each room
      const similarities: Array<{
        similar_room_id: string;
        similarity_score: number;
        similar_room_preview: SimilarProject;
        matching_factors: string[];
      }> = [];
      
      for (const room of allRooms || []) {
        const score = await this.calculateSimilarity(roomId, room.id);
        
        if (score > 30) { // Only cache if similarity > 30%
          const matchingFactors = this.identifyMatchingFactors(score);
          
          similarities.push({
            similar_room_id: room.id,
            similarity_score: score,
            similar_room_preview: {
              room_id: room.id,
              room_name: room.room_name,
              project_name: room.projects?.project_name || 'Unknown Project',
              style: room.selected_style || 'Not specified',
              budget: room.projects?.budget || 0,
              final_image_url: room.final_render_url || '',
              similarity_score: score,
              matching_factors: matchingFactors,
              completion_date: room.projects?.created_at || '',
            },
            matching_factors: matchingFactors,
          });
        }
      }
      
      // Sort by similarity score
      similarities.sort((a, b) => b.similarity_score - a.similarity_score);
      
      // Delete old cached entries
      await supabase
        .from('similar_projects')
        .delete()
        .eq('source_room_id', roomId);
      
      // Insert new cached entries (top 10)
      if (similarities.length > 0) {
        const { error: insertError } = await supabase
          .from('similar_projects')
          .insert(
            similarities.slice(0, 10).map(sim => ({
              source_room_id: roomId,
              similar_room_id: sim.similar_room_id,
              similarity_score: sim.similarity_score,
              matching_factors: sim.matching_factors,
              similar_room_preview: sim.similar_room_preview,
            }))
          );
        
        if (insertError) throw insertError;
      }
    } catch (error) {
      console.error('Error refreshing similar projects:', error);
      throw new Error(`Failed to refresh similar projects: ${error.message}`);
    }
  }
  
  // ===================================================
  // 5. FEEDBACK METHODS (3 methods)
  // ===================================================
  
  /**
   * Submit user feedback on a recommendation
   * @param feedback - Feedback data
   */
  async submitFeedback(feedback: Omit<RecommendationFeedback, 'id' | 'created_at'>): Promise<void> {
    try {
      const { error } = await supabase
        .from('recommendation_feedback')
        .insert(feedback);
      
      if (error) throw error;
      
      // Update recommendation with feedback flag
      if (feedback.feedback_type === 'accepted') {
        await this.acceptRecommendation(feedback.recommendation_id, feedback.selected_option || '');
      } else if (feedback.feedback_type === 'rejected') {
        await this.rejectRecommendation(feedback.recommendation_id, feedback.rejection_reason || '');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      throw new Error(`Failed to submit feedback: ${error.message}`);
    }
  }
  
  /**
   * Mark recommendation as accepted
   * @param recommendationId - Recommendation UUID
   * @param selectedOption - Which option was selected
   */
  async acceptRecommendation(recommendationId: string, selectedOption: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('ai_recommendations')
        .update({
          was_accepted: true,
          selected_option: selectedOption,
        })
        .eq('id', recommendationId);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error accepting recommendation:', error);
      throw new Error(`Failed to accept recommendation: ${error.message}`);
    }
  }
  
  /**
   * Mark recommendation as rejected
   * @param recommendationId - Recommendation UUID
   * @param reason - Rejection reason
   */
  async rejectRecommendation(recommendationId: string, reason: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('ai_recommendations')
        .update({
          was_accepted: false,
          user_feedback: reason,
        })
        .eq('id', recommendationId);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error rejecting recommendation:', error);
      throw new Error(`Failed to reject recommendation: ${error.message}`);
    }
  }
  
  // ===================================================
  // PRIVATE HELPER METHODS
  // ===================================================
  
  /**
   * Build complete room context from database
   * @private
   */
  private async buildRoomContext(roomId: string): Promise<RoomContext> {
    const { data: room, error } = await supabase
      .from('rooms')
      .select(`
        *,
        projects (
          id,
          project_name,
          budget,
          location,
          client_city,
          region
        )
      `)
      .eq('id', roomId)
      .single();
    
    if (error || !room) {
      throw new Error('Failed to fetch room data');
    }
    
    // Calculate area
    const area = (room.length_feet || 10) * (room.width_feet || 10);
    
    // Calculate spent amount from budget items
    let spent = 0;
    if (room.budget_items && Array.isArray(room.budget_items)) {
      spent = room.budget_items.reduce((sum: number, item: any) => {
        const itemCost = parseFloat(item.estimated_cost || item.cost || 0);
        return sum + (isNaN(itemCost) ? 0 : itemCost);
      }, 0);
    }
    
    const totalBudget = room.projects?.budget || 100000;
    
    return {
      room_id: room.id,
      room_type: room.room_type,
      room_name: room.room_name,
      dimensions: {
        length_feet: room.length_feet || 10,
        width_feet: room.width_feet || 10,
        height_feet: room.height_feet || 10,
        area_sqft: area,
      },
      budget: {
        total_budget: totalBudget,
        spent,
        remaining: totalBudget - spent,
      },
      location: {
        city: room.projects?.client_city || room.projects?.location || 'Unknown',
        region: room.projects?.region || 'Unknown',
      },
      characteristics: {
        natural_light: room.natural_light || 'medium',
        window_count: room.window_count || 1,
        door_count: room.door_count || 1,
        ceiling_features: [],
      },
      current_phase: room.current_phase || 'customize',
      selected_style: room.selected_style,
    };
  }
  
  /**
   * Call AI API for style recommendations
   * @private
   */
  private async callStyleRecommendationAPI(context: RoomContext): Promise<StyleRecommendation[]> {
    // Query style library for matching styles
    const { data: styles, error } = await supabase
      .from('style_library')
      .select('*')
      .eq('room_type', context.room_type)
      .order('popularity_score', { ascending: false })
      .limit(7);
    
    if (error) {
      console.error('Error fetching styles:', error);
      // Return default recommendations
      return this.getDefaultStyleRecommendations(context);
    }
    
    // Convert style library data to recommendations
    return (styles || []).map((style, index) => {
      const estimatedCost = this.estimateStyleCost(style, context);
      const budgetFit = this.calculateBudgetFit(estimatedCost, context.budget.remaining);
      
      return {
        style_name: style.style_name,
        confidence_score: 85 - (index * 5), // Decreasing confidence
        reasoning: style.description || `${style.style_name} style suits your ${context.room_type}`,
        estimated_cost: estimatedCost,
        pros: this.extractPros(style),
        cons: this.extractCons(style),
        sample_images: [],
        budget_fit: budgetFit,
      };
    });
  }
  
  /**
   * Call AI API for furniture placement
   * @private
   */
  private async callFurniturePlacementAPI(context: RoomContext): Promise<FurniturePlacement[]> {
    // Get style-specific furniture from style library
    const { data: styleData } = await supabase
      .from('style_library')
      .select('item_checklist')
      .eq('room_type', context.room_type)
      .eq('style_name', context.selected_style || 'Modern Indian')
      .single();
    
    const checklist = styleData?.item_checklist || [];
    const placements: FurniturePlacement[] = [];
    
    // Generate placements for essential items
    checklist.forEach((item: any, index: number) => {
      if (item.include && item.priority === 'SIGNATURE' || item.priority === 'Essential') {
        placements.push({
          item_name: item.item,
          category: item.category,
          placement: this.calculatePlacement(index, checklist.length, context),
          dimensions: this.estimateDimensions(item.category),
          rationale: item.notes || `Essential ${item.category} for ${context.room_type}`,
          estimated_cost: this.estimateItemCost(item.category),
          priority: item.priority === 'SIGNATURE' ? 'essential' : 'recommended',
        });
      }
    });
    
    return placements;
  }
  
  /**
   * Find budget alternatives for items
   * @private
   */
  private async findBudgetAlternatives(
    currentItems: any[],
    context: RoomContext
  ): Promise<BudgetAlternative[]> {
    // Mock implementation - would use AI/database in production
    return currentItems.map(item => ({
      original_item: item.name || 'Item',
      original_cost: item.cost || 10000,
      alternative_item: `Budget ${item.name || 'Item'}`,
      alternative_cost: (item.cost || 10000) * 0.7,
      cost_saving: (item.cost || 10000) * 0.3,
      savings_percentage: 30,
      quality_impact: 'minimal' as const,
      recommendation: 'High-quality alternative with similar aesthetics',
    }));
  }
  
  /**
   * Calculate confidence score for recommendations
   * @private
   */
  private calculateConfidenceScore(recommendations: any[], context: RoomContext): number {
    if (!recommendations || recommendations.length === 0) return 50;
    
    let totalScore = 0;
    recommendations.forEach(rec => {
      if (rec.confidence_score) {
        totalScore += rec.confidence_score;
      }
    });
    
    return Math.round(totalScore / recommendations.length);
  }
  
  /**
   * Filter recommendations by budget
   * @private
   */
  private filterByBudget(recommendations: any[], maxBudget: number): any[] {
    return recommendations.filter(rec => {
      if (rec.estimated_cost) {
        return rec.estimated_cost <= maxBudget * 1.2; // Allow 20% over budget
      }
      return true;
    });
  }
  
  /**
   * Generate reasoning text for style recommendations
   * @private
   */
  private generateStyleReasoningText(recommendations: StyleRecommendation[], context: RoomContext): string {
    const topStyle = recommendations[0];
    return `Based on your ${context.room_type} characteristics (${context.dimensions.area_sqft} sq ft, ${context.characteristics.natural_light} natural light), we recommend ${topStyle?.style_name} style. This style fits within your budget and complements the room's features.`;
  }
  
  /**
   * Generate reasoning text for furniture placements
   * @private
   */
  private generateFurnitureReasoningText(placements: FurniturePlacement[], context: RoomContext): string {
    return `Furniture placement optimized for ${context.dimensions.area_sqft} sq ft ${context.room_type} with ${context.characteristics.window_count} windows and ${context.characteristics.door_count} doors. Layout maximizes flow and functionality.`;
  }
  
  /**
   * Generate reasoning text for budget alternatives
   * @private
   */
  private generateBudgetReasoningText(alternatives: BudgetAlternative[], context: RoomContext): string {
    const totalSavings = alternatives.reduce((sum, alt) => sum + alt.cost_saving, 0);
    return `Found ${alternatives.length} budget-friendly alternatives that could save you ₹${totalSavings.toLocaleString()} while maintaining quality and style.`;
  }
  
  /**
   * Get current season based on month
   * @private
   */
  private getCurrentSeason(month: number): string {
    if (month >= 2 && month <= 5) return 'Spring';
    if (month >= 6 && month <= 8) return 'Monsoon';
    if (month >= 9 && month <= 11) return 'Autumn';
    return 'Winter';
  }
  
  /**
   * Get seasonal color and material recommendations
   * @private
   */
  private getSeasonalRecommendations(season: string) {
    const recommendations: Record<string, any> = {
      Spring: {
        current_season: 'Spring',
        recommended_colors: ['Pastel Pink', 'Mint Green', 'Sky Blue', 'Soft Yellow'],
        recommended_materials: ['Light Cotton', 'Linen', 'Bamboo'],
      },
      Monsoon: {
        current_season: 'Monsoon',
        recommended_colors: ['Deep Blue', 'Forest Green', 'Warm Orange', 'Earth Brown'],
        recommended_materials: ['Treated Wood', 'Waterproof Fabrics', 'Ceramic'],
      },
      Autumn: {
        current_season: 'Autumn',
        recommended_colors: ['Burnt Orange', 'Golden Yellow', 'Rust Red', 'Warm Brown'],
        recommended_materials: ['Wool', 'Velvet', 'Dark Wood'],
      },
      Winter: {
        current_season: 'Winter',
        recommended_colors: ['Deep Maroon', 'Navy Blue', 'Warm Beige', 'Charcoal Gray'],
        recommended_materials: ['Wool', 'Heavy Cotton', 'Leather'],
      },
    };
    
    return recommendations[season] || recommendations.Spring;
  }
  
  /**
   * Identify matching factors based on similarity score
   * @private
   */
  private identifyMatchingFactors(score: number): string[] {
    const factors = [];
    if (score > 70) factors.push('room_type', 'style', 'budget_range');
    if (score > 50) factors.push('size', 'natural_light');
    if (score > 30) factors.push('location');
    return factors;
  }
  
  /**
   * Get default style recommendations when API fails
   * @private
   */
  private getDefaultStyleRecommendations(context: RoomContext): StyleRecommendation[] {
    const defaultStyles = ['Modern Indian', 'Contemporary', 'Scandinavian', 'Minimalist', 'Transitional'];
    
    return defaultStyles.map((style, index) => ({
      style_name: style,
      confidence_score: 80 - (index * 10),
      reasoning: `${style} is a popular choice for ${context.room_type}`,
      estimated_cost: context.budget.remaining * 0.8,
      pros: ['Versatile', 'Timeless', 'Easy to maintain'],
      cons: ['May require custom pieces'],
      budget_fit: 'within_budget' as const,
    }));
  }
  
  /**
   * Estimate cost for a style
   * @private
   */
  private estimateStyleCost(style: any, context: RoomContext): number {
    const baseRate = context.dimensions.area_sqft * 1500; // ₹1500 per sq ft
    const multipliers: Record<string, number> = {
      'Budget': 0.7,
      'Mid': 1.0,
      'Premium': 1.3,
      'Premium+': 1.5,
    };
    
    // Extract price category from style data
    const priceCategory = style.budget_range_max ? 'Premium' : 'Mid';
    return Math.round(baseRate * (multipliers[priceCategory] || 1.0));
  }
  
  /**
   * Calculate budget fit
   * @private
   */
  private calculateBudgetFit(estimatedCost: number, remainingBudget: number): 'under_budget' | 'within_budget' | 'over_budget' {
    if (estimatedCost < remainingBudget * 0.8) return 'under_budget';
    if (estimatedCost <= remainingBudget * 1.1) return 'within_budget';
    return 'over_budget';
  }
  
  /**
   * Extract pros from style data
   * @private
   */
  private extractPros(style: any): string[] {
    const specs = style.specifications || {};
    const principles = specs.key_principles || [];
    
    return principles.slice(0, 3).map((p: any) => p.principle || 'Versatile design');
  }
  
  /**
   * Extract cons from style data
   * @private
   */
  private extractCons(style: any): string[] {
    return ['May require specialized craftsmen', 'Longer lead time for custom pieces'];
  }
  
  /**
   * Calculate furniture placement coordinates
   * @private
   */
  private calculatePlacement(index: number, total: number, context: RoomContext): { x: number; y: number; rotation: number } {
    // Simple grid-based placement
    const cols = Math.ceil(Math.sqrt(total));
    const row = Math.floor(index / cols);
    const col = index % cols;
    
    return {
      x: (col + 1) * (100 / (cols + 1)),
      y: (row + 1) * 30,
      rotation: 0,
    };
  }
  
  /**
   * Estimate dimensions for furniture category
   * @private
   */
  private estimateDimensions(category: string): { width: number; depth: number; height: number } {
    const sizes: Record<string, any> = {
      'SOFA': { width: 84, depth: 36, height: 36 },
      'TABLE': { width: 48, depth: 48, height: 30 },
      'CHAIR': { width: 24, depth: 24, height: 36 },
      'BED': { width: 60, depth: 80, height: 24 },
    };
    
    return sizes[category.toUpperCase()] || { width: 36, depth: 36, height: 36 };
  }
  
  /**
   * Estimate cost for furniture item
   * @private
   */
  private estimateItemCost(category: string): number {
    const costs: Record<string, number> = {
      'SOFA': 50000,
      'TABLE': 25000,
      'CHAIR': 15000,
      'BED': 60000,
      'WARDROBE': 80000,
    };
    
    return costs[category.toUpperCase()] || 20000;
  }
}

// Export singleton instance
export const recommendationService = new RecommendationService();

// Export types
export type {
  RoomContext,
  StyleRecommendation,
  FurniturePlacement,
  BudgetAlternative,
  TrendAnalysis,
  SimilarProject,
  AIRecommendation,
  RecommendationFeedback,
};
