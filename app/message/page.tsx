"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import FloatingHearts from "@/components/FloatingHearts"
import TypewriterText from "@/components/TypewriterText"
import { ChevronDown } from "lucide-react"

const MESSAGE = `Happy Birthday, Humera 💗

You are one of the most special people in this world. The way you smile, the way you care, the way you glow, everything about you is pure magic.

On your 16th birthday, I pray all your dreams come true ✨

Never stop being the beautiful soul you are 💫`

export default function MessagePage() {
  const router = useRouter()
  const [showSparkles, setShowSparkles] = useState(false)

  useEffect(() => {
    setShowSparkles(true)
  }, [])

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center px-4 py-8">
      <FloatingHearts />

      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-soft-rose/20 rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-lavender/20 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Back button */}
      <motion.button
        onClick={() => router.push("/memory")}
        className="absolute top-6 left-6 z-20 px-4 py-2 glass rounded-full text-foreground hover:bg-white/20 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Back
      </motion.button>

      <motion.div
        className="relative z-10 max-w-2xl mx-auto w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Pulsing heart background */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
          <motion.div
            className="text-9xl opacity-5"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            💗
          </motion.div>
        </div>

        {/* Message card */}
        <div className="glass rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50">
          {/* Typewriter text */}
          <TypewriterText text={MESSAGE} />

          {/* Sparkles animation */}
          {showSparkles && (
            <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-gold rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    y: -50,
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    delay: i * 0.2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <motion.button
          onClick={() => router.push("/cake")}
          className="w-full mt-12 px-8 py-4 bg-gradient-to-r from-lavender to-peach hover:from-lavender/90 hover:to-peach/90 text-foreground font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="flex items-center justify-center gap-2">
            Make a Wish with Me 🎂
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </span>
        </motion.button>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-foreground/60"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        
      </motion.div>
    </div>
  )
}
