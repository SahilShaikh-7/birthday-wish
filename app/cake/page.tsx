"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import FloatingHearts from "@/components/FloatingHearts"
import Cake3D from "@/components/Cake3D"
import Confetti from "@/components/Confetti"
import { Volume2, Volume2 as Volume2Off, Sparkles } from "lucide-react"

export default function CakePage() {
  const router = useRouter()
  const audioRef = useRef<HTMLAudioElement>(null)
  const confettiRef = useRef<any>(null)
  const [blowCandles, setBlowCandles] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [wished, setWished] = useState(false)

  const handleBlowCandles = () => {
    if (blowCandles) return

    setBlowCandles(true)
    setShowConfetti(true)

    if (!isMuted && audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {
        console.log("Audio playback failed")
      })
    }

    setTimeout(() => {
      setWished(true)
    }, 2000)
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center px-4 py-8">
      <FloatingHearts />

      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-peach/20 rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-lavender/20 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Back button */}
      <motion.button
        onClick={() => router.push("/message")}
        className="absolute top-6 left-6 z-20 px-4 py-2 glass rounded-full text-foreground hover:bg-white/20 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Back
      </motion.button>

      {/* Music toggle */}
      <motion.button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute top-6 right-6 z-20 p-3 glass rounded-full text-gold hover:bg-white/20 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isMuted ? <Volume2Off className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
      </motion.button>

      {/* Confetti */}
      {showConfetti && <Confetti />}

      <motion.div
        className="relative z-10 text-center max-w-2xl mx-auto w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-8 text-foreground"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Make Your Wish 🎂
        </motion.h1>

        {/* 3D Cake */}
        <motion.div
          className="w-full mb-8 aspect-square flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Cake3D candles={!blowCandles} />
        </motion.div>

        {/* Instructions */}
        <motion.p
          className="text-lg text-foreground/70 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Click the cake to blow out the candles and make your wish! 💫
        </motion.p>

        {/* Blow candles button */}
        <motion.button
          onClick={handleBlowCandles}
          disabled={blowCandles}
          className={`px-8 py-4 rounded-full font-bold text-lg transition-all bg-popover-foreground ${
            blowCandles
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-gradient-to-r from-soft-rose to-peach hover:from-soft-rose/90 hover:to-peach/90 text-white shadow-lg hover:shadow-xl"
          }`}
          whileHover={!blowCandles ? { scale: 1.05 } : {}}
          whileTap={!blowCandles ? { scale: 0.95 } : {}}
        >
          <span className="flex items-center justify-center gap-2">
            {blowCandles ? "Candles Blown Out!" : "Blow Out the Candles"}
            {!blowCandles && <Sparkles className="w-5 h-5" />}
          </span>
        </motion.button>

        {/* Falling confetti with name */}
        {showConfetti && (
          <motion.div
            className="mt-6 text-6xl font-bold text-gold animate-fall"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            H-U-M-E-R-A
          </motion.div>
        )}

        {/* Post-wish message */}
        {wished && (
          <motion.div
            className="mt-12 p-6 glass rounded-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl text-foreground mb-6">Your wish has been made! ✨ Believe in the magic 💗</p>
            <motion.button
              onClick={() => router.push("/stars")}
              className="w-full px-8 py-4 bg-gradient-to-r from-lavender to-sky-blue hover:from-lavender/90 hover:to-sky-blue/90 text-foreground font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              See the Stars 🌟
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      {/* Hidden audio for birthday song */}
      <audio
        ref={audioRef}
        src="data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAAA="
      />
    </div>
  )
}
