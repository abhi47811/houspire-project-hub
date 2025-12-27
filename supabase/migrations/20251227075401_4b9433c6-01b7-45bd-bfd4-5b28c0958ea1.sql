-- User Sessions: Track active users and their current view
CREATE TABLE public.user_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  current_project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  current_room_id UUID REFERENCES public.rooms(id) ON DELETE SET NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_active_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  session_started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  client_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, client_id)
);

-- Enable RLS
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- RLS policies for user_sessions
CREATE POLICY "Users can view their own sessions"
ON public.user_sessions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own sessions"
ON public.user_sessions FOR ALL
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all sessions"
ON public.user_sessions FOR SELECT
USING (get_user_role(auth.uid()) = 'admin');

-- Create index for active sessions
CREATE INDEX idx_user_sessions_active ON public.user_sessions(current_project_id, is_active) WHERE is_active = true;
CREATE INDEX idx_user_sessions_user ON public.user_sessions(user_id);

-- Trigger for updated_at
CREATE TRIGGER update_user_sessions_updated_at
BEFORE UPDATE ON public.user_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Change Events: Track entity changes for smart UI updates
CREATE TABLE public.change_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('project', 'room', 'room_analysis', 'budget_item', 'job')),
  entity_id UUID NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  room_id UUID REFERENCES public.rooms(id) ON DELETE SET NULL,
  change_type TEXT NOT NULL CHECK (change_type IN ('created', 'updated', 'deleted', 'status_changed', 'phase_completed')),
  changed_fields JSONB DEFAULT '[]'::jsonb,
  old_values JSONB DEFAULT NULL,
  new_values JSONB DEFAULT NULL,
  changed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.change_events ENABLE ROW LEVEL SECURITY;

-- RLS policies for change_events
CREATE POLICY "Users can view changes for their projects"
ON public.change_events FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM projects p
    WHERE p.id = change_events.project_id
    AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
  )
);

CREATE POLICY "System can create change events"
ON public.change_events FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can manage all change events"
ON public.change_events FOR ALL
USING (get_user_role(auth.uid()) = 'admin');

-- Create indexes for change_events
CREATE INDEX idx_change_events_project ON public.change_events(project_id, created_at DESC);
CREATE INDEX idx_change_events_entity ON public.change_events(entity_type, entity_id);

-- Enable realtime for change_events
ALTER PUBLICATION supabase_realtime ADD TABLE public.change_events;

-- Optimistic Updates: Track pending client-side updates
CREATE TABLE public.optimistic_updates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  client_id TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  operation TEXT NOT NULL CHECK (operation IN ('create', 'update', 'delete')),
  optimistic_data JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'rolled_back', 'failed')),
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '5 minutes')
);

-- Enable RLS
ALTER TABLE public.optimistic_updates ENABLE ROW LEVEL SECURITY;

-- RLS policies for optimistic_updates
CREATE POLICY "Users can manage their own optimistic updates"
ON public.optimistic_updates FOR ALL
USING (auth.uid() = user_id);

-- Create index
CREATE INDEX idx_optimistic_updates_pending ON public.optimistic_updates(user_id, client_id, status) WHERE status = 'pending';

