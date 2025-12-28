import { supabase } from "@/integrations/supabase/client";

// All expected styles (13)
export const EXPECTED_STYLES = [
  { style: "Art Deco", style_slug: "art_deco" },
  { style: "Bohemian", style_slug: "bohemian" },
  { style: "Coastal Indian", style_slug: "coastal_indian" },
  { style: "Contemporary", style_slug: "contemporary" },
  { style: "Farmhouse", style_slug: "farmhouse" },
  { style: "Industrial", style_slug: "industrial" },
  { style: "Japandi", style_slug: "japandi" },
  { style: "Mid-Century Modern", style_slug: "mid-century_modern" },
  { style: "Minimalist", style_slug: "minimalist" },
  { style: "Modern Indian", style_slug: "modern_indian" },
  { style: "Scandinavian", style_slug: "scandinavian" },
  { style: "Traditional Indian", style_slug: "traditional_indian" },
  { style: "Transitional", style_slug: "transitional" },
];

// All expected room types (13)
export const EXPECTED_ROOM_TYPES = [
  { room_type: "Balcony", room_type_slug: "balcony" },
  { room_type: "Bathroom", room_type_slug: "bathroom" },
  { room_type: "Dining Room", room_type_slug: "dining_room" },
  { room_type: "Foyer", room_type_slug: "foyer" },
  { room_type: "Guest Bedroom", room_type_slug: "guest_bedroom" },
  { room_type: "Home Office", room_type_slug: "home_office" },
  { room_type: "Kids Room", room_type_slug: "kids_room" },
  { room_type: "Kitchen", room_type_slug: "kitchen" },
  { room_type: "Living Room", room_type_slug: "living_room" },
  { room_type: "Master Bedroom", room_type_slug: "master_bedroom" },
  { room_type: "Nursery", room_type_slug: "nursery" },
  { room_type: "Pooja Room", room_type_slug: "pooja_room" },
  { room_type: "Wardrobe", room_type_slug: "wardrobe" },
];

export const EXPECTED_TOTAL = EXPECTED_STYLES.length * EXPECTED_ROOM_TYPES.length; // 169

export interface SmartDefaultRecord {
  id: string;
  style: string;
  style_slug: string;
  room_type: string;
  room_type_slug: string;
  specifications: unknown;
  checklist: unknown;
  finishes: unknown;
  created_at: string;
  updated_at: string;
}

export interface SmartDefaultsStatus {
  loaded: number;
  expected: number;
  coverage: number;
  missing: { style: string; room_type: string }[];
}

export interface MissingCombination {
  style: string;
  style_slug: string;
  room_type: string;
  room_type_slug: string;
}

// Get current smart defaults status
export async function getSmartDefaultsStatus(): Promise<SmartDefaultsStatus> {
  const { data, error, count } = await supabase
    .from("smart_defaults")
    .select("style, style_slug, room_type, room_type_slug", { count: "exact" });

  if (error) {
    throw new Error(`Failed to fetch smart defaults: ${error.message}`);
  }

  const loadedCombinations = new Set(
    (data || []).map((d) => `${d.style_slug}__${d.room_type_slug}`)
  );

  const missing: { style: string; room_type: string }[] = [];

  for (const style of EXPECTED_STYLES) {
    for (const roomType of EXPECTED_ROOM_TYPES) {
      const key = `${style.style_slug}__${roomType.room_type_slug}`;
      if (!loadedCombinations.has(key)) {
        missing.push({
          style: style.style,
          room_type: roomType.room_type,
        });
      }
    }
  }

  const loaded = count || 0;
  const coverage = Math.round((loaded / EXPECTED_TOTAL) * 100);

  return {
    loaded,
    expected: EXPECTED_TOTAL,
    coverage,
    missing,
  };
}

// Get all missing combinations with slugs
export async function getMissingCombinations(): Promise<MissingCombination[]> {
  const { data, error } = await supabase
    .from("smart_defaults")
    .select("style_slug, room_type_slug");

  if (error) {
    throw new Error(`Failed to fetch smart defaults: ${error.message}`);
  }

  const loadedCombinations = new Set(
    (data || []).map((d) => `${d.style_slug}__${d.room_type_slug}`)
  );

  const missing: MissingCombination[] = [];

  for (const style of EXPECTED_STYLES) {
    for (const roomType of EXPECTED_ROOM_TYPES) {
      const key = `${style.style_slug}__${roomType.room_type_slug}`;
      if (!loadedCombinations.has(key)) {
        missing.push({
          style: style.style,
          style_slug: style.style_slug,
          room_type: roomType.room_type,
          room_type_slug: roomType.room_type_slug,
        });
      }
    }
  }

  return missing;
}

// Get all loaded smart defaults with counts
export async function getSmartDefaultsPreview(): Promise<SmartDefaultRecord[]> {
  const { data, error } = await supabase
    .from("smart_defaults")
    .select("*")
    .order("style", { ascending: true })
    .order("room_type", { ascending: true })
    .limit(50);

  if (error) {
    throw new Error(`Failed to fetch smart defaults preview: ${error.message}`);
  }

  return data as SmartDefaultRecord[];
}

// Load missing defaults via edge function
export async function loadMissingDefaults(): Promise<{ loaded: number; errors: number }> {
  const { data, error } = await supabase.functions.invoke("load-smart-defaults-final", {
    body: { action: "load" },
  });

  if (error) {
    throw new Error(`Failed to load missing defaults: ${error.message}`);
  }

  return {
    loaded: data?.loaded || 0,
    errors: data?.errors || 0,
  };
}

// Seed all defaults (refresh) via edge function
export async function seedAllDefaults(): Promise<{ loaded: number; errors: number }> {
  const { data, error } = await supabase.functions.invoke("seed-smart-defaults", {
    body: { action: "seed" },
  });

  if (error) {
    throw new Error(`Failed to seed defaults: ${error.message}`);
  }

  return {
    loaded: data?.loaded || 0,
    errors: data?.errors || 0,
  };
}

// Check status via edge function
export async function checkDefaultsStatus(): Promise<{ count: number; message: string }> {
  const { data, error } = await supabase.functions.invoke("seed-smart-defaults", {
    body: { action: "status" },
  });

  if (error) {
    throw new Error(`Failed to check status: ${error.message}`);
  }

  return {
    count: data?.count || 0,
    message: data?.message || "Status checked",
  };
}
