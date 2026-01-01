import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import * as XLSX from "https://esm.sh/xlsx@0.18.5";
import JSZip from "https://esm.sh/jszip@3.10.1";

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

// GST rates per Module 07 specification
const categoryGstRates: Record<string, number> = {
  // 0% GST
  plants: 0,
  live_plants: 0,
  
  // 5% GST
  bed_linen: 5,
  towels: 5,
  terracotta: 5,
  linen: 5,
  textiles: 5,
  
  // 12% GST
  furniture: 12,
  wood_furniture: 12,
  led_lights: 12,
  led: 12,
  curtains: 12,
  rugs: 12,
  carpet: 12,
  modular_kitchen: 12,
  kitchen: 12,
  wardrobe: 12,
  storage: 12,
  
  // 18% GST
  metal_furniture: 18,
  tiles: 18,
  flooring: 18,
  electrical: 18,
  plumbing: 18,
  services: 18,
  civil: 18,
  paint: 18,
  wall_finish: 18,
  ceiling: 18,
  hardware: 18,
  glass: 18,
  mirror: 18,
  bathroom: 18,
  sanitaryware: 18,
  decor: 18,
  lighting: 18,
  outdoor: 18,
  
  // 28% GST
  marble: 28,
  granite: 28,
  ac: 28,
  air_conditioning: 28,
  luxury_stone: 28,
};

// City multipliers per Module 07 specification
const defaultMultipliers = {
  hyderabad: 1.10,
  delhi: 1.20,
  bangalore: 1.15,
  pune: 1.05,
  mumbai: 1.25,
  chennai: 1.10,
  kolkata: 0.95,
  ahmedabad: 0.93,
  jaipur: 0.90,
  lucknow: 0.88,
  surat: 0.90,
  kochi: 0.96,
};

// Common synonyms for matching per Module 19
const synonymMap: Record<string, string[]> = {
  // Living room
  sofa: ["couch", "settee", "lounge", "divan", "diwan"],
  "coffee table": ["teapoy", "centre table", "center table", "tea table"],
  "tv unit": ["tv cabinet", "entertainment unit", "media console", "tv stand"],
  "side table": ["end table", "lamp table", "accent table"],
  bookshelf: ["bookcase", "book rack", "display shelf"],
  
  // Bedroom
  bed: ["cot", "bedstead", "divan bed"],
  wardrobe: ["almirah", "almari", "cupboard", "closet", "godrej"],
  dresser: ["dressing table", "vanity", "makeup table"],
  nightstand: ["bedside table", "night table", "side cabinet"],
  mattress: ["gadda", "foam", "spring mattress", "coir mattress"],
  
  // Kitchen
  countertop: ["kitchen top", "platform", "slab", "worktop"],
  granite: ["stone top", "natural stone"],
  quartz: ["engineered stone", "silestone", "caesarstone"],
  cabinet: ["shutter", "kitchen unit", "storage unit"],
  chimney: ["exhaust hood", "range hood", "kitchen hood"],
  hob: ["cooktop", "gas stove", "burner"],
  sink: ["kitchen sink", "wash basin"],
  
  // Finishes
  laminate: ["sunmica", "formica", "ply laminate", "decorative laminate"],
  veneer: ["wood veneer", "natural veneer"],
  acrylic: ["high gloss", "glass finish"],
  membrane: ["pvc membrane", "thermofoil"],
  paint: ["wall paint", "emulsion", "coating", "distemper"],
  wallpaper: ["wall covering", "wall paper"],
  
  // Flooring
  tile: ["floor tile", "ceramic tile", "vitrified tile"],
  marble: ["italian marble", "makrana", "statuario"],
  wooden: ["wood flooring", "hardwood", "engineered wood"],
  vinyl: ["lvt", "spc", "luxury vinyl"],
  carpet: ["rug", "floor carpet", "wall to wall carpet"],
  
  // Lighting
  chandelier: ["pendant light", "hanging light", "ceiling lamp"],
  "led panel": ["panel light", "false ceiling light", "recessed light"],
  spotlight: ["spot light", "track light", "accent light"],
  "wall light": ["sconce", "wall lamp", "wall fixture"],
  
  // Bathroom
  "wash basin": ["sink", "lavatory", "hand basin"],
  toilet: ["wc", "commode", "water closet", "ewc"],
  shower: ["rain shower", "overhead shower", "hand shower"],
  faucet: ["tap", "mixer", "water tap"],
  geyser: ["water heater", "instant heater"],
};

// Generate synonyms for an item
function generateSynonyms(itemName: string, category: string): string[] {
  const synonyms: string[] = [];
  const name = itemName.toLowerCase();

  for (const [key, values] of Object.entries(synonymMap)) {
    if (name.includes(key) || values.some(v => name.includes(v))) {
      synonyms.push(key, ...values);
    }
  }

  return [...new Set(synonyms.filter(s => !name.includes(s)))];
}