-- Function to upsert user session
CREATE OR REPLACE FUNCTION public.upsert_user_session(
  p_project_id UUID DEFAULT NULL,
  p_room_id UUID DEFAULT NULL,
  p_client_id TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_session_id UUID;
BEGIN
  INSERT INTO user_sessions (user_id, current_project_id, current_room_id, client_id, last_active_at, is_active)
  VALUES (auth.uid(), p_project_id, p_room_id, p_client_id, now(), true)
  ON CONFLICT (user_id, client_id)
  DO UPDATE SET
    current_project_id = p_project_id,
    current_room_id = p_room_id,
    last_active_at = now(),
    is_active = true,
    updated_at = now()
  RETURNING id INTO v_session_id;
  
  RETURN v_session_id;
END;
$$;

-- Function to update session heartbeat
CREATE OR REPLACE FUNCTION public.heartbeat_session(p_client_id TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  UPDATE user_sessions
  SET last_active_at = now(), is_active = true, updated_at = now()
  WHERE user_id = auth.uid() AND client_id = p_client_id;
  
  RETURN FOUND;
END;
$$;

-- Function to end session
CREATE OR REPLACE FUNCTION public.end_user_session(p_client_id TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  UPDATE user_sessions
  SET is_active = false, updated_at = now()
  WHERE user_id = auth.uid() AND client_id = p_client_id;
  
  RETURN FOUND;
END;
$$;

-- Function to create targeted notification
CREATE OR REPLACE FUNCTION public.create_targeted_notification(
  p_target_user_id UUID,
  p_title TEXT,
  p_message TEXT,
  p_type TEXT DEFAULT 'info',
  p_link TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_notification_id UUID;
BEGIN
  INSERT INTO notifications (user_id, title, message, type, link)
  VALUES (p_target_user_id, p_title, p_message, p_type, p_link)
  RETURNING id INTO v_notification_id;
  
  RETURN v_notification_id;
END;
$$;

-- Function to notify project stakeholders
CREATE OR REPLACE FUNCTION public.notify_project_stakeholders(
  p_project_id UUID,
  p_title TEXT,
  p_message TEXT,
  p_type TEXT DEFAULT 'info',
  p_link TEXT DEFAULT NULL,
  p_exclude_user_id UUID DEFAULT NULL
)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_count INTEGER := 0;
  v_project RECORD;
BEGIN
  SELECT created_by, assigned_to INTO v_project
  FROM projects WHERE id = p_project_id;
  
  IF v_project.created_by IS NOT NULL AND v_project.created_by != COALESCE(p_exclude_user_id, '00000000-0000-0000-0000-000000000000'::uuid) THEN
    PERFORM create_targeted_notification(v_project.created_by, p_title, p_message, p_type, p_link);
    v_count := v_count + 1;
  END IF;
  
  IF v_project.assigned_to IS NOT NULL 
     AND v_project.assigned_to != COALESCE(v_project.created_by, '00000000-0000-0000-0000-000000000000'::uuid)
     AND v_project.assigned_to != COALESCE(p_exclude_user_id, '00000000-0000-0000-0000-000000000000'::uuid) THEN
    PERFORM create_targeted_notification(v_project.assigned_to, p_title, p_message, p_type, p_link);
    v_count := v_count + 1;
  END IF;
  
  RETURN v_count;
END;
$$;

-- Function to record change event
CREATE OR REPLACE FUNCTION public.record_change_event(
  p_entity_type TEXT,
  p_entity_id UUID,
  p_project_id UUID,
  p_room_id UUID DEFAULT NULL,
  p_change_type TEXT DEFAULT 'updated',
  p_changed_fields JSONB DEFAULT '[]'::jsonb,
  p_old_values JSONB DEFAULT NULL,
  p_new_values JSONB DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_event_id UUID;
BEGIN
  INSERT INTO change_events (
    entity_type, entity_id, project_id, room_id,
    change_type, changed_fields, old_values, new_values, changed_by
  )
  VALUES (
    p_entity_type, p_entity_id, p_project_id, p_room_id,
    p_change_type, p_changed_fields, p_old_values, p_new_values, auth.uid()
  )
  RETURNING id INTO v_event_id;
  
  RETURN v_event_id;
END;
$$;

-- Cleanup old change events (run via cron)
CREATE OR REPLACE FUNCTION public.cleanup_old_events()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_deleted INTEGER;
BEGIN
  -- Delete change events older than 7 days
  DELETE FROM change_events WHERE created_at < now() - interval '7 days';
  GET DIAGNOSTICS v_deleted = ROW_COUNT;
  
  -- Delete expired optimistic updates
  DELETE FROM optimistic_updates WHERE expires_at < now();
  
  -- Mark stale sessions as inactive
  UPDATE user_sessions SET is_active = false
  WHERE is_active = true AND last_active_at < now() - interval '2 minutes';
  
  RETURN v_deleted;
END;
$$;