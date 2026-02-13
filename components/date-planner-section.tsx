'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useLoveContext } from '@/app/context/love-context'
import { MapPin, Utensils, Music, Lightbulb, Activity, Heart, Sparkles, Palette, Mountain, Coffee, Globe, Star, Check } from 'lucide-react'
import Link from 'next/link'

const dateIdeas: Record<string, any> = {
  'Soft Romance Souls': {
    location: 'Cozy bookstore café by the window',
    activity: 'Browse books together and share your favorite passages',
    foodSuggestion: 'Warm hot chocolate and homemade pastries',
    playlistVibe: 'Soft indie acoustic and jazz',
    surpriseIdea: 'A handwritten bookmark with a love quote',
  },
  'Cozy & Connected Hearts': {
    location: 'Home with fairy lights and blankets',
    activity: 'Late night conversations under starry sky on balcony',
    foodSuggestion: 'Homemade pizza and wine',
    playlistVibe: 'Lo-fi beats and ambient music',
    surpriseIdea: 'Playlist of "your songs" together',
  },
  'Dramatic & Passionate': {
    location: 'Rooftop restaurant with city views',
    activity: 'Share your deepest dreams and desires',
    foodSuggestion: 'Fancy dinner with champagne',
    playlistVibe: 'Classical and romantic orchestral',
    surpriseIdea: 'Love letter sealed with wax',
  },
  'Chaotic & Fun Couple': {
    location: 'Arcade and street food market',
    activity: 'Play games, laugh uncontrollably, try new street food',
    foodSuggestion: 'Random street food adventure',
    playlistVibe: 'Upbeat pop and dance music',
    surpriseIdea: 'Matching arcade game t-shirts',
  },
  'Bollywood Dreams': {
    location: 'Outdoor venue decorated with flowers',
    activity: 'Dance under the stars to your favorite filmy songs',
    foodSuggestion: 'Traditional cuisine and sweets',
    playlistVibe: 'Bollywood classics and romantic songs',
    surpriseIdea: 'Recreate a famous movie dance scene',
  },
  'Adventure Seekers': {
    location: 'Hidden gem location or weekend getaway',
    activity: 'Spontaneous exploration and discovery',
    foodSuggestion: 'Try cuisines neither has tried',
    playlistVibe: 'Feel-good indie and adventure-themed music',
    surpriseIdea: 'Surprise weekend trip planned',
  },
  'Unique Love Story': {
    location: 'A meaningful place for you two',
    activity: 'Create memories that matter to you both',
    foodSuggestion: 'Something special you both love',
    playlistVibe: 'Your favorite songs together',
    surpriseIdea: 'A gesture that shows you care',
  },
}

// --- Categorized Date Ideas ---
type DateIdeaCard = {
  emoji: string
  title: string
  description: string
  cost: '💰' | '💰💰' | '💰💰💰'
  vibe: string
  location: string
  activity: string
  foodSuggestion: string
  playlistVibe: string
  surpriseIdea: string
}

