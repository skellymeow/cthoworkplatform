'use client'

import HeroSection from "@/components/landing/HeroSection"
import BentoSection from "@/components/landing/BentoSection"
import FeaturesSection from "@/components/landing/FeaturesSection"
import PricingSection from "@/components/landing/PricingSection"
import FAQSection from "@/components/landing/FAQSection"
import CTACallToActionSection from "@/components/landing/CTACallToActionSection"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { useAuth } from "@/lib/hooks/useAuth"
import { useState } from "react"

const faqData = [
  {
    question: "What is CTHO.WORK?",
    answer: "CTHO.WORK is a platform for creators to build link-in-bio websites, content lockers, and grow their creator ecosystem."
  },
  {
    question: "How do I create a content locker?",
    answer: "Sign up, go to your dashboard, and use the content lockers section to create and manage your lockers."
  },
  {
    question: "Can I use my own domain?",
    answer: "Yes, you can connect a custom domain to your link-in-bio website from your dashboard."
  },
  {
    question: "Is there a free plan?",
    answer: "Yes, CTHO.WORK offers a free plan to get started. Upgrade for advanced features."
  }
]

export default function HomePage() {
  const { user, loading } = useAuth()
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <HeroSection user={user} loading={loading} />
      <BentoSection />
      <FeaturesSection />
      <PricingSection />
      <FAQSection faqData={faqData} openFaq={openFaq} setOpenFaq={setOpenFaq} />
      <CTACallToActionSection />
      <Footer />
    </main>
  )
}
