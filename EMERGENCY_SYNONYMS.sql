-- EMERGENCY SYNONYMS FOR BUDGET EXTRACTION FIX
-- Generated: 2026-01-01T17:54:40.420Z
-- Purpose: Fix 33% match rate → 85-95% match rate
-- Render: 8800edf0-4131-4f17-a987-caacf773a923
-- Total Synonyms: 113

-- BEGIN TRANSACTION
BEGIN;

-- 1. leather sofa → 3-Seater Sofa
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('leather sofa', '3-Seater Sofa', 0.95, 'material_variant', ARRAY['contemporary','industrial'], ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 2. fabric sofa → 3-Seater Sofa
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('fabric sofa', '3-Seater Sofa', 0.95, 'material_variant', ARRAY['contemporary','modern'], ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 3. couch → 3-Seater Sofa
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('couch', '3-Seater Sofa', 0.9, 'common_name', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 4. three seater sofa → 3-Seater Sofa
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('three seater sofa', '3-Seater Sofa', 0.98, 'common_name', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 5. sectional sofa → L-Shaped Sofa
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('sectional sofa', 'L-Shaped Sofa', 0.95, 'common_name', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 6. sectional couch → L-Shaped Sofa
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('sectional couch', 'L-Shaped Sofa', 0.95, 'common_name', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 7. loveseat → 2-Seater Sofa
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('loveseat', '2-Seater Sofa', 0.95, 'common_name', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 8. two seater sofa → 2-Seater Sofa
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('two seater sofa', '2-Seater Sofa', 0.98, 'common_name', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 9. sofa set → 3-Seater Sofa
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('sofa set', '3-Seater Sofa', 0.9, 'common_name', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 10. living room sofa → 3-Seater Sofa
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('living room sofa', '3-Seater Sofa', 0.92, 'room_specific', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 11. upholstered chair → Accent Chair
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('upholstered chair', 'Accent Chair', 0.95, 'material_variant', NULL, ARRAY['living_room','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 12. armchair → Accent Chair
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('armchair', 'Accent Chair', 0.95, 'common_name', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 13. accent chair → Single Seater Chair
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('accent chair', 'Single Seater Chair', 0.9, 'common_name', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 14. lounge chair → Accent Chair
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('lounge chair', 'Accent Chair', 0.9, 'common_name', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 15. reading chair → Accent Chair
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('reading chair', 'Accent Chair', 0.88, 'functional', NULL, ARRAY['living_room','study'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 16. recliner → Recliner Chair
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('recliner', 'Recliner Chair', 0.98, 'common_name', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 17. recliner chair → Recliner Chair
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('recliner chair', 'Recliner Chair', 0.98, 'common_name', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 18. single seater → Accent Chair
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('single seater', 'Accent Chair', 0.92, 'common_name', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 19. occasional chair → Accent Chair
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('occasional chair', 'Accent Chair', 0.88, 'common_name', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 20. side chair → Accent Chair
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('side chair', 'Accent Chair', 0.85, 'common_name', NULL, ARRAY['living_room','dining_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 21. coffee table → Center Table
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('coffee table', 'Center Table', 0.98, 'common_name', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 22. center table → Coffee Table
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('center table', 'Coffee Table', 0.98, 'common_name', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 23. centre table → Coffee Table
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('centre table', 'Coffee Table', 0.98, 'common_name', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 24. living room table → Coffee Table
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('living room table', 'Coffee Table', 0.9, 'room_specific', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 25. wooden coffee table → Coffee Table
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('wooden coffee table', 'Coffee Table', 0.92, 'material_variant', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 26. side table → End Table
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('side table', 'End Table', 0.95, 'common_name', NULL, ARRAY['living_room','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 27. end table → Side Table
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('end table', 'Side Table', 0.95, 'common_name', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 28. accent table → Side Table
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('accent table', 'Side Table', 0.9, 'common_name', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 29. console table → Console Table
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('console table', 'Console Table', 0.98, 'common_name', NULL, ARRAY['living_room','entryway'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 30. sofa table → Console Table
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('sofa table', 'Console Table', 0.9, 'functional', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 31. tv unit → TV Stand
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('tv unit', 'TV Stand', 0.98, 'common_name', NULL, ARRAY['living_room','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 32. tv stand → TV Unit
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('tv stand', 'TV Unit', 0.98, 'common_name', NULL, ARRAY['living_room','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 33. television unit → TV Unit
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('television unit', 'TV Unit', 0.95, 'common_name', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 34. media console → TV Unit
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('media console', 'TV Unit', 0.9, 'common_name', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 35. entertainment unit → TV Unit
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('entertainment unit', 'TV Unit', 0.9, 'common_name', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 36. media unit → TV Unit
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('media unit', 'TV Unit', 0.92, 'common_name', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 37. tv cabinet → TV Unit
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('tv cabinet', 'TV Unit', 0.95, 'common_name', NULL, ARRAY['living_room','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 38. bookshelf → Book Rack
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('bookshelf', 'Book Rack', 0.98, 'common_name', NULL, ARRAY['living_room','study'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 39. book rack → Bookshelf
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('book rack', 'Bookshelf', 0.98, 'common_name', NULL, ARRAY['living_room','study'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 40. book shelf → Bookshelf
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('book shelf', 'Bookshelf', 0.98, 'common_name', NULL, ARRAY['living_room','study'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 41. bookcase → Bookshelf
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('bookcase', 'Bookshelf', 0.95, 'common_name', NULL, ARRAY['living_room','study'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 42. display unit → Wall Unit
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('display unit', 'Wall Unit', 0.9, 'common_name', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 43. wall unit → Display Unit
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('wall unit', 'Display Unit', 0.9, 'common_name', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 44. shelf unit → Open Shelving Unit
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('shelf unit', 'Open Shelving Unit', 0.95, 'common_name', NULL, ARRAY['living_room','kitchen'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 45. open shelving → Wall Shelf
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('open shelving', 'Wall Shelf', 0.9, 'common_name', NULL, ARRAY['living_room','kitchen'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 46. shelving unit → Shelf Unit
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('shelving unit', 'Shelf Unit', 0.95, 'common_name', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 47. storage unit → Display Unit
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('storage unit', 'Display Unit', 0.85, 'common_name', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 48. ceiling light → Pendant Light
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('ceiling light', 'Pendant Light', 0.9, 'common_name', NULL, ARRAY['living_room','bedroom','kitchen'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 49. hanging light → Pendant Light
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('hanging light', 'Pendant Light', 0.95, 'common_name', NULL, ARRAY['living_room','dining_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 50. pendant light → Hanging Light
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('pendant light', 'Hanging Light', 0.95, 'common_name', NULL, ARRAY['living_room','dining_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 51. exposed bulb → Industrial Pendant
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('exposed bulb', 'Industrial Pendant', 0.9, 'style_variant', ARRAY['industrial','modern'], ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 52. exposed bulb light → Industrial Pendant
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('exposed bulb light', 'Industrial Pendant', 0.92, 'style_variant', ARRAY['industrial'], ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 53. chandelier → Decorative Ceiling Light
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('chandelier', 'Decorative Ceiling Light', 0.95, 'common_name', ARRAY['luxury','traditional'], ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 54. flush mount → Ceiling Light
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('flush mount', 'Ceiling Light', 0.95, 'common_name', NULL, ARRAY['bedroom','bathroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 55. ceiling fixture → Ceiling Light
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('ceiling fixture', 'Ceiling Light', 0.9, 'common_name', NULL, ARRAY['living_room','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 56. floor lamp → Standing Lamp
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('floor lamp', 'Standing Lamp', 0.98, 'common_name', NULL, ARRAY['living_room','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 57. standing lamp → Floor Lamp
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('standing lamp', 'Floor Lamp', 0.98, 'common_name', NULL, ARRAY['living_room','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 58. tripod lamp → Floor Lamp
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('tripod lamp', 'Floor Lamp', 0.9, 'style_variant', ARRAY['modern','industrial'], ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 59. tripod floor lamp → Floor Lamp
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('tripod floor lamp', 'Floor Lamp', 0.92, 'style_variant', ARRAY['modern','industrial'], ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 60. reading lamp → Floor Lamp
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('reading lamp', 'Floor Lamp', 0.85, 'functional', NULL, ARRAY['living_room','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 61. arc floor lamp → Floor Lamp
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('arc floor lamp', 'Floor Lamp', 0.9, 'style_variant', ARRAY['modern'], ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 62. table lamp → Bedside Lamp
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('table lamp', 'Bedside Lamp', 0.9, 'common_name', NULL, ARRAY['bedroom','living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 63. bedside lamp → Table Lamp
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('bedside lamp', 'Table Lamp', 0.9, 'common_name', NULL, ARRAY['bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 64. desk lamp → Table Lamp
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('desk lamp', 'Table Lamp', 0.95, 'functional', NULL, ARRAY['study','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 65. reading lamp → Table Lamp
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('reading lamp', 'Table Lamp', 0.88, 'functional', NULL, ARRAY['bedroom','living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 66. side table lamp → Table Lamp
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('side table lamp', 'Table Lamp', 0.92, 'placement', NULL, ARRAY['living_room','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 67. decorative lamp → Table Lamp
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('decorative lamp', 'Table Lamp', 0.85, 'common_name', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 68. cushion → Throw Pillow
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('cushion', 'Throw Pillow', 0.98, 'common_name', NULL, ARRAY['living_room','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 69. throw pillow → Cushion
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('throw pillow', 'Cushion', 0.98, 'common_name', NULL, ARRAY['living_room','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 70. decorative pillow → Cushion
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('decorative pillow', 'Cushion', 0.95, 'common_name', NULL, ARRAY['living_room','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 71. sofa cushion → Throw Pillow
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('sofa cushion', 'Throw Pillow', 0.95, 'placement', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 72. throw cushion → Throw Pillow
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('throw cushion', 'Throw Pillow', 0.98, 'common_name', NULL, ARRAY['living_room','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 73. throw blanket → Blanket
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('throw blanket', 'Blanket', 0.95, 'common_name', NULL, ARRAY['living_room','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 74. throw → Throw Blanket
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('throw', 'Throw Blanket', 0.9, 'common_name', NULL, ARRAY['living_room','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 75. area rug → Carpet
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('area rug', 'Carpet', 0.95, 'common_name', NULL, ARRAY['living_room','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 76. carpet → Area Rug
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('carpet', 'Area Rug', 0.95, 'common_name', NULL, ARRAY['living_room','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 77. floor rug → Area Rug
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('floor rug', 'Area Rug', 0.95, 'common_name', NULL, ARRAY['living_room','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 78. floor mat → Rug
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('floor mat', 'Rug', 0.9, 'common_name', NULL, ARRAY['living_room','entryway'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 79. living room rug → Area Rug
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('living room rug', 'Area Rug', 0.92, 'room_specific', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 80. potted plant → Indoor Plant
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('potted plant', 'Indoor Plant', 0.95, 'common_name', NULL, ARRAY['living_room','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 81. indoor plant → Potted Plant
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('indoor plant', 'Potted Plant', 0.95, 'common_name', NULL, ARRAY['living_room','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 82. plant pot → Planter
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('plant pot', 'Planter', 0.9, 'common_name', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 83. planter → Plant Pot
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('planter', 'Plant Pot', 0.95, 'common_name', NULL, ARRAY['living_room','balcony'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 84. decorative plant → Indoor Plant
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('decorative plant', 'Indoor Plant', 0.9, 'common_name', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 85. wall art → Artwork
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('wall art', 'Artwork', 0.95, 'common_name', NULL, ARRAY['living_room','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 86. artwork → Wall Art
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('artwork', 'Wall Art', 0.95, 'common_name', NULL, ARRAY['living_room','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 87. wall decor → Wall Art
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('wall decor', 'Wall Art', 0.9, 'common_name', NULL, ARRAY['living_room','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 88. framed photo → Photo Frame
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('framed photo', 'Photo Frame', 0.95, 'common_name', NULL, ARRAY['living_room','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 89. photo frame → Framed Photo
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('photo frame', 'Framed Photo', 0.95, 'common_name', NULL, ARRAY['living_room','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 90. picture frame → Photo Frame
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('picture frame', 'Photo Frame', 0.95, 'common_name', NULL, ARRAY['living_room','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 91. wall hanging → Wall Art
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('wall hanging', 'Wall Art', 0.9, 'common_name', NULL, ARRAY['living_room','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 92. curtain → Window Curtain
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('curtain', 'Window Curtain', 0.98, 'common_name', NULL, ARRAY['living_room','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 93. window curtain → Curtain
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('window curtain', 'Curtain', 0.98, 'common_name', NULL, ARRAY['living_room','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 94. drapes → Curtain
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('drapes', 'Curtain', 0.95, 'common_name', NULL, ARRAY['living_room','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 95. drape → Curtain
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('drape', 'Curtain', 0.95, 'common_name', NULL, ARRAY['living_room','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 96. window drapes → Curtain
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('window drapes', 'Curtain', 0.95, 'common_name', NULL, ARRAY['living_room'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 97. window treatment → Curtain
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('window treatment', 'Curtain', 0.85, 'common_name', NULL, ARRAY['living_room','bedroom'])
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 98. wooden → wood
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('wooden', 'wood', 0.85, 'material_modifier', NULL, NULL)
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 99. wood → wooden
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('wood', 'wooden', 0.85, 'material_modifier', NULL, NULL)
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 100. metal → steel
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('metal', 'steel', 0.85, 'material_modifier', ARRAY['industrial','modern'], NULL)
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 101. steel → metal
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('steel', 'metal', 0.85, 'material_modifier', ARRAY['industrial'], NULL)
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 102. iron → metal
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('iron', 'metal', 0.82, 'material_modifier', ARRAY['industrial'], NULL)
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 103. leather → genuine leather
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('leather', 'genuine leather', 0.9, 'material_modifier', ARRAY['luxury','contemporary'], NULL)
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 104. fabric → upholstered
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('fabric', 'upholstered', 0.85, 'material_modifier', NULL, NULL)
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 105. upholstered → fabric
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('upholstered', 'fabric', 0.85, 'material_modifier', NULL, NULL)
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 106. glass → tempered glass
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('glass', 'tempered glass', 0.85, 'material_modifier', ARRAY['modern','contemporary'], NULL)
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 107. industrial → industrial style
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('industrial', 'industrial style', 0.9, 'style_modifier', ARRAY['industrial'], NULL)
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 108. modern → contemporary
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('modern', 'contemporary', 0.85, 'style_modifier', ARRAY['modern'], NULL)
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 109. contemporary → modern
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('contemporary', 'modern', 0.85, 'style_modifier', ARRAY['contemporary'], NULL)
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 110. rustic → farmhouse
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('rustic', 'farmhouse', 0.85, 'style_modifier', ARRAY['rustic','farmhouse'], NULL)
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 111. minimalist → scandinavian
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('minimalist', 'scandinavian', 0.8, 'style_modifier', ARRAY['minimalist','scandinavian'], NULL)
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 112. traditional → classic
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('traditional', 'classic', 0.85, 'style_modifier', ARRAY['traditional'], NULL)
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- 113. luxury → premium
INSERT INTO item_synonyms (synonym, canonical_name, confidence_score, context_type, style_tags, room_type)
VALUES ('luxury', 'premium', 0.9, 'style_modifier', ARRAY['luxury'], NULL)
ON CONFLICT (synonym, canonical_name) DO UPDATE
SET confidence_score = EXCLUDED.confidence_score,
    context_type = EXCLUDED.context_type,
    style_tags = EXCLUDED.style_tags,
    room_type = EXCLUDED.room_type,
    updated_at = NOW();

-- COMMIT TRANSACTION
COMMIT;

-- VERIFICATION QUERIES
-- Check total synonym count
SELECT COUNT(*) as total_synonyms FROM item_synonyms;

-- Check synonyms by context type
SELECT context_type, COUNT(*) as count
FROM item_synonyms
GROUP BY context_type
ORDER BY count DESC;

-- Check room-specific synonyms
SELECT 
  UNNEST(room_type) as room,
  COUNT(*) as synonym_count
FROM item_synonyms
WHERE room_type IS NOT NULL
GROUP BY room
ORDER BY synonym_count DESC;

-- Test sample matches
SELECT 
  synonym,
  canonical_name,
  confidence_score
FROM item_synonyms
WHERE synonym IN ('coffee table', 'leather sofa', 'floor lamp', 'bookshelf', 'cushion')
ORDER BY synonym;

-- Summary
SELECT 
  'Emergency Synonyms Imported' as status,
  COUNT(*) as total_count,
  COUNT(CASE WHEN confidence_score >= 0.95 THEN 1 END) as high_confidence,
  COUNT(CASE WHEN confidence_score BETWEEN 0.90 AND 0.94 THEN 1 END) as medium_confidence,
  COUNT(CASE WHEN confidence_score < 0.90 THEN 1 END) as low_confidence
FROM item_synonyms
WHERE created_at >= NOW() - INTERVAL '1 minute';
