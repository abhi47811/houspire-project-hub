import { useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

// Generate a unique client ID for this browser tab
const generateClientId = () => {
  const stored = sessionStorage.getItem('lovable_client_id');
  if (stored) return stored;
  
  const clientId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  sessionStorage.setItem('lovable_client_id', clientId);
  return clientId;
};

interface UseSessionTrackingOptions {
  projectId?: string;
  roomId?: string;
  heartbeatInterval?: number; // ms
}

export function useSessionTracking(options: UseSessionTrackingOptions = {}) {
  const { projectId, roomId, heartbeatInterval = 30000 } = options;
  const { user } = useAuth();
  const clientId = useRef(generateClientId());
  const heartbeatRef = useRef<NodeJS.Timeout | null>(null);
  const sessionIdRef = useRef<string | null>(null);

  // UUID validation regex
  const isValidUUID = (id: string | undefined | null): boolean => {
    if (!id) return false;
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
  };

  // Upsert session
  const updateSession = useCallback(async () => {
    if (!user) return;

    // Validate foreign keys before RPC call to avoid FK constraint errors
    const validProjectId = isValidUUID(projectId) ? projectId : null;
    const validRoomId = isValidUUID(roomId) ? roomId : null;

    try {
      const { data, error } = await supabase.rpc('upsert_user_session', {
        p_project_id: validProjectId,
        p_room_id: validRoomId,
        p_client_id: clientId.current,
      });

      if (error) {
        // Silently handle FK constraint errors - these happen when navigating away
        if (error.message?.includes('foreign key constraint')) {
          console.debug('Session tracking: Invalid project/room reference, skipping update');
          return;
        }
        console.error('Session update error:', error);
        return;
      }

      if (data) {
        sessionIdRef.current = data;
      }
    } catch (e) {
      console.error('Failed to update session:', e);
    }
  }, [user, projectId, roomId]);

  // Heartbeat
  const sendHeartbeat = useCallback(async () => {
    if (!user) return;

    try {
      await supabase.rpc('heartbeat_session', {
        p_client_id: clientId.current,
      });
    } catch (e) {
      console.error('Heartbeat failed:', e);
    }
  }, [user]);

  // End session
  const endSession = useCallback(async () => {
    if (!user) return;

    try {
      await supabase.rpc('end_user_session', {
        p_client_id: clientId.current,
      });
    } catch (e) {
      console.error('Failed to end session:', e);
    }
  }, [user]);

  // Set up session tracking
  useEffect(() => {
    if (!user) return;

    // Initial session update
    updateSession();

    // Set up heartbeat
    heartbeatRef.current = setInterval(sendHeartbeat, heartbeatInterval);

    // Handle page visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, mark as inactive
        endSession();
      } else {
        // Page is visible again, reactivate
        updateSession();
      }
    };

    // Handle page unload
    const handleBeforeUnload = () => {
      // Use sendBeacon for reliable unload
      const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/rpc/end_user_session`;
      const data = JSON.stringify({ p_client_id: clientId.current });
      
      navigator.sendBeacon(url, new Blob([data], { type: 'application/json' }));
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      if (heartbeatRef.current) {
        clearInterval(heartbeatRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      
      // End session on cleanup
      endSession();
    };
  }, [user, updateSession, sendHeartbeat, endSession, heartbeatInterval]);

  // Update session when project/room changes
  useEffect(() => {
    if (user) {
      updateSession();
    }
  }, [projectId, roomId, user, updateSession]);

  return {
    clientId: clientId.current,
    sessionId: sessionIdRef.current,
    updateSession,
    endSession,
  };
}

// Hook to get active users viewing a project
export function useActiveProjectViewers(projectId: string) {
  const { user } = useAuth();

  // This would subscribe to user_sessions with realtime
  // For now, return empty array - can be enhanced later
  return {
    viewers: [] as { userId: string; roomId?: string }[],
    count: 0,
  };
}
