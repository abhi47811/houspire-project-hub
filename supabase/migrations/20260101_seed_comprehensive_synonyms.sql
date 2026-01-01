-- ============================================================================
-- BUDGET MODULE: ENHANCED SYNONYM DICTIONARY
-- Comprehensive synonym mappings for 4-strategy item matching
-- Based on Module 19 Specification
-- ============================================================================

-- Furniture Synonyms (100+ mappings)
INSERT INTO item_synonyms (canonical_name, synonym, confidence, category_hint, source) VALUES

-- SOFAS
('3-seater sofa', 'couch', 1.0, 'furniture', 'manual'),
('3-seater sofa', 'settee', 0.95, 'furniture', 'manual'),
('3-seater sofa', 'divan', 0.90, 'furniture', 'manual'),
('3-seater sofa', 'three seater sofa', 1.0, 'furniture', 'manual'),
('3-seater sofa', '3 seater couch', 0.95, 'furniture', 'manual'),
('3-seater sofa', 'living room sofa', 0.85, 'furniture', 'manual'),

('2-seater sofa', 'loveseat', 0.95, 'furniture', 'manual'),
('2-seater sofa', 'two seater sofa', 1.0, 'furniture', 'manual'),
('2-seater sofa', '2 seater couch', 0.95, 'furniture', 'manual'),

('L-shaped sofa', 'sectional sofa', 0.95, 'furniture', 'manual'),
('L-shaped sofa', 'corner sofa', 0.90, 'furniture', 'manual'),
('L-shaped sofa', 'L shaped sectional', 1.0, 'furniture', 'manual'),

-- TABLES
('coffee table', 'center table', 1.0, 'furniture', 'manual'),
('coffee table', 'centre table', 1.0, 'furniture', 'manual'),
('coffee table', 'tea table', 0.95, 'furniture', 'manual'),
('coffee table', 'cocktail table', 0.90, 'furniture', 'manual'),
('coffee table', 'living room table', 0.85, 'furniture', 'manual'),

('dining table', 'dinner table', 0.95, 'furniture', 'manual'),
('dining table', 'dining room table', 1.0, 'furniture', 'manual'),

('6-seater dining table', '6 seater dining table', 1.0, 'furniture', 'manual'),
('6-seater dining table', 'six seater dining table', 1.0, 'furniture', 'manual'),
('6-seater dining table', 'dining table for 6', 0.95, 'furniture', 'manual'),

('4-seater dining table', '4 seater dining table', 1.0, 'furniture', 'manual'),
('4-seater dining table', 'four seater dining table', 1.0, 'furniture', 'manual'),

('bedside table', 'nightstand', 1.0, 'furniture', 'manual'),
('bedside table', 'night table', 0.95, 'furniture', 'manual'),
('bedside table', 'bedside cabinet', 0.95, 'furniture', 'manual'),
('bedside table', 'night stand', 1.0, 'furniture', 'manual'),
('bedside table', 'bedside unit', 0.90, 'furniture', 'manual'),

('side table', 'end table', 0.95, 'furniture', 'manual'),
('side table', 'accent table', 0.90, 'furniture', 'manual'),

('console table', 'entry table', 0.90, 'furniture', 'manual'),
('console table', 'entryway table', 0.90, 'furniture', 'manual'),
('console table', 'sofa table', 0.85, 'furniture', 'manual'),

-- CHAIRS
('dining chair', 'dining room chair', 1.0, 'furniture', 'manual'),
('dining chair', 'chair for dining', 0.95, 'furniture', 'manual'),

('armchair', 'arm chair', 1.0, 'furniture', 'manual'),
('armchair', 'accent chair', 0.90, 'furniture', 'manual'),
('armchair', 'lounge chair', 0.85, 'furniture', 'manual'),
('armchair', 'easy chair', 0.85, 'furniture', 'manual'),

('office chair', 'desk chair', 0.95, 'furniture', 'manual'),
('office chair', 'study chair', 0.90, 'furniture', 'manual'),
('office chair', 'computer chair', 0.90, 'furniture', 'manual'),

