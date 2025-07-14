-- Update theme field to have proper default value
ALTER TABLE link_bio_profiles 
ALTER COLUMN theme SET DEFAULT 'default';

-- Update existing profiles that have NULL theme to use default
UPDATE link_bio_profiles 
SET theme = 'default' 
WHERE theme IS NULL; 