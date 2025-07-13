import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const { profileId } = await request.json()
    const supabase = await createClient()
    const headersList = await headers()
    
    // get client ip and user agent
    const ip = headersList.get('x-forwarded-for') || 
               headersList.get('x-real-ip') || 
               'unknown'
    const userAgent = headersList.get('user-agent') || 'unknown'
    const referrer = headersList.get('referer') || null
    
    // clean ip address (take first one if multiple)
    const cleanIp = ip.split(',')[0].trim()
    
    // basic bot filtering
    const isBot = userAgent.toLowerCase().includes('bot') || 
                  userAgent.toLowerCase().includes('crawler') ||
                  userAgent.toLowerCase().includes('spider')
    
    if (isBot) {
      return NextResponse.json({ success: true, skipped: 'bot' })
    }
    
    // check for recent view from same IP (within 30 minutes)
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString()
    
    const { data: recentViews } = await supabase
      .from('page_views')
      .select('id')
      .eq('profile_id', profileId)
      .eq('ip_address', cleanIp)
      .gte('viewed_at', thirtyMinutesAgo)
      .limit(1)
    
    if (recentViews && recentViews.length > 0) {
      return NextResponse.json({ success: true, skipped: 'recent_view' })
    }
    
    // insert page view
    const { error } = await supabase
      .from('page_views')
      .insert({
        profile_id: profileId,
        ip_address: cleanIp,
        user_agent: userAgent,
        referrer: referrer
      })
    
    if (error) {
      console.error('Error tracking page view:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ success: true, tracked: true })
  } catch (error) {
    console.error('Error tracking page view:', error)
    return NextResponse.json({ success: false, error: 'unknown' }, { status: 500 })
  }
} 