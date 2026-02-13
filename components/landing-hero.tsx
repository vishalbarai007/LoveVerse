'use client'

import { Button } from '@/components/ui/button'
import { Heart, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { HeartParticles, FloatingDecoration, FloatingRose } from '@/components/decorative-elements'
import Image from 'next/image'

export function LandingHero() {

  return (
    <section id="home" className="relative min-h-screen pt-20 overflow-hidden flex items-center justify-center bg-[#e56a6f]">
      {/* Heart particle animation */}
      <HeartParticles />

      {/* Floating roses in corners */}
      <FloatingDecoration position="top-left">
        <FloatingRose />
      </FloatingDecoration>
      <FloatingDecoration position="top-right">
        <FloatingRose />
      </FloatingDecoration>

      <div className="container mx-auto px-4 text-center relative z-10">
        <Image
          src="/images/dudu1.jpeg"
          alt="Heart"
          width={200} // Increased width for better resolution on large screens
          height={200}
          className="absolute top-10 left-2 object-contain rounded-full"
        />
        <Image
          src="/images/dudu1.jpeg"
          alt="Heart"
          width={200} // Increased width for better resolution on large screens
          height={200}
          className="absolute top-10 left-2 object-contain rounded-full"
        />
        {/* Main content */}
        <div className="space-y-8 mb-8 fade-in">
          {/* Logo animation */}
          <div className='flex items-center justify-center gap-8'>
            <Image src="/images/image2.png" alt="Heart" width={500} height={500} />
          </div>
          {/* Main heading with spotlight effect */}
          {/* <div className="space-y-4">
            <h1 className="font-playfair text-5xl md:text-7xl font-bold leading-tight text-soft-white drop-shadow-sm spotlight">
              <span className="block">Discover Your</span>
              <span className="block text-6xl md:text-8xl">Love Story</span>
            </h1>
          </div> */}

          {/* Subheading */}
          {/* <p className="font-inter text-lg md:text-xl text-soft-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            A journey from first spark to forever. Celebrate your connection, plan unforgettable moments, and create lasting memories together.
          </p> */}

        </div>
      </div>
    </section>
  )
}
