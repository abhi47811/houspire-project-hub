/**
 * Enhanced Seed Smart Defaults Edge Function
 * Loads 182 smart default combinations (13 styles × 14 room types including Study)
 * With budget tier multipliers, city multipliers, and GST rates
 */
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

// ============= CITY MULTIPLIERS (11 Cities) =============
export const CITY_MULTIPLIERS: Record<string, number> = {
  "Mumbai": 1.15,
  "Delhi": 1.10,
  "Bangalore": 1.08,
  "Chennai": 1.05,
  "Hyderabad": 1.03,
  "Pune": 1.00,
  "Kolkata": 0.98,
  "Ahmedabad": 0.95,
  "Jaipur": 0.92,
  "Lucknow": 0.88,
  "Surat": 0.85,
};

// ============= GST RATES BY CATEGORY =============
export const GST_RATES: Record<string, number> = {
  "furniture": 0.18,      // 18% GST
  "fixtures": 0.18,
  "flooring": 0.18,
  "wall_treatment": 0.18,
  "ceiling": 0.18,
  "lighting": 0.18,
  "fabrics": 0.12,        // 12% GST
  "curtains": 0.12,
  "upholstery": 0.12,
  "rugs": 0.12,
  "decor": 0.12,
  "artwork": 0.12,
  "plants": 0.05,         // 5% GST
  "services": 0.18,       // Installation/labor
};

// ============= BUDGET TIER MULTIPLIERS =============
export const TIER_MULTIPLIERS = {
  "Premium": 2.5,
  "Mid": 1.0,
  "Budget": 0.5,
};

// ============= 13 DESIGN STYLES =============
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

// ============= 14 ROOM TYPES (Added Study) =============
const ROOM_TYPES = [
  { room_type: "Balcony", room_type_slug: "balcony" },
  { room_type: "Bathroom", room_type_slug: "bathroom" },
  { room_type: "Dining Room", room_type_slug: "dining_room" },
  { room_type: "Foyer", room_type_slug: "foyer" },
  { room_type: "Guest Bedroom", room_type_slug: "guest_bedroom" },
  { room_type: "Home Office", room_type_slug: "home_office" },
  { room_type: "Kids Room", room_type_slug: "kids_room" },
  { room_type: "Kitchen", room_type_slug: "kitchen" },
  { room_type: "Living Room", room_type_slug: "living_room" },
  { room_type: "Master Bedroom", room_type_slug: "master_bedroom" },
  { room_type: "Nursery", room_type_slug: "nursery" },
  { room_type: "Pooja Room", room_type_slug: "pooja_room" },
  { room_type: "Study", room_type_slug: "study" },
  { room_type: "Wardrobe", room_type_slug: "wardrobe" },
];

// Generate all 182 combinations (13 styles × 14 room types)
const SMART_DEFAULTS_DATA = STYLES.flatMap(style => 
  ROOM_TYPES.map(room => ({
    style: style.style,
    room_type: room.room_type,
    style_slug: style.style_slug,
    room_type_slug: room.room_type_slug,
  }))
);

