// Room-specific prompt templates with essential elements for rich, detailed renders

export interface RoomTemplate {
  roomType: string;
  essentialFurniture: string[];
  essentialDecor: string[];
  essentialTextiles: string[];
  lightingWithFan: string[];
  lightingWithoutFan: string[];
  qualityNotes: string[];
}

export const ROOM_TEMPLATES: Record<string, RoomTemplate> = {
  dining_room: {
    roomType: 'Dining Room',
    essentialFurniture: [
      '6-8 seater dining table with chairs',
      'Console table or sideboard against wall',
      'Optional: bar cabinet or display unit'
    ],
    essentialDecor: [
      'Large framed artwork or mirror',
      'Decorative vases with flowers/plants',
      'Table centerpiece (candles, bowl, sculpture)',
      'Wall-mounted sconces or accent pieces',
      'Potted plants (floor or tabletop)'
    ],
    essentialTextiles: [
      'Persian/Oriental style area rug under table',
      'Curtains or drapes on windows',
      'Table runner or placemats',
      'Chair cushions if applicable'
    ],
    lightingWithFan: [
      'Ceiling fan as primary ceiling fixture',
      'Wall-mounted sconces on side walls',
      'Table lamps on console/sideboard',
      'NO pendant lights or chandeliers'
    ],
    lightingWithoutFan: [
      'Statement chandelier or pendant over table',
      'Wall sconces for ambient lighting',
      'Table lamps on console',
      'Recessed lighting if appropriate'
    ],
    qualityNotes: [
      'Magazine-quality styling',
      'Warm, inviting atmosphere',
      'Rich layered details',
      'Every surface styled with purpose'
    ]
  },
  
  living_room: {
    roomType: 'Living Room',
    essentialFurniture: [
      '3-seater sofa with accent chairs',
      'Coffee table (wood, glass, or mixed materials)',
      'Side tables with lamps',
      'Media console or entertainment unit',
      'Bookshelf or display unit'
    ],
    essentialDecor: [
      'Large artwork or gallery wall',
      'Decorative mirrors',
      'Plants at multiple heights',
      'Books, sculptures, decorative objects',
      'Throw pillows and blankets'
    ],
    essentialTextiles: [
      'Large area rug defining seating area',
      'Curtains or blinds on windows',
      'Multiple throw pillows',
      'Cozy throw blankets'
    ],
    lightingWithFan: [
      'Ceiling fan as primary fixture',
      'Floor lamps near seating',
      'Table lamps on side tables',
      'NO hanging pendant lights'
    ],
    lightingWithoutFan: [
      'Statement pendant or chandelier',
      'Floor lamps',
      'Table lamps',
      'Recessed or track lighting'
    ],
    qualityNotes: [
      'Comfortable lived-in feel',
      'Layered textures',
      'Mix of materials',
      'Magazine-worthy styling'
    ]
  },
  
  bedroom: {
    roomType: 'Bedroom',
    essentialFurniture: [
      'Bed with upholstered or wooden headboard',
      'Matching nightstands on both sides',
      'Dresser or chest of drawers',
      'Accent chair or bench at foot of bed',
      'Optional: vanity table'
    ],
    essentialDecor: [
      'Artwork above headboard or dresser',
      'Table lamps on nightstands',
      'Plants (real or faux)',
      'Decorative objects on dresser',
      'Full-length mirror'
    ],
    essentialTextiles: [
      'Layered bedding with throw pillows',
      'Area rug beside or under bed',
      'Curtains or drapes',
      'Throw blanket on bed or chair'
    ],
    lightingWithFan: [
      'Ceiling fan as primary fixture',
      'Matching table lamps on nightstands',
      'Floor lamp in reading corner',
      'NO hanging pendants over bed'
    ],
    lightingWithoutFan: [
      'Pendant lights over nightstands',
      'Chandelier or statement fixture',
      'Table lamps',
      'Recessed lighting'
    ],
    qualityNotes: [
      'Serene, restful atmosphere',
      'Luxurious bedding details',
      'Balanced symmetry',
      'Spa-like quality'
    ]
  },
  
  master_bedroom: {
    roomType: 'Master Bedroom',
    essentialFurniture: [
      'King-size bed with statement headboard',
      'Matching nightstands',
      'Dresser with mirror',
      'Seating area with armchairs',
      'Ottoman or bench at foot of bed'
    ],
    essentialDecor: [
      'Large-scale artwork',
      'Statement mirrors',
      'Indoor plants',
      'Decorative trays and objects',
      'Personal touches (books, photos)'
    ],
    essentialTextiles: [
      'High-quality layered bedding',
      'Large area rug',
      'Floor-to-ceiling curtains',
      'Accent pillows and throws'
    ],
    lightingWithFan: [
      'Ceiling fan (modern 3-blade design)',
      'Elegant table lamps',
      'Floor lamp in seating area',
      'NO hanging fixtures'
    ],
    lightingWithoutFan: [
      'Chandelier or dramatic pendant',
      'Reading sconces',
      'Table lamps',
      'Ambient cove lighting'
    ],
    qualityNotes: [
      'Luxury hotel feel',
      'Sophisticated color palette',
      'Premium materials',
      'Resort-like atmosphere'
    ]
  },
  
  kitchen: {
    roomType: 'Kitchen',
    essentialFurniture: [
      'Kitchen island or breakfast bar',
      'Bar stools or counter seating',
      'Open shelving or display area'
    ],
    essentialDecor: [
      'Decorative jars and canisters',
      'Fresh fruit bowl',
      'Herbs or small plants',
      'Cutting boards as decor',
      'Cookbook display'
    ],
    essentialTextiles: [
      'Kitchen runner rug',
      'Hand towels',
      'Window treatments'
    ],
    lightingWithFan: [
      'Recessed ceiling lights',
      'Under-cabinet lighting',
      'Pendant over island (if no fan conflict)',
      'Task lighting'
    ],
    lightingWithoutFan: [
      'Pendant lights over island',
      'Recessed downlights',
      'Under-cabinet lighting',
      'Task lighting'
    ],
    qualityNotes: [
      'Clean yet lived-in look',
      'Organized styling',
      'Functional beauty',
      'Magazine-kitchen aesthetic'
    ]
  },
  
  bathroom: {
    roomType: 'Bathroom',
    essentialFurniture: [
      'Vanity with mirror',
      'Storage cabinet or shelving',
      'Towel rack or ladder'
    ],
    essentialDecor: [
      'Plants that thrive in humidity',
      'Decorative containers for toiletries',
      'Candles or diffuser',
      'Artwork or wall decor',
      'Decorative mirror'
    ],
    essentialTextiles: [
      'Plush bath mat',
      'Rolled or folded towels',
      'Window treatment if applicable'
    ],
    lightingWithFan: [
      'Recessed ceiling lights',
      'Vanity lighting',
      'NO hanging fixtures'
    ],
    lightingWithoutFan: [
      'Statement pendant or chandelier',
      'Vanity sconces',
      'Recessed lighting'
    ],
    qualityNotes: [
      'Spa-like atmosphere',
      'Clean and organized',
      'Luxurious materials',
      'Hotel bathroom quality'
    ]
  },
  
  office: {
    roomType: 'Office',
    essentialFurniture: [
      'Executive desk or writing table',
      'Ergonomic office chair',
      'Bookshelf or storage unit',
      'Guest seating',
      'Filing or storage'
    ],
    essentialDecor: [
      'Artwork or inspirational pieces',
      'Desk accessories (lamp, organizer)',
      'Plants for greenery',
      'Books and decorative objects',
      'Personal items (photo frames)'
    ],
    essentialTextiles: [
      'Area rug under desk area',
      'Curtains or blinds',
      'Chair cushion if needed'
    ],
    lightingWithFan: [
      'Ceiling fan',
      'Desk lamp',
      'Floor lamp',
      'NO hanging pendants'
    ],
    lightingWithoutFan: [
      'Statement pendant or chandelier',
      'Desk lamp',
      'Floor lamp',
      'Task lighting'
    ],
    qualityNotes: [
      'Professional yet warm',
      'Organized workspace',
      'Inspiring atmosphere',
      'Executive quality'
    ]
  },
  
  home_office: {
    roomType: 'Home Office',
    essentialFurniture: [
      'Desk with comfortable chair',
      'Bookshelf or floating shelves',
      'Side table or credenza',
      'Comfortable reading chair'
    ],
    essentialDecor: [
      'Artwork or vision board',
      'Desk lamp and accessories',
      'Plants and greenery',
      'Books and decorative items',
      'Clock or wall decor'
    ],
    essentialTextiles: [
      'Cozy area rug',
      'Window treatments',
      'Throw pillow on chair'
    ],
    lightingWithFan: [
      'Ceiling fan',
      'Adjustable desk lamp',
      'Floor lamp for reading',
      'NO pendants'
    ],
    lightingWithoutFan: [
      'Pendant or semi-flush mount',
      'Desk lamp',
      'Floor lamp'
    ],
    qualityNotes: [
      'Productive yet cozy',
      'Personal touches',
      'Good natural light',
      'Stylish workspace'
    ]
  },
  
  kids_room: {
    roomType: 'Kids Room',
    essentialFurniture: [
      'Bed (twin or bunk)',
      'Study desk with chair',
      'Wardrobe or dresser',
      'Toy storage or shelving',
      'Reading nook or play area'
    ],
    essentialDecor: [
      'Age-appropriate wall art',
      'Soft toys and plushies',
      'Books on display',
      'Fun decorative elements',
      'Plants (safe varieties)'
    ],
    essentialTextiles: [
      'Colorful area rug',
      'Fun bedding and pillows',
      'Curtains with patterns',
      'Floor cushions'
    ],
    lightingWithFan: [
      'Ceiling fan',
      'Desk lamp',
      'Night light',
      'NO low-hanging fixtures'
    ],
    lightingWithoutFan: [
      'Fun pendant or flush mount',
      'Desk lamp',
      'Night light'
    ],
    qualityNotes: [
      'Playful yet organized',
      'Safe and functional',
      'Age-appropriate styling',
      'Room to grow'
    ]
  },
  
  guest_bedroom: {
    roomType: 'Guest Bedroom',
    essentialFurniture: [
      'Comfortable bed with quality mattress',
      'Nightstand with lamp',
      'Dresser or luggage rack',
      'Armchair or bench'
    ],
    essentialDecor: [
      'Welcoming artwork',
      'Fresh flowers or plants',
      'Books or magazines',
      'Mirror',
      'Decorative tray for amenities'
    ],
    essentialTextiles: [
      'Luxurious bedding',
      'Extra blankets',
      'Area rug',
      'Quality curtains'
    ],
    lightingWithFan: [
      'Ceiling fan',
      'Bedside lamps',
      'Reading light',
      'NO hanging fixtures'
    ],
    lightingWithoutFan: [
      'Elegant pendant or chandelier',
      'Matching table lamps',
      'Reading sconces'
    ],
    qualityNotes: [
      'Hotel-quality comfort',
      'Welcoming atmosphere',
      'Thoughtful amenities',
      'Clean and fresh'
    ]
  },

  balcony: {
    roomType: 'Balcony',
    essentialFurniture: [
      'Outdoor seating (chairs, loveseat, or swing)',
      'Small coffee table or side table',
      'Planters with greenery',
      'Floor mat or outdoor rug'
    ],
    essentialDecor: [
      'Hanging plants or vertical garden',
      'Outdoor cushions and throws',
      'Lanterns or string lights',
      'Decorative planters in varying sizes',
      'Wall-mounted shelves or hooks'
    ],
    essentialTextiles: [
      'Weather-resistant cushions',
      'Outdoor rug or mat',
      'Throw blankets for seating'
    ],
    lightingWithFan: [
      'Ceiling fan (if covered balcony)',
      'String lights or fairy lights',
      'Floor lanterns',
      'NO hanging pendants'
    ],
    lightingWithoutFan: [
      'String lights or fairy lights',
      'Wall-mounted outdoor lights',
      'Lanterns or candle holders',
      'Solar-powered accent lights'
    ],
    qualityNotes: [
      'Cozy outdoor living space',
      'Abundant greenery and plants',
      'Weather-appropriate materials',
      'Warm, inviting ambiance',
      'Privacy elements if needed'
    ]
  },

  foyer: {
    roomType: 'Foyer',
    essentialFurniture: [
      'Console table against wall',
      'Mirror above console',
      'Seating bench or chair',
      'Shoe storage or cabinet',
      'Coat hooks or stand'
    ],
    essentialDecor: [
      'Large decorative mirror',
      'Artwork or wall decor',
      'Table lamp on console',
      'Fresh flowers or plants',
      'Decorative bowl for keys',
      'Umbrella stand'
    ],
    essentialTextiles: [
      'Runner rug or area rug',
      'Welcome mat',
      'Cushion on bench if applicable'
    ],
    lightingWithFan: [
      'Ceiling fan (if large foyer)',
      'Table lamp on console',
      'Wall sconces',
      'NO low-hanging fixtures'
    ],
    lightingWithoutFan: [
      'Statement pendant or chandelier',
      'Table lamp on console',
      'Wall sconces',
      'Recessed lighting'
    ],
    qualityNotes: [
      'First impression matters',
      'Welcoming and inviting',
      'Functional yet decorative',
      'Reflects home\'s overall style'
    ]
  },

  pooja_room: {
    roomType: 'Pooja Room',
    essentialFurniture: [
      'Mandir or altar (wooden or marble)',
      'Storage for pooja items',
      'Seating (small stool, cushion, or asana)',
      'Shelf for religious books'
    ],
    essentialDecor: [
      'Deity idols or photos',
      'Brass or silver pooja items',
      'Incense holder (agarbatti stand)',
      'Bell (ghanti)',
      'Diya or oil lamps',
      'Fresh flowers or garlands',
      'Religious symbols (Om, Swastik)',
      'Decorative wall hangings'
    ],
    essentialTextiles: [
      'Silk or cotton cloth for altar',
      'Small prayer mat or cushion',
      'Decorative curtain for mandir'
    ],
    lightingWithFan: [
      'Soft overhead lighting',
      'NO ceiling fan (sacred space)',
      'Diya or oil lamps',
      'LED lights in mandir'
    ],
    lightingWithoutFan: [
      'Warm, soft overhead lighting',
      'Diya or oil lamps',
      'LED strip lights in mandir',
      'NO harsh bright lights'
    ],
    qualityNotes: [
      'Sacred, peaceful atmosphere',
      'Traditional Indian elements',
      'Clean, organized, clutter-free',
      'Warm, golden lighting',
      'Respectful, authentic design'
    ]
  },

  wardrobe: {
    roomType: 'Wardrobe',
    essentialFurniture: [
      'Built-in or freestanding wardrobe units',
      'Drawers and shelving',
      'Full-length mirror',
      'Dressing table or vanity',
      'Ottoman or seating',
      'Shoe racks or storage'
    ],
    essentialDecor: [
      'Decorative boxes for accessories',
      'Jewelry organizers',
      'Perfume display',
      'Decorative hangers',
      'Plants or flowers',
      'Framed artwork or mirror'
    ],
    essentialTextiles: [
      'Area rug',
      'Cushion on seating',
      'Drawer liners'
    ],
    lightingWithFan: [
      'Ceiling fan (if large walk-in)',
      'LED strip lights inside wardrobes',
      'Vanity lights around mirror',
      'Overhead lighting'
    ],
    lightingWithoutFan: [
      'Chandelier or statement fixture',
      'LED strip lights inside wardrobes',
      'Vanity lights around mirror',
      'Recessed spotlights'
    ],
    qualityNotes: [
      'Highly organized and functional',
      'Luxury boutique feel',
      'Everything visible and accessible',
      'Premium materials and finishes'
    ]
  },

  nursery: {
    roomType: 'Nursery',
    essentialFurniture: [
      'Crib with safe bedding',
      'Changing table or dresser with changing pad',
      'Nursing chair or glider',
      'Storage for baby items',
      'Bookshelf for books and toys'
    ],
    essentialDecor: [
      'Soft wall art or murals',
      'Mobile above crib',
      'Stuffed animals and soft toys',
      'Growth chart',
      'Name letters or personalization',
      'Soft nightlight'
    ],
    essentialTextiles: [
      'Soft area rug',
      'Curtains (blackout recommended)',
      'Cozy blankets and throws',
      'Cushions for nursing chair'
    ],
    lightingWithFan: [
      'Ceiling fan (quiet model)',
      'Dim-able overhead light',
      'Soft nightlight',
      'NO hanging fixtures near crib'
    ],
    lightingWithoutFan: [
      'Flush mount ceiling light',
      'Table lamp for soft lighting',
      'Nightlight',
      'Dim-able options throughout'
    ],
    qualityNotes: [
      'Safe and soothing environment',
      'Soft, calming color palette',
      'All items baby-safe',
      'Peaceful, restful atmosphere'
    ]
  }
};

