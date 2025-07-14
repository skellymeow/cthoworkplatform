-- Add newsletter toggle to profiles
ALTER TABLE link_bio_profiles 
ADD COLUMN newsletter_enabled BOOLEAN DEFAULT false;

-- Create newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES link_bio_profiles(id) ON DELETE CASCADE NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  consent_given BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_profile_id ON newsletter_subscribers(profile_id);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);

-- Enable RLS on newsletter_subscribers
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Profile owners can view their subscribers
CREATE POLICY "Profile owners can view subscribers" ON newsletter_subscribers
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM link_bio_profiles 
      WHERE id = newsletter_subscribers.profile_id 
      AND user_id = auth.uid()
    )
  );

-- Anyone can subscribe to live profiles
CREATE POLICY "Anyone can subscribe to live profiles" ON newsletter_subscribers
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM link_bio_profiles 
      WHERE id = newsletter_subscribers.profile_id 
      AND is_live = true
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_newsletter_subscribers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.created_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update created_at
CREATE TRIGGER update_newsletter_subscribers_created_at
  BEFORE INSERT ON newsletter_subscribers
  FOR EACH ROW
  EXECUTE FUNCTION update_newsletter_subscribers_updated_at(); 