'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useLoveContext } from '@/app/context/love-context'
import { Heart, ChevronRight, Sparkles, Calendar } from 'lucide-react'
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
      <section id="proposal" className="relative py-24 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-rose-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 fade-in">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
                <Sparkles className="w-4 h-4" />
                Start Your Forever
                <Sparkles className="w-4 h-4" />
              </div>
              <h2 className="font-playfair text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                Create Your Proposal
              </h2>
              <p className="font-inter text-gray-600 text-lg max-w-xl mx-auto">
                Customize your romantic message and prepare for the most memorable moment
              </p>
            </div>

            {/* Form Card with glassmorphism */}
            <Card className="relative p-8 md:p-12 backdrop-blur-xl bg-white/80 border border-rose-100/50 shadow-2xl rounded-3xl overflow-hidden">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 to-purple-50/50 pointer-events-none"></div>
              
              <div className="relative space-y-8">
                {/* Your Name */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-500" />
                    Your Name
                  </label>
                  <Input
                    type="text"
                    value={formData.yourName}
                    onChange={(e) => handleInputChange('yourName', e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-5 py-4 rounded-xl border-2 border-rose-100 focus:border-rose-400 bg-white/70 transition-all duration-300 hover:border-rose-200 focus:ring-4 focus:ring-rose-100"
                  />
                </div>

                {/* Partner Name */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                    Partner's Name
                  </label>
                  <Input
                    type="text"
                    value={formData.partnerName}
                    onChange={(e) => handleInputChange('partnerName', e.target.value)}
                    placeholder="Enter your partner's name"
                    className="w-full px-5 py-4 rounded-xl border-2 border-pink-100 focus:border-pink-400 bg-white/70 transition-all duration-300 hover:border-pink-200 focus:ring-4 focus:ring-pink-100"
                  />
                </div>

                {/* Custom Message */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    Your Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Write your romantic message..."
                    className="w-full px-5 py-4 rounded-xl border-2 border-purple-100 focus:border-purple-400 focus:outline-none resize-none h-40 bg-white/70 transition-all duration-300 hover:border-purple-200 focus:ring-4 focus:ring-purple-100"
                  />
                </div>

                {/* Anniversary Date */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-rose-500" />
                    Anniversary Date (Optional)
                  </label>
                  <Input
                    type="date"
                    value={formData.anniversaryDate}
                    onChange={(e) => handleInputChange('anniversaryDate', e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border-2 border-rose-100 focus:border-rose-400 bg-white/70 transition-all duration-300 hover:border-rose-200 focus:ring-4 focus:ring-rose-100"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  onClick={handleCreateProposal}
                  disabled={!formData.yourName || !formData.partnerName}
                  className="font-inter w-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 text-white py-7 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
    <section id="proposal" className="relative min-h-screen bg-gradient-to-br from-rose-600 via-pink-600 to-purple-700 flex items-center justify-center py-20 overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Petal fall animation on reveal */}
      {answered === 'yes' && (
        <>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute petal-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-20px',
                opacity: 0.7,
                animationDelay: `${i * 0.2}s`,
              }}
            >
              <span className="text-3xl">🌹</span>
            </div>
          ))}
        </>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {answered === 'yes' ? (
            // Celebration view
            <div className="text-center space-y-10">
              {/* Confetti animation */}
              {showConfetti && <Confetti />}

              {/* Floating teddy bear with glow */}
              <div className="flex justify-center mb-8">
                <div className="animate-bounce relative">
                  <div className="absolute inset-0 bg-white/30 rounded-full blur-2xl"></div>
                  <TeddyBear className="relative w-40 h-48 opacity-95 drop-shadow-2xl" />
                </div>
              </div>

              <div className="space-y-6 backdrop-blur-sm bg-white/10 rounded-3xl p-12 border border-white/20">
                <div className="inline-block p-6 bg-white/20 rounded-full mb-6 animate-bounce backdrop-blur-sm">
                  <Heart className="w-20 h-20 text-white fill-white pulse-soft drop-shadow-lg" />
                </div>
                <h2 className="font-playfair text-6xl md:text-7xl font-bold text-white drop-shadow-2xl spotlight">
                  Forever Starts Now! ✨
                </h2>
                <p className="font-inter text-2xl text-white/95 max-w-2xl mx-auto leading-relaxed">
                  Congratulations on this beautiful beginning of your journey together!
                </p>
              </div>

              <Link href="https://photo-booth-opal.vercel.app/">
                <Button
                  className="font-inter bg-white hover:bg-white/95 text-rose-600 px-10 py-7 rounded-2xl text-xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  Create Your Love Moment
                  <Heart className="ml-2 w-6 h-6 fill-current" />
                </Button>
              </Link>
            </div>
          ) : (
            // Proposal reveal with glassmorphism
            <Card className="relative p-10 md:p-20 shadow-2xl backdrop-blur-xl bg-white/95 border border-white/50 rounded-3xl overflow-hidden">
              {/* Gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500"></div>
              
              <div className="space-y-10 text-center">
                {/* Greeting */}
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 px-6 py-2 rounded-full text-sm font-semibold">
                    <Heart className="w-4 h-4 fill-current" />
                    A special message from
                  </div>
                  <h2 className="font-playfair text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                    {formData.yourName}
                  </h2>
                </div>

                {/* Decorative divider */}
                <div className="flex items-center gap-4 justify-center">
                  <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>
                  <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
                  <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>
                </div>

                {/* Partner name - Animated with spotlight */}
                <div className="space-y-8">
                  <h3 className="font-playfair text-5xl md:text-7xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent fade-in spotlight py-4">
                    {formData.partnerName}
                  </h3>

                  {/* Message - Animated fade in */}
                  <div className="my-12 p-10 bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl border-2 border-rose-200/50 fade-in shadow-lg">
                    <p className="font-inter text-xl md:text-2xl text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {formData.message}
                    </p>
                  </div>
                </div>

                {/* Anniversary info if provided */}
                {formData.anniversaryDate && (
                  <div className="flex items-center justify-center gap-2 text-gray-500 bg-gray-50 rounded-full px-6 py-3 inline-flex mx-auto">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Since {new Date(formData.anniversaryDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                )}

                {/* The big question */}
                <div className="pt-8 space-y-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-200/50 via-pink-200/50 to-purple-200/50 blur-xl rounded-full"></div>
                    <p className="relative font-playfair text-3xl md:text-4xl font-bold bg-gradient-to-r from-rose-700 via-pink-700 to-purple-700 bg-clip-text text-transparent py-2">
                      Will You Be Mine? 💍
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-5 justify-center pt-4">
                    <Button
                      onClick={handleYes}
                      className="font-inter bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 text-white px-14 py-7 rounded-2xl text-xl font-bold flex-1 sm:flex-none shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 pulse-soft"
                    >
                      Yes, Forever! 💕
                      <Heart className="ml-2 w-6 h-6 fill-current" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setStep('form')}
                      className="font-inter border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 px-12 py-7 rounded-2xl text-xl font-semibold flex-1 sm:flex-none shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
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
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {[...Array(60)].map((_, i) => {
        const colors = ['text-rose-500', 'text-pink-500', 'text-purple-500', 'text-red-500', 'text-fuchsia-500']
        const randomColor = colors[Math.floor(Math.random() * colors.length)]
        
        return (
          <div
            key={i}
            className="absolute animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-10px',
              opacity: Math.random() * 0.6 + 0.4,
              animation: `fall ${Math.random() * 3 + 2}s linear forwards`,
              animationDelay: `${Math.random() * 0.5}s`,
            }}
          >
            <Heart
              className={`w-7 h-7 ${randomColor} fill-current drop-shadow-lg`}
              style={{
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          </div>
        )
      })}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .delay-500 {
          animation-delay: 500ms;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  )
}