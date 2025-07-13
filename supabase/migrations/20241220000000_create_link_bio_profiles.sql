-- Create link-in-bio profiles table
CREATE TABLE IF NOT EXISTS link_bio_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  slug VARCHAR(16) UNIQUE NOT NULL CHECK (length(slug) >= 2 AND length(slug) <= 16),
  title VARCHAR(100),
  description TEXT,
  avatar_url TEXT,
  theme VARCHAR(50) DEFAULT 'default',
  is_live BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for fast slug lookups
CREATE INDEX IF NOT EXISTS idx_link_bio_profiles_slug ON link_bio_profiles(slug);
CREATE INDEX IF NOT EXISTS idx_link_bio_profiles_user_id ON link_bio_profiles(user_id);

-- Create RLS policies
ALTER TABLE link_bio_profiles ENABLE ROW LEVEL SECURITY;

-- Users can only see their own profiles
CREATE POLICY "Users can view own profiles" ON link_bio_profiles
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own profiles
CREATE POLICY "Users can insert own profiles" ON link_bio_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own profiles
CREATE POLICY "Users can update own profiles" ON link_bio_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own profiles
CREATE POLICY "Users can delete own profiles" ON link_bio_profiles
  FOR DELETE USING (auth.uid() = user_id);

-- Public read access for live profiles (for the @username pages)
CREATE POLICY "Public can view live profiles" ON link_bio_profiles
  FOR SELECT USING (is_live = true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_link_bio_profiles_updated_at
  BEFORE UPDATE ON link_bio_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 