-- BEDS
('king bed', 'king size bed', 1.0, 'furniture', 'manual'),
('king bed', 'king sized bed', 1.0, 'furniture', 'manual'),

('queen bed', 'queen size bed', 1.0, 'furniture', 'manual'),
('queen bed', 'double bed', 0.90, 'furniture', 'manual'),

('single bed', 'twin bed', 0.95, 'furniture', 'manual'),
('single bed', 'single size bed', 1.0, 'furniture', 'manual'),

-- STORAGE
('wardrobe', 'closet', 0.95, 'furniture', 'manual'),
('wardrobe', 'almirah', 1.0, 'furniture', 'manual'),
('wardrobe', 'cupboard', 0.90, 'furniture', 'manual'),
('wardrobe', 'clothes cabinet', 0.85, 'furniture', 'manual'),

('bookshelf', 'book shelf', 1.0, 'furniture', 'manual'),
('bookshelf', 'bookcase', 0.95, 'furniture', 'manual'),
('bookshelf', 'book cabinet', 0.90, 'furniture', 'manual'),
('bookshelf', 'book rack', 0.90, 'furniture', 'manual'),

('TV unit', 'TV stand', 0.95, 'furniture', 'manual'),
('TV unit', 'TV console', 0.95, 'furniture', 'manual'),
('TV unit', 'TV cabinet', 0.90, 'furniture', 'manual'),
('TV unit', 'entertainment unit', 0.85, 'furniture', 'manual'),
('TV unit', 'media console', 0.85, 'furniture', 'manual'),

('chest of drawers', 'dresser', 0.95, 'furniture', 'manual'),
('chest of drawers', 'drawer unit', 0.90, 'furniture', 'manual'),

('crockery unit', 'crockery cabinet', 0.95, 'furniture', 'manual'),
('crockery unit', 'display cabinet', 0.85, 'furniture', 'manual'),
('crockery unit', 'china cabinet', 0.85, 'furniture', 'manual'),

-- CEILING
('gypsum false ceiling', 'false ceiling', 1.0, 'ceiling', 'manual'),
('gypsum false ceiling', 'gypsum ceiling', 1.0, 'ceiling', 'manual'),
('gypsum false ceiling', 'drop ceiling', 0.95, 'ceiling', 'manual'),
('gypsum false ceiling', 'suspended ceiling', 0.95, 'ceiling', 'manual'),
('gypsum false ceiling', 'POP ceiling', 0.85, 'ceiling', 'manual'),
('gypsum false ceiling', 'plaster ceiling', 0.80, 'ceiling', 'manual'),

('POP false ceiling', 'POP ceiling', 1.0, 'ceiling', 'manual'),
('POP false ceiling', 'plaster of paris ceiling', 1.0, 'ceiling', 'manual'),

('cove lighting', 'cove light', 1.0, 'lighting', 'manual'),
('cove lighting', 'ceiling cove lighting', 1.0, 'lighting', 'manual'),
('cove lighting', 'indirect ceiling lighting', 0.90, 'lighting', 'manual'),

-- LIGHTING
('pendant light', 'hanging light', 0.95, 'lighting', 'manual'),
('pendant light', 'pendant lamp', 1.0, 'lighting', 'manual'),
('pendant light', 'suspended light', 0.90, 'lighting', 'manual'),

('chandelier', 'hanging chandelier', 1.0, 'lighting', 'manual'),
('chandelier', 'crystal chandelier', 0.90, 'lighting', 'manual'),

('downlight', 'recessed light', 0.95, 'lighting', 'manual'),
('downlight', 'pot light', 0.90, 'lighting', 'manual'),
('downlight', 'ceiling spotlight', 0.85, 'lighting', 'manual'),
('downlight', 'recessed downlight', 1.0, 'lighting', 'manual'),

('track lighting', 'track lights', 1.0, 'lighting', 'manual'),
('track lighting', 'track light system', 0.95, 'lighting', 'manual'),

