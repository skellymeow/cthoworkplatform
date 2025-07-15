'use client'

import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import { Plus, Edit3, Lock, BarChart3, Mail, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function QuickActions() {
  const actions = [
    {
      icon: Edit3,
      title: "Website Editor",
      description: "Customize your link-in-bio page",
      href: "/dashboard/website-editor",
      color: "text-purple-400"
    },
    {
      icon: Lock,
      title: "Content Lockers",
      description: "Create gated content",
      href: "/dashboard/content-lockers",
      color: "text-green-400"
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "View your performance data",
      href: "/dashboard/analytics",
      color: "text-blue-400"
    },
    {
      icon: Mail,
      title: "Newsletter",
      description: "Manage your subscribers",
      href: "/dashboard/newsletter-subscribers",
      color: "text-orange-400"
    }
  ]

  return (
    <motion.div 
      className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg"
      {...animations.fadeInUpDelayed(0.8)}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
          <Plus className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Quick Actions</h3>
          <p className="text-sm text-gray-400">Manage your content and tools</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <Link
            key={action.title}
            href={action.href}
            className="group p-4 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-700 transition-colors">
                <action.icon className={`w-4 h-4 ${action.color}`} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-white group-hover:text-white transition-colors">
                  {action.title}
                </h4>
                <p className="text-xs text-gray-400">{action.description}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  )
} 