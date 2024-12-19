-- Create basic dashboard configuration table
CREATE TABLE IF NOT EXISTS `config` (
    key TEXT PRIMARY KEY, 
    value TEXT
);

-- Add default dashboard icon configuration if it doesn't exist
INSERT OR IGNORE INTO `config` (key, value) VALUES ('logo', '/img/default-logo.png');

-- Add default dashboard title configuration if it doesn't exist
INSERT OR IGNORE INTO `config` (key, value) VALUES ('title', 'Dashboard');

-- Add default dashboard post types configuration if it doesn't exist
INSERT OR IGNORE INTO `config` (key, value) VALUES ('content_types', '["code", "blog", "literature"]');