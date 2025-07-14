'use client'

import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { ArrowLeft, Users, CheckCircle, Copy, ExternalLink, AlertTriangle, TrendingUp, Gift, Share2, BarChart3, Star, Zap } from "lucide-react"
import Footer from "@/components/Footer"
import Link from "next/link"
import { showToast } from "@/lib/utils"
import ConsistentHeader from "@/components/ui/consistent-header"

export default function Affiliates() {
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [affiliateProfile, setAffiliateProfile] = useState<any>(null)
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [currentProfile, setCurrentProfile] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()
  }, [supabase.auth])

  useEffect(() => {
    if (!user) return
    
    // Fetch affiliate profile
    supabase
      .from('affiliate_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()
      .then(({ data }) => {
        setAffiliateProfile(data)
        setHasAgreedToTerms(data?.has_agreed_to_terms || false)
      })

    // Fetch bio profile for username
    supabase
      .from('link_bio_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()
      .then(({ data }) => {
        setCurrentProfile(data)
      })
  }, [user])

  const handleAgreeToTerms = async () => {
    if (!user || !currentProfile) {
      showToast.error('You need a bio site username first')
      return
    }

    // Check if affiliate profile already exists
    const { data: existingProfile } = await supabase
      .from('affiliate_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    let error
    if (existingProfile) {
      // Update existing profile
      const { error: updateError } = await supabase
        .from('affiliate_profiles')
        .update({
          username: currentProfile.slug,
          has_agreed_to_terms: true
        })
        .eq('user_id', user.id)
      error = updateError
    } else {
      // Insert new profile
      const { error: insertError } = await supabase
        .from('affiliate_profiles')
        .insert({
          user_id: user.id,
          username: currentProfile.slug,
          has_agreed_to_terms: true
        })
      error = insertError
    }

    if (error) {
      console.error('Database error:', error)
      showToast.error('Failed to setup affiliate profile')
      return
    }

    setHasAgreedToTerms(true)
    setShowTerms(false)
    showToast.success('Affiliate profile created successfully!')
    
    // Refresh affiliate profile
    supabase
      .from('affiliate_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()
      .then(({ data }) => {
        setAffiliateProfile(data)
        setHasAgreedToTerms(data?.has_agreed_to_terms || false)
      })
  }

  const copyInviteLink = () => {
    if (!currentProfile) return
    const link = `${window.location.origin}/invite/${currentProfile.slug}`
    navigator.clipboard.writeText(link)
    showToast.success('Invite link copied to clipboard!')
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
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Affiliate Program" }
        ]}
        showBackButton={true}
        backHref="/dashboard"
        backLabel="Back to Dashboard"
      />

      {/* Main Content */}
      <motion.div 
        className="flex-1 w-full px-[1.5%] py-4 sm:py-8"
        {...animations.fadeInUp}
      >
        <div className="max-w-6xl mx-auto w-full">

          {/* Hero Section */}
          <motion.div 
            className="text-center mb-12"
            {...animations.fadeInUpDelayed(0.1)}
          >
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
              {...animations.fadeInUpDelayed(0.2)}
            >
              Affiliate Program
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light"
              {...animations.fadeInUpDelayed(0.3)}
            >
              Earn rewards by referring creators to CTHO.WORK. Build your network and grow together.
            </motion.p>
          </motion.div>

          {!currentProfile ? (
            <motion.div 
              className="bg-zinc-900 border border-zinc-800 rounded-[3px] shadow-lg p-8 text-center max-w-2xl mx-auto"
              {...animations.fadeInUpDelayed(0.4)}
            >
              <div className="w-16 h-16 bg-orange-500/20 border border-orange-500/30 rounded-[3px] flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-orange-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Username Required</h2>
              <p className="text-gray-400 mb-8 text-lg">
                You need to claim a username for your bio site before you can join the affiliate program.
              </p>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-[3px] text-lg font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                <Zap className="w-5 h-5" />
                Claim Username
              </Link>
            </motion.div>
          ) : !hasAgreedToTerms ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Benefits Section */}
              <motion.div 
                className="lg:col-span-2 space-y-6"
                {...animations.fadeInUpDelayed(0.4)}
              >
                <div className="bg-zinc-900 border border-zinc-800 rounded-[3px] shadow-lg p-8">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-purple-500/20 border border-purple-500/30 rounded-[3px] flex items-center justify-center mx-auto mb-6">
                      <Users className="w-8 h-8 text-purple-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">Join the Affiliate Program</h2>
                    <p className="text-gray-400 text-lg">
                      Start earning rewards by referring creators to CTHO.WORK
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-500/20 border border-green-500/30 rounded-[3px] flex items-center justify-center flex-shrink-0">
                        <Share2 className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">Unique Invite Links</h3>
                        <p className="text-gray-400 text-sm">Get personalized links to track your referrals</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-500/20 border border-blue-500/30 rounded-[3px] flex items-center justify-center flex-shrink-0">
                        <BarChart3 className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">Track Performance</h3>
                        <p className="text-gray-400 text-sm">Monitor your referrals and earnings</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-purple-500/20 border border-purple-500/30 rounded-[3px] flex items-center justify-center flex-shrink-0">
                        <Gift className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">Earn Rewards</h3>
                        <p className="text-gray-400 text-sm">Get rewards for successful referrals</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-orange-500/20 border border-orange-500/30 rounded-[3px] flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-5 h-5 text-orange-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">Grow Together</h3>
                        <p className="text-gray-400 text-sm">Build your creator network</p>
                      </div>
                    </div>
                  </div>
                  
                  <motion.button
                    onClick={() => setShowTerms(true)}
                    className="w-full bg-purple-600 text-white px-8 py-4 rounded-[3px] text-lg font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  >
                    <CheckCircle className="w-5 h-5 inline mr-2" />
                    Join Program
                  </motion.button>
                </div>
              </motion.div>

              {/* Stats Card */}
              <motion.div 
                className="space-y-6"
                {...animations.fadeInUpDelayed(0.5)}
              >
                <div className="bg-zinc-900 border border-zinc-800 rounded-[3px] shadow-lg p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Program Stats</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Active Affiliates</span>
                      <span className="text-white font-semibold">150+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Total Referrals</span>
                      <span className="text-white font-semibold">2,847</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Success Rate</span>
                      <span className="text-green-400 font-semibold">94%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-[3px] shadow-lg p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Top Performer</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500/20 border border-purple-500/30 rounded-[3px] flex items-center justify-center">
                      <Star className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">@skelly</p>
                      <p className="text-gray-400 text-sm">247 referrals</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Dashboard */}
              <motion.div 
                className="lg:col-span-2 space-y-6"
                {...animations.fadeInUpDelayed(0.4)}
              >
                <div className="bg-zinc-900 border border-zinc-800 rounded-[3px] shadow-lg p-8">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-purple-500/20 border border-purple-500/30 rounded-[3px] flex items-center justify-center mx-auto mb-6">
                      <Users className="w-8 h-8 text-purple-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">Your Affiliate Dashboard</h2>
                    <p className="text-gray-400 text-lg">
                      Share your invite link and track your referrals
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-zinc-800 border border-zinc-700 rounded-[3px] p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Your Invite Link</h3>
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          value={`${window.location.origin}/invite/${currentProfile.slug}`}
                          readOnly
                          className="flex-1 bg-zinc-700 border border-zinc-600 rounded-[3px] px-4 py-3 text-white text-sm font-mono"
                        />
                        <motion.button
                          onClick={copyInviteLink}
                          className="bg-purple-600 text-white px-6 py-3 rounded-[3px] font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                        >
                          <Copy className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                    
                    <div className="bg-zinc-800 border border-zinc-700 rounded-[3px] p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">How it Works</h3>
                      <div className="space-y-3 text-gray-300">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-purple-400 text-xs font-bold">1</span>
                          </div>
                          <p>Share your invite link with other creators</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-purple-400 text-xs font-bold">2</span>
                          </div>
                          <p>When they sign up using your link, you'll be credited</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-purple-400 text-xs font-bold">3</span>
                          </div>
                          <p>Track your referrals and earnings in your dashboard</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Stats Sidebar */}
              <motion.div 
                className="space-y-6"
                {...animations.fadeInUpDelayed(0.5)}
              >
                <div className="bg-zinc-900 border border-zinc-800 rounded-[3px] shadow-lg p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Your Stats</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Total Referrals</span>
                      <span className="text-white font-semibold">0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Successful Signups</span>
                      <span className="text-white font-semibold">0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Earnings</span>
                      <span className="text-green-400 font-semibold">$0</span>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-[3px] shadow-lg p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full bg-zinc-800 border border-zinc-700 rounded-[3px] px-4 py-3 text-left hover:bg-zinc-700 transition-colors">
                      <div className="flex items-center gap-3">
                        <Share2 className="w-4 h-4 text-purple-400" />
                        <span className="text-white text-sm">Share on Social</span>
                      </div>
                    </button>
                    <button className="w-full bg-zinc-800 border border-zinc-700 rounded-[3px] px-4 py-3 text-left hover:bg-zinc-700 transition-colors">
                      <div className="flex items-center gap-3">
                        <BarChart3 className="w-4 h-4 text-blue-400" />
                        <span className="text-white text-sm">View Analytics</span>
                      </div>
                    </button>
                    <button className="w-full bg-zinc-800 border border-zinc-700 rounded-[3px] px-4 py-3 text-left hover:bg-zinc-700 transition-colors">
                      <div className="flex items-center gap-3">
                        <Gift className="w-4 h-4 text-green-400" />
                        <span className="text-white text-sm">Claim Rewards</span>
                      </div>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>
      
      <Footer />
    </main>
  )
} 