'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { useAuth } from "@/lib/hooks/useAuth"
import EnterPlatformButton from "@/components/EnterPlatformButton"
import { LandingSkeleton } from "@/components/ui/landing-skeleton"
import { useState } from "react"
import HeroSection from '@/components/landing/HeroSection'
import FeaturesSection from '@/components/landing/FeaturesSection'
import PricingSection from '@/components/landing/PricingSection'
import BentoSection from '@/components/landing/BentoSection'
import FAQSection from '@/components/landing/FAQSection'
import CTACallToActionSection from '@/components/landing/CTACallToActionSection'

export default function Home() {
  const { user, loading } = useAuth()
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  
  const faqData = [
    {
      question: "What is CTHO.WORK?",
      answer: "CTHO.WORK is a comprehensive platform for creators to build their digital presence. We provide link-in-bio websites, content lockers, and a community where creators can connect, share resources, and grow together."
    },
    {
      question: "Is it really free to start?",
      answer: "Yes! Our free plan includes a basic link-in-bio website, up to 5 social links, basic analytics, and access to our creator community. You can upgrade to Pro anytime for advanced features."
    },
    {
      question: "What are content lockers?",
      answer: "Content lockers allow you to gate your exclusive content behind actions like follows, subscriptions, or custom requirements. This helps you monetize your content and grow your audience across platforms."
    },
    {
      question: "How do I join the creator community?",
      answer: "Simply sign up for free and you'll automatically get access to our community. Connect with other creators, share resources, and learn from successful creators who've been where you are."
    },
    {
      question: "What platforms do you support?",
      answer: "We support all major social media platforms including YouTube, TikTok, Instagram, Twitter, Discord, and more. Our link-in-bio websites work seamlessly across all platforms."
    }
  ]
  
  if (loading) {
    return <LandingSkeleton />
  }
  
  return (
    <main className="w-full bg-black text-white min-h-screen px-2 sm:px-4 md:px-6 lg:px-8">
      <Header />
      <HeroSection user={user} loading={loading} />
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-purple-700/20 to-transparent my-2 md:my-4" />
      <FeaturesSection />
      <PricingSection />
      <BentoSection />
      <FAQSection faqData={faqData} openFaq={openFaq} setOpenFaq={setOpenFaq} />
      <CTACallToActionSection />
      <Footer />
    </main>
  )
}
