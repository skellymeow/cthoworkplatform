'use server'

import { createClient } from "@/lib/supabase/server"
import { headers } from "next/headers"
import { cookies } from "next/headers"

export async function trackPageView(profileId: string) {
  try {
    const supabase = await createClient()
    const headersList = await headers()
    const cookieStore = await cookies()
    
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
      return { success: true, skipped: 'bot' }
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
      return { success: true, skipped: 'recent_view' }
    }
    
    // check session cookie to prevent multiple views per session
    const sessionKey = `viewed_${profileId}`
    const hasViewed = cookieStore.get(sessionKey)
    
    if (hasViewed) {
      return { success: true, skipped: 'session_view' }
    }
    
    // insert page view
    const { error: insertError } = await supabase
      .from('page_views')
      .insert({
        profile_id: profileId,
        ip_address: cleanIp,
        user_agent: userAgent,
        referrer: referrer
      })
    
    if (insertError) {
      // Don't expose error details to client
      return { success: false, error: 'Internal server error' }
    }
    
    return { success: true, tracked: true }
  } catch {
    // Don't expose error details to client
    return { success: false, error: 'Internal server error' }
  }
} 