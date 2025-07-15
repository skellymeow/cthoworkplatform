'use client'

import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import Link from "next/link"
import { BookOpen, Lock, User, BarChart3, Users, ExternalLink, MessageCircle } from "lucide-react"

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
    },
    {
      title: "Join Discord",
      href: "https://discord.com/invite/wTtASPhuNS",
      icon: MessageCircle,
      description: "Connect with creators"
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
            <img 
              src="/cthoworkwhitetext.png" 
              alt="CTHO.WORK logo" 
              className="mx-auto mb-2 w-64 md:w-40 lg:w-64 h-auto"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            <motion.p 
              className="text-sm md:text-base text-gray-400 font-light tracking-wide"
              {...animations.fadeInUpDelayed(0.15)}
            >
              where creators unite & win
            </motion.p>
          </motion.div>

          {/* Feature Links Grid - Much Smaller */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 mb-8"
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
                    className={`block p-3 border rounded-none transition-all duration-300 group-hover:scale-[1.02] ${
                      link.title === "Join Discord" 
                        ? "bg-zinc-900/50 border-zinc-800 hover:border-[#5865F2]/50 hover:bg-zinc-800/50" 
                        : "bg-zinc-900/50 border-zinc-800 hover:border-purple-500/50 hover:bg-zinc-800/50"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-6 h-6 border rounded-[3px] flex items-center justify-center transition-colors ${
                        link.title === "Join Discord"
                          ? "bg-[#5865F2]/20 border-[#5865F2]/30 group-hover:bg-[#5865F2]/30"
                          : "bg-purple-600/20 border-purple-500/30 group-hover:bg-purple-600/30"
                      }`}>
                        {link.title === "Join Discord" ? (
                          <img 
                            src="/discord.png" 
                            alt="Discord" 
                            className="w-3 h-3"
                          />
                        ) : (
                          <IconComponent className="w-3 h-3 text-purple-400" />
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-white font-semibold text-xs">{link.title}</span>
                        <ExternalLink className={`w-3 h-3 transition-colors ${
                          link.title === "Join Discord" ? "text-gray-400 group-hover:text-[#5865F2]" : "text-gray-400 group-hover:text-purple-400"
                        }`} />
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
        </motion.div>
      </div>

      {/* Copyright Bar - No Separator */}
      <motion.div 
        className="bg-zinc-950/50"
        {...animations.fadeInUpDelayed(0.5)}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0 items-center justify-center text-center md:text-left">
            <motion.p
              className="text-xs text-gray-400 mb-1 md:mb-0"
              {...animations.fadeInUpDelayed(0.6)}
            >
              By using ctho.work, you must agree to our
              <a href="/privacy" className="text-purple-400 hover:underline mx-1">Privacy Policy</a>
              and
              <a href="/terms" className="text-purple-400 hover:underline mx-1">Terms of Service</a>.
            </motion.p>
            <motion.p
              className="text-gray-500 text-xs font-medium"
              {...animations.fadeInUpDelayed(0.7)}
            >
              2025 CTHO.WORK. All rights reserved.
            </motion.p>
            <motion.div 
              className="flex items-center gap-2 text-xs mt-1 md:mt-0"
              {...animations.fadeInUpDelayed(0.8)}
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