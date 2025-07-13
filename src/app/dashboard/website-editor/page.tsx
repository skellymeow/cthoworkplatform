'use client'

import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { ArrowLeft, Plus, Trash2, Link as LinkIcon, Globe, Link as LinkIcon2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import AddSocialModal from "@/components/modals/AddSocialModal"
import WebsitePreview from "@/components/website-editor/WebsitePreview"
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

export default function WebsiteEditor() {
  const supabase = createClient()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [socials, setSocials] = useState<SocialLink[]>([])
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('mobile')
  const [showAddSocial, setShowAddSocial] = useState(false)
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [originalProfile, setOriginalProfile] = useState<Profile | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()
  }, [supabase.auth])

  useEffect(() => {
    if (user) {
      fetchProfile()
      fetchSocials()
    }
  }, [user])

  useEffect(() => {
    if (profile && originalProfile) {
      const hasChanges = 
        profile.title !== originalProfile.title ||
        profile.description !== originalProfile.description
      setHasUnsavedChanges(hasChanges)
    }
  }, [profile, originalProfile])

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
        e.returnValue = ''
      }
    }

    const handleRouteChange = () => {
      if (hasUnsavedChanges) {
        const confirmed = window.confirm('You have unsaved changes. Are you sure you want to leave?')
        if (!confirmed) {
          throw new Error('Route change cancelled')
        }
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    
    // Listen for next.js route changes
    const handleBeforePopState = () => {
      if (hasUnsavedChanges) {
        const confirmed = window.confirm('You have unsaved changes. Are you sure you want to leave?')
        if (!confirmed) {
          // Prevent navigation
          window.history.pushState(null, '', window.location.pathname)
          return false
        }
      }
      return true
    }

    window.addEventListener('popstate', handleBeforePopState)
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('popstate', handleBeforePopState)
    }
  }, [hasUnsavedChanges])

  const fetchProfile = async () => {
    if (!user) return
    const { data } = await supabase
      .from('link_bio_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()
    setProfile(data)
    setOriginalProfile(data)
  }

  const fetchSocials = async () => {
    if (!user) return
    const { data: profile } = await supabase
      .from('link_bio_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single()
    
    if (profile) {
      const { data } = await supabase
        .from('link_bio_socials')
        .select('*')
        .eq('profile_id', profile.id)
        .order('order_index')
      setSocials(data || [])
    }
  }

  const addSocial = async (socialData: { platform: string; url: string; display_name: string }) => {
    if (!profile) return

    const { data, error } = await supabase
      .from('link_bio_socials')
      .insert({
        profile_id: profile.id,
        platform: socialData.platform,
        url: socialData.url,
        display_name: socialData.display_name || socialData.platform,
        icon: socialData.platform,
        order_index: socials.length
      })
      .select()
      .single()

    if (error) {
      console.error('Error adding social:', error)
      alert('Error adding social link.')
    } else {
      setSocials([...socials, data])
    }
  }

  const updateSocial = async (id: string, updates: Partial<SocialLink>) => {
    const { error } = await supabase
      .from('link_bio_socials')
      .update(updates)
      .eq('id', id)

    if (error) {
      console.error('Error updating social:', error)
      alert('Error updating social link.')
    } else {
      setSocials(socials.map(s => s.id === id ? { ...s, ...updates } : s))
    }
  }

  const deleteSocial = async (id: string) => {
    const { error } = await supabase
      .from('link_bio_socials')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting social:', error)
      alert('Error deleting social link.')
    } else {
      setSocials(socials.filter(s => s.id !== id))
    }
  }

  const toggleSocialActive = async (id: string, is_active: boolean) => {
    await updateSocial(id, { is_active })
  }

  const saveProfile = async () => {
    if (!profile) return

    const { error } = await supabase
      .from('link_bio_profiles')
      .update({
        title: profile.title,
        description: profile.description
      })
      .eq('id', profile.id)

    if (error) {
      console.error('Error saving profile:', error)
      alert('Error saving profile.')
    } else {
      setOriginalProfile(profile)
      setHasUnsavedChanges(false)
      alert('Profile saved successfully!')
    }
  }

  const publishProfile = async () => {
    if (!profile) return

    const { error } = await supabase
      .from('link_bio_profiles')
      .update({
        title: profile.title,
        description: profile.description,
        is_live: true
      })
      .eq('id', profile.id)

    if (error) {
      console.error('Error publishing profile:', error)
      alert('Error publishing profile.')
    } else {
      setProfile({ ...profile, is_live: true })
      setOriginalProfile(profile)
      setHasUnsavedChanges(false)
      setShowPublishModal(true)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div 
          className="text-center"
          {...animations.fadeInUp}
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </motion.div>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div 
          className="text-center"
          {...animations.fadeInUp}
        >
          <p className="text-gray-400 mb-4">Not authenticated</p>
          <motion.button
            onClick={() => window.location.href = '/auth'}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            {...animations.buttonHover}
          >
            Sign In
          </motion.button>
        </motion.div>
      </main>
    )
  }

  if (!profile) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div 
          className="text-center"
          {...animations.fadeInUp}
        >
          <p className="text-gray-400 mb-4">No profile found</p>
          <Link
            href="/dashboard"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Back to Dashboard
          </Link>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white flex">
      {/* Left Side - Editor Panel */}
      <motion.div 
        className="w-[40%] border-r border-zinc-800 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900"
        {...animations.fadeInUp}
      >
        <div className="p-6">
          {/* Header */}
          <motion.div 
            className="flex items-center gap-3 mb-8"
            {...animations.fadeInUpDelayed(0.1)}
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              <button 
                onClick={() => {
                  if (hasUnsavedChanges) {
                    const confirmed = window.confirm('You have unsaved changes. Are you sure you want to leave?')
                    if (confirmed) {
                      router.push('/dashboard')
                    }
                  } else {
                    router.push('/dashboard')
                  }
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            </motion.div>
            <div>
              <motion.h1 
                className="text-2xl font-bold text-white"
                {...animations.fadeInUpDelayed(0.2)}
              >
                Website Editor
              </motion.h1>
              <motion.p 
                className="text-gray-400 text-sm"
                {...animations.fadeInUpDelayed(0.3)}
              >
                Customize your link-in-bio page
              </motion.p>
            </div>
          </motion.div>

          {/* Profile Info */}
          <motion.div 
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-6"
            {...animations.fadeInUpDelayed(0.4)}
            whileHover={{ scale: 1.001 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <motion.h3 
              className="text-lg font-semibold text-white mb-3"
              {...animations.fadeInUpDelayed(0.5)}
            >
              Profile Information
            </motion.h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                <div className="text-white font-mono text-sm bg-zinc-800 px-3 py-2 rounded border border-zinc-700">
                  @{profile.slug}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  value={profile.title || ''}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  placeholder="Your name or brand"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea
                  value={profile.description || ''}
                  onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                  placeholder="Tell people about yourself"
                  rows={3}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-4"
            {...animations.fadeInUpDelayed(0.6)}
            whileHover={{ scale: 1.001 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between mb-4">
              <motion.h3 
                className="text-lg font-semibold text-white"
                {...animations.fadeInUpDelayed(0.7)}
              >
                Social Links
              </motion.h3>
              <button
                onClick={() => setShowAddSocial(true)}
                className="flex items-center gap-2 bg-purple-600 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <LinkIcon className="w-4 h-4" />
                Add Link
              </button>
            </div>

            <div className="space-y-3">
              {socials.map((social) => (
                <div key={social.id} className="bg-zinc-800 border border-zinc-700 rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleSocialActive(social.id, !social.is_active)}
                        className={`w-8 h-4 rounded-full transition-colors ${
                          social.is_active 
                            ? 'bg-green-500' 
                            : 'bg-zinc-600'
                        }`}
                      >
                        <div className={`w-3 h-3 bg-white rounded-full transition-transform ${
                          social.is_active ? 'translate-x-4' : 'translate-x-0.5'
                        }`} />
                      </button>
                      {getSocialIcon(social.platform).startsWith('/') ? (
                        <img 
                          src={getSocialIcon(social.platform)} 
                          alt={social.platform} 
                          className="w-4 h-4 rounded"
                        />
                      ) : (
                        <div className="w-4 h-4 flex items-center justify-center">
                          {getSocialIcon(social.platform) === 'globe' ? (
                            <Globe className="w-3 h-3" />
                          ) : (
                            <LinkIcon2 className="w-3 h-3" />
                          )}
                        </div>
                      )}
                      <span className="text-sm font-medium text-white capitalize">{social.platform}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => deleteSocial(social.id)}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 truncate">{social.url}</div>
                </div>
              ))}

              {socials.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <p className="text-sm">No social links added yet</p>
                  <p className="text-xs mt-1">Add your first social link to get started</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Preview */}
      <WebsitePreview 
        profile={profile}
        socials={socials}
        viewport={viewport}
        onViewportChange={setViewport}
        onPublish={publishProfile}
        hasUnsavedChanges={hasUnsavedChanges}
      />

      {/* Add Social Modal */}
      <AddSocialModal 
        isOpen={showAddSocial}
        onClose={() => setShowAddSocial(false)}
        onAdd={addSocial}
      />

      {/* Publish Success Modal */}
      {showPublishModal && (
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
                href={`/u/${profile.slug}`}
                target="_blank"
                className="text-sm text-green-400 hover:text-green-300 break-all"
              >
                {window.location.origin}/u/{profile.slug}
              </a>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowPublishModal(false)}
                className="flex-1 bg-zinc-800 text-white px-4 py-2 rounded font-semibold hover:bg-zinc-700 transition-colors"
              >
                Close
              </button>
              <a
                href={`/u/${profile.slug}`}
                target="_blank"
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700 transition-colors text-center"
              >
                View Live Site
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </main>
  )
} 