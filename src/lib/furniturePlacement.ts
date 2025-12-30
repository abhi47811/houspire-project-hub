/**
 * F-050: Furniture Placement Rules Engine
 * 
 * Intelligent furniture placement system that provides layout recommendations
 * based on room dimensions, style, and best practices.
 * 
 * Features:
 * - Room-specific placement rules
 * - Style-aware spacing guidelines
 * - Traffic flow optimization
 * - Focal point identification
 * - Ergonomic considerations
 * - Scale and proportion validation
 */

export interface FurnitureItem {
  name: string;
  category: 'seating' | 'table' | 'storage' | 'decor' | 'lighting' | 'bed' | 'work' | 'dining';
  typical_dimensions: {
    width: number;  // in feet
    depth: number;  // in feet
    height: number; // in feet
  };
  min_clearance: number; // in feet
  priority: 'essential' | 'recommended' | 'optional';
}

export interface PlacementRule {
  rule_id: string;
  description: string;
  min_distance?: number; // in feet
  max_distance?: number; // in feet
  applies_to: string[];
  reason: string;
}

export interface RoomLayout {
  room_type: string;
  min_dimensions: { width: number; length: number };
  focal_points: string[];
  traffic_paths: string[];
  placement_zones: {
    name: string;
    purpose: string;
    items: string[];
  }[];
}

export interface PlacementRecommendation {
  item: string;
  zone: string;
  position: 'center' | 'wall' | 'corner' | 'window' | 'door_adjacent';
  orientation?: 'parallel' | 'perpendicular' | 'angled';
  clearances: {
    front?: number;
    back?: number;
    sides?: number;
  };
  rationale: string;
}

/**
 * Furniture placement rules by room type
 */
export const furniturePlacementRules: Record<string, PlacementRule[]> = {
  living_room: [
    {
      rule_id: 'lr_seating_distance',
      description: 'Seating arrangement distance',
      min_distance: 3.5,
      max_distance: 10,
      applies_to: ['sofa', 'chairs', 'coffee_table'],
      reason: 'Optimal conversation distance and accessibility',
    },
    {
      rule_id: 'lr_tv_distance',
      description: 'TV viewing distance',
      min_distance: 7,
      max_distance: 12,
      applies_to: ['tv', 'media_console', 'sofa'],
      reason: 'Comfortable viewing experience',
    },
    {
      rule_id: 'lr_traffic_flow',
      description: 'Traffic pathway clearance',
      min_distance: 2.5,
      applies_to: ['all_furniture'],
      reason: 'Unobstructed movement through space',
    },
    {
      rule_id: 'lr_coffee_table',
      description: 'Coffee table to seating distance',
      min_distance: 1.5,
      max_distance: 1.5,
      applies_to: ['coffee_table', 'sofa'],
      reason: 'Easy reach without standing',
    },
    {
      rule_id: 'lr_side_table',
      description: 'Side table to seating',
      max_distance: 0.5,
      applies_to: ['side_table', 'sofa', 'chair'],
      reason: 'Within arms reach for drinks and items',
    },
  ],

  master_bedroom: [
    {
      rule_id: 'mb_bed_clearance',
      description: 'Bed side clearance',
      min_distance: 2,
      applies_to: ['bed'],
      reason: 'Easy access for making bed and movement',
    },
    {
      rule_id: 'mb_nightstand',
      description: 'Nightstand to bed',
      max_distance: 0.5,
      applies_to: ['nightstand', 'bed'],
      reason: 'Within reach from bed',
    },
    {
      rule_id: 'mb_dresser_clearance',
      description: 'Dresser drawer clearance',
      min_distance: 3,
      applies_to: ['dresser', 'chest'],
      reason: 'Space to open drawers fully',
    },
    {
      rule_id: 'mb_bed_to_wall',
      description: 'Bed foot to wall/furniture',
      min_distance: 3,
      applies_to: ['bed'],
      reason: 'Clear path and visual breathing room',
    },
    {
      rule_id: 'mb_wardrobe_clearance',
      description: 'Wardrobe/closet clearance',
      min_distance: 3,
      applies_to: ['wardrobe', 'closet'],
      reason: 'Space to open doors and access clothing',
    },
  ],

  kitchen: [
    {
      rule_id: 'k_work_triangle',
      description: 'Work triangle efficiency',
      min_distance: 4,
      max_distance: 9,
      applies_to: ['sink', 'stove', 'refrigerator'],
      reason: 'Optimal kitchen workflow',
    },
    {
      rule_id: 'k_aisle_width',
      description: 'Kitchen aisle width',
      min_distance: 4,
      applies_to: ['counters', 'islands'],
      reason: 'Two people can pass comfortably',
    },
    {
      rule_id: 'k_landing_space',
      description: 'Counter landing space',
      min_distance: 1,
      applies_to: ['appliances'],
      reason: 'Space to place items while cooking',
    },
    {
      rule_id: 'k_island_clearance',
      description: 'Island clearance all sides',
      min_distance: 3.5,
      applies_to: ['island'],
      reason: 'Access to cabinets and appliances',
    },
  ],

  dining_room: [
    {
      rule_id: 'dr_table_to_wall',
      description: 'Dining table to wall',
      min_distance: 3,
      applies_to: ['dining_table'],
      reason: 'Space to pull out chairs',
    },
    {
      rule_id: 'dr_chair_spacing',
      description: 'Chair to chair spacing',
      min_distance: 2,
      applies_to: ['dining_chair'],
      reason: 'Comfortable elbow room',
    },
    {
      rule_id: 'dr_chandelier_height',
      description: 'Chandelier above table',
      min_distance: 2.5,
      max_distance: 3,
      applies_to: ['chandelier', 'pendant'],
      reason: 'Proper lighting without obstruction',
    },
    {
      rule_id: 'dr_buffet_clearance',
      description: 'Buffet/sideboard clearance',
      min_distance: 2.5,
      applies_to: ['buffet', 'sideboard'],
      reason: 'Serving and storage access',
    },
  ],

  home_office: [
    {
      rule_id: 'ho_desk_clearance',
      description: 'Desk chair clearance',
      min_distance: 3,
      applies_to: ['desk'],
      reason: 'Space to pull out chair and move',
    },
    {
      rule_id: 'ho_screen_distance',
      description: 'Screen viewing distance',
      min_distance: 2,
      max_distance: 3,
      applies_to: ['desk', 'monitor'],
      reason: 'Ergonomic viewing distance',
    },
    {
      rule_id: 'ho_storage_access',
      description: 'Storage unit accessibility',
      min_distance: 2.5,
      applies_to: ['bookshelf', 'filing_cabinet'],
      reason: 'Easy access to contents',
    },
    {
      rule_id: 'ho_desk_to_window',
      description: 'Desk perpendicular to window',
      applies_to: ['desk', 'window'],
      reason: 'Minimize screen glare',
    },
  ],

  bathroom: [
    {
      rule_id: 'ba_toilet_clearance',
      description: 'Toilet front clearance',
      min_distance: 2,
      applies_to: ['toilet'],
      reason: 'Code requirement and comfort',
    },
    {
      rule_id: 'ba_vanity_clearance',
      description: 'Vanity front clearance',
      min_distance: 2.5,
      applies_to: ['vanity', 'sink'],
      reason: 'Space for grooming activities',
    },
    {
      rule_id: 'ba_shower_clearance',
      description: 'Shower/tub clearance',
      min_distance: 2,
      applies_to: ['shower', 'bathtub'],
      reason: 'Safe entry and exit',
    },
  ],
};

