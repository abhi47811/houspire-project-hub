-- Create enums
CREATE TYPE public.user_role AS ENUM ('admin', 'renderer', 'budgeter', 'vendor_finder');
CREATE TYPE public.project_status AS ENUM ('draft', 'in_progress', 'review', 'approved', 'completed', 'cancelled');
CREATE TYPE public.city_enum AS ENUM ('Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow');
CREATE TYPE public.room_type_enum AS ENUM ('living_room', 'master_bedroom', 'bedroom', 'kitchen', 'dining_room', 'balcony', 'study_room', 'kids_room', 'guest_room', 'pooja_room', 'home_office', 'gym', 'entertainment_room', 'utility_room');

-- 1. PROFILES TABLE (extends Supabase Auth)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role public.user_role DEFAULT 'renderer',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles RLS policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Security definer function to check user role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS public.user_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = _user_id
$$;

-- Admin can view all profiles
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.get_user_role(auth.uid()) = 'admin');

-- Trigger for auto-creating profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 2. PROJECTS TABLE
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  client_name TEXT,
  client_email TEXT,
  city public.city_enum,
  max_rooms INTEGER DEFAULT 7,
  total_rooms INTEGER DEFAULT 0,
  status public.project_status DEFAULT 'draft',
  current_phase INTEGER DEFAULT 1 CHECK (current_phase >= 1 AND current_phase <= 5),
  deadline DATE,
  estimated_budget DECIMAL(15, 2),
  actual_cost DECIMAL(15, 2),
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Projects indexes
CREATE INDEX idx_projects_created_by ON public.projects(created_by);
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_projects_city ON public.projects(city);
CREATE INDEX idx_projects_assigned_to ON public.projects(assigned_to);

-- Projects RLS policies
CREATE POLICY "Users can view projects they created"
  ON public.projects FOR SELECT
  USING (auth.uid() = created_by);

CREATE POLICY "Users can view projects assigned to them"
  ON public.projects FOR SELECT
  USING (auth.uid() = assigned_to);

CREATE POLICY "Admins can view all projects"
  ON public.projects FOR SELECT
  USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Authenticated users can create projects"
  ON public.projects FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update projects they created"
  ON public.projects FOR UPDATE
  USING (auth.uid() = created_by);

CREATE POLICY "Users can update projects assigned to them"
  ON public.projects FOR UPDATE
  USING (auth.uid() = assigned_to);

CREATE POLICY "Admins can update all projects"
  ON public.projects FOR UPDATE
  USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Users can delete projects they created"
  ON public.projects FOR DELETE
  USING (auth.uid() = created_by);

CREATE POLICY "Admins can delete all projects"
  ON public.projects FOR DELETE
  USING (public.get_user_role(auth.uid()) = 'admin');

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 3. SMART_DEFAULTS TABLE (referenced by rooms)
CREATE TABLE public.smart_defaults (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  room_type public.room_type_enum,
  default_style TEXT,
  default_settings JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.smart_defaults ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view smart defaults"
  ON public.smart_defaults FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage smart defaults"
  ON public.smart_defaults FOR ALL
  USING (public.get_user_role(auth.uid()) = 'admin');

-- 4. ROOMS TABLE
CREATE TABLE public.rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  room_number INTEGER NOT NULL,
  room_name TEXT,
  room_type public.room_type_enum,
  length_feet DECIMAL(8, 2),
  width_feet DECIMAL(8, 2),
  height_feet DECIMAL(8, 2),
  current_phase INTEGER DEFAULT 1 CHECK (current_phase >= 1 AND current_phase <= 5),
  phase_1_completed BOOLEAN DEFAULT false,
  phase_2_completed BOOLEAN DEFAULT false,
  phase_3_completed BOOLEAN DEFAULT false,
  phase_4_completed BOOLEAN DEFAULT false,
  phase_5_completed BOOLEAN DEFAULT false,
  selected_style TEXT,
  final_quality_score DECIMAL(5, 2),
  retry_count INTEGER DEFAULT 0,
  smart_default_id UUID REFERENCES public.smart_defaults(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(project_id, room_number)
);

ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;

-- Rooms indexes
CREATE INDEX idx_rooms_project_id ON public.rooms(project_id);
CREATE INDEX idx_rooms_room_type ON public.rooms(room_type);

-- Rooms RLS policies (inherit from project access)
CREATE POLICY "Users can view rooms of their projects"
  ON public.rooms FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = rooms.project_id
      AND (projects.created_by = auth.uid() OR projects.assigned_to = auth.uid())
    )
  );

CREATE POLICY "Admins can view all rooms"
  ON public.rooms FOR SELECT
  USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Users can create rooms in their projects"
  ON public.rooms FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_id
      AND (projects.created_by = auth.uid() OR projects.assigned_to = auth.uid())
    )
  );

CREATE POLICY "Users can update rooms in their projects"
  ON public.rooms FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = rooms.project_id
      AND (projects.created_by = auth.uid() OR projects.assigned_to = auth.uid())
    )
  );

CREATE POLICY "Admins can update all rooms"
  ON public.rooms FOR UPDATE
  USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Users can delete rooms in their projects"
  ON public.rooms FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = rooms.project_id
      AND (projects.created_by = auth.uid() OR projects.assigned_to = auth.uid())
    )
  );

CREATE POLICY "Admins can delete all rooms"
  ON public.rooms FOR DELETE
  USING (public.get_user_role(auth.uid()) = 'admin');

CREATE TRIGGER update_rooms_updated_at
  BEFORE UPDATE ON public.rooms
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();