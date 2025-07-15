import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'

interface OnboardingProgress {
  id: string
  user_id: string
  username_claimed: boolean
  bio_site_visited: boolean
  social_link_added: boolean
  bio_site_published: boolean
  content_locked: boolean
  locker_embedded: boolean
  user_invited: boolean
  discord_joined: boolean
  onboarding_completed: boolean
  onboarding_dismissed: boolean
  created_at: string
  updated_at: string
}

export function useOnboarding(user: User | null) {
  const supabase = createClient()
  const [progress, setProgress] = useState<OnboardingProgress | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setProgress(null)
      setLoading(false)
      return
    }

    const fetchProgress = async () => {
      if (!user) return
      
      try {
        const { data, error } = await supabase
          .from('onboarding_progress')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (error) {
          if (process.env.NODE_ENV === 'development') {
            console.error('Error fetching onboarding progress:', error)
          }
          return
        }

        setProgress(data || { user_id: user.id, current_step: 1, completed: false })
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error fetching onboarding progress:', error)
        }
      }
    }

    fetchProgress()
  }, [user])

  const updateStep = async (step: number) => {
    if (!user) return
    
    try {
      const { error } = await supabase
        .from('onboarding_progress')
        .update({ current_step: step })
        .eq('user_id', user.id)

      if (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error updating onboarding step:', error)
        }
        return
      }

      setProgress(prev => prev ? { ...prev, current_step: step } : null)
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error updating onboarding step:', error)
      }
    }
  }

  const shouldShowOnboarding = () => {
    return progress && !progress.onboarding_completed && !progress.onboarding_dismissed
  }

  const getCompletedSteps = () => {
    if (!progress) return 0
    return [
      progress.username_claimed,
      progress.bio_site_visited,
      progress.social_link_added,
      progress.bio_site_published,
      progress.content_locked,
      progress.locker_embedded,
      progress.user_invited,
      progress.discord_joined
    ].filter(Boolean).length
  }

  const getTotalSteps = () => 8

  const getProgressPercentage = () => {
    return (getCompletedSteps() / getTotalSteps()) * 100
  }

  return {
    progress,
    loading,
    updateStep,
    shouldShowOnboarding,
    getCompletedSteps,
    getTotalSteps,
    getProgressPercentage
  }
} 