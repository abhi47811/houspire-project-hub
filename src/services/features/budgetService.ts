/**
 * F-069 to F-073: Budget Automation System
 * 
 * Cost estimation and budget management for interior design projects.
 * Uses budget_items table for storage.
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
 * City-specific price multipliers
 */
export const CITY_MULTIPLIERS: Record<string, number> = {
  mumbai: 1.15,
  delhi: 1.10,
  bangalore: 1.10,
  bengaluru: 1.10,
  pune: 1.00,
  hyderabad: 0.95,
  chennai: 0.95,
  kolkata: 0.90,
  ahmedabad: 0.90,
  jaipur: 0.85,
  surat: 0.85,
  lucknow: 0.85,
  default: 1.00,
};

/**
 * GST rates by item category
 */
export const GST_RATES: Record<string, number> = {
  furniture: 0.18,
  fabrics: 0.12,
  raw_materials: 0.05,
  installation: 0.18,
  hardware: 0.18,
  appliances: 0.18,
  lighting: 0.18,
  flooring: 0.18,
  paint: 0.18,
  wallpaper: 0.12,
  accessories: 0.18,
  plants: 0.05,
  artwork: 0.12,
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
 * Budget item interface - matches the actual budget_items table schema
 */
export interface BudgetItem {
  id: string;
  category: string;
  item_name: string;
  quantity: number;
  unit: string;
  rate: number;
  amount: number;
  gst_percent: number;
  gst_amount: number;
  total: number;
  specification?: string;
  // Optional fields for display/calculations
  base_cost?: number;
  tier_multiplier?: number;
  city_multiplier?: number;
  cost_before_gst?: number;
  gst_rate?: number;
  total_cost?: number;
  priority?: 'essential' | 'recommended' | 'optional';
}

/**
 * Budget summary interface
 */
export interface BudgetSummary {
  project_id: string;
  room_id?: string;
  room_type?: string;
  room_area?: number;
  budget_tier: BudgetTier;
  city: string;
  subtotal: number;
  total_gst: number;
  total_cost: number;
  by_category: Record<string, number>;
  items: BudgetItem[];
  essential_items?: number;
  recommended_items?: number;
  optional_items?: number;
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
  return GST_RATES[categoryLower] || 0.18;
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
  rate: number;
  amount: number;
  cost_before_gst: number;
  gst_amount: number;
  total: number;
  total_cost: number;
} {
  const tierMultiplier = BUDGET_TIERS[tier];
  const cityMultiplier = getCityMultiplier(city);
  const gstRate = getGSTRate(category);

  const rate = Math.round(baseCost * tierMultiplier * cityMultiplier);
  const amount = rate * quantity;
  const gstAmount = Math.round(amount * gstRate);
  const total = amount + gstAmount;

  return {
    rate,
    amount,
    cost_before_gst: amount,
    gst_amount: gstAmount,
    total,
    total_cost: total,
  };
}

/**
 * Generate budget from smart defaults
 */
export async function generateBudgetFromSmartDefaults(
  projectId: string,
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
    const specifications = (smartDefault.specifications as any[]) || [];
    specifications.forEach((spec: any, idx: number) => {
      const itemName = spec.item || spec.ITEM || 'Unknown Item';
      const category = categorizeItem(itemName);
      const baseCost = estimateBaseCost(itemName, category, roomArea);
      const quantity = spec.quantity || 1;
      const priority = spec.priority || 'recommended';

      const costs = calculateItemCost(baseCost, tier, city, category, quantity);

      items.push({
        id: `item-${idx}`,
        category,
        item_name: itemName,
        quantity,
        unit: spec.unit || 'unit',
        rate: costs.rate,
        amount: costs.amount,
        gst_percent: getGSTRate(category) * 100,
        gst_amount: costs.gst_amount,
        total: costs.total,
        specification: spec.description,
        // Extended fields
        base_cost: baseCost,
        tier_multiplier: BUDGET_TIERS[tier],
        city_multiplier: getCityMultiplier(city),
        cost_before_gst: costs.amount,
        gst_rate: getGSTRate(category),
        total_cost: costs.total,
        priority,
      });
    });

    // Calculate summary
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const totalGST = items.reduce((sum, item) => sum + item.gst_amount, 0);
    const totalCost = items.reduce((sum, item) => sum + item.total, 0);

    // Calculate by category
    const byCategory: Record<string, number> = {};
    items.forEach((item) => {
      if (!byCategory[item.category]) {
        byCategory[item.category] = 0;
      }
      byCategory[item.category] += item.total;
    });

    // Count by priority
    const essentialItems = items.filter((i) => i.priority === 'essential').length;
    const recommendedItems = items.filter((i) => i.priority === 'recommended').length;
    const optionalItems = items.filter((i) => i.priority === 'optional').length;

    return {
      project_id: projectId,
      room_id: roomId,
      room_type: smartDefault.room_type,
      room_area: roomArea,
      budget_tier: tier,
      city,
      subtotal,
      total_gst: totalGST,
      total_cost: totalCost,
      by_category: byCategory,
      items,
      essential_items: essentialItems,
      recommended_items: recommendedItems,
      optional_items: optionalItems,
    };
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

  return 'accessories';
}

/**
 * Estimate base cost for item
 */
function estimateBaseCost(itemName: string, category: string, roomArea: number): number {
  const nameLower = itemName.toLowerCase();

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
    return 15000;
  }

  if (category === 'lighting') {
    if (nameLower.includes('chandelier')) return 15000;
    if (nameLower.includes('pendant')) return 5000;
    if (nameLower.includes('floor lamp')) return 4000;
    if (nameLower.includes('table lamp')) return 2500;
    return 3000;
  }

  if (category === 'fabrics') {
    if (nameLower.includes('curtain')) return 8000;
    if (nameLower.includes('rug')) return 12000;
    if (nameLower.includes('cushion')) return 1500;
    return 3000;
  }

  if (category === 'flooring') {
    return roomArea * 150;
  }

  if (category === 'paint') {
    const wallArea = roomArea * 3;
    return wallArea * 45;
  }

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
 * Save budget items to database
 */
export async function saveBudgetItems(
  projectId: string,
  roomId: string | null,
  items: BudgetItem[]
): Promise<void> {
  try {
    // Delete existing items for this project/room
    let deleteQuery = supabase
      .from('budget_items')
      .delete()
      .eq('project_id', projectId);
    
    if (roomId) {
      deleteQuery = deleteQuery.eq('room_id', roomId);
    }
    
    await deleteQuery;

    // Insert new items
    const budgetItems = items.map((item, idx) => ({
      project_id: projectId,
      room_id: roomId,
      category: item.category,
      item_name: item.item_name,
      quantity: item.quantity,
      unit: item.unit,
      rate: item.rate,
      amount: item.amount,
      gst_percent: item.gst_percent,
      gst_amount: item.gst_amount,
      total: item.total,
      specification: item.specification,
      sort_order: idx,
      status: 'pending',
    }));

    const { error } = await supabase
      .from('budget_items')
      .insert(budgetItems);

    if (error) throw error;
  } catch (error) {
    console.error('Error saving budget items:', error);
    throw error;
  }
}

/**
 * Save budget summary (wrapper for saveBudgetItems)
 */
export async function saveBudget(budget: BudgetSummary): Promise<void> {
  await saveBudgetItems(budget.project_id, budget.room_id || null, budget.items);
}

/**
 * Get budget items for project and construct summary
 */
export async function getBudget(
  projectId: string,
  roomId?: string
): Promise<BudgetSummary | null> {
  try {
    let query = supabase
      .from('budget_items')
      .select('*')
      .eq('project_id', projectId)
      .order('sort_order');

    if (roomId) {
      query = query.eq('room_id', roomId);
    }

    const { data, error } = await query;

    if (error) throw error;
    if (!data || data.length === 0) return null;

    const items: BudgetItem[] = data.map(item => ({
      id: item.id,
      category: item.category,
      item_name: item.item_name,
      quantity: item.quantity,
      unit: item.unit,
      rate: item.rate,
      amount: item.amount || 0,
      gst_percent: item.gst_percent,
      gst_amount: item.gst_amount || 0,
      total: item.total || 0,
      specification: item.specification || undefined,
      total_cost: item.total || 0,
      priority: 'recommended',
    }));

    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const totalGST = items.reduce((sum, item) => sum + item.gst_amount, 0);
    const totalCost = items.reduce((sum, item) => sum + item.total, 0);

    const byCategory: Record<string, number> = {};
    items.forEach((item) => {
      if (!byCategory[item.category]) {
        byCategory[item.category] = 0;
      }
      byCategory[item.category] += item.total;
    });

    return {
      project_id: projectId,
      room_id: roomId,
      budget_tier: 'mid_range',
      city: 'default',
      subtotal,
      total_gst: totalGST,
      total_cost: totalCost,
      by_category: byCategory,
      items,
    };
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
): Record<BudgetTier, { amount: number; total: number; cost_before_gst: number; total_cost: number }> {
  const tiers: BudgetTier[] = ['budget', 'mid_range', 'premium'];
  const comparison: Record<BudgetTier, { amount: number; total: number; cost_before_gst: number; total_cost: number }> = {} as any;

  tiers.forEach((tier) => {
    const costs = calculateItemCost(baseCost, tier, city, category);
    comparison[tier] = {
      amount: costs.amount,
      total: costs.total,
      cost_before_gst: costs.cost_before_gst,
      total_cost: costs.total_cost,
    };
  });

  return comparison;
}
