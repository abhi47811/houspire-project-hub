-- Create notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info',
  link TEXT,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own notifications"
ON public.notifications
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
ON public.notifications
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications"
ON public.notifications
FOR INSERT
WITH CHECK (true);

-- Function: copy_room_settings
CREATE OR REPLACE FUNCTION public.copy_room_settings(
  p_source_room_id UUID,
  p_target_room_ids UUID[],
  p_copy_style BOOLEAN DEFAULT true,
  p_copy_requirements BOOLEAN DEFAULT false,
  p_copy_vastu BOOLEAN DEFAULT false,
  p_user_id UUID DEFAULT NULL
)
RETURNS TABLE(success_count INTEGER, total_count INTEGER)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_total INTEGER;
  v_success INTEGER := 0;
  v_source_room RECORD;
  v_source_analysis RECORD;
  v_target_id UUID;
BEGIN
  v_total := array_length(p_target_room_ids, 1);
  
  IF v_total IS NULL OR v_total = 0 THEN
    RETURN QUERY SELECT 0, 0;
    RETURN;
  END IF;

  -- Get source room data
  SELECT * INTO v_source_room FROM rooms WHERE id = p_source_room_id;
  SELECT * INTO v_source_analysis FROM room_analysis WHERE room_id = p_source_room_id;

  -- Update each target room
  FOREACH v_target_id IN ARRAY p_target_room_ids
  LOOP
    -- Update room settings
    IF p_copy_style AND v_source_room.selected_style IS NOT NULL THEN
      UPDATE rooms
      SET selected_style = v_source_room.selected_style,
          smart_default_id = v_source_room.smart_default_id,
          updated_at = now()
      WHERE id = v_target_id;
    END IF;

    -- Update room_analysis if exists
    IF v_source_analysis IS NOT NULL THEN
      UPDATE room_analysis
      SET selected_style = CASE WHEN p_copy_style THEN v_source_analysis.selected_style ELSE selected_style END,
          other_features = CASE WHEN p_copy_requirements THEN v_source_analysis.other_features ELSE other_features END,
          updated_at = now()
      WHERE room_id = v_target_id;
    END IF;

    v_success := v_success + 1;
  END LOOP;

  RETURN QUERY SELECT v_success, v_total;
END;
$$;

-- Function: mark_notifications_read
CREATE OR REPLACE FUNCTION public.mark_notifications_read(p_notification_ids UUID[])
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count INTEGER;
BEGIN
  UPDATE notifications
  SET is_read = true
  WHERE id = ANY(p_notification_ids)
  AND user_id = auth.uid();
  
  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$$;