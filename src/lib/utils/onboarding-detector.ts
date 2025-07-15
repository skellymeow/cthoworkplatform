import { createClient } from '@/lib/supabase/client'

export interface OnboardingStatus {
  username_claimed: boolean
  bio_site_visited: boolean
  social_link_added: boolean
  bio_site_published: boolean
  content_locked: boolean
  locker_embedded: boolean
  user_invited: boolean
  discord_joined: boolean
}

export async function detectOnboardingStatus(userId: string): Promise<OnboardingStatus> {
  const supabase = createClient()
  
  // Check username claimed
  const { data: profile } = await supabase
    .from('link_bio_profiles')
    .select('slug')
    .eq('user_id', userId)
    .single()
  
  const username_claimed = !!profile?.slug

  // Check bio site visited (we'll track this via page views or just assume if they have a profile)
  const bio_site_visited = !!profile

  // Check social links added
  const { data: socials } = await supabase
    .from('link_bio_socials')
    .select('id')
    .eq('user_id', userId)
  
  const social_link_added = (socials?.length || 0) > 0

  // Check bio site published
  const { data: publishedProfile } = await supabase
    .from('link_bio_profiles')
    .select('is_live')
    .eq('user_id', userId)
    .single()
  
  const bio_site_published = publishedProfile?.is_live || false

  // Check content locked (has content lockers)
  const { data: lockers } = await supabase
    .from('content_lockers')
    .select('id')
    .eq('user_id', userId)
  
  const content_locked = (lockers?.length || 0) > 0

  // Check locker embedded (if they have lockers and published profile, assume embedded)
  const locker_embedded = content_locked && bio_site_published

  // Check user invited (affiliate system)
  const { data: affiliateProfile } = await supabase
    .from('affiliate_profiles')
    .select('referrals_count')
    .eq('user_id', userId)
    .single()
  
  const user_invited = (affiliateProfile?.referrals_count || 0) > 0

  // Discord joined - we can't detect this server-side, so we'll track via a separate table
  // For now, we'll assume false and let users manually mark as completed
  const discord_joined = false

  return {
    username_claimed,
    bio_site_visited,
    social_link_added,
    bio_site_published,
    content_locked,
    locker_embedded,
    user_invited,
    discord_joined
  }
}

export async function syncOnboardingProgress(userId: string): Promise<void> {
  const supabase = createClient()
  
  const status = await detectOnboardingStatus(userId)
  
  // Update onboarding progress with detected status
  await supabase
    .from('onboarding_progress')
    .upsert({
      user_id: userId,
      ...status,
      updated_at: new Date().toISOString()
    })
} 