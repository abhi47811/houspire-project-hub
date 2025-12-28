import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Batch 4: Nursery, Wardrobe (26 records = 13 styles × 2 room types)
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
  { room_type: "Nursery", room_type_slug: "nursery" },
  { room_type: "Wardrobe", room_type_slug: "wardrobe" },
];

const getSpecifications = (style: string, roomType: string) => {
  const baseSpecs: Record<string, Record<string, any[]>> = {
    "Nursery": {
      "Art Deco": [
        { category: "Crib", item: "Geometric Crib", material: "Lacquered wood", finish: "White/gold accents" },
        { category: "Storage", item: "Stepped Dresser", material: "Lacquered wood", finish: "White or soft colors" },
        { category: "Lighting", item: "Starburst Pendant", material: "Metal", finish: "Soft gold" },
        { category: "Chair", item: "Velvet Rocker", material: "Velvet upholstery", finish: "Blush or cream" },
        { category: "Rug", item: "Geometric Rug", material: "Wool blend", finish: "Soft Deco patterns" },
      ],
      "Bohemian": [
        { category: "Crib", item: "Natural Wood Crib", material: "Solid wood", finish: "Natural finish" },
        { category: "Textiles", item: "Macrame Mobile", material: "Cotton rope", finish: "Natural cream" },
        { category: "Storage", item: "Woven Baskets", material: "Rattan", finish: "Natural tan" },
        { category: "Chair", item: "Rattan Rocker", material: "Rattan", finish: "Natural with cushion" },
        { category: "Plants", item: "Safe Plants", material: "Live plants", finish: "Hanging macrame" },
      ],
      "Modern Indian": [
        { category: "Crib", item: "Carved Wood Crib", material: "Solid wood", finish: "White or pastel" },
        { category: "Textiles", item: "Block Print Bedding", material: "Cotton", finish: "Soft patterns" },
        { category: "Storage", item: "Painted Chest", material: "Wood", finish: "Folk art motifs" },
        { category: "Lighting", item: "Paper Lantern", material: "Paper/bamboo", finish: "Soft colors" },
        { category: "Art", item: "Krishna Paintings", material: "Canvas", finish: "Child-friendly" },
      ],
    },
    "Wardrobe": {
      "Art Deco": [
        { category: "Doors", item: "Lacquered Doors", material: "MDF/Wood", finish: "High-gloss with geometric panels" },
        { category: "Hardware", item: "Brass Pulls", material: "Brass", finish: "Polished or antique brass" },
        { category: "Interior", item: "Velvet Lining", material: "Velvet", finish: "Emerald or navy accents" },
        { category: "Lighting", item: "LED Strips", material: "LED", finish: "Warm white" },
        { category: "Mirror", item: "Full-Length Mirror", material: "Glass with frame", finish: "Brass frame" },
      ],
      "Bohemian": [
        { category: "Doors", item: "Carved Wood Doors", material: "Reclaimed wood", finish: "Natural distressed" },
        { category: "Hardware", item: "Vintage Pulls", material: "Mixed metals", finish: "Eclectic collection" },
        { category: "Interior", item: "Woven Baskets", material: "Rattan", finish: "Natural organization" },
        { category: "Textiles", item: "Fabric Drawer Liners", material: "Cotton", finish: "Block print" },
        { category: "Mirror", item: "Ornate Mirror", material: "Carved frame", finish: "Painted or natural" },
      ],
      "Modern Indian": [
        { category: "Doors", item: "Jaali Pattern Doors", material: "MDF/Wood", finish: "Carved lattice panels" },
        { category: "Hardware", item: "Brass Handles", material: "Brass", finish: "Traditional designs" },
        { category: "Interior", item: "Cedar Lining", material: "Cedar wood", finish: "Natural aromatic" },
        { category: "Accent", item: "Brass Inlay", material: "Brass", finish: "Geometric patterns" },
        { category: "Mirror", item: "Carved Frame Mirror", material: "Solid wood", finish: "Traditional carvings" },
      ],
    },
  };

  const roomSpecs = baseSpecs[roomType] || {};
  return roomSpecs[style] || [
    { category: "Primary", item: `${style} ${roomType} Essential`, material: "Quality materials", finish: "Style-appropriate" },
    { category: "Secondary", item: "Accent Piece", material: "Complementary materials", finish: "Coordinated finish" },
    { category: "Storage", item: "Functional Storage", material: "Matching materials", finish: "Style-specific design" },
    { category: "Lighting", item: "Appropriate Lighting", material: "Style-appropriate", finish: "Matching hardware" },
    { category: "Accessories", item: "Curated Details", material: "Various", finish: "Cohesive styling" },
  ];
};

