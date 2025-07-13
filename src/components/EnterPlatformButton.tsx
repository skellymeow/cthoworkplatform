'use client'

import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import { User, SquareStack } from "lucide-react"
import Link from "next/link"

interface EnterPlatformButtonProps {
  user: any
  className?: string
}

export default function EnterPlatformButton({ user, className = "" }: EnterPlatformButtonProps) {
  return (
    <motion.div
      className={`flex flex-col items-center gap-4 ${className}`}
      {...animations.fadeInUpDelayed(0.3)}
    >
      <motion.div
        className="text-center mb-4"
        {...animations.fadeInUpDelayed(0.1)}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Welcome back!
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          Ready to manage your Roblox community?
        </p>
      </motion.div>

      <motion.div
        className="w-full max-w-sm"
        {...animations.fadeInUpDelayed(0.2)}
      >
        <Link href="/dashboard">
          <motion.button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-3 shadow-lg hover:shadow-purple-500/25"
            {...animations.buttonHover}
          >
            {/* Avatar */}
            <div className="flex items-center gap-3">
              {user?.user_metadata?.avatar_url ? (
                <img 
                  src={user.user_metadata.avatar_url} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full border-2 border-white/20"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
              
              {/* Text */}
              <span className="text-base sm:text-lg">
                Enter Platform
              </span>
              
              {/* Squares Icon */}
              <SquareStack className="w-5 h-5" />
            </div>
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  )
} 