// Get template for a room type, with fallback to living room
export function getRoomTemplate(roomType: string | null): RoomTemplate {
  if (!roomType) return ROOM_TEMPLATES.living_room;
  
  // Normalize room type (handle underscores, spaces, etc.)
  const normalized = roomType.toLowerCase().replace(/[\s-]/g, '_');
  
  return ROOM_TEMPLATES[normalized] || ROOM_TEMPLATES.living_room;
}

// Detail preservation instructions for refinement prompts
export const DETAIL_PRESERVATION_INSTRUCTIONS = `
CRITICAL - PRESERVE ALL EXISTING DETAILS:
• Keep all furniture in current positions
• Maintain all decorative accessories
• Preserve all plants and greenery
• Keep all textiles (rugs, curtains, pillows)
• Maintain all wall art and mirrors
• Preserve all lighting fixtures
• Keep the overall rich, detailed styling

Only modify what is explicitly requested. The room must maintain its magazine-quality, richly detailed appearance.
`;

// Indian context additions for traditional styles
export const INDIAN_CONTEXT_ELEMENTS: Record<string, string[]> = {
  traditional_indian: [
    'Brass or copper decorative items',
    'Traditional Indian artwork (Tanjore, Madhubani)',
    'Carved wooden furniture',
    'Rich jewel-tone colors',
    'Hand-woven textiles'
  ],
  contemporary_indian: [
    'Modern interpretation of Indian motifs',
    'Mix of traditional and modern elements',
    'Contemporary furniture with Indian accents',
    'Subtle brass or copper touches'
  ],
  rajasthani: [
    'Vibrant colors (pink, blue, orange)',
    'Jharokha-style mirrors',
    'Block-printed textiles',
    'Carved wooden screens',
    'Traditional Rajasthani artwork'
  ],
  south_indian: [
    'Rosewood or teak furniture',
    'Brass lamps and urlis',
    'Temple-style brass accessories',
    'Traditional Chettinad tiles',
    'Banana leaf motifs'
  ]
};

