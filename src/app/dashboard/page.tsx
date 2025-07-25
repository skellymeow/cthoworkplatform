'use client'

import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState, useCallback } from "react"
import { User } from "@supabase/supabase-js"
import { User as UserIcon, Settings, ExternalLink, BarChart3, Trash2, Lock, Mail, BookOpen, Eye, CheckCircle } from "lucide-react"
import Link from "next/link"
import Footer from "@/components/Footer"
import { validateUsername, sanitizeUsername } from "@/lib/utils"
import { showToast } from "@/lib/utils"
import { DashboardSkeleton } from "@/components/ui/dashboard-skeleton"
import SignOutModal from "@/components/modals/SignOutModal"
import UsernameModal from "@/components/modals/UsernameModal"
import DeleteProfileModal from "@/components/modals/DeleteProfileModal"
import ConsistentHeader from "@/components/ui/consistent-header"
import { ErrorBoundary } from "@/components/ui/error-boundary"

interface Profile {
  id: string;
  user_id: string;
  slug: string;
  title: string | null;
  description: string | null;
  avatar_url: string | null;
  is_live: boolean;
}

interface Locker {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export default function Dashboard() {
  return (
    <ErrorBoundary>
      <DashboardContent />
    </ErrorBoundary>
  )
}

function DashboardContent() {
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [showSignOutModal, setShowSignOutModal] = useState(false)
  const [showUsernameModal, setShowUsernameModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [newUsername, setNewUsername] = useState('')
  const [claiming, setClaiming] = useState(false)
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null)
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null)
  const [checkingAvailability, setCheckingAvailability] = useState(false)

  // Content lockers count and recent lockers
  const [recentLockers, setRecentLockers] = useState<Locker[]>([])
  const [recentLockerViews, setRecentLockerViews] = useState<{ [slug: string]: number }>({})

  // Bio site total views
  const [bioTotalViews, setBioTotalViews] = useState(0)
  // Newsletter subscribers count
  const [newsletterSubscribers, setNewsletterSubscribers] = useState(0)

  const fetchCurrentProfile = useCallback(async () => {
    if (!user) return
    const { data } = await supabase
      .from('link_bio_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()
    setCurrentProfile(data)
  }, [supabase, user])

  const checkUsernameAvailability = useCallback(async (username: string) => {
    if (!username.trim() || username.length < 2) {
      setUsernameAvailable(null)
      return
    }
    const sanitizedUsername = sanitizeUsername(username)
    if (!validateUsername(sanitizedUsername)) {
      setUsernameAvailable(false)
      return
    }
    setCheckingAvailability(true)
    const { data } = await supabase
      .from('link_bio_profiles')
      .select('slug, user_id')
      .eq('slug', sanitizedUsername)
      .maybeSingle()
    let isAvailable = true
    if (data) {
      isAvailable = data.user_id === user?.id
    }
    setUsernameAvailable(isAvailable)
    setCheckingAvailability(false)
  }, [supabase, user])

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [supabase])