// ============= SPECIFICATIONS BY ROOM TYPE =============
function getDefaultSpecifications(roomType: string, style: string): Array<{item: string; description: string; base_price: number; category: string}> {
  const baseSpecs: Record<string, Array<{item: string; description: string; base_price: number; category: string}>> = {
    "Living Room": [
      { item: "Sofa", description: "3-seater with matching cushions", base_price: 45000, category: "furniture" },
      { item: "Coffee Table", description: "Center table with storage", base_price: 15000, category: "furniture" },
      { item: "TV Unit", description: "Wall-mounted entertainment unit", base_price: 35000, category: "furniture" },
      { item: "Side Tables", description: "Accent tables x2", base_price: 12000, category: "furniture" },
      { item: "Floor Lamp", description: "Statement lighting piece", base_price: 8000, category: "lighting" },
      { item: "Rug", description: "Area rug 8x10 ft", base_price: 18000, category: "rugs" },
      { item: "Curtains", description: "Floor-length window treatment", base_price: 12000, category: "curtains" },
    ],
    "Master Bedroom": [
      { item: "Bed", description: "King size with upholstered headboard", base_price: 55000, category: "furniture" },
      { item: "Nightstands", description: "Matching pair x2", base_price: 16000, category: "furniture" },
      { item: "Dresser", description: "With mirror", base_price: 28000, category: "furniture" },
      { item: "Wardrobe", description: "Built-in or freestanding", base_price: 85000, category: "furniture" },
      { item: "Bench", description: "End-of-bed seating", base_price: 12000, category: "furniture" },
      { item: "Bedding Set", description: "Premium cotton set", base_price: 8000, category: "fabrics" },
    ],
    "Kitchen": [
      { item: "Cabinets", description: "Upper and lower modular units", base_price: 150000, category: "fixtures" },
      { item: "Countertop", description: "Quartz or granite surface", base_price: 45000, category: "fixtures" },
      { item: "Backsplash", description: "Tile or stone treatment", base_price: 25000, category: "wall_treatment" },
      { item: "Island/Breakfast Counter", description: "With seating", base_price: 35000, category: "furniture" },
      { item: "Pendant Lights", description: "Over counter x3", base_price: 15000, category: "lighting" },
    ],
    "Bathroom": [
      { item: "Vanity", description: "With storage and mirror", base_price: 35000, category: "fixtures" },
      { item: "Shower Area", description: "Glass partition with rain shower", base_price: 45000, category: "fixtures" },
      { item: "WC", description: "Wall-hung or floor-mounted", base_price: 18000, category: "fixtures" },
      { item: "Accessories", description: "Towel rails, hooks, shelving", base_price: 8000, category: "fixtures" },
      { item: "Floor Tiles", description: "Anti-slip tiles", base_price: 15000, category: "flooring" },
    ],
    "Dining Room": [
      { item: "Dining Table", description: "6-8 seater", base_price: 45000, category: "furniture" },
      { item: "Dining Chairs", description: "Matching set x6", base_price: 36000, category: "furniture" },
      { item: "Buffet/Sideboard", description: "Storage and display", base_price: 28000, category: "furniture" },
      { item: "Pendant Light", description: "Over table centerpiece", base_price: 18000, category: "lighting" },
      { item: "Rug", description: "Under-table area rug", base_price: 15000, category: "rugs" },
    ],
    "Home Office": [
      { item: "Desk", description: "Work desk with cable management", base_price: 25000, category: "furniture" },
      { item: "Chair", description: "Ergonomic office chair", base_price: 18000, category: "furniture" },
      { item: "Bookshelf", description: "Storage and display unit", base_price: 22000, category: "furniture" },
      { item: "Task Lamp", description: "Adjustable desk lighting", base_price: 5000, category: "lighting" },
      { item: "Filing Cabinet", description: "Document storage", base_price: 12000, category: "furniture" },
    ],
    "Study": [
      { item: "Study Desk", description: "Large desk with drawers", base_price: 28000, category: "furniture" },
      { item: "Study Chair", description: "Ergonomic with lumbar support", base_price: 15000, category: "furniture" },
      { item: "Bookshelves", description: "Wall-mounted shelving system", base_price: 35000, category: "furniture" },
      { item: "Reading Lamp", description: "Adjustable arm lamp", base_price: 6000, category: "lighting" },
      { item: "Pin Board", description: "Cork or fabric board", base_price: 3000, category: "decor" },
    ],
    "Kids Room": [
      { item: "Bed", description: "Single or bunk bed", base_price: 35000, category: "furniture" },
      { item: "Study Table", description: "Child-sized desk", base_price: 15000, category: "furniture" },
      { item: "Storage Units", description: "Toy and book storage", base_price: 22000, category: "furniture" },
      { item: "Wardrobe", description: "Child-height accessible", base_price: 45000, category: "furniture" },
      { item: "Play Mat", description: "Soft floor covering", base_price: 8000, category: "rugs" },
    ],
    "Nursery": [
      { item: "Crib", description: "Convertible baby crib", base_price: 25000, category: "furniture" },
      { item: "Changing Table", description: "With storage", base_price: 18000, category: "furniture" },
      { item: "Rocking Chair", description: "Nursing chair", base_price: 15000, category: "furniture" },
      { item: "Storage", description: "Baby essentials organizer", base_price: 12000, category: "furniture" },
      { item: "Mobile", description: "Ceiling mobile", base_price: 3000, category: "decor" },
    ],
    "Pooja Room": [
      { item: "Mandir", description: "Wall-mounted or freestanding", base_price: 35000, category: "furniture" },
      { item: "Platform", description: "Raised seating platform", base_price: 15000, category: "furniture" },
      { item: "Storage", description: "Pooja items storage", base_price: 12000, category: "furniture" },
      { item: "Bell", description: "Traditional brass bell", base_price: 2000, category: "decor" },
      { item: "Diya Stand", description: "Brass lamp stand", base_price: 3000, category: "decor" },
    ],
    "Foyer": [
      { item: "Console Table", description: "Entry console", base_price: 18000, category: "furniture" },
      { item: "Mirror", description: "Statement mirror", base_price: 12000, category: "decor" },
      { item: "Shoe Cabinet", description: "Concealed storage", base_price: 25000, category: "furniture" },
      { item: "Pendant Light", description: "Entry chandelier", base_price: 15000, category: "lighting" },
      { item: "Key Holder", description: "Wall-mounted organizer", base_price: 2000, category: "decor" },
    ],
    "Guest Bedroom": [
      { item: "Bed", description: "Queen size with headboard", base_price: 40000, category: "furniture" },
      { item: "Nightstand", description: "Single unit", base_price: 8000, category: "furniture" },
      { item: "Wardrobe", description: "Guest closet", base_price: 55000, category: "furniture" },
      { item: "Chair", description: "Reading chair", base_price: 12000, category: "furniture" },
      { item: "Bedding Set", description: "Quality cotton set", base_price: 6000, category: "fabrics" },
    ],
    "Balcony": [
      { item: "Seating Set", description: "Weather-resistant set", base_price: 25000, category: "furniture" },
      { item: "Planters", description: "Set of decorative planters", base_price: 8000, category: "plants" },
      { item: "Outdoor Rug", description: "Weather-resistant rug", base_price: 6000, category: "rugs" },
      { item: "Lighting", description: "String or solar lights", base_price: 5000, category: "lighting" },
      { item: "Table", description: "Small side table", base_price: 8000, category: "furniture" },
    ],
    "Wardrobe": [
      { item: "Wardrobe System", description: "Built-in modular system", base_price: 120000, category: "fixtures" },
      { item: "Drawers", description: "Internal drawer units", base_price: 25000, category: "fixtures" },
      { item: "Accessories Trays", description: "Jewelry and accessory storage", base_price: 8000, category: "fixtures" },
      { item: "Mirror", description: "Full-length mirror", base_price: 12000, category: "decor" },
      { item: "Lighting", description: "Interior LED strips", base_price: 8000, category: "lighting" },
    ],
  };
  
  return baseSpecs[roomType] || [
    { item: "Primary Furniture", description: `${style} style main piece`, base_price: 40000, category: "furniture" },
    { item: "Secondary Furniture", description: "Accent pieces", base_price: 20000, category: "furniture" },
    { item: "Lighting", description: "Ambient and task lighting", base_price: 15000, category: "lighting" },
    { item: "Decor", description: "Style-appropriate accessories", base_price: 10000, category: "decor" },
  ];
}

