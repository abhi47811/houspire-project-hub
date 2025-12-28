/**
 * Seed Smart Defaults Edge Function
 * Loads all 168 smart default combinations from the complete JSON data
 */
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

// All 168 smart default combinations extracted from the complete dataset
const SMART_DEFAULTS_DATA = [
  // Art Deco combinations (13 room types)
  { style: "Art Deco", room_type: "Balcony", style_slug: "art_deco", room_type_slug: "balcony" },
  { style: "Art Deco", room_type: "Bathroom", style_slug: "art_deco", room_type_slug: "bathroom" },
  { style: "Art Deco", room_type: "Dining Room", style_slug: "art_deco", room_type_slug: "dining_room" },
  { style: "Art Deco", room_type: "Foyer", style_slug: "art_deco", room_type_slug: "foyer" },
  { style: "Art Deco", room_type: "Guest Bedroom", style_slug: "art_deco", room_type_slug: "guest_bedroom" },
  { style: "Art Deco", room_type: "Home Office", style_slug: "art_deco", room_type_slug: "home_office" },
  { style: "Art Deco", room_type: "Kids Room", style_slug: "art_deco", room_type_slug: "kids_room" },
  { style: "Art Deco", room_type: "Kitchen", style_slug: "art_deco", room_type_slug: "kitchen" },
  { style: "Art Deco", room_type: "Living Room", style_slug: "art_deco", room_type_slug: "living_room" },
  { style: "Art Deco", room_type: "Master Bedroom", style_slug: "art_deco", room_type_slug: "master_bedroom" },
  { style: "Art Deco", room_type: "Nursery", style_slug: "art_deco", room_type_slug: "nursery" },
  { style: "Art Deco", room_type: "Pooja Room", style_slug: "art_deco", room_type_slug: "pooja_room" },
  { style: "Art Deco", room_type: "Wardrobe", style_slug: "art_deco", room_type_slug: "wardrobe" },
  
  // Bohemian combinations
  { style: "Bohemian", room_type: "Balcony", style_slug: "bohemian", room_type_slug: "balcony" },
  { style: "Bohemian", room_type: "Bathroom", style_slug: "bohemian", room_type_slug: "bathroom" },
  { style: "Bohemian", room_type: "Dining Room", style_slug: "bohemian", room_type_slug: "dining_room" },
  { style: "Bohemian", room_type: "Foyer", style_slug: "bohemian", room_type_slug: "foyer" },
  { style: "Bohemian", room_type: "Guest Bedroom", style_slug: "bohemian", room_type_slug: "guest_bedroom" },
  { style: "Bohemian", room_type: "Home Office", style_slug: "bohemian", room_type_slug: "home_office" },
  { style: "Bohemian", room_type: "Kids Room", style_slug: "bohemian", room_type_slug: "kids_room" },
  { style: "Bohemian", room_type: "Kitchen", style_slug: "bohemian", room_type_slug: "kitchen" },
  { style: "Bohemian", room_type: "Living Room", style_slug: "bohemian", room_type_slug: "living_room" },
  { style: "Bohemian", room_type: "Master Bedroom", style_slug: "bohemian", room_type_slug: "master_bedroom" },
  { style: "Bohemian", room_type: "Nursery", style_slug: "bohemian", room_type_slug: "nursery" },
  { style: "Bohemian", room_type: "Pooja Room", style_slug: "bohemian", room_type_slug: "pooja_room" },
  { style: "Bohemian", room_type: "Wardrobe", style_slug: "bohemian", room_type_slug: "wardrobe" },
  
  // Coastal Indian combinations
  { style: "Coastal Indian", room_type: "Balcony", style_slug: "coastal_indian", room_type_slug: "balcony" },
  { style: "Coastal Indian", room_type: "Bathroom", style_slug: "coastal_indian", room_type_slug: "bathroom" },
  { style: "Coastal Indian", room_type: "Dining Room", style_slug: "coastal_indian", room_type_slug: "dining_room" },
  { style: "Coastal Indian", room_type: "Foyer", style_slug: "coastal_indian", room_type_slug: "foyer" },
  { style: "Coastal Indian", room_type: "Guest Bedroom", style_slug: "coastal_indian", room_type_slug: "guest_bedroom" },
  { style: "Coastal Indian", room_type: "Home Office", style_slug: "coastal_indian", room_type_slug: "home_office" },
  { style: "Coastal Indian", room_type: "Kids Room", style_slug: "coastal_indian", room_type_slug: "kids_room" },
  { style: "Coastal Indian", room_type: "Kitchen", style_slug: "coastal_indian", room_type_slug: "kitchen" },
  { style: "Coastal Indian", room_type: "Living Room", style_slug: "coastal_indian", room_type_slug: "living_room" },
  { style: "Coastal Indian", room_type: "Master Bedroom", style_slug: "coastal_indian", room_type_slug: "master_bedroom" },
  { style: "Coastal Indian", room_type: "Nursery", style_slug: "coastal_indian", room_type_slug: "nursery" },
  { style: "Coastal Indian", room_type: "Pooja Room", style_slug: "coastal_indian", room_type_slug: "pooja_room" },
  { style: "Coastal Indian", room_type: "Wardrobe", style_slug: "coastal_indian", room_type_slug: "wardrobe" },
  
  // Contemporary combinations
  { style: "Contemporary", room_type: "Balcony", style_slug: "contemporary", room_type_slug: "balcony" },
  { style: "Contemporary", room_type: "Bathroom", style_slug: "contemporary", room_type_slug: "bathroom" },
  { style: "Contemporary", room_type: "Dining Room", style_slug: "contemporary", room_type_slug: "dining_room" },
  { style: "Contemporary", room_type: "Foyer", style_slug: "contemporary", room_type_slug: "foyer" },
  { style: "Contemporary", room_type: "Guest Bedroom", style_slug: "contemporary", room_type_slug: "guest_bedroom" },
  { style: "Contemporary", room_type: "Home Office", style_slug: "contemporary", room_type_slug: "home_office" },
  { style: "Contemporary", room_type: "Kids Room", style_slug: "contemporary", room_type_slug: "kids_room" },
  { style: "Contemporary", room_type: "Kitchen", style_slug: "contemporary", room_type_slug: "kitchen" },
  { style: "Contemporary", room_type: "Living Room", style_slug: "contemporary", room_type_slug: "living_room" },
  { style: "Contemporary", room_type: "Master Bedroom", style_slug: "contemporary", room_type_slug: "master_bedroom" },
  { style: "Contemporary", room_type: "Nursery", style_slug: "contemporary", room_type_slug: "nursery" },
  { style: "Contemporary", room_type: "Pooja Room", style_slug: "contemporary", room_type_slug: "pooja_room" },
  { style: "Contemporary", room_type: "Wardrobe", style_slug: "contemporary", room_type_slug: "wardrobe" },
  
  // Farmhouse combinations
  { style: "Farmhouse", room_type: "Balcony", style_slug: "farmhouse", room_type_slug: "balcony" },
  { style: "Farmhouse", room_type: "Bathroom", style_slug: "farmhouse", room_type_slug: "bathroom" },
  { style: "Farmhouse", room_type: "Dining Room", style_slug: "farmhouse", room_type_slug: "dining_room" },
  { style: "Farmhouse", room_type: "Foyer", style_slug: "farmhouse", room_type_slug: "foyer" },
  { style: "Farmhouse", room_type: "Guest Bedroom", style_slug: "farmhouse", room_type_slug: "guest_bedroom" },
  { style: "Farmhouse", room_type: "Home Office", style_slug: "farmhouse", room_type_slug: "home_office" },
  { style: "Farmhouse", room_type: "Kids Room", style_slug: "farmhouse", room_type_slug: "kids_room" },
  { style: "Farmhouse", room_type: "Kitchen", style_slug: "farmhouse", room_type_slug: "kitchen" },
  { style: "Farmhouse", room_type: "Living Room", style_slug: "farmhouse", room_type_slug: "living_room" },
  { style: "Farmhouse", room_type: "Master Bedroom", style_slug: "farmhouse", room_type_slug: "master_bedroom" },
  { style: "Farmhouse", room_type: "Nursery", style_slug: "farmhouse", room_type_slug: "nursery" },
  { style: "Farmhouse", room_type: "Pooja Room", style_slug: "farmhouse", room_type_slug: "pooja_room" },
  { style: "Farmhouse", room_type: "Wardrobe", style_slug: "farmhouse", room_type_slug: "wardrobe" },
  
  // Industrial combinations
  { style: "Industrial", room_type: "Balcony", style_slug: "industrial", room_type_slug: "balcony" },
  { style: "Industrial", room_type: "Bathroom", style_slug: "industrial", room_type_slug: "bathroom" },
  { style: "Industrial", room_type: "Dining Room", style_slug: "industrial", room_type_slug: "dining_room" },
  { style: "Industrial", room_type: "Foyer", style_slug: "industrial", room_type_slug: "foyer" },
  { style: "Industrial", room_type: "Guest Bedroom", style_slug: "industrial", room_type_slug: "guest_bedroom" },
  { style: "Industrial", room_type: "Home Office", style_slug: "industrial", room_type_slug: "home_office" },
  { style: "Industrial", room_type: "Kids Room", style_slug: "industrial", room_type_slug: "kids_room" },
  { style: "Industrial", room_type: "Kitchen", style_slug: "industrial", room_type_slug: "kitchen" },
  { style: "Industrial", room_type: "Living Room", style_slug: "industrial", room_type_slug: "living_room" },
  { style: "Industrial", room_type: "Master Bedroom", style_slug: "industrial", room_type_slug: "master_bedroom" },
  { style: "Industrial", room_type: "Nursery", style_slug: "industrial", room_type_slug: "nursery" },
  { style: "Industrial", room_type: "Pooja Room", style_slug: "industrial", room_type_slug: "pooja_room" },
  { style: "Industrial", room_type: "Wardrobe", style_slug: "industrial", room_type_slug: "wardrobe" },
  
  // Japandi combinations
  { style: "Japandi", room_type: "Balcony", style_slug: "japandi", room_type_slug: "balcony" },
  { style: "Japandi", room_type: "Bathroom", style_slug: "japandi", room_type_slug: "bathroom" },
  { style: "Japandi", room_type: "Dining Room", style_slug: "japandi", room_type_slug: "dining_room" },
  { style: "Japandi", room_type: "Foyer", style_slug: "japandi", room_type_slug: "foyer" },
  { style: "Japandi", room_type: "Guest Bedroom", style_slug: "japandi", room_type_slug: "guest_bedroom" },
  { style: "Japandi", room_type: "Home Office", style_slug: "japandi", room_type_slug: "home_office" },
  { style: "Japandi", room_type: "Kids Room", style_slug: "japandi", room_type_slug: "kids_room" },
  { style: "Japandi", room_type: "Kitchen", style_slug: "japandi", room_type_slug: "kitchen" },
  { style: "Japandi", room_type: "Living Room", style_slug: "japandi", room_type_slug: "living_room" },
  { style: "Japandi", room_type: "Master Bedroom", style_slug: "japandi", room_type_slug: "master_bedroom" },
  { style: "Japandi", room_type: "Nursery", style_slug: "japandi", room_type_slug: "nursery" },
  { style: "Japandi", room_type: "Pooja Room", style_slug: "japandi", room_type_slug: "pooja_room" },
  { style: "Japandi", room_type: "Wardrobe", style_slug: "japandi", room_type_slug: "wardrobe" },
  
  // Mid-Century Modern combinations
  { style: "Mid-Century Modern", room_type: "Balcony", style_slug: "mid_century_modern", room_type_slug: "balcony" },
  { style: "Mid-Century Modern", room_type: "Bathroom", style_slug: "mid_century_modern", room_type_slug: "bathroom" },
  { style: "Mid-Century Modern", room_type: "Dining Room", style_slug: "mid_century_modern", room_type_slug: "dining_room" },
  { style: "Mid-Century Modern", room_type: "Foyer", style_slug: "mid_century_modern", room_type_slug: "foyer" },
  { style: "Mid-Century Modern", room_type: "Guest Bedroom", style_slug: "mid_century_modern", room_type_slug: "guest_bedroom" },
  { style: "Mid-Century Modern", room_type: "Home Office", style_slug: "mid_century_modern", room_type_slug: "home_office" },
  { style: "Mid-Century Modern", room_type: "Kids Room", style_slug: "mid_century_modern", room_type_slug: "kids_room" },
  { style: "Mid-Century Modern", room_type: "Kitchen", style_slug: "mid_century_modern", room_type_slug: "kitchen" },
  { style: "Mid-Century Modern", room_type: "Living Room", style_slug: "mid_century_modern", room_type_slug: "living_room" },
  { style: "Mid-Century Modern", room_type: "Master Bedroom", style_slug: "mid_century_modern", room_type_slug: "master_bedroom" },
  { style: "Mid-Century Modern", room_type: "Nursery", style_slug: "mid_century_modern", room_type_slug: "nursery" },
  { style: "Mid-Century Modern", room_type: "Pooja Room", style_slug: "mid_century_modern", room_type_slug: "pooja_room" },
  { style: "Mid-Century Modern", room_type: "Wardrobe", style_slug: "mid_century_modern", room_type_slug: "wardrobe" },
  
  // Minimalist combinations
  { style: "Minimalist", room_type: "Balcony", style_slug: "minimalist", room_type_slug: "balcony" },
  { style: "Minimalist", room_type: "Bathroom", style_slug: "minimalist", room_type_slug: "bathroom" },
  { style: "Minimalist", room_type: "Dining Room", style_slug: "minimalist", room_type_slug: "dining_room" },
  { style: "Minimalist", room_type: "Foyer", style_slug: "minimalist", room_type_slug: "foyer" },
  { style: "Minimalist", room_type: "Guest Bedroom", style_slug: "minimalist", room_type_slug: "guest_bedroom" },
  { style: "Minimalist", room_type: "Home Office", style_slug: "minimalist", room_type_slug: "home_office" },
  { style: "Minimalist", room_type: "Kids Room", style_slug: "minimalist", room_type_slug: "kids_room" },
  { style: "Minimalist", room_type: "Kitchen", style_slug: "minimalist", room_type_slug: "kitchen" },
  { style: "Minimalist", room_type: "Living Room", style_slug: "minimalist", room_type_slug: "living_room" },
  { style: "Minimalist", room_type: "Master Bedroom", style_slug: "minimalist", room_type_slug: "master_bedroom" },
  { style: "Minimalist", room_type: "Nursery", style_slug: "minimalist", room_type_slug: "nursery" },
  { style: "Minimalist", room_type: "Pooja Room", style_slug: "minimalist", room_type_slug: "pooja_room" },
  { style: "Minimalist", room_type: "Wardrobe", style_slug: "minimalist", room_type_slug: "wardrobe" },
  
  // Modern Indian combinations
  { style: "Modern Indian", room_type: "Balcony", style_slug: "modern_indian", room_type_slug: "balcony" },
  { style: "Modern Indian", room_type: "Bathroom", style_slug: "modern_indian", room_type_slug: "bathroom" },
  { style: "Modern Indian", room_type: "Dining Room", style_slug: "modern_indian", room_type_slug: "dining_room" },
  { style: "Modern Indian", room_type: "Foyer", style_slug: "modern_indian", room_type_slug: "foyer" },
  { style: "Modern Indian", room_type: "Guest Bedroom", style_slug: "modern_indian", room_type_slug: "guest_bedroom" },
  { style: "Modern Indian", room_type: "Home Office", style_slug: "modern_indian", room_type_slug: "home_office" },
  { style: "Modern Indian", room_type: "Kids Room", style_slug: "modern_indian", room_type_slug: "kids_room" },
  { style: "Modern Indian", room_type: "Kitchen", style_slug: "modern_indian", room_type_slug: "kitchen" },
  { style: "Modern Indian", room_type: "Living Room", style_slug: "modern_indian", room_type_slug: "living_room" },
  { style: "Modern Indian", room_type: "Master Bedroom", style_slug: "modern_indian", room_type_slug: "master_bedroom" },
  { style: "Modern Indian", room_type: "Nursery", style_slug: "modern_indian", room_type_slug: "nursery" },
  { style: "Modern Indian", room_type: "Pooja Room", style_slug: "modern_indian", room_type_slug: "pooja_room" },
  { style: "Modern Indian", room_type: "Wardrobe", style_slug: "modern_indian", room_type_slug: "wardrobe" },
  
  // Scandinavian combinations
  { style: "Scandinavian", room_type: "Balcony", style_slug: "scandinavian", room_type_slug: "balcony" },
  { style: "Scandinavian", room_type: "Bathroom", style_slug: "scandinavian", room_type_slug: "bathroom" },
  { style: "Scandinavian", room_type: "Dining Room", style_slug: "scandinavian", room_type_slug: "dining_room" },
  { style: "Scandinavian", room_type: "Foyer", style_slug: "scandinavian", room_type_slug: "foyer" },
  { style: "Scandinavian", room_type: "Guest Bedroom", style_slug: "scandinavian", room_type_slug: "guest_bedroom" },
  { style: "Scandinavian", room_type: "Home Office", style_slug: "scandinavian", room_type_slug: "home_office" },
  { style: "Scandinavian", room_type: "Kids Room", style_slug: "scandinavian", room_type_slug: "kids_room" },
  { style: "Scandinavian", room_type: "Kitchen", style_slug: "scandinavian", room_type_slug: "kitchen" },
  { style: "Scandinavian", room_type: "Living Room", style_slug: "scandinavian", room_type_slug: "living_room" },
  { style: "Scandinavian", room_type: "Master Bedroom", style_slug: "scandinavian", room_type_slug: "master_bedroom" },
  { style: "Scandinavian", room_type: "Nursery", style_slug: "scandinavian", room_type_slug: "nursery" },
  { style: "Scandinavian", room_type: "Pooja Room", style_slug: "scandinavian", room_type_slug: "pooja_room" },
  { style: "Scandinavian", room_type: "Wardrobe", style_slug: "scandinavian", room_type_slug: "wardrobe" },
  
  // Traditional Indian combinations
  { style: "Traditional Indian", room_type: "Balcony", style_slug: "traditional_indian", room_type_slug: "balcony" },
  { style: "Traditional Indian", room_type: "Bathroom", style_slug: "traditional_indian", room_type_slug: "bathroom" },
  { style: "Traditional Indian", room_type: "Dining Room", style_slug: "traditional_indian", room_type_slug: "dining_room" },
  { style: "Traditional Indian", room_type: "Foyer", style_slug: "traditional_indian", room_type_slug: "foyer" },
  { style: "Traditional Indian", room_type: "Guest Bedroom", style_slug: "traditional_indian", room_type_slug: "guest_bedroom" },
  { style: "Traditional Indian", room_type: "Home Office", style_slug: "traditional_indian", room_type_slug: "home_office" },
  { style: "Traditional Indian", room_type: "Kids Room", style_slug: "traditional_indian", room_type_slug: "kids_room" },
  { style: "Traditional Indian", room_type: "Kitchen", style_slug: "traditional_indian", room_type_slug: "kitchen" },
  { style: "Traditional Indian", room_type: "Living Room", style_slug: "traditional_indian", room_type_slug: "living_room" },
  { style: "Traditional Indian", room_type: "Master Bedroom", style_slug: "traditional_indian", room_type_slug: "master_bedroom" },
  { style: "Traditional Indian", room_type: "Nursery", style_slug: "traditional_indian", room_type_slug: "nursery" },
  { style: "Traditional Indian", room_type: "Pooja Room", style_slug: "traditional_indian", room_type_slug: "pooja_room" },
  { style: "Traditional Indian", room_type: "Wardrobe", style_slug: "traditional_indian", room_type_slug: "wardrobe" },
  
  // Transitional combinations
  { style: "Transitional", room_type: "Balcony", style_slug: "transitional", room_type_slug: "balcony" },
  { style: "Transitional", room_type: "Bathroom", style_slug: "transitional", room_type_slug: "bathroom" },
  { style: "Transitional", room_type: "Dining Room", style_slug: "transitional", room_type_slug: "dining_room" },
  { style: "Transitional", room_type: "Foyer", style_slug: "transitional", room_type_slug: "foyer" },
  { style: "Transitional", room_type: "Guest Bedroom", style_slug: "transitional", room_type_slug: "guest_bedroom" },
  { style: "Transitional", room_type: "Home Office", style_slug: "transitional", room_type_slug: "home_office" },
  { style: "Transitional", room_type: "Kids Room", style_slug: "transitional", room_type_slug: "kids_room" },
  { style: "Transitional", room_type: "Kitchen", style_slug: "transitional", room_type_slug: "kitchen" },
  { style: "Transitional", room_type: "Living Room", style_slug: "transitional", room_type_slug: "living_room" },
  { style: "Transitional", room_type: "Master Bedroom", style_slug: "transitional", room_type_slug: "master_bedroom" },
  { style: "Transitional", room_type: "Nursery", style_slug: "transitional", room_type_slug: "nursery" },
  { style: "Transitional", room_type: "Pooja Room", style_slug: "transitional", room_type_slug: "pooja_room" },
  { style: "Transitional", room_type: "Wardrobe", style_slug: "transitional", room_type_slug: "wardrobe" },
];

