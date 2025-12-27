-- RPC Functions for library system

-- Function: Increment library views
CREATE OR REPLACE FUNCTION public.increment_library_views(lib_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE style_library
  SET 
    times_viewed = times_viewed + 1,
    last_used_at = now(),
    updated_at = now()
  WHERE id = lib_id;
END;
$$;

-- Function: Track library selection (insert usage record)
CREATE OR REPLACE FUNCTION public.track_library_selection(
  p_library_image_id UUID,
  p_project_id UUID,
  p_room_id UUID,
  p_user_id UUID,
  p_variation_used JSONB DEFAULT NULL,
  p_smart_default_used JSONB DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_usage_id UUID;
BEGIN
  -- Insert usage record
  INSERT INTO library_usage (
    library_image_id,
    project_id,
    room_id,
    user_id,
    variation_used,
    smart_default_used
  ) VALUES (
    p_library_image_id,
    p_project_id,
    p_room_id,
    p_user_id,
    p_variation_used,
    p_smart_default_used
  )
  RETURNING id INTO v_usage_id;
  
  -- Increment times_selected on library image
  UPDATE style_library
  SET 
    times_selected = times_selected + 1,
    last_used_at = now(),
    updated_at = now()
  WHERE id = p_library_image_id;
  
  RETURN v_usage_id;
END;
$$;

-- Function: Find duplicates by URL or similar room/style
CREATE OR REPLACE FUNCTION public.find_library_duplicates(
  p_image_url TEXT,
  p_room_type TEXT,
  p_design_style TEXT,
  p_perceptual_hash TEXT DEFAULT NULL
)
RETURNS TABLE(
  id UUID,
  image_url TEXT,
  perceptual_hash TEXT,
  is_exact_match BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    sl.id,
    sl.image_url,
    sl.perceptual_hash,
    (sl.image_url = p_image_url) as is_exact_match
  FROM style_library sl
  WHERE 
    sl.status = 'active'
    AND sl.room_type = p_room_type
    AND sl.design_style = p_design_style
    AND (
      sl.image_url = p_image_url
      OR (p_perceptual_hash IS NOT NULL AND sl.perceptual_hash = p_perceptual_hash)
    );
END;
$$;