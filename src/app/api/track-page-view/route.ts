import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'
import { createRateLimiter } from '@/lib/rate-limit'

const rateLimit = createRateLimiter(5, 60000) // 5 requests per minute per IP

export async function POST(request: NextRequest) {
  try {
    const { profileId } = await request.json()
    const headersList = await headers()
    
    // Rate limiting by IP address
    const ip = headersList.get('x-forwarded-for') || 
               headersList.get('x-real-ip') || 
               'unknown'
    const cleanIp = ip.split(',')[0].trim()
    
    const rateLimitResult = rateLimit(cleanIp)
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
      // Don't expose error details to client
      return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
    }
    
    return NextResponse.json({ success: true, tracked: true })
  } catch (error) {
    // Don't expose error details to client
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
} 