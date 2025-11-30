"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import FloatingHearts from "@/components/FloatingHearts"
import Confetti from "@/components/Confetti"
import { Download, Share2, Heart, Check } from "lucide-react"

export default function FinalPage() {
  const router = useRouter()
  const [showConfetti, setShowConfetti] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  const handleDownload = () => {
    const element = document.createElement("a")
    element.href = "/birthday-card-humera.jpg"
    element.download = "humera-birthday-card.png"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Happy Birthday Humera",
          text: "Check out this magical birthday wish for Humera!",
          url: window.location.href,
        })
      } else {
        // Fallback: copy link to clipboard
        await copyToClipboard()
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        // User cancelled the share dialog - this is normal, don't show error
        console.log("[v0] Share cancelled by user")
      } else {
        // Share failed or permission denied - fallback to copy
        await copyToClipboard()
      }
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      alert("Share this link: " + window.location.href)
    }
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center px-4 py-8">
      <FloatingHearts />
      {showConfetti && <Confetti />}

      {/* Background */}
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

      <motion.div
        className="relative z-10 text-center max-w-2xl mx-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Photo card */}
        <motion.div
          className="glass rounded-3xl p-8 md:p-12 shadow-2xl mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Photo frame */}
          <div className="w-full aspect-square md:aspect-auto md:h-96 rounded-2xl overflow-hidden mb-6 shadow-lg">
            <motion.img
              src="/beautiful-girl-smiling-happiness-celebration.jpeg"
              alt="Humera Birthday"
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2 }}
            />
          </div>

          {/* Text */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-soft-rose to-peach bg-clip-text text-transparent">
              Once Again...
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-foreground mb-4">Happiest Birthday, Humera 💓</p>
            <p className="text-lg text-foreground/70">You deserve the most beautiful life ever 🌸</p>
          </motion.div>

          {/* Pulsing heart */}
          <motion.div
            className="text-6xl mb-6 text-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            💗
          </motion.div>

          {/* Additional message */}
          <motion.p
            className="text-foreground/60 italic text-sm md:text-base leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            This magical journey is just a small token of how special you are to the world. May every day of your life
            be filled with love, laughter, and endless possibilities. 🌟
          </motion.p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Download button */}
          <motion.button
            onClick={handleDownload}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-lavender to-sky-blue hover:from-lavender/90 hover:to-sky-blue/90 text-foreground font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download Card
            </span>
          </motion.button>

          {/* Share button */}
          <motion.button
            onClick={handleShare}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-peach to-soft-rose hover:from-peach/90 hover:to-soft-rose/90 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center justify-center gap-2 text-card-foreground">
              {copied ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
              {copied ? "Copied!" : "Share"}
            </span>
          </motion.button>
        </motion.div>

        {/* Back to start */}
        <motion.button
          onClick={() => router.push("/")}
          className="mt-8 px-8 py-3 glass rounded-full text-foreground hover:bg-white/30 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ↺ Start Over
        </motion.button>

        {/* Final message */}
        <motion.div
          className="mt-12 text-center"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        >
          <p className="text-foreground/80 text-lg">
            <Heart className="inline w-5 h-5 text-soft-rose mr-2" />
            Thank you for being YOU
            <Heart className="inline w-5 h-5 text-soft-rose ml-2" />
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
