-- Add get_available_room_types function
CREATE OR REPLACE FUNCTION public.get_available_room_types()
RETURNS TABLE(room_type text, room_type_slug text)
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT DISTINCT sd.room_type, sd.room_type_slug 
  FROM public.smart_defaults sd
  ORDER BY sd.room_type;
$$;