// Generate search keywords
function generateKeywords(itemName: string, category: string, spec?: string): string[] {
  const keywords: string[] = [];
  const words = itemName.toLowerCase().split(/[\s\-_,()]+/);
  keywords.push(...words.filter((w) => w.length > 2));
  
  if (spec) {
    const specWords = spec.toLowerCase().split(/[\s\-_,()]+/);
    keywords.push(...specWords.filter((w) => w.length > 2));
  }
  
  keywords.push(category.toLowerCase().replace(/_/g, " "));
  
  // Add synonyms as keywords too
  const syns = generateSynonyms(itemName, category);
  keywords.push(...syns.map(s => s.toLowerCase()));
  
  return [...new Set(keywords)];
}

// Detect category from sheet name or item
function detectCategory(sheetName: string, itemName: string): string {
  const text = `${sheetName} ${itemName}`.toLowerCase();
  
  const categoryPatterns: [RegExp, string][] = [
    [/kitchen|modular|countertop|hob|chimney|sink/i, "kitchen"],
    [/wardrobe|closet|almirah|cupboard/i, "wardrobe"],
    [/bathroom|toilet|sanitaryware|faucet|shower|wc/i, "bathroom"],
    [/flooring|tile|marble|granite|vinyl|wooden floor/i, "flooring"],
    [/paint|wall finish|emulsion|texture/i, "wall_finish"],
    [/ceiling|false ceiling|gypsum|pop/i, "ceiling"],
    [/light|lamp|led|chandelier|spotlight/i, "lighting"],
    [/electrical|switch|socket|wire|mcb/i, "electrical"],
    [/plumbing|pipe|cpvc|upvc/i, "plumbing"],
    [/curtain|blind|drape/i, "soft_furnishings"],
    [/carpet|rug/i, "soft_furnishings"],
    [/sofa|bed|chair|table|cabinet|shelf/i, "furniture"],
    [/decor|artifact|vase|frame/i, "decor"],
    [/mirror|glass/i, "glass"],
    [/hardware|handle|hinge|lock/i, "hardware"],
    [/civil|masonry|plaster/i, "civil"],
    [/outdoor|garden|balcony/i, "outdoor"],
  ];

  for (const [pattern, cat] of categoryPatterns) {
    if (pattern.test(text)) return cat;
  }
  
  return "furniture";
}

// Detect GST rate from category
function getGstRate(category: string): number {
  const normalizedCat = category.toLowerCase().replace(/[\s-]+/g, "_");
  return categoryGstRates[normalizedCat] ?? 18;
}

