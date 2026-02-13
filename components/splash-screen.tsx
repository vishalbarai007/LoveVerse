'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const FlowerScene = dynamic(() => import('@/components/flower-scene'), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-gradient-to-br from-[#D96C73] to-[#F2DED2]" />,
})

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className={`fixed inset-0 z-[9999] transition-all duration-1000 ${
      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      <FlowerScene />
      
      {/* Overlay with text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <h1 className="font-playfair text-5xl md:text-7xl font-bold text-soft-white drop-shadow-lg text-center fade-in">
          Welcome to LoveVerse
        </h1>
        <p className="font-inter text-lg text-soft-white/80 mt-4 drop-shadow-md animate-pulse">
          Your Love Story Awaits...
        </p>
      </div>
    </div>
  )
}
