import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Batch 2: Bathroom, Dining Room, Foyer (39 records = 13 styles × 3 room types)
const STYLES = [
  { style: "Art Deco", style_slug: "art_deco" },
  { style: "Bohemian", style_slug: "bohemian" },
  { style: "Coastal Indian", style_slug: "coastal_indian" },
  { style: "Contemporary", style_slug: "contemporary" },
  { style: "Farmhouse", style_slug: "farmhouse" },
  { style: "Industrial", style_slug: "industrial" },
  { style: "Japandi", style_slug: "japandi" },
  { style: "Mid-Century Modern", style_slug: "mid_century_modern" },
  { style: "Minimalist", style_slug: "minimalist" },
  { style: "Modern Indian", style_slug: "modern_indian" },
  { style: "Scandinavian", style_slug: "scandinavian" },
  { style: "Traditional Indian", style_slug: "traditional_indian" },
  { style: "Transitional", style_slug: "transitional" },
];

const ROOM_TYPES = [
  { room_type: "Bathroom", room_type_slug: "bathroom" },
  { room_type: "Dining Room", room_type_slug: "dining_room" },
  { room_type: "Foyer", room_type_slug: "foyer" },
];

// Style-specific specifications for each room type
const getSpecifications = (style: string, roomType: string) => {
  const baseSpecs: Record<string, Record<string, any[]>> = {
    "Bathroom": {
      "Art Deco": [
        { category: "Vanity", item: "Fluted Front Vanity", material: "High-gloss lacquer", finish: "Black/White with chrome" },
        { category: "Mirror", item: "Sunburst Mirror", material: "Metal frame", finish: "Polished chrome or brass" },
        { category: "Flooring", item: "Checkered Tiles", material: "Marble/Porcelain", finish: "Black and white" },
        { category: "Lighting", item: "Geometric Sconces", material: "Chrome and glass", finish: "Polished chrome" },
        { category: "Fixtures", item: "Chrome Faucet Set", material: "Brass", finish: "Polished chrome" },
      ],
      "Bohemian": [
        { category: "Vanity", item: "Carved Wood Vanity", material: "Reclaimed wood", finish: "Natural with visible grain" },
        { category: "Mirror", item: "Ornate Frame Mirror", material: "Carved wood/rattan", finish: "Natural or painted" },
        { category: "Flooring", item: "Patterned Tiles", material: "Cement tiles", finish: "Colorful patterns" },
        { category: "Textiles", item: "Macrame Wall Art", material: "Cotton rope", finish: "Natural cream" },
        { category: "Plants", item: "Trailing Plants", material: "Live plants", finish: "Green foliage" },
      ],
      "Modern Indian": [
        { category: "Vanity", item: "Brass Inlay Vanity", material: "Sheesham wood", finish: "Rich walnut with brass" },
        { category: "Mirror", item: "Jaali Pattern Mirror", material: "Metal frame", finish: "Antique brass" },
        { category: "Flooring", item: "Terrazzo Tiles", material: "Terrazzo", finish: "Multi-color chips" },
        { category: "Lighting", item: "Brass Pendant", material: "Brass", finish: "Antique brass" },
        { category: "Accent", item: "Carved Stone Basin", material: "Natural stone", finish: "Polished" },
      ],
    },
    "Dining Room": {
      "Art Deco": [
        { category: "Table", item: "Geometric Dining Table", material: "Lacquered wood", finish: "High-gloss black/white" },
        { category: "Chairs", item: "Velvet Dining Chairs", material: "Wood frame with velvet", finish: "Emerald/Navy velvet" },
        { category: "Lighting", item: "Crystal Chandelier", material: "Crystal and brass", finish: "Polished brass" },
        { category: "Sideboard", item: "Fluted Credenza", material: "Lacquered wood", finish: "Black with gold accents" },
        { category: "Mirror", item: "Sunburst Wall Mirror", material: "Metal", finish: "Gold leaf" },
      ],
      "Bohemian": [
        { category: "Table", item: "Rustic Wood Table", material: "Reclaimed wood", finish: "Natural distressed" },
        { category: "Chairs", item: "Mixed Chair Set", material: "Various woods/rattan", finish: "Eclectic mix" },
        { category: "Lighting", item: "Woven Pendant", material: "Rattan/bamboo", finish: "Natural tan" },
        { category: "Textiles", item: "Kilim Table Runner", material: "Handwoven wool", finish: "Colorful patterns" },
        { category: "Plants", item: "Macrame Plant Hanger", material: "Cotton rope", finish: "Natural with plants" },
      ],
      "Modern Indian": [
        { category: "Table", item: "Carved Wood Table", material: "Sheesham/Teak", finish: "Rich wood with brass inlay" },
        { category: "Chairs", item: "Upholstered Chairs", material: "Wood with fabric", finish: "Jewel tone upholstery" },
        { category: "Lighting", item: "Brass Chandelier", material: "Brass", finish: "Antique brass" },
        { category: "Buffet", item: "Carved Sideboard", material: "Solid wood", finish: "Traditional carvings" },
        { category: "Art", item: "Pichwai Painting", material: "Canvas", finish: "Traditional Indian art" },
      ],
    },
    "Foyer": {
      "Art Deco": [
        { category: "Console", item: "Lacquered Console", material: "Lacquered wood", finish: "High-gloss black" },
        { category: "Mirror", item: "Sunburst Mirror", material: "Metal frame", finish: "Gold or chrome" },
        { category: "Lighting", item: "Geometric Pendant", material: "Metal and glass", finish: "Brass or chrome" },
        { category: "Flooring", item: "Marble Inlay", material: "Marble", finish: "Black and white geometric" },
        { category: "Seating", item: "Velvet Bench", material: "Wood with velvet", finish: "Emerald or navy" },
      ],
      "Bohemian": [
        { category: "Console", item: "Carved Wood Console", material: "Reclaimed wood", finish: "Distressed natural" },
        { category: "Mirror", item: "Ornate Frame Mirror", material: "Carved wood", finish: "Painted or natural" },
        { category: "Lighting", item: "Lantern Pendant", material: "Metal/glass", finish: "Moroccan style" },
        { category: "Rug", item: "Vintage Kilim", material: "Handwoven wool", finish: "Colorful patterns" },
        { category: "Decor", item: "Global Artifacts", material: "Various", finish: "Collected pieces" },
      ],
      "Modern Indian": [
        { category: "Console", item: "Bone Inlay Console", material: "Wood with bone inlay", finish: "White/black patterns" },
        { category: "Mirror", item: "Carved Wood Mirror", material: "Solid wood", finish: "Traditional carvings" },
        { category: "Lighting", item: "Brass Lantern", material: "Brass", finish: "Antique brass" },
        { category: "Art", item: "Tanjore Painting", material: "Traditional", finish: "Gold leaf accents" },
        { category: "Idol", item: "Brass Deity", material: "Brass", finish: "Antique brass" },
      ],
    },
  };

  // Get style-specific specs or fallback to a generic set
  const roomSpecs = baseSpecs[roomType] || {};
  return roomSpecs[style] || [
    { category: "Primary", item: `${style} ${roomType} Essential`, material: "Quality materials", finish: "Style-appropriate" },
    { category: "Secondary", item: "Accent Piece", material: "Complementary materials", finish: "Coordinated finish" },
    { category: "Lighting", item: "Statement Lighting", material: "Style-appropriate", finish: "Matching hardware" },
    { category: "Flooring", item: "Premium Flooring", material: "Tile/Wood/Stone", finish: "Style-specific pattern" },
    { category: "Accessories", item: "Curated Decor", material: "Various", finish: "Cohesive styling" },
  ];
};

