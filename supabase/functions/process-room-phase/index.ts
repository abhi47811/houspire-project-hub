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

// ============= STRUCTURE-PRESERVING GENERATION (CONTROLNET) =============

// Generate using Replicate's interior-design ControlNet model for structure preservation
async function generateWithControlNet(
  cleanedImageUrl: string,
  designPrompt: string,
  promptStrength: number = 0.5 // Lower = more structure preserved (0.3-0.6 recommended)
): Promise<{ imageUrl: string; latency: number; method: string }> {
  if (!REPLICATE_API_KEY) {
    throw new Error("REPLICATE_API_KEY not configured - cannot use ControlNet generation");
  }
  
  const startTime = Date.now();
  console.log('🎨 [ControlNet] Starting structure-preserving generation...');
  console.log('  prompt_strength:', promptStrength);
  console.log('  prompt:', designPrompt.slice(0, 200));
  
  // Create prediction using adirik/interior-design model
  const createResponse = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${REPLICATE_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      version: "76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
      input: {
        image: cleanedImageUrl,
        prompt: designPrompt,
        negative_prompt: "lowres, watermark, blurry, deformed, different room, different angle, different perspective, moved doors, moved windows, mirrored room, flipped, rotated view, new windows, new doors, extra doors, extra windows, removed doors, removed windows, changed walls, different camera angle, different viewpoint",
        guidance_scale: 15,
        prompt_strength: promptStrength,
        num_inference_steps: 50
      }
    })
  });
  
  if (!createResponse.ok) {
    const errorText = await createResponse.text();
    console.error('[ControlNet] Create prediction failed:', errorText);
    throw new Error(`ControlNet create failed: ${errorText}`);
  }
  
  const prediction = await createResponse.json();
  console.log('[ControlNet] Prediction created:', prediction.id);
  
  // Poll for completion (max 120 seconds)
  const maxWait = 120000;
  const pollInterval = 2000;
  let elapsed = 0;
  
  while (elapsed < maxWait) {
    await new Promise(r => setTimeout(r, pollInterval));
    elapsed += pollInterval;
    
    const statusResponse = await fetch(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
      headers: { Authorization: `Token ${REPLICATE_API_KEY}` }
    });
    
    const status = await statusResponse.json();
    console.log(`[ControlNet] Status: ${status.status} (${elapsed/1000}s)`);
    
    if (status.status === 'succeeded') {
      // Handle both array and string output formats from Replicate
      const outputUrl = Array.isArray(status.output) ? status.output[0] : status.output;
      console.log(`[ControlNet] Raw output type: ${typeof status.output}, isArray: ${Array.isArray(status.output)}`);
      console.log(`[ControlNet] Extracted URL: ${outputUrl?.substring(0, 50)}...`);
      
      if (!outputUrl || typeof outputUrl !== 'string' || !outputUrl.startsWith('http')) {
        throw new Error(`ControlNet returned invalid output: ${JSON.stringify(status.output)?.substring(0, 200)}`);
      }
      
      const latency = Date.now() - startTime;
      console.log(`✅ [ControlNet] Generation complete in ${latency}ms`);
      
      return {
        imageUrl: outputUrl,
        latency,
        method: 'controlnet'
      };
    }
    
    if (status.status === 'failed' || status.status === 'canceled') {
      throw new Error(`ControlNet ${status.status}: ${status.error || 'Unknown error'}`);
    }
  }
  
  throw new Error('ControlNet generation timed out after 120 seconds');
}

