const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

interface GenerateResponse<T> {
  result: T;
  usage: {
    inputTokens?: number;
    outputTokens?: number;
    costUsd: number;
  };
}

interface RenderResult {
  imageUrl: string;
  content?: string;
}

interface QuickAnalysisResult {
  room_type: string;
  size_estimate: string;
  features: string[];
}

async function callGenerateAI<T>(
  action: string,
  params: Record<string, any>
): Promise<GenerateResponse<T>> {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/generate-ai`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ action, ...params }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Generate AI request failed');
  }

  return response.json();
}

export const generateService = {
  /**
   * Generate a photorealistic interior design render
   */
  async generateRender(
    cleanedImageUrl: string,
    prompt: string,
    projectId?: string,
    roomId?: string
  ): Promise<GenerateResponse<RenderResult>> {
    return callGenerateAI<RenderResult>('generateRender', {
      cleanedImageUrl,
      prompt,
      projectId,
      roomId,
    });
  },

  /**
   * Quick room analysis (lightweight)
   */
  async quickAnalysis(
    imageUrl: string,
    projectId?: string,
    roomId?: string
  ): Promise<GenerateResponse<QuickAnalysisResult>> {
    return callGenerateAI<QuickAnalysisResult>('quickAnalysis', {
      imageUrl,
      projectId,
      roomId,
    });
  },

  /**
   * Generate render with automatic retry
   */
  async generateRenderWithRetry(
    cleanedImageUrl: string,
    prompt: string,
    projectId?: string,
    roomId?: string,
    maxRetries = 3
  ): Promise<GenerateResponse<RenderResult>> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const result = await this.generateRender(
          cleanedImageUrl,
          prompt,
          projectId,
          roomId
        );
        return result;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        console.warn(`Generate attempt ${attempt} failed:`, lastError.message);

        if (attempt < maxRetries) {
          // Wait before retry (exponential backoff)
          await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
        }
      }
    }

    throw lastError || new Error('All generation attempts failed');
  },
};
