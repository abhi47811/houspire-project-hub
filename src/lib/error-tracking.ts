/**
 * Error Tracking Service
 * Centralized error tracking with Sentry integration for production
 */

import * as Sentry from '@sentry/react';

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

// In-memory error store for development
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

// Initialize error tracking (Sentry for production)
export function initErrorTracking(): void {
  const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;
  const isProduction = import.meta.env.PROD;

  if (SENTRY_DSN && isProduction) {
    Sentry.init({
      dsn: SENTRY_DSN,
      environment: import.meta.env.MODE || 'production',
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration({
          maskAllText: true,
          blockAllMedia: true,
        }),
      ],
      tracesSampleRate: 0.1, // 10% of transactions
      replaysSessionSampleRate: 0.1, // 10% of sessions
      replaysOnErrorSampleRate: 1.0, // 100% of errors get replay

      beforeSend(event, hint) {
        // Filter out non-critical errors
        if (event.exception) {
          const error = hint.originalException as Error | undefined;

          // Ignore user-related network errors
          if (
            error?.message?.includes('Failed to fetch') &&
            error?.message?.includes('user')
          ) {
            return null;
          }
        }

        return event;
      },
    });

    console.log('✅ Sentry error tracking enabled');
  } else {
    // Development mode - use local error handlers
    window.onerror = (message, source, lineno, colno, error) => {
      trackError(error || new Error(String(message)), {
        component: 'window.onerror',
        metadata: { source, lineno, colno },
      });
    };

    window.onunhandledrejection = (event) => {
      trackError(event.reason || new Error('Unhandled Promise Rejection'), {
        component: 'unhandledrejection',
      });
    };

    console.log('ℹ️ Error tracking in development mode (local only)');
  }
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

  // Send to Sentry in production
  if (import.meta.env.PROD) {
    Sentry.captureException(errorObj, {
      extra: context as Record<string, unknown>,
      level: severity,
    });
  }

  return trackedError.id;
}

// Track generation errors specifically
export function trackGenerationError(
  error: Error,
  context: {
    roomId?: string;
    projectId?: string;
    phase?: string;
    style?: string;
    roomType?: string;
  }
): string {
  console.error('Generation error:', error, context);

  if (import.meta.env.PROD) {
    Sentry.captureException(error, {
      tags: {
        error_type: 'generation_failure',
        phase: context.phase,
        style: context.style,
        room_type: context.roomType,
      },
      extra: context,
      level: 'error',
    });
  }

  return trackError(error, {
    ...context,
    action: 'generation',
  });
}

// Track API errors
export function trackAPIError(
  error: Error,
  context: {
    endpoint: string;
    method: string;
    statusCode?: number;
    responseTime?: number;
  }
): string {
  console.error('API error:', error, context);

  if (import.meta.env.PROD) {
    Sentry.captureException(error, {
      tags: {
        error_type: 'api_failure',
        endpoint: context.endpoint,
        method: context.method,
        status_code: context.statusCode?.toString(),
      },
      extra: context,
      level: context.statusCode && context.statusCode >= 500 ? 'error' : 'warning',
    });
  }

  return trackError(error, {
    action: 'api_call',
    metadata: context,
  });
}

// Track quality violations
export function trackQualityViolation(violation: {
  type: string;
  roomId: string;
  severity: string;
  details: Record<string, unknown>;
}): void {
  console.warn('Quality violation:', violation);

  if (import.meta.env.PROD) {
    Sentry.captureMessage(`Quality violation: ${violation.type}`, {
      tags: {
        error_type: 'quality_violation',
        violation_type: violation.type,
        severity: violation.severity,
      },
      extra: violation,
      level: violation.severity === 'critical' ? 'error' : 'warning',
    });
  }
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

export function setUserContext(context: {
  userId?: string;
  email?: string;
  role?: string;
}): void {
  userContext = context;

  if (import.meta.env.PROD) {
    Sentry.setUser({
      id: context.userId,
      email: context.email,
    });
  }
}

export function clearUserContext(): void {
  userContext = {};

  if (import.meta.env.PROD) {
    Sentry.setUser(null);
  }
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
  return errorStore.reduce(
    (acc, err) => {
      acc[err.severity] = (acc[err.severity] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
}

// Get grouped errors by fingerprint
export function getGroupedErrors(): {
  fingerprint: string;
  count: number;
  latest: TrackedError;
}[] {
  const groups: Record<string, { count: number; latest: TrackedError }> = {};

  errorStore.forEach((error) => {
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

// Create error boundary helper
export function createErrorHandler(componentName: string) {
  return (error: Error, errorInfo?: { componentStack?: string }) => {
    trackError(error, {
      component: componentName,
      metadata: { componentStack: errorInfo?.componentStack },
    });
  };
}
