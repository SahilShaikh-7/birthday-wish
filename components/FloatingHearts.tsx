"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Heart {
  id: number
  left: string
  delay: number
  duration: number
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    const newHearts: Heart[] = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
      duration: 8 + Math.random() * 4,
    }))
    setHearts(newHearts)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-2xl md:text-3xl"
          style={{ left: heart.left }}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: "-100vh", opacity: [0, 1, 1, 0] }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          💗
        </motion.div>
      ))}
    </div>
  )
}
