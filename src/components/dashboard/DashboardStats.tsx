'use client'

import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import { TrendingUp, Calendar, Eye } from "lucide-react"

interface DashboardStatsProps {
  totalViews: number
  todayViews: number
  dailyStats: Array<{ date: string; views: number }>
  pageViews: Array<{ id: string; viewed_at: string; ip_address?: string }>
}

export default function DashboardStats({ totalViews, todayViews, dailyStats, pageViews }: DashboardStatsProps) {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        {...animations.fadeInUpDelayed(0.3)}
      >
        {/* Total Views */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Views</p>
              <p className="text-2xl font-bold text-white">{totalViews}</p>
            </div>
          </div>
        </div>

        {/* Today's Views */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-md bg-green-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Today&apos;s Views</p>
              <p className="text-2xl font-bold text-white">{todayViews}</p>
            </div>
          </div>
        </div>

        {/* Average Daily Views */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-md bg-purple-600 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Avg Daily Views</p>
              <p className="text-2xl font-bold text-white">
                {dailyStats.length > 0 
                  ? Math.round(dailyStats.reduce((sum, day) => sum + day.views, 0) / dailyStats.length)
                  : 0
                }
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Daily Views Chart */}
      <motion.div 
        className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg p-6"
        {...animations.fadeInUpDelayed(0.5)}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-md bg-orange-600 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Last 7 Days</h3>
            <p className="text-gray-400 text-sm">Daily page views</p>
          </div>
        </div>

        {dailyStats.length > 0 ? (
          <div className="space-y-4">
            {dailyStats.map((day) => {
              const maxViews = Math.max(...dailyStats.map(d => d.views))
              const percentage = maxViews > 0 ? (day.views / maxViews) * 100 : 0
              
              return (
                <div key={day.date} className="flex items-center gap-4">
                  <div className="w-20 text-sm text-gray-400">
                    {new Date(day.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="flex-1 bg-zinc-800 rounded-full h-4 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="w-12 text-right text-sm font-medium text-white">
                    {day.views}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400">No data available yet</p>
            <p className="text-gray-500 text-sm mt-2">Page views will appear here once people visit your profile</p>
          </div>
        )}
      </motion.div>

      {/* Recent Views */}
      <motion.div 
        className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg p-6"
        {...animations.fadeInUpDelayed(0.6)}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-md bg-indigo-600 flex items-center justify-center">
            <Eye className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Recent Views</h3>
            <p className="text-gray-400 text-sm">Latest page visits</p>
          </div>
        </div>

        {pageViews.length > 0 ? (
          <div className="space-y-3">
            {pageViews.slice(0, 10).map((view) => (
              <div key={view.id} className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div>
                    <p className="text-sm text-white">
                      {view.ip_address ? `${view.ip_address.slice(0, 7)}...` : 'Unknown IP'}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(view.viewed_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400">No recent views</p>
            <p className="text-gray-500 text-sm mt-2">Page views will appear here once people visit your profile</p>
          </div>
        )}
      </motion.div>
    </div>
  )
} 