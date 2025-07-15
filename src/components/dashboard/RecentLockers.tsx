'use client'

import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import { Eye, Settings, Trash2 } from "lucide-react"
import Link from "next/link"

export interface Locker {
  id: string
  name: string
  slug: string
  created_at: string
  is_active: boolean
}

interface RecentLockersProps {
  lockers: Locker[]
  onDelete: (id: string) => void
  onToggleActive: (id: string, is_active: boolean) => void
}

export default function RecentLockers({ lockers, onDelete, onToggleActive }: RecentLockersProps) {
  if (lockers.length === 0) {
    return (
      <motion.div 
        className="text-center py-8"
        {...animations.fadeInUpDelayed(0.2)}
      >
        <p className="text-gray-400">No content lockers yet</p>
        <p className="text-gray-500 text-sm mt-2">Create your first content locker to get started</p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-4">
      {lockers.map((locker) => (
        <motion.div
          key={locker.id}
          className="bg-zinc-900 border border-zinc-800 rounded-lg p-4"
          {...animations.fadeInUpDelayed(0.2)}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">{locker.name}</h3>
                <p className="text-gray-400 text-sm">@{locker.slug}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleActive(locker.id, !locker.is_active)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  locker.is_active 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-gray-600 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {locker.is_active ? 'Active' : 'Inactive'}
              </button>
              <Link
                href={`/dashboard/content-lockers/${locker.id}`}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <Settings className="w-4 h-4" />
              </Link>
              <button
                onClick={() => onDelete(locker.id)}
                className="p-2 text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
} 