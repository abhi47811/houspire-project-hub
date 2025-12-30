/**
 * F-069 to F-073: Budget Automation System
 * 
 * Comprehensive cost estimation and budget management for interior design projects.
 * Handles 3-tier pricing (Premium/Mid-Range/Budget), city multipliers, GST rates,
 * and automatic budget calculations based on smart defaults and selections.
 * 
 * Features:
 * - F-069: Multi-tier pricing (Premium 2.5x, Mid-Range 1.0x, Budget 0.5x)
 * - F-070: City-specific cost adjustments (11 Indian cities)
 * - F-071: GST rate application by category
 * - F-072: Automatic budget calculations
 * - F-073: Budget breakdown and reporting
 */

import { supabase } from '@/integrations/supabase/client';

/**
 * Budget tier multipliers
 */
export const BUDGET_TIERS = {
  premium: 2.5,
  mid_range: 1.0,
  budget: 0.5,
} as const;

export type BudgetTier = keyof typeof BUDGET_TIERS;

/**
 * City-specific price multipliers (11 Indian cities)
 */
export const CITY_MULTIPLIERS: Record<string, number> = {
  mumbai: 1.15,
  delhi: 1.10,
  bangalore: 1.10,
  bengaluru: 1.10, // Alias
  pune: 1.00,
  hyderabad: 0.95,
  chennai: 0.95,
  kolkata: 0.90,
  ahmedabad: 0.90,
  jaipur: 0.85,
  surat: 0.85,
  lucknow: 0.85,
  // Default for unlisted cities
  default: 1.00,
};

/**
 * GST rates by item category
 */
export const GST_RATES: Record<string, number> = {
  furniture: 0.18, // 18%
  fabrics: 0.12, // 12%
  raw_materials: 0.05, // 5%
  installation: 0.18, // 18%
  hardware: 0.18, // 18%
  appliances: 0.18, // 18%
  lighting: 0.18, // 18%
  flooring: 0.18, // 18%
  paint: 0.18, // 18%
  wallpaper: 0.12, // 12%
  accessories: 0.18, // 18%
  plants: 0.05, // 5%
  artwork: 0.12, // 12%
};

/**
 * Base cost estimates by room type (in INR per sq ft)
 */
export const BASE_COSTS_PER_SQFT: Record<string, number> = {
  living_room: 1800,
  master_bedroom: 1600,
  guest_bedroom: 1400,
  kids_room: 1500,
  nursery: 1500,
  kitchen: 2200,
  dining_room: 1600,
  home_office: 1700,
  bathroom: 2000,
  pooja_room: 1500,
  foyer: 1400,
  balcony: 1200,
  wardrobe: 1800,
  study: 1700,
  default: 1600,
};

/**
 * Budget item interface
 */
export interface BudgetItem {
  id: string;
  category: string;
  item_name: string;
  quantity: number;
  unit: string;
  base_cost: number; // Before multipliers
  tier_multiplier: number;
  city_multiplier: number;
  cost_before_gst: number;
  gst_rate: number;
  gst_amount: number;
  total_cost: number;
  priority: 'essential' | 'recommended' | 'optional';
  notes?: string;
}

/**
 * Budget summary interface
 */
export interface BudgetSummary {
  room_id: string;
  room_type: string;
  room_area: number; // in sq ft
  budget_tier: BudgetTier;
  city: string;
  
  // Cost breakdown
  subtotal: number; // Before GST
  total_gst: number;
  total_cost: number; // After GST
  
  // Cost per category
  by_category: Record<string, number>;
  
  // Item count by priority
  essential_items: number;
  recommended_items: number;
  optional_items: number;
  
  // Items list
  items: BudgetItem[];
  
  // Metadata
  created_at: string;
  updated_at: string;
}

/**
 * Calculate city multiplier
 */
export function getCityMultiplier(city: string): number {
  const cityLower = city.toLowerCase().trim();
  return CITY_MULTIPLIERS[cityLower] || CITY_MULTIPLIERS.default;
}

/**
 * Calculate GST for category
 */
export function getGSTRate(category: string): number {
  const categoryLower = category.toLowerCase().trim();
  return GST_RATES[categoryLower] || 0.18; // Default 18%
}

/**
 * Calculate budget item cost
 */
