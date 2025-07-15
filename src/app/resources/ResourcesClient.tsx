'use client'

import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import Link from "next/link"
import { BookOpen, Clock } from "lucide-react"
import Footer from "@/components/Footer"
import { ResourcePost } from "@/lib/markdown"
import ConsistentHeader from "@/components/ui/consistent-header"

// Sample blog posts data
const AUTHOR = {
  name: "skelly",
  avatar: "/skellychannelpfp.jpg",
  subtitle: "roblox youtuber",
  youtube: "https://www.youtube.com/@skellythekitten/videos"
};

interface ResourcesClientProps {
  blogPosts: ResourcePost[]
}

export default function ResourcesClient({ blogPosts }: ResourcesClientProps) {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      {/* Sticky Header */}
      <ConsistentHeader 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Resources" }
        ]}
        isDashboardPage={true}
      />

      <div className="flex-1">
        {/* Header */}
        <motion.div 
          className="max-w-6xl mx-auto px-6 py-12"
          {...animations.fadeInUp}
        >
          <motion.div 
            className="mb-8"
            {...animations.fadeInUpDelayed(0.1)}
          >
            <motion.h1 
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4"
              {...animations.fadeInUpDelayed(0.2)}
            >
              Resources
            </motion.h1>
            <motion.p 
              className="text-gray-400 text-base"
              {...animations.fadeInUpDelayed(0.3)}
            >
              Guides, tutorials, and insights for growing your Roblox community
            </motion.p>
          </motion.div>

          {/* Blog Posts Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            {...animations.fadeInUpDelayed(0.2)}
          >
            {blogPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/resources/${post.slug}`}
                className="group block focus:outline-none"
                tabIndex={0}
              >
                <motion.div
                  className="bg-black border border-zinc-800 p-6 rounded-lg group-hover:border-zinc-700 group-focus:border-purple-500 transition-colors cursor-pointer h-full"
                  {...animations.fadeInUpDelayed(0.3 + index * 0.1)}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-semibold text-purple-400 bg-purple-400/10 px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">•</span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-purple-400 group-focus:text-purple-400 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Author Card */}
                  <div className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-800 rounded-lg p-3 mb-4">
                    <img src={AUTHOR.avatar} alt={AUTHOR.name} className="w-8 h-8 rounded-full border-2 border-purple-500" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{AUTHOR.name}</span>
                        <a href={AUTHOR.youtube} target="_blank" rel="noopener noreferrer" className="ml-2 text-purple-400 hover:text-purple-300 underline text-xs">YouTube</a>
                      </div>
                      <div className="text-gray-400 text-xs">{AUTHOR.subtitle}</div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>

          {/* Coming Soon Section */}
          <motion.div 
            className="mt-12 text-center"
            {...animations.fadeInUpDelayed(0.6)}
          >
            <div className="bg-black border border-zinc-800 p-8 rounded-lg max-w-2xl mx-auto">
              <BookOpen className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">More Resources Coming Soon</h3>
              <p className="text-gray-400">
                We&apos;re constantly adding new guides, tutorials, and insights to help you succeed.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </main>
  )
} 