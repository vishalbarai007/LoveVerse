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
        <>
          {/* Define the keyframes directly here */}
          <style>{`
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }
  `}</style>

          <Image
            src="/images/dudu1.jpeg"
            alt="Heart"
            width={200}
            height={200}
            className="absolute top-7 left-2 object-contain rounded-full"
            // Apply the animation here
            style={{ animation: 'float 6s ease-in-out infinite' }}
          />
        </>


        <div className='flex items-center justify-center gap-8'>
          <Image src="/images/image2.png" alt="Heart" width={500} height={500} />
        </div>

        <Image
          src="/images/heart.png"
          alt="Heart"
          width={200} // Increased width for better resolution on large screens
          height={200}
          className="absolute top-[70%] left-[85%] object-contain rounded-full"
        />



        <div className='flex items-center justify-center gap-8'>
          <Image src="/images/valen.jpeg" alt="Heart" width={500} height={200} />
        </div>

      </div>

    </section>
  )
}
