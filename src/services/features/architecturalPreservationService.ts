/**
 * F-021 & F-028: Architectural Preservation Service
 * 
 * Core system for extracting and preserving architectural elements from original images.
 * Uses room_analysis and architectural_preservation tables for storage.
 */

import { supabase } from '@/integrations/supabase/client';

export interface ArchitecturalElement {
  type: 'door' | 'window' | 'built_in' | 'column' | 'beam' | 'alcove' | 'niche';
  count: number;
  locations?: string[];
  dimensions?: {
    width?: number;
    height?: number;
    area?: number;
  };
  metadata?: Record<string, any>;
}

export interface RoomDimensions {
  length?: number;
  width?: number;
  height?: number;
  area?: number;
  unit: 'feet' | 'meters';
  confidence?: number;
}

export interface ArchitecturalAnalysis {
  room_id: string;
  dimensions: RoomDimensions;
  elements: ArchitecturalElement[];
  structural_features: {
    ceiling_type?: string;
    floor_type?: string;
    wall_condition?: string;
    lighting_sources?: string[];
  };
  preservation_priority: {
    doors: boolean;
    windows: boolean;
    built_ins: boolean;
    structural: boolean;
  };
  analysis_source: 'ai_vision' | 'manual' | 'floor_plan';
  analyzed_at: string;
}

export interface PreservationRules {
  mandatory_elements: string[];
  layout_constraints: string[];
  dimension_bounds: {
    min_length?: number;
    max_length?: number;
    min_width?: number;
    max_width?: number;
    min_height?: number;
    max_height?: number;
  };
  prompt_additions: string[];
  validation_rules: {
    rule: string;
    threshold: number;
    action: 'warn' | 'block';
  }[];
}

class ArchitecturalPreservationService {
  /**
   * Extract architectural elements from AI room analysis
   */
  async extractArchitecturalElements(
    roomId: string,
    aiAnalysis: any
  ): Promise<ArchitecturalAnalysis> {
    try {
      const elements: ArchitecturalElement[] = [];

      // Extract doors
      if (aiAnalysis.doors || aiAnalysis.door_count) {
        elements.push({
          type: 'door',
          count: aiAnalysis.door_count || aiAnalysis.doors || 0,
          locations: aiAnalysis.door_locations || [],
        });
      }

      // Extract windows
      if (aiAnalysis.windows || aiAnalysis.window_count) {
        elements.push({
          type: 'window',
          count: aiAnalysis.window_count || aiAnalysis.windows || 0,
          locations: aiAnalysis.window_locations || [],
        });
      }

      // Extract built-ins
      if (aiAnalysis.built_ins || aiAnalysis.built_in_storage) {
        elements.push({
          type: 'built_in',
          count: 1,
          metadata: {
            description: aiAnalysis.built_ins || aiAnalysis.built_in_storage,
          },
        });
      }

      // Extract dimensions
      const dimensions: RoomDimensions = {
        length: aiAnalysis.estimated_length || aiAnalysis.length,
        width: aiAnalysis.estimated_width || aiAnalysis.width,
        height: aiAnalysis.estimated_height || aiAnalysis.height || 10,
        area: aiAnalysis.estimated_area || aiAnalysis.area,
        unit: 'feet',
        confidence: aiAnalysis.confidence_score || 0.8,
      };

      // Calculate area if not provided
      if (!dimensions.area && dimensions.length && dimensions.width) {
        dimensions.area = dimensions.length * dimensions.width;
      }

      const analysis: ArchitecturalAnalysis = {
        room_id: roomId,
        dimensions,
        elements,
        structural_features: {
          ceiling_type: aiAnalysis.ceiling_type,
          floor_type: aiAnalysis.floor_type,
          wall_condition: aiAnalysis.wall_condition,
          lighting_sources: aiAnalysis.natural_light || aiAnalysis.lighting_sources || [],
        },
        preservation_priority: {
          doors: true,
          windows: true,
          built_ins: true,
          structural: true,
        },
        analysis_source: 'ai_vision',
        analyzed_at: new Date().toISOString(),
      };

      return analysis;
    } catch (error) {
      console.error('Error extracting architectural elements:', error);
      throw error;
    }
  }