('floor lamp', 'standing lamp', 0.95, 'lighting', 'manual'),
('floor lamp', 'floor standing lamp', 1.0, 'lighting', 'manual'),

('table lamp', 'desk lamp', 0.90, 'lighting', 'manual'),
('table lamp', 'bedside lamp', 0.85, 'lighting', 'manual'),

('wall sconce', 'wall light', 0.95, 'lighting', 'manual'),
('wall sconce', 'wall lamp', 0.95, 'lighting', 'manual'),
('wall sconce', 'wall mounted light', 0.90, 'lighting', 'manual'),

('ceiling fan', 'fan', 0.90, 'lighting', 'manual'),
('ceiling fan', 'decorative fan', 0.85, 'lighting', 'manual'),

('LED strip', 'LED strip light', 1.0, 'lighting', 'manual'),
('LED strip', 'LED tape', 0.95, 'lighting', 'manual'),
('LED strip', 'LED ribbon', 0.90, 'lighting', 'manual'),

-- FLOORING
('vitrified tiles', 'porcelain tiles', 0.90, 'flooring', 'manual'),
('vitrified tiles', 'ceramic tiles', 0.85, 'flooring', 'manual'),
('vitrified tiles', 'vitrified floor tiles', 1.0, 'flooring', 'manual'),

('marble flooring', 'marble floor', 1.0, 'flooring', 'manual'),
('marble flooring', 'marble tiles', 0.95, 'flooring', 'manual'),
('marble flooring', 'italian marble', 0.90, 'flooring', 'manual'),

('wooden flooring', 'wood floor', 1.0, 'flooring', 'manual'),
('wooden flooring', 'hardwood flooring', 0.95, 'flooring', 'manual'),
('wooden flooring', 'engineered wood flooring', 0.90, 'flooring', 'manual'),

('laminate flooring', 'laminate floor', 1.0, 'flooring', 'manual'),
('laminate flooring', 'laminate wood flooring', 0.95, 'flooring', 'manual'),

('vinyl flooring', 'vinyl floor', 1.0, 'flooring', 'manual'),
('vinyl flooring', 'vinyl plank', 0.95, 'flooring', 'manual'),
('vinyl flooring', 'LVT', 0.90, 'flooring', 'manual'),

('granite flooring', 'granite floor', 1.0, 'flooring', 'manual'),
('granite flooring', 'granite tiles', 0.95, 'flooring', 'manual'),

-- HARDWARE
('door handle', 'door knob', 0.95, 'hardware', 'manual'),
('door handle', 'handle', 0.90, 'hardware', 'manual'),
('door handle', 'door lever', 0.90, 'hardware', 'manual'),

('cabinet handle', 'cupboard handle', 0.95, 'hardware', 'manual'),
('cabinet handle', 'drawer handle', 0.90, 'hardware', 'manual'),
('cabinet handle', 'wardrobe handle', 0.85, 'hardware', 'manual'),

('hinge', 'door hinge', 0.95, 'hardware', 'manual'),
('hinge', 'cabinet hinge', 0.90, 'hardware', 'manual'),

('drawer channel', 'drawer slide', 0.95, 'hardware', 'manual'),
('drawer channel', 'drawer runner', 0.95, 'hardware', 'manual'),
('drawer channel', 'tandem', 0.85, 'hardware', 'manual'),

-- SOFT FURNISHINGS & DECOR
('curtain', 'window curtain', 1.0, 'soft_furnishings', 'manual'),
('curtain', 'drape', 0.95, 'soft_furnishings', 'manual'),
('curtain', 'window treatment', 0.85, 'soft_furnishings', 'manual'),

('roller blind', 'window blind', 0.95, 'soft_furnishings', 'manual'),
('roller blind', 'roller shade', 0.95, 'soft_furnishings', 'manual'),

('cushion', 'throw cushion', 0.95, 'decor', 'manual'),
('cushion', 'pillow', 0.90, 'decor', 'manual'),
('cushion', 'decorative cushion', 0.95, 'decor', 'manual'),

