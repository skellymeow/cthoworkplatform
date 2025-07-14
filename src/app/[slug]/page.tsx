import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import LockerClient from "./LockerClient"
import { ExternalLink } from "lucide-react"

export default async function LockerPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient()
  // Try to find an active content locker with this slug
  const { data: locker } = await supabase
    .from('content_lockers')
    .select('*')
    .eq('slug', params.slug)
    .eq('is_active', true)
    .single()

  if (!locker) {
    notFound()
  }

  // Offers array
  const offers = [
    locker.offer1_url && { url: locker.offer1_url, title: 'Step 1', subtitle: 'Complete this offer', required: true },
    locker.offer2_url && { url: locker.offer2_url, title: 'Step 2', subtitle: 'Optional offer', required: false },
    locker.offer3_url && { url: locker.offer3_url, title: 'Step 3', subtitle: 'Optional offer', required: false },
  ].filter(Boolean)

  return <LockerClient locker={locker} offers={offers} />
} 