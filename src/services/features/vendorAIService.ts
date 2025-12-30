/**
 * F-079 to F-084: Vendor AI System
 * 
 * Intelligent vendor recommendation and material sourcing system.
 * Helps users find the right vendors and materials for their projects
 * based on location, budget, quality requirements, and availability.
 * 
 * Features:
 * - F-079: Vendor recommendation engine
 * - F-080: Material sourcing suggestions
 * - F-081: Price comparison across vendors
 * - F-082: Availability checking
 * - F-083: Quality ratings and reviews
 * - F-084: Direct vendor contact integration
 */

export interface Vendor {
  id: string;
  name: string;
  category: string[];
  location: {
    city: string;
    area?: string;
    address?: string;
  };
  contact: {
    phone: string;
    email?: string;
    website?: string;
  };
  ratings: {
    overall: number; // 0-5
    quality: number;
    pricing: number;
    reliability: number;
    customer_service: number;
    review_count: number;
  };
  specialties: string[];
  price_range: 'budget' | 'mid_range' | 'premium';
  certifications?: string[];
  years_in_business: number;
  min_order_value?: number;
  delivery_available: boolean;
  installation_available: boolean;
}

export interface Material {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  description: string;
  specifications: {
    dimensions?: string;
    material_type: string;
    finish?: string;
    color?: string;
    brand?: string;
  };
  pricing: {
    unit: string;
    base_price: number;
    gst_rate: number;
    moq?: number; // Minimum order quantity
  };
  availability: {
    in_stock: boolean;
    lead_time_days?: number;
    stock_location?: string;
  };
  vendor_id: string;
  images?: string[];
  quality_grade: 'A' | 'B' | 'C';
}

export interface VendorRecommendation {
  vendor: Vendor;
  match_score: number; // 0-100
  reasons: string[];
  estimated_cost: number;
  materials_available: Material[];
}

export interface MaterialSuggestion {
  material: Material;
  vendor: Vendor;
  relevance_score: number;
  alternative_count: number;
  price_comparison: {
    lowest_price: number;
    average_price: number;
    highest_price: number;
    this_price: number;
  };
}

/**
 * Vendor database (mock data - in production, this would be from a real database)
 */
const VENDOR_DATABASE: Vendor[] = [
  {
    id: 'v1',
    name: 'Premium Interiors Pvt Ltd',
    category: ['furniture', 'fixtures', 'lighting'],
    location: { city: 'Mumbai', area: 'Andheri' },
    contact: { phone: '+91-98765-43210', email: 'contact@premiuminteriors.com' },
    ratings: { overall: 4.5, quality: 4.7, pricing: 4.2, reliability: 4.6, customer_service: 4.4, review_count: 142 },
    specialties: ['Custom Furniture', 'Designer Lighting', 'Premium Fixtures'],
    price_range: 'premium',
    certifications: ['ISO 9001', 'Green Building Certified'],
    years_in_business: 15,
    delivery_available: true,
    installation_available: true,
  },
  {
    id: 'v2',
    name: 'Budget Home Solutions',
    category: ['furniture', 'flooring', 'paint'],
    location: { city: 'Mumbai', area: 'Malad' },
    contact: { phone: '+91-98765-43211' },
    ratings: { overall: 3.8, quality: 3.5, pricing: 4.5, reliability: 3.7, customer_service: 3.6, review_count: 89 },
    specialties: ['Affordable Furniture', 'Quick Delivery', 'Installation Services'],
    price_range: 'budget',
    years_in_business: 8,
    delivery_available: true,
    installation_available: true,
  },
  {
    id: 'v3',
    name: 'Urban Living Furnishings',
    category: ['furniture', 'decor', 'fabrics'],
    location: { city: 'Delhi', area: 'Connaught Place' },
    contact: { phone: '+91-98765-43212', website: 'www.urbanliving.com' },
    ratings: { overall: 4.2, quality: 4.3, pricing: 4.0, reliability: 4.2, customer_service: 4.1, review_count: 156 },
    specialties: ['Contemporary Furniture', 'Modern Decor', 'Custom Upholstery'],
    price_range: 'mid_range',
    certifications: ['IGBC Member'],
    years_in_business: 12,
    delivery_available: true,
    installation_available: true,
  },
];

/**
 * Get vendor recommendations based on project requirements
 */
