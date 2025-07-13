'use client'

import { motion } from "framer-motion"
import { animations } from "@/lib/animations"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-20 px-6">
      <motion.div 
        className="max-w-7xl mx-auto"
        {...animations.fadeInUp}
      >
        {/* Main Logo */}
        <motion.div 
          className="text-center mb-12"
          {...animations.fadeInUpDelayed(0.1)}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight">
            CTHO<span className="text-purple-500 rounded-[2px]">.</span>WORK
          </h1>
        </motion.div>

        {/* Privacy and Terms Links */}
        <motion.div 
          className="flex justify-center space-x-12"
          {...animations.fadeInUpDelayed(0.2)}
        >
          <motion.a 
            href="/privacy" 
            className="text-gray-400 hover:text-white transition-colors text-lg font-medium"
            {...animations.hoverScale}
          >
            Privacy
          </motion.a>
          <motion.a 
            href="/terms" 
            className="text-gray-400 hover:text-white transition-colors text-lg font-medium"
            {...animations.hoverScale}
          >
            Terms
          </motion.a>
        </motion.div>
      </motion.div>
    </footer>
  )
} 