"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import FloatingHearts from "@/components/FloatingHearts"
import { Sparkles, X } from "lucide-react"

const WISHES = [
  "You are made of stardust and dreams 🌟",
  "Stay cute, stay kind, stay YOU 💕",
  "This world is better since 28-11-2009",
  "Your laughter is contagious 😊",
  "You deserve all the happiness 💫",
  "Keep shining so bright ✨",
  "The best is yet to come 🎯",
  "You are loved so much 💗",
]

interface Star {
  id: number
  x: number
  y: number
}

export default function StarsPage() {
  const router = useRouter()
  const [stars, setStars] = useState<Star[]>([])
  const [selectedStar, setSelectedStar] = useState<number | null>(null)
  const [revealedStars, setRevealedStars] = useState<Set<number>>(new Set())

  useEffect(() => {
    const generateStars = () => {
      const minDistance = 15 // Reduced from 22 for better fit on mobile
      const newStars: Star[] = []
      const maxAttempts = 50 // Increased from 20 for better placement

      for (let i = 0; i < WISHES.length; i++) {
        let x, y, isValid
        let attempts = 0

        do {
          x = Math.random() * 80 + 10 // 10% to 90% for better padding
          y = Math.random() * 80 + 10
          isValid = true
          attempts++

          // Check distance from all existing stars
          for (const star of newStars) {
            const distance = Math.sqrt(Math.pow(x - star.x, 2) + Math.pow(y - star.y, 2))
            if (distance < minDistance) {
              isValid = false
              break
            }
          }
        } while (!isValid && attempts < maxAttempts)

        if (attempts >= maxAttempts && newStars.length === i) {
          // Force placement with safe distance check
          x = (i % 3) * 33 + 12 + Math.random() * 8
          y = Math.floor(i / 3) * 33 + 15 + Math.random() * 8
        }

        newStars.push({ id: i, x, y })
      }

      setStars(newStars)
    }

    generateStars()
  }, [])

  const toggleStar = (id: number) => {
    if (selectedStar === id) {
      setSelectedStar(null)
    } else {
      setSelectedStar(id)
      setRevealedStars((prev) => new Set([...prev, id]))
    }
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center px-4 py-8">
      <FloatingHearts />

      {/* Night sky background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 overflow-hidden pointer-events-none">
        {/* Soft glowing orbs */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-lavender/10 rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-peach/10 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        />

        {/* Twinkling stars background */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`bg-star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Number.POSITIVE_INFINITY }}
          />
        ))}
      </div>

      {/* Back button */}
      <motion.button
        onClick={() => router.push("/cake")}
        className="absolute top-6 left-6 z-20 px-4 py-2 bg-gradient-to-r from-gold to-soft-rose hover:from-gold/80 hover:to-soft-rose/80 text-foreground font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Back
      </motion.button>

      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Title */}
        <motion.h1
          className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Wishes Under the Stars 🌟
        </motion.h1>

        <motion.p
          className="text-base md:text-xl text-white/90 mb-12 drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Click on the stars to reveal special messages for you
        </motion.p>

        {/* Stars grid */}
        <motion.div
          className="relative w-full aspect-square md:h-96 mb-8 px-4 md:px-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {stars.map((star) => (
            <motion.button
              key={star.id}
              onClick={() => toggleStar(star.id)}
              className="absolute group outline-none focus:outline-none"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: 0.85 }}
            >
              {/* Star shape */}
              <motion.div
                className="text-3xl md:text-5xl cursor-pointer filter drop-shadow-lg"
                animate={{
                  scale: revealedStars.has(star.id) ? 1.3 : 1,
                  filter: revealedStars.has(star.id)
                    ? "brightness(2) drop-shadow-[0_0_12px_rgba(255,215,0,0.8)]"
                    : "drop-shadow-lg",
                }}
                transition={{ duration: 0.3 }}
              >
                ⭐
              </motion.div>

              {/* Sparkle effect on hover */}
              <motion.div
                className="absolute -inset-8 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gold rounded-full drop-shadow-lg"
                    style={{
                      left: "50%",
                      top: "50%",
                    }}
                    animate={{
                      x: Math.cos((i / 6) * Math.PI * 2) * 40,
                      y: Math.sin((i / 6) * Math.PI * 2) * 40,
                      opacity: [1, 0],
                    }}
                    transition={{ duration: 1 }}
                  />
                ))}
              </motion.div>
            </motion.button>
          ))}
        </motion.div>

        {/* Revealed message */}
        <AnimatePresence>
          {selectedStar !== null && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStar(null)}
            >
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* Message card */}
              <motion.div
                className="relative glass rounded-3xl p-8 md:p-12 max-w-md shadow-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button
                  onClick={() => setSelectedStar(null)}
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-all focus:outline-none z-10 text-foreground"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Close message"
                >
                  <X className="w-6 h-6" />
                </motion.button>

                {/* Star icon */}
                <motion.div
                  className="text-6xl mb-6"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  ⭐
                </motion.div>

                {/* Message */}
                <motion.p
                  className="text-lg md:text-xl font-medium text-center mb-6 text-card"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {WISHES[selectedStar]}
                </motion.p>

                {/* Sparkles */}
                <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden">
                  {Array.from({ length: 8 }).map((_, i) => (
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
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.15,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <motion.div
          className="mt-8 text-white/90 drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-sm font-semibold">
            Stars revealed:{" "}
            <span className="font-bold text-gold drop-shadow-lg">
              {revealedStars.size}/{WISHES.length}
            </span>
          </p>
        </motion.div>

        {/* CTA */}
        {revealedStars.size >= WISHES.length && (
          <motion.button
            onClick={() => router.push("/final")}
            className="mt-12 w-full md:w-auto px-8 py-4 bg-gradient-to-r from-gold to-soft-rose hover:from-gold/80 hover:to-soft-rose/80 font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all bg-card-foreground text-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center justify-center gap-2">
              See the Final Surprise 🎁
              <Sparkles className="w-5 h-5" />
            </span>
          </motion.button>
        )}
      </motion.div>
    </div>
  )
}
