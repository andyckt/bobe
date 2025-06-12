import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ChevronRight, MapPin, Star, Clock, Music, Wine, GlassWater, ExternalLink, Building2, Instagram, Linkedin, Twitter, Youtube, Plus } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import SocialMediaCard from "@/components/social-media-card"
import StudioSelector from "@/components/studio-selector"

// Sample data - this would come from your database
const bars = [
  {
    id: "logan",
    name: "Logan's Punch",
    location: "Julu Lu, French Concession",
    rating: 4.8,
    priceRange: "$$$",
    hours: "8PM - 2AM",
    description: "A speakeasy-style cocktail bar with vintage decor and skilled mixologists crafting creative concoctions.",
    mainImage: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    tags: ["Cocktails", "Speakeasy", "Date Night"],
    platformContent: "Logan's Punch is the perfect blend of 1920s speakeasy vibes and modern mixology. Their signature punch bowls are perfect for sharing with friends, while the cozy atmosphere makes it ideal for intimate conversations.",
    studentExperiences: [
      {
        name: "Alex",
        university: "NYU Shanghai",
        content: "Logan's Punch is my go-to spot for impressing visitors from back home. The hidden entrance adds to the experience, and their Old Fashioned is the best I've had in Shanghai.",
        rating: 5
      },
      {
        name: "Maria",
        university: "Fudan University",
        content: "Great vibes and music! A bit pricey but worth it for special occasions. The bartenders really know their craft.",
        rating: 4.5
      }
    ]
  },
  {
    id: "speak-low",
    name: "Speak Low",
    location: "Fuxing Middle Road, Former French Concession",
    rating: 4.9,
    priceRange: "$$$",
    hours: "7PM - 2AM",
    description: "Multi-level speakeasy hidden behind a bartending equipment shop, serving some of Asia's best cocktails.",
    mainImage: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    tags: ["Award-winning", "Speakeasy", "Craft Cocktails"],
    platformContent: "Speak Low isn't just a bar—it's an institution. Ranked consistently among Asia's 50 Best Bars, this multi-level speakeasy offers progressively exclusive experiences as you ascend through its floors. The craftsmanship behind each drink is nothing short of art.",
    studentExperiences: [
      {
        name: "Tomas",
        university: "Shanghai Jiao Tong University",
        content: "Finding the entrance is half the fun! Once inside, it's like entering another world. Each floor has its own unique atmosphere. Pricey but an essential Shanghai experience.",
        rating: 5
      },
      {
        name: "Lin",
        university: "East China Normal University",
        content: "I took my parents here when they visited and they were blown away. The presentation of the drinks is Instagram-worthy and the flavors are complex and balanced.",
        rating: 4.8
      }
    ]
  },
  {
    id: "sober-company",
    name: "Sober Company",
    location: "Yandang Road, near Nanjing Road",
    rating: 4.7,
    priceRange: "$$$",
    hours: "6PM - 1AM",
    description: "Three-in-one concept with a café, restaurant, and cocktail bar, all with exceptional quality.",
    mainImage: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    tags: ["Food & Drinks", "Casual Elegance", "Hidden Bar"],
    platformContent: "Sober Company combines incredible food with outstanding drinks, making it perfect for starting your night out. Don't miss their hidden 'Sober Secret' bar within the venue—just ask the staff how to find it.",
    studentExperiences: [
      {
        name: "Sophia",
        university: "NYU Shanghai",
        content: "The perfect place to bring friends who aren't sure if they want dinner or drinks. You can have both! The cocktails pair beautifully with their modern Chinese dishes.",
        rating: 4.7
      },
      {
        name: "Raj",
        university: "Fudan University",
        content: "I love how this place transforms throughout the evening. Come early for a casual dinner and stay as the vibe shifts to a more energetic bar scene.",
        rating: 4.6
      }
    ]
  },
  {
    id: "senator",
    name: "Senator Saloon",
    location: "Wuyuan Road, Former French Concession",
    rating: 4.6,
    priceRange: "$$",
    hours: "6PM - 2AM",
    description: "American prohibition-era themed bar with classic cocktails and leather booths.",
    mainImage: "https://images.unsplash.com/photo-1583227122027-d2d360c66d3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    tags: ["Classic Cocktails", "American", "Whiskey"],
    platformContent: "Senator Saloon feels like stepping into a 1920s American bar. Their whiskey selection is impressive, and the bartenders excel at classics like the Sazerac and Manhattan. The dim lighting and comfortable seating make it ideal for conversation.",
    studentExperiences: [
      {
        name: "Jake",
        university: "Shanghai Jiao Tong University",
        content: "As an American student, this place cures my homesickness. The bourbon selection rivals bars back in Kentucky, and the atmosphere is always welcoming.",
        rating: 4.9
      },
      {
        name: "Emma",
        university: "Donghua University",
        content: "I love coming here on weeknights when it's quieter. The staff remembers returning customers and their preferences, which adds a personal touch.",
        rating: 4.5
      }
    ]
  },
  {
    id: "flair",
    name: "Flair Rooftop Bar",
    location: "58th Floor, The Ritz-Carlton Pudong",
    rating: 4.9,
    priceRange: "$$$",
    hours: "5PM - 1AM",
    description: "Spectacular rooftop bar offering panoramic views of Shanghai's skyline from the 58th floor of the Ritz-Carlton.",
    mainImage: "https://images.unsplash.com/photo-1551097295-4c28e380cdf6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    tags: ["Rooftop", "Skyline View", "Cocktails", "Date Night"],
    platformContent: "I Found The Rooftop Spot in Shanghai — And It Blew My Mind 🤯 Standing 58 floors above Shanghai, cocktail in hand, watching the city glow below like a galaxy. Arrive at 6:30pm for golden hour, stay for the spectacular city lights.",
    studentExperiences: [
      {
        name: "Sophie",
        university: "NYU Shanghai",
        content: "Came here for my birthday and it was MAGICAL! We timed it perfectly for sunset, and watching the city transform as night fell was an experience I'll never forget.",
        rating: 5
      },
      {
        name: "Raj",
        university: "Fudan University",
        content: "The view definitely lives up to the hype - it's breathtaking! I'd recommend saving this for when family visits or for a special occasion, as it's not really student-budget friendly.",
        rating: 4.7
      }
    ]
  }
];

