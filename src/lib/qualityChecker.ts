import { supabase } from '@/integrations/supabase/client';
import { trackQualityViolation } from './error-tracking';

export type ViolationType = 
  | 'FAN_LIGHT_CONFLICT'
  | 'MISSING_CURTAINS'
  | 'MISSING_DECOR'
  | 'LOW_QUALITY_SCORE'
  | 'DETAIL_PRESERVATION'
  | 'MISSING_FURNITURE'
  | 'MISSING_PLANTS'
  | 'BARE_WALLS';

export type ViolationSeverity = 'critical' | 'high' | 'medium' | 'low';

export interface QualityViolation {
  type: ViolationType;
  severity: ViolationSeverity;
  description: string;
  detected_at: string;
  room_id: string;
  render_id?: string;
  auto_fixable: boolean;
  fix_suggestion?: string;
}

// Check for fan + light conflict
export function checkFanLightConflict(prompt: string): QualityViolation | null {
  const hasFan = /ceiling fan|fan/i.test(prompt);
  const hasHangingLight = /chandelier|pendant light|hanging light/i.test(prompt);
  
  if (hasFan && hasHangingLight) {
    return {
      type: 'FAN_LIGHT_CONFLICT',
      severity: 'critical',
      description: 'Both ceiling fan and hanging light detected. Physical impossibility and safety hazard.',
      detected_at: new Date().toISOString(),
      room_id: '',
      auto_fixable: true,
      fix_suggestion: 'Remove hanging light, add wall sconces or table lamps instead.'
    };
  }
  
  return null;
}

// Check for missing curtains
export function checkMissingCurtains(prompt: string): QualityViolation | null {
  const hasCurtains = /curtain|drape|blind|window treatment/i.test(prompt);
  const hasWindows = /window|balcony/i.test(prompt);
  
  if (hasWindows && !hasCurtains) {
    return {
      type: 'MISSING_CURTAINS',
      severity: 'high',
      description: 'Windows present but no window treatments specified.',
      detected_at: new Date().toISOString(),
      room_id: '',
      auto_fixable: true,
      fix_suggestion: 'Add curtains, drapes, or blinds appropriate to the style.'
    };
  }
  
  return null;
}

// Check for missing decor
export function checkMissingDecor(prompt: string): QualityViolation | null {
  const hasDecor = /wall art|artwork|mirror|decorative|accessories|decor/i.test(prompt);
  
  if (!hasDecor) {
    return {
      type: 'MISSING_DECOR',
      severity: 'high',
      description: 'No decorative elements or wall art specified.',
      detected_at: new Date().toISOString(),
      room_id: '',
      auto_fixable: true,
      fix_suggestion: 'Add wall art, mirrors, and decorative accessories.'
    };
  }
  
  return null;
}

// Check for missing plants
export function checkMissingPlants(prompt: string): QualityViolation | null {
  const hasPlants = /plant|greenery|potted|indoor plant/i.test(prompt);
  
  if (!hasPlants) {
    return {
      type: 'MISSING_PLANTS',
      severity: 'medium',
      description: 'No plants or greenery specified.',
      detected_at: new Date().toISOString(),
      room_id: '',
      auto_fixable: true,
      fix_suggestion: 'Add potted plants in appropriate planters.'
    };
  }
  
  return null;
}

// Check for bare walls
export function checkBareWalls(prompt: string): QualityViolation | null {
  const hasWallDecor = /wall art|painting|frame|gallery|poster|wall decor|artwork/i.test(prompt);
  
  if (!hasWallDecor) {
    return {
      type: 'BARE_WALLS',
      severity: 'medium',
      description: 'No wall decoration specified, may result in bare walls.',
      detected_at: new Date().toISOString(),
      room_id: '',
      auto_fixable: true,
      fix_suggestion: 'Add framed artwork, gallery wall, or decorative wall elements.'
    };
  }
  
  return null;
}

// Check quality score
export function checkQualityScore(score: number | null): QualityViolation | null {
  if (score === null) return null;
  
  if (score < 70) {
    return {
      type: 'LOW_QUALITY_SCORE',
      severity: score < 50 ? 'critical' : 'high',
      description: `Quality score ${score} is below acceptable threshold (70).`,
      detected_at: new Date().toISOString(),
      room_id: '',
      auto_fixable: false,
      fix_suggestion: 'Regenerate with more detailed prompt or different parameters.'
    };
  }
  
  return null;
}

