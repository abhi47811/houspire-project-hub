// AI-Powered Room Analysis Service
// Auto-detects doors, windows, dimensions, and architectural features

import { supabase } from '@/integrations/supabase/client';

export interface RoomAnalysisResult {
  doors: number;
  windows: number;
  doorPositions: Array<{
    x: number;
    y: number;
    width: number;
    height: number;
    type: string;
  }>;
  windowPositions: Array<{
    x: number;
    y: number;
    width: number;
    height: number;
    type: string;
  }>;
  dimensions?: {
    estimatedLength: number;
    estimatedWidth: number;
    estimatedHeight: number;
    unit: 'feet' | 'meters';
    confidence: number;
  };
  structuralElements?: {
    columns: number;
    beams: number;
    alcoves: number;
  };
  lighting?: {
    naturalLight: string; // 'high' | 'medium' | 'low'
    artificialLight: string; // 'high' | 'medium' | 'low'
    lightSources: number;
  };
  floorType?: string;
  wallType?: string;
  ceilingType?: string;
  suggestions?: string[];
}

/**
 * Analyze room image using AI
 */
export async function analyzeRoomImage(
  imageUrl: string,
  roomId?: string
): Promise<RoomAnalysisResult> {
  try {
    console.log('🔍 Analyzing room image:', imageUrl);

    // Call the analyze-room edge function
    const { data, error } = await supabase.functions.invoke('analyze-room', {
      body: {
        imageUrl,
        roomId,
      },
    });

    if (error) throw error;

    console.log('✅ Room analysis complete:', data);
    return data as RoomAnalysisResult;
  } catch (error: any) {
    console.error('❌ Room analysis failed:', error);
    
    // Return fallback analysis
    return {
      doors: 1,
      windows: 1,
      doorPositions: [],
      windowPositions: [],
      dimensions: {
        estimatedLength: 12,
        estimatedWidth: 10,
        estimatedHeight: 9,
        unit: 'feet',
        confidence: 0.5,
      },
      suggestions: [
        'Manual verification recommended',
        'Could not auto-detect all features',
      ],
    };
  }
}

/**
 * Save room analysis to database
 */
export async function saveRoomAnalysis(
  roomId: string,
  analysis: RoomAnalysisResult
): Promise<boolean> {
  try {
    console.log('💾 Saving room analysis for room:', roomId);

    // Update room with analysis data
    const { error: updateError } = await supabase
      .from('rooms')
      .update({
        doors: analysis.doors,
        windows: analysis.windows,
        door_positions: analysis.doorPositions,
        window_positions: analysis.windowPositions,
        length_feet: analysis.dimensions?.estimatedLength,
        width_feet: analysis.dimensions?.estimatedWidth,
        height_feet: analysis.dimensions?.estimatedHeight,
      })
      .eq('id', roomId);

    if (updateError) throw updateError;

    // Create room_analysis record
    const { error: analysisError } = await supabase.from('room_analysis').insert({
      room_id: roomId,
      door_count: analysis.doors,
      window_count: analysis.windows,
      door_positions: analysis.doorPositions,
      window_positions: analysis.windowPositions,
      structural_elements: analysis.structuralElements,
      lighting_analysis: analysis.lighting,
      floor_type: analysis.floorType,
      wall_type: analysis.wallType,
      ceiling_type: analysis.ceilingType,
      ai_suggestions: analysis.suggestions,
      analysis_confidence: analysis.dimensions?.confidence || 0.7,
    });

    if (analysisError) throw analysisError;

    console.log('✅ Room analysis saved successfully');
    return true;
  } catch (error: any) {
    console.error('❌ Failed to save room analysis:', error);
    return false;
  }
}

/**
 * Get room analysis from database
 */