const getChecklist = (style: string, roomType: string) => {
  const roomSpecific: Record<string, any[]> = {
    "Nursery": [
      { item: "Safety-compliant crib", priority: "Essential", status: "Required" },
      { item: "Soft, dimmable lighting", priority: "Essential", status: "Required" },
      { item: "Easy-access storage", priority: "Essential", status: "Required" },
      { item: "Comfortable nursing chair", priority: "Signature", status: "Required" },
      { item: `${style} style decor`, priority: "Recommended", status: "Optional" },
    ],
    "Wardrobe": [
      { item: "Adequate hanging space", priority: "Essential", status: "Required" },
      { item: "Drawer organization", priority: "Essential", status: "Required" },
      { item: "Good interior lighting", priority: "Signature", status: "Required" },
      { item: "Full-length mirror", priority: "Signature", status: "Required" },
      { item: `${style} style finishes`, priority: "Recommended", status: "Optional" },
    ],
  };

  return roomSpecific[roomType] || [
    { item: `${style} style layout`, priority: "Essential", status: "Required" },
    { item: "Proper organization", priority: "Essential", status: "Required" },
    { item: "Good lighting", priority: "Signature", status: "Required" },
    { item: "Quality materials", priority: "Essential", status: "Required" },
    { item: "Style-appropriate accents", priority: "Recommended", status: "Optional" },
  ];
};

const getFinishes = (style: string, roomType: string) => {
  const styleFinishes: Record<string, string[][]> = {
    "Art Deco": [
      ["High-Gloss Lacquer", "Signature Art Deco", "Premium+", "★★★★★"],
      ["Polished Brass Hardware", "Glamorous touch", "Premium", "★★★★★"],
      ["Geometric Panels", "Iconic Deco pattern", "Premium", "★★★★★"],
      ["Velvet Accents", "Luxe texture", "Premium", "★★★★★"],
    ],
    "Bohemian": [
      ["Natural Wood", "Warm organic", "Mid-range", "★★★★★"],
      ["Carved Details", "Artisan feel", "Mid-range", "★★★★★"],
      ["Woven Elements", "Texture interest", "Budget-Mid", "★★★★☆"],
      ["Mixed Patterns", "Eclectic charm", "Mid-range", "★★★★★"],
    ],
    "Modern Indian": [
      ["Jaali Patterns", "Traditional craft", "Premium", "★★★★★"],
      ["Brass Inlay", "Heritage luxury", "Premium+", "★★★★★"],
      ["Rich Wood Tones", "Sheesham finish", "Premium", "★★★★★"],
      ["Traditional Carvings", "Artisan work", "Premium+", "★★★★★"],
    ],
  };

  return styleFinishes[style] || [
    ["Quality Laminate", "Durable finish", "Mid-range", "★★★★☆"],
    ["Wood Veneer", "Natural look", "Premium", "★★★★★"],
    ["Painted Finish", "Customizable", "Mid-range", "★★★★☆"],
    ["Metal Hardware", "Modern touch", "Premium", "★★★★☆"],
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

    console.log("Loading Batch 4: Nursery, Wardrobe for all 13 styles");

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

    console.log(`Batch 4 complete: ${loadedCount} loaded, ${errorCount} errors, ${count} total in database`);

    return new Response(
      JSON.stringify({
        success: true,
        batch: "Batch 4: Nursery, Wardrobe",
        loaded: loadedCount,
        errors: errorCount,
        totalInDatabase: count,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in load-smart-defaults-batch4:", error);
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
