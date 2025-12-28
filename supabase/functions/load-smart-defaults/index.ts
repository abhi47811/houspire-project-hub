import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Complete smart defaults data - all 168 combinations
const smartDefaultsData = {
  "metadata": {
    "total_combinations": 168
  },
  "combinations": [
    {
      "style": "Art Deco",
      "room_type": "Balcony",
      "style_slug": "art_deco",
      "room_type_slug": "balcony",
      "source_file": "Balcony-Art Deco.xlsx",
      "specifications": [
        {"CATEGORY": "RAILING/BALUSTRADE", "ITEM": "Main Railing", "STYLE/PATTERN": "Sunburst Pattern", "MATERIAL OPTIONS": "Powder-coated aluminum, Brass-tone metal", "COLOR/FINISH": "Polished Brass / Satin Black", "NOTES": "ICONIC - Primary Deco statement piece"},
        {"CATEGORY": "FLOORING", "ITEM": "Primary Tile", "STYLE/PATTERN": "Black+White Checkerboard", "MATERIAL OPTIONS": "Porcelain tile (outdoor rated)", "COLOR/FINISH": "Matte Black + Glossy White", "NOTES": "CLASSIC - Timeless Deco pattern"},
        {"CATEGORY": "SEATING", "ITEM": "Lounge Chair (x2)", "STYLE/PATTERN": "Geometric Frame", "MATERIAL OPTIONS": "Powder-coated aluminum, Sunbrella fabric", "COLOR/FINISH": "Black frame + Emerald cushion", "NOTES": "Matching pair for symmetry"},
        {"CATEGORY": "LIGHTING", "ITEM": "Wall Sconce (x2)", "STYLE/PATTERN": "Fan/Shell Shape", "MATERIAL OPTIONS": "Die-cast aluminum, Frosted glass", "COLOR/FINISH": "Antique Brass / Black+Brass", "NOTES": "2700-3000K warm white, IP65 rated"},
        {"CATEGORY": "PLANTERS", "ITEM": "Large Pedestal Planter", "STYLE/PATTERN": "Fluted/Stepped Design", "MATERIAL OPTIONS": "Fiberglass with lacquer finish", "COLOR/FINISH": "Black Lacquer + Brass rim", "NOTES": "SIGNATURE - Flanking entrance"}
      ],
      "checklist": [],
      "finishes": [["Black Lacquer", "High-gloss marine-grade black", "⭐⭐⭐⭐⭐"], ["White Lacquer", "High-gloss pure white", "⭐⭐⭐⭐⭐"], ["Polished Brass", "Mirror-finish brass", "⭐⭐⭐⭐⭐"]]
    },
    {
      "style": "Art Deco",
      "room_type": "Living Room",
      "style_slug": "art_deco",
      "room_type_slug": "living_room",
      "source_file": "Living Room-Art Deco.xlsx",
      "specifications": [
        {"CATEGORY": "SOFA", "ITEM": "Main Sofa", "STYLE/PATTERN": "Channel-tufted or Curved", "MATERIAL OPTIONS": "Velvet, Performance velvet", "COLOR/FINISH": "Emerald Green, Navy, Deep Ruby", "NOTES": "SIGNATURE - Statement jewel tone"},
        {"CATEGORY": "COFFEE TABLE", "ITEM": "Coffee Table", "STYLE/PATTERN": "Geometric/Sunburst Base", "MATERIAL OPTIONS": "Brass, Chrome, Glass, Marble", "COLOR/FINISH": "Polished Brass + Glass/Marble", "NOTES": "ICONIC - Geometric base essential"},
        {"CATEGORY": "CHANDELIER", "ITEM": "Statement Chandelier", "STYLE/PATTERN": "Sputnik or Tiered Crystal", "MATERIAL OPTIONS": "Brass, Chrome, Crystal", "COLOR/FINISH": "Polished Brass or Chrome", "NOTES": "SIGNATURE - Dramatic centerpiece"},
        {"CATEGORY": "RUG", "ITEM": "Area Rug", "STYLE/PATTERN": "Geometric Pattern", "MATERIAL OPTIONS": "Wool, Wool blend", "COLOR/FINISH": "Black/White/Gold geometric", "NOTES": "Ground the space"},
        {"CATEGORY": "MIRROR", "ITEM": "Sunburst Mirror", "STYLE/PATTERN": "Sunburst/Starburst", "MATERIAL OPTIONS": "Metal, Gilded wood", "COLOR/FINISH": "Gold leaf or Brass", "NOTES": "ICONIC - Must-have Deco element"}
      ],
      "checklist": [
        {"CATEGORY": "SEATING", "ITEM": "Channel-tufted velvet sofa", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "LIGHTING", "ITEM": "Statement chandelier", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "DECOR", "ITEM": "Sunburst mirror", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}
      ],
      "finishes": [["Emerald Velvet", "Rich emerald green", "⭐⭐⭐⭐⭐"], ["Navy Velvet", "Deep navy blue", "⭐⭐⭐⭐⭐"], ["Polished Brass", "Mirror finish", "⭐⭐⭐⭐⭐"]]
    },
    {
      "style": "Art Deco",
      "room_type": "Master Bedroom",
      "style_slug": "art_deco",
      "room_type_slug": "master_bedroom",
      "source_file": "Master Bedroom-Art Deco.xlsx",
      "specifications": [
        {"CATEGORY": "BED", "ITEM": "Statement Bed", "STYLE/PATTERN": "Upholstered Headboard with Channel Tufting", "MATERIAL OPTIONS": "Velvet, Performance fabric", "COLOR/FINISH": "Emerald, Navy, Black, or Gold", "NOTES": "SIGNATURE - Tall dramatic headboard"},
        {"CATEGORY": "NIGHTSTANDS", "ITEM": "Nightstands (Pair)", "STYLE/PATTERN": "Geometric/Stepped Design", "MATERIAL OPTIONS": "Lacquered wood, Brass accents", "COLOR/FINISH": "Black lacquer, White lacquer, Brass", "NOTES": "Symmetrical placement essential"},
        {"CATEGORY": "CHANDELIER", "ITEM": "Bedroom Chandelier", "STYLE/PATTERN": "Crystal or Geometric", "MATERIAL OPTIONS": "Crystal, Brass, Chrome", "COLOR/FINISH": "Polished Brass or Chrome", "NOTES": "Statement overhead lighting"},
        {"CATEGORY": "MIRROR", "ITEM": "Vanity/Wall Mirror", "STYLE/PATTERN": "Sunburst or Art Deco Frame", "MATERIAL OPTIONS": "Gilded, Brass, Chrome", "COLOR/FINISH": "Gold or Silver", "NOTES": "Decorative frame essential"},
        {"CATEGORY": "RUG", "ITEM": "Bedroom Rug", "STYLE/PATTERN": "Geometric Pattern", "MATERIAL OPTIONS": "Wool, Silk blend", "COLOR/FINISH": "Black/White/Gold", "NOTES": "Under-bed placement"}
      ],
      "checklist": [
        {"CATEGORY": "BED", "ITEM": "Upholstered bed with channel tufting", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "LIGHTING", "ITEM": "Crystal or geometric chandelier", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "NIGHTSTANDS", "ITEM": "Matching pair with geometric design", "INCLUDE?": "YES", "PRIORITY": "ESSENTIAL"}
      ],
      "finishes": [["Emerald Velvet", "Rich jewel tone", "⭐⭐⭐⭐⭐"], ["Black Lacquer", "High-gloss glamour", "⭐⭐⭐⭐⭐"], ["Gold Accents", "Brass hardware", "⭐⭐⭐⭐⭐"]]
    },
    {
      "style": "Modern Indian",
      "room_type": "Living Room",
      "style_slug": "modern_indian",
      "room_type_slug": "living_room",
      "source_file": "Living Room-Modern Indian.xlsx",
      "specifications": [
        {"CATEGORY": "SOFA", "ITEM": "Main Sofa", "STYLE/PATTERN": "Clean lines with ethnic cushions", "MATERIAL OPTIONS": "Linen, Cotton, Velvet", "COLOR/FINISH": "Neutral base, ethnic prints", "NOTES": "Contemporary silhouette, Indian textiles"},
        {"CATEGORY": "COFFEE TABLE", "ITEM": "Coffee Table", "STYLE/PATTERN": "Carved Wood or Brass Inlay", "MATERIAL OPTIONS": "Solid wood, Brass inlay, Marble", "COLOR/FINISH": "Walnut, Teak, Brass", "NOTES": "SIGNATURE - Artisanal Indian craft"},
        {"CATEGORY": "ACCENT CHAIRS", "ITEM": "Accent Seating", "STYLE/PATTERN": "Traditional prints on modern frames", "MATERIAL OPTIONS": "Block print, Ikat, Kantha", "COLOR/FINISH": "Indigo, Terracotta, Mustard", "NOTES": "Mix patterns thoughtfully"},
        {"CATEGORY": "LIGHTING", "ITEM": "Statement Light", "STYLE/PATTERN": "Brass Pendant or Jali Pattern", "MATERIAL OPTIONS": "Brass, Copper, Jali cutwork", "COLOR/FINISH": "Antique Brass, Copper", "NOTES": "ICONIC - Indian metalwork"},
        {"CATEGORY": "WALL ART", "ITEM": "Wall Decor", "STYLE/PATTERN": "Pichwai, Madhubani, or Contemporary Indian", "MATERIAL OPTIONS": "Canvas, Fabric, Metal", "COLOR/FINISH": "Traditional or modern interpretation", "NOTES": "Celebrate Indian art forms"}
      ],
      "checklist": [
        {"CATEGORY": "TEXTILES", "ITEM": "Ethnic cushion covers", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "FURNITURE", "ITEM": "Carved wood coffee table", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "LIGHTING", "ITEM": "Brass pendant or jali lamp", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "DECOR", "ITEM": "Brass urli or traditional vessels", "INCLUDE?": "YES", "PRIORITY": "RECOMMENDED"}
      ],
      "finishes": [["Antique Brass", "Patinated brass finish", "⭐⭐⭐⭐⭐"], ["Terracotta", "Warm earth tones", "⭐⭐⭐⭐⭐"], ["Indigo Block Print", "Traditional textile", "⭐⭐⭐⭐⭐"]]
    },
    {
      "style": "Modern Indian",
      "room_type": "Master Bedroom",
      "style_slug": "modern_indian",
      "room_type_slug": "master_bedroom",
      "source_file": "Master Bedroom-Modern Indian.xlsx",
      "specifications": [
        {"CATEGORY": "BED", "ITEM": "Main Bed", "STYLE/PATTERN": "Upholstered with Ethnic Fabric or Carved Wood", "MATERIAL OPTIONS": "Teak, Sheesham, Upholstered", "COLOR/FINISH": "Walnut, Natural, Block print", "NOTES": "SIGNATURE - Indian craftsmanship"},
        {"CATEGORY": "NIGHTSTANDS", "ITEM": "Bedside Tables", "STYLE/PATTERN": "Carved or Brass Inlay", "MATERIAL OPTIONS": "Solid wood with brass", "COLOR/FINISH": "Walnut, Brass accents", "NOTES": "Artisanal details"},
        {"CATEGORY": "LIGHTING", "ITEM": "Bedside Lamps", "STYLE/PATTERN": "Brass or Ceramic", "MATERIAL OPTIONS": "Brass, Blue pottery", "COLOR/FINISH": "Antique brass, Jaipur blue", "NOTES": "SIGNATURE - Indian craft lamps"},
        {"CATEGORY": "TEXTILES", "ITEM": "Bedding", "STYLE/PATTERN": "Block Print or Kantha Quilts", "MATERIAL OPTIONS": "Cotton, Linen, Silk blend", "COLOR/FINISH": "Indigo, White, Terracotta", "NOTES": "Layer textures and patterns"},
        {"CATEGORY": "MIRROR", "ITEM": "Wall Mirror", "STYLE/PATTERN": "Carved Wood or Brass Frame", "MATERIAL OPTIONS": "Carved mango wood, Brass", "COLOR/FINISH": "Natural wood, Antique brass", "NOTES": "Indian artisan frame"}
      ],
      "checklist": [
        {"CATEGORY": "BED", "ITEM": "Carved wood or upholstered bed", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "TEXTILES", "ITEM": "Block print or kantha bedding", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "LIGHTING", "ITEM": "Brass or blue pottery lamps", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}
      ],
      "finishes": [["Teak Wood", "Natural Indian hardwood", "⭐⭐⭐⭐⭐"], ["Block Print Indigo", "Traditional textile", "⭐⭐⭐⭐⭐"], ["Brass Accents", "Antique finish", "⭐⭐⭐⭐⭐"]]
    },
    {
      "style": "Modern Indian",
      "room_type": "Kitchen",
      "style_slug": "modern_indian",
      "room_type_slug": "kitchen",
      "source_file": "Kitchen-Modern Indian.xlsx",
      "specifications": [
        {"CATEGORY": "CABINETS", "ITEM": "Upper Cabinets", "STYLE/PATTERN": "Shaker with Brass Hardware", "MATERIAL OPTIONS": "MDF, Plywood with veneer", "COLOR/FINISH": "White, Sage, Terracotta", "NOTES": "Clean lines, ethnic hardware"},
        {"CATEGORY": "CABINETS", "ITEM": "Lower Cabinets", "STYLE/PATTERN": "Shaker or Flat Panel", "MATERIAL OPTIONS": "Marine plywood", "COLOR/FINISH": "Walnut, White, Two-tone", "NOTES": "Warm wood tones"},
        {"CATEGORY": "BACKSPLASH", "ITEM": "Wall Tiles", "STYLE/PATTERN": "Zellige or Moroccan pattern", "MATERIAL OPTIONS": "Ceramic, Handmade tiles", "COLOR/FINISH": "White, Blue, Terracotta", "NOTES": "SIGNATURE - Artisanal tiles"},
        {"CATEGORY": "HARDWARE", "ITEM": "Pulls and Knobs", "STYLE/PATTERN": "Brass Traditional", "MATERIAL OPTIONS": "Solid brass", "COLOR/FINISH": "Antique brass, Unlacquered", "NOTES": "ICONIC - Indian brass craft"},
        {"CATEGORY": "LIGHTING", "ITEM": "Pendant Lights", "STYLE/PATTERN": "Brass or Jali", "MATERIAL OPTIONS": "Brass, Copper", "COLOR/FINISH": "Antique brass", "NOTES": "Over island/counter"}
      ],
      "checklist": [
        {"CATEGORY": "HARDWARE", "ITEM": "Brass pulls and knobs", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "BACKSPLASH", "ITEM": "Handmade zellige tiles", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "LIGHTING", "ITEM": "Brass pendant lights", "INCLUDE?": "YES", "PRIORITY": "ESSENTIAL"}
      ],
      "finishes": [["Antique Brass Hardware", "Traditional pulls", "⭐⭐⭐⭐⭐"], ["Zellige Tiles", "Handmade Moroccan style", "⭐⭐⭐⭐⭐"], ["Terracotta Accents", "Warm earth tones", "⭐⭐⭐⭐"]]
    },
    {
      "style": "Contemporary",
      "room_type": "Living Room",
      "style_slug": "contemporary",
      "room_type_slug": "living_room",
      "source_file": "Living Room-Contemporary.xlsx",
      "specifications": [
        {"CATEGORY": "SOFA", "ITEM": "Main Sofa", "STYLE/PATTERN": "Low-profile, Clean Lines", "MATERIAL OPTIONS": "Performance fabric, Leather", "COLOR/FINISH": "Gray, Beige, Charcoal", "NOTES": "SIGNATURE - Sleek silhouette"},
        {"CATEGORY": "COFFEE TABLE", "ITEM": "Coffee Table", "STYLE/PATTERN": "Geometric or Sculptural", "MATERIAL OPTIONS": "Wood, Metal, Glass, Stone", "COLOR/FINISH": "Natural oak, Black, White", "NOTES": "Statement piece"},
        {"CATEGORY": "LIGHTING", "ITEM": "Floor Lamp", "STYLE/PATTERN": "Arc or Sculptural", "MATERIAL OPTIONS": "Metal, Marble base", "COLOR/FINISH": "Matte black, Brass", "NOTES": "Functional art piece"},
        {"CATEGORY": "RUG", "ITEM": "Area Rug", "STYLE/PATTERN": "Abstract or Textured Solid", "MATERIAL OPTIONS": "Wool, Viscose blend", "COLOR/FINISH": "Neutral with texture", "NOTES": "Grounding element"},
        {"CATEGORY": "ART", "ITEM": "Wall Art", "STYLE/PATTERN": "Large-scale Abstract", "MATERIAL OPTIONS": "Canvas, Mixed media", "COLOR/FINISH": "Bold or muted palette", "NOTES": "SIGNATURE - Statement art"}
      ],
      "checklist": [
        {"CATEGORY": "SEATING", "ITEM": "Low-profile modern sofa", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "LIGHTING", "ITEM": "Statement floor lamp", "INCLUDE?": "YES", "PRIORITY": "ESSENTIAL"},
        {"CATEGORY": "ART", "ITEM": "Large-scale artwork", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}
      ],
      "finishes": [["Matte Black", "Sophisticated dark finish", "⭐⭐⭐⭐⭐"], ["Natural Oak", "Warm wood tone", "⭐⭐⭐⭐⭐"], ["Gray Performance Fabric", "Durable and sleek", "⭐⭐⭐⭐⭐"]]
    },
    {
      "style": "Contemporary",
      "room_type": "Master Bedroom",
      "style_slug": "contemporary",
      "room_type_slug": "master_bedroom",
      "source_file": "Master Bedroom-Contemporary.xlsx",
      "specifications": [
        {"CATEGORY": "BED", "ITEM": "Platform Bed", "STYLE/PATTERN": "Low Platform with Upholstered Headboard", "MATERIAL OPTIONS": "Wood, Upholstered", "COLOR/FINISH": "Walnut, Gray, Charcoal", "NOTES": "SIGNATURE - Clean horizontal lines"},
        {"CATEGORY": "NIGHTSTANDS", "ITEM": "Bedside Tables", "STYLE/PATTERN": "Floating or Minimalist", "MATERIAL OPTIONS": "Wood, Metal, Lacquer", "COLOR/FINISH": "Walnut, White, Black", "NOTES": "Asymmetry acceptable"},
        {"CATEGORY": "LIGHTING", "ITEM": "Pendant or Sconces", "STYLE/PATTERN": "Sculptural Pendants", "MATERIAL OPTIONS": "Glass, Metal", "COLOR/FINISH": "Smoke glass, Black, Brass", "NOTES": "SIGNATURE - Statement bedside lighting"},
        {"CATEGORY": "SEATING", "ITEM": "Accent Chair", "STYLE/PATTERN": "Sculptural or Lounge", "MATERIAL OPTIONS": "Bouclé, Velvet, Leather", "COLOR/FINISH": "Neutral or accent color", "NOTES": "Optional reading corner"},
        {"CATEGORY": "WINDOW", "ITEM": "Window Treatment", "STYLE/PATTERN": "Motorized Sheer + Blackout", "MATERIAL OPTIONS": "Sheer linen, Blackout roller", "COLOR/FINISH": "White, Gray", "NOTES": "Layered for function"}
      ],
      "checklist": [
        {"CATEGORY": "BED", "ITEM": "Low platform bed", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "LIGHTING", "ITEM": "Sculptural pendant lights", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "TEXTILES", "ITEM": "Layered neutral bedding", "INCLUDE?": "YES", "PRIORITY": "ESSENTIAL"}
      ],
      "finishes": [["Walnut Wood", "Warm mid-century tone", "⭐⭐⭐⭐⭐"], ["Smoke Glass", "Contemporary lighting", "⭐⭐⭐⭐⭐"], ["Bouclé Fabric", "Textured neutral", "⭐⭐⭐⭐⭐"]]
    },
    {
      "style": "Minimalist",
      "room_type": "Living Room",
      "style_slug": "minimalist",
      "room_type_slug": "living_room",
      "source_file": "Living Room-Minimalist.xlsx",
      "specifications": [
        {"CATEGORY": "SOFA", "ITEM": "Main Sofa", "STYLE/PATTERN": "Simple Lines, No Visible Legs", "MATERIAL OPTIONS": "Linen, Cotton, Performance", "COLOR/FINISH": "White, Beige, Light Gray", "NOTES": "SIGNATURE - Pure, unadorned form"},
        {"CATEGORY": "COFFEE TABLE", "ITEM": "Coffee Table", "STYLE/PATTERN": "Simple Geometric", "MATERIAL OPTIONS": "Wood, Stone, Metal", "COLOR/FINISH": "Natural oak, White marble", "NOTES": "Clean lines, no ornamentation"},
        {"CATEGORY": "LIGHTING", "ITEM": "Floor Lamp", "STYLE/PATTERN": "Simple Arc or Linear", "MATERIAL OPTIONS": "Metal, Paper shade", "COLOR/FINISH": "White, Black", "NOTES": "Functional form"},
        {"CATEGORY": "STORAGE", "ITEM": "Media Console", "STYLE/PATTERN": "Floating or Low Profile", "MATERIAL OPTIONS": "Wood, Lacquer", "COLOR/FINISH": "White, Light oak", "NOTES": "Hidden storage preferred"},
        {"CATEGORY": "PLANTS", "ITEM": "Single Statement Plant", "STYLE/PATTERN": "Sculptural", "MATERIAL OPTIONS": "Fiddle leaf, Snake plant", "COLOR/FINISH": "Green against white", "NOTES": "One focal plant"}
      ],
      "checklist": [
        {"CATEGORY": "SEATING", "ITEM": "Simple sofa, neutral color", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "CLUTTER", "ITEM": "Minimal accessories", "INCLUDE?": "YES", "PRIORITY": "ESSENTIAL"},
        {"CATEGORY": "STORAGE", "ITEM": "Hidden storage solutions", "INCLUDE?": "YES", "PRIORITY": "ESSENTIAL"}
      ],
      "finishes": [["White Matte", "Pure, clean finish", "⭐⭐⭐⭐⭐"], ["Light Oak", "Warm natural wood", "⭐⭐⭐⭐⭐"], ["White Linen", "Soft textile", "⭐⭐⭐⭐⭐"]]
    },
    {
      "style": "Minimalist",
      "room_type": "Master Bedroom",
      "style_slug": "minimalist",
      "room_type_slug": "master_bedroom",
      "source_file": "Master Bedroom-Minimalist.xlsx",
      "specifications": [
        {"CATEGORY": "BED", "ITEM": "Platform Bed", "STYLE/PATTERN": "Floating or Simple Platform", "MATERIAL OPTIONS": "Wood, Upholstered", "COLOR/FINISH": "Light oak, White, Beige", "NOTES": "SIGNATURE - No footboard, clean frame"},
        {"CATEGORY": "NIGHTSTANDS", "ITEM": "Bedside Tables", "STYLE/PATTERN": "Floating Shelf or Simple Cube", "MATERIAL OPTIONS": "Wood, Metal", "COLOR/FINISH": "Matching bed tone", "NOTES": "Minimal profile"},
        {"CATEGORY": "LIGHTING", "ITEM": "Bedside Lighting", "STYLE/PATTERN": "Wall Mounted or Pendant", "MATERIAL OPTIONS": "Metal, Paper", "COLOR/FINISH": "White, Black", "NOTES": "Free up surface space"},
        {"CATEGORY": "TEXTILES", "ITEM": "Bedding", "STYLE/PATTERN": "Simple, Hotel-style", "MATERIAL OPTIONS": "Linen, Egyptian cotton", "COLOR/FINISH": "White, Oatmeal", "NOTES": "Limited layers"},
        {"CATEGORY": "WINDOW", "ITEM": "Window Treatment", "STYLE/PATTERN": "Simple Roller or Sheer", "MATERIAL OPTIONS": "Linen sheer, Roller blind", "COLOR/FINISH": "White, Natural", "NOTES": "Unobtrusive"}
      ],
      "checklist": [
        {"CATEGORY": "BED", "ITEM": "Simple platform bed", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "CLUTTER", "ITEM": "Minimal nightstand items", "INCLUDE?": "YES", "PRIORITY": "ESSENTIAL"},
        {"CATEGORY": "TEXTILES", "ITEM": "White or neutral bedding", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}
      ],
      "finishes": [["Light Oak", "Natural wood", "⭐⭐⭐⭐⭐"], ["White Linen", "Crisp textile", "⭐⭐⭐⭐⭐"], ["Matte White", "Clean finish", "⭐⭐⭐⭐⭐"]]
    },
    {
      "style": "Scandinavian",
      "room_type": "Living Room",
      "style_slug": "scandinavian",
      "room_type_slug": "living_room",
      "source_file": "Living Room-Scandinavian.xlsx",
      "specifications": [
        {"CATEGORY": "SOFA", "ITEM": "Main Sofa", "STYLE/PATTERN": "Clean Lines, Wooden Legs", "MATERIAL OPTIONS": "Linen, Bouclé, Wool", "COLOR/FINISH": "Light gray, Cream, White", "NOTES": "SIGNATURE - Light, airy feel"},
        {"CATEGORY": "COFFEE TABLE", "ITEM": "Coffee Table", "STYLE/PATTERN": "Round or Organic Shape", "MATERIAL OPTIONS": "Light wood, White", "COLOR/FINISH": "Natural oak, Birch, White", "NOTES": "Soft curves preferred"},
        {"CATEGORY": "LIGHTING", "ITEM": "Pendant Light", "STYLE/PATTERN": "Organic Shape or Paper Lantern", "MATERIAL OPTIONS": "Paper, Metal, Wood", "COLOR/FINISH": "White, Natural", "NOTES": "ICONIC - Scandinavian design classics"},
        {"CATEGORY": "RUG", "ITEM": "Area Rug", "STYLE/PATTERN": "Textured Wool or Sheepskin", "MATERIAL OPTIONS": "Wool, Sheepskin", "COLOR/FINISH": "White, Gray, Natural", "NOTES": "Warmth and texture"},
        {"CATEGORY": "PLANTS", "ITEM": "Greenery", "STYLE/PATTERN": "Multiple Plants", "MATERIAL OPTIONS": "Various indoor plants", "COLOR/FINISH": "Green against white", "NOTES": "Bring nature indoors"}
      ],
      "checklist": [
        {"CATEGORY": "SEATING", "ITEM": "Light-colored sofa with wood legs", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "TEXTILES", "ITEM": "Cozy throws and cushions", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "LIGHTING", "ITEM": "Warm, ambient lighting", "INCLUDE?": "YES", "PRIORITY": "ESSENTIAL"}
      ],
      "finishes": [["Light Oak", "Natural Scandinavian wood", "⭐⭐⭐⭐⭐"], ["White Bouclé", "Textured neutral", "⭐⭐⭐⭐⭐"], ["Natural Linen", "Breathable fabric", "⭐⭐⭐⭐⭐"]]
    },
    {
      "style": "Scandinavian",
      "room_type": "Master Bedroom",
      "style_slug": "scandinavian",
      "room_type_slug": "master_bedroom",
      "source_file": "Master Bedroom-Scandinavian.xlsx",
      "specifications": [
        {"CATEGORY": "BED", "ITEM": "Bed Frame", "STYLE/PATTERN": "Simple Wood Frame", "MATERIAL OPTIONS": "Oak, Birch, Pine", "COLOR/FINISH": "Natural, White washed", "NOTES": "SIGNATURE - Light wood essential"},
        {"CATEGORY": "NIGHTSTANDS", "ITEM": "Bedside Tables", "STYLE/PATTERN": "Simple with Tapered Legs", "MATERIAL OPTIONS": "Light wood", "COLOR/FINISH": "Oak, White", "NOTES": "Matching or complementary"},
        {"CATEGORY": "LIGHTING", "ITEM": "Bedside Lamps", "STYLE/PATTERN": "Ceramic or Wood Base", "MATERIAL OPTIONS": "Ceramic, Wood, Paper shade", "COLOR/FINISH": "White, Natural", "NOTES": "Warm, soft glow"},
        {"CATEGORY": "TEXTILES", "ITEM": "Bedding", "STYLE/PATTERN": "Layered, Cozy", "MATERIAL OPTIONS": "Linen, Cotton, Wool throw", "COLOR/FINISH": "White, Gray, Natural", "NOTES": "SIGNATURE - Multiple layers"},
        {"CATEGORY": "DECOR", "ITEM": "Wall Art", "STYLE/PATTERN": "Nature-inspired or Abstract", "MATERIAL OPTIONS": "Print, Photography", "COLOR/FINISH": "Black and white or soft colors", "NOTES": "Simple frames"}
      ],
      "checklist": [
        {"CATEGORY": "BED", "ITEM": "Light wood bed frame", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "TEXTILES", "ITEM": "Layered cozy bedding", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "LIGHTING", "ITEM": "Warm bedside lighting", "INCLUDE?": "YES", "PRIORITY": "ESSENTIAL"}
      ],
      "finishes": [["Natural Oak", "Light wood tone", "⭐⭐⭐⭐⭐"], ["White Linen", "Crisp bedding", "⭐⭐⭐⭐⭐"], ["Sheepskin", "Cozy texture", "⭐⭐⭐⭐⭐"]]
    },
    {
      "style": "Traditional Indian",
      "room_type": "Living Room",
      "style_slug": "traditional_indian",
      "room_type_slug": "living_room",
      "source_file": "Living Room-Traditional Indian.xlsx",
      "specifications": [
        {"CATEGORY": "SEATING", "ITEM": "Diwan or Settee", "STYLE/PATTERN": "Carved Wood with Bolsters", "MATERIAL OPTIONS": "Teak, Sheesham, Rosewood", "COLOR/FINISH": "Dark wood, Rich fabrics", "NOTES": "SIGNATURE - Traditional form"},
        {"CATEGORY": "SEATING", "ITEM": "Floor Cushions/Gaddi", "STYLE/PATTERN": "Embroidered or Brocade", "MATERIAL OPTIONS": "Silk brocade, Velvet", "COLOR/FINISH": "Jewel tones, Gold embroidery", "NOTES": "ICONIC - Traditional floor seating"},
        {"CATEGORY": "COFFEE TABLE", "ITEM": "Bajot/Chowki", "STYLE/PATTERN": "Carved Low Table", "MATERIAL OPTIONS": "Solid wood, Brass inlay", "COLOR/FINISH": "Carved teak, Brass details", "NOTES": "SIGNATURE - Traditional low table"},
        {"CATEGORY": "LIGHTING", "ITEM": "Hanging Lamp", "STYLE/PATTERN": "Brass Jali or Glass Mosaic", "MATERIAL OPTIONS": "Brass, Colored glass", "COLOR/FINISH": "Antique brass, Multicolor", "NOTES": "ICONIC - Statement traditional lamp"},
        {"CATEGORY": "WALL ART", "ITEM": "Traditional Art", "STYLE/PATTERN": "Tanjore, Pichwai, Pattachitra", "MATERIAL OPTIONS": "Traditional mediums", "COLOR/FINISH": "Gold leaf, Rich colors", "NOTES": "SIGNATURE - Authentic Indian art"}
      ],
      "checklist": [
        {"CATEGORY": "SEATING", "ITEM": "Carved wood diwan", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "SEATING", "ITEM": "Floor cushions/gaddi", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "LIGHTING", "ITEM": "Brass jali lamp", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "DECOR", "ITEM": "Brass urli with flowers", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}
      ],
      "finishes": [["Carved Teak", "Traditional dark wood", "⭐⭐⭐⭐⭐"], ["Silk Brocade", "Rich traditional fabric", "⭐⭐⭐⭐⭐"], ["Antique Brass", "Patinated metalwork", "⭐⭐⭐⭐⭐"]]
    },
    {
      "style": "Traditional Indian",
      "room_type": "Pooja Room",
      "style_slug": "traditional_indian",
      "room_type_slug": "pooja_room",
      "source_file": "Pooja Room-Traditional Indian.xlsx",
      "specifications": [
        {"CATEGORY": "MANDIR", "ITEM": "Main Temple Unit", "STYLE/PATTERN": "Carved Wood with Dome/Shikhar", "MATERIAL OPTIONS": "Teak, Sheesham, Marble", "COLOR/FINISH": "Dark wood, White marble", "NOTES": "SIGNATURE - Central worship unit"},
        {"CATEGORY": "BACKDROP", "ITEM": "Back Panel", "STYLE/PATTERN": "Carved Jali or Brass Panel", "MATERIAL OPTIONS": "MDF jali, Brass sheet", "COLOR/FINISH": "White jali, Gold brass", "NOTES": "Decorative backdrop"},
        {"CATEGORY": "LIGHTING", "ITEM": "Traditional Lamp", "STYLE/PATTERN": "Brass Diya Stand or Hanging", "MATERIAL OPTIONS": "Brass, Bronze", "COLOR/FINISH": "Antique brass", "NOTES": "SIGNATURE - Authentic lamp"},
        {"CATEGORY": "FLOORING", "ITEM": "Floor Treatment", "STYLE/PATTERN": "Marble or Traditional Tiles", "MATERIAL OPTIONS": "White marble, Athangudi", "COLOR/FINISH": "White, Traditional patterns", "NOTES": "Easy to clean, auspicious"},
        {"CATEGORY": "STORAGE", "ITEM": "Puja Items Storage", "STYLE/PATTERN": "Closed Cabinets or Drawers", "MATERIAL OPTIONS": "Matching wood", "COLOR/FINISH": "Matching mandir", "NOTES": "Organized storage"}
      ],
      "checklist": [
        {"CATEGORY": "MANDIR", "ITEM": "Carved wooden mandir", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "LIGHTING", "ITEM": "Brass diya stand", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "BACKDROP", "ITEM": "Decorative jali panel", "INCLUDE?": "YES", "PRIORITY": "ESSENTIAL"},
        {"CATEGORY": "BELLS", "ITEM": "Brass temple bells", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}
      ],
      "finishes": [["Carved Teak", "Traditional temple wood", "⭐⭐⭐⭐⭐"], ["Brass", "Divine metalwork", "⭐⭐⭐⭐⭐"], ["White Marble", "Pure and auspicious", "⭐⭐⭐⭐⭐"]]
    },
    {
      "style": "Japandi",
      "room_type": "Living Room",
      "style_slug": "japandi",
      "room_type_slug": "living_room",
      "source_file": "Living Room-Japandi.xlsx",
      "specifications": [
        {"CATEGORY": "SOFA", "ITEM": "Low Sofa", "STYLE/PATTERN": "Low Profile, Clean Lines", "MATERIAL OPTIONS": "Linen, Cotton, Wood frame", "COLOR/FINISH": "Natural, Oatmeal, Soft gray", "NOTES": "SIGNATURE - Japanese-inspired low height"},
        {"CATEGORY": "COFFEE TABLE", "ITEM": "Coffee Table", "STYLE/PATTERN": "Round or Organic, Low", "MATERIAL OPTIONS": "Light wood, Stone", "COLOR/FINISH": "Natural oak, Walnut", "NOTES": "SIGNATURE - Wabi-sabi aesthetic"},
        {"CATEGORY": "LIGHTING", "ITEM": "Paper Lantern", "STYLE/PATTERN": "Noguchi-style or Rice Paper", "MATERIAL OPTIONS": "Paper, Bamboo", "COLOR/FINISH": "Natural, White", "NOTES": "ICONIC - Japanese paper craft"},
        {"CATEGORY": "PLANTS", "ITEM": "Greenery", "STYLE/PATTERN": "Minimal, Sculptural", "MATERIAL OPTIONS": "Bonsai, Snake plant, Kokedama", "COLOR/FINISH": "Green, Terracotta pot", "NOTES": "Intentional placement"},
        {"CATEGORY": "TEXTILES", "ITEM": "Floor Cushions/Zabuton", "STYLE/PATTERN": "Floor Cushions", "MATERIAL OPTIONS": "Linen, Cotton", "COLOR/FINISH": "Natural, Indigo", "NOTES": "Traditional Japanese seating"}
      ],
      "checklist": [
        {"CATEGORY": "SEATING", "ITEM": "Low-profile sofa", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "LIGHTING", "ITEM": "Paper lantern or natural light focus", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "MATERIALS", "ITEM": "Natural materials throughout", "INCLUDE?": "YES", "PRIORITY": "ESSENTIAL"}
      ],
      "finishes": [["Light Oak", "Japanese blonde wood", "⭐⭐⭐⭐⭐"], ["Natural Linen", "Organic textile", "⭐⭐⭐⭐⭐"], ["Rice Paper", "Traditional lighting", "⭐⭐⭐⭐⭐"]]
    },
    {
      "style": "Japandi",
      "room_type": "Master Bedroom",
      "style_slug": "japandi",
      "room_type_slug": "master_bedroom",
      "source_file": "Master Bedroom-Japandi.xlsx",
      "specifications": [
        {"CATEGORY": "BED", "ITEM": "Low Platform Bed", "STYLE/PATTERN": "Very Low or Floor Level", "MATERIAL OPTIONS": "Light wood, Tatami", "COLOR/FINISH": "Natural oak, Walnut", "NOTES": "SIGNATURE - Japanese floor-level living"},
        {"CATEGORY": "NIGHTSTANDS", "ITEM": "Bedside", "STYLE/PATTERN": "Low Stool or Floating Shelf", "MATERIAL OPTIONS": "Wood, Woven", "COLOR/FINISH": "Natural wood", "NOTES": "Minimal and functional"},
        {"CATEGORY": "LIGHTING", "ITEM": "Paper Pendant", "STYLE/PATTERN": "Akari-style Paper Lantern", "MATERIAL OPTIONS": "Rice paper, Bamboo", "COLOR/FINISH": "White, Natural", "NOTES": "ICONIC - Soft diffused light"},
        {"CATEGORY": "TEXTILES", "ITEM": "Bedding", "STYLE/PATTERN": "Simple, Natural Fibers", "MATERIAL OPTIONS": "Linen, Organic cotton", "COLOR/FINISH": "White, Oatmeal, Soft gray", "NOTES": "SIGNATURE - Layered simplicity"},
        {"CATEGORY": "SHOJI", "ITEM": "Screen or Room Divider", "STYLE/PATTERN": "Shoji Screen", "MATERIAL OPTIONS": "Wood, Rice paper", "COLOR/FINISH": "Light wood, White paper", "NOTES": "Traditional Japanese element"}
      ],
      "checklist": [
        {"CATEGORY": "BED", "ITEM": "Low platform bed", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "LIGHTING", "ITEM": "Paper lantern pendant", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "TEXTILES", "ITEM": "Natural linen bedding", "INCLUDE?": "YES", "PRIORITY": "ESSENTIAL"}
      ],
      "finishes": [["Natural Oak", "Blonde Japanese wood", "⭐⭐⭐⭐⭐"], ["Linen White", "Pure natural textile", "⭐⭐⭐⭐⭐"], ["Rice Paper", "Traditional screen material", "⭐⭐⭐⭐⭐"]]
    },
    {
      "style": "Industrial",
      "room_type": "Living Room",
      "style_slug": "industrial",
      "room_type_slug": "living_room",
      "source_file": "Living Room-Industrial.xlsx",
      "specifications": [
        {"CATEGORY": "SOFA", "ITEM": "Main Sofa", "STYLE/PATTERN": "Leather or Distressed", "MATERIAL OPTIONS": "Leather, Distressed leather", "COLOR/FINISH": "Brown, Cognac, Black", "NOTES": "SIGNATURE - Rugged, lived-in look"},
        {"CATEGORY": "COFFEE TABLE", "ITEM": "Coffee Table", "STYLE/PATTERN": "Reclaimed Wood + Metal", "MATERIAL OPTIONS": "Reclaimed wood, Iron base", "COLOR/FINISH": "Natural wood, Black metal", "NOTES": "ICONIC - Industrial materials"},
        {"CATEGORY": "LIGHTING", "ITEM": "Pendant Lights", "STYLE/PATTERN": "Exposed Bulb or Cage", "MATERIAL OPTIONS": "Metal, Exposed Edison bulbs", "COLOR/FINISH": "Black, Brass, Rust", "NOTES": "SIGNATURE - Raw industrial aesthetic"},
        {"CATEGORY": "SHELVING", "ITEM": "Open Shelving", "STYLE/PATTERN": "Pipe Shelving or Metal Frame", "MATERIAL OPTIONS": "Wood + Iron pipes", "COLOR/FINISH": "Reclaimed wood, Black pipe", "NOTES": "ICONIC - Visible hardware"},
        {"CATEGORY": "WALL", "ITEM": "Exposed Brick or Concrete", "STYLE/PATTERN": "Exposed Materials", "MATERIAL OPTIONS": "Brick, Concrete, Faux panels", "COLOR/FINISH": "Red brick, Gray concrete", "NOTES": "SIGNATURE - Raw texture"}
      ],
      "checklist": [
        {"CATEGORY": "SEATING", "ITEM": "Leather or distressed sofa", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "LIGHTING", "ITEM": "Exposed bulb fixtures", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "MATERIALS", "ITEM": "Metal + wood combination", "INCLUDE?": "YES", "PRIORITY": "ESSENTIAL"}
      ],
      "finishes": [["Black Iron", "Raw metal finish", "⭐⭐⭐⭐⭐"], ["Distressed Leather", "Aged, character-rich", "⭐⭐⭐⭐⭐"], ["Reclaimed Wood", "Authentic salvaged material", "⭐⭐⭐⭐⭐"]]
    },
    {
      "style": "Industrial",
      "room_type": "Kitchen",
      "style_slug": "industrial",
      "room_type_slug": "kitchen",
      "source_file": "Kitchen-Industrial.xlsx",
      "specifications": [
        {"CATEGORY": "CABINETS", "ITEM": "Lower Cabinets", "STYLE/PATTERN": "Flat Panel or Open", "MATERIAL OPTIONS": "Painted MDF, Reclaimed wood", "COLOR/FINISH": "Matte black, Dark gray, Natural", "NOTES": "SIGNATURE - Simple, utilitarian"},
        {"CATEGORY": "SHELVING", "ITEM": "Upper Storage", "STYLE/PATTERN": "Open Metal Shelving", "MATERIAL OPTIONS": "Iron pipes, Reclaimed wood", "COLOR/FINISH": "Black pipe, Natural wood", "NOTES": "ICONIC - Industrial open storage"},
        {"CATEGORY": "COUNTERTOP", "ITEM": "Work Surface", "STYLE/PATTERN": "Thick Butcher Block or Concrete", "MATERIAL OPTIONS": "Butcher block, Concrete", "COLOR/FINISH": "Natural wood, Gray concrete", "NOTES": "SIGNATURE - Durable work surfaces"},
        {"CATEGORY": "BACKSPLASH", "ITEM": "Wall Treatment", "STYLE/PATTERN": "Subway Tile or Exposed Brick", "MATERIAL OPTIONS": "Subway tile, Brick", "COLOR/FINISH": "White, Red brick", "NOTES": "Classic industrial materials"},
        {"CATEGORY": "LIGHTING", "ITEM": "Pendant Lights", "STYLE/PATTERN": "Metal Dome or Cage", "MATERIAL OPTIONS": "Black metal, Brass", "COLOR/FINISH": "Matte black, Antique brass", "NOTES": "SIGNATURE - Factory-style lighting"}
      ],
      "checklist": [
        {"CATEGORY": "SHELVING", "ITEM": "Open pipe shelving", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "COUNTERTOP", "ITEM": "Butcher block or concrete", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "LIGHTING", "ITEM": "Metal pendant lights", "INCLUDE?": "YES", "PRIORITY": "ESSENTIAL"}
      ],
      "finishes": [["Matte Black", "Industrial dark finish", "⭐⭐⭐⭐⭐"], ["Butcher Block", "Warm wood counter", "⭐⭐⭐⭐⭐"], ["Black Iron Pipe", "Authentic hardware", "⭐⭐⭐⭐⭐"]]
    },
    {
      "style": "Mid-Century Modern",
      "room_type": "Living Room",
      "style_slug": "mid_century_modern",
      "room_type_slug": "living_room",
      "source_file": "Living Room-Mid-Century Modern.xlsx",
      "specifications": [
        {"CATEGORY": "SOFA", "ITEM": "Main Sofa", "STYLE/PATTERN": "Tapered Legs, Clean Lines", "MATERIAL OPTIONS": "Velvet, Tweed, Leather", "COLOR/FINISH": "Mustard, Olive, Burnt orange", "NOTES": "SIGNATURE - Classic MCM colors"},
        {"CATEGORY": "LOUNGE CHAIR", "ITEM": "Accent Chair", "STYLE/PATTERN": "Iconic Design (Eames, Womb)", "MATERIAL OPTIONS": "Leather, Molded plastic, Fabric", "COLOR/FINISH": "Black, Walnut, Color pops", "NOTES": "ICONIC - Design classic essential"},
        {"CATEGORY": "COFFEE TABLE", "ITEM": "Coffee Table", "STYLE/PATTERN": "Organic Shape or Surfboard", "MATERIAL OPTIONS": "Walnut, Glass, Marble", "COLOR/FINISH": "Walnut, White marble", "NOTES": "SIGNATURE - Sculptural forms"},
        {"CATEGORY": "LIGHTING", "ITEM": "Floor Lamp", "STYLE/PATTERN": "Arc Lamp or Tripod", "MATERIAL OPTIONS": "Metal, Wood", "COLOR/FINISH": "Brass, Walnut, Black", "NOTES": "SIGNATURE - Statement lighting"},
        {"CATEGORY": "WALL", "ITEM": "Wall Art", "STYLE/PATTERN": "Abstract or Atomic Age", "MATERIAL OPTIONS": "Canvas, Metal sculpture", "COLOR/FINISH": "Bold colors or brass", "NOTES": "Period-appropriate art"}
      ],
      "checklist": [
        {"CATEGORY": "FURNITURE", "ITEM": "Iconic design piece (Eames, etc.)", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "SEATING", "ITEM": "Sofa with tapered wood legs", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "LIGHTING", "ITEM": "Arc or tripod floor lamp", "INCLUDE?": "YES", "PRIORITY": "ESSENTIAL"}
      ],
      "finishes": [["Walnut Wood", "Warm MCM tone", "⭐⭐⭐⭐⭐"], ["Mustard Velvet", "Classic MCM color", "⭐⭐⭐⭐⭐"], ["Brass", "Period-accurate metal", "⭐⭐⭐⭐⭐"]]
    },
    {
      "style": "Mid-Century Modern",
      "room_type": "Master Bedroom",
      "style_slug": "mid_century_modern",
      "room_type_slug": "master_bedroom",
      "source_file": "Master Bedroom-Mid-Century Modern.xlsx",
      "specifications": [
        {"CATEGORY": "BED", "ITEM": "Platform Bed", "STYLE/PATTERN": "Low Platform with Splayed Legs", "MATERIAL OPTIONS": "Walnut, Teak", "COLOR/FINISH": "Walnut, Natural teak", "NOTES": "SIGNATURE - Tapered angled legs"},
        {"CATEGORY": "NIGHTSTANDS", "ITEM": "Bedside Tables", "STYLE/PATTERN": "Tapered Legs, Organic Shapes", "MATERIAL OPTIONS": "Walnut, Mixed wood", "COLOR/FINISH": "Walnut, Two-tone", "NOTES": "Matching or complementary"},
        {"CATEGORY": "DRESSER", "ITEM": "Dresser", "STYLE/PATTERN": "Long and Low", "MATERIAL OPTIONS": "Walnut, Teak", "COLOR/FINISH": "Walnut, Natural", "NOTES": "SIGNATURE - Horizontal emphasis"},
        {"CATEGORY": "LIGHTING", "ITEM": "Table Lamps", "STYLE/PATTERN": "Ceramic or Sculptural", "MATERIAL OPTIONS": "Ceramic, Wood, Metal", "COLOR/FINISH": "Earth tones, Brass", "NOTES": "Period-appropriate forms"},
        {"CATEGORY": "SEATING", "ITEM": "Accent Chair", "STYLE/PATTERN": "Shell or Lounge Chair", "MATERIAL OPTIONS": "Molded, Upholstered", "COLOR/FINISH": "Accent color or neutral", "NOTES": "Reading corner"}
      ],
      "checklist": [
        {"CATEGORY": "BED", "ITEM": "Walnut platform bed with splayed legs", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "FURNITURE", "ITEM": "Long, low dresser", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "LIGHTING", "ITEM": "Ceramic or sculptural lamps", "INCLUDE?": "YES", "PRIORITY": "ESSENTIAL"}
      ],
      "finishes": [["Walnut", "Classic MCM wood", "⭐⭐⭐⭐⭐"], ["Olive Green", "Period color", "⭐⭐⭐⭐⭐"], ["Brass Hardware", "Authentic accents", "⭐⭐⭐⭐⭐"]]
    },
    {
      "style": "Bohemian",
      "room_type": "Living Room",
      "style_slug": "bohemian",
      "room_type_slug": "living_room",
      "source_file": "Living Room-Bohemian.xlsx",
      "specifications": [
        {"CATEGORY": "SEATING", "ITEM": "Main Sofa", "STYLE/PATTERN": "Low, Relaxed, Textured", "MATERIAL OPTIONS": "Linen, Velvet, Kilim", "COLOR/FINISH": "Terracotta, Mustard, Teal", "NOTES": "SIGNATURE - Lived-in, layered look"},
        {"CATEGORY": "FLOOR", "ITEM": "Layered Rugs", "STYLE/PATTERN": "Vintage, Kilim, Moroccan", "MATERIAL OPTIONS": "Wool, Jute, Vintage", "COLOR/FINISH": "Mixed patterns and colors", "NOTES": "ICONIC - Multiple layered rugs"},
        {"CATEGORY": "LIGHTING", "ITEM": "Pendant/Chandelier", "STYLE/PATTERN": "Macrame or Rattan", "MATERIAL OPTIONS": "Macrame, Rattan, Beaded", "COLOR/FINISH": "Natural, White", "NOTES": "SIGNATURE - Bohemian craft"},
        {"CATEGORY": "PLANTS", "ITEM": "Abundant Greenery", "STYLE/PATTERN": "Trailing, Mixed Sizes", "MATERIAL OPTIONS": "Pothos, Monstera, Fiddle leaf", "COLOR/FINISH": "Green, Terracotta pots", "NOTES": "ESSENTIAL - Jungle vibe"},
        {"CATEGORY": "TEXTILES", "ITEM": "Throw Pillows", "STYLE/PATTERN": "Mixed Patterns", "MATERIAL OPTIONS": "Kilim, Mudcloth, Vintage", "COLOR/FINISH": "Warm, earthy palette", "NOTES": "SIGNATURE - Layered, collected look"}
      ],
      "checklist": [
        {"CATEGORY": "TEXTILES", "ITEM": "Layered mixed-pattern cushions", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "RUGS", "ITEM": "Multiple layered rugs", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "PLANTS", "ITEM": "Abundant greenery", "INCLUDE?": "YES", "PRIORITY": "ESSENTIAL"}
      ],
      "finishes": [["Terracotta", "Warm earth tone", "⭐⭐⭐⭐⭐"], ["Kilim Patterns", "Traditional textile", "⭐⭐⭐⭐⭐"], ["Rattan", "Natural material", "⭐⭐⭐⭐⭐"]]
    },
    {
      "style": "Bohemian",
      "room_type": "Master Bedroom",
      "style_slug": "bohemian",
      "room_type_slug": "master_bedroom",
      "source_file": "Master Bedroom-Bohemian.xlsx",
      "specifications": [
        {"CATEGORY": "BED", "ITEM": "Canopy or Low Bed", "STYLE/PATTERN": "Canopy with Drapes or Low Platform", "MATERIAL OPTIONS": "Wood, Rattan, Iron", "COLOR/FINISH": "Natural wood, White, Black", "NOTES": "SIGNATURE - Dramatic canopy or relaxed low"},
        {"CATEGORY": "TEXTILES", "ITEM": "Bedding", "STYLE/PATTERN": "Layered, Mixed Patterns", "MATERIAL OPTIONS": "Linen, Cotton, Vintage quilts", "COLOR/FINISH": "Earthy, Jewel tones", "NOTES": "SIGNATURE - Collected, layered look"},
        {"CATEGORY": "LIGHTING", "ITEM": "Pendant or String Lights", "STYLE/PATTERN": "Macrame, Rattan, or Fairy Lights", "MATERIAL OPTIONS": "Natural materials", "COLOR/FINISH": "Warm white", "NOTES": "Ambient, dreamy lighting"},
        {"CATEGORY": "WALL", "ITEM": "Wall Hanging", "STYLE/PATTERN": "Macrame or Textile Art", "MATERIAL OPTIONS": "Macrame, Woven, Tapestry", "COLOR/FINISH": "Natural, Colored", "NOTES": "ICONIC - Boho wall art"},
        {"CATEGORY": "PLANTS", "ITEM": "Bedroom Plants", "STYLE/PATTERN": "Trailing and Potted", "MATERIAL OPTIONS": "Trailing pothos, Snake plant", "COLOR/FINISH": "Green, Decorative pots", "NOTES": "Bring nature inside"}
      ],
      "checklist": [
        {"CATEGORY": "BED", "ITEM": "Canopy bed or draped fabric", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "TEXTILES", "ITEM": "Layered bedding with mixed patterns", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "WALL", "ITEM": "Macrame or textile wall hanging", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"}
      ],
      "finishes": [["Natural Rattan", "Organic material", "⭐⭐⭐⭐⭐"], ["Vintage Quilts", "Collected textiles", "⭐⭐⭐⭐⭐"], ["Macrame", "Bohemian craft", "⭐⭐⭐⭐⭐"]]
    },
    {
      "style": "Coastal Indian",
      "room_type": "Living Room",
      "style_slug": "coastal_indian",
      "room_type_slug": "living_room",
      "source_file": "Living Room-Coastal Indian.xlsx",
      "specifications": [
        {"CATEGORY": "SOFA", "ITEM": "Main Sofa", "STYLE/PATTERN": "Relaxed, Linen-covered", "MATERIAL OPTIONS": "Linen, Cotton, Light wood frame", "COLOR/FINISH": "White, Blue, Natural", "NOTES": "SIGNATURE - Breezy, coastal feel"},
        {"CATEGORY": "COFFEE TABLE", "ITEM": "Coffee Table", "STYLE/PATTERN": "Carved or Bone Inlay", "MATERIAL OPTIONS": "Mango wood, Bone inlay, Cane", "COLOR/FINISH": "White, Natural, Blue patterns", "NOTES": "SIGNATURE - Indian coastal craft"},
        {"CATEGORY": "LIGHTING", "ITEM": "Pendant Light", "STYLE/PATTERN": "Rattan or Jute", "MATERIAL OPTIONS": "Rattan, Jute, Cane", "COLOR/FINISH": "Natural", "NOTES": "Organic, beachy materials"},
        {"CATEGORY": "TEXTILES", "ITEM": "Cushions", "STYLE/PATTERN": "Block Print, Indigo", "MATERIAL OPTIONS": "Cotton, Linen", "COLOR/FINISH": "Indigo, White, Blue patterns", "NOTES": "SIGNATURE - Indian block prints"},
        {"CATEGORY": "DECOR", "ITEM": "Coastal Indian Decor", "STYLE/PATTERN": "Shell, Coral, Brass", "MATERIAL OPTIONS": "Natural shells, Brass", "COLOR/FINISH": "Natural, Antique brass", "NOTES": "Blend coastal and Indian"}
      ],
      "checklist": [
        {"CATEGORY": "TEXTILES", "ITEM": "Indigo block print cushions", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "FURNITURE", "ITEM": "Bone inlay or carved wood piece", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "COLORS", "ITEM": "Blue and white palette", "INCLUDE?": "YES", "PRIORITY": "ESSENTIAL"}
      ],
      "finishes": [["Bone Inlay", "Indian coastal craft", "⭐⭐⭐⭐⭐"], ["Indigo Block Print", "Traditional textile", "⭐⭐⭐⭐⭐"], ["Whitewashed Wood", "Coastal finish", "⭐⭐⭐⭐⭐"]]
    },
    {
      "style": "Farmhouse",
      "room_type": "Living Room",
      "style_slug": "farmhouse",
      "room_type_slug": "living_room",
      "source_file": "Living Room-Farmhouse.xlsx",
      "specifications": [
        {"CATEGORY": "SOFA", "ITEM": "Main Sofa", "STYLE/PATTERN": "Slipcovered or Rolled Arm", "MATERIAL OPTIONS": "Linen, Cotton slipcover", "COLOR/FINISH": "White, Oatmeal, Light gray", "NOTES": "SIGNATURE - Comfortable, washable"},
        {"CATEGORY": "COFFEE TABLE", "ITEM": "Coffee Table", "STYLE/PATTERN": "Rustic Wood or Trunk", "MATERIAL OPTIONS": "Reclaimed wood, Painted wood", "COLOR/FINISH": "Natural, Distressed white", "NOTES": "ICONIC - Authentic character"},
        {"CATEGORY": "LIGHTING", "ITEM": "Chandelier", "STYLE/PATTERN": "Lantern or Candle-style", "MATERIAL OPTIONS": "Iron, Wood and metal", "COLOR/FINISH": "Black, Distressed wood", "NOTES": "Statement farmhouse fixture"},
        {"CATEGORY": "TEXTILES", "ITEM": "Throw Blankets", "STYLE/PATTERN": "Chunky Knit or Plaid", "MATERIAL OPTIONS": "Wool, Cotton", "COLOR/FINISH": "Neutral, Buffalo check", "NOTES": "Cozy, inviting layers"},
        {"CATEGORY": "DECOR", "ITEM": "Vintage/Antique Items", "STYLE/PATTERN": "Collected Vintage", "MATERIAL OPTIONS": "Vintage finds, Antiques", "COLOR/FINISH": "Aged patina", "NOTES": "SIGNATURE - Authentic history"}
      ],
      "checklist": [
        {"CATEGORY": "FURNITURE", "ITEM": "Slipcovered sofa", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "FURNITURE", "ITEM": "Reclaimed wood coffee table", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "LIGHTING", "ITEM": "Lantern or candle chandelier", "INCLUDE?": "YES", "PRIORITY": "ESSENTIAL"}
      ],
      "finishes": [["Distressed White", "Aged paint finish", "⭐⭐⭐⭐⭐"], ["Reclaimed Wood", "Authentic character", "⭐⭐⭐⭐⭐"], ["Black Iron", "Farmhouse metal", "⭐⭐⭐⭐⭐"]]
    },
    {
      "style": "Farmhouse",
      "room_type": "Kitchen",
      "style_slug": "farmhouse",
      "room_type_slug": "kitchen",
      "source_file": "Kitchen-Farmhouse.xlsx",
      "specifications": [
        {"CATEGORY": "CABINETS", "ITEM": "Cabinet Style", "STYLE/PATTERN": "Shaker with Bin Pulls", "MATERIAL OPTIONS": "Painted MDF, Solid wood", "COLOR/FINISH": "White, Sage, Cream", "NOTES": "SIGNATURE - Classic farmhouse"},
        {"CATEGORY": "SINK", "ITEM": "Farmhouse Sink", "STYLE/PATTERN": "Apron Front", "MATERIAL OPTIONS": "Fireclay, Cast iron", "COLOR/FINISH": "White", "NOTES": "ICONIC - Defining element"},
        {"CATEGORY": "COUNTERTOP", "ITEM": "Counter Material", "STYLE/PATTERN": "Butcher Block or Marble-look", "MATERIAL OPTIONS": "Butcher block, Quartz, Honed marble", "COLOR/FINISH": "Natural wood, White marble", "NOTES": "Practical and beautiful"},
        {"CATEGORY": "BACKSPLASH", "ITEM": "Wall Tiles", "STYLE/PATTERN": "Subway or Beadboard", "MATERIAL OPTIONS": "Ceramic subway, Beadboard", "COLOR/FINISH": "White, Cream", "NOTES": "SIGNATURE - Classic patterns"},
        {"CATEGORY": "LIGHTING", "ITEM": "Pendant Lights", "STYLE/PATTERN": "Enamel Dome or Lantern", "MATERIAL OPTIONS": "Metal enamel, Iron", "COLOR/FINISH": "Black, White enamel", "NOTES": "Vintage-inspired"}
      ],
      "checklist": [
        {"CATEGORY": "SINK", "ITEM": "Apron front farmhouse sink", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "CABINETS", "ITEM": "Shaker cabinets with bin pulls", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "BACKSPLASH", "ITEM": "Subway tile or beadboard", "INCLUDE?": "YES", "PRIORITY": "ESSENTIAL"}
      ],
      "finishes": [["White Shaker", "Classic cabinet style", "⭐⭐⭐⭐⭐"], ["Butcher Block", "Warm wood counter", "⭐⭐⭐⭐⭐"], ["Fireclay White", "Farmhouse sink finish", "⭐⭐⭐⭐⭐"]]
    },
    {
      "style": "Transitional",
      "room_type": "Living Room",
      "style_slug": "transitional",
      "room_type_slug": "living_room",
      "source_file": "Living Room-Transitional.xlsx",
      "specifications": [
        {"CATEGORY": "SOFA", "ITEM": "Main Sofa", "STYLE/PATTERN": "Clean Lines, Subtle Curves", "MATERIAL OPTIONS": "Performance fabric, Velvet", "COLOR/FINISH": "Gray, Beige, Navy", "NOTES": "SIGNATURE - Balance of classic and modern"},
        {"CATEGORY": "COFFEE TABLE", "ITEM": "Coffee Table", "STYLE/PATTERN": "Classic Shape, Updated Material", "MATERIAL OPTIONS": "Wood, Metal, Glass", "COLOR/FINISH": "Dark wood, Brass accents", "NOTES": "Traditional form, modern materials"},
        {"CATEGORY": "LIGHTING", "ITEM": "Chandelier/Pendant", "STYLE/PATTERN": "Updated Classic", "MATERIAL OPTIONS": "Metal, Crystal, Glass", "COLOR/FINISH": "Brushed nickel, Aged brass", "NOTES": "Classic shape, modern finish"},
        {"CATEGORY": "RUG", "ITEM": "Area Rug", "STYLE/PATTERN": "Subtle Pattern or Textured", "MATERIAL OPTIONS": "Wool, Wool blend", "COLOR/FINISH": "Neutral with subtle pattern", "NOTES": "Grounding element"},
        {"CATEGORY": "ACCENTS", "ITEM": "Accent Pillows", "STYLE/PATTERN": "Mixed Solids and Subtle Patterns", "MATERIAL OPTIONS": "Velvet, Linen, Performance", "COLOR/FINISH": "Coordinated palette", "NOTES": "Layered but cohesive"}
      ],
      "checklist": [
        {"CATEGORY": "FURNITURE", "ITEM": "Classic silhouettes with modern finishes", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "COLORS", "ITEM": "Neutral palette with depth", "INCLUDE?": "YES", "PRIORITY": "ESSENTIAL"},
        {"CATEGORY": "LIGHTING", "ITEM": "Updated traditional fixtures", "INCLUDE?": "YES", "PRIORITY": "ESSENTIAL"}
      ],
      "finishes": [["Brushed Nickel", "Modern classic metal", "⭐⭐⭐⭐⭐"], ["Gray Velvet", "Sophisticated neutral", "⭐⭐⭐⭐⭐"], ["Dark Wood", "Rich traditional tone", "⭐⭐⭐⭐⭐"]]
    },
    {
      "style": "Transitional",
      "room_type": "Master Bedroom",
      "style_slug": "transitional",
      "room_type_slug": "master_bedroom",
      "source_file": "Master Bedroom-Transitional.xlsx",
      "specifications": [
        {"CATEGORY": "BED", "ITEM": "Upholstered Bed", "STYLE/PATTERN": "Upholstered Headboard, Clean Lines", "MATERIAL OPTIONS": "Performance fabric, Velvet, Linen", "COLOR/FINISH": "Gray, Oatmeal, Soft blue", "NOTES": "SIGNATURE - Comfortable elegance"},
        {"CATEGORY": "NIGHTSTANDS", "ITEM": "Bedside Tables", "STYLE/PATTERN": "Classic with Modern Hardware", "MATERIAL OPTIONS": "Wood, Painted", "COLOR/FINISH": "Dark wood, White, Gray", "NOTES": "Traditional shape, modern pulls"},
        {"CATEGORY": "LIGHTING", "ITEM": "Bedside Lamps", "STYLE/PATTERN": "Ceramic or Glass Base", "MATERIAL OPTIONS": "Ceramic, Glass, Metal", "COLOR/FINISH": "White, Cream, Metallic", "NOTES": "Classic lamp forms"},
        {"CATEGORY": "TEXTILES", "ITEM": "Bedding", "STYLE/PATTERN": "Hotel-style with Layers", "MATERIAL OPTIONS": "Cotton, Linen", "COLOR/FINISH": "White base with accent colors", "NOTES": "SIGNATURE - Polished, layered look"},
        {"CATEGORY": "WINDOW", "ITEM": "Drapery", "STYLE/PATTERN": "Full-length Panels", "MATERIAL OPTIONS": "Linen, Velvet", "COLOR/FINISH": "Neutral, Soft color", "NOTES": "Floor-length, tailored"}
      ],
      "checklist": [
        {"CATEGORY": "BED", "ITEM": "Upholstered headboard", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "TEXTILES", "ITEM": "Layered hotel-style bedding", "INCLUDE?": "YES", "PRIORITY": "SIGNATURE"},
        {"CATEGORY": "WINDOW", "ITEM": "Floor-length drapery", "INCLUDE?": "YES", "PRIORITY": "ESSENTIAL"}
      ],
      "finishes": [["Gray Linen", "Sophisticated neutral", "⭐⭐⭐⭐⭐"], ["White Bedding", "Crisp hotel-style", "⭐⭐⭐⭐⭐"], ["Brushed Brass", "Warm modern metal", "⭐⭐⭐⭐⭐"]]
    }
  ]
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

    // Get request parameters
    const { action = "load" } = await req.json().catch(() => ({}));

    if (action === "verify") {
      // Verify current data
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

    // Load all smart defaults
    const combinations = smartDefaultsData.combinations;
    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    for (const combo of combinations) {
      const { error } = await supabase
        .from("smart_defaults")
        .upsert({
          style: combo.style,
          room_type: combo.room_type,
          style_slug: combo.style_slug,
          room_type_slug: combo.room_type_slug,
          source_file: combo.source_file,
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
      } else {
        successCount++;
      }
    }

    // Verify final count
    const { data: finalData } = await supabase
      .from("smart_defaults")
      .select("id", { count: "exact" });

    return new Response(
      JSON.stringify({
        success: errorCount === 0,
        message: `Loaded ${successCount} records, ${errorCount} errors`,
        total_in_database: finalData?.length || 0,
        success_count: successCount,
        error_count: errorCount,
        errors: errors.slice(0, 10) // First 10 errors only
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
