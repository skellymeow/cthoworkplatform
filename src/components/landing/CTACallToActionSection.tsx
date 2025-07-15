import { motion } from "framer-motion"
import Link from "next/link"
import { animations } from "@/lib/animations"

export default function CTACallToActionSection() {
  return (
    <section className="relative py-8 md:py-16 px-2 sm:px-4 md:px-8 flex items-center justify-center bg-gradient-to-br from-purple-900/80 via-black to-purple-800/60 border-t border-zinc-800 mt-8 md:mt-12 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-purple-700/20 rounded-full blur-[100px] md:blur-[160px] opacity-60 animate-pulse" />
      </div>
      <div className="relative z-10 w-full max-w-2xl mx-auto text-center flex flex-col items-center gap-4 md:gap-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2 md:mb-4 drop-shadow-lg">
          Ready to join the movement?
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-purple-200 mb-4 md:mb-6 font-light max-w-xl mx-auto">
          Claim your spot, connect with top creators, and unlock exclusive tools. Don't get left behind.
        </p>
        <motion.div
          {...animations.buttonHover}
        >
          <Link
            href="/auth"
            className="inline-flex items-center justify-center gap-3 bg-purple-600 text-white w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-[3px] text-base md:text-lg font-semibold hover:bg-purple-700 transition-all duration-300 shadow-2xl hover:shadow-purple-500/40 ring-2 ring-purple-400/30 hover:ring-purple-400/60 focus:ring-4 focus:ring-purple-500/50"
          >
            <img src="/googlesvg.webp" alt="Google" className="w-6 h-6" />
            Join the community for free
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 