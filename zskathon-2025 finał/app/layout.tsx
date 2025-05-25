import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nexus - Platforma Edukacyjna dla Zrównoważonego Rozwoju",
  description:
    "Nexus to innowacyjna platforma edukacyjna skupiająca się na celach zrównoważonego rozwoju 4 i 9. Tworzymy przyszłość edukacji poprzez technologię i współpracę.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
