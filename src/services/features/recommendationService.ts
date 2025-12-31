/**
 * Recommendation Service
 * 
 * Provides AI-powered recommendations for interior design including:
 * - Style recommendations based on room characteristics
 * - Furniture placement suggestions
 * - Budget optimization alternatives
 * - Similar project matching
 */

import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

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
  confidence_score: number;
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
    x: number;
    y: number;
    rotation: number;
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
    adoption_rate: number;
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
  modification_details?: Json;
  helpfulness_score?: number;
  user_comment?: string;
  feedback_data?: Json;
  created_by: string;
  created_at: string;
}

// =====================================================
// SERVICE CLASS
// =====================================================

class RecommendationService {
  
  /**
   * Get all recommendations for a room
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
      
      // Map database data to our interface
      return (data || []).map(row => this.mapDbRowToRecommendation(row));
    } catch (error: any) {
      console.error('Error fetching recommendations:', error);
      throw new Error(`Failed to fetch recommendations: ${error.message}`);
    }
  }
  
  /**
   * Get a specific recommendation by ID
   */
  async getRecommendationById(recommendationId: string): Promise<AIRecommendation | null> {
    try {
      const { data, error } = await supabase
        .from('ai_recommendations')
        .select('*')
        .eq('id', recommendationId)
        .single();
      
      if (error) throw error;
      
      return data ? this.mapDbRowToRecommendation(data) : null;
    } catch (error) {
      console.error('Error fetching recommendation by ID:', error);
      return null;
    }
  }

  /**
   * Generate new style recommendations
   */
  async generateStyleRecommendations(roomId: string): Promise<AIRecommendation> {
    try {
      const context = await this.buildRoomContext(roomId);
      
      // Generate mock recommendations (in production, would call AI API)
      const styleRecommendations = this.generateMockStyleRecommendations(context);
      const confidenceScore = 85;
      const reasoning = `Based on the ${context.room_type} characteristics and ${context.location.city} trends.`;
      
      const insertData = {
        room_id: context.room_id,
        recommendation_type: 'style' as const,
        room_context: context as unknown as Json,
        recommended_styles: styleRecommendations as unknown as Json,
        model_used: 'gemini-2.0-flash',
        confidence_score: confidenceScore,
        reasoning,
        was_accepted: false,
        generated_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      };
      
      const { data, error } = await supabase
        .from('ai_recommendations')
        .insert([insertData])
        .select()
        .single();
      
      if (error) throw error;
      
      return this.mapDbRowToRecommendation(data);
    } catch (error: any) {
      console.error('Error generating style recommendations:', error);
      throw new Error(`Failed to generate style recommendations: ${error.message}`);
    }
  }
  
  /**
   * Generate furniture placement suggestions
   */
  async generateFurniturePlacement(roomId: string): Promise<AIRecommendation> {
    try {
      const context = await this.buildRoomContext(roomId);
      
      const furnitureSuggestions = this.generateMockFurniturePlacements(context);
      const confidenceScore = 80;
      const reasoning = `Optimal placement for ${context.room_type} considering dimensions and traffic flow.`;
      
      const insertData = {
        room_id: context.room_id,
        recommendation_type: 'furniture_placement' as const,
        room_context: context as unknown as Json,
        furniture_suggestions: furnitureSuggestions as unknown as Json,
        model_used: 'gemini-2.0-flash',
        confidence_score: confidenceScore,
        reasoning,
        was_accepted: false,
        generated_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      };
      
      const { data, error } = await supabase
        .from('ai_recommendations')
        .insert([insertData])
        .select()
        .single();
      
      if (error) throw error;
      
      return this.mapDbRowToRecommendation(data);
    } catch (error: any) {
      console.error('Error generating furniture placement:', error);
      throw new Error(`Failed to generate furniture placement: ${error.message}`);
    }
  }

