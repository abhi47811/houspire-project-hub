/**
 * F-053 to F-058: Quality Scoring Service
 * 
 * Comprehensive quality assessment for rendered images.
 * Uses the quality_metrics table for storage.
 */

import { supabase } from '@/integrations/supabase/client';

/**
 * Quality score breakdown interface
 */
export interface QualityScore {
  render_id: string;
  room_id: string;
  total_score: number;
  quality_grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  style_consistency: number;
  architectural_accuracy: number;
  furniture_placement: number;
  color_material_adherence: number;
  technical_quality: number;
  suggestions: string[];
  scored_at: string;
  scoring_version: string;
}

/**
 * Scoring weights for different aspects
 */
const SCORING_WEIGHTS = {
  style_consistency: 0.25,
  architectural_accuracy: 0.25,
  furniture_placement: 0.20,
  color_material_adherence: 0.15,
  technical_quality: 0.15,
};

/**
 * Grade thresholds
 */
const GRADE_THRESHOLDS: { min: number; grade: QualityScore['quality_grade'] }[] = [
  { min: 95, grade: 'A+' },
  { min: 85, grade: 'A' },
  { min: 75, grade: 'B' },
  { min: 65, grade: 'C' },
  { min: 50, grade: 'D' },
  { min: 0, grade: 'F' },
];

/**
 * Calculate quality grade from score
 */
export function calculateGrade(score: number): QualityScore['quality_grade'] {
  for (const { min, grade } of GRADE_THRESHOLDS) {
    if (score >= min) {
      return grade;
    }
  }
  return 'F';
}

/**
 * Calculate weighted total score
 */
export function calculateTotalScore(breakdown: {
  style_consistency: number;
  architectural_accuracy: number;
  furniture_placement: number;
  color_material_adherence: number;
  technical_quality: number;
}): number {
  return Math.round(
    breakdown.style_consistency * SCORING_WEIGHTS.style_consistency +
    breakdown.architectural_accuracy * SCORING_WEIGHTS.architectural_accuracy +
    breakdown.furniture_placement * SCORING_WEIGHTS.furniture_placement +
    breakdown.color_material_adherence * SCORING_WEIGHTS.color_material_adherence +
    breakdown.technical_quality * SCORING_WEIGHTS.technical_quality
  );
}

/**
 * Generate scoring suggestions based on breakdown
 */
export function generateSuggestions(breakdown: {
  style_consistency: number;
  architectural_accuracy: number;
  furniture_placement: number;
  color_material_adherence: number;
  technical_quality: number;
}): string[] {
  const suggestions: string[] = [];

  if (breakdown.style_consistency < 70) {
    suggestions.push('Consider adjusting furniture and decor to better match the selected style');
  }
  if (breakdown.architectural_accuracy < 70) {
    suggestions.push('Verify that doors, windows, and room dimensions match the original');
  }
  if (breakdown.furniture_placement < 70) {
    suggestions.push('Review furniture layout for better spatial balance');
  }
  if (breakdown.color_material_adherence < 70) {
    suggestions.push('Adjust color palette and materials to match style specifications');
  }
  if (breakdown.technical_quality < 70) {
    suggestions.push('Improve image resolution and lighting quality');
  }

  if (suggestions.length === 0) {
    suggestions.push('Render meets quality standards');
  }

  return suggestions;
}

/**
 * Score a render based on various criteria
 */
export async function scoreRender(
  renderId: string,
  roomId: string,
  analysisData: {
    style_match?: number;
    architectural_match?: number;
    furniture_score?: number;
    color_score?: number;
    technical_score?: number;
  }
): Promise<QualityScore> {
  const breakdown = {
    style_consistency: analysisData.style_match || 80,
    architectural_accuracy: analysisData.architectural_match || 80,
    furniture_placement: analysisData.furniture_score || 80,
    color_material_adherence: analysisData.color_score || 80,
    technical_quality: analysisData.technical_score || 80,
  };

  const totalScore = calculateTotalScore(breakdown);
  const grade = calculateGrade(totalScore);
  const suggestions = generateSuggestions(breakdown);

  const score: QualityScore = {
    render_id: renderId,
    room_id: roomId,
    total_score: totalScore,
    quality_grade: grade,
    ...breakdown,
    suggestions,
    scored_at: new Date().toISOString(),
    scoring_version: '1.0.0',
  };

  return score;
}

/**
 * Assess style consistency
 */
export function assessStyleConsistency(
  renderAnalysis: any,
  styleReference: any
): number {
  // In production, this would use AI to compare render against style reference
  let score = 80;

  if (renderAnalysis.detected_style === styleReference.design_style) {
    score += 15;
  }

  if (renderAnalysis.color_palette) {
    score += 5;
  }

  return Math.min(100, Math.max(0, score));
}

/**
 * Assess architectural accuracy
 */
export function assessArchitecturalAccuracy(
  renderAnalysis: any,
  roomAnalysis: any
): number {
  let score = 80;

  // Check door count match
  if (renderAnalysis.door_count === roomAnalysis.door_count) {
    score += 10;
  } else if (renderAnalysis.door_count) {
    score -= 15;
  }

  // Check window count match
  if (renderAnalysis.window_count === roomAnalysis.window_count) {
    score += 10;
  } else if (renderAnalysis.window_count) {
    score -= 15;
  }

  return Math.min(100, Math.max(0, score));
}

/**
 * Assess furniture placement
 */
