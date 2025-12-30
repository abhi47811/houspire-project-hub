import { trackAPIError } from '@/lib/error-tracking';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

interface VisionResponse<T> {
  result: T;
  usage: {
    inputTokens: number;
    outputTokens: number;
    costUsd: number;
  };
}

interface RoomAnalysis {
  dimensions?: {
    length_feet?: number;
    width_feet?: number;
    height_feet?: number;
  };
  window_count?: number;
  window_positions?: any[];
  door_count?: number;
  door_positions?: any[];
  ceiling_features?: string[];
  outlet_count?: number;
  architectural_features?: string[];
  suggested_styles?: string[];
}

interface CleaningValidation {
  valid: boolean;
  issues: string[];
  preservedElements: string[];
  qualityScore: number;
}

interface RenderValidation {
  architecturalPreservation: number;
  designStyleAccuracy: number;
  photorealism: number;
  furnitureProportions: number;
  overallMagazineQuality: number;
  overallScore: number;
  issues: string[];
}

interface BudgetItem {
  item_name: string;
  category: string;
  specification: string;
  quantity: number;
  unit: string;
}

interface PromptGeneration {
  prompt: string;
  negativePrompt: string;
  styleKeywords: string[];
}

async function callVisionAI<T>(
  action: string,
  params: Record<string, unknown>
): Promise<VisionResponse<T>> {
  const startTime = Date.now();

  console.log(`[Vision AI] Calling ${action}...`, {
    url: `${SUPABASE_URL}/functions/v1/vision-ai`,
    params: { ...params, imageUrl: params.imageUrl ? '***' : undefined }
  });

  const response = await fetch(`${SUPABASE_URL}/functions/v1/vision-ai`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ action, ...params }),
  });

  const data = await response.json();

  console.log(`[Vision AI] Response for ${action}:`, {
    status: response.status,
    ok: response.ok,
    hasError: !!data.error,
    demo: data.demo,
    responseTime: Date.now() - startTime
  });

  // Check if response contains an error even with 200 status
  if (!response.ok || data.error) {
    const errorMessage = data.error || data.message || 'Vision AI request failed';
    const error = new Error(errorMessage);

    console.error(`[Vision AI] Error for ${action}:`, errorMessage, data);

    trackAPIError(error, {
      endpoint: '/functions/v1/vision-ai',
      method: 'POST',
      statusCode: response.status,
      responseTime: Date.now() - startTime,
      errorDetails: data,
    });

    throw error;
  }

  // If in demo mode, show a toast
  if (data.demo) {
    console.warn('[Vision AI] Demo mode active:', data.message);
    // Return demo data
    return data;
  }

  console.log(`[Vision AI] Success for ${action} (${Date.now() - startTime}ms)`);
  return data;
}

export const visionService = {
  /**
   * Analyze a room image for interior design renovation
   */
  async analyzeRoom(
    imageUrl: string,
    projectId?: string,
    roomId?: string
  ): Promise<VisionResponse<RoomAnalysis>> {
    return callVisionAI<RoomAnalysis>('analyzeRoom', {
      imageUrl,
      projectId,
      roomId,
    });
  },

  /**
   * Validate that cleaning preserved architectural elements
   */
  async validateCleaning(
    originalUrl: string,
    cleanedUrl: string,
    projectId?: string,
    roomId?: string
  ): Promise<VisionResponse<CleaningValidation>> {
    return callVisionAI<CleaningValidation>('validateCleaning', {
      originalUrl,
      cleanedUrl,
      projectId,
      roomId,
    });
  },

  /**
   * Validate final render quality
   */
  async validateFinalRender(
    renderUrl: string,
    requirements: Record<string, any>,
    projectId?: string,
    roomId?: string
  ): Promise<VisionResponse<RenderValidation>> {
    return callVisionAI<RenderValidation>('validateFinalRender', {
      renderUrl,
      requirements,
      projectId,
      roomId,
    });
  },

  /**
   * Itemize materials and furniture from renders for budget
   */
  async itemizeBudget(
    imageUrls: string[],
    projectId?: string,
    roomId?: string
  ): Promise<VisionResponse<BudgetItem[]>> {
    return callVisionAI<BudgetItem[]>('itemizeBudget', {
      imageUrls,
      projectId,
      roomId,
    });
  },

  /**
   * Generate an optimized prompt for image generation
   */
  async generatePrompt(
    roomData: Record<string, any>,
    smartDefaults: Record<string, any>,
    analysis: Record<string, any>,
    projectId?: string,
    roomId?: string
  ): Promise<VisionResponse<PromptGeneration>> {
    return callVisionAI<PromptGeneration>('generatePrompt', {
      roomData,
      smartDefaults,
      analysis,
      projectId,
      roomId,
    });
  },

  /**
   * Quick room analysis (fallback/lite version)
   */
  async quickAnalysis(
    imageUrl: string,
    projectId?: string,
    roomId?: string
  ): Promise<VisionResponse<{ room_type: string; approximate_size: string; natural_light: string; current_style: string }>> {
    return callVisionAI('quickAnalysis', {
      imageUrl,
      projectId,
      roomId,
    });
  },
};
