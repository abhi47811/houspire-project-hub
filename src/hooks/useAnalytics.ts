/**
 * Analytics Hook
 * Track user events and page views
 */

import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
  timestamp: string;
  userId?: string;
  sessionId: string;
  path: string;
}

// Session ID persists across page navigations
const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// In-memory event store (replace with analytics service in production)
const eventStore: AnalyticsEvent[] = [];
const MAX_EVENTS = 1000;

// Track an event
function trackEvent(event: Omit<AnalyticsEvent, 'timestamp' | 'sessionId'>): void {
  const fullEvent: AnalyticsEvent = {
    ...event,
    timestamp: new Date().toISOString(),
    sessionId,
  };

  eventStore.unshift(fullEvent);
  if (eventStore.length > MAX_EVENTS) {
    eventStore.pop();
  }

  // Log in development
  if (import.meta.env.DEV) {
    console.log('📊 Analytics:', fullEvent.name, fullEvent.properties);
  }

  // Production analytics integration
  if (import.meta.env.PROD) {
    // Send to Google Analytics if available
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-expect-error gtag is injected by Google Analytics
      window.gtag('event', event.name, event.properties);
    }
    
    // Send to Mixpanel if available
    if (typeof window !== 'undefined' && 'mixpanel' in window) {
      // @ts-expect-error mixpanel is injected by Mixpanel SDK
      window.mixpanel.track(event.name, event.properties);
    }
  }
}

// Predefined event names for type safety
export const AnalyticsEvents = {
  // Page views
  PAGE_VIEW: 'page_view',
  
  // Auth
  LOGIN: 'login',
  LOGOUT: 'logout',
  SIGNUP: 'signup',
  
  // Projects
  PROJECT_CREATED: 'project_created',
  PROJECT_VIEWED: 'project_viewed',
  PROJECT_COMPLETED: 'project_completed',
  
  // Rooms
  ROOM_ADDED: 'room_added',
  IMAGE_UPLOADED: 'image_uploaded',
  PHASE_COMPLETED: 'phase_completed',
  
  // AI Operations
  ANALYSIS_STARTED: 'analysis_started',
  ANALYSIS_COMPLETED: 'analysis_completed',
  CLEANING_STARTED: 'cleaning_started',
  CLEANING_COMPLETED: 'cleaning_completed',
  RENDER_STARTED: 'render_started',
  RENDER_COMPLETED: 'render_completed',
  
  // Bulk Operations
  BULK_APPROVE_ANALYSIS: 'bulk_approve_analysis',
  BULK_APPLY_STYLE: 'bulk_apply_style',
  BULK_APPROVE_BUDGET: 'bulk_approve_budget',
  BULK_ASSIGN_VENDORS: 'bulk_assign_vendors',
  
  // Budget
  BUDGET_GENERATED: 'budget_generated',
  BUDGET_EXPORTED: 'budget_exported',
  
  // Errors
  ERROR_OCCURRED: 'error_occurred',
  API_ERROR: 'api_error',
  
  // Feature Usage
  SEARCH_USED: 'search_used',
  KEYBOARD_SHORTCUT: 'keyboard_shortcut',
  NOTIFICATION_CLICKED: 'notification_clicked',
} as const;

export function useAnalytics() {
  const location = useLocation();
  const { user } = useAuth();

  // Track page views automatically
  useEffect(() => {
    trackEvent({
      name: AnalyticsEvents.PAGE_VIEW,
      path: location.pathname,
      userId: user?.id,
      properties: {
        path: location.pathname,
        search: location.search,
        referrer: document.referrer,
      },
    });
  }, [location.pathname, location.search, user?.id]);

  // Track custom event
  const track = useCallback((
    eventName: string,
    properties?: Record<string, unknown>
  ) => {
    trackEvent({
      name: eventName,
      path: location.pathname,
      userId: user?.id,
      properties,
    });
  }, [location.pathname, user?.id]);

  // Track with timing
  const trackTiming = useCallback((
    eventName: string,
    startTime: number,
    properties?: Record<string, unknown>
  ) => {
    const duration = Date.now() - startTime;
    track(eventName, {
      ...properties,
      duration_ms: duration,
    });
  }, [track]);

  // Track errors
  const trackError = useCallback((
    error: Error,
    context?: Record<string, unknown>
  ) => {
    track(AnalyticsEvents.ERROR_OCCURRED, {
      error_message: error.message,
      error_name: error.name,
      ...context,
    });
  }, [track]);

  return {
    track,
    trackTiming,
    trackError,
    sessionId,
  };
}

// Get event counts for analytics dashboard
export function getEventCounts(): Record<string, number> {
  return eventStore.reduce((acc, event) => {
    acc[event.name] = (acc[event.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

// Get events by name
export function getEventsByName(name: string): AnalyticsEvent[] {
  return eventStore.filter(e => e.name === name);
}

// Get unique users count
export function getUniqueUserCount(): number {
  const users = new Set(eventStore.map(e => e.userId).filter(Boolean));
  return users.size;
}

// Get unique sessions count
export function getUniqueSessionCount(): number {
  const sessions = new Set(eventStore.map(e => e.sessionId));
  return sessions.size;
}

// Get all events (for export/debugging)
export function getAllEvents(): AnalyticsEvent[] {
  return [...eventStore];
}
