const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

interface ImageProcessingResponse {
  result: {
    output: string;
    predictionId?: string;
    mock?: boolean;
    message?: string;
  };
  usage: {
    costUsd: number;
  };
}

async function callImageProcessing(
  action: string,
  params: Record<string, any>
): Promise<ImageProcessingResponse> {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/image-processing`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ action, ...params }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Image processing request failed');
  }

  return response.json();
}

export const imageProcessingService = {
  /**
   * Clean room using LaMa Cleaner (remove furniture)
   */
  async cleanRoom(
    imageUrl: string,
    mask: string,
    projectId?: string,
    roomId?: string
  ): Promise<ImageProcessingResponse> {
    return callImageProcessing('cleanRoom', {
      imageUrl,
      mask,
      projectId,
      roomId,
    });
  },

  /**
   * Retry cleanup with fallback model
   */
  async retryCleanup(
    imageUrl: string,
    mask: string,
    projectId?: string,
    roomId?: string
  ): Promise<ImageProcessingResponse> {
    return callImageProcessing('retryCleanup', {
      imageUrl,
      mask,
      projectId,
      roomId,
    });
  },

  /**
   * Upscale image to 4K using Real-ESRGAN
   */
  async upscaleImage(
    imageUrl: string,
    projectId?: string,
    roomId?: string
  ): Promise<ImageProcessingResponse> {
    return callImageProcessing('upscaleImage', {
      imageUrl,
      projectId,
      roomId,
    });
  },

  /**
   * Clean room with automatic retry on failure
   */
  async cleanRoomWithRetry(
    imageUrl: string,
    mask: string,
    projectId?: string,
    roomId?: string,
    maxRetries = 3
  ): Promise<ImageProcessingResponse> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // First attempt with LaMa Cleaner
        const result = await this.cleanRoom(imageUrl, mask, projectId, roomId);
        return result;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        console.warn(`Clean attempt ${attempt} failed:`, lastError.message);

        if (attempt < maxRetries) {
          // Wait before retry (exponential backoff)
          await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));

          // Try fallback on last retry
          if (attempt === maxRetries - 1) {
            try {
              return await this.retryCleanup(imageUrl, mask, projectId, roomId);
            } catch (fallbackError) {
              console.warn('Fallback cleanup also failed');
            }
          }
        }
      }
    }

    throw lastError || new Error('All cleanup attempts failed');
  },
};
