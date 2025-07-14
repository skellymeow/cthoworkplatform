'use client'

import { motion, AnimatePresence } from "framer-motion"
import { animations } from "@/lib/animations"
import { THEMES, Theme, getTheme } from "@/lib/constants/themes"
import { Check, Palette, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

interface ThemeSelectorProps {
  currentTheme: string
  onThemeChange: (themeId: string) => void
}

export default function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  const currentThemeData = getTheme(currentTheme)
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div 
      className="bg-zinc-900 border border-zinc-800 rounded-lg"
      {...animations.fadeInUpDelayed(0.8)}
      whileHover={{ scale: 1.001 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* Header - Always Visible */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between text-left"
        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center gap-3">
          <Palette className="w-5 h-5 text-purple-400" />
          <div>
            <div className="text-lg font-semibold text-white">Theme</div>
            <div className="text-sm text-gray-400">{currentThemeData.name}</div>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </motion.button>

      {/* Collapsible Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-zinc-800"
          >
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3">
                {THEMES.map((theme, index) => (
                  <motion.button
                    key={theme.id}
                    onClick={() => onThemeChange(theme.id)}
                    className={`relative p-3 rounded-lg border-2 transition-all ${
                      currentTheme === theme.id 
                        ? 'border-purple-500 ring-2 ring-purple-500/20' 
                        : 'border-zinc-700 hover:border-zinc-600'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Theme Preview */}
                    <div className={`w-full h-16 rounded mb-2 ${theme.background}`}>
                      <div className={`w-full h-full p-2 ${theme.cardBackground} ${theme.cardBorder} border rounded`}>
                        <div className={`w-3 h-3 rounded-full ${theme.accent} bg-current`} />
                      </div>
                    </div>
                    
                    {/* Theme Info */}
                    <div className="text-left">
                      <div className={`text-sm font-medium ${currentTheme === theme.id ? 'text-white' : 'text-gray-300'}`}>
                        {theme.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {theme.description}
                      </div>
                    </div>
                    
                    {/* Selected Check */}
                    {currentTheme === theme.id && (
                      <motion.div 
                        className="absolute top-2 right-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
} 