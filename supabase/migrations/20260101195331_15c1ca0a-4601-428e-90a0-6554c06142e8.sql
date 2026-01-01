-- ================================================
-- COMPREHENSIVE PRICING ITEMS FOR ALL CATEGORIES
-- ================================================

-- A. LIGHTING ITEMS
INSERT INTO pricing_items (category, sub_category, item_name, specification, unit, budget_price, mid_premium_price, premium_price, gst_percent, keywords, synonyms) VALUES
-- Ceiling Lights
('LIGHTING', 'Ceiling Lights', 'LED Downlight 5W', 'LED downlight, 5W, 3000K warm white, recessed', 'nos', 250, 400, 650, 18, ARRAY['led', 'downlight', 'recessed', 'ceiling'], ARRAY['recessed light', 'pot light', 'can light']),
('LIGHTING', 'Ceiling Lights', 'LED Downlight 9W', 'LED downlight, 9W, 3000K/4000K, recessed', 'nos', 350, 550, 800, 18, ARRAY['led', 'downlight', 'recessed', 'ceiling'], ARRAY['spot light', 'ceiling spot']),
('LIGHTING', 'Ceiling Lights', 'LED Downlight 12W', 'LED downlight, 12W, high brightness, recessed', 'nos', 450, 700, 1000, 18, ARRAY['led', 'downlight', 'recessed'], ARRAY['bright downlight']),
('LIGHTING', 'Ceiling Lights', 'Surface LED Panel 18W', 'Surface mounted LED panel, 18W, square/round', 'nos', 400, 650, 950, 18, ARRAY['led', 'panel', 'surface', 'ceiling'], ARRAY['panel light', 'flat light']),
('LIGHTING', 'Ceiling Lights', 'Surface LED Panel 24W', 'Surface mounted LED panel, 24W, square/round', 'nos', 550, 850, 1200, 18, ARRAY['led', 'panel', 'surface'], ARRAY['ceiling panel']),
-- Chandeliers
('LIGHTING', 'Chandeliers', 'Chandelier Crystal 6 Light', 'Crystal chandelier, 6 arm, classic design', 'nos', 8000, 15000, 35000, 18, ARRAY['chandelier', 'crystal', 'classic'], ARRAY['crystal light', 'hanging crystal']),
('LIGHTING', 'Chandeliers', 'Chandelier Crystal 12 Light', 'Crystal chandelier, 12 arm, grand design', 'nos', 18000, 35000, 80000, 18, ARRAY['chandelier', 'crystal', 'grand'], ARRAY['large chandelier', 'grand chandelier']),
('LIGHTING', 'Chandeliers', 'Chandelier Modern Sputnik', 'Modern sputnik chandelier, metal, 8-12 arms', 'nos', 6000, 12000, 25000, 18, ARRAY['chandelier', 'modern', 'sputnik'], ARRAY['sputnik light', 'starburst chandelier']),
('LIGHTING', 'Chandeliers', 'Chandelier Contemporary Ring', 'Contemporary LED ring chandelier, dimmable', 'nos', 8000, 18000, 45000, 18, ARRAY['chandelier', 'contemporary', 'ring', 'led'], ARRAY['ring light', 'circular chandelier']),
-- Pendant Lights
('LIGHTING', 'Pendant Lights', 'Pendant Light Single', 'Single pendant light, various styles', 'nos', 1500, 3500, 8000, 18, ARRAY['pendant', 'hanging', 'drop'], ARRAY['hanging light', 'drop light']),
('LIGHTING', 'Pendant Lights', 'Pendant Light Cluster 3', 'Cluster pendant, 3 lights, adjustable height', 'nos', 4000, 8000, 18000, 18, ARRAY['pendant', 'cluster', 'dining'], ARRAY['dining pendant', 'cluster light']),
('LIGHTING', 'Pendant Lights', 'Pendant Light Industrial', 'Industrial style pendant, metal/cage', 'nos', 1200, 2500, 5500, 18, ARRAY['pendant', 'industrial', 'metal'], ARRAY['industrial pendant', 'cage pendant']),
-- Track Lighting
('LIGHTING', 'Track Lighting', 'Track Light Rail 4ft', 'Track light rail system, 4ft, aluminum', 'nos', 1500, 2800, 5000, 18, ARRAY['track', 'rail', 'system'], ARRAY['track rail', 'light track']),
('LIGHTING', 'Track Lighting', 'Track Spotlight Head', 'Track spotlight head, adjustable, LED', 'nos', 600, 1200, 2500, 18, ARRAY['track', 'spot', 'adjustable'], ARRAY['track spot', 'spotlight']),
-- Ceiling Fans
('LIGHTING', 'Ceiling Fans', 'Ceiling Fan Regular', 'Standard ceiling fan, 3 blade, 1200mm', 'nos', 1500, 2500, 4000, 18, ARRAY['fan', 'ceiling', 'standard'], ARRAY['regular fan', 'standard fan']),
('LIGHTING', 'Ceiling Fans', 'Ceiling Fan Designer', 'Designer ceiling fan, decorative blades', 'nos', 4000, 8000, 18000, 18, ARRAY['fan', 'ceiling', 'designer'], ARRAY['decorative fan', 'fancy fan']),
('LIGHTING', 'Ceiling Fans', 'Ceiling Fan BLDC', 'BLDC motor ceiling fan, energy efficient', 'nos', 3500, 6000, 12000, 18, ARRAY['fan', 'ceiling', 'bldc', 'energy'], ARRAY['bldc fan', 'efficient fan']),
('LIGHTING', 'Ceiling Fans', 'Ceiling Fan With Light', 'Ceiling fan with integrated LED light kit', 'nos', 5000, 10000, 22000, 18, ARRAY['fan', 'ceiling', 'light', 'combo'], ARRAY['fan light combo', 'fan with light']),
-- Floor & Table Lamps
('LIGHTING', 'Floor Lamps', 'Floor Lamp Tripod', 'Tripod floor lamp, fabric shade', 'nos', 3000, 6000, 15000, 18, ARRAY['floor', 'lamp', 'tripod', 'standing'], ARRAY['tripod lamp', 'standing lamp']),
('LIGHTING', 'Floor Lamps', 'Floor Lamp Arc', 'Arc floor lamp, adjustable, modern', 'nos', 4500, 9000, 25000, 18, ARRAY['floor', 'lamp', 'arc', 'curved'], ARRAY['arc lamp', 'curved floor lamp']),
('LIGHTING', 'Table Lamps', 'Table Lamp Ceramic', 'Table lamp with ceramic base, fabric shade', 'nos', 1500, 3500, 8000, 18, ARRAY['table', 'lamp', 'ceramic', 'bedside'], ARRAY['bedside lamp', 'ceramic lamp']),
('LIGHTING', 'Table Lamps', 'Table Lamp Modern', 'Modern table lamp, metal/glass design', 'nos', 2000, 4500, 12000, 18, ARRAY['table', 'lamp', 'modern'], ARRAY['modern table lamp', 'desk lamp']),
-- Wall Lights
('LIGHTING', 'Wall Lights', 'Wall Sconce Pair', 'Wall sconce pair, decorative, LED/bulb', 'pair', 2500, 5000, 12000, 18, ARRAY['wall', 'sconce', 'pair'], ARRAY['wall light', 'side light']),
('LIGHTING', 'Wall Lights', 'Picture Light', 'Picture/artwork light, adjustable', 'nos', 1200, 2500, 6000, 18, ARRAY['picture', 'art', 'light'], ARRAY['artwork light', 'accent light']),
-- LED Strips
('LIGHTING', 'LED Strips', 'LED Strip Light', 'LED strip light, 60 LEDs/m, warm/cool white', 'rft', 80, 150, 300, 18, ARRAY['led', 'strip', 'cove', 'accent'], ARRAY['strip light', 'rope light']),
('LIGHTING', 'LED Strips', 'LED Strip Light RGB', 'RGB LED strip, color changing, remote control', 'rft', 120, 220, 450, 18, ARRAY['led', 'strip', 'rgb', 'color'], ARRAY['color changing strip', 'rgb strip']),
('LIGHTING', 'LED Strips', 'Cove Light Profile', 'Aluminum cove light profile with LED strip', 'rft', 200, 400, 750, 18, ARRAY['cove', 'profile', 'aluminum', 'led'], ARRAY['cove lighting', 'indirect light']),