export function assessFurniturePlacement(
  renderAnalysis: any,
  roomDimensions: any
): number {
  let score = 80;

  // Check for proper spacing
  if (renderAnalysis.furniture_spacing_adequate) {
    score += 10;
  }

  // Check for walkway clearance
  if (renderAnalysis.walkway_clearance) {
    score += 5;
  }

  // Check for balanced layout
  if (renderAnalysis.layout_balanced) {
    score += 5;
  }

  return Math.min(100, Math.max(0, score));
}

/**
 * Assess color and material adherence
 */
export function assessColorMaterialAdherence(
  renderAnalysis: any,
  styleSpecifications: any
): number {
  let score = 80;

  // Check color palette match
  if (renderAnalysis.colors_match_spec) {
    score += 10;
  }

  // Check material authenticity
  if (renderAnalysis.materials_realistic) {
    score += 10;
  }

  return Math.min(100, Math.max(0, score));
}

/**
 * Assess technical quality
 */
export function assessTechnicalQuality(
  imageMetadata: any
): {
  score: number;
  resolution_adequate: boolean;
  lighting_quality: string;
  render_artifacts: boolean;
} {
  let score = 80;
  let resolutionAdequate = true;
  let lightingQuality = 'good';
  let renderArtifacts = false;

  // Check resolution (minimum 1024x1024)
  if (imageMetadata.width >= 1024 && imageMetadata.height >= 1024) {
    score += 10;
  } else {
    score -= 10;
    resolutionAdequate = false;
  }

  // Check lighting
  if (imageMetadata.lighting_balanced) {
    score += 5;
    lightingQuality = 'excellent';
  } else if (imageMetadata.lighting_adequate) {
    lightingQuality = 'good';
  } else {
    score -= 5;
    lightingQuality = 'poor';
  }

  // Check for artifacts
  if (imageMetadata.has_artifacts) {
    score -= 10;
    renderArtifacts = true;
  }

  return {
    score: Math.min(100, Math.max(0, score)),
    resolution_adequate: resolutionAdequate,
    lighting_quality: lightingQuality,
    render_artifacts: renderArtifacts,
  };
}

/**
 * Save quality score to database using quality_metrics table
 */
export async function saveQualityScore(score: QualityScore): Promise<void> {
  try {
    // Save to quality_metrics table
    const metrics = [
      { render_id: score.render_id, metric_name: 'total_score', score: score.total_score, details: { grade: score.quality_grade, suggestions: score.suggestions } },
      { render_id: score.render_id, metric_name: 'style_consistency', score: score.style_consistency },
      { render_id: score.render_id, metric_name: 'architectural_accuracy', score: score.architectural_accuracy },
      { render_id: score.render_id, metric_name: 'furniture_placement', score: score.furniture_placement },
      { render_id: score.render_id, metric_name: 'color_material_adherence', score: score.color_material_adherence },
      { render_id: score.render_id, metric_name: 'technical_quality', score: score.technical_quality },
    ];

    const { error } = await supabase
      .from('quality_metrics')
      .upsert(metrics, { onConflict: 'render_id,metric_name' });

    if (error) throw error;

    // Also update the render's quality_score field
    await supabase
      .from('renders')
      .update({ 
        quality_score: score.total_score,
        quality_details: {
          grade: score.quality_grade,
          breakdown: {
            style_consistency: score.style_consistency,
            architectural_accuracy: score.architectural_accuracy,
            furniture_placement: score.furniture_placement,
            color_material_adherence: score.color_material_adherence,
            technical_quality: score.technical_quality,
          },
          suggestions: score.suggestions,
        }
      })
      .eq('id', score.render_id);

  } catch (error) {
    console.error('Error saving quality score:', error);
    throw error;
  }
}

/**
 * Get quality score for render
 */
export async function getQualityScore(
  renderId: string
): Promise<QualityScore | null> {
  try {
    // Get from renders table quality_details
    const { data: render, error } = await supabase
      .from('renders')
      .select('id, room_id, quality_score, quality_details')
      .eq('id', renderId)
      .single();

    if (error) throw error;
    if (!render || !render.quality_details) return null;

    const details = render.quality_details as any;
    const breakdown = details.breakdown || {};

    return {
      render_id: render.id,
      room_id: render.room_id,
      total_score: render.quality_score || 0,
      quality_grade: details.grade || 'C',
      style_consistency: breakdown.style_consistency || 0,
      architectural_accuracy: breakdown.architectural_accuracy || 0,
      furniture_placement: breakdown.furniture_placement || 0,
      color_material_adherence: breakdown.color_material_adherence || 0,
      technical_quality: breakdown.technical_quality || 0,
      suggestions: details.suggestions || [],
      scored_at: new Date().toISOString(),
      scoring_version: '1.0.0',
    };
  } catch (error) {
    console.error('Error fetching quality score:', error);
    return null;
  }
}

/**
 * Get quality metrics for render
 */
export async function getQualityMetrics(
  renderId: string
): Promise<Record<string, number> | null> {
  try {
    const { data, error } = await supabase
      .from('quality_metrics')
      .select('metric_name, score')
      .eq('render_id', renderId);

    if (error) throw error;
    if (!data || data.length === 0) return null;

    const metrics: Record<string, number> = {};
    data.forEach((m) => {
      metrics[m.metric_name] = m.score;
    });

    return metrics;
  } catch (error) {
    console.error('Error fetching quality metrics:', error);
    return null;
  }
}
