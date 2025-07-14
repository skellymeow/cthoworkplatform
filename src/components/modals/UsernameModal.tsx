'use client'

import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import { User as UserIcon, X, Check, AlertTriangle } from "lucide-react"

interface UsernameModalProps {
  isOpen: boolean
  onClose: () => void
  newUsername: string
  setNewUsername: (username: string) => void
  claiming: boolean
  onClaim: () => void
  usernameAvailable: boolean | null
  checkingAvailability: boolean
}

export default function UsernameModal({ 
  isOpen, 
  onClose, 
  newUsername, 
  setNewUsername, 
  claiming, 
  onClaim, 
  usernameAvailable, 
  checkingAvailability 
}: UsernameModalProps) {
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
          <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
            <UserIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Claim Your Username</h3>
            <p className="text-gray-400">Choose a unique username for your profile</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
            <div className="relative">
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="your-username"
                className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {checkingAvailability ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500"></div>
                ) : usernameAvailable === true ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : usernameAvailable === false ? (
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                ) : null}
              </div>
            </div>
            {usernameAvailable === false && (
              <p className="text-red-400 text-sm mt-1">Username is already taken</p>
            )}
            {usernameAvailable === true && (
              <p className="text-green-400 text-sm mt-1">Username is available!</p>
            )}
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-zinc-800 text-white px-4 py-2 rounded font-semibold hover:bg-zinc-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClaim}
            disabled={claiming || usernameAvailable !== true}
            className="flex-1 bg-purple-600 text-white px-4 py-2 rounded font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {claiming ? 'Claiming...' : 'Claim Username'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
} 