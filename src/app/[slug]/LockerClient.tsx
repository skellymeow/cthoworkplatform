'use client'
import { useState, useEffect } from "react"
import { ExternalLink, Lock } from "lucide-react"

export default function LockerClient({ locker, offers }: { locker: any, offers: any[] }) {
  const [completed, setCompleted] = useState(Array(offers.length).fill(false))
  const [waiting, setWaiting] = useState(Array(offers.length).fill(false))
  const [unlocking, setUnlocking] = useState(false)

  // Track page view for this locker
  useEffect(() => {
    fetch('/api/track-page-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lockerId: locker.id })
    })
  }, [locker.id])

  const handleOfferClick = (idx: number, url: string) => {
    if (completed[idx] || waiting[idx]) return
    setWaiting(w => w.map((v, i) => i === idx ? true : v))
    window.open(url, '_blank', 'noopener,noreferrer')
    setTimeout(() => {
      setCompleted(c => c.map((v, i) => i === idx ? true : v))
      setWaiting(w => w.map((v, i) => i === idx ? false : v))
    }, 3000)
  }

  const allRequiredDone = offers.every((o, i) => (o.required ? completed[i] : true))

  function getAbsoluteUrl(url: string): string {
    if (!url) return ''
    if (/^https?:\/\//i.test(url)) return url
    return `https://${url}`
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-md shadow-lg p-8 flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold text-white text-center mb-2">{locker.name}</h1>
        {locker.note && <p className="text-gray-400 text-center text-sm mb-2">{locker.note}</p>}
        <div className="w-full flex flex-col gap-4">
          {offers.map((offer, i) => (
            <button
              key={i}
              className={`w-full flex flex-col items-start bg-zinc-950 border border-zinc-800 rounded-lg px-5 py-4 transition-colors ${completed[i] ? 'opacity-60 cursor-default' : 'hover:bg-zinc-800'} ${waiting[i] ? 'cursor-wait' : ''}`}
              disabled={completed[i] || waiting[i]}
              onClick={() => handleOfferClick(i, offer.url)}
            >
              <div className="flex items-center gap-3 mb-1">
                <span className="text-lg font-bold text-white">{i + 1}. {offer.title}</span>
                <ExternalLink className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-gray-400 text-sm">{offer.subtitle}</span>
              {waiting[i] && <span className="text-xs text-purple-400 mt-2">Waiting 3s...</span>}
              {completed[i] && <span className="text-xs text-green-400 mt-2">Completed</span>}
            </button>
          ))}
        </div>
        <button
          className="w-full bg-purple-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2"
          disabled={!allRequiredDone || unlocking}
          onClick={() => {
            setUnlocking(true)
            setTimeout(() => {
              window.location.href = getAbsoluteUrl(locker.locked_url)
            }, 300)
          }}
        >
          <Lock className="w-5 h-5 text-white" />
          {unlocking ? 'Unlocking...' : 'Unlock your reward'}
        </button>
      </div>
    </main>
  )
} 