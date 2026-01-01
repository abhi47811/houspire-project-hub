/**
 * Style-Aware Vision Extraction Prompts
 * Enhanced AI prompts for accurate item detection based on design style
 */

export interface DesignStyle {
  name: string;
  keywords: string[];
  expectedFinishes: {
    ceiling: string[];
    walls: string[];
    flooring: string[];
  };
  typicalItems: string[];
  unlikelyItems: string[];
  priceRange: 'budget' | 'mid-premium' | 'premium';
}

/**
 * Comprehensive design style definitions
 */
export const DESIGN_STYLES: Record<string, DesignStyle> = {
  'Modern Industrial': {
    name: 'Modern Industrial',
    keywords: ['exposed', 'brick', 'concrete', 'metal', 'pipes', 'raw', 'industrial', 'loft'],
    expectedFinishes: {
      ceiling: ['exposed concrete', 'exposed beams', 'metal pipes', 'track lighting'],
      walls: ['exposed brick', 'exposed concrete', 'metal panels', 'raw finishes'],
      flooring: ['polished concrete', 'concrete', 'industrial tiles', 'metal finishes']
    },
    typicalItems: [
      'metal-frame furniture',
      'leather furniture',
      'industrial pendant lights',
      'track lighting',
      'metal coffee table',
      'exposed Edison bulbs',
      'metal shelving',
      'industrial bar stools'
    ],
    unlikelyItems: [
      'crystal chandelier',
      'marble flooring',
      'false gypsum ceiling',
      'ornate furniture',
      'luxury fabric',
      'wallpaper',
      'decorative molding'
    ],
    priceRange: 'mid-premium'
  },

  'Contemporary Luxury': {
    name: 'Contemporary Luxury',
    keywords: ['marble', 'crystal', 'luxury', 'premium', 'high-end', 'designer', 'elegant'],
    expectedFinishes: {
      ceiling: ['false gypsum ceiling', 'cove lighting', 'crystal chandelier', 'recessed lights'],
      walls: ['premium paint', 'wallpaper', 'marble cladding', 'textured walls'],
      flooring: ['marble', 'italian marble', 'premium tiles', 'engineered wood']
    },
    typicalItems: [
      'designer furniture',
      'crystal chandelier',
      'premium fabric sofa',
      'marble coffee table',
      'luxury lighting',
      'high-end decor',
      'designer mirrors',
      'premium textiles'
    ],
    unlikelyItems: [
      'exposed concrete',
      'exposed brick',
      'industrial lighting',
      'metal pipes',
      'budget furniture',
      'basic tiles'
    ],
    priceRange: 'premium'
  },

  'Minimalist Modern': {
    name: 'Minimalist Modern',
    keywords: ['minimal', 'clean', 'simple', 'modern', 'sleek', 'contemporary', 'neutral'],
    expectedFinishes: {
      ceiling: ['plain white ceiling', 'recessed lights', 'minimal lighting'],
      walls: ['white paint', 'neutral paint', 'plain walls', 'minimal texture'],
      flooring: ['light wood', 'neutral tiles', 'light flooring', 'minimal pattern']
    },
    typicalItems: [
      'simple furniture',
      'clean-line sofa',
      'minimal coffee table',
      'simple pendant lights',
      'neutral textiles',
      'minimal decor',
      'simple shelving'
    ],
    unlikelyItems: [
      'ornate details',
      'heavy curtains',
      'crystal chandelier',
      'busy patterns',
      'excessive decor'
    ],
    priceRange: 'mid-premium'
  },

  'Traditional Indian': {
    name: 'Traditional Indian',
    keywords: ['traditional', 'carved', 'brass', 'wood', 'indian', 'ethnic', 'cultural'],
    expectedFinishes: {
      ceiling: ['wooden ceiling', 'POP ceiling', 'traditional design'],
      walls: ['textured walls', 'traditional patterns', 'wooden paneling'],
      flooring: ['marble', 'granite', 'traditional tiles', 'stone']
    },
    typicalItems: [
      'carved wooden furniture',
      'brass lighting',
      'traditional sofa',
      'ethnic decor',
      'traditional textiles',
      'wooden storage',
      'brass accessories'
    ],
    unlikelyItems: [
      'industrial elements',
      'metal furniture',
      'concrete finishes',
      'ultra-modern design'
    ],
    priceRange: 'mid-premium'
  },

  'Scandinavian': {
    name: 'Scandinavian',
    keywords: ['scandinavian', 'nordic', 'light', 'airy', 'cozy', 'hygge', 'natural'],
    expectedFinishes: {
      ceiling: ['white ceiling', 'light wood beams', 'simple lighting'],
      walls: ['white walls', 'light paint', 'wooden accents'],
      flooring: ['light wood', 'blonde wood', 'light laminate', 'natural wood']
    },
    typicalItems: [
      'light wood furniture',
      'simple pendant lights',
      'cozy textiles',
      'neutral cushions',
      'minimal decor',
      'natural materials',
      'plants',
      'wool rugs'
    ],
    unlikelyItems: [
      'dark furniture',
      'heavy materials',
      'ornate details',
      'marble',
      'crystal',
      'industrial metal'
    ],
    priceRange: 'mid-premium'
  }
};

