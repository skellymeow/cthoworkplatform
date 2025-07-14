import { motion } from "framer-motion"
import { animations } from "@/lib/animations"
import { User, Eye, BarChart3, Mail, Flag, LockOpen, Heart, Sparkles } from "lucide-react"

export default function BentoSection() {
  return (
    <section className="py-12 bg-black px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-10"
          {...animations.fadeInUpDelayed(0.1)}
        >
          <motion.h2 
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4"
            {...animations.fadeInUpDelayed(0.2)}
          >
            That's not all...
          </motion.h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Card 1 */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-[3px] p-6 flex items-start gap-4 shadow-lg">
            <User className="w-7 h-7 text-purple-400 mt-1" />
            <div>
              <div className="font-bold text-lg text-white mb-1">Claim your username</div>
              <div className="text-gray-400 text-sm">Secure unique usernames like cthowork.com/u/yourname for your brand identity.</div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-[3px] p-6 flex items-start gap-4 shadow-lg">
            <Eye className="w-7 h-7 text-blue-400 mt-1" />
            <div>
              <div className="font-bold text-lg text-white mb-1">Live website preview</div>
              <div className="text-gray-400 text-sm">Edit your bio site in real-time with mobile, tablet, and desktop previews.</div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-[3px] p-6 flex items-start gap-4 shadow-lg">
            <BarChart3 className="w-7 h-7 text-green-400 mt-1" />
            <div>
              <div className="font-bold text-lg text-white mb-1">Track everything</div>
              <div className="text-gray-400 text-sm">Monitor page views, locker engagement, and subscriber growth with comprehensive analytics.</div>
            </div>
          </div>
          {/* Card 4 */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-[3px] p-6 flex items-start gap-4 shadow-lg">
            <Mail className="w-7 h-7 text-orange-400 mt-1" />
            <div>
              <div className="font-bold text-lg text-white mb-1">Build your email list</div>
              <div className="text-gray-400 text-sm">Collect newsletter subscribers directly from your bio site with integrated signup forms.</div>
            </div>
          </div>
          {/* Card 5 */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-[3px] p-6 flex items-start gap-4 shadow-lg">
            <Flag className="w-7 h-7 text-yellow-400 mt-1" />
            <div>
              <div className="font-bold text-lg text-white mb-1">Set goals</div>
              <div className="text-gray-400 text-sm">Show supporters what they’re contributing towards with funding goals.</div>
            </div>
          </div>
          {/* Card 6 */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-[3px] p-6 flex items-start gap-4 shadow-lg">
            <LockOpen className="w-7 h-7 text-green-400 mt-1" />
            <div>
              <div className="font-bold text-lg text-white mb-1">Share exclusive content</div>
              <div className="text-gray-400 text-sm">Offer premium content to supporters or members.</div>
            </div>
          </div>
          {/* Card 7 */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-[3px] p-6 flex items-start gap-4 shadow-lg">
            <Heart className="w-7 h-7 text-rose-400 mt-1" />
            <div>
              <div className="font-bold text-lg text-white mb-1">Build superfans</div>
              <div className="text-gray-400 text-sm">Turn casual followers into loyal superfans with rewards and recognition.</div>
            </div>
          </div>
          {/* Card 8 */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-[3px] p-6 flex items-start gap-4 shadow-lg">
            <Sparkles className="w-7 h-7 text-purple-400 mt-1" />
            <div>
              <div className="font-bold text-lg text-white mb-1">Automate & grow</div>
              <div className="text-gray-400 text-sm">Automate your workflow and grow your community with smart tools.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 