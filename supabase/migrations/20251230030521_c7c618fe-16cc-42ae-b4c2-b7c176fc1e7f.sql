CREATE OR REPLACE FUNCTION public.apply_style_to_all_rooms(
  p_project_id uuid, 
  p_design_style text, 
  p_user_id uuid
)
RETURNS TABLE(success_count integer, total_count integer, operation_id uuid)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_total INTEGER;
  v_success INTEGER := 0;
  v_operation_id UUID;
  v_room_ids UUID[];
  v_smart_default_id UUID;
BEGIN
  -- Try to find matching smart_default (FIXED: use 'style' column instead of 'default_style')
  SELECT id INTO v_smart_default_id
  FROM smart_defaults
  WHERE style = p_design_style
  LIMIT 1;

  -- Get all room IDs for the project
  SELECT ARRAY_AGG(id), COUNT(*)::INTEGER
  INTO v_room_ids, v_total
  FROM rooms
  WHERE project_id = p_project_id;

  -- Update rooms with style
  UPDATE rooms
  SET selected_style = p_design_style,
      smart_default_id = v_smart_default_id,
      updated_at = now()
  WHERE project_id = p_project_id;
  
  GET DIAGNOSTICS v_success = ROW_COUNT;

  -- Also update room_analysis selected_style
  UPDATE room_analysis ra
  SET selected_style = p_design_style,
      updated_at = now()
  WHERE ra.room_id IN (SELECT id FROM rooms WHERE project_id = p_project_id);

  -- Insert bulk_operations record
  INSERT INTO bulk_operations (
    operation_type, project_id, affected_rooms,
    total_count, success_count, failed_count,
    status, created_by, completed_at
  )
  VALUES (
    'apply_style_to_all', p_project_id, v_room_ids,
    v_total, v_success, v_total - v_success,
    'completed', p_user_id, now()
  )
  RETURNING id INTO v_operation_id;

  RETURN QUERY SELECT v_success, v_total, v_operation_id;
END;
$function$;