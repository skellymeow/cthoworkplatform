-- Create page views table for tracking profile visits
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES link_bio_profiles(id) ON DELETE CASCADE NOT NULL,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT,
  referrer TEXT
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_page_views_profile_id ON page_views(profile_id);
CREATE INDEX IF NOT EXISTS idx_page_views_viewed_at ON page_views(viewed_at);
CREATE INDEX IF NOT EXISTS idx_page_views_profile_date ON page_views(profile_id, viewed_at);

-- Create RLS policies
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Users can view page views for their own profiles
CREATE POLICY "Users can view own profile page views" ON page_views
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM link_bio_profiles 
      WHERE id = page_views.profile_id 
      AND user_id = auth.uid()
    )
  );

-- Anyone can insert page views (for tracking)
CREATE POLICY "Anyone can insert page views" ON page_views
  FOR INSERT WITH CHECK (true);

-- Users can delete page views for their own profiles
CREATE POLICY "Users can delete own profile page views" ON page_views
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM link_bio_profiles 
      WHERE id = page_views.profile_id 
      AND user_id = auth.uid()
    )
  );

-- Function to get client IP address
CREATE OR REPLACE FUNCTION get_client_ip()
RETURNS INET AS $$
BEGIN
  RETURN inet_client_addr();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 