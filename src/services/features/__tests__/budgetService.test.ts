/**
 * Test Suite for Budget Service
 * 
 * Tests budget calculations, GST rates, city multipliers,
 * and multi-tier pricing logic.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  calculateItemCost,
  getCityMultiplier,
  getGSTRate,
  BUDGET_TIERS,
  CITY_MULTIPLIERS,
  GST_RATES,
} from '@/services/features/budgetService';

describe('BudgetService', () => {
  describe('getCityMultiplier', () => {
    it('should return correct multiplier for Mumbai', () => {
      expect(getCityMultiplier('Mumbai')).toBe(1.15);
    });

    it('should return correct multiplier for Delhi', () => {
      expect(getCityMultiplier('Delhi')).toBe(1.10);
    });

    it('should return default multiplier for unknown city', () => {
      expect(getCityMultiplier('Unknown City')).toBe(1.00);
    });

    it('should be case insensitive', () => {
      expect(getCityMultiplier('mumbai')).toBe(1.15);
      expect(getCityMultiplier('MUMBAI')).toBe(1.15);
    });
  });

  describe('getGSTRate', () => {
    it('should return 18% for furniture', () => {
      expect(getGSTRate('furniture')).toBe(0.18);
    });

    it('should return 12% for fabrics', () => {
      expect(getGSTRate('fabrics')).toBe(0.12);
    });

    it('should return 5% for raw_materials', () => {
      expect(getGSTRate('raw_materials')).toBe(0.05);
    });

    it('should return default 18% for unknown category', () => {
      expect(getGSTRate('unknown_category')).toBe(0.18);
    });
  });

  describe('calculateItemCost', () => {
    it('should calculate correct cost for premium tier in Mumbai', () => {
      const result = calculateItemCost(
        10000, // base cost
        'premium', // tier
        'Mumbai', // city
        'furniture', // category
        1 // quantity
      );

      // Expected: 10000 * 2.5 (premium) * 1.15 (Mumbai) = 28750
      expect(result.cost_before_gst).toBe(28750);
      
      // GST: 28750 * 0.18 = 5175
      expect(result.gst_amount).toBe(5175);
      
      // Total: 28750 + 5175 = 33925
      expect(result.total_cost).toBe(33925);
    });

    it('should calculate correct cost for budget tier in Pune', () => {
      const result = calculateItemCost(
        10000,
        'budget',
        'Pune',
        'fabrics',
        1
      );

      // Expected: 10000 * 0.5 (budget) * 1.0 (Pune) = 5000
      expect(result.cost_before_gst).toBe(5000);
      
      // GST: 5000 * 0.12 = 600
      expect(result.gst_amount).toBe(600);
      
      // Total: 5000 + 600 = 5600
      expect(result.total_cost).toBe(5600);
    });

    it('should handle multiple quantities correctly', () => {
      const result = calculateItemCost(
        1000,
        'mid_range',
        'Delhi',
        'hardware',
        5 // quantity
      );

      // Expected: 1000 * 1.0 (mid) * 1.10 (Delhi) * 5 (qty) = 5500
      expect(result.cost_before_gst).toBe(5500);
    });

    it('should round costs to nearest integer', () => {
      const result = calculateItemCost(
        1234.56,
        'premium',
        'Chennai',
        'lighting',
        1
      );

      // All costs should be integers
      expect(Number.isInteger(result.cost_before_gst)).toBe(true);
      expect(Number.isInteger(result.gst_amount)).toBe(true);
      expect(Number.isInteger(result.total_cost)).toBe(true);
    });
  });

  describe('BUDGET_TIERS', () => {
    it('should have correct tier multipliers', () => {
      expect(BUDGET_TIERS.premium).toBe(2.5);
      expect(BUDGET_TIERS.mid_range).toBe(1.0);
      expect(BUDGET_TIERS.budget).toBe(0.5);
    });
  });

  describe('CITY_MULTIPLIERS', () => {
    it('should have all 11 Indian cities', () => {
      const cities = [
        'mumbai', 'delhi', 'bangalore', 'pune', 'hyderabad',
        'chennai', 'kolkata', 'ahmedabad', 'jaipur', 'surat', 'lucknow'
      ];

      cities.forEach(city => {
        expect(CITY_MULTIPLIERS[city]).toBeDefined();
      });
    });

    it('should have tier 1 cities with highest multipliers', () => {
      expect(CITY_MULTIPLIERS.mumbai).toBeGreaterThan(1.0);
      expect(CITY_MULTIPLIERS.delhi).toBeGreaterThanOrEqual(1.1);
    });
  });

  describe('GST_RATES', () => {
    it('should have correct GST rates for all categories', () => {
      expect(GST_RATES.furniture).toBe(0.18);
      expect(GST_RATES.fabrics).toBe(0.12);
      expect(GST_RATES.raw_materials).toBe(0.05);
      expect(GST_RATES.hardware).toBe(0.18);
      expect(GST_RATES.plants).toBe(0.05);
    });
  });
});
