'use client'

import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { ArrowLeft, Eye } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import AddSocialModal from "@/components/modals/AddSocialModal"
import PublishSuccessModal from "@/components/modals/PublishSuccessModal"
import DisableNewsletterModal from "@/components/modals/DisableNewsletterModal"
import WebsitePreview from "@/components/website-editor/WebsitePreview"
import { showToast } from "@/lib/utils"
import { WebsiteEditorSkeleton } from "@/components/ui/website-editor-skeleton"
import ConsistentHeader from "@/components/ui/consistent-header"
import WebsiteEditorBasicInfo from '@/components/website-editor/WebsiteEditorBasicInfo'
import WebsiteEditorTheme from '@/components/website-editor/WebsiteEditorTheme'
import WebsiteEditorNewsletter from '@/components/website-editor/WebsiteEditorNewsletter'
import WebsiteEditorSocialLinks from '@/components/website-editor/WebsiteEditorSocialLinks'

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
  const [showDisableNewsletterModal, setShowDisableNewsletterModal] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [originalProfile, setOriginalProfile] = useState<Profile | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

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
        profile.description !== originalProfile.description ||
        profile.theme !== originalProfile.theme ||
        profile.newsletter_enabled !== originalProfile.newsletter_enabled
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

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
      showToast.error('Failed to add social link')
      return
    } else {
      setSocials([...socials, data])
      showToast.success('Social link added successfully')
    }
  }

  const updateSocial = async (id: string, updates: Partial<SocialLink>) => {
    const { error } = await supabase
      .from('link_bio_socials')
      .update(updates)
      .eq('id', id)

    if (error) {
      showToast.error('Failed to update social link')
      return
    } else {
      setSocials(socials.map(s => s.id === id ? { ...s, ...updates } : s))
      showToast.success('Social link updated successfully')
    }
  }

  const deleteSocial = async (id: string) => {
    const { error } = await supabase
      .from('link_bio_socials')
      .delete()
      .eq('id', id)

    if (error) {
      showToast.error('Failed to delete social link')
      return
    } else {
      setSocials(socials.filter(s => s.id !== id))
      showToast.success('Social link deleted successfully')
    }
  }

  const toggleSocialActive = async (id: string, is_active: boolean) => {
    const { error } = await supabase
      .from('link_bio_socials')
      .update({ is_active: !is_active })
      .eq('id', id)

    if (error) {
      showToast.error('Failed to update social link')
      return
    } else {
      setSocials(socials.map(s => s.id === id ? { ...s, is_active: !is_active } : s))
      showToast.success(is_active ? 'Social link deactivated' : 'Social link activated')
    }
  }

  const saveProfile = async () => {
    if (!profile) return
    
    const { error } = await supabase
      .from('link_bio_profiles')
      .update({
        title: profile.title,
        description: profile.description,
        theme: profile.theme,
        newsletter_enabled: profile.newsletter_enabled
      })
      .eq('id', profile.id)

    if (error) {
      showToast.error('Failed to save profile')
      return
    } else {
      setOriginalProfile(profile)
      setHasUnsavedChanges(false)
      showToast.success('Profile saved successfully')
    }
  }

  const publishProfile = async () => {
    if (!profile) return
    
    const { error } = await supabase
      .from('link_bio_profiles')
      .update({ is_live: !profile.is_live })
      .eq('id', profile.id)

    if (error) {
      showToast.error('Failed to publish profile')
      return
    } else {
      setProfile({ ...profile, is_live: !profile.is_live })
      setShowPublishModal(true)
      showToast.success('Profile published successfully!')
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col">
        <ConsistentHeader 
          breadcrumbs={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Website Editor" }
          ]}
          isDashboardPage={true}
        />
        <WebsiteEditorSkeleton />
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
            onClick={() => router.push('/auth')}
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
          <motion.button
            onClick={() => router.push('/dashboard')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            {...animations.buttonHover}
          >
            Back to Dashboard
          </motion.button>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <ConsistentHeader 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Website Editor" }
        ]}
        isDashboardPage={true}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Panel - Editor (full width if preview hidden) */}
        <div className={`${!isMobile && showPreview ? 'lg:basis-[45%] lg:min-w-[320px] lg:max-w-[55vw]' : 'flex-1'} ${!isMobile && !showPreview ? 'px-[1.5%] pt-[10px]' : 'p-3 sm:p-4 lg:p-6'}`}>
          <motion.div 
            className={`max-w-7xl mx-auto ${!isMobile && !showPreview ? 'w-full' : ''}`}
            {...animations.fadeInUp}
          >
            {/* Header */}
            <motion.div 
              className="mb-4 sm:mb-6 lg:mb-8"
              {...animations.fadeInUpDelayed(0.1)}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4">
                <h1 className="text-xl sm:text-2xl font-bold text-white">Website Editor</h1>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  {/* Live Indicator */}
                  <div
                    className={`flex items-center gap-2 bg-zinc-800 border border-zinc-700 rounded-[3px] px-2 sm:px-3 py-1.5 sm:py-2 cursor-pointer transition-colors ${profile.is_live ? 'hover:bg-green-700/40' : 'hover:bg-red-700/40'}`}
                    title={profile.is_live ? 'Click to unpublish' : 'Click to publish'}
                    onClick={publishProfile}
                    style={{ userSelect: 'none' }}
                  >
                    <div className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full ${profile.is_live ? 'bg-green-400' : 'bg-red-400'}`} />
                    <span className="text-xs font-medium text-gray-400">{profile.is_live ? 'Live' : 'Not Live'}</span>
                  </div>
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="flex items-center gap-1.5 sm:gap-2 bg-zinc-800 text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-zinc-700 transition-colors text-xs sm:text-sm"
                  >
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                    {showPreview ? 'Hide' : 'Preview'}
                  </button>
                  {hasUnsavedChanges && (
                    <button
                      onClick={saveProfile}
                      className="bg-purple-600 text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-purple-700 transition-colors text-xs sm:text-sm font-medium"
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
              
              {profile.is_live && (
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-400 rounded-full"></div>
                      <span className="text-green-400 font-medium text-sm">Live</span>
                    </div>
                    <span className="text-gray-400 text-sm">• Your website is live at</span>
                    <a 
                      href={`/u/${profile.slug}`} 
                      target="_blank" 
                      className="text-purple-400 hover:text-purple-300 underline text-sm break-all"
                    >
                      cthowork.com/u/{profile.slug}
                    </a>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Editor Sections */}
            {/* Replace Basic Info, Theme, Newsletter, Social Links sections with new components */}
            {/* Desktop/two-column */}
            {(!isMobile && !showPreview) ? (
              <motion.div 
                className="grid grid-cols-2 gap-6 lg:gap-8 w-full"
                {...animations.fadeInUpDelayed(0.2)}
              >
                <div className="flex flex-col gap-6 lg:gap-8">
                  <WebsiteEditorBasicInfo profile={profile} setProfile={setProfile} />
                  <WebsiteEditorTheme profile={profile} setProfile={setProfile} />
                </div>
                <div className="flex flex-col gap-6 lg:gap-8">
                  <WebsiteEditorNewsletter profile={profile} setProfile={setProfile} setShowDisableNewsletterModal={setShowDisableNewsletterModal} />
                  <WebsiteEditorSocialLinks socials={socials} updateSocial={updateSocial} deleteSocial={deleteSocial} toggleSocialActive={toggleSocialActive} setShowAddSocial={setShowAddSocial} />
                </div>
              </motion.div>
            ) : (
              <motion.div 
                className="space-y-4 sm:space-y-6 lg:space-y-8"
                {...animations.fadeInUpDelayed(0.2)}
              >
                <WebsiteEditorBasicInfo profile={profile} setProfile={setProfile} />
                <WebsiteEditorTheme profile={profile} setProfile={setProfile} />
                <WebsiteEditorNewsletter profile={profile} setProfile={setProfile} setShowDisableNewsletterModal={setShowDisableNewsletterModal} />
                <WebsiteEditorSocialLinks socials={socials} updateSocial={updateSocial} deleteSocial={deleteSocial} toggleSocialActive={toggleSocialActive} setShowAddSocial={setShowAddSocial} />
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Right Panel - Preview (desktop/tablet only) */}
        {!isMobile && showPreview && (
          <div className="lg:basis-[55%] lg:min-w-[320px] lg:max-w-[65vw] bg-zinc-950 border-l border-zinc-800 flex-shrink-0">
            <WebsitePreview 
              profile={profile} 
              socials={socials} 
              viewport={viewport}
              onViewportChange={setViewport}
              hasUnsavedChanges={hasUnsavedChanges}
            />
          </div>
        )}
      </div>

      {/* Mobile Drawer for Preview */}
      {isMobile && showPreview && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowPreview(false)} />
          <motion.div 
            initial={{ y: '100%' }} 
            animate={{ y: 0 }} 
            exit={{ y: '100%' }} 
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 w-full h-full bg-zinc-950 z-50 overflow-hidden"
          >
            <WebsitePreview 
              profile={profile} 
              socials={socials} 
              viewport={viewport}
              onViewportChange={setViewport}
              hasUnsavedChanges={hasUnsavedChanges}
              onClose={() => setShowPreview(false)}
              isMobileDrawer={true}
            />
          </motion.div>
        </div>
      )}

      {/* Modals */}
      {showAddSocial && (
        <AddSocialModal
          isOpen={showAddSocial}
          onClose={() => setShowAddSocial(false)}
          onAdd={addSocial}
        />
      )}
      
      {showPublishModal && (
        <PublishSuccessModal
          isOpen={showPublishModal}
          onClose={() => setShowPublishModal(false)}
          profileSlug={profile.slug}
        />
      )}
      
      {showDisableNewsletterModal && (
        <DisableNewsletterModal
          isOpen={showDisableNewsletterModal}
          onClose={() => setShowDisableNewsletterModal(false)}
          onConfirm={() => {
            setProfile({ ...profile, newsletter_enabled: false })
            setShowDisableNewsletterModal(false)
          }}
        />
      )}
    </main>
  )
} 