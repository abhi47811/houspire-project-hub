import { toast } from '@/hooks/use-toast';

export class ApiError extends Error {
  public statusCode: number;
  public isRetryable: boolean;
  public retryAfter?: number;

  constructor(
    message: string,
    statusCode: number = 500,
    isRetryable: boolean = false,
    retryAfter?: number
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.isRetryable = isRetryable;
    this.retryAfter = retryAfter;
  }
}

export function handleApiError(
  error: unknown,
  options: {
    showToast?: boolean;
    defaultMessage?: string;
    onRetry?: () => void;
  } = {}
): string {
  const { showToast = true, defaultMessage = 'An unexpected error occurred', onRetry } = options;

  let message = defaultMessage;
  let isRetryable = false;

  if (error instanceof ApiError) {
    message = error.message;
    isRetryable = error.isRetryable;
  } else if (error instanceof Error) {
    message = error.message;
    // Network errors are usually retryable
    isRetryable = error.message.includes('network') || error.message.includes('fetch');
  } else if (typeof error === 'object' && error !== null) {
    const errorObj = error as any;
    message = errorObj.message || errorObj.error || defaultMessage;
  }

  if (showToast) {
    toast({
      title: 'Error',
      description: message,
      variant: 'destructive',
      ...(isRetryable && onRetry
        ? {
            action: {
              altText: 'Retry',
              onClick: onRetry,
            } as any,
          }
        : {}),
    });
  }

  return message;
}

export function isNetworkError(error: unknown): boolean {
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return true;
  }
  if (error instanceof Error && error.message.toLowerCase().includes('network')) {
    return true;
  }
  return false;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  if (typeof error === 'object' && error !== null) {
    const errorObj = error as any;
    return errorObj.message || errorObj.error || 'An unexpected error occurred';
  }
  return 'An unexpected error occurred';
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number;
    delay?: number;
    backoff?: number;
    shouldRetry?: (error: unknown) => boolean;
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    delay = 1000,
    backoff = 2,
    shouldRetry = isNetworkError,
  } = options;

  let lastError: unknown;
  let currentDelay = delay;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxRetries || !shouldRetry(error)) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, currentDelay));
      currentDelay *= backoff;
    }
  }

  throw lastError;
}
