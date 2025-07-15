-- Add locker_id support to page_views table
ALTER TABLE page_views ADD COLUMN IF NOT EXISTS locker_id UUID REFERENCES content_lockers(id) ON DELETE CASCADE;

-- Make profile_id nullable since we now support both profiles and lockers
ALTER TABLE page_views ALTER COLUMN profile_id DROP NOT NULL;

-- Add constraint to ensure either profile_id or locker_id is set
ALTER TABLE page_views ADD CONSTRAINT check_profile_or_locker 
  CHECK ((profile_id IS NOT NULL AND locker_id IS NULL) OR (profile_id IS NULL AND locker_id IS NOT NULL));

-- Create index for locker views
CREATE INDEX IF NOT EXISTS idx_page_views_locker_id ON page_views(locker_id);
CREATE INDEX IF NOT EXISTS idx_page_views_locker_date ON page_views(locker_id, viewed_at);

-- Update RLS policies to include locker views
DROP POLICY IF EXISTS "Users can view own profile page views" ON page_views;
CREATE POLICY "Users can view own page views" ON page_views
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM link_bio_profiles 
      WHERE id = page_views.profile_id 
      AND user_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM content_lockers 
      WHERE id = page_views.locker_id 
      AND user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can delete own profile page views" ON page_views;
CREATE POLICY "Users can delete own page views" ON page_views
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM link_bio_profiles 
      WHERE id = page_views.profile_id 
      AND user_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM content_lockers 
      WHERE id = page_views.locker_id 
      AND user_id = auth.uid()
    )
  ); 