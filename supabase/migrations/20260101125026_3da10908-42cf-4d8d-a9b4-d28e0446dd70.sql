
-- Add unique constraint for synonyms table
ALTER TABLE item_synonyms ADD CONSTRAINT item_synonyms_synonym_canonical_unique 
UNIQUE (synonym, canonical_name);
