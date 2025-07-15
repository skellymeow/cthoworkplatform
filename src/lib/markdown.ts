import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export interface ResourcePost {
  slug: string
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  category: string
  content: string
  contentHtml: string
}

const resourcesDirectory = path.join(process.cwd(), 'content/resources')

export async function getAllResources(): Promise<ResourcePost[]> {
  // Get file names under /content/resources
  const fileNames = fs.readdirSync(resourcesDirectory)
  const allResourcesData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get slug
    const slug = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(resourcesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Use remark to convert markdown into HTML string
    const processedContent = remark()
      .use(html)
      .processSync(matterResult.content)
    const contentHtml = processedContent.toString()

    // Combine the data with the slug
    const resource: ResourcePost = {
      slug,
      title: matterResult.data.title,
      excerpt: matterResult.data.excerpt,
      author: matterResult.data.author,
      date: matterResult.data.date,
      readTime: matterResult.data.readTime,
      category: matterResult.data.category,
      content: matterResult.content,
      contentHtml,
    }

    return resource
  })

  // Sort posts by date
  return allResourcesData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getResourceBySlug(slug: string): Promise<ResourcePost | null> {
  try {
    const fullPath = path.join(resourcesDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Use remark to convert markdown into HTML string
    const processedContent = remark()
      .use(html)
      .processSync(matterResult.content)
    const contentHtml = processedContent.toString()

    // Combine the data with the slug
    const resource: ResourcePost = {
      slug,
      title: matterResult.data.title,
      excerpt: matterResult.data.excerpt,
      author: matterResult.data.author,
      date: matterResult.data.date,
      readTime: matterResult.data.readTime,
      category: matterResult.data.category,
      content: matterResult.content,
      contentHtml,
    }

    return resource
  } catch {
    return null
  }
}

export async function getAllResourceSlugs(): Promise<string[]> {
  const fileNames = fs.readdirSync(resourcesDirectory)
  return fileNames.map((fileName) => fileName.replace(/\.md$/, ''))
} 