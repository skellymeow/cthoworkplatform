import { notFound } from "next/navigation"
import { getResourceBySlug } from "@/lib/markdown"
import ResourceClient from "./ResourceClient"

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getResourceBySlug(params.slug)
  if (!post) notFound()
  
  return <ResourceClient post={post} />
} 