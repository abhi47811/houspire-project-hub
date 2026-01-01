-- =====================================================
-- HOUSPIRE SYNONYM DICTIONARY SEEDER
-- Based on Module_19_Budget_Item_Matching.md
-- =====================================================
-- This script seeds the item_synonyms table with common
-- furniture and material synonyms for accurate matching
-- =====================================================

-- Clear existing synonyms (optional - comment out if you want to keep existing data)
-- TRUNCATE item_synonyms;

-- =====================================================
-- FURNITURE SYNONYMS
-- =====================================================

-- SOFA VARIANTS
INSERT INTO item_synonyms (canonical_name, synonym, confidence, category_hint, source) VALUES
('3-seater sofa', 'couch', 0.95, 'furniture', 'manual'),
('3-seater sofa', 'settee', 0.90, 'furniture', 'manual'),
('3-seater sofa', 'divan', 0.85, 'furniture', 'manual'),
('3-seater sofa', 'lounge', 0.85, 'furniture', 'manual'),
('3-seater sofa', 'sofa set', 0.90, 'furniture', 'manual'),
('sectional sofa', 'l shaped sofa', 0.95, 'furniture', 'manual'),
('sectional sofa', 'corner sofa', 0.90, 'furniture', 'manual'),
('recliner sofa', 'recliner', 0.95, 'furniture', 'manual'),
('recliner sofa', 'lazy boy', 0.85, 'furniture', 'manual');

-- SEATING
INSERT INTO item_synonyms (canonical_name, synonym, confidence, category_hint, source) VALUES
('dining chair', 'chair', 0.90, 'furniture', 'manual'),
('dining chair', 'seat', 0.85, 'furniture', 'manual'),
('armchair', 'accent chair', 0.90, 'furniture', 'manual'),
('armchair', 'easy chair', 0.85, 'furniture', 'manual'),
('office chair', 'desk chair', 0.95, 'furniture', 'manual'),
('office chair', 'study chair', 0.90, 'furniture', 'manual'),
('stool', 'bar stool', 0.90, 'furniture', 'manual'),
('bench', 'seating bench', 0.95, 'furniture', 'manual');

-- TABLES
INSERT INTO item_synonyms (canonical_name, synonym, confidence, category_hint, source) VALUES
('coffee table', 'center table', 0.95, 'furniture', 'manual'),
('coffee table', 'cocktail table', 0.90, 'furniture', 'manual'),
('coffee table', 'tea table', 0.85, 'furniture', 'manual'),
('side table', 'end table', 0.95, 'furniture', 'manual'),
('side table', 'accent table', 0.90, 'furniture', 'manual'),
('bedside table', 'nightstand', 0.95, 'furniture', 'manual'),
('bedside table', 'night table', 0.90, 'furniture', 'manual'),
('console table', 'entry table', 0.90, 'furniture', 'manual'),
('console table', 'hall table', 0.85, 'furniture', 'manual'),
('dining table 6-seater', 'dining table', 0.90, 'furniture', 'manual'),
('dining table 6-seater', '6 seater dining', 0.95, 'furniture', 'manual'),
('study table', 'desk', 0.95, 'furniture', 'manual'),
('study table', 'work table', 0.90, 'furniture', 'manual');

-- BEDS & STORAGE
INSERT INTO item_synonyms (canonical_name, synonym, confidence, category_hint, source) VALUES
('king size bed', 'king bed', 0.95, 'furniture', 'manual'),
('king size bed', 'double bed', 0.85, 'furniture', 'manual'),
('queen size bed', 'queen bed', 0.95, 'furniture', 'manual'),
('single bed', 'twin bed', 0.90, 'furniture', 'manual'),
('wardrobe', 'closet', 0.95, 'furniture', 'manual'),
('wardrobe', 'almirah', 0.90, 'furniture', 'manual'),
('wardrobe', 'cupboard', 0.85, 'furniture', 'manual'),
('chest of drawers', 'dresser', 0.95, 'furniture', 'manual'),
('chest of drawers', 'drawer unit', 0.90, 'furniture', 'manual'),
('bookshelf', 'bookcase', 0.95, 'furniture', 'manual'),
('bookshelf', 'shelving unit', 0.90, 'furniture', 'manual');

