import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import * as XLSX from "https://esm.sh/xlsx@0.18.5";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PricingItem {
  item_name: string;
  category: string;
  sub_category?: string;
  specification?: string;
  unit: string;
  budget_price: number;
  mid_premium_price: number;
  premium_price: number;
  gst_percent: number;
  hyderabad_multiplier: number;
  delhi_multiplier: number;
  bangalore_multiplier: number;
  pune_multiplier: number;
  mumbai_multiplier: number;
  chennai_multiplier: number;
  kolkata_multiplier: number;
  ahmedabad_multiplier: number;
  jaipur_multiplier: number;
  lucknow_multiplier: number;
  surat_multiplier: number;
  synonyms: string[];
  keywords: string[];
}

// Category to GST mapping (Indian rates)
const categoryGstRates: Record<string, number> = {
  furniture: 18,
  flooring: 18,
  wall_finish: 18,
  ceiling: 18,
  lighting: 18,
  electrical: 18,
  soft_furnishings: 12,
  decor: 18,
  kitchen: 18,
  bathroom: 18,
  hardware: 18,
  civil: 18,
  paint: 18,
  glass: 18,
  mirror: 18,
  wardrobe: 18,
  storage: 18,
  outdoor: 18,
};

// Default city multipliers
const defaultMultipliers = {
  hyderabad: 1.0,
  delhi: 1.15,
  bangalore: 1.1,
  pune: 1.05,
  mumbai: 1.2,
  chennai: 1.05,
  kolkata: 0.95,
  ahmedabad: 0.9,
  jaipur: 0.85,
  lucknow: 0.8,
  surat: 0.85,
};

// Generate synonyms for an item
function generateSynonyms(itemName: string, category: string): string[] {
  const synonyms: string[] = [];
  const name = itemName.toLowerCase();

  // Common furniture synonyms
  const synonymMap: Record<string, string[]> = {
    sofa: ["couch", "settee", "lounge"],
    bed: ["cot", "bedstead"],
    table: ["desk"],
    chair: ["seat"],
    wardrobe: ["almirah", "cupboard", "closet"],
    cabinet: ["storage unit", "cupboard"],
    light: ["lamp", "luminaire", "fixture"],
    fan: ["ceiling fan", "exhaust"],
    curtain: ["drape", "blind", "window treatment"],
    carpet: ["rug", "floor covering", "mat"],
    mirror: ["looking glass"],
    tile: ["flooring", "vitrified"],
    paint: ["wall finish", "coating", "emulsion"],
    granite: ["stone", "countertop"],
    laminate: ["sunmica", "formica"],
  };

  // Add matching synonyms
  for (const [key, values] of Object.entries(synonymMap)) {
    if (name.includes(key)) {
      synonyms.push(...values);
    }
  }

  return synonyms;
}

// Generate search keywords
function generateKeywords(itemName: string, category: string, spec?: string): string[] {
  const keywords: string[] = [];
  const words = itemName.toLowerCase().split(/[\s-_]+/);
  keywords.push(...words.filter((w) => w.length > 2));
  if (spec) {
    const specWords = spec.toLowerCase().split(/[\s-_,]+/);
    keywords.push(...specWords.filter((w) => w.length > 2));
  }
  keywords.push(category.toLowerCase());
  return [...new Set(keywords)];
}

