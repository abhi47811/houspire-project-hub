/**
 * F-046: Style-Specific Prompts Database
 * 
 * Comprehensive prompt library for all 13 design styles.
 * Each style has carefully crafted prompts that guide AI rendering
 * to maintain consistency across all rooms.
 * 
 * Styles covered:
 * 1. Modern Indian
 * 2. Contemporary
 * 3. Minimalist
 * 4. Scandinavian
 * 5. Mid-Century Modern
 * 6. Industrial
 * 7. Coastal Indian
 * 8. Traditional Indian
 * 9. Transitional
 * 10. Eclectic
 * 11. Art Deco
 * 12. Bohemian
 * 13. Japandi
 */

export interface StylePrompt {
  style_id: string;
  style_name: string;
  base_prompt: string;
  color_palette: string[];
  key_elements: string[];
  materials: string[];
  lighting_style: string;
  furniture_style: string;
  avoid_elements: string[];
  room_specific?: {
    living_room?: string;
    bedroom?: string;
    kitchen?: string;
    dining_room?: string;
    bathroom?: string;
    office?: string;
  };
}

export const stylePrompts: Record<string, StylePrompt> = {
  modern_indian: {
    style_id: 'modern_indian',
    style_name: 'Modern Indian',
    base_prompt: `Create a Modern Indian interior that seamlessly blends contemporary design with traditional Indian aesthetics. 
The space should feature clean lines and modern furniture forms while incorporating Indian cultural elements like jaali screens, 
traditional textiles, and ethnic art. Use a sophisticated color palette with rich accent colors. Include statement pieces 
like carved wooden furniture or traditional metalwork, but in refined, contemporary forms. Balance minimalism with cultural richness.`,
    color_palette: ['#C45D3E', '#E8D5B7', '#2D4A3E', '#8B4513', '#DAA520'],
    key_elements: [
      'Jaali (lattice) screens or panels',
      'Traditional Indian textiles as accents',
      'Ethnic artwork or Madhubani paintings',
      'Carved wooden elements',
      'Brass or copper accents',
      'Contemporary Indian furniture',
    ],
    materials: ['Teak wood', 'Marble', 'Brass', 'Silk', 'Cotton', 'Terracotta'],
    lighting_style: 'Warm ambient lighting with statement pendant lights or traditional lantern-inspired fixtures',
    furniture_style: 'Clean-lined contemporary furniture with Indian craftsmanship details',
    avoid_elements: ['Overly ornate Victorian furniture', 'Cold minimalist aesthetic', 'Purely Western design'],
  },

  contemporary: {
    style_id: 'contemporary',
    style_name: 'Contemporary',
    base_prompt: `Design a Contemporary interior that reflects current design trends with clean lines, neutral colors, and a mix of 
textures. The space should feel fresh and sophisticated with a focus on comfort and functionality. Use a neutral base palette 
with strategic pops of color. Include modern furniture with interesting shapes, mixed materials, and layered lighting. 
The overall aesthetic should be polished, current, and inviting without being overly trendy.`,
    color_palette: ['#F5F5F5', '#333333', '#E58550', '#B8B8B8', '#FFFFFF'],
    key_elements: [
      'Clean architectural lines',
      'Mixed metal finishes',
      'Layered lighting',
      'Textured fabrics',
      'Abstract or geometric artwork',
      'Statement furniture pieces',
    ],
    materials: ['Leather', 'Polished concrete', 'Glass', 'Brushed metal', 'Linen', 'Lacquer'],
    lighting_style: 'Layered lighting with recessed lights, pendants, and floor/table lamps',
    furniture_style: 'Modern furniture with interesting silhouettes and comfortable forms',
    avoid_elements: ['Heavily traditional pieces', 'Excessive ornamentation', 'Dated trends'],
  },

  minimalist: {
    style_id: 'minimalist',
    style_name: 'Minimalist',
    base_prompt: `Create a Minimalist interior that embodies "less is more" philosophy. The space should be serene, uncluttered, 
and focused on essential elements only. Use a monochromatic or very limited color palette dominated by whites, grays, and blacks. 
Every item should serve a purpose. Emphasize clean lines, open space, and quality over quantity. Include built-in storage to 
maintain the clean aesthetic. The overall feel should be calm, spacious, and refined.`,
    color_palette: ['#FFFFFF', '#F0F0F0', '#1A1A1A', '#C0C0C0', '#808080'],
    key_elements: [
      'Clean, uncluttered surfaces',
      'Hidden storage solutions',
      'Simple geometric forms',
      'Quality over quantity',
      'Monochromatic art',
      'Negative space emphasis',
    ],
    materials: ['White oak', 'Concrete', 'Steel', 'Glass', 'White marble', 'Matte finishes'],
    lighting_style: 'Simple recessed lighting with minimal visible fixtures',
    furniture_style: 'Essential, functional pieces with clean lines and no ornamentation',
    avoid_elements: ['Decorative items', 'Pattern mixing', 'Excessive textures', 'Clutter'],
  },

  scandinavian: {
    style_id: 'scandinavian',
    style_name: 'Scandinavian',
    base_prompt: `Design a Scandinavian interior that emphasizes hygge (coziness) through natural materials, soft textures, and 
abundant natural light. Use a light, airy color palette dominated by whites and pale woods. Include functional, well-crafted 
furniture with organic forms. Add warmth through textiles like wool throws and sheepskin rugs. Incorporate greenery and natural 
elements. The space should feel serene, comfortable, and connected to nature.`,
    color_palette: ['#F7F3EE', '#D4C4B0', '#5C6B73', '#8B7355', '#E5E5E5'],
    key_elements: [
      'Light wood flooring (pine, birch)',
      'White or light gray walls',
      'Cozy textiles (wool, sheepskin)',
      'Indoor plants',
      'Candles and soft lighting',
      'Functional storage',
    ],
    materials: ['Light wood', 'Wool', 'Linen', 'Cotton', 'Leather', 'Ceramic'],
    lighting_style: 'Abundant natural light with simple pendant lights and candles',
    furniture_style: 'Functional mid-century inspired pieces in light wood with clean lines',
    avoid_elements: ['Dark colors', 'Heavy ornate furniture', 'Excessive decoration'],
  },

  industrial: {
    style_id: 'industrial',
    style_name: 'Industrial',
    base_prompt: `Create an Industrial interior that celebrates raw, unfinished elements and utilitarian beauty. Expose structural 
elements like brick walls, concrete floors, steel beams, and ductwork. Use a palette of grays, blacks, and warm metals. 
Include vintage or repurposed industrial items as furniture or decor. Mix rough textures with refined elements for balance. 
The space should feel urban, edgy, and authentic with a warehouse aesthetic.`,
    color_palette: ['#4A4A4A', '#8B7355', '#C9C9C9', '#1A1A1A', '#D4A574'],
    key_elements: [
      'Exposed brick or concrete walls',
      'Metal pipes and ductwork',
      'Edison bulb lighting',
      'Reclaimed wood furniture',
      'Industrial metal shelving',
      'Factory-style windows',
    ],
    materials: ['Exposed brick', 'Concrete', 'Steel', 'Reclaimed wood', 'Iron', 'Leather'],
    lighting_style: 'Industrial pendant lights, exposed bulbs, metal cage fixtures',
    furniture_style: 'Vintage industrial pieces, metal and wood combinations, utilitarian forms',
    avoid_elements: ['Soft pastels', 'Ornate decoration', 'Covered structural elements'],
  },

  bohemian: {
    style_id: 'bohemian',
    style_name: 'Bohemian',
    base_prompt: `Design a Bohemian interior that celebrates eclectic, free-spirited style with rich colors, layered textiles, 
and global influences. Mix patterns freely and incorporate vintage finds, artisan pieces, and travel souvenirs. Use a warm, 
rich color palette with jewel tones. Layer rugs, throws, and pillows for maximum coziness. Include plenty of plants and 
natural elements. The space should feel creative, personal, and welcoming.`,
    color_palette: ['#D4A574', '#8B4B62', '#2D5A45', '#E8B872', '#7C4D3A'],
    key_elements: [
      'Layered textiles and rugs',
      'Mixed patterns and colors',
      'Vintage or handcrafted furniture',
      'Abundant plants',
      'Eclectic art and objects',
      'Macramé and woven elements',
    ],
    materials: ['Rattan', 'Jute', 'Velvet', 'Brass', 'Reclaimed wood', 'Embroidered textiles'],
    lighting_style: 'Warm ambient lighting with lanterns, string lights, and Moroccan-style fixtures',
    furniture_style: 'Mix of vintage, global, and handcrafted pieces in various styles',
    avoid_elements: ['Matching furniture sets', 'Minimalist aesthetic', 'Cold modern elements'],
  },

  art_deco: {
    style_id: 'art_deco',
    style_name: 'Art Deco',
    base_prompt: `Create an Art Deco interior that embodies 1920s-30s glamour with geometric patterns, luxurious materials, 
and bold contrasts. Use a palette of black, gold, and deep jewel tones. Include mirrored surfaces, lacquered furniture, 
and geometric metalwork. Feature bold, symmetrical patterns in rugs and wallpaper. The space should feel sophisticated, 
dramatic, and timelessly elegant with a focus on luxury and craftsmanship.`,
    color_palette: ['#C9A962', '#1E3A4C', '#FFFFFF', '#1A1A1A', '#8B0000'],
    key_elements: [
      'Geometric patterns',
      'Mirrored and lacquered surfaces',
      'Sunburst motifs',
      'Chrome and brass fixtures',
      'Velvet upholstery',
      'Statement lighting fixtures',
    ],
    materials: ['Marble', 'Chrome', 'Brass', 'Lacquered wood', 'Velvet', 'Mirror'],
    lighting_style: 'Dramatic statement chandeliers and wall sconces with geometric designs',
    furniture_style: 'Streamlined, geometric furniture with luxurious materials',
    avoid_elements: ['Rustic elements', 'Casual fabrics', 'Muted colors'],
  },

  traditional_indian: {
    style_id: 'traditional',
    style_name: 'Traditional Indian',
    base_prompt: `Design a Traditional Indian interior that celebrates rich cultural heritage through ornate carved furniture, 
vibrant textiles, and classical Indian craftsmanship. Use warm, rich colors with gold accents. Include traditional elements 
like jharoka windows, carved wooden pieces, traditional paintings, and ethnic textiles. The space should feel opulent, 
warm, and deeply connected to Indian cultural traditions.`,
    color_palette: ['#8B1A1A', '#DAA520', '#2F4F4F', '#C45D3E', '#800020'],
    key_elements: [
      'Intricately carved wooden furniture',
      'Traditional Indian textiles',
      'Brass diyas and traditional lamps',
      'Tanjore or Madhubani paintings',
      'Jharoka or carved arches',
      'Ethnic floor seating',
    ],
    materials: ['Carved teak wood', 'Silk', 'Brass', 'Marble', 'Terracotta', 'Gold leaf'],
    lighting_style: 'Ornate traditional lamps, chandeliers with Indian motifs, brass fixtures',
    furniture_style: 'Heavily carved traditional Indian furniture with rich upholstery',
    avoid_elements: ['Minimalist elements', 'Cold modern aesthetics', 'Western-only design'],
  },

  tropical: {
    style_id: 'tropical',
    style_name: 'Tropical',
    base_prompt: `Create a Tropical interior that brings the outdoors in with lush greenery, natural materials, and a fresh color 
palette inspired by tropical landscapes. Use whites, greens, and natural wood tones. Include abundant plants, woven textures, 
and botanical prints. Maximize natural light and create an airy, resort-like atmosphere. The space should feel relaxed, 
fresh, and connected to nature.`,
    color_palette: ['#228B22', '#F5DEB3', '#8B4513', '#90EE90', '#87CEEB'],
    key_elements: [
      'Abundant tropical plants',
      'Rattan and wicker furniture',
      'Palm or banana leaf prints',
      'Natural fiber rugs',
      'Light, breezy fabrics',
      'Bamboo elements',
    ],
    materials: ['Rattan', 'Bamboo', 'Teak', 'Jute', 'Linen', 'Natural stone'],
    lighting_style: 'Bright natural light with woven pendant lights and ceiling fans',
    furniture_style: 'Relaxed, natural pieces in rattan, wicker, and light wood',
    avoid_elements: ['Heavy dark furniture', 'Formal arrangements', 'Synthetic materials'],
  },

  japandi: {
    style_id: 'japandi',
    style_name: 'Japandi',
    base_prompt: `Design a Japandi interior that combines Japanese minimalism with Scandinavian warmth. Use a muted, natural color 
palette with emphasis on craftsmanship and quality. Include low-profile furniture, natural materials, and emphasis on negative 
space. Balance simplicity with coziness through natural textures. The space should feel serene, balanced, and mindfully curated.`,
    color_palette: ['#E8DCC4', '#5C4033', '#9CAF88', '#F5F5F5', '#2F2F2F'],
    key_elements: [
      'Low-profile furniture',
      'Natural wood tones',
      'Minimal decoration',
      'Wabi-sabi aesthetic',
      'Quality craftsmanship',
      'Indoor plants',
    ],
    materials: ['Oak', 'Walnut', 'Linen', 'Wool', 'Ceramic', 'Paper'],
    lighting_style: 'Soft, diffused lighting with paper lanterns and minimal fixtures',
    furniture_style: 'Low, clean-lined pieces in natural wood with excellent craftsmanship',
    avoid_elements: ['Bright colors', 'Excessive decoration', 'Trendy elements'],
  },

  rustic: {
    style_id: 'rustic',
    style_name: 'Rustic',
    base_prompt: `Create a Rustic interior that celebrates natural, raw materials and handcrafted elements. Use warm earth tones 
and emphasize wood, stone, and natural fibers. Include exposed beams, reclaimed wood furniture, and vintage or artisan pieces. 
The space should feel warm, authentic, and connected to traditional craftsmanship and natural materials.`,
    color_palette: ['#8B7355', '#D4C4B0', '#556B2F', '#A0522D', '#F5E6D3'],
    key_elements: [
      'Exposed wooden beams',
      'Reclaimed wood furniture',
      'Stone or brick features',
      'Wrought iron hardware',
      'Natural fiber textiles',
      'Vintage accessories',
    ],
    materials: ['Reclaimed wood', 'Stone', 'Wrought iron', 'Wool', 'Leather', 'Linen'],
    lighting_style: 'Warm lighting with wrought iron fixtures and lantern-style lights',
    furniture_style: 'Substantial wooden pieces with visible grain and natural finishes',
    avoid_elements: ['Sleek modern elements', 'Synthetic materials', 'Glossy finishes'],
  },

  luxury: {
    style_id: 'luxury',
    style_name: 'Luxury Modern',
    base_prompt: `Design a Luxury Modern interior that showcases high-end materials, sophisticated color palettes, and impeccable 
craftsmanship. Use a refined palette of neutrals with metallic accents. Include premium materials like marble, exotic woods, 
and custom pieces. Every element should be carefully curated for maximum impact. The space should feel exclusive, elegant, 
and timelessly sophisticated.`,
    color_palette: ['#1E2238', '#C9A962', '#FFFFFF', '#2F4F4F', '#E5E5E5'],
    key_elements: [
      'Premium natural stone',
      'Custom millwork',
      'Designer lighting',
      'High-end appliances/fixtures',
      'Art pieces',
      'Metallic accents',
    ],
    materials: ['Marble', 'Exotic hardwoods', 'Leather', 'Silk', 'Brushed metals', 'Crystal'],
    lighting_style: 'Statement designer lighting with layered ambient and accent lighting',
    furniture_style: 'Custom or designer pieces with exceptional craftsmanship',
    avoid_elements: ['Budget materials', 'Mass-produced items', 'Casual elements'],
  },

  coastal: {
    style_id: 'coastal',
    style_name: 'Coastal',
    base_prompt: `Create a Coastal interior inspired by beach and seaside living. Use a fresh palette of blues, whites, and natural 
wood tones. Include natural textures like rope, jute, and weathered wood. Maximize natural light and create an airy, breezy 
atmosphere. Add nautical-inspired accents without being themey. The space should feel relaxed, fresh, and reminiscent of 
coastal living.`,
    color_palette: ['#87CEEB', '#F5F5DC', '#2F4F4F', '#B0C4DE', '#FFFFFF'],
    key_elements: [
      'White or light-colored walls',
      'Natural fiber rugs',
      'Weathered wood furniture',
      'Nautical-inspired accents',
      'Sheer curtains',
      'Coastal artwork',
    ],
    materials: ['Weathered wood', 'Rope', 'Jute', 'Linen', 'Seagrass', 'Driftwood'],
    lighting_style: 'Bright natural light with simple fixtures and lantern-style lights',
    furniture_style: 'Relaxed, comfortable pieces in whites and natural woods',
    avoid_elements: ['Heavy dark furniture', 'Excessive nautical themes', 'Formal arrangements'],
  },

  transitional: {
    style_id: 'transitional',
    style_name: 'Transitional',
    base_prompt: `Design a Transitional interior that perfectly balances traditional elegance with contemporary simplicity. Use a 
neutral color palette with subtle pattern mixing. Include furniture that combines classic forms with modern materials. The space 
should feel sophisticated and timeless, neither too formal nor too casual. Balance ornamental details with clean lines.`,
    color_palette: ['#E5E5E5', '#8B8B7A', '#FFFFFF', '#4A4A4A', '#C8B560'],
    key_elements: [
      'Mix of traditional and modern furniture',
      'Neutral palette with texture',
      'Classic fabrics in updated forms',
      'Subtle pattern mixing',
      'Transitional lighting',
      'Balanced proportions',
    ],
    materials: ['Wood with contemporary finish', 'Linen', 'Velvet', 'Brushed metals', 'Marble', 'Leather'],
    lighting_style: 'Updated classic fixtures with modern materials',
    furniture_style: 'Classic silhouettes with contemporary updates and finishes',
    avoid_elements: ['Overly trendy elements', 'Heavy traditional ornament', 'Stark minimalism'],
  },

  eclectic: {
    style_id: 'eclectic',
    style_name: 'Eclectic',
    base_prompt: `Create an Eclectic interior that thoughtfully mixes styles, periods, and influences while maintaining cohesion 
through color, scale, or theme. Combine vintage and modern, traditional and contemporary, global and local elements. Use color 
and pattern boldly but with intentionality. The space should feel curated, personal, and artfully composed rather than random.`,
    color_palette: ['#8B4B62', '#D4A574', '#2D5A45', '#C9A962', '#5C6B73'],
    key_elements: [
      'Mix of furniture styles',
      'Global and vintage finds',
      'Bold artwork',
      'Pattern and texture mixing',
      'Unique accent pieces',
      'Personal collections',
    ],
    materials: ['Mix of wood finishes', 'Varied textiles', 'Metals', 'Glass', 'Various textures'],
    lighting_style: 'Mix of lighting styles unified by scale or finish',
    furniture_style: 'Intentional mix of styles, eras, and influences',
    avoid_elements: ['Matching sets', 'One-note styling', 'Random combinations'],
  },
};