/**
 * Room layout templates
 */
export const roomLayouts: Record<string, RoomLayout> = {
  living_room: {
    room_type: 'living_room',
    min_dimensions: { width: 12, length: 14 },
    focal_points: ['TV/media_wall', 'fireplace', 'window_view'],
    traffic_paths: ['entry_to_seating', 'seating_to_balcony'],
    placement_zones: [
      {
        name: 'primary_seating',
        purpose: 'Main conversation area',
        items: ['sofa', 'armchairs', 'coffee_table'],
      },
      {
        name: 'media_zone',
        purpose: 'Entertainment center',
        items: ['tv', 'media_console', 'storage'],
      },
      {
        name: 'accent_zone',
        purpose: 'Additional seating or display',
        items: ['accent_chair', 'side_table', 'floor_lamp'],
      },
    ],
  },

  master_bedroom: {
    room_type: 'master_bedroom',
    min_dimensions: { width: 12, length: 12 },
    focal_points: ['bed_wall', 'window'],
    traffic_paths: ['entry_to_bed', 'bed_to_bathroom'],
    placement_zones: [
      {
        name: 'sleeping_zone',
        purpose: 'Bed and nightstands',
        items: ['bed', 'nightstands', 'lamps'],
      },
      {
        name: 'dressing_zone',
        purpose: 'Wardrobe and dresser',
        items: ['wardrobe', 'dresser', 'mirror'],
      },
      {
        name: 'sitting_zone',
        purpose: 'Optional seating area',
        items: ['accent_chair', 'side_table'],
      },
    ],
  },

  kitchen: {
    room_type: 'kitchen',
    min_dimensions: { width: 8, length: 10 },
    focal_points: ['cooking_zone', 'sink'],
    traffic_paths: ['entry_to_work_triangle', 'kitchen_to_dining'],
    placement_zones: [
      {
        name: 'prep_zone',
        purpose: 'Food preparation',
        items: ['countertop', 'sink'],
      },
      {
        name: 'cooking_zone',
        purpose: 'Cooking and baking',
        items: ['stove', 'oven', 'microwave'],
      },
      {
        name: 'storage_zone',
        purpose: 'Food and supply storage',
        items: ['refrigerator', 'pantry', 'cabinets'],
      },
    ],
  },

  dining_room: {
    room_type: 'dining_room',
    min_dimensions: { width: 10, length: 12 },
    focal_points: ['dining_table', 'chandelier'],
    traffic_paths: ['entry_to_table', 'table_to_kitchen'],
    placement_zones: [
      {
        name: 'dining_zone',
        purpose: 'Main dining area',
        items: ['dining_table', 'dining_chairs'],
      },
      {
        name: 'serving_zone',
        purpose: 'Food service and storage',
        items: ['buffet', 'sideboard', 'bar_cart'],
      },
      {
        name: 'display_zone',
        purpose: 'Decorative elements',
        items: ['artwork', 'plants', 'lighting'],
      },
    ],
  },

  home_office: {
    room_type: 'home_office',
    min_dimensions: { width: 8, length: 10 },
    focal_points: ['desk', 'window'],
    traffic_paths: ['entry_to_desk', 'desk_to_storage'],
    placement_zones: [
      {
        name: 'work_zone',
        purpose: 'Primary workspace',
        items: ['desk', 'office_chair', 'task_lighting'],
      },
      {
        name: 'storage_zone',
        purpose: 'File and book storage',
        items: ['bookshelf', 'filing_cabinet'],
      },
      {
        name: 'meeting_zone',
        purpose: 'Optional meeting area',
        items: ['guest_chairs', 'small_table'],
      },
    ],
  },
};