// Run all quality checks
export async function runQualityChecks(params: {
  prompt: string;
  roomId: string;
  renderId?: string;
  qualityScore?: number;
  stage?: string;
}): Promise<QualityViolation[]> {
  const violations: QualityViolation[] = [];
  
  // Run all checks
  const checks = [
    checkFanLightConflict(params.prompt),
    checkMissingCurtains(params.prompt),
    checkMissingDecor(params.prompt),
    checkMissingPlants(params.prompt),
    checkBareWalls(params.prompt),
    checkQualityScore(params.qualityScore ?? null),
  ];
  
  // Collect violations
  checks.forEach(violation => {
    if (violation) {
      violation.room_id = params.roomId;
      violation.render_id = params.renderId;
      violations.push(violation);
    }
  });
  
  // Log to database
  if (violations.length > 0) {
    await logViolations(violations, params.stage || 'generation');
  }
  
  return violations;
}

// Log violations to database
async function logViolations(violations: QualityViolation[], stage: string) {
  try {
    const { error } = await supabase
      .from('quality_violations')
      .insert(violations.map(v => ({
        room_id: v.room_id,
        render_id: v.render_id || null,
        rule_code: v.type,
        severity: v.severity,
        violation_description: v.description,
        detected_at_stage: stage,
        auto_fixed: false,
        fix_description: v.fix_suggestion
      })));
    
    if (error) {
      console.error('Failed to log violations:', error);
    } else {
      console.log(`✅ Logged ${violations.length} quality violations`);
      
      // Track in Sentry
      violations.forEach(v => {
        trackQualityViolation({
          type: v.type,
          roomId: v.room_id,
          severity: v.severity,
          details: { ...v } as Record<string, unknown>
        });
      });
    }
  } catch (error) {
    console.error('Error logging violations:', error);
  }
}

// Get violation statistics
export async function getViolationStats() {
  try {
    const { data: violations, error } = await supabase
      .from('quality_violations')
      .select('rule_code, severity, resolved_at')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    const total = violations?.length || 0;
    const unresolved = violations?.filter(v => !v.resolved_at).length || 0;
    
    const bySeverity = violations?.reduce((acc: Record<string, number>, v) => {
      if (!v.resolved_at) {
        acc[v.severity] = (acc[v.severity] || 0) + 1;
      }
      return acc;
    }, {}) || {};
    
    const byType = violations?.reduce((acc: Record<string, number>, v) => {
      if (!v.resolved_at) {
        acc[v.rule_code] = (acc[v.rule_code] || 0) + 1;
      }
      return acc;
    }, {}) || {};
    
    return { total, unresolved, bySeverity, byType };
  } catch (error) {
    console.error('Failed to get violation stats:', error);
    return { total: 0, unresolved: 0, bySeverity: {}, byType: {} };
  }
}

// Resolve a violation
export async function resolveViolation(violationId: string, notes?: string) {
  try {
    const { error } = await supabase
      .from('quality_violations')
      .update({ 
        resolved_at: new Date().toISOString(),
        reviewer_notes: notes || null
      })
      .eq('id', violationId);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Failed to resolve violation:', error);
    return false;
  }
}

// Build improved prompt based on violations
export function buildImprovedPrompt(originalPrompt: string, violations: QualityViolation[]): string {
  let improvedPrompt = originalPrompt;
  
  violations.forEach(v => {
    switch (v.type) {
      case 'FAN_LIGHT_CONFLICT':
        // Remove chandelier/pendant references
        improvedPrompt = improvedPrompt.replace(/chandelier|pendant light|hanging light/gi, 'wall sconces');
        break;
      case 'MISSING_CURTAINS':
        if (!improvedPrompt.includes('curtain')) {
          improvedPrompt += ' with elegant floor-to-ceiling curtains';
        }
        break;
      case 'MISSING_DECOR':
        if (!improvedPrompt.includes('artwork')) {
          improvedPrompt += ' with tasteful wall art and decorative accessories';
        }
        break;
      case 'MISSING_PLANTS':
        if (!improvedPrompt.includes('plant')) {
          improvedPrompt += ' with indoor plants in stylish planters';
        }
        break;
      case 'BARE_WALLS':
        if (!improvedPrompt.includes('wall art')) {
          improvedPrompt += ' with framed artwork on walls';
        }
        break;
    }
  });
  
  return improvedPrompt;
}
