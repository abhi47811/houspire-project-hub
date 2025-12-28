/**
 * ============================================================================
 * ENHANCED AI GENERATION EDGE FUNCTION
 * ============================================================================
 * Purpose: Generate renders using comprehensive prompts that combine:
 *   - Smart defaults (specifications, checklist, finishes)
 *   - Library references (proven images with metadata)
 *   - Custom requirements (user input)
 * ============================================================================
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const OPENROUTER_API_KEY = Deno.env.get("OPENROUTER_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

// ============================================================================
// KNOWLEDGE BASE IMPORT - Enhanced Prompt Building
// ============================================================================

import { buildEnhancedPrompt, STYLE_PROMPTS } from "./knowledge-base.ts";

interface PromptBuilderInput {
  roomType: string;
  selectedStyle: string;
  smartDefaultData?: any;
  libraryImageData?: any;
  customRequirements?: string;
  city?: string;
  budgetTier?: string;
}

/**
 * Build a comprehensive prompt combining knowledge base + all data sources
 * Now uses the 180KB+ knowledge base for 85-95% quality renders
 */
function buildComprehensivePrompt(input: PromptBuilderInput): string {
  // Use the enhanced prompt builder with full knowledge base
  return buildEnhancedPrompt(input);
}

// ============================================================================
// DATA FETCHERS
// ============================================================================

async function fetchRoomData(supabase: any, roomId: string) {
  const { data: room, error } = await supabase
    .from('rooms')
    .select(`
      *,
      projects (
        city,
        budget_tier
      ),
      room_analysis (
        ceiling_fan_count
      )
    `)
    .eq('id', roomId)
    .single();
  
  if (error) {
    console.error('Error fetching room:', error);
    throw new Error(`Failed to fetch room data: ${error.message}`);
  }
  
  return room;
}

async function fetchQualityControlRules(supabase: any) {
  const { data: rules, error } = await supabase
    .from('quality_control_rules')
    .select('*')
    .eq('is_active', true);
  
  if (error) {
    console.warn('Error fetching quality control rules:', error);
    return [];
  }
  
  return rules || [];
}

function buildQualityControlPromptAdditions(room: any, rules: any[]): string {
  const additions: string[] = [];
  
  // Check for ceiling fan presence
  const hasCeilingFan = 
    room.ceiling_fan_detected === true || 
    (room.room_analysis?.ceiling_fan_count && room.room_analysis.ceiling_fan_count > 0);
  
  for (const rule of rules) {
    if (rule.rule_code === 'FAN_LIGHT_CONFLICT' && hasCeilingFan) {
      console.log('🚨 Quality Control: Applying FAN_LIGHT_CONFLICT rule');
      additions.push(rule.prompt_instruction);
    }
    // Add more rule checks here as needed
  }
  
  if (additions.length > 0) {
    return `\n\n## QUALITY CONTROL RULES (MUST FOLLOW):\n${additions.join('\n\n')}`;
  }
  
  return '';
}

async function fetchSmartDefaultData(supabase: any, smartDefaultId: string) {
  if (!smartDefaultId) return null;
  
  const { data, error } = await supabase
    .from('smart_defaults')
    .select('specifications, checklist, finishes, style, room_type')
    .eq('id', smartDefaultId)
    .single();
  
  if (error) {
    console.warn('Error fetching smart defaults:', error);
    return null;
  }
  
  return data;
}

async function fetchLibraryImageData(supabase: any, libraryReferenceId: string) {
  if (!libraryReferenceId) return null;
  
  const { data, error } = await supabase
    .from('style_library')
    .select('image_url, color_palette, analysis_data, design_style, room_type')
    .eq('id', libraryReferenceId)
    .single();
  
  if (error) {
    console.warn('Error fetching library image:', error);
    return null;
  }
  
  return data;
}

// ============================================================================
// AI GENERATION FUNCTIONS
// ============================================================================

async function logApiCall(supabase: any, data: any) {
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
      metadata: data.metadata,
    });
  } catch (e) {
    console.error("Failed to log API call:", e);
  }
}

async function callLovableAI(
  cleanedImageUrl: string,
  prompt: string,
  libraryReferenceUrl?: string
): Promise<{ imageUrl: string; model: string; latency: number }> {
  const startTime = Date.now();
  
  if (!LOVABLE_API_KEY) {
    throw new Error("LOVABLE_API_KEY not configured");
  }

  console.log("Attempting generation with Lovable AI (Gemini 3 Pro Image)...");
  console.log("Prompt length:", prompt.length);
  console.log("Has library reference:", !!libraryReferenceUrl);

  const messages: any[] = [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: prompt,
        },
        {
          type: "image_url",
          image_url: { url: cleanedImageUrl },
        },
      ],
    },
  ];

  // If library reference is provided, add it as a second image
  if (libraryReferenceUrl) {
    messages[0].content.push({
      type: "image_url",
      image_url: { url: libraryReferenceUrl },
    });
  }

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-3-pro-image-preview",
      messages,
      modalities: ["image", "text"],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Lovable AI HTTP ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const images = data.choices?.[0]?.message?.images;
  
  if (!images || images.length === 0) {
    throw new Error("No image in Lovable AI response");
  }

  const latency = Date.now() - startTime;
  console.log(`✅ Lovable AI (Gemini 3) succeeded in ${latency}ms`);

  return {
    imageUrl: images[0].image_url.url,
    model: "google/gemini-3-pro-image-preview",
    latency,
  };
}