export function getVendorRecommendations(
  requirements: {
    categories: string[];
    city: string;
    budget_tier: 'budget' | 'mid_range' | 'premium';
    min_rating?: number;
    max_distance_km?: number;
  }
): VendorRecommendation[] {
  const recommendations: VendorRecommendation[] = [];

  VENDOR_DATABASE.forEach((vendor) => {
    // Check if vendor serves the city
    if (vendor.location.city.toLowerCase() !== requirements.city.toLowerCase()) {
      return;
    }

    // Check if vendor matches price range
    if (vendor.price_range !== requirements.budget_tier) {
      // Allow some flexibility
      const tierOrder = ['budget', 'mid_range', 'premium'];
      const vendorTierIndex = tierOrder.indexOf(vendor.price_range);
      const requiredTierIndex = tierOrder.indexOf(requirements.budget_tier);
      
      // Only match adjacent tiers
      if (Math.abs(vendorTierIndex - requiredTierIndex) > 1) {
        return;
      }
    }

    // Check minimum rating
    if (requirements.min_rating && vendor.ratings.overall < requirements.min_rating) {
      return;
    }

    // Calculate match score
    let matchScore = 0;
    const reasons: string[] = [];

    // Category match (40 points)
    const categoryMatches = requirements.categories.filter((cat) =>
      vendor.category.some((vcat) => vcat.toLowerCase().includes(cat.toLowerCase()))
    );
    const categoryScore = (categoryMatches.length / requirements.categories.length) * 40;
    matchScore += categoryScore;
    if (categoryMatches.length > 0) {
      reasons.push(`Provides ${categoryMatches.join(', ')}`);
    }

    // Rating (25 points)
    matchScore += (vendor.ratings.overall / 5) * 25;
    if (vendor.ratings.overall >= 4.0) {
      reasons.push(`High rating: ${vendor.ratings.overall}/5 (${vendor.ratings.review_count} reviews)`);
    }

    // Price range match (20 points)
    if (vendor.price_range === requirements.budget_tier) {
      matchScore += 20;
      reasons.push(`Matches ${requirements.budget_tier.replace('_', ' ')} budget`);
    } else {
      matchScore += 10;
    }

    // Experience (10 points)
    if (vendor.years_in_business >= 10) {
      matchScore += 10;
      reasons.push(`${vendor.years_in_business} years experience`);
    } else if (vendor.years_in_business >= 5) {
      matchScore += 5;
    }

    // Services (5 points)
    if (vendor.delivery_available && vendor.installation_available) {
      matchScore += 5;
      reasons.push('Full service (delivery + installation)');
    }

    // Add to recommendations if score is reasonable
    if (matchScore >= 50) {
      recommendations.push({
        vendor,
        match_score: Math.round(matchScore),
        reasons,
        estimated_cost: estimateVendorCost(vendor, requirements.budget_tier),
        materials_available: [], // In production, fetch from materials database
      });
    }
  });

  // Sort by match score
  return recommendations.sort((a, b) => b.match_score - a.match_score);
}

/**
 * Get material suggestions for budget item
 */
export function getMaterialSuggestions(
  itemCategory: string,
  budgetTier: 'budget' | 'mid_range' | 'premium',
  city: string
): MaterialSuggestion[] {
  // Mock implementation
  // In production, this would query a materials database
  const suggestions: MaterialSuggestion[] = [];

  // Find relevant vendors
  const vendors = VENDOR_DATABASE.filter(
    (v) => 
      v.location.city.toLowerCase() === city.toLowerCase() &&
      v.category.some((cat) => cat.toLowerCase().includes(itemCategory.toLowerCase()))
  );

  vendors.forEach((vendor) => {
    // Mock material data
    const material: Material = {
      id: `m-${vendor.id}-1`,
      name: `${itemCategory} - ${budgetTier.replace('_', ' ')} grade`,
      category: itemCategory,
      description: `High-quality ${itemCategory} from ${vendor.name}`,
      specifications: {
        material_type: itemCategory,
        finish: 'Standard',
      },
      pricing: {
        unit: 'piece',
        base_price: estimateMaterialPrice(itemCategory, budgetTier),
        gst_rate: 0.18,
      },
      availability: {
        in_stock: true,
        lead_time_days: 7,
      },
      vendor_id: vendor.id,
      quality_grade: budgetTier === 'premium' ? 'A' : budgetTier === 'mid_range' ? 'B' : 'C',
    };

    suggestions.push({
      material,
      vendor,
      relevance_score: 85,
      alternative_count: 3,
      price_comparison: {
        lowest_price: material.pricing.base_price * 0.8,
        average_price: material.pricing.base_price,
        highest_price: material.pricing.base_price * 1.2,
        this_price: material.pricing.base_price,
      },
    });
  });

  return suggestions;
}

/**
 * Compare prices across vendors
 */
export function comparePrices(
  materialCategory: string,
  vendorIds: string[]
): Array<{ vendor: Vendor; price: number; availability: string }> {
  const comparison: Array<{ vendor: Vendor; price: number; availability: string }> = [];

  vendorIds.forEach((vendorId) => {
    const vendor = VENDOR_DATABASE.find((v) => v.id === vendorId);
    if (vendor) {
      comparison.push({
        vendor,
        price: estimateMaterialPrice(materialCategory, vendor.price_range),
        availability: 'In Stock',
      });
    }
  });

  return comparison.sort((a, b) => a.price - b.price);
}

/**
 * Check material availability
 */
export function checkAvailability(
  materialId: string,
  quantity: number
): {
  available: boolean;
  lead_time_days: number;
  stock_location: string;
  alternative_vendors?: Vendor[];
} {
  // Mock implementation
  return {
    available: true,
    lead_time_days: 7,
    stock_location: 'Mumbai Warehouse',
    alternative_vendors: VENDOR_DATABASE.slice(0, 2),
  };
}

/**
 * Helper: Estimate vendor cost
 */
function estimateVendorCost(
  vendor: Vendor,
  budgetTier: 'budget' | 'mid_range' | 'premium'
): number {
  const basePrice = 50000; // Base project cost
  const tierMultipliers = { budget: 0.7, mid_range: 1.0, premium: 1.5 };
  const tierMultiplier = tierMultipliers[budgetTier];

  // Adjust based on vendor's price range
  const vendorMultipliers = { budget: 0.8, mid_range: 1.0, premium: 1.3 };
  const vendorMultiplier = vendorMultipliers[vendor.price_range];

  return Math.round(basePrice * tierMultiplier * vendorMultiplier);
}

/**
 * Helper: Estimate material price
 */
function estimateMaterialPrice(
  category: string,
  tier: 'budget' | 'mid_range' | 'premium'
): number {
  const basePrices: Record<string, number> = {
    furniture: 15000,
    flooring: 8000,
    lighting: 3000,
    paint: 5000,
    hardware: 500,
    fabrics: 2000,
  };

  const tierMultipliers = { budget: 0.5, mid_range: 1.0, premium: 2.5 };
  
  const basePrice = basePrices[category.toLowerCase()] || 5000;
  return Math.round(basePrice * tierMultipliers[tier]);
}