// Parse Excel row to pricing item
function parseRow(row: Record<string, unknown>, headers: string[], sheetName: string): Partial<PricingItem> | null {
  try {
    // Try to find item name column
    const itemNameKeys = ["item_name", "item", "name", "description", "product", "material", "particulars", "work description"];
    let itemName = "";
    for (const key of itemNameKeys) {
      const found = headers.find((h) => h.toLowerCase().includes(key));
      if (found && row[found]) {
        itemName = String(row[found]).trim();
        break;
      }
    }

    // Fallback: first non-empty string column
    if (!itemName) {
      for (const h of headers) {
        const val = row[h];
        if (val && typeof val === "string" && val.trim().length > 3 && !/^\d+$/.test(val.trim())) {
          itemName = val.trim();
          break;
        }
      }
    }

    if (!itemName || itemName.length < 2) return null;

    // Try to find category from row or use sheet name
    const categoryKeys = ["category", "type", "group", "section"];
    let category = "";
    for (const key of categoryKeys) {
      const found = headers.find((h) => h.toLowerCase().includes(key));
      if (found && row[found]) {
        category = String(row[found]).toLowerCase().replace(/[\s-]+/g, "_").trim();
        break;
      }
    }
    
    if (!category) {
      category = detectCategory(sheetName, itemName);
    }

    // Try to find specification
    const specKeys = ["specification", "spec", "details", "size", "dimension", "make", "brand"];
    let specification = "";
    for (const key of specKeys) {
      const found = headers.find((h) => h.toLowerCase().includes(key));
      if (found && row[found]) {
        specification = String(row[found]).trim();
        break;
      }
    }

    // Try to find unit
    const unitKeys = ["unit", "uom", "measure", "qty unit"];
    let unit = "nos";
    for (const key of unitKeys) {
      const found = headers.find((h) => h.toLowerCase() === key || h.toLowerCase().includes(key));
      if (found && row[found]) {
        const unitVal = String(row[found]).toLowerCase().trim();
        // Normalize common units
        if (unitVal.includes("sq") || unitVal.includes("sft")) unit = "sqft";
        else if (unitVal.includes("rft") || unitVal.includes("running")) unit = "rft";
        else if (unitVal.includes("lft") || unitVal === "ft") unit = "ft";
        else if (unitVal.includes("lot")) unit = "lot";
        else if (unitVal.includes("set")) unit = "set";
        else if (unitVal.includes("pair")) unit = "pair";
        else if (unitVal.includes("kg") || unitVal.includes("kgs")) unit = "kg";
        else if (unitVal.includes("no") || unitVal.includes("nos") || unitVal.includes("pc") || unitVal.includes("pcs")) unit = "nos";
        else unit = unitVal.slice(0, 10);
        break;
      }
    }

    // Extract prices - look for budget/mid/premium patterns
    let budgetPrice = 0;
    let midPremiumPrice = 0;
    let premiumPrice = 0;
    let basePrice = 0;

    for (const header of headers) {
      const h = header.toLowerCase();
      const rawVal = row[header];
      if (rawVal === null || rawVal === undefined || rawVal === "") continue;
      
      const val = Number(String(rawVal).replace(/[₹,\s]/g, "").replace(/lac|lakh|l$/i, "00000").replace(/k$/i, "000"));
      if (isNaN(val) || val <= 0) continue;

      // Budget tier
      if (h.includes("budget") || h.includes("economy") || h.includes("basic")) {
        budgetPrice = val;
      }
      // Mid/Standard tier
      else if (h.includes("mid") || h.includes("standard") || h.includes("regular")) {
        midPremiumPrice = val;
      }
      // Premium tier
      else if ((h.includes("premium") || h.includes("luxury") || h.includes("high")) && !h.includes("mid")) {
        premiumPrice = val;
      }
      // Generic rate/price column
      else if ((h.includes("rate") || h.includes("price") || h.includes("cost") || h.includes("amount")) && basePrice === 0) {
        basePrice = val;
      }
    }

    // Calculate missing tiers from base price or from each other
    if (basePrice > 0 && midPremiumPrice === 0) {
      midPremiumPrice = basePrice;
    }
    
    if (midPremiumPrice > 0) {
      if (budgetPrice === 0) budgetPrice = Math.round(midPremiumPrice * 0.7);
      if (premiumPrice === 0) premiumPrice = Math.round(midPremiumPrice * 1.4);
    } else if (budgetPrice > 0) {
      midPremiumPrice = Math.round(budgetPrice * 1.3);
      premiumPrice = Math.round(budgetPrice * 1.8);
    } else if (premiumPrice > 0) {
      midPremiumPrice = Math.round(premiumPrice * 0.75);
      budgetPrice = Math.round(premiumPrice * 0.5);
    }

    // Skip if no prices found
    if (budgetPrice === 0 && midPremiumPrice === 0 && premiumPrice === 0) {
      return null;
    }

    const gstPercent = getGstRate(category);

    return {
      item_name: itemName,
      category,
      sub_category: sheetName.toLowerCase().replace(/[\s-]+/g, "_"),
      specification: specification || undefined,
      unit,
      budget_price: budgetPrice,
      mid_premium_price: midPremiumPrice,
      premium_price: premiumPrice,
      gst_percent: gstPercent,
      hyderabad_multiplier: defaultMultipliers.hyderabad,
      delhi_multiplier: defaultMultipliers.delhi,
      bangalore_multiplier: defaultMultipliers.bangalore,
      pune_multiplier: defaultMultipliers.pune,
      mumbai_multiplier: defaultMultipliers.mumbai,
      chennai_multiplier: defaultMultipliers.chennai,
      kolkata_multiplier: defaultMultipliers.kolkata,
      ahmedabad_multiplier: defaultMultipliers.ahmedabad,
      jaipur_multiplier: defaultMultipliers.jaipur,
      lucknow_multiplier: defaultMultipliers.lucknow,
      surat_multiplier: defaultMultipliers.surat,
      synonyms: generateSynonyms(itemName, category),
      keywords: generateKeywords(itemName, category, specification),
    };
  } catch (e) {
    console.error("Error parsing row:", e);
    return null;
  }
}

