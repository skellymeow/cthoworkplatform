'use client'

import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import Link from "next/link"
import { ArrowLeft, Home } from "lucide-react"
import Footer from "@/components/Footer"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          {...animations.fadeInUp}
        >
          <motion.h1 
            className="text-6xl sm:text-8xl md:text-9xl font-bold text-white mb-6"
            {...animations.fadeInUpDelayed(0.1)}
          >
            404
          </motion.h1>
          
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4"
            {...animations.fadeInUpDelayed(0.2)}
          >
            Page Not Found
          </motion.h2>
          
          <motion.p 
            className="text-gray-400 text-lg sm:text-xl mb-8 max-w-2xl mx-auto"
            {...animations.fadeInUpDelayed(0.3)}
          >
            The page you're looking for doesn't exist. Let's get you back to creating amazing Roblox communities.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            {...animations.fadeInUpDelayed(0.4)}
          >
            <motion.div {...animations.buttonHover}>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg hover:shadow-purple-500/25"
              >
                <Home className="w-5 h-5" />
                Go Home
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </main>
  )
} 