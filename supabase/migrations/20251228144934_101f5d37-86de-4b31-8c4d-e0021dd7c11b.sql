-- Re-add the foreign key constraint between rooms and smart_defaults
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'rooms_smart_default_id_fkey'
  ) THEN
    ALTER TABLE public.rooms 
      ADD CONSTRAINT rooms_smart_default_id_fkey
      FOREIGN KEY (smart_default_id) 
      REFERENCES public.smart_defaults(id) 
      ON DELETE SET NULL;
  END IF;
END $$;