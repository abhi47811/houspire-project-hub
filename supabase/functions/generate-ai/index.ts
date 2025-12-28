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
// PROMPT BUILDER - The Heart of the System
// ============================================================================

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
 * Build a comprehensive prompt combining all data sources
 */
function buildComprehensivePrompt(input: PromptBuilderInput): string {
  const {
    roomType,
    selectedStyle,
    smartDefaultData,
    libraryImageData,
    customRequirements,
    city,
    budgetTier
  } = input;

  let prompt = `Create a stunning ${selectedStyle} style ${roomType}`;
  
  if (city) {
    prompt += ` for a home in ${city}, India`;
  }
  
  prompt += `.`;

  // SECTION 1: Smart Defaults (if available)
  if (smartDefaultData) {
    prompt += `\n\n## Design Specifications:`;
    
    if (smartDefaultData.specifications && Array.isArray(smartDefaultData.specifications)) {
      prompt += `\n\n### Furniture & Elements:`;
      for (const spec of smartDefaultData.specifications) {
        if (spec.category && spec.items && Array.isArray(spec.items)) {
          prompt += `\n- **${spec.category}**: ${spec.items.join(', ')}`;
        }
      }
    }
    
    if (smartDefaultData.checklist && Array.isArray(smartDefaultData.checklist) && smartDefaultData.checklist.length > 0) {
      prompt += `\n\n### Must-Have Items:`;
      prompt += `\n${smartDefaultData.checklist.map((item: string) => `- ${item}`).join('\n')}`;
    }
    
    if (smartDefaultData.finishes && Array.isArray(smartDefaultData.finishes) && smartDefaultData.finishes.length > 0) {
      prompt += `\n\n### Finishes & Materials:`;
      for (const finish of smartDefaultData.finishes) {
        if (finish.type && finish.value) {
          prompt += `\n- **${finish.type}**: ${finish.value}`;
        }
      }
    }
  }

  // SECTION 2: Library Reference (if available)
  if (libraryImageData) {
    prompt += `\n\n## Reference Style:`;
    prompt += `\nUse the provided reference image as a visual guide for:`;
    
    if (libraryImageData.color_palette) {
      const palette = libraryImageData.color_palette;
      prompt += `\n\n### Color Palette:`;
      if (palette.primary) prompt += `\n- Primary: ${palette.primary}`;
      if (palette.secondary) prompt += `\n- Secondary: ${palette.secondary}`;
      if (palette.accent) prompt += `\n- Accent: ${palette.accent}`;
      if (palette.neutral) prompt += `\n- Neutral: ${palette.neutral}`;
    }
    
    if (libraryImageData.analysis_data) {
      const analysis = libraryImageData.analysis_data;
      
      if (analysis.furniture && Array.isArray(analysis.furniture)) {
        prompt += `\n\n### Furniture Arrangement:`;
        prompt += `\n${analysis.furniture.join(', ')}`;
      }
      
      if (analysis.layout) {
        prompt += `\n\n### Layout Pattern:`;
        prompt += `\n${analysis.layout}`;
      }
      
      if (analysis.lighting) {
        prompt += `\n\n### Lighting Style:`;
        prompt += `\n${analysis.lighting}`;
      }
    }
    
    prompt += `\n\nMatch the overall aesthetic, mood, and quality level of the reference image.`;
  }

  // SECTION 3: Budget Tier Adjustments
  if (budgetTier) {
    prompt += `\n\n## Budget Tier: ${budgetTier.replace('_', ' ').toUpperCase()}`;
    
    switch (budgetTier) {
      case 'premium':
        prompt += `\n- Use high-end, luxury materials and finishes`;
        prompt += `\n- Include statement pieces and designer furniture`;
        prompt += `\n- Add sophisticated lighting and premium accessories`;
        break;
      case 'mid_range':
        prompt += `\n- Balance quality and affordability`;
        prompt += `\n- Use good quality materials with smart choices`;
        prompt += `\n- Include tasteful, well-designed pieces`;
        break;
      case 'budget':
        prompt += `\n- Focus on cost-effective solutions`;
        prompt += `\n- Use affordable materials that look good`;
        prompt += `\n- Prioritize essential furniture and simple finishes`;
        break;
    }
  }

  // SECTION 4: Custom Requirements (if provided)
  if (customRequirements && customRequirements.trim().length > 0) {
    prompt += `\n\n## Additional Requirements:`;
    prompt += `\n${customRequirements}`;
  }

  // SECTION 5: Critical Constraints (ALWAYS INCLUDED)
  prompt += `\n\n## CRITICAL REQUIREMENTS:`;
  prompt += `\n1. **PRESERVE ALL ARCHITECTURAL ELEMENTS** - Keep windows, doors, ceiling height, and room dimensions EXACTLY as they appear in the original image`;
  prompt += `\n2. **PHOTOREALISTIC QUALITY** - Create magazine-quality, professional interior design photography`;
  prompt += `\n3. **PROPER LIGHTING** - Use natural and artificial lighting that enhances the space`;
  prompt += `\n4. **SCALE & PROPORTION** - Ensure all furniture and elements are properly scaled to the room`;
  prompt += `\n5. **STYLE CONSISTENCY** - Maintain ${selectedStyle} style throughout all elements`;
  
  if (city) {
    prompt += `\n6. **INDIAN CONTEXT** - Include culturally appropriate elements for ${city}, India`;
  }

  return prompt;
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
        
        // Step 1: Fetch room data
        console.log("\n[1/5] Fetching room data...");
        const room = await fetchRoomData(supabase, roomId);
        console.log(`✓ Room: ${room.room_type}, Style: ${room.selected_style}`);
        console.log(`  Project: ${room.projects?.city}, Budget: ${room.projects?.budget_tier}`);
        
        let comprehensivePrompt: string;
        let libraryImageUrl: string | undefined;
        let smartDefaultData: any = null;
        let libraryImageData: any = null;
        
        // Check if manual prompt is provided
        if (manualPrompt && manualPrompt.trim().length > 0) {
          console.log("\n[2/5] Using MANUAL PROMPT mode...");
          comprehensivePrompt = manualPrompt;
          console.log(`✓ Manual prompt: ${manualPrompt.length} characters`);
        } else {
          // Step 2: Fetch smart defaults (if available)
          console.log("\n[2/5] Fetching smart defaults...");
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
          
          // Step 3: Fetch library reference (if available)
          console.log("\n[3/5] Fetching library reference...");
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
          
          // Step 4: Build comprehensive prompt
          console.log("\n[4/5] Building comprehensive prompt...");
          comprehensivePrompt = buildComprehensivePrompt({
            roomType: room.room_type,
            selectedStyle: room.selected_style,
            smartDefaultData,
            libraryImageData,
            customRequirements: customRequirements || room.custom_requirements,
            city: room.projects?.city,
            budgetTier: room.projects?.budget_tier,
          });
        }
        
        console.log(`✓ Prompt built: ${comprehensivePrompt.length} characters`);
        console.log("\n--- PROMPT PREVIEW ---");
        console.log(comprehensivePrompt.slice(0, 500) + "...");
        console.log("--- END PREVIEW ---\n");
        
        // Step 5: Generate render
        console.log("[5/5] Generating render with AI...");
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