-- TV & ENTERTAINMENT
INSERT INTO item_synonyms (canonical_name, synonym, confidence, category_hint, source) VALUES
('tv unit', 'tv stand', 0.95, 'furniture', 'manual'),
('tv unit', 'media console', 0.90, 'furniture', 'manual'),
('tv unit', 'entertainment unit', 0.90, 'furniture', 'manual'),
('tv unit', 'tv cabinet', 0.90, 'furniture', 'manual'),
('tv unit', 'media unit', 0.90, 'furniture', 'manual');

-- STORAGE & DISPLAY
INSERT INTO item_synonyms (canonical_name, synonym, confidence, category_hint, source) VALUES
('display cabinet', 'display unit', 0.95, 'furniture', 'manual'),
('display cabinet', 'showcase', 0.90, 'furniture', 'manual'),
('display cabinet', 'vitrine', 0.85, 'furniture', 'manual'),
('crockery unit', 'china cabinet', 0.90, 'furniture', 'manual'),
('crockery unit', 'display cabinet', 0.85, 'furniture', 'manual'),
('sideboard', 'buffet', 0.95, 'furniture', 'manual'),
('sideboard', 'credenza', 0.90, 'furniture', 'manual');

-- =====================================================
-- LIGHTING SYNONYMS
-- =====================================================

INSERT INTO item_synonyms (canonical_name, synonym, confidence, category_hint, source) VALUES
('chandelier', 'hanging light', 0.90, 'lighting', 'manual'),
('chandelier', 'ceiling light', 0.85, 'lighting', 'manual'),
('pendant light', 'hanging lamp', 0.95, 'lighting', 'manual'),
('pendant light', 'drop light', 0.90, 'lighting', 'manual'),
('pendant light', 'suspended light', 0.90, 'lighting', 'manual'),
('recessed light', 'downlight', 0.95, 'lighting', 'manual'),
('recessed light', 'ceiling spot', 0.90, 'lighting', 'manual'),
('recessed light', 'can light', 0.85, 'lighting', 'manual'),
('track light', 'track lighting', 0.95, 'lighting', 'manual'),
('track light', 'rail light', 0.90, 'lighting', 'manual'),
('wall sconce', 'wall light', 0.95, 'lighting', 'manual'),
('wall sconce', 'wall lamp', 0.90, 'lighting', 'manual'),
('floor lamp', 'standing lamp', 0.95, 'lighting', 'manual'),
('floor lamp', 'standard lamp', 0.90, 'lighting', 'manual'),
('table lamp', 'desk lamp', 0.90, 'lighting', 'manual'),
('table lamp', 'reading lamp', 0.85, 'lighting', 'manual'),
('led strip', 'led strip light', 0.95, 'lighting', 'manual'),
('led strip', 'led tape', 0.90, 'lighting', 'manual'),
('led strip', 'strip lighting', 0.90, 'lighting', 'manual'),
('cove lighting', 'indirect lighting', 0.90, 'lighting', 'manual'),
('cove lighting', 'accent lighting', 0.85, 'lighting', 'manual');

-- =====================================================
-- CEILING SYNONYMS
-- =====================================================

INSERT INTO item_synonyms (canonical_name, synonym, confidence, category_hint, source) VALUES
('false ceiling', 'drop ceiling', 0.95, 'materials', 'manual'),
('false ceiling', 'suspended ceiling', 0.95, 'materials', 'manual'),
('false ceiling', 'grid ceiling', 0.85, 'materials', 'manual'),
('gypsum ceiling', 'gypsum board ceiling', 0.95, 'materials', 'manual'),
('gypsum ceiling', 'drywall ceiling', 0.90, 'materials', 'manual'),
('gypsum ceiling', 'plasterboard ceiling', 0.90, 'materials', 'manual'),
('pop ceiling', 'plaster of paris ceiling', 0.95, 'materials', 'manual'),
('pop ceiling', 'pop false ceiling', 0.90, 'materials', 'manual'),
('wooden ceiling', 'timber ceiling', 0.95, 'materials', 'manual'),
('wooden ceiling', 'wood panel ceiling', 0.90, 'materials', 'manual'),
('pop cornice', 'ceiling molding', 0.90, 'materials', 'manual'),
('pop cornice', 'crown molding', 0.85, 'materials', 'manual');

