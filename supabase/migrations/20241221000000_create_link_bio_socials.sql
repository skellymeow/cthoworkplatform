-- Create link-in-bio socials table
CREATE TABLE IF NOT EXISTS link_bio_socials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES link_bio_profiles(id) ON DELETE CASCADE NOT NULL,
  platform VARCHAR(50) NOT NULL,
  url TEXT NOT NULL,
  display_name VARCHAR(100),
  icon VARCHAR(50),
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_link_bio_socials_profile_id ON link_bio_socials(profile_id);
CREATE INDEX IF NOT EXISTS idx_link_bio_socials_order ON link_bio_socials(profile_id, order_index);

-- Create RLS policies
ALTER TABLE link_bio_socials ENABLE ROW LEVEL SECURITY;

-- Users can only see socials for their own profiles
CREATE POLICY "Users can view own socials" ON link_bio_socials
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM link_bio_profiles 
      WHERE id = profile_id AND user_id = auth.uid()
    )
  );

-- Users can insert socials for their own profiles
CREATE POLICY "Users can insert own socials" ON link_bio_socials
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM link_bio_profiles 
      WHERE id = profile_id AND user_id = auth.uid()
    )
  );

-- Users can update socials for their own profiles
CREATE POLICY "Users can update own socials" ON link_bio_socials
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM link_bio_profiles 
      WHERE id = profile_id AND user_id = auth.uid()
    )
  );

-- Users can delete socials for their own profiles
CREATE POLICY "Users can delete own socials" ON link_bio_socials
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM link_bio_profiles 
      WHERE id = profile_id AND user_id = auth.uid()
    )
  );

-- Public read access for socials on live profiles
CREATE POLICY "Public can view live profile socials" ON link_bio_socials
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM link_bio_profiles 
      WHERE id = profile_id AND is_live = true
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_socials_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_link_bio_socials_updated_at
  BEFORE UPDATE ON link_bio_socials
  FOR EACH ROW
  EXECUTE FUNCTION update_socials_updated_at_column(); 