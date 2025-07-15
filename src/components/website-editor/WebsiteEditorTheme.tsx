import { Edit3 } from "lucide-react"
import ThemeSelector from "@/components/ui/theme-selector"

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

export default function WebsiteEditorTheme({ profile, setProfile }: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 sm:p-4 lg:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-md bg-purple-600 flex items-center justify-center border-2 border-purple-500">
          <Edit3 className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-white" />
        </div>
        <h2 className="text-base sm:text-lg font-bold text-white">Theme</h2>
      </div>
      <ThemeSelector
        currentTheme={profile.theme}
        onThemeChange={(theme) => setProfile({ ...profile, theme })}
      />
    </div>
  )
} 