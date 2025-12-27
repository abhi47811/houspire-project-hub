-- Create room_analysis table for Phase 2 analysis data
CREATE TABLE public.room_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  
  -- Architectural features
  window_count INTEGER DEFAULT 0,
  window_positions JSONB DEFAULT '[]',
  door_count INTEGER DEFAULT 0,
  door_positions JSONB DEFAULT '[]',
  ceiling_fan_count INTEGER DEFAULT 0,
  outlet_count INTEGER DEFAULT 0,
  other_features JSONB DEFAULT '[]',
  
  -- Measurements
  detected_length_feet DECIMAL(8, 2),
  detected_width_feet DECIMAL(8, 2),
  detected_height_feet DECIMAL(8, 2),
  measurement_confidence DECIMAL(5, 2),
  
  -- Suggested styles
  suggested_styles JSONB DEFAULT '[]',
  selected_style TEXT,
  
  -- Status
  is_verified BOOLEAN DEFAULT false,
  verified_at TIMESTAMP WITH TIME ZONE,
  verified_by UUID REFERENCES public.profiles(id),
  
  -- Raw analysis data
  raw_analysis_data JSONB,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  UNIQUE(room_id)
);

ALTER TABLE public.room_analysis ENABLE ROW LEVEL SECURITY;

-- RLS policies for room_analysis (inherit from room/project access)
CREATE POLICY "Users can view analysis of their rooms"
  ON public.room_analysis FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.rooms r
      JOIN public.projects p ON p.id = r.project_id
      WHERE r.id = room_analysis.room_id
      AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
    )
  );

CREATE POLICY "Admins can view all analysis"
  ON public.room_analysis FOR SELECT
  USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Users can create analysis for their rooms"
  ON public.room_analysis FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.rooms r
      JOIN public.projects p ON p.id = r.project_id
      WHERE r.id = room_id
      AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
    )
  );

CREATE POLICY "Users can update analysis for their rooms"
  ON public.room_analysis FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.rooms r
      JOIN public.projects p ON p.id = r.project_id
      WHERE r.id = room_analysis.room_id
      AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
    )
  );

CREATE POLICY "Admins can manage all analysis"
  ON public.room_analysis FOR ALL
  USING (public.get_user_role(auth.uid()) = 'admin');

-- Add index
CREATE INDEX idx_room_analysis_room_id ON public.room_analysis(room_id);

-- Add trigger for updated_at
CREATE TRIGGER update_room_analysis_updated_at
  BEFORE UPDATE ON public.room_analysis
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();