async function callOpenRouter(
  cleanedImageUrl: string,
  prompt: string,
  libraryReferenceUrl?: string
): Promise<{ imageUrl: string; model: string; latency: number }> {
  const startTime = Date.now();

  if (!OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY not configured");
  }

  console.log("Attempting generation with OpenRouter fallback...");

  const content: any[] = [
    {
      type: "text",
      text: prompt,
    },
    {
      type: "image_url",
      image_url: { url: cleanedImageUrl },
    },
  ];

  if (libraryReferenceUrl) {
    content.push({
      type: "image_url",
      image_url: { url: libraryReferenceUrl },
    });
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": SUPABASE_URL || "https://houspire.com",
      "X-Title": "Houspire Interior Design",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        {
          role: "user",
          content,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter HTTP ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const latency = Date.now() - startTime;

  const images = data.choices?.[0]?.message?.images;
  const contentResponse = data.choices?.[0]?.message?.content;

  let imageUrl: string | null = null;

  if (images && images.length > 0) {
    imageUrl = images[0].image_url?.url || images[0];
  } else if (contentResponse && typeof contentResponse === "string" && contentResponse.startsWith("data:image")) {
    imageUrl = contentResponse;
  }

  if (!imageUrl) {
    throw new Error("No image in OpenRouter response");
  }

  console.log(`✅ OpenRouter fallback succeeded in ${latency}ms`);

  return {
    imageUrl,
    model: "google/gemini-2.5-flash",
    latency,
  };
}

async function generateRenderWithFallback(
  cleanedImageUrl: string,
  prompt: string,
  libraryReferenceUrl?: string
): Promise<{ imageUrl: string; model: string; latency: number; provider: string }> {
  try {
    const result = await callLovableAI(cleanedImageUrl, prompt, libraryReferenceUrl);
    return { ...result, provider: "lovable" };
  } catch (lovableError) {
    console.warn("⚠️ Lovable AI failed:", lovableError instanceof Error ? lovableError.message : String(lovableError));

    if (OPENROUTER_API_KEY) {
      try {
        const result = await callOpenRouter(cleanedImageUrl, prompt, libraryReferenceUrl);
        return { ...result, provider: "openrouter" };
      } catch (openrouterError) {
        console.error("❌ OpenRouter fallback also failed:", openrouterError instanceof Error ? openrouterError.message : String(openrouterError));
        throw new Error(`All AI providers failed. Lovable: ${lovableError instanceof Error ? lovableError.message : "Unknown"}. OpenRouter: ${openrouterError instanceof Error ? openrouterError.message : "Unknown"}`);
      }
    } else {
      throw lovableError;
    }
  }
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();
  const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

  try {
    const { action, cleanedImageUrl, roomId, projectId, manualPrompt, customRequirements } = await req.json();

    if (!LOVABLE_API_KEY && !OPENROUTER_API_KEY) {
      throw new Error("No AI API keys configured");
    }

    switch (action) {
      case "generateRender": {
        console.log("=".repeat(80));
        console.log("ENHANCED GENERATE RENDER - Starting...");
        console.log("=".repeat(80));
        
        // Step 1: Fetch room data (now includes room_analysis for ceiling fan detection)
        console.log("\n[1/6] Fetching room data...");
        const room = await fetchRoomData(supabase, roomId);
        console.log(`✓ Room: ${room.room_type}, Style: ${room.selected_style}`);
        console.log(`  Project: ${room.projects?.city}, Budget: ${room.projects?.budget_tier}`);
        console.log(`  Ceiling fan detected: ${room.ceiling_fan_detected || room.room_analysis?.ceiling_fan_count > 0}`);
        
        // Step 2: Fetch quality control rules
        console.log("\n[2/6] Fetching quality control rules...");
        const qcRules = await fetchQualityControlRules(supabase);
        console.log(`✓ Loaded ${qcRules.length} active quality control rules`);
        
        // Build QC prompt additions based on room data
        const qcPromptAdditions = buildQualityControlPromptAdditions(room, qcRules);
        if (qcPromptAdditions) {
          console.log(`✓ Quality control rules applied to prompt`);
        }
        
        let comprehensivePrompt: string;
        let libraryImageUrl: string | undefined;
        let smartDefaultData: any = null;
        let libraryImageData: any = null;
        
        // Check if manual prompt is provided
        if (manualPrompt && manualPrompt.trim().length > 0) {
          console.log("\n[3/6] Using MANUAL PROMPT mode...");
          comprehensivePrompt = manualPrompt + qcPromptAdditions;
          console.log(`✓ Manual prompt: ${manualPrompt.length} characters + QC rules`);
        } else {
          // Step 3: Fetch smart defaults (if available)
          console.log("\n[3/6] Fetching smart defaults...");
          smartDefaultData = room.smart_default_id 
            ? await fetchSmartDefaultData(supabase, room.smart_default_id)
            : null;
          
          if (smartDefaultData) {
            console.log(`✓ Smart defaults loaded: ${smartDefaultData.style} - ${smartDefaultData.room_type}`);
            console.log(`  Specifications: ${smartDefaultData.specifications?.length || 0}`);
            console.log(`  Checklist items: ${smartDefaultData.checklist?.length || 0}`);
            console.log(`  Finishes: ${smartDefaultData.finishes?.length || 0}`);
          } else {
            console.log("  No smart defaults available");
          }
          
          // Step 4: Fetch library reference (if available)
          console.log("\n[4/6] Fetching library reference...");
          libraryImageData = room.library_reference_id
            ? await fetchLibraryImageData(supabase, room.library_reference_id)
            : null;
          
          if (libraryImageData) {
            console.log(`✓ Library reference loaded: ${libraryImageData.design_style} - ${libraryImageData.room_type}`);
            console.log(`  Image URL: ${libraryImageData.image_url?.slice(0, 50)}...`);
            console.log(`  Has color palette: ${!!libraryImageData.color_palette}`);
            console.log(`  Has analysis data: ${!!libraryImageData.analysis_data}`);
            libraryImageUrl = libraryImageData.image_url;
          } else {
            console.log("  No library reference available");
          }
          
          // Step 5: Build comprehensive prompt with QC rules appended
          console.log("\n[5/6] Building comprehensive prompt with QC rules...");
          comprehensivePrompt = buildComprehensivePrompt({
            roomType: room.room_type,
            selectedStyle: room.selected_style,
            smartDefaultData,
            libraryImageData,
            customRequirements: customRequirements || room.custom_requirements,
            city: room.projects?.city,
            budgetTier: room.projects?.budget_tier,
          }) + qcPromptAdditions;
        }
        
        console.log(`✓ Prompt built: ${comprehensivePrompt.length} characters`);
        console.log("\n--- PROMPT PREVIEW ---");
        console.log(comprehensivePrompt.slice(0, 500) + "...");
        console.log("--- END PREVIEW ---\n");
        
        // Step 6: Generate render
        console.log("[6/6] Generating render with AI...");
        const result = await generateRenderWithFallback(
          cleanedImageUrl,
          comprehensivePrompt,
          libraryImageUrl
        );
        
        const latencyMs = Date.now() - startTime;
        console.log(`\n✅ Generation complete in ${latencyMs}ms`);
        console.log(`   Provider: ${result.provider}`);
        console.log(`   Model: ${result.model}`);
        console.log("=".repeat(80));

        // Log API call
        await logApiCall(supabase, {
          projectId,
          roomId,
          service: result.provider === "lovable" ? "lovable-ai" : "openrouter",
          endpoint: "/v1/chat/completions",
          model: result.model,
          inputTokens: Math.ceil(comprehensivePrompt.length / 4),
          outputTokens: 0,
          costUsd: result.provider === "lovable" ? 0.05 : 0.02,
          latencyMs: result.latency,
          status: "success",
          errorMessage: null,
          metadata: {
            action: "generateRender",
            hasSmartDefaults: !!smartDefaultData,
            hasLibraryReference: !!libraryImageData,
            hasCustomRequirements: !!(customRequirements || room.custom_requirements),
            hasManualPrompt: !!(manualPrompt && manualPrompt.trim().length > 0),
            promptLength: comprehensivePrompt.length,
            qualityControlRulesApplied: qcRules.filter((r: any) => {
              if (r.rule_code === 'FAN_LIGHT_CONFLICT') {
                return room.ceiling_fan_detected || room.room_analysis?.ceiling_fan_count > 0;
              }
              return false;
            }).map((r: any) => r.rule_code),
          },
        });

        return new Response(
          JSON.stringify({
            imageUrl: result.imageUrl,
            model: result.model,
            provider: result.provider,
            latency: result.latency,
            promptLength: comprehensivePrompt.length,
            dataUsed: {
              smartDefaults: !!smartDefaultData,
              libraryReference: !!libraryImageData,
              customRequirements: !!(customRequirements || room.custom_requirements),
              manualPrompt: !!(manualPrompt && manualPrompt.trim().length > 0),
              qualityControlRules: qcRules.filter((r: any) => {
                if (r.rule_code === 'FAN_LIGHT_CONFLICT') {
                  return room.ceiling_fan_detected || room.room_analysis?.ceiling_fan_count > 0;
                }
                return false;
              }).length,
            },
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      default:
        throw new Error(`Unknown action: ${action}`);
    }
  } catch (error) {
    console.error("❌ Error:", error);
    
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