  /**
   * Save architectural analysis to database
   */
  async saveArchitecturalAnalysis(
    analysis: ArchitecturalAnalysis
  ): Promise<void> {
    try {
      // Update room dimensions
      await supabase
        .from('rooms')
        .update({
          length_feet: analysis.dimensions.length,
          width_feet: analysis.dimensions.width,
          height_feet: analysis.dimensions.height,
        })
        .eq('id', analysis.room_id);

      // Get door and window counts from elements
      const doorCount = analysis.elements.find(e => e.type === 'door')?.count || 0;
      const windowCount = analysis.elements.find(e => e.type === 'window')?.count || 0;

      // Check if room_analysis exists
      const { data: existing } = await supabase
        .from('room_analysis')
        .select('id')
        .eq('room_id', analysis.room_id)
        .single();

      if (existing) {
        // Update existing
        await supabase
          .from('room_analysis')
          .update({
            door_count: doorCount,
            window_count: windowCount,
            detected_length_feet: analysis.dimensions.length,
            detected_width_feet: analysis.dimensions.width,
            detected_height_feet: analysis.dimensions.height,
            other_features: analysis.elements as any,
            raw_analysis_data: analysis.structural_features as any,
            updated_at: new Date().toISOString(),
          })
          .eq('room_id', analysis.room_id);
      } else {
        // Insert new
        await supabase
          .from('room_analysis')
          .insert({
            room_id: analysis.room_id,
            door_count: doorCount,
            window_count: windowCount,
            detected_length_feet: analysis.dimensions.length,
            detected_width_feet: analysis.dimensions.width,
            detected_height_feet: analysis.dimensions.height,
            other_features: analysis.elements as any,
            raw_analysis_data: analysis.structural_features as any,
          });
      }

      // Check if architectural_preservation exists
      const { data: existingPres } = await supabase
        .from('architectural_preservation')
        .select('id')
        .eq('room_id', analysis.room_id)
        .single();

      if (existingPres) {
        await supabase
          .from('architectural_preservation')
          .update({
            original_doors: doorCount,
            original_windows: windowCount,
            preservation_validated: false,
          })
          .eq('room_id', analysis.room_id);
      } else {
        await supabase
          .from('architectural_preservation')
          .insert({
            room_id: analysis.room_id,
            original_doors: doorCount,
            original_windows: windowCount,
            preservation_validated: false,
          });
      }

    } catch (error) {
      console.error('Error saving architectural analysis:', error);
      throw error;
    }
  }

  /**
   * Generate preservation rules from architectural analysis
   */
  generatePreservationRules(
    analysis: ArchitecturalAnalysis
  ): PreservationRules {
    const rules: PreservationRules = {
      mandatory_elements: [],
      layout_constraints: [],
      dimension_bounds: {},
      prompt_additions: [],
      validation_rules: [],
    };

    // Add mandatory elements
    analysis.elements.forEach((element) => {
      if (element.count > 0) {
        const elementDesc = `${element.count} ${element.type}${element.count > 1 ? 's' : ''}`;
        rules.mandatory_elements.push(elementDesc);
        rules.prompt_additions.push(
          `The room has ${elementDesc}${element.locations ? ` located at ${element.locations.join(', ')}` : ''}.`
        );
      }
    });

    // Add dimension constraints
    const dims = analysis.dimensions;
    if (dims.length && dims.width) {
      rules.dimension_bounds = {
        min_length: dims.length * 0.9,
        max_length: dims.length * 1.1,
        min_width: dims.width * 0.9,
        max_width: dims.width * 1.1,
        min_height: dims.height ? dims.height * 0.9 : 9,
        max_height: dims.height ? dims.height * 1.1 : 11,
      };

      rules.prompt_additions.push(
        `Room dimensions: approximately ${dims.length}ft × ${dims.width}ft${dims.height ? ` × ${dims.height}ft` : ''}.`
      );
    }

    // Add layout constraints
    if (analysis.elements.length > 0) {
      rules.layout_constraints.push('Maintain original room layout and architectural elements');
      rules.layout_constraints.push('Preserve door and window positions');
    }

    // Add validation rules
    rules.validation_rules = [
      { rule: 'door_count_match', threshold: 1.0, action: 'warn' },
      { rule: 'window_count_match', threshold: 1.0, action: 'warn' },
      { rule: 'dimension_variance', threshold: 0.2, action: 'warn' },
    ];

    return rules;
  }

