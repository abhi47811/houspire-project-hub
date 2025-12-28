/**
 * ============================================================================
 * HOUSPIRE AI KNOWLEDGE BASE - Consolidated Prompt Templates
 * ============================================================================
 * Extracted from 180KB+ knowledge base for hyper-realistic renders (85-95%)
 * Modules: Materials, Lighting, Preservation, Styles, Quality Control
 * ============================================================================
 */

// ============================================================================
// STYLE-SPECIFIC GENERATION RULES (Module 4)
// ============================================================================

export const STYLE_PROMPTS: Record<string, {
  philosophy: string;
  mandatory: string[];
  colorPalette: { base: string; secondary: string; accent: string };
  materials: string[];
  forbidden: string[];
  promptTemplate: string;
}> = {
  "Modern Indian": {
    philosophy: "85% Global Contemporary + 15% Indian Cultural Soul",
    mandatory: [
      "BLDC Ceiling Fan (contemporary design, 48-52\" blades)",
      "Handloom Textiles (block print OR ikat, NOT both)",
      "Brass/Copper Accents (aged patina, NOT shiny)",
      "Natural Indian Materials (sheesham wood, terracotta planters)"
    ],
    colorPalette: {
      base: "Warm White (#FAF6F0), Beige (#E8DFD0), Soft Gray (#D3D0CB)",
      secondary: "Teal (#008080), Ochre (#CC7722), Deep Maroon (#800000)",
      accent: "Brass (#D4AF37), Burnt Orange (#FF6600)"
    },
    materials: [
      "Sheesham wood with visible grain, matte oil finish",
      "Linen with block print patterns",
      "Brushed brass with aged patina",
      "Hand-woven dhurrie, geometric patterns"
    ],
    forbidden: ["Temple bells", "excessive gold", "Bollywood kitsch", "generic ethnic patterns", "color overload"],
    promptTemplate: "Modern Indian interior, 85% contemporary design with 15% authentic Indian cultural elements, clean-lined furniture with sheesham wood visible grain matte finish, linen upholstery with subtle block print patterns (not excessive), brushed brass accents with aged patina, contemporary BLDC ceiling fan (48-52\" blades) mounted center ceiling, hand-woven dhurrie rug with geometric pattern, terracotta planters with Indian plants, warm white walls (#FAF6F0), teal and ochre accent colors used sparingly, sophisticated restraint, photorealistic materials, magazine quality"
  },
  "Traditional Indian": {
    philosophy: "Timeless Heritage - Rich Cultural Legacy",
    mandatory: [
      "Ornate Ceiling Fan (carved wood or brass blades)",
      "Heavy Carved Wood (teak or rosewood, intricate details)",
      "Silk/Brocade Textiles (rich colors, embroidery)",
      "Brass Artifacts (diyas, urlis, traditional items)"
    ],
    colorPalette: {
      base: "Cream (#F5F0E6), Warm Beige (#E8DFD0)",
      secondary: "Deep Maroon (#800000), Emerald (#228B22), Royal Blue (#002366)",
      accent: "Gold (#FFD700), Rich Orange (#FF6600)"
    },
    materials: [
      "Teak/rosewood with heavy carving, dark stain",
      "Silk, brocade, heavy embroidered fabrics",
      "Brass with ornate work",
      "Marble inlay work"
    ],
    forbidden: ["Modern minimalist elements", "plastic materials", "plain fabrics"],
    promptTemplate: "Traditional Indian interior, heavily carved teak wood furniture with intricate traditional motifs, silk and brocade upholstery in deep maroon and emerald, ornate brass ceiling fan with carved blades, brass diyas and traditional artifacts, hand-knotted carpet with Persian patterns, marble accents, rich jewel tone colors, formal symmetrical arrangement, ornate details throughout, cultural authenticity, photorealistic carved wood grain, magazine quality"
  },
  "Scandinavian": {
    philosophy: "Light, Functional, Hygge Comfort",
    mandatory: [
      "Ceiling Fan (contemporary white/wood, clean design)",
      "Light Wood Tones (oak, birch, ash - natural finish)",
      "White/Cream Base (bright, airy)",
      "Natural Textiles (linen, wool, cotton)"
    ],
    colorPalette: {
      base: "White (#FFFFFF), Warm White (#FAF6F0), Cream (#F5F0E6)",
      secondary: "Light Oak (#D4B896), Soft Gray (#D5D0C8)",
      accent: "Muted Green (#9CAF88), Dusty Blue (#B8C4CE)"
    },
    materials: [
      "Light oak/birch with natural grain visible",
      "Natural linen with visible weave",
      "Minimal metal (brushed steel if used)",
      "Natural fiber rugs (jute, wool)"
    ],
    forbidden: ["Dark heavy woods", "ornate details", "clutter"],
    promptTemplate: "Scandinavian interior, light and airy with hygge coziness, white walls (#FFFFFF) with warm undertones, light oak furniture with natural wood grain visible, clean simple lines with tapered legs, linen fabric with natural weave texture, contemporary white ceiling fan, minimal clutter with curated items, natural light maximized, jute or wool rug, soft textiles (throw blankets), plants in simple pots, functional elegance, photorealistic light wood grain, magazine quality"
  },
  "Industrial": {
    philosophy: "Raw Urban Warehouse Aesthetic",
    mandatory: [
      "Ceiling Fan (black metal industrial design)",
      "Exposed Elements (brick, concrete, pipes if architectural)",
      "Metal Furniture Frames (steel, iron, aged metal)",
      "Reclaimed/Distressed Wood"
    ],
    colorPalette: {
      base: "Concrete Gray (#A0A0A0), Charcoal (#36454F), Black (#1C1C1C)",
      secondary: "Weathered Wood (#8B7355), Rust (#A0522D)",
      accent: "Copper (#CD7F32), Edison Bulb Glow (#FFD700)"
    },
    materials: [
      "Aged steel, wrought iron, visible welds",
      "Reclaimed wood with weathered texture",
      "Concrete/Brick exposed",
      "Distressed leather, worn"
    ],
    forbidden: ["Delicate fabrics", "ornate decorations", "pastel colors"],
    promptTemplate: "Industrial interior, raw urban warehouse aesthetic, exposed brick or concrete walls, aged steel furniture frames with reclaimed wood tops, weathered wood texture with distressed finish, black metal ceiling fan industrial design, Edison bulb pendant lights, leather seating with worn patina, metal pipe shelving, concrete gray color scheme, rugged masculine atmosphere, visible welds and rivets, utilitarian function, photorealistic aged metal and distressed wood, magazine quality"
  },
  "Bohemian": {
    philosophy: "Eclectic Free-Spirited Global Mix",
    mandatory: [
      "Ceiling Fan (decorative rattan or colorful blades)",
      "Layered Textiles (rugs on rugs, multiple patterns)",
      "Global Artifacts (Moroccan, Turkish, Indian mix)",
      "Abundant Plants (jungle vibe)"
    ],
    colorPalette: {
      base: "Warm Neutrals (#E8DFD0), Terracotta (#E07B53)",
      secondary: "Rich Mix (Teal #008080, Burgundy #800020, Mustard #FFDB58)",
      accent: "Vibrant Pops (multiple colors, no rules)"
    },
    materials: [
      "Rattan, macramé, vintage wood",
      "Kilim rugs, embroidered pillows, woven",
      "No uniformity (intentional eclectic)"
    ],
    forbidden: ["Matching furniture sets", "minimal design", "monochrome schemes"],
    promptTemplate: "Bohemian interior, eclectic free-spirited global mix, layered textiles with multiple patterns (kilim rug, embroidered cushions, macramé), rattan furniture and peacock chair, Moroccan pouf with colorful stitching, abundant plants creating jungle vibe, vintage decorative items, warm terracotta and teal color mix, decorative ceiling fan with carved wood or colorful blades, artistic handcrafted feel, no matching sets, maximalist layering, photorealistic woven textures, magazine quality"
  },
  "Japandi": {
    philosophy: "Japanese Zen + Scandinavian Minimalism",
    mandatory: [
      "Ceiling Fan (minimal white/wood, ultra-clean design)",
      "Extreme Minimalism (only essentials)",
      "Low-Profile Furniture (Japanese influence)",
      "Natural Materials (wood, linen, ceramics)"
    ],
    colorPalette: {
      base: "Warm White (#FAF6F0), Beige (#E8DFD0), Light Oak (#D4B896)",
      secondary: "Charcoal (#36454F), Black (#1C1C1C)",
      accent: "Natural Green (plants only)"
    },
    materials: [
      "Light natural finish (ash, oak)",
      "Natural linen, undyed",
      "Wabi-sabi imperfect pottery",
      "Minimal metal (matte black if used)"
    ],
    forbidden: ["Bright colors", "patterns", "clutter of any kind"],
    promptTemplate: "Japandi interior, extreme minimalism with warm functionality, low-profile furniture close to ground, light natural wood (ash/oak) with visible grain, natural linen textiles in warm neutrals, minimal contemporary ceiling fan (white), wabi-sabi ceramic pieces with natural imperfections, platform elements, clean lines with no ornamentation, maximum negative space (70% empty surfaces), natural materials only, zen calm atmosphere, photorealistic natural wood and linen textures, magazine quality"
  },
  "Mid-Century Modern": {
    philosophy: "1950s-60s Retro Organic Forms",
    mandatory: [
      "Ceiling Fan (retro atomic-age design or wood blades)",
      "Tapered Legs (signature on all furniture)",
      "Organic Curves (inspired by nature)",
      "Retro Color Pops (mustard, teal, orange)"
    ],
    colorPalette: {
      base: "Walnut Wood (#5C4033), Warm White (#FAF6F0)",
      secondary: "Teak Tone (#CD853F), Olive (#808000)",
      accent: "Mustard (#FFDB58), Teal (#008080), Burnt Orange (#CC5500)"
    },
    materials: [
      "Teak, walnut (mid-tone stains)",
      "Vinyl, textured fabrics",
      "Brass hairpin legs",
      "Molded plastic/fiberglass"
    ],
    forbidden: ["Heavy ornate furniture", "rustic distressing", "ultra-modern minimalism"],
    promptTemplate: "Mid-Century Modern interior, 1950s-60s retro aesthetic, furniture with signature tapered angled legs, organic sculptural forms, teak and walnut wood tones with natural grain, retro ceiling fan with atomic-age design, mustard yellow and teal accent colors, iconic lounge chair, geometric patterns, starburst clock, brass accents, vintage mid-century vibe, photorealistic teak wood grain and period-appropriate materials, magazine quality"
  },
  "Coastal Indian": {
    philosophy: "Beach-Inspired Relaxed Elegance with Indian Soul",
    mandatory: [
      "Ceiling Fan (white or weathered wood blades)",
      "Light Airy Palette (whites, blues, sand tones)",
      "Natural Textures (jute, rattan, linen, driftwood)",
      "Subtle Indian coastal touches (Goan/Kerala influence)"
    ],
    colorPalette: {
      base: "White (#FFFFFF), Cream (#F5F0E6), Sand (#E8DFD0)",
      secondary: "Soft Blue (#B8C4CE), Seafoam (#D1E0D7)",
      accent: "Navy (#1F3A5F), Coral (#FF6F61)"
    },
    materials: [
      "Whitewashed wood, driftwood, weathered",
      "Linen, cotton, natural weaves",
      "Jute, rattan, rope",
      "Minimal glass and simple metal"
    ],
    forbidden: ["Anchor overload", "heavy dark furniture", "excessive nautical clichés"],
    promptTemplate: "Coastal Indian interior, beach-inspired relaxed elegance with subtle Goan/Kerala influence, white and cream color palette with soft blue accents, slipcovered linen sofa (white) with natural wrinkles, rattan furniture with weathered texture, whitewashed wood accents, jute area rug with natural fiber texture, white ceiling fan with weathered wood blades, sheer linen curtains, subtle coastal touches, driftwood decorative elements, light and airy atmosphere, photorealistic linen weave and weathered wood, magazine quality"
  },
  "Farmhouse": {
    philosophy: "Countryside Charm with Handcrafted Appeal",
    mandatory: [
      "Ceiling Fan (barn-style or wrought iron)",
      "Reclaimed Wood (weathered, distressed)",
      "Natural Materials (stone, wood, wrought iron)",
      "Handcrafted Elements (artisan pieces)"
    ],
    colorPalette: {
      base: "Cream (#F5F0E6), Warm Beige (#E8DFD0), Natural Wood (#8B7355)",
      secondary: "Barn Red (#A0522D), Sage Green (#9CAF88)",
      accent: "Black Iron (#1C1C1C), Copper (#CD7F32)"
    },
    materials: [
      "Heavily distressed, weathered wood, chunky",
      "Wrought iron, aged",
      "Heavy cotton, wool, burlap",
      "Natural stone, rustic"
    ],
    forbidden: ["Sleek modern furniture", "glossy finishes", "plastic materials"],
    promptTemplate: "Rustic-Farmhouse interior, countryside charm with handcrafted appeal, reclaimed weathered wood with heavy distressed finish, chunky farmhouse dining table, wrought iron accents and hardware, barn-style ceiling fan with aged metal, natural stone elements, warm cream walls with wood shiplap accent, handwoven textiles, copper and iron fixtures, authentic vintage character, rustic cozy atmosphere, photorealistic distressed wood texture and wrought iron, magazine quality"
  },
  "Art Deco": {
    philosophy: "1920s Glamour with Bold Geometry",
    mandatory: [
      "Ceiling Fan (geometric tiered design, metallic finish)",
      "Geometric Patterns (chevron, sunburst, zigzag)",
      "Luxe Materials (velvet, lacquer, brass, mirror)",
      "High Contrast (black + gold signature)"
    ],
    colorPalette: {
      base: "Black (#1C1C1C), Cream (#F5F0E6)",
      secondary: "Navy (#1F3A5F), Emerald (#228B22)",
      accent: "Gold (#FFD700), Brass (#B8860B)"
    },
    materials: [
      "Velvet with pile texture",
      "Lacquered high-gloss",
      "Polished brass, chrome",
      "Mirrored glass, geometric"
    ],
    forbidden: ["Rustic elements", "matte finishes", "casual fabrics"],
    promptTemplate: "Art Deco interior, 1920s glamour with bold geometry, geometric patterns (chevron, sunburst), velvet upholstery (navy/emerald) with visible pile texture, lacquered high-gloss surfaces, polished brass accents, mirrored decorative elements, geometric tiered ceiling fan with metallic finish, black and gold color scheme, symmetrical formal arrangement, luxurious theatrical atmosphere, sunburst wall art, high contrast dramatic lighting, photorealistic velvet pile and lacquered finish, magazine quality"
  },
  "Contemporary": {
    philosophy: "Current Design Trends with Clean Sophistication",
    mandatory: [
      "Ceiling Fan (sleek modern design, minimal)",
      "Clean Lines (geometric shapes)",
      "Mixed Materials (metal, glass, wood)",
      "Neutral Base with Bold Accents"
    ],
    colorPalette: {
      base: "White (#FFFFFF), Gray (#808080), Charcoal (#36454F)",
      secondary: "Black (#1C1C1C), Warm Wood (#8B7355)",
      accent: "Bold color pop (your choice)"
    },
    materials: [
      "Mixed metals (chrome, brushed steel)",
      "Glass and acrylic",
      "Smooth wood finishes",
      "Performance fabrics"
    ],
    forbidden: ["Ornate traditional details", "heavy textures", "dated styles"],
    promptTemplate: "Contemporary interior, current design with clean sophistication, geometric clean lines, mixed materials (metal, glass, wood), neutral color palette with strategic bold accent, sleek modern ceiling fan, minimal ornamentation, open airy feel, curated accessories, high-quality materials, photorealistic finishes, magazine quality"
  },
  "Minimalist": {
    philosophy: "Less is More - Essential Beauty",
    mandatory: [
      "Ceiling Fan (ultra-minimal, white or black)",
      "Only Essential Items (nothing decorative)",
      "Maximum Negative Space",
      "Monochromatic Palette"
    ],
    colorPalette: {
      base: "White (#FFFFFF), Light Gray (#D3D3D3)",
      secondary: "Charcoal (#36454F), Black (#1C1C1C)",
      accent: "None or single subtle accent"
    },
    materials: [
      "Smooth matte surfaces",
      "Hidden storage",
      "Clean-lined furniture",
      "Natural materials in simple forms"
    ],
    forbidden: ["Decorative items", "patterns", "multiple colors", "clutter"],
    promptTemplate: "Minimalist interior, less is more philosophy, only essential furniture, maximum negative space (80%+ empty), monochromatic white and gray palette, ultra-minimal ceiling fan (white), clean lines throughout, hidden storage, no decorative items, zen simplicity, high-quality essential pieces, photorealistic clean surfaces, magazine quality"
  },
  "Transitional": {
    philosophy: "Balanced Classic + Contemporary Blend",
    mandatory: [
      "Ceiling Fan (updated classic design, neutral)",
      "Balanced Proportions (not too modern, not too traditional)",
      "Sophisticated Neutrals (layered tones)",
      "Quality Materials (premium finishes)"
    ],
    colorPalette: {
      base: "Greige (#D2C4B0), Taupe (#C2B9A7), Soft White (#FAF6F0)",
      secondary: "Warm Gray (#8B7355), Charcoal (#36454F)",
      accent: "Muted Blue (#6699CC), Sage (#9CAF88)"
    },
    materials: [
      "Mixed wood tones (light to medium)",
      "Linen, quality cottons, subtle patterns",
      "Brushed nickel, aged brass",
      "Mix of traditional and modern"
    ],
    forbidden: ["Extreme modern or traditional", "trendy elements", "harsh contrasts"],
    promptTemplate: "Transitional interior, balanced blend of classic and contemporary, sophisticated neutral palette (greige, taupe, warm gray), clean-lined furniture with subtle traditional curves, quality linen upholstery, subtle tufting details, mixed wood tones (light and medium), updated classic ceiling fan design, timeless area rug with muted pattern, comfortable elegant atmosphere, layered neutral tones, quality premium materials, photorealistic linen texture and wood finishes, magazine quality"
  }
};

