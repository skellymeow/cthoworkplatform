import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { referrerUsername, userEmail } = await request.json()
    
    if (!referrerUsername || !userEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = await createClient()

    // Get referrer's affiliate profile
    const { data: affiliateProfile } = await supabase
      .from('affiliate_profiles')
      .select('user_id')
      .eq('username', referrerUsername)
      .single()

    if (!affiliateProfile) {
      return NextResponse.json({ error: 'Invalid referrer' }, { status: 404 })
    }

    // Create referral record
    const { error } = await supabase
      .from('referrals')
      .insert({
        referrer_id: affiliateProfile.user_id,
        referred_email: userEmail,
        status: 'pending'
      })

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error creating referral:', error)
      }
      return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error in track-referral:', error)
    }
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
} 