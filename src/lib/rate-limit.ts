// Simple in-memory rate limiting
interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

export function createRateLimiter(maxRequests: number = 10, windowMs: number = 60000) {
  return function rateLimit(identifier: string): { success: boolean; remaining: number; resetTime: number } {
    const now = Date.now()
    const key = identifier
    const entry = rateLimitStore.get(key)

    if (!entry || now > entry.resetTime) {
      // First request or window expired
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + windowMs
      })
      return { success: true, remaining: maxRequests - 1, resetTime: now + windowMs }
    }

    if (entry.count >= maxRequests) {
      // Rate limit exceeded
      return { success: false, remaining: 0, resetTime: entry.resetTime }
    }

    // Increment count
    entry.count++
    rateLimitStore.set(key, entry)
    return { success: true, remaining: maxRequests - entry.count, resetTime: entry.resetTime }
  }
}

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}, 60000) // Clean up every minute 