export async function getRoomAnalysis(roomId: string): Promise<RoomAnalysisResult | null> {
  try {
    const { data, error } = await supabase
      .from('room_analysis')
      .select('*')
      .eq('room_id', roomId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    return {
      doors: data.door_count,
      windows: data.window_count,
      doorPositions: data.door_positions || [],
      windowPositions: data.window_positions || [],
      structuralElements: data.structural_elements,
      lighting: data.lighting_analysis,
      floorType: data.floor_type,
      wallType: data.wall_type,
      ceilingType: data.ceiling_type,
      suggestions: data.ai_suggestions,
    };
  } catch (error: any) {
    console.error('❌ Failed to get room analysis:', error);
    return null;
  }
}

/**
 * Detect objects in image using AI
 */
export async function detectObjectsInImage(imageUrl: string): Promise<any[]> {
  try {
    console.log('🔍 Detecting objects in image:', imageUrl);

    const { data, error } = await supabase.functions.invoke('detect-objects', {
      body: { imageUrl },
    });

    if (error) throw error;

    return data.objects || [];
  } catch (error: any) {
    console.error('❌ Object detection failed:', error);
    return [];
  }
}

/**
 * Estimate room dimensions from image
 */
export async function estimateRoomDimensions(
  imageUrl: string,
  knownObjectSize?: { width: number; height: number; unit: string }
): Promise<{
  length: number;
  width: number;
  height: number;
  unit: string;
  confidence: number;
} | null> {
  try {
    console.log('📏 Estimating room dimensions from image');

    const { data, error } = await supabase.functions.invoke('estimate-dimensions', {
      body: {
        imageUrl,
        knownObjectSize,
      },
    });

    if (error) throw error;

    return data.dimensions;
  } catch (error: any) {
    console.error('❌ Dimension estimation failed:', error);
    return null;
  }
}

/**
 * Count architectural features (doors, windows)
 */
export async function countArchitecturalFeatures(imageUrl: string): Promise<{
  doors: number;
  windows: number;
  confidence: number;
}> {
  try {
    console.log('🚪 Counting architectural features');

    const { data, error } = await supabase.functions.invoke('count-features', {
      body: { imageUrl },
    });

    if (error) throw error;

    return {
      doors: data.doors || 1,
      windows: data.windows || 1,
      confidence: data.confidence || 0.7,
    };
  } catch (error: any) {
    console.error('❌ Feature counting failed:', error);
    return {
      doors: 1,
      windows: 1,
      confidence: 0.5,
    };
  }
}

/**
 * Generate room suggestions based on analysis
 */
export function generateRoomSuggestions(analysis: RoomAnalysisResult): string[] {
  const suggestions: string[] = [];

  // Door suggestions
  if (analysis.doors === 0) {
    suggestions.push('⚠️ No doors detected. Please verify manually.');
  } else if (analysis.doors > 3) {
    suggestions.push('Multiple doors detected. Consider space flow in design.');
  }

  // Window suggestions
  if (analysis.windows === 0) {
    suggestions.push('No windows detected. Consider adding artificial lighting.');
  } else if (analysis.windows >= 3) {
    suggestions.push('Good natural light. Leverage window placement in design.');
  }

  // Dimension suggestions
  if (analysis.dimensions) {
    const area = analysis.dimensions.estimatedLength * analysis.dimensions.estimatedWidth;
    
    if (area < 100) {
      suggestions.push('Compact space. Recommend multi-functional furniture.');
    } else if (area > 300) {
      suggestions.push('Spacious room. Consider zone division for better functionality.');
    }

    if (analysis.dimensions.estimatedHeight > 12) {
      suggestions.push('High ceiling detected. Consider vertical design elements.');
    }
  }

  // Lighting suggestions
  if (analysis.lighting) {
    if (analysis.lighting.naturalLight === 'low') {
      suggestions.push('Limited natural light. Plan adequate artificial lighting.');
    }
  }

  return suggestions;
}

/**
 * Format analysis for display
 */
export function formatAnalysisForDisplay(analysis: RoomAnalysisResult): {
  [key: string]: string | number;
} {
  return {
    'Doors Detected': analysis.doors,
    'Windows Detected': analysis.windows,
    'Estimated Length':
      analysis.dimensions
        ? `${analysis.dimensions.estimatedLength} ${analysis.dimensions.unit}`
        : 'Unknown',
    'Estimated Width':
      analysis.dimensions
        ? `${analysis.dimensions.estimatedWidth} ${analysis.dimensions.unit}`
        : 'Unknown',
    'Estimated Height':
      analysis.dimensions
        ? `${analysis.dimensions.estimatedHeight} ${analysis.dimensions.unit}`
        : 'Unknown',
    'Confidence':
      analysis.dimensions ? `${(analysis.dimensions.confidence * 100).toFixed(0)}%` : 'N/A',
  };
}