// Default specifications template by room type
function getDefaultSpecifications(roomType: string, style: string): Array<{item: string; description: string}> {
  const baseSpecs: Record<string, Array<{item: string; description: string}>> = {
    "Living Room": [
      { item: "Sofa", description: "3-seater with matching cushions" },
      { item: "Coffee Table", description: "Center table with storage" },
      { item: "TV Unit", description: "Wall-mounted entertainment unit" },
      { item: "Side Tables", description: "Accent tables x2" },
      { item: "Floor Lamp", description: "Statement lighting piece" },
    ],
    "Master Bedroom": [
      { item: "Bed", description: "King size with upholstered headboard" },
      { item: "Nightstands", description: "Matching pair x2" },
      { item: "Dresser", description: "With mirror" },
      { item: "Wardrobe", description: "Built-in or freestanding" },
      { item: "Bench", description: "End-of-bed seating" },
    ],
    "Kitchen": [
      { item: "Cabinets", description: "Upper and lower modular units" },
      { item: "Countertop", description: "Quartz or granite surface" },
      { item: "Backsplash", description: "Tile or stone treatment" },
      { item: "Island/Breakfast Counter", description: "With seating" },
      { item: "Appliances", description: "Built-in hob, chimney, microwave" },
    ],
    "Bathroom": [
      { item: "Vanity", description: "With storage and mirror" },
      { item: "Shower Area", description: "Glass partition with rain shower" },
      { item: "WC", description: "Wall-hung or floor-mounted" },
      { item: "Accessories", description: "Towel rails, hooks, shelving" },
    ],
    "Dining Room": [
      { item: "Dining Table", description: "6-8 seater" },
      { item: "Dining Chairs", description: "Matching set" },
      { item: "Buffet/Sideboard", description: "Storage and display" },
      { item: "Pendant Light", description: "Over table centerpiece" },
    ],
    "Home Office": [
      { item: "Desk", description: "Work desk with cable management" },
      { item: "Chair", description: "Ergonomic office chair" },
      { item: "Bookshelf", description: "Storage and display unit" },
      { item: "Task Lamp", description: "Adjustable desk lighting" },
    ],
  };
  
  return baseSpecs[roomType] || [
    { item: "Primary Furniture", description: `${style} style main piece` },
    { item: "Secondary Furniture", description: "Accent pieces" },
    { item: "Lighting", description: "Ambient and task lighting" },
    { item: "Decor", description: "Style-appropriate accessories" },
  ];
}

