import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface QualityRule {
  id: string;
  rule_code: string;
  rule_name: string;
  rule_description: string;
  rule_category: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  is_active: boolean;
  enforcement_stage: string[];
  prompt_instruction: string | null;
  validation_logic: {
    detect_keywords?: string[];
    conflict_keywords?: string[];
    allowed_alternatives?: string[];
  } | null;
  auto_fix_available: boolean;
}

export interface QualityViolation {
  id: string;
  room_id: string;
  render_id: string | null;
  rule_code: string;
  violation_description: string;
  detected_at_stage: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  auto_fixed: boolean;
  fix_description: string | null;
  reviewer_override: boolean;
  reviewer_notes: string | null;
  created_at: string;
  resolved_at: string | null;
}

interface RoomAnalysis {
  ceiling_fan_count?: number;
}

interface RoomData {
  ceiling_fan_detected?: boolean;
  room_type?: string;
  room_analysis?: RoomAnalysis | null;
}

// Room types that commonly have ceiling fans (smart detection)
const ROOM_TYPES_WITH_FANS = [
  'living_room',
  'bedroom',
  'master_bedroom',
  'guest_bedroom',
  'dining_room',
  'office',
  'home_office',
  'kids_room',
];

// Severity penalties for quality score calculation
const SEVERITY_PENALTIES: Record<string, number> = {
  critical: 25,
  high: 15,
  medium: 10,
  low: 5,
};