// ============= FINISHES BY STYLE WITH TIER OPTIONS =============
function getDefaultFinishes(style: string): {
  tier_options: {
    Premium: Array<{type: string; value: string; color?: string; price_per_sqft: number}>;
    Mid: Array<{type: string; value: string; color?: string; price_per_sqft: number}>;
    Budget: Array<{type: string; value: string; color?: string; price_per_sqft: number}>;
  }
} {
  const styleFinishes: Record<string, {
    tier_options: {
      Premium: Array<{type: string; value: string; color?: string; price_per_sqft: number}>;
      Mid: Array<{type: string; value: string; color?: string; price_per_sqft: number}>;
      Budget: Array<{type: string; value: string; color?: string; price_per_sqft: number}>;
    }
  }> = {
    "Art Deco": {
      tier_options: {
        Premium: [
          { type: "flooring", value: "Italian marble with geometric inlay", color: "#1A1A1A", price_per_sqft: 850 },
          { type: "walls", value: "Velvet panels with gold leaf accents", color: "#C9A962", price_per_sqft: 450 },
          { type: "ceiling", value: "Ornate plaster with gold detailing", price_per_sqft: 380 },
          { type: "lighting", value: "Crystal chandelier with brass fixtures", price_per_sqft: 0 },
        ],
        Mid: [
          { type: "flooring", value: "Indian marble with geometric pattern", color: "#2A2A2A", price_per_sqft: 450 },
          { type: "walls", value: "Textured paint with metallic accents", color: "#D4AF37", price_per_sqft: 180 },
          { type: "ceiling", value: "POP with cove lighting", price_per_sqft: 150 },
          { type: "lighting", value: "Art Deco inspired pendant", price_per_sqft: 0 },
        ],
        Budget: [
          { type: "flooring", value: "Vitrified tiles with art deco pattern", color: "#3A3A3A", price_per_sqft: 180 },
          { type: "walls", value: "Wallpaper with geometric pattern", color: "#BFA75D", price_per_sqft: 85 },
          { type: "ceiling", value: "Plain POP with basic lighting", price_per_sqft: 80 },
          { type: "lighting", value: "Basic pendant fixtures", price_per_sqft: 0 },
        ],
      }
    },
    "Minimalist": {
      tier_options: {
        Premium: [
          { type: "flooring", value: "European oak engineered wood", color: "#E8DCC4", price_per_sqft: 650 },
          { type: "walls", value: "Micro-cement with subtle texture", color: "#FFFFFF", price_per_sqft: 320 },
          { type: "ceiling", value: "Seamless white with hidden LED", price_per_sqft: 280 },
          { type: "lighting", value: "Recessed architectural lighting", price_per_sqft: 0 },
        ],
        Mid: [
          { type: "flooring", value: "Indian laminate wood finish", color: "#F0E6D8", price_per_sqft: 280 },
          { type: "walls", value: "Matt finish paint", color: "#FAFAFA", price_per_sqft: 120 },
          { type: "ceiling", value: "White POP with profile lights", price_per_sqft: 150 },
          { type: "lighting", value: "Minimal pendants and spots", price_per_sqft: 0 },
        ],
        Budget: [
          { type: "flooring", value: "Vinyl wood-look flooring", color: "#F5EBE0", price_per_sqft: 120 },
          { type: "walls", value: "Basic white paint", color: "#FFFFFF", price_per_sqft: 45 },
          { type: "ceiling", value: "Plain ceiling with surface lights", price_per_sqft: 60 },
          { type: "lighting", value: "Basic ceiling lights", price_per_sqft: 0 },
        ],
      }
    },
    "Modern Indian": {
      tier_options: {
        Premium: [
          { type: "flooring", value: "Italian marble with traditional border", color: "#E8D5B7", price_per_sqft: 750 },
          { type: "walls", value: "Hand-painted ethnic motifs", color: "#C45D3E", price_per_sqft: 380 },
          { type: "ceiling", value: "Coffered ceiling with brass inlay", price_per_sqft: 420 },
          { type: "lighting", value: "Designer brass chandelier", price_per_sqft: 0 },
        ],
        Mid: [
          { type: "flooring", value: "Indian marble with simple border", color: "#F0E0C8", price_per_sqft: 380 },
          { type: "walls", value: "Textured paint with accent wall", color: "#D47D5C", price_per_sqft: 150 },
          { type: "ceiling", value: "False ceiling with cove lighting", price_per_sqft: 180 },
          { type: "lighting", value: "Modern brass fixtures", price_per_sqft: 0 },
        ],
        Budget: [
          { type: "flooring", value: "Vitrified tiles marble look", color: "#F8EED8", price_per_sqft: 150 },
          { type: "walls", value: "Stencil work on accent wall", color: "#E59D7E", price_per_sqft: 75 },
          { type: "ceiling", value: "Basic POP with chandelier point", price_per_sqft: 90 },
          { type: "lighting", value: "Traditional style pendant", price_per_sqft: 0 },
        ],
      }
    },
    "Scandinavian": {
      tier_options: {
        Premium: [
          { type: "flooring", value: "Light ash European hardwood", color: "#F7F3EE", price_per_sqft: 680 },
          { type: "walls", value: "Limewash with texture", color: "#FAFAFA", price_per_sqft: 250 },
          { type: "ceiling", value: "White with exposed wood beams", price_per_sqft: 350 },
          { type: "lighting", value: "Designer wood pendants", price_per_sqft: 0 },
        ],
        Mid: [
          { type: "flooring", value: "Oak laminate flooring", color: "#F5F0E8", price_per_sqft: 280 },
          { type: "walls", value: "Soft white matt paint", color: "#FCFCFC", price_per_sqft: 110 },
          { type: "ceiling", value: "White POP with wood accent", price_per_sqft: 180 },
          { type: "lighting", value: "Scandinavian style pendants", price_per_sqft: 0 },
        ],
        Budget: [
          { type: "flooring", value: "Light wood vinyl", color: "#FAF7F2", price_per_sqft: 130 },
          { type: "walls", value: "White emulsion paint", color: "#FFFFFF", price_per_sqft: 50 },
          { type: "ceiling", value: "Plain white ceiling", price_per_sqft: 60 },
          { type: "lighting", value: "Simple white pendants", price_per_sqft: 0 },
        ],
      }
    },
    "Industrial": {
      tier_options: {
        Premium: [
          { type: "flooring", value: "Polished concrete with sealer", color: "#4A4A4A", price_per_sqft: 350 },
          { type: "walls", value: "Exposed brick restoration", color: "#8B7355", price_per_sqft: 280 },
          { type: "ceiling", value: "Exposed steel beams and ductwork", price_per_sqft: 450 },
          { type: "lighting", value: "Vintage industrial cage lights", price_per_sqft: 0 },
        ],
        Mid: [
          { type: "flooring", value: "Concrete look tiles", color: "#5A5A5A", price_per_sqft: 180 },
          { type: "walls", value: "Brick veneer panels", color: "#9B8365", price_per_sqft: 150 },
          { type: "ceiling", value: "Painted exposed services", price_per_sqft: 120 },
          { type: "lighting", value: "Metal cage pendants", price_per_sqft: 0 },
        ],
        Budget: [
          { type: "flooring", value: "Grey vitrified tiles", color: "#6A6A6A", price_per_sqft: 95 },
          { type: "walls", value: "Brick wallpaper", color: "#AB9375", price_per_sqft: 65 },
          { type: "ceiling", value: "Dark painted ceiling", price_per_sqft: 50 },
          { type: "lighting", value: "Edison bulb fixtures", price_per_sqft: 0 },
        ],
      }
    },
    "Contemporary": {
      tier_options: {
        Premium: [
          { type: "flooring", value: "Large format Italian tiles", color: "#F5F5F5", price_per_sqft: 580 },
          { type: "walls", value: "Textured paint with accent wall", color: "#333333", price_per_sqft: 180 },
          { type: "ceiling", value: "Multi-level POP with cove lighting", price_per_sqft: 280 },
          { type: "lighting", value: "Designer track and pendant lights", price_per_sqft: 0 },
        ],
        Mid: [
          { type: "flooring", value: "Large format vitrified tiles", color: "#E8E8E8", price_per_sqft: 220 },
          { type: "walls", value: "Matt paint with PU wall panel", color: "#444444", price_per_sqft: 120 },
          { type: "ceiling", value: "Simple false ceiling with profiles", price_per_sqft: 160 },
          { type: "lighting", value: "Modern pendants and spots", price_per_sqft: 0 },
        ],
        Budget: [
          { type: "flooring", value: "Standard vitrified tiles", color: "#DADADA", price_per_sqft: 110 },
          { type: "walls", value: "Paint with texture on accent", color: "#555555", price_per_sqft: 60 },
          { type: "ceiling", value: "Basic POP ceiling", price_per_sqft: 85 },
          { type: "lighting", value: "Surface mounted fixtures", price_per_sqft: 0 },
        ],
      }
    },
    "Bohemian": {
      tier_options: {
        Premium: [
          { type: "flooring", value: "Handcrafted terracotta tiles", color: "#D4A574", price_per_sqft: 420 },
          { type: "walls", value: "Hand-painted murals with textiles", color: "#8B4B62", price_per_sqft: 350 },
          { type: "ceiling", value: "Bamboo/rattan ceiling treatment", price_per_sqft: 320 },
          { type: "lighting", value: "Handwoven pendant lights", price_per_sqft: 0 },
        ],
        Mid: [
          { type: "flooring", value: "Terracotta look tiles", color: "#E4B584", price_per_sqft: 180 },
          { type: "walls", value: "Textured paint with macrame", color: "#9B5B72", price_per_sqft: 140 },
          { type: "ceiling", value: "Jute rope/bamboo accents", price_per_sqft: 150 },
          { type: "lighting", value: "Woven basket pendants", price_per_sqft: 0 },
        ],
        Budget: [
          { type: "flooring", value: "Rustic vitrified tiles", color: "#F4C594", price_per_sqft: 95 },
          { type: "walls", value: "Colorful paint with tapestry", color: "#AB6B82", price_per_sqft: 70 },
          { type: "ceiling", value: "Plain with hanging fabric", price_per_sqft: 50 },
          { type: "lighting", value: "String lights and basic fixtures", price_per_sqft: 0 },
        ],
      }
    },
    "Traditional Indian": {
      tier_options: {
        Premium: [
          { type: "flooring", value: "Imported marble with brass inlay", color: "#DAA520", price_per_sqft: 950 },
          { type: "walls", value: "Hand-carved wooden panels", color: "#8B1A1A", price_per_sqft: 580 },
          { type: "ceiling", value: "Carved rosewood ceiling", price_per_sqft: 650 },
          { type: "lighting", value: "Crystal and brass chandelier", price_per_sqft: 0 },
        ],
        Mid: [
          { type: "flooring", value: "Indian marble with simple inlay", color: "#EAB530", price_per_sqft: 420 },
          { type: "walls", value: "CNC cut panels with paint", color: "#9B2A2A", price_per_sqft: 280 },
          { type: "ceiling", value: "POP with carved design", price_per_sqft: 250 },
          { type: "lighting", value: "Brass traditional fixtures", price_per_sqft: 0 },
        ],
        Budget: [
          { type: "flooring", value: "Marble look vitrified", color: "#FAC540", price_per_sqft: 150 },
          { type: "walls", value: "Ethnic wallpaper and paint", color: "#AB3A3A", price_per_sqft: 85 },
          { type: "ceiling", value: "Simple POP with motif", price_per_sqft: 100 },
          { type: "lighting", value: "Traditional pendant", price_per_sqft: 0 },
        ],
      }
    },
    "Japandi": {
      tier_options: {
        Premium: [
          { type: "flooring", value: "Japanese oak wide planks", color: "#E8DCC4", price_per_sqft: 720 },
          { type: "walls", value: "Shoji-inspired panels with lime", color: "#F5F5F5", price_per_sqft: 280 },
          { type: "ceiling", value: "Light wood slat ceiling", price_per_sqft: 380 },
          { type: "lighting", value: "Paper and wood lanterns", price_per_sqft: 0 },
        ],
        Mid: [
          { type: "flooring", value: "Light oak engineered wood", color: "#F0E4D4", price_per_sqft: 350 },
          { type: "walls", value: "Neutral textured paint", color: "#FAFAFA", price_per_sqft: 130 },
          { type: "ceiling", value: "White with wood accent strips", price_per_sqft: 180 },
          { type: "lighting", value: "Minimal rice paper pendants", price_per_sqft: 0 },
        ],
        Budget: [
          { type: "flooring", value: "Light wood laminate", color: "#F8ECD4", price_per_sqft: 140 },
          { type: "walls", value: "Off-white paint", color: "#FFFEF5", price_per_sqft: 55 },
          { type: "ceiling", value: "Plain white ceiling", price_per_sqft: 60 },
          { type: "lighting", value: "Simple natural fixtures", price_per_sqft: 0 },
        ],
      }
    },
  };
  
  // Default for styles not explicitly defined
  const defaultFinishes = {
    tier_options: {
      Premium: [
        { type: "flooring", value: "Premium quality flooring", price_per_sqft: 500 },
        { type: "walls", value: "High-end wall treatment", price_per_sqft: 250 },
        { type: "ceiling", value: "Premium ceiling design", price_per_sqft: 300 },
        { type: "lighting", value: "Designer lighting fixtures", price_per_sqft: 0 },
      ],
      Mid: [
        { type: "flooring", value: "Quality flooring", price_per_sqft: 250 },
        { type: "walls", value: "Standard wall treatment", price_per_sqft: 120 },
        { type: "ceiling", value: "False ceiling", price_per_sqft: 150 },
        { type: "lighting", value: "Modern lighting", price_per_sqft: 0 },
      ],
      Budget: [
        { type: "flooring", value: "Basic flooring", price_per_sqft: 100 },
        { type: "walls", value: "Basic wall paint", price_per_sqft: 50 },
        { type: "ceiling", value: "Simple ceiling", price_per_sqft: 70 },
        { type: "lighting", value: "Basic lighting", price_per_sqft: 0 },
      ],
    }
  };
  
  return styleFinishes[style] || defaultFinishes;
}