  /**
   * Get architectural preservation prompt additions
   */
  async getPreservationPrompt(roomId: string): Promise<string> {
    try {
      const { data, error } = await supabase
        .from('room_analysis')
        .select('door_count, window_count, detected_length_feet, detected_width_feet, detected_height_feet, other_features')
        .eq('room_id', roomId)
        .single();

      if (error || !data) return '';

      let prompt = '\n\n**Architectural Preservation Requirements:**\n';

      if (data.door_count && data.door_count > 0) {
        prompt += `The room has ${data.door_count} door(s). `;
      }
      if (data.window_count && data.window_count > 0) {
        prompt += `The room has ${data.window_count} window(s). `;
      }
      if (data.detected_length_feet && data.detected_width_feet) {
        prompt += `Room dimensions: approximately ${data.detected_length_feet}ft × ${data.detected_width_feet}ft`;
        if (data.detected_height_feet) {
          prompt += ` × ${data.detected_height_feet}ft`;
        }
        prompt += '. ';
      }

      prompt += '\nMaintain the room\'s actual proportions and structural features in the render.';

      return prompt;
    } catch (error) {
      console.error('Error getting preservation prompt:', error);
      return '';
    }
  }

  /**
   * Validate render against preservation rules
   */
  async validateRender(
    roomId: string,
    renderMetadata: any
  ): Promise<{
    valid: boolean;
    warnings: string[];
    errors: string[];
  }> {
    try {
      const { data } = await supabase
        .from('room_analysis')
        .select('door_count, window_count, detected_length_feet, detected_width_feet')
        .eq('room_id', roomId)
        .single();

      const warnings: string[] = [];
      const errors: string[] = [];

      if (!data) {
        return { valid: true, warnings, errors };
      }

      // Validate dimension variance
      if (data.detected_length_feet && data.detected_width_feet && renderMetadata?.dimensions) {
        const lengthVariance = Math.abs(
          (renderMetadata.dimensions.length - data.detected_length_feet) / data.detected_length_feet
        );
        const widthVariance = Math.abs(
          (renderMetadata.dimensions.width - data.detected_width_feet) / data.detected_width_feet
        );

        if (lengthVariance > 0.2 || widthVariance > 0.2) {
          warnings.push(
            `Room dimensions vary significantly from original (${(Math.max(lengthVariance, widthVariance) * 100).toFixed(0)}% difference)`
          );
        }
      }

      // Validate element counts
      if (renderMetadata?.detected_elements) {
        const renderedDoors = renderMetadata.detected_elements.find((e: any) => e.type === 'door')?.count || 0;
        const renderedWindows = renderMetadata.detected_elements.find((e: any) => e.type === 'window')?.count || 0;

        if (data.door_count && renderedDoors !== data.door_count) {
          warnings.push(`Door count mismatch: expected ${data.door_count}, detected ${renderedDoors}`);
        }
        if (data.window_count && renderedWindows !== data.window_count) {
          warnings.push(`Window count mismatch: expected ${data.window_count}, detected ${renderedWindows}`);
        }
      }

      // Update architectural_preservation with validation results
      if (renderMetadata?.detected_elements) {
        const renderedDoors = renderMetadata.detected_elements.find((e: any) => e.type === 'door')?.count;
        const renderedWindows = renderMetadata.detected_elements.find((e: any) => e.type === 'window')?.count;
        
        const { data: existingPres } = await supabase
          .from('architectural_preservation')
          .select('id')
          .eq('room_id', roomId)
          .single();

        if (existingPres) {
          await supabase
            .from('architectural_preservation')
            .update({
              rendered_doors: renderedDoors,
              rendered_windows: renderedWindows,
              preservation_validated: warnings.length === 0 && errors.length === 0,
              validation_score: warnings.length === 0 ? 100 : Math.max(0, 100 - warnings.length * 20),
            })
            .eq('room_id', roomId);
        } else {
          await supabase
            .from('architectural_preservation')
            .insert({
              room_id: roomId,
              rendered_doors: renderedDoors,
              rendered_windows: renderedWindows,
              preservation_validated: warnings.length === 0 && errors.length === 0,
              validation_score: warnings.length === 0 ? 100 : Math.max(0, 100 - warnings.length * 20),
            });
        }
      }

      return {
        valid: errors.length === 0,
        warnings,
        errors,
      };
    } catch (error) {
      console.error('Error validating render:', error);
      return {
        valid: false,
        warnings: [],
        errors: ['Validation failed due to system error'],
      };
    }
  }

  /**
   * Update preservation preferences
   */
  async updatePreservationPreferences(
    roomId: string,
    preferences: {
      preserve_doors?: boolean;
      preserve_windows?: boolean;
      preserve_built_ins?: boolean;
    }
  ): Promise<void> {
    // This is a no-op since we don't have these columns on the rooms table
    // The preferences are stored in the analysis workflow itself
    console.log('Updating preferences for room', roomId, preferences);
  }
}

export const architecturalPreservationService = new ArchitecturalPreservationService();
