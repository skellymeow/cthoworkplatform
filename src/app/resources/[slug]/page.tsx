import { notFound } from "next/navigation"
import { getResourceBySlug } from "@/lib/markdown"
import ResourceClient from "./ResourceClient"

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getResourceBySlug(slug)
  if (!post) notFound()
  return <ResourceClient post={post} />
} 