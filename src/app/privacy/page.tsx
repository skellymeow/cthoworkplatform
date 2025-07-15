'use client'

import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import Footer from "@/components/Footer"

export default function Privacy() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <motion.div 
        className="flex-1 w-full px-[1.5%] py-4 sm:py-8"
        {...animations.fadeInUp}
      >
        <div className="max-w-4xl mx-auto w-full">
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8"
            {...animations.fadeInUpDelayed(0.1)}
          >
            Privacy Policy
          </motion.h1>
          
          <motion.div 
            className="prose prose-invert max-w-none"
            {...animations.fadeInUpDelayed(0.2)}
          >
            <p className="text-gray-400 mb-6">
              Last updated: December 2024
            </p>
            
            <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
            <p className="text-gray-300 mb-6">
              We collect information you provide directly to us, such as when you create an account, 
              update your profile, or contact us for support. This may include your name, email address, 
              and any other information you choose to provide.
            </p>
            
            <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
            <p className="text-gray-300 mb-6">
              We use the information we collect to provide, maintain, and improve our services, 
              to communicate with you, and to develop new features and functionality.
            </p>
            
            <h2 className="text-2xl font-bold text-white mb-4">Information Sharing</h2>
            <p className="text-gray-300 mb-6">
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except as described in this policy or as required by law.
            </p>
            
            <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
            <p className="text-gray-300 mb-6">
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction.
            </p>
            
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-gray-300 mb-6">
              If you have any questions about this Privacy Policy, please contact us at privacy@cthowork.com.
            </p>
          </motion.div>
        </div>
      </motion.div>
      
      <Footer />
    </main>
  )
} 