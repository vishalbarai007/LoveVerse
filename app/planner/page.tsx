'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { DatePlannerSection } from '@/components/date-planner-section'
import { LoveProvider } from '@/app/context/love-context'

export default function PlannerPage() {
  return (
    <LoveProvider>
      <Navbar />
      <main className="min-h-screen pt-20 bg-card">
        <DatePlannerSection />
      </main>
      <Footer />
    </LoveProvider>
  )
}
