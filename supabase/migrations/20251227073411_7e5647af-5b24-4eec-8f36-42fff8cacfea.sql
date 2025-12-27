-- Create vendors table
CREATE TABLE public.vendors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name TEXT NOT NULL,
  contact_name TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  categories TEXT[] NOT NULL DEFAULT '{}',
  is_verified BOOLEAN NOT NULL DEFAULT false,
  is_curated BOOLEAN NOT NULL DEFAULT false,
  rating NUMERIC DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  total_reviews INTEGER DEFAULT 0,
  projects_completed INTEGER DEFAULT 0,
  on_time_percentage NUMERIC DEFAULT 0 CHECK (on_time_percentage >= 0 AND on_time_percentage <= 100),
  discount_percentage NUMERIC DEFAULT 0,
  min_order_amount NUMERIC DEFAULT 0,
  lead_time_days INTEGER DEFAULT 7,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for vendors
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;

-- Vendors are readable by all authenticated users
CREATE POLICY "Authenticated users can view vendors"
ON public.vendors FOR SELECT
USING (true);

-- Only admins can manage vendors
CREATE POLICY "Admins can manage vendors"
ON public.vendors FOR ALL
USING (get_user_role(auth.uid()) = 'admin'::user_role);

-- Create trigger for updated_at
CREATE TRIGGER update_vendors_updated_at
BEFORE UPDATE ON public.vendors
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create vendor_matches table
CREATE TABLE public.vendor_matches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  budget_item_id UUID NOT NULL REFERENCES public.budget_items(id) ON DELETE CASCADE,
  vendor_id UUID NOT NULL REFERENCES public.vendors(id) ON DELETE CASCADE,
  match_score INTEGER NOT NULL DEFAULT 0 CHECK (match_score >= 0 AND match_score <= 100),
  price_quote NUMERIC,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'selected', 'rejected')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(budget_item_id, vendor_id)
);

-- Enable RLS for vendor_matches
ALTER TABLE public.vendor_matches ENABLE ROW LEVEL SECURITY;

-- Users can view matches for their project's budget items
CREATE POLICY "Users can view vendor matches for their projects"
ON public.vendor_matches FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM budget_items bi
    JOIN projects p ON p.id = bi.project_id
    WHERE bi.id = vendor_matches.budget_item_id
    AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
  )
);

-- Users can create matches for their project's budget items
CREATE POLICY "Users can create vendor matches for their projects"
ON public.vendor_matches FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM budget_items bi
    JOIN projects p ON p.id = bi.project_id
    WHERE bi.id = vendor_matches.budget_item_id
    AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
  )
);

-- Users can update matches for their project's budget items
CREATE POLICY "Users can update vendor matches for their projects"
ON public.vendor_matches FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM budget_items bi
    JOIN projects p ON p.id = bi.project_id
    WHERE bi.id = vendor_matches.budget_item_id
    AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
  )
);

-- Admins can manage all matches
CREATE POLICY "Admins can manage all vendor matches"
ON public.vendor_matches FOR ALL
USING (get_user_role(auth.uid()) = 'admin'::user_role);

-- Create trigger for updated_at
CREATE TRIGGER update_vendor_matches_updated_at
BEFORE UPDATE ON public.vendor_matches
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample vendors for demo
INSERT INTO public.vendors (business_name, contact_name, email, phone, address, city, categories, is_verified, is_curated, rating, total_reviews, projects_completed, on_time_percentage, discount_percentage, min_order_amount) VALUES
('Urban Ladder', 'Rajesh Kumar', 'sales@urbanladder.com', '+91 9876543210', 'HSR Layout', 'Bangalore', ARRAY['furniture', 'lighting'], true, true, 4.5, 234, 89, 92, 10, 25000),
('Pepperfry', 'Anita Sharma', 'vendor@pepperfry.com', '+91 9876543211', 'Andheri East', 'Mumbai', ARRAY['furniture', 'fixtures'], true, true, 4.3, 456, 156, 88, 12, 15000),
('Kajaria Ceramics', 'Vikram Singh', 'b2b@kajaria.com', '+91 9876543212', 'Gurgaon', 'Delhi', ARRAY['flooring', 'wall_treatment'], true, true, 4.7, 312, 203, 95, 8, 50000),
('Havells Lighting', 'Priya Patel', 'projects@havells.com', '+91 9876543213', 'Sector 62', 'Delhi', ARRAY['lighting', 'fixtures'], true, true, 4.6, 567, 312, 94, 5, 10000),
('Asian Paints', 'Amit Verma', 'commercial@asianpaints.com', '+91 9876543214', 'Byculla', 'Mumbai', ARRAY['wall_treatment'], true, true, 4.8, 890, 445, 97, 15, 20000),
('Godrej Interio', 'Sunita Rao', 'sales@godrejinterio.com', '+91 9876543215', 'Vikhroli', 'Mumbai', ARRAY['furniture', 'fixtures'], true, true, 4.4, 234, 178, 90, 10, 30000),
('Saint-Gobain', 'Rahul Mehta', 'projects@saint-gobain.co.in', '+91 9876543216', 'Whitefield', 'Bangalore', ARRAY['ceiling', 'wall_treatment'], true, true, 4.5, 189, 134, 91, 7, 40000),
('Greenply', 'Neha Gupta', 'b2b@greenply.com', '+91 9876543217', 'Noida', 'Delhi', ARRAY['furniture', 'wall_treatment'], true, false, 4.2, 145, 98, 85, 12, 25000),
('Philips Lighting', 'Karan Malhotra', 'professional@philips.com', '+91 9876543218', 'Gurgaon', 'Delhi', ARRAY['lighting'], true, true, 4.7, 678, 289, 96, 6, 15000),
('Somany Tiles', 'Deepak Jain', 'dealers@somany.com', '+91 9876543219', 'Kanjurmarg', 'Mumbai', ARRAY['flooring'], true, false, 4.1, 234, 112, 82, 10, 35000),
('Local Carpenter - Anand', 'Anand Kumar', 'anand.carpenter@gmail.com', '+91 9876543220', 'Koramangala', 'Bangalore', ARRAY['furniture', 'fixtures'], false, false, 4.0, 45, 34, 78, 20, 5000),
('Royal Interiors', 'Mohammed Ali', 'royal.interiors@gmail.com', '+91 9876543221', 'Banjara Hills', 'Hyderabad', ARRAY['furniture', 'ceiling', 'wall_treatment'], true, false, 3.9, 67, 45, 80, 15, 20000);