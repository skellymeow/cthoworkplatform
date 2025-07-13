import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { getSocialIcon } from "@/lib/constants/social-platforms"
import { ArrowRight, ExternalLink, Globe, Link } from "lucide-react"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import PageViewTracker from "@/components/PageViewTracker"


export default async function ProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()
  
  // Get profile
  const { data: profile, error } = await supabase
    .from('link_bio_profiles')
    .select('*')
    .eq('slug', slug.toLowerCase())
    .eq('is_live', true)
    .single()

  if (error || !profile) {
    notFound()
  }

  // Get social links
  const { data: socials } = await supabase
    .from('link_bio_socials')
    .select('*')
    .eq('profile_id', profile.id)
    .eq('is_active', true)
    .order('order_index')

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <PageViewTracker profileId={profile.id} />
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-md shadow-lg p-8 flex flex-col items-center gap-6">

          
          {/* Title */}
          {profile.title && (
            <h1 className="text-2xl font-bold text-white text-center">
              {profile.title}
            </h1>
          )}
          
          {/* Username */}
          <h2 className="text-lg text-gray-400 text-center">
            @{profile.slug}
          </h2>
          
          {/* Description */}
          {profile.description && (
            <p className="text-gray-300 text-center text-sm leading-relaxed">
              {profile.description}
            </p>
          )}
          
          {/* Social Links */}
                             {socials && socials.length > 0 && (
                     <div className="w-full space-y-3">
                       {socials.map((social) => (
                         <a
                           key={social.id}
                           href={social.url}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white hover:bg-zinc-800 hover:border-zinc-700 transition-all flex items-center justify-between group"
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
                           <ExternalLink className="w-4 h-4 text-purple-400" />
                         </a>
                       ))}
                     </div>
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
              className="bg-zinc-900 border border-zinc-800 rounded-md px-5 py-3 shadow-lg text-sm font-semibold text-white hover:bg-zinc-800 hover:border-zinc-700 transition-all flex items-center gap-2"
            >
              Create your own website
              <ArrowRight className="w-4 h-4 text-purple-400" />
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