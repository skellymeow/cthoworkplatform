'use client'

import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import { createClient } from "@/lib/supabase/client"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Footer from "@/components/Footer"
import { useAuth } from "@/lib/hooks/useAuth"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Auth() {
  const supabase = createClient()
  const { user, loading } = useAuth()
  const router = useRouter()

  // Auto-redirect logged in users to dashboard
  useEffect(() => {
    if (user && !loading) {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div 
          className="text-center"
          {...animations.fadeInUp}
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </motion.div>
      </main>
    )
  }

  // If user is logged in, show loading while redirecting
  if (user) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div 
          className="text-center"
          {...animations.fadeInUp}
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Redirecting to dashboard...</p>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div 
          className="max-w-md w-full"
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
            
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
              Sign In
            </h1>
            <p className="text-gray-400 text-center">
              Sign in with your Google account
            </p>
          </motion.div>

          <motion.div 
            className="space-y-4"
            {...animations.fadeInUpDelayed(0.2)}
          >
            <motion.button
              onClick={handleGoogleSignIn}
              className="w-full bg-white text-black px-6 py-4 rounded-[3px] font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-3"
              {...animations.buttonHover}
            >
              <Image src="/googlesvg.webp" alt="Google" className="w-5 h-5" width={20} height={20} />
              Continue with Google
            </motion.button>
            
            <motion.p 
              className="text-xs text-gray-500 text-center mt-4"
              {...animations.fadeInUpDelayed(0.3)}
            >
              By signing up, you agree to our{' '}
              <Link href="/terms" className="text-purple-400 hover:text-purple-300 underline">
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-purple-400 hover:text-purple-300 underline">
                Privacy Policy
              </Link>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </main>
  )
} 