const categorizedIdeas: Record<string, { icon: any; color: string; bgColor: string; ideas: DateIdeaCard[] }> = {
  '💕 Romantic': {
    icon: Heart,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    ideas: [
      {
        emoji: '🌅',
        title: 'Sunset Picnic',
        description: 'Watch the sunset with wine & cheese on a hilltop',
        cost: '💰💰',
        vibe: 'Dreamy & intimate',
        location: 'Hilltop park or lakeside',
        activity: 'Watch the sunset, share stories, stargaze together',
        foodSuggestion: 'Wine, cheese platter, fresh fruits & chocolate',
        playlistVibe: 'Chill acoustic love songs',
        surpriseIdea: 'A handwritten letter read at golden hour',
      },
      {
        emoji: '🕯️',
        title: 'Candlelight Dinner at Home',
        description: 'Cook together and dine by candlelight',
        cost: '💰',
        vibe: 'Warm & cozy',
        location: 'Your kitchen & dining room',
        activity: 'Cook a new recipe together, dine by candlelight',
        foodSuggestion: 'Pasta from scratch with homemade sauce',
        playlistVibe: 'Italian jazz & soft piano',
        surpriseIdea: 'A dessert with "I love you" written in chocolate',
      },
      {
        emoji: '💐',
        title: 'Flower Market & Café',
        description: 'Browse blooms and sip lattes together',
        cost: '💰💰',
        vibe: 'Fresh & cheerful',
        location: 'Local flower market & nearby café',
        activity: 'Pick a bouquet together, enjoy coffee & pastries',
        foodSuggestion: 'Croissants, lattes & fresh juice',
        playlistVibe: 'French café music',
        surpriseIdea: 'A single rose with a love note attached',
      },
    ],
  },
  '🏔️ Adventure': {
    icon: Mountain,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    ideas: [
      {
        emoji: '🥾',
        title: 'Sunrise Hike',
        description: 'Start the day with a magical sunrise trail',
        cost: '💰',
        vibe: 'Energetic & breathtaking',
        location: 'Nearby mountain trail or nature reserve',
        activity: 'Hike to the summit, watch the sunrise together',
        foodSuggestion: 'Trail mix, energy bars & thermos of coffee',
        playlistVibe: 'Nature sounds & feel-good indie',
        surpriseIdea: 'A polaroid camera to capture the moment',
      },
      {
        emoji: '🚗',
        title: 'Spontaneous Road Trip',
        description: 'No plan, just drive and discover',
        cost: '💰💰💰',
        vibe: 'Free-spirited & fun',
        location: 'Wherever the road takes you',
        activity: 'Road trip with random stops, explore unknown towns',
        foodSuggestion: 'Diner food at quirky roadside cafés',
        playlistVibe: 'Road trip anthems & sing-along classics',
        surpriseIdea: 'A scratch-off map to mark your adventures',
      },
      {
        emoji: '⛺',
        title: 'Backyard Camping',
        description: 'Camp under the stars without leaving home',
        cost: '💰',
        vibe: 'Chill & romantic',
        location: 'Your backyard or rooftop',
        activity: 'Set up a tent, tell stories, roast marshmallows',
        foodSuggestion: 'S\'mores, hot dogs & hot chocolate',
        playlistVibe: 'Campfire acoustic & folk songs',
        surpriseIdea: 'A jar of "reasons I love you" to read aloud',
      },
    ],
  },
  '🎨 Creative': {
    icon: Palette,
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
    ideas: [
      {
        emoji: '🖌️',
        title: 'Paint & Sip Night',
        description: 'Paint each other\'s portraits with wine',
        cost: '💰💰',
        vibe: 'Fun & artsy',
        location: 'Home studio or paint bar',
        activity: 'Paint portraits of each other, compare results!',
        foodSuggestion: 'Wine, cheese & crackers',
        playlistVibe: 'Jazzy lo-fi beats',
        surpriseIdea: 'Frame your paintings and hang them side by side',
      },
      {
        emoji: '📸',
        title: 'DIY Photo Shoot',
        description: 'Dress up and create your own couple shoot',
        cost: '💰',
        vibe: 'Playful & memorable',
        location: 'A scenic spot in your city',
        activity: 'Style outfits, pose, take photos, create a mini-album',
        foodSuggestion: 'Bubble tea & street snacks',
        playlistVibe: 'Upbeat pop & feel-good vibes',
        surpriseIdea: 'Print the best photo as a canvas print',
      },
      {
        emoji: '🎭',
        title: 'Learn Something Together',
        description: 'Take a pottery, dance, or cooking class',
        cost: '💰💰',
        vibe: 'Exciting & bonding',
        location: 'Local workshop or online class',
        activity: 'Learn pottery, salsa, or sushi-making together',
        foodSuggestion: 'Whatever you create in class!',
        playlistVibe: 'Latin or world music',
        surpriseIdea: 'Sign up for a surprise class your partner would love',
      },
    ],
  },
  '☕ Chill': {
    icon: Coffee,
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
    ideas: [
      {
        emoji: '🎬',
        title: 'Movie Marathon',
        description: 'Binge your favorite genre with snacks galore',
        cost: '💰',
        vibe: 'Lazy & cozy',
        location: 'Living room blanket fort',
        activity: 'Build a blanket fort, watch 3 movies back-to-back',
        foodSuggestion: 'Popcorn, nachos, ice cream & soda',
        playlistVibe: 'Movie soundtracks during breaks',
        surpriseIdea: 'A themed snack box matching the movie genre',
      },
      {
        emoji: '📚',
        title: 'Bookstore Hopping',
        description: 'Explore bookstores and pick books for each other',
        cost: '💰',
        vibe: 'Peaceful & thoughtful',
        location: 'Independent bookstores & a nearby café',
        activity: 'Browse books, buy one for each other, read together',
        foodSuggestion: 'Coffee, muffins & sandwiches',
        playlistVibe: 'Soft ambient & classical',
        surpriseIdea: 'Write a love note on the first page of the book',
      },
      {
        emoji: '🧖',
        title: 'Spa Day at Home',
        description: 'Face masks, massage & complete relaxation',
        cost: '💰',
        vibe: 'Pampered & relaxed',
        location: 'Your bathroom & bedroom',
        activity: 'Face masks, massages, aromatherapy, bubble bath',
        foodSuggestion: 'Fruit infused water, smoothies & light snacks',
        playlistVibe: 'Spa & meditation music',
        surpriseIdea: 'A basket of luxury bath bombs & skincare',
      },
    ],
  },
  '🍕 Foodie': {
    icon: Utensils,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    ideas: [
      {
        emoji: '🌮',
        title: 'Food Crawl',
        description: 'Hop between eateries trying one dish each',
        cost: '💰💰',
        vibe: 'Adventurous & tasty',
        location: 'A food street or market area',
        activity: 'Try 5 different cuisines in one evening',
        foodSuggestion: 'Everything! Tacos, dumplings, pizza slices...',
        playlistVibe: 'Latin pop & world beats',
        surpriseIdea: 'Rate each place and create "your food guide"',
      },
      {
        emoji: '🍰',
        title: 'Bake-Off Challenge',
        description: 'Compete to bake the best dessert',
        cost: '💰',
        vibe: 'Competitive & hilarious',
        location: 'Your kitchen',
        activity: 'Each person bakes a dessert, taste-test & judge',
        foodSuggestion: 'Whatever you bake! + ice cream on the side',
        playlistVibe: 'Upbeat cooking show music',
        surpriseIdea: 'A funny trophy for the winner',
      },
      {
        emoji: '🍣',
        title: 'Mystery Cuisine Night',
        description: 'Order something you\'ve never tried before',
        cost: '💰💰',
        vibe: 'Curious & surprising',
        location: 'A restaurant with a cuisine new to both',
        activity: 'Let each other order for the other, no peeking!',
        foodSuggestion: 'Chef\'s choice — trust the journey',
        playlistVibe: 'World fusion & ambient',
        surpriseIdea: 'A "date journal" to rank all your food adventures',
      },
    ],
  },
  '🌍 Cultural': {
    icon: Globe,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    ideas: [
      {
        emoji: '🏛️',
        title: 'Museum & Gallery Stroll',
        description: 'Wander through art and history together',
        cost: '💰',
        vibe: 'Thoughtful & inspiring',
        location: 'Local museum or art gallery',
        activity: 'Explore exhibits, discuss your favorites, take photos',
        foodSuggestion: 'Museum café lunch & espresso',
        playlistVibe: 'Classical piano & ambient',
        surpriseIdea: 'A print of your favorite artwork from the visit',
      },
      {
        emoji: '🎵',
        title: 'Live Music Night',
        description: 'Enjoy live jazz, indie, or open-mic performances',
        cost: '💰💰',
        vibe: 'Vibrant & soulful',
        location: 'Jazz bar, concert venue, or open-mic café',
        activity: 'Listen to live music, dance, discover new artists',
        foodSuggestion: 'Cocktails, tapas & bar bites',
        playlistVibe: 'Whatever the band plays!',
        surpriseIdea: 'A vinyl record of the artist you loved most',
      },
      {
        emoji: '🎪',
        title: 'Festival or Fair Date',
        description: 'Rides, games, cotton candy & good vibes',
        cost: '💰💰',
        vibe: 'Playful & exciting',
        location: 'Local fair, carnival, or cultural festival',
        activity: 'Ride the ferris wheel, play games, try fair food',
        foodSuggestion: 'Cotton candy, funnel cake & corn dogs',
        playlistVibe: 'Carnival & pop music',
        surpriseIdea: 'Win a stuffed animal for your partner',
      },
    ],
  },
}

