-- Add comprehensive paint pricing items
INSERT INTO pricing_items (item_name, category, sub_category, unit, budget_price, mid_premium_price, premium_price, gst_percent, specification, keywords, synonyms, is_active) VALUES
-- Standard Interior Paints
('Interior Emulsion Paint', 'Finishes', 'Wall Paint', 'sqft', 12, 18, 25, 18, '2 coats application, Asian/Berger/Nerolac standard range', ARRAY['paint', 'emulsion', 'wall paint', 'interior paint'], ARRAY['painted wall', 'white wall', 'colored wall', 'matte wall'], true),
('Wall Primer', 'Finishes', 'Wall Paint', 'sqft', 8, 12, 15, 18, 'Single coat primer for new walls', ARRAY['primer', 'wall primer', 'base coat'], ARRAY['primed wall', 'base coat'], true),
('Wall Putty', 'Finishes', 'Wall Paint', 'sqft', 10, 15, 20, 18, '2 coats application for smooth finish', ARRAY['putty', 'wall putty', 'leveling'], ARRAY['smooth wall', 'putty finish'], true),

-- Premium Paints
('Premium Emulsion Paint', 'Finishes', 'Wall Paint', 'sqft', 30, 45, 60, 18, '2 coats, Royale/Silk/Velvet Touch range, washable', ARRAY['premium paint', 'royale', 'silk finish', 'satin'], ARRAY['satin wall', 'silk finish wall', 'premium wall', 'accent wall', 'feature wall'], true),
('Premium Wall Primer', 'Finishes', 'Wall Paint', 'sqft', 12, 18, 25, 18, 'Premium primer for luxury finishes', ARRAY['premium primer', 'luxury primer'], ARRAY['luxury base coat'], true),

-- Luxury/Designer Paints
('Luxury Designer Paint', 'Finishes', 'Wall Paint', 'sqft', 80, 120, 180, 18, 'Royale Play/Special Effects range, designer finishes', ARRAY['designer paint', 'royale play', 'special effects'], ARRAY['designer wall', 'luxury wall finish', 'artistic wall'], true),
('Textured Wall Paint', 'Finishes', 'Wall Paint', 'sqft', 50, 85, 120, 18, 'Textured/patterned finish, includes application', ARRAY['textured paint', 'texture finish', 'patterned wall'], ARRAY['textured wall', 'patterned wall', 'texture finish wall'], true),
('Metallic Paint Finish', 'Finishes', 'Wall Paint', 'sqft', 100, 150, 220, 18, 'Metallic/shimmer effect paint', ARRAY['metallic paint', 'shimmer', 'glitter wall'], ARRAY['metallic wall', 'shimmer wall', 'glitter finish'], true),

-- Specialty Finishes
('Stucco Venetian Plaster', 'Finishes', 'Wall Paint', 'sqft', 150, 250, 400, 18, 'Italian plaster finish, multi-coat application', ARRAY['venetian', 'stucco', 'italian plaster'], ARRAY['venetian plaster wall', 'stucco wall', 'plaster finish'], true),
('Limewash Paint', 'Finishes', 'Wall Paint', 'sqft', 40, 70, 110, 18, 'Traditional limewash finish, matte texture', ARRAY['limewash', 'lime paint', 'traditional paint'], ARRAY['limewash wall', 'lime finish'], true),
('Duco Paint Gloss', 'Finishes', 'Wall Paint', 'sqft', 120, 180, 280, 18, 'High gloss enamel finish, spray application', ARRAY['duco', 'gloss paint', 'enamel', 'lacquer'], ARRAY['glossy wall', 'high gloss wall', 'duco finish'], true),

-- Ceiling Paint
('Ceiling Paint', 'Finishes', 'Ceiling', 'sqft', 10, 15, 22, 18, 'Ceiling emulsion, white/off-white', ARRAY['ceiling paint', 'roof paint'], ARRAY['painted ceiling', 'white ceiling'], true);

-- Add paint synonyms for AI detection
INSERT INTO item_synonyms (synonym, canonical_name, category, confidence_score, source, is_active) VALUES
('painted wall', 'Interior Emulsion Paint', 'Finishes', 0.95, 'manual', true),
('white painted wall', 'Interior Emulsion Paint', 'Finishes', 0.95, 'manual', true),
('colored wall', 'Interior Emulsion Paint', 'Finishes', 0.90, 'manual', true),
('matte finish wall', 'Interior Emulsion Paint', 'Finishes', 0.90, 'manual', true),
('flat finish wall', 'Interior Emulsion Paint', 'Finishes', 0.90, 'manual', true),
('accent wall', 'Premium Emulsion Paint', 'Finishes', 0.90, 'manual', true),
('feature wall', 'Premium Emulsion Paint', 'Finishes', 0.90, 'manual', true),
('satin finish wall', 'Premium Emulsion Paint', 'Finishes', 0.92, 'manual', true),
('silk finish wall', 'Premium Emulsion Paint', 'Finishes', 0.92, 'manual', true),
('eggshell finish wall', 'Premium Emulsion Paint', 'Finishes', 0.90, 'manual', true),
('textured wall', 'Textured Wall Paint', 'Finishes', 0.95, 'manual', true),
('patterned wall', 'Textured Wall Paint', 'Finishes', 0.90, 'manual', true),
('texture finish', 'Textured Wall Paint', 'Finishes', 0.92, 'manual', true),
('glossy wall', 'Duco Paint Gloss', 'Finishes', 0.92, 'manual', true),
('high gloss wall', 'Duco Paint Gloss', 'Finishes', 0.95, 'manual', true),
('lacquer wall', 'Duco Paint Gloss', 'Finishes', 0.88, 'manual', true),
('venetian plaster', 'Stucco Venetian Plaster', 'Finishes', 0.98, 'manual', true),
('stucco finish', 'Stucco Venetian Plaster', 'Finishes', 0.95, 'manual', true),
('italian plaster', 'Stucco Venetian Plaster', 'Finishes', 0.95, 'manual', true),
('limewash wall', 'Limewash Paint', 'Finishes', 0.95, 'manual', true),
('lime finish', 'Limewash Paint', 'Finishes', 0.92, 'manual', true),
('designer wall finish', 'Luxury Designer Paint', 'Finishes', 0.90, 'manual', true),
('artistic wall', 'Luxury Designer Paint', 'Finishes', 0.85, 'manual', true),
('metallic wall', 'Metallic Paint Finish', 'Finishes', 0.95, 'manual', true),
('shimmer wall', 'Metallic Paint Finish', 'Finishes', 0.90, 'manual', true),
('painted ceiling', 'Ceiling Paint', 'Finishes', 0.95, 'manual', true),
('white ceiling', 'Ceiling Paint', 'Finishes', 0.90, 'manual', true);