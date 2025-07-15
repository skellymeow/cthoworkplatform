'use client'

import Link from "next/link"
import { BookOpen, Users, LayoutDashboard, BarChart3, Edit3, Lock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-zinc-800 w-full">
      {/* Top Row: Minimal Card Buttons */}
      <div className="w-full flex flex-col items-center pt-2 pb-0 m-0">
        <div className="w-full flex flex-row flex-wrap justify-center items-center gap-x-1 gap-y-1 px-0 m-0">
          <Link href="/resources" className="group flex items-center gap-1 px-[2.04rem] py-[1.02rem] bg-zinc-900 border border-zinc-800 rounded-md hover:bg-zinc-800 transition-colors w-full sm:w-auto text-center justify-center">
            <BookOpen className="w-[1.02rem] h-[1.02rem] text-purple-400" />
            <span className="text-xs font-medium">Resources</span>
          </Link>
          <Link href="/affiliates" className="group flex items-center gap-1 px-[2.04rem] py-[1.02rem] bg-zinc-900 border border-zinc-800 rounded-md hover:bg-zinc-800 transition-colors w-full sm:w-auto text-center justify-center">
            <Users className="w-[1.02rem] h-[1.02rem] text-green-400" />
            <span className="text-xs font-medium">Affiliates</span>
          </Link>
          <Link href="/dashboard" className="group flex items-center gap-1 px-[2.04rem] py-[1.02rem] bg-zinc-900 border border-zinc-800 rounded-md hover:bg-zinc-800 transition-colors w-full sm:w-auto text-center justify-center">
            <LayoutDashboard className="w-[1.02rem] h-[1.02rem] text-blue-400" />
            <span className="text-xs font-medium">Dashboard</span>
          </Link>
          <Link href="/dashboard/analytics" className="group flex items-center gap-1 px-[2.04rem] py-[1.02rem] bg-zinc-900 border border-zinc-800 rounded-md hover:bg-zinc-800 transition-colors w-full sm:w-auto text-center justify-center">
            <BarChart3 className="w-[1.02rem] h-[1.02rem] text-cyan-400" />
            <span className="text-xs font-medium">Analytics</span>
          </Link>
          <Link href="/dashboard/website-editor" className="group flex items-center gap-1 px-[2.04rem] py-[1.02rem] bg-zinc-900 border border-zinc-800 rounded-md hover:bg-zinc-800 transition-colors w-full sm:w-auto text-center justify-center">
            <Edit3 className="w-[1.02rem] h-[1.02rem] text-pink-400" />
            <span className="text-xs font-medium">Website Builder</span>
          </Link>
          <Link href="/dashboard/content-lockers" className="group flex items-center gap-1 px-[2.04rem] py-[1.02rem] bg-zinc-900 border border-zinc-800 rounded-md hover:bg-zinc-800 transition-colors w-full sm:w-auto text-center justify-center">
            <Lock className="w-[1.02rem] h-[1.02rem] text-fuchsia-400" />
            <span className="text-xs font-medium">Content Lockers</span>
          </Link>
          <a href="https://discord.com/invite/wTtASPhuNS" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-1 px-[2.04rem] py-[1.02rem] bg-zinc-900 border border-zinc-800 rounded-md hover:bg-zinc-800 transition-colors w-full sm:w-auto text-center justify-center">
            <img src="/discord.png" alt="Discord" className="w-[1.02rem] h-[1.02rem]" />
            <span className="text-xs font-medium">Discord</span>
          </a>
        </div>
      </div>
      {/* Huge Logo - Cropped visually */}
      <div className="flex flex-col items-center justify-center py-2 m-0 w-full">
        <div className="w-full max-w-[650px] h-[96%] relative overflow-hidden flex items-center justify-center" style={{height:'140px', maxHeight:'140px'}}>
          <img src="/cthoworkwhitetext.png" alt="CTHO.WORK" className="w-full h-auto mx-auto relative" style={{objectFit:'cover', objectPosition:'center', height:'140px', top:'-15%'}} />
        </div>
      </div>
      {/* Bottom Row */}
      <div className="w-full flex flex-col md:flex-row justify-center items-center text-xs font-semibold tracking-widest uppercase px-0 pb-2 gap-1 m-0">
        <span className="text-gray-400 text-xs">© {new Date().getFullYear()} CTHO.WORK</span>
        <div className="flex flex-row items-center gap-2 ml-2">
          <Link href="/terms" className="hover:text-purple-400">Terms</Link>
          <Link href="/privacy" className="hover:text-purple-400">Privacy</Link>
        </div>
      </div>
    </footer>
  )
} 