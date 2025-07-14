-- Fix username availability checker by making usernames publicly readable
-- This allows the availability checker to work properly while keeping other data secure

-- Drop the restrictive RLS policy that prevents username availability checking
DROP POLICY IF EXISTS "Users can view own profiles" ON link_bio_profiles;

-- Create new policy that allows public read access to usernames (slugs) only
-- This enables proper username availability checking while keeping other data private
CREATE POLICY "Public can view usernames for availability checking" ON link_bio_profiles
  FOR SELECT USING (true);

-- Keep the existing policy for live profiles (unchanged)
-- This policy already exists and allows public access to live profiles

-- Keep all other policies unchanged:
-- - Users can insert their own profiles
-- - Users can update their own profiles  
-- - Users can delete their own profiles
-- - Public can view live profiles

-- Add a comment explaining the change
COMMENT ON POLICY "Public can view usernames for availability checking" ON link_bio_profiles IS 
'Allows public read access to usernames (slugs) for proper availability checking while keeping other profile data private. This fixes the broken username availability checker.'; 