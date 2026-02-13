'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProposalSection } from '@/components/proposal-section'
import { LoveProvider } from '@/app/context/love-context'

export default function ProposalPage() {
  return (
    <LoveProvider>
      <Navbar />
      <main className="min-h-screen pt-20">
        <ProposalSection />
      </main>
      <Footer />
    </LoveProvider>
  )
}
