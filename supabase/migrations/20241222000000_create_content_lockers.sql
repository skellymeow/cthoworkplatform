-- Content Lockers Table
CREATE TABLE IF NOT EXISTS content_lockers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  slug VARCHAR(12) UNIQUE NOT NULL CHECK (length(slug) >= 6 AND length(slug) <= 12),
  name VARCHAR(64) NOT NULL,
  note TEXT,
  locked_url TEXT NOT NULL,
  offer1_url TEXT NOT NULL,
  offer2_url TEXT,
  offer3_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_content_lockers_user_id ON content_lockers(user_id);
CREATE INDEX IF NOT EXISTS idx_content_lockers_slug ON content_lockers(slug);

-- RLS
ALTER TABLE content_lockers ENABLE ROW LEVEL SECURITY;

-- Users can only see their own lockers
CREATE POLICY "Users can view own lockers" ON content_lockers
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own lockers, max 50 per user
CREATE POLICY "Users can insert own lockers" ON content_lockers
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND
    (SELECT count(*) FROM content_lockers WHERE user_id = auth.uid()) < 50
  );

-- Users can update their own lockers
CREATE POLICY "Users can update own lockers" ON content_lockers
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own lockers
CREATE POLICY "Users can delete own lockers" ON content_lockers
  FOR DELETE USING (auth.uid() = user_id);

-- Public can view active lockers by slug
CREATE POLICY "Public can view active lockers" ON content_lockers
  FOR SELECT USING (is_active = true);

-- updated_at trigger
CREATE OR REPLACE FUNCTION update_content_lockers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_content_lockers_updated_at
  BEFORE UPDATE ON content_lockers
  FOR EACH ROW
  EXECUTE FUNCTION update_content_lockers_updated_at(); 