'use client'

import { motion, AnimatePresence } from "framer-motion"
import { animations } from "@/lib/animations"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js"
import { 
  X, 
  CheckCircle, 
  Circle, 
  ChevronRight, 
  ChevronLeft,
  User as UserIcon,
  Globe,
  Link as LinkIcon,
  Eye,
  Lock,
  Code,
  Users,
  MessageCircle,
  ExternalLink,
  ArrowRight,
  Sparkles
} from "lucide-react"
import Link from "next/link"
import { showToast } from "@/lib/utils"
import { detectOnboardingStatus, syncOnboardingProgress } from "@/lib/utils/onboarding-detector"

interface OnboardingStep {
  id: string
  title: string
  description: string
  icon: any
  action: string
  href?: string
  external?: boolean
  completed: boolean
  required: boolean
}

interface OnboardingModalProps {
  isOpen: boolean
  onClose: () => void
  user: User | null
  onProgressUpdate: () => void
}

export default function OnboardingModal({ isOpen, onClose, user, onProgressUpdate }: OnboardingModalProps) {
  const supabase = createClient()
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  const steps: OnboardingStep[] = [
    {
      id: 'username_claimed',
      title: 'Claim your username',
      description: 'Choose your unique @username for your bio site',
      icon: UserIcon,
      action: 'Claim Username',
      href: '#',
      completed: false,
      required: true
    },
    {
      id: 'bio_site_visited',
      title: 'Visit the bio site builder',
      description: 'Customize your link-in-bio website',
      icon: Globe,
      action: 'Open Builder',
      href: '/dashboard/website-editor',
      completed: false,
      required: true
    },
    {
      id: 'social_link_added',
      title: 'Add a social media link',
      description: 'Connect your social platforms',
      icon: LinkIcon,
      action: 'Add Social',
      href: '/dashboard/website-editor',
      completed: false,
      required: true
    },
    {
      id: 'bio_site_published',
      title: 'Publish your bio site',
      description: 'Make your site live for the world',
      icon: Eye,
      action: 'Publish Site',
      href: '/dashboard/website-editor',
      completed: false,
      required: true
    },
    {
      id: 'content_locked',
      title: 'Lock your first content piece',
      description: 'Create a content locker with an offer',
      icon: Lock,
      action: 'Create Locker',
      href: '/dashboard/content-lockers',
      completed: false,
      required: true
    },
    {
      id: 'locker_embedded',
      title: 'Embed locker in bio site',
      description: 'Add your content locker to your bio site',
      icon: Code,
      action: 'Embed Locker',
      href: '/dashboard/website-editor',
      completed: false,
      required: true
    },
    {
      id: 'user_invited',
      title: 'Invite a friend to join',
      description: 'Share ctho.work with someone you know',
      icon: Users,
      action: 'Invite Friend',
      href: '/affiliates',
      completed: false,
      required: false
    },
    {
      id: 'discord_joined',
      title: 'Join our Discord server',
      description: 'Connect with the creator community',
      icon: MessageCircle,
      action: 'Join Discord',
      href: 'https://discord.gg/cthowork',
      external: true,
      completed: false,
      required: false
    }
  ]

  useEffect(() => {
    if (isOpen && user) {
      fetchProgress()
    }
  }, [isOpen, user])

  const fetchProgress = async () => {
    if (!user) return

    // First, sync the actual progress from real user actions
    await syncOnboardingProgress(user.id)

    try {
      const { data, error } = await supabase
        .from('onboarding_progress')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching progress:', error)
        return
      }

      if (data) {
        setProgress(data)
        // Update steps with actual progress
        steps.forEach((step, index) => {
          steps[index].completed = data[step.id] || false
        })
      } else {
        // Create progress record if it doesn't exist
        const { data: newProgress } = await supabase
          .from('onboarding_progress')
          .insert({ user_id: user.id })
          .select()
          .single()
        
        if (newProgress) {
          setProgress(newProgress)
        }
      }

      setLoading(false)
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching progress:', error)
      }
      // Continue without progress if it fails
    }
  }

  const updateStep = async (stepId: string, completed: boolean) => {
    if (!user || !progress) return

    setUpdating(true)

    try {
      const { error } = await supabase
        .from('onboarding_progress')
        .update({ [stepId]: completed })
        .eq('user_id', user.id)

      if (error) {
        console.error('Error updating step:', error)
        showToast.error('Failed to update progress')
      } else {
        setProgress({ ...progress, [stepId]: completed })
        onProgressUpdate()
        
        // Check if all required steps are completed
        const requiredSteps = steps.filter(step => step.required)
        const allRequiredCompleted = requiredSteps.every(step => 
          step.id === stepId ? completed : (progress?.[step.id] || false)
        )

        if (allRequiredCompleted) {
          await supabase
            .from('onboarding_progress')
            .update({ onboarding_completed: true })
            .eq('user_id', user.id)
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error updating step:', error)
      }
      // Continue without updating if it fails
    }

    setUpdating(false)
  }

  const handleStepAction = async (step: OnboardingStep) => {
    if (step.external && step.href) {
      window.open(step.href, '_blank')
    } else if (step.href && step.href !== '#') {
      window.location.href = step.href
    }

    // Mark step as completed
    await updateStep(step.id, true)
  }

  const handleDismiss = async () => {
    if (!user) return

    await supabase
      .from('onboarding_progress')
      .update({ onboarding_dismissed: true })
      .eq('user_id', user.id)

    onClose()
  }

  const completedSteps = steps.filter(step => step.completed).length
  const totalSteps = steps.length
  const progressPercentage = (completedSteps / totalSteps) * 100

  if (loading) {
    return null
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-zinc-900 border border-zinc-800 rounded-none shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="border-b border-zinc-800 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-none flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Welcome to ctho.work!</h2>
                    <p className="text-gray-400 text-sm">Complete these steps to unlock your full potential</p>
                  </div>
                </div>
                <button
                  onClick={handleDismiss}
                  className="w-8 h-8 bg-zinc-800 hover:bg-zinc-700 rounded-none flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                  <span>Progress</span>
                  <span>{completedSteps}/{totalSteps} completed</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-none h-2">
                  <motion.div
                    className="bg-purple-600 h-2 rounded-none"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>

            {/* Steps Grid */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {steps.map((step, index) => {
                  const IconComponent = step.icon
                  return (
                    <motion.div
                      key={step.id}
                      className={`border rounded-none p-4 transition-all duration-200 ${
                        step.completed 
                          ? 'border-green-500/50 bg-green-500/5' 
                          : 'border-zinc-800 hover:border-purple-500/50 bg-zinc-900'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-none flex items-center justify-center ${
                          step.completed 
                            ? 'bg-green-600 border border-green-500' 
                            : 'bg-zinc-800 border border-zinc-700'
                        }`}>
                          {step.completed ? (
                            <CheckCircle className="w-4 h-4 text-white" />
                          ) : (
                            <IconComponent className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-white text-sm">{step.title}</h3>
                            {step.required && (
                              <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded">
                                Required
                              </span>
                            )}
                          </div>
                          <p className="text-gray-400 text-xs mb-3">{step.description}</p>
                          
                          {!step.completed && (
                            <button
                              onClick={() => handleStepAction(step)}
                              disabled={updating}
                              className="flex items-center gap-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded-none transition-colors disabled:opacity-50"
                            >
                              {step.external ? (
                                <>
                                  <ExternalLink className="w-3 h-3" />
                                  {step.action}
                                </>
                              ) : (
                                <>
                                  <ArrowRight className="w-3 h-3" />
                                  {step.action}
                                </>
                              )}
                            </button>
                          )}
                          
                          {step.completed && (
                            <div className="flex items-center gap-2 text-green-400 text-xs">
                              <CheckCircle className="w-3 h-3" />
                              Completed
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-zinc-800 p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  {completedSteps === totalSteps ? (
                    <span className="text-green-400">🎉 All steps completed!</span>
                  ) : (
                    <span>{totalSteps - completedSteps} steps remaining</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDismiss}
                    className="px-4 py-2 text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    Dismiss
                  </button>
                  {completedSteps === totalSteps && (
                    <button
                      onClick={onClose}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-none transition-colors"
                    >
                      Get Started
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 