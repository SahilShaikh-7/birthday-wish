"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface TypewriterTextProps {
  text: string
  speed?: number
}

export default function TypewriterText({ text, speed = 30 }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return (
    <motion.div
      className="text-center text-foreground whitespace-pre-wrap leading-relaxed"
      style={{ minHeight: "200px" }}
    >
      <p className="text-lg md:text-xl font-medium">{displayedText}</p>
      {displayedText.length < text.length && (
        <motion.span
          className="inline-block w-0.5 h-6 bg-gold ml-1"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
        />
      )}
    </motion.div>
  )
}
