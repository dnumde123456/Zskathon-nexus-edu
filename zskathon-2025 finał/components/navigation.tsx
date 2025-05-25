"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Strona Główna" },
    { href: "/zasoby-szkol", label: "Zasoby dla Szkół" },
    { href: "/motywacja-uczniow", label: "Motywacja Uczniów" },
    { href: "/planer-ai", label: "Planer AI" },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 glass-morphism-dark animate-slide-in-blur">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-blue-500/5 to-blue-400/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 hover-glow-intense group">
              <div className="relative">
                <Image
                  src="https://media.discordapp.net/attachments/1339890200066785301/1375822148341465189/Nexus.png?ex=683315b9&is=6831c439&hm=3cc48444202376cffed0eec5e6121dca4fac6aacaf48dacb5f2367af5fc58f1b&=&format=webp&quality=lossless&width=625&height=625"
                  alt="Nexus Logo"
                  width={40}
                  height={40}
                  className="rounded-lg animate-float group-hover:animate-pulse-glow"
                />
                <div className="absolute inset-0 bg-blue-500/20 rounded-lg animate-pulse-glow"></div>
              </div>
              <span className="font-bold text-2xl gradient-text-white animate-text-glow">Nexus</span>
              <Sparkles className="h-5 w-5 text-blue-400 animate-pulse" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 rounded-lg text-white/90 hover:text-white font-medium transition-all duration-300 hover-glow-intense group animate-slide-in-blur animate-delay-${(index + 1) * 100}`}
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-500/20 to-blue-400/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 group-hover:w-full transition-all duration-300"></div>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-blue-400 hover:bg-blue-500/20 transition-all duration-300"
            >
              {isOpen ? (
                <X className="h-6 w-6 animate-scale-in-center" />
              ) : (
                <Menu className="h-6 w-6 animate-scale-in-center" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-slide-in-blur">
            <div className="px-2 pt-2 pb-3 space-y-1 glass-morphism rounded-lg mt-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-3 rounded-lg text-white/90 hover:text-white hover:bg-blue-500/20 font-medium transition-all duration-300 animate-slide-in-blur animate-delay-${index * 100}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
