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
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-md bg-purple-600 flex items-center justify-center border-2 border-purple-500">
          <Edit3 className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-lg font-bold text-white">Theme</h2>
      </div>
      <ThemeSelector
        currentTheme={profile.theme}
        onThemeChange={(theme) => setProfile({ ...profile, theme })}
      />
    </div>
  )
} 