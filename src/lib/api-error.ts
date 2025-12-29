import { toast } from '@/hooks/use-toast';

export class ApiError extends Error {
  public statusCode: number;
  public isRetryable: boolean;
  public retryAfter?: number;
  public errorCode?: string;

  constructor(
    message: string,
    statusCode: number = 500,
    isRetryable: boolean = false,
    retryAfter?: number,
    errorCode?: string
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.isRetryable = isRetryable;
    this.retryAfter = retryAfter;
    this.errorCode = errorCode;
  }
}

// User-friendly error messages with actionable suggestions
interface ErrorDetails {
  title: string;
  description: string;
  actions: string[];
  isRetryable: boolean;
}

const ERROR_MESSAGES: Record<string, ErrorDetails> = {
  // Image/Upload errors
  image_too_large: {
    title: 'Image Too Large',
    description: 'The image file exceeds the maximum size limit.',
    actions: ['Resize your image to under 10MB', 'Use a lower resolution image', 'Try a different format (JPEG/PNG)'],
    isRetryable: false,
  },
  invalid_image_format: {
    title: 'Invalid Image Format',
    description: 'The file format is not supported.',
    actions: ['Use JPEG, PNG, or WebP format', 'Check if the file is corrupted'],
    isRetryable: false,
  },
  upload_failed: {
    title: 'Upload Failed',
    description: 'We couldn\'t upload your file.',
    actions: ['Check your internet connection', 'Try a smaller file', 'Try again in a moment'],
    isRetryable: true,
  },

  // Generation errors
  generation_failed: {
    title: 'Generation Failed',
    description: 'We couldn\'t generate your render.',
    actions: ['Try a different style', 'Simplify your requirements', 'Try again in a few minutes'],
    isRetryable: true,
  },
  generation_timeout: {
    title: 'Generation Timed Out',
    description: 'The generation is taking longer than expected.',
    actions: ['Wait a moment and refresh', 'Try again with simpler settings', 'Contact support if this persists'],
    isRetryable: true,
  },
  quota_exceeded: {
    title: 'Usage Limit Reached',
    description: 'You\'ve reached your generation limit.',
    actions: ['Wait for your quota to reset', 'Upgrade your plan', 'Contact support'],
    isRetryable: false,
  },

  // Analysis errors
  analysis_failed: {
    title: 'Analysis Failed',
    description: 'We couldn\'t analyze your room image.',
    actions: ['Ensure the image shows a clear room view', 'Try a higher quality image', 'Try again'],
    isRetryable: true,
  },

  // Authentication errors
  unauthorized: {
    title: 'Session Expired',
    description: 'Your session has expired.',
    actions: ['Please log in again'],
    isRetryable: false,
  },
  forbidden: {
    title: 'Access Denied',
    description: 'You don\'t have permission to perform this action.',
    actions: ['Check your account permissions', 'Contact your administrator'],
    isRetryable: false,
  },

  // Network errors
  network_error: {
    title: 'Connection Issue',
    description: 'We couldn\'t connect to the server.',
    actions: ['Check your internet connection', 'Try again in a moment', 'Refresh the page'],
    isRetryable: true,
  },
  server_error: {
    title: 'Server Error',
    description: 'Something went wrong on our end.',
    actions: ['Try again in a few minutes', 'Contact support if this persists'],
    isRetryable: true,
  },

  // Database errors
  not_found: {
    title: 'Not Found',
    description: 'The requested item could not be found.',
    actions: ['The item may have been deleted', 'Refresh the page'],
    isRetryable: false,
  },
  duplicate_entry: {
    title: 'Already Exists',
    description: 'This item already exists.',
    actions: ['Use a different name', 'Edit the existing item instead'],
    isRetryable: false,
  },

  // Default
  unknown: {
    title: 'Something Went Wrong',
    description: 'An unexpected error occurred.',
    actions: ['Try again', 'Refresh the page', 'Contact support if this persists'],
    isRetryable: true,
  },
};

// Map common error patterns to error codes
function detectErrorCode(error: unknown): string {
  const message = getErrorMessage(error).toLowerCase();
  
  // Image errors
  if (message.includes('too large') || message.includes('size limit') || message.includes('10mb')) {
    return 'image_too_large';
  }
  if (message.includes('format') || message.includes('invalid image') || message.includes('unsupported')) {
    return 'invalid_image_format';
  }
  if (message.includes('upload') && message.includes('fail')) {
    return 'upload_failed';
  }

  // Generation errors
  if (message.includes('generation') && message.includes('fail')) {
    return 'generation_failed';
  }
  if (message.includes('timeout') || message.includes('timed out')) {
    return 'generation_timeout';
  }
  if (message.includes('quota') || message.includes('limit') || message.includes('exceeded')) {
    return 'quota_exceeded';
  }

  // Analysis errors
  if (message.includes('analysis') && message.includes('fail')) {
    return 'analysis_failed';
  }

  // Auth errors
  if (message.includes('unauthorized') || message.includes('session') || message.includes('jwt')) {
    return 'unauthorized';
  }
  if (message.includes('forbidden') || message.includes('permission')) {
    return 'forbidden';
  }

  // Network errors
  if (message.includes('network') || message.includes('fetch') || message.includes('connection')) {
    return 'network_error';
  }
  if (message.includes('500') || message.includes('internal server')) {
    return 'server_error';
  }

  // Database errors
  if (message.includes('not found') || message.includes('404')) {
    return 'not_found';
  }
  if (message.includes('duplicate') || message.includes('already exists') || message.includes('unique')) {
    return 'duplicate_entry';
  }

  return 'unknown';
}

export function getUserFriendlyError(error: unknown): ErrorDetails {
  const errorCode = detectErrorCode(error);
  return ERROR_MESSAGES[errorCode] || ERROR_MESSAGES.unknown;
}

export function handleApiError(
  error: unknown,
  options: {
    showToast?: boolean;
    defaultMessage?: string;
    onRetry?: () => void;
  } = {}
): string {
  const { showToast = true, onRetry } = options;

  const errorDetails = getUserFriendlyError(error);
  const message = errorDetails.description;
  const actionHint = errorDetails.actions[0] ? ` Try: ${errorDetails.actions[0]}` : '';

  if (showToast) {
    toast({
      title: errorDetails.title,
      description: `${errorDetails.description}${actionHint}`,
      variant: 'destructive',
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
    const errorObj = error as Record<string, unknown>;
    return (errorObj.message || errorObj.error || 'An unexpected error occurred') as string;
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
    onRetryAttempt?: (attempt: number, error: unknown) => void;
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    delay = 1000,
    backoff = 2,
    shouldRetry = isNetworkError,
    onRetryAttempt,
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

      onRetryAttempt?.(attempt + 1, error);
      await new Promise((resolve) => setTimeout(resolve, currentDelay));
      currentDelay *= backoff;
    }
  }

  throw lastError;
}
