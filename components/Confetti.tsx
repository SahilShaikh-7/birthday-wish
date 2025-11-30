"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ConfettiPiece {
  id: number
  left: string
  delay: number
  color: string
}

export default function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    const colors = ["bg-soft-rose", "bg-lavender", "bg-peach", "bg-sky-blue", "bg-gold"]
    const newPieces: ConfettiPiece[] = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
    setPieces(newPieces)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className={`absolute w-3 h-3 ${piece.color} rounded-full`}
          style={{ left: piece.left, top: "-10px" }}
          animate={{
            y: window.innerHeight + 100,
            rotate: 360,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: piece.delay,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  )
}
