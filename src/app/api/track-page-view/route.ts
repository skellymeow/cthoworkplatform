import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'
import { createRateLimiter } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    const { profileId, lockerId } = await request.json()
    const headersList = await headers()
    
    // Rate limiting by IP address
    const ip = headersList.get('x-forwarded-for') || 
               headersList.get('x-real-ip') || 
               'unknown'
    const cleanIp = ip.split(',')[0].trim()
    
    const rateLimit = await createRateLimiter(5, 60000) // 5 requests per minute per IP
    const rateLimitResult = await rateLimit(cleanIp)
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Rate limited' }, 
        { 
          status: 429,
          headers: {
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString()
          }
        }
      )
    }

    const supabase = await createClient()
    
    // get client ip and user agent
    const userAgent = headersList.get('user-agent') || 'unknown'
    const referrer = headersList.get('referer') || null
    
    // basic bot filtering
    const isBot = userAgent.toLowerCase().includes('bot') || 
                  userAgent.toLowerCase().includes('crawler') ||
                  userAgent.toLowerCase().includes('spider')
    
    if (isBot) {
      return NextResponse.json({ success: true, skipped: 'bot' })
    }
    
    // check for recent view from same IP (within 30 minutes)
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString()
    
    let recentViews
    if (profileId) {
      // Check for profile views
      const { data } = await supabase
        .from('page_views')
        .select('id')
        .eq('profile_id', profileId)
        .eq('ip_address', cleanIp)
        .gte('viewed_at', thirtyMinutesAgo)
        .limit(1)
      recentViews = data
    } else if (lockerId) {
      // Check for locker views
      const { data } = await supabase
        .from('page_views')
        .select('id')
        .eq('locker_id', lockerId)
        .eq('ip_address', cleanIp)
        .gte('viewed_at', thirtyMinutesAgo)
        .limit(1)
      recentViews = data
    }
    
    if (recentViews && recentViews.length > 0) {
      return NextResponse.json({ success: true, skipped: 'recent_view' })
    }
    
    // insert page view
    const viewData: {
      ip_address: string;
      user_agent: string;
      referrer: string | null;
      profile_id?: string;
      locker_id?: string;
    } = {
      ip_address: cleanIp,
      user_agent: userAgent,
      referrer: referrer
    }
    
    if (profileId) {
      viewData.profile_id = profileId
    } else if (lockerId) {
      viewData.locker_id = lockerId
    }
    
    const { error: insertError } = await supabase
      .from('page_views')
      .insert(viewData)
    
    if (insertError) {
      // Don't expose error details to client
      return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
    }
    
    return NextResponse.json({ success: true, tracked: true })
  } catch {
    // Don't expose error details to client
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
} 