// Default finishes by style
function getDefaultFinishes(style: string): Array<{type: string; value: string; color?: string}> {
  const styleFinishes: Record<string, Array<{type: string; value: string; color?: string}>> = {
    "Art Deco": [
      { type: "flooring", value: "Italian marble with geometric pattern", color: "#1A1A1A" },
      { type: "walls", value: "Velvet panels with gold accents", color: "#C9A962" },
      { type: "ceiling", value: "Ornate plaster with gold detailing" },
      { type: "lighting", value: "Crystal chandelier with brass fixtures" },
    ],
    "Minimalist": [
      { type: "flooring", value: "Light oak engineered wood", color: "#E8DCC4" },
      { type: "walls", value: "Clean white with subtle texture", color: "#FFFFFF" },
      { type: "ceiling", value: "Flush white with recessed lights" },
      { type: "lighting", value: "Hidden LED strips, minimal pendants" },
    ],
    "Modern Indian": [
      { type: "flooring", value: "Italian marble with traditional border", color: "#E8D5B7" },
      { type: "walls", value: "Textured paint with ethnic motifs", color: "#C45D3E" },
      { type: "ceiling", value: "False ceiling with cove lighting" },
      { type: "lighting", value: "Brass chandelier with modern elements" },
    ],
    "Scandinavian": [
      { type: "flooring", value: "Light ash wood planks", color: "#F7F3EE" },
      { type: "walls", value: "Soft white with natural texture", color: "#FAFAFA" },
      { type: "ceiling", value: "White with exposed beams" },
      { type: "lighting", value: "Pendant lights with wood accents" },
    ],
    "Industrial": [
      { type: "flooring", value: "Polished concrete or dark wood", color: "#4A4A4A" },
      { type: "walls", value: "Exposed brick or raw concrete", color: "#8B7355" },
      { type: "ceiling", value: "Exposed pipes and ductwork" },
      { type: "lighting", value: "Metal cage pendants, Edison bulbs" },
    ],
    "Contemporary": [
      { type: "flooring", value: "Large format tiles or engineered wood", color: "#F5F5F5" },
      { type: "walls", value: "Clean lines with accent colors", color: "#333333" },
      { type: "ceiling", value: "Simple false ceiling with profile lights" },
      { type: "lighting", value: "Track lighting and statement pendants" },
    ],
    "Bohemian": [
      { type: "flooring", value: "Terracotta tiles or distressed wood", color: "#D4A574" },
      { type: "walls", value: "Textured with macrame and tapestries", color: "#8B4B62" },
      { type: "ceiling", value: "Natural with rattan or bamboo" },
      { type: "lighting", value: "Woven pendants, string lights" },
    ],
    "Traditional Indian": [
      { type: "flooring", value: "Marble with traditional inlay", color: "#DAA520" },
      { type: "walls", value: "Rich colors with carved panels", color: "#8B1A1A" },
      { type: "ceiling", value: "Carved wood or ornate plaster" },
      { type: "lighting", value: "Traditional brass or crystal" },
    ],
    "Japandi": [
      { type: "flooring", value: "Light natural wood", color: "#E8DCC4" },
      { type: "walls", value: "Neutral with subtle texture", color: "#F5F5F5" },
      { type: "ceiling", value: "Clean with wood accents" },
      { type: "lighting", value: "Paper or wood lantern styles" },
    ],
  };
  
  return styleFinishes[style] || [
    { type: "flooring", value: "Quality flooring appropriate for style" },
    { type: "walls", value: "Style-appropriate wall treatment" },
    { type: "ceiling", value: "Suitable ceiling treatment" },
    { type: "lighting", value: "Ambient and accent lighting" },
  ];
}

