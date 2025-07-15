'use client'

import { motion } from "framer-motion"
import { Smartphone, Tablet, Monitor, Globe, ExternalLink, Link, X } from "lucide-react"
import { getSocialIcon } from "@/lib/constants/social-platforms"
import { getTheme } from "@/lib/constants/themes"
import NewsletterForm from "@/components/ui/newsletter-form"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

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
  newsletter_enabled: boolean
}

interface WebsitePreviewProps {
  profile: Profile
  socials: SocialLink[]
  viewport: 'mobile' | 'tablet' | 'desktop'
  onViewportChange: (viewport: 'mobile' | 'tablet' | 'desktop') => void
  onPublish?: () => void
  onSave?: () => void
  hasUnsavedChanges?: boolean
  onClose?: () => void // for mobile drawer
  isMobileDrawer?: boolean // for mobile drawer
}

export default function WebsitePreview({ profile, socials, viewport, onViewportChange, onPublish, onSave, hasUnsavedChanges, onClose, isMobileDrawer }: WebsitePreviewProps) {
  const theme = getTheme(profile.theme || 'default')
  
  return (
    <motion.div 
      className={`flex-1 bg-zinc-950 flex flex-col ${isMobileDrawer ? 'h-full' : 'h-screen'} ${isMobileDrawer ? 'pt-14' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      {/* Close button for mobile drawer - floating in top-right */}
      {isMobileDrawer && onClose && (
        <button 
          onClick={onClose}
          className="fixed top-4 right-4 z-50 w-10 h-10 bg-zinc-900/80 border border-zinc-700 rounded-[3px] flex items-center justify-center text-gray-400 hover:text-white transition-colors backdrop-blur-sm"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Preview Header - Not Sticky */}
      <div className="border-b border-zinc-800 p-4 bg-zinc-950">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-white">Preview</h2>
            <div className="flex items-center gap-1 bg-zinc-800 rounded-lg p-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onViewportChange('mobile')}
                    className={`p-2 rounded ${
                      viewport === 'mobile' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent sideOffset={8}>Mobile (380px)</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onViewportChange('tablet')}
                    className={`p-2 rounded ${
                      viewport === 'tablet' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Tablet className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent sideOffset={8}>Tablet (444px)</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onViewportChange('desktop')}
                    className={`p-2 rounded ${
                      viewport === 'desktop' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent sideOffset={8}>Desktop (672px)</TooltipContent>
              </Tooltip>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {hasUnsavedChanges && (
              <div className="flex items-center gap-2 bg-yellow-600/20 border border-yellow-600/40 rounded-lg px-3 py-2">
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <span className="text-xs font-medium text-yellow-300">
                  Unsaved Changes
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              {onSave && hasUnsavedChanges && (
                <button
                  onClick={onSave}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
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
      </div>

      {/* Preview Frame - Fixed Height */}
      <div className={`flex-1 ${isMobileDrawer ? 'p-0' : 'p-6'} flex items-center justify-center`}>
        <div className={`${isMobileDrawer ? 'w-full h-full rounded-none shadow-none' : 'mx-auto bg-white rounded-lg shadow-2xl'} overflow-hidden transition-all duration-300 ${
          viewport === 'mobile' ? (isMobileDrawer ? 'w-full' : 'w-[380px]') : 
          viewport === 'tablet' ? (isMobileDrawer ? 'w-full' : 'w-[444px]') : 
          'w-full max-w-2xl'
        }`}>
          <div className={`w-full ${isMobileDrawer ? 'h-full' : 'h-[600px]'} ${theme.background} ${theme.text} overflow-y-auto`}>
            <div className={`min-h-full flex flex-col items-center justify-center ${isMobileDrawer ? 'px-0' : 'px-4'}`}>
              <div className={`max-w-md w-full ${theme.cardBackground} ${theme.cardBorder} border rounded-md shadow-lg ${isMobileDrawer ? 'p-4' : 'p-8'} flex flex-col items-center gap-6`}>
                {/* Avatar */}
                {profile.avatar_url && (
                  <img
                    src={profile.avatar_url}
                    alt="Profile Avatar"
                    className="w-24 h-24 rounded-full border-2 border-purple-500 object-cover mx-auto mb-2"
                    style={{ objectFit: 'cover' }}
                  />
                )}
                {/* Title */}
                {profile.title && (
                  <h1 className={`text-2xl font-bold ${theme.text} text-center`}>
                    {profile.title}
                  </h1>
                )}
                
                {/* Username */}
                <h2 className={`text-lg ${theme.accent} text-center`}>
                  @{profile.slug}
                </h2>
                
                {/* Description */}
                {profile.description && (
                  <p className={`${theme.text} text-center text-sm leading-relaxed opacity-80`}>
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
                        className={`w-full ${theme.linkBackground} ${theme.linkBorder} border rounded-lg px-4 py-3 ${theme.text} flex items-center justify-between ${theme.linkHoverBackground} ${theme.linkHoverBorder} transition-all`}
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
                        <ExternalLink className={`w-4 h-4 ${theme.accent}`} />
                      </div>
                    ))}
                  </div>
                )}
                
                {socials.filter(s => s.is_active).length === 0 && (
                  <div className={`text-center py-4 ${theme.text} opacity-60`}>
                    <p className="text-sm">No social links added yet</p>
                  </div>
                )}

                {/* Newsletter Form */}
                {profile.newsletter_enabled && (
                  <NewsletterForm profileId={profile.id} theme={theme} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 