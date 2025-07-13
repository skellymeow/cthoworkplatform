import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: profile, error } = await supabase
    .from('link_bio_profiles')
    .select('*')
    .eq('slug', slug.toLowerCase())
    .eq('is_live', true)
    .single()

  if (error || !profile) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-md shadow-lg p-8 flex flex-col items-center gap-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight text-center">
            @{profile.slug}
          </h1>
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