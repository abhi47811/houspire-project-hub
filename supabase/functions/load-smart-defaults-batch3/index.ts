import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Batch 3: Guest Bedroom, Home Office, Kids Room (39 records = 13 styles × 3 room types)
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
  { room_type: "Guest Bedroom", room_type_slug: "guest_bedroom" },
  { room_type: "Home Office", room_type_slug: "home_office" },
  { room_type: "Kids Room", room_type_slug: "kids_room" },
];

const getSpecifications = (style: string, roomType: string) => {
  const baseSpecs: Record<string, Record<string, any[]>> = {
    "Guest Bedroom": {
      "Art Deco": [
        { category: "Bed", item: "Upholstered Headboard", material: "Velvet", finish: "Emerald/Navy with tufting" },
        { category: "Nightstands", item: "Mirrored Side Tables", material: "Mirrored glass", finish: "Chrome/brass frame" },
        { category: "Lighting", item: "Crystal Sconces", material: "Crystal and metal", finish: "Polished chrome" },
        { category: "Dresser", item: "Lacquered Dresser", material: "Wood", finish: "High-gloss black" },
        { category: "Mirror", item: "Sunburst Mirror", material: "Metal", finish: "Gold or chrome" },
      ],
      "Bohemian": [
        { category: "Bed", item: "Carved Wood Bed", material: "Reclaimed wood", finish: "Natural distressed" },
        { category: "Textiles", item: "Layered Bedding", material: "Cotton/Linen", finish: "Mixed patterns" },
        { category: "Lighting", item: "Woven Pendant", material: "Rattan", finish: "Natural tan" },
        { category: "Rug", item: "Vintage Kilim", material: "Wool", finish: "Colorful patterns" },
        { category: "Plants", item: "Trailing Plants", material: "Live plants", finish: "Hanging planters" },
      ],
      "Modern Indian": [
        { category: "Bed", item: "Carved Four Poster", material: "Sheesham", finish: "Rich walnut" },
        { category: "Textiles", item: "Block Print Bedding", material: "Cotton", finish: "Traditional prints" },
        { category: "Lighting", item: "Brass Lantern", material: "Brass", finish: "Antique brass" },
        { category: "Wardrobe", item: "Carved Armoire", material: "Solid wood", finish: "Traditional carvings" },
        { category: "Art", item: "Miniature Paintings", material: "Traditional", finish: "Framed collection" },
      ],
    },
    "Home Office": {
      "Art Deco": [
        { category: "Desk", item: "Lacquered Desk", material: "Wood", finish: "High-gloss black/white" },
        { category: "Chair", item: "Velvet Office Chair", material: "Velvet upholstery", finish: "Emerald or navy" },
        { category: "Lighting", item: "Geometric Desk Lamp", material: "Metal and glass", finish: "Polished brass" },
        { category: "Bookshelf", item: "Stepped Bookcase", material: "Lacquered wood", finish: "Black with gold trim" },
        { category: "Accessories", item: "Brass Desk Set", material: "Brass", finish: "Polished brass" },
      ],
      "Bohemian": [
        { category: "Desk", item: "Rustic Wood Desk", material: "Reclaimed wood", finish: "Natural distressed" },
        { category: "Chair", item: "Rattan Chair", material: "Rattan/wicker", finish: "Natural" },
        { category: "Shelving", item: "Open Wood Shelves", material: "Reclaimed wood", finish: "Mixed finishes" },
        { category: "Textiles", item: "Macrame Wall Art", material: "Cotton rope", finish: "Natural cream" },
        { category: "Plants", item: "Desk Plants", material: "Live plants", finish: "Ceramic pots" },
      ],
      "Modern Indian": [
        { category: "Desk", item: "Bone Inlay Desk", material: "Wood with bone inlay", finish: "White/geometric" },
        { category: "Chair", item: "Carved Wood Chair", material: "Sheesham", finish: "Traditional carvings" },
        { category: "Lighting", item: "Brass Desk Lamp", material: "Brass", finish: "Antique brass" },
        { category: "Storage", item: "Carved Cabinet", material: "Solid wood", finish: "Rich wood tones" },
        { category: "Art", item: "Traditional Art", material: "Canvas", finish: "Framed artwork" },
      ],
    },
    "Kids Room": {
      "Art Deco": [
        { category: "Bed", item: "Upholstered Bed", material: "Velvet", finish: "Soft jewel tones" },
        { category: "Storage", item: "Stepped Bookcase", material: "Lacquered wood", finish: "Pastel colors" },
        { category: "Lighting", item: "Star Pendant", material: "Metal and glass", finish: "Chrome/gold" },
        { category: "Desk", item: "Child's Desk", material: "Lacquered wood", finish: "White with chrome" },
        { category: "Rug", item: "Geometric Rug", material: "Wool blend", finish: "Deco patterns" },
      ],
      "Bohemian": [
        { category: "Bed", item: "Canopy Bed", material: "Wood", finish: "Natural with drapes" },
        { category: "Textiles", item: "Colorful Bedding", material: "Cotton", finish: "Mixed patterns" },
        { category: "Lighting", item: "Paper Lanterns", material: "Paper/bamboo", finish: "Colorful" },
        { category: "Play Area", item: "Floor Cushions", material: "Cotton", finish: "Bright patterns" },
        { category: "Storage", item: "Woven Baskets", material: "Rattan", finish: "Natural" },
      ],
      "Modern Indian": [
        { category: "Bed", item: "Painted Wood Bed", material: "Solid wood", finish: "Colorful paintings" },
        { category: "Storage", item: "Painted Trunk", material: "Wood", finish: "Folk art motifs" },
        { category: "Lighting", item: "Colorful Lantern", material: "Metal/glass", finish: "Bright colors" },
        { category: "Textiles", item: "Block Print Bedding", material: "Cotton", finish: "Child-friendly prints" },
        { category: "Art", item: "Folk Art Paintings", material: "Canvas", finish: "Traditional Indian" },
      ],
    },
  };

  const roomSpecs = baseSpecs[roomType] || {};
  return roomSpecs[style] || [
    { category: "Primary", item: `${style} ${roomType} Essential`, material: "Quality materials", finish: "Style-appropriate" },
    { category: "Secondary", item: "Accent Piece", material: "Complementary materials", finish: "Coordinated finish" },
    { category: "Lighting", item: "Statement Lighting", material: "Style-appropriate", finish: "Matching hardware" },
    { category: "Storage", item: "Functional Storage", material: "Matching materials", finish: "Style-specific design" },
    { category: "Accessories", item: "Curated Decor", material: "Various", finish: "Cohesive styling" },
  ];
};

