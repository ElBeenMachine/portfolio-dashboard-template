-- Add default authentication background configuration if it doesn't exist
INSERT OR IGNORE INTO `config` (key, value) VALUES ('auth-background', '/img/default-auth-background.jpg');