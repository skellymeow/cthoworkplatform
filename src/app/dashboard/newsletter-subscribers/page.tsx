'use client'

import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { ArrowLeft, Mail, Users, Download, Trash2, ChevronRight } from "lucide-react"
import Link from "next/link"
import { showToast } from "@/lib/utils"
import ConsistentHeader from "@/components/ui/consistent-header"
import { useAuth } from "@/lib/hooks/useAuth"

interface Subscriber {
  id: string
  full_name: string
  email: string
  subscribed_at: string
}

export default function NewsletterSubscribers() {
  const supabase = createClient()
  const { user, loading } = useAuth()
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    if (user) {
      fetchProfile()
      fetchSubscribers()
    }
  }, [user])

  const fetchProfile = async () => {
    if (!user) return
    const { data } = await supabase
      .from('link_bio_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()
    setProfile(data)
  }

  const fetchSubscribers = async () => {
    if (!user) return
    
    const { data: profile } = await supabase
      .from('link_bio_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single()
    
    if (profile) {
      const { data } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .eq('profile_id', profile.id)
        .order('subscribed_at', { ascending: false })
      setSubscribers(data || [])
    }
  }

  const deleteSubscriber = async (id: string) => {
    const { error } = await supabase
      .from('newsletter_subscribers')
      .delete()
      .eq('id', id)

    if (error) {
      showToast.error('Failed to delete subscriber')
    } else {
      setSubscribers(subscribers.filter(s => s.id !== id))
      showToast.success('Subscriber deleted successfully')
    }
  }

  const exportSubscribers = () => {
    const csvContent = [
      'Name,Email,Subscribed Date',
      ...subscribers.map(s => `${s.full_name},${s.email},${new Date(s.subscribed_at).toLocaleDateString()}`)
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'newsletter-subscribers.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col">
        <ConsistentHeader 
          breadcrumbs={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Newsletter Subscribers" }
          ]}
          isDashboardPage={true}
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </div>
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

  if (!profile) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div 
          className="text-center"
          {...animations.fadeInUp}
        >
          <p className="text-gray-400 mb-4">No profile found</p>
          <Link
            href="/dashboard"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Back to Dashboard
          </Link>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <ConsistentHeader 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Newsletter Subscribers" }
        ]}
        isDashboardPage={true}
      />

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Page Title and Stats */}
          <motion.div 
            className="mb-6"
            {...animations.fadeInUpDelayed(0.2)}
          >
            <h1 className="text-2xl font-bold text-white mb-2">Newsletter Subscribers</h1>
            <p className="text-gray-400 text-sm mb-4">Manage your email list</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2">
                <Users className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-gray-300">
                  {subscribers.length} subscribers
                </span>
              </div>
              {subscribers.length > 0 && (
                <button
                  onClick={exportSubscribers}
                  className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              )}
            </div>
          </motion.div>
          
          {subscribers.length === 0 ? (
            <motion.div 
              className="text-center py-12"
              {...animations.fadeInUpDelayed(0.2)}
            >
              <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No subscribers yet</h3>
              <p className="text-gray-400 mb-6">
                When people subscribe to your newsletter, they'll appear here.
              </p>
              <Link
                href="/dashboard/website-editor"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Enable Newsletter
              </Link>
            </motion.div>
          ) : (
            <motion.div 
              className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden"
              {...animations.fadeInUpDelayed(0.2)}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-zinc-800 border-b border-zinc-700">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium text-gray-300">Name</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-300">Email</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-300">Subscribed</th>
                      <th className="text-right p-4 text-sm font-medium text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((subscriber, index) => (
                      <motion.tr 
                        key={subscriber.id}
                        className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <td className="p-4 text-white font-medium">{subscriber.full_name}</td>
                        <td className="p-4 text-gray-300">{subscriber.email}</td>
                        <td className="p-4 text-gray-400 text-sm">
                          {new Date(subscriber.subscribed_at).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => deleteSubscriber(subscriber.id)}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  )
} 