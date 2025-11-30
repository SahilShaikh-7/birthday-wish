"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Butterfly {
  id: number
  left: string
  delay: number
}

export default function FloatingButterflies() {
  const [butterflies, setButterflies] = useState<Butterfly[]>([])

  useEffect(() => {
    const newButterflies: Butterfly[] = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 3,
    }))
    setButterflies(newButterflies)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {butterflies.map((butterfly) => (
        <motion.div
          key={butterfly.id}
          className="absolute text-3xl md:text-4xl"
          style={{ left: butterfly.left }}
          initial={{ y: "-100vh", x: 0, opacity: 0 }}
          animate={{
            y: "100vh",
            x: [0, 50, -50, 100, -100, 0],
            opacity: [0, 1, 1, 1, 1, 0],
          }}
          transition={{
            duration: 15,
            delay: butterfly.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          🦋
        </motion.div>
      ))}
    </div>
  )
}
