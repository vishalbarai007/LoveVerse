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
      <div className='flex items-center justify-center  gap-8'>
        <Image src="/images/landing.jpeg" alt="Heart" width={700} height={700} />
      </div>
      <Footer />
    </LoveProvider>
  )
}
