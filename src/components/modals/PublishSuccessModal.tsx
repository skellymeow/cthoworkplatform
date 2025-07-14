'use client'

import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import { Globe } from "lucide-react"

interface PublishSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  profileSlug: string
}

export default function PublishSuccessModal({ isOpen, onClose, profileSlug }: PublishSuccessModalProps) {
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
          <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Published Successfully!</h3>
            <p className="text-gray-400">Your website is now live</p>
          </div>
        </div>
        
        <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-green-300">Live URL</span>
          </div>
          <a 
            href={`/u/${profileSlug}`}
            target="_blank"
            className="text-sm text-green-400 hover:text-green-300 break-all"
          >
            {window.location.origin}/u/{profileSlug}
          </a>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-zinc-800 text-white px-4 py-2 rounded font-semibold hover:bg-zinc-700 transition-colors"
          >
            Close
          </button>
          <a
            href={`/u/${profileSlug}`}
            target="_blank"
            className="flex-1 bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700 transition-colors text-center"
          >
            View Live Site
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
} 