-- B. SOFT FURNISHINGS
('SOFT_FURNISHINGS', 'Curtains', 'Sheer Curtains', 'Sheer/voile curtains, light filtering', 'sqft', 80, 150, 300, 12, ARRAY['sheer', 'voile', 'curtain', 'transparent'], ARRAY['net curtains', 'voile curtains']),
('SOFT_FURNISHINGS', 'Curtains', 'Blackout Curtains', 'Blackout curtains, 100% light blocking', 'sqft', 120, 250, 500, 12, ARRAY['blackout', 'curtain', 'dark'], ARRAY['block out curtains', 'dark curtains']),
('SOFT_FURNISHINGS', 'Curtains', 'Linen Curtains', 'Natural linen curtains, textured', 'sqft', 150, 300, 600, 12, ARRAY['linen', 'curtain', 'natural', 'texture'], ARRAY['fabric curtains', 'natural curtains']),
('SOFT_FURNISHINGS', 'Curtains', 'Velvet Curtains', 'Velvet curtains, heavy, luxury', 'sqft', 200, 450, 900, 12, ARRAY['velvet', 'curtain', 'heavy', 'luxury'], ARRAY['heavy curtains', 'luxury curtains']),
('SOFT_FURNISHINGS', 'Curtains', 'Eyelet Curtains', 'Eyelet/grommet curtains, easy hang', 'sqft', 100, 200, 400, 12, ARRAY['eyelet', 'grommet', 'curtain'], ARRAY['grommet curtains', 'ring curtains']),
-- Blinds
('SOFT_FURNISHINGS', 'Blinds', 'Roller Blinds', 'Roller blinds, fabric, manual/motorized', 'sqft', 80, 180, 400, 12, ARRAY['roller', 'blind', 'fabric'], ARRAY['roll up blind', 'fabric blind']),
('SOFT_FURNISHINGS', 'Blinds', 'Venetian Blinds', 'Venetian blinds, aluminum slats', 'sqft', 100, 220, 450, 12, ARRAY['venetian', 'blind', 'slat', 'aluminum'], ARRAY['slat blinds', 'aluminum blinds']),
('SOFT_FURNISHINGS', 'Blinds', 'Roman Blinds', 'Roman blinds, fabric, elegant fold', 'sqft', 150, 350, 700, 12, ARRAY['roman', 'blind', 'fabric', 'fold'], ARRAY['fold blinds', 'roman shade']),
('SOFT_FURNISHINGS', 'Blinds', 'Wooden Blinds', 'Wooden venetian blinds, natural/stained', 'sqft', 180, 400, 800, 12, ARRAY['wood', 'wooden', 'blind', 'natural'], ARRAY['wood slat blinds']),
('SOFT_FURNISHINGS', 'Blinds', 'Motorized Blinds', 'Motorized roller/venetian blinds, remote', 'sqft', 250, 550, 1200, 12, ARRAY['motorized', 'blind', 'electric', 'remote'], ARRAY['electric blinds', 'smart blinds']),
-- Bedding
('SOFT_FURNISHINGS', 'Bedding', 'Bedding Set Cotton', 'Cotton bedding set, fitted sheet + duvet + pillowcases', 'set', 2500, 5000, 12000, 12, ARRAY['bedding', 'cotton', 'sheet', 'duvet'], ARRAY['bed set', 'cotton sheets']),
('SOFT_FURNISHINGS', 'Bedding', 'Bedding Set Silk', 'Silk/satin bedding set, luxury', 'set', 8000, 18000, 45000, 12, ARRAY['bedding', 'silk', 'satin', 'luxury'], ARRAY['silk sheets', 'luxury bedding']),
('SOFT_FURNISHINGS', 'Bedding', 'Bedding Set Linen', 'Linen bedding set, breathable, natural', 'set', 6000, 12000, 30000, 12, ARRAY['bedding', 'linen', 'natural'], ARRAY['linen sheets', 'natural bedding']),
-- Throws & Blankets
('SOFT_FURNISHINGS', 'Throws', 'Throw Blanket Knit', 'Knitted throw blanket, chunky/regular', 'nos', 1500, 3500, 8000, 12, ARRAY['throw', 'blanket', 'knit', 'knitted'], ARRAY['knit blanket', 'cable knit throw']),
('SOFT_FURNISHINGS', 'Throws', 'Throw Blanket Faux Fur', 'Faux fur throw blanket, soft plush', 'nos', 2000, 4500, 12000, 12, ARRAY['throw', 'blanket', 'fur', 'faux', 'plush'], ARRAY['fur throw', 'plush blanket']),
('SOFT_FURNISHINGS', 'Throws', 'Throw Blanket Cashmere', 'Cashmere throw blanket, luxury', 'nos', 8000, 20000, 50000, 12, ARRAY['throw', 'blanket', 'cashmere', 'luxury'], ARRAY['cashmere throw', 'luxury blanket']),

