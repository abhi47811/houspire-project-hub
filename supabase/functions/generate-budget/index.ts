import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Mock budget items for demo - in production, this would use AI vision to analyze room images
const generateMockBudgetItems = (projectId: string, city: string) => {
  const cityMultipliers: Record<string, number> = {
    'Mumbai': 1.2,
    'Delhi': 1.15,
    'Bangalore': 1.1,
    'Chennai': 1.05,
    'Hyderabad': 1.0,
    'Pune': 1.05,
    'Kolkata': 0.95,
    'Ahmedabad': 0.9,
    'Jaipur': 0.85,
    'Surat': 0.85,
    'Lucknow': 0.8,
  };

  const multiplier = cityMultipliers[city] || 1.0;

  const baseItems = [
    // Flooring
    { category: 'flooring', item_name: 'Italian Marble Flooring', specification: 'Statuario White, 800x800mm, polished finish', quantity: 450, unit: 'sqft', rate: 350 },
    { category: 'flooring', item_name: 'Marble Border Design', specification: 'Greek key pattern, dark emperador', quantity: 120, unit: 'rft', rate: 280 },
    { category: 'flooring', item_name: 'Floor Leveling & Preparation', specification: 'Self-leveling compound, 3mm thickness', quantity: 450, unit: 'sqft', rate: 45 },
    
    // Wall Treatment
    { category: 'wall_treatment', item_name: 'Asian Paints Royale Luxury', specification: 'Premium emulsion, 2 coats, off-white base', quantity: 1200, unit: 'sqft', rate: 35 },
    { category: 'wall_treatment', item_name: 'Accent Wall - Textured Paint', specification: 'Metallic finish, feature wall only', quantity: 150, unit: 'sqft', rate: 85 },
    { category: 'wall_treatment', item_name: 'Wall Paneling - WPC', specification: 'Wood polymer composite, 8mm, teak finish', quantity: 200, unit: 'sqft', rate: 180 },
    
    // Ceiling
    { category: 'ceiling', item_name: 'False Ceiling - Gypsum', specification: 'Saint-Gobain 12.5mm, 8" drop, plain design', quantity: 400, unit: 'sqft', rate: 95 },
    { category: 'ceiling', item_name: 'Cove Lighting Channel', specification: 'Aluminum profile, LED strip housing', quantity: 80, unit: 'rft', rate: 120 },
    { category: 'ceiling', item_name: 'POP Cornice', specification: 'L-shaped cornice, 4" x 4"', quantity: 120, unit: 'rft', rate: 65 },
    
    // Furniture
    { category: 'furniture', item_name: 'L-Shaped Sofa', specification: 'Premium fabric, modular, 10x6 ft', quantity: 1, unit: 'set', rate: 85000 },
    { category: 'furniture', item_name: 'Center Table', specification: 'Marble top, metal base, 4x2.5 ft', quantity: 1, unit: 'nos', rate: 18000 },
    { category: 'furniture', item_name: 'TV Unit', specification: 'Custom built, lacquered finish, 8 ft width', quantity: 1, unit: 'nos', rate: 45000 },
    { category: 'furniture', item_name: 'Dining Table', specification: 'Solid wood, 6-seater, contemporary', quantity: 1, unit: 'set', rate: 55000 },
    { category: 'furniture', item_name: 'Dining Chairs', specification: 'Upholstered, matching set', quantity: 6, unit: 'nos', rate: 8000 },
    { category: 'furniture', item_name: 'Crockery Unit', specification: 'Glass doors, LED lit, 6 ft height', quantity: 1, unit: 'nos', rate: 35000 },
    
    // Lighting
    { category: 'lighting', item_name: 'Chandelier - Living Room', specification: 'Crystal, 24" diameter, contemporary', quantity: 1, unit: 'nos', rate: 28000 },
    { category: 'lighting', item_name: 'Recessed Downlights', specification: 'LED 12W, warm white, 4" cut', quantity: 24, unit: 'nos', rate: 850 },
    { category: 'lighting', item_name: 'LED Strip Lights', specification: 'SMD 5050, 14.4W/m, warm white', quantity: 40, unit: 'mtr', rate: 180 },
    { category: 'lighting', item_name: 'Wall Sconces', specification: 'Brass finish, accent lighting', quantity: 4, unit: 'nos', rate: 3500 },
    
    // Fixtures
    { category: 'fixtures', item_name: 'Electrical Points', specification: 'Modular switches, Legrand Mylinc', quantity: 35, unit: 'nos', rate: 450 },
    { category: 'fixtures', item_name: 'AC Points & Conduit', specification: '2 ton split AC provision', quantity: 3, unit: 'nos', rate: 2500 },
    { category: 'fixtures', item_name: 'Curtain Rods', specification: 'Motorized track, 10 ft span', quantity: 3, unit: 'nos', rate: 12000 },
    { category: 'fixtures', item_name: 'Window Blinds', specification: 'Roller blinds, blackout, custom size', quantity: 4, unit: 'nos', rate: 4500 },
  ];

  return baseItems.map((item, index) => ({
    project_id: projectId,
    category: item.category,
    item_name: item.item_name,
    specification: item.specification,
    quantity: item.quantity,
    unit: item.unit,
    rate: Math.round(item.rate * multiplier),
    sort_order: index + 1,
    status: 'pending',
  }));
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { projectId, city } = await req.json();
    
    if (!projectId) {
      throw new Error('Project ID is required');
    }

    console.log(`Generating budget for project: ${projectId}, city: ${city}`);

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Delete existing budget items for this project
    const { error: deleteError } = await supabase
      .from('budget_items')
      .delete()
      .eq('project_id', projectId);

    if (deleteError) {
      console.error('Error deleting existing items:', deleteError);
      throw deleteError;
    }

    // Generate new budget items
    const budgetItems = generateMockBudgetItems(projectId, city || 'Mumbai');

    // Insert new items
    const { data, error: insertError } = await supabase
      .from('budget_items')
      .insert(budgetItems)
      .select();

    if (insertError) {
      console.error('Error inserting budget items:', insertError);
      throw insertError;
    }

    console.log(`Generated ${data?.length || 0} budget items`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        itemsCount: data?.length || 0,
        message: 'Budget generated successfully'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate budget';
    console.error('Error in generate-budget:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
