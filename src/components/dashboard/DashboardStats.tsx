'use client'

import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import { Users, BarChart3, Eye, Mail } from "lucide-react"

interface DashboardStatsProps {
  bioTotalViews: number
  lockerTotalViews: number
  newsletterSubscribers: number
  lockerCount: number
}

export default function DashboardStats({ 
  bioTotalViews, 
  lockerTotalViews, 
  newsletterSubscribers, 
  lockerCount 
}: DashboardStatsProps) {
  const stats = [
    {
      icon: Eye,
      label: "Total Views",
      value: bioTotalViews + lockerTotalViews,
      color: "text-blue-400"
    },
    {
      icon: Users,
      label: "Content Lockers",
      value: lockerCount,
      color: "text-green-400"
    },
    {
      icon: Mail,
      label: "Newsletter Subscribers",
      value: newsletterSubscribers,
      color: "text-purple-400"
    }
  ]

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      {...animations.fadeInUpDelayed(0.4)}
    >
      {stats.map((stat, index) => (
        <motion.div 
          key={stat.label}
          className="bg-black border border-zinc-800 p-6 rounded-lg"
          {...animations.fadeInUpDelayed(0.5 + index * 0.1)}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400">{stat.label}</h3>
              <p className="text-2xl font-bold text-white">{stat.value.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
} 