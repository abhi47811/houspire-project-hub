// Budget Calculator Service for Indian Interior Design
// Comprehensive pricing based on Indian market rates

export interface BudgetItem {
  id: string;
  category: string;
  item: string;
  quantity: number;
  unit: string;
  rate: number;
  amount: number;
  tier: 'basic' | 'standard' | 'premium' | 'luxury';
}

export interface BudgetEstimate {
  roomType: string;
  city: string;
  area: number; // in sq ft
  tier: 'basic' | 'standard' | 'premium' | 'luxury';
  items: BudgetItem[];
  subtotal: number;
  gst: number;
  total: number;
  breakdown: {
    [category: string]: number;
  };
}

// City-wise cost multipliers
const CITY_MULTIPLIERS: { [city: string]: number } = {
  Mumbai: 1.4,
  Delhi: 1.3,
  Bangalore: 1.25,
  Pune: 1.15,
  Hyderabad: 1.1,
  Chennai: 1.1,
  Kolkata: 1.05,
  Ahmedabad: 1.0,
  Jaipur: 0.95,
  Surat: 0.9,
  Lucknow: 0.85,
};

// Tier-wise multipliers
const TIER_MULTIPLIERS = {
  basic: 1.0,
  standard: 1.5,
  premium: 2.5,
  luxury: 4.0,
};

// Base rates per sq ft (in INR) for different categories
const BASE_RATES = {
  // Flooring
  flooring_basic: 120, // Vitrified tiles
  flooring_standard: 200, // Good quality tiles
  flooring_premium: 350, // Wooden/engineered
  flooring_luxury: 600, // Imported marble/wood

  // Walls
  walls_basic: 80, // Paint
  walls_standard: 150, // Texture/wallpaper
  walls_premium: 250, // Premium wallpaper
  walls_luxury: 450, // Imported wallpaper/panels

  // Ceiling
  ceiling_basic: 100, // POP false ceiling
  ceiling_standard: 180, // Gypsum with lights
  ceiling_premium: 300, // Designer ceiling
  ceiling_luxury: 500, // Premium designer ceiling

  // Electrical
  electrical_basic: 60, // Basic points
  electrical_standard: 100, // Good fittings
  electrical_premium: 180, // Premium fittings
  electrical_luxury: 300, // Smart home integration

  // Furniture (per item)
  furniture_bed: 25000,
  furniture_wardrobe: 35000,
  furniture_sofa: 40000,
  furniture_dining: 30000,
  furniture_coffee_table: 8000,
  furniture_tv_unit: 20000,
  furniture_bookshelf: 15000,
  furniture_study_table: 12000,
};

/**
 * Calculate budget for a room
 */
