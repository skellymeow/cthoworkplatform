'use client'

import { useMemo } from "react"
import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import Link from "next/link"
import { ArrowLeft, Clock, User, Calendar, Menu } from "lucide-react"
import Footer from "@/components/Footer"
import { ResourcePost } from "@/lib/markdown"
import ConsistentHeader from "@/components/ui/consistent-header"
import DOMPurify from 'dompurify'

const AUTHOR = {
  name: "skelly",
  avatar: "/skellychannelpfp.jpg",
  subtitle: "roblox youtuber",
  youtube: "https://www.youtube.com/@skellythekitten/videos"
};

interface ResourceClientProps {
  post: ResourcePost
}

function extractToc(html: string) {
  const div = document.createElement('div')
  div.innerHTML = DOMPurify.sanitize(html)
  const headings = Array.from(div.querySelectorAll('h2, h3'))
  return headings.map((el) => ({
    id: el.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    text: el.textContent || '',
    level: el.tagName === 'H2' ? 2 : 3
  }))
}

export default function ResourceClient({ post }: ResourceClientProps) {
  const toc = useMemo(() => extractToc(post.contentHtml), [post.contentHtml])
  const sanitizedContent = useMemo(() => DOMPurify.sanitize(post.contentHtml), [post.contentHtml])

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <ConsistentHeader 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Resources", href: "/resources" },
          { label: post.title }
        ]}
        showBackButton={true}
        backHref="/resources"
        backLabel="Back to Resources"
      />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-zinc-950 via-black to-zinc-900 border-b border-zinc-800 px-0 sm:px-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-2">
              <span className="inline-flex items-center gap-2"><User className="w-4 h-4" />{post.author}</span>
              <span className="inline-flex items-center gap-2"><Calendar className="w-4 h-4" />{new Date(post.date).toLocaleDateString()}</span>
              <span className="inline-flex items-center gap-2"><Clock className="w-4 h-4" />{post.readTime}</span>
              <span className="inline-flex items-center gap-2 bg-purple-900/40 text-purple-300 px-2 py-1 rounded text-xs font-semibold border border-purple-800">{post.category}</span>
            </div>
            <p className="text-gray-400 text-base max-w-2xl mb-4">{post.excerpt}</p>
            <div className="flex items-center gap-3 mt-2">
              <img src={AUTHOR.avatar} alt={AUTHOR.name} className="w-10 h-10 rounded-full border-2 border-purple-500" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-base">{AUTHOR.name}</span>
                  <a href={AUTHOR.youtube} target="_blank" rel="noopener noreferrer" className="ml-2 text-purple-400 hover:text-purple-300 underline text-xs">YouTube</a>
                </div>
                <div className="text-gray-400 text-xs">{AUTHOR.subtitle}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout */}
      <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-0 md:gap-8 px-0 sm:px-4">
        {/* Left Sidebar (desktop only) */}
        <aside className="md:w-48 shrink-0 hidden md:block pt-12">
          <div className="sticky top-24 flex flex-col gap-2">
            <Link href="/resources" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-purple-400 font-semibold text-sm transition-colors">
              <ArrowLeft className="w-4 h-4" /> All Resources
            </Link>
            <Link href="/dashboard" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-gray-400 font-semibold text-sm transition-colors">
              <Menu className="w-4 h-4" /> Dashboard
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <article className="flex-1 min-w-0 py-8 md:py-12 px-4 sm:px-8 prose prose-invert prose-lg max-w-none border-x border-zinc-800 bg-black/80">
          <div className="text-gray-300 leading-relaxed space-y-6" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        </article>

        {/* Right Sidebar: Table of Contents */}
        <aside className="md:w-64 shrink-0 pt-12 hidden md:block">
          <div className="sticky top-24">
            <div className="mb-4 text-sm font-bold text-white">Table of contents</div>
            <nav className="flex flex-col gap-1 text-sm">
              {toc.length === 0 && <span className="text-gray-500">No sections</span>}
              {toc.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`block px-2 py-1 rounded hover:bg-zinc-800 transition-colors ${item.level === 2 ? 'font-semibold text-purple-300' : 'pl-4 text-gray-400'}`}
                >
                  {item.text}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>
      <Footer />
    </main>
  )
} 