'use client'

import { motion } from "framer-motion"
import { Mail } from "lucide-react"

interface DisableNewsletterModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function DisableNewsletterModal({ isOpen, onClose, onConfirm }: DisableNewsletterModalProps) {
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
          <div className="w-12 h-12 rounded-full bg-yellow-600 flex items-center justify-center">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Disable Newsletter?</h3>
            <p className="text-gray-400">This will remove the newsletter form from your page</p>
          </div>
        </div>
        
        <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-300">Warning</span>
          </div>
          <p className="text-sm text-yellow-300">
            Existing subscribers will remain in your list, but new visitors won&apos;t be able to subscribe.
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
            className="flex-1 bg-yellow-600 text-white px-4 py-2 rounded font-semibold hover:bg-yellow-700 transition-colors"
          >
            Disable Newsletter
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
} 