  /**
   * Generate budget alternatives
   */
  async generateBudgetAlternatives(roomId: string): Promise<AIRecommendation> {
    try {
      const context = await this.buildRoomContext(roomId);
      
      const budgetAlternatives = this.generateMockBudgetAlternatives();
      const confidenceScore = 75;
      const reasoning = `Cost optimization options identified for the project.`;
      
      const insertData = {
        room_id: context.room_id,
        recommendation_type: 'budget_optimization' as const,
        room_context: context as unknown as Json,
        budget_alternatives: budgetAlternatives as unknown as Json,
        model_used: 'gemini-2.0-flash',
        confidence_score: confidenceScore,
        reasoning,
        was_accepted: false,
        generated_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      };
      
      const { data, error } = await supabase
        .from('ai_recommendations')
        .insert([insertData])
        .select()
        .single();
      
      if (error) throw error;
      
      return this.mapDbRowToRecommendation(data);
    } catch (error: any) {
      console.error('Error generating budget alternatives:', error);
      throw new Error(`Failed to generate budget alternatives: ${error.message}`);
    }
  }

  /**
   * Calculate potential savings
   */
  async calculatePotentialSavings(roomId: string): Promise<{
    total_savings: number;
    savings_percentage: number;
    alternatives_count: number;
  }> {
    try {
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
    } catch (error: any) {
      console.error('Error calculating potential savings:', error);
      throw new Error(`Failed to calculate savings: ${error.message}`);
    }
  }

  /**
   * Record feedback for a recommendation
   */
  async recordFeedback(
    recommendationId: string,
    feedback: Omit<RecommendationFeedback, 'id' | 'created_at'>
  ): Promise<void> {
    try {
      // Update the recommendation
      await supabase
        .from('ai_recommendations')
        .update({
          was_accepted: feedback.feedback_type === 'accepted',
          selected_option: feedback.selected_option,
          user_feedback: feedback.user_comment,
        })
        .eq('id', recommendationId);

      // Insert feedback record
      const { error } = await supabase
        .from('recommendation_feedback')
        .insert([{
          recommendation_id: recommendationId,
          room_id: feedback.room_id,
          feedback_type: feedback.feedback_type,
          selected_option: feedback.selected_option,
          rejection_reason: feedback.rejection_reason,
          helpfulness_score: feedback.helpfulness_score,
          user_comment: feedback.user_comment,
          created_by: feedback.created_by,
        }]);

      if (error) throw error;
    } catch (error: any) {
      console.error('Error recording feedback:', error);
      throw new Error(`Failed to record feedback: ${error.message}`);
    }
  }

  // =====================================================
  // PRIVATE HELPER METHODS
  // =====================================================

  private mapDbRowToRecommendation(row: any): AIRecommendation {
    return {
      id: row.id,
      room_id: row.room_id,
      recommendation_type: row.recommendation_type,
      room_context: (row.room_context || {}) as RoomContext,
      recommended_styles: row.recommended_styles as StyleRecommendation[] | undefined,
      furniture_suggestions: row.furniture_suggestions as FurniturePlacement[] | undefined,
      budget_alternatives: row.budget_alternatives as BudgetAlternative[] | undefined,
      trend_data: row.trend_data as TrendAnalysis | undefined,
      model_used: row.model_used || 'gemini-2.0-flash',
      confidence_score: row.confidence_score || 0,
      reasoning: row.reasoning || '',
      was_accepted: row.was_accepted || false,
      selected_option: row.selected_option,
      user_feedback: row.user_feedback,
      generated_at: row.generated_at,
      expires_at: row.expires_at,
      created_by: row.created_by,
    };
  }