// Build a comprehensive prompt using room template and smart defaults
export function buildRichPrompt(
  roomType: string | null,
  style: string | null,
  hasCeilingFan: boolean,
  smartDefaultSpecs?: any[],
  smartDefaultChecklist?: string[],
  smartDefaultFinishes?: any[],
  customRequirements?: string
): string {
  const template = getRoomTemplate(roomType);
  const styleText = style?.replace(/_/g, ' ') || 'contemporary';
  
  let prompt = `Create a stunning, photorealistic ${template.roomType} in ${styleText} style.\n\n`;
  
  // Add furniture from template
  prompt += `## Essential Furniture:\n`;
  template.essentialFurniture.forEach(item => {
    prompt += `• ${item}\n`;
  });
  
  // Add smart default specs if available
  if (smartDefaultSpecs && smartDefaultSpecs.length > 0) {
    prompt += `\n## Design Specifications:\n`;
    for (const spec of smartDefaultSpecs) {
      if (spec.category && spec.items) {
        prompt += `• ${spec.category}: ${Array.isArray(spec.items) ? spec.items.join(', ') : spec.items}\n`;
      } else if (typeof spec === 'object') {
        // Handle various spec formats
        const entries = Object.entries(spec);
        entries.forEach(([key, value]) => {
          if (key !== 'id' && value) {
            prompt += `• ${key}: ${value}\n`;
          }
        });
      }
    }
  }
  
  // Add decor elements
  prompt += `\n## Decorative Elements:\n`;
  template.essentialDecor.forEach(item => {
    prompt += `• ${item}\n`;
  });
  
  // Add textiles
  prompt += `\n## Textiles & Soft Furnishings:\n`;
  template.essentialTextiles.forEach(item => {
    prompt += `• ${item}\n`;
  });
  
  // Add lighting based on fan presence
  prompt += `\n## Lighting:\n`;
  const lightingItems = hasCeilingFan ? template.lightingWithFan : template.lightingWithoutFan;
  lightingItems.forEach(item => {
    prompt += `• ${item}\n`;
  });
  
  // Add finishes if available
  if (smartDefaultFinishes && smartDefaultFinishes.length > 0) {
    prompt += `\n## Materials & Finishes:\n`;
    for (const finish of smartDefaultFinishes) {
      if (finish.type && finish.value) {
        prompt += `• ${finish.type}: ${finish.value}\n`;
      } else if (typeof finish === 'string') {
        prompt += `• ${finish}\n`;
      }
    }
  }
  
  // Add checklist items
  if (smartDefaultChecklist && smartDefaultChecklist.length > 0) {
    prompt += `\n## Must-Have Items:\n`;
    smartDefaultChecklist.forEach((item: any) => {
      const text = typeof item === 'string' ? item : (item?.ITEM || item?.item || JSON.stringify(item));
      prompt += `• ${text}\n`;
    });
  }
  
  // Add Indian context if style matches
  const styleLower = style?.toLowerCase() || '';
  for (const [key, elements] of Object.entries(INDIAN_CONTEXT_ELEMENTS)) {
    if (styleLower.includes(key.split('_')[0])) {
      prompt += `\n## Style-Specific Elements:\n`;
      elements.forEach(el => {
        prompt += `• ${el}\n`;
      });
      break;
    }
  }
  
  // Add custom requirements
  if (customRequirements) {
    prompt += `\n## Additional Requirements:\n${customRequirements}\n`;
  }
  
  // Add quality requirements
  prompt += `\n## Quality Requirements:\n`;
  template.qualityNotes.forEach(note => {
    prompt += `• ${note}\n`;
  });
  prompt += `• Photorealistic rendering with proper shadows and lighting\n`;
  prompt += `• Rich, layered details - NOT bare or sterile\n`;
  prompt += `• Every surface styled with purpose\n`;
  prompt += `• Professional interior photography quality\n`;
  
  return prompt;
}

// Build refinement prompt with detail preservation
export function buildRefinementPrompt(
  refinement: string,
  preserveDetails: boolean = true
): string {
  let prompt = refinement;
  
  if (preserveDetails) {
    prompt += `\n\n${DETAIL_PRESERVATION_INSTRUCTIONS}`;
  }
  
  return prompt;
}
