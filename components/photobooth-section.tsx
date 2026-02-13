'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useLoveContext } from '@/app/context/love-context'
import { Download, RotateCcw, Heart, Sparkles } from 'lucide-react'

const frames = [
  { id: 'classic', name: 'Classic Gold', color: 'from-yellow-300 to-yellow-600', border: '8' },
  { id: 'rose', name: 'Rose Gold', color: 'from-rose-200 to-rose-400', border: '8' },
  { id: 'mint', name: 'Mint Fresh', color: 'from-green-200 to-green-400', border: '8' },
  { id: 'lavender', name: 'Lavender Dream', color: 'from-purple-200 to-purple-400', border: '8' },
  { id: 'sky', name: 'Sky Blue', color: 'from-blue-200 to-blue-400', border: '8' },
]

const stickers = [
  '❤️',
  '💕',
  '✨',
  '🌹',
  '💫',
  '⭐',
  '🎀',
  '💌',
  '👑',
  '🦋',
  '🌸',
  '💝',
]

export function PhotoboothSection() {
  const { getQuizResult, proposalData } = useLoveContext()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [selectedFrame, setSelectedFrame] = useState(frames[0])
  const [selectedStickers, setSelectedStickers] = useState<Array<{ emoji: string; x: number; y: number; size: number }>>([])
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isVideoActive, setIsVideoActive] = useState(false)
  const [overlayText, setOverlayText] = useState(proposalData?.partnerName || 'You & Me')

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsVideoActive(true)
      }
    } catch (err) {
      console.error('Error accessing camera:', err)
      alert('Unable to access camera. Please check permissions.')
    }
  }

  const stopVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      setIsVideoActive(false)
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight

        // Draw video
        ctx.drawImage(videoRef.current, 0, 0)

        // Draw frame border
        const borderSize = 20
        ctx.fillStyle = selectedFrame.color.split(' ')[0] === 'from-yellow-300' ? '#FCD34D' : 'currentColor'
        ctx.fillRect(0, 0, canvasRef.current.width, borderSize)
        ctx.fillRect(0, 0, borderSize, canvasRef.current.height)
        ctx.fillRect(0, canvasRef.current.height - borderSize, canvasRef.current.width, borderSize)
        ctx.fillRect(canvasRef.current.width - borderSize, 0, borderSize, canvasRef.current.height)

        // Draw overlay text
        ctx.font = 'bold 36px Arial'
        ctx.fillStyle = '#DB2777'
        ctx.textAlign = 'center'
        ctx.fillText(overlayText, canvasRef.current.width / 2, 60)

        // Draw decorative elements
        const heartEmoji = '❤️'
        ctx.font = '32px Arial'
        ctx.fillText(heartEmoji, 60, 60)
        ctx.fillText(heartEmoji, canvasRef.current.width - 60, 60)

        const image = canvasRef.current.toDataURL('image/png')
        setCapturedImage(image)
        stopVideo()
      }
    }
  }

  const addSticker = (emoji: string) => {
    const x = Math.random() * 300 + 100
    const y = Math.random() * 300 + 100
    const size = Math.random() * 20 + 20
    const newSticker = { emoji, x, y, size }
    setSelectedStickers([...selectedStickers, newSticker])

    // Trigger a small animation feedback
    const button = event?.target as HTMLElement
    if (button) {
      button.classList.add('bounce-in')
      setTimeout(() => button.classList.remove('bounce-in'), 600)
    }
  }

  const downloadPhoto = () => {
    if (capturedImage) {
      const link = document.createElement('a')
      link.href = capturedImage
      link.download = `loveverse-moment-${Date.now()}.png`
      link.click()
    }
  }

  const resetPhotobooth = () => {
    setCapturedImage(null)
    setSelectedStickers([])
    setOverlayText(proposalData?.partnerName || 'You & Me')
    startVideo()
  }

  if (capturedImage) {
    return (
      <section id="photobooth" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-foreground">Your Love Moment</h2>
              <p className="font-inter text-foreground/70 text-lg">Captured forever</p>
            </div>

            {/* Polaroid style card */}
            <Card className="p-4 bg-soft-white shadow-2xl mb-8 w-full rounded-2xl">
              <div className="bg-soft-white p-4">
                <img src={capturedImage} alt="Your love moment" className="w-full rounded-lg mb-4" />
                <p className="font-inter text-center text-foreground/70 font-medium text-sm italic">
                  {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </Card>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={downloadPhoto}
                className="font-inter bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-2xl font-semibold flex-1 raised-shadow btn-scale pulse-soft"
              >
                <Download className="mr-2 w-5 h-5" />
                Download Photo
              </Button>
              <Button
                onClick={resetPhotobooth}
                variant="outline"
                className="font-inter border-border text-foreground hover:bg-muted px-8 py-6 rounded-2xl font-semibold flex-1 smooth-highlight"
              >
                <RotateCcw className="mr-2 w-5 h-5" />
                Take Another
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="photobooth" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 fade-in">
            <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-foreground">Love Photobooth</h2>
            <p className="font-inter text-foreground/70 text-lg">
              Create a magical moment together
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Camera Section */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden border-border shadow-xl rounded-2xl">
                {!isVideoActive ? (
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-col gap-4">
                    <Heart className="w-16 h-16 text-primary fill-primary" />
                    <Button
                      onClick={startVideo}
                      className="font-inter bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-2xl raised-shadow"
                    >
                      Start Camera
                    </Button>
                  </div>
                ) : (
                  <div className="relative">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-auto"
                    />
                    <canvas ref={canvasRef} className="hidden" />

                    {/* Stickers overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                      {selectedStickers.map((sticker, index) => (
                        <div
                          key={index}
                          className="absolute bounce-in drop-shadow-lg"
                          style={{
                            left: `${sticker.x}px`,
                            top: `${sticker.y}px`,
                            fontSize: `${sticker.size}px`,
                          }}
                        >
                          {sticker.emoji}
                        </div>
                      ))}
                    </div>

                    {/* Controls */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
                      <Button
                        onClick={capturePhoto}
                        className="font-inter bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-2xl font-semibold raised-shadow"
                      >
                        Capture Photo
                      </Button>
                      <Button
                        onClick={stopVideo}
                        variant="outline"
                        className="font-inter border-soft-white text-soft-white hover:bg-soft-white/20 px-6 py-3 rounded-2xl font-semibold"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            </div>

            {/* Controls Panel */}
            <div className="space-y-6">
              {/* Frame Selection */}
              <div>
                <h3 className="font-inter text-sm font-bold text-foreground mb-3 uppercase tracking-wider">Frames</h3>
                <div className="space-y-2">
                  {frames.map((frame) => (
                    <Button
                      key={frame.id}
                      onClick={() => setSelectedFrame(frame)}
                      variant={selectedFrame.id === frame.id ? 'default' : 'outline'}
                      className="font-inter w-full text-left justify-start rounded-2xl"
                    >
                      <div className={`w-4 h-4 rounded mr-2 bg-gradient-to-r ${frame.color}`}></div>
                      {frame.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Text Overlay */}
              <div>
                <h3 className="font-inter text-sm font-bold text-foreground mb-3 uppercase tracking-wider">Overlay Text</h3>
                <input
                  type="text"
                  value={overlayText}
                  onChange={(e) => setOverlayText(e.target.value)}
                  className="font-inter w-full px-3 py-2 rounded-2xl border border-border focus:border-primary focus:outline-none text-sm"
                  placeholder="Your custom text"
                />
              </div>

              {/* Sticker Selection */}
              <div>
                <h3 className="font-inter text-sm font-bold text-foreground mb-3 uppercase tracking-wider">Stickers</h3>
                <div className="grid grid-cols-3 gap-2">
                  {stickers.map((sticker, index) => (
                    <Button
                      key={index}
                      onClick={() => addSticker(sticker)}
                      variant="outline"
                      className="text-2xl p-2 h-auto aspect-square hover:bg-primary/10 rounded-2xl border-border"
                    >
                      {sticker}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
