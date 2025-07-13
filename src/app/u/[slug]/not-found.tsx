'use client'

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import Footer from "@/components/Footer"
import { useParams } from "next/navigation"

export default function SlugNotFound() {
  const params = useParams()
  const username = params.slug as string
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          {...animations.fadeInUp}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
            {...animations.fadeInUpDelayed(0.1)}
          >
            @{username} hasn't been claimed yet
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto font-light leading-relaxed px-4"
            {...animations.fadeInUpDelayed(0.2)}
          >
            Create your free website today!
          </motion.p>
          <motion.div
            {...animations.fadeInUpDelayed(0.3)}
          >
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg hover:shadow-purple-500/25"
            >
              Start Creating
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </main>
  )
} 