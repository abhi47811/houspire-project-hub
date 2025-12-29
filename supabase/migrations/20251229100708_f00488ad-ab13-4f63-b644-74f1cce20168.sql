-- Create architectural_preservation table for door/window validation tracking
CREATE TABLE public.architectural_preservation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  original_doors INTEGER DEFAULT 0,
  original_windows INTEGER DEFAULT 0,
  rendered_doors INTEGER,
  rendered_windows INTEGER,
  preservation_validated BOOLEAN DEFAULT false,
  validation_score INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.architectural_preservation ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view preservation data for their rooms" ON public.architectural_preservation
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM rooms r
      JOIN projects p ON r.project_id = p.id
      WHERE r.id = architectural_preservation.room_id
      AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
    )
  );

CREATE POLICY "Users can insert preservation data for their rooms" ON public.architectural_preservation
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM rooms r
      JOIN projects p ON r.project_id = p.id
      WHERE r.id = architectural_preservation.room_id
      AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
    )
  );

CREATE POLICY "Users can update preservation data for their rooms" ON public.architectural_preservation
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM rooms r
      JOIN projects p ON r.project_id = p.id
      WHERE r.id = architectural_preservation.room_id
      AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
    )
  );

CREATE POLICY "Admins can manage all preservation data" ON public.architectural_preservation
  FOR ALL USING (get_user_role(auth.uid()) = 'admin'::user_role);

-- Create index for faster lookups
CREATE INDEX idx_architectural_preservation_room_id ON public.architectural_preservation(room_id);