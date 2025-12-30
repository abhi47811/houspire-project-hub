-- Migration: Add Architectural Preservation Columns
-- Purpose: Enable door/window preservation in AI-generated renders
-- Date: 2025-12-30

-- ============================================================================
-- PART 1: Add architectural columns to rooms table
-- ============================================================================

-- Add columns to store door and window data
ALTER TABLE public.rooms
  ADD COLUMN IF NOT EXISTS doors INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS windows INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS door_positions JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS window_positions JSONB DEFAULT '[]'::jsonb;

-- Add helpful comments
COMMENT ON COLUMN public.rooms.doors IS 'Number of doors in the room (extracted from analysis)';
COMMENT ON COLUMN public.rooms.windows IS 'Number of windows in the room (extracted from analysis)';
COMMENT ON COLUMN public.rooms.door_positions IS 'Array of door positions: [{"wall": "left", "position": "center", "width": "3ft"}]';
COMMENT ON COLUMN public.rooms.window_positions IS 'Array of window positions: [{"wall": "right", "position": "upper", "size": "4x3ft"}]';

-- ============================================================================
-- PART 2: Add preservation validation columns to renders table
-- ============================================================================

-- Add columns to track preservation success
ALTER TABLE public.renders
  ADD COLUMN IF NOT EXISTS doors_preserved BOOLEAN,
  ADD COLUMN IF NOT EXISTS windows_preserved BOOLEAN,
  ADD COLUMN IF NOT EXISTS preservation_validation JSONB DEFAULT '{}'::jsonb;

-- Add helpful comments
COMMENT ON COLUMN public.renders.doors_preserved IS 'Whether all doors were preserved in the render';
COMMENT ON COLUMN public.renders.windows_preserved IS 'Whether all windows were preserved in the render';
COMMENT ON COLUMN public.renders.preservation_validation IS 'Detailed validation: {"doors": {"expected": 1, "found": 1}, "windows": {"expected": 2, "found": 2}}';

-- Add index for preservation queries
CREATE INDEX IF NOT EXISTS idx_renders_preservation 
  ON public.renders(doors_preserved, windows_preserved)
  WHERE doors_preserved IS NOT NULL OR windows_preserved IS NOT NULL;

-- ============================================================================
-- PART 3: Add architectural extraction columns to room_analysis table
-- ============================================================================

-- Check if room_analysis table exists first
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'room_analysis') THEN
    -- Add columns for door/window extraction
    ALTER TABLE public.room_analysis
      ADD COLUMN IF NOT EXISTS door_count INTEGER DEFAULT 0,
      ADD COLUMN IF NOT EXISTS window_count INTEGER DEFAULT 0,
      ADD COLUMN IF NOT EXISTS door_details JSONB DEFAULT '[]'::jsonb,
      ADD COLUMN IF NOT EXISTS window_details JSONB DEFAULT '[]'::jsonb;

    -- Add comments
    COMMENT ON COLUMN public.room_analysis.door_count IS 'Number of doors detected in original image';
    COMMENT ON COLUMN public.room_analysis.window_count IS 'Number of windows detected in original image';
    COMMENT ON COLUMN public.room_analysis.door_details IS 'Detailed door information from analysis';
    COMMENT ON COLUMN public.room_analysis.window_details IS 'Detailed window information from analysis';
  END IF;
END $$;

-- ============================================================================
-- PART 4: Create function to sync room_analysis data to rooms table
-- ============================================================================

-- Function to automatically copy door/window counts from analysis to rooms
CREATE OR REPLACE FUNCTION public.sync_architectural_data_to_rooms()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Update the rooms table with analysis data
  UPDATE public.rooms
  SET 
    doors = COALESCE(NEW.door_count, doors),
    windows = COALESCE(NEW.window_count, windows),
    door_positions = COALESCE(NEW.door_details, door_positions),
    window_positions = COALESCE(NEW.window_details, window_positions)
  WHERE id = NEW.room_id;
  
  RETURN NEW;
END;
$$;

-- Create trigger if room_analysis table exists
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'room_analysis') THEN
    -- Drop existing trigger if it exists
    DROP TRIGGER IF EXISTS sync_architectural_data ON public.room_analysis;
    
    -- Create new trigger
    CREATE TRIGGER sync_architectural_data
      AFTER INSERT OR UPDATE ON public.room_analysis
      FOR EACH ROW
      EXECUTE FUNCTION public.sync_architectural_data_to_rooms();
  END IF;
END $$;

-- ============================================================================
-- PART 5: Add indexes for performance
-- ============================================================================

-- Index for querying rooms by architectural elements
CREATE INDEX IF NOT EXISTS idx_rooms_doors ON public.rooms(doors) WHERE doors > 0;
CREATE INDEX IF NOT EXISTS idx_rooms_windows ON public.rooms(windows) WHERE windows > 0;

-- ============================================================================
-- VERIFICATION QUERIES (commented out - for manual testing)
-- ============================================================================

-- Verify columns were added to rooms:
-- SELECT column_name, data_type, column_default 
-- FROM information_schema.columns 
-- WHERE table_name = 'rooms' 
-- AND column_name IN ('doors', 'windows', 'door_positions', 'window_positions');

-- Verify columns were added to renders:
-- SELECT column_name, data_type 
-- FROM information_schema.columns 
-- WHERE table_name = 'renders' 
-- AND column_name IN ('doors_preserved', 'windows_preserved', 'preservation_validation');

-- Check indexes:
-- SELECT indexname, indexdef 
-- FROM pg_indexes 
-- WHERE tablename IN ('rooms', 'renders') 
-- AND indexname LIKE '%preservation%' OR indexname LIKE '%doors%' OR indexname LIKE '%windows%';
