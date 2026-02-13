'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface QuizAnswer {
  q1: string
  q2: string
  q3: string
  q4: string
  q5: string
  q6: string
}

interface DatePlan {
  location: string
  activity: string
  foodSuggestion: string
  playlistVibe: string
  surpriseIdea: string
}

interface ProposalData {
  yourName: string
  partnerName: string
  message: string
  anniversaryDate: string
}

interface LoveContextType {
  // Quiz
  quizAnswers: QuizAnswer | null
  setQuizAnswers: (answers: QuizAnswer) => void
  getQuizResult: () => string | null
  
  // Date Planner
  datePlan: DatePlan | null
  setDatePlan: (plan: DatePlan) => void
  
  // Proposal
  proposalData: ProposalData | null
  setProposalData: (data: ProposalData) => void
  
  // Navigation
  currentStep: 'home' | 'quiz' | 'planner' | 'proposal' | 'photobooth'
  setCurrentStep: (step: 'home' | 'quiz' | 'planner' | 'proposal' | 'photobooth') => void
}

const LoveContext = createContext<LoveContextType | undefined>(undefined)

const quizResultMap: Record<string, string> = {
  'cozy-long-cottage-rainy': 'Soft Romance Souls',
  'cozy-long-cottage-late': 'Cozy & Connected Hearts',
  'cozy-long-dark-rainy': 'Intellectual Love Birds',
  'cozy-long-dark-late': 'Mystery & Magic Lovers',
  'sunset-long-cottage-rainy': 'Dreamy Beach Hearts',
  'sunset-long-cottage-late': 'Sunset Romantics',
  'sunset-long-dark-rainy': 'Poetic Souls',
  'sunset-long-dark-late': 'Moonlit Dreamers',
  'arcade-surprise-filmy-library': 'Chaotic & Fun Couple',
  'arcade-surprise-filmy-spontaneous': 'Bollywood Dreams',
  'arcade-surprise-pinterest-library': 'Modern & Playful',
  'arcade-surprise-pinterest-spontaneous': 'Adventure Seekers',
  'arcade-inside-filmy-library': 'Witty & Warm Couple',
  'arcade-inside-filmy-spontaneous': 'Filmy Romance',
  'arcade-inside-pinterest-library': 'Cute & Quirky',
  'arcade-inside-pinterest-spontaneous': 'Fun & Spontaneous',
  'candlelight-playful-cottage-rainy': 'Soft & Playful',
  'candlelight-playful-cottage-late': 'Romantic & Humorous',
  'candlelight-playful-dark-rainy': 'Dark & Witty Couple',
  'candlelight-playful-dark-late': 'Sophisticated Flirts',
  'candlelight-acts-cottage-rainy': 'Caring & Romantic',
  'candlelight-acts-cottage-late': 'Devoted & Dreamy',
  'candlelight-acts-dark-rainy': 'Mysterious Lovers',
  'candlelight-acts-dark-late': 'Deep & Devoted',
}

export function LoveProvider({ children }: { children: ReactNode }) {
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer | null>(null)
  const [datePlan, setDatePlan] = useState<DatePlan | null>(null)
  const [proposalData, setProposalData] = useState<ProposalData | null>(null)
  const [currentStep, setCurrentStep] = useState<'home' | 'quiz' | 'planner' | 'proposal' | 'photobooth'>('home')

  const getQuizResult = (): string | null => {
    if (!quizAnswers) return null
    const key = `${quizAnswers.q1}-${quizAnswers.q2}-${quizAnswers.q3}-${quizAnswers.q4}-${quizAnswers.q5}-${quizAnswers.q6}`.toLowerCase()
    return quizResultMap[key] || 'Unique Love Story'
  }

  const value: LoveContextType = {
    quizAnswers,
    setQuizAnswers,
    getQuizResult,
    datePlan,
    setDatePlan,
    proposalData,
    setProposalData,
    currentStep,
    setCurrentStep,
  }

  return <LoveContext.Provider value={value}>{children}</LoveContext.Provider>
}

export function useLoveContext() {
  const context = useContext(LoveContext)
  if (!context) {
    throw new Error('useLoveContext must be used within LoveProvider')
  }
  return context
}