  private async buildRoomContext(roomId: string): Promise<RoomContext> {
    const { data: room, error } = await supabase
      .from('rooms')
      .select(`
        *,
        projects (city, budget_tier, estimated_budget, actual_cost),
        room_analysis (
          door_count, window_count, ceiling_fan_count,
          detected_length_feet, detected_width_feet, detected_height_feet
        )
      `)
      .eq('id', roomId)
      .single();

    if (error) throw error;

    // Type assertions for the nested data
    const analysis = (room?.room_analysis || {}) as {
      door_count?: number;
      window_count?: number;
      ceiling_fan_count?: number;
      detected_length_feet?: number;
      detected_width_feet?: number;
      detected_height_feet?: number;
    };
    
    const project = (room?.projects || {}) as {
      city?: string;
      budget_tier?: string;
      estimated_budget?: number;
      actual_cost?: number;
    };
    
    const lengthFeet = room?.length_feet || analysis.detected_length_feet || 12;
    const widthFeet = room?.width_feet || analysis.detected_width_feet || 10;
    const heightFeet = room?.height_feet || analysis.detected_height_feet || 9;

    return {
      room_id: roomId,
      room_type: room?.room_type || 'living_room',
      room_name: room?.room_name || `Room ${room?.room_number}`,
      dimensions: {
        length_feet: lengthFeet,
        width_feet: widthFeet,
        height_feet: heightFeet,
        area_sqft: lengthFeet * widthFeet,
      },
      budget: {
        total_budget: project.estimated_budget || 500000,
        spent: project.actual_cost || 0,
        remaining: (project.estimated_budget || 500000) - (project.actual_cost || 0),
      },
      location: {
        city: project.city || 'Mumbai',
        region: 'Maharashtra',
      },
      characteristics: {
        natural_light: (analysis.window_count || 0) > 1 ? 'high' : (analysis.window_count || 0) === 1 ? 'medium' : 'low',
        window_count: analysis.window_count || 0,
        door_count: analysis.door_count || 0,
        ceiling_features: (analysis.ceiling_fan_count || 0) > 0 ? ['Ceiling Fan'] : [],
      },
      current_phase: `Phase ${room?.current_phase || 1}`,
      selected_style: room?.selected_style,
    };
  }

  private generateMockStyleRecommendations(context: RoomContext): StyleRecommendation[] {
    const styles = [
      {
        style_name: 'Modern Indian',
        confidence_score: 92,
        reasoning: `Perfect for ${context.location.city} homes, blending contemporary design with traditional elements.`,
        estimated_cost: 350000,
        pros: ['Locally sourced materials', 'Cultural relevance', 'Wide vendor availability'],
        cons: ['May require custom furniture'],
        budget_fit: 'within_budget' as const,
      },
      {
        style_name: 'Contemporary Minimal',
        confidence_score: 85,
        reasoning: 'Clean lines and open spaces maximize the room dimensions.',
        estimated_cost: 280000,
        pros: ['Lower cost', 'Easy to maintain', 'Timeless design'],
        cons: ['May feel impersonal'],
        budget_fit: 'under_budget' as const,
      },
    ];
    return styles;
  }

  private generateMockFurniturePlacements(context: RoomContext): FurniturePlacement[] {
    const placements = [
      {
        item_name: '3-Seater Sofa',
        category: 'Seating',
        placement: { x: 50, y: 70, rotation: 0 },
        dimensions: { width: 7, depth: 3, height: 3 },
        rationale: 'Centered against wall, facing natural light',
        estimated_cost: 45000,
        priority: 'essential' as const,
      },
      {
        item_name: 'Coffee Table',
        category: 'Tables',
        placement: { x: 50, y: 50, rotation: 0 },
        dimensions: { width: 4, depth: 2, height: 1.5 },
        rationale: 'Centered in front of sofa with walking clearance',
        estimated_cost: 12000,
        priority: 'essential' as const,
      },
    ];
    return placements;
  }

  private generateMockBudgetAlternatives(): BudgetAlternative[] {
    return [
      {
        original_item: 'Italian Marble Flooring',
        original_cost: 180000,
        alternative_item: 'Indian Marble (Makrana)',
        alternative_cost: 95000,
        cost_saving: 85000,
        savings_percentage: 47,
        quality_impact: 'minimal' as const,
        recommendation: 'Indian marble offers similar aesthetics at significantly lower cost',
      },
      {
        original_item: 'Imported Hardwood Furniture',
        original_cost: 120000,
        alternative_item: 'Local Teak Wood Furniture',
        alternative_cost: 75000,
        cost_saving: 45000,
        savings_percentage: 37,
        quality_impact: 'minimal' as const,
        recommendation: 'Teak is durable, locally available, and suits Indian climate better',
      },
    ];
  }
}

// Export singleton instance
export const recommendationService = new RecommendationService();

// Export the class for testing
export { RecommendationService };
