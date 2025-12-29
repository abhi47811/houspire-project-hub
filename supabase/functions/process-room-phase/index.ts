import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

// Declare EdgeRuntime for Supabase edge functions
declare const EdgeRuntime: {
  waitUntil: (promise: Promise<any>) => void;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;
const REPLICATE_API_KEY = Deno.env.get("REPLICATE_API_KEY");

// Create admin client for database operations
function getAdminClient() {
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false }
  });
}

// ============= ERROR HANDLING & RETRY HELPERS =============

// Classify errors and provide actionable suggestions
function classifyError(error: Error): {
  errorType: string;
  suggestedAction: string;
  isRetryable: boolean;
} {
  const msg = (error.message || '').toLowerCase();
  
  if (msg.includes('401') || msg.includes('403') || msg.includes('unauthorized') || msg.includes('forbidden')) {
    return {
      errorType: 'authentication',
      suggestedAction: 'API key may be invalid. Please contact support.',
      isRetryable: false
    };
  }
  if (msg.includes('400') || msg.includes('bad request') || msg.includes('invalid')) {
    return {
      errorType: 'validation',
      suggestedAction: 'Request parameters are invalid. Please check input and try again.',
      isRetryable: false
    };
  }
  if (msg.includes('429') || msg.includes('rate limit') || msg.includes('too many requests')) {
    return {
      errorType: 'rate_limit',
      suggestedAction: 'Rate limit exceeded. Please wait a moment and try again.',
      isRetryable: true
    };
  }
  if (msg.includes('500') || msg.includes('502') || msg.includes('503') || msg.includes('504') || msg.includes('internal server error')) {
    return {
      errorType: 'server_error',
      suggestedAction: 'AI service temporarily unavailable. Please try again in a few minutes.',
      isRetryable: true
    };
  }
  if (msg.includes('timeout') || msg.includes('timed out') || msg.includes('deadline')) {
    return {
      errorType: 'timeout',
      suggestedAction: 'Generation took too long. Please try again.',
      isRetryable: true
    };
  }
  if (msg.includes('network') || msg.includes('fetch failed') || msg.includes('econnrefused') || msg.includes('enotfound') || msg.includes('socket')) {
    return {
      errorType: 'network',
      suggestedAction: 'Network connection issue. Please try again.',
      isRetryable: true
    };
  }
  
  return {
    errorType: 'unknown',
    suggestedAction: 'An unexpected error occurred. Please try again.',
    isRetryable: true
  };
}

// Retry wrapper with exponential backoff
async function generateWithRetry<T>(
  apiCall: () => Promise<T>,
  context: { operation: string; roomId?: string; projectId?: string },
  maxRetries: number = 2,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      if (attempt > 0) {
        const delay = baseDelay * Math.pow(2, attempt - 1);
        console.log(`⏳ [${context.operation}] Retry attempt ${attempt}/${maxRetries} after ${delay}ms delay`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      
      const result = await apiCall();
      
      if (attempt > 0) {
        console.log(`✅ [${context.operation}] Retry succeeded on attempt ${attempt}`);
      }
      
      return result;
      
    } catch (error) {
      lastError = error as Error;
      const { errorType, isRetryable } = classifyError(lastError);
      
      console.error(`❌ [${context.operation}] Attempt ${attempt + 1} failed:`, {
        error: lastError.message,
        errorType,
        isRetryable,
        roomId: context.roomId,
        timestamp: new Date().toISOString()
      });
      
      // Don't retry on non-retryable errors
      if (!isRetryable) {
        console.error(`❌ [${context.operation}] Error is not retryable, failing immediately`);
        throw lastError;
      }
      
      if (attempt < maxRetries) {
        console.warn(`⚠️ [${context.operation}] Will retry (${attempt + 1}/${maxRetries})...`);
      } else {
        console.error(`❌ [${context.operation}] All ${maxRetries + 1} attempts failed`);
      }
    }
  }
  
  throw lastError;
}

// Log API call to database
async function logApiCall(supabase: any, data: {
  projectId?: string;
  roomId?: string;
  service: string;
  endpoint: string;
  model?: string;
  inputTokens?: number;
  outputTokens?: number;
  costUsd: number;
  latencyMs?: number;
  status: string;
  errorMessage?: string;
  metadata?: Record<string, any>;
}) {
  try {
    await supabase.from("api_logs").insert({
      project_id: data.projectId,
      room_id: data.roomId,
      service: data.service,
      endpoint: data.endpoint,
      model: data.model,
      input_tokens: data.inputTokens,
      output_tokens: data.outputTokens,
      cost_usd: data.costUsd,
      latency_ms: data.latencyMs,
      status: data.status,
      error_message: data.errorMessage,
      metadata: data.metadata || null,
    });
  } catch (e) {
    console.error("Failed to log API call:", e);
  }
}

