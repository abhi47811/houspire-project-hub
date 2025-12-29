import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RoomData {
  id: string;
  room_type: string | null;
  selected_style: string | null;
  final_quality_score: number | null;
  phase_5_completed: boolean | null;
  retry_count: number | null;
}

interface TierResult {
  tier: "featured" | "standard" | "learning" | "rejected";
  score: number;
  reasons: string[];
}

interface CatalogResult {
  room_id: string;
  cataloged: boolean;
  reason?: string;
  library_id?: string;
  tier?: string;
  message: string;
}

interface ProjectCatalogResult {
  project_id: string;
  total_rooms: number;
  cataloged: number;
  featured: number;
  standard: number;
  learning: number;
  skipped: number;
  results: CatalogResult[];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

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
    const { data: authData, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !authData?.user) {
      return new Response(
        JSON.stringify({ error: "Invalid token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const user = authData.user;
    const { projectId } = await req.json();
    
    if (!projectId) {
      return new Response(
        JSON.stringify({ error: "projectId is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("🚀 Auto-cataloging project renders:", projectId);

    // Get project info for city
    const { data: project } = await supabase
      .from("projects")
      .select("id, city, created_by, assigned_to")
      .eq("id", projectId)
      .single();

    if (!project) {
      return new Response(
        JSON.stringify({ error: "Project not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get all rooms for project
    const { data: rooms, error: roomsError } = await supabase
      .from("rooms")
      .select("id, room_type, selected_style, final_quality_score, phase_5_completed, retry_count")
      .eq("project_id", projectId);

    if (roomsError || !rooms) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch rooms" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const results: CatalogResult[] = [];
    let cataloged = 0;
    let featured = 0;
    let standard = 0;
    let learning = 0;
    let skipped = 0;

    // Process each room
    for (const room of rooms) {
      const roomData = room as unknown as RoomData;
      const result = await catalogSingleRender(
        supabase,
        roomData,
        projectId,
        (project as { city: string | null }).city || null,
        user.id
      );
      results.push(result);

      if (result.cataloged) {
        cataloged++;
        if (result.tier === "featured") featured++;
        else if (result.tier === "standard") standard++;
        else if (result.tier === "learning") learning++;
      } else {
        skipped++;
      }
    }

    const response: ProjectCatalogResult = {
      project_id: projectId,
      total_rooms: rooms.length,
      cataloged,
      featured,
      standard,
      learning,
      skipped,
      results
    };

    console.log("✅ Auto-catalog complete:", {
      total: rooms.length,
      cataloged,
      featured,
      standard,
      learning,
      skipped
    });

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("❌ Auto-catalog error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// Catalog a single room's render
async function catalogSingleRender(
  supabaseClient: any,
  room: RoomData,
  projectId: string,
  city: string | null,
  userId: string
): Promise<CatalogResult> {
  
  const refinements = room.retry_count || 0;

  console.log(`📋 Checking room ${room.id}:`, {
    final_quality_score: room.final_quality_score,
    phase_5_completed: room.phase_5_completed,
    room_type: room.room_type,
    selected_style: room.selected_style,
    refinements
  });

  // Step 1: Phase 5 completion check (render must be complete) - check this FIRST
  if (!room.phase_5_completed) {
    console.log(`❌ Room ${room.id}: Phase 5 not completed`);
    return {
      room_id: room.id,
      cataloged: false,
      reason: "not_complete",
      message: "Render not completed yet."
    };
  }

  // Step 2: Quality gate - now handles NULL quality scores gracefully
  // If phase_5_completed is true but quality is null, use a default of 80 (approved = good quality)
  let qualityScore = room.final_quality_score;
  
  if (qualityScore === null || qualityScore === undefined) {
    console.log(`⚠️ Room ${room.id}: Quality score is null, using default 80 (approved render)`);
    qualityScore = 80; // Default score for approved renders without explicit scoring
  }

  // Relaxed threshold to 60% for broader cataloging
  if (qualityScore < 60) {
    console.log(`❌ Room ${room.id}: Quality ${qualityScore}% below 60% threshold`);
    return {
      room_id: room.id,
      cataloged: false,
      reason: "quality_too_low",
      message: `Quality score ${qualityScore}% below 60% threshold.`
    };
  }

  // Step 3: Get render image from room_images - try multiple approaches
  // First, try the exact query with phase 5 and render type
  let { data: renderImages } = await supabaseClient
    .from("room_images")
    .select("storage_path, file_name, image_type, phase")
    .eq("room_id", room.id)
    .eq("phase", 5)
    .eq("image_type", "render")
    .order("created_at", { ascending: false })
    .limit(1);

  // If not found, try just phase 5 images
  if (!renderImages || renderImages.length === 0) {
    console.log(`⚠️ Room ${room.id}: No phase 5 render found, trying any phase 5 image`);
    const { data: phase5Images } = await supabaseClient
      .from("room_images")
      .select("storage_path, file_name, image_type, phase")
      .eq("room_id", room.id)
      .eq("phase", 5)
      .order("created_at", { ascending: false })
      .limit(1);
    renderImages = phase5Images;
  }

  // If still not found, try approved renders table
  if (!renderImages || renderImages.length === 0) {
    console.log(`⚠️ Room ${room.id}: No phase 5 images found, checking renders table`);
    const { data: approvedRender } = await supabaseClient
      .from("renders")
      .select("image_url, storage_path")
      .eq("room_id", room.id)
      .eq("approval_status", "approved")
      .order("created_at", { ascending: false })
      .limit(1);
    
    if (approvedRender && approvedRender.length > 0) {
      const render = approvedRender[0] as { image_url: string; storage_path: string | null };
      console.log(`✅ Room ${room.id}: Found approved render in renders table`);
      // Use render URL directly if available
      const imageUrl = render.image_url;
      const storagePath = render.storage_path || render.image_url;
      
      // Skip to tier calculation and insert with this data
      const tierCalc = calculateTier(qualityScore, refinements);
      
      if (tierCalc.tier === "rejected") {
        return {
          room_id: room.id,
          cataloged: false,
          reason: "tier_rejected",
          message: `Tier calculation: rejected. ${tierCalc.reasons.join(", ")}`
        };
      }

      // Generate hashes for anonymization
      const projectHash = await generateHash(projectId);
      const rendererHash = await generateHash(userId);
      const perceptualHash = await generateHash(storagePath);

      // Generate tags
      const tags = generateTags(room, tierCalc.tier, qualityScore, refinements);

      // Insert into library
      const { data: insertedData, error: insertError } = await supabaseClient
        .from("style_library")
        .insert({
          image_url: imageUrl,
          thumbnail_url: imageUrl,
          storage_path: storagePath,
          source_type: "houspire_generated",
          source_project_hash: projectHash,
          source_room_id: room.id,
          renderer_anonymous_id: rendererHash,
          generated_at: new Date().toISOString(),
          room_type: room.room_type || "unknown",
          design_style: room.selected_style || "unknown",
          city: city,
          quality_score: qualityScore,
          tier: tierCalc.tier,
          analysis_data: {},
          matched_elements: {},
          color_palette: {},
          furniture_list: [],
          layout_pattern: {},
          times_viewed: 0,
          times_selected: 0,
          times_led_to_approval: 1,
          times_led_to_rejection: 0,
          approval_rate: 1.0,
          initial_performance_known: true,
          perceptual_hash: perceptualHash,
          status: "active",
          curator_verified: false,
          curator_notes: `Auto-cataloged from renders table: Quality ${qualityScore}%, Tier ${tierCalc.tier}`,
          tags: tags,
          ranking_score: calculateRankingScore(tierCalc.tier, qualityScore)
        })
        .select("id")
        .single();

      if (insertError) {
        console.error("Insert error:", insertError);
        return {
          room_id: room.id,
          cataloged: false,
          reason: "database_error",
          message: `Failed to catalog: ${insertError.message}`
        };
      }

      const libraryEntry = insertedData as { id: string } | null;
      console.log("✅ Cataloged render from renders table:", {
        room_id: room.id,
        library_id: libraryEntry?.id,
        tier: tierCalc.tier,
        quality: qualityScore
      });

      return {
        room_id: room.id,
        cataloged: true,
        library_id: libraryEntry?.id,
        tier: tierCalc.tier,
        message: `✨ Houspire Render added (Tier: ${tierCalc.tier})`
      };
    }
  }

  const renderImage = (renderImages as { storage_path: string; file_name: string }[] | null)?.[0];

  if (!renderImage?.storage_path) {
    console.log(`❌ Room ${room.id}: No render image found anywhere`);
    return {
      room_id: room.id,
      cataloged: false,
      reason: "no_render_image",
      message: "No render image found for this room."
    };
  }

  console.log(`✅ Room ${room.id}: Found render image at ${renderImage.storage_path}`);

  // Step 4: Calculate tier
  const tierCalc = calculateTier(qualityScore, refinements);
  
  if (tierCalc.tier === "rejected") {
    return {
      room_id: room.id,
      cataloged: false,
      reason: "tier_rejected",
      message: `Tier calculation: rejected. ${tierCalc.reasons.join(", ")}`
    };
  }

  // Step 5: Check for duplicates (skip if >10 similar exist)
  const { count: similarCount } = await supabaseClient
    .from("style_library")
    .select("*", { count: "exact", head: true })
    .eq("room_type", room.room_type || "")
    .eq("design_style", room.selected_style || "")
    .eq("source_type", "houspire_generated")
    .eq("status", "active");

  if ((similarCount || 0) > 10) {
    return {
      room_id: room.id,
      cataloged: false,
      reason: "too_many_similar",
      message: `${similarCount} similar renders exist. Skipping for diversity.`
    };
  }

  // Step 6: Generate hashes for anonymization
  const projectHash = await generateHash(projectId);
  const rendererHash = await generateHash(userId);
  const perceptualHash = await generateHash(renderImage.storage_path);

  // Step 7: Generate tags
  const tags = generateTags(room, tierCalc.tier, qualityScore, refinements);

  // Step 8: Get public URL for the render
  const { data: urlData } = await supabaseClient.storage
    .from("room-images")
    .createSignedUrl(renderImage.storage_path, 60 * 60 * 24 * 365); // 1 year

  const imageUrl = (urlData as { signedUrl: string } | null)?.signedUrl || "";

  // Step 9: Insert into library
  const { data: insertedData, error: insertError } = await supabaseClient
    .from("style_library")
    .insert({
      image_url: imageUrl,
      thumbnail_url: imageUrl,
      storage_path: renderImage.storage_path,
      source_type: "houspire_generated",
      source_project_hash: projectHash,
      source_room_id: room.id,
      renderer_anonymous_id: rendererHash,
      generated_at: new Date().toISOString(),
      room_type: room.room_type || "unknown",
      design_style: room.selected_style || "unknown",
      city: city,
      quality_score: qualityScore,
      tier: tierCalc.tier,
      analysis_data: {},
      matched_elements: {},
      color_palette: {},
      furniture_list: [],
      layout_pattern: {},
      times_viewed: 0,
      times_selected: 0,
      times_led_to_approval: 1, // This render itself was approved
      times_led_to_rejection: 0,
      approval_rate: 1.0, // 100% success so far
      initial_performance_known: true,
      perceptual_hash: perceptualHash,
      status: "active",
      curator_verified: false,
      curator_notes: `Auto-cataloged: Quality ${qualityScore}%, Tier ${tierCalc.tier}`,
      tags: tags,
      ranking_score: calculateRankingScore(tierCalc.tier, qualityScore)
    })
    .select("id")
    .single();

  if (insertError) {
    console.error("Insert error:", insertError);
    return {
      room_id: room.id,
      cataloged: false,
      reason: "database_error",
      message: `Failed to catalog: ${insertError.message}`
    };
  }

  const libraryEntry = insertedData as { id: string } | null;

  console.log("✅ Cataloged render:", {
    room_id: room.id,
    library_id: libraryEntry?.id,
    tier: tierCalc.tier,
    quality: qualityScore
  });

  return {
    room_id: room.id,
    cataloged: true,
    library_id: libraryEntry?.id,
    tier: tierCalc.tier,
    message: `✨ Houspire Render added (Tier: ${tierCalc.tier})`
  };
}

// Calculate tier based on quality and refinements
function calculateTier(qualityScore: number, refinements: number): TierResult {
  const reasons: string[] = [];

  // FEATURED: 95%+ quality, no refinements
  if (qualityScore >= 95 && refinements === 0) {
    reasons.push(`Quality ${qualityScore}% (excellent)`);
    reasons.push("First-time approval (no refinements)");
    return { tier: "featured", score: 95, reasons };
  }

  // STANDARD: 85-94% quality, max 1 refinement
  if (qualityScore >= 85 && refinements <= 1) {
    reasons.push(`Quality ${qualityScore}% (good)`);
    reasons.push(`Refinements: ${refinements} (acceptable)`);
    return { tier: "standard", score: 85, reasons };
  }

  // LEARNING: 70-84% (backend only)
  if (qualityScore >= 70) {
    reasons.push(`Quality ${qualityScore}% (fair)`);
    reasons.push("Cataloged for learning only");
    return { tier: "learning", score: 70, reasons };
  }

  // REJECTED
  reasons.push(`Quality ${qualityScore}% (too low)`);
  return { tier: "rejected", score: 0, reasons };
}

// Generate hash for anonymization
async function generateHash(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input + "houspire_salt");
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("").substring(0, 16);
}

// Generate search tags
function generateTags(
  room: RoomData,
  tier: string,
  qualityScore: number,
  refinements: number
): string[] {
  const tags: string[] = [];

  // Room type and style
  if (room.room_type) tags.push(room.room_type.toLowerCase().replace(/\s+/g, "-"));
  if (room.selected_style) tags.push(room.selected_style.toLowerCase().replace(/\s+/g, "-"));

  // Source
  tags.push("houspire-generated");
  tags.push("houspire-render");
  tags.push("quality-verified");

  // Tier
  tags.push(`tier-${tier}`);

  // Quality bracket
  if (qualityScore >= 95) tags.push("premium-quality");
  else if (qualityScore >= 90) tags.push("high-quality");
  else if (qualityScore >= 85) tags.push("good-quality");

  // First-time approval
  if (refinements === 0) tags.push("first-time-approval");

  return [...new Set(tags)];
}

// Calculate initial ranking score
function calculateRankingScore(tier: string, qualityScore: number): number {
  const tierBonus: Record<string, number> = {
    featured: 50,
    standard: 30,
    learning: 10
  };
  
  return (qualityScore || 0) + (tierBonus[tier] || 0);
}
