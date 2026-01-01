-- Add unique constraint on item_name + category for upsert to work
ALTER TABLE public.pricing_items 
ADD CONSTRAINT pricing_items_item_name_category_unique 
UNIQUE (item_name, category);