// Send notification to user
async function sendNotification(supabase: any, userId: string, data: {
  title: string;
  message: string;
  type: string;
  link?: string;
}) {
  try {
    await supabase.from("notifications").insert({
      user_id: userId,
      title: data.title,
      message: data.message,
      type: data.type,
      link: data.link,
    });
  } catch (e) {
    console.error("Failed to send notification:", e);
  }
}

// Call Vision AI for room analysis
async function analyzeRoom(imageUrl: string, projectId: string, roomId: string): Promise<any> {
  const startTime = Date.now();
  
  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content: `You are an expert interior design analyst. Analyze the room image and extract:
- Estimated dimensions (length_feet, width_feet, height_feet)
- Window count and positions
- Door count and positions
- Ceiling features (fan, lights, etc.)
- Outlet count
- Architectural features
- Suggested interior design styles (3-5 options)

Respond in JSON format:
{
  "dimensions": { "length_feet": number, "width_feet": number, "height_feet": number },
  "window_count": number,
  "window_positions": [{ "wall": string, "size": string }],
  "door_count": number,
  "door_positions": [{ "wall": string, "type": string }],
  "ceiling_features": [string],
  "outlet_count": number,
  "architectural_features": [string],
  "suggested_styles": [string],
  "measurement_confidence": number (0-100)
}`
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze this room for interior design renovation:" },
            { type: "image_url", image_url: { url: imageUrl } }
          ]
        }
      ],
    }),
  });

  const latency = Date.now() - startTime;

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Vision AI error: ${error}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || "";
  
  // Parse JSON from response
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  const result = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

  return {
    result,
    usage: {
      inputTokens: data.usage?.prompt_tokens || 0,
      outputTokens: data.usage?.completion_tokens || 0,
      costUsd: 0.001, // Approximate cost
    },
    latency,
  };
}

async function resolveRoomImageUrl(supabase: any, storagePath: string): Promise<string> {
  if (!storagePath) return "";
  if (storagePath.startsWith("http://") || storagePath.startsWith("https://")) return storagePath;

  const { data, error } = await supabase.storage
    .from("room-images")
    .createSignedUrl(storagePath, 3600);

  if (error) throw error;
  return data?.signedUrl || "";
}

// Clean room using Gemini 3 image model (remove furniture)
async function cleanRoom(imageUrl: string, mask: string, refinementPrompt?: string): Promise<any> {
  const startTime = Date.now();
  
  console.log('cleanRoom called with Gemini 3 Pro Image...');
  console.log('Refinement prompt:', refinementPrompt || 'None (initial clean)');
  
  // Build the cleaning prompt - add refinement instructions if provided
  let cleaningPrompt = `Remove ALL furniture, objects, decorations, and personal items from this room. 
              
CRITICAL REQUIREMENTS:
1. PRESERVE all architectural elements EXACTLY: walls, floor, ceiling, windows, doors, moldings, outlets
2. Remove: sofas, chairs, tables, beds, lamps, rugs, curtains, plants, artwork, electronics, shelves
3. The result should be a COMPLETELY EMPTY room showing only the bare architectural shell
4. Maintain the same lighting, perspective, and image quality
5. Fill removed areas with appropriate wall/floor textures matching the existing surfaces

Output a clean, empty room ready for new interior design.`;

  // Add refinement instructions if provided
  if (refinementPrompt) {
    cleaningPrompt = `This is a REFINEMENT of a previously cleaned room image. Apply these additional fixes:

${refinementPrompt}

Also ensure:
1. PRESERVE all architectural elements EXACTLY: walls, floor, ceiling, windows, doors, moldings, outlets
2. Maintain the same lighting, perspective, and image quality
3. Fill any gaps with appropriate wall/floor textures matching the existing surfaces

Output an improved clean, empty room.`;
  }

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-3-pro-image-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: cleaningPrompt },
            { type: "image_url", image_url: { url: imageUrl } }
          ]
        }
      ],
      modalities: ["image", "text"]
    }),
  });

  const latency = Date.now() - startTime;

  if (!response.ok) {
    const error = await response.text();
    console.error('Gemini 3 cleaning error:', error);
    throw new Error(`Cleaning AI error: ${error}`);
  }

  const data = await response.json();
  console.log('Gemini 3 cleaning response received, checking for images...');
  
  const imageDataUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
  
  if (!imageDataUrl) {
    console.error('No cleaned image in response:', JSON.stringify(data).slice(0, 500));
    throw new Error("No cleaned image generated - AI response did not contain an image");
  }

  console.log('Cleaned image generated successfully, length:', imageDataUrl.length);

  return {
    result: { output: imageDataUrl, isBase64: true },
    usage: { costUsd: 0.03 },
    latency,
  };
}

// Essential elements checklist - always added to prompts
const ESSENTIAL_ELEMENTS = `

ESSENTIAL ELEMENTS (MUST INCLUDE):
- Window treatments (curtains, blinds, or drapes)
- Wall decor (artwork, mirrors, or decorative elements)
- Plants and greenery in appropriate planters
- Area rug with proper sizing
- Decorative accessories and styling elements
- Proper layered lighting (natural + artificial)
- Rich, lived-in, luxurious feel`;