// ============================================================================
// ARCHITECTURAL PRESERVATION RULES (Module 3) - NON-NEGOTIABLE
// ============================================================================

export const PRESERVATION_RULES = `
## ARCHITECTURAL PRESERVATION PROTOCOL - NON-NEGOTIABLE

**Priority**: ABSOLUTE (Overrides ALL other considerations)
**Legal Requirement**: Modifying architecture = False advertising = Lawsuits

### WHAT MUST BE PRESERVED (100% LOCKED):

🚪 **DOORS** - ABSOLUTELY LOCKED:
- Position (must stay in exact location)
- Size (width and height locked)
- Style (panel design, frame, hardware)
- Color (unless repainting entire room)
- Quantity (cannot add or remove doors)
- Frame (trim, molding, threshold)

🪟 **WINDOWS** - ABSOLUTELY LOCKED:
- Position (exact location locked)
- Size (dimensions locked)
- Style (casement, sliding, bay, etc.)
- Frame (material, color, trim)
- Quantity (cannot add or remove)
- Panes (grid pattern if present)
- Sill (height, depth, material)

🧱 **WALLS** - ABSOLUTELY LOCKED:
- Position and angles
- Structural features (columns, beams)
- Ceiling height
- Room shape and dimensions
- Electrical outlets, switches (if visible)

### VERIFICATION BEFORE OUTPUT:
☑ All doors match original photo exactly?
☑ All windows preserved in position, size, style?
☑ Room structure unchanged?
☑ No furniture blocking architecture?
☑ Ceiling height maintained?

**IF ANY = NO → REJECT RENDER → REGENERATE**
`;

