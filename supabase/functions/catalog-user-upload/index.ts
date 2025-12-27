import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CatalogRequest {
  imageUrl: string;
  projectId: string;
  roomId: string;
  roomType: string;
  designStyle: string;
  uploadSource: 'pinterest' | 'instagram' | 'upload' | 'paste' | 'url';
  userConsent: boolean;
  analysisData?: Record<string, unknown>;
}

interface CatalogResult {
  cataloged: boolean;
  reason?: string;
  library_id?: string;
  message: string;
  badge?: string;
  existing_image_id?: string;
  is_duplicate?: boolean;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    // Get user from auth header
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Authorization required" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    
    // Verify user token
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Invalid token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const request: CatalogRequest = await req.json();
    console.log("📚 Catalog user upload request:", {
      imageUrl: request.imageUrl.substring(0, 50) + "...",
      roomType: request.roomType,
      designStyle: request.designStyle,
      userConsent: request.userConsent
    });

    // Step 1: Check user consent
    if (!request.userConsent) {
      console.log("📌 User declined to share reference");
      return new Response(
        JSON.stringify({
          cataloged: false,
          reason: "user_declined",
          message: "Reference saved for this project only."
        } as CatalogResult),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Step 2: Check for duplicates
    const { data: duplicates } = await supabase.rpc("find_library_duplicates", {
      p_image_url: request.imageUrl,
      p_room_type: request.roomType,
      p_design_style: request.designStyle
    });

    if (duplicates && duplicates.length > 0) {
      const exactMatch = duplicates.find((d: { is_exact_match: boolean }) => d.is_exact_match);
      if (exactMatch) {
        console.log("⚠️ Exact duplicate found:", exactMatch.id);
        
        // Track usage of existing image
        await supabase.rpc("track_library_selection", {
          p_library_image_id: exactMatch.id,
          p_project_id: request.projectId,
          p_room_id: request.roomId,
          p_user_id: user.id
        });

        return new Response(
          JSON.stringify({
            cataloged: false,
            reason: "duplicate",
            existing_image_id: exactMatch.id,
            is_duplicate: true,
            message: "This image is already in our library! Using existing reference.",
            badge: "📌 Reference Image"
          } as CatalogResult),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Step 3: Analyze image with AI (if no analysis provided)
    let analysisData = request.analysisData || {};
    let qualityScore = null;
    
    if (!request.analysisData && LOVABLE_API_KEY) {
      try {
        console.log("🤖 Analyzing reference image with AI...");
        
        const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "image_url",
                    image_url: { url: request.imageUrl }
                  },
                  {
                    type: "text",
                    text: `Analyze this ${request.roomType} interior design reference image for ${request.designStyle} style.

Extract and return ONLY valid JSON:
{
  "room_type_matches": true/false,
  "style_matches": true/false,
  "confidence": 0-100,
  "colors": {
    "primary": "#hex",
    "secondary": "#hex", 
    "accent": "#hex"
  },
  "furniture": ["item1", "item2"],
  "layout": { "description": "..." },
  "quality_score": 0-100,
  "quality_issues": [],
  "tags": ["tag1", "tag2"]
}`
                  }
                ]
              }
            ]
          }),
        });

        if (aiResponse.ok) {
          const aiResult = await aiResponse.json();
          const content = aiResult.choices?.[0]?.message?.content;
          if (content) {
            try {
              // Extract JSON from response
              const jsonMatch = content.match(/\{[\s\S]*\}/);
              if (jsonMatch) {
                analysisData = JSON.parse(jsonMatch[0]);
                qualityScore = analysisData.quality_score || null;
                console.log("✅ AI analysis complete, quality:", qualityScore);
              }
            } catch (parseError) {
              console.error("Failed to parse AI response:", parseError);
            }
          }
        }
      } catch (aiError) {
        console.error("AI analysis failed:", aiError);
        // Continue without AI analysis
      }
    }

    // Step 4: Generate perceptual hash (simple URL-based for now)
    const perceptualHash = await generateHash(request.imageUrl);

    // Step 5: Generate tags
    const tags = generateTags(request, analysisData);

    // Step 6: Get user's city from profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .maybeSingle();

    // Step 7: Insert into style_library
    const { data: libraryEntry, error: insertError } = await supabase
      .from("style_library")
      .insert({
        image_url: request.imageUrl,
        thumbnail_url: request.imageUrl, // Same for now
        source_type: "user_upload",
        original_uploader_id: user.id,
        upload_project_id: request.projectId,
        uploaded_at: new Date().toISOString(),
        upload_source: request.uploadSource,
        room_type: request.roomType,
        design_style: request.designStyle,
        city: null, // Will be set from project if needed
        quality_score: qualityScore,
        tier: "unverified",
        analysis_data: analysisData,
        matched_elements: analysisData.furniture || {},
        color_palette: analysisData.colors || {},
        furniture_list: analysisData.furniture || [],
        layout_pattern: analysisData.layout || {},
        times_viewed: 0,
        times_selected: 1, // Count this first use
        times_led_to_approval: 0,
        times_led_to_rejection: 0,
        initial_performance_known: false,
        perceptual_hash: perceptualHash,
        status: "active",
        curator_verified: false,
        tags: tags,
        ranking_score: 0
      })
      .select()
      .single();

    if (insertError) {
      console.error("❌ Failed to catalog:", insertError);
      return new Response(
        JSON.stringify({
          cataloged: false,
          reason: "database_error",
          message: "Failed to add to library. Using for this project only."
        } as CatalogResult),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Step 8: Track usage
    await supabase.rpc("track_library_selection", {
      p_library_image_id: libraryEntry.id,
      p_project_id: request.projectId,
      p_room_id: request.roomId,
      p_user_id: user.id
    });

    console.log("✅ User upload cataloged successfully:", libraryEntry.id);

    return new Response(
      JSON.stringify({
        cataloged: true,
        library_id: libraryEntry.id,
        message: "✅ Reference added to library! Future users can now use this.",
        badge: "📌 Reference Image"
      } as CatalogResult),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("❌ Catalog error:", error);
    return new Response(
      JSON.stringify({
        cataloged: false,
        reason: "unexpected_error",
        message: error instanceof Error ? error.message : "Something went wrong"
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// Helper: Generate simple hash from URL
async function generateHash(url: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(url + Date.now().toString());
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("").substring(0, 16);
}

// Helper: Generate search tags
function generateTags(request: CatalogRequest, analysis: Record<string, unknown>): string[] {
  const tags: string[] = [];
  
  // Add room and style
  tags.push(request.roomType.toLowerCase().replace(/\s+/g, "-"));
  tags.push(request.designStyle.toLowerCase().replace(/\s+/g, "-"));
  
  // Add source marker
  tags.push("user-upload");
  tags.push(request.uploadSource);
  
  // Add furniture items from analysis
  if (Array.isArray(analysis.furniture)) {
    analysis.furniture.forEach((item: string) => {
      if (typeof item === "string") {
        tags.push(item.toLowerCase().replace(/\s+/g, "-"));
      }
    });
  }
  
  // Add tags from analysis
  if (Array.isArray(analysis.tags)) {
    analysis.tags.forEach((tag: string) => {
      if (typeof tag === "string" && !tags.includes(tag)) {
        tags.push(tag);
      }
    });
  }
  
  return tags;
}