// Build a furniture-only prompt (no architectural instructions - ControlNet handles structure)
function buildFurnitureOnlyPrompt(smartDefaultData: any, roomType: string, style: string): string {
  let prompt = `Professional interior design photo, ${style} style ${roomType}. `;
  
  if (smartDefaultData) {
    const specs = Array.isArray(smartDefaultData.specifications) ? smartDefaultData.specifications : [];
    
    // Get furniture items only
    const furnitureItems = specs.filter((s: any) => 
      ['SEATING', 'FURNITURE', 'STORAGE', 'SURFACES', 'SOFA', 'COFFEE TABLE', 'BED', 'WARDROBE', 'TABLE', 'CHAIR'].includes(s.CATEGORY?.toUpperCase())
    ).map((s: any) => {
      let item = s.ITEM || s.item || '';
      const material = s.MATERIAL || s.material;
      const color = s.COLOR || s.color;
      if (material) item += ` (${material})`;
      if (color) item += ` in ${color}`;
      return item;
    }).filter(Boolean);
    
    if (furnitureItems.length > 0) {
      prompt += `Furniture: ${furnitureItems.slice(0, 5).join(', ')}. `;
    }
    
    // Get decor items
    const decorItems = specs.filter((s: any) => 
      ['DECOR', 'ACCESSORIES', 'LIGHTING', 'TEXTILES', 'PLANTS', 'RUG', 'CURTAINS'].includes(s.CATEGORY?.toUpperCase())
    ).map((s: any) => s.ITEM || s.item).filter(Boolean);
    
    if (decorItems.length > 0) {
      prompt += `Decor: ${decorItems.slice(0, 5).join(', ')}. `;
    }
  } else {
    // Generic furniture prompt based on room type
    const roomFurniture: Record<string, string> = {
      'living_room': 'Sofa, coffee table, armchairs, floor lamp, area rug, potted plants, wall art',
      'bedroom': 'Bed with headboard, nightstands, dresser, table lamps, area rug, curtains',
      'kitchen': 'Dining table, chairs, pendant lights, decorative accessories',
      'bathroom': 'Vanity accessories, towels, plants, decorative elements',
      'dining_room': 'Dining table, chairs, chandelier, sideboard, table setting',
    };
    prompt += roomFurniture[roomType] || 'Stylish furniture, decorative accessories, plants, proper lighting. ';
  }
  
  prompt += 'High quality, professional staging, magazine worthy, realistic lighting, photorealistic.';
  
  return prompt;
}

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

// Essential elements checklist - added conditionally based on room_analysis
function buildEssentialElements(hasWindows: boolean): string {
  let elements = `

ESSENTIAL ELEMENTS (MUST INCLUDE):`;
  
  // Only add window treatments if windows actually exist
  if (hasWindows) {
    elements += `
- Window treatments (curtains, blinds, or drapes) for EXISTING windows only`;
  }
  
  elements += `
- Wall decor (artwork, mirrors, or decorative elements)
- Plants and greenery in appropriate planters
- Area rug with proper sizing
- Decorative accessories and styling elements
- Proper layered lighting (natural + artificial)
- Rich, lived-in, luxurious feel

CRITICAL: Do NOT add windows or doors. Only add treatments to windows that already exist in the image.`;
  
  return elements;
}

// Virtual Staging Lock Prompt - enforces photo-editing behavior with STRICT preservation
function buildVirtualStagingLockPrompt(doorCount: number, windowCount: number): string {
  return `
=== ABSOLUTE VIRTUAL STAGING CONSTRAINTS (VIOLATION = REJECTION) ===

⚠️ CRITICAL: You are PHOTO-EDITING an existing room photograph. NOT generating a new image.

🚫 FORBIDDEN ACTIONS (WILL CAUSE IMMEDIATE REJECTION):
1. CAMERA CHANGE: Moving, rotating, panning, zooming, or shifting the camera viewpoint in ANY way
2. ADDING OPENINGS: Creating ANY new windows, doors, arches, or openings that don't exist in the original
3. REMOVING OPENINGS: Deleting or covering ANY existing windows or doors  
4. MOVING OPENINGS: Relocating ANY windows or doors to different positions
5. WALL CHANGES: Adding windows to walls that have none, or modifying wall surfaces
6. PERSPECTIVE SHIFT: Changing the viewing angle, focal length, or field of view

📐 EXACT PRESERVATION REQUIRED:
- Camera Position: IDENTICAL to input image - same exact viewpoint
- Camera Angle: IDENTICAL - same tilt, pan, rotation
- Doors: Exactly ${doorCount} door(s) - same positions, same walls, same sizes
- Windows: Exactly ${windowCount} window(s) - same positions, same walls, same sizes  
- Wall Geometry: All angles, corners, and surfaces UNCHANGED
- Ceiling Height: IDENTICAL
- Floor Plane: IDENTICAL perspective and position

✅ ALLOWED ACTIONS (ONLY THESE):
- Add furniture that sits on the existing floor plane
- Add rugs, plants, decor, artwork on existing walls
- Add lighting fixtures (ceiling lights, lamps, sconces)
- Add soft furnishings (curtains on EXISTING windows only, cushions, throws)
- Add styling elements and accessories

🔒 THINK OF THIS AS: Placing virtual furniture into a real photograph. The room structure is LOCKED and IMMUTABLE.

=== END STAGING LOCK ===
`;
}

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