// ============= CHECKLIST BY ROOM TYPE =============
function getDefaultChecklist(roomType: string): string[] {
  const checklists: Record<string, string[]> = {
    "Living Room": [
      "Comfortable seating for family and guests",
      "Adequate storage for media and accessories",
      "Proper lighting zones (ambient, task, accent)",
      "Window treatments for light control",
      "Entertainment center setup",
      "Traffic flow consideration",
      "Conversation grouping",
    ],
    "Master Bedroom": [
      "Quality mattress and bedding",
      "Adequate closet/wardrobe space",
      "Bedside lighting and power outlets",
      "Privacy window treatments",
      "Mirror and dressing area",
      "Reading light setup",
      "Climate control consideration",
    ],
    "Kitchen": [
      "Work triangle efficiency (sink, stove, fridge)",
      "Adequate counter space",
      "Proper ventilation (chimney)",
      "Task lighting over work areas",
      "Easy-clean surfaces",
      "Storage optimization",
      "Garbage/recycling system",
    ],
    "Bathroom": [
      "Waterproof flooring and walls",
      "Adequate ventilation (exhaust fan)",
      "Anti-slip surfaces",
      "Proper drainage slope",
      "Storage for toiletries",
      "Mirror with lighting",
      "Towel storage and hooks",
    ],
    "Dining Room": [
      "Table size for family + guests",
      "Adequate circulation space",
      "Pendant/chandelier over table",
      "Easy access from kitchen",
      "Storage for dinnerware",
      "Window for natural light",
    ],
    "Home Office": [
      "Ergonomic seating setup",
      "Adequate desk space",
      "Natural light positioning",
      "Task lighting",
      "Cable management",
      "Storage for documents",
      "Acoustic consideration",
    ],
    "Study": [
      "Quiet location",
      "Good natural light",
      "Ergonomic furniture",
      "Book storage",
      "Power outlets for devices",
      "Focus-friendly environment",
    ],
    "Kids Room": [
      "Safety considerations",
      "Growth-friendly furniture",
      "Play area",
      "Study zone",
      "Adequate storage for toys",
      "Easy-clean surfaces",
    ],
    "Nursery": [
      "Safe sleeping arrangement",
      "Diaper changing station",
      "Nursing area",
      "Blackout curtains",
      "Soft, washable surfaces",
      "Monitor placement",
    ],
    "Pooja Room": [
      "East or North facing if possible",
      "Adequate ventilation",
      "Non-slip flooring",
      "Storage for pooja items",
      "Proper lighting",
      "Bell and diya placement",
    ],
  };
  
  return checklists[roomType] || [
    "Functional layout for intended use",
    "Adequate lighting",
    "Proper ventilation",
    "Style-consistent finishes",
    "Storage solutions",
    "Safety considerations",
  ];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check for service role authorization
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.includes("service_role") && !authHeader?.includes("Bearer")) {
      console.log("Warning: No service role auth, but proceeding for edge function");
    }

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
    
    const { action } = await req.json();
    
    if (action === "seed") {
      console.log(`Starting smart defaults seeding... Total combinations: ${SMART_DEFAULTS_DATA.length}`);
      
      // Check existing count
      const { count: existingCount } = await supabase
        .from("smart_defaults")
        .select("*", { count: "exact", head: true });
      
      console.log(`Existing records: ${existingCount}`);
      
      // Get existing records to check for upsert
      const { data: existingRecords } = await supabase
        .from("smart_defaults")
        .select("id, style_slug, room_type_slug");
      
      const existingMap = new Map(
        (existingRecords || []).map(r => [`${r.style_slug}__${r.room_type_slug}`, r.id])
      );
      
      // Prepare all 182 records with enhanced data
      let insertedCount = 0;
      let updatedCount = 0;
      let errorCount = 0;
      
      for (const item of SMART_DEFAULTS_DATA) {
        const record = {
          style: item.style,
          room_type: item.room_type,
          style_slug: item.style_slug,
          room_type_slug: item.room_type_slug,
          specifications: getDefaultSpecifications(item.room_type, item.style),
          finishes: getDefaultFinishes(item.style),
          checklist: getDefaultChecklist(item.room_type),
          source_file: `enhanced_${item.room_type_slug}_${item.style_slug}.json`,
        };
        
        const existingId = existingMap.get(`${item.style_slug}__${item.room_type_slug}`);
        
        if (existingId) {
          // Update existing
          const { error } = await supabase
            .from("smart_defaults")
            .update({
              specifications: record.specifications,
              finishes: record.finishes,
              checklist: record.checklist,
              source_file: record.source_file,
              updated_at: new Date().toISOString(),
            })
            .eq("id", existingId);
          
          if (error) {
            console.error(`Error updating ${item.style} - ${item.room_type}:`, error);
            errorCount++;
          } else {
            updatedCount++;
          }
        } else {
          // Insert new
          const { error } = await supabase
            .from("smart_defaults")
            .insert(record);
          
          if (error) {
            console.error(`Error inserting ${item.style} - ${item.room_type}:`, error);
            errorCount++;
          } else {
            insertedCount++;
          }
        }
      }
      
      // Get final count
      const { count: finalCount } = await supabase
        .from("smart_defaults")
        .select("*", { count: "exact", head: true });
      
      const message = `Seeded ${insertedCount} new records, updated ${updatedCount} existing, total ${finalCount}`;
      console.log(message);
      
      return new Response(
        JSON.stringify({
          success: true,
          message,
          stats: {
            existingBefore: existingCount,
            inserted: insertedCount,
            updated: updatedCount,
            errors: errorCount,
            totalAfter: finalCount,
            expectedTotal: 182,
          },
          constants: {
            cityMultipliers: CITY_MULTIPLIERS,
            gstRates: GST_RATES,
            tierMultipliers: TIER_MULTIPLIERS,
          }
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    if (action === "status") {
      const { count } = await supabase
        .from("smart_defaults")
        .select("*", { count: "exact", head: true });
      
      const { data: styles } = await supabase.rpc("get_available_styles");
      const { data: roomTypes } = await supabase.rpc("get_available_room_types");
      
      // Calculate coverage
      const expectedTotal = 182; // 13 styles × 14 room types
      const coverage = count ? Math.round((count / expectedTotal) * 100) : 0;
      
      return new Response(
        JSON.stringify({
          totalRecords: count,
          expectedRecords: expectedTotal,
          coverage: `${coverage}%`,
          styles: styles?.length || 0,
          roomTypes: roomTypes?.length || 0,
          complete: count === expectedTotal,
          constants: {
            cityMultipliers: CITY_MULTIPLIERS,
            gstRates: GST_RATES,
            tierMultipliers: TIER_MULTIPLIERS,
          }
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    if (action === "constants") {
      return new Response(
        JSON.stringify({
          cityMultipliers: CITY_MULTIPLIERS,
          gstRates: GST_RATES,
          tierMultipliers: TIER_MULTIPLIERS,
          totalCombinations: SMART_DEFAULTS_DATA.length,
          styles: STYLES,
          roomTypes: ROOM_TYPES,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    return new Response(
      JSON.stringify({ error: "Unknown action. Use 'seed', 'status', or 'constants'" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
