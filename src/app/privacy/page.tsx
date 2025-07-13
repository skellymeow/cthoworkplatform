'use client'

import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Footer from "@/components/Footer"

export default function Privacy() {
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
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-400 text-lg">
              How we protect and handle your data
            </p>
          </motion.div>

          {/* Content */}
          <motion.div 
            className="space-y-8"
            {...animations.fadeInUpDelayed(0.2)}
          >
            <motion.div {...animations.fadeInUpDelayed(0.3)}>
              <h2 className="text-xl font-bold text-white mb-3">1. Data Collection</h2>
              <p className="text-gray-400 leading-relaxed">
                We collect only your Roblox username, game statistics, and community interaction data. No personal information beyond platform functionality.
              </p>
            </motion.div>

            <motion.div {...animations.fadeInUpDelayed(0.4)}>
              <h2 className="text-xl font-bold text-white mb-3">2. Data Security</h2>
              <p className="text-gray-400 leading-relaxed">
                Your data is encrypted in transit and at rest using industry-standard security measures with regular audits.
              </p>
            </motion.div>

            <motion.div {...animations.fadeInUpDelayed(0.5)}>
              <h2 className="text-xl font-bold text-white mb-3">3. Data Usage</h2>
              <p className="text-gray-400 leading-relaxed">
                We use your data for analytics and community tools only. We never sell your data to third parties.
              </p>
            </motion.div>

            <motion.div {...animations.fadeInUpDelayed(0.6)}>
              <h2 className="text-xl font-bold text-white mb-3">4. Community Data</h2>
              <p className="text-gray-400 leading-relaxed">
                Community data is shared only with authorized members. Leaders control data visibility and permissions.
              </p>
            </motion.div>

            <motion.div {...animations.fadeInUpDelayed(0.7)}>
              <h2 className="text-xl font-bold text-white mb-3">5. Data Retention</h2>
              <p className="text-gray-400 leading-relaxed">
                We retain data while your account is active. You can request deletion anytime. Inactive accounts cleaned after 12 months.
              </p>
            </motion.div>

            <motion.div {...animations.fadeInUpDelayed(0.8)}>
              <h2 className="text-xl font-bold text-white mb-3">6. Your Rights</h2>
              <p className="text-gray-400 leading-relaxed">
                You have the right to access, modify, or delete your data at any time through your account settings.
              </p>
            </motion.div>

            <motion.div {...animations.fadeInUpDelayed(0.9)}>
              <h2 className="text-xl font-bold text-white mb-3">7. Contact Us</h2>
              <p className="text-gray-400 leading-relaxed">
                Questions about privacy? Email us at privacy@cthowork.com for immediate assistance.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
      
      <Footer />
    </>
  )
} 