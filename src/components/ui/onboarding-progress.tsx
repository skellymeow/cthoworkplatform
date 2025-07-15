'use client'

import { motion } from "framer-motion"
import { Sparkles, CheckCircle } from "lucide-react"
import { useOnboarding } from "@/lib/hooks/useOnboarding"
import { User } from "@supabase/supabase-js"

interface OnboardingProgressProps {
  user: User | null
  showModal: () => void
  className?: string
}

export default function OnboardingProgress({ user, showModal, className = "" }: OnboardingProgressProps) {
  const { progress, getCompletedSteps, getTotalSteps, getProgressPercentage, shouldShowOnboarding } = useOnboarding(user)

  if (!shouldShowOnboarding()) {
    return null
  }

  const completedSteps = getCompletedSteps()
  const totalSteps = getTotalSteps()
  const progressPercentage = getProgressPercentage()

  return (
    <motion.div
      className={`bg-zinc-900 border border-zinc-800 rounded-none p-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-600 rounded-none flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Onboarding Progress</h3>
            <p className="text-xs text-gray-400">{completedSteps}/{totalSteps} steps completed</p>
          </div>
        </div>
        <button
          onClick={showModal}
          className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
        >
          View Details
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400">Progress</span>
          <span className="text-gray-300">{Math.round(progressPercentage)}%</span>
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

      {completedSteps > 0 && (
        <div className="flex items-center gap-1 mt-3 text-xs text-green-400">
          <CheckCircle className="w-3 h-3" />
          <span>Great progress! Keep going!</span>
        </div>
      )}
    </motion.div>
  )
} 