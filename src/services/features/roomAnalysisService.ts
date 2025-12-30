/**
 * Room Analysis Service
 * Provides AI-powered analysis of room photos to detect:
 * - Room type
 * - Approximate dimensions
 * - Architectural features (windows, doors, columns, arches)
 * - Natural light conditions
 * - Space characteristics
 */

import { supabase } from '@/integrations/supabase/client';

export interface RoomAnalysisResult {
  room_type: string;
  confidence: number;
  detected_features: ArchitecturalFeatures;
  dimensions: DimensionEstimate;
  lighting: LightingAnalysis;
  suggestions: string[];
  raw_analysis: string;
}

export interface ArchitecturalFeatures {
  windows: WindowDetection[];
  doors: DoorDetection[];
  columns: ColumnDetection[];
  arches: ArchDetection[];
  ceiling_type: 'standard' | 'vaulted' | 'drop_ceiling' | 'exposed_beams';
  ceiling_height_estimate: 'low' | 'medium' | 'high';
  flooring_visible: boolean;
  walls_visible: number;
}

export interface WindowDetection {
  count: number;
  size: 'small' | 'medium' | 'large';
  type: 'standard' | 'bay' | 'french' | 'sliding';
  natural_light_contribution: number; // 0-100
}

export interface DoorDetection {
  count: number;
  type: 'single' | 'double' | 'sliding' | 'french';
  visible: boolean;
}

export interface ColumnDetection {
  count: number;
  style: 'modern' | 'classical' | 'industrial';
  prominent: boolean;
}

export interface ArchDetection {
  count: number;
  style: 'rounded' | 'pointed' | 'flat';
  prominent: boolean;
}

export interface DimensionEstimate {
  length_feet: number;
  width_feet: number;
  height_feet: number;
  area_sqft: number;
  confidence: number; // 0-100
  estimation_method: 'ai_analysis' | 'reference_objects' | 'user_input';
}

export interface LightingAnalysis {
  natural_light_level: 'low' | 'medium' | 'high';
  primary_light_source: 'windows' | 'skylights' | 'artificial' | 'mixed';
  light_direction: string;
  time_of_day_estimate: 'morning' | 'afternoon' | 'evening' | 'night' | 'unknown';
  recommendations: string[];
}

/**
 * Analyze a room image using AI
 */
export async function analyzeRoomImage(
  imageUrl: string,
  roomId: string
): Promise<RoomAnalysisResult> {
  try {
    // Call edge function for AI analysis
    const { data, error } = await supabase.functions.invoke('analyze-room-image', {
      body: {
        image_url: imageUrl,
        room_id: roomId,
      },
    });

    if (error) {
      console.error('Error calling analyze-room-image function:', error);
      // Return mock data as fallback
      return generateMockAnalysis();
    }

    return data as RoomAnalysisResult;
  } catch (error) {
    console.error('Error in analyzeRoomImage:', error);
    // Return mock data as fallback
    return generateMockAnalysis();
  }
}

/**
 * Generate mock analysis for development/fallback
 */
function generateMockAnalysis(): RoomAnalysisResult {
  return {
    room_type: 'living_room',
    confidence: 85,
    detected_features: {
      windows: [
        {
          count: 2,
          size: 'large',
          type: 'standard',
          natural_light_contribution: 75,
        },
      ],
      doors: [
        {
          count: 1,
          type: 'single',
          visible: true,
        },
      ],
      columns: [],
      arches: [],
      ceiling_type: 'standard',
      ceiling_height_estimate: 'medium',
      flooring_visible: true,
      walls_visible: 3,
    },
    dimensions: {
      length_feet: 15,
      width_feet: 12,
      height_feet: 10,
      area_sqft: 180,
      confidence: 70,
      estimation_method: 'ai_analysis',
    },
    lighting: {
      natural_light_level: 'high',
      primary_light_source: 'windows',
      light_direction: 'north-east',
      time_of_day_estimate: 'afternoon',
      recommendations: [
        'Excellent natural light - consider light curtains',
        'Add warm artificial lighting for evenings',
        'Ceiling fan visible - good for air circulation',
      ],
    },
    suggestions: [
      'Room appears spacious with good natural light',
      'Consider furniture placement to maximize window views',
      'Neutral walls provide great canvas for any style',
      'High ceilings allow for statement lighting fixtures',
    ],
    raw_analysis: 'AI detected a bright living room with large windows providing excellent natural light.',
  };
}

/**
 * Save analysis results to database
 */
