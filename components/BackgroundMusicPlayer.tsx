"use client"

import { useEffect, useRef, useState } from "react"
import { Music, VolumeX } from "lucide-react"
import { motion } from "framer-motion"

export function BackgroundMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    // Auto-play with muted to comply with browser policies
    if (audioRef.current && !isMuted) {
      audioRef.current.play().catch(() => {
        console.log("[v0] Audio autoplay blocked by browser")
      })
    }
  }, [])

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(() => {
          console.log("[v0] Audio play failed")
        })
      } else {
        audioRef.current.pause()
      }
      setIsMuted(!isMuted)
    }
  }

  if (!isLoaded) return null

  return (
    <>
      {/* Background Music Audio Element */}
      <audio
        ref={audioRef}
        loop
        src="https://assets.mixkit.co/active_storage/music/20838/20838-preview-128.mp3"
        crossOrigin="anonymous"
      />

      {/* Music Toggle Button - Fixed Position */}
      <motion.button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white rounded-full p-3 shadow-lg backdrop-blur-md border border-white/30 transition-all duration-300 hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={isMuted ? "Unmute music" : "Mute music"}
      >
        <motion.div
          animate={!isMuted ? { rotate: [0, 10, -10, 0] } : {}}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        >
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Music className="w-6 h-6" />}
        </motion.div>
      </motion.button>
    </>
  )
}
