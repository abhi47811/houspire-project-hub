-- Migration: Bulk Operations System
-- Creates tables for batch processing multiple rooms

-- ============================================================================
-- BULK OPERATIONS TABLE
-- ============================================================================
CREATE TABLE public.bulk_operations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  operation_type TEXT NOT NULL CHECK (operation_type IN ('generate', 'clean', 'approve', 'export')),
  room_ids UUID[] NOT NULL,
  options JSONB DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
  total_rooms INTEGER NOT NULL DEFAULT 0,
  completed_rooms INTEGER NOT NULL DEFAULT 0,
  failed_rooms INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL
);

COMMENT ON TABLE public.bulk_operations IS 'Tracks batch operations on multiple rooms';

-- ============================================================================
-- BULK OPERATION ITEMS TABLE
-- ============================================================================
CREATE TABLE public.bulk_operation_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bulk_operation_id UUID NOT NULL REFERENCES public.bulk_operations(id) ON DELETE CASCADE,
  room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  result JSONB,
  error TEXT,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.bulk_operation_items IS 'Individual room items in a bulk operation';

-- ============================================================================
-- INDEXES
-- ============================================================================
CREATE INDEX idx_bulk_operations_project ON public.bulk_operations(project_id);
CREATE INDEX idx_bulk_operations_status ON public.bulk_operations(status);
CREATE INDEX idx_bulk_operations_created ON public.bulk_operations(created_at DESC);
CREATE INDEX idx_bulk_operation_items_bulk_op ON public.bulk_operation_items(bulk_operation_id);
CREATE INDEX idx_bulk_operation_items_room ON public.bulk_operation_items(room_id);
CREATE INDEX idx_bulk_operation_items_status ON public.bulk_operation_items(status);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================
ALTER TABLE public.bulk_operations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bulk_operation_items ENABLE ROW LEVEL SECURITY;

-- Users can view bulk operations for their projects
CREATE POLICY "Users can view their project bulk operations"
  ON public.bulk_operations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = bulk_operations.project_id
      AND (projects.created_by = auth.uid() OR projects.assigned_to = auth.uid())
    )
  );

-- Users can create bulk operations for their projects
CREATE POLICY "Users can create bulk operations for their projects"
  ON public.bulk_operations FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = bulk_operations.project_id
      AND (projects.created_by = auth.uid() OR projects.assigned_to = auth.uid())
    )
  );

-- Users can update their bulk operations
CREATE POLICY "Users can update their bulk operations"
  ON public.bulk_operations FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = bulk_operations.project_id
      AND (projects.created_by = auth.uid() OR projects.assigned_to = auth.uid())
    )
  );

-- Admins can view all bulk operations
CREATE POLICY "Admins can view all bulk operations"
  ON public.bulk_operations FOR SELECT
  USING (public.get_user_role(auth.uid()) = 'admin');

-- Bulk operation items policies
CREATE POLICY "Users can view bulk operation items"
  ON public.bulk_operation_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.bulk_operations
      JOIN public.projects ON projects.id = bulk_operations.project_id
      WHERE bulk_operations.id = bulk_operation_items.bulk_operation_id
      AND (projects.created_by = auth.uid() OR projects.assigned_to = auth.uid())
    )
  );

CREATE POLICY "System can manage bulk operation items"
  ON public.bulk_operation_items FOR ALL
  USING (true);

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to automatically update bulk operation progress
CREATE OR REPLACE FUNCTION update_bulk_operation_progress()
RETURNS TRIGGER AS $$
BEGIN
  -- Update completed and failed counts
  UPDATE public.bulk_operations
  SET
    completed_rooms = (
      SELECT COUNT(*) FROM public.bulk_operation_items
      WHERE bulk_operation_id = NEW.bulk_operation_id
      AND status = 'completed'
    ),
    failed_rooms = (
      SELECT COUNT(*) FROM public.bulk_operation_items
      WHERE bulk_operation_id = NEW.bulk_operation_id
      AND status = 'failed'
    )
  WHERE id = NEW.bulk_operation_id;

  -- Check if all rooms are processed
  DECLARE
    v_total_rooms INTEGER;
    v_processed_rooms INTEGER;
  BEGIN
    SELECT total_rooms INTO v_total_rooms
    FROM public.bulk_operations
    WHERE id = NEW.bulk_operation_id;

    SELECT COUNT(*) INTO v_processed_rooms
    FROM public.bulk_operation_items
    WHERE bulk_operation_id = NEW.bulk_operation_id
    AND status IN ('completed', 'failed');

    -- If all rooms processed, mark bulk operation as completed
    IF v_processed_rooms >= v_total_rooms THEN
      UPDATE public.bulk_operations
      SET
        status = 'completed',
        completed_at = NOW()
      WHERE id = NEW.bulk_operation_id;
    END IF;
  END;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update bulk operation progress
CREATE TRIGGER trigger_update_bulk_operation_progress
AFTER INSERT OR UPDATE ON public.bulk_operation_items
FOR EACH ROW
EXECUTE FUNCTION update_bulk_operation_progress();

-- ============================================================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================================================

-- This will be populated as users create bulk operations