// ============================================================================
// MATERIAL PHYSICS (Module 1) - For Photorealism
// ============================================================================

export const MATERIAL_REQUIREMENTS = `
## PHOTOREALISTIC MATERIAL REQUIREMENTS

### WOOD MATERIALS:
- **Sheesham**: Base color #8B6914 to #5C4033, grain spacing 2-4mm, knots 8% coverage
- **Teak**: Golden tan #CD853F to reddish-brown #8B4513, straight grain, natural oils
- Roughness: 0.4-0.6 (matte to satin, never glossy)
- MUST have: Visible grain, micro-scratches, edge wear, dust in crevices

### FABRIC MATERIALS:
- Visible weave pattern (individual threads distinguishable)
- Natural wrinkles: 5-10 wrinkle lines on cushions
- Color variation: ±5% (natural textile variation)
- Roughness: 0.6-0.7

### METAL (BRASS/COPPER):
- Aged patina: NOT shiny new
- Fingerprints: 2-3 visible oil marks if touched areas
- Micro-scratches: Cross-directional fine lines
- Roughness: 0.3-0.5 (brushed, not mirror polished)

### IMPERFECTION MANDATES:
- NO perfectly smooth surfaces
- Every material needs micro-imperfections
- Dust, scratches, wear marks required for realism
`;

