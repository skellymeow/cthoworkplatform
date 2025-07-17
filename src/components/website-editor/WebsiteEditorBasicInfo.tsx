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
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 sm:p-4 lg:p-6">
      <div className="flex flex-col items-center mb-4">
        <div className="relative">
          <img
            src={profile.avatar_url || "/skellychannelpfp.jpg"}
            alt="Profile Avatar"
            className="w-20 h-20 rounded-full border-2 border-purple-500 object-cover bg-zinc-800"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-md bg-purple-600 flex items-center justify-center border-2 border-purple-500">
          <UserIcon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-white" />
        </div>
        <h2 className="text-base sm:text-lg font-bold text-white">Basic Information</h2>
      </div>
      <div className="space-y-3 sm:space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">Title</label>
          <input
            type="text"
            value={profile.title || ''}
            onChange={(e) => setProfile({ ...profile, title: e.target.value })}
            placeholder="Your name or brand"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 text-sm sm:text-base"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">Description</label>
          <textarea
            value={profile.description || ''}
            onChange={(e) => setProfile({ ...profile, description: e.target.value })}
            placeholder="Tell visitors about yourself"
            rows={3}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none text-sm sm:text-base"
          />
        </div>
      </div>
    </div>
  )
} 