export function calculateItemCost(
  baseCost: number,
  tier: BudgetTier,
  city: string,
  category: string,
  quantity: number = 1
): {
  cost_before_gst: number;
  gst_amount: number;
  total_cost: number;
} {
  const tierMultiplier = BUDGET_TIERS[tier];
  const cityMultiplier = getCityMultiplier(city);
  const gstRate = getGSTRate(category);

  const costBeforeGST = baseCost * tierMultiplier * cityMultiplier * quantity;
  const gstAmount = costBeforeGST * gstRate;
  const totalCost = costBeforeGST + gstAmount;

  return {
    cost_before_gst: Math.round(costBeforeGST),
    gst_amount: Math.round(gstAmount),
    total_cost: Math.round(totalCost),
  };
}

/**
 * Generate budget from smart defaults
 */
export async function generateBudgetFromSmartDefaults(
  roomId: string,
  smartDefaultId: string,
  tier: BudgetTier,
  city: string,
  roomArea: number
): Promise<BudgetSummary> {
  try {
    // Fetch smart defaults data
    const { data: smartDefault, error } = await supabase
      .from('smart_defaults')
      .select('*')
      .eq('id', smartDefaultId)
      .single();

    if (error) throw error;
    if (!smartDefault) throw new Error('Smart default not found');

    const items: BudgetItem[] = [];

    // Parse specifications and create budget items
    const specifications = smartDefault.specifications || [];
    specifications.forEach((spec: any, idx: number) => {
      const itemName = spec.item || spec.ITEM || 'Unknown Item';
      const category = categorizeItem(itemName);
      const baseCost = estimateBaseCost(itemName, category, roomArea);
      const quantity = spec.quantity || 1;

      const costs = calculateItemCost(baseCost, tier, city, category, quantity);

      items.push({
        id: `item-${idx}`,
        category,
        item_name: itemName,
        quantity,
        unit: spec.unit || 'unit',
        base_cost: baseCost,
        tier_multiplier: BUDGET_TIERS[tier],
        city_multiplier: getCityMultiplier(city),
        cost_before_gst: costs.cost_before_gst,
        gst_rate: getGSTRate(category),
        gst_amount: costs.gst_amount,
        total_cost: costs.total_cost,
        priority: spec.priority || 'recommended',
        notes: spec.description,
      });
    });

    // Calculate summary
    const subtotal = items.reduce((sum, item) => sum + item.cost_before_gst, 0);
    const totalGST = items.reduce((sum, item) => sum + item.gst_amount, 0);
    const totalCost = items.reduce((sum, item) => sum + item.total_cost, 0);

    // Calculate by category
    const byCategory: Record<string, number> = {};
    items.forEach((item) => {
      if (!byCategory[item.category]) {
        byCategory[item.category] = 0;
      }
      byCategory[item.category] += item.total_cost;
    });

    // Count by priority
    const essentialItems = items.filter((i) => i.priority === 'essential').length;
    const recommendedItems = items.filter((i) => i.priority === 'recommended').length;
    const optionalItems = items.filter((i) => i.priority === 'optional').length;

    const summary: BudgetSummary = {
      room_id: roomId,
      room_type: smartDefault.room_type,
      room_area: roomArea,
      budget_tier: tier,
      city,
      subtotal,
      total_gst: totalGST,
      total_cost: totalCost,
      by_category: byCategory,
      essential_items: essentialItems,
      recommended_items: recommendedItems,
      optional_items: optionalItems,
      items,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    return summary;
  } catch (error) {
    console.error('Error generating budget:', error);
    throw error;
  }
}

/**
 * Categorize item by name
 */
function categorizeItem(itemName: string): string {
  const nameLower = itemName.toLowerCase();

  if (nameLower.includes('sofa') || nameLower.includes('chair') || nameLower.includes('table') || nameLower.includes('bed')) {
    return 'furniture';
  }
  if (nameLower.includes('curtain') || nameLower.includes('cushion') || nameLower.includes('rug')) {
    return 'fabrics';
  }
  if (nameLower.includes('light') || nameLower.includes('lamp') || nameLower.includes('chandelier')) {
    return 'lighting';
  }
  if (nameLower.includes('flooring') || nameLower.includes('tile') || nameLower.includes('wood')) {
    return 'flooring';
  }
  if (nameLower.includes('paint') || nameLower.includes('wall finish')) {
    return 'paint';
  }
  if (nameLower.includes('hardware') || nameLower.includes('hinge') || nameLower.includes('handle')) {
    return 'hardware';
  }
  if (nameLower.includes('appliance') || nameLower.includes('oven') || nameLower.includes('refrigerator')) {
    return 'appliances';
  }
  if (nameLower.includes('plant') || nameLower.includes('planter')) {
    return 'plants';
  }
  if (nameLower.includes('art') || nameLower.includes('painting') || nameLower.includes('frame')) {
    return 'artwork';
  }

  return 'accessories'; // Default
}

/**
 * Estimate base cost for item
 */
function estimateBaseCost(itemName: string, category: string, roomArea: number): number {
  const nameLower = itemName.toLowerCase();

  // Furniture
  if (category === 'furniture') {
    if (nameLower.includes('sofa') || nameLower.includes('sectional')) return 45000;
    if (nameLower.includes('bed')) return 35000;
    if (nameLower.includes('dining table')) return 30000;
    if (nameLower.includes('coffee table')) return 12000;
    if (nameLower.includes('side table')) return 6000;
    if (nameLower.includes('chair')) return 8000;
    if (nameLower.includes('desk')) return 20000;
    if (nameLower.includes('wardrobe')) return 50000;
    if (nameLower.includes('dresser')) return 25000;
    return 15000; // Default furniture
  }

  // Lighting
  if (category === 'lighting') {
    if (nameLower.includes('chandelier')) return 15000;
    if (nameLower.includes('pendant')) return 5000;
    if (nameLower.includes('floor lamp')) return 4000;
    if (nameLower.includes('table lamp')) return 2500;
    return 3000; // Default lighting
  }

  // Fabrics
  if (category === 'fabrics') {
    if (nameLower.includes('curtain')) return 8000;
    if (nameLower.includes('rug')) return 12000;
    if (nameLower.includes('cushion')) return 1500;
    return 3000; // Default fabric
  }

  // Flooring (per sq ft cost)
  if (category === 'flooring') {
    return roomArea * 150; // ₹150 per sq ft average
  }

  // Paint (per sq ft cost)
  if (category === 'paint') {
    const wallArea = roomArea * 3; // Approximate wall area
    return wallArea * 45; // ₹45 per sq ft including labor
  }

  // Default estimates
  const defaults: Record<string, number> = {
    hardware: 500,
    appliances: 25000,
    accessories: 3000,
    plants: 1500,
    artwork: 5000,
  };

  return defaults[category] || 5000;
}

/**
 * Save budget to database
 */
export async function saveBudget(budget: BudgetSummary): Promise<void> {
  try {
    const { error } = await supabase.from('budgets').upsert({
      room_id: budget.room_id,
      budget_tier: budget.budget_tier,
      city: budget.city,
      subtotal: budget.subtotal,
      total_gst: budget.total_gst,
      total_cost: budget.total_cost,
      items: budget.items,
      by_category: budget.by_category,
      updated_at: new Date().toISOString(),
    });

    if (error) throw error;
  } catch (error) {
    console.error('Error saving budget:', error);
    throw error;
  }
}

/**
 * Get budget for room
 */
export async function getBudget(roomId: string): Promise<BudgetSummary | null> {
  try {
    const { data, error } = await supabase
      .from('budgets')
      .select('*')
      .eq('room_id', roomId)
      .single();

    if (error) throw error;
    return data as BudgetSummary;
  } catch (error) {
    console.error('Error fetching budget:', error);
    return null;
  }
}

/**
 * Calculate budget comparison (different tiers)
 */
export function compareBudgetTiers(
  baseCost: number,
  city: string,
  category: string
): Record<BudgetTier, { cost_before_gst: number; total_cost: number }> {
  const tiers: BudgetTier[] = ['budget', 'mid_range', 'premium'];
  const comparison: any = {};

  tiers.forEach((tier) => {
    const costs = calculateItemCost(baseCost, tier, city, category);
    comparison[tier] = {
      cost_before_gst: costs.cost_before_gst,
      total_cost: costs.total_cost,
    };
  });

  return comparison;
}
