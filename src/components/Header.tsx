'use client'

import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import { useAuth } from "@/lib/hooks/useAuth"
import EnterPlatformButton from "@/components/EnterPlatformButton"
import Link from "next/link"

export default function Header() {
  const { user, loading } = useAuth()
  
  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-zinc-800 text-white">
      <div className="py-4 px-6">
        <motion.div 
          className="max-w-7xl mx-auto flex items-center justify-between"
          {...animations.fadeInUp}
        >
          {/* Logo - Top Left Aligned */}
          <motion.div 
            className="text-left"
            {...animations.fadeInUpDelayed(0.1)}
          >
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold tracking-tight">
              CTHO<span className="text-purple-500 rounded-[2px]">.</span>WORK
            </h1>
          </motion.div>

          {/* Navigation Links - Center */}
          <motion.div 
            className="hidden md:flex items-center space-x-8"
            {...animations.fadeInUpDelayed(0.15)}
          >
            <Link 
              href="#features" 
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Features
            </Link>
            <Link 
              href="#pricing" 
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Pricing
            </Link>
            <Link 
              href="#faq" 
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              FAQ
            </Link>
          </motion.div>

          {/* CTA Button - Top Right */}
          <motion.div
            {...animations.fadeInUpDelayed(0.2)}
          >
            {!loading && (
              user ? (
                <EnterPlatformButton user={user} />
              ) : (
                <Link
                  href="/auth"
                  className="inline-flex items-center gap-3 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-purple-500/25"
                >
                  <img src="/googlesvg.webp" alt="Google" className="w-5 h-5" />
                  Get started for free
                </Link>
              )
            )}
          </motion.div>
        </motion.div>
      </div>
    </header>
  )
} 