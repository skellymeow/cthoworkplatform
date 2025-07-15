import { getAllResources } from "@/lib/markdown"
import ResourcesClient from "./ResourcesClient"

export default async function Resources() {
  // Get all resources from markdown files
  const blogPosts = await getAllResources()

  return <ResourcesClient blogPosts={blogPosts} />
} 