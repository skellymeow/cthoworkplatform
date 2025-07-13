export interface SocialPlatform {
  value: string
  label: string
  icon: string
}

export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  { value: 'youtube', label: 'YouTube', icon: '/icons8-youtube-100.png' },
  { value: 'instagram', label: 'Instagram', icon: '/icons8-instagram-100.png' },
  { value: 'tiktok', label: 'TikTok', icon: '/icons8-tiktok-100.png' },
  { value: 'twitter', label: 'Twitter', icon: '/icons8-x-100.png' },
  { value: 'facebook', label: 'Facebook', icon: '/icons8-facebook-100.png' },
  { value: 'linkedin', label: 'LinkedIn', icon: '/icons8-linkedin-100.png' },
  { value: 'discord', label: 'Discord', icon: '/discord.png' },
  { value: 'website', label: 'Website', icon: 'globe' },
  { value: 'other', label: 'Other', icon: 'link' }
]

export const getSocialIcon = (platform: string): string => {
  const iconMap: { [key: string]: string } = {
    youtube: '/icons8-youtube-100.png',
    instagram: '/icons8-instagram-100.png',
    tiktok: '/icons8-tiktok-100.png',
    twitter: '/icons8-x-100.png',
    facebook: '/icons8-facebook-100.png',
    linkedin: '/icons8-linkedin-100.png',
    discord: '/discord.png',
    website: 'globe',
    other: 'link'
  }
  return iconMap[platform] || 'link'
} 