('rug', 'area rug', 1.0, 'decor', 'manual'),
('rug', 'carpet', 0.90, 'decor', 'manual'),
('rug', 'floor rug', 0.95, 'decor', 'manual'),

('wall art', 'artwork', 0.95, 'decor', 'manual'),
('wall art', 'painting', 0.90, 'decor', 'manual'),
('wall art', 'wall decoration', 0.90, 'decor', 'manual'),
('wall art', 'framed art', 0.95, 'decor', 'manual'),

('mirror', 'wall mirror', 0.95, 'decor', 'manual'),
('mirror', 'decorative mirror', 0.90, 'decor', 'manual'),

('plant', 'indoor plant', 0.95, 'decor', 'manual'),
('plant', 'potted plant', 0.95, 'decor', 'manual'),
('plant', 'houseplant', 0.90, 'decor', 'manual'),

('planter', 'plant pot', 0.95, 'decor', 'manual'),
('planter', 'flower pot', 0.90, 'decor', 'manual'),

('vase', 'flower vase', 0.95, 'decor', 'manual'),
('vase', 'decorative vase', 0.90, 'decor', 'manual'),

-- KITCHEN
('kitchen sink', 'sink', 0.90, 'hardware', 'manual'),
('kitchen sink', 'SS sink', 0.85, 'hardware', 'manual'),
('kitchen sink', 'stainless steel sink', 0.95, 'hardware', 'manual'),

('kitchen faucet', 'faucet', 0.90, 'hardware', 'manual'),
('kitchen faucet', 'tap', 0.95, 'hardware', 'manual'),
('kitchen faucet', 'kitchen tap', 0.95, 'hardware', 'manual'),

('kitchen chimney', 'chimney', 0.90, 'hardware', 'manual'),
('kitchen chimney', 'exhaust hood', 0.85, 'hardware', 'manual'),
('kitchen chimney', 'range hood', 0.85, 'hardware', 'manual'),

('kitchen hob', 'hob', 0.95, 'hardware', 'manual'),
('kitchen hob', 'gas hob', 0.90, 'hardware', 'manual'),
('kitchen hob', 'cooktop', 0.90, 'hardware', 'manual'),

('kitchen countertop', 'countertop', 0.95, 'materials', 'manual'),
('kitchen countertop', 'counter top', 1.0, 'materials', 'manual'),
('kitchen countertop', 'kitchen platform', 0.90, 'materials', 'manual'),

-- BATHROOM
('bathroom sink', 'wash basin', 0.95, 'hardware', 'manual'),
('bathroom sink', 'basin', 0.90, 'hardware', 'manual'),
('bathroom sink', 'washbasin', 0.95, 'hardware', 'manual'),

('toilet', 'WC', 0.95, 'hardware', 'manual'),
('toilet', 'commode', 0.90, 'hardware', 'manual'),
('toilet', 'water closet', 0.95, 'hardware', 'manual'),

('shower', 'shower head', 0.90, 'hardware', 'manual'),
('shower', 'rain shower', 0.85, 'hardware', 'manual'),

('bathroom faucet', 'bathroom tap', 0.95, 'hardware', 'manual'),
('bathroom faucet', 'basin tap', 0.90, 'hardware', 'manual'),

-- Add more as needed...

ON CONFLICT (canonical_name, synonym) DO NOTHING;

-- Create indexes for fast lookup
CREATE INDEX IF NOT EXISTS idx_synonyms_synonym ON item_synonyms(synonym);
CREATE INDEX IF NOT EXISTS idx_synonyms_canonical ON item_synonyms(canonical_name);
CREATE INDEX IF NOT EXISTS idx_synonyms_category ON item_synonyms(category_hint);
CREATE INDEX IF NOT EXISTS idx_synonyms_confidence ON item_synonyms(confidence DESC);

COMMENT ON TABLE item_synonyms IS 'Comprehensive synonym dictionary for 4-strategy item matching algorithm';