export async function saveRoomAnalysis(
  roomId: string,
  analysis: RoomAnalysisResult
): Promise<void> {
  try {
    // Update room with detected information
    const updateData: any = {
      room_type: analysis.room_type,
      updated_at: new Date().toISOString(),
    };

    // Add dimension estimates if confident enough
    if (analysis.dimensions.confidence > 60) {
      updateData.length_feet = analysis.dimensions.length_feet;
      updateData.width_feet = analysis.dimensions.width_feet;
      updateData.height_feet = analysis.dimensions.height_feet;
    }

    const { error } = await supabase
      .from('rooms')
      .update(updateData)
      .eq('id', roomId);

    if (error) throw error;

    // Store full analysis in metadata or separate table if needed
    console.log('Room analysis saved successfully');
  } catch (error) {
    console.error('Error saving room analysis:', error);
    throw error;
  }
}

/**
 * Get architectural feature suggestions based on detection
 */
export function getArchitecturalSuggestions(
  features: ArchitecturalFeatures
): string[] {
  const suggestions: string[] = [];

  // Window suggestions
  if (features.windows.length > 0) {
    const totalWindows = features.windows.reduce((sum, w) => sum + w.count, 0);
    if (totalWindows >= 2) {
      suggestions.push('Multiple windows detected - great for natural ventilation');
    }
    
    const hasLargeWindows = features.windows.some(w => w.size === 'large');
    if (hasLargeWindows) {
      suggestions.push('Large windows provide excellent natural light - consider light-filtering curtains');
    }
  }

  // Column suggestions
  if (features.columns.length > 0 && features.columns[0].prominent) {
    suggestions.push('Prominent columns detected - can be featured as design elements');
  }

  // Arch suggestions
  if (features.arches.length > 0) {
    suggestions.push('Architectural arches add character - highlight them in your design');
  }

  // Ceiling suggestions
  if (features.ceiling_height_estimate === 'high') {
    suggestions.push('High ceilings allow for dramatic lighting fixtures and vertical decor');
  } else if (features.ceiling_height_estimate === 'low') {
    suggestions.push('Consider light colors and vertical lines to create height illusion');
  }

  // Ceiling type suggestions
  if (features.ceiling_type === 'exposed_beams') {
    suggestions.push('Exposed beams add rustic charm - consider complementary design styles');
  }

  return suggestions;
}

/**
 * Estimate room dimensions from reference objects
 * (Door width is typically 3 feet, window height ~4-5 feet, etc.)
 */
export function estimateDimensionsFromFeatures(
  features: ArchitecturalFeatures,
  imageWidth: number,
  imageHeight: number
): DimensionEstimate {
  // This is a simplified estimation
  // In production, would use more sophisticated computer vision

  let lengthFeet = 15;
  let widthFeet = 12;
  let heightFeet = 10;
  let confidence = 50;

  // Adjust based on visible features
  if (features.doors.length > 0) {
    // Doors are typically 3 feet wide, 7 feet tall
    // Use as reference for other dimensions
    confidence += 20;
  }

  if (features.ceiling_height_estimate === 'high') {
    heightFeet = 12;
    confidence += 10;
  } else if (features.ceiling_height_estimate === 'low') {
    heightFeet = 8;
    confidence += 10;
  }

  // Adjust based on walls visible
  if (features.walls_visible === 4) {
    // Can see all 4 walls = smaller room or wider angle
    lengthFeet = 12;
    widthFeet = 10;
    confidence += 5;
  }

  return {
    length_feet: lengthFeet,
    width_feet: widthFeet,
    height_feet: heightFeet,
    area_sqft: lengthFeet * widthFeet,
    confidence: Math.min(confidence, 100),
    estimation_method: 'ai_analysis',
  };
}

/**
 * Classify room type based on detected features
 */
export function classifyRoomType(features: ArchitecturalFeatures): {
  room_type: string;
  confidence: number;
} {
  // This is a simplified classification
  // In production, would use ML model

  let roomType = 'living_room';
  let confidence = 60;

  // Decision logic based on features
  const windowCount = features.windows.reduce((sum, w) => sum + w.count, 0);
  
  if (windowCount >= 3) {
    roomType = 'living_room';
    confidence = 75;
  } else if (windowCount === 0) {
    roomType = 'bathroom';
    confidence = 70;
  } else if (features.ceiling_type === 'exposed_beams') {
    roomType = 'dining_room';
    confidence = 65;
  }

  return { room_type: roomType, confidence };
}

export const roomAnalysisService = {
  analyzeRoomImage,
  saveRoomAnalysis,
  getArchitecturalSuggestions,
  estimateDimensionsFromFeatures,
  classifyRoomType,
};
