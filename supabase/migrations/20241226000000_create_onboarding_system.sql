-- Create onboarding progress table
CREATE TABLE IF NOT EXISTS onboarding_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  username_claimed BOOLEAN DEFAULT false,
  bio_site_visited BOOLEAN DEFAULT false,
  social_link_added BOOLEAN DEFAULT false,
  bio_site_published BOOLEAN DEFAULT false,
  content_locked BOOLEAN DEFAULT false,
  locker_embedded BOOLEAN DEFAULT false,
  user_invited BOOLEAN DEFAULT false,
  discord_joined BOOLEAN DEFAULT false,
  onboarding_completed BOOLEAN DEFAULT false,
  onboarding_dismissed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for fast user lookups
CREATE INDEX IF NOT EXISTS idx_onboarding_progress_user_id ON onboarding_progress(user_id);

-- Create RLS policies
ALTER TABLE onboarding_progress ENABLE ROW LEVEL SECURITY;

-- Users can only see their own onboarding progress
CREATE POLICY "Users can view own onboarding progress" ON onboarding_progress
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own onboarding progress
CREATE POLICY "Users can insert own onboarding progress" ON onboarding_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own onboarding progress
CREATE POLICY "Users can update own onboarding progress" ON onboarding_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_onboarding_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_onboarding_progress_updated_at
  BEFORE UPDATE ON onboarding_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_onboarding_updated_at();

-- Function to automatically create onboarding progress for new users
CREATE OR REPLACE FUNCTION create_onboarding_progress()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO onboarding_progress (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to create onboarding progress when user signs up
CREATE TRIGGER create_onboarding_progress_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_onboarding_progress(); 