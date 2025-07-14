'use client'

import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import { Trash2, AlertTriangle } from "lucide-react"

interface DeleteProfileModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  profileSlug?: string
}

export default function DeleteProfileModal({ isOpen, onClose, onConfirm, profileSlug }: DeleteProfileModalProps) {
  if (!isOpen) return null

  return (
    <motion.div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg max-w-md w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
            <Trash2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Delete Profile</h3>
            <p className="text-gray-400">This action cannot be undone</p>
          </div>
        </div>
        
        <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-sm font-medium text-red-300">Warning</span>
          </div>
          <p className="text-sm text-red-300">
            This will permanently delete your profile @{profileSlug} and all associated data including social links, analytics, and newsletter subscribers.
          </p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-zinc-800 text-white px-4 py-2 rounded font-semibold hover:bg-zinc-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700 transition-colors"
          >
            Delete Profile
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
} 