import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'

import './globals.css'
import { SplashScreen } from '@/components/splash-screen'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'LoveVerse - Your Love Story Starts Here',
  description: 'Discover your love personality, plan the perfect date, and celebrate your love with LoveVerse. A romantic journey for couples.',
  generator: 'v0.app',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-inter antialiased bg-background text-foreground">
        {/* <SplashScreen /> */}
        {children}
      </body>
    </html>
  )
}
