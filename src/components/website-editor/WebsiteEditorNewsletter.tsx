import { Mail } from "lucide-react"

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
  setShowDisableNewsletterModal: (show: boolean) => void
}

export default function WebsiteEditorNewsletter({ profile, setProfile, setShowDisableNewsletterModal }: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 sm:p-4 lg:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-md bg-purple-600 flex items-center justify-center border-2 border-purple-500">
          <Mail className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-white" />
        </div>
        <h2 className="text-base sm:text-lg font-bold text-white">Newsletter</h2>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-xs sm:text-sm">Allow visitors to subscribe to your newsletter</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={profile.newsletter_enabled}
            onChange={(e) => {
              if (e.target.checked) {
                setProfile({ ...profile, newsletter_enabled: true })
              } else {
                setShowDisableNewsletterModal(true)
              }
            }}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
        </label>
      </div>
    </div>
  )
} 