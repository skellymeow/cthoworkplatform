import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Award, Flame, Ghost, Star, Shield, Heart, Sun, Moon, Cloud, Zap, Skull, Leaf, Droplet, Eye, Lock, User, Rocket, Bug, Smile, BookOpen, Music, Camera, Globe, Key, Bell, Gift, Trophy, Feather, Anchor, Compass, Umbrella, Puzzle } from "lucide-react"
import React from "react"

const BADGES = [
  { name: "Founder", icon: Award, color: "text-yellow-400", glow: "shadow-yellow-400/40" },
  { name: "OG", icon: Star, color: "text-purple-400", glow: "shadow-purple-400/40" },
  { name: "Skelly", icon: Ghost, color: "text-zinc-400", glow: "shadow-zinc-400/40" },
  { name: "Flame", icon: Flame, color: "text-orange-500", glow: "shadow-orange-500/40" },
  { name: "Bloody", icon: Droplet, color: "text-red-500", glow: "shadow-red-500/40" },
  { name: "Nightmare", icon: Skull, color: "text-pink-900", glow: "shadow-pink-900/40" },
  { name: "Sunshine", icon: Sun, color: "text-yellow-300", glow: "shadow-yellow-300/40" },
  { name: "Moonlight", icon: Moon, color: "text-blue-300", glow: "shadow-blue-300/40" },
  { name: "Cloudwalker", icon: Cloud, color: "text-gray-300", glow: "shadow-gray-300/40" },
  { name: "Shocker", icon: Zap, color: "text-blue-500", glow: "shadow-blue-500/40" },
  { name: "Protector", icon: Shield, color: "text-green-400", glow: "shadow-green-400/40" },
  { name: "Lover", icon: Heart, color: "text-pink-400", glow: "shadow-pink-400/40" },
  { name: "Leafy", icon: Leaf, color: "text-green-500", glow: "shadow-green-500/40" },
  { name: "Watcher", icon: Eye, color: "text-cyan-400", glow: "shadow-cyan-400/40" },
  { name: "Scholar", icon: BookOpen, color: "text-indigo-400", glow: "shadow-indigo-400/40" },
  { name: "Locked", icon: Lock, color: "text-zinc-700", glow: "shadow-zinc-700/40", locked: true },
]

export default function BadgeInventoryModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-zinc-900 border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-white text-xl mb-2">Badge Inventory</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 gap-6 py-4">
          {BADGES.map((badge, i) => (
            <div
              key={badge.name}
              className={`flex flex-col items-center justify-center aspect-square rounded-lg bg-zinc-950 border border-zinc-800 relative group transition-all ${badge.locked ? "opacity-40 grayscale" : ""} ${badge.glow} hover:scale-105`}
            >
              <badge.icon className={`w-8 h-8 mb-2 ${badge.color} drop-shadow-lg`} />
              <span className="text-xs text-gray-300 font-semibold text-center pointer-events-none select-none">
                {badge.locked ? "Locked" : badge.name}
              </span>
              <span className="absolute left-1/2 -translate-x-1/2 bottom-2 z-10 hidden group-hover:block bg-black/90 text-white text-xs rounded px-2 py-1 border border-zinc-700 whitespace-nowrap shadow-lg pointer-events-none">
                {badge.locked ? "Unlock this badge by achieving something special!" : badge.name}
              </span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
} 