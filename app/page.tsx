"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import FloatingHearts from "@/components/FloatingHearts"
import FloatingButterflies from "@/components/FloatingButterflies"
import { Sparkles } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center px-4">
      {/* Floating effects */}
      <FloatingHearts />
      <FloatingButterflies />

      {/* Soft glowing orbs background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-soft-rose/20 rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-lavender/20 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-peach/10 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center max-w-2xl mx-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Date display */}
        <motion.div
          className="mb-8 flex items-center justify-center gap-3 text-gold font-bold text-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Sparkles className="w-6 h-6 animate-sparkle" />
          <span>28 • 11 • 2009 — The day a star was born</span>
          <Sparkles className="w-6 h-6 animate-sparkle" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-soft-rose via-lavender to-peach bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          A Special Day
        </motion.h1>

        {/* Subheading */}
        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-peach via-gold to-soft-rose bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        >
          for a Special Soul
        </motion.h2>

        {/* Heart emoji with animation */}
        <motion.div
          className="my-6 text-5xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
        >
          💖
        </motion.div>

        {/* Happy Birthday text */}
        <motion.p
          className="text-3xl md:text-4xl font-bold mb-8 text-foreground"
          style={{ fontFamily: "var(--font-dancing)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Happy Birthday Humera 🎂✨
        </motion.p>

        {/* Quote */}
        <motion.p
          className="text-lg md:text-xl text-foreground/70 mb-12 italic max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
        >
          "Some people are like sunsets... you never get tired of looking at them 🌇"
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={() => router.push("/memory")}
          className="px-8 md:px-12 py-4 md:py-5 bg-gradient-to-r from-soft-rose to-peach hover:from-soft-rose/90 hover:to-peach/90 text-white font-bold text-lg md:text-xl rounded-full shadow-xl hover:shadow-2xl transform transition-all bg-secondary-foreground"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <span className="flex items-center justify-center gap-2">
            Start the Surprise
            <Sparkles className="w-5 h-5" />
          </span>
        </motion.button>
      </motion.div>

      {/* Floating quote at bottom */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-foreground/60 text-sm max-w-xs"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      >
        <p>✨ Scroll or tap to continue your magical journey ✨</p>
      </motion.div>

      {/* Scroll indicator - IMPROVED VISIBILITY */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm md:text-base font-semibold text-foreground drop-shadow-lg">{""}</p>
          <motion.div
            className="flex flex-col items-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
