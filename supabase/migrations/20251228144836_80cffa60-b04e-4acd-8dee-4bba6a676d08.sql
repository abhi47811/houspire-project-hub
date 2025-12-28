-- Drop the old incorrect table
DROP TABLE IF EXISTS public.smart_defaults CASCADE;

-- Create the new correct table
CREATE TABLE public.smart_defaults (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  style TEXT NOT NULL,
  room_type TEXT NOT NULL,
  style_slug TEXT NOT NULL,
  room_type_slug TEXT NOT NULL,
  specifications JSONB NOT NULL DEFAULT '[]'::jsonb,
  checklist JSONB NOT NULL DEFAULT '[]'::jsonb,
  finishes JSONB NOT NULL DEFAULT '[]'::jsonb,
  source_file TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_style_room UNIQUE (style_slug, room_type_slug)
);

COMMENT ON TABLE public.smart_defaults IS 'Pre-configured design specifications for each style+room combination';

-- Enable RLS
ALTER TABLE public.smart_defaults ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read
CREATE POLICY "Allow authenticated users to read smart defaults" 
  ON public.smart_defaults FOR SELECT 
  TO authenticated
  USING (true);

-- Allow admins to manage
CREATE POLICY "Allow admins to manage smart defaults" 
  ON public.smart_defaults FOR ALL 
  USING (public.get_user_role(auth.uid()) = 'admin');

-- Create helper function to fetch smart defaults by style and room type
CREATE OR REPLACE FUNCTION public.get_smart_default(
  p_style TEXT, 
  p_room_type TEXT
)
RETURNS TABLE (
  id UUID, 
  style TEXT, 
  room_type TEXT, 
  specifications JSONB, 
  checklist JSONB, 
  finishes JSONB
)
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    sd.id, 
    sd.style, 
    sd.room_type, 
    sd.specifications, 
    sd.checklist, 
    sd.finishes
  FROM public.smart_defaults sd
  WHERE sd.style_slug = lower(replace(p_style, ' ', '_'))
    AND sd.room_type_slug = lower(replace(p_room_type, ' ', '_'))
  LIMIT 1;
END;
$$;

-- Create helper function to list all available design styles
CREATE OR REPLACE FUNCTION public.get_available_styles()
RETURNS TABLE (style TEXT, style_slug TEXT)
LANGUAGE sql 
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT DISTINCT sd.style, sd.style_slug 
  FROM public.smart_defaults sd
  ORDER BY sd.style;
$$;

-- Add budget_tier column to projects table
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS budget_tier TEXT DEFAULT 'mid_range';

-- Add check constraint for budget_tier (using DO block to handle if already exists)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'projects_budget_tier_check'
  ) THEN
    ALTER TABLE public.projects 
      ADD CONSTRAINT projects_budget_tier_check 
      CHECK (budget_tier IN ('premium', 'mid_range', 'budget'));
  END IF;
END $$;

COMMENT ON COLUMN public.projects.budget_tier IS 'Budget tier: premium (2.5x), mid_range (1.0x), or budget (0.5x)';