// Build prompt details from smart default specifications
function buildSmartDefaultPromptDetails(smartDefaultData: any): string {
  if (!smartDefaultData) return '';
  
  let promptDetails = '';
  const specs = Array.isArray(smartDefaultData.specifications) ? smartDefaultData.specifications : [];
  
  // Add furniture specifications
  const furnitureItems = specs.filter((s: any) => 
    ['SEATING', 'FURNITURE', 'STORAGE', 'SURFACES', 'SOFA', 'COFFEE TABLE', 'BED', 'WARDROBE'].includes(s.CATEGORY?.toUpperCase())
  ).map((s: any) => {
    let item = s.ITEM || s.item || '';
    const material = s.MATERIAL || s.material;
    const color = s.COLOR || s.color;
    if (material) item += ` (${material})`;
    if (color) item += ` in ${color}`;
    return item;
  }).filter(Boolean);
  
  if (furnitureItems.length > 0) {
    promptDetails += `\n\nFURNITURE: Include ${furnitureItems.join(', ')}.`;
  }
  
  // Add lighting specifications
  const lightingItems = specs.filter((s: any) => 
    ['LIGHTING', 'CHANDELIER', 'LAMP', 'LIGHT'].includes(s.CATEGORY?.toUpperCase())
  );
  if (lightingItems.length > 0) {
    promptDetails += `\n\nLIGHTING: `;
    lightingItems.forEach((item: any) => {
      const itemName = item.ITEM || item.item || '';
      const notes = item.NOTES || item.notes || '';
      promptDetails += `${itemName}${notes ? ' - ' + notes : ''}. `;
    });
  }
  
  // Add textiles/soft furnishings
  const textileItems = specs.filter((s: any) => 
    ['TEXTILES', 'SOFT FURNISHINGS', 'WINDOW TREATMENT', 'RUG', 'CURTAINS', 'DRAPES'].includes(s.CATEGORY?.toUpperCase())
  );
  if (textileItems.length > 0) {
    promptDetails += `\n\nTEXTILES & WINDOW TREATMENTS: `;
    textileItems.forEach((item: any) => {
      const itemName = item.ITEM || item.item || '';
      const material = item.MATERIAL || item.material || '';
      const color = item.COLOR || item.color || '';
      promptDetails += `${itemName}${material ? ' (' + material + ')' : ''}${color ? ' in ' + color : ''}. `;
    });
  }
  
  // Add decor items
  const decorItems = specs.filter((s: any) => 
    ['DECOR', 'ACCESSORIES', 'WALL DECOR', 'PLANTS', 'MIRROR', 'ARTWORK', 'VASES'].includes(s.CATEGORY?.toUpperCase())
  );
  if (decorItems.length > 0) {
    promptDetails += `\n\nDECOR & ACCESSORIES: `;
    decorItems.forEach((item: any) => {
      const itemName = item.ITEM || item.item || '';
      const notes = item.NOTES || item.notes || '';
      promptDetails += `${itemName}${notes ? ' - ' + notes : ''}. `;
    });
  }

  // Add finishes if available
  const finishes = smartDefaultData.finishes;
  if (finishes && Array.isArray(finishes) && finishes.length > 0) {
    promptDetails += `\n\nFINISHES: `;
    finishes.forEach((finish: any) => {
      const category = finish.CATEGORY || finish.category || '';
      const material = finish.MATERIAL || finish.material || '';
      const color = finish.COLOR || finish.color || '';
      if (category || material) {
        promptDetails += `${category}${material ? ': ' + material : ''}${color ? ' in ' + color : ''}. `;
      }
    });
  }
  
  return promptDetails;
}

// ============= QUALITY CHECKING =============

type ViolationType = 
  | 'FAN_LIGHT_CONFLICT'
  | 'MISSING_CURTAINS'
  | 'MISSING_DECOR'
  | 'MISSING_PLANTS'
  | 'BARE_WALLS';

type ViolationSeverity = 'critical' | 'high' | 'medium' | 'low';

interface QualityViolation {
  type: ViolationType;
  severity: ViolationSeverity;
  description: string;
  auto_fixable: boolean;
  fix_suggestion?: string;
}

// Check for fan + light conflict
function checkFanLightConflict(prompt: string): QualityViolation | null {
  const hasFan = /ceiling fan|fan/i.test(prompt);
  const hasHangingLight = /chandelier|pendant light|hanging light/i.test(prompt);
  
  if (hasFan && hasHangingLight) {
    return {
      type: 'FAN_LIGHT_CONFLICT',
      severity: 'critical',
      description: 'Both ceiling fan and hanging light detected. Physical impossibility.',
      auto_fixable: true,
      fix_suggestion: 'Remove hanging light, add wall sconces or table lamps instead.'
    };
  }
  return null;
}