// Process a single Excel file
function processExcelFile(data: Uint8Array, fileName: string): { items: PricingItem[]; errors: string[] } {
  const items: PricingItem[] = [];
  const errors: string[] = [];

  try {
    const workbook = XLSX.read(data, { type: "array" });
    console.log(`[${fileName}] Sheets: ${workbook.SheetNames.join(", ")}`);

    for (const sheetName of workbook.SheetNames) {
      // Skip sheets that look like instructions or summary
      if (/instruction|summary|index|cover|template/i.test(sheetName)) {
        continue;
      }

      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: "" });

      if (jsonData.length === 0) {
        continue;
      }

      const headers = Object.keys(jsonData[0] || {});
      console.log(`[${fileName}/${sheetName}] ${jsonData.length} rows, headers: ${headers.slice(0, 5).join(", ")}...`);

      for (const row of jsonData) {
        const parsed = parseRow(row, headers, sheetName);
        if (parsed && parsed.item_name) {
          items.push(parsed as PricingItem);
        }
      }
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    errors.push(`Error processing ${fileName}: ${msg}`);
    console.error(`Error processing ${fileName}:`, e);
  }

  return { items, errors };
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

    console.log(`Processing file: ${file.name}, size: ${file.size} bytes, type: ${file.type}`);

    const arrayBuffer = await file.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);

    const allItems: PricingItem[] = [];
    const errors: string[] = [];
    const fileResults: Array<{ name: string; items: number }> = [];

    // Check if it's a ZIP file
    const isZip = file.name.toLowerCase().endsWith(".zip") || file.type === "application/zip" || file.type === "application/x-zip-compressed";

    if (isZip) {
      console.log("Detected ZIP file, extracting...");
      
      try {
        const zip = await JSZip.loadAsync(data);
        const files = Object.keys(zip.files).filter(
          (name) => /\.(xlsx|xls|csv)$/i.test(name) && !name.startsWith("__MACOSX") && !name.startsWith(".")
        );

        console.log(`Found ${files.length} Excel/CSV files in ZIP: ${files.join(", ")}`);

        for (const fileName of files) {
          const zipEntry = zip.files[fileName];
          if (zipEntry.dir) continue;

          try {
            const fileData = await zipEntry.async("uint8array");
            const result = processExcelFile(fileData, fileName);
            allItems.push(...result.items);
            errors.push(...result.errors);
            fileResults.push({ name: fileName, items: result.items.length });
            console.log(`Extracted ${result.items.length} items from ${fileName}`);
          } catch (e) {
            const msg = e instanceof Error ? e.message : String(e);
            errors.push(`Failed to process ${fileName}: ${msg}`);
          }
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        return new Response(
          JSON.stringify({ success: false, error: `Failed to extract ZIP: ${msg}` }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
        );
      }
    } else {
      // Single Excel/CSV file
      const result = processExcelFile(data, file.name);
      allItems.push(...result.items);
      errors.push(...result.errors);
      fileResults.push({ name: file.name, items: result.items.length });
    }

    console.log(`Total items parsed: ${allItems.length} from ${fileResults.length} files`);

    if (allItems.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "No valid pricing items found in uploaded file(s)",
          errors,
          fileResults,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Deduplicate by item_name + category
    const seen = new Set<string>();
    const uniqueItems = allItems.filter((item) => {
      const key = `${item.item_name.toLowerCase()}|${item.category}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    console.log(`After deduplication: ${uniqueItems.length} unique items`);

    // Clear existing data if requested
    if (clearExisting) {
      console.log("Clearing existing pricing_items...");
      const { error: deleteError } = await supabase
        .from("pricing_items")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000");

      if (deleteError) {
        console.error("Error clearing data:", deleteError);
        errors.push(`Failed to clear existing data: ${deleteError.message}`);
      }
    }

    // Insert items in batches
    const batchSize = 100;
    let insertedCount = 0;
    let skippedCount = 0;

    for (let i = 0; i < uniqueItems.length; i += batchSize) {
      const batch = uniqueItems.slice(i, i + batchSize);

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
        console.error(`Error inserting batch ${Math.floor(i / batchSize) + 1}:`, insertError);
        errors.push(`Batch ${Math.floor(i / batchSize) + 1} error: ${insertError.message}`);
        skippedCount += batch.length;
      } else {
        insertedCount += inserted?.length || batch.length;
      }
    }

    console.log(`Import complete: ${insertedCount} inserted, ${skippedCount} skipped`);

    // Get category summary
    const categoryCounts: Record<string, number> = {};
    for (const item of uniqueItems) {
      categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully imported ${insertedCount} pricing items`,
        stats: {
          totalParsed: allItems.length,
          uniqueItems: uniqueItems.length,
          inserted: insertedCount,
          skipped: skippedCount,
          files: fileResults.length,
          errors: errors.length,
        },
        fileResults,
        categoryCounts,
        errors: errors.length > 0 ? errors : undefined,
        preview: uniqueItems.slice(0, 10).map((i) => ({
          name: i.item_name,
          category: i.category,
          unit: i.unit,
          budgetPrice: i.budget_price,
          midPrice: i.mid_premium_price,
          premiumPrice: i.premium_price,
          gst: i.gst_percent,
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
