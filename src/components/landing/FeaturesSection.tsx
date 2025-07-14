import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import { Link as LinkIcon, Lock, Target, Network } from "lucide-react"

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 lg:py-20 bg-black px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          {...animations.fadeInUpDelayed(0.1)}
        >
          <motion.h2 
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4"
            {...animations.fadeInUpDelayed(0.2)}
          >
            Everything You Need to Scale
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light"
            {...animations.fadeInUpDelayed(0.3)}
          >
            Remove the guesswork. Learn from proven creators and build your ecosystem.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
          {...animations.fadeInUpDelayed(0.1)}
        >
          {/* Feature 1 - Link in Bio */}
          <motion.div 
            className="text-center group p-6"
            {...animations.hoverScale}
          >
            <motion.div 
              className="bg-zinc-950 border border-zinc-800 w-16 h-16 rounded-[3px] flex items-center justify-center mx-auto mb-6 group-hover:bg-zinc-900 transition-colors shadow-[0_0_16px_0_rgba(128,0,255,0.10)]"
              {...animations.iconHover}
            >
              <LinkIcon className="w-8 h-8 text-purple-400" />
            </motion.div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-3">Link-in-Bio Websites</h3>
            <p className="text-gray-400 text-base lg:text-lg leading-relaxed font-light">
              Create professional link-in-bio pages that convert. Custom domains, analytics, and seamless integration with all your social platforms.
            </p>
          </motion.div>

          {/* Feature 2 - Content Lockers */}
          <motion.div 
            className="text-center group p-6"
            {...animations.hoverScale}
          >
            <motion.div 
              className="bg-zinc-950 border border-zinc-800 w-16 h-16 rounded-[3px] flex items-center justify-center mx-auto mb-6 group-hover:bg-zinc-900 transition-colors"
              {...animations.iconHover}
            >
              <Lock className="w-8 h-8 text-green-400" />
            </motion.div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-3">Content Lockers</h3>
            <p className="text-gray-400 text-base lg:text-lg leading-relaxed font-light">
              Monetize your exclusive content with smart gating. Require follows, subscriptions, or custom actions to unlock premium resources.
            </p>
          </motion.div>

          {/* Feature 3 - Creator Engagement */}
          <motion.div 
            className="text-center group p-6"
            {...animations.hoverScale}
          >
            <motion.div 
              className="bg-zinc-950 border border-zinc-800 w-16 h-16 rounded-[3px] flex items-center justify-center mx-auto mb-6 group-hover:bg-zinc-900 transition-colors"
              {...animations.iconHover}
            >
              <Target className="w-8 h-8 text-blue-400" />
            </motion.div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-3">Creator Engagement</h3>
            <p className="text-gray-400 text-base lg:text-lg leading-relaxed font-light">
              Boost your community engagement with proven strategies. Learn from successful creators and implement tactics that actually work.
            </p>
          </motion.div>

          {/* Feature 4 - Networking */}
          <motion.div 
            className="text-center group p-6"
            {...animations.hoverScale}
          >
            <motion.div 
              className="bg-zinc-950 border border-zinc-800 w-16 h-16 rounded-[3px] flex items-center justify-center mx-auto mb-6 group-hover:bg-zinc-900 transition-colors"
              {...animations.iconHover}
            >
              <Network className="w-8 h-8 text-orange-400" />
            </motion.div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-3">Creator Networking</h3>
            <p className="text-gray-400 text-base lg:text-lg leading-relaxed font-light">
              Connect with like-minded creators, share resources, and collaborate on projects. Build relationships that accelerate your growth.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 