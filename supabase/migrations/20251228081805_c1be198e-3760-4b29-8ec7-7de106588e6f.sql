-- Fix rooms with inconsistent phase states
-- Reset room flags to match current state - phase_5_completed should only be true if render exists
-- Use max phase value of 5 (constraint limit)

UPDATE rooms 
SET 
  phase_4_completed = false,
  phase_5_completed = false,
  current_phase = 4
WHERE 
  id IN (
    SELECT r.id FROM rooms r
    WHERE r.phase_5_completed = true 
    AND NOT EXISTS (
      SELECT 1 FROM room_images ri 
      WHERE ri.room_id = r.id 
      AND ri.image_type = 'render' 
      AND ri.phase = 5
    )
  );