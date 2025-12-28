-- Create quality_control_rules table
CREATE TABLE IF NOT EXISTS public.quality_control_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_code TEXT NOT NULL UNIQUE,
  rule_name TEXT NOT NULL,
  rule_description TEXT NOT NULL,
  rule_category TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('critical', 'high', 'medium', 'low')),
  is_active BOOLEAN DEFAULT TRUE,
  enforcement_stage TEXT[] NOT NULL,
  prompt_instruction TEXT,
  validation_logic JSONB,
  auto_fix_available BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create quality_violations table
CREATE TABLE IF NOT EXISTS public.quality_violations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID REFERENCES public.rooms(id) ON DELETE CASCADE NOT NULL,
  render_id UUID REFERENCES public.renders(id) ON DELETE SET NULL,
  rule_code TEXT NOT NULL,
  violation_description TEXT NOT NULL,
  detected_at_stage TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('critical', 'high', 'medium', 'low')),
  auto_fixed BOOLEAN DEFAULT FALSE,
  fix_description TEXT,
  reviewer_override BOOLEAN DEFAULT FALSE,
  reviewer_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- Add quality tracking columns to rooms table
ALTER TABLE public.rooms ADD COLUMN IF NOT EXISTS ceiling_fan_detected BOOLEAN DEFAULT FALSE;
ALTER TABLE public.rooms ADD COLUMN IF NOT EXISTS quality_score INTEGER DEFAULT 100;

-- Enable RLS on new tables
ALTER TABLE public.quality_control_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quality_violations ENABLE ROW LEVEL SECURITY;

-- RLS policies for quality_control_rules (read-only for authenticated, admin can manage)
CREATE POLICY "Authenticated users can view active rules"
ON public.quality_control_rules
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage quality rules"
ON public.quality_control_rules
FOR ALL
USING (get_user_role(auth.uid()) = 'admin'::user_role);

-- RLS policies for quality_violations
CREATE POLICY "Users can view violations for their rooms"
ON public.quality_violations
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM rooms r
  JOIN projects p ON p.id = r.project_id
  WHERE r.id = quality_violations.room_id
  AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
));

CREATE POLICY "Users can create violations for their rooms"
ON public.quality_violations
FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM rooms r
  JOIN projects p ON p.id = r.project_id
  WHERE r.id = quality_violations.room_id
  AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
));

CREATE POLICY "Users can update violations for their rooms"
ON public.quality_violations
FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM rooms r
  JOIN projects p ON p.id = r.project_id
  WHERE r.id = quality_violations.room_id
  AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
));

CREATE POLICY "Admins can manage all violations"
ON public.quality_violations
FOR ALL
USING (get_user_role(auth.uid()) = 'admin'::user_role);

-- Insert the Fan/Light Conflict Rule
INSERT INTO public.quality_control_rules (
  rule_code, 
  rule_name, 
  rule_description, 
  rule_category, 
  severity, 
  enforcement_stage, 
  prompt_instruction, 
  validation_logic, 
  auto_fix_available
) VALUES (
  'FAN_LIGHT_CONFLICT',
  'Fan Priority Over Hanging Lights',
  'If a ceiling fan is present, no hanging pendant lights, chandeliers, or suspended fixtures can be placed. Use wall-mounted sconces, recessed downlights, table lamps, or floor lamps instead.',
  'fixture_conflict',
  'critical',
  ARRAY['detection', 'generation', 'validation', 'refinement'],
  'CRITICAL LIGHTING RULE: A ceiling fan is detected in this room. You MUST NOT include ANY hanging pendant lights, chandeliers, or suspended ceiling fixtures. Instead, use ONLY these lighting alternatives: wall-mounted sconces, recessed downlights (flush with ceiling), table lamps, floor lamps, or under-cabinet lighting. This is a safety and practical requirement.',
  '{"detect_keywords": ["ceiling fan", "fan"], "conflict_keywords": ["pendant light", "chandelier", "hanging light", "suspended fixture", "pendant lamp"], "allowed_alternatives": ["wall light", "downlight", "table lamp", "floor lamp", "recessed light", "sconce", "under-cabinet light"]}'::jsonb,
  true
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_quality_violations_room_id ON public.quality_violations(room_id);
CREATE INDEX IF NOT EXISTS idx_quality_violations_rule_code ON public.quality_violations(rule_code);
CREATE INDEX IF NOT EXISTS idx_quality_control_rules_active ON public.quality_control_rules(is_active) WHERE is_active = true;