-- =====================================================
-- FLOORING SYNONYMS
-- =====================================================

INSERT INTO item_synonyms (canonical_name, synonym, confidence, category_hint, source) VALUES
('vitrified tiles', 'ceramic tiles', 0.85, 'flooring', 'manual'),
('vitrified tiles', 'porcelain tiles', 0.85, 'flooring', 'manual'),
('vitrified tiles', 'floor tiles', 0.90, 'flooring', 'manual'),
('marble flooring', 'marble tiles', 0.95, 'flooring', 'manual'),
('marble flooring', 'marble floor', 0.95, 'flooring', 'manual'),
('granite flooring', 'granite tiles', 0.95, 'flooring', 'flooring'),
('granite flooring', 'granite floor', 0.95, 'flooring', 'manual'),
('wooden flooring', 'hardwood flooring', 0.90, 'flooring', 'manual'),
('wooden flooring', 'wood floor', 0.95, 'flooring', 'manual'),
('wooden flooring', 'timber flooring', 0.90, 'flooring', 'manual'),
('laminate flooring', 'laminated flooring', 0.95, 'flooring', 'manual'),
('laminate flooring', 'laminate', 0.90, 'flooring', 'manual'),
('vinyl flooring', 'vinyl tiles', 0.95, 'flooring', 'manual'),
('vinyl flooring', 'pvc flooring', 0.90, 'flooring', 'manual'),
('engineered wood flooring', 'engineered wood', 0.95, 'flooring', 'manual'),
('engineered wood flooring', 'engineered flooring', 0.95, 'flooring', 'manual'),
('carpet', 'carpeting', 0.95, 'soft_furnishings', 'manual'),
('carpet', 'floor covering', 0.85, 'soft_furnishings', 'manual');

-- =====================================================
-- WALL TREATMENT SYNONYMS
-- =====================================================

INSERT INTO item_synonyms (canonical_name, synonym, confidence, category_hint, source) VALUES
('paint', 'wall paint', 0.95, 'materials', 'manual'),
('paint', 'emulsion', 0.90, 'materials', 'manual'),
('paint', 'interior paint', 0.90, 'materials', 'manual'),
('wallpaper', 'wall covering', 0.95, 'materials', 'manual'),
('wallpaper', 'wall paper', 0.95, 'materials', 'manual'),
('textured paint', 'texture', 0.95, 'materials', 'manual'),
('textured paint', 'wall texture', 0.95, 'materials', 'manual'),
('wall paneling', 'wall panels', 0.95, 'materials', 'manual'),
('wall paneling', 'wpc paneling', 0.90, 'materials', 'manual'),
('wall paneling', 'wood paneling', 0.90, 'materials', 'manual');

-- =====================================================
-- SOFT FURNISHINGS SYNONYMS
-- =====================================================

INSERT INTO item_synonyms (canonical_name, synonym, confidence, category_hint, source) VALUES
('curtain', 'drapes', 0.95, 'soft_furnishings', 'manual'),
('curtain', 'window treatment', 0.90, 'soft_furnishings', 'manual'),
('curtain', 'window covering', 0.90, 'soft_furnishings', 'manual'),
('blinds', 'window blinds', 0.95, 'soft_furnishings', 'manual'),
('blinds', 'roller blinds', 0.90, 'soft_furnishings', 'manual'),
('blinds', 'venetian blinds', 0.90, 'soft_furnishings', 'manual'),
('cushion', 'throw pillow', 0.95, 'soft_furnishings', 'manual'),
('cushion', 'pillow', 0.90, 'soft_furnishings', 'manual'),
('cushion', 'decorative pillow', 0.90, 'soft_furnishings', 'manual'),
('rug', 'carpet', 0.85, 'soft_furnishings', 'manual'),
('rug', 'floor rug', 0.95, 'soft_furnishings', 'manual'),
('rug', 'area rug', 0.95, 'soft_furnishings', 'manual'),
('throw blanket', 'throw', 0.95, 'soft_furnishings', 'manual'),
('throw blanket', 'blanket', 0.90, 'soft_furnishings', 'manual'),
('bedspread', 'bed cover', 0.95, 'soft_furnishings', 'manual'),
('bedspread', 'bedcover', 0.95, 'soft_furnishings', 'manual'),
('bedspread', 'coverlet', 0.85, 'soft_furnishings', 'manual');