/**
 * Generate style-aware extraction prompt
 */
export function generateStyleAwarePrompt(roomType: string): string {
  return `You are an expert interior designer analyzing a rendered room image. Your task is to accurately identify EVERYTHING visible in the image.

CRITICAL INSTRUCTIONS:
1. ALWAYS detect the design style FIRST
2. Be HONEST about what you see - don't assume items that aren't visible
3. If you see exposed materials (brick, concrete, pipes), say so!
4. Don't add premium finishes (marble, false ceiling) unless clearly visible
5. Count ALL decor items: plants, artwork, cushions, rugs, throws, etc.

═══════════════════════════════════════════════════════════════
TASK 1: DESIGN STYLE IDENTIFICATION
═══════════════════════════════════════════════════════════════

Analyze the image and identify the PRIMARY design style from these options:

**Modern Industrial** - Look for:
✓ Exposed brick walls
✓ Exposed concrete ceiling
✓ Exposed metal pipes/ductwork
✓ Track lighting on beams
✓ Industrial pendant lights
✓ Metal-frame furniture
✓ Polished concrete floor
✓ Raw, unfinished materials
✗ NO marble, NO crystal, NO false ceiling

**Contemporary Luxury** - Look for:
✓ Marble flooring
✓ Crystal chandeliers
✓ False gypsum ceiling
✓ Cove lighting
✓ Premium painted walls
✓ Designer furniture
✓ High-end finishes
✗ NO exposed materials, NO industrial elements

**Minimalist Modern** - Look for:
✓ Clean white walls
✓ Simple lines
✓ Minimal furniture
✓ Neutral colors
✓ Recessed lighting
✓ Simple materials
✗ NO excessive decor, NO ornate details

**Traditional Indian** - Look for:
✓ Carved wooden furniture
✓ Brass fixtures
✓ Traditional patterns
✓ Ethnic decor
✓ Rich colors
✗ NO ultra-modern elements

**Scandinavian** - Look for:
✓ Light wood tones
✓ White walls
✓ Cozy textiles
✓ Natural materials
✓ Plants
✓ Simple, functional furniture
✗ NO dark colors, NO heavy materials

═══════════════════════════════════════════════════════════════
TASK 2: STYLE CHARACTERISTICS
═══════════════════════════════════════════════════════════════

Based on the identified style, document:

**Ceiling Type:**
- False gypsum ceiling? (smooth, finished, with recessed lights)
- Exposed concrete? (raw concrete visible, may have pipes)
- POP ceiling? (decorative plaster)
- Wooden beams? (visible wood structure)
- Plain painted? (simple white/colored ceiling)

**Wall Finishes:**
- Exposed brick? (raw brick visible, industrial)
- Exposed concrete? (raw concrete walls)
- Painted walls? (smooth painted surface)
- Wallpaper? (decorative paper covering)
- Wood paneling? (wooden wall covering)
- Textured finish? (decorative texture)

**Flooring:**
- Marble? (shiny, veined stone - luxury)
- Concrete? (industrial, smooth or rough)
- Wood? (natural or laminate wood)
- Tiles? (ceramic/vitrified tiles)
- Carpet? (soft textile covering)

═══════════════════════════════════════════════════════════════
TASK 3: COMPREHENSIVE ITEM EXTRACTION
═══════════════════════════════════════════════════════════════

Room Type: ${roomType}

Extract EVERY visible item into these categories:

**1. FURNITURE** (be specific about type and material!)
- Sofas: [3-seater/2-seater/L-shaped, leather/fabric, color, style]
- Chairs: [armchairs/dining/office, quantity, material, frame type]
- Tables: [coffee/dining/side, material: wood/metal/marble, size]
- Storage: [bookshelf/TV unit/cabinet/wardrobe, material, style]
- Beds: [size, style, material, headboard type]

**2. CEILING & LIGHTING**
- Ceiling type: [exposed concrete/false gypsum/POP/plain/wooden]
- Primary lights: [chandelier/pendant/track/ceiling fan, style, quantity]
- Secondary lights: [downlights/wall sconces/floor lamps/table lamps]
- Accent lighting: [LED strips/cove lighting/spotlights]

**3. WALLS**
- Wall finish: [exposed brick/exposed concrete/painted/wallpaper/paneling]
- Wall treatments: [textured/plain/decorative]
- If painted: [color, finish type]

**4. FLOORING**
- Floor type: [marble/concrete/wood/tiles/carpet/vinyl]
- Pattern: [plain/patterned/bordered]
- Color: [dominant color]

**5. FIXTURES & FITTINGS**
- Windows: [size, type]
- Window treatments: [curtains/blinds/shutters, material, color, style]
- Doors: [visible doors, material, style]
- Hardware: [handles, hinges if visible]
- Electrical: [visible switches, outlets]

**6. DECOR & TEXTILES** (DON'T SKIP THESE!)
- Rugs/Carpets: [size: small/medium/large, material, pattern, color]
- Cushions/Pillows: [quantity, colors, patterns]
- Throws/Blankets: [quantity, material, color]
- Wall Art: [paintings/frames/prints, quantity, sizes, arrangement]
- Plants: [quantity, types: floor/tabletop, sizes, planters]
- Mirrors: [quantity, sizes, frame styles]
- Decorative Objects: [vases/sculptures/books/candles/baskets, etc.]
- Accessories: [clocks/photo frames/decorative items]

**7. KITCHEN/BATHROOM** (if applicable)
- Cabinets: [material, finish, configuration]
- Countertops: [material, edge finish]
- Sink: [type, material]
- Appliances: [chimney/hob/oven/etc.]
- Fixtures: [faucets/taps, material]
- Tiles: [wall tiles/floor tiles, size, pattern]

═══════════════════════════════════════════════════════════════
OUTPUT FORMAT
═══════════════════════════════════════════════════════════════

Return a JSON object with this EXACT structure:

{
  "detected_style": "Modern Industrial",
  "style_confidence": 0.95,
  "style_characteristics": {
    "ceiling": "exposed concrete with metal pipes",
    "walls": "exposed brick on left, exposed concrete on right",
    "flooring": "polished concrete"
  },
  "items": [
    {
      "name": "3-seater leather sofa",
      "category": "furniture",
      "confidence": 0.95,
      "quantity": 1,
      "specifications": "Brown leather, modern style, straight design (not L-shaped)",
      "material": "leather",
      "color": "brown",
      "style_relevant": true
    },
    {
      "name": "industrial pendant light",
      "category": "lighting",
      "confidence": 0.90,
      "quantity": 5,
      "specifications": "Edison bulbs, black rods, clustered arrangement",
      "material": "metal",
      "color": "black",
      "style_relevant": true
    },
    {
      "name": "area rug",
      "category": "decor",
      "confidence": 0.85,
      "quantity": 1,
      "specifications": "Large, under coffee table, neutral beige/grey",
      "material": "textile",
      "color": "beige",
      "style_relevant": true
    }
    // ... more items
  ]
}

═══════════════════════════════════════════════════════════════
CRITICAL VALIDATION RULES
═══════════════════════════════════════════════════════════════

Before submitting your response, verify:

✓ Style matches what you see (don't guess!)
✓ No false ceiling if you see exposed concrete
✓ No marble floor if you see concrete
✓ No painted walls if you see exposed brick/concrete
✓ Count ALL plants, cushions, artwork (don't skip decor!)
✓ All furniture described with material and style
✓ Confidence reflects actual certainty (be honest!)

Remember: It's better to mark low confidence than to guess wrong!

Now analyze the image and provide the complete JSON response.`;
}

/**
 * Validate extracted items against detected style
 */
export function validateItemsAgainstStyle(
  detectedStyle: string,
  items: any[]
): { valid: boolean; warnings: string[] } {
  const style = DESIGN_STYLES[detectedStyle];
  if (!style) {
    return { valid: true, warnings: ['Unknown style, skipping validation'] };
  }

  const warnings: string[] = [];

  items.forEach((item) => {
    const itemNameLower = item.name.toLowerCase();

    // Check for unlikely items
    for (const unlikely of style.unlikelyItems) {
      if (itemNameLower.includes(unlikely.toLowerCase())) {
        warnings.push(
          `⚠️  Style mismatch: "${item.name}" is unlikely in ${detectedStyle} style`
        );
      }
    }

    // Check for expected items
    const hasExpectedItem = style.typicalItems.some((typical) =>
      itemNameLower.includes(typical.toLowerCase())
    );

    // No warning if at least some typical items are present
  });

  return {
    valid: warnings.length === 0,
    warnings
  };
}

/**
 * Map detected style to budget tier
 */
export function styleToBudgetTier(style: string): 'budget' | 'mid-premium' | 'premium' {
  const styleConfig = DESIGN_STYLES[style];
  return styleConfig?.priceRange || 'mid-premium';
}
