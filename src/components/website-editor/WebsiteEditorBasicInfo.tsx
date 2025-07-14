import { User as UserIcon } from "lucide-react"

interface Profile {
  id: string
  slug: string
  title: string | null
  description: string | null
  avatar_url: string | null
  theme: string
  is_live: boolean
  newsletter_enabled: boolean
}

type Props = {
  profile: Profile
  setProfile: (profile: Profile) => void
}

export default function WebsiteEditorBasicInfo({ profile, setProfile }: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-md bg-purple-600 flex items-center justify-center border-2 border-purple-500">
          <UserIcon className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-lg font-bold text-white">Basic Information</h2>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
          <input
            type="text"
            value={profile.title || ''}
            onChange={(e) => setProfile({ ...profile, title: e.target.value })}
            placeholder="Your name or brand"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
          <textarea
            value={profile.description || ''}
            onChange={(e) => setProfile({ ...profile, description: e.target.value })}
            placeholder="Tell visitors about yourself"
            rows={3}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none"
          />
        </div>
      </div>
    </div>
  )
} 