'use client'

import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <motion.nav 
      className="flex items-center gap-2"
      {...animations.fadeInUpDelayed(0.1)}
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && (
            <ChevronRight className="w-3 h-3 text-gray-500" />
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="text-xs font-medium text-gray-400 hover:text-white transition-colors px-2 py-1 rounded-[3px] hover:bg-zinc-800/50"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-xs font-medium text-white px-2 py-1">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </motion.nav>
  )
} 