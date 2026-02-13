'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PhotoboothSection } from '@/components/photobooth-section'
import { LoveProvider } from '@/app/context/love-context'

export default function PhotoboothPage() {
  return (
    <LoveProvider>
      <Navbar />
      <main className="min-h-screen pt-20 bg-card">
        <PhotoboothSection />
      </main>
      <Footer />
    </LoveProvider>
  )
}
