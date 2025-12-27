-- Create budget_items table
CREATE TABLE public.budget_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  room_id UUID REFERENCES public.rooms(id) ON DELETE SET NULL,
  category TEXT NOT NULL,
  item_name TEXT NOT NULL,
  specification TEXT,
  quantity NUMERIC NOT NULL DEFAULT 1,
  unit TEXT NOT NULL DEFAULT 'nos',
  rate NUMERIC NOT NULL DEFAULT 0,
  amount NUMERIC GENERATED ALWAYS AS (quantity * rate) STORED,
  gst_percent NUMERIC NOT NULL DEFAULT 18,
  gst_amount NUMERIC GENERATED ALWAYS AS (quantity * rate * gst_percent / 100) STORED,
  total NUMERIC GENERATED ALWAYS AS (quantity * rate * (1 + gst_percent / 100)) STORED,
  assigned_vendor_id UUID,
  vendor_name TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  sort_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.budget_items ENABLE ROW LEVEL SECURITY;

-- RLS policies for budget_items
CREATE POLICY "Admins can manage all budget items"
ON public.budget_items FOR ALL
USING (get_user_role(auth.uid()) = 'admin'::user_role);

CREATE POLICY "Users can view budget items of their projects"
ON public.budget_items FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = budget_items.project_id
    AND (projects.created_by = auth.uid() OR projects.assigned_to = auth.uid())
  )
);

CREATE POLICY "Users can create budget items for their projects"
ON public.budget_items FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = budget_items.project_id
    AND (projects.created_by = auth.uid() OR projects.assigned_to = auth.uid())
  )
);

CREATE POLICY "Users can update budget items for their projects"
ON public.budget_items FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = budget_items.project_id
    AND (projects.created_by = auth.uid() OR projects.assigned_to = auth.uid())
  )
);

CREATE POLICY "Users can delete budget items for their projects"
ON public.budget_items FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = budget_items.project_id
    AND (projects.created_by = auth.uid() OR projects.assigned_to = auth.uid())
  )
);

-- Create trigger for updated_at
CREATE TRIGGER update_budget_items_updated_at
BEFORE UPDATE ON public.budget_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create pricing_reference table for standard rates
CREATE TABLE public.pricing_reference (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  item_name TEXT NOT NULL,
  specification TEXT,
  unit TEXT NOT NULL DEFAULT 'nos',
  base_rate NUMERIC NOT NULL,
  city_multipliers JSONB DEFAULT '{"Mumbai": 1.2, "Delhi": 1.15, "Bangalore": 1.1, "Chennai": 1.05, "Hyderabad": 1.0, "Pune": 1.05, "Kolkata": 0.95, "Ahmedabad": 0.9, "Jaipur": 0.85, "Surat": 0.85, "Lucknow": 0.8}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for pricing_reference
ALTER TABLE public.pricing_reference ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated can read pricing
CREATE POLICY "Authenticated users can view pricing"
ON public.pricing_reference FOR SELECT
USING (true);

-- Only admins can manage pricing
CREATE POLICY "Admins can manage pricing"
ON public.pricing_reference FOR ALL
USING (get_user_role(auth.uid()) = 'admin'::user_role);