const getChecklist = (style: string, roomType: string) => {
  return [
    { item: `${style} style ${roomType.toLowerCase()} layout`, priority: "Essential", status: "Required" },
    { item: "Proper lighting placement", priority: "Essential", status: "Required" },
    { item: "Color palette coordination", priority: "Signature", status: "Required" },
    { item: "Material quality selection", priority: "Essential", status: "Required" },
    { item: "Accent pieces placement", priority: "Recommended", status: "Optional" },
  ];
};

const getFinishes = (style: string, roomType: string) => {
  const styleFinishes: Record<string, string[][]> = {
    "Art Deco": [
      ["High-Gloss Black Lacquer", "Signature Art Deco", "Premium+", "★★★★★"],
      ["Polished Chrome", "Classic metallic", "Premium", "★★★★★"],
      ["Gold/Brass Accents", "Glamorous touch", "Premium+", "★★★★★"],
      ["Black & White Contrast", "Iconic Deco", "Premium", "★★★★★"],
    ],
    "Bohemian": [
      ["Natural Wood Finish", "Warm organic", "Mid-range", "★★★★★"],
      ["Distressed Paint", "Vintage charm", "Budget", "★★★★☆"],
      ["Colorful Patterns", "Eclectic style", "Mid-range", "★★★★★"],
      ["Rattan/Wicker", "Natural texture", "Mid-range", "★★★★☆"],
    ],
    "Modern Indian": [
      ["Brass Inlay", "Traditional luxury", "Premium+", "★★★★★"],
      ["Rich Wood Tones", "Sheesham/Teak", "Premium", "★★★★★"],
      ["Antique Brass", "Heritage finish", "Premium", "★★★★★"],
      ["Jewel Tones", "Royal colors", "Mid-range", "★★★★★"],
    ],
  };

  return styleFinishes[style] || [
    ["Natural Finish", "Clean and simple", "Mid-range", "★★★★☆"],
    ["Matte White", "Contemporary", "Mid-range", "★★★★☆"],
    ["Warm Wood", "Inviting tone", "Mid-range", "★★★★★"],
    ["Metallic Accent", "Modern touch", "Premium", "★★★★☆"],
  ];
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase configuration");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log("Loading Batch 2: Bathroom, Dining Room, Foyer for all 13 styles");

    const combinations: any[] = [];
    let loadedCount = 0;
    let errorCount = 0;

    for (const style of STYLES) {
      for (const roomType of ROOM_TYPES) {
        const record = {
          style: style.style,
          style_slug: style.style_slug,
          room_type: roomType.room_type,
          room_type_slug: roomType.room_type_slug,
          specifications: getSpecifications(style.style, roomType.room_type),
          checklist: getChecklist(style.style, roomType.room_type),
          finishes: getFinishes(style.style, roomType.room_type),
          source_file: `${roomType.room_type.replace(" ", "-")}-${style.style.replace(" ", "-")}.xlsx`,
        };
        combinations.push(record);
      }
    }

    // Upsert all records
    for (const combo of combinations) {
      const { error } = await supabase
        .from("smart_defaults")
        .upsert(combo, { onConflict: "style_slug,room_type_slug" });

      if (error) {
        console.error(`Error loading ${combo.style} - ${combo.room_type}:`, error);
        errorCount++;
      } else {
        loadedCount++;
        console.log(`Loaded: ${combo.style} - ${combo.room_type}`);
      }
    }

    // Get total count
    const { count } = await supabase
      .from("smart_defaults")
      .select("*", { count: "exact", head: true });

    console.log(`Batch 2 complete: ${loadedCount} loaded, ${errorCount} errors, ${count} total in database`);

    return new Response(
      JSON.stringify({
        success: true,
        batch: "Batch 2: Bathroom, Dining Room, Foyer",
        loaded: loadedCount,
        errors: errorCount,
        totalInDatabase: count,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in load-smart-defaults-batch2:", error);
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
