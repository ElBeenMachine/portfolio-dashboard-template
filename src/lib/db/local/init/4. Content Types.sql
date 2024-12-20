-- Add default dashboard post types configuration if it doesn't exist
INSERT OR IGNORE INTO `config` (key, value) VALUES ('content-types', '["code", "blog", "literature"]');