-- Create render_versions table for comprehensive version control
CREATE TABLE public.render_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  version_number integer NOT NULL DEFAULT 1,
  parent_version_id uuid REFERENCES public.render_versions(id) ON DELETE SET NULL,
  render_url text NOT NULL,
  thumbnail_url text,
  storage_path text NOT NULL,
  style_config jsonb DEFAULT '{}',
  generation_params jsonb DEFAULT '{}',
  prompt_used text,
  quality_score numeric(5,2),
  ai_validation_score numeric(5,2),
  user_rating integer CHECK (user_rating BETWEEN 1 AND 5),
  changes_from_parent jsonb DEFAULT '[]',
  change_summary text,
  is_approved boolean DEFAULT false,
  is_final boolean DEFAULT false,
  approved_by uuid REFERENCES public.profiles(id),
  approved_at timestamptz,
  notes text,
  tags text[] DEFAULT '{}',
  created_by uuid REFERENCES public.profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create unique constraint for version_number per room
CREATE UNIQUE INDEX idx_render_versions_room_version ON public.render_versions(room_id, version_number);

-- Create indexes for common queries
CREATE INDEX idx_render_versions_room_id ON public.render_versions(room_id);
CREATE INDEX idx_render_versions_parent ON public.render_versions(parent_version_id);
CREATE INDEX idx_render_versions_is_final ON public.render_versions(room_id, is_final) WHERE is_final = true;
CREATE INDEX idx_render_versions_created_at ON public.render_versions(room_id, created_at DESC);

-- Enable RLS
ALTER TABLE public.render_versions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view versions for their project rooms"
ON public.render_versions FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM rooms r
    JOIN projects p ON p.id = r.project_id
    WHERE r.id = render_versions.room_id
    AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
  )
);

CREATE POLICY "Users can create versions for their project rooms"
ON public.render_versions FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM rooms r
    JOIN projects p ON p.id = r.project_id
    WHERE r.id = render_versions.room_id
    AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
  )
);

CREATE POLICY "Users can update versions for their project rooms"
ON public.render_versions FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM rooms r
    JOIN projects p ON p.id = r.project_id
    WHERE r.id = render_versions.room_id
    AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
  )
);

CREATE POLICY "Users can delete versions for their project rooms"
ON public.render_versions FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM rooms r
    JOIN projects p ON p.id = r.project_id
    WHERE r.id = render_versions.room_id
    AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
  )
  AND is_final = false
);

CREATE POLICY "Admins can manage all versions"
ON public.render_versions FOR ALL
USING (get_user_role(auth.uid()) = 'admin');

-- Helper function to get next version number
CREATE OR REPLACE FUNCTION public.get_next_version_number(p_room_id uuid)
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT COALESCE(MAX(version_number), 0) + 1
  FROM render_versions
  WHERE room_id = p_room_id;
$$;

-- Trigger to auto-set version_number on insert
CREATE OR REPLACE FUNCTION public.set_version_number()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.version_number IS NULL OR NEW.version_number = 1 THEN
    NEW.version_number := get_next_version_number(NEW.room_id);
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER tr_set_version_number
BEFORE INSERT ON public.render_versions
FOR EACH ROW
EXECUTE FUNCTION public.set_version_number();

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION public.update_render_versions_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER tr_render_versions_updated_at
BEFORE UPDATE ON public.render_versions
FOR EACH ROW
EXECUTE FUNCTION public.update_render_versions_updated_at();

-- Function to ensure only one final version per room
CREATE OR REPLACE FUNCTION public.ensure_single_final_version()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.is_final = true AND OLD.is_final = false THEN
    UPDATE render_versions
    SET is_final = false, updated_at = now()
    WHERE room_id = NEW.room_id AND id != NEW.id AND is_final = true;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER tr_ensure_single_final
BEFORE UPDATE ON public.render_versions
FOR EACH ROW
WHEN (NEW.is_final = true)
EXECUTE FUNCTION public.ensure_single_final_version();

-- Enable realtime for render_versions
ALTER TABLE public.render_versions REPLICA IDENTITY FULL;

-- Add to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.render_versions;