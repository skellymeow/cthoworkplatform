'use client'

import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import { User as UserIcon, Edit3, Globe, Trash2, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

interface ProfileSectionProps {
  currentProfile: any
  onToggleLive: () => void
  onDelete: () => void
}

export default function ProfileSection({ currentProfile, onToggleLive, onDelete }: ProfileSectionProps) {
  if (!currentProfile) {
    return (
      <motion.div 
        className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg"
        {...animations.fadeInUpDelayed(0.6)}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
            <UserIcon className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Profile</h3>
            <p className="text-sm text-gray-400">Your link-in-bio profile</p>
          </div>
        </div>
        <div className="text-center py-8 text-gray-400">
          <p className="text-sm">No profile created yet</p>
          <p className="text-xs mt-1">Claim a username to get started</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg"
      {...animations.fadeInUpDelayed(0.6)}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
          <UserIcon className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Profile</h3>
          <p className="text-sm text-gray-400">Your link-in-bio profile</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-zinc-900 border border-zinc-800 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-purple-600/20 flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">@{currentProfile.slug}</p>
              <p className="text-xs text-gray-400">
                {currentProfile.title || 'Untitled Profile'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/website-editor"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Edit3 className="w-4 h-4" />
            </Link>
            <Link
              href={`/u/${currentProfile.slug}`}
              target="_blank"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Globe className="w-4 h-4" />
            </Link>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={onToggleLive}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded text-sm font-medium transition-colors ${
              currentProfile.is_live
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-zinc-700 text-gray-300 hover:bg-zinc-600'
            }`}
          >
            {currentProfile.is_live ? (
              <>
                <Eye className="w-4 h-4" />
                Live
              </>
            ) : (
              <>
                <EyeOff className="w-4 h-4" />
                Draft
              </>
            )}
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-2 text-red-400 hover:text-red-300 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
} 