-- C. FALSE CEILING
('FALSE_CEILING', 'Gypsum', 'Gypsum False Ceiling Plain', 'Plain gypsum board false ceiling, painted', 'sqft', 75, 110, 160, 18, ARRAY['gypsum', 'ceiling', 'plain', 'false'], ARRAY['drywall ceiling', 'plasterboard ceiling']),
('FALSE_CEILING', 'Gypsum', 'Gypsum False Ceiling Designer', 'Designer gypsum ceiling with L-box/cove', 'sqft', 100, 160, 250, 18, ARRAY['gypsum', 'ceiling', 'designer', 'cove'], ARRAY['designer ceiling', 'cove ceiling']),
('FALSE_CEILING', 'POP', 'POP False Ceiling Plain', 'Plaster of Paris false ceiling, plain', 'sqft', 60, 90, 130, 18, ARRAY['pop', 'ceiling', 'plaster', 'plain'], ARRAY['plaster ceiling', 'pop ceiling']),
('FALSE_CEILING', 'POP', 'POP False Ceiling Designer', 'Designer POP ceiling with molding/patterns', 'sqft', 85, 140, 220, 18, ARRAY['pop', 'ceiling', 'designer', 'molding'], ARRAY['decorative pop ceiling']),
('FALSE_CEILING', 'Grid', 'Grid False Ceiling', 'Grid/T-bar false ceiling, mineral fiber tiles', 'sqft', 80, 130, 200, 18, ARRAY['grid', 'ceiling', 'tile', 'mineral'], ARRAY['tile ceiling', 't-bar ceiling', 'acoustic ceiling']),
('FALSE_CEILING', 'Wooden', 'Wooden False Ceiling', 'Wooden panel/plank false ceiling', 'sqft', 200, 350, 550, 18, ARRAY['wood', 'wooden', 'ceiling', 'panel'], ARRAY['wood panel ceiling', 'plank ceiling']),
('FALSE_CEILING', 'PVC', 'PVC False Ceiling', 'PVC panel false ceiling, waterproof', 'sqft', 45, 70, 120, 18, ARRAY['pvc', 'ceiling', 'panel', 'waterproof'], ARRAY['plastic ceiling', 'pvc panel ceiling']),
('FALSE_CEILING', 'Metal', 'Metal False Ceiling', 'Metal strip/panel false ceiling, aluminum', 'sqft', 150, 280, 450, 18, ARRAY['metal', 'ceiling', 'aluminum', 'strip'], ARRAY['metal panel ceiling', 'aluminum ceiling']),

