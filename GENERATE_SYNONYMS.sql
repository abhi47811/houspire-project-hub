-- =============================================
-- COMPREHENSIVE SYNONYM GENERATION
-- Target: Add 200-300 synonyms to improve match rate
-- Current: 573 synonyms | Target: 800+ synonyms
-- Expected Impact: 33% → 60-70% match rate
-- =============================================

-- Based on living room render unmatched items (18/27)
-- Common variations that need synonyms

-- =============================================
-- FURNITURE SYNONYMS
-- =============================================

-- Seating
INSERT INTO item_synonyms (synonym, canonical_name, category, source, confidence_score, is_active)
VALUES 
  ('couch', 'Sofa', 'Furniture', 'manual_generation', 0.95, true),
  ('settee', 'Sofa', 'Furniture', 'manual_generation', 0.90, true),
  ('loveseat', 'Sofa 2-Seater', 'Furniture', 'manual_generation', 0.95, true),
  ('sectional', 'L-Shaped Sofa', 'Furniture', 'manual_generation', 0.90, true),
  ('accent chair', 'Lounge Chair', 'Furniture', 'manual_generation', 0.85, true),
  ('armchair', 'Lounge Chair', 'Furniture', 'manual_generation', 0.90, true),
  ('recliner', 'Lounge Chair', 'Furniture', 'manual_generation', 0.85, true),
  ('ottoman', 'Footstool', 'Furniture', 'manual_generation', 0.90, true),
  ('pouf', 'Footstool', 'Furniture', 'manual_generation', 0.85, true)
ON CONFLICT (synonym, canonical_name) DO NOTHING;

-- Tables
INSERT INTO item_synonyms (synonym, canonical_name, category, source, confidence_score, is_active)
VALUES 
  ('coffee table', 'Center Table', 'Furniture', 'manual_generation', 0.95, true),
  ('center table', 'Coffee Table', 'Furniture', 'manual_generation', 0.95, true),
  ('side table', 'End Table', 'Furniture', 'manual_generation', 0.95, true),
  ('end table', 'Side Table', 'Furniture', 'manual_generation', 0.95, true),
  ('console table', 'Side Table', 'Furniture', 'manual_generation', 0.85, true),
  ('nesting tables', 'Side Table Set', 'Furniture', 'manual_generation', 0.80, true),
  ('c-table', 'Side Table', 'Furniture', 'manual_generation', 0.75, true)
ON CONFLICT (synonym, canonical_name) DO NOTHING;

-- Storage & TV Units
INSERT INTO item_synonyms (synonym, canonical_name, category, source, confidence_score, is_active)
VALUES 
  ('tv stand', 'TV Unit', 'Furniture', 'manual_generation', 0.95, true),
  ('tv console', 'TV Unit', 'Furniture', 'manual_generation', 0.95, true),
  ('media console', 'TV Unit', 'Furniture', 'manual_generation', 0.95, true),
  ('entertainment unit', 'TV Unit', 'Furniture', 'manual_generation', 0.90, true),
  ('tv cabinet', 'TV Unit', 'Furniture', 'manual_generation', 0.90, true),
  ('bookshelf', 'Bookcase', 'Storage', 'manual_generation', 0.95, true),
  ('bookcase', 'Shelf Unit', 'Storage', 'manual_generation', 0.90, true),
  ('display cabinet', 'Display Unit', 'Storage', 'manual_generation', 0.95, true),
  ('crockery unit', 'Display Cabinet', 'Storage', 'manual_generation', 0.90, true)
ON CONFLICT (synonym, canonical_name) DO NOTHING;

-- Bedroom Furniture
INSERT INTO item_synonyms (synonym, canonical_name, category, source, confidence_score, is_active)
VALUES 
  ('nightstand', 'Bedside Table', 'Furniture', 'manual_generation', 0.95, true),
  ('night table', 'Bedside Table', 'Furniture', 'manual_generation', 0.95, true),
  ('bedside cabinet', 'Bedside Table', 'Furniture', 'manual_generation', 0.90, true),
  ('dresser', 'Chest of Drawers', 'Furniture', 'manual_generation', 0.90, true),
  ('chest', 'Chest of Drawers', 'Furniture', 'manual_generation', 0.85, true),
  ('wardrobe', 'Closet', 'Storage', 'manual_generation', 0.95, true),
  ('closet', 'Wardrobe', 'Storage', 'manual_generation', 0.95, true),
  ('almirah', 'Wardrobe', 'Storage', 'manual_generation', 0.90, true)
ON CONFLICT (synonym, canonical_name) DO NOTHING;

-- =============================================
-- LIGHTING SYNONYMS
-- =============================================

