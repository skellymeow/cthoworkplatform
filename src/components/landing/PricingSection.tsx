import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import { Globe, Lock, BarChart3, MessageCircle, Headphones, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function PricingSection() {
  return (
    <section id="pricing" className="py-8 md:py-16 lg:py-20 bg-black px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-6 md:mb-12"
          {...animations.fadeInUpDelayed(0.1)}
        >
          <motion.h2 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-4"
            {...animations.fadeInUpDelayed(0.2)}
          >
            CTHO.WORK pricing
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light"
            {...animations.fadeInUpDelayed(0.3)}
          >
            Creating an account is 100% free!
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto"
          {...animations.fadeInUpDelayed(0.1)}
        >
          {/* Free Plan */}
          <motion.div 
            className="bg-zinc-950 border border-zinc-800 rounded-[3px] p-4 md:p-8 relative group hover:border-purple-500/50 transition-all duration-300"
            {...animations.hoverScale}
          >
            <div className="text-center">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Free</h3>
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-1">$0</div>
              <div className="text-gray-400 text-base md:text-lg mb-6 md:mb-8">Forever</div>
              
              <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8 text-left">
                <li className="flex items-center text-gray-300">
                  <Globe className="w-4 h-4 text-purple-400 mr-3" />
                  Basic link-in-bio website
                </li>
                <li className="flex items-center text-gray-300">
                  <Lock className="w-4 h-4 text-purple-400 mr-3" />
                  Up to 50 content lockers
                </li>
                <li className="flex items-center text-gray-300">
                  <BarChart3 className="w-4 h-4 text-green-400 mr-3" />
                  Basic analytics
                </li>
                <li className="flex items-center text-gray-300">
                  <MessageCircle className="w-4 h-4 text-orange-400 mr-3" />
                  Community access
                </li>
                <li className="flex items-center text-gray-300">
                  <Headphones className="w-4 h-4 text-gray-400 mr-3" />
                  Standard support
                </li>
              </ul>
              
              <Link
                href="/auth"
                className="w-full inline-flex items-center justify-center gap-3 bg-purple-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-[3px] text-base md:text-lg font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                <img src="/googlesvg.webp" alt="Google" className="w-6 h-6" />
                Get started for free
              </Link>
            </div>
          </motion.div>

          {/* Premium Pro Plan */}
          <motion.div 
            className="bg-zinc-950 border-2 border-purple-500 rounded-[3px] p-8 relative group hover:border-purple-400 transition-all duration-300"
            {...animations.hoverScale}
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">Premium Pro</span>
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Premium Pro</h3>
              <div className="text-4xl font-bold text-purple-400 mb-1">$400</div>
              <div className="text-gray-400 text-lg mb-8">one-time payment</div>
              
              <ul className="space-y-4 mb-8 text-left">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Coming Soon...
                </li>
                
              </ul>
              
              <Link
                href="/auth"
                className="w-full inline-flex items-center justify-center gap-3 bg-purple-600 text-white px-8 py-4 rounded-[3px] text-lg font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                <img src="/googlesvg.webp" alt="Google" className="w-6 h-6" />
                Get started for free
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 