-- =====================================================
-- DECOR & ACCESSORIES SYNONYMS
-- =====================================================

INSERT INTO item_synonyms (canonical_name, synonym, confidence, category_hint, source) VALUES
('mirror', 'wall mirror', 0.95, 'decor', 'manual'),
('mirror', 'decorative mirror', 0.90, 'decor', 'manual'),
('artwork', 'wall art', 0.95, 'decor', 'manual'),
('artwork', 'painting', 0.90, 'decor', 'manual'),
('artwork', 'art piece', 0.90, 'decor', 'manual'),
('wall frame', 'photo frame', 0.95, 'decor', 'manual'),
('wall frame', 'picture frame', 0.95, 'decor', 'manual'),
('indoor plant', 'plant', 0.95, 'decor', 'manual'),
('indoor plant', 'potted plant', 0.95, 'decor', 'manual'),
('indoor plant', 'houseplant', 0.90, 'decor', 'manual'),
('planter', 'plant pot', 0.95, 'decor', 'manual'),
('planter', 'flower pot', 0.90, 'decor', 'manual'),
('vase', 'flower vase', 0.95, 'decor', 'manual'),
('vase', 'decorative vase', 0.90, 'decor', 'manual');

-- =====================================================
-- KITCHEN SYNONYMS
-- =====================================================

INSERT INTO item_synonyms (canonical_name, synonym, confidence, category_hint, source) VALUES
('kitchen cabinet', 'modular kitchen', 0.85, 'furniture', 'manual'),
('kitchen cabinet', 'kitchen unit', 0.90, 'furniture', 'manual'),
('kitchen cabinet', 'cabinet', 0.85, 'furniture', 'manual'),
('countertop', 'counter top', 0.95, 'materials', 'manual'),
('countertop', 'kitchen counter', 0.90, 'materials', 'manual'),
('countertop', 'worktop', 0.90, 'materials', 'manual'),
('backsplash', 'kitchen dado', 0.95, 'materials', 'manual'),
('backsplash', 'dado tiles', 0.90, 'materials', 'manual'),
('kitchen sink', 'sink', 0.95, 'hardware', 'manual'),
('kitchen sink', 'wash basin', 0.85, 'hardware', 'manual'),
('chimney', 'kitchen chimney', 0.95, 'hardware', 'manual'),
('chimney', 'hood', 0.90, 'hardware', 'manual'),
('chimney', 'exhaust hood', 0.90, 'hardware', 'manual'),
('hob', 'cooktop', 0.95, 'hardware', 'manual'),
('hob', 'stove top', 0.90, 'hardware', 'manual'),
('hob', 'gas hob', 0.90, 'hardware', 'manual');

-- =====================================================
-- HARDWARE SYNONYMS
-- =====================================================

INSERT INTO item_synonyms (canonical_name, synonym, confidence, category_hint, source) VALUES
('handle', 'cabinet handle', 0.90, 'hardware', 'manual'),
('handle', 'door handle', 0.90, 'hardware', 'manual'),
('handle', 'knob', 0.85, 'hardware', 'manual'),
('hinge', 'door hinge', 0.95, 'hardware', 'manual'),
('hinge', 'cabinet hinge', 0.90, 'hardware', 'manual'),
('soft close hinge', 'soft-close hinge', 0.95, 'hardware', 'manual'),
('soft close hinge', 'damper hinge', 0.85, 'hardware', 'manual'),
('drawer channel', 'drawer slide', 0.95, 'hardware', 'manual'),
('drawer channel', 'drawer runner', 0.90, 'hardware', 'manual'),
('drawer channel', 'telescopic channel', 0.90, 'hardware', 'manual'),
('tandem drawer', 'tandem', 0.95, 'hardware', 'manual'),
('tandem drawer', 'tandem drawer box', 0.90, 'hardware', 'manual');

-- Success message
DO $$
BEGIN
    RAISE NOTICE '✅ Synonym dictionary seeded successfully!';
    RAISE NOTICE '📊 Total synonyms added: Check item_synonyms table for count';
END $$;
