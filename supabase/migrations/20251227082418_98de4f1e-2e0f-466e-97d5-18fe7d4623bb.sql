-- Create test data for comprehensive testing
-- Note: Passwords for test users must be set manually in Supabase Auth

-- Insert sample vendors first (no user dependency)
INSERT INTO public.vendors (id, business_name, contact_name, email, phone, city, categories, is_curated, is_verified, rating, total_reviews, projects_completed, on_time_percentage, lead_time_days, min_order_amount, discount_percentage)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Mumbai Marble Works', 'Raj Sharma', 'raj@mumbaimarble.com', '+91 9876543210', 'Mumbai', ARRAY['Flooring', 'Tiles'], true, true, 4.8, 156, 89, 95, 7, 25000, 10),
  ('22222222-2222-2222-2222-222222222222', 'Delhi Decor Hub', 'Priya Verma', 'priya@delhidecor.in', '+91 9876543211', 'Delhi', ARRAY['Furniture', 'Decor'], true, true, 4.6, 98, 45, 88, 14, 15000, 8),
  ('33333333-3333-3333-3333-333333333333', 'Bangalore Paint Masters', 'Vikram Reddy', 'vikram@bpaint.com', '+91 9876543212', 'Bangalore', ARRAY['Paint', 'Wallpaper'], true, true, 4.9, 234, 156, 97, 3, 5000, 15),
  ('44444444-4444-4444-4444-444444444444', 'Chennai Electrical Co', 'Karthik Iyer', 'karthik@chennaielectric.in', '+91 9876543213', 'Chennai', ARRAY['Electrical', 'Lighting'], true, true, 4.5, 67, 34, 90, 5, 10000, 5),
  ('55555555-5555-5555-5555-555555555555', 'Hyderabad Woodworks', 'Ahmed Khan', 'ahmed@hydwood.com', '+91 9876543214', 'Hyderabad', ARRAY['Carpentry', 'Furniture'], true, true, 4.7, 189, 112, 92, 10, 30000, 12),
  ('66666666-6666-6666-6666-666666666666', 'Pune Plumbing Pro', 'Sanjay Patil', 'sanjay@puneplumb.com', '+91 9876543215', 'Pune', ARRAY['Plumbing', 'Sanitary'], false, true, 4.3, 45, 23, 85, 2, 8000, 0),
  ('77777777-7777-7777-7777-777777777777', 'Jaipur HVAC Solutions', 'Deepak Meena', 'deepak@jaipurhvac.in', '+91 9876543216', 'Jaipur', ARRAY['HVAC', 'AC'], false, false, 4.0, 28, 12, 80, 7, 50000, 5);

-- Insert pricing reference data
INSERT INTO public.pricing_reference (category, item_name, unit, base_rate, specification)
VALUES 
  ('Flooring', 'Italian Marble', 'sqft', 450, '16mm thickness, polished finish'),
  ('Flooring', 'Vitrified Tiles', 'sqft', 85, '600x600mm, double charge'),
  ('Flooring', 'Wooden Laminate', 'sqft', 120, '8mm AC4 grade'),
  ('Paint', 'Interior Emulsion', 'sqft', 25, 'Asian Royale or equivalent'),
  ('Paint', 'Texture Paint', 'sqft', 65, 'Designer finish'),
  ('Electrical', 'Wiring Complete', 'point', 850, 'Finolex/Havells wires'),
  ('Electrical', 'LED Panel Light', 'nos', 1200, '18W recessed'),
  ('Furniture', 'Modular Wardrobe', 'sqft', 1800, 'PLPB with laminate'),
  ('Furniture', 'TV Unit', 'rft', 2200, 'Wall mounted with storage'),
  ('Carpentry', 'False Ceiling', 'sqft', 110, 'Gypsum with cove'),
  ('Plumbing', 'CP Fittings', 'set', 15000, 'Jaquar or equivalent'),
  ('HVAC', 'Split AC 1.5T', 'nos', 45000, '5-star inverter'),
  ('Decor', 'Curtains', 'sqft', 180, 'Blackout fabric with sheer'),
  ('Decor', 'Wallpaper', 'sqft', 95, 'PVC embossed');

-- Insert smart defaults for room types
INSERT INTO public.smart_defaults (id, name, room_type, default_style, default_settings)
VALUES 
  ('aaaa1111-1111-1111-1111-111111111111', 'Modern Living Room', 'living_room', 'Modern Minimalist', '{"color_scheme": "neutral", "lighting": "ambient", "flooring": "vitrified"}'),
  ('aaaa2222-2222-2222-2222-222222222222', 'Cozy Master Bedroom', 'master_bedroom', 'Contemporary Luxury', '{"color_scheme": "warm", "lighting": "warm_white", "flooring": "wooden"}'),
  ('aaaa3333-3333-3333-3333-333333333333', 'Efficient Kitchen', 'kitchen', 'Modern Industrial', '{"color_scheme": "neutral", "lighting": "task", "flooring": "anti_skid_tiles"}'),
  ('aaaa4444-4444-4444-4444-444444444444', 'Kids Paradise', 'kids_room', 'Playful Modern', '{"color_scheme": "bright", "lighting": "daylight", "flooring": "carpet"}'),
  ('aaaa5555-5555-5555-5555-555555555555', 'Serene Pooja Room', 'pooja_room', 'Traditional Indian', '{"color_scheme": "warm_gold", "lighting": "warm", "flooring": "marble"}');

-- Note: Test users must be created through Supabase Auth dashboard or signup flow
-- After creating users, their profiles will be auto-created via trigger
-- You can then update their roles using:
-- UPDATE public.profiles SET role = 'admin' WHERE id = '<user_id>';
-- UPDATE public.profiles SET role = 'renderer' WHERE id = '<user_id>';
-- UPDATE public.profiles SET role = 'budgeter' WHERE id = '<user_id>';