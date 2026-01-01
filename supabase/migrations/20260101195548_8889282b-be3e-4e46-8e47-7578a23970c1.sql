-- COMPREHENSIVE SYNONYMS - Skip duplicates
INSERT INTO item_synonyms (synonym, canonical_name, category, source, confidence_score) VALUES
-- LIGHTING SYNONYMS
('ceiling light', 'LED Downlight 9W', 'LIGHTING', 'ai_detection', 0.85),
('recessed light', 'LED Downlight 9W', 'LIGHTING', 'ai_detection', 0.90),
('downlight', 'LED Downlight 9W', 'LIGHTING', 'ai_detection', 0.95),
('pot light', 'LED Downlight 9W', 'LIGHTING', 'ai_detection', 0.90),
('crystal chandelier', 'Chandelier Crystal 6 Light', 'LIGHTING', 'ai_detection', 0.95),
('chandelier', 'Chandelier Crystal 6 Light', 'LIGHTING', 'ai_detection', 0.90),
('pendant light', 'Pendant Light Single', 'LIGHTING', 'ai_detection', 0.90),
('ceiling fan', 'Ceiling Fan Regular', 'LIGHTING', 'ai_detection', 0.90),
('floor lamp', 'Floor Lamp Tripod', 'LIGHTING', 'ai_detection', 0.85),
('table lamp', 'Table Lamp Ceramic', 'LIGHTING', 'ai_detection', 0.85),
('led strip', 'LED Strip Light', 'LIGHTING', 'ai_detection', 0.90),
('cove light', 'Cove Light Profile', 'LIGHTING', 'ai_detection', 0.90),
-- FALSE CEILING SYNONYMS
('gypsum ceiling', 'Gypsum False Ceiling Plain', 'FALSE_CEILING', 'ai_detection', 0.95),
('false ceiling', 'Gypsum False Ceiling Plain', 'FALSE_CEILING', 'ai_detection', 0.80),
('pop ceiling', 'POP False Ceiling Plain', 'FALSE_CEILING', 'ai_detection', 0.95),
('grid ceiling', 'Grid False Ceiling', 'FALSE_CEILING', 'ai_detection', 0.95),
('wooden ceiling', 'Wooden False Ceiling', 'FALSE_CEILING', 'ai_detection', 0.95),
-- ELECTRICAL SYNONYMS  
('light switch', 'Modular Switch 6A', 'ELECTRICAL', 'ai_detection', 0.85),
('power socket', 'Modular Socket 6A', 'ELECTRICAL', 'ai_detection', 0.90),
('plug point', 'Modular Socket 6A', 'ELECTRICAL', 'ai_detection', 0.90),
-- DOORS SYNONYMS
('wooden door', 'Flush Door with Frame', 'DOORS', 'ai_detection', 0.85),
('flush door', 'Flush Door with Frame', 'DOORS', 'ai_detection', 0.95),
('sliding glass door', 'Glass Door Sliding', 'DOORS', 'ai_detection', 0.95),
('french door', 'Glass Door French', 'DOORS', 'ai_detection', 0.95),
-- KITCHEN SYNONYMS
('modular kitchen', 'Modular Kitchen Base Unit', 'KITCHEN', 'ai_detection', 0.80),
('kitchen cabinet', 'Modular Kitchen Base Unit', 'KITCHEN', 'ai_detection', 0.85),
('granite countertop', 'Countertop Granite', 'KITCHEN', 'ai_detection', 0.95),
('quartz countertop', 'Countertop Quartz', 'KITCHEN', 'ai_detection', 0.95),
('backsplash', 'Kitchen Backsplash Tile', 'KITCHEN', 'ai_detection', 0.90),
('chimney', 'Kitchen Chimney', 'KITCHEN', 'ai_detection', 0.90),
('kitchen sink', 'Kitchen Sink Single Bowl', 'KITCHEN', 'ai_detection', 0.85),
-- BATHROOM SYNONYMS
('toilet', 'EWC Floor Mounted', 'BATHROOM', 'ai_detection', 0.85),
('western toilet', 'EWC Floor Mounted', 'BATHROOM', 'ai_detection', 0.90),
('wash basin', 'Wash Basin Counter Top', 'BATHROOM', 'ai_detection', 0.85),
('rain shower', 'Rain Shower Set', 'BATHROOM', 'ai_detection', 0.95),
('shower enclosure', 'Shower Enclosure', 'BATHROOM', 'ai_detection', 0.95),
('bathtub', 'Bathtub Acrylic Freestanding', 'BATHROOM', 'ai_detection', 0.85),
('bathroom vanity', 'Bathroom Vanity', 'BATHROOM', 'ai_detection', 0.95),
-- SOFT FURNISHINGS - only new ones
('blackout curtain', 'Blackout Curtains', 'SOFT_FURNISHINGS', 'ai_detection', 0.95),
('roller blind', 'Roller Blinds', 'SOFT_FURNISHINGS', 'ai_detection', 0.95),
('venetian blind', 'Venetian Blinds', 'SOFT_FURNISHINGS', 'ai_detection', 0.95),
('roman blind', 'Roman Blinds', 'SOFT_FURNISHINGS', 'ai_detection', 0.95),
('throw blanket', 'Throw Blanket Knit', 'SOFT_FURNISHINGS', 'ai_detection', 0.85),
('bed linen', 'Bedding Set Cotton', 'SOFT_FURNISHINGS', 'ai_detection', 0.85)
ON CONFLICT (synonym, canonical_name) DO NOTHING;