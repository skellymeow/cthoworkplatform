'use client'

import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Breadcrumb from "./breadcrumb"
import UserDropdown from "./UserDropdown"
import { useAuth } from "@/lib/hooks/useAuth"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface ConsistentHeaderProps {
  breadcrumbs: BreadcrumbItem[]
  showBackButton?: boolean
  backHref?: string
  backLabel?: string
  isDashboardPage?: boolean
}

export default function ConsistentHeader({ 
  breadcrumbs, 
  showBackButton = false, 
  backHref = "/dashboard", 
  backLabel = "Back to Dashboard",
  isDashboardPage = false
}: ConsistentHeaderProps) {
  const { user } = useAuth()

  return (
    <motion.header 
      className="border-b border-zinc-800 bg-black/50 backdrop-blur-sm sticky top-0 z-40"
      {...animations.fadeInUp}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3">
        <div className="flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-2 sm:gap-3 md:gap-4"
            {...animations.fadeInUpDelayed(0.1)}
          >
            <Link href="/" className="inline-block align-middle">
              <img
                src="/cthoworkwhitetext.png"
                alt="CTHO.WORK logo"
                className="h-6 sm:h-8 md:h-10 lg:h-12 w-auto"
                style={{ maxWidth: '140px', height: 'auto' }}
              />
            </Link>
            
            <Breadcrumb items={breadcrumbs} />
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2 sm:gap-3 md:gap-4"
            {...animations.fadeInUpDelayed(0.1)}
          >
            {isDashboardPage && user ? (
              <UserDropdown />
            ) : showBackButton ? (
              <Link
                href={backHref}
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {backLabel}
              </Link>
            ) : null}
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
} 