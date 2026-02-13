'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { LandingHero } from '@/components/landing-hero'
import { LoveProvider } from '@/app/context/love-context'
import Image from 'next/image'

export default function Page() {
  return (
    <LoveProvider>
      <Navbar />
      <main className="min-h-screen">
        

        <LandingHero />
      </main>
      <div className='w-full'>
        <Image
          src="/images/landing.jpeg"
          alt="Heart"
          width={1920} // Increased width for better resolution on large screens
          height={500}
          className="w-full h-screen object-cover"
        />
      </div>
      <Footer />
    </LoveProvider>
  )
}
