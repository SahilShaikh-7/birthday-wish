"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, Music, VolumeX } from "lucide-react"
import FloatingHearts from "@/components/FloatingHearts"

const MEMORIES = [
  {
    id: 1,
    image: "/images/1.jpeg",
    text: "Every moment with you is pure magic ✨",
  },
  {
    id: 2,
    image: "/images/4.jpeg",
    text: "Your smile is my favorite view 💕",
  },
  {
    id: 3,
    image: "/images/2.jpeg",
    text: "Today the world got blessed again 💝",
  },
  {
    id: 4,
    image: "/images/3.jpeg",
    text: "You are one of the most beautiful souls 💫",
  },
]

export default function MemoryLane() {
  const router = useRouter()
  const [current, setCurrent] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % MEMORIES.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [autoPlay])

  const next = () => {
    setCurrent((prev) => (prev + 1) % MEMORIES.length)
    setAutoPlay(false)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + MEMORIES.length) % MEMORIES.length)
    setAutoPlay(false)
  }

  const memory = MEMORIES[current]

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center px-4 py-8">
      <FloatingHearts />

      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-lavender/20 rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-peach/20 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Music toggle */}
      <motion.button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute top-6 right-6 z-20 p-3 glass rounded-full text-gold hover:bg-white/20 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isMuted ? <VolumeX className="w-6 h-6" /> : <Music className="w-6 h-6" />}
      </motion.button>

      {/* Back button */}
      <motion.button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 z-20 px-4 py-2 glass rounded-full text-foreground hover:bg-white/20 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Back
      </motion.button>

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* Slideshow */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="relative w-full aspect-square md:aspect-auto md:h-96 rounded-3xl overflow-hidden glass shadow-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src={memory.image}
              alt={memory.text}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 5 }}
            />

            {/* Floating hearts overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl"
                  initial={{ x: Math.random() * 300 - 150, y: Math.random() * 300 - 150, opacity: 0 }}
                  animate={{ y: -200, opacity: [0, 1, 0] }}
                  transition={{ duration: 3, delay: i * 0.3 }}
                >
                  💗
                </motion.div>
              ))}
            </div>

            {/* Sparkles */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-gold rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                  transition={{ duration: 2, delay: i * 0.25, repeat: Number.POSITIVE_INFINITY }}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Memory text */}
        <motion.p
          className="text-2xl md:text-3xl font-bold text-center mt-8 text-foreground"
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {memory.text}
        </motion.p>

        {/* Navigation buttons */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <motion.button
            onClick={prev}
            className="p-4 glass rounded-full text-foreground hover:bg-white/30 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          {/* Slide indicators */}
          <div className="flex gap-2">
            {MEMORIES.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => {
                  setCurrent(idx)
                  setAutoPlay(false)
                }}
                className={`h-2 rounded-full transition-all ${
                  idx === current ? "bg-soft-rose w-8" : "bg-lavender w-2"
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>

          <motion.button
            onClick={next}
            className="p-4 glass rounded-full text-foreground hover:bg-white/30 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        <motion.button
          onClick={() => router.push("/message")}
          className="w-full mt-12 px-8 py-4 bg-gradient-to-r from-soft-rose to-peach hover:from-soft-rose/90 hover:to-peach/90 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all bg-card-foreground"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Continue to My Heart 💌
        </motion.button>
      </div>
    </div>
  )
}
