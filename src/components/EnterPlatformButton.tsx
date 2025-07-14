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
      className={`${className}`}
      {...animations.fadeInUpDelayed(0.3)}
    >
      <Link href="/dashboard">
        <motion.button
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-3 shadow-lg hover:shadow-purple-500/25"
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
            <span className="text-lg">
              Enter Platform
            </span>
            
            {/* Squares Icon */}
            <SquareStack className="w-5 h-5" />
          </div>
        </motion.button>
      </Link>
    </motion.div>
  )
} 