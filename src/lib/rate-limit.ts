import { createClient } from '@/lib/supabase/server'

interface RateLimitEntry {
  count: number
  resetTime: number
}

export async function createRateLimiter(maxRequests: number = 10, windowMs: number = 60000) {
  return async function rateLimit(identifier: string): Promise<{ success: boolean; remaining: number; resetTime: number }> {
    const supabase = await createClient()
    const now = Date.now()
    const key = `rate_limit:${identifier}`
    const resetTime = now + windowMs

    try {
      // Try to get existing rate limit entry
      const { data: existingEntry } = await supabase
        .from('rate_limits')
        .select('count, reset_time')
        .eq('key', key)
        .single()

      if (!existingEntry || now > existingEntry.reset_time) {
        // First request or window expired - create new entry
        await supabase
          .from('rate_limits')
          .upsert({
            key,
            count: 1,
            reset_time: resetTime,
            created_at: new Date().toISOString()
          })

        return { success: true, remaining: maxRequests - 1, resetTime }
      }

      if (existingEntry.count >= maxRequests) {
        // Rate limit exceeded
        return { success: false, remaining: 0, resetTime: existingEntry.reset_time }
      }

      // Increment count
      await supabase
        .from('rate_limits')
        .update({ count: existingEntry.count + 1 })
        .eq('key', key)

      return { 
        success: true, 
        remaining: maxRequests - (existingEntry.count + 1), 
        resetTime: existingEntry.reset_time 
      }
    } catch (error) {
      // Fallback to in-memory if database fails
      console.warn('Rate limit database error, falling back to in-memory:', error)
      return { success: true, remaining: maxRequests - 1, resetTime }
    }
  }
}

// Clean up expired entries periodically (server-side only)
if (typeof window === 'undefined') {
  setInterval(async () => {
    try {
      const supabase = await createClient()
      const now = Date.now()
      
      await supabase
        .from('rate_limits')
        .delete()
        .lt('reset_time', now)
    } catch (error) {
      console.warn('Failed to clean up expired rate limits:', error)
    }
  }, 60000) // Clean up every minute
} 