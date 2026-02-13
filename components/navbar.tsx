'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Quiz', href: '/quiz' },
    { label: 'Planner', href: '/planner' },
    { label: 'Proposal', href: '/proposal' },
    { label: 'Photobooth', href: 'https://photo-booth-opal.vercel.app/' },
    { label: 'Chat', href: '/chat' },
  ]

  return (
    // 1. Added bg-[#f9d9ca] directly here
    // 2. Removed the conditional bg-transparent/bg-card logic
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#f9d9ca] border-b border-white/20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            {/* Updated to always use primary color for visibility */}
            <Heart className="w-8 h-8 fill-primary text-primary transition-colors" />
          </div>
          {/* Updated to always use primary color */}
          <span className="font-playfair font-bold text-2xl text-primary transition-colors">
            LoveVerse
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              // Updated text colors to be dark (foreground) instead of white
              className={`transition-colors font-medium ${
                pathname === item.href
                  ? 'text-primary'
                  : 'text-foreground/70 hover:text-primary'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link href="/">
          {/* Fixed button style to the "solid" version */}
          <Button
            className="rounded-2xl font-semibold transition-all btn-scale bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Start
          </Button>
        </Link>
      </div>
    </nav>
  )
}