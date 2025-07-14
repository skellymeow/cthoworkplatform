'use client'

import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import Link from "next/link"
import { BookOpen, Lock, User, BarChart3, Users, ExternalLink } from "lucide-react"

export default function Footer() {
  const year = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Resources",
      href: "/resources",
      icon: BookOpen,
      description: "Guides, tutorials & insights"
    },
    {
      title: "Content Lockers",
      href: "/dashboard/content-lockers",
      icon: Lock,
      description: "Gate content behind offers"
    },
    {
      title: "Bio Site Builder",
      href: "/dashboard/website-editor",
      icon: User,
      description: "Create your link-in-bio"
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
      description: "Track performance & growth"
    },
    {
      title: "Refer a Friend",
      href: "/affiliates",
      icon: Users,
      description: "Earn rewards together"
    }
  ];

  return (
    <footer className="bg-black text-white">
      <div className="py-12 px-6">
        <motion.div 
          className="max-w-7xl mx-auto"
          {...animations.fadeInUp}
        >
          {/* Main Logo - Much Smaller */}
          <motion.div 
            className="text-center mb-8"
            {...animations.fadeInUpDelayed(0.1)}
          >
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-2">
              CTHO<span className="text-purple-500 rounded-[3px]">.</span>WORK
            </h1>
            <motion.p 
              className="text-sm md:text-base text-gray-400 font-light tracking-wide"
              {...animations.fadeInUpDelayed(0.15)}
            >
              where creators unite & win
            </motion.p>
          </motion.div>

          {/* Feature Links Grid - Much Smaller */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-8"
            {...animations.fadeInUpDelayed(0.2)}
          >
            {footerLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <motion.div
                  key={link.title}
                  className="group"
                  {...animations.fadeInUpDelayed(0.3 + index * 0.1)}
                >
                  <Link
                    href={link.href}
                    className="block p-3 bg-zinc-900/50 border border-zinc-800 rounded-[3px] hover:border-purple-500/50 hover:bg-zinc-800/50 transition-all duration-300 group-hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-purple-600/20 border border-purple-500/30 rounded-[3px] flex items-center justify-center group-hover:bg-purple-600/30 transition-colors">
                        <IconComponent className="w-3 h-3 text-purple-400" />
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-white font-semibold text-xs">{link.title}</span>
                        <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-purple-400 transition-colors" />
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      {link.description}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Legal Links */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6"
            {...animations.fadeInUpDelayed(0.4)}
          >
            <motion.a 
              href="/privacy" 
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium hover:scale-105"
              {...animations.hoverScale}
            >
              Privacy Policy
            </motion.a>
            <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full"></div>
            <motion.a 
              href="/terms" 
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium hover:scale-105"
              {...animations.hoverScale}
            >
              Terms of Service
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Copyright Bar - No Separator */}
      <motion.div 
        className="bg-zinc-950/50"
        {...animations.fadeInUpDelayed(0.5)}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <motion.p 
              className="text-gray-500 text-xs font-medium"
              {...animations.fadeInUpDelayed(0.6)}
            >
              © {year} CTHO.WORK. All rights reserved.
            </motion.p>
            <motion.div 
              className="flex items-center gap-2 text-xs"
              {...animations.fadeInUpDelayed(0.7)}
            >
              <a
                href="https://www.youtube.com/@skellythekitten/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-500 hover:text-purple-400 transition-colors font-medium group"
              >
                <img
                  src="/skellychannelpfp.jpg"
                  alt="skelly pfp"
                  className="w-4 h-4 rounded-full border border-zinc-700 shadow-sm group-hover:border-purple-500 transition-colors"
                  style={{ display: 'inline-block', verticalAlign: 'middle' }}
                />
                <span>made with {'<3'} by skelly</span>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </footer>
  )
} 