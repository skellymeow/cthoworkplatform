'use client'

import { ArrowRight, Users, TrendingUp, Gamepad2, Star, MessageCircle, Trophy, Zap } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import Footer from "@/components/Footer"
import { useAuth } from "@/lib/hooks/useAuth"
import EnterPlatformButton from "@/components/EnterPlatformButton"

export default function Home() {
  const { user, loading } = useAuth()
  return (
    <main className="w-full bg-black text-white min-h-screen">
      {/* Hero Section - Mobile First */}
      <section className="min-h-[85vh] flex items-center justify-center bg-black px-4 py-12 sm:py-20">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          {...animations.fadeInUp}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight"
            {...animations.fadeInUpDelayed(0.1)}
          >
            Engage Your
            <span className="text-purple-300 block">Roblox Community</span>
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto font-light leading-relaxed px-4"
            {...animations.fadeInUpDelayed(0.2)}
          >
            The ultimate platform for Roblox creators to connect with their audience, boost engagement, and grow their
            community like never before.
          </motion.p>
          <motion.div
            {...animations.fadeInUpDelayed(0.3)}
          >
            {user ? (
              <EnterPlatformButton user={user} />
            ) : (
              <Link
                href="/auth"
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg hover:shadow-purple-500/25"
              >
                Start Creating
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section - Mobile First Grid */}
      <section className="min-h-screen flex items-center justify-center bg-black px-4 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">Built for Roblox Creators</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light px-4">
              Everything you need to engage your community and grow your Roblox presence
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-12"
            {...animations.fadeInUpDelayed(0.1)}
          >
            {/* Feature 1 */}
            <motion.div 
              className="text-center group p-4 sm:p-6"
              {...animations.hoverScale}
            >
              <motion.div 
                className="bg-gray-900/50 border border-gray-800 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-gray-800/50 transition-colors"
                {...animations.iconHover}
              >
                <Users className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-purple-300" />
              </motion.div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4">Community Management</h3>
              <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed font-light">
                Manage your Roblox community with powerful tools. Track engagement, moderate discussions, and build
                stronger connections.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              className="text-center group p-4 sm:p-6"
              {...animations.hoverScale}
            >
              <motion.div 
                className="bg-gray-900/50 border border-gray-800 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-gray-800/50 transition-colors"
                {...animations.iconHover}
              >
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-green-300" />
              </motion.div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4">Analytics & Insights</h3>
              <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed font-light">
                Deep analytics on your Roblox games and community. Track player behavior, engagement metrics, and growth
                trends.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              className="text-center group p-4 sm:p-6"
              {...animations.hoverScale}
            >
              <motion.div 
                className="bg-gray-900/50 border border-gray-800 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-gray-800/50 transition-colors"
                {...animations.iconHover}
              >
                <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-300" />
              </motion.div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4">Game Integration</h3>
              <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed font-light">
                Seamlessly integrate with your Roblox games. Real-time player data, in-game events, and community
                features.
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div 
              className="text-center group p-4 sm:p-6"
              {...animations.hoverScale}
            >
              <motion.div 
                className="bg-gray-900/50 border border-gray-800 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-gray-800/50 transition-colors"
                {...animations.iconHover}
              >
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-orange-300" />
              </motion.div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4">Automated Engagement</h3>
              <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed font-light">
                Smart automation tools to keep your community active. Scheduled events, rewards, and personalized
                interactions.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Success Stories Section - Mobile First */}
      <section className="min-h-[85vh] flex items-center justify-center bg-black px-4 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              Trusted by Top Roblox Creators
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 font-light px-4">
              Join thousands of successful creators already growing their communities
            </p>
          </div>

          {/* Stats Grid - Mobile First */}
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16"
            {...animations.fadeInUpDelayed(0.1)}
          >
            <motion.div 
              className="text-center"
              {...animations.hoverScaleLarge}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-purple-300 mb-1 sm:mb-2">50K+</div>
              <div className="text-gray-400 font-light text-xs sm:text-sm lg:text-base">Active Creators</div>
            </motion.div>
            <motion.div 
              className="text-center"
              {...animations.hoverScaleLarge}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-green-300 mb-1 sm:mb-2">2M+</div>
              <div className="text-gray-400 font-light text-xs sm:text-sm lg:text-base">Community Members</div>
            </motion.div>
            <motion.div 
              className="text-center"
              {...animations.hoverScaleLarge}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-300 mb-1 sm:mb-2">100M+</div>
              <div className="text-gray-400 font-light text-xs sm:text-sm lg:text-base">Game Visits Tracked</div>
            </motion.div>
            <motion.div 
              className="text-center"
              {...animations.hoverScaleLarge}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-orange-300 mb-1 sm:mb-2">99.9%</div>
              <div className="text-gray-400 font-light text-xs sm:text-sm lg:text-base">Uptime</div>
            </motion.div>
          </motion.div>

          {/* Testimonials - Mobile First */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
            <div className="bg-black border border-zinc-800 p-4 sm:p-6 rounded-lg">
              <div className="flex items-center mb-3 sm:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-yellow-300 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-3 sm:mb-4 font-light text-xs sm:text-sm lg:text-base leading-relaxed">
                "This platform transformed how I engage with my 500K+ Roblox community. The analytics are incredible!"
              </p>
              <div className="flex items-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-purple-600 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                  <Trophy className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold text-xs sm:text-sm lg:text-base">@RobloxDev_Pro</div>
                  <div className="text-gray-400 text-xs sm:text-xs lg:text-sm">Top Developer</div>
                </div>
              </div>
            </div>

            <div className="bg-black border border-zinc-800 p-4 sm:p-6 rounded-lg">
              <div className="flex items-center mb-3 sm:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-yellow-300 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-3 sm:mb-4 font-light text-xs sm:text-sm lg:text-base leading-relaxed">
                "My game's engagement increased by 300% after using their community tools. Absolutely game-changing!"
              </p>
              <div className="flex items-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-green-600 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                  <Gamepad2 className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold text-xs sm:text-sm lg:text-base">@MegaBuilder_YT</div>
                  <div className="text-gray-400 text-xs sm:text-xs lg:text-sm">Content Creator</div>
                </div>
              </div>
            </div>

            <div className="bg-black border border-zinc-800 p-4 sm:p-6 rounded-lg md:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-3 sm:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-yellow-300 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-3 sm:mb-4 font-light text-xs sm:text-sm lg:text-base leading-relaxed">
                "The automation features saved me hours every day. Now I can focus on creating amazing games!"
              </p>
              <div className="flex items-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-blue-600 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                  <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold text-xs sm:text-sm lg:text-base">@StudioMaster</div>
                  <div className="text-gray-400 text-xs sm:text-xs lg:text-sm">Game Studio</div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <motion.div 
            className="text-center"
            {...animations.fadeInUpDelayed(0.4)}
          >
            <motion.div
              {...animations.buttonHover}
            >
              <Link
                href="/auth"
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg hover:shadow-purple-500/25"
              >
                Join the Community
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
