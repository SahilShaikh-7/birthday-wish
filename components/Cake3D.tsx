"use client"

import { motion } from "framer-motion"

interface Cake3DProps {
  candles: boolean
}

export default function Cake3D({ candles }: Cake3DProps) {
  return (
    <motion.div
      className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center cursor-pointer group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Cake base - simplified 3D cake representation */}
      <svg viewBox="0 0 200 250" className="w-full h-full drop-shadow-2xl">
        {/* Cake layers */}
        <ellipse cx="100" cy="180" rx="80" ry="20" fill="#f4a8b4" />
        <rect x="20" y="120" width="160" height="60" fill="#f4a8b4" rx="5" />

        <ellipse cx="100" cy="120" rx="80" ry="15" fill="#ffc0cb" />
        <rect x="25" y="70" width="150" height="50" fill="#ffc0cb" rx="5" />

        <ellipse cx="100" cy="70" rx="75" ry="15" fill="#ffe6e6" />
        <rect x="30" y="20" width="140" height="50" fill="#ffe6e6" rx="5" />

        {/* Frosting swirls */}
        <path d="M 50 50 Q 70 30 100 35 Q 130 30 150 50" fill="none" stroke="#ffd700" strokeWidth="3" />
        <path d="M 40 100 Q 60 85 100 90 Q 140 85 160 100" fill="none" stroke="#ffd700" strokeWidth="2" />
        <path d="M 45 160 Q 70 145 100 150 Q 130 145 155 160" fill="none" stroke="#ffd700" strokeWidth="2" />

        {/* Decorative spheres (cherries/decorations) */}
        <circle cx="80" cy="30" r="6" fill="#ff69b4" />
        <circle cx="120" cy="28" r="6" fill="#ff69b4" />
        <circle cx="100" cy="85" r="5" fill="#ffd700" />
      </svg>

      {/* Candles */}
      {candles && (
        <>
          <motion.div
            className="absolute top-12 left-16 w-3 h-16 bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-full shadow-lg"
            animate={{ scaleY: [1, 1.1, 1] }}
            transition={{ duration: 0.4, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute top-12 left-1/2 transform -translate-x-1/2 w-3 h-16 bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-full shadow-lg"
            animate={{ scaleY: [1.1, 1, 1.1] }}
            transition={{ duration: 0.4, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute top-12 right-16 w-3 h-16 bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-full shadow-lg"
            animate={{ scaleY: [1, 1.1, 1] }}
            transition={{ duration: 0.4, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
          />

          {/* Flames */}
          <motion.div
            className="absolute top-10 left-16 w-2 h-4 bg-orange-400 rounded-full blur-sm"
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute top-10 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-orange-400 rounded-full blur-sm"
            animate={{ scale: [1.2, 1, 1.2], opacity: [1, 0.8, 1] }}
            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute top-10 right-16 w-2 h-4 bg-orange-400 rounded-full blur-sm"
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
          />
        </>
      )}

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-soft-rose to-peach opacity-0 group-hover:opacity-20 blur-2xl transition-opacity" />
    </motion.div>
  )
}
