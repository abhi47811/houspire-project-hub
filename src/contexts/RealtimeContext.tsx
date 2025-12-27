import React, { createContext, useContext, ReactNode } from 'react';
import { useRealtimeSubscriptions } from '@/hooks/useRealtimeSubscriptions';
import { useSessionTracking } from '@/hooks/useSessionTracking';

interface RealtimeContextValue {
  unreadCount: number;
  projectId?: string;
  roomId?: string;
}

const RealtimeContext = createContext<RealtimeContextValue | undefined>(undefined);

interface RealtimeProviderProps {
  children: ReactNode;
  projectId?: string;
  roomId?: string;
}

export function RealtimeProvider({ children, projectId, roomId }: RealtimeProviderProps) {
  // Track user session
  useSessionTracking({ projectId, roomId });

  // Set up realtime subscriptions
  const { unreadCount } = useRealtimeSubscriptions({
    projectId,
    enableNotifications: true,
    enableChangeEvents: !!projectId,
    enableJobUpdates: !!projectId,
  });

  return (
    <RealtimeContext.Provider value={{ unreadCount, projectId, roomId }}>
      {children}
    </RealtimeContext.Provider>
  );
}

export function useRealtime() {
  const context = useContext(RealtimeContext);
  if (!context) {
    return { unreadCount: 0, projectId: undefined, roomId: undefined };
  }
  return context;
}
