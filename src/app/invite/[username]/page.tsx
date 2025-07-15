'use client'

import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { ArrowRight, Users, TrendingUp, Gamepad2, Star, MessageCircle, Trophy, Zap, Link as LinkIcon, Lock, Network, Target, ArrowDown } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/hooks/useAuth"
import EnterPlatformButton from "@/components/EnterPlatformButton"
import Header from "@/components/Header"

export default function InvitePage({ params }: { params: { username: string } }) {
  const { user, loading } = useAuth()
  const [referrer, setReferrer] = useState<any>(null)
  const [loadingReferrer, setLoadingReferrer] = useState(true)

  useEffect(() => {
    const fetchReferrer = async () => {
      const supabase = createClient()
      
      // Fetch affiliate profile
      const { data: affiliateProfile } = await supabase
        .from('affiliate_profiles')
        .select('*')
        .eq('username', params.username)
        .single()

      if (affiliateProfile) {
        // Fetch user profile for avatar and name
        const { data: userProfile } = await supabase.auth.admin.getUserById(affiliateProfile.user_id)
        setReferrer({
          ...affiliateProfile,
          user: userProfile?.user
        })
      }
      
      setLoadingReferrer(false)
    }

    fetchReferrer()
  }, [params.username])

  // Track referral when user signs up
  useEffect(() => {
    if (user && referrer && !loading) {
      const trackReferral = async () => {
        try {
          await fetch('/api/track-referral', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              referrerUsername: referrer.username,
              userEmail: user.email
            })
          })
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.error('Error tracking referral:', error)
          }
          // Continue without tracking referral if it fails
        }
      }
      
      trackReferral()
    }
  }, [user, referrer, loading])

  if (loadingReferrer) {
    return (
      <main className="w-full bg-black text-white min-h-screen flex items-center justify-center">
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

  if (!referrer) {
    return (
      <main className="w-full bg-black text-white min-h-screen flex items-center justify-center">
        <motion.div 
          className="text-center"
          {...animations.fadeInUp}
        >
          <p className="text-gray-400 mb-4">Invalid invite link</p>
          <Link
            href="/"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Go Home
          </Link>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="w-full bg-black text-white min-h-screen">
      <Header />
      
      {/* First Fold - Hero with Referrer */}
      <section className="min-h-screen flex items-center justify-center bg-black px-4 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto w-full text-center">
          {/* Referrer Card */}
          <motion.div 
            className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 mb-12 max-w-md mx-auto"
            {...animations.fadeInUpDelayed(0.1)}
          >
            <div className="flex items-center justify-center gap-4">
              {referrer.user?.user_metadata?.avatar_url ? (
                <img 
                  src={referrer.user.user_metadata.avatar_url} 
                  alt="Profile" 
                  className="w-16 h-16 rounded-full border-2 border-purple-500"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center border-2 border-purple-500">
                  <Users className="w-8 h-8 text-white" />
                </div>
              )}
              <div className="text-left">
                <h3 className="text-xl font-bold text-white">
                  @{referrer.username}
                </h3>
                <p className="text-gray-400">
                  has invited you to join CTHO.WORK
                </p>
              </div>
            </div>
          </motion.div>

          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            {...animations.fadeInUpDelayed(0.2)}
          >
            Help and support the creator,
            <span className="text-purple-300 block">build and create</span>
            <span className="text-purple-300 block">your link</span>
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto font-light leading-relaxed"
            {...animations.fadeInUpDelayed(0.3)}
          >
            Join the platform that @{referrer.username} trusts. Create your link-in-bio website, content lockers, and grow your creator ecosystem.
          </motion.p>
          <motion.div
            className="flex justify-center items-center"
            {...animations.fadeInUpDelayed(0.4)}
          >
            {user ? (
              <div className="flex justify-center">
                <EnterPlatformButton user={user} />
              </div>
            ) : (
              <Link
                href="/auth"
                className="inline-flex items-center gap-4 bg-purple-600 text-white px-10 py-5 rounded-xl text-xl font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:shadow-2xl"
                style={{ boxShadow: '0 0 20px rgba(147, 51, 234, 0.01)' }}
              >
                <img src="/googlesvg.webp" alt="Google" className="w-6 h-6" />
                Get started for free
              </Link>
            )}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
            className="mt-16"
            {...animations.fadeInUpDelayed(0.5)}
          >
            <ArrowDown className="w-6 h-6 text-gray-400 mx-auto animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Second Fold - Features & Second CTA */}
      <section className="min-h-screen flex items-center justify-center bg-black px-4 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div 
            className="text-center mb-16"
            {...animations.fadeInUpDelayed(0.1)}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
              {...animations.fadeInUpDelayed(0.2)}
            >
              Everything You Need to Scale
            </motion.h2>
            <motion.p 
              className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto font-light"
              {...animations.fadeInUpDelayed(0.3)}
            >
              Remove the guesswork. Learn from proven creators and build your ecosystem.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            {...animations.fadeInUpDelayed(0.4)}
          >
            {/* Feature 1 - Link in Bio */}
            <motion.div 
              className="text-center group p-6"
              {...animations.hoverScale}
            >
              <motion.div 
                className="bg-gray-900/50 border border-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-800/50 transition-colors"
                {...animations.iconHover}
              >
                <LinkIcon className="w-8 h-8 text-purple-300" />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-4">Link-in-Bio Websites</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                Create professional link-in-bio pages that convert. Custom domains, analytics, and seamless integration.
              </p>
            </motion.div>

            {/* Feature 2 - Content Lockers */}
            <motion.div 
              className="text-center group p-6"
              {...animations.hoverScale}
            >
              <motion.div 
                className="bg-gray-900/50 border border-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-800/50 transition-colors"
                {...animations.iconHover}
              >
                <Lock className="w-8 h-8 text-green-300" />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-4">Content Lockers</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                Monetize your exclusive content with smart gating. Require follows, subscriptions, or custom actions.
              </p>
            </motion.div>

            {/* Feature 3 - Creator Engagement */}
            <motion.div 
              className="text-center group p-6"
              {...animations.hoverScale}
            >
              <motion.div 
                className="bg-gray-900/50 border border-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-800/50 transition-colors"
                {...animations.iconHover}
              >
                <Target className="w-8 h-8 text-blue-300" />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-4">Creator Engagement</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                Boost your community engagement with proven strategies. Learn from successful creators.
              </p>
            </motion.div>
          </motion.div>

          {/* Second CTA */}
          <motion.div 
            className="flex flex-col items-center justify-center"
            {...animations.fadeInUpDelayed(0.5)}
          >
            <motion.h3 
              className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center"
              {...animations.fadeInUpDelayed(0.6)}
            >
              Ready to join @{referrer.username}?
            </motion.h3>
            <motion.p 
              className="text-gray-400 mb-8 max-w-lg mx-auto text-center"
              {...animations.fadeInUpDelayed(0.7)}
            >
              Start building your creator ecosystem today. It's free to get started.
            </motion.p>
            <motion.div
              className="flex justify-center items-center"
              {...animations.fadeInUpDelayed(0.8)}
            >
              {user ? (
                <div className="flex justify-center">
                  <EnterPlatformButton user={user} />
                </div>
              ) : (
                <Link
                  href="/auth"
                  className="inline-flex items-center gap-4 bg-purple-600 text-white px-10 py-5 rounded-xl text-xl font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:shadow-2xl"
                  style={{ boxShadow: '0 0 20px rgba(147, 51, 234, 0.01)' }}
                >
                  <img src="/googlesvg.webp" alt="Google" className="w-6 h-6" />
                  Get started for free
                </Link>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
} 