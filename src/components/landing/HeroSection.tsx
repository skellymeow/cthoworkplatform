import { motion } from "framer-motion"
import Link from "next/link"
import EnterPlatformButton from "@/components/EnterPlatformButton"
import Header from "@/components/Header"

interface HeroSectionProps {
  user: any
  loading: boolean
}

export default function HeroSection({ user, loading }: HeroSectionProps) {
  return (
    <section className="min-h-[85vh] flex items-center justify-center bg-black px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Where Successful
              <span className="text-purple-400 block">Creators Build</span>
              <span className="text-purple-400 block">Together</span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Grow your creator ecosystem with link-in-bio websites, content lockers, and exclusive resources.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {user ? (
                <EnterPlatformButton user={user} />
              ) : (
                <Link
                  href="/auth"
                  className="inline-flex items-center justify-center gap-3 bg-purple-600 text-white px-8 py-4 rounded-[3px] text-lg font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                >
                  <img src="/googlesvg.webp" alt="Google" className="w-6 h-6" />
                  Get started for free
                </Link>
              )}
            </motion.div>
          </motion.div>

          {/* Right Side - Social Media Logos */}
          <motion.div 
            className="flex flex-col items-center justify-center space-y-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div 
              className="text-center mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-xl lg:text-2xl font-semibold text-gray-300 mb-2">
                Trusted by creators on
              </h3>
              <p className="text-gray-400 text-base">
                All major platforms
              </p>
            </motion.div>

            {/* Social Media Logos - Optimized Grid */}
            <motion.div 
              className="grid grid-cols-3 gap-4 lg:gap-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {/* YouTube */}
              <motion.div 
                className="group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-red-600/20 border border-red-500/30 rounded-[3px] flex items-center justify-center group-hover:bg-red-600/30 transition-colors">
                  <img src="/icons8-youtube-100.png" alt="YouTube" className="w-8 h-8 lg:w-10 lg:h-10" />
                </div>
              </motion.div>

              {/* Discord */}
              <motion.div 
                className="group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-indigo-600/20 border border-indigo-500/30 rounded-[3px] flex items-center justify-center group-hover:bg-indigo-600/30 transition-colors">
                  <img src="/discord.png" alt="Discord" className="w-8 h-8 lg:w-10 lg:h-10" />
                </div>
              </motion.div>

              {/* TikTok */}
              <motion.div 
                className="group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-pink-600/20 border border-pink-500/30 rounded-[3px] flex items-center justify-center group-hover:bg-pink-600/30 transition-colors">
                  <img src="/icons8-tiktok-100.png" alt="TikTok" className="w-8 h-8 lg:w-10 lg:h-10" />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 