INSERT INTO item_synonyms (synonym, canonical_name, category, source, confidence_score, is_active)
VALUES 
  ('floor lamp', 'Standing Lamp', 'Lighting', 'manual_generation', 0.95, true),
  ('standing lamp', 'Floor Lamp', 'Lighting', 'manual_generation', 0.95, true),
  ('table lamp', 'Desk Lamp', 'Lighting', 'manual_generation', 0.90, true),
  ('desk lamp', 'Table Lamp', 'Lighting', 'manual_generation', 0.90, true),
  ('pendant light', 'Hanging Lamp', 'Lighting', 'manual_generation', 0.95, true),
  ('hanging light', 'Pendant Light', 'Lighting', 'manual_generation', 0.95, true),
  ('chandelier', 'Pendant Light', 'Lighting', 'manual_generation', 0.85, true),
  ('ceiling light', 'Ceiling Lamp', 'Lighting', 'manual_generation', 0.95, true),
  ('wall sconce', 'Wall Light', 'Lighting', 'manual_generation', 0.95, true),
  ('wall lamp', 'Wall Light', 'Lighting', 'manual_generation', 0.95, true),
  ('recessed light', 'Downlight', 'Lighting', 'manual_generation', 0.90, true),
  ('spotlight', 'Downlight', 'Lighting', 'manual_generation', 0.85, true)
ON CONFLICT (synonym, canonical_name) DO NOTHING;

-- =============================================
-- SOFT FURNISHINGS SYNONYMS
-- =============================================

INSERT INTO item_synonyms (synonym, canonical_name, category, source, confidence_score, is_active)
VALUES 
  ('throw blanket', 'Blanket', 'Soft Furnishings', 'manual_generation', 0.95, true),
  ('throw', 'Blanket', 'Soft Furnishings', 'manual_generation', 0.90, true),
  ('cushion', 'Pillow', 'Soft Furnishings', 'manual_generation', 0.90, true),
  ('throw pillow', 'Cushion', 'Soft Furnishings', 'manual_generation', 0.95, true),
  ('scatter cushion', 'Cushion', 'Soft Furnishings', 'manual_generation', 0.90, true),
  ('area rug', 'Rug', 'Soft Furnishings', 'manual_generation', 0.95, true),
  ('carpet', 'Rug', 'Soft Furnishings', 'manual_generation', 0.85, true),
  ('mat', 'Rug', 'Soft Furnishings', 'manual_generation', 0.80, true),
  ('curtain', 'Drapes', 'Soft Furnishings', 'manual_generation', 0.90, true),
  ('drapes', 'Curtains', 'Soft Furnishings', 'manual_generation', 0.90, true),
  ('blinds', 'Window Blinds', 'Soft Furnishings', 'manual_generation', 0.95, true),
  ('shades', 'Window Blinds', 'Soft Furnishings', 'manual_generation', 0.90, true)
ON CONFLICT (synonym, canonical_name) DO NOTHING;

-- =============================================
-- DECOR SYNONYMS
-- =============================================

INSERT INTO item_synonyms (synonym, canonical_name, category, source, confidence_score, is_active)
VALUES 
  ('wall art', 'Artwork', 'Decor', 'manual_generation', 0.95, true),
  ('painting', 'Wall Art', 'Decor', 'manual_generation', 0.90, true),
  ('picture frame', 'Photo Frame', 'Decor', 'manual_generation', 0.95, true),
  ('photo frame', 'Picture Frame', 'Decor', 'manual_generation', 0.95, true),
  ('mirror', 'Wall Mirror', 'Decor', 'manual_generation', 0.95, true),
  ('decorative mirror', 'Wall Mirror', 'Decor', 'manual_generation', 0.90, true),
  ('wall mirror', 'Mirror', 'Decor', 'manual_generation', 0.95, true),
  ('vase', 'Decorative Vase', 'Decor', 'manual_generation', 0.95, true),
  ('planter', 'Plant Pot', 'Decor', 'manual_generation', 0.95, true),
  ('pot', 'Planter', 'Decor', 'manual_generation', 0.85, true),
  ('clock', 'Wall Clock', 'Decor', 'manual_generation', 0.90, true),
  ('wall clock', 'Clock', 'Decor', 'manual_generation', 0.95, true)
ON CONFLICT (synonym, canonical_name) DO NOTHING;

-- =============================================
-- ROOM-SPECIFIC VARIATIONS
-- =============================================

-- Living Room
INSERT INTO item_synonyms (synonym, canonical_name, category, source, confidence_score, is_active)
VALUES 
  ('living room sofa', 'Sofa', 'Furniture', 'manual_generation', 0.95, true),
  ('living room table', 'Coffee Table', 'Furniture', 'manual_generation', 0.90, true),
  ('living room chair', 'Lounge Chair', 'Furniture', 'manual_generation', 0.90, true),
  ('living room lamp', 'Floor Lamp', 'Lighting', 'manual_generation', 0.85, true)
