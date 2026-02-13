'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useLoveContext } from '@/app/context/love-context'
import { Heart, ChevronRight } from 'lucide-react'
import { TeddyBear } from '@/components/decorative-elements'
import Link from 'next/link'

export function ProposalSection() {
  const { proposalData, setProposalData } = useLoveContext()
  const [step, setStep] = useState<'form' | 'reveal'>('form')
  const [formData, setFormData] = useState({
    yourName: proposalData?.yourName || '',
    partnerName: proposalData?.partnerName || '',
    message: proposalData?.message || "I want to spend forever with you. Will you be mine?",
    anniversaryDate: proposalData?.anniversaryDate || '',
  })
  const [showConfetti, setShowConfetti] = useState(false)
  const [answered, setAnswered] = useState<'yes' | 'no' | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleCreateProposal = () => {
    if (formData.yourName && formData.partnerName) {
      setProposalData(formData as any)
      setStep('reveal')
    }
  }

  const handleYes = () => {
    setAnswered('yes')
    setShowConfetti(true)
    setTimeout(() => {
      const photoboothElement = document.getElementById('photobooth')
      photoboothElement?.scrollIntoView({ behavior: 'smooth' })
    }, 2000)
  }

  if (step === 'form') {
    return (
      <section id="proposal" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 fade-in">
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-foreground">Create Your Proposal</h2>
              <p className="font-inter text-foreground/70 text-lg">
                Customize your romantic message and prepare for the big moment
              </p>
            </div>

            {/* Form Card */}
            <Card className="p-8 md:p-12 shadow-lg border-accent/20">
              <div className="space-y-6">
                {/* Your Name */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Your Name
                  </label>
                  <Input
                    type="text"
                    value={formData.yourName}
                    onChange={(e) => handleInputChange('yourName', e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-lg border-foreground/20 focus:border-primary"
                  />
                </div>

                {/* Partner Name */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Partner's Name
                  </label>
                  <Input
                    type="text"
                    value={formData.partnerName}
                    onChange={(e) => handleInputChange('partnerName', e.target.value)}
                    placeholder="Enter your partner's name"
                    className="w-full px-4 py-3 rounded-lg border-foreground/20 focus:border-primary"
                  />
                </div>

                {/* Custom Message */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Your Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Write your romantic message..."
                    className="w-full px-4 py-3 rounded-lg border border-foreground/20 focus:border-primary focus:outline-none resize-none h-32 font-sm"
                  />
                </div>

                {/* Anniversary Date */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Anniversary Date (Optional)
                  </label>
                  <Input
                    type="date"
                    value={formData.anniversaryDate}
                    onChange={(e) => handleInputChange('anniversaryDate', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-foreground/20 focus:border-primary"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  onClick={handleCreateProposal}
                  disabled={!formData.yourName || !formData.partnerName}
                  className="font-inter w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 rounded-2xl font-semibold raised-shadow"
                >
                  Generate Proposal Reveal
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="proposal" className="relative min-h-screen bg-gradient-to-br from-[#6E1418] to-[#A83236] flex items-center justify-center py-20 overflow-hidden">
      {/* Petal fall animation on reveal */}
      {answered === 'yes' && (
        <>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute petal-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-20px',
                opacity: 0.6,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              <span className="text-2xl">🌹</span>
            </div>
          ))}
        </>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          {answered === 'yes' ? (
            // Celebration view
            <div className="text-center space-y-8">
              {/* Confetti animation */}
              {showConfetti && <Confetti />}

              {/* Floating teddy bear */}
              <div className="flex justify-center mb-4">
                <div className="animate-bounce">
                  <TeddyBear className="w-32 h-40 opacity-90" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="inline-block p-4 bg-soft-white/20 rounded-full mb-6 animate-bounce">
                  <Heart className="w-16 h-16 text-soft-white fill-soft-white pulse-soft" />
                </div>
                <h2 className="font-playfair text-5xl md:text-6xl font-bold text-soft-white drop-shadow-lg spotlight">
                  Forever Starts Now!
                </h2>
                <p className="font-inter text-xl text-soft-white/90">
                  Congratulations on your beautiful journey together!
                </p>
              </div>

              <Link href="/photobooth">
                <Button
                  className="font-inter bg-soft-white hover:bg-soft-white/90 text-primary px-8 py-6 rounded-2xl text-lg mx-auto raised-shadow btn-scale"
                >
                  Create Your Love Moment
                  <Heart className="ml-2 w-5 h-5 fill-current" />
                </Button>
              </Link>
            </div>
          ) : (
            // Proposal reveal
            <Card className="p-8 md:p-16 shadow-2xl border-accent/30 bg-soft-white rounded-2xl">
              <div className="space-y-8 text-center">
                {/* Greeting */}
                <div>
                  <p className="font-inter text-lg text-foreground/70 mb-4">
                    A special message from
                  </p>
                  <h2 className="font-playfair text-3xl md:text-4xl font-bold text-primary mb-8">
                    {formData.yourName}
                  </h2>
                </div>

                {/* Partner name - Animated with spotlight */}
                <div className="space-y-6">
                  <h3 className="font-playfair text-4xl md:text-6xl font-bold text-primary fade-in spotlight">
                    {formData.partnerName}
                  </h3>

                  {/* Message - Animated fade in */}
                  <div className="my-12 p-8 bg-muted rounded-2xl border-2 border-primary/20 fade-in">
                    <p className="font-inter text-xl md:text-2xl text-foreground leading-relaxed whitespace-pre-wrap">
                      {formData.message}
                    </p>
                  </div>
                </div>

                {/* Anniversary info if provided */}
                {formData.anniversaryDate && (
                  <p className="text-foreground/60">
                    Since {new Date(formData.anniversaryDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                )}

                {/* The big question */}
                <div className="pt-8 space-y-6">
                  <p className="font-playfair text-2xl md:text-3xl font-bold text-foreground">
                    Will You Be Mine?
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={handleYes}
                      className="font-inter bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 rounded-2xl text-lg font-semibold flex-1 sm:flex-none raised-shadow btn-scale pulse-soft"
                    >
                      Yes, Forever!
                      <Heart className="ml-2 w-5 h-5 fill-current" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setStep('form')}
                      className="font-inter border-border text-foreground hover:bg-muted px-12 py-6 rounded-2xl text-lg font-semibold flex-1 sm:flex-none smooth-highlight"
                    >
                      Edit Message
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}

function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-fall"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-10px',
            opacity: Math.random() * 0.5 + 0.5,
            animation: `fall ${Math.random() * 3 + 2}s linear forwards`,
            delay: `${Math.random() * 0.5}s`,
          }}
        >
          <Heart
            className="w-6 h-6 text-primary fill-primary"
            style={{
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        </div>
      ))}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
