/**
 * Pricing Utilities
 * City multipliers, GST rates, and price calculation functions
 * Updated with citywise pricing data from 27 Excel files (Jan 2026)
 */

// ============= CITY MULTIPLIERS (6 Major Cities with Citywise Data) =============
// These multipliers are now backed by 1,400+ city-specific prices in the database
export const CITY_MULTIPLIERS: Record<string, number> = {
  "Mumbai": 1.10,      // Most expensive - premium market
  "Pune": 1.08,        // Growing market premium
  "Bangalore": 1.05,   // IT hub premium
  "Delhi": 1.00,       // Base reference (Delhi/Gurgaon)
  "Chennai": 1.02,     // South India hub
  "Hyderabad": 0.97,   // Most affordable of metros
  "Kolkata": 0.95,     // East India base
  "Ahmedabad": 0.92,   // West India value
  "Jaipur": 0.90,      // North India value
  "Lucknow": 0.88,     // UP market
  "Surat": 0.85,       // Gujarat value market
};

// Cities with full citywise pricing data in database
export const CITIES_WITH_DATA = ["Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad", "Chennai"];

export const CITIES = Object.keys(CITY_MULTIPLIERS);

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
} as const;

export type BudgetTier = keyof typeof TIER_MULTIPLIERS;
export type City = keyof typeof CITY_MULTIPLIERS;

// ============= INTERFACES =============
export interface PricedItem {
  item: string;
  description: string;
  base_price: number;
  category: string;
  quantity?: number;
  area_sqft?: number;
}

export interface ItemPriceResult {
  item: string;
  description: string;
  category: string;
  basePrice: number;
  tierMultiplier: number;
  cityMultiplier: number;
  gstRate: number;
  subtotal: number;
  gstAmount: number;
  total: number;
  tier: BudgetTier;
  city: string;
}

export interface RoomCostSummary {
  tier: BudgetTier;
  city: string;
  items: ItemPriceResult[];
  subtotal: number;
  totalGst: number;
  grandTotal: number;
  itemCount: number;
}

// ============= CALCULATION FUNCTIONS =============

/**
 * Calculate price for a single item with city and tier adjustments
 */
export function calcItemPrice(
  item: PricedItem,
  city: City | string = "Pune",
  tier: BudgetTier = "Mid"
): ItemPriceResult {
  const basePrice = item.base_price || 0;
  const tierMult = TIER_MULTIPLIERS[tier] || 1.0;
  const cityMult = CITY_MULTIPLIERS[city] || 1.0;
  const gstRate = GST_RATES[item.category] || 0.18;
  
  const quantity = item.quantity || 1;
  const adjustedBase = basePrice * quantity;
  const subtotal = adjustedBase * tierMult * cityMult;
  const gstAmount = subtotal * gstRate;
  const total = subtotal + gstAmount;
  
  return {
    item: item.item,
    description: item.description,
    category: item.category,
    basePrice: adjustedBase,
    tierMultiplier: tierMult,
    cityMultiplier: cityMult,
    gstRate,
    subtotal: Math.round(subtotal),
    gstAmount: Math.round(gstAmount),
    total: Math.round(total),
    tier,
    city,
  };
}

/**
 * Calculate finishes cost for a room (per sqft pricing)
 */
export function calcFinishesCost(
  finishes: Array<{ type: string; value: string; price_per_sqft: number }>,
  areaSqft: number,
  city: City | string = "Pune",
  tier: BudgetTier = "Mid"
): { items: ItemPriceResult[]; total: number } {
  const cityMult = CITY_MULTIPLIERS[city] || 1.0;
  const tierMult = TIER_MULTIPLIERS[tier] || 1.0;
  
  const items: ItemPriceResult[] = finishes.map(finish => {
    const basePrice = (finish.price_per_sqft || 0) * areaSqft;
    const gstRate = GST_RATES[finish.type] || GST_RATES.flooring;
    const subtotal = basePrice * tierMult * cityMult;
    const gstAmount = subtotal * gstRate;
    
    return {
      item: finish.type,
      description: finish.value,
      category: finish.type,
      basePrice: Math.round(basePrice),
      tierMultiplier: tierMult,
      cityMultiplier: cityMult,
      gstRate,
      subtotal: Math.round(subtotal),
      gstAmount: Math.round(gstAmount),
      total: Math.round(subtotal + gstAmount),
      tier,
      city,
    };
  });
  
  const total = items.reduce((sum, item) => sum + item.total, 0);
  
  return { items, total };
}

/**
 * Calculate total room cost from smart defaults
 */
export function calcRoomCost(
  specifications: PricedItem[],
  city: City | string = "Pune",
  tier: BudgetTier = "Mid"
): RoomCostSummary {
  const items = specifications.map(spec => calcItemPrice(spec, city, tier));
  
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const totalGst = items.reduce((sum, item) => sum + item.gstAmount, 0);
  const grandTotal = items.reduce((sum, item) => sum + item.total, 0);
  
  return {
    tier,
    city,
    items,
    subtotal,
    totalGst,
    grandTotal,
    itemCount: items.length,
  };
}

/**
 * Calculate cost comparison across all tiers
 */
export function calcTierComparison(
  specifications: PricedItem[],
  city: City | string = "Pune"
): Record<BudgetTier, RoomCostSummary> {
  return {
    Premium: calcRoomCost(specifications, city, "Premium"),
    Mid: calcRoomCost(specifications, city, "Mid"),
    Budget: calcRoomCost(specifications, city, "Budget"),
  };
}

/**
 * Format currency in INR
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format compact currency (e.g., ₹1.2L)
 */
export function formatCompactINR(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)}Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }
  return `₹${amount}`;
}

/**
 * Get GST category display name
 */
export function getGstCategoryName(category: string): string {
  const rate = GST_RATES[category];
  if (rate === 0.18) return "18% GST";
  if (rate === 0.12) return "12% GST";
  if (rate === 0.05) return "5% GST";
  return `${Math.round(rate * 100)}% GST`;
}