ON CONFLICT (synonym, canonical_name) DO NOTHING;

-- Bedroom
INSERT INTO item_synonyms (synonym, canonical_name, category, source, confidence_score, is_active)
VALUES 
  ('bedroom lamp', 'Table Lamp', 'Lighting', 'manual_generation', 0.90, true),
  ('bedroom table', 'Bedside Table', 'Furniture', 'manual_generation', 0.95, true),
  ('bedroom chair', 'Accent Chair', 'Furniture', 'manual_generation', 0.85, true)
ON CONFLICT (synonym, canonical_name) DO NOTHING;

-- Dining Room
INSERT INTO item_synonyms (synonym, canonical_name, category, source, confidence_score, is_active)
VALUES 
  ('dining table', 'Dining Table Set', 'Furniture', 'manual_generation', 0.95, true),
  ('dining chair', 'Dining Chair Set', 'Furniture', 'manual_generation', 0.95, true),
  ('dining set', 'Dining Table Set', 'Furniture', 'manual_generation', 0.95, true)
ON CONFLICT (synonym, canonical_name) DO NOTHING;

-- =============================================
-- MATERIAL VARIATIONS
-- =============================================

INSERT INTO item_synonyms (synonym, canonical_name, category, source, confidence_score, is_active)
VALUES 
  ('wooden table', 'Wood Table', 'Furniture', 'manual_generation', 0.95, true),
  ('wood table', 'Wooden Table', 'Furniture', 'manual_generation', 0.95, true),
  ('glass table', 'Glass Top Table', 'Furniture', 'manual_generation', 0.95, true),
  ('marble table', 'Marble Top Table', 'Furniture', 'manual_generation', 0.95, true),
  ('metal frame', 'Iron Frame', 'Hardware', 'manual_generation', 0.85, true),
  ('steel frame', 'Metal Frame', 'Hardware', 'manual_generation', 0.90, true),
  ('fabric sofa', 'Upholstered Sofa', 'Furniture', 'manual_generation', 0.90, true),
  ('leather sofa', 'Leather Couch', 'Furniture', 'manual_generation', 0.95, true)
ON CONFLICT (synonym, canonical_name) DO NOTHING;

-- =============================================
-- STYLE-SPECIFIC VARIATIONS
-- =============================================

-- Modern/Contemporary
INSERT INTO item_synonyms (synonym, canonical_name, category, source, confidence_score, is_active)
VALUES 
  ('modern sofa', 'Sofa', 'Furniture', 'manual_generation', 0.85, true),
  ('contemporary sofa', 'Sofa', 'Furniture', 'manual_generation', 0.85, true),
  ('modern table', 'Coffee Table', 'Furniture', 'manual_generation', 0.80, true),
  ('minimalist lamp', 'Floor Lamp', 'Lighting', 'manual_generation', 0.80, true)
ON CONFLICT (synonym, canonical_name) DO NOTHING;

-- Industrial
INSERT INTO item_synonyms (synonym, canonical_name, category, source, confidence_score, is_active)
VALUES 
  ('industrial lamp', 'Floor Lamp', 'Lighting', 'manual_generation', 0.80, true),
  ('industrial table', 'Coffee Table', 'Furniture', 'manual_generation', 0.75, true),
  ('industrial chair', 'Metal Chair', 'Furniture', 'manual_generation', 0.75, true)
ON CONFLICT (synonym, canonical_name) DO NOTHING;

-- Traditional
INSERT INTO item_synonyms (synonym, canonical_name, category, source, confidence_score, is_active)
VALUES 
  ('traditional sofa', 'Sofa', 'Furniture', 'manual_generation', 0.85, true),
  ('classic sofa', 'Sofa', 'Furniture', 'manual_generation', 0.80, true),
  ('antique table', 'Wooden Table', 'Furniture', 'manual_generation', 0.75, true)
ON CONFLICT (synonym, canonical_name) DO NOTHING;

-- =============================================
-- VERIFICATION
-- =============================================

-- Count total synonyms after insert
SELECT COUNT(*) as total_synonyms FROM item_synonyms WHERE is_active = true;

-- Count synonyms by category
SELECT category, COUNT(*) as count 
FROM item_synonyms 
WHERE is_active = true 
GROUP BY category 
ORDER BY count DESC;

-- Show newly added synonyms
SELECT synonym, canonical_name, category, confidence_score
FROM item_synonyms
WHERE source = 'manual_generation'
  AND is_active = true
ORDER BY category, synonym
LIMIT 50;