// Parse Excel row to pricing item
function parseRow(row: Record<string, unknown>, headers: string[]): Partial<PricingItem> | null {
  try {
    // Try to find item name column
    const itemNameKeys = ["item_name", "item", "name", "description", "product", "material"];
    let itemName = "";
    for (const key of itemNameKeys) {
      const found = headers.find((h) => h.toLowerCase().includes(key));
      if (found && row[found]) {
        itemName = String(row[found]).trim();
        break;
      }
    }

    if (!itemName) return null;

    // Try to find category
    const categoryKeys = ["category", "type", "group"];
    let category = "furniture";
    for (const key of categoryKeys) {
      const found = headers.find((h) => h.toLowerCase().includes(key));
      if (found && row[found]) {
        category = String(row[found]).toLowerCase().replace(/\s+/g, "_").trim();
        break;
      }
    }

    // Try to find specification
    const specKeys = ["specification", "spec", "details", "size", "dimension"];
    let specification = "";
    for (const key of specKeys) {
      const found = headers.find((h) => h.toLowerCase().includes(key));
      if (found && row[found]) {
        specification = String(row[found]).trim();
        break;
      }
    }

    // Try to find unit
    const unitKeys = ["unit", "uom", "measure"];
    let unit = "nos";
    for (const key of unitKeys) {
      const found = headers.find((h) => h.toLowerCase().includes(key));
      if (found && row[found]) {
        unit = String(row[found]).toLowerCase().trim();
        break;
      }
    }

    // Try to find prices - look for budget/mid/premium or city names
    const priceKeys = ["rate", "price", "cost", "amount"];
    let basePrice = 0;

    // First try to find a generic price column
    for (const key of priceKeys) {
      const found = headers.find((h) => h.toLowerCase().includes(key) && !h.toLowerCase().includes("budget") && !h.toLowerCase().includes("premium"));
      if (found && row[found]) {
        const val = Number(String(row[found]).replace(/[₹,]/g, ""));
        if (!isNaN(val) && val > 0) {
          basePrice = val;
          break;
        }
      }
    }

    // Look for budget/mid/premium tiers
    let budgetPrice = 0;
    let midPremiumPrice = 0;
    let premiumPrice = 0;

    for (const header of headers) {
      const h = header.toLowerCase();
      const val = Number(String(row[header] || "0").replace(/[₹,]/g, ""));
      if (isNaN(val)) continue;

      if (h.includes("budget") && val > 0) budgetPrice = val;
      else if ((h.includes("mid") || h.includes("standard")) && val > 0) midPremiumPrice = val;
      else if (h.includes("premium") && !h.includes("mid") && val > 0) premiumPrice = val;
    }

    // Look for city-specific prices
    const cityPrices: Record<string, number> = {};
    const cities = ["hyderabad", "delhi", "bangalore", "pune", "mumbai", "chennai", "kolkata", "ahmedabad", "jaipur", "lucknow", "surat"];

    for (const header of headers) {
      const h = header.toLowerCase();
      for (const city of cities) {
        if (h.includes(city)) {
          const val = Number(String(row[header] || "0").replace(/[₹,]/g, ""));
          if (!isNaN(val) && val > 0) {
            cityPrices[city] = val;
          }
        }
      }
    }

    // Calculate prices if we have city prices but no tier prices
    if (Object.keys(cityPrices).length > 0 && budgetPrice === 0) {
      const avgPrice = Object.values(cityPrices).reduce((a, b) => a + b, 0) / Object.values(cityPrices).length;
      budgetPrice = Math.round(avgPrice * 0.7);
      midPremiumPrice = Math.round(avgPrice);
      premiumPrice = Math.round(avgPrice * 1.4);
    }

    // Use base price if no tier prices found
    if (budgetPrice === 0 && basePrice > 0) {
      budgetPrice = Math.round(basePrice * 0.7);
      midPremiumPrice = basePrice;
      premiumPrice = Math.round(basePrice * 1.4);
    }

    // Skip if no prices found
    if (budgetPrice === 0 && midPremiumPrice === 0 && premiumPrice === 0) {
      return null;
    }

    // Calculate multipliers from city prices
    const multipliers = { ...defaultMultipliers };
    if (Object.keys(cityPrices).length > 0) {
      const hydPrice = cityPrices.hyderabad || midPremiumPrice;
      for (const [city, price] of Object.entries(cityPrices)) {
        if (hydPrice > 0) {
          multipliers[city as keyof typeof multipliers] = Math.round((price / hydPrice) * 100) / 100;
        }
      }
    }

    return {
      item_name: itemName,
      category,
      specification: specification || undefined,
      unit,
      budget_price: budgetPrice,
      mid_premium_price: midPremiumPrice || budgetPrice,
      premium_price: premiumPrice || (midPremiumPrice || budgetPrice) * 1.4,
      gst_percent: categoryGstRates[category] || 18,
      hyderabad_multiplier: multipliers.hyderabad,
      delhi_multiplier: multipliers.delhi,
      bangalore_multiplier: multipliers.bangalore,
      pune_multiplier: multipliers.pune,
      mumbai_multiplier: multipliers.mumbai,
      chennai_multiplier: multipliers.chennai,
      kolkata_multiplier: multipliers.kolkata,
      ahmedabad_multiplier: multipliers.ahmedabad,
      jaipur_multiplier: multipliers.jaipur,
      lucknow_multiplier: multipliers.lucknow,
      surat_multiplier: multipliers.surat,
      synonyms: generateSynonyms(itemName, category),
      keywords: generateKeywords(itemName, category, specification),
    };
  } catch (e) {
    console.error("Error parsing row:", e);
    return null;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const clearExisting = formData.get("clearExisting") === "true";

    if (!file) {
      return new Response(
        JSON.stringify({ success: false, error: "No file provided" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    console.log(`Processing file: ${file.name}, size: ${file.size} bytes`);

    // Read file as array buffer
    const arrayBuffer = await file.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);

    // Parse Excel
    const workbook = XLSX.read(data, { type: "array" });
    console.log(`Workbook sheets: ${workbook.SheetNames.join(", ")}`);

    const allItems: PricingItem[] = [];
    const errors: string[] = [];

    // Process each sheet
    for (const sheetName of workbook.SheetNames) {
      console.log(`Processing sheet: ${sheetName}`);
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: "" });

      if (jsonData.length === 0) {
        errors.push(`Sheet "${sheetName}" is empty`);
        continue;
      }

      // Get headers from first row
      const headers = Object.keys(jsonData[0] || {});
      console.log(`Headers in ${sheetName}: ${headers.slice(0, 10).join(", ")}...`);

      // Parse each row
      for (let i = 0; i < jsonData.length; i++) {
        const row = jsonData[i];
        const parsed = parseRow(row, headers);
        if (parsed && parsed.item_name) {
          allItems.push(parsed as PricingItem);
        }
      }
    }

    console.log(`Total items parsed: ${allItems.length}`);

    if (allItems.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "No valid pricing items found in file",
          errors,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Clear existing data if requested
    if (clearExisting) {
      console.log("Clearing existing pricing_items...");
      const { error: deleteError } = await supabase
        .from("pricing_items")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000"); // Delete all

      if (deleteError) {
        console.error("Error clearing data:", deleteError);
        errors.push(`Failed to clear existing data: ${deleteError.message}`);
      }
    }

    // Insert items in batches of 100
    const batchSize = 100;
    let insertedCount = 0;
    let skippedCount = 0;

    for (let i = 0; i < allItems.length; i += batchSize) {
      const batch = allItems.slice(i, i + batchSize);

      const { data: inserted, error: insertError } = await supabase
        .from("pricing_items")
        .upsert(
          batch.map((item) => ({
            ...item,
            is_active: true,
            source: "excel_import",
          })),
          { onConflict: "item_name,category", ignoreDuplicates: false }
        )
        .select("id");

      if (insertError) {
        console.error(`Error inserting batch ${i / batchSize + 1}:`, insertError);
        errors.push(`Batch ${i / batchSize + 1} error: ${insertError.message}`);
        skippedCount += batch.length;
      } else {
        insertedCount += inserted?.length || 0;
      }
    }

    console.log(`Import complete: ${insertedCount} inserted, ${skippedCount} skipped`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully imported ${insertedCount} pricing items`,
        stats: {
          totalParsed: allItems.length,
          inserted: insertedCount,
          skipped: skippedCount,
          sheets: workbook.SheetNames.length,
          errors: errors.length,
        },
        errors: errors.length > 0 ? errors : undefined,
        preview: allItems.slice(0, 5).map((i) => ({
          name: i.item_name,
          category: i.category,
          midPrice: i.mid_premium_price,
        })),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Import error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
