import { Plus, Trash2, Link as LinkIcon, Globe } from "lucide-react"
import { getSocialIcon } from "@/lib/constants/social-platforms"

interface SocialLink {
  id: string
  platform: string
  url: string
  display_name: string
  icon: string
  order_index: number
  is_active: boolean
}

type Props = {
  socials: SocialLink[]
  updateSocial: (id: string, updates: Partial<SocialLink>) => void
  deleteSocial: (id: string) => void
  toggleSocialActive: (id: string, is_active: boolean) => void
  setShowAddSocial: (show: boolean) => void
}

export default function WebsiteEditorSocialLinks({ socials, updateSocial, deleteSocial, toggleSocialActive, setShowAddSocial }: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4 justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-purple-600 flex items-center justify-center border-2 border-purple-500">
            <LinkIcon className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-lg font-bold text-white">Social Links</h2>
        </div>
        <button
          onClick={() => setShowAddSocial(true)}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Link
        </button>
      </div>
      {socials.length === 0 ? (
        <div className="text-center py-8">
          <LinkIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">No social links yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {socials.map((social) => (
            <div key={social.id} className="flex items-center gap-3 bg-zinc-800 border border-zinc-700 rounded-lg p-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-8 h-8 bg-zinc-700 rounded flex items-center justify-center">
                  {getSocialIcon(social.platform).startsWith('/') ? (
                    <img 
                      src={getSocialIcon(social.platform)} 
                      alt={social.platform} 
                      className="w-4 h-4"
                    />
                  ) : (
                    <Globe className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={social.display_name}
                    onChange={(e) => updateSocial(social.id, { display_name: e.target.value })}
                    className="bg-transparent text-white font-medium focus:outline-none"
                  />
                  <input
                    type="text"
                    value={social.url}
                    onChange={(e) => updateSocial(social.id, { url: e.target.value })}
                    className="bg-transparent text-gray-400 text-sm focus:outline-none w-full"
                    placeholder="URL"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleSocialActive(social.id, social.is_active)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    social.is_active 
                      ? 'bg-green-600 text-white' 
                      : 'bg-zinc-700 text-gray-400'
                  }`}
                >
                  {social.is_active ? 'Active' : 'Inactive'}
                </button>
                <button
                  onClick={() => deleteSocial(social.id)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 