-- Affiliate System Tables

-- Affiliate profiles table
CREATE TABLE IF NOT EXISTS affiliate_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  username VARCHAR(64) UNIQUE NOT NULL, -- same as bio site username
  has_agreed_to_terms BOOLEAN DEFAULT false,
  total_referrals INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Referral tracking
CREATE TABLE IF NOT EXISTS referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  referred_email VARCHAR(255),
  referred_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status VARCHAR(20) DEFAULT 'pending', -- pending, signed_up, converted
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_affiliate_profiles_user_id ON affiliate_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_profiles_username ON affiliate_profiles(username);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer_id ON referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referred_user_id ON referrals(referred_user_id);

-- RLS
ALTER TABLE affiliate_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- Users can only see their own affiliate profile
CREATE POLICY "Users can view own affiliate profile" ON affiliate_profiles
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own affiliate profile
CREATE POLICY "Users can insert own affiliate profile" ON affiliate_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own affiliate profile
CREATE POLICY "Users can update own affiliate profile" ON affiliate_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own affiliate profile
CREATE POLICY "Users can delete own affiliate profile" ON affiliate_profiles
  FOR DELETE USING (auth.uid() = user_id);

-- Public can view affiliate profiles by username
CREATE POLICY "Public can view affiliate profiles" ON affiliate_profiles
  FOR SELECT USING (true);

-- Users can view their own referrals
CREATE POLICY "Users can view own referrals" ON referrals
  FOR SELECT USING (auth.uid() = referrer_id);

-- Users can insert referrals
CREATE POLICY "Users can insert referrals" ON referrals
  FOR INSERT WITH CHECK (auth.uid() = referrer_id);

-- Users can update their own referrals
CREATE POLICY "Users can update own referrals" ON referrals
  FOR UPDATE USING (auth.uid() = referrer_id);

-- updated_at trigger for affiliate_profiles
CREATE OR REPLACE FUNCTION update_affiliate_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_affiliate_profiles_updated_at
  BEFORE UPDATE ON affiliate_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_affiliate_profiles_updated_at(); 