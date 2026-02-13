'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useLoveContext } from '@/app/context/love-context'
import { ChevronRight, Heart } from 'lucide-react'
import Link from 'next/link'

const quizQuestions = [
  {
    id: 'q1',
    question: 'Your ideal date vibe?',
    options: [
      { label: 'Cozy bookstore & coffee', value: 'cozy' },
      { label: 'Sunset beach walk', value: 'sunset' },
      { label: 'Arcade & street food chaos', value: 'arcade' },
      { label: 'Candlelight dinner with slow music', value: 'candlelight' },
    ],
  },
  {
    id: 'q2',
    question: 'Pick a love language moment:',
    options: [
      { label: 'Long deep conversations', value: 'long' },
      { label: 'Surprise handwritten notes', value: 'surprise' },
      { label: 'Playful teasing and inside jokes', value: 'playful' },
      { label: 'Acts of service', value: 'acts' },
    ],
  },
  {
    id: 'q3',
    question: 'Your couple aesthetic?',
    options: [
      { label: 'Cottagecore soft romance', value: 'cottage' },
      { label: 'Dark academia', value: 'dark' },
      { label: 'Filmy Bollywood romance', value: 'filmy' },
      { label: 'Modern Pinterest couple', value: 'pinterest' },
    ],
  },
  {
    id: 'q4',
    question: 'Choose a memory:',
    options: [
      { label: 'Rainy day window talks', value: 'rainy' },
      { label: 'Late night drives', value: 'late' },
      { label: 'Library study dates', value: 'library' },
      { label: 'Random spontaneous trip', value: 'spontaneous' },
    ],
  },
  {
    id: 'q5',
    question: 'Your energy as a couple:',
    options: [
      { label: 'Calm & grounding', value: 'calm' },
      { label: 'Dramatic & passionate', value: 'dramatic' },
      { label: 'Funny & chaotic', value: 'funny' },
      { label: 'Mature & understanding', value: 'mature' },
    ],
  },
  {
    id: 'q6',
    question: 'Choose a symbol:',
    options: [
      { label: '🌹 Rose', value: 'rose' },
      { label: '📷 Polaroid camera', value: 'polaroid' },
      { label: '💌 Love letter', value: 'letter' },
      { label: '🎵 Vinyl record', value: 'vinyl' },
    ],
  },
]

export function QuizSection() {
  const { setQuizAnswers, getQuizResult } = useLoveContext()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (value: string) => {
    const questionId = quizQuestions[currentQuestion].id
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizAnswers(newAnswers as any)
      setShowResult(true)
    }
  }

  const result = getQuizResult()
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  if (showResult) {
    return (
      <section id="quiz" className="py-20 bg-gradient-to-b from-secondary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div>
              <div className="inline-block p-4 bg-primary/10 rounded-full mb-6">
                <Heart className="w-12 h-12 text-primary fill-primary" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Your Love Vibe</h2>
              <p className="text-foreground/70 mb-8">
                Based on your answers, here's your couple personality...
              </p>
            </div>

            <Card className="p-8 bg-card shadow-lg border-border rounded-2xl">
              <h3 className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-4">
                {result}
              </h3>
              <p className="font-inter text-foreground/70 text-lg mb-8">
                This is your unique love language and connection style. You share a beautiful energy that makes your relationship special and meaningful.
              </p>
              <Link href="/planner">
                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-2xl text-lg font-semibold raised-shadow btn-scale"
                >
                  Plan Our Perfect Date
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </Card>

            <Button
              variant="outline"
              onClick={() => {
                setShowResult(false)
                setCurrentQuestion(0)
                setAnswers({})
              }}
              className="text-foreground border-foreground/20 hover:border-primary hover:text-primary"
            >
              Retake Quiz
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="quiz" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 fade-in">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-foreground">Love Personality Quiz</h2>
            <p className="font-inter text-foreground/70 text-lg">
              Discover your unique couple personality in 6 simple questions
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-3">
              <span className="font-inter text-sm font-medium text-foreground/70">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>
              <span className="font-inter text-sm font-medium text-primary">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <Card className="p-8 md:p-12 shadow-lg bg-soft-white border-border rounded-2xl fade-in">
            <h3 className="font-playfair text-2xl md:text-3xl font-bold mb-8 text-center text-foreground">
              {quizQuestions[currentQuestion].question}
            </h3>

            <div className="space-y-3">
              {quizQuestions[currentQuestion].options.map((option, idx) => (
                <Button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  variant="outline"
                  className="font-inter w-full p-6 h-auto text-left justify-start text-base font-medium border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 rounded-2xl text-foreground smooth-highlight btn-scale group"
                  style={{
                    animationDelay: `${idx * 50}ms`,
                  }}
                >
                  <span className="text-lg mr-3 group-hover:sparkle">♡</span>
                  {option.label}
                </Button>
              ))}
            </div>
          </Card>

          {/* Question indicators */}
          <div className="flex justify-center gap-2 mt-12">
            {quizQuestions.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index < currentQuestion ? 'bg-primary w-8' : index === currentQuestion ? 'bg-primary' : 'bg-secondary/30'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
