'use client'

import { useEffect } from 'react'

interface PageViewTrackerProps {
  profileId: string
}

export default function PageViewTracker({ profileId }: PageViewTrackerProps) {
  useEffect(() => {
    const sessionKey = `viewed_${profileId}`
    
    // check if already viewed in this session
    const hasViewed = document.cookie.includes(sessionKey)
    
    if (!hasViewed) {
      // set session cookie (expires when browser closes)
      document.cookie = `${sessionKey}=true; path=/; SameSite=Lax`
      
      // track the view
      fetch('/api/track-page-view', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profileId }),
      }).catch(console.error)
    }
  }, [profileId])

  return null
} 