-- D. ELECTRICAL
('ELECTRICAL', 'Switches', 'Modular Switch 6A', 'Modular switch 6A, single/double, branded', 'nos', 80, 150, 300, 18, ARRAY['switch', 'modular', '6a'], ARRAY['light switch', 'room switch']),
('ELECTRICAL', 'Switches', 'Modular Switch 16A', 'Modular switch 16A, for AC/geyser', 'nos', 120, 220, 450, 18, ARRAY['switch', 'modular', '16a', 'heavy'], ARRAY['ac switch', 'heavy duty switch']),
('ELECTRICAL', 'Sockets', 'Modular Socket 6A', 'Modular socket 6A, 3-pin', 'nos', 100, 180, 350, 18, ARRAY['socket', 'modular', '6a', 'plug'], ARRAY['power socket', 'plug point']),
('ELECTRICAL', 'Sockets', 'Modular Socket 16A', 'Modular socket 16A, for AC/geyser', 'nos', 150, 280, 500, 18, ARRAY['socket', 'modular', '16a', 'heavy'], ARRAY['ac socket', 'heavy socket']),
('ELECTRICAL', 'Sockets', 'USB Charging Socket', 'USB charging socket, 2-4 ports, fast charge', 'nos', 400, 750, 1500, 18, ARRAY['usb', 'socket', 'charging', 'port'], ARRAY['usb charger', 'charging point']),
('ELECTRICAL', 'Wiring', 'Concealed Wiring Point', 'Concealed wiring per point, copper wire', 'point', 350, 550, 850, 18, ARRAY['wiring', 'concealed', 'electrical', 'point'], ARRAY['electrical point', 'wiring point']),
('ELECTRICAL', 'Panels', 'MCB Distribution Box', 'MCB distribution box, 8-12 way', 'nos', 2500, 5000, 10000, 18, ARRAY['mcb', 'panel', 'distribution', 'box'], ARRAY['db box', 'electrical panel']),

