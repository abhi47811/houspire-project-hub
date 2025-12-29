-- Create design_templates table for saving reusable design templates
CREATE TABLE public.design_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  room_type TEXT,
  settings JSONB NOT NULL DEFAULT '{}',
  is_public BOOLEAN DEFAULT false,
  times_used INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.design_templates ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own templates" 
ON public.design_templates 
FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "Users can view public templates" 
ON public.design_templates 
FOR SELECT 
USING (is_public = true);

CREATE POLICY "Users can create own templates" 
ON public.design_templates 
FOR INSERT 
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own templates" 
ON public.design_templates 
FOR UPDATE 
USING (user_id = auth.uid());

CREATE POLICY "Users can delete own templates" 
ON public.design_templates 
FOR DELETE 
USING (user_id = auth.uid());

-- Create index for faster lookups
CREATE INDEX idx_design_templates_user_id ON public.design_templates(user_id);
CREATE INDEX idx_design_templates_room_type ON public.design_templates(room_type);
CREATE INDEX idx_design_templates_public ON public.design_templates(is_public) WHERE is_public = true;