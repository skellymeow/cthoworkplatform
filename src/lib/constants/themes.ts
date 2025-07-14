export interface Theme {
  id: string
  name: string
  description: string
  background: string
  text: string
  cardBackground: string
  cardBorder: string
  linkBackground: string
  linkBorder: string
  linkHoverBackground: string
  linkHoverBorder: string
  accent: string
}

export const THEMES: Theme[] = [
  {
    id: 'default',
    name: 'Dark',
    description: 'Classic dark theme',
    background: 'bg-black',
    text: 'text-white',
    cardBackground: 'bg-zinc-900',
    cardBorder: 'border-zinc-800',
    linkBackground: 'bg-zinc-800',
    linkBorder: 'border-zinc-700',
    linkHoverBackground: 'hover:bg-zinc-700',
    linkHoverBorder: 'hover:border-zinc-600',
    accent: 'text-purple-400'
  },
  {
    id: 'light',
    name: 'Light',
    description: 'Clean light theme',
    background: 'bg-white',
    text: 'text-black',
    cardBackground: 'bg-gray-50',
    cardBorder: 'border-gray-200',
    linkBackground: 'bg-white',
    linkBorder: 'border-gray-300',
    linkHoverBackground: 'hover:bg-gray-50',
    linkHoverBorder: 'hover:border-gray-400',
    accent: 'text-purple-600'
  },
  {
    id: 'purple',
    name: 'Purple',
    description: 'Purple gradient theme',
    background: 'bg-gradient-to-br from-purple-900 via-purple-900 to-purple-800',
    text: 'text-white',
    cardBackground: 'bg-purple-800/50 backdrop-blur-sm',
    cardBorder: 'border-purple-700/50',
    linkBackground: 'bg-purple-700/50',
    linkBorder: 'border-purple-600/50',
    linkHoverBackground: 'hover:bg-purple-600/50',
    linkHoverBorder: 'hover:border-purple-500/50',
    accent: 'text-purple-200'
  },
  {
    id: 'blue',
    name: 'Ocean',
    description: 'Blue ocean theme',
    background: 'bg-gradient-to-br from-blue-900 via-blue-900 to-blue-800',
    text: 'text-white',
    cardBackground: 'bg-blue-800/50 backdrop-blur-sm',
    cardBorder: 'border-blue-700/50',
    linkBackground: 'bg-blue-700/50',
    linkBorder: 'border-blue-600/50',
    linkHoverBackground: 'hover:bg-blue-600/50',
    linkHoverBorder: 'hover:border-blue-500/50',
    accent: 'text-blue-200'
  },
  {
    id: 'green',
    name: 'Forest',
    description: 'Green nature theme',
    background: 'bg-gradient-to-br from-green-900 via-green-900 to-green-800',
    text: 'text-white',
    cardBackground: 'bg-green-800/50 backdrop-blur-sm',
    cardBorder: 'border-green-700/50',
    linkBackground: 'bg-green-700/50',
    linkBorder: 'border-green-600/50',
    linkHoverBackground: 'hover:bg-green-600/50',
    linkHoverBorder: 'hover:border-green-500/50',
    accent: 'text-green-200'
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Warm sunset theme',
    background: 'bg-gradient-to-br from-orange-600 via-orange-500 to-orange-600',
    text: 'text-white',
    cardBackground: 'bg-white/10 backdrop-blur-sm',
    cardBorder: 'border-white/20',
    linkBackground: 'bg-white/10',
    linkBorder: 'border-white/20',
    linkHoverBackground: 'hover:bg-white/20',
    linkHoverBorder: 'hover:border-white/30',
    accent: 'text-orange-200'
  },
  {
    id: 'midnight',
    name: 'Midnight',
    description: 'Deep dark theme',
    background: 'bg-gradient-to-br from-gray-900 via-gray-900 to-black',
    text: 'text-white',
    cardBackground: 'bg-black/50 backdrop-blur-sm',
    cardBorder: 'border-gray-800',
    linkBackground: 'bg-gray-900/50',
    linkBorder: 'border-gray-700',
    linkHoverBackground: 'hover:bg-gray-800/50',
    linkHoverBorder: 'hover:border-gray-600',
    accent: 'text-gray-300'
  }
]

export function getTheme(themeId: string): Theme {
  return THEMES.find(theme => theme.id === themeId) || THEMES[0]
} 