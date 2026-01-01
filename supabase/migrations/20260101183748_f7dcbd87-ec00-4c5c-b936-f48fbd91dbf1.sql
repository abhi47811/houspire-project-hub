-- Add synonyms for the specific items that failed to match
-- These map budget_items names to pricing_items names

INSERT INTO item_synonyms (synonym, canonical_name, category, confidence_score, source) VALUES
-- Flooring
('italian marble flooring', 'Italian Marble', 'Flooring', 0.95, 'emergency_fix'),
('marble border design', 'Marble Border', 'Flooring', 0.95, 'emergency_fix'),
('floor leveling & preparation', 'Floor Leveling', 'Flooring', 0.95, 'emergency_fix'),
('floor leveling preparation', 'Floor Leveling', 'Flooring', 0.95, 'emergency_fix'),
-- Wall Treatment / Paint
('asian paints royale luxury', 'Premium Wall Paint', 'Wall Finish', 0.90, 'emergency_fix'),
('asian paints royale', 'Premium Wall Paint', 'Wall Finish', 0.90, 'emergency_fix'),
('royale luxury paint', 'Premium Wall Paint', 'Wall Finish', 0.90, 'emergency_fix'),
('accent wall textured paint', 'Textured Wall Paint', 'Wall Finish', 0.95, 'emergency_fix'),
('accent wall - textured paint', 'Textured Wall Paint', 'Wall Finish', 0.95, 'emergency_fix'),
('wall paneling wpc', 'WPC Wall Panel', 'Wall Finish', 0.95, 'emergency_fix'),
('wall paneling - wpc', 'WPC Wall Panel', 'Wall Finish', 0.95, 'emergency_fix'),
('wpc wall panel', 'WPC Wall Panel', 'Wall Finish', 0.95, 'emergency_fix'),
-- Ceiling
('false ceiling gypsum', 'Gypsum False Ceiling', 'Ceiling', 0.95, 'emergency_fix'),
('false ceiling - gypsum', 'Gypsum False Ceiling', 'Ceiling', 0.95, 'emergency_fix'),
('gypsum ceiling', 'Gypsum False Ceiling', 'Ceiling', 0.95, 'emergency_fix'),
('cove lighting channel', 'Cove Light Channel', 'Ceiling', 0.95, 'emergency_fix'),
('pop cornice', 'POP Cornice', 'Ceiling', 0.95, 'emergency_fix'),
-- Furniture
('l-shaped sofa', 'L-Shaped Sofa', 'Furniture', 0.98, 'emergency_fix'),
('l shaped sofa', 'L-Shaped Sofa', 'Furniture', 0.98, 'emergency_fix'),
('dining table', 'Dining Table 6 Seater', 'Furniture', 0.90, 'emergency_fix'),
('dining chairs', 'Dining Chair', 'Furniture', 0.95, 'emergency_fix'),
('tv unit', 'TV Unit', 'Furniture', 0.98, 'emergency_fix'),
('center table', 'Coffee Table', 'Furniture', 0.95, 'emergency_fix'),
('centre table', 'Coffee Table', 'Furniture', 0.95, 'emergency_fix'),
-- Lighting
('chandelier living room', 'Chandelier', 'Lighting', 0.95, 'emergency_fix'),
('chandelier - living room', 'Chandelier', 'Lighting', 0.95, 'emergency_fix'),
('recessed downlights', 'LED Downlight', 'Lighting', 0.95, 'emergency_fix'),
('led strip lights', 'LED Strip Light', 'Lighting', 0.95, 'emergency_fix'),
('wall sconces', 'Wall Sconce', 'Lighting', 0.95, 'emergency_fix'),
-- Fixtures
('window blinds', 'Roller Blinds', 'Soft Furnishings', 0.90, 'emergency_fix'),
('curtain rods', 'Curtain Rod', 'Soft Furnishings', 0.95, 'emergency_fix'),
('ac points conduit', 'AC Point', 'Electrical', 0.90, 'emergency_fix'),
('ac points & conduit', 'AC Point', 'Electrical', 0.90, 'emergency_fix'),
('electrical points', 'Electrical Point', 'Electrical', 0.95, 'emergency_fix')
ON CONFLICT (synonym, category) DO UPDATE SET 
  canonical_name = EXCLUDED.canonical_name,
  confidence_score = GREATEST(item_synonyms.confidence_score, EXCLUDED.confidence_score),
  source = 'emergency_fix',
  updated_at = now();