// ============================================================================
// LIGHTING BEHAVIOR (Module 2)
// ============================================================================

export const LIGHTING_REQUIREMENTS = `
## LIGHTING BEHAVIOR REQUIREMENTS

### NATURAL LIGHT:
- Shadow direction MUST match light source
- Window light creates rectangular patterns on floor
- Intensity halves every 6-8 feet from window
- Color temperature: Morning=cool(6000K), Afternoon=warm(3500K)

### SHADOW RULES:
- Hard shadows for direct sunlight (2-5mm soft edge)
- Soft shadows for diffused/overcast light
- Ambient occlusion in corners and contact points (MANDATORY)
- Shadow density and direction must be consistent

### INDIAN CLIMATE LIGHTING:
- Harsh midday sun: Strong shadows, high contrast
- Monsoon lighting: Soft, diffused, gray-blue tint
- Golden hour: Warm orange glow, long shadows

### ATMOSPHERIC EFFECTS:
- Dust particles visible in light beams (subtle)
- Sense of depth (not flat 2D)
- Volumetric effects for direct sunlight
`;

// ============================================================================
// QUALITY SCORING (Module 7+9)
// ============================================================================

export const QUALITY_REQUIREMENTS = `
## 10-POINT QUALITY SCORING (Target: 8.5/10 = 85%)

### SCORING CRITERIA:

1. **MATERIAL REALISM (2 pts)**
   - Wood has visible grain texture ✓ 0.5
   - Fabric shows weave pattern ✓ 0.5
   - Metal has realistic reflectivity ✓ 0.5
   - Materials have imperfections ✓ 0.5

2. **LIGHTING CONSISTENCY (2 pts)**
   - Shadow direction matches light source ✓ 0.5
   - Shadow softness matches light quality ✓ 0.5
   - Color temperature consistent ✓ 0.5
   - Ambient occlusion present ✓ 0.5

3. **ARCHITECTURAL PRESERVATION (1 pt)**
   - ALL doors preserved ✓ 0.3
   - ALL windows preserved ✓ 0.3
   - Room structure unchanged ✓ 0.2
   - No furniture blocking ✓ 0.2
   **NON-NEGOTIABLE: Below 1.0 = AUTOMATIC REJECTION**

4. **PERSPECTIVE ACCURACY (2 pts)**
   - Furniture follows vanishing points ✓ 0.5
   - Scale appropriate to room ✓ 0.5
   - No floating objects ✓ 0.5
   - Shadows confirm floor contact ✓ 0.5

5. **TEXTURE DETAIL (1 pt)**
   - Close-up details sharp ✓ 0.3
   - Textures visible from distance ✓ 0.3
   - No blurry areas ✓ 0.2
   - Appropriate resolution ✓ 0.2

6. **ATMOSPHERIC DEPTH (1 pt)**
   - Sense of depth (not flat) ✓ 0.3
   - Subtle haze if needed ✓ 0.2
   - Volumetric effects ✓ 0.3
   - Not over-processed ✓ 0.2

7. **STYLE AUTHENTICITY (1 pt)**
   - Matches selected style ✓ 0.4
   - Color palette correct ✓ 0.3
   - Materials appropriate ✓ 0.3

### SCORE INTERPRETATION:
- 9.5-10.0 = MAGAZINE PREMIUM (95-100%)
- 8.5-9.4 = EXCELLENT - CLIENT READY (85-94%) ✓ TARGET
- 7.5-8.4 = NEEDS REFINEMENT
- Below 7.5 = REJECT AND REGENERATE
`;

