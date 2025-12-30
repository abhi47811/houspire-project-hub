/**
 * F-021 & F-028: Architectural Preservation Service
 * 
 * Core system for extracting and preserving architectural elements from original images.
 * Ensures generated renders maintain the room's actual structure and dimensions.
 * 
 * Key Features:
 * - Extract room dimensions from AI analysis
 * - Detect and preserve doors, windows, built-ins
 * - Calculate structural boundaries
 * - Generate preservation rules for AI prompts
 * - Validate renders against original structure
 * 
 * Related Tables:
 * - rooms.architectural_elements (JSONB)
 * - rooms.preserve_doors (boolean)
 * - rooms.preserve_windows (boolean)
 * - rooms.preserve_built_ins (boolean)
 * - rooms.preservation_rules (JSONB)
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
      // Parse AI analysis response
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
      const { error } = await supabase
        .from('rooms')
        .update({
          architectural_elements: analysis.elements,
          estimated_dimensions: analysis.dimensions,
          preserve_doors: analysis.preservation_priority.doors,
          preserve_windows: analysis.preservation_priority.windows,
          preserve_built_ins: analysis.preservation_priority.built_ins,
          preservation_rules: this.generatePreservationRules(analysis),
        })
        .eq('id', analysis.room_id);

      if (error) throw error;
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

        // Add to prompt
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
      rules.layout_constraints.push(
        'Maintain original room layout and architectural elements'
      );
      rules.layout_constraints.push(
        'Preserve door and window positions'
      );
    }

    // Add validation rules
    rules.validation_rules = [
      {
        rule: 'door_count_match',
        threshold: 1.0,
        action: 'warn',
      },
      {
        rule: 'window_count_match',
        threshold: 1.0,
        action: 'warn',
      },
      {
        rule: 'dimension_variance',
        threshold: 0.2, // 20% variance allowed
        action: 'warn',
      },
    ];

    return rules;
  }

  /**
   * Get architectural preservation prompt additions
   */
  async getPreservationPrompt(roomId: string): Promise<string> {
    try {
      const { data, error } = await supabase
        .from('rooms')
        .select('preservation_rules, architectural_elements, estimated_dimensions')
        .eq('id', roomId)
        .single();

      if (error) throw error;
      if (!data?.preservation_rules) return '';

      const rules = data.preservation_rules as PreservationRules;
      
      // Build preservation prompt
      let prompt = '\n\n**Architectural Preservation Requirements:**\n';
      
      if (rules.prompt_additions && rules.prompt_additions.length > 0) {
        prompt += rules.prompt_additions.join(' ');
      }

      if (rules.mandatory_elements && rules.mandatory_elements.length > 0) {
        prompt += `\nMandatory elements: ${rules.mandatory_elements.join(', ')}.`;
      }

      if (rules.layout_constraints && rules.layout_constraints.length > 0) {
        prompt += `\nLayout requirements: ${rules.layout_constraints.join('; ')}.`;
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
        .from('rooms')
        .select('preservation_rules, architectural_elements, estimated_dimensions')
        .eq('id', roomId)
        .single();

      const warnings: string[] = [];
      const errors: string[] = [];

      if (!data?.preservation_rules) {
        return { valid: true, warnings, errors };
      }

      const rules = data.preservation_rules as PreservationRules;

      // Validate dimension variance
      if (data.estimated_dimensions && renderMetadata.dimensions) {
        const original = data.estimated_dimensions as RoomDimensions;
        const rendered = renderMetadata.dimensions;

        const lengthVariance = Math.abs(
          (rendered.length - original.length!) / original.length!
        );
        const widthVariance = Math.abs(
          (rendered.width - original.width!) / original.width!
        );

        if (lengthVariance > 0.2 || widthVariance > 0.2) {
          warnings.push(
            `Room dimensions vary significantly from original (${(Math.max(lengthVariance, widthVariance) * 100).toFixed(0)}% difference)`
          );
        }
      }

      // Validate element counts
      if (data.architectural_elements && renderMetadata.detected_elements) {
        const originalElements = data.architectural_elements as ArchitecturalElement[];
        const renderedElements = renderMetadata.detected_elements;

        originalElements.forEach((original) => {
          const rendered = renderedElements.find((r: any) => r.type === original.type);
          if (!rendered || rendered.count !== original.count) {
            warnings.push(
              `${original.type} count mismatch: expected ${original.count}, detected ${rendered?.count || 0}`
            );
          }
        });
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
    try {
      const { error } = await supabase
        .from('rooms')
        .update(preferences)
        .eq('id', roomId);

      if (error) throw error;

      // Regenerate preservation rules
      const { data } = await supabase
        .from('rooms')
        .select('architectural_elements, estimated_dimensions, preserve_doors, preserve_windows, preserve_built_ins')
        .eq('id', roomId)
        .single();

      if (data) {
        const analysis: ArchitecturalAnalysis = {
          room_id: roomId,
          dimensions: data.estimated_dimensions || { unit: 'feet' },
          elements: data.architectural_elements || [],
          structural_features: {},
          preservation_priority: {
            doors: data.preserve_doors ?? true,
            windows: data.preserve_windows ?? true,
            built_ins: data.preserve_built_ins ?? true,
            structural: true,
          },
          analysis_source: 'manual',
          analyzed_at: new Date().toISOString(),
        };

        const rules = this.generatePreservationRules(analysis);
        
        await supabase
          .from('rooms')
          .update({ preservation_rules: rules })
          .eq('id', roomId);
      }
    } catch (error) {
      console.error('Error updating preservation preferences:', error);
      throw error;
    }
  }
}

export const architecturalPreservationService = new ArchitecturalPreservationService();