-- E. DOORS & WINDOWS  
('DOORS', 'Flush Doors', 'Flush Door with Frame', 'Flush door with wooden frame, painted/laminated', 'nos', 8000, 15000, 28000, 18, ARRAY['flush', 'door', 'frame', 'wooden'], ARRAY['wooden door', 'room door']),
('DOORS', 'Panel Doors', 'Panel Door Solid', 'Solid panel door, carved/plain, with frame', 'nos', 15000, 30000, 55000, 18, ARRAY['panel', 'door', 'solid', 'carved'], ARRAY['carved door', 'solid door']),
('DOORS', 'Glass Doors', 'Glass Door Sliding', 'Sliding glass door, aluminum frame', 'sqft', 800, 1400, 2500, 18, ARRAY['glass', 'door', 'sliding', 'aluminum'], ARRAY['slider door', 'patio door']),
('DOORS', 'Glass Doors', 'Glass Door French', 'French doors, glass panels, hinged', 'nos', 25000, 45000, 85000, 18, ARRAY['french', 'door', 'glass', 'hinged'], ARRAY['french doors', 'double doors']),
('DOORS', 'Sliding Doors', 'Sliding Wardrobe Door', 'Sliding wardrobe door, laminate/mirror', 'sqft', 650, 1100, 1800, 18, ARRAY['sliding', 'wardrobe', 'door', 'laminate'], ARRAY['closet door', 'wardrobe slider']),
('WINDOWS', 'UPVC Windows', 'UPVC Window Sliding', 'UPVC sliding window, double glazed', 'sqft', 650, 950, 1400, 18, ARRAY['upvc', 'window', 'sliding', 'glazed'], ARRAY['plastic window', 'upvc slider']),
('WINDOWS', 'UPVC Windows', 'UPVC Window Casement', 'UPVC casement window, openable', 'sqft', 700, 1050, 1550, 18, ARRAY['upvc', 'window', 'casement', 'openable'], ARRAY['openable window', 'hinged window']),
('WINDOWS', 'Aluminum Windows', 'Aluminum Window Sliding', 'Aluminum sliding window, powder coated', 'sqft', 400, 650, 1000, 18, ARRAY['aluminum', 'window', 'sliding'], ARRAY['aluminium window', 'metal window']),
('WINDOWS', 'Aluminum Windows', 'Aluminum Window Fixed', 'Aluminum fixed glass window', 'sqft', 350, 550, 850, 18, ARRAY['aluminum', 'window', 'fixed', 'glass'], ARRAY['fixed window', 'picture window']),

