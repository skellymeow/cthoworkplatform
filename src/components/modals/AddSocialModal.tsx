'use client'

import { motion } from "framer-motion"
import { useState } from "react"
import { Plus, X, ChevronDown, Link as LinkIcon, Globe, Link } from "lucide-react"
import { SOCIAL_PLATFORMS, getSocialIcon } from "@/lib/constants/social-platforms"
import { showToast } from "@/lib/utils"

interface AddSocialModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (social: { platform: string; url: string; display_name: string }) => void
}

export default function AddSocialModal({ isOpen, onClose, onAdd }: AddSocialModalProps) {
  const [showPlatformDropdown, setShowPlatformDropdown] = useState(false)
  const [newSocial, setNewSocial] = useState({
    platform: '',
    url: '',
    display_name: ''
  })

  const handleAdd = () => {
    if (!newSocial.platform || !newSocial.url) {
      showToast.error('Please select a platform and enter a URL')
      return
    }
    onAdd(newSocial)
    setNewSocial({ platform: '', url: '', display_name: '' })
    onClose()
  }

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
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Add Social Link</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Platform</label>
            <div className="relative">
              <button
                onClick={() => setShowPlatformDropdown(!showPlatformDropdown)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white focus:outline-none focus:border-purple-500 flex items-center justify-between"
              >
                                  <div className="flex items-center gap-3">
                    {newSocial.platform ? (
                      <>
                        {getSocialIcon(newSocial.platform).startsWith('/') ? (
                          <img 
                            src={getSocialIcon(newSocial.platform)} 
                            alt={newSocial.platform} 
                            className="w-5 h-5 rounded"
                          />
                        ) : (
                          <div className="w-5 h-5 flex items-center justify-center">
                            {getSocialIcon(newSocial.platform) === 'globe' ? (
                              <Globe className="w-4 h-4" />
                            ) : (
                              <Link className="w-4 h-4" />
                            )}
                          </div>
                        )}
                        <span className="capitalize">{newSocial.platform}</span>
                      </>
                    ) : (
                      <span className="text-gray-400">Select platform</span>
                    )}
                  </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showPlatformDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showPlatformDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl z-10 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800">
                  {SOCIAL_PLATFORMS.map((platform) => (
                    <button
                      key={platform.value}
                      onClick={() => {
                        setNewSocial({ ...newSocial, platform: platform.value })
                        setShowPlatformDropdown(false)
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-white hover:bg-zinc-700 transition-colors"
                    >
                      {platform.icon.startsWith('/') ? (
                        <img 
                          src={platform.icon} 
                          alt={platform.label} 
                          className="w-5 h-5 rounded"
                        />
                      ) : (
                        <div className="w-5 h-5 flex items-center justify-center">
                          {platform.icon === 'globe' ? (
                            <Globe className="w-4 h-4" />
                          ) : (
                            <Link className="w-4 h-4" />
                          )}
                        </div>
                      )}
                      <span>{platform.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">URL</label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={newSocial.url}
                onChange={(e) => setNewSocial({ ...newSocial, url: e.target.value })}
                placeholder="instagram.com/username"
                className="w-full bg-zinc-800 border border-zinc-700 rounded px-10 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Display Name (optional)</label>
            <input
              type="text"
              value={newSocial.display_name}
              onChange={(e) => setNewSocial({ ...newSocial, display_name: e.target.value })}
              placeholder="Custom display name"
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-zinc-800 text-white px-4 py-2 rounded font-semibold hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!newSocial.platform || !newSocial.url}
            className="flex-1 bg-purple-600 text-white px-4 py-2 rounded font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <LinkIcon className="w-4 h-4" />
            Add Link
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
} 