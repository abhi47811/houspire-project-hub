/**
 * Audit Smart Defaults Edge Function
 * Provides coverage analysis and gap detection for smart_defaults table
 */
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

// Expected combinations
const EXPECTED_STYLES = 13;
const EXPECTED_ROOM_TYPES = 14;
const EXPECTED_TIERS = 3;
const EXPECTED_TOTAL = EXPECTED_STYLES * EXPECTED_ROOM_TYPES; // 182

const ALL_STYLES = [
  "Art Deco", "Bohemian", "Coastal Indian", "Contemporary", "Farmhouse",
  "Industrial", "Japandi", "Mid-Century Modern", "Minimalist", "Modern Indian",
  "Scandinavian", "Traditional Indian", "Transitional"
];

const ALL_ROOM_TYPES = [
  "Balcony", "Bathroom", "Dining Room", "Foyer", "Guest Bedroom",
  "Home Office", "Kids Room", "Kitchen", "Living Room", "Master Bedroom",
  "Nursery", "Pooja Room", "Study", "Wardrobe"
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
    
    // Get all smart defaults
    const { data: defaults, error } = await supabase
      .from("smart_defaults")
      .select("*");
    
    if (error) throw error;
    
    // Create coverage map
    const coverageMap = new Map<string, any>();
    const styleCount = new Map<string, number>();
    const roomTypeCount = new Map<string, number>();
    let totalItems = 0;
    let totalFinishes = 0;
    
    for (const record of defaults || []) {
      const key = `${record.style_slug}__${record.room_type_slug}`;
      coverageMap.set(key, record);
      
      // Count by style
      styleCount.set(record.style, (styleCount.get(record.style) || 0) + 1);
      
      // Count by room type
      roomTypeCount.set(record.room_type, (roomTypeCount.get(record.room_type) || 0) + 1);
      
      // Count items and finishes
      const specs = record.specifications as any[];
      if (Array.isArray(specs)) {
        totalItems += specs.length;
      }
      
      const finishes = record.finishes as any;
      if (finishes?.tier_options) {
        const tierOptions = finishes.tier_options;
        totalFinishes += (tierOptions.Premium?.length || 0) + 
                         (tierOptions.Mid?.length || 0) + 
                         (tierOptions.Budget?.length || 0);
      }
    }
    
    // Find gaps
    const gaps: Array<{ style: string; room_type: string }> = [];
    
    for (const style of ALL_STYLES) {
      for (const roomType of ALL_ROOM_TYPES) {
        const styleSlug = style.toLowerCase().replace(/ /g, "_").replace(/-/g, "_");
        const roomSlug = roomType.toLowerCase().replace(/ /g, "_");
        const key = `${styleSlug}__${roomSlug}`;
        
        if (!coverageMap.has(key)) {
          gaps.push({ style, room_type: roomType });
        }
      }
    }
    
    // Calculate statistics
    const totalRecords = defaults?.length || 0;
    const coveragePercent = Math.round((totalRecords / EXPECTED_TOTAL) * 100);
    const avgItemsPerCombo = totalRecords > 0 ? Math.round(totalItems / totalRecords) : 0;
    
    // Style coverage analysis
    const styleCoverage = ALL_STYLES.map(style => ({
      style,
      count: styleCount.get(style) || 0,
      expected: EXPECTED_ROOM_TYPES,
      complete: (styleCount.get(style) || 0) === EXPECTED_ROOM_TYPES,
    }));
    
    // Room type coverage analysis
    const roomTypeCoverage = ALL_ROOM_TYPES.map(roomType => ({
      roomType,
      count: roomTypeCount.get(roomType) || 0,
      expected: EXPECTED_STYLES,
      complete: (roomTypeCount.get(roomType) || 0) === EXPECTED_STYLES,
    }));
    
    // Summary
    const auditResult = {
      summary: {
        totalRecords,
        expectedRecords: EXPECTED_TOTAL,
        coverage: `${coveragePercent}%`,
        totalItems,
        totalFinishes,
        avgItemsPerCombo,
        stylesCount: styleCount.size,
        roomTypesCount: roomTypeCount.size,
        tiersSupported: EXPECTED_TIERS,
        gapsFound: gaps.length,
        isComplete: gaps.length === 0,
      },
      styleCoverage,
      roomTypeCoverage,
      gaps,
      incompleteStyles: styleCoverage.filter(s => !s.complete),
      incompleteRoomTypes: roomTypeCoverage.filter(r => !r.complete),
      timestamp: new Date().toISOString(),
    };
    
    console.log(`Audit complete: ${totalRecords}/${EXPECTED_TOTAL} records (${coveragePercent}%)`);
    console.log(`Gaps found: ${gaps.length}`);
    
    if (gaps.length > 0) {
      console.log("Missing combinations:", gaps.slice(0, 10));
    }
    
    return new Response(
      JSON.stringify(auditResult),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Audit error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