// Check for missing curtains
function checkMissingCurtains(prompt: string): QualityViolation | null {
  const hasCurtains = /curtain|drape|blind|window treatment/i.test(prompt);
  const hasWindows = /window|balcony/i.test(prompt);
  
  if (hasWindows && !hasCurtains) {
    return {
      type: 'MISSING_CURTAINS',
      severity: 'high',
      description: 'Windows present but no window treatments specified.',
      auto_fixable: true,
      fix_suggestion: 'Add curtains, drapes, or blinds appropriate to the style.'
    };
  }
  return null;
}

// Check for missing decor
function checkMissingDecor(prompt: string): QualityViolation | null {
  const hasDecor = /wall art|artwork|mirror|decorative|accessories|decor/i.test(prompt);
  
  if (!hasDecor) {
    return {
      type: 'MISSING_DECOR',
      severity: 'high',
      description: 'No decorative elements or wall art specified.',
      auto_fixable: true,
      fix_suggestion: 'Add wall art, mirrors, and decorative accessories.'
    };
  }
  return null;
}

// Check for missing plants
function checkMissingPlants(prompt: string): QualityViolation | null {
  const hasPlants = /plant|greenery|potted|indoor plant/i.test(prompt);
  
  if (!hasPlants) {
    return {
      type: 'MISSING_PLANTS',
      severity: 'medium',
      description: 'No plants or greenery specified.',
      auto_fixable: true,
      fix_suggestion: 'Add potted plants in appropriate planters.'
    };
  }
  return null;
}

// Run all quality checks and log violations
async function runQualityChecks(
  supabase: any, 
  prompt: string, 
  roomId: string, 
  renderId?: string,
  stage: string = 'generation'
): Promise<QualityViolation[]> {
  const violations: QualityViolation[] = [];
  
  const checks = [
    checkFanLightConflict(prompt),
    checkMissingCurtains(prompt),
    checkMissingDecor(prompt),
    checkMissingPlants(prompt),
  ];
  
  checks.forEach(v => {
    if (v) violations.push(v);
  });
  
  // Log violations to database
  if (violations.length > 0) {
    try {
      await supabase.from('quality_violations').insert(
        violations.map(v => ({
          room_id: roomId,
          render_id: renderId || null,
          rule_code: v.type,
          severity: v.severity,
          violation_description: v.description,
          detected_at_stage: stage,
          auto_fixed: false,
          fix_description: v.fix_suggestion
        }))
      );
      console.log(`⚠️ Logged ${violations.length} quality violations:`, violations.map(v => v.type).join(', '));
    } catch (e) {
      console.error('Failed to log quality violations:', e);
    }
  }
  
  return violations;
}

