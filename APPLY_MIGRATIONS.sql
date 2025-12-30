-- HOUSPIRE: Apply All Pending Migrations
-- Run this in Supabase SQL Editor
-- Date: 2025-12-30

-- ============================================================================
-- MIGRATION CHECK: Run this first to see what's applied
-- ============================================================================

SELECT version, name, executed_at 
FROM supabase_migrations.schema_migrations 
ORDER BY version DESC 
LIMIT 20;

-- ============================================================================
-- If you see version 20251230135838 and 20251230113257, migrations are applied
-- If NOT, copy and run the respective migration files below
-- ============================================================================

-- After running migrations, verify data:

-- Check smart_defaults (should have ~169 rows)
SELECT 
  style, 
  room_type, 
  COUNT(*) as count,
  SUM(jsonb_array_length(specifications)) as total_specs
FROM smart_defaults 
GROUP BY style, room_type
ORDER BY style, room_type;

-- Check style_library (should have ~168 rows)
SELECT 
  design_style,
  room_type,
  COUNT(*) as count
FROM style_library
GROUP BY design_style, room_type
ORDER BY design_style, room_type;

-- Check ai_recommendations table exists
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'ai_recommendations'
ORDER BY ordinal_position;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Test smart defaults function
SELECT * FROM get_smart_default('Contemporary', 'Dining Room');

-- Count all available style combinations
SELECT 
  COUNT(DISTINCT style) as total_styles,
  COUNT(DISTINCT room_type) as total_room_types,
  COUNT(*) as total_combinations
FROM smart_defaults;

-- Expected output:
-- total_styles: 13
-- total_room_types: 14 
-- total_combinations: 169

-- ============================================================================
-- If migrations NOT applied, you'll see 0 rows.
-- Solution: Run the migration files in Supabase SQL Editor
-- ============================================================================