-- F. KITCHEN
('KITCHEN', 'Cabinets', 'Modular Kitchen Base Unit', 'Base cabinet with drawers/shutters, per running foot', 'rft', 1800, 3200, 5500, 18, ARRAY['modular', 'kitchen', 'base', 'cabinet'], ARRAY['lower cabinet', 'base cabinet']),
('KITCHEN', 'Cabinets', 'Modular Kitchen Upper Unit', 'Wall cabinet/overhead unit, per running foot', 'rft', 1400, 2600, 4500, 18, ARRAY['modular', 'kitchen', 'upper', 'wall'], ARRAY['upper cabinet', 'wall cabinet', 'overhead']),
('KITCHEN', 'Cabinets', 'Modular Kitchen Tall Unit', 'Tall unit/pantry cabinet, full height', 'nos', 25000, 45000, 80000, 18, ARRAY['modular', 'kitchen', 'tall', 'pantry'], ARRAY['tall cabinet', 'pantry unit']),
('KITCHEN', 'Countertops', 'Countertop Granite', 'Granite countertop, polished, per sqft', 'sqft', 250, 450, 800, 18, ARRAY['countertop', 'granite', 'kitchen', 'stone'], ARRAY['granite slab', 'kitchen top']),
('KITCHEN', 'Countertops', 'Countertop Quartz', 'Quartz countertop, engineered stone', 'sqft', 450, 750, 1400, 18, ARRAY['countertop', 'quartz', 'engineered'], ARRAY['quartz slab', 'engineered stone']),
('KITCHEN', 'Countertops', 'Countertop Solid Surface', 'Solid surface countertop, Corian type', 'sqft', 600, 1100, 2000, 18, ARRAY['countertop', 'solid', 'corian'], ARRAY['corian top', 'acrylic surface']),
('KITCHEN', 'Backsplash', 'Kitchen Backsplash Tile', 'Ceramic/vitrified tile backsplash', 'sqft', 80, 150, 300, 18, ARRAY['backsplash', 'tile', 'kitchen', 'wall'], ARRAY['kitchen tile', 'splash back']),
('KITCHEN', 'Backsplash', 'Kitchen Backsplash Glass', 'Glass/lacquered glass backsplash', 'sqft', 200, 400, 750, 18, ARRAY['backsplash', 'glass', 'kitchen', 'lacquered'], ARRAY['glass splashback']),
('KITCHEN', 'Appliances', 'Kitchen Chimney', 'Kitchen chimney, 60-90cm, auto-clean', 'nos', 8000, 18000, 45000, 18, ARRAY['chimney', 'kitchen', 'hood', 'exhaust'], ARRAY['exhaust hood', 'range hood']),
('KITCHEN', 'Appliances', 'Kitchen Hob', 'Gas/induction hob, 3-4 burner', 'nos', 8000, 20000, 45000, 18, ARRAY['hob', 'kitchen', 'burner', 'cooktop'], ARRAY['gas stove', 'cooktop', 'burner']),
('KITCHEN', 'Sinks', 'Kitchen Sink Single Bowl', 'Stainless steel sink, single bowl', 'nos', 3000, 7000, 15000, 18, ARRAY['sink', 'kitchen', 'steel', 'single'], ARRAY['steel sink', 'kitchen basin']),
('KITCHEN', 'Sinks', 'Kitchen Sink Double Bowl', 'Stainless steel sink, double bowl', 'nos', 5000, 12000, 25000, 18, ARRAY['sink', 'kitchen', 'steel', 'double'], ARRAY['double sink', 'twin bowl']),

