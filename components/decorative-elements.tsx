'use client'

/* Floating Rose SVG */
export function FloatingRose({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`w-16 h-16 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stem */}
      <path d="M 50 80 Q 48 60 50 40" stroke="#4A2A2A" strokeWidth="1.5" />
      {/* Leaves */}
      <path d="M 50 60 Q 40 55 35 58" stroke="#6B4423" strokeWidth="1" fill="none" />
      <path d="M 50 50 Q 60 45 65 48" stroke="#6B4423" strokeWidth="1" fill="none" />
      
      {/* Rose petals - outer layer */}
      <circle cx="50" cy="30" r="8" fill="#D96C73" opacity="0.7" />
      <circle cx="42" cy="28" r="7" fill="#D96C73" opacity="0.8" />
      <circle cx="58" cy="28" r="7" fill="#D96C73" opacity="0.8" />
      <circle cx="45" cy="20" r="6" fill="#D96C73" opacity="0.9" />
      <circle cx="55" cy="20" r="6" fill="#D96C73" opacity="0.9" />
      
      {/* Rose petals - inner layer */}
      <circle cx="50" cy="25" r="5" fill="#A83236" />
      <circle cx="47" cy="23" r="4" fill="#A83236" opacity="0.9" />
      <circle cx="53" cy="23" r="4" fill="#A83236" opacity="0.9" />
      
      {/* Center */}
      <circle cx="50" cy="25" r="2.5" fill="#6E1418" />
    </svg>
  )
}

/* Teddy Bear SVG */
export function TeddyBear({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 120"
      className={`w-20 h-24 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Body */}
      <circle cx="50" cy="70" r="25" fill="#8B6F47" />
      
      {/* Head */}
      <circle cx="50" cy="35" r="20" fill="#8B6F47" />
      
      {/* Ears */}
      <circle cx="32" cy="18" r="7" fill="#8B6F47" />
      <circle cx="68" cy="18" r="7" fill="#8B6F47" />
      <circle cx="32" cy="18" r="4" fill="#A0826D" />
      <circle cx="68" cy="18" r="4" fill="#A0826D" />
      
      {/* Snout */}
      <circle cx="50" cy="40" r="8" fill="#A0826D" />
      
      {/* Eyes */}
      <circle cx="44" cy="30" r="2.5" fill="#2C2C2C" />
      <circle cx="56" cy="30" r="2.5" fill="#2C2C2C" />
      
      {/* Nose */}
      <circle cx="50" cy="40" r="1.5" fill="#2C2C2C" />
      
      {/* Arms */}
      <circle cx="30" cy="65" r="7" fill="#8B6F47" />
      <circle cx="70" cy="65" r="7" fill="#8B6F47" />
      <circle cx="30" cy="65" r="4" fill="#A0826D" />
      <circle cx="70" cy="65" r="4" fill="#A0826D" />
      
      {/* Feet */}
      <circle cx="40" cy="95" r="6" fill="#8B6F47" />
      <circle cx="60" cy="95" r="6" fill="#8B6F47" />
      <circle cx="40" cy="95" r="3.5" fill="#A0826D" />
      <circle cx="60" cy="95" r="3.5" fill="#A0826D" />
      
      {/* Belly */}
      <circle cx="50" cy="75" r="12" fill="#A0826D" opacity="0.6" />
      
      {/* Heart on belly */}
      <path d="M 50 75 L 48 72 Q 45 70 43 72 Q 41 74 43 77 L 50 83 L 57 77 Q 59 74 57 72 Q 55 70 52 72 L 50 75" fill="#D96C73" />
    </svg>
  )
}

/* Love Letter SVG */
export function LoveLetter({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 80"
      className={`w-16 h-12 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Envelope */}
      <rect x="5" y="10" width="90" height="60" fill="#F2DED2" stroke="#A83236" strokeWidth="1.5" />
      
      {/* Flap */}
      <path d="M 5 10 L 50 40 L 95 10" fill="none" stroke="#A83236" strokeWidth="1.5" />
      <path d="M 5 10 L 50 35 L 95 10" fill="#D96C73" opacity="0.3" />
      
      {/* Letter lines */}
      <line x1="15" y1="30" x2="85" y2="30" stroke="#A83236" strokeWidth="0.8" opacity="0.6" />
      <line x1="15" y1="40" x2="85" y2="40" stroke="#A83236" strokeWidth="0.8" opacity="0.6" />
      <line x1="15" y1="50" x2="75" y2="50" stroke="#A83236" strokeWidth="0.8" opacity="0.6" />
      
      {/* Decorative heart seal */}
      <circle cx="45" cy="62" r="5" fill="#D96C73" opacity="0.7" />
      <path d="M 45 62 L 42 59 Q 40 57 38 59 Q 36 61 38 64 L 45 70 L 52 64 Q 54 61 52 59 Q 50 57 48 59 L 45 62" fill="#A83236" />
    </svg>
  )
}

/* Animated Heart Particles */
export function HeartParticles() {
  const hearts = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute opacity-40"
          style={{
            left: `${heart.left}%`,
            top: '0',
            animation: `petal-fall ${heart.duration}s ease-in infinite`,
            animationDelay: `${heart.delay}s`,
            fontSize: '20px',
          }}
        >
          ♡
        </div>
      ))}
    </div>
  )
}

/* Soft Glow Spotlight */
export function GlowSpotlight({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative">{children}</div>
    </div>
  )
}

/* Floating Decoration */
export function FloatingDecoration({
  children,
  position = 'top-left',
  className = '',
}: {
  children: React.ReactNode
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  className?: string
}) {
  const positionClasses = {
    'top-left': 'top-8 left-8',
    'top-right': 'top-8 right-8',
    'bottom-left': 'bottom-8 left-8',
    'bottom-right': 'bottom-8 right-8',
  }

  return (
    <div
      className={`absolute ${positionClasses[position]} opacity-30 parallax pointer-events-none ${className}`}
    >
      {children}
    </div>
  )
}