const getChecklist = (style: string, roomType: string) => {
  return [
    { item: `${style} style ${roomType.toLowerCase()} layout`, priority: "Essential", status: "Required" },
    { item: "Proper lighting placement", priority: "Essential", status: "Required" },
    { item: "Color palette coordination", priority: "Signature", status: "Required" },
    { item: "Functional furniture arrangement", priority: "Essential", status: "Required" },
    { item: "Accent pieces placement", priority: "Recommended", status: "Optional" },
  ];
};

const getFinishes = (style: string, roomType: string) => {
  const styleFinishes: Record<string, string[][]> = {
    "Art Deco": [
      ["High-Gloss Lacquer", "Signature Art Deco", "Premium+", "★★★★★"],
      ["Velvet Upholstery", "Luxe texture", "Premium", "★★★★★"],
      ["Mirrored Surfaces", "Glamorous touch", "Premium+", "★★★★★"],
      ["Chrome/Brass Hardware", "Metallic accent", "Premium", "★★★★★"],
    ],
    "Bohemian": [
      ["Natural Wood", "Warm organic", "Mid-range", "★★★★★"],
      ["Woven Textures", "Artisan feel", "Mid-range", "★★★★★"],
      ["Colorful Patterns", "Eclectic style", "Budget-Mid", "★★★★☆"],
      ["Layered Textiles", "Cozy aesthetic", "Mid-range", "★★★★★"],
    ],
    "Modern Indian": [
      ["Rich Wood Tones", "Sheesham/Teak", "Premium", "★★★★★"],
      ["Block Print Fabrics", "Traditional craft", "Mid-range", "★★★★★"],
      ["Brass Accents", "Heritage finish", "Premium", "★★★★★"],
      ["Carved Details", "Artisan work", "Premium+", "★★★★★"],
    ],
  };

  return styleFinishes[style] || [
    ["Natural Finish", "Clean and simple", "Mid-range", "★★★★☆"],
    ["Quality Upholstery", "Comfortable", "Mid-range", "★★★★☆"],
    ["Wood Tones", "Warm feel", "Mid-range", "★★★★★"],
    ["Metal Accents", "Modern touch", "Premium", "★★★★☆"],
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

    console.log("Loading Batch 3: Guest Bedroom, Home Office, Kids Room for all 13 styles");

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

        const { error } = await supabase
          .from("smart_defaults")
          .upsert(record, { onConflict: "style_slug,room_type_slug" });

        if (error) {
          console.error(`Error loading ${style.style} - ${roomType.room_type}:`, error);
          errorCount++;
        } else {
          loadedCount++;
          console.log(`Loaded: ${style.style} - ${roomType.room_type}`);
        }
      }
    }

    const { count } = await supabase
      .from("smart_defaults")
      .select("*", { count: "exact", head: true });

    console.log(`Batch 3 complete: ${loadedCount} loaded, ${errorCount} errors, ${count} total in database`);

    return new Response(
      JSON.stringify({
        success: true,
        batch: "Batch 3: Guest Bedroom, Home Office, Kids Room",
        loaded: loadedCount,
        errors: errorCount,
        totalInDatabase: count,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in load-smart-defaults-batch3:", error);
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