export function useQualityControl(roomId?: string) {
  const queryClient = useQueryClient();

  // Fetch all active quality control rules
  const { data: rules = [], isLoading: rulesLoading } = useQuery({
    queryKey: ['quality-control-rules'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quality_control_rules')
        .select('*')
        .eq('is_active', true)
        .order('severity');
      
      if (error) throw error;
      return data as QualityRule[];
    },
  });

  // Fetch violations for a specific room
  const { data: violations = [], isLoading: violationsLoading } = useQuery({
    queryKey: ['quality-violations', roomId],
    queryFn: async () => {
      if (!roomId) return [];
      
      const { data, error } = await supabase
        .from('quality_violations')
        .select('*')
        .eq('room_id', roomId)
        .is('resolved_at', null)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as QualityViolation[];
    },
    enabled: !!roomId,
  });

  // Calculate quality score based on unresolved violations
  const calculateQualityScore = (violations: QualityViolation[]): number => {
    const unresolvedViolations = violations.filter(
      v => !v.resolved_at && !v.reviewer_override
    );
    
    let penalty = 0;
    unresolvedViolations.forEach(v => {
      penalty += SEVERITY_PENALTIES[v.severity] || 5;
    });
    
    return Math.max(0, 100 - penalty);
  };

  const qualityScore = calculateQualityScore(violations);

  // Check if room has ceiling fan using smart detection
  const checkCeilingFanConflict = (roomData: RoomData | null): boolean => {
    if (!roomData) return false;
    
    // Explicit detection from room data
    if (roomData.ceiling_fan_detected === true) return true;
    
    // Detection from room analysis
    if (roomData.room_analysis?.ceiling_fan_count && roomData.room_analysis.ceiling_fan_count > 0) {
      return true;
    }
    
    // Smart detection based on room type (common rooms with fans in Indian homes)
    if (roomData.room_type && ROOM_TYPES_WITH_FANS.includes(roomData.room_type)) {
      return true;
    }
    
    return false;
  };

  // Get rules for a specific enforcement stage
  const getRulesForStage = (stage: 'detection' | 'generation' | 'validation' | 'refinement'): QualityRule[] => {
    return rules.filter(rule => rule.enforcement_stage.includes(stage));
  };

  // Get applicable rules based on room data
  const getApplicableRules = (
    roomData: RoomData | null,
    stage: 'generation' | 'refinement' = 'generation'
  ): QualityRule[] => {
    const stageRules = getRulesForStage(stage);
    const applicableRules: QualityRule[] = [];
    
    const hasCeilingFan = checkCeilingFanConflict(roomData);
    
    stageRules.forEach(rule => {
      // FAN_LIGHT_CONFLICT - only apply if ceiling fan detected
      if (rule.rule_code === 'FAN_LIGHT_CONFLICT' && hasCeilingFan) {
        applicableRules.push(rule);
      }
      // DETAIL_PRESERVATION - always apply for generation/refinement
      else if (rule.rule_code === 'DETAIL_PRESERVATION') {
        applicableRules.push(rule);
      }
      // Add more rule conditions here as needed
    });
    
    return applicableRules;
  };

  // Apply quality control rules to a prompt
  const applyRulesToPrompt = (
    basePrompt: string,
    roomData: RoomData | null,
    context: 'generation' | 'refinement' = 'generation'
  ): string => {
    const applicableRules = getApplicableRules(roomData, context);
    
    if (applicableRules.length === 0) return basePrompt;
    
    const promptAdditions = applicableRules
      .filter(rule => rule.prompt_instruction)
      .map(rule => rule.prompt_instruction)
      .join('\n\n');
    
    return promptAdditions 
      ? `${basePrompt}\n\n## QUALITY CONTROL RULES (MUST FOLLOW):\n${promptAdditions}` 
      : basePrompt;
  };

  // Build prompt additions based on applicable rules (legacy compatibility)
  const buildQualityPromptAdditions = (
    roomAnalysis: RoomAnalysis | null,
    ceilingFanDetected: boolean
  ): string => {
    const roomData: RoomData = {
      ceiling_fan_detected: ceilingFanDetected,
      room_analysis: roomAnalysis,
    };
    
    const applicableRules = getApplicableRules(roomData, 'generation');
    
    if (applicableRules.length === 0) return '';
    
    const promptAdditions = applicableRules
      .filter(rule => rule.prompt_instruction)
      .map(rule => rule.prompt_instruction)
      .join('\n\n');
    
    return promptAdditions ? `\n\n## QUALITY CONTROL RULES:\n${promptAdditions}` : '';
  };

  // Log a new violation
  const logViolation = useMutation({
    mutationFn: async (violation: {
      room_id: string;
      render_id?: string;
      rule_code: string;
      violation_description: string;
      detected_at_stage: string;
      severity: 'critical' | 'high' | 'medium' | 'low';
    }) => {
      const { data, error } = await supabase
        .from('quality_violations')
        .insert(violation)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quality-violations', roomId] });
    },
    onError: (error) => {
      console.error('Failed to log violation:', error);
      toast.error('Failed to log quality violation');
    },
  });

  // Mark violation as resolved
  const resolveViolation = useMutation({
    mutationFn: async (violationId: string) => {
      const { error } = await supabase
        .from('quality_violations')
        .update({ resolved_at: new Date().toISOString() })
        .eq('id', violationId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quality-violations', roomId] });
      toast.success('Violation resolved');
    },
    onError: (error) => {
      console.error('Failed to resolve violation:', error);
      toast.error('Failed to resolve violation');
    },
  });

  // Override a violation (reviewer decision)
  const overrideViolation = useMutation({
    mutationFn: async ({ violationId, notes }: { violationId: string; notes: string }) => {
      const { error } = await supabase
        .from('quality_violations')
        .update({ 
          reviewer_override: true, 
          reviewer_notes: notes,
          resolved_at: new Date().toISOString()
        })
        .eq('id', violationId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quality-violations', roomId] });
      toast.success('Violation overridden by reviewer');
    },
    onError: (error) => {
      console.error('Failed to override violation:', error);
      toast.error('Failed to override violation');
    },
  });

  // Mark violation as auto-fixed
  const markAutoFixed = useMutation({
    mutationFn: async ({ violationId, fixDescription }: { violationId: string; fixDescription: string }) => {
      const { error } = await supabase
        .from('quality_violations')
        .update({ 
          auto_fixed: true, 
          fix_description: fixDescription,
          resolved_at: new Date().toISOString()
        })
        .eq('id', violationId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quality-violations', roomId] });
      toast.success('Violation auto-fixed');
    },
    onError: (error) => {
      console.error('Failed to mark auto-fixed:', error);
      toast.error('Failed to mark as auto-fixed');
    },
  });

  // Update room quality score
  const updateRoomQualityScore = useMutation({
    mutationFn: async ({ roomId, score }: { roomId: string; score: number }) => {
      const { error } = await supabase
        .from('rooms')
        .update({ quality_score: score })
        .eq('id', roomId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['room'] });
    },
  });

  // Get rule by code
  const getRuleByCode = (code: string): QualityRule | undefined => {
    return rules.find(r => r.rule_code === code);
  };

  return {
    rules,
    violations,
    qualityScore,
    rulesLoading,
    violationsLoading,
    checkCeilingFanConflict,
    getRulesForStage,
    getApplicableRules,
    applyRulesToPrompt,
    buildQualityPromptAdditions,
    logViolation,
    resolveViolation,
    overrideViolation,
    markAutoFixed,
    updateRoomQualityScore,
    getRuleByCode,
    calculateQualityScore,
  };
}
