'use client'

import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import { createClient } from "@/lib/supabase/client"
import { useState, useEffect } from "react"
import { BarChart3, Eye, Calendar, TrendingUp, ExternalLink, AlertTriangle, X, Trash2, User as UserIcon, Lock } from "lucide-react"
import Footer from "@/components/Footer"
import Link from "next/link"
import { showToast } from "@/lib/utils"
import ConsistentHeader from "@/components/ui/consistent-header"
import { useAuth } from "@/lib/hooks/useAuth"
import { useSearchParams } from "next/navigation"

interface PageView {
  id: string
  profile_id: string
  viewed_at: string
  ip_address?: string
  user_agent?: string
}

interface DailyStats {
  date: string
  views: number
}

interface Profile {
  id: string;
  user_id: string;
  slug: string;
  title: string | null;
  description: string | null;
  avatar_url: string | null;
  theme: string;
  is_live: boolean;
  created_at: string;
  updated_at: string;
  newsletter_enabled?: boolean;
}

interface Locker {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  is_active: boolean;
}

interface LockerView {
  id: string;
  referrer: string;
  viewed_at: string;
  ip_address: string;
}

export default function AnalyticsPage() {
  const supabase = createClient()
  const { user, loading } = useAuth()
  const searchParams = useSearchParams()
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null)
  const [pageViews, setPageViews] = useState<PageView[]>([])
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([])
  const [totalViews, setTotalViews] = useState(0)
  const [todayViews, setTodayViews] = useState(0)
  const [showClearModal, setShowClearModal] = useState(false)

  // Tab state
  const [tab, setTab] = useState<'bio' | 'lockers'>('bio')
  const [lockers, setLockers] = useState<Locker[]>([])
  const [lockerViews, setLockerViews] = useState<{ [slug: string]: number }>({})
  const [lockerRecentViews, setLockerRecentViews] = useState<LockerView[]>([])
  const [lockerTotalViews, setLockerTotalViews] = useState(0)

  // Handle URL parameter for tab
  useEffect(() => {
    const tabParam = searchParams.get('tab')
    if (tabParam === 'lockers') {
      setTab('lockers')
    } else {
      setTab('bio')
    }
  }, [searchParams])

  useEffect(() => {
    if (!user) return
    if (tab === 'lockers') {
      supabase
        .from('content_lockers')
        .select('id, name, slug, created_at, is_active')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .then(async ({ data }) => {
          setLockers(data || [])
          if (data && data.length > 0) {
            const slugs = data.map(l => l.slug)
            // Fetch all page views for these lockers
            const { data: views } = await supabase
              .from('page_views')
              .select('id, referrer, viewed_at, ip_address')
              .in('referrer', slugs.map(s => `/${s}`))
            // Count views per slug
            const counts: { [slug: string]: number } = {}
            slugs.forEach(slug => {
              counts[slug] = (views || []).filter(v => v.referrer === `/${slug}`).length
            })
            setLockerViews(counts)
            setLockerTotalViews((views || []).length)
            setLockerRecentViews((views || []).sort((a, b) => new Date(b.viewed_at).getTime() - new Date(a.viewed_at).getTime()).slice(0, 10))
          } else {
            setLockerViews({})
            setLockerTotalViews(0)
            setLockerRecentViews([])
          }
        })
    }
  }, [user, tab])

  const fetchCurrentProfile = async () => {
    if (!user) return
    const { data } = await supabase
      .from('link_bio_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()
    setCurrentProfile(data)
  }

  const fetchPageViews = async () => {
    if (!currentProfile) return
    
    // fetch all page views for this profile
    const { data: views } = await supabase
      .from('page_views')
      .select('*')
      .eq('profile_id', currentProfile.id)
      .order('viewed_at', { ascending: false })
    
    if (views) {
      setPageViews(views)
      setTotalViews(views.length)
      
      // calculate today's views
      const today = new Date().toISOString().split('T')[0]
      const todayCount = views.filter(view => 
        view.viewed_at.startsWith(today)
      ).length
      setTodayViews(todayCount)
      
      // calculate daily stats for last 7 days
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - i)
        return date.toISOString().split('T')[0]
      }).reverse()
      
      const stats = last7Days.map(date => ({
        date,
        views: views.filter(view => view.viewed_at.startsWith(date)).length
      }))
      
      setDailyStats(stats)
    }
  }

  useEffect(() => {
    if (user) {
      fetchCurrentProfile()
    }
  }, [user])

  useEffect(() => {
    if (currentProfile) {
      fetchPageViews()
    }
  }, [currentProfile])

  const handleClearAnalytics = async () => {
    if (!currentProfile) return
    
    const { error } = await supabase
      .from('page_views')
      .delete()
      .eq('profile_id', currentProfile.id)
    
    if (error) {
      showToast.error('Failed to clear analytics')
      return
    } else {
      // refetch data to update the UI
      await fetchPageViews()
      setShowClearModal(false)
      showToast.success('Analytics cleared successfully')
    }
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

  if (!user) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div 
          className="text-center"
          {...animations.fadeInUp}
        >
          <p className="text-gray-400 mb-4">Not authenticated</p>
          <motion.button
            onClick={() => window.location.href = '/auth'}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            {...animations.buttonHover}
          >
            Sign In
          </motion.button>
        </motion.div>
      </main>
    )
  }

  if (!currentProfile) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div 
          className="text-center"
          {...animations.fadeInUp}
        >
          <p className="text-gray-400 mb-4">No profile found</p>
          <motion.button
            onClick={() => window.location.href = '/dashboard'}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            {...animations.buttonHover}
          >
            Go to Dashboard
          </motion.button>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <ConsistentHeader 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Analytics" }
        ]}
        isDashboardPage={true}
      />

      {/* Main Content */}
      <motion.div 
        className="flex-1 w-full px-6 py-8"
        {...animations.fadeInUp}
      >
        <div className="flex flex-col gap-8 max-w-6xl mx-auto">

          {/* Tab Switcher */}
          <div className="flex gap-2 mb-8 mt-2">
            <Link
              href="/dashboard/analytics"
              className={`px-6 py-3 rounded-t-lg font-semibold text-sm transition-colors flex items-center gap-2 ${tab === 'bio' ? 'bg-zinc-900 text-purple-400 border-b-2 border-purple-500' : 'bg-zinc-800 text-gray-400'}`}
            >
              <UserIcon className="w-4 h-4" />
              Bio Site
            </Link>
            <Link
              href="/dashboard/analytics?tab=lockers"
              className={`px-6 py-3 rounded-t-lg font-semibold text-sm transition-colors flex items-center gap-2 ${tab === 'lockers' ? 'bg-zinc-900 text-purple-400 border-b-2 border-purple-500' : 'bg-zinc-800 text-gray-400'}`}
            >
              <Lock className="w-4 h-4" />
              Content Lockers
            </Link>
          </div>

          {tab === 'bio' ? (
            <>
              {/* Profile Info */}
              <motion.div 
                className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg p-6"
                {...animations.fadeInUpDelayed(0.3)}
              >
                <div className="flex items-center gap-3 w-full justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-purple-600 flex items-center justify-center border-2 border-purple-500">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-white">@{currentProfile.slug}</h3>
                        <div className="flex items-center gap-2 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2">
                          <div className={`w-2 h-2 rounded-full ${
                            currentProfile.is_live ? 'bg-green-400' : 'bg-red-400'
                          }`} />
                          <span className="text-xs font-medium text-gray-400">
                            {currentProfile.is_live ? 'Live' : 'Offline'}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mt-0.5">
                        {currentProfile.title || 'Untitled'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {currentProfile && (
                      <a 
                        href={currentProfile.is_live ? `/u/${currentProfile.slug}` : "/dashboard/website-editor"}
                        target="_blank"
                        className="text-purple-400 hover:text-purple-300 text-xs font-medium border border-purple-900 bg-zinc-950 rounded px-2 py-1 transition-colors flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {currentProfile.is_live ? 'View' : 'Edit'}
                      </a>
                    )}
                    <motion.button
                      onClick={() => setShowClearModal(true)}
                      className="text-red-400 hover:text-red-300 text-xs font-medium border border-red-900 bg-zinc-950 rounded px-2 py-1 transition-colors flex items-center gap-1"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                    >
                      <Trash2 className="w-3 h-3" />
                      Clear Stats
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Stats Cards */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                {...animations.fadeInUpDelayed(0.4)}
              >
                {/* Total Views */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center">
                      <Eye className="w-4 h-4 text-white" />
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
                      <p className="text-gray-400 text-sm">Today's Views</p>
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
                    <BarChart3 className="w-4 h-4 text-white" />
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
            </>
          ) : (
            <>
              {/* Content Lockers Analytics Dashboard */}
              <motion.div 
                className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg p-6 mb-6"
                {...animations.fadeInUpDelayed(0.3)}
              >
                <div className="flex items-center gap-3 w-full justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-purple-600 flex items-center justify-center border-2 border-purple-500">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-white tracking-tight">Content Lockers</h3>
                      </div>
                      <p className="text-gray-400 text-xs mt-0.5">
                        Total Views: <span className="text-white font-semibold">{lockerTotalViews}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* List of Lockers with Views */}
              <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6" {...animations.fadeInUpDelayed(0.4)}>
                {lockers.length === 0 ? (
                  <div className="text-gray-400 text-sm col-span-2">No content lockers found.</div>
                ) : (
                  lockers.map(locker => (
                    <div key={locker.id} className="flex items-center justify-between bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3">
                      <div className="flex flex-col">
                        <span className="font-bold text-white">{locker.name}</span>
                        <span className="text-xs text-gray-500">Created {new Date(locker.created_at).toLocaleDateString()}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <div className={`w-2 h-2 rounded-full ${locker.is_active ? 'bg-green-400' : 'bg-red-400'}`} />
                          <span className="text-xs font-medium text-gray-400">
                            {locker.is_active ? 'Live' : 'Offline'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <a href={`/${locker.slug}`} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 text-xs font-medium border border-purple-900 bg-zinc-950 rounded px-2 py-1 transition-colors flex items-center gap-1">View</a>
                        <span className="text-xs text-gray-400">Views: {lockerViews[locker.slug] || 0}</span>
                      </div>
                    </div>
                  ))
                )}
              </motion.div>

              {/* Recent Views for Lockers */}
              <motion.div 
                className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg p-6"
                {...animations.fadeInUpDelayed(0.5)}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-md bg-indigo-600 flex items-center justify-center">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Recent Locker Views</h3>
                    <p className="text-gray-400 text-sm">Latest visits to your content lockers</p>
                  </div>
                </div>
                {lockerRecentViews.length > 0 ? (
                  <div className="space-y-3">
                    {lockerRecentViews.map((view) => (
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
                            <p className="text-xs text-purple-400">
                              Locker: {view.referrer?.replace('/', '')}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400">No recent views</p>
                    <p className="text-gray-500 text-sm mt-2">Page views will appear here once people visit your locker&apos;s</p>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </div>
      </motion.div>

      <Footer />

      {/* Clear Analytics Confirmation Modal */}
      {showClearModal && (
        <motion.div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg max-w-md w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Clear Analytics</h3>
                  <p className="text-gray-400">This action cannot be undone</p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-sm font-medium text-red-300">Warning</span>
              </div>
              <p className="text-xs text-gray-400">
                This will permanently delete all page view statistics for your profile. This action is unrecoverable and will reset all analytics to zero.
              </p>
            </div>
            
            <div className="flex gap-3">
              <motion.button
                onClick={() => setShowClearModal(false)}
                className="flex-1 bg-zinc-800 text-white px-4 py-2 rounded font-semibold hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
                {...animations.buttonHover}
              >
                <X className="w-4 h-4" />
                Cancel
              </motion.button>
              <motion.button
                onClick={handleClearAnalytics}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                {...animations.buttonHover}
              >
                <Trash2 className="w-4 h-4" />
                Clear Analytics
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </main>
  )
} 