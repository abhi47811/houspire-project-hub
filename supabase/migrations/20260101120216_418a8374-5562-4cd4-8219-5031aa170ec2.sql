-- Add style-specific columns to pricing_items
ALTER TABLE pricing_items 
ADD COLUMN IF NOT EXISTS style_tags TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS room_type TEXT,
ADD COLUMN IF NOT EXISTS priority TEXT;

-- Create GIN index for efficient style_tags queries
CREATE INDEX IF NOT EXISTS idx_pricing_items_style_tags 
ON pricing_items USING GIN(style_tags);

-- Create index for room_type lookups
CREATE INDEX IF NOT EXISTS idx_pricing_items_room_type
ON pricing_items (room_type);

-- Add comment for documentation
COMMENT ON COLUMN pricing_items.style_tags IS 'Array of design styles this item belongs to (e.g., industrial, art_deco, scandinavian)';
COMMENT ON COLUMN pricing_items.room_type IS 'Room type this item is typically used in (e.g., living_room, bedroom, kitchen)';
COMMENT ON COLUMN pricing_items.priority IS 'Item priority: SIGNATURE, Essential, Recommended, Optional';