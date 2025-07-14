'use client'

import { motion, AnimatePresence } from "framer-motion"
import { animations } from "@/lib/animations"
import { useState } from "react"
import { ChevronDown, LogOut, Users, User as UserIcon } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/hooks/useAuth"

export default function UserDropdown() {
  const { user, signOut } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)

  if (!user) return null

  return (
    <motion.div 
      className="relative"
      data-dropdown
      {...animations.fadeInUpDelayed(0.2)}
    >
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 bg-zinc-900/50 border border-zinc-700 rounded-[3px] px-3 py-1.5 hover:bg-zinc-800/50 transition-colors"
      >
        {user.user_metadata?.avatar_url ? (
          <img 
            src={user.user_metadata.avatar_url} 
            alt="Profile" 
            className="w-6 h-6 rounded-full border border-zinc-600"
          />
        ) : (
          <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center border border-zinc-600">
            <UserIcon className="w-3 h-3 text-white" />
          </div>
        )}
        <div className="text-left">
          <div className="text-xs font-medium text-white">
            {user.user_metadata?.full_name || user.email?.split('@')[0]}
          </div>
          <div className="text-xs text-gray-400">
            {user.email}
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div 
            className="absolute right-0 top-full mt-2 w-80 bg-zinc-900 border border-zinc-700 rounded-[3px] shadow-xl z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="p-4 border-b border-zinc-700">
              <div className="flex items-center gap-3">
                {user.user_metadata?.avatar_url ? (
                  <img 
                    src={user.user_metadata.avatar_url} 
                    alt="Profile" 
                    className="w-12 h-12 rounded-full border border-zinc-600"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center border border-zinc-600">
                    <UserIcon className="w-6 h-6 text-white" />
                  </div>
                )}
                <div>
                  <div className="font-medium text-white">
                    {user.user_metadata?.full_name || user.email?.split('@')[0]}
                  </div>
                  <div className="text-sm text-gray-400">
                    {user.email}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {user.app_metadata?.provider || 'unknown'} • ID: {user.id.slice(0, 8)}...
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-2">
              <Link
                href="/affiliates"
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-purple-400 hover:bg-purple-500/10 rounded-[3px] transition-colors"
              >
                <Users className="w-4 h-4" />
                Refer a Friend
              </Link>
              <button
                onClick={signOut}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-[3px] transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
} 