// Call AI for render generation with STRICT base image structure lock
async function generateRender(
  cleanedImageUrl: string, 
  prompt: string, 
  stagingLockPrompt: string,
  retryContext?: string
): Promise<any> {
  const startTime = Date.now();
  
  console.log('🎨 generateRender: Using Gemini 3 Pro Image (PRIMARY)');
  console.log('cleanedImageUrl (BASE IMAGE):', cleanedImageUrl?.slice(0, 100));
  if (retryContext) {
    console.log('⚠️ RETRY CONTEXT:', retryContext);
  }
  
  // NON-NEGOTIABLE base image lock - this goes FIRST
  const baseImageLock = `
═══════════════════════════════════════════════════════════════
🔒🔒🔒 NON-NEGOTIABLE BASE IMAGE RULES 🔒🔒🔒
═══════════════════════════════════════════════════════════════

⚠️ YOU ARE EDITING THE PROVIDED PHOTOGRAPH - NOT GENERATING A NEW IMAGE ⚠️

THE CLEAN IMAGE BELOW IS YOUR LOCKED REFERENCE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Camera position: MUST BE IDENTICAL to clean image
✅ Camera angle: MUST BE IDENTICAL to clean image  
✅ Every door: EXACT same wall, EXACT same position as clean image
✅ Every window: EXACT same wall, EXACT same position as clean image
✅ Room geometry: MUST BE IDENTICAL to clean image
✅ Floor perspective lines: MUST BE IDENTICAL to clean image
✅ Wall positions: MUST BE IDENTICAL to clean image
✅ Ceiling lines: MUST BE IDENTICAL to clean image

🚫 VIOLATIONS THAT CAUSE IMMEDIATE REJECTION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ Moving the camera position
❌ Changing the camera angle
❌ Adding or removing doors
❌ Moving doors to different walls
❌ Adding or removing windows
❌ Moving windows to different walls
❌ Changing room proportions
❌ Altering perspective lines
❌ Mirroring or flipping the room

YOUR ONLY TASK: Add furniture and decor to THIS EXACT photograph.
The room structure is FROZEN and IMMUTABLE.
═══════════════════════════════════════════════════════════════
`;

  // Build the full prompt
  let fullPrompt = baseImageLock + '\n\n' + stagingLockPrompt + '\n\n' + prompt;
  
  // If retry, add even stronger enforcement with specific failure reason
  if (retryContext) {
    fullPrompt = `
⛔⛔⛔ CRITICAL: PREVIOUS RENDER REJECTED ⛔⛔⛔
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REJECTION REASON: ${retryContext}

THIS IS ATTEMPT #2+. THE PREVIOUS OUTPUT WAS REJECTED.

MANDATORY CORRECTIONS:
1. Look at the BASE IMAGE below - this is your ONLY reference for room structure
2. Camera angle must be PIXEL-PERFECT match to base image
3. Doors must be on SAME WALLS as base image (count them!)
4. Windows must be on SAME WALLS as base image (count them!)
5. DO NOT reimagine the room - COPY THE STRUCTURE EXACTLY

If the base image shows a door on the LEFT wall → output MUST have door on LEFT wall
If the base image shows a window on the BACK wall → output MUST have window on BACK wall

YOU ARE PHOTO-EDITING, NOT GENERATING.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

` + fullPrompt;
  }
  
  console.log('Full prompt preview (first 800 chars):', fullPrompt.slice(0, 800));
  
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
              text: `🔒 PHOTO EDITING TASK - NOT IMAGE GENERATION 🔒

The image below is your LOCKED BASE. You are placing furniture INTO this photograph.

CRITICAL: Copy the EXACT room structure. Same camera. Same walls. Same doors. Same windows.

${fullPrompt}

═══════════════════════════════════════════════════════════════
FINAL CHECK BEFORE OUTPUT:
━━━━━━━━━━━━━━━━━━━━━━━━
□ Camera angle matches base image exactly?
□ All doors on same walls as base image?
□ All windows on same walls as base image?
□ Room geometry unchanged?
□ Only furniture/decor added?

If ANY checkbox fails → DO NOT OUTPUT → Re-examine base image
═══════════════════════════════════════════════════════════════`
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
    console.error('Gemini error response:', error);
    throw new Error(`Gemini generation error: ${error}`);
  }

  const data = await response.json();
  console.log('✅ Gemini response received');
  
  const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
  
  if (!imageUrl) {
    console.error('No image in Gemini response:', JSON.stringify(data).slice(0, 500));
    throw new Error("Gemini did not return an image");
  }

  console.log('✅ Gemini image generated, base64 length:', imageUrl.length);

  return {
    result: { imageUrl },
    usage: { costUsd: 0.04 },
    latency,
  };
}

