import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// 38 missing smart defaults combinations
const missingDefaults = [
  // BALCONY - 12 styles missing
  {
    style: "Bohemian", room_type: "Balcony", style_slug: "bohemian", room_type_slug: "balcony",
    specifications: [
      {"CATEGORY": "SEATING", "ITEM": "Floor Cushions/Poufs", "STYLE/PATTERN": "Moroccan or Indian prints", "MATERIAL OPTIONS": "Cotton, Jute, Kilim fabric", "COLOR/FINISH": "Terracotta, Mustard, Teal", "NOTES": "SIGNATURE - Layered bohemian seating"},
      {"CATEGORY": "FLOORING", "ITEM": "Outdoor Rug", "STYLE/PATTERN": "Kilim or Tribal Pattern", "MATERIAL OPTIONS": "Polypropylene, Recycled materials", "COLOR/FINISH": "Multi-color, Earth tones", "NOTES": "Weather-resistant"},
      {"CATEGORY": "LIGHTING", "ITEM": "String Lights/Lanterns", "STYLE/PATTERN": "Moroccan Lanterns", "MATERIAL OPTIONS": "Metal, Glass, Rattan", "COLOR/FINISH": "Brass, Copper, Natural", "NOTES": "ICONIC - Ambient lighting"},
      {"CATEGORY": "PLANTERS", "ITEM": "Macrame Plant Hangers", "STYLE/PATTERN": "Handwoven Macrame", "MATERIAL OPTIONS": "Cotton rope, Jute", "COLOR/FINISH": "Natural, Cream", "NOTES": "Multiple heights"},
      {"CATEGORY": "TEXTILES", "ITEM": "Throw Blankets", "STYLE/PATTERN": "Fringe and Tassels", "MATERIAL OPTIONS": "Cotton, Wool blend", "COLOR/FINISH": "Warm earth tones", "NOTES": "Layered texture"}
    ],
    checklist: [{"CATEGORY": "SEATING", "ITEM": "Floor cushions or poufs", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "LIGHTING", "ITEM": "Moroccan lanterns", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}],
    finishes: [["Terracotta", "Warm earth tone", "⭐⭐⭐⭐⭐"], ["Natural Jute", "Organic texture", "⭐⭐⭐⭐⭐"], ["Brass Patina", "Aged metal", "⭐⭐⭐⭐⭐"]]
  },
  {
    style: "Coastal Indian", room_type: "Balcony", style_slug: "coastal_indian", room_type_slug: "balcony",
    specifications: [
      {"CATEGORY": "SEATING", "ITEM": "Cane Chairs", "STYLE/PATTERN": "Colonial Cane Design", "MATERIAL OPTIONS": "Rattan, Cane, Teak frame", "COLOR/FINISH": "Natural, White wash", "NOTES": "SIGNATURE - Indian coastal heritage"},
      {"CATEGORY": "FLOORING", "ITEM": "Blue Pottery Tiles", "STYLE/PATTERN": "Jaipur Blue Pottery", "MATERIAL OPTIONS": "Ceramic, Porcelain", "COLOR/FINISH": "Blue and White", "NOTES": "ICONIC - Indian craft"},
      {"CATEGORY": "LIGHTING", "ITEM": "Brass Lanterns", "STYLE/PATTERN": "Jali Pattern", "MATERIAL OPTIONS": "Brass, Copper", "COLOR/FINISH": "Antique Brass", "NOTES": "Traditional Indian"},
      {"CATEGORY": "TEXTILES", "ITEM": "Block Print Cushions", "STYLE/PATTERN": "Indigo Block Print", "MATERIAL OPTIONS": "Cotton, Linen", "COLOR/FINISH": "Indigo, White", "NOTES": "Indian artisan craft"},
      {"CATEGORY": "PLANTERS", "ITEM": "Terracotta Pots", "STYLE/PATTERN": "Traditional Indian", "MATERIAL OPTIONS": "Terracotta", "COLOR/FINISH": "Natural clay", "NOTES": "Tropical plants"}
    ],
    checklist: [{"CATEGORY": "SEATING", "ITEM": "Cane furniture", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "TEXTILES", "ITEM": "Block print cushions", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}],
    finishes: [["Indigo Blue", "Traditional dye", "⭐⭐⭐⭐⭐"], ["Natural Cane", "Indian craft", "⭐⭐⭐⭐⭐"], ["Antique Brass", "Patinated finish", "⭐⭐⭐⭐⭐"]]
  },
  {
    style: "Contemporary", room_type: "Balcony", style_slug: "contemporary", room_type_slug: "balcony",
    specifications: [
      {"CATEGORY": "SEATING", "ITEM": "Modular Outdoor Sofa", "STYLE/PATTERN": "Clean Lines", "MATERIAL OPTIONS": "Aluminum frame, Outdoor fabric", "COLOR/FINISH": "Charcoal, White, Gray", "NOTES": "SIGNATURE - Modern silhouette"},
      {"CATEGORY": "FLOORING", "ITEM": "Composite Decking", "STYLE/PATTERN": "Wood Look", "MATERIAL OPTIONS": "WPC, Composite", "COLOR/FINISH": "Gray, Teak tone", "NOTES": "Low maintenance"},
      {"CATEGORY": "LIGHTING", "ITEM": "Recessed or Linear LED", "STYLE/PATTERN": "Minimal", "MATERIAL OPTIONS": "Aluminum, Frosted lens", "COLOR/FINISH": "Black, White", "NOTES": "3000K warm white"},
      {"CATEGORY": "PLANTERS", "ITEM": "Geometric Planters", "STYLE/PATTERN": "Angular shapes", "MATERIAL OPTIONS": "Fiberglass, Metal", "COLOR/FINISH": "Matte Black, White", "NOTES": "Architectural feel"},
      {"CATEGORY": "TABLE", "ITEM": "Side Table", "STYLE/PATTERN": "Sculptural", "MATERIAL OPTIONS": "Metal, Concrete", "COLOR/FINISH": "Black, Gray", "NOTES": "Functional art"}
    ],
    checklist: [{"CATEGORY": "SEATING", "ITEM": "Modular outdoor seating", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "PLANTERS", "ITEM": "Geometric planters", "INCLUDE?": "YES", "PRIORITY": "ESSENTIAL"}],
    finishes: [["Matte Charcoal", "Modern dark neutral", "⭐⭐⭐⭐⭐"], ["White Aluminum", "Clean contemporary", "⭐⭐⭐⭐⭐"], ["Gray Composite", "Sleek decking", "⭐⭐⭐⭐⭐"]]
  },
  {
    style: "Farmhouse", room_type: "Balcony", style_slug: "farmhouse", room_type_slug: "balcony",
    specifications: [
      {"CATEGORY": "SEATING", "ITEM": "Wooden Rocking Chair", "STYLE/PATTERN": "Traditional Rocker", "MATERIAL OPTIONS": "Teak, Acacia", "COLOR/FINISH": "Natural, White wash", "NOTES": "SIGNATURE - Classic farmhouse"},
      {"CATEGORY": "FLOORING", "ITEM": "Reclaimed Wood Decking", "STYLE/PATTERN": "Rustic Planks", "MATERIAL OPTIONS": "Treated wood", "COLOR/FINISH": "Weathered gray, Natural", "NOTES": "Authentic patina"},
      {"CATEGORY": "LIGHTING", "ITEM": "Barn-style Pendant", "STYLE/PATTERN": "Industrial Farm", "MATERIAL OPTIONS": "Metal, Glass", "COLOR/FINISH": "Matte Black, Galvanized", "NOTES": "ICONIC - Rustic charm"},
      {"CATEGORY": "PLANTERS", "ITEM": "Galvanized Buckets", "STYLE/PATTERN": "Vintage Farm", "MATERIAL OPTIONS": "Galvanized metal", "COLOR/FINISH": "Silver patina", "NOTES": "Herbs and flowers"},
      {"CATEGORY": "TEXTILES", "ITEM": "Gingham Cushions", "STYLE/PATTERN": "Buffalo Check", "MATERIAL OPTIONS": "Cotton, Outdoor fabric", "COLOR/FINISH": "Blue/White, Black/White", "NOTES": "Classic pattern"}
    ],
    checklist: [{"CATEGORY": "SEATING", "ITEM": "Wooden rocking chair", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "PLANTERS", "ITEM": "Galvanized containers", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}],
    finishes: [["Weathered Wood", "Natural aged finish", "⭐⭐⭐⭐⭐"], ["Galvanized Metal", "Farm aesthetic", "⭐⭐⭐⭐⭐"], ["Matte Black Iron", "Industrial touch", "⭐⭐⭐⭐⭐"]]
  },
  {
    style: "Industrial", room_type: "Balcony", style_slug: "industrial", room_type_slug: "balcony",
    specifications: [
      {"CATEGORY": "SEATING", "ITEM": "Metal Bistro Set", "STYLE/PATTERN": "Factory Style", "MATERIAL OPTIONS": "Powder-coated steel", "COLOR/FINISH": "Matte Black, Raw Steel", "NOTES": "SIGNATURE - Industrial aesthetic"},
      {"CATEGORY": "FLOORING", "ITEM": "Concrete or Metal Grating", "STYLE/PATTERN": "Raw Industrial", "MATERIAL OPTIONS": "Concrete, Steel grate", "COLOR/FINISH": "Gray, Natural metal", "NOTES": "Authentic materials"},
      {"CATEGORY": "LIGHTING", "ITEM": "Cage Pendant", "STYLE/PATTERN": "Edison Bulb Cage", "MATERIAL OPTIONS": "Steel, Brass", "COLOR/FINISH": "Matte Black, Antique Brass", "NOTES": "ICONIC - Exposed bulb"},
      {"CATEGORY": "PLANTERS", "ITEM": "Metal Pipe Planters", "STYLE/PATTERN": "Pipe and Wood", "MATERIAL OPTIONS": "Steel pipe, Reclaimed wood", "COLOR/FINISH": "Black pipe, Natural wood", "NOTES": "DIY aesthetic"},
      {"CATEGORY": "DECOR", "ITEM": "Vintage Signs", "STYLE/PATTERN": "Industrial Art", "MATERIAL OPTIONS": "Metal, Wood", "COLOR/FINISH": "Aged patina", "NOTES": "Factory nostalgia"}
    ],
    checklist: [{"CATEGORY": "SEATING", "ITEM": "Metal bistro furniture", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "LIGHTING", "ITEM": "Edison cage lights", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}],
    finishes: [["Raw Steel", "Unfinished industrial", "⭐⭐⭐⭐⭐"], ["Matte Black", "Classic industrial", "⭐⭐⭐⭐⭐"], ["Aged Brass", "Vintage warmth", "⭐⭐⭐⭐⭐"]]
  },
  {
    style: "Japandi", room_type: "Balcony", style_slug: "japandi", room_type_slug: "balcony",
    specifications: [
      {"CATEGORY": "SEATING", "ITEM": "Low Platform Bench", "STYLE/PATTERN": "Japanese Low Profile", "MATERIAL OPTIONS": "Solid wood, Rope seat", "COLOR/FINISH": "Light oak, Natural", "NOTES": "SIGNATURE - Zen simplicity"},
      {"CATEGORY": "FLOORING", "ITEM": "Wood Slat Decking", "STYLE/PATTERN": "Slatted Pattern", "MATERIAL OPTIONS": "Teak, Ipe", "COLOR/FINISH": "Natural, Light gray", "NOTES": "Clean lines"},
      {"CATEGORY": "LIGHTING", "ITEM": "Paper Lantern", "STYLE/PATTERN": "Japanese Style", "MATERIAL OPTIONS": "Rice paper, Bamboo", "COLOR/FINISH": "White, Natural", "NOTES": "ICONIC - Soft diffused light"},
      {"CATEGORY": "PLANTERS", "ITEM": "Ceramic Bonsai Pots", "STYLE/PATTERN": "Japanese Ceramic", "MATERIAL OPTIONS": "Stoneware, Ceramic", "COLOR/FINISH": "Earth tones, Black", "NOTES": "Sculptural plants"},
      {"CATEGORY": "TEXTILES", "ITEM": "Linen Cushion", "STYLE/PATTERN": "Simple, No Pattern", "MATERIAL OPTIONS": "Linen, Cotton", "COLOR/FINISH": "Cream, Oatmeal, Gray", "NOTES": "Minimal texture"}
    ],
    checklist: [{"CATEGORY": "SEATING", "ITEM": "Low platform seating", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "LIGHTING", "ITEM": "Paper lanterns", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}],
    finishes: [["Light Oak", "Scandinavian warmth", "⭐⭐⭐⭐⭐"], ["Natural Linen", "Japanese simplicity", "⭐⭐⭐⭐⭐"], ["Matte Black Ceramic", "Zen contrast", "⭐⭐⭐⭐⭐"]]
  },
  {
    style: "Mid-Century Modern", room_type: "Balcony", style_slug: "mid_century_modern", room_type_slug: "balcony",
    specifications: [
      {"CATEGORY": "SEATING", "ITEM": "Acapulco Chairs", "STYLE/PATTERN": "Iconic Mid-Century", "MATERIAL OPTIONS": "Powder-coated steel, PVC cord", "COLOR/FINISH": "Black, White, Yellow", "NOTES": "SIGNATURE - Retro statement"},
      {"CATEGORY": "TABLE", "ITEM": "Hairpin Leg Table", "STYLE/PATTERN": "Hairpin Legs", "MATERIAL OPTIONS": "Wood top, Metal legs", "COLOR/FINISH": "Walnut, Teak", "NOTES": "ICONIC - Classic MCM detail"},
      {"CATEGORY": "LIGHTING", "ITEM": "Sputnik or Globe Light", "STYLE/PATTERN": "Atomic Age", "MATERIAL OPTIONS": "Brass, Glass globes", "COLOR/FINISH": "Polished Brass", "NOTES": "Statement piece"},
      {"CATEGORY": "PLANTERS", "ITEM": "Bullet Planters", "STYLE/PATTERN": "Tapered Cylinder", "MATERIAL OPTIONS": "Fiberglass, Metal", "COLOR/FINISH": "Orange, White, Olive", "NOTES": "Period-accurate colors"},
      {"CATEGORY": "RUG", "ITEM": "Abstract Pattern Rug", "STYLE/PATTERN": "Atomic or Organic", "MATERIAL OPTIONS": "Polypropylene", "COLOR/FINISH": "Bold geometric", "NOTES": "Weather-resistant"}
    ],
    checklist: [{"CATEGORY": "SEATING", "ITEM": "Acapulco or similar chairs", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "TABLE", "ITEM": "Hairpin leg furniture", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}],
    finishes: [["Walnut Wood", "Warm MCM tone", "⭐⭐⭐⭐⭐"], ["Polished Brass", "Retro metal", "⭐⭐⭐⭐⭐"], ["Mustard Yellow", "Period accent", "⭐⭐⭐⭐⭐"]]
  },
  {
    style: "Minimalist", room_type: "Balcony", style_slug: "minimalist", room_type_slug: "balcony",
    specifications: [
      {"CATEGORY": "SEATING", "ITEM": "Simple Bench", "STYLE/PATTERN": "Clean Rectangle", "MATERIAL OPTIONS": "Wood, Metal", "COLOR/FINISH": "White, Light wood", "NOTES": "SIGNATURE - Pure form"},
      {"CATEGORY": "FLOORING", "ITEM": "Large Format Tiles", "STYLE/PATTERN": "No Pattern", "MATERIAL OPTIONS": "Porcelain, Concrete look", "COLOR/FINISH": "White, Light gray", "NOTES": "Seamless appearance"},
      {"CATEGORY": "PLANTERS", "ITEM": "Single Statement Plant", "STYLE/PATTERN": "Architectural Plant", "MATERIAL OPTIONS": "White ceramic pot", "COLOR/FINISH": "Matte white", "NOTES": "One focal point"},
      {"CATEGORY": "LIGHTING", "ITEM": "Recessed Downlight", "STYLE/PATTERN": "Hidden", "MATERIAL OPTIONS": "LED", "COLOR/FINISH": "White trim", "NOTES": "Invisible fixture"},
      {"CATEGORY": "RAILING", "ITEM": "Glass Railing", "STYLE/PATTERN": "Frameless", "MATERIAL OPTIONS": "Tempered glass", "COLOR/FINISH": "Clear", "NOTES": "Maximum openness"}
    ],
    checklist: [{"CATEGORY": "SEATING", "ITEM": "Single simple bench", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "DECOR", "ITEM": "Minimal accessories", "INCLUDE?": "YES", "PRIORITY": "ESSENTIAL"}],
    finishes: [["Matte White", "Pure minimal", "⭐⭐⭐⭐⭐"], ["Light Oak", "Warm neutral", "⭐⭐⭐⭐⭐"], ["Clear Glass", "Invisible boundary", "⭐⭐⭐⭐⭐"]]
  },
  {
    style: "Modern Indian", room_type: "Balcony", style_slug: "modern_indian", room_type_slug: "balcony",
    specifications: [
      {"CATEGORY": "SEATING", "ITEM": "Swing Jhula", "STYLE/PATTERN": "Traditional Indian Swing", "MATERIAL OPTIONS": "Wood, Wrought iron, Brass", "COLOR/FINISH": "Teak, Antique brass", "NOTES": "SIGNATURE - Indian heritage"},
      {"CATEGORY": "FLOORING", "ITEM": "Athangudi Tiles", "STYLE/PATTERN": "South Indian Pattern", "MATERIAL OPTIONS": "Handmade cement tiles", "COLOR/FINISH": "Multi-color traditional", "NOTES": "ICONIC - Indian craft"},
      {"CATEGORY": "LIGHTING", "ITEM": "Brass Hanging Lamp", "STYLE/PATTERN": "Jali or Filigree", "MATERIAL OPTIONS": "Brass, Copper", "COLOR/FINISH": "Antique brass", "NOTES": "Traditional metalwork"},
      {"CATEGORY": "PLANTERS", "ITEM": "Blue Pottery Planters", "STYLE/PATTERN": "Jaipur Blue Pottery", "MATERIAL OPTIONS": "Ceramic", "COLOR/FINISH": "Blue and white", "NOTES": "Indian artisan craft"},
      {"CATEGORY": "TEXTILES", "ITEM": "Kantha Cushions", "STYLE/PATTERN": "Running Stitch Quilting", "MATERIAL OPTIONS": "Cotton", "COLOR/FINISH": "Vibrant traditional colors", "NOTES": "Hand-embroidered"}
    ],
    checklist: [{"CATEGORY": "SEATING", "ITEM": "Traditional swing or jhula", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "PLANTERS", "ITEM": "Blue pottery planters", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}],
    finishes: [["Antique Brass", "Patinated warmth", "⭐⭐⭐⭐⭐"], ["Jaipur Blue", "Traditional ceramic", "⭐⭐⭐⭐⭐"], ["Teak Wood", "Indian hardwood", "⭐⭐⭐⭐⭐"]]
  },
  {
    style: "Scandinavian", room_type: "Balcony", style_slug: "scandinavian", room_type_slug: "balcony",
    specifications: [
      {"CATEGORY": "SEATING", "ITEM": "Wooden Outdoor Chair", "STYLE/PATTERN": "Simple Slat Design", "MATERIAL OPTIONS": "Teak, Acacia", "COLOR/FINISH": "Natural, White oil", "NOTES": "SIGNATURE - Nordic simplicity"},
      {"CATEGORY": "FLOORING", "ITEM": "Wood Deck Tiles", "STYLE/PATTERN": "Interlocking Squares", "MATERIAL OPTIONS": "Acacia, Teak", "COLOR/FINISH": "Natural light wood", "NOTES": "Easy installation"},
      {"CATEGORY": "TEXTILES", "ITEM": "Sheepskin Throw", "STYLE/PATTERN": "Natural Texture", "MATERIAL OPTIONS": "Genuine or faux sheepskin", "COLOR/FINISH": "White, Gray", "NOTES": "ICONIC - Hygge comfort"},
      {"CATEGORY": "PLANTERS", "ITEM": "White Ceramic Pots", "STYLE/PATTERN": "Simple Cylinder", "MATERIAL OPTIONS": "Ceramic, Terracotta painted", "COLOR/FINISH": "Matte white", "NOTES": "Greenery focus"},
      {"CATEGORY": "LIGHTING", "ITEM": "String Lights", "STYLE/PATTERN": "Festoon or Globe", "MATERIAL OPTIONS": "LED, Frosted bulbs", "COLOR/FINISH": "Warm white", "NOTES": "Cozy ambiance"}
    ],
    checklist: [{"CATEGORY": "SEATING", "ITEM": "Simple wooden chairs", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "TEXTILES", "ITEM": "Sheepskin throws", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}],
    finishes: [["Natural Wood Oil", "Protective matte", "⭐⭐⭐⭐⭐"], ["Matte White", "Clean Scandi", "⭐⭐⭐⭐⭐"], ["Warm White LED", "Hygge glow", "⭐⭐⭐⭐⭐"]]
  },
  {
    style: "Traditional Indian", room_type: "Balcony", style_slug: "traditional_indian", room_type_slug: "balcony",
    specifications: [
      {"CATEGORY": "SEATING", "ITEM": "Carved Wooden Bench", "STYLE/PATTERN": "Mughal or Rajasthani Carving", "MATERIAL OPTIONS": "Sheesham, Mango wood", "COLOR/FINISH": "Dark walnut, Antique finish", "NOTES": "SIGNATURE - Hand-carved heritage"},
      {"CATEGORY": "FLOORING", "ITEM": "Hand-painted Tiles", "STYLE/PATTERN": "Traditional Motifs", "MATERIAL OPTIONS": "Cement tiles", "COLOR/FINISH": "Multi-color traditional", "NOTES": "ICONIC - Indian tilework"},
      {"CATEGORY": "LIGHTING", "ITEM": "Brass Diya Stands", "STYLE/PATTERN": "Traditional Oil Lamp", "MATERIAL OPTIONS": "Brass", "COLOR/FINISH": "Polished brass", "NOTES": "Ceremonial lighting"},
      {"CATEGORY": "PLANTERS", "ITEM": "Terracotta Urlis", "STYLE/PATTERN": "Traditional Water Bowls", "MATERIAL OPTIONS": "Terracotta, Brass", "COLOR/FINISH": "Natural clay, Brass", "NOTES": "Floating flowers"},
      {"CATEGORY": "TEXTILES", "ITEM": "Bandhani Cushions", "STYLE/PATTERN": "Tie-Dye Pattern", "MATERIAL OPTIONS": "Cotton, Silk", "COLOR/FINISH": "Traditional colors", "NOTES": "Hand-tied technique"}
    ],
    checklist: [{"CATEGORY": "SEATING", "ITEM": "Carved wooden furniture", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "DECOR", "ITEM": "Brass urlis with flowers", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}],
    finishes: [["Antique Wood", "Aged patina", "⭐⭐⭐⭐⭐"], ["Polished Brass", "Traditional shine", "⭐⭐⭐⭐⭐"], ["Natural Terracotta", "Earth tone", "⭐⭐⭐⭐⭐"]]
  },
  {
    style: "Transitional", room_type: "Balcony", style_slug: "transitional", room_type_slug: "balcony",
    specifications: [
      {"CATEGORY": "SEATING", "ITEM": "Wicker Lounge Set", "STYLE/PATTERN": "Updated Classic", "MATERIAL OPTIONS": "All-weather wicker, Aluminum", "COLOR/FINISH": "Warm gray, Charcoal", "NOTES": "SIGNATURE - Classic meets modern"},
      {"CATEGORY": "FLOORING", "ITEM": "Stone-look Porcelain", "STYLE/PATTERN": "Natural Stone Pattern", "MATERIAL OPTIONS": "Porcelain tile", "COLOR/FINISH": "Warm gray, Beige", "NOTES": "Durable elegance"},
      {"CATEGORY": "LIGHTING", "ITEM": "Lantern-style Pendant", "STYLE/PATTERN": "Updated Traditional", "MATERIAL OPTIONS": "Metal, Glass", "COLOR/FINISH": "Bronze, Black", "NOTES": "Classic with clean lines"},
      {"CATEGORY": "PLANTERS", "ITEM": "Classic Urns", "STYLE/PATTERN": "Updated Traditional", "MATERIAL OPTIONS": "Fiberglass, Terracotta", "COLOR/FINISH": "Charcoal, Aged terracotta", "NOTES": "Symmetrical placement"},
      {"CATEGORY": "TEXTILES", "ITEM": "Neutral Cushions", "STYLE/PATTERN": "Solid with Texture", "MATERIAL OPTIONS": "Outdoor performance fabric", "COLOR/FINISH": "Cream, Gray, Taupe", "NOTES": "Versatile palette"}
    ],
    checklist: [{"CATEGORY": "SEATING", "ITEM": "Wicker outdoor set", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "PLANTERS", "ITEM": "Matched urn planters", "INCLUDE?": "YES", "PRIORITY": "ESSENTIAL"}],
    finishes: [["Warm Gray", "Transitional neutral", "⭐⭐⭐⭐⭐"], ["Oil-rubbed Bronze", "Updated classic", "⭐⭐⭐⭐⭐"], ["Aged Terracotta", "Timeless elegance", "⭐⭐⭐⭐⭐"]]
  },

  // KITCHEN - 10 styles missing
  {
    style: "Art Deco", room_type: "Kitchen", style_slug: "art_deco", room_type_slug: "kitchen",
    specifications: [
      {"CATEGORY": "CABINETS", "ITEM": "Upper Cabinets", "STYLE/PATTERN": "High-gloss Lacquer", "MATERIAL OPTIONS": "MDF with lacquer", "COLOR/FINISH": "Black, White, Emerald", "NOTES": "SIGNATURE - Glamorous shine"},
      {"CATEGORY": "BACKSPLASH", "ITEM": "Wall Tiles", "STYLE/PATTERN": "Fan or Scallop Pattern", "MATERIAL OPTIONS": "Ceramic, Glass", "COLOR/FINISH": "Black/White/Gold", "NOTES": "ICONIC - Deco pattern"},
      {"CATEGORY": "HARDWARE", "ITEM": "Cabinet Pulls", "STYLE/PATTERN": "Geometric Bar Pulls", "MATERIAL OPTIONS": "Brass, Chrome", "COLOR/FINISH": "Polished Brass", "NOTES": "Period-authentic"},
      {"CATEGORY": "LIGHTING", "ITEM": "Pendant Lights", "STYLE/PATTERN": "Glass Globe or Crystal", "MATERIAL OPTIONS": "Crystal, Milk glass", "COLOR/FINISH": "Brass mounting", "NOTES": "Statement over island"},
      {"CATEGORY": "COUNTERTOP", "ITEM": "Work Surface", "STYLE/PATTERN": "Solid or Veined", "MATERIAL OPTIONS": "Marble, Quartz", "COLOR/FINISH": "White/Black veining", "NOTES": "Luxury material"}
    ],
    checklist: [{"CATEGORY": "CABINETS", "ITEM": "High-gloss lacquer finish", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "BACKSPLASH", "ITEM": "Geometric pattern tiles", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}],
    finishes: [["Black Lacquer", "High-gloss glamour", "⭐⭐⭐⭐⭐"], ["Polished Brass", "Art Deco metal", "⭐⭐⭐⭐⭐"], ["White Marble", "Luxury surface", "⭐⭐⭐⭐⭐"]]
  },
  {
    style: "Bohemian", room_type: "Kitchen", style_slug: "bohemian", room_type_slug: "kitchen",
    specifications: [
      {"CATEGORY": "CABINETS", "ITEM": "Base Cabinets", "STYLE/PATTERN": "Mix of Open Shelving", "MATERIAL OPTIONS": "Reclaimed wood, Painted", "COLOR/FINISH": "Teal, Terracotta, Natural", "NOTES": "SIGNATURE - Eclectic mix"},
      {"CATEGORY": "BACKSPLASH", "ITEM": "Wall Tiles", "STYLE/PATTERN": "Moroccan or Mexican", "MATERIAL OPTIONS": "Hand-painted ceramic", "COLOR/FINISH": "Multi-color pattern", "NOTES": "ICONIC - Artisan tiles"},
      {"CATEGORY": "OPEN SHELVING", "ITEM": "Display Shelves", "STYLE/PATTERN": "Rustic Brackets", "MATERIAL OPTIONS": "Reclaimed wood, Metal", "COLOR/FINISH": "Natural, Black iron", "NOTES": "Show collected items"},
      {"CATEGORY": "TEXTILES", "ITEM": "Runner Rug", "STYLE/PATTERN": "Kilim or Persian", "MATERIAL OPTIONS": "Wool, Cotton", "COLOR/FINISH": "Warm earth tones", "NOTES": "Layered texture"},
      {"CATEGORY": "LIGHTING", "ITEM": "Pendant Lights", "STYLE/PATTERN": "Rattan or Macrame", "MATERIAL OPTIONS": "Rattan, Woven fiber", "COLOR/FINISH": "Natural", "NOTES": "Organic materials"}
    ],
    checklist: [{"CATEGORY": "SHELVING", "ITEM": "Open shelving for display", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "BACKSPLASH", "ITEM": "Hand-painted tiles", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}],
    finishes: [["Terracotta", "Warm earth tone", "⭐⭐⭐⭐⭐"], ["Natural Rattan", "Organic texture", "⭐⭐⭐⭐⭐"], ["Multi-color Tile", "Artisan craft", "⭐⭐⭐⭐⭐"]]
  },
  {
    style: "Coastal Indian", room_type: "Kitchen", style_slug: "coastal_indian", room_type_slug: "kitchen",
    specifications: [
      {"CATEGORY": "CABINETS", "ITEM": "Upper Cabinets", "STYLE/PATTERN": "Shaker with Glass Inserts", "MATERIAL OPTIONS": "Marine plywood", "COLOR/FINISH": "White, Soft blue", "NOTES": "Coastal freshness"},
      {"CATEGORY": "BACKSPLASH", "ITEM": "Wall Tiles", "STYLE/PATTERN": "Blue Pottery Pattern", "MATERIAL OPTIONS": "Hand-painted ceramic", "COLOR/FINISH": "Blue and white", "NOTES": "SIGNATURE - Jaipur craft"},
      {"CATEGORY": "HARDWARE", "ITEM": "Cabinet Hardware", "STYLE/PATTERN": "Shell or Brass", "MATERIAL OPTIONS": "Brass, Mother of pearl", "COLOR/FINISH": "Antique brass", "NOTES": "ICONIC - Coastal details"},
      {"CATEGORY": "COUNTERTOP", "ITEM": "Work Surface", "STYLE/PATTERN": "Light tones", "MATERIAL OPTIONS": "Quartz, Granite", "COLOR/FINISH": "White, Sandy beige", "NOTES": "Beach-inspired"},
      {"CATEGORY": "LIGHTING", "ITEM": "Pendant Lights", "STYLE/PATTERN": "Woven or Rattan", "MATERIAL OPTIONS": "Natural fiber, Cane", "COLOR/FINISH": "Natural", "NOTES": "Organic coastal"}
    ],
    checklist: [{"CATEGORY": "BACKSPLASH", "ITEM": "Blue pottery tiles", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "HARDWARE", "ITEM": "Brass or shell hardware", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}],
    finishes: [["Jaipur Blue", "Traditional ceramic", "⭐⭐⭐⭐⭐"], ["Antique Brass", "Coastal warmth", "⭐⭐⭐⭐⭐"], ["Natural Cane", "Beach texture", "⭐⭐⭐⭐⭐"]]
  },
  {
    style: "Contemporary", room_type: "Kitchen", style_slug: "contemporary", room_type_slug: "kitchen",
    specifications: [
      {"CATEGORY": "CABINETS", "ITEM": "Upper/Lower Cabinets", "STYLE/PATTERN": "Flat Panel/Slab Door", "MATERIAL OPTIONS": "Laminate, Acrylic", "COLOR/FINISH": "White, Gray, Wood tone", "NOTES": "SIGNATURE - Handleless or minimal"},
      {"CATEGORY": "COUNTERTOP", "ITEM": "Work Surface", "STYLE/PATTERN": "Waterfall Edge", "MATERIAL OPTIONS": "Quartz, Porcelain slab", "COLOR/FINISH": "White, Dark gray", "NOTES": "Seamless look"},
      {"CATEGORY": "BACKSPLASH", "ITEM": "Wall Treatment", "STYLE/PATTERN": "Large Format Tile", "MATERIAL OPTIONS": "Porcelain, Glass", "COLOR/FINISH": "Matching countertop", "NOTES": "Minimal grout lines"},
      {"CATEGORY": "LIGHTING", "ITEM": "Pendant Lights", "STYLE/PATTERN": "Sculptural", "MATERIAL OPTIONS": "Metal, Glass", "COLOR/FINISH": "Matte black, Brass", "NOTES": "Statement pieces"},
      {"CATEGORY": "HARDWARE", "ITEM": "Cabinet Pulls", "STYLE/PATTERN": "Integrated or Linear", "MATERIAL OPTIONS": "Aluminum, Steel", "COLOR/FINISH": "Matching cabinet", "NOTES": "Invisible hardware"}
    ],
    checklist: [{"CATEGORY": "CABINETS", "ITEM": "Flat panel slab doors", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "COUNTERTOP", "ITEM": "Waterfall edge detail", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}],
    finishes: [["Matte White", "Clean contemporary", "⭐⭐⭐⭐⭐"], ["Dark Quartz", "Dramatic surface", "⭐⭐⭐⭐⭐"], ["Matte Black Metal", "Modern accent", "⭐⭐⭐⭐⭐"]]
  },
  {
    style: "Japandi", room_type: "Kitchen", style_slug: "japandi", room_type_slug: "kitchen",
    specifications: [
      {"CATEGORY": "CABINETS", "ITEM": "Lower Cabinets", "STYLE/PATTERN": "Flat Panel", "MATERIAL OPTIONS": "Wood veneer, Laminate", "COLOR/FINISH": "Light oak, Warm white", "NOTES": "SIGNATURE - Warm minimalism"},
      {"CATEGORY": "SHELVING", "ITEM": "Open Shelves", "STYLE/PATTERN": "Floating Planks", "MATERIAL OPTIONS": "Solid wood", "COLOR/FINISH": "Light oak, Ash", "NOTES": "Display ceramics"},
      {"CATEGORY": "COUNTERTOP", "ITEM": "Work Surface", "STYLE/PATTERN": "Natural Stone or Wood", "MATERIAL OPTIONS": "Butcher block, Light stone", "COLOR/FINISH": "Natural tones", "NOTES": "Organic materials"},
      {"CATEGORY": "BACKSPLASH", "ITEM": "Wall Tiles", "STYLE/PATTERN": "Simple Rectangle", "MATERIAL OPTIONS": "Ceramic, Terracotta", "COLOR/FINISH": "White, Soft gray", "NOTES": "Handmade quality"},
      {"CATEGORY": "LIGHTING", "ITEM": "Pendant Lights", "STYLE/PATTERN": "Paper or Wood", "MATERIAL OPTIONS": "Rice paper, Wood", "COLOR/FINISH": "Natural, Black", "NOTES": "Japanese influence"}
    ],
    checklist: [{"CATEGORY": "CABINETS", "ITEM": "Light wood flat panels", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "SHELVING", "ITEM": "Open shelving for ceramics", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}],
    finishes: [["Light Oak", "Warm Scandinavian", "⭐⭐⭐⭐⭐"], ["Matte White", "Japanese simplicity", "⭐⭐⭐⭐⭐"], ["Natural Stone", "Organic surface", "⭐⭐⭐⭐⭐"]]
  },
  {
    style: "Mid-Century Modern", room_type: "Kitchen", style_slug: "mid_century_modern", room_type_slug: "kitchen",
    specifications: [
      {"CATEGORY": "CABINETS", "ITEM": "Upper/Lower Cabinets", "STYLE/PATTERN": "Flat Panel with Wood Grain", "MATERIAL OPTIONS": "Walnut veneer, Teak", "COLOR/FINISH": "Walnut, Teak, White accent", "NOTES": "SIGNATURE - Warm wood tones"},
      {"CATEGORY": "BACKSPLASH", "ITEM": "Wall Tiles", "STYLE/PATTERN": "Geometric or Hex", "MATERIAL OPTIONS": "Ceramic", "COLOR/FINISH": "White, Avocado, Orange", "NOTES": "ICONIC - Period colors"},
      {"CATEGORY": "HARDWARE", "ITEM": "Cabinet Pulls", "STYLE/PATTERN": "Atomic or Boomerang", "MATERIAL OPTIONS": "Brass, Copper", "COLOR/FINISH": "Polished brass", "NOTES": "Authentic period"},
      {"CATEGORY": "LIGHTING", "ITEM": "Pendant Lights", "STYLE/PATTERN": "Sputnik or Cone", "MATERIAL OPTIONS": "Metal, Glass", "COLOR/FINISH": "Brass, Orange, White", "NOTES": "Statement lighting"},
      {"CATEGORY": "COUNTERTOP", "ITEM": "Work Surface", "STYLE/PATTERN": "Solid Color", "MATERIAL OPTIONS": "Quartz, Laminate", "COLOR/FINISH": "White, Period colors", "NOTES": "Clean surface"}
    ],
    checklist: [{"CATEGORY": "CABINETS", "ITEM": "Walnut or teak cabinets", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "HARDWARE", "ITEM": "Period-accurate brass pulls", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}],
    finishes: [["Walnut Wood", "MCM classic", "⭐⭐⭐⭐⭐"], ["Polished Brass", "Period metal", "⭐⭐⭐⭐⭐"], ["Avocado Green", "Retro accent", "⭐⭐⭐⭐"]]
  },
  {
    style: "Minimalist", room_type: "Kitchen", style_slug: "minimalist", room_type_slug: "kitchen",
    specifications: [
      {"CATEGORY": "CABINETS", "ITEM": "All Cabinets", "STYLE/PATTERN": "Handleless Slab", "MATERIAL OPTIONS": "Laminate, Lacquer", "COLOR/FINISH": "White, Light gray", "NOTES": "SIGNATURE - No visible hardware"},
      {"CATEGORY": "COUNTERTOP", "ITEM": "Work Surface", "STYLE/PATTERN": "Solid Color", "MATERIAL OPTIONS": "Quartz, Corian", "COLOR/FINISH": "Matte white", "NOTES": "Seamless integration"},
      {"CATEGORY": "BACKSPLASH", "ITEM": "Wall Treatment", "STYLE/PATTERN": "Same as Counter", "MATERIAL OPTIONS": "Quartz, Glass", "COLOR/FINISH": "Matching counter", "NOTES": "No visual break"},
      {"CATEGORY": "APPLIANCES", "ITEM": "Built-in Appliances", "STYLE/PATTERN": "Panel-ready", "MATERIAL OPTIONS": "Integrated", "COLOR/FINISH": "Hidden behind panels", "NOTES": "Invisible technology"},
      {"CATEGORY": "LIGHTING", "ITEM": "Under-cabinet LED", "STYLE/PATTERN": "Linear Strip", "MATERIAL OPTIONS": "LED", "COLOR/FINISH": "Warm white", "NOTES": "Hidden fixtures"}
    ],
    checklist: [{"CATEGORY": "CABINETS", "ITEM": "Handleless cabinets", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "APPLIANCES", "ITEM": "Hidden/integrated appliances", "INCLUDE?": "YES", "PRIORITY": "ESSENTIAL"}],
    finishes: [["Matte White", "Pure minimal", "⭐⭐⭐⭐⭐"], ["Light Gray", "Soft neutral", "⭐⭐⭐⭐⭐"], ["Clear Glass", "Invisible backsplash", "⭐⭐⭐⭐⭐"]]
  },
  {
    style: "Scandinavian", room_type: "Kitchen", style_slug: "scandinavian", room_type_slug: "kitchen",
    specifications: [
      {"CATEGORY": "CABINETS", "ITEM": "Upper/Lower Cabinets", "STYLE/PATTERN": "Shaker or Flat Panel", "MATERIAL OPTIONS": "Wood, Painted MDF", "COLOR/FINISH": "White, Light oak front", "NOTES": "SIGNATURE - Light and airy"},
      {"CATEGORY": "COUNTERTOP", "ITEM": "Work Surface", "STYLE/PATTERN": "Natural Material", "MATERIAL OPTIONS": "Butcher block, White stone", "COLOR/FINISH": "Light oak, White", "NOTES": "Warmth of wood"},
      {"CATEGORY": "BACKSPLASH", "ITEM": "Wall Tiles", "STYLE/PATTERN": "Subway or Hex", "MATERIAL OPTIONS": "Ceramic", "COLOR/FINISH": "White, Soft gray", "NOTES": "Classic simplicity"},
      {"CATEGORY": "HARDWARE", "ITEM": "Cabinet Pulls", "STYLE/PATTERN": "Leather Loop or Simple Bar", "MATERIAL OPTIONS": "Leather, Matte metal", "COLOR/FINISH": "Tan leather, Black", "NOTES": "ICONIC - Nordic detail"},
      {"CATEGORY": "LIGHTING", "ITEM": "Pendant Lights", "STYLE/PATTERN": "Dome or Cone", "MATERIAL OPTIONS": "Metal, Enamel", "COLOR/FINISH": "White, Soft colors", "NOTES": "Clean forms"}
    ],
    checklist: [{"CATEGORY": "CABINETS", "ITEM": "White with wood accents", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "HARDWARE", "ITEM": "Leather loop pulls", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}],
    finishes: [["White Matte", "Scandi classic", "⭐⭐⭐⭐⭐"], ["Light Oak", "Warm wood", "⭐⭐⭐⭐⭐"], ["Tan Leather", "Nordic accent", "⭐⭐⭐⭐⭐"]]
  },
  {
    style: "Traditional Indian", room_type: "Kitchen", style_slug: "traditional_indian", room_type_slug: "kitchen",
    specifications: [
      {"CATEGORY": "CABINETS", "ITEM": "Base Cabinets", "STYLE/PATTERN": "Carved Panel Doors", "MATERIAL OPTIONS": "Solid wood", "COLOR/FINISH": "Dark walnut, Antique", "NOTES": "SIGNATURE - Hand-carved details"},
      {"CATEGORY": "BACKSPLASH", "ITEM": "Wall Tiles", "STYLE/PATTERN": "Hand-painted Traditional", "MATERIAL OPTIONS": "Ceramic", "COLOR/FINISH": "Multi-color motifs", "NOTES": "ICONIC - Indian craft"},
      {"CATEGORY": "HARDWARE", "ITEM": "Cabinet Pulls", "STYLE/PATTERN": "Brass Traditional", "MATERIAL OPTIONS": "Solid brass", "COLOR/FINISH": "Antique brass", "NOTES": "Heritage hardware"},
      {"CATEGORY": "STORAGE", "ITEM": "Masala Dabba Display", "STYLE/PATTERN": "Traditional Steel", "MATERIAL OPTIONS": "Stainless steel, Brass", "COLOR/FINISH": "Silver, Brass", "NOTES": "Functional decor"},
      {"CATEGORY": "LIGHTING", "ITEM": "Pendant Lights", "STYLE/PATTERN": "Brass Jali", "MATERIAL OPTIONS": "Brass", "COLOR/FINISH": "Antique brass", "NOTES": "Traditional metalwork"}
    ],
    checklist: [{"CATEGORY": "CABINETS", "ITEM": "Carved wood cabinet doors", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "HARDWARE", "ITEM": "Brass traditional pulls", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}],
    finishes: [["Dark Walnut", "Rich wood tone", "⭐⭐⭐⭐⭐"], ["Antique Brass", "Heritage metal", "⭐⭐⭐⭐⭐"], ["Hand-painted Tile", "Artisan craft", "⭐⭐⭐⭐⭐"]]
  },
  {
    style: "Transitional", room_type: "Kitchen", style_slug: "transitional", room_type_slug: "kitchen",
    specifications: [
      {"CATEGORY": "CABINETS", "ITEM": "Upper/Lower Cabinets", "STYLE/PATTERN": "Shaker with Clean Lines", "MATERIAL OPTIONS": "Painted wood, MDF", "COLOR/FINISH": "White, Warm gray, Navy", "NOTES": "SIGNATURE - Updated classic"},
      {"CATEGORY": "ISLAND", "ITEM": "Kitchen Island", "STYLE/PATTERN": "Contrasting Color", "MATERIAL OPTIONS": "Painted wood", "COLOR/FINISH": "Navy, Charcoal, Wood tone", "NOTES": "Two-tone design"},
      {"CATEGORY": "HARDWARE", "ITEM": "Cabinet Pulls", "STYLE/PATTERN": "Simple Bar or Cup", "MATERIAL OPTIONS": "Brushed nickel, Bronze", "COLOR/FINISH": "Satin nickel", "NOTES": "Timeless hardware"},
      {"CATEGORY": "BACKSPLASH", "ITEM": "Wall Tiles", "STYLE/PATTERN": "Subway or Marble Mosaic", "MATERIAL OPTIONS": "Ceramic, Stone", "COLOR/FINISH": "White, Gray veining", "NOTES": "Classic but refined"},
      {"CATEGORY": "LIGHTING", "ITEM": "Pendant Lights", "STYLE/PATTERN": "Glass and Metal", "MATERIAL OPTIONS": "Clear glass, Metal", "COLOR/FINISH": "Polished nickel, Bronze", "NOTES": "Updated lantern style"}
    ],
    checklist: [{"CATEGORY": "CABINETS", "ITEM": "Shaker style cabinets", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "ISLAND", "ITEM": "Contrasting island color", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}],
    finishes: [["Warm Gray", "Transitional neutral", "⭐⭐⭐⭐⭐"], ["Satin Nickel", "Timeless metal", "⭐⭐⭐⭐⭐"], ["Navy Blue", "Classic accent", "⭐⭐⭐⭐⭐"]]
  },

  // MASTER BEDROOM - 4 styles missing
  {
    style: "Coastal Indian", room_type: "Master Bedroom", style_slug: "coastal_indian", room_type_slug: "master_bedroom",
    specifications: [
      {"CATEGORY": "BED", "ITEM": "Main Bed", "STYLE/PATTERN": "Cane or Rattan Headboard", "MATERIAL OPTIONS": "Rattan, Teak frame", "COLOR/FINISH": "Natural, White wash", "NOTES": "SIGNATURE - Coastal craft"},
      {"CATEGORY": "TEXTILES", "ITEM": "Bedding", "STYLE/PATTERN": "Block Print or Ikat", "MATERIAL OPTIONS": "Cotton, Linen", "COLOR/FINISH": "Indigo, White, Seafoam", "NOTES": "Indian textile tradition"},
      {"CATEGORY": "LIGHTING", "ITEM": "Bedside Lamps", "STYLE/PATTERN": "Blue Pottery Base", "MATERIAL OPTIONS": "Ceramic", "COLOR/FINISH": "Jaipur blue and white", "NOTES": "ICONIC - Indian craft"},
      {"CATEGORY": "RUG", "ITEM": "Area Rug", "STYLE/PATTERN": "Dhurrie Stripe", "MATERIAL OPTIONS": "Cotton, Wool", "COLOR/FINISH": "Blue and white stripes", "NOTES": "Indian flatweave"},
      {"CATEGORY": "DECOR", "ITEM": "Wall Art", "STYLE/PATTERN": "Coastal Indian Motifs", "MATERIAL OPTIONS": "Canvas, Block print", "COLOR/FINISH": "Blue, Coral tones", "NOTES": "Beach meets heritage"}
    ],
    checklist: [{"CATEGORY": "BED", "ITEM": "Cane or rattan bed", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "TEXTILES", "ITEM": "Block print bedding", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}],
    finishes: [["Natural Cane", "Coastal texture", "⭐⭐⭐⭐⭐"], ["Jaipur Blue", "Indian ceramic", "⭐⭐⭐⭐⭐"], ["Indigo Block Print", "Traditional textile", "⭐⭐⭐⭐⭐"]]
  },
  {
    style: "Farmhouse", room_type: "Master Bedroom", style_slug: "farmhouse", room_type_slug: "master_bedroom",
    specifications: [
      {"CATEGORY": "BED", "ITEM": "Main Bed", "STYLE/PATTERN": "Shiplap or Reclaimed Wood Headboard", "MATERIAL OPTIONS": "Reclaimed wood, Pine", "COLOR/FINISH": "Whitewash, Natural", "NOTES": "SIGNATURE - Rustic charm"},
      {"CATEGORY": "TEXTILES", "ITEM": "Bedding", "STYLE/PATTERN": "Linen and Gingham", "MATERIAL OPTIONS": "Linen, Cotton", "COLOR/FINISH": "White, Blue check, Stripe", "NOTES": "Layered farm freshness"},
      {"CATEGORY": "LIGHTING", "ITEM": "Chandelier", "STYLE/PATTERN": "Farmhouse or Candle Style", "MATERIAL OPTIONS": "Wood, Wrought iron", "COLOR/FINISH": "Distressed white, Black", "NOTES": "ICONIC - Statement fixture"},
      {"CATEGORY": "FURNITURE", "ITEM": "Nightstands", "STYLE/PATTERN": "Distressed or Painted", "MATERIAL OPTIONS": "Solid wood", "COLOR/FINISH": "White, Gray wash", "NOTES": "Antique character"},
      {"CATEGORY": "DECOR", "ITEM": "Wall Decor", "STYLE/PATTERN": "Farmhouse Signs or Wreaths", "MATERIAL OPTIONS": "Wood, Dried flowers", "COLOR/FINISH": "Natural, White", "NOTES": "Rustic charm"}
    ],
    checklist: [{"CATEGORY": "BED", "ITEM": "Reclaimed wood headboard", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "LIGHTING", "ITEM": "Farmhouse chandelier", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}],
    finishes: [["Whitewash Wood", "Farmhouse finish", "⭐⭐⭐⭐⭐"], ["Natural Linen", "Organic textile", "⭐⭐⭐⭐⭐"], ["Wrought Iron", "Rustic metal", "⭐⭐⭐⭐⭐"]]
  },
  {
    style: "Industrial", room_type: "Master Bedroom", style_slug: "industrial", room_type_slug: "master_bedroom",
    specifications: [
      {"CATEGORY": "BED", "ITEM": "Main Bed", "STYLE/PATTERN": "Metal or Pipe Frame", "MATERIAL OPTIONS": "Steel, Iron", "COLOR/FINISH": "Matte black, Raw steel", "NOTES": "SIGNATURE - Factory aesthetic"},
      {"CATEGORY": "LIGHTING", "ITEM": "Pendant/Sconces", "STYLE/PATTERN": "Cage or Edison", "MATERIAL OPTIONS": "Steel, Brass", "COLOR/FINISH": "Matte black, Brass", "NOTES": "ICONIC - Exposed bulbs"},
      {"CATEGORY": "NIGHTSTANDS", "ITEM": "Side Tables", "STYLE/PATTERN": "Pipe and Wood", "MATERIAL OPTIONS": "Reclaimed wood, Metal pipe", "COLOR/FINISH": "Natural wood, Black pipe", "NOTES": "DIY industrial"},
      {"CATEGORY": "TEXTILES", "ITEM": "Bedding", "STYLE/PATTERN": "Simple, Neutral", "MATERIAL OPTIONS": "Linen, Cotton", "COLOR/FINISH": "Charcoal, Gray, White", "NOTES": "Soft against hard materials"},
      {"CATEGORY": "WALL", "ITEM": "Exposed Brick Accent", "STYLE/PATTERN": "Raw Brick", "MATERIAL OPTIONS": "Real or faux brick", "COLOR/FINISH": "Red brick, Whitewashed", "NOTES": "Loft character"}
    ],
    checklist: [{"CATEGORY": "BED", "ITEM": "Metal frame bed", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "LIGHTING", "ITEM": "Edison bulb fixtures", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}],
    finishes: [["Matte Black Steel", "Industrial classic", "⭐⭐⭐⭐⭐"], ["Raw Reclaimed Wood", "Authentic texture", "⭐⭐⭐⭐⭐"], ["Exposed Brick", "Loft character", "⭐⭐⭐⭐⭐"]]
  },
  {
    style: "Traditional Indian", room_type: "Master Bedroom", style_slug: "traditional_indian", room_type_slug: "master_bedroom",
    specifications: [
      {"CATEGORY": "BED", "ITEM": "Main Bed", "STYLE/PATTERN": "Carved Four Poster", "MATERIAL OPTIONS": "Sheesham, Teak", "COLOR/FINISH": "Dark walnut, Antique", "NOTES": "SIGNATURE - Hand-carved heritage"},
      {"CATEGORY": "TEXTILES", "ITEM": "Bedding", "STYLE/PATTERN": "Silk or Brocade", "MATERIAL OPTIONS": "Silk, Brocade, Zari work", "COLOR/FINISH": "Ruby, Emerald, Gold", "NOTES": "ICONIC - Royal textiles"},
      {"CATEGORY": "FURNITURE", "ITEM": "Antique Trunk", "STYLE/PATTERN": "Brass-bound Chest", "MATERIAL OPTIONS": "Wood with brass", "COLOR/FINISH": "Dark wood, Brass fittings", "NOTES": "Heritage storage"},
      {"CATEGORY": "LIGHTING", "ITEM": "Hanging Lamp", "STYLE/PATTERN": "Brass Jali", "MATERIAL OPTIONS": "Brass", "COLOR/FINISH": "Antique brass", "NOTES": "Traditional craftsmanship"},
      {"CATEGORY": "RUG", "ITEM": "Area Rug", "STYLE/PATTERN": "Kashmiri or Persian", "MATERIAL OPTIONS": "Wool, Silk blend", "COLOR/FINISH": "Jewel tones", "NOTES": "Heirloom quality"}
    ],
    checklist: [{"CATEGORY": "BED", "ITEM": "Carved four poster bed", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "TEXTILES", "ITEM": "Silk or brocade bedding", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}],
    finishes: [["Dark Walnut", "Rich heritage wood", "⭐⭐⭐⭐⭐"], ["Antique Brass", "Traditional metal", "⭐⭐⭐⭐⭐"], ["Ruby Silk", "Royal textile", "⭐⭐⭐⭐⭐"]]
  },

  // POOJA ROOM - 12 styles missing (all except Traditional Indian which exists)
  {
    style: "Art Deco", room_type: "Pooja Room", style_slug: "art_deco", room_type_slug: "pooja_room",
    specifications: [
      {"CATEGORY": "MANDIR", "ITEM": "Main Temple", "STYLE/PATTERN": "Geometric with Sunburst", "MATERIAL OPTIONS": "Lacquered wood, Brass", "COLOR/FINISH": "Black lacquer, Gold", "NOTES": "SIGNATURE - Deco divinity"},
      {"CATEGORY": "BACKDROP", "ITEM": "Wall Panel", "STYLE/PATTERN": "Fan or Chevron Pattern", "MATERIAL OPTIONS": "Marble, Metal inlay", "COLOR/FINISH": "White marble, Brass", "NOTES": "ICONIC - Geometric pattern"},
      {"CATEGORY": "LIGHTING", "ITEM": "Wall Sconces", "STYLE/PATTERN": "Shell or Fan", "MATERIAL OPTIONS": "Brass, Glass", "COLOR/FINISH": "Polished brass", "NOTES": "Warm ambient glow"},
      {"CATEGORY": "FLOORING", "ITEM": "Floor Tiles", "STYLE/PATTERN": "Black and White", "MATERIAL OPTIONS": "Marble, Porcelain", "COLOR/FINISH": "Checkerboard", "NOTES": "Classic Deco"},
      {"CATEGORY": "ACCESSORIES", "ITEM": "Diya Stand", "STYLE/PATTERN": "Geometric Base", "MATERIAL OPTIONS": "Brass", "COLOR/FINISH": "Polished brass", "NOTES": "Modern traditional"}
    ],
    checklist: [{"CATEGORY": "MANDIR", "ITEM": "Geometric temple design", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "BACKDROP", "ITEM": "Art Deco pattern wall", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}],
    finishes: [["Black Lacquer", "Glamorous depth", "⭐⭐⭐⭐⭐"], ["Polished Brass", "Divine metal", "⭐⭐⭐⭐⭐"], ["White Marble", "Sacred stone", "⭐⭐⭐⭐⭐"]]
  },
  {
    style: "Bohemian", room_type: "Pooja Room", style_slug: "bohemian", room_type_slug: "pooja_room",
    specifications: [
      {"CATEGORY": "MANDIR", "ITEM": "Open Shelf Temple", "STYLE/PATTERN": "Carved Wood Bohemian", "MATERIAL OPTIONS": "Reclaimed wood, Carved panels", "COLOR/FINISH": "Natural, Distressed", "NOTES": "SIGNATURE - Eclectic sacred"},
      {"CATEGORY": "TEXTILES", "ITEM": "Wall Hanging", "STYLE/PATTERN": "Macrame or Tapestry", "MATERIAL OPTIONS": "Cotton, Wool", "COLOR/FINISH": "Natural, Warm tones", "NOTES": "ICONIC - Handmade backdrop"},
      {"CATEGORY": "FLOOR", "ITEM": "Prayer Rug/Mat", "STYLE/PATTERN": "Kilim or Moroccan", "MATERIAL OPTIONS": "Wool, Cotton", "COLOR/FINISH": "Earth tones, Multi-color", "NOTES": "Comfortable meditation"},
      {"CATEGORY": "PLANTERS", "ITEM": "Macrame Hangers", "STYLE/PATTERN": "Hanging Plants", "MATERIAL OPTIONS": "Jute, Cotton rope", "COLOR/FINISH": "Natural", "NOTES": "Living energy"},
      {"CATEGORY": "LIGHTING", "ITEM": "Moroccan Lanterns", "STYLE/PATTERN": "Pierced Metal", "MATERIAL OPTIONS": "Brass, Copper", "COLOR/FINISH": "Antique brass", "NOTES": "Warm dappled light"}
    ],
    checklist: [{"CATEGORY": "MANDIR", "ITEM": "Open carved wood temple", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "TEXTILES", "ITEM": "Macrame or tapestry backdrop", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}],
    finishes: [["Natural Wood", "Organic warmth", "⭐⭐⭐⭐⭐"], ["Antique Brass", "Moroccan influence", "⭐⭐⭐⭐⭐"], ["Earth Tone Textiles", "Bohemian layers", "⭐⭐⭐⭐⭐"]]
  },
  {
    style: "Coastal Indian", room_type: "Pooja Room", style_slug: "coastal_indian", room_type_slug: "pooja_room",
    specifications: [
      {"CATEGORY": "MANDIR", "ITEM": "Temple", "STYLE/PATTERN": "Carved with Coastal Motifs", "MATERIAL OPTIONS": "Teak, White-washed wood", "COLOR/FINISH": "White wash, Natural teak", "NOTES": "SIGNATURE - Beach heritage"},
      {"CATEGORY": "BACKDROP", "ITEM": "Wall Tiles", "STYLE/PATTERN": "Blue Pottery Pattern", "MATERIAL OPTIONS": "Hand-painted ceramic", "COLOR/FINISH": "Blue and white", "NOTES": "ICONIC - Jaipur craft"},
      {"CATEGORY": "LIGHTING", "ITEM": "Hanging Lamp", "STYLE/PATTERN": "Brass with Shell", "MATERIAL OPTIONS": "Brass, Shell inlay", "COLOR/FINISH": "Antique brass", "NOTES": "Coastal brass work"},
      {"CATEGORY": "ACCESSORIES", "ITEM": "Conch Shell Set", "STYLE/PATTERN": "Natural Shells", "MATERIAL OPTIONS": "Natural shell, Brass base", "COLOR/FINISH": "White, Brass", "NOTES": "Sacred coastal"},
      {"CATEGORY": "FLOORING", "ITEM": "Prayer Mat", "STYLE/PATTERN": "Block Print Cotton", "MATERIAL OPTIONS": "Cotton", "COLOR/FINISH": "Indigo, White", "NOTES": "Traditional craft"}
    ],
    checklist: [{"CATEGORY": "MANDIR", "ITEM": "White-washed coastal temple", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "BACKDROP", "ITEM": "Blue pottery tiles", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}],
    finishes: [["White Wash", "Coastal freshness", "⭐⭐⭐⭐⭐"], ["Jaipur Blue", "Traditional ceramic", "⭐⭐⭐⭐⭐"], ["Antique Brass", "Warm metal", "⭐⭐⭐⭐⭐"]]
  },
  {
    style: "Contemporary", room_type: "Pooja Room", style_slug: "contemporary", room_type_slug: "pooja_room",
    specifications: [
      {"CATEGORY": "MANDIR", "ITEM": "Wall-mounted Unit", "STYLE/PATTERN": "Clean Lines, Floating", "MATERIAL OPTIONS": "MDF, Corian, Wood", "COLOR/FINISH": "White, Warm wood", "NOTES": "SIGNATURE - Modern sacred"},
      {"CATEGORY": "BACKDROP", "ITEM": "LED Panel", "STYLE/PATTERN": "Backlit Panel", "MATERIAL OPTIONS": "Frosted glass, Acrylic", "COLOR/FINISH": "Warm white glow", "NOTES": "ICONIC - Modern ambiance"},
      {"CATEGORY": "LIGHTING", "ITEM": "Recessed Lights", "STYLE/PATTERN": "Minimalist", "MATERIAL OPTIONS": "LED", "COLOR/FINISH": "Warm white", "NOTES": "Clean ceiling"},
      {"CATEGORY": "STORAGE", "ITEM": "Hidden Drawers", "STYLE/PATTERN": "Push-to-open", "MATERIAL OPTIONS": "Laminate", "COLOR/FINISH": "Matching unit", "NOTES": "Concealed essentials"},
      {"CATEGORY": "FLOORING", "ITEM": "Floor Tile", "STYLE/PATTERN": "Large Format", "MATERIAL OPTIONS": "Porcelain", "COLOR/FINISH": "Light gray, White", "NOTES": "Seamless appearance"}
    ],
    checklist: [{"CATEGORY": "MANDIR", "ITEM": "Wall-mounted floating unit", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "LIGHTING", "ITEM": "Backlit panel", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}],
    finishes: [["Matte White", "Modern purity", "⭐⭐⭐⭐⭐"], ["Warm Oak", "Contemporary wood", "⭐⭐⭐⭐⭐"], ["Frosted Glass", "Soft glow", "⭐⭐⭐⭐⭐"]]
  },
  {
    style: "Farmhouse", room_type: "Pooja Room", style_slug: "farmhouse", room_type_slug: "pooja_room",
    specifications: [
      {"CATEGORY": "MANDIR", "ITEM": "Temple Cabinet", "STYLE/PATTERN": "Rustic Wood with Barn Doors", "MATERIAL OPTIONS": "Reclaimed wood", "COLOR/FINISH": "Whitewash, Natural", "NOTES": "SIGNATURE - Rustic sacred"},
      {"CATEGORY": "BACKDROP", "ITEM": "Shiplap Wall", "STYLE/PATTERN": "Horizontal Planks", "MATERIAL OPTIONS": "Pine, MDF", "COLOR/FINISH": "White, Light gray", "NOTES": "ICONIC - Farm character"},
      {"CATEGORY": "LIGHTING", "ITEM": "Lantern Pendant", "STYLE/PATTERN": "Farmhouse Lantern", "MATERIAL OPTIONS": "Metal, Glass", "COLOR/FINISH": "Black, Galvanized", "NOTES": "Rustic warmth"},
      {"CATEGORY": "ACCESSORIES", "ITEM": "Galvanized Vessels", "STYLE/PATTERN": "Farm Containers", "MATERIAL OPTIONS": "Galvanized metal", "COLOR/FINISH": "Silver patina", "NOTES": "For flowers/prasad"},
      {"CATEGORY": "FLOORING", "ITEM": "Prayer Mat", "STYLE/PATTERN": "Jute or Cotton Rag", "MATERIAL OPTIONS": "Jute, Cotton", "COLOR/FINISH": "Natural, Striped", "NOTES": "Organic texture"}
    ],
    checklist: [{"CATEGORY": "MANDIR", "ITEM": "Rustic wood temple", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "BACKDROP", "ITEM": "Shiplap wall", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}],
    finishes: [["Whitewash Wood", "Farmhouse finish", "⭐⭐⭐⭐⭐"], ["Natural Jute", "Organic texture", "⭐⭐⭐⭐⭐"], ["Galvanized Metal", "Farm aesthetic", "⭐⭐⭐⭐⭐"]]
  },
  {
    style: "Industrial", room_type: "Pooja Room", style_slug: "industrial", room_type_slug: "pooja_room",
    specifications: [
      {"CATEGORY": "MANDIR", "ITEM": "Metal Frame Temple", "STYLE/PATTERN": "Steel and Wood", "MATERIAL OPTIONS": "Steel, Reclaimed wood", "COLOR/FINISH": "Matte black, Natural wood", "NOTES": "SIGNATURE - Urban sacred"},
      {"CATEGORY": "BACKDROP", "ITEM": "Exposed Brick", "STYLE/PATTERN": "Raw Brick Wall", "MATERIAL OPTIONS": "Real or faux brick", "COLOR/FINISH": "Red brick, Whitewashed", "NOTES": "ICONIC - Loft character"},
      {"CATEGORY": "LIGHTING", "ITEM": "Edison Pendants", "STYLE/PATTERN": "Cage or Exposed Bulb", "MATERIAL OPTIONS": "Steel, Brass", "COLOR/FINISH": "Matte black", "NOTES": "Industrial warmth"},
      {"CATEGORY": "SHELVING", "ITEM": "Pipe Shelves", "STYLE/PATTERN": "Pipe and Wood", "MATERIAL OPTIONS": "Black pipe, Wood", "COLOR/FINISH": "Black, Natural", "NOTES": "For accessories"},
      {"CATEGORY": "ACCESSORIES", "ITEM": "Metal Diya Holder", "STYLE/PATTERN": "Geometric Metal", "MATERIAL OPTIONS": "Steel, Iron", "COLOR/FINISH": "Matte black", "NOTES": "Modern traditional"}
    ],
    checklist: [{"CATEGORY": "MANDIR", "ITEM": "Steel frame temple", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "BACKDROP", "ITEM": "Exposed brick wall", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}],
    finishes: [["Matte Black Steel", "Industrial metal", "⭐⭐⭐⭐⭐"], ["Reclaimed Wood", "Authentic texture", "⭐⭐⭐⭐⭐"], ["Exposed Brick", "Loft character", "⭐⭐⭐⭐⭐"]]
  },
  {
    style: "Japandi", room_type: "Pooja Room", style_slug: "japandi", room_type_slug: "pooja_room",
    specifications: [
      {"CATEGORY": "MANDIR", "ITEM": "Minimal Altar", "STYLE/PATTERN": "Simple Wood Shelf", "MATERIAL OPTIONS": "Light oak, Ash", "COLOR/FINISH": "Natural light wood", "NOTES": "SIGNATURE - Zen simplicity"},
      {"CATEGORY": "BACKDROP", "ITEM": "Shoji Screen", "STYLE/PATTERN": "Japanese Paper Screen", "MATERIAL OPTIONS": "Wood frame, Rice paper", "COLOR/FINISH": "Natural, White", "NOTES": "ICONIC - Japanese influence"},
      {"CATEGORY": "LIGHTING", "ITEM": "Paper Lantern", "STYLE/PATTERN": "Japanese Style", "MATERIAL OPTIONS": "Rice paper, Bamboo", "COLOR/FINISH": "White, Natural", "NOTES": "Soft diffused light"},
      {"CATEGORY": "ACCESSORIES", "ITEM": "Ceramic Vessels", "STYLE/PATTERN": "Wabi-sabi Ceramic", "MATERIAL OPTIONS": "Stoneware", "COLOR/FINISH": "Earth tones, Black", "NOTES": "Handmade imperfection"},
      {"CATEGORY": "FLOORING", "ITEM": "Tatami Mat", "STYLE/PATTERN": "Traditional Japanese", "MATERIAL OPTIONS": "Woven rush", "COLOR/FINISH": "Natural green/beige", "NOTES": "Meditation comfort"}
    ],
    checklist: [{"CATEGORY": "MANDIR", "ITEM": "Simple wood altar", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "BACKDROP", "ITEM": "Shoji screen", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}],
    finishes: [["Light Oak", "Warm minimal", "⭐⭐⭐⭐⭐"], ["Rice Paper", "Japanese craft", "⭐⭐⭐⭐⭐"], ["Earth Tone Ceramic", "Wabi-sabi", "⭐⭐⭐⭐⭐"]]
  },
  {
    style: "Mid-Century Modern", room_type: "Pooja Room", style_slug: "mid_century_modern", room_type_slug: "pooja_room",
    specifications: [
      {"CATEGORY": "MANDIR", "ITEM": "Temple Cabinet", "STYLE/PATTERN": "Walnut with Tapered Legs", "MATERIAL OPTIONS": "Walnut, Teak", "COLOR/FINISH": "Warm walnut", "NOTES": "SIGNATURE - MCM sacred"},
      {"CATEGORY": "BACKDROP", "ITEM": "Wood Slat Panel", "STYLE/PATTERN": "Vertical Slats", "MATERIAL OPTIONS": "Walnut, Teak", "COLOR/FINISH": "Warm wood tone", "NOTES": "ICONIC - Period detail"},
      {"CATEGORY": "LIGHTING", "ITEM": "Sputnik or Cone", "STYLE/PATTERN": "Atomic Age", "MATERIAL OPTIONS": "Brass", "COLOR/FINISH": "Polished brass", "NOTES": "Statement fixture"},
      {"CATEGORY": "ACCESSORIES", "ITEM": "Brass Vessels", "STYLE/PATTERN": "Organic Shapes", "MATERIAL OPTIONS": "Brass", "COLOR/FINISH": "Polished or satin", "NOTES": "Period-accurate"},
      {"CATEGORY": "RUG", "ITEM": "Prayer Mat", "STYLE/PATTERN": "Atomic Pattern", "MATERIAL OPTIONS": "Wool", "COLOR/FINISH": "Orange, Olive, Gold", "NOTES": "Period colors"}
    ],
    checklist: [{"CATEGORY": "MANDIR", "ITEM": "Walnut temple cabinet", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "BACKDROP", "ITEM": "Wood slat wall", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}],
    finishes: [["Warm Walnut", "MCM classic", "⭐⭐⭐⭐⭐"], ["Polished Brass", "Period metal", "⭐⭐⭐⭐⭐"], ["Teak Wood", "Retro warmth", "⭐⭐⭐⭐⭐"]]
  },
  {
    style: "Minimalist", room_type: "Pooja Room", style_slug: "minimalist", room_type_slug: "pooja_room",
    specifications: [
      {"CATEGORY": "MANDIR", "ITEM": "Floating Shelf", "STYLE/PATTERN": "Single Clean Shelf", "MATERIAL OPTIONS": "Corian, Wood", "COLOR/FINISH": "White, Light oak", "NOTES": "SIGNATURE - Pure simplicity"},
      {"CATEGORY": "BACKDROP", "ITEM": "Solid Color Wall", "STYLE/PATTERN": "No Pattern", "MATERIAL OPTIONS": "Paint", "COLOR/FINISH": "White, Soft gray", "NOTES": "Peaceful void"},
      {"CATEGORY": "LIGHTING", "ITEM": "Recessed or Hidden", "STYLE/PATTERN": "Invisible", "MATERIAL OPTIONS": "LED strip", "COLOR/FINISH": "Warm white", "NOTES": "No visible fixture"},
      {"CATEGORY": "ACCESSORIES", "ITEM": "Essential Only", "STYLE/PATTERN": "1-3 pieces", "MATERIAL OPTIONS": "Quality materials", "COLOR/FINISH": "Neutral", "NOTES": "Less is more"},
      {"CATEGORY": "FLOORING", "ITEM": "Simple Mat", "STYLE/PATTERN": "No Pattern", "MATERIAL OPTIONS": "Wool, Cotton", "COLOR/FINISH": "White, Natural", "NOTES": "Minimal texture"}
    ],
    checklist: [{"CATEGORY": "MANDIR", "ITEM": "Single floating shelf", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "DECOR", "ITEM": "Minimal accessories (1-3)", "INCLUDE?": "YES", "PRIORITY": "ESSENTIAL"}],
    finishes: [["Matte White", "Pure minimal", "⭐⭐⭐⭐⭐"], ["Light Oak", "Warm neutral", "⭐⭐⭐⭐⭐"], ["Soft Gray", "Peaceful tone", "⭐⭐⭐⭐⭐"]]
  },
  {
    style: "Modern Indian", room_type: "Pooja Room", style_slug: "modern_indian", room_type_slug: "pooja_room",
    specifications: [
      {"CATEGORY": "MANDIR", "ITEM": "Contemporary Temple", "STYLE/PATTERN": "Clean Lines with Jali", "MATERIAL OPTIONS": "MDF with jali, Corian", "COLOR/FINISH": "White, Warm wood", "NOTES": "SIGNATURE - Modern heritage"},
      {"CATEGORY": "BACKDROP", "ITEM": "CNC Cut Panel", "STYLE/PATTERN": "Modern Mandala", "MATERIAL OPTIONS": "MDF, Acrylic", "COLOR/FINISH": "White, Gold accent", "NOTES": "ICONIC - Digital craft"},
      {"CATEGORY": "LIGHTING", "ITEM": "LED with Traditional Touch", "STYLE/PATTERN": "Backlit Jali", "MATERIAL OPTIONS": "LED, Metal jali", "COLOR/FINISH": "Warm white, Brass", "NOTES": "Modern ambiance"},
      {"CATEGORY": "ACCESSORIES", "ITEM": "Contemporary Brass", "STYLE/PATTERN": "Minimal Indian", "MATERIAL OPTIONS": "Brass", "COLOR/FINISH": "Satin brass", "NOTES": "Updated traditional"},
      {"CATEGORY": "FLOORING", "ITEM": "Prayer Mat", "STYLE/PATTERN": "Modern Block Print", "MATERIAL OPTIONS": "Cotton, Linen", "COLOR/FINISH": "Indigo, White", "NOTES": "Traditional technique"}
    ],
    checklist: [{"CATEGORY": "MANDIR", "ITEM": "Contemporary temple with jali", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "BACKDROP", "ITEM": "CNC mandala panel", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}],
    finishes: [["Matte White", "Modern purity", "⭐⭐⭐⭐⭐"], ["Satin Brass", "Updated traditional", "⭐⭐⭐⭐⭐"], ["Warm Oak", "Contemporary wood", "⭐⭐⭐⭐⭐"]]
  },
  {
    style: "Scandinavian", room_type: "Pooja Room", style_slug: "scandinavian", room_type_slug: "pooja_room",
    specifications: [
      {"CATEGORY": "MANDIR", "ITEM": "Light Wood Shelf", "STYLE/PATTERN": "Simple Oak Shelf", "MATERIAL OPTIONS": "Light oak, Birch", "COLOR/FINISH": "Natural light wood", "NOTES": "SIGNATURE - Nordic calm"},
      {"CATEGORY": "BACKDROP", "ITEM": "White Wall", "STYLE/PATTERN": "Clean White", "MATERIAL OPTIONS": "Paint", "COLOR/FINISH": "Pure white", "NOTES": "Bright peaceful"},
      {"CATEGORY": "LIGHTING", "ITEM": "Simple Pendant", "STYLE/PATTERN": "White Dome", "MATERIAL OPTIONS": "Metal, Enamel", "COLOR/FINISH": "White, Light gray", "NOTES": "Clean form"},
      {"CATEGORY": "ACCESSORIES", "ITEM": "Ceramic Pieces", "STYLE/PATTERN": "Simple Shapes", "MATERIAL OPTIONS": "White ceramic", "COLOR/FINISH": "Matte white", "NOTES": "Minimal vessels"},
      {"CATEGORY": "TEXTILES", "ITEM": "Wool Mat", "STYLE/PATTERN": "Simple Texture", "MATERIAL OPTIONS": "Wool, Sheepskin", "COLOR/FINISH": "White, Gray", "NOTES": "Hygge comfort"}
    ],
    checklist: [{"CATEGORY": "MANDIR", "ITEM": "Light wood shelf unit", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "TEXTILES", "ITEM": "Wool or sheepskin mat", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}],
    finishes: [["Light Oak", "Nordic warmth", "⭐⭐⭐⭐⭐"], ["Matte White", "Scandi clean", "⭐⭐⭐⭐⭐"], ["Soft Gray", "Peaceful neutral", "⭐⭐⭐⭐⭐"]]
  },
  {
    style: "Transitional", room_type: "Pooja Room", style_slug: "transitional", room_type_slug: "pooja_room",
    specifications: [
      {"CATEGORY": "MANDIR", "ITEM": "Updated Classic Temple", "STYLE/PATTERN": "Simplified Traditional", "MATERIAL OPTIONS": "Painted wood, MDF", "COLOR/FINISH": "White, Warm gray", "NOTES": "SIGNATURE - Timeless sacred"},
      {"CATEGORY": "BACKDROP", "ITEM": "Panel Moulding", "STYLE/PATTERN": "Classic Panels", "MATERIAL OPTIONS": "MDF, Wood", "COLOR/FINISH": "White, Soft colors", "NOTES": "ICONIC - Updated classic"},
      {"CATEGORY": "LIGHTING", "ITEM": "Lantern Style", "STYLE/PATTERN": "Updated Traditional", "MATERIAL OPTIONS": "Metal, Glass", "COLOR/FINISH": "Polished nickel", "NOTES": "Classic with clean lines"},
      {"CATEGORY": "ACCESSORIES", "ITEM": "Traditional Updated", "STYLE/PATTERN": "Classic Shapes", "MATERIAL OPTIONS": "Brass, Ceramic", "COLOR/FINISH": "Satin nickel, White", "NOTES": "Refined traditional"},
      {"CATEGORY": "FLOORING", "ITEM": "Classic Rug", "STYLE/PATTERN": "Soft Oriental", "MATERIAL OPTIONS": "Wool", "COLOR/FINISH": "Muted traditional", "NOTES": "Subtle pattern"}
    ],
    checklist: [{"CATEGORY": "MANDIR", "ITEM": "Simplified traditional temple", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}, {"CATEGORY": "BACKDROP", "ITEM": "Classic panel moulding", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}],
    finishes: [["Warm White", "Timeless finish", "⭐⭐⭐⭐⭐"], ["Polished Nickel", "Updated classic", "⭐⭐⭐⭐⭐"], ["Soft Gray", "Transitional neutral", "⭐⭐⭐⭐⭐"]]
  }
];

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

    const { action = "load" } = await req.json().catch(() => ({}));

    if (action === "verify") {
      const { data: existing, error: countError } = await supabase
        .from("smart_defaults")
        .select("style, room_type", { count: "exact" });

      if (countError) throw countError;

      const styles = [...new Set(existing?.map(r => r.style) || [])];
      const roomTypes = [...new Set(existing?.map(r => r.room_type) || [])];

      return new Response(
        JSON.stringify({
          success: true,
          total_records: existing?.length || 0,
          distinct_styles: styles.length,
          distinct_room_types: roomTypes.length,
          styles,
          room_types: roomTypes
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Load all 38 missing smart defaults
    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    console.log(`Loading ${missingDefaults.length} missing smart defaults...`);

    for (const combo of missingDefaults) {
      const { error } = await supabase
        .from("smart_defaults")
        .upsert({
          style: combo.style,
          room_type: combo.room_type,
          style_slug: combo.style_slug,
          room_type_slug: combo.room_type_slug,
          source_file: `${combo.room_type}-${combo.style}.xlsx`,
          specifications: combo.specifications,
          checklist: combo.checklist,
          finishes: combo.finishes,
          updated_at: new Date().toISOString()
        }, {
          onConflict: "style_slug,room_type_slug"
        });

      if (error) {
        errorCount++;
        errors.push(`${combo.style}/${combo.room_type}: ${error.message}`);
        console.error(`Error loading ${combo.style}/${combo.room_type}:`, error.message);
      } else {
        successCount++;
        console.log(`Loaded: ${combo.style} - ${combo.room_type}`);
      }
    }

    // Verify final count
    const { data: finalData } = await supabase
      .from("smart_defaults")
      .select("id", { count: "exact" });

    return new Response(
      JSON.stringify({
        success: errorCount === 0,
        message: `Loaded ${successCount} of ${missingDefaults.length} missing records. Total in database: ${finalData?.length || 0}`,
        total_in_database: finalData?.length || 0,
        success_count: successCount,
        error_count: errorCount,
        errors: errors.slice(0, 10)
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error loading smart defaults:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