function CategoryCard({ title, icon, count, color }: { title: string, icon: React.ReactNode, count: number, color: string }) {
  return (
    <Card className="border-4 border-black dark:dark-rounded-gradient-border rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-lg cursor-pointer hover:translate-y-[-4px] transition-transform">
      <div className={`p-4 bg-gradient-to-r ${color} text-white`}>
        <div className="flex justify-between items-start">
          {icon}
          <span className="text-xl font-bold">{count}</span>
        </div>
        <h3 className="text-lg font-bold mt-3">{title}</h3>
      </div>
      <div className="p-3 bg-white dark:bg-zinc-900 flex justify-between items-center">
        <span className="text-sm">View all</span>
        <ChevronRight className="h-4 w-4" />
      </div>
    </Card>
  )
}

export default function BarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-zinc-900 dark:to-black p-2 sm:p-4 md:p-8">
      {/* Glassmorphic container */}
      <div className="w-full max-w-7xl mx-auto backdrop-blur-xl bg-white/30 dark:bg-zinc-900/30 border-4 border-black dark:dark-rounded-gradient-border rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-lg overflow-hidden">
        {/* Header */}
        <header className="border-b-4 border-black dark:dark-gradient-border p-4 sm:p-6 bg-white/40 dark:bg-transparent backdrop-blur-md">
          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="outline" className="rounded-xl border-2 border-black dark:dark-rounded-gradient-border">
                  <ArrowLeft className="h-5 w-5 mr-2" /> Back
                </Button>
              </Link>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">SHANGHAI BARS | Bobe.co</h1>
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* Main content */}
        <div className="p-4 sm:p-6 overflow-auto max-h-[calc(100vh-6rem)]">
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-black mb-4">CONNECTED ACCOUNTS</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <SocialMediaCard
                platform="Instagram"
                username="@yourbrand"
                icon={<Instagram className="h-6 w-6" />}
                color="bg-gradient-to-br from-purple-500 to-pink-500"
              />
              <SocialMediaCard
                platform="Twitter"
                username="@yourbrand"
                icon={<Twitter className="h-6 w-6" />}
                color="bg-blue-400"
              />
              <SocialMediaCard
                platform="LinkedIn"
                username="Your Brand"
                icon={<Linkedin className="h-6 w-6" />}
                color="bg-blue-600"
              />
              <Button className="h-full min-h-[120px] border-4 border-dashed border-black dark:dark-rounded-gradient-border rounded-xl flex flex-col items-center justify-center gap-2 bg-white/50 hover:bg-white/70 dark:bg-zinc-800/50 dark:hover:bg-zinc-800/70">
                <Plus className="h-8 w-8" />
                <span className="font-bold">Add Platform</span>
              </Button>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-black mb-4">CONTENT STUDIO</h2>
            <StudioSelector />
          </div>

          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-black mb-6">FEATURED BARS</h2>
            
            {/* Featured bars grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bars.map((bar) => (
                <Card key={bar.id} className="border-4 border-black dark:dark-rounded-gradient-border rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-lg hover:translate-y-[-4px] transition-transform">
                  <div className={`aspect-[16/9] relative overflow-hidden ${bar.tags.includes("Rooftop") ? "bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500" : ""}`}>
                    <img 
                      src={bar.mainImage} 
                      alt={bar.name} 
                      className="w-full h-full object-cover"
                    />
                    {/* Special overlay for rooftop bars */}
                    {bar.tags.includes("Rooftop") && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent mix-blend-multiply"></div>
                    )}
                    {/* Regular overlay for other bars */}
                    {!bar.tags.includes("Rooftop") && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    )}
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <div className="flex items-center">
                        <h3 className="text-xl sm:text-2xl font-bold">{bar.name}</h3>
                        {bar.tags.includes("Rooftop") && (
                          <span className="ml-2 bg-gradient-to-r from-amber-400 to-orange-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                            Rooftop
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-sm mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{bar.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white dark:bg-zinc-900">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="font-bold">{bar.rating}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{bar.hours}</span>
                        </div>
                        <span className="font-medium">{bar.priceRange}</span>
                      </div>
                    </div>
                    
                    <div className="mb-3 flex flex-wrap gap-2">
                      {bar.tags.map((tag) => (
                        <span key={tag} className="inline-block bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 text-xs px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{bar.description}</p>
                    
                    <Link href={`/bar/${bar.id}`}>
                      <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 text-black font-bold rounded-xl border-2 border-black dark:dark-rounded-gradient-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-sm">
                        View Details <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl sm:text-2xl font-black mb-6">BROWSE BY CATEGORY</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <CategoryCard 
                title="Rooftop Bars" 
                icon={<Building2 className="h-8 w-8" />} 
                count={5}
                color="from-indigo-500 to-purple-500"
              />
              <CategoryCard 
                title="Craft Cocktails" 
                icon={<GlassWater className="h-8 w-8" />} 
                count={12}
                color="from-rose-500 to-red-500"
              />
              <CategoryCard 
                title="Live Music" 
                icon={<Music className="h-8 w-8" />} 
                count={8}
                color="from-blue-500 to-indigo-500"
              />
              <CategoryCard 
                title="Speakeasy" 
                icon={<ExternalLink className="h-8 w-8" />} 
                count={6}
                color="from-purple-500 to-violet-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 