export function calculateRoomBudget(
  roomType: string,
  area: number,
  city: string = 'Hyderabad',
  tier: 'basic' | 'standard' | 'premium' | 'luxury' = 'standard'
): BudgetEstimate {
  const items: BudgetItem[] = [];
  const cityMultiplier = CITY_MULTIPLIERS[city] || 1.0;
  const tierMultiplier = TIER_MULTIPLIERS[tier];

  // Helper to add items
  const addItem = (
    category: string,
    item: string,
    quantity: number,
    unit: string,
    baseRate: number
  ) => {
    const rate = Math.round(baseRate * cityMultiplier * tierMultiplier);
    const amount = rate * quantity;
    items.push({
      id: `${category}-${item}`.toLowerCase().replace(/\s+/g, '-'),
      category,
      item,
      quantity,
      unit,
      rate,
      amount,
      tier,
    });
  };

  // Room-specific calculations
  switch (roomType.toLowerCase()) {
    case 'living_room':
    case 'living room':
      addItem('Flooring', 'Flooring Work', area, 'sq ft', BASE_RATES[`flooring_${tier}`]);
      addItem('Walls', 'Wall Finishing', area * 2.5, 'sq ft', BASE_RATES[`walls_${tier}`]);
      addItem('Ceiling', 'False Ceiling', area, 'sq ft', BASE_RATES[`ceiling_${tier}`]);
      addItem('Electrical', 'Electrical Points', area, 'sq ft', BASE_RATES[`electrical_${tier}`]);
      addItem('Furniture', 'Sofa Set', 1, 'set', BASE_RATES.furniture_sofa * tierMultiplier);
      addItem('Furniture', 'TV Unit', 1, 'unit', BASE_RATES.furniture_tv_unit * tierMultiplier);
      addItem('Furniture', 'Coffee Table', 1, 'unit', BASE_RATES.furniture_coffee_table * tierMultiplier);
      break;

    case 'master_bedroom':
    case 'master bedroom':
    case 'bedroom':
      addItem('Flooring', 'Flooring Work', area, 'sq ft', BASE_RATES[`flooring_${tier}`]);
      addItem('Walls', 'Wall Finishing', area * 2.5, 'sq ft', BASE_RATES[`walls_${tier}`]);
      addItem('Ceiling', 'False Ceiling', area, 'sq ft', BASE_RATES[`ceiling_${tier}`]);
      addItem('Electrical', 'Electrical Points', area, 'sq ft', BASE_RATES[`electrical_${tier}`]);
      addItem('Furniture', 'King Size Bed', 1, 'unit', BASE_RATES.furniture_bed * tierMultiplier);
      addItem('Furniture', 'Wardrobe', 1, 'unit', BASE_RATES.furniture_wardrobe * tierMultiplier);
      addItem('Furniture', 'Study Table', 1, 'unit', BASE_RATES.furniture_study_table * tierMultiplier);
      break;

    case 'kitchen':
      addItem('Flooring', 'Anti-skid Tiles', area, 'sq ft', BASE_RATES[`flooring_${tier}`] * 0.8);
      addItem('Walls', 'Kitchen Tiles/Backsplash', area * 1.5, 'sq ft', BASE_RATES[`walls_${tier}`] * 0.9);
      addItem('Modular Kitchen', 'Base Cabinets', area * 0.4, 'sq ft', 1200 * tierMultiplier);
      addItem('Modular Kitchen', 'Wall Cabinets', area * 0.3, 'sq ft', 1000 * tierMultiplier);
      addItem('Modular Kitchen', 'Countertop', area * 0.2, 'sq ft', 800 * tierMultiplier);
      addItem('Appliances', 'Chimney + Hob', 1, 'set', 35000 * tierMultiplier);
      addItem('Appliances', 'Sink + Faucet', 1, 'set', 15000 * tierMultiplier);
      break;

    case 'dining_room':
    case 'dining room':
      addItem('Flooring', 'Flooring Work', area, 'sq ft', BASE_RATES[`flooring_${tier}`]);
      addItem('Walls', 'Wall Finishing', area * 2.5, 'sq ft', BASE_RATES[`walls_${tier}`]);
      addItem('Ceiling', 'False Ceiling', area, 'sq ft', BASE_RATES[`ceiling_${tier}`]);
      addItem('Furniture', 'Dining Table Set', 1, 'set', BASE_RATES.furniture_dining * tierMultiplier);
      addItem('Furniture', 'Crockery Unit', 1, 'unit', 25000 * tierMultiplier);
      break;

    case 'home_office':
    case 'study_room':
      addItem('Flooring', 'Flooring Work', area, 'sq ft', BASE_RATES[`flooring_${tier}`]);
      addItem('Walls', 'Wall Finishing', area * 2.5, 'sq ft', BASE_RATES[`walls_${tier}`]);
      addItem('Ceiling', 'False Ceiling', area, 'sq ft', BASE_RATES[`ceiling_${tier}`]);
      addItem('Electrical', 'Electrical Points', area, 'sq ft', BASE_RATES[`electrical_${tier}`]);
      addItem('Furniture', 'Study Table', 1, 'unit', BASE_RATES.furniture_study_table * tierMultiplier);
      addItem('Furniture', 'Bookshelf', 1, 'unit', BASE_RATES.furniture_bookshelf * tierMultiplier);
      addItem('Furniture', 'Office Chair', 1, 'unit', 15000 * tierMultiplier);
      break;

    default:
      // Generic room
      addItem('Flooring', 'Flooring Work', area, 'sq ft', BASE_RATES[`flooring_${tier}`]);
      addItem('Walls', 'Wall Finishing', area * 2.5, 'sq ft', BASE_RATES[`walls_${tier}`]);
      addItem('Ceiling', 'False Ceiling', area, 'sq ft', BASE_RATES[`ceiling_${tier}`]);
      addItem('Electrical', 'Electrical Points', area, 'sq ft', BASE_RATES[`electrical_${tier}`]);
  }

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const gst = Math.round(subtotal * 0.18); // 18% GST in India
  const total = subtotal + gst;

  // Calculate category breakdown
  const breakdown: { [category: string]: number } = {};
  items.forEach((item) => {
    breakdown[item.category] = (breakdown[item.category] || 0) + item.amount;
  });

  return {
    roomType,
    city,
    area,
    tier,
    items,
    subtotal,
    gst,
    total,
    breakdown,
  };
}

/**
 * Calculate budget for entire project
 */
export function calculateProjectBudget(rooms: Array<{
  roomType: string;
  area: number;
}>, city: string, tier: 'basic' | 'standard' | 'premium' | 'luxury'): {
  roomBudgets: BudgetEstimate[];
  total: number;
  totalBeforeGST: number;
  totalGST: number;
} {
  const roomBudgets = rooms.map(room => calculateRoomBudget(room.roomType, room.area, city, tier));
  
  const totalBeforeGST = roomBudgets.reduce((sum, budget) => sum + budget.subtotal, 0);
  const totalGST = roomBudgets.reduce((sum, budget) => sum + budget.gst, 0);
  const total = totalBeforeGST + totalGST;

  return {
    roomBudgets,
    total,
    totalBeforeGST,
    totalGST,
  };
}

/**
 * Format currency in Indian format
 */
export function formatIndianCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Get price range description
 */
export function getPriceRangeDescription(tier: string): string {
  switch (tier) {
    case 'basic':
      return 'Budget-friendly with essential features';
    case 'standard':
      return 'Good quality with balanced features';
    case 'premium':
      return 'High-end with premium materials';
    case 'luxury':
      return 'Top-tier with luxury finishes';
    default:
      return '';
  }
}

/**
 * Estimate per sq ft cost
 */
export function estimatePerSqFtCost(
  roomType: string,
  tier: 'basic' | 'standard' | 'premium' | 'luxury',
  city: string = 'Hyderabad'
): { min: number; max: number } {
  const cityMultiplier = CITY_MULTIPLIERS[city] || 1.0;
  const tierMultiplier = TIER_MULTIPLIERS[tier];

  let baseMin = 500;
  let baseMax = 800;

  switch (roomType.toLowerCase()) {
    case 'kitchen':
      baseMin = 1200;
      baseMax = 1800;
      break;
    case 'bathroom':
      baseMin = 1000;
      baseMax = 1500;
      break;
    case 'living_room':
    case 'bedroom':
      baseMin = 600;
      baseMax = 1000;
      break;
  }

  return {
    min: Math.round(baseMin * cityMultiplier * tierMultiplier),
    max: Math.round(baseMax * cityMultiplier * tierMultiplier),
  };
}