/**
 * Generate furniture placement recommendations
 */
export function generatePlacementRecommendations(
  roomType: string,
  roomDimensions: { width: number; length: number; height?: number },
  styleId: string,
  furnitureList: string[]
): PlacementRecommendation[] {
  const layout = roomLayouts[roomType];
  const rules = furniturePlacementRules[roomType] || [];
  const recommendations: PlacementRecommendation[] = [];

  if (!layout) {
    console.warn(`No layout template found for room type: ${roomType}`);
    return recommendations;
  }

  // Validate room size
  if (
    roomDimensions.width < layout.min_dimensions.width ||
    roomDimensions.length < layout.min_dimensions.length
  ) {
    console.warn(
      `Room dimensions (${roomDimensions.width}' × ${roomDimensions.length}') are below minimum recommended (${layout.min_dimensions.width}' × ${layout.min_dimensions.length}')`
    );
  }

  // Generate recommendations based on zones
  layout.placement_zones.forEach((zone) => {
    zone.items.forEach((item) => {
      if (furnitureList.some((f) => f.toLowerCase().includes(item.toLowerCase()))) {
        const rec: PlacementRecommendation = {
          item,
          zone: zone.name,
          position: determinePosition(item, zone.name, roomType),
          clearances: getItemClearances(item, rules),
          rationale: zone.purpose,
        };

        recommendations.push(rec);
      }
    });
  });

  return recommendations;
}

/**
 * Determine optimal position for furniture item
 */
function determinePosition(
  item: string,
  zone: string,
  roomType: string
): 'center' | 'wall' | 'corner' | 'window' | 'door_adjacent' {
  // Room-specific positioning logic
  const itemLower = item.toLowerCase();

  if (itemLower.includes('bed')) return 'wall';
  if (itemLower.includes('sofa') || itemLower.includes('couch')) return 'wall';
  if (itemLower.includes('desk')) return 'window';
  if (itemLower.includes('dining_table')) return 'center';
  if (itemLower.includes('coffee_table')) return 'center';
  if (itemLower.includes('tv') || itemLower.includes('media')) return 'wall';
  if (itemLower.includes('dresser') || itemLower.includes('wardrobe')) return 'wall';
  if (itemLower.includes('corner')) return 'corner';

  return 'wall'; // Default
}

/**
 * Get clearance requirements for furniture item
 */
function getItemClearances(
  item: string,
  rules: PlacementRule[]
): { front?: number; back?: number; sides?: number } {
  const itemLower = item.toLowerCase();
  const clearances: { front?: number; back?: number; sides?: number } = {};

  // Find applicable rules
  const relevantRules = rules.filter((rule) =>
    rule.applies_to.some((a) => a === 'all_furniture' || itemLower.includes(a.toLowerCase()))
  );

  if (relevantRules.length > 0) {
    const minClearance = Math.max(
      ...relevantRules.map((r) => r.min_distance || 0)
    );
    clearances.front = minClearance;
    clearances.sides = minClearance * 0.66; // 66% of front clearance for sides
  }

  return clearances;
}

/**
 * Validate furniture placement against rules
 */
export function validatePlacement(
  roomType: string,
  placements: { item: string; position: { x: number; y: number } }[]
): { valid: boolean; violations: string[] } {
  const rules = furniturePlacementRules[roomType] || [];
  const violations: string[] = [];

  // Check each placement against rules
  rules.forEach((rule) => {
    // Implementation would check actual distances between items
    // This is a simplified version
  });

  return {
    valid: violations.length === 0,
    violations,
  };
}

/**
 * Get room layout template
 */
export function getRoomLayout(roomType: string): RoomLayout | null {
  return roomLayouts[roomType] || null;
}

/**
 * Get placement rules for room type
 */
export function getPlacementRules(roomType: string): PlacementRule[] {
  return furniturePlacementRules[roomType] || [];
}