// ============================================================================
// INDIAN MARKET REQUIREMENTS
// ============================================================================

export const INDIAN_REQUIREMENTS = `
## INDIAN MARKET REQUIREMENTS

### MANDATORY ELEMENTS (All rooms):
- Ceiling Fan: REQUIRED in all rooms (style-appropriate design)
- Proper ventilation consideration
- Climate-appropriate materials

### CITY-SPECIFIC CONSIDERATIONS:
- **Mumbai/Chennai**: Humidity-resistant materials, monsoon-proof
- **Delhi/Jaipur**: Dust consideration, temperature extremes
- **Bangalore**: Modern tech-hub aesthetic acceptable

### VASTU VISUAL COMPLIANCE (Optional but preferred):
- Balanced, harmonious layouts
- Natural elements incorporation
- Proper proportions and flow

### REGIONAL MATERIALS:
- Sheesham, Teak (authentic Indian woods)
- Brass, Copper with aged patina
- Terracotta, local pottery
- Handloom textiles, block prints
`;

// ============================================================================
// BUILD ENHANCED PROMPT WITH KNOWLEDGE BASE
// ============================================================================

export function buildEnhancedPrompt(params: {
  roomType: string;
  selectedStyle: string;
  smartDefaultData?: any;
  libraryImageData?: any;
  customRequirements?: string;
  city?: string;
  budgetTier?: string;
}): string {
  const {
    roomType,
    selectedStyle,
    smartDefaultData,
    libraryImageData,
    customRequirements,
    city,
    budgetTier
  } = params;

  // Get style-specific rules
  const styleRules = STYLE_PROMPTS[selectedStyle] || STYLE_PROMPTS["Contemporary"];
  
  let prompt = `# HYPER-REALISTIC INTERIOR STAGING GENERATION

## TARGET: 85-95% Magazine-Quality Photorealism

---

## PRIMARY REQUEST:
Create a stunning ${selectedStyle} style ${roomType}${city ? ` for a home in ${city}, India` : ''}.

---

## STYLE SPECIFICATION: ${selectedStyle}
**Philosophy**: ${styleRules.philosophy}

### Mandatory Elements:
${styleRules.mandatory.map(m => `- ${m}`).join('\n')}

### Color Palette:
- Base (60%): ${styleRules.colorPalette.base}
- Secondary (30%): ${styleRules.colorPalette.secondary}
- Accent (10%): ${styleRules.colorPalette.accent}

### Materials:
${styleRules.materials.map(m => `- ${m}`).join('\n')}

### FORBIDDEN (Do NOT include):
${styleRules.forbidden.map(f => `- ❌ ${f}`).join('\n')}

---

${PRESERVATION_RULES}

---

${MATERIAL_REQUIREMENTS}

---

${LIGHTING_REQUIREMENTS}
`;

  // Add smart defaults if available
  if (smartDefaultData) {
    prompt += `\n---\n\n## DESIGN SPECIFICATIONS FROM SMART DEFAULTS:\n`;
    
    if (smartDefaultData.specifications && Array.isArray(smartDefaultData.specifications)) {
      prompt += `\n### Furniture & Elements:\n`;
      for (const spec of smartDefaultData.specifications) {
        if (spec.CATEGORY && spec.ITEM) {
          prompt += `- **${spec.CATEGORY}**: ${spec.ITEM}`;
          if (spec['STYLE/PATTERN']) prompt += ` (${spec['STYLE/PATTERN']})`;
          if (spec['MATERIAL OPTIONS']) prompt += ` - ${spec['MATERIAL OPTIONS']}`;
          if (spec['COLOR/FINISH']) prompt += ` - ${spec['COLOR/FINISH']}`;
          prompt += '\n';
        }
      }
    }
    
    if (smartDefaultData.checklist && Array.isArray(smartDefaultData.checklist)) {
      const mustHaveItems = smartDefaultData.checklist.filter((c: any) => c['INCLUDE?'] === 'YES' || c['INCLUDE?'] === true);
      if (mustHaveItems.length > 0) {
        prompt += `\n### Must-Have Checklist:\n`;
        for (const item of mustHaveItems) {
          prompt += `- ✓ ${item.ITEM || item.item}`;
          if (item.PRIORITY) prompt += ` (Priority: ${item.PRIORITY})`;
          prompt += '\n';
        }
      }
    }
    
    if (smartDefaultData.finishes && Array.isArray(smartDefaultData.finishes)) {
      prompt += `\n### Finish Specifications:\n`;
      for (const finish of smartDefaultData.finishes) {
        if (Array.isArray(finish) && finish.length >= 2) {
          prompt += `- **${finish[0]}**: ${finish[1]}`;
          if (finish[2]) prompt += ` (Rating: ${finish[2]})`;
          prompt += '\n';
        }
      }
    }
  }

  // Add library reference if available
  if (libraryImageData) {
    prompt += `\n---\n\n## REFERENCE IMAGE GUIDANCE:\n`;
    prompt += `Match the overall aesthetic, mood, and quality of the provided reference image.\n`;
    
    if (libraryImageData.color_palette && Array.isArray(libraryImageData.color_palette)) {
      prompt += `\n### Extracted Color Palette:\n`;
      prompt += libraryImageData.color_palette.map((c: string) => `- ${c}`).join('\n');
      prompt += '\n';
    }
    
    if (libraryImageData.furniture_list && Array.isArray(libraryImageData.furniture_list)) {
      prompt += `\n### Furniture Arrangement Reference:\n`;
      prompt += libraryImageData.furniture_list.map((f: string) => `- ${f}`).join('\n');
      prompt += '\n';
    }
    
    if (libraryImageData.layout_pattern) {
      const layout = libraryImageData.layout_pattern;
      prompt += `\n### Layout Pattern:\n`;
      if (layout.arrangement) prompt += `- Arrangement: ${layout.arrangement}\n`;
      if (layout.focal_point) prompt += `- Focal Point: ${layout.focal_point}\n`;
      if (layout.traffic_flow) prompt += `- Traffic Flow: ${layout.traffic_flow}\n`;
    }
  }

  // Add budget tier adjustments
  if (budgetTier) {
    prompt += `\n---\n\n## BUDGET TIER: ${budgetTier.toUpperCase()}\n`;
    switch (budgetTier.toLowerCase()) {
      case 'premium':
        prompt += `- Use high-end luxury materials and designer furniture\n`;
        prompt += `- Include statement pieces and premium accessories\n`;
        prompt += `- Materials: Italian marble, premium hardwoods, designer brands\n`;
        break;
      case 'mid_range':
      case 'mid-range':
        prompt += `- Balance quality and value\n`;
        prompt += `- Use good quality materials with smart selections\n`;
        prompt += `- Include tasteful, well-designed pieces\n`;
        break;
      case 'budget':
        prompt += `- Focus on cost-effective solutions\n`;
        prompt += `- Use affordable materials that look good\n`;
        prompt += `- Prioritize essential furniture with simple finishes\n`;
        break;
    }
  }

  // Add custom requirements
  if (customRequirements && customRequirements.trim()) {
    prompt += `\n---\n\n## CUSTOM REQUIREMENTS:\n${customRequirements}\n`;
  }

  // Add Indian market requirements if applicable
  if (city) {
    prompt += `\n---\n${INDIAN_REQUIREMENTS}`;
  }

  // Add quality requirements
  prompt += `\n---\n${QUALITY_REQUIREMENTS}`;

  // Final generation instruction
  prompt += `\n---\n\n## GENERATION INSTRUCTION:
Using the style-specific prompt template as your primary guide:

"${styleRules.promptTemplate}"

Create a photorealistic render that scores 8.5+/10 on quality metrics.

**CRITICAL REMINDERS**:
1. PRESERVE 100% of architectural elements (doors, windows, walls)
2. Include ceiling fan (style-appropriate) - MANDATORY for Indian homes
3. Add material imperfections for realism
4. Ensure consistent lighting and shadows
5. Match the ${selectedStyle} style authentically
`;

  return prompt;
}
