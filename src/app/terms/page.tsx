'use client'

import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Footer from "@/components/Footer"

export default function Terms() {
  return (
    <>
      <main className="min-h-screen bg-black text-white">
        {/* Header */}
        <motion.div 
          className="max-w-4xl mx-auto px-6 py-12"
          {...animations.fadeInUp}
        >
          <motion.div 
            className="mb-8"
            {...animations.fadeInUpDelayed(0.1)}
          >
            <motion.div {...animations.buttonHover}>
              <Link 
                href="/"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </motion.div>
            
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4"
              {...animations.fadeInUpDelayed(0.2)}
            >
              Terms of Service
            </motion.h1>
            <motion.p 
              className="text-gray-400 text-lg"
              {...animations.fadeInUpDelayed(0.3)}
            >
              Our terms and conditions for using CTHO.WORK
            </motion.p>
          </motion.div>

          {/* Content */}
          <motion.div 
            className="space-y-8"
            {...animations.fadeInUpDelayed(0.2)}
          >
            <motion.div {...animations.fadeInUpDelayed(0.3)}>
              <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-400 leading-relaxed">
                By using CTHO.WORK, you accept and agree to be bound by these terms. If you don't agree, don't use our service.
              </p>
            </motion.div>

            <motion.div {...animations.fadeInUpDelayed(0.4)}>
              <h2 className="text-xl font-bold text-white mb-3">2. Use License</h2>
              <p className="text-gray-400 leading-relaxed">
                You may use CTHO.WORK for personal, non-commercial purposes only. No commercial use or modification allowed.
              </p>
            </motion.div>

            <motion.div {...animations.fadeInUpDelayed(0.5)}>
              <h2 className="text-xl font-bold text-white mb-3">3. Prohibited Uses</h2>
              <p className="text-gray-400 leading-relaxed">
                You may not use our service for any unlawful purpose or to solicit others to perform unlawful acts.
              </p>
            </motion.div>

            <motion.div {...animations.fadeInUpDelayed(0.6)}>
              <h2 className="text-xl font-bold text-white mb-3">4. User Responsibilities</h2>
              <p className="text-gray-400 leading-relaxed">
                You are responsible for maintaining your account security and all activities under your account.
              </p>
            </motion.div>

            <motion.div {...animations.fadeInUpDelayed(0.7)}>
              <h2 className="text-xl font-bold text-white mb-3">5. Intellectual Property</h2>
              <p className="text-gray-400 leading-relaxed">
                CTHO.WORK and its content remain our exclusive property, protected by copyright and trademark laws.
              </p>
            </motion.div>

            <motion.div {...animations.fadeInUpDelayed(0.8)}>
              <h2 className="text-xl font-bold text-white mb-3">6. Termination</h2>
              <p className="text-gray-400 leading-relaxed">
                We may terminate your account immediately without notice for any reason at our sole discretion.
              </p>
            </motion.div>

            <motion.div {...animations.fadeInUpDelayed(0.9)}>
              <h2 className="text-xl font-bold text-white mb-3">7. Contact Us</h2>
              <p className="text-gray-400 leading-relaxed">
                Questions about terms? Email us at legal@cthowork.com for immediate assistance.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
      
      <Footer />
    </>
  )
} 