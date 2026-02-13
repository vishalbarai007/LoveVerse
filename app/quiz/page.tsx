'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { QuizSection } from '@/components/quiz-section'
import { LoveProvider } from '@/app/context/love-context'

export default function QuizPage() {
  return (
    <LoveProvider>
      <Navbar />
      <main className="min-h-screen pt-20 bg-card">
        <QuizSection />
      </main>
      <Footer />
    </LoveProvider>
  )
}
