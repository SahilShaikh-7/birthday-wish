import type React from "react"
import type { Metadata } from "next"
import { Poppins, Dancing_Script } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { BackgroundMusicPlayer } from "@/components/BackgroundMusicPlayer"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sans",
})

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dancing",
})

export const metadata: Metadata = {
  title: "Happy Birthday Humera 💕",
  description: "A magical birthday website made with love for Humera",
  generator: "Next.js",
  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${dancing.variable} font-sans antialiased bg-gradient-to-br from-cream via-lavender to-sky-blue gradient-animated min-h-screen`}
      >
        {children}
        <BackgroundMusicPlayer />
        <Analytics />
      </body>
    </html>
  )
}