export function DatePlannerSection() {
  const { getQuizResult, datePlan, setDatePlan } = useLoveContext()
  const result = getQuizResult()
  const [plan, setPlan] = useState<any>(dateIdeas[result || 'Unique Love Story'])
  const [isEditing, setIsEditing] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [selectedIdea, setSelectedIdea] = useState<DateIdeaCard | null>(null)

  useEffect(() => {
    if (result && dateIdeas[result]) {
      setPlan(dateIdeas[result])
    }
  }, [result])

  const handleFieldChange = (field: string, value: string) => {
    const updatedPlan = { ...plan, [field]: value }
    setPlan(updatedPlan)
  }

  const handleSavePlan = () => {
    setDatePlan(plan)
    setIsEditing(false)
  }

  const handleIdeaClick = (idea: DateIdeaCard) => {
    setSelectedIdea(idea)
    setPlan({
      location: idea.location,
      activity: idea.activity,
      foodSuggestion: idea.foodSuggestion,
      playlistVibe: idea.playlistVibe,
      surpriseIdea: idea.surpriseIdea,
    })
    // Scroll to plan section
    document.getElementById('plan-grid')?.scrollIntoView({ behavior: 'smooth' })
  }

  const iconConfigs = [
    { icon: MapPin, color: 'text-rose-600', bg: 'bg-rose-50', label: 'Location', field: 'location' },
    { icon: Activity, color: 'text-violet-600', bg: 'bg-violet-50', label: 'Activity', field: 'activity' },
    { icon: Utensils, color: 'text-orange-600', bg: 'bg-orange-50', label: 'Food Suggestion', field: 'foodSuggestion' },
    { icon: Music, color: 'text-blue-600', bg: 'bg-blue-50', label: 'Playlist Vibe', field: 'playlistVibe' },
  ]

  return (
    <section id="planner" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-circle(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 border-2 border-rose-200 rounded-full mb-6">
              <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
              <span className="font-inter text-sm font-semibold text-rose-600 tracking-wide">DATE PLANNER</span>
            </div>
            <h2 className="font-playfair text-5xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
              Plan Your Perfect Date
            </h2>
            {result ? (
              <div className="flex flex-col items-center gap-3">
                <p className="font-inter text-foreground/60 text-lg">
                  Customized for your unique love story
                </p>
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 border-2 border-primary/20 rounded-full">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-primary font-semibold font-inter">{result}</span>
                </div>
              </div>
            ) : (
              <p className="font-inter text-foreground/60 text-lg max-w-2xl mx-auto">
                Browse date ideas below, or{' '}
                <Link href="/quiz" className="text-primary font-semibold hover:underline underline-offset-4">
                  take the quiz
                </Link>{' '}
                to get a personalized plan!
              </p>
            )}
          </div>

          {result && (
            <>
              {/* Plan Grid */}
              <div id="plan-grid" className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                {iconConfigs.map(({ icon: Icon, color, bg, label, field }) => (
                  <Card 
                    key={field}
                    className={`group relative p-6 bg-white border-2 border-border/50 rounded-3xl hover:border-primary/30 transition-all duration-300 hover:shadow-xl ${
                      field === 'activity' || field === 'playlistVibe' ? '' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 p-3.5 ${bg} rounded-2xl border-2 border-transparent group-hover:border-${color.split('-')[1]}-200 transition-all duration-300`}>
                        <Icon className={`w-6 h-6 ${color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <label className="font-inter text-xs font-bold text-foreground/50 uppercase tracking-wider block mb-2.5">
                          {label}
                        </label>
                        {isEditing ? (
                          <Input
                            value={plan[field]}
                            onChange={(e) => handleFieldChange(field, e.target.value)}
                            className="w-full border-2 border-primary/30 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                        ) : (
                          <p className="text-base font-medium text-foreground leading-relaxed">
                            {plan[field]}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}

                {/* Surprise Idea - Full Width */}
                <Card className="group relative p-6 bg-white border-2 border-border/50 rounded-3xl hover:border-primary/30 transition-all duration-300 hover:shadow-xl md:col-span-2">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-3.5 bg-amber-50 rounded-2xl border-2 border-transparent group-hover:border-amber-200 transition-all duration-300">
                      <Lightbulb className="w-6 h-6 text-amber-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <label className="font-inter text-xs font-bold text-foreground/50 uppercase tracking-wider block mb-2.5">
                        Small Surprise Idea
                      </label>
                      {isEditing ? (
                        <Input
                          value={plan.surpriseIdea}
                          onChange={(e) => handleFieldChange('surpriseIdea', e.target.value)}
                          className="w-full border-2 border-primary/30 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                      ) : (
                        <p className="text-base font-medium text-foreground leading-relaxed">
                          {plan.surpriseIdea}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
                <Button
                  onClick={() => (isEditing ? handleSavePlan() : setIsEditing(true))}
                  variant="outline"
                  className="font-inter font-semibold px-8 py-6 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-300"
                >
                  {isEditing ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Save Changes
                    </>
                  ) : (
                    'Edit Plan'
                  )}
                </Button>
                <Link href="/proposal">
                  <Button className="font-inter font-semibold bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                    Create Proposal
                    <Heart className="ml-2 w-5 h-5 fill-current" />
                  </Button>
                </Link>
              </div>
            </>
          )}

          {/* ========== MORE DATE IDEAS ========== */}
          <div className="relative">
            {/* Decorative line */}
            <div className="flex items-center justify-center mb-16">
              <div className="flex-1 h-px bg-border/30"></div>
              <div className="px-6">
                <div className="p-4 bg-primary/5 rounded-full border-2 border-primary/10">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="flex-1 h-px bg-border/30"></div>
            </div>

            <div className="text-center mb-12 fade-in">
              <h3 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-foreground">
                More Date Ideas
              </h3>
              <p className="font-inter text-foreground/60 text-base max-w-2xl mx-auto">
                Browse by category and click any card to auto-fill your plan above
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {Object.entries(categorizedIdeas).map(([category, data]) => {
                const Icon = data.icon
                const isActive = activeCategory === category
                return (
                  <Button
                    key={category}
                    variant="outline"
                    onClick={() => setActiveCategory(isActive ? null : category)}
                    className={`font-inter font-semibold rounded-2xl px-6 py-3 border-2 transition-all duration-300 ${
                      isActive
                        ? `bg-primary text-primary-foreground border-primary shadow-lg scale-105`
                        : `bg-white border-border/50 text-foreground/70 hover:border-primary/40 hover:bg-primary/5`
                    }`}
                  >
                    <Icon className={`w-4 h-4 mr-2 ${isActive ? 'text-primary-foreground' : data.color}`} />
                    {category}
                  </Button>
                )
              })}
            </div>

            {/* Idea Cards Grid */}
            {activeCategory && categorizedIdeas[activeCategory] && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 slide-up">
                {categorizedIdeas[activeCategory].ideas.map((idea, idx) => {
                  const isSelected = selectedIdea?.title === idea.title
                  const categoryData = categorizedIdeas[activeCategory]
                  return (
                    <Card
                      key={idx}
                      onClick={() => handleIdeaClick(idea)}
                      className={`group relative p-6 rounded-3xl cursor-pointer transition-all duration-300 border-2 overflow-hidden ${
                        isSelected
                          ? 'border-primary bg-primary/5 shadow-2xl scale-[1.02] ring-4 ring-primary/10'
                          : 'border-border/40 bg-white hover:border-primary/50 hover:shadow-xl hover:-translate-y-1'
                      }`}
                    >
                      {/* Selected indicator */}
                      {isSelected && (
                        <div className="absolute top-4 right-4 p-1.5 bg-primary rounded-full">
                          <Check className="w-3.5 h-3.5 text-primary-foreground" />
                        </div>
                      )}
                      
                      {/* Emoji with background */}
                      <div className={`inline-flex items-center justify-center w-16 h-16 ${categoryData.bgColor} rounded-2xl mb-4 border-2 border-transparent group-hover:border-primary/20 transition-all`}>
                        <span className="text-3xl">{idea.emoji}</span>
                      </div>
                      
                      <h4 className="font-inter font-bold text-foreground text-xl mb-2 group-hover:text-primary transition-colors">
                        {idea.title}
                      </h4>
                      
                      <p className="font-inter text-foreground/60 text-sm mb-4 leading-relaxed min-h-[2.5rem]">
                        {idea.description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-border/30">
                        <span className="inline-flex items-center text-xs font-inter font-medium text-foreground/60 bg-muted px-3 py-1.5 rounded-full">
                          {idea.vibe}
                        </span>
                        <span className="text-base">{idea.cost}</span>
                      </div>
                      
                      {isSelected && (
                        <div className="mt-4 flex items-center gap-1.5 text-primary text-sm font-semibold font-inter bg-primary/10 px-3 py-2 rounded-xl border border-primary/20">
                          <Star className="w-4 h-4 fill-current" />
                          Applied to your plan!
                        </div>
                      )}
                    </Card>
                  )
                })}
              </div>
            )}

            {/* Show all categories collapsed hint */}
            {!activeCategory && (
              <div className="text-center py-16">
                <div className="inline-flex flex-col items-center gap-4 p-8 bg-muted/30 rounded-3xl border-2 border-dashed border-border/50">
                  <div className="text-5xl opacity-40">✨</div>
                  <p className="font-inter text-foreground/50 text-base">
                    Select a category above to explore amazing date ideas
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}