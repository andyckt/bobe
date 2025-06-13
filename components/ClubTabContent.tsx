"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import ClubCard from "@/components/ClubCard"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function ClubTabContent() {
  const [activeTab, setActiveTab] = useState("ins-park")
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const [hoverStyle, setHoverStyle] = useState({})
  const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" })
  const tabRefs = useRef<Record<string, HTMLDivElement | null>>({
    "ins-park": null,
    "other-clubs": null
  })
  
  const clubContent = {
    hero: {
      title: "INS Park: Shanghai's Wildest Club Playground"
    }
  }

  // Club images for the marquee with Unsplash images
  const clubImages = [
    {
      src: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800&auto=format&fit=crop",
      alt: "Nightclub with colorful lights"
    },
    {
      src: "https://images.unsplash.com/photo-1571266028243-a52c5f753e7c?q=80&w=800&auto=format&fit=crop",
      alt: "DJ booth with crowd"
    },
    {
      src: "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?q=80&w=800&auto=format&fit=crop",
      alt: "Dance floor with people dancing"
    },
    {
      src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
      alt: "Nightclub with laser lights"
    },
    {
      src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
      alt: "People dancing at a nightclub"
    },
    {
      src: "https://images.unsplash.com/photo-1438557068880-c5f474830377?q=80&w=800&auto=format&fit=crop",
      alt: "Colorful nightclub lighting"
    }
  ];

  useEffect(() => {
    if (hoveredTab !== null) {
      const hoveredElement = tabRefs.current[hoveredTab]
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        })
      }
    }
  }, [hoveredTab])

  useEffect(() => {
    const activeElement = tabRefs.current[activeTab]
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement
      setActiveStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      })
    }
  }, [activeTab])

  useEffect(() => {
    requestAnimationFrame(() => {
      const initialElement = tabRefs.current["ins-park"]
      if (initialElement) {
        const { offsetLeft, offsetWidth } = initialElement
        setActiveStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        })
      }
    })
  }, [])

  return (
    <div>
      <motion.h1
        className="text-5xl md:text-7xl font-black mb-8 mt-4 leading-tight text-center"
        style={{
          background: "linear-gradient(45deg, #ff006e, #8338ec, #3a86ff, #06ffa5)",
          backgroundSize: "400% 400%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        {clubContent.hero.title}
      </motion.h1>

      {/* Image Marquee - Improved version for seamless infinite loop */}
      <div className="relative w-full overflow-hidden mb-10 py-4">
        <div className="marquee-track flex gap-4">
          {/* First set of images */}
          {clubImages.map((image, index) => (
            <div key={`image-${index}`} className="marquee-item relative min-w-[200px] h-[150px] rounded-[20px] overflow-hidden border-4 border-black dark:dark-rounded-gradient-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-md">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
          
          {/* Duplicate set for seamless loop */}
          {clubImages.map((image, index) => (
            <div key={`image-dup-${index}`} className="marquee-item relative min-w-[200px] h-[150px] rounded-[20px] overflow-hidden border-4 border-black dark:dark-rounded-gradient-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-md">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          animation: marquee 30s linear infinite;
          width: calc(200px * ${clubImages.length * 2} + 1rem * ${(clubImages.length * 2) - 1});
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-200px * ${clubImages.length} - 1rem * ${clubImages.length - 1}));
          }
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="w-full mb-10">
        <div className="flex justify-center">
          <div className="relative">
            {/* Hover Highlight */}
            <div
              className="absolute h-[40px] transition-all duration-300 ease-out bg-[#0e0f1114] dark:bg-[#ffffff1a] rounded-[6px] flex items-center"
              style={{
                ...hoverStyle,
                opacity: hoveredTab !== null ? 1 : 0,
              }}
            />

            {/* Active Indicator */}
            <div
              className="absolute bottom-[-6px] h-[2px] bg-[#0e0f11] dark:bg-white transition-all duration-300 ease-out"
              style={activeStyle}
            />

            {/* Tabs */}
            <div className="relative flex space-x-[24px] items-center">
              <div
                ref={(el) => {
                  tabRefs.current["ins-park"] = el;
                }}
                className={`px-3 py-2 cursor-pointer transition-colors duration-300 h-[40px] ${
                  activeTab === "ins-park" ? "text-[#0e0e10] dark:text-white" : "text-[#0e0f1199] dark:text-[#ffffff99]"
                }`}
                onMouseEnter={() => setHoveredTab("ins-park")}
                onMouseLeave={() => setHoveredTab(null)}
                onClick={() => setActiveTab("ins-park")}
              >
                <div className="text-lg font-medium leading-5 whitespace-nowrap flex items-center justify-center h-full">
                  INS Park
                </div>
              </div>
              
              <div
                ref={(el) => {
                  tabRefs.current["other-clubs"] = el;
                }}
                className={`px-3 py-2 cursor-pointer transition-colors duration-300 h-[40px] ${
                  activeTab === "other-clubs" ? "text-[#0e0e10] dark:text-white" : "text-[#0e0f1199] dark:text-[#ffffff99]"
                }`}
                onMouseEnter={() => setHoveredTab("other-clubs")}
                onMouseLeave={() => setHoveredTab(null)}
                onClick={() => setActiveTab("other-clubs")}
              >
                <div className="text-lg font-medium leading-5 whitespace-nowrap flex items-center justify-center h-full">
                  Other Venues
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TabsContent with AnimatePresence */}
        <AnimatePresence mode="wait">
          {/* INS Park Clubs */}
          {activeTab === "ins-park" && (
            <motion.div
              key="ins-park"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8 mt-8"
            >
              {/* Full Pass Guide */}
              <div className="mb-8">
                <h3 className="text-2xl sm:text-3xl font-black mb-6">FULL Pass Guide 🎟️</h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-lg">There are more than 8 clubs inside the INS Park building. By buying a FULL pass, you can enter all of them, except a club called Kezee which most people don't like it anyways.</p>
                  
                  <h4 className="text-xl font-bold mt-6 mb-4">Survival Guide ⚠️</h4>
                  <p>Remember to arrive early to get all the entry bracelets first! If you entry bracelets of all the clubs, you won't have to line up again, this is what I do pretty much every time I party at INS Park.</p>
                  
                  <h4 className="text-xl font-bold mt-6 mb-4">Clubs Included in the Full Pass</h4>
                  <p>If you've got the Full Pass, these are the clubs that are included:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Culture</li>
                    <li>Hush</li>
                    <li>Lafin</li>
                    <li>Radi</li>
                    <li>FreshmenClub</li>
                    <li>AnotherSideclub</li>
                    <li>FriendsClub</li>
                    <li>DirtyHouseClub</li>
                  </ul>
                  <p className="mt-4">Each has its own vibe, so definitely worth checking out if you want to explore the Shanghai nightlife scene without worrying about extra cover charges.</p>
                </div>
              </div>

              {/* Club: Culture */}
              <ClubCard 
                name="Culture"
                tags={["LGBTQ+", "Dancing", "K-pop"]}
                description="The LGBT club, but wait, wait till I finish, keep reading. It's my favourite club, best music, everyone's here to actually dance, not pretend to dance and being touchy 🍆🍑🍒 90% gays, 5% 'allies' here for the abs, 5% straight guys praying to God they don't get hard."
                musicInfo="If you love pop, hip-hop, and K-pop, this place can be for you. Before midnight, the playlist is more relaxed — some familiar Western pop, the kind you can warm up to. But after midnight? That's when it gets wild. Think BLACKPINK, BTS, Nicki, Cardi, you name it."
                crowdInfo="Most of the crowd is uni students and young professionals. You'll meet locals, international students, and expats — and everyone's there to have a good time."
                coverInfo={{
                  weekday: "¥100 for guys (includes 1 drink)",
                  weekend: "¥159 for girls (includes 2 drinks)",
                  fullPass: true
                }}
                finalThoughts="If your idea of a good night is dancing until your legs give out, this is the place. The music is solid, the energy is high, and there's zero pretense. Not the best spot for hookups or bottle service — but if you're going out for the music and to let loose, Culture is the move. Bring water, wear something you can move in, and prepare to lose track of time."
              />

              {/* Club: Hush */}
              <ClubCard 
                name="Hush"
                tags={["Hip-Hop", "Crowded"]}
                description="If you're into hip-hop, this place is basically your playground. It's exactly what you'd expect from a hip-hop club — loud music, packed dance floor, and lots of energy. They don't mess around with genres — it's straight beats all night. The moment you walk in, you're already moving because (1) the music hits hard, and (2) there's zero room to just stand around."
                crowdInfo="The crowd is mostly college students, all there to have a good time. If someone says they're 'just here to dance,' they're probably not being totally honest. Everyone's trying to meet people or at least have some fun."
                coverInfo={{
                  weekday: "¥88",
                  weekend: "¥158",
                  drinks: "Entry includes 8 basic cocktails",
                  fullPass: true
                }}
                finalThoughts="If you want lots of space and a chill vibe, this isn't the spot. The dance floor is small and packed tight, so expect to be close with strangers. But if you want a lively night, real hip-hop music, and don't mind the crowd, Hush is worth checking out. Just wear comfortable shoes and prepare for a late night."
              />
              
              {/* Club: Lafin */}
              <ClubCard 
                name="Lafin"
                tags={["Business", "Socializing"]}
                description="This club is more about business and socializing than dancing. It's mostly tables and seats, not much of a dance floor. There are quite a few college students too, but don't expect any professional LinkedIn-style networking."
                crowdInfo="If you want to dance, the dance floor is really small—barely enough space to move around. Heads up: it can get a bit handsy at times, so keep an eye on your personal space and look out for your friends."
                musicInfo="The music is mostly trap, R&B, and popular hip-hop and Western hits. The playlist is solid if you like that kind of music."
                coverInfo={{
                  weekday: "¥150 (includes two drinks)",
                  weekend: "¥188 (includes two drinks)",
                  fullPass: true
                }}
                finalThoughts="All in all, it's a good spot if you want a mix of business vibes and music, but don't expect a full-on dance party."
              />
              
              {/* Club: Radi */}
              <ClubCard 
                name="Radi"
                tags={["EDM", "Pop", "Dancing"]}
                description="This club is basically an EDM and pop party playground. Seriously, foreign hotties everywhere — you might wanna brush up on your 'hello' in a few languages because you're gonna hear it a lot. The dance floor? Sticky as hell — like, the kind of sticky that tells you people have been going hard all night."
                crowdInfo="The crowd is mostly students who are here to have a good time — probably 80% — plus some models, college kids flexing their parents' money, and a handful of exchange students who are 'researching Chinese culture' (aka just drinking and dancing)."
                musicInfo="What really sets this place apart is the music. They bring in top DJs every month, and the energy is unreal. The resident DJs spin popular Western tracks flipped into house remixes that keep the floor alive from night till 4 or 5 a.m. Nonstop dancing, no breaks — if you're looking to burn some serious energy, this is the spot."
                coverInfo={{
                  weekday: "¥120 (includes one drink)",
                  weekend: "¥180 (includes one drink)",
                  fullPass: true
                }}
                finalThoughts="If you're looking for a high-energy dance experience with great DJs and an international crowd, Radi is definitely worth checking out."
              />
              
              <div className="mt-6 flex justify-center">
                <Button className="bg-black hover:bg-black/80 text-white dark:bg-gradient-to-r dark:from-gradient-pink dark:to-gradient-purple dark:text-black dark:hover:brightness-110 rounded-xl border-2 border-black dark:dark-rounded-gradient-border font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-sm transition-all hover:translate-y-[-2px]">
                  See All INS Park Clubs
                </Button>
              </div>
            </motion.div>
          )}

          {/* Other Popular Clubs */}
          {activeTab === "other-clubs" && (
            <motion.div
              key="other-clubs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8 mt-8"
            >
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-2xl sm:text-3xl font-black mb-4">Other Popular Clubs</h3>
                <p className="text-lg mb-6">Explore Shanghai's vibrant nightlife beyond INS Park</p>
              </div>
              
              {/* Club: Orii */}
              <ClubCard 
                name="Orii"
                tags={["K-pop", "Dancing", "Pop"]}
                description="Orii opened in late 2022, and it's quickly become one of those places in Shanghai — where students, K-pop fans, and curious expats all end up on a Friday night. I've been a couple of times now, and here's how I'd sum it up: fun and loud."
                musicInfo="The music changes depending on the time. Before midnight, it's mostly Western pop — think Top 40 hits, familiar tunes, a little electronic. It's good for warming up, but the real party starts after midnight. That's when the K-pop kicks in. BLACKPINK, BTS, EXO, XG — you name it. The whole place turns into a live music video."
                crowdInfo="Most of the crowd is on the younger side — lots of university students and people who clearly know the BTS choreography better than I do. You'll hear a mix of Mandarin, English, and the occasional overly-loud 'ni hao' from someone trying a little too hard. But overall, it's friendly, open, and people are there to have fun."
                coverInfo={{
                  weekday: "¥100 (includes a drink)",
                  weekend: "¥150 (includes a drink)",
                  drinks: "Ladies: Free drinks before midnight"
                }}
                finalThoughts="Orii isn't the most refined nightclub, but that's not really the point. It's fun, it's packed, and it's one of the better places in town if you want to dance, hear K-pop played loud, and stay out way later than planned. Not a weekly hangout, but definitely a fun one to experience at least once — especially if you're into music, energy, and letting loose."
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
} 