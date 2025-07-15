'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, Check, AlertCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface NewsletterFormProps {
  profileId: string
  theme: {
    cardBackground: string;
    cardBorder: string;
    text: string;
    accent: string;
    linkBackground: string;
    linkBorder: string;
    linkHoverBackground: string;
    linkHoverBorder: string;
  };
}

export default function NewsletterForm({ profileId, theme }: NewsletterFormProps) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [shouldHide, setShouldHide] = useState(false)

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setShouldHide(true)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isSubmitted])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName.trim() || !email.trim() || !consent) {
      setError('Please fill in all fields and accept the terms')
      return
    }
    setIsSubmitting(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({
        profile_id: profileId,
        full_name: fullName.trim(),
        email: email.trim(),
        consent_given: consent
      })
    if (error) {
      setError('Failed to subscribe. Please try again.')
      setIsSubmitting(false)
    } else {
      setIsSubmitted(true)
      setFullName('')
      setEmail('')
      setConsent(false)
      setIsSubmitting(false)
    }
  }

  if (shouldHide) return null

  if (isSubmitted) {
    return (
      <motion.div 
        className={`${theme.cardBackground} ${theme.cardBorder} border rounded-lg p-6 text-center`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Check className="w-5 h-5 text-green-400" />
          <span className={`text-lg font-semibold ${theme.text}`}>Subscribed!</span>
        </div>
        <p className={`text-sm ${theme.text} opacity-80`}>
          Thank you for subscribing to our newsletter.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className={`${theme.cardBackground} ${theme.cardBorder} border rounded-lg p-6`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Mail className={`w-5 h-5 ${theme.accent}`} />
        <h3 className={`text-lg font-semibold ${theme.text}`}>Newsletter</h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className={`w-full ${theme.linkBackground} ${theme.linkBorder} border rounded-lg px-4 py-3 ${theme.text} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500`}
            required
          />
        </div>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className={`w-full ${theme.linkBackground} ${theme.linkBorder} border rounded-lg px-4 py-3 ${theme.text} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500`}
            required
          />
        </div>
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
            required
          />
          <label htmlFor="consent" className={`text-sm ${theme.text} opacity-80`}>
            I consent to receive email updates and newsletters from this creator.
          </label>
        </div>
        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full ${theme.linkBackground} ${theme.linkBorder} border rounded-lg px-4 py-3 ${theme.text} font-medium ${theme.linkHoverBackground} ${theme.linkHoverBorder} transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
    </motion.div>
  )
}