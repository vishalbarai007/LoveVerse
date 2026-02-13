'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useLoveContext } from '@/app/context/love-context'
import { MapPin, Utensils, Music, Lightbulb, Activity, Heart, Sparkles, Palette, Mountain, Coffee, Globe, Star } from 'lucide-react'
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

const categorizedIdeas: Record<string, { icon: any; color: string; ideas: DateIdeaCard[] }> = {
  '💕 Romantic': {
    icon: Heart,
    color: 'text-rose-500',
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
    color: 'text-emerald-500',
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
    color: 'text-violet-500',
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
    color: 'text-amber-600',
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
    color: 'text-orange-500',
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
    color: 'text-blue-500',
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


  return (
    <section id="planner" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 fade-in">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-foreground">Plan Your Perfect Date</h2>
            {result ? (
              <p className="font-inter text-foreground/70 text-lg">
                Customized just for your love vibe: <span className="text-primary font-semibold">{result}</span>
              </p>
            ) : (
              <p className="font-inter text-foreground/70 text-lg">
                Browse date ideas below, or <Link href="/quiz" className="text-primary font-semibold underline underline-offset-4 hover:text-primary/80">take the quiz</Link> to get a personalized plan!
              </p>
            )}
          </div>

          {result && (
            <>
              {/* Plan Grid */}
              <div id="plan-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Location */}
                <Card className="p-6 bg-soft-white border-border rounded-2xl hover:shadow-lg transition-all duration-300 shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-2xl">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 w-full">
                      <label className="font-inter text-sm font-semibold text-foreground/70 block mb-2">Location</label>
                      {isEditing ? (
                        <Input
                          value={plan.location}
                          onChange={(e) => handleFieldChange('location', e.target.value)}
                          className="w-full border-primary/30"
                        />
                      ) : (
                        <p className="text-base font-medium text-foreground">{plan.location}</p>
                      )}
                    </div>
                  </div>
                </Card>

                {/* Activity */}
                <Card className="p-6 bg-soft-white border-border rounded-2xl hover:shadow-lg transition-all duration-300 shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-secondary/10 rounded-2xl">
                      <Activity className="w-6 h-6 text-secondary" />
                    </div>
                    <div className="flex-1 w-full">
                      <label className="font-inter text-sm font-semibold text-foreground/70 block mb-2">Activity</label>
                      {isEditing ? (
                        <Input
                          value={plan.activity}
                          onChange={(e) => handleFieldChange('activity', e.target.value)}
                          className="w-full border-primary/30"
                        />
                      ) : (
                        <p className="text-base font-medium text-foreground">{plan.activity}</p>
                      )}
                    </div>
                  </div>
                </Card>

                {/* Food Suggestion */}
                <Card className="p-6 bg-soft-white border-border rounded-2xl hover:shadow-lg transition-all duration-300 shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-accent/10 rounded-2xl">
                      <Utensils className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1 w-full">
                      <label className="font-inter text-sm font-semibold text-foreground/70 block mb-2">Food Suggestion</label>
                      {isEditing ? (
                        <Input
                          value={plan.foodSuggestion}
                          onChange={(e) => handleFieldChange('foodSuggestion', e.target.value)}
                          className="w-full border-primary/30"
                        />
                      ) : (
                        <p className="text-base font-medium text-foreground">{plan.foodSuggestion}</p>
                      )}
                    </div>
                  </div>
                </Card>

                {/* Playlist Vibe */}
                <Card className="p-6 bg-soft-white border-border rounded-2xl hover:shadow-lg transition-all duration-300 shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-2xl">
                      <Music className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 w-full">
                      <label className="font-inter text-sm font-semibold text-foreground/70 block mb-2">Playlist Vibe</label>
                      {isEditing ? (
                        <Input
                          value={plan.playlistVibe}
                          onChange={(e) => handleFieldChange('playlistVibe', e.target.value)}
                          className="w-full border-primary/30"
                        />
                      ) : (
                        <p className="text-base font-medium text-foreground">{plan.playlistVibe}</p>
                      )}
                    </div>
                  </div>
                </Card>

                {/* Surprise Idea */}
                <Card className="p-6 bg-soft-white border-border rounded-2xl hover:shadow-lg transition-all duration-300 shadow-md md:col-span-2">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-accent/10 rounded-2xl">
                      <Lightbulb className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1 w-full">
                      <label className="font-inter text-sm font-semibold text-foreground/70 block mb-2">Small Surprise Idea</label>
                      {isEditing ? (
                        <Input
                          value={plan.surpriseIdea}
                          onChange={(e) => handleFieldChange('surpriseIdea', e.target.value)}
                          className="w-full border-primary/30"
                        />
                      ) : (
                        <p className="text-base font-medium text-foreground">{plan.surpriseIdea}</p>
                      )}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Button
                  variant={isEditing ? 'default' : 'outline'}
                  onClick={() => isEditing ? handleSavePlan() : setIsEditing(true)}
                  className={`font-inter rounded-2xl transition-all ${isEditing ? 'bg-primary text-primary-foreground' : 'border-border text-foreground hover:bg-muted'}`}
                >
                  {isEditing ? 'Save Changes' : 'Edit Plan'}
                </Button>
                <Link href="/proposal">
                  <Button
                    className="font-inter bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-2xl raised-shadow btn-scale"
                  >
                    Create Proposal
                    <Heart className="ml-2 w-5 h-5 fill-current" />
                  </Button>
                </Link>
              </div>
            </>
          )}

          {/* ========== MORE DATE IDEAS ========== */}
          <div className="border-t border-border/50 pt-16">
            <div className="text-center mb-10 fade-in">
              <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-playfair text-3xl md:text-4xl font-bold mb-3 text-foreground">More Date Ideas</h3>
              <p className="font-inter text-foreground/60 text-base max-w-xl mx-auto">
                Browse by category and click any card to auto-fill your plan above
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {Object.entries(categorizedIdeas).map(([category, data]) => {
                const Icon = data.icon
                const isActive = activeCategory === category
                return (
                  <Button
                    key={category}
                    variant={isActive ? 'default' : 'outline'}
                    onClick={() => setActiveCategory(isActive ? null : category)}
                    className={`font-inter rounded-2xl px-5 py-2 transition-all duration-300 ${isActive
                      ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                      : 'border-border text-foreground/70 hover:bg-primary/5 hover:border-primary/30'
                      }`}
                  >
                    <Icon className={`w-4 h-4 mr-2 ${isActive ? '' : data.color}`} />
                    {category}
                  </Button>
                )
              })}
            </div>

            {/* Idea Cards Grid */}
            {activeCategory && categorizedIdeas[activeCategory] && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 slide-up">
                {categorizedIdeas[activeCategory].ideas.map((idea, idx) => {
                  const isSelected = selectedIdea?.title === idea.title
                  return (
                    <Card
                      key={idx}
                      onClick={() => handleIdeaClick(idea)}
                      className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 group border-2 ${isSelected
                        ? 'border-primary bg-primary/5 shadow-xl scale-[1.02]'
                        : 'border-border/50 bg-soft-white hover:border-primary/40 hover:shadow-lg hover:-translate-y-1'
                        }`}
                    >
                      <div className="text-4xl mb-3">{idea.emoji}</div>
                      <h4 className="font-inter font-bold text-foreground text-lg mb-1 group-hover:text-primary transition-colors">
                        {idea.title}
                      </h4>
                      <p className="font-inter text-foreground/60 text-sm mb-3 leading-relaxed">
                        {idea.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-inter text-foreground/50 bg-muted px-2 py-1 rounded-full">
                          {idea.vibe}
                        </span>
                        <span className="text-sm">{idea.cost}</span>
                      </div>
                      {isSelected && (
                        <div className="mt-3 flex items-center gap-1 text-primary text-xs font-semibold font-inter">
                          <Star className="w-3 h-3 fill-current" />
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
              <div className="text-center py-8 text-foreground/40 font-inter">
                <p>👆 Tap a category above to explore date ideas</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
