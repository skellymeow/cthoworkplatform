'use client'

import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import { ExternalLink, Eye } from "lucide-react"
import Link from "next/link"
import ViewCountBadge from "@/components/ui/view-count-badge"

interface RecentLockersProps {
  recentLockers: any[]
  recentLockerViews: { [slug: string]: number }
}

export default function RecentLockers({ recentLockers, recentLockerViews }: RecentLockersProps) {
  if (recentLockers.length === 0) {
    return (
      <motion.div 
        className="bg-black border border-zinc-800 p-6 rounded-lg"
        {...animations.fadeInUpDelayed(0.7)}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
            <Eye className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Recent Content Lockers</h3>
            <p className="text-sm text-gray-400">Your most recent content lockers</p>
          </div>
        </div>
        <div className="text-center py-8 text-gray-400">
          <p className="text-sm">No content lockers created yet</p>
          <p className="text-xs mt-1">Create your first content locker to get started</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className="bg-black border border-zinc-800 p-6 rounded-lg"
      {...animations.fadeInUpDelayed(0.7)}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
          <Eye className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Recent Content Lockers</h3>
          <p className="text-sm text-gray-400">Your most recent content lockers</p>
        </div>
      </div>
      
      <div className="space-y-3">
        {recentLockers.map((locker) => (
          <div key={locker.id} className="flex items-center justify-between p-3 bg-zinc-900 border border-zinc-800 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-green-600/20 flex items-center justify-center">
                <Eye className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{locker.name}</p>
                <p className="text-xs text-gray-400">/{locker.slug}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ViewCountBadge count={recentLockerViews[locker.slug] || 0} />
              <Link
                href={`/${locker.slug}`}
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
} 