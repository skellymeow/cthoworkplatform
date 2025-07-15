'use client'

import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { Plus, Lock, List, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Footer from "@/components/Footer"
import { showToast } from "@/lib/utils"
import { ContentLockersSkeleton } from "@/components/ui/content-lockers-skeleton"
import ConsistentHeader from "@/components/ui/consistent-header"
import { useAuth } from "@/lib/hooks/useAuth"
import { useSearchParams } from "next/navigation"

export default function ContentLockers() {
  const supabase = createClient()
  const router = useRouter()
  const { user, loading } = useAuth()
  const searchParams = useSearchParams()
  const [showManage, setShowManage] = useState(false)
  // TODO: Add state for lockers, form, etc.

  // Form state
  const [name, setName] = useState('')
  const [note, setNote] = useState('')
  const [lockedUrl, setLockedUrl] = useState('')
  const [offer1, setOffer1] = useState('')
  const [offer2, setOffer2] = useState('')
  const [offer3, setOffer3] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Lockers state
  const [lockers, setLockers] = useState<unknown[]>([])
  const [lockersLoading, setLockersLoading] = useState(true)
  const [lockersError, setLockersError] = useState<string | null>(null)

  // Handle URL parameter for tab
  useEffect(() => {
    const tabParam = searchParams.get('tab')
    if (tabParam === 'manage') {
      setShowManage(true)
    } else {
      setShowManage(false)
    }
  }, [searchParams])

  // Handler
  const handleCreateLocker = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    if (!name.trim() || !lockedUrl.trim() || !offer1.trim()) {
      setError('Name, Locked URL, and Offer 1 are required.')
      showToast.error('Name, Locked URL, and Offer 1 are required.')
      return
    }
    setSubmitting(true)
    // Generate random slug
    const slug = Math.random().toString(36).slice(2, 8) + Math.random().toString(36).slice(2, 8)
    const { error } = await supabase.from('content_lockers').insert({
      user_id: user!.id,
      slug: slug.slice(0, 12),
      name: name.trim(),
      note: note.trim() || null,
      locked_url: lockedUrl.trim(),
      offer1_url: offer1.trim(),
      offer2_url: offer2.trim() || null,
      offer3_url: offer3.trim() || null,
      is_active: true
    })
    setSubmitting(false)
    if (error) {
      setError('Failed to create content locker.')
      showToast.error('Failed to create content locker.')
    } else {
      setSuccess(true)
      showToast.success('Content locker created successfully!')
      setName('')
      setNote('')
      setLockedUrl('')
      setOffer1('')
      setOffer2('')
      setOffer3('')
    }
  }

  // Fetch lockers
  useEffect(() => {
    if (!user) return
    setLockersLoading(true)
    supabase
      .from('content_lockers')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) setLockersError('Failed to load lockers.')
        else setLockers(data || [])
        setLockersLoading(false)
      })
  }, [user, success])

  // Delete locker
  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('content_lockers').delete().eq('id', id)
    if (error) {
      showToast.error('Failed to delete locker')
    } else {
      setLockers(lockers => lockers.filter(l => l.id !== id))
      showToast.success('Locker deleted successfully')
    }
  }

  // Toggle active
  const handleToggleActive = async (id: string, isActive: boolean) => {
    const { error } = await supabase.from('content_lockers').update({ is_active: !isActive }).eq('id', id)
    if (error) {
      showToast.error('Failed to update locker status')
    } else {
      setLockers(lockers => lockers.map(l => l.id === id ? { ...l, is_active: !isActive } : l))
      showToast.success(isActive ? 'Locker deactivated' : 'Locker activated')
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col">
        <ConsistentHeader 
          breadcrumbs={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Content Lockers" }
          ]}
          isDashboardPage={true}
        />
        <ContentLockersSkeleton />
      </main>
    )
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div className="text-center" {...animations.fadeInUp}>
          <p className="text-gray-400 mb-4">Not authenticated</p>
          <motion.button
            onClick={() => router.push('/auth')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            {...animations.buttonHover}
          >
            Sign In
          </motion.button>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <ConsistentHeader 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Content Lockers" }
        ]}
        isDashboardPage={true}
      />

      <motion.div className="flex-1 w-full px-4 lg:px-6 py-4 lg:py-8 max-w-7xl mx-auto" {...animations.fadeInUp}>
        <div className="flex flex-col gap-8">
          {/* Mobile Tab Switcher - Only show on mobile */}
          <div className="flex lg:hidden gap-2 mb-8 mt-2">
            <Link
              href="/dashboard/content-lockers"
              className={`px-6 py-3 rounded-t-lg font-semibold text-sm transition-colors flex items-center gap-2 ${!showManage ? 'bg-zinc-900 text-purple-400 border-b-2 border-purple-500' : 'bg-zinc-800 text-gray-400'}`}
            >
              <Plus className="w-4 h-4" />
              Create Locker
            </Link>
            <Link
              href="/dashboard/content-lockers?tab=manage"
              className={`px-6 py-3 rounded-t-lg font-semibold text-sm transition-colors flex items-center gap-2 ${showManage ? 'bg-zinc-900 text-purple-400 border-b-2 border-purple-500' : 'bg-zinc-800 text-gray-400'}`}
            >
              <List className="w-4 h-4" />
              Manage Lockers
            </Link>
          </div>

          {/* Content Sections */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">

        {/* Left: Create Locker */}
        <motion.div className={`flex-1 bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg p-4 lg:p-8 flex flex-col gap-4 lg:gap-6 min-h-[400px] ${showManage ? 'hidden lg:block' : 'block'}`} {...animations.fadeInUpDelayed(0.1)}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-md bg-purple-600 flex items-center justify-center border-2 border-purple-500">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-lg font-bold text-white">Create Content Locker</h2>
          </div>
          <form className="flex flex-col gap-4 w-full" onSubmit={handleCreateLocker}>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Name <span className="text-red-400">*</span></label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required maxLength={64} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 lg:px-4 py-2 lg:py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500" placeholder="Locker name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Note</label>
              <input type="text" value={note} onChange={e => setNote(e.target.value)} maxLength={256} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 lg:px-4 py-2 lg:py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500" placeholder="Optional note" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Locked URL <span className="text-red-400">*</span></label>
              <input type="text" value={lockedUrl} onChange={e => setLockedUrl(e.target.value)} required className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 lg:px-4 py-2 lg:py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500" placeholder="destination.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Offer 1 URL <span className="text-red-400">*</span></label>
              <input type="text" value={offer1} onChange={e => setOffer1(e.target.value)} required className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 lg:px-4 py-2 lg:py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500" placeholder="offer1.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Offer 2 URL</label>
              <input type="text" value={offer2} onChange={e => setOffer2(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 lg:px-4 py-2 lg:py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500" placeholder="offer2.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Offer 3 URL</label>
              <input type="text" value={offer3} onChange={e => setOffer3(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 lg:px-4 py-2 lg:py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500" placeholder="offer3.com" />
            </div>
            {error && <div className="text-red-400 text-sm">{error}</div>}
            {success && <div className="text-green-400 text-sm">Content locker created!</div>}
            <button type="submit" disabled={submitting} className="w-full bg-purple-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2">
              {submitting ? 'Creating...' : 'Create Locker'}
            </button>
          </form>
        </motion.div>

        {/* Right: Manage Lockers */}
        <motion.div className={`flex-1 bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg p-4 lg:p-8 flex flex-col gap-4 lg:gap-6 min-h-[400px] ${showManage ? 'block' : 'hidden lg:block'}`} {...animations.fadeInUpDelayed(0.2)}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-md bg-purple-600 flex items-center justify-center border-2 border-purple-500">
              <List className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-lg font-bold text-white">Manage Your Lockers</h2>
          </div>
          {lockersLoading ? (
            <div className="text-gray-400 text-sm">Loading...</div>
          ) : lockersError ? (
            <div className="text-red-400 text-sm">{lockersError}</div>
          ) : lockers.length === 0 ? (
            <div className="text-gray-400 text-sm">No content lockers yet.</div>
          ) : (
            <div className="flex flex-col gap-3 w-full">
              {lockers.map(locker => (
                <div key={locker.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-zinc-950 border border-zinc-800 rounded-lg px-3 lg:px-4 py-3 gap-3">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{locker.name}</span>
                      <span className={`text-xs font-semibold rounded px-2 py-0.5 ml-2 ${locker.is_active ? 'bg-green-900 text-green-400' : 'bg-zinc-800 text-gray-400'}`}>{locker.is_active ? 'Active' : 'Inactive'}</span>
                    </div>
                    <span className="text-xs text-gray-500">{new Date(locker.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <a href={`/${locker.slug}`} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 text-xs font-medium border border-purple-900 bg-zinc-950 rounded px-2 py-1 transition-colors flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      View
                    </a>
                    <button onClick={() => handleToggleActive(locker.id, locker.is_active)} className={`text-xs font-medium rounded px-2 py-1 border transition-colors ${locker.is_active ? 'bg-zinc-900 text-green-400 border-green-700 hover:bg-green-950' : 'bg-zinc-900 text-gray-400 border-zinc-700 hover:bg-zinc-800'}`}>{locker.is_active ? 'Deactivate' : 'Activate'}</button>
                    <button onClick={() => handleDelete(locker.id)} className="text-xs font-medium rounded px-2 py-1 border border-red-700 bg-zinc-900 text-red-400 hover:bg-red-950 transition-colors">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </main>
  )
}