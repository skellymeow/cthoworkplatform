'use client'

import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { LogOut, User as UserIcon, AlertTriangle, Clock, CheckCircle } from "lucide-react"
import Footer from "@/components/Footer"
import Link from "next/link"

export default function Dashboard() {
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [showSignOutModal, setShowSignOutModal] = useState(false)
  const [showUsernameModal, setShowUsernameModal] = useState(false)
  const [newUsername, setNewUsername] = useState('')
  const [claiming, setClaiming] = useState(false)
  const [currentProfile, setCurrentProfile] = useState<any>(null)
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null)
  const [checkingAvailability, setCheckingAvailability] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()
  }, [supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const confirmSignOut = () => {
    setShowSignOutModal(true)
  }

  const fetchCurrentProfile = async () => {
    if (!user) return
    const { data } = await supabase
      .from('link_bio_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()
    setCurrentProfile(data)
  }

  const handleClaimUsername = async () => {
    if (!user || !newUsername.trim()) return

    setClaiming(true)
    
    const { data, error } = await supabase
      .from('link_bio_profiles')
      .insert({
        user_id: user.id,
        slug: newUsername.toLowerCase().trim(),
        title: null,
        description: null,
        avatar_url: user.user_metadata?.avatar_url || null,
        is_live: false
      })
      .select()
      .single()

    if (error) {
      console.error('Error claiming username:', error)
      alert('Error claiming username. Username might already be taken.')
    } else {
      setCurrentProfile(data)
      setShowUsernameModal(false)
      setNewUsername('')
      setUsernameAvailable(null)
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
      console.error('Error deleting username:', error)
      alert('Error deleting username.')
    } else {
      setCurrentProfile(null)
    }
  }

  const toggleLiveStatus = async () => {
    if (!user || !currentProfile) return

    const { error } = await supabase
      .from('link_bio_profiles')
      .update({ is_live: !currentProfile.is_live })
      .eq('id', currentProfile.id)

    if (error) {
      console.error('Error updating status:', error)
      alert('Error updating status.')
    } else {
      setCurrentProfile({ ...currentProfile, is_live: !currentProfile.is_live })
    }
  }

  const checkUsernameAvailability = async (username: string) => {
    if (!username.trim() || username.length < 2) {
      setUsernameAvailable(null)
      return
    }

    setCheckingAvailability(true)
    
    const { data, error } = await supabase
      .from('link_bio_profiles')
      .select('slug')
      .eq('slug', username.toLowerCase().trim())
      .single()

    setUsernameAvailable(!data)
    setCheckingAvailability(false)
  }

  useEffect(() => {
    if (user) {
      fetchCurrentProfile()
    }
  }, [user])

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

  return (
    <main className="min-h-screen bg-black text-white">
      <motion.div 
        className="max-w-4xl mx-auto px-6 py-12"
        {...animations.fadeInUp}
      >
        <motion.div 
          className="flex justify-between items-center mb-12"
          {...animations.fadeInUpDelayed(0.1)}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Dashboard
          </h1>
          <motion.button
            onClick={confirmSignOut}
            className="bg-black border border-red-600 text-red-400 px-4 py-2 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors flex items-center gap-2"
            {...animations.buttonHover}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Profile Card */}
          <motion.div 
            className="bg-black border border-zinc-800 p-6 rounded-lg"
            {...animations.fadeInUpDelayed(0.2)}
          >
            <div className="flex items-center gap-4 mb-4">
              {user.user_metadata?.avatar_url ? (
                <img 
                  src={user.user_metadata.avatar_url} 
                  alt="Profile" 
                  className="w-16 h-16 rounded-full border-2 border-purple-500"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center border-2 border-purple-500">
                  <UserIcon className="w-8 h-8 text-white" />
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold text-white">
                  {user.user_metadata?.full_name || user.email}
                </h2>
                <p className="text-gray-400 text-sm">
                  {user.app_metadata?.provider || 'unknown'} • {user.email}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">User ID</span>
                <span className="text-gray-300 font-mono text-xs">{user.id.slice(0, 8)}...</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Provider</span>
                <span className="text-gray-300 capitalize">{user.app_metadata?.provider || 'unknown'}</span>
              </div>
            </div>
          </motion.div>

          {/* Username Claim Card */}
          <motion.div 
            className="bg-zinc-900 border border-zinc-800 rounded-md shadow-lg p-6 flex flex-col gap-4 items-center min-h-[220px]"
            {...animations.fadeInUpDelayed(0.3)}
          >
            <div className="flex items-center gap-3 w-full justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-purple-600 flex items-center justify-center border-2 border-purple-500">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white tracking-tight">Username</h3>
                    {currentProfile && (
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${
                        currentProfile.is_live
                          ? 'bg-green-700/20 text-green-400 border-green-700/40'
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                      }`}>
                        {currentProfile.is_live ? 'PUBLISHED' : 'DRAFT'}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs mt-0.5">
                    {currentProfile ? `@${currentProfile.slug}` : 'Not claimed yet'}
                  </p>
                </div>
              </div>
              {currentProfile && (
                <a 
                  href={`/${currentProfile.slug}`}
                  target="_blank"
                  className="text-purple-400 hover:text-purple-300 text-xs font-medium border border-purple-900 bg-zinc-950 rounded px-2 py-1 transition-colors"
                >
                  View
                </a>
              )}
            </div>
            <div className="w-full border-t border-zinc-800 my-2" />
            {currentProfile ? (
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Username claimed
                  <Clock className="w-4 h-4 text-purple-400 ml-4" />
                  Can change in 6d 23h
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={toggleLiveStatus}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-semibold transition-colors border ${
                      currentProfile.is_live
                        ? 'bg-zinc-950 text-red-400 border-red-700 hover:bg-red-950'
                        : 'bg-zinc-950 text-green-400 border-green-700 hover:bg-green-950'
                    }`}
                  >
                    {currentProfile.is_live ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    onClick={handleDeleteUsername}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-semibold bg-zinc-950 text-red-400 border border-red-700 hover:bg-red-950 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-zinc-400 text-xs text-center w-full py-6">
                Claim your unique username to get started.
              </div>
            )}
          </motion.div>

          {/* Resources Card */}
          <motion.div 
            className="bg-black border border-zinc-800 p-6 rounded-lg"
            {...animations.fadeInUpDelayed(0.4)}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-purple-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Resources</h3>
                <p className="text-gray-400 text-sm">Blog posts and guides</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Access helpful guides, tutorials, and insights for growing your Roblox community.
            </p>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors"
            >
              View Resources
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Sign Out Confirmation Modal */}
      {showSignOutModal && (
        <motion.div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-black border border-zinc-800 p-8 rounded-lg max-w-md w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Sign Out</h3>
                <p className="text-gray-400">Are you sure you want to sign out?</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <motion.button
                onClick={() => setShowSignOutModal(false)}
                className="flex-1 bg-zinc-800 text-white px-4 py-3 rounded-lg font-semibold hover:bg-zinc-700 transition-colors"
                {...animations.buttonHover}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={handleSignOut}
                className="flex-1 bg-red-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                {...animations.buttonHover}
              >
                Sign Out
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Username Claim Modal */}
      {showUsernameModal && (
        <motion.div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-black border border-zinc-800 p-8 rounded-lg max-w-md w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Claim Username</h3>
                <p className="text-gray-400">Choose your unique @username</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username (2-16 characters)
                </label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^a-zA-Z0-9-_]/g, '')
                    setNewUsername(value)
                    checkUsernameAvailability(value)
                  }}
                  placeholder="yourusername"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  maxLength={16}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Only letters, numbers, hyphens, and underscores allowed
                </p>
                
                {/* Username Availability Status */}
                {newUsername.length >= 2 && (
                  <div className={`flex items-center gap-2 text-sm ${
                    usernameAvailable === true ? 'text-green-400' : 
                    usernameAvailable === false ? 'text-red-400' : 
                    'text-gray-400'
                  }`}>
                    {checkingAvailability ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 border-b border-current"></div>
                        Checking availability...
                      </>
                    ) : usernameAvailable === true ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        This username is available
                      </>
                    ) : usernameAvailable === false ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        This username is not available
                      </>
                    ) : null}
                  </div>
                )}
              </div>

              <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-purple-300">Important</span>
                </div>
                <p className="text-xs text-gray-400">
                  Once claimed, your username cannot be changed for 7 days. Choose carefully!
                </p>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <motion.button
                onClick={() => setShowUsernameModal(false)}
                className="flex-1 bg-zinc-800 text-white px-4 py-3 rounded-lg font-semibold hover:bg-zinc-700 transition-colors"
                {...animations.buttonHover}
              >
                Cancel
              </motion.button>
                              <motion.button
                  onClick={handleClaimUsername}
                  disabled={!newUsername.trim() || claiming || usernameAvailable !== true}
                  className="flex-1 bg-purple-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  {...animations.buttonHover}
                >
                  {claiming ? 'Claiming...' : 'Claim Username'}
                </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </main>
  )
} 