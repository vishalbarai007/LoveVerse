'use client'

import { useEffect, useState } from 'react'
// You can remove the Video import from lucide-react if you aren't using the icon elsewhere
// import { Video } from 'lucide-react' 

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
    <div className={`fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center transition-all duration-1000 ${
      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      
      {/* 1. Use the standard <video> tag 
         2. Use 'src' instead of 'href'
         3. 'muted' and 'autoPlay' are required for browsers to play video automatically 
      */}
      <video 
        src="/video/video1.mp4" 
        autoPlay 
        muted 
        loop 
        playsInline
        className="w-full h-full object-cover" 
      />
      
      {/* Note: I changed className to "w-full h-full object-cover" to make it 
         fill the screen like a splash background. 
         
         If you wanted a small centered video instead, use:
         className="w-64 h-64 rounded-xl shadow-2xl"
      */}

    </div>
  )
}