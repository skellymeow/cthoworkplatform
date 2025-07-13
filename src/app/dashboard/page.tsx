'use client'

import { motion, AnimatePresence } from "framer-motion"
import { animations } from "@/lib/animations"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { LogOut, User as UserIcon, AlertTriangle, Clock, CheckCircle, ChevronDown, Settings, ExternalLink, Trash2, EyeOff, Edit3, X } from "lucide-react"
import Footer from "@/components/Footer"
import Link from "next/link"

export default function Dashboard() {
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [showSignOutModal, setShowSignOutModal] = useState(false)
  const [showUsernameModal, setShowUsernameModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [newUsername, setNewUsername] = useState('')
  const [claiming, setClaiming] = useState(false)
  const [currentProfile, setCurrentProfile] = useState<any>(null)
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null)
  const [checkingAvailability, setCheckingAvailability] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)

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
      setShowDeleteModal(false)
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('[data-dropdown]')) {
        setShowUserDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
    <main className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
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
            
            {/* User Dropdown */}
            <motion.div 
              className="relative"
              data-dropdown
              {...animations.fadeInUpDelayed(0.2)}
            >
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-700 rounded-lg px-4 py-2 hover:bg-zinc-800/50 transition-colors"
              >
                {user.user_metadata?.avatar_url ? (
                  <img 
                    src={user.user_metadata.avatar_url} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full border border-zinc-600"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center border border-zinc-600">
                    <UserIcon className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="text-left">
                  <div className="text-sm font-medium text-white">
                    {user.user_metadata?.full_name || user.email?.split('@')[0]}
                  </div>
                  <div className="text-xs text-gray-400">
                    {user.email}
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showUserDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {showUserDropdown && (
                  <motion.div 
                    className="absolute right-0 top-full mt-2 w-80 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                  <div className="p-4 border-b border-zinc-700">
                    <div className="flex items-center gap-3">
                      {user.user_metadata?.avatar_url ? (
                        <img 
                          src={user.user_metadata.avatar_url} 
                          alt="Profile" 
                          className="w-12 h-12 rounded-full border border-zinc-600"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center border border-zinc-600">
                          <UserIcon className="w-6 h-6 text-white" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-white">
                          {user.user_metadata?.full_name || user.email?.split('@')[0]}
                        </div>
                        <div className="text-sm text-gray-400">
                          {user.email}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {user.app_metadata?.provider || 'unknown'} • ID: {user.id.slice(0, 8)}...
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-2">
                    <button
                      onClick={confirmSignOut}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.div 
        className="flex-1 w-full px-6 py-8"
        {...animations.fadeInUp}
      >
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">

          {/* Username Claim Card */}
          <motion.div 
            className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg p-8 flex flex-col gap-6 items-center min-h-[320px]"
            {...animations.fadeInUpDelayed(0.3)}
            whileHover={{ scale: 1.001 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
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
                    <h3 className="text-lg font-bold text-white tracking-tight">Your Website</h3>
                    {currentProfile && (
                      <div className="flex items-center gap-2 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2">
                        <div className={`w-2 h-2 rounded-full ${
                          currentProfile.is_live ? 'bg-green-400' : 'bg-red-400'
                        }`} />
                        <span className="text-xs font-medium text-gray-400">
                          {currentProfile.is_live ? 'Live' : 'Offline'}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs mt-0.5">
                    {currentProfile ? `@${currentProfile.slug}` : 'No username claimed yet'}
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
                <a 
                  href={currentProfile.is_live ? `/u/${currentProfile.slug}` : "/dashboard/website-editor"}
                  target="_blank"
                  className="text-purple-400 hover:text-purple-300 text-xs font-medium border border-purple-900 bg-zinc-950 rounded px-2 py-1 transition-colors flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  {currentProfile.is_live ? 'View' : 'Edit'}
                </a>
              )}
            </div>

            {currentProfile ? (
              <div className="flex flex-col gap-2 w-full">
                {/* Action Bar */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                      >
                        <Link
                          href="/dashboard/website-editor"
                          className="flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-semibold bg-zinc-900 text-purple-400 border border-purple-700 hover:bg-purple-950 transition-colors"
                        >
                          <Edit3 className="w-3 h-3" />
                          Editor
                        </Link>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                      >
                        <Link
                          href="/dashboard/analytics"
                          className="flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-semibold bg-zinc-900 text-orange-400 border border-orange-700 hover:bg-orange-950 transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          Analytics
                        </Link>
                      </motion.div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <motion.button
                        onClick={toggleLiveStatus}
                        className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-semibold transition-colors border ${
                          currentProfile.is_live
                            ? 'bg-zinc-900 text-red-400 border-red-700 hover:bg-red-950'
                            : 'bg-zinc-900 text-green-400 border-green-700 hover:bg-green-950'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                      >
                        <EyeOff className="w-3 h-3" />
                        {currentProfile.is_live ? 'Unpublish' : 'Publish'}
                      </motion.button>
                      <motion.button
                        onClick={confirmDelete}
                        className="flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-semibold bg-zinc-900 text-red-400 border border-red-700 hover:bg-red-950 transition-colors"
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
              </div>
            ) : (
              <div className="flex flex-col gap-4 w-full">
                <div className="text-zinc-400 text-xs text-center">
                  Claim your unique username to create your link-in-bio website.
                </div>
                <motion.button
                  onClick={() => setShowUsernameModal(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md text-sm font-semibold bg-purple-600 text-white hover:bg-purple-700 transition-colors"
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

          {/* Resources Card */}
          <motion.div 
            className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg p-8 flex flex-col gap-6 items-center min-h-[320px]"
            {...animations.fadeInUpDelayed(0.4)}
            whileHover={{ scale: 1.001 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 w-full justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-purple-600 flex items-center justify-center border-2 border-purple-500">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
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
            </div>
            <div className="w-full border-t border-zinc-800 my-2" />
            <div className="flex flex-col gap-2 w-full">
              <div className="flex gap-2 mt-2">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  <Link
                    href="/resources"
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-semibold bg-zinc-950 text-purple-400 border border-purple-700 hover:bg-purple-950 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Browse Resources
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <Footer />

      {/* Sign Out Confirmation Modal */}
      {showSignOutModal && (
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
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Sign Out</h3>
                  <p className="text-gray-400">Are you sure you want to sign out?</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <motion.button
                onClick={() => setShowSignOutModal(false)}
                className="flex-1 bg-zinc-800 text-white px-4 py-2 rounded font-semibold hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
                {...animations.buttonHover}
              >
                <X className="w-4 h-4" />
                Cancel
              </motion.button>
              <motion.button
                onClick={handleSignOut}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                {...animations.buttonHover}
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Delete Username Confirmation Modal */}
      {showDeleteModal && (
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
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Delete Username</h3>
                  <p className="text-gray-400">Are you sure you want to delete your username?</p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-sm font-medium text-red-300">Warning</span>
              </div>
              <p className="text-xs text-gray-400">
                This action cannot be undone. Your profile will be permanently deleted and the username will become available for others to claim.
              </p>
            </div>
            
            <div className="flex gap-3">
              <motion.button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-zinc-800 text-white px-4 py-2 rounded font-semibold hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
                {...animations.buttonHover}
              >
                <X className="w-4 h-4" />
                Cancel
              </motion.button>
              <motion.button
                onClick={handleDeleteUsername}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                {...animations.buttonHover}
              >
                <Trash2 className="w-4 h-4" />
                Delete Username
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
            className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg max-w-md w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
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
                className="flex-1 bg-zinc-800 text-white px-4 py-2 rounded font-semibold hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
                {...animations.buttonHover}
              >
                <X className="w-4 h-4" />
                Cancel
              </motion.button>
                              <motion.button
                  onClick={handleClaimUsername}
                  disabled={!newUsername.trim() || claiming || usernameAvailable !== true}
                  className="flex-1 bg-purple-600 text-white px-4 py-2 rounded font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  {...animations.buttonHover}
                >
                  <CheckCircle className="w-4 h-4" />
                  {claiming ? 'Claiming...' : 'Claim Username'}
                </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

    </main>
  )
} 