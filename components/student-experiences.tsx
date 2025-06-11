"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Wine, Plus } from "lucide-react"

interface ExperienceCardProps {
  username: string
  userAvatar: string
  image: string
  title: string
  description: string
  venue: string
  likes: number
}

function ExperienceCard({
  username,
  userAvatar,
  image,
  title,
  description,
  venue,
  likes,
}: ExperienceCardProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  return (
    <div className="group flex flex-col rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-sm dark:shadow-none border-4 border-black dark:dark-rounded-gradient-border transform transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden">
        {/* Image with 3:4 aspect ratio */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img 
            src={image} 
            alt={venue} 
            className="w-full h-full object-cover"
          />
          {/* Venue name overlay */}
          <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
            <Wine className="h-3 w-3 text-white mr-1.5" />
            <span className="text-xs font-medium text-white">{venue}</span>
          </div>
        </div>
        
        {/* Content area */}
        <div className="p-3">
          {/* Title */}
          <h3 className="font-medium text-sm line-clamp-2 mb-2">
            {title}
          </h3>
          
          {/* User and likes info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-5 w-5 mr-1.5">
                <AvatarImage src={userAvatar} />
                <AvatarFallback className="text-[10px]">{username[0]}</AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{username}</span>
            </div>
            
            <button 
              className="flex items-center text-xs"
              onClick={handleLike}
            >
              <Heart className={`w-3.5 h-3.5 mr-1 ${liked ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
              <span className={`${liked ? "text-red-500" : "text-gray-500"}`}>
                {likeCount}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function StudentExperiences() {
  const experiences = [
    {
      id: 1,
      username: "Emma_Lin",
      userAvatar: "https://i.pravatar.cc/150?img=1",
      image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=2274&auto=format&fit=crop",
      title: "Electric Night at TAXX",
      description: "The DJ set was incredible! Met students from all over the world. The drinks were reasonably priced for such a high-end club.",
      venue: "TAXX Nightclub",
      likes: 127,
    },
    {
      id: 2,
      username: "Marco_Li",
      userAvatar: "https://i.pravatar.cc/150?img=8",
      image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=2276&auto=format&fit=crop",
      title: "Rooftop Vibes at Bar Rouge",
      description: "The view of the Pudong skyline at night is breathtaking. Perfect spot to start the evening before heading to clubs. Cocktails are pricey but worth it.",
      venue: "Bar Rouge",
      likes: 89,
    },
    {
      id: 3,
      username: "Sophie_Zhang",
      userAvatar: "https://i.pravatar.cc/150?img=5",
      image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2069&auto=format&fit=crop",
      title: "Underground Gems at Found 158",
      description: "This underground venue is a hidden treasure! So many bars and clubs in one place. We started at Shrine and ended at ARKHAM. Great prices for students!",
      venue: "Found 158",
      likes: 156,
    }
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((exp) => (
          <ExperienceCard key={exp.id} {...exp} />
        ))}
      </div>
    </div>
  )
} 