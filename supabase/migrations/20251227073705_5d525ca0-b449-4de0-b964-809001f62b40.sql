-- Create enum for bulk operation types
CREATE TYPE public.bulk_operation_type AS ENUM (
  'approve_all_analysis',
  'apply_style_to_all',
  'approve_all_budget_items',
  'auto_assign_best_vendors'
);

-- Create enum for bulk operation status
CREATE TYPE public.bulk_operation_status AS ENUM (
  'pending',
  'processing',
  'completed',
  'failed'
);

-- Create bulk_operations table
CREATE TABLE public.bulk_operations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  operation_type bulk_operation_type NOT NULL,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  affected_rooms UUID[] DEFAULT '{}',
  total_count INTEGER NOT NULL DEFAULT 0,
  success_count INTEGER NOT NULL DEFAULT 0,
  failed_count INTEGER NOT NULL DEFAULT 0,
  status bulk_operation_status NOT NULL DEFAULT 'pending',
  error_message TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.bulk_operations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view bulk operations for their projects"
ON public.bulk_operations
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = bulk_operations.project_id
    AND (projects.created_by = auth.uid() OR projects.assigned_to = auth.uid())
  )
);

CREATE POLICY "Users can create bulk operations for their projects"
ON public.bulk_operations
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = bulk_operations.project_id
    AND (projects.created_by = auth.uid() OR projects.assigned_to = auth.uid())
  )
);

CREATE POLICY "Admins can manage all bulk operations"
ON public.bulk_operations
FOR ALL
USING (get_user_role(auth.uid()) = 'admin');

-- Function: approve_all_analysis
CREATE OR REPLACE FUNCTION public.approve_all_analysis(p_project_id UUID, p_user_id UUID)
RETURNS TABLE(success_count INTEGER, total_count INTEGER, operation_id UUID)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_total INTEGER;
  v_success INTEGER := 0;
  v_operation_id UUID;
  v_room_ids UUID[];
BEGIN
  -- Get all room IDs for the project
  SELECT ARRAY_AGG(r.id), COUNT(*)::INTEGER
  INTO v_room_ids, v_total
  FROM rooms r
  WHERE r.project_id = p_project_id;

  -- Update room_analysis
  UPDATE room_analysis ra
  SET is_verified = true,
      verified_at = now(),
      verified_by = p_user_id,
      updated_at = now()
  WHERE ra.room_id IN (SELECT id FROM rooms WHERE project_id = p_project_id);
  
  GET DIAGNOSTICS v_success = ROW_COUNT;

  -- Update rooms phase_2_completed
  UPDATE rooms
  SET phase_2_completed = true,
      updated_at = now()
  WHERE project_id = p_project_id;

  -- Insert bulk_operations record
  INSERT INTO bulk_operations (
    operation_type, project_id, affected_rooms, 
    total_count, success_count, failed_count, 
    status, created_by, completed_at
  )
  VALUES (
    'approve_all_analysis', p_project_id, v_room_ids,
    v_total, v_success, v_total - v_success,
    'completed', p_user_id, now()
  )
  RETURNING id INTO v_operation_id;

  RETURN QUERY SELECT v_success, v_total, v_operation_id;
END;
$$;

-- Function: apply_style_to_all_rooms
CREATE OR REPLACE FUNCTION public.apply_style_to_all_rooms(p_project_id UUID, p_design_style TEXT, p_user_id UUID)
RETURNS TABLE(success_count INTEGER, total_count INTEGER, operation_id UUID)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_total INTEGER;
  v_success INTEGER := 0;
  v_operation_id UUID;
  v_room_ids UUID[];
  v_smart_default_id UUID;
BEGIN
  -- Try to find matching smart_default
  SELECT id INTO v_smart_default_id
  FROM smart_defaults
  WHERE default_style = p_design_style
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
$$;

-- Function: approve_all_budget_items
CREATE OR REPLACE FUNCTION public.approve_all_budget_items(p_project_id UUID, p_user_id UUID, p_category TEXT DEFAULT NULL)
RETURNS TABLE(success_count INTEGER, total_count INTEGER, operation_id UUID)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_total INTEGER;
  v_success INTEGER := 0;
  v_operation_id UUID;
BEGIN
  -- Count total items
  SELECT COUNT(*)::INTEGER INTO v_total
  FROM budget_items
  WHERE project_id = p_project_id
  AND (p_category IS NULL OR category = p_category);

  -- Update budget_items status to approved
  UPDATE budget_items
  SET status = 'approved',
      updated_at = now()
  WHERE project_id = p_project_id
  AND (p_category IS NULL OR category = p_category);
  
  GET DIAGNOSTICS v_success = ROW_COUNT;

  -- Insert bulk_operations record
  INSERT INTO bulk_operations (
    operation_type, project_id,
    total_count, success_count, failed_count,
    status, created_by, completed_at
  )
  VALUES (
    'approve_all_budget_items', p_project_id,
    v_total, v_success, v_total - v_success,
    'completed', p_user_id, now()
  )
  RETURNING id INTO v_operation_id;

  RETURN QUERY SELECT v_success, v_total, v_operation_id;
END;
$$;

-- Function: auto_assign_best_vendors
CREATE OR REPLACE FUNCTION public.auto_assign_best_vendors(p_project_id UUID, p_user_id UUID)
RETURNS TABLE(success_count INTEGER, failed_count INTEGER, total_count INTEGER, operation_id UUID)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_total INTEGER := 0;
  v_success INTEGER := 0;
  v_failed INTEGER := 0;
  v_operation_id UUID;
  v_budget_item RECORD;
  v_best_vendor_id UUID;
BEGIN
  -- Loop through unassigned budget items
  FOR v_budget_item IN 
    SELECT id FROM budget_items 
    WHERE project_id = p_project_id 
    AND assigned_vendor_id IS NULL
  LOOP
    v_total := v_total + 1;
    
    -- Find best vendor match (highest score)
    SELECT vm.vendor_id INTO v_best_vendor_id
    FROM vendor_matches vm
    WHERE vm.budget_item_id = v_budget_item.id
    ORDER BY vm.match_score DESC
    LIMIT 1;
    
    IF v_best_vendor_id IS NOT NULL THEN
      -- Update budget_item with vendor
      UPDATE budget_items
      SET assigned_vendor_id = v_best_vendor_id,
          updated_at = now()
      WHERE id = v_budget_item.id;
      
      -- Update vendor_match status
      UPDATE vendor_matches
      SET status = 'selected',
          updated_at = now()
      WHERE budget_item_id = v_budget_item.id
      AND vendor_id = v_best_vendor_id;
      
      v_success := v_success + 1;
    ELSE
      v_failed := v_failed + 1;
    END IF;
  END LOOP;

  -- Insert bulk_operations record
  INSERT INTO bulk_operations (
    operation_type, project_id,
    total_count, success_count, failed_count,
    status, created_by, completed_at
  )
  VALUES (
    'auto_assign_best_vendors', p_project_id,
    v_total, v_success, v_failed,
    'completed', p_user_id, now()
  )
  RETURNING id INTO v_operation_id;

  RETURN QUERY SELECT v_success, v_failed, v_total, v_operation_id;
END;
$$;