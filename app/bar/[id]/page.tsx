import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, MapPin, Star, Clock, Calendar, Share2, Bookmark, Heart, MessageCircle, Image, User } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

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
    gallery: [
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80",
      "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1583227122027-d2d360c66d3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    ],
    tags: ["Cocktails", "Speakeasy", "Date Night"],
    amenities: ["Outdoor Seating", "Food Menu", "Reservations", "Non-smoking Area"],
    address: "99 Julu Road, Huangpu District, Shanghai",
    phone: "+86 21 6123 4567",
    website: "loganspunch.com",
    platformContent: `
      <p>Logan's Punch is the perfect blend of 1920s speakeasy vibes and modern mixology. The moment you step through the doors, you're transported to an era of prohibition and jazz music, but with a distinctly Shanghai twist.</p>
      
      <p>Their signature punch bowls are perfect for sharing with friends, while the cozy atmosphere makes it ideal for intimate conversations. The dim lighting, vintage furniture, and attentive service create an ambiance that's both exclusive and welcoming.</p>
      
      <p>What sets Logan's apart is their commitment to quality ingredients and innovative techniques. Each cocktail is crafted with precision, often incorporating local Chinese elements that give them a unique character you won't find elsewhere.</p>
      
      <p>We recommend trying their namesake Logan's Punch, a perfectly balanced concoction served in an ornate bowl. For something more personal, the bartenders excel at customizing drinks based on your preferences – just tell them what flavors you enjoy.</p>
      
      <p>While primarily known for drinks, don't overlook their small but excellent food menu, which pairs perfectly with their cocktail selection.</p>
    `,
    studentExperiences: [
      {
        name: "Alex",
        avatar: "https://i.pravatar.cc/150?img=1",
        university: "NYU Shanghai",
        date: "September 15, 2023",
        content: "Logan's Punch is my go-to spot for impressing visitors from back home. The hidden entrance adds to the experience, and their Old Fashioned is the best I've had in Shanghai. The atmosphere is perfect for those wanting an upscale night out without the pretentiousness you might find at other high-end bars. I've been here at least a dozen times, and the service is consistently excellent.",
        rating: 5,
        likes: 24,
        comments: 3,
        images: ["https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1025&q=80"]
      },
      {
        name: "Maria",
        avatar: "https://i.pravatar.cc/150?img=5",
        university: "Fudan University",
        date: "October 3, 2023",
        content: "Great vibes and music! A bit pricey but worth it for special occasions. The bartenders really know their craft and are happy to explain the ingredients and techniques they use. I recommend going on a weeknight if you want a quieter experience. Weekends can get pretty busy, and you might need to wait for a table.",
        rating: 4.5,
        likes: 18,
        comments: 2,
        images: []
      },
      {
        name: "Jun",
        avatar: "https://i.pravatar.cc/150?img=8",
        university: "Shanghai Jiao Tong University",
        date: "November 12, 2023",
        content: "As a local student, I've been to many bars in Shanghai, and Logan's Punch stands out for its unique character. The fusion of Western cocktail culture with subtle Chinese influences creates something special. I particularly enjoy their seasonal specials that incorporate local ingredients. The price point is high for a student budget, but it's a great place for celebrations.",
        rating: 4.8,
        likes: 32,
        comments: 5,
        images: ["https://images.unsplash.com/photo-1546171753-97d7676e4602?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80", "https://images.unsplash.com/photo-1534151757728-an90571588fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=735&q=80"]
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
    gallery: [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1583227122027-d2d360c66d3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    ],
    tags: ["Award-winning", "Speakeasy", "Craft Cocktails"],
    amenities: ["Multiple Floors", "Standing Room", "Reservations Recommended"],
    address: "579 Fuxing Middle Road, Huangpu District, Shanghai",
    phone: "+86 21 6416 0133",
    website: "speaklow.com",
    platformContent: `
      <p>Speak Low isn't just a bar—it's an institution. Ranked consistently among Asia's 50 Best Bars, this multi-level speakeasy offers progressively exclusive experiences as you ascend through its floors.</p>
      
      <p>The journey begins in an unassuming bartending equipment shop. Finding the hidden entrance is part of the experience, though we won't spoil the exact mechanism here. Once inside, you'll discover why this place has earned its reputation as one of Shanghai's premier cocktail destinations.</p>
      
      <p>Each floor has its own concept and menu, becoming more exclusive as you go higher. The first floor offers a lively atmosphere with expertly crafted classics, while the second floor provides a more intimate setting with innovative signature creations. For those in the know, there's even a secret third floor with an extremely curated experience.</p>
      
      <p>The craftsmanship behind each drink is nothing short of art. The head bartender, Shingo Gokan, brings Japanese precision and creativity to classic cocktail techniques, resulting in drinks that are both familiar and surprising.</p>
      
      <p>Be prepared to wait for entry on busy nights, and consider making reservations for the upper floors. The experience is well worth the effort.</p>
    `,
    studentExperiences: [
      {
        name: "Tomas",
        avatar: "https://i.pravatar.cc/150?img=11",
        university: "Shanghai Jiao Tong University",
        date: "August 28, 2023",
        content: "Finding the entrance is half the fun! Once inside, it's like entering another world. Each floor has its own unique atmosphere. The second floor is my favorite - more relaxed and the bartenders take time to explain the drinks. Pricey but an essential Shanghai experience.",
        rating: 5,
        likes: 41,
        comments: 7,
        images: ["https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1025&q=80"]
      },
      {
        name: "Lin",
        avatar: "https://i.pravatar.cc/150?img=9",
        university: "East China Normal University",
        date: "October 17, 2023",
        content: "I took my parents here when they visited and they were blown away. The presentation of the drinks is Instagram-worthy and the flavors are complex and balanced. Pro tip: go on a weekday if possible, weekends get extremely crowded. Worth saving up for if you're on a student budget.",
        rating: 4.8,
        likes: 29,
        comments: 4,
        images: ["https://images.unsplash.com/photo-1546171753-97d7676e4602?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"]
      }
    ]
  }
];

export default function BarDetailPage({ params }: { params: { id: string } }) {
  // Find the bar by ID
  const bar = bars.find(bar => bar.id === params.id) || bars[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-zinc-900 dark:to-black p-2 sm:p-4 md:p-8">
      {/* Glassmorphic container */}
      <div className="w-full max-w-7xl mx-auto backdrop-blur-xl bg-white/30 dark:bg-zinc-900/30 border-4 border-black dark:dark-rounded-gradient-border rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-lg overflow-hidden">
        {/* Header */}
        <header className="border-b-4 border-black dark:dark-gradient-border p-4 sm:p-6 bg-white/40 dark:bg-transparent backdrop-blur-md">
          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <Link href="/bar">
                <Button variant="outline" className="rounded-xl border-2 border-black dark:dark-rounded-gradient-border">
                  <ArrowLeft className="h-5 w-5 mr-2" /> Back to Bars
                </Button>
              </Link>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">{bar.name}</h1>
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* Main content */}
        <div className="overflow-auto max-h-[calc(100vh-6rem)]">
          {/* Hero Image */}
          <div className="relative h-[40vh] min-h-[300px]">
            <img 
              src={bar.mainImage} 
              alt={bar.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <div className="flex items-center mb-2">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                <span className="font-bold text-lg">{bar.rating}</span>
                <span className="mx-2">•</span>
                <span>{bar.priceRange}</span>
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4 mr-1" />
                <span>{bar.hours}</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{bar.location}</span>
              </div>
            </div>
            <div className="absolute bottom-6 right-6 flex gap-2">
              <Button variant="secondary" size="sm" className="bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-xl">
                <Share2 className="h-4 w-4 mr-2" /> Share
              </Button>
              <Button variant="secondary" size="sm" className="bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-xl">
                <Bookmark className="h-4 w-4 mr-2" /> Save
              </Button>
            </div>
          </div>

          {/* Content Tabs */}
          <div className="p-4 sm:p-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full bg-white/50 dark:bg-zinc-800/50 border-2 border-black dark:dark-rounded-gradient-border rounded-xl p-1 mb-6">
                <TabsTrigger
                  value="overview"
                  className="rounded-lg data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-gradient-to-r dark:data-[state=active]:from-amber-500 dark:data-[state=active]:to-orange-500 dark:data-[state=active]:text-black font-bold"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="experiences"
                  className="rounded-lg data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-gradient-to-r dark:data-[state=active]:from-amber-500 dark:data-[state=active]:to-orange-500 dark:data-[state=active]:text-black font-bold"
                >
                  Student Experiences
                </TabsTrigger>
                <TabsTrigger
                  value="gallery"
                  className="rounded-lg data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-gradient-to-r dark:data-[state=active]:from-amber-500 dark:data-[state=active]:to-orange-500 dark:data-[state=active]:text-black font-bold"
                >
                  Gallery
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview">
                <div className="grid md:grid-cols-[2fr_1fr] gap-6">
                  <div>
                    <Card className="border-4 border-black dark:dark-rounded-gradient-border rounded-xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-lg bg-white dark:bg-zinc-900 mb-6">
                      <h2 className="text-xl font-bold mb-4">About {bar.name}</h2>
                      <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: bar.platformContent }}></div>
                      
                      <div className="mt-6">
                        <h3 className="font-bold mb-2">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {bar.tags.map((tag) => (
                            <span key={tag} className="inline-block bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 text-xs px-3 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="border-4 border-black dark:dark-rounded-gradient-border rounded-xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-lg bg-white dark:bg-zinc-900">
                      <h2 className="text-xl font-bold mb-4">Photo Highlights</h2>
                      <div className="grid grid-cols-3 gap-3">
                        {bar.gallery.map((image, index) => (
                          <div key={index} className="aspect-square rounded-lg overflow-hidden border-2 border-black dark:border-gray-700">
                            <img src={image} alt={`${bar.name} ${index + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full mt-4 border-2 border-black dark:dark-rounded-gradient-border rounded-xl font-bold">
                        <Image className="h-4 w-4 mr-2" /> View All Photos
                      </Button>
                    </Card>
                  </div>
                  
                  <div className="space-y-6">
                    <Card className="border-4 border-black dark:dark-rounded-gradient-border rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-lg bg-white dark:bg-zinc-900">
                      <div className="p-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold">
                        Details
                      </div>
                      <div className="p-4 space-y-3">
                        <div>
                          <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400">Address</h3>
                          <p>{bar.address}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400">Hours</h3>
                          <p>{bar.hours}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400">Phone</h3>
                          <p>{bar.phone}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400">Website</h3>
                          <p>{bar.website}</p>
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="border-4 border-black dark:dark-rounded-gradient-border rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-lg bg-white dark:bg-zinc-900">
                      <div className="p-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold">
                        Amenities
                      </div>
                      <div className="p-4">
                        <ul className="space-y-2">
                          {bar.amenities.map((amenity, index) => (
                            <li key={index} className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
                              {amenity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Card>
                    
                    <Card className="border-4 border-black dark:dark-rounded-gradient-border rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-lg bg-white dark:bg-zinc-900">
                      <div className="p-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold">
                        Featured Student Experience
                      </div>
                      <div className="p-4">
                        <div className="flex items-center mb-3">
                          <Avatar className="h-10 w-10 mr-3 border-2 border-black">
                            <AvatarImage src={bar.studentExperiences[0].avatar} alt={bar.studentExperiences[0].name} />
                            <AvatarFallback>{bar.studentExperiences[0].name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-bold">{bar.studentExperiences[0].name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{bar.studentExperiences[0].university}</div>
                          </div>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < bar.studentExperiences[0].rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
                          ))}
                          <span className="text-sm ml-2">{bar.studentExperiences[0].date}</span>
                        </div>
                        <p className="text-sm line-clamp-3">{bar.studentExperiences[0].content}</p>
                        
                        <Button variant="outline" className="w-full mt-3 border-2 border-black dark:dark-rounded-gradient-border rounded-xl font-bold text-sm">
                          <User className="h-4 w-4 mr-2" /> View All Student Experiences
                        </Button>
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Student Experiences Tab */}
              <TabsContent value="experiences">
                <div className="space-y-6">
                  <h2 className="text-xl font-bold">Student Experiences at {bar.name}</h2>
                  
                  {bar.studentExperiences.map((experience, index) => (
                    <Card key={index} className="border-4 border-black dark:dark-rounded-gradient-border rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-lg bg-white dark:bg-zinc-900">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <Avatar className="h-12 w-12 mr-4 border-2 border-black">
                              <AvatarImage src={experience.avatar} alt={experience.name} />
                              <AvatarFallback>{experience.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-bold text-lg">{experience.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{experience.university}</div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-4 w-4 ${i < experience.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
                              ))}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {experience.date}
                            </div>
                          </div>
                        </div>
                        
                        <p className="mb-4">{experience.content}</p>
                        
                        {experience.images.length > 0 && (
                          <div className="grid grid-cols-3 gap-2 mb-4">
                            {experience.images.map((image, imgIndex) => (
                              <div key={imgIndex} className="aspect-square rounded-lg overflow-hidden border-2 border-black dark:border-gray-700">
                                <img src={image} alt={`Experience photo ${imgIndex + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
                          <Button variant="ghost" size="sm" className="flex items-center mr-4">
                            <Heart className="h-4 w-4 mr-1" />
                            {experience.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {experience.comments}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                  
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 text-black font-bold rounded-xl border-2 border-black dark:dark-rounded-gradient-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-sm p-6">
                    Share Your Experience
                  </Button>
                </div>
              </TabsContent>

              {/* Gallery Tab */}
              <TabsContent value="gallery">
                <div className="space-y-6">
                  <h2 className="text-xl font-bold">Photo Gallery</h2>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="aspect-square rounded-xl overflow-hidden border-4 border-black dark:dark-rounded-gradient-border shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-lg">
                      <img src={bar.mainImage} alt={bar.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                    </div>
                    
                    {bar.gallery.map((image, index) => (
                      <div key={index} className="aspect-square rounded-xl overflow-hidden border-4 border-black dark:dark-rounded-gradient-border shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-lg">
                        <img src={image} alt={`${bar.name} ${index + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                      </div>
                    ))}
                    
                    {bar.studentExperiences.flatMap(exp => exp.images).map((image, index) => (
                      <div key={`exp-${index}`} className="aspect-square rounded-xl overflow-hidden border-4 border-black dark:dark-rounded-gradient-border shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-lg">
                        <img src={image} alt={`Experience photo ${index + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full border-2 border-black dark:dark-rounded-gradient-border rounded-xl font-bold">
                    <Image className="h-4 w-4 mr-2" /> Upload Photos
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
} 