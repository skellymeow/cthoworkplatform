'use client'

import { motion } from "framer-motion"
import { Smartphone, Tablet, Monitor, Globe, ExternalLink, Link } from "lucide-react"
import { getSocialIcon } from "@/lib/constants/social-platforms"

interface SocialLink {
  id: string
  platform: string
  url: string
  display_name: string
  icon: string
  order_index: number
  is_active: boolean
}

interface Profile {
  id: string
  slug: string
  title: string | null
  description: string | null
  avatar_url: string | null
  theme: string
  is_live: boolean
}

interface WebsitePreviewProps {
  profile: Profile
  socials: SocialLink[]
  viewport: 'mobile' | 'tablet' | 'desktop'
  onViewportChange: (viewport: 'mobile' | 'tablet' | 'desktop') => void
  onPublish?: () => void
  hasUnsavedChanges?: boolean
}

export default function WebsitePreview({ profile, socials, viewport, onViewportChange, onPublish, hasUnsavedChanges }: WebsitePreviewProps) {
  return (
    <motion.div 
      className="flex-1 bg-zinc-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      {/* Preview Header */}
      <div className="border-b border-zinc-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-white">Preview</h2>
            <div className="flex items-center gap-1 bg-zinc-800 rounded-lg p-1">
              <button
                onClick={() => onViewportChange('mobile')}
                className={`p-2 rounded ${
                  viewport === 'mobile' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewportChange('tablet')}
                className={`p-2 rounded ${
                  viewport === 'tablet' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewportChange('desktop')}
                className={`p-2 rounded ${
                  viewport === 'desktop' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {profile.is_live && (
              <div className="flex items-center gap-2 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-xs font-medium text-gray-400">
                  Live
                </span>
              </div>
            )}
            {hasUnsavedChanges && (
              <div className="flex items-center gap-2 bg-yellow-600/20 border border-yellow-600/40 rounded-lg px-3 py-2">
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <span className="text-xs font-medium text-yellow-300">
                  Unsaved Changes
                </span>
              </div>
            )}
            {onPublish && (
              <button
                onClick={onPublish}
                className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-purple-700 transition-colors"
              >
                <Globe className="w-4 h-4" />
                Publish
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Preview Frame */}
      <div className="flex-1 p-6">
        <div className={`mx-auto bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300 ${
          viewport === 'mobile' ? 'w-80' : 
          viewport === 'tablet' ? 'w-96' : 
          'w-full max-w-2xl'
        }`}>
          <div className="w-full h-[600px] bg-black text-white overflow-y-auto">
            <div className="min-h-full flex flex-col items-center justify-center px-4">
              <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-md shadow-lg p-8 flex flex-col items-center gap-6">
                {/* Title */}
                {profile.title && (
                  <h1 className="text-2xl font-bold text-white text-center">
                    {profile.title}
                  </h1>
                )}
                
                {/* Username */}
                <h2 className="text-lg text-gray-400 text-center">
                  @{profile.slug}
                </h2>
                
                {/* Description */}
                {profile.description && (
                  <p className="text-gray-300 text-center text-sm leading-relaxed">
                    {profile.description}
                  </p>
                )}
                
                {/* Social Links */}
                {socials.filter(s => s.is_active).length > 0 && (
                  <div className="w-full space-y-3">
                    {socials
                      .filter(s => s.is_active)
                      .map((social) => (
                      <div
                        key={social.id}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          {getSocialIcon(social.platform).startsWith('/') ? (
                            <img 
                              src={getSocialIcon(social.platform)} 
                              alt={social.platform} 
                              className="w-5 h-5 rounded"
                            />
                          ) : (
                            <div className="w-5 h-5 flex items-center justify-center">
                              {getSocialIcon(social.platform) === 'globe' ? (
                                <Globe className="w-4 h-4" />
                              ) : (
                                <Link className="w-4 h-4" />
                              )}
                            </div>
                          )}
                          <span className="font-medium capitalize">{social.display_name || social.platform}</span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                )}
                
                {socials.filter(s => s.is_active).length === 0 && (
                  <div className="text-center py-4 text-gray-400">
                    <p className="text-sm">No social links added yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 