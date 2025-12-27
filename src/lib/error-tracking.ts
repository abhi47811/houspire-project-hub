/**
 * Error Tracking Service
 * Centralized error tracking with support for Sentry integration
 */

interface ErrorContext {
  userId?: string;
  projectId?: string;
  roomId?: string;
  action?: string;
  component?: string;
  metadata?: Record<string, unknown>;
}

interface TrackedError {
  id: string;
  message: string;
  stack?: string;
  context: ErrorContext;
  timestamp: string;
  severity: 'error' | 'warning' | 'info';
  fingerprint?: string;
}

// In-memory error store for development (replace with Sentry in production)
const errorStore: TrackedError[] = [];
const MAX_STORED_ERRORS = 100;

// Generate unique error ID
function generateErrorId(): string {
  return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Generate fingerprint for grouping similar errors
function generateFingerprint(error: Error): string {
  const stack = error.stack || '';
  const firstLine = stack.split('\n')[1] || '';
  return btoa(`${error.name}:${error.message}:${firstLine}`).slice(0, 32);
}

// Track an error
export function trackError(
  error: Error | string,
  context: ErrorContext = {},
  severity: 'error' | 'warning' | 'info' = 'error'
): string {
  const errorObj = typeof error === 'string' ? new Error(error) : error;
  
  const trackedError: TrackedError = {
    id: generateErrorId(),
    message: errorObj.message,
    stack: errorObj.stack,
    context,
    timestamp: new Date().toISOString(),
    severity,
    fingerprint: generateFingerprint(errorObj),
  };

  // Store locally
  errorStore.unshift(trackedError);
  if (errorStore.length > MAX_STORED_ERRORS) {
    errorStore.pop();
  }

  // Log to console in development
  if (import.meta.env.DEV) {
    console.group(`🔴 Error Tracked: ${trackedError.id}`);
    console.error(errorObj);
    console.log('Context:', context);
    console.groupEnd();
  }

  // TODO: Send to Sentry in production
  // if (import.meta.env.PROD && window.Sentry) {
  //   Sentry.captureException(errorObj, {
  //     extra: context,
  //     level: severity,
  //   });
  // }

  return trackedError.id;
}

// Track a warning
export function trackWarning(message: string, context: ErrorContext = {}): string {
  return trackError(message, context, 'warning');
}

// Track an info event
export function trackInfo(message: string, context: ErrorContext = {}): string {
  return trackError(message, context, 'info');
}

// Set user context for error tracking
let userContext: { userId?: string; email?: string; role?: string } = {};

export function setUserContext(context: { userId?: string; email?: string; role?: string }): void {
  userContext = context;
  // TODO: Sentry.setUser(context);
}

export function clearUserContext(): void {
  userContext = {};
  // TODO: Sentry.setUser(null);
}

export function getUserContext() {
  return userContext;
}

// Get recent errors (for admin dashboard)
export function getRecentErrors(): TrackedError[] {
  return [...errorStore];
}

// Get error counts by severity
export function getErrorCounts(): Record<string, number> {
  return errorStore.reduce((acc, err) => {
    acc[err.severity] = (acc[err.severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

// Get grouped errors by fingerprint
export function getGroupedErrors(): { fingerprint: string; count: number; latest: TrackedError }[] {
  const groups: Record<string, { count: number; latest: TrackedError }> = {};
  
  errorStore.forEach(error => {
    const fp = error.fingerprint || error.id;
    if (!groups[fp]) {
      groups[fp] = { count: 0, latest: error };
    }
    groups[fp].count++;
    if (new Date(error.timestamp) > new Date(groups[fp].latest.timestamp)) {
      groups[fp].latest = error;
    }
  });

  return Object.entries(groups)
    .map(([fingerprint, data]) => ({ fingerprint, ...data }))
    .sort((a, b) => b.count - a.count);
}

// Global error handler setup
export function initErrorTracking(): void {
  // Catch unhandled errors
  window.onerror = (message, source, lineno, colno, error) => {
    trackError(error || new Error(String(message)), {
      component: 'window.onerror',
      metadata: { source, lineno, colno },
    });
  };

  // Catch unhandled promise rejections
  window.onunhandledrejection = (event) => {
    trackError(event.reason || new Error('Unhandled Promise Rejection'), {
      component: 'unhandledrejection',
    });
  };

  console.log('🛡️ Error tracking initialized');
}

// Create error boundary helper
export function createErrorHandler(componentName: string) {
  return (error: Error, errorInfo?: { componentStack?: string }) => {
    trackError(error, {
      component: componentName,
      metadata: { componentStack: errorInfo?.componentStack },
    });
  };
}