// Call AI for render generation
async function generateRender(cleanedImageUrl: string, prompt: string): Promise<any> {
  const startTime = Date.now();
  
  console.log('generateRender called with Gemini 3 Pro Image...');
  console.log('prompt length:', prompt?.length);
  console.log('prompt preview:', prompt?.slice(0, 300));
  console.log('cleanedImageUrl:', cleanedImageUrl?.slice(0, 100));
  
  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-3-pro-image-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Transform this empty room into a photorealistic interior design render. ${prompt}. 
              
Requirements:
- Magazine-quality photorealistic result
- Preserve all architectural elements (windows, doors, walls)
- Add furniture and decor matching the style
- Natural lighting and shadows
- High-end professional interior design aesthetic`
            },
            { type: "image_url", image_url: { url: cleanedImageUrl } }
          ]
        }
      ],
      modalities: ["image", "text"]
    }),
  });

  const latency = Date.now() - startTime;

  if (!response.ok) {
    const error = await response.text();
    console.error('Generate AI error response:', error);
    throw new Error(`Generate AI error: ${error}`);
  }

  const data = await response.json();
  console.log('Generate AI response received, checking for images...');
  
  const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
  
  if (!imageUrl) {
    console.error('No image URL in response:', JSON.stringify(data).slice(0, 500));
    throw new Error("No image generated - AI response did not contain an image");
  }

  console.log('Image generated successfully, length:', imageUrl.length);

  return {
    result: { imageUrl },
    usage: { costUsd: 0.04 },
    latency,
  };
}

// Helper to complete a job with fallback
async function completeJobWithFallback(supabase: any, jobId: string, result: any): Promise<void> {
  try {
    await supabase.rpc("complete_job", { p_job_id: jobId, p_result: result });
    console.log(`Job ${jobId} completed via RPC`);
  } catch (rpcError) {
    console.warn('RPC complete_job failed, using direct update:', rpcError);
    // Fallback: direct update
    const { error } = await supabase
      .from("job_queue")
      .update({ 
        status: 'completed', 
        completed_at: new Date().toISOString(),
        result: result,
        updated_at: new Date().toISOString()
      })
      .eq("id", jobId);
    
    if (error) {
      console.error('Direct update also failed:', error);
      throw error;
    }
    console.log(`Job ${jobId} completed via direct update`);
  }
}

// Helper to fail a job with fallback
async function failJobWithFallback(supabase: any, jobId: string, errorMessage: string): Promise<void> {
  try {
    await supabase.rpc("fail_job", { p_job_id: jobId, p_error_message: errorMessage });
    console.log(`Job ${jobId} failed via RPC`);
  } catch (rpcError) {
    console.warn('RPC fail_job failed, using direct update:', rpcError);
    // Fallback: direct update
    const { error } = await supabase
      .from("job_queue")
      .update({ 
        status: 'failed', 
        error_message: errorMessage,
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq("id", jobId);
    
    if (error) {
      console.error('Direct update also failed:', error);
    }
    console.log(`Job ${jobId} failed via direct update`);
  }
}

// Process a single job
async function processJob(supabase: any, job: any): Promise<void> {
  console.log(`[JOB ${job.id}] Starting processing - type: ${job.job_type}, room: ${job.room_id}`);
  const processStartTime = Date.now();

  try {
    // Claim job first to prevent duplicate processing
    console.log(`[JOB ${job.id}] Claiming job...`);
    const { data: claimResult } = await supabase.rpc("claim_job", { p_job_id: job.id });
    if (!claimResult) {
      console.log(`[JOB ${job.id}] Failed to claim - already processing or completed`);
      return;
    }
    console.log(`[JOB ${job.id}] Job claimed successfully`);
    let result: any;
    let userId: string | null = null;

    // Get project owner for notifications
    const { data: project } = await supabase
      .from("projects")
      .select("created_by, name")
      .eq("id", job.project_id)
      .single();

    userId = project?.created_by;

    // Get room info
    const { data: room } = await supabase
      .from("rooms")
      .select("*, room_images(*)")
      .eq("id", job.room_id)
      .single();

    switch (job.job_type) {
      case "analysis": {
        // Get original image
        const originalImage = room?.room_images?.find((img: any) => 
          img.image_type === "original" && img.phase === 1
        );
        
        if (!originalImage) {
          throw new Error("No original image found for analysis");
        }

        const imageUrl = await resolveRoomImageUrl(supabase, originalImage.storage_path);

        console.log('🚀 Starting room analysis:', {
          roomId: job.room_id,
          projectId: job.project_id,
          imageUrlPreview: imageUrl?.slice(0, 100),
          timestamp: new Date().toISOString()
        });

        const analysisResult = await generateWithRetry(
          () => analyzeRoom(imageUrl, job.project_id, job.room_id),
          { operation: 'analyzeRoom', roomId: job.room_id, projectId: job.project_id }
        );

        // Save to room_analysis
        const { error: analysisError } = await supabase
          .from("room_analysis")
          .upsert({
            room_id: job.room_id,
            detected_length_feet: analysisResult.result?.dimensions?.length_feet,
            detected_width_feet: analysisResult.result?.dimensions?.width_feet,
            detected_height_feet: analysisResult.result?.dimensions?.height_feet,
            window_count: analysisResult.result?.window_count,
            window_positions: analysisResult.result?.window_positions,
            door_count: analysisResult.result?.door_count,
            door_positions: analysisResult.result?.door_positions,
            ceiling_fan_count: analysisResult.result?.ceiling_features?.includes("fan") ? 1 : 0,
            outlet_count: analysisResult.result?.outlet_count,
            other_features: analysisResult.result?.architectural_features,
            suggested_styles: analysisResult.result?.suggested_styles,
            measurement_confidence: analysisResult.result?.measurement_confidence,
            raw_analysis_data: analysisResult.result,
            updated_at: new Date().toISOString(),
          }, { onConflict: "room_id" });

        if (analysisError) throw analysisError;

        // Update room phase
        await supabase
          .from("rooms")
          .update({ current_phase: 2, updated_at: new Date().toISOString() })
          .eq("id", job.room_id);

        // Log API call
        await logApiCall(supabase, {
          projectId: job.project_id,
          roomId: job.room_id,
          service: "lovable-ai",
          endpoint: "analyzeRoom",
          model: "gemini-2.5-flash",
          inputTokens: analysisResult.usage.inputTokens,
          outputTokens: analysisResult.usage.outputTokens,
          costUsd: analysisResult.usage.costUsd,
          latencyMs: analysisResult.latency,
          status: "success",
        });

        result = analysisResult.result;
        break;
      }

      case "cleaning": {
        const mask = job.payload?.mask;
        const refinementPrompt = job.payload?.refinementPrompt;
        const baseImageUrl = job.payload?.baseImageUrl;
        
        if (!mask) {
          throw new Error("No mask provided for cleaning");
        }

        let imageUrl: string;
        
        // If this is a refinement with a base image, use that
        if (refinementPrompt && baseImageUrl) {
          console.log('Processing cleaning refinement with base image');
          imageUrl = baseImageUrl;
        } else {
          // Get original image for initial cleaning
          const originalImage = room?.room_images?.find((img: any) => 
            img.image_type === "original" && img.phase === 1
          );
          
          if (!originalImage) {
            throw new Error("No original image found for cleaning");
          }

          imageUrl = await resolveRoomImageUrl(supabase, originalImage.storage_path);
        }

        console.log('🚀 Starting room cleaning:', {
          roomId: job.room_id,
          projectId: job.project_id,
          isRefinement: !!refinementPrompt,
          timestamp: new Date().toISOString()
        });

        const cleanResult = await generateWithRetry(
          () => cleanRoom(imageUrl, mask, refinementPrompt),
          { operation: 'cleanRoom', roomId: job.room_id, projectId: job.project_id }
        );

        // Save cleaned image
        const cleanedImagePath = `${job.project_id}/${job.room_id}/cleaned_${Date.now()}.png`;
        
        // Handle base64 or URL response
        let imageBlob: Blob;
        if (cleanResult.result.isBase64) {
          // Extract base64 data and convert to blob
          const base64Data = cleanResult.result.output.split(",")[1] || cleanResult.result.output;
          const binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
          imageBlob = new Blob([binaryData], { type: "image/png" });
        } else {
          // Download from URL
          const imageResponse = await fetch(cleanResult.result.output);
          imageBlob = await imageResponse.blob();
        }
        
        await supabase.storage
          .from("room-images")
          .upload(cleanedImagePath, imageBlob, { contentType: "image/png" });

        // Save to room_images
        await supabase.from("room_images").insert({
          room_id: job.room_id,
          phase: 3,
          image_type: "cleaned",
          file_name: `cleaned_${Date.now()}.png`,
          storage_path: cleanedImagePath,
          resolution: "original",
        });

        // Update room phase
        await supabase
          .from("rooms")
          .update({ phase_3_completed: true, current_phase: 4, updated_at: new Date().toISOString() })
          .eq("id", job.room_id);

        await logApiCall(supabase, {
          projectId: job.project_id,
          roomId: job.room_id,
          service: "lovable-ai",
          endpoint: "cleanRoom",
          model: "gemini-3-pro-image-preview",
          costUsd: cleanResult.usage.costUsd,
          latencyMs: cleanResult.latency,
          status: "success",
        });

        result = { cleanedImagePath };
        break;
      }

      case "generation": {
        const basePrompt = job.payload?.prompt || "";
        
        // Fetch smart default data if available
        let smartDefaultData = null;
        if (room?.smart_default_id) {
          const { data: sdData, error: sdError } = await supabase
            .from('smart_defaults')
            .select('*')
            .eq('id', room.smart_default_id)
            .single();
          
          if (sdData && !sdError) {
            smartDefaultData = sdData;
            console.log('✅ Using smart default:', sdData.style, sdData.room_type);
          } else if (sdError) {
            console.warn('⚠️ Failed to fetch smart default:', sdError.message);
          }
        }

        // Build enriched prompt with smart default details
        const smartDefaultDetails = buildSmartDefaultPromptDetails(smartDefaultData);
        const finalPrompt = basePrompt + smartDefaultDetails + ESSENTIAL_ELEMENTS;

        console.log('=== GENERATION PROMPT DETAILS ===');
        console.log('Smart default used:', !!smartDefaultData);
        console.log('Style:', smartDefaultData?.style || room?.selected_style || 'none');
        console.log('Room type:', smartDefaultData?.room_type || room?.room_type);
        console.log('Base prompt length:', basePrompt.length);
        console.log('Final prompt length:', finalPrompt.length);
        console.log('Prompt preview:', finalPrompt.substring(0, 500));
        console.log('=================================');
        
        // Get cleaned image
        const cleanedImage = room?.room_images?.find((img: any) => 
          img.image_type === "cleaned" && img.phase === 3
        );
        
        if (!cleanedImage) {
          throw new Error("No cleaned image found for generation");
        }

        const cleanedUrl = await resolveRoomImageUrl(supabase, cleanedImage.storage_path);

        console.log('🚀 Starting render generation:', {
          roomId: job.room_id,
          projectId: job.project_id,
          style: room?.selected_style || smartDefaultData?.style || 'none',
          roomType: room?.room_type || smartDefaultData?.room_type,
          smartDefaultUsed: !!smartDefaultData,
          promptLength: finalPrompt.length,
          timestamp: new Date().toISOString()
        });

        const genResult = await generateWithRetry(
          () => generateRender(cleanedUrl, finalPrompt),
          { operation: 'generateRender', roomId: job.room_id, projectId: job.project_id }
        );

        if (!genResult.result.imageUrl) {
          throw new Error("No image generated");
        }

        // Save generated image - it's base64, need to convert
        const renderImagePath = `${job.project_id}/${job.room_id}/render_${Date.now()}.png`;
        
        // Extract base64 data and upload
        const base64Data = genResult.result.imageUrl.split(",")[1];
        const binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
        
        await supabase.storage
          .from("room-images")
          .upload(renderImagePath, binaryData, { contentType: "image/png" });

        // Save to room_images
        await supabase.from("room_images").insert({
          room_id: job.room_id,
          phase: 5,
          image_type: "render",
          file_name: `render_${Date.now()}.png`,
          storage_path: renderImagePath,
          resolution: "high",
        });

        // ===== SAVE TO RENDERS TABLE (for approval workflow & version tracking) =====
        try {
          // Get signed URL for the render
          const { data: signedUrlData } = await supabase.storage
            .from("room-images")
            .createSignedUrl(renderImagePath, 86400 * 30); // 30 day expiry
          
          const renderImageUrl = signedUrlData?.signedUrl || renderImagePath;

          // Get version number and parent render for this room
          const { data: existingRenders } = await supabase
            .from("renders")
            .select("id, version_number")
            .eq("room_id", job.room_id)
            .order("version_number", { ascending: false })
            .limit(1);
          
          const newVersionNumber = (existingRenders?.[0]?.version_number || 0) + 1;
          const parentRenderId = existingRenders?.[0]?.id || null;

          // INSERT INTO RENDERS TABLE - Critical for approval workflow
          const { data: renderRecord, error: renderInsertError } = await supabase
            .from("renders")
            .insert({
              room_id: job.room_id,
              image_url: renderImageUrl,
              storage_path: renderImagePath,
              prompt_used: finalPrompt,
              model_used: "gemini-3-pro-image-preview",
              provider: "lovable-ai",
              generation_time_ms: genResult.latency,
              approval_status: "pending",
              quality_score: null, // Will be updated after scoring
              version_number: newVersionNumber,
              parent_render_id: parentRenderId,
              quality_details: {
                style: room?.selected_style || null,
                room_type: room?.room_type || null,
                smart_default_used: room?.smart_default_id !== null,
                phase: 5,
                generated_at: new Date().toISOString(),
              },
            })
            .select()
            .single();

          if (renderInsertError) {
            console.error("❌ Failed to insert render record:", renderInsertError);
            // Don't throw - room_images already has the image, approval workflow will be incomplete
          } else {
            console.log(`✅ Render saved to renders table: id=${renderRecord?.id}, version=${newVersionNumber}, room=${job.room_id}`);
            
            // Run quality checks on the prompt used
            const violations = await runQualityChecks(
              supabase,
              finalPrompt,
              job.room_id,
              renderRecord?.id,
              'generation'
            );
            
            if (violations.length > 0) {
              console.warn(`⚠️ Quality violations detected: ${violations.map(v => v.type).join(', ')}`);
            }
          }
        } catch (renderTableError) {
          console.error("❌ Error saving to renders table (non-fatal):", renderTableError);
          // Non-fatal: room_images still has the image, but approval workflow won't work for this render
        }

        // Update room phase
        await supabase
          .from("rooms")
          .update({ phase_5_completed: true, current_phase: 5, updated_at: new Date().toISOString() })
          .eq("id", job.room_id);

        await logApiCall(supabase, {
          projectId: job.project_id,
          roomId: job.room_id,
          service: "lovable-ai",
          endpoint: "generateRender",
          model: "gemini-3-pro-image-preview",
          costUsd: genResult.usage.costUsd,
          latencyMs: genResult.latency,
          status: "success",
        });

        result = { renderImagePath };
        break;
      }

      default:
        throw new Error(`Unknown job type: ${job.job_type}`);
    }

    // Complete the job with fallback
    const processDuration = Date.now() - processStartTime;
    console.log(`[JOB ${job.id}] Completed successfully in ${processDuration}ms`);
    await completeJobWithFallback(supabase, job.id, result);

    // Send success notification
    if (userId) {
      await sendNotification(supabase, userId, {
        title: `${job.job_type.charAt(0).toUpperCase() + job.job_type.slice(1)} Complete`,
        message: `Room ${room?.room_name || room?.room_number} ${job.job_type} completed successfully.`,
        type: "success",
        link: `/projects/${job.project_id}/rooms/${job.room_id}`,
      });
    }

  } catch (error) {
    const processDuration = Date.now() - processStartTime;
    const errorObj = error instanceof Error ? error : new Error(String(error));
    const errorMessage = errorObj.message || "Unknown error";
    const { errorType, suggestedAction, isRetryable } = classifyError(errorObj);

    console.error(`[JOB ${job.id}] Failed after ${processDuration}ms:`, {
      error: errorMessage,
      errorType,
      suggestedAction,
      isRetryable,
      jobType: job.job_type,
      roomId: job.room_id,
      projectId: job.project_id,
      retryCount: job.retry_count || 0,
      stack: errorObj.stack?.slice(0, 500),
      timestamp: new Date().toISOString()
    });

    // Fail the job with enhanced error message
    await failJobWithFallback(supabase, job.id, `[${errorType}] ${errorMessage}`);

    // Log error with detailed metadata
    await logApiCall(supabase, {
      projectId: job.project_id,
      roomId: job.room_id,
      service: "job-processor",
      endpoint: job.job_type,
      costUsd: 0,
      latencyMs: processDuration,
      status: "error",
      errorMessage,
      metadata: {
        errorType,
        suggestedAction,
        isRetryable,
        retryCount: job.retry_count || 0,
        processDuration
      }
    });
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = getAdminClient();
    const body = await req.json();
    const { action, jobId, projectId, roomId, phase, payload } = body;

    switch (action) {
      case "submit": {
        // Submit a new job - accept either phase number or jobType directly
        const { jobType: directJobType } = body;
        const jobType = directJobType || 
          (phase === 2 ? "analysis" : phase === 3 ? "cleaning" : phase === 5 ? "generation" : null);
        
        if (!jobType || !["analysis", "cleaning", "generation"].includes(jobType)) {
          throw new Error(`Invalid phase (${phase}) or jobType (${directJobType})`);
        }

        const { data: job, error } = await supabase
          .from("job_queue")
          .insert({
            job_type: jobType,
            room_id: roomId,
            project_id: projectId,
            payload: payload || {},
            priority: payload?.priority || 5,
          })
          .select()
          .single();

        if (error) throw error;

        // Start processing in background
        EdgeRuntime.waitUntil(processJob(supabase, job));

        return new Response(JSON.stringify({ success: true, job }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "submitBulk": {
        // Submit jobs for all rooms in a project
        const { data: rooms, error: roomsError } = await supabase
          .from("rooms")
          .select("id, room_number")
          .eq("project_id", projectId)
          .order("room_number");

        if (roomsError) throw roomsError;

        const jobType = phase === 2 ? "analysis" : phase === 3 ? "cleaning" : phase === 5 ? "generation" : null;
        if (!jobType) throw new Error(`Invalid phase: ${phase}`);

        const jobs = rooms.map((room, index) => ({
          job_type: jobType,
          room_id: room.id,
          project_id: projectId,
          payload: payload || {},
          priority: 10 - index, // Higher priority for earlier rooms
        }));

        const { data: insertedJobs, error: insertError } = await supabase
          .from("job_queue")
          .insert(jobs)
          .select();

        if (insertError) throw insertError;

        // Process jobs sequentially in background
        EdgeRuntime.waitUntil((async () => {
          for (const job of insertedJobs) {
            await processJob(supabase, job);
            // Small delay between jobs to respect rate limits
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        })());

        return new Response(JSON.stringify({ 
          success: true, 
          jobCount: insertedJobs.length,
          jobs: insertedJobs 
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "process": {
        // Process a specific job
        const { data: job, error } = await supabase
          .from("job_queue")
          .select("*")
          .eq("id", jobId)
          .single();

        if (error) throw error;

        // Claim the job
        const claimed = await supabase.rpc("claim_job", { p_job_id: jobId });
        if (!claimed) {
          throw new Error("Job already claimed or not available");
        }

        EdgeRuntime.waitUntil(processJob(supabase, job));

        return new Response(JSON.stringify({ success: true, message: "Job processing started" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "retry": {
        // Retry a failed job OR a pending job that has an error_message (stuck retries)
        const nowIso = new Date().toISOString();

        const { error } = await supabase
          .from("job_queue")
          .update({
            status: "pending",
            error_message: null,
            scheduled_at: nowIso,
            started_at: null,
            completed_at: null,
            updated_at: nowIso,
          })
          .eq("id", jobId)
          .in("status", ["failed", "pending", "cancelled"]);

        if (error) throw error;

        return new Response(JSON.stringify({ success: true, message: "Job queued for retry" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "cancel": {
        const { error } = await supabase
          .from("job_queue")
          .update({ status: "cancelled", updated_at: new Date().toISOString() })
          .eq("id", jobId)
          .in("status", ["pending", "processing"]);

        if (error) throw error;

        return new Response(JSON.stringify({ success: true, message: "Job cancelled" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "status": {
        // Get job status
        const { data: job, error } = await supabase
          .from("job_queue")
          .select("*")
          .eq("id", jobId)
          .single();

        if (error) throw error;

        return new Response(JSON.stringify({ success: true, job }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "projectStatus": {
        // Get all jobs for a project
        const { data: jobs, error } = await supabase
          .from("job_queue")
          .select("*")
          .eq("project_id", projectId)
          .order("created_at", { ascending: false });

        if (error) throw error;

        const summary = {
          total: jobs.length,
          pending: jobs.filter(j => j.status === "pending").length,
          processing: jobs.filter(j => j.status === "processing").length,
          completed: jobs.filter(j => j.status === "completed").length,
          failed: jobs.filter(j => j.status === "failed").length,
        };

        return new Response(JSON.stringify({ success: true, jobs, summary }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      default:
        throw new Error(`Unknown action: ${action}`);
    }

  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
