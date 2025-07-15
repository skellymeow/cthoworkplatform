import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { getSocialIcon } from "@/lib/constants/social-platforms"
import { getTheme } from "@/lib/constants/themes"
import { Globe, Link, ArrowRight, ExternalLink } from "lucide-react"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import PageViewTracker from "@/components/PageViewTracker"
import NewsletterForm from "@/components/ui/newsletter-form"

function getAbsoluteUrl(url: string): string {
  if (!url) return ''
  if (/^https?:\/\//i.test(url)) return url
  return `https://${url}`
}

export default async function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  
  // Get profile (regardless of live status)
  const { data: profile, error } = await supabase
    .from('link_bio_profiles')
    .select('*')
    .eq('slug', slug.toLowerCase())
    .single()

  if (error || !profile) {
    notFound()
  }

  // If not live, show under construction state
  if (!profile.is_live) {
    const theme = getTheme(profile.theme || 'default')
    return (
      <main className={`min-h-screen ${theme.background} ${theme.text} flex flex-col items-center justify-center px-4`}>
        <div className="flex-1 flex flex-col items-center justify-center w-full">
          <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto py-16">
            <h1 className={`text-2xl font-bold ${theme.text} text-center`}>This website is under development</h1>
            <h2 className={`text-lg ${theme.accent} text-center`}>@{profile.slug}</h2>
            <p className={`${theme.text} text-center text-sm leading-relaxed opacity-80`}>The owner has claimed this username, but their site isn&apos;t live yet.</p>
            <div className="w-full flex justify-center mt-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${theme.cardBackground} ${theme.cardBorder} border rounded-md px-5 py-3 shadow-lg text-sm font-semibold ${theme.text} ${theme.linkHoverBackground} ${theme.linkHoverBorder} transition-all flex items-center gap-2`}
                  >
                    Create your own website
                    <ArrowRight className={`w-4 h-4 ${theme.accent}`} />
                  </a>
                </TooltipTrigger>
                <TooltipContent sideOffset={8}>
                  <span className="flex items-center justify-center text-2xl font-bold tracking-tight">
                    <span className="text-white">CTHO</span>
                    <span className="text-purple-500 rounded-[3px]">.</span>
                    <span className="text-white">WORK</span>
                  </span>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </main>
    )
  }

  // Get social links
  const { data: socials } = await supabase
    .from('link_bio_socials')
    .select('*')
    .eq('profile_id', profile.id)
    .eq('is_active', true)
    .order('order_index')

  const theme = getTheme(profile.theme || 'default')

  return (
    <main className={`min-h-screen ${theme.background} ${theme.text} flex flex-col items-center justify-center px-4`}>
      <PageViewTracker profileId={profile.id} />
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <div className={`max-w-md w-full ${theme.cardBackground} ${theme.cardBorder} border rounded-md shadow-lg p-8 flex flex-col items-center gap-6`}>
          {/* Title */}
          {profile.title && (
            <h1 className={`text-2xl font-bold ${theme.text} text-center`}>
              {profile.title}
            </h1>
          )}
          {/* Username */}
          <h2 className={`text-lg ${theme.accent} text-center`}>
            @{profile.slug}
          </h2>
          {/* Description */}
          {profile.description && (
            <p className={`${theme.text} text-center text-sm leading-relaxed opacity-80`}>
              {profile.description}
            </p>
          )}
          {/* Social Links */}
          {socials && socials.length > 0 && (
            <div className="w-full space-y-3">
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={getAbsoluteUrl(social.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full ${theme.linkBackground} ${theme.linkBorder} border rounded-lg px-4 py-3 ${theme.text} ${theme.linkHoverBackground} ${theme.linkHoverBorder} transition-all flex items-center justify-between group`}
                >
                  <div className="flex items-center gap-3">
                    {getSocialIcon(social.platform).startsWith('/') ? (
                      <img 
                        src={getSocialIcon(social.platform)} 
                        alt={social.platform} 
                        className="w-5 h-5 rounded"
                      />
                    ) : (
                      <div className="w-5 h-5 flex items-center justify-center">
                        {getSocialIcon(social.platform) === 'globe' ? (
                          <Globe className="w-4 h-4" />
                        ) : (
                          <Link className="w-4 h-4" />
                        )}
                      </div>
                    )}
                    <span className="font-medium capitalize">{social.display_name || social.platform}</span>
                  </div>
                  <ExternalLink className={`w-4 h-4 ${theme.accent}`} />
                </a>
              ))}
            </div>
          )}
          {/* Newsletter Form */}
          {profile.newsletter_enabled && (
            <NewsletterForm profileId={profile.id} theme={theme} />
          )}
        </div>
      </div>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className={`${theme.cardBackground} ${theme.cardBorder} border rounded-md px-5 py-3 shadow-lg text-sm font-semibold ${theme.text} ${theme.linkHoverBackground} ${theme.linkHoverBorder} transition-all flex items-center gap-2`}
            >
              Create your own website
              <ArrowRight className={`w-4 h-4 ${theme.accent}`} />
            </a>
          </TooltipTrigger>
          <TooltipContent sideOffset={8}>
            Get started with your own profile
          </TooltipContent>
        </Tooltip>
      </div>
    </main>
  )
} 