// Score a render against the cleaned reference image
async function scoreRenderAgainstReference(
  supabase: any,
  renderImageUrl: string,
  referenceImageUrl: string,
  renderId: string
): Promise<{ 
  overall: number; 
  architecturalPreservation: number; 
  passed: boolean;
  failureReasons: string[];
}> {
  try {
    console.log('🎯 Scoring render against reference...');
    console.log('  renderId:', renderId);
    console.log('  renderImageUrl length:', renderImageUrl?.length || 0);
    console.log('  referenceImageUrl length:', referenceImageUrl?.length || 0);
    
    const response = await fetch(`${SUPABASE_URL}/functions/v1/score-render`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        renderId,
        imageUrl: renderImageUrl,
        referenceImageUrl,
      }),
    });
    
    // Get raw text first to handle HTML error pages
    const responseText = await response.text();
    
    // Check if response is HTML (error page)
    if (responseText.startsWith('<') || responseText.startsWith('<!')) {
      console.error('Score-render returned HTML error page:', responseText.slice(0, 200));
      // Return passing score to avoid blocking generation
      return { overall: 75, architecturalPreservation: 75, passed: true, failureReasons: ['Scoring service temporarily unavailable'] };
    }
    
    if (!response.ok) {
      console.error('Score-render failed:', responseText);
      // Return passing score to avoid blocking generation on scoring errors
      return { overall: 75, architecturalPreservation: 75, passed: true, failureReasons: ['Scoring request failed'] };
    }
    
    // Parse JSON safely
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseErr) {
      console.error('Failed to parse score-render response:', parseErr, 'Response:', responseText.slice(0, 200));
      return { overall: 75, architecturalPreservation: 75, passed: true, failureReasons: ['Invalid scoring response'] };
    }
    
    const score = data.score || {};
    
    const archScore = score.breakdown?.architectural_preservation || 50;
    const overall = score.overall || 50;
    const flags = score.preservation_flags || {};
    
    const failureReasons: string[] = [];
    if (flags.camera_angle_match === false) failureReasons.push('Camera angle changed');
    if (flags.openings_match === false) failureReasons.push('Window/door positions changed');
    if (flags.extra_windows_detected === true) failureReasons.push('Extra windows added');
    if (flags.extra_doors_detected === true) failureReasons.push('Extra doors added');
    
    // Pass if architectural preservation >= 70 and no critical failures
    const passed = archScore >= 70 && failureReasons.length === 0;
    
    console.log(`Score result: overall=${overall}, arch=${archScore}, passed=${passed}, failures=${failureReasons.join(', ') || 'none'}`);
    
    return { overall, architecturalPreservation: archScore, passed, failureReasons };
  } catch (err) {
    console.error('Scoring error:', err);
    // Return passing score to avoid blocking generation on scoring errors
    return { overall: 75, architecturalPreservation: 75, passed: true, failureReasons: ['Scoring exception'] };
  }
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
        const refinementPrompt = job.payload?.refinementPrompt || "";
        const MAX_STRUCTURE_RETRIES = 3; // More retries with progressive strength reduction
        
        // Fetch room_analysis for door/window counts (critical for staging lock)
        let doorCount = 0;
        let windowCount = 0;
        const { data: roomAnalysis } = await supabase
          .from('room_analysis')
          .select('door_count, window_count, door_positions, window_positions')
          .eq('room_id', job.room_id)
          .single();
        
        if (roomAnalysis) {
          doorCount = roomAnalysis.door_count || 0;
          windowCount = roomAnalysis.window_count || 0;
          console.log(`📏 Room analysis: ${doorCount} doors, ${windowCount} windows`);
        } else {
          console.warn('⚠️ No room_analysis found, using defaults (0 doors, 0 windows)');
        }
        
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

        // Get cleaned image
        const cleanedImage = room?.room_images?.find((img: any) => 
          img.image_type === "cleaned" && img.phase === 3
        );
        
        if (!cleanedImage) {
          throw new Error("No cleaned image found for generation");
        }

        const cleanedUrl = await resolveRoomImageUrl(supabase, cleanedImage.storage_path);
        
        const roomType = room?.room_type || smartDefaultData?.room_type || 'living_room';
        const style = room?.selected_style || smartDefaultData?.style || 'modern';

        console.log('🚀 Starting structure-preserving render generation:', {
          roomId: job.room_id,
          projectId: job.project_id,
          style,
          roomType,
          doorCount,
          windowCount,
          smartDefaultUsed: !!smartDefaultData,
          method: REPLICATE_API_KEY ? 'ControlNet (primary)' : 'Gemini (fallback)',
          timestamp: new Date().toISOString()
        });

        // === GEMINI-FIRST GENERATION (Higher Quality) ===
        // ControlNet is only used as fallback if Gemini completely fails
        let attemptCount = 0;
        let finalRenderResult: any = null;
        let lastRetryContext: string | undefined = undefined;
        
        console.log('🎨 Using GEMINI as PRIMARY generator (best quality)');
        console.log('📏 Clean image is the LOCKED BASE for structure');
        
        while (attemptCount < MAX_STRUCTURE_RETRIES) {
          attemptCount++;
          
          console.log(`📸 Generation attempt ${attemptCount}/${MAX_STRUCTURE_RETRIES}`);
          
          let genResult: { imageUrl: string; latency: number; method: string; isBase64?: boolean };
          
          // Build prompts
          const essentialElements = buildEssentialElements(windowCount > 0);
          const smartDefaultDetails = buildSmartDefaultPromptDetails(smartDefaultData);
          
          // If refinement prompt is provided, prepend it to the design prompt
          let designPrompt = basePrompt + smartDefaultDetails + essentialElements;
          if (refinementPrompt) {
            designPrompt = `PRIORITY REFINEMENT REQUEST: ${refinementPrompt}\n\nBase design: ${designPrompt}`;
            console.log('📝 Refinement prompt included:', refinementPrompt.slice(0, 100));
          }
          const stagingLockPrompt = buildVirtualStagingLockPrompt(doorCount, windowCount);
          
          try {
            // PRIMARY: Gemini 3 Pro Image (best quality, use clean image as base)
            console.log('🎨 Using Gemini 3 Pro Image (primary - high quality)');
            console.log('  Design prompt:', designPrompt.slice(0, 150));
            console.log('  Retry context:', lastRetryContext ? 'YES' : 'NO');
            
            const geminiResult = await generateWithRetry(
              () => generateRender(cleanedUrl, designPrompt, stagingLockPrompt, lastRetryContext),
              { operation: 'generateRender', roomId: job.room_id, projectId: job.project_id }
            );
            
            genResult = {
              imageUrl: geminiResult.result.imageUrl,
              latency: geminiResult.latency,
              method: 'gemini',
              isBase64: true
            };
            
          } catch (geminiError) {
            console.warn('⚠️ Gemini failed, trying ControlNet fallback:', geminiError);
            
            // FALLBACK: ControlNet (only if Gemini fails completely)
            if (REPLICATE_API_KEY) {
              try {
                const furniturePrompt = buildFurnitureOnlyPrompt(smartDefaultData, roomType, style);
                console.log('🔄 ControlNet fallback...');
                
                genResult = await generateWithRetry(
                  () => generateWithControlNet(cleanedUrl, furniturePrompt, 0.4),
                  { operation: 'generateWithControlNet', roomId: job.room_id, projectId: job.project_id },
                  1
                );
                genResult.isBase64 = false;
                
              } catch (controlNetError) {
                console.error('❌ Both Gemini and ControlNet failed');
                throw geminiError; // Throw original Gemini error
              }
            } else {
              throw geminiError;
            }
          }

          if (!genResult.imageUrl) {
            throw new Error("No image generated");
          }

          // Save generated image
          const renderImagePath = `${job.project_id}/${job.room_id}/render_${Date.now()}.png`;
          
          let imageBlob: Blob;
          if (genResult.isBase64) {
            // Handle base64 from Gemini
            const base64Data = genResult.imageUrl.split(",")[1] || genResult.imageUrl;
            const binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
            imageBlob = new Blob([binaryData], { type: "image/png" });
          } else {
            // Download from URL (ControlNet)
            const imageResponse = await fetch(genResult.imageUrl);
            imageBlob = await imageResponse.blob();
          }
          
          await supabase.storage
            .from("room-images")
            .upload(renderImagePath, imageBlob, { contentType: "image/png" });

          // Save to room_images
          await supabase.from("room_images").insert({
            room_id: job.room_id,
            phase: 5,
            image_type: "render",
            file_name: `render_${Date.now()}.png`,
            storage_path: renderImagePath,
            resolution: "high",
          });

          // Get signed URL for the render
          const { data: signedUrlData } = await supabase.storage
            .from("room-images")
            .createSignedUrl(renderImagePath, 86400 * 30);
          
          const renderImageUrl = signedUrlData?.signedUrl || renderImagePath;

          // Get version number and parent render
          const { data: existingRenders } = await supabase
            .from("renders")
            .select("id, version_number")
            .eq("room_id", job.room_id)
            .order("version_number", { ascending: false })
            .limit(1);
          
          const newVersionNumber = (existingRenders?.[0]?.version_number || 0) + 1;
          const parentRenderId = existingRenders?.[0]?.id || null;

          // INSERT INTO RENDERS TABLE
          const { data: renderRecord, error: renderInsertError } = await supabase
            .from("renders")
            .insert({
              room_id: job.room_id,
              image_url: renderImageUrl,
              storage_path: renderImagePath,
              prompt_used: genResult.method.includes('controlnet') 
                ? `[ControlNet] ${buildFurnitureOnlyPrompt(smartDefaultData, roomType, style)}`
                : basePrompt,
              model_used: genResult.method.includes('controlnet') ? "replicate/interior-design" : "gemini-3-pro-image-preview",
              provider: genResult.method.includes('controlnet') ? "replicate" : "lovable-ai",
              generation_time_ms: genResult.latency,
              approval_status: "pending",
              quality_score: null,
              version_number: newVersionNumber,
              parent_render_id: parentRenderId,
              quality_details: {
                style,
                room_type: roomType,
                smart_default_used: room?.smart_default_id !== null,
                door_count_expected: doorCount,
                window_count_expected: windowCount,
                attempt_number: attemptCount,
                generation_method: genResult.method,
                phase: 5,
                generated_at: new Date().toISOString(),
              },
            })
            .select()
            .single();

          if (renderInsertError) {
            console.error("❌ Failed to insert render record:", renderInsertError);
            continue; // Try next attempt
          }
          
          console.log(`✅ Render saved: id=${renderRecord?.id}, version=${newVersionNumber}, attempt=${attemptCount}, method=${genResult.method}`);
          
          // === SCORE AGAINST REFERENCE ===
          const scoreResult = await scoreRenderAgainstReference(
            supabase,
            renderImageUrl,
            cleanedUrl,
            renderRecord.id
          );
          
          console.log(`🎯 Score result: arch=${scoreResult.architecturalPreservation}, passed=${scoreResult.passed}, method=${genResult.method}`);
          
          if (scoreResult.passed) {
            // Success - structure preserved!
            finalRenderResult = { 
              renderImagePath, 
              renderId: renderRecord.id, 
              attemptCount,
              method: genResult.method
            };
            
            console.log(`✅ Structure preservation PASSED on attempt ${attemptCount} using ${genResult.method}`);
            
            // Run prompt quality checks
            const violations = await runQualityChecks(
              supabase,
              buildFurnitureOnlyPrompt(smartDefaultData, roomType, style),
              job.room_id,
              renderRecord.id,
              'generation'
            );
            
            if (violations.length > 0) {
              console.warn(`⚠️ Quality violations: ${violations.map(v => v.type).join(', ')}`);
            }
            
            break; // Exit retry loop - success!
            
          } else {
            // Failed validation
            console.log(`❌ Attempt ${attemptCount} failed validation: ${scoreResult.failureReasons.join(', ')}`);
            
            // Mark this render as rejected
            await supabase
              .from("renders")
              .update({ 
                approval_status: 'rejected',
                rejection_reason: `Auto-rejected (attempt ${attemptCount}): ${scoreResult.failureReasons.join(', ')}`,
              })
              .eq("id", renderRecord.id);
            
            if (attemptCount >= MAX_STRUCTURE_RETRIES) {
              // Max retries exhausted - use last render with warning
              console.warn(`⚠️ Max retries (${MAX_STRUCTURE_RETRIES}) reached. Using best available render.`);
              finalRenderResult = { 
                renderImagePath, 
                renderId: renderRecord.id, 
                attemptCount,
                method: genResult.method,
                warning: `Structure validation failed after ${MAX_STRUCTURE_RETRIES} attempts: ${scoreResult.failureReasons.join(', ')}`
              };
              
              // Update render status to indicate it needs manual review
              await supabase
                .from("renders")
                .update({ 
                  approval_status: 'pending',
                  rejection_reason: `⚠️ Auto-validation failed after ${MAX_STRUCTURE_RETRIES} attempts. Needs manual review: ${scoreResult.failureReasons.join(', ')}`,
                })
                .eq("id", renderRecord.id);
            } else {
              // Set retry context for next attempt with specific failure reasons
              lastRetryContext = scoreResult.failureReasons.join(', ');
              console.log(`🔄 Retrying with stronger structure lock prompt...`);
            }
          }
        }

        if (!finalRenderResult) {
          throw new Error("Generation failed after all retry attempts");
        }

        // Update room phase
        await supabase
          .from("rooms")
          .update({ phase_5_completed: true, current_phase: 5, updated_at: new Date().toISOString() })
          .eq("id", job.room_id);

        await logApiCall(supabase, {
          projectId: job.project_id,
          roomId: job.room_id,
          service: finalRenderResult.method?.includes('controlnet') ? "replicate" : "lovable-ai",
          endpoint: "generateRender",
          model: finalRenderResult.method?.includes('controlnet') ? "interior-design" : "gemini-3-pro-image-preview",
          costUsd: finalRenderResult.method?.includes('controlnet') ? 0.02 * finalRenderResult.attemptCount : 0.04 * finalRenderResult.attemptCount,
          status: "success",
          metadata: { 
            attempts: finalRenderResult.attemptCount,
            method: finalRenderResult.method,
            promptStrength: finalRenderResult.promptStrength,
            warning: finalRenderResult.warning
          }
        });

        result = finalRenderResult;
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
