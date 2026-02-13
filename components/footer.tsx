import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-primary fill-primary" />
              <h3 className="font-playfair font-bold text-lg text-primary">LoveVerse</h3>
            </div>
            <p className="font-inter text-foreground/70 text-sm">
              Celebrate your love story with beautiful moments and meaningful connections.
            </p>
          </div>
          
          <div>
            <h4 className="font-inter font-semibold mb-4 text-foreground">Features</h4>
            <ul className="font-inter space-y-2 text-sm text-foreground/70">
              <li>Love Personality Quiz</li>
              <li>Smart Date Planner</li>
              <li>Digital Proposal Builder</li>
              <li>Love Photobooth</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-inter font-semibold mb-4 text-foreground">Contact</h4>
            <p className="font-inter text-sm text-foreground/70">
              Have questions? We'd love to hear from you!
            </p>
            <p className="font-inter text-sm text-primary font-medium mt-2">
              hello@loveverse.com
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <p className="font-inter text-center text-sm text-foreground/60">
            © 2025 LoveVerse. Made with <Heart className="inline w-4 h-4 text-primary fill-primary" /> for couples in love.
          </p>
        </div>
      </div>
    </footer>
  )
}
