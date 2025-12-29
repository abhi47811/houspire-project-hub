-- Performance optimization indexes

-- Optimize project queries by created_at (for sorting)
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);

-- Optimize render queries by created_at (for sorting)
CREATE INDEX IF NOT EXISTS idx_renders_created_at ON renders(created_at DESC);

-- Optimize room queries by created_at (for sorting)
CREATE INDEX IF NOT EXISTS idx_rooms_created_at ON rooms(created_at DESC);

-- Optimize smart defaults lookup (used frequently for style/room type matching)
CREATE INDEX IF NOT EXISTS idx_smart_defaults_lookup ON smart_defaults(style_slug, room_type_slug);

-- Optimize style_library queries (frequently searched)
CREATE INDEX IF NOT EXISTS idx_style_library_room_design ON style_library(room_type, design_style);
CREATE INDEX IF NOT EXISTS idx_style_library_status_tier ON style_library(status, tier);

-- Optimize library_usage queries
CREATE INDEX IF NOT EXISTS idx_library_usage_library_image ON library_usage(library_image_id);
CREATE INDEX IF NOT EXISTS idx_library_usage_project ON library_usage(project_id);