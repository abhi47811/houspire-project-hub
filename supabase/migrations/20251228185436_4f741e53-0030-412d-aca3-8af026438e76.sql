-- Insert DETAIL_PRESERVATION quality control rule
INSERT INTO quality_control_rules (
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
  'DETAIL_PRESERVATION',
  'Maintain Rich Detail and Styling',
  'Generated rooms must maintain rich detail including furniture, decor, plants, textiles, and accessories. Avoid bare, sterile rooms.',
  'quality_standards',
  'high',
  ARRAY['generation', 'refinement'],
  'QUALITY REQUIREMENT: Create a richly detailed, magazine-quality space with layered styling. Include: multiple furniture pieces, decorative accessories, plants, textiles (rugs, curtains), wall art, and styling elements. The space should feel lived-in and luxurious, not bare or sterile. When refining, preserve all existing details unless specifically instructed to remove them.',
  '{"required_elements": ["furniture", "decor", "textiles", "plants", "accessories"], "avoid": ["bare walls", "empty spaces", "minimal styling"]}'::jsonb,
  false
) ON CONFLICT (rule_code) DO UPDATE SET
  rule_name = EXCLUDED.rule_name,
  rule_description = EXCLUDED.rule_description,
  prompt_instruction = EXCLUDED.prompt_instruction,
  validation_logic = EXCLUDED.validation_logic,
  updated_at = NOW();