/**
 * Get style prompt by ID
 */
export function getStylePrompt(styleId: string): StylePrompt | null {
  return stylePrompts[styleId] || null;
}

/**
 * Build complete render prompt with style and preservation
 */
export function buildRenderPrompt(
  styleId: string,
  roomType: string,
  preservationPrompt?: string,
  customAdditions?: string
): string {
  const style = getStylePrompt(styleId);
  if (!style) {
    throw new Error(`Style prompt not found for: ${styleId}`);
  }

  let prompt = style.base_prompt;

  // Add room-specific details if available
  const roomKey = roomType.toLowerCase().replace(' ', '_') as keyof typeof style.room_specific;
  if (style.room_specific && style.room_specific[roomKey]) {
    prompt += `\n\n**${roomType} Specific:** ${style.room_specific[roomKey]}`;
  }

  // Add key elements
  prompt += `\n\n**Key Elements to Include:**\n${style.key_elements.map(e => `- ${e}`).join('\n')}`;

  // Add materials
  prompt += `\n\n**Materials:** ${style.materials.join(', ')}`;

  // Add lighting style
  prompt += `\n\n**Lighting:** ${style.lighting_style}`;

  // Add elements to avoid
  if (style.avoid_elements.length > 0) {
    prompt += `\n\n**Avoid:** ${style.avoid_elements.join(', ')}`;
  }

  // Add architectural preservation
  if (preservationPrompt) {
    prompt += preservationPrompt;
  }

  // Add custom additions
  if (customAdditions) {
    prompt += `\n\n**Additional Requirements:** ${customAdditions}`;
  }

  return prompt;
}

/**
 * Get all available styles
 */
export function getAllStyles(): StylePrompt[] {
  return Object.values(stylePrompts);
}