-- G. BATHROOM
('BATHROOM', 'WC', 'EWC Floor Mounted', 'Floor mounted EWC/toilet, complete set', 'nos', 6000, 15000, 35000, 18, ARRAY['ewc', 'toilet', 'wc', 'floor'], ARRAY['western toilet', 'commode']),
('BATHROOM', 'WC', 'EWC Wall Hung', 'Wall hung EWC/toilet with concealed tank', 'nos', 12000, 28000, 65000, 18, ARRAY['ewc', 'toilet', 'wc', 'wall', 'hung'], ARRAY['wall mounted toilet', 'floating toilet']),
('BATHROOM', 'Basins', 'Wash Basin Counter Top', 'Counter top wash basin, ceramic', 'nos', 3000, 8000, 20000, 18, ARRAY['basin', 'wash', 'counter', 'ceramic'], ARRAY['table top basin', 'vessel sink']),
('BATHROOM', 'Basins', 'Wash Basin Wall Mounted', 'Wall mounted wash basin with pedestal', 'nos', 2500, 6000, 15000, 18, ARRAY['basin', 'wash', 'wall', 'pedestal'], ARRAY['pedestal basin', 'wall basin']),
('BATHROOM', 'Basins', 'Wash Basin Under Counter', 'Under counter wash basin, ceramic', 'nos', 3500, 9000, 22000, 18, ARRAY['basin', 'wash', 'under', 'counter'], ARRAY['under mount basin', 'under counter sink']),
('BATHROOM', 'Shower', 'Rain Shower Set', 'Rain shower set with arm and hand shower', 'set', 5000, 15000, 40000, 18, ARRAY['rain', 'shower', 'head', 'set'], ARRAY['rainfall shower', 'overhead shower']),
('BATHROOM', 'Shower', 'Shower Enclosure', 'Shower enclosure, glass, hinged/sliding', 'set', 18000, 40000, 90000, 18, ARRAY['shower', 'enclosure', 'glass', 'cabin'], ARRAY['shower cabin', 'glass shower']),
('BATHROOM', 'Shower', 'Shower Partition', 'Shower partition, tempered glass', 'sqft', 800, 1500, 3000, 18, ARRAY['shower', 'partition', 'glass'], ARRAY['glass partition', 'shower screen']),
('BATHROOM', 'Bathtub', 'Bathtub Acrylic Freestanding', 'Freestanding acrylic bathtub', 'nos', 35000, 80000, 180000, 18, ARRAY['bathtub', 'acrylic', 'freestanding'], ARRAY['soaking tub', 'free standing tub']),
('BATHROOM', 'Bathtub', 'Bathtub Built In', 'Built-in acrylic bathtub with surround', 'nos', 25000, 55000, 120000, 18, ARRAY['bathtub', 'acrylic', 'built', 'in'], ARRAY['drop in tub', 'alcove tub']),
('BATHROOM', 'Bathtub', 'Bathtub Jacuzzi', 'Jacuzzi/whirlpool bathtub with jets', 'nos', 80000, 180000, 400000, 18, ARRAY['bathtub', 'jacuzzi', 'whirlpool', 'jets'], ARRAY['jacuzzi tub', 'spa tub']),
('BATHROOM', 'Vanity', 'Bathroom Vanity', 'Bathroom vanity unit with basin and mirror', 'nos', 12000, 30000, 70000, 18, ARRAY['vanity', 'bathroom', 'cabinet', 'mirror'], ARRAY['bathroom cabinet', 'vanity unit']),
('BATHROOM', 'Faucets', 'Basin Mixer', 'Single lever basin mixer faucet', 'nos', 2000, 5000, 15000, 18, ARRAY['mixer', 'faucet', 'basin', 'tap'], ARRAY['basin tap', 'sink faucet']),
('BATHROOM', 'Faucets', 'Wall Mixer', 'Wall mounted mixer with provision for shower', 'nos', 3000, 8000, 22000, 18, ARRAY['mixer', 'wall', 'shower', 'tap'], ARRAY['shower mixer', 'bath faucet']),
('BATHROOM', 'Accessories', 'Bathroom Accessories Set', 'Bathroom accessories set (towel rod, soap dish, etc)', 'set', 2000, 5000, 15000, 18, ARRAY['accessories', 'bathroom', 'towel', 'rod'], ARRAY['bath accessories', 'bathroom hardware']);