  useEffect(() => {
    if (!user) return
    supabase
      .from('content_lockers')
      .select('id, name, slug, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(async ({ data }) => {
        const lockers = (data || []).slice(0, 3)
        setRecentLockers(lockers)
        if (lockers.length > 0) {
          const lockerIds = lockers.map(l => l.id)
          const { data: views } = await supabase
            .from('page_views')
            .select('id, locker_id')
            .in('locker_id', lockerIds)
          const counts: { [slug: string]: number } = {}
          lockers.forEach(locker => {
            counts[locker.slug] = (views || []).filter(v => v.locker_id === locker.id).length
          })
          setRecentLockerViews(counts)
        } else {
          setRecentLockerViews({})
        }
      })
  }, [user, supabase])

  useEffect(() => {
    if (!user) return
    supabase
      .from('link_bio_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single()
      .then(async ({ data }) => {
        if (data) {
          const { data: views } = await supabase
            .from('page_views')
            .select('id')
            .eq('profile_id', data.id)
          setBioTotalViews((views || []).length)
        }
      })
    supabase
      .from('content_lockers')
      .select('id')
      .eq('user_id', user.id)
      .then(async ({ data }) => {
        if (data && data.length > 0) {
        } else {
        }
      })
    supabase
      .from('link_bio_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single()
      .then(async ({ data }) => {
        if (data) {
          const { data: subscribers } = await supabase
            .from('newsletter_subscribers')
            .select('id')
            .eq('profile_id', data.id)
          setNewsletterSubscribers((subscribers || []).length)
        }
      })
  }, [user, supabase])

  useEffect(() => {
    if (user) {
      fetchCurrentProfile()
    }
  }, [user, fetchCurrentProfile])

  useEffect(() => {
    if (showUsernameModal && newUsername.trim()) {
      const timeoutId = setTimeout(() => {
        checkUsernameAvailability(newUsername)
      }, 500)
      return () => clearTimeout(timeoutId)
    } else if (showUsernameModal && !newUsername.trim()) {
      setUsernameAvailable(null)
      setCheckingAvailability(false)
    }
  }, [newUsername, showUsernameModal, checkUsernameAvailability])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    showToast.info('Signed out successfully')
    window.location.href = '/'
  }

  const handleClaimUsername = async () => {
    if (!user || !newUsername.trim()) return

    // Server-side validation
    const sanitizedUsername = sanitizeUsername(newUsername)
    if (!validateUsername(sanitizedUsername)) {
      showToast.error('Invalid username format')
      return
    }

    setClaiming(true)
    
    const { data, error: _error } = await supabase
      .from('link_bio_profiles')
      .insert({
        user_id: user.id,
        slug: sanitizedUsername,
        title: null,
        description: null,
        avatar_url: user.user_metadata?.avatar_url || null,
        is_live: false
      })
      .select()
      .single()

    if (_error) {
      showToast.error('Failed to claim username')
      setClaiming(false)
      return
    } else {
      setCurrentProfile(data)
      setShowUsernameModal(false)
      setNewUsername('')
      setUsernameAvailable(null)
      showToast.success('Username claimed successfully!')
      

      
      // Sync affiliate_profiles.username to new slug
      const { data: existingAffiliateProfile } = await supabase
        .from('affiliate_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (existingAffiliateProfile) {
        // Update existing profile
        await supabase
          .from('affiliate_profiles')
          .update({ username: sanitizedUsername })
          .eq('user_id', user.id)
      } else {
        // Insert new profile
        await supabase
          .from('affiliate_profiles')
          .insert({
            user_id: user.id,
            username: sanitizedUsername
          })
      }
    }
    
    setClaiming(false)
  }

  const handleDeleteUsername = async () => {
    if (!user || !currentProfile) return

    const { error } = await supabase
      .from('link_bio_profiles')
      .delete()
      .eq('id', currentProfile.id)

    if (error) {
      showToast.error('Failed to delete username')
      return
    } else {
      setCurrentProfile(null)
      setShowDeleteModal(false)
      showToast.success('Username deleted successfully')
    }
  }

  const confirmDelete = () => {
    setShowDeleteModal(true)
  }

  const toggleLiveStatus = async () => {
    if (!user || !currentProfile) return

    const { error } = await supabase
      .from('link_bio_profiles')
      .update({ is_live: !currentProfile.is_live })
      .eq('id', currentProfile.id)

    if (error) {
      showToast.error('Failed to update live status')
      return
    } else {
      setCurrentProfile({ ...currentProfile, is_live: !currentProfile.is_live })
      showToast.success(currentProfile.is_live ? 'Site taken offline' : 'Site is now live!')
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('[data-dropdown]')) {
        // setShowUserDropdown(false) // This line was removed
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col">
        <motion.header 
          className="border-b border-zinc-800 bg-black/50 backdrop-blur-sm sticky top-0 z-40"
          {...animations.fadeInUp}
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <motion.h1 
                className="text-2xl font-bold text-white"
                {...animations.fadeInUpDelayed(0.1)}
              >
                Dashboard
              </motion.h1>
            </div>
          </div>
        </motion.header>
        <div className="flex-1 w-full px-6 py-8 max-w-7xl mx-auto">
          <DashboardSkeleton />
        </div>
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
            className="bg-purple-600 text-white px-6 py-3 rounded-[3px] font-semibold hover:bg-purple-700 transition-colors"
            {...animations.buttonHover}
          >
            Sign In
          </motion.button>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <ConsistentHeader 
        breadcrumbs={[{ label: "Dashboard" }]}
        isDashboardPage={true}
      />

      {/* Main Content */}
      <motion.div 
        className="flex-1 w-full px-4 sm:px-[1.5%] py-4 sm:py-8"
        {...animations.fadeInUp}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 w-full">
          {/* Top left: Your Website */}
          <motion.div 
            className="bg-zinc-900 border border-zinc-800 rounded-none shadow-lg p-4 sm:p-6 flex flex-col gap-4 items-center w-full"
            {...animations.fadeInUpDelayed(0.3)}
            whileHover={{ scale: 1.001 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-purple-600 flex items-center justify-center border-2 border-purple-500">
                  <UserIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white tracking-tight">Your Website</h3>
                  </div>
                  <p className="text-gray-400 text-xs mt-0.5 flex items-center gap-2 group relative">
                    {currentProfile ? (
                      <>
                        @{currentProfile.slug}
                        <span className="flex items-center gap-1 cursor-pointer group/eye relative">
                          <Eye className="w-4 h-4 text-gray-400" />
                          <span className="text-xs font-bold text-white">{bioTotalViews}</span>
                          <span className="absolute left-1/2 -translate-x-1/2 top-7 z-50 hidden group-hover/eye:block bg-black text-white text-xs rounded px-2 py-1 border border-zinc-700 whitespace-nowrap shadow-lg">
                            Your total site views
                          </span>
                        </span>
                      </>
                    ) : 'No username claimed yet'}
                  </p>
                  {currentProfile && (
                    <a 
                      href={`/u/${currentProfile.slug}`}
                      target="_blank"
                      className="text-purple-400 hover:text-purple-300 text-xs font-medium flex items-center gap-1 mt-1 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {window.location.origin}/u/{currentProfile.slug}
                    </a>
                  )}
                </div>
              </div>
              {currentProfile && (
                <div
                  className={`flex items-center gap-2 bg-zinc-800 border border-zinc-700 rounded-[3px] px-3 py-2 cursor-pointer transition-colors ${currentProfile.is_live ? 'hover:bg-green-700/40' : 'hover:bg-red-700/40'}`}
                  title={currentProfile.is_live ? 'Click to unpublish' : 'Click to publish'}
                  onClick={toggleLiveStatus}
                  style={{ userSelect: 'none' }}
                >
                  <div className={`w-2 h-2 rounded-full ${currentProfile.is_live ? 'bg-green-400' : 'bg-red-400'}`} />
                  <span className="text-xs font-medium text-gray-400">{currentProfile.is_live ? 'Live' : 'Not Live'}</span>
                </div>
              )}
            </div>

            {currentProfile ? (
              <div className="flex flex-col gap-2 w-full">
                {/* Action Bar */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-[3px] p-4 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                    >
                      <Link
                        href="/dashboard/website-editor"
                        className="flex items-center justify-center gap-2 px-3 py-2 rounded-[3px] text-xs font-semibold bg-zinc-900 text-purple-400 border border-purple-700 hover:bg-purple-950 transition-colors"
                      >
                        <Settings className="w-3 h-3" />
                        Manage
                      </Link>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                    >
                      <Link
                        href="/dashboard/analytics"
                        className="flex items-center justify-center gap-2 px-3 py-2 rounded-[3px] text-xs font-semibold bg-zinc-900 text-orange-400 border border-orange-700 hover:bg-orange-950 transition-colors"
                      >
                        <BarChart3 className="w-3 h-3" />
                        Analytics
                      </Link>
                    </motion.div>

                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                    >
                      <Link
                        href="/dashboard/newsletter-subscribers"
                        className="flex items-center justify-center gap-2 px-3 py-2 rounded-[3px] text-xs font-semibold bg-zinc-900 text-blue-400 border border-blue-700 hover:bg-blue-950 transition-colors"
                      >
                        <Mail className="w-3 h-3" />
                        Newsletter ({newsletterSubscribers})
                      </Link>
                    </motion.div>

                    <motion.button
                      onClick={confirmDelete}
                      className="flex items-center justify-center gap-2 px-3 py-2 rounded-[3px] text-xs font-semibold bg-zinc-900 text-red-400 border border-red-700 hover:bg-red-950 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </motion.button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 w-full">
                <div className="text-zinc-400 text-xs text-center">
                  Claim your unique username to create your link-in-bio website.
                </div>
                <motion.button
                  onClick={() => setShowUsernameModal(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-[3px] text-sm font-semibold bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  <CheckCircle className="w-4 h-4" />
                  Claim Username
                </motion.button>
              </div>
            )}
          </motion.div>

          {/* Bottom left: Content Lockers */}
          <motion.div 
            className="bg-zinc-900 border border-zinc-800 rounded-none shadow-lg p-4 sm:p-6 flex flex-col gap-4 items-center w-full"
            {...animations.fadeInUpDelayed(0.35)}
            whileHover={{ scale: 1.001 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-purple-600 flex items-center justify-center border-2 border-purple-500">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white tracking-tight">Content Lockers</h3>
                  </div>
                  <p className="text-gray-400 text-xs mt-0.5">
                    Gate links behind offers, track engagement, and boost conversions.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              {/* Action Bar */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-[3px] p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                    >
                      <Link
                        href="/dashboard/content-lockers"
                        className="flex items-center justify-center gap-2 px-3 py-2 rounded-[3px] text-xs font-semibold bg-zinc-900 text-purple-400 border border-purple-700 hover:bg-purple-950 transition-colors"
                      >
                        <Settings className="w-3 h-3" />
                        Manage
                      </Link>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                    >
                      <Link
                        href="/dashboard/analytics?tab=lockers"
                        className="flex items-center justify-center gap-2 px-3 py-2 rounded-[3px] text-xs font-semibold bg-zinc-900 text-orange-400 border border-orange-700 hover:bg-orange-950 transition-colors"
                      >
                        <BarChart3 className="w-3 h-3" />
                        Analytics
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
            
            {recentLockers.length > 0 && (
              <div className="w-full mt-4">
                <div className="text-xs text-gray-500 mb-1">Recent Lockers:</div>
                <div className="flex flex-col gap-2">
                  {recentLockers.map(l => (
                    <div key={l.id} className="flex items-center justify-between bg-zinc-950 border border-zinc-800 rounded-[3px] px-4 py-3 hover:bg-zinc-900 transition-colors shadow-sm">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="truncate text-purple-300 font-semibold text-base">{l.name}</span>
                        <span className="inline-flex items-center gap-1 bg-zinc-800 text-purple-400 px-2 py-0.5 rounded-full text-xs font-medium ml-2">
                          <Eye className="w-4 h-4" />
                          {recentLockerViews[l.slug] || 0}
                        </span>
                      </div>
                      <a
                        href={`/${l.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-4 flex items-center justify-center gap-2 px-3 py-2 rounded-[3px] text-xs font-semibold bg-zinc-900 text-purple-400 border border-purple-700 hover:bg-purple-950 transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        View
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Top right: Resources */}
          <motion.div 
            className="bg-zinc-900 border border-zinc-800 rounded-none shadow-lg p-4 sm:p-6 flex flex-col gap-4 items-center w-full"
            {...animations.fadeInUpDelayed(0.45)}
            whileHover={{ scale: 1.001 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-none bg-purple-600 flex items-center justify-center border-2 border-purple-500">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white tracking-tight">Resources</h3>
                  </div>
                  <p className="text-gray-400 text-xs mt-0.5">
                    Guides, tutorials & insights
                  </p>
                </div>
              </div>
              <Link
                href="/resources"
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-none text-xs font-semibold bg-zinc-900 text-purple-400 border border-purple-700 hover:bg-purple-950 transition-colors"
              >
                <BookOpen className="w-3 h-3" />
                Browse Resources
              </Link>
            </div>
            <div className="w-full mt-4">
              <div className="text-xs text-gray-500 mb-1">Quick Links:</div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between bg-zinc-950 border border-zinc-800 rounded-none px-4 py-3 hover:bg-zinc-900 transition-colors shadow-sm">
                  <span className="truncate text-purple-300 font-semibold text-sm">Building Your First Roblox...</span>
                  <a
                    href="/resources/building-first-roblox-community"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 flex items-center justify-center gap-2 px-3 py-2 rounded-none text-xs font-semibold bg-zinc-900 text-purple-400 border border-purple-700 hover:bg-purple-950 transition-colors"
                  >
                    <BookOpen className="w-3 h-3" />
                    Read
                  </a>
                </div>
              </div>
            </div>
          </motion.div>


        </div>
      </motion.div>

      <Footer />
      {/* Modals... */}
      <SignOutModal 
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        onConfirm={handleSignOut}
      />
      
      <UsernameModal 
        isOpen={showUsernameModal}
        onClose={() => setShowUsernameModal(false)}
        newUsername={newUsername}
        setNewUsername={setNewUsername}
        claiming={claiming}
        onClaim={handleClaimUsername}
        usernameAvailable={usernameAvailable}
        checkingAvailability={checkingAvailability}
      />
      
      <DeleteProfileModal 
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteUsername}
        profileSlug={currentProfile?.slug}
      />





    </main>
  )
}