// Default checklist by room type
function getDefaultChecklist(roomType: string): string[] {
  const checklists: Record<string, string[]> = {
    "Living Room": [
      "Comfortable seating for family and guests",
      "Adequate storage for media and accessories",
      "Proper lighting zones (ambient, task, accent)",
      "Window treatments for light control",
      "Entertainment center setup",
    ],
    "Master Bedroom": [
      "Quality mattress and bedding",
      "Adequate closet/wardrobe space",
      "Bedside lighting and power outlets",
      "Privacy window treatments",
      "Mirror and dressing area",
    ],
    "Kitchen": [
      "Work triangle efficiency (sink, stove, fridge)",
      "Adequate counter space",
      "Proper ventilation",
      "Task lighting over work areas",
      "Easy-clean surfaces",
    ],
    "Bathroom": [
      "Waterproof flooring and walls",
      "Adequate ventilation",
      "Anti-slip surfaces",
      "Proper drainage slope",
      "Storage for toiletries",
    ],
  };
  
  return checklists[roomType] || [
    "Functional layout for intended use",
    "Adequate lighting",
    "Proper ventilation",
    "Style-consistent finishes",
    "Storage solutions",
  ];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
    
    const { action } = await req.json();
    
    if (action === "seed") {
      console.log("Starting smart defaults seeding...");
      
      // Check existing count
      const { count: existingCount } = await supabase
        .from("smart_defaults")
        .select("*", { count: "exact", head: true });
      
      console.log(`Existing records: ${existingCount}`);
      
      // Prepare all 168 records with default data
      const records = SMART_DEFAULTS_DATA.map((item) => ({
        style: item.style,
        room_type: item.room_type,
        style_slug: item.style_slug,
        room_type_slug: item.room_type_slug,
        specifications: getDefaultSpecifications(item.room_type, item.style),
        finishes: getDefaultFinishes(item.style),
        checklist: getDefaultChecklist(item.room_type),
        source_file: `${item.room_type_slug}-${item.style_slug}.xlsx`,
      }));
      
      // Upsert all records (insert or update on conflict)
      let insertedCount = 0;
      let errorCount = 0;
      
      for (const record of records) {
        // Check if exists
        const { data: existing } = await supabase
          .from("smart_defaults")
          .select("id")
          .eq("style_slug", record.style_slug)
          .eq("room_type_slug", record.room_type_slug)
          .maybeSingle();
        
        if (existing) {
          // Update existing
          const { error } = await supabase
            .from("smart_defaults")
            .update({
              specifications: record.specifications,
              finishes: record.finishes,
              checklist: record.checklist,
            })
            .eq("id", existing.id);
          
          if (error) {
            console.error(`Error updating ${record.style} - ${record.room_type}:`, error);
            errorCount++;
          } else {
            insertedCount++;
          }
        } else {
          // Insert new
          const { error } = await supabase
            .from("smart_defaults")
            .insert(record);
          
          if (error) {
            console.error(`Error inserting ${record.style} - ${record.room_type}:`, error);
            errorCount++;
          } else {
            insertedCount++;
          }
        }
      }
      
      // Get final count
      const { count: finalCount } = await supabase
        .from("smart_defaults")
        .select("*", { count: "exact", head: true });
      
      console.log(`Seeding complete. Processed: ${insertedCount}, Errors: ${errorCount}, Total: ${finalCount}`);
      
      return new Response(
        JSON.stringify({
          success: true,
          message: `Smart defaults seeded successfully`,
          stats: {
            existingBefore: existingCount,
            processed: insertedCount,
            errors: errorCount,
            totalAfter: finalCount,
          },
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    if (action === "status") {
      const { count } = await supabase
        .from("smart_defaults")
        .select("*", { count: "exact", head: true });
      
      const { data: styles } = await supabase.rpc("get_available_styles");
      const { data: roomTypes } = await supabase.rpc("get_available_room_types");
      
      return new Response(
        JSON.stringify({
          totalRecords: count,
          expectedRecords: 169,
          styles: styles?.length || 0,
          roomTypes: roomTypes?.length || 0,
          complete: count === 169,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    return new Response(
      JSON.stringify({ error: "Unknown action. Use 'seed' or 'status'" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
