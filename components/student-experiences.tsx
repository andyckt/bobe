"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Wine } from "lucide-react"

interface ExperienceCardProps {
  username: string
  userAvatar: string
  image: string
  title: string
  description: string
  venue: string
  likes: number
  aspectRatio: "3:4" | "16:9"
}

function ExperienceCard({
  username,
  userAvatar,
  image,
  title,
  description,
  venue,
  likes,
  aspectRatio,
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
    <div className="transform transition-all duration-300 hover:-translate-y-1">
      <Card className="border-4 overflow-hidden rounded-xl bg-white dark:bg-zinc-900 dark:dark-rounded-gradient-border">
        {/* Image with dynamic aspect ratio */}
        <div className={`relative ${aspectRatio === "16:9" ? "aspect-video" : "aspect-[3/4] max-h-[360px]"} w-full overflow-hidden`}>
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
          <div className="flex items-center justify-between mt-auto">
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
      </Card>
    </div>
  )
}

// All experiences data combined - alternating aspect ratios
const allExperiences = [
  // First 3:4 experience
  {
    id: 1,
    username: "Emma_Lin",
    userAvatar: "https://i.pravatar.cc/150?img=1",
    image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=2274&auto=format&fit=crop",
    title: "Electric Night at TAXX",
    description: "The DJ set was incredible! Met students from all over the world. The drinks were reasonably priced for such a high-end club.",
    venue: "TAXX Nightclub",
    likes: 127,
    aspectRatio: "3:4" as const,
  },
  // First 16:9 experience
  {
    id: 4,
    username: "Alex_Wang",
    userAvatar: "https://i.pravatar.cc/150?img=11",
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=2070&auto=format&fit=crop",
    title: "Jazz Night at JZ Club",
    description: "Incredible live jazz performances every night. The cocktails are expertly crafted and the atmosphere is intimate and sophisticated.",
    venue: "JZ Club",
    likes: 142,
    aspectRatio: "16:9" as const,
  },
  // Second 3:4 experience
  {
    id: 2,
    username: "Marco_Li",
    userAvatar: "https://i.pravatar.cc/150?img=8",
    image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=2276&auto=format&fit=crop",
    title: "Rooftop Vibes at Bar Rouge",
    description: "The view of the Pudong skyline at night is breathtaking. Perfect spot to start the evening before heading to clubs. Cocktails are pricey but worth it.",
    venue: "Bar Rouge",
    likes: 89,
    aspectRatio: "3:4" as const,
  },
  // Second 16:9 experience
  {
    id: 5,
    username: "Olivia_Chen",
    userAvatar: "https://i.pravatar.cc/150?img=16",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop",
    title: "Rooftop Party at Vue Bar",
    description: "The 360-degree view of Shanghai from this rooftop bar is unmatched. Perfect for sunset drinks before hitting the clubs.",
    venue: "Vue Bar",
    likes: 98,
    aspectRatio: "16:9" as const,
  },
  // Third 3:4 experience
  {
    id: 3,
    username: "Sophie_Zhang",
    userAvatar: "https://i.pravatar.cc/150?img=5",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2069&auto=format&fit=crop",
    title: "Underground Gems at Found 158",
    description: "This underground venue is a hidden treasure! So many bars and clubs in one place. We started at Shrine and ended at ARKHAM. Great prices for students!",
    venue: "Found 158",
    likes: 156,
    aspectRatio: "3:4" as const,
  },
  // Third 16:9 experience
  {
    id: 6,
    username: "Jackson_Liu",
    userAvatar: "https://i.pravatar.cc/150?img=20",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2074&auto=format&fit=crop",
    title: "Underground Vibes at Arkham",
    description: "One of Shanghai's best clubs for electronic music. International DJs, great sound system, and an energetic crowd.",
    venue: "Arkham",
    likes: 176,
    aspectRatio: "16:9" as const,
  }
];

interface StudentExperiencesProps {
  aspectRatio?: "3:4" | "16:9" | "all";
  limit?: number;
}

export default function StudentExperiences({ aspectRatio = "all", limit }: StudentExperiencesProps) {
  // Filter experiences based on aspect ratio
  let experiences = allExperiences;
  
  if (aspectRatio === "3:4") {
    experiences = allExperiences.filter(exp => exp.aspectRatio === "3:4");
  } else if (aspectRatio === "16:9") {
    experiences = allExperiences.filter(exp => exp.aspectRatio === "16:9");
  }
  
  // Apply limit if provided
  if (limit && limit > 0) {
    experiences = experiences.slice(0, limit);
  }

  // Create separate columns for masonry layout
  const columnsCount = {
    mobile: 1,
    tablet: 2,
    desktop: 3
  };

  const createColumns = (count: number) => {
    const columns: Array<typeof experiences> = Array.from({ length: count }, () => []);
    
    experiences.forEach((experience, index) => {
      columns[index % count].push(experience);
    });
    
    return columns;
  };

  const mobileColumns = createColumns(columnsCount.mobile);
  const tabletColumns = createColumns(columnsCount.tablet);
  const desktopColumns = createColumns(columnsCount.desktop);

  return (
    <div className="space-y-6">
      {/* Mobile layout (1 column) */}
      <div className="grid grid-cols-1 gap-6 md:hidden">
        {mobileColumns[0].map((exp) => (
          <ExperienceCard key={exp.id} {...exp} />
        ))}
      </div>
      
      {/* Tablet layout (2 columns) */}
      <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-6">
        {tabletColumns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-6">
            {column.map((exp) => (
              <ExperienceCard key={exp.id} {...exp} />
            ))}
          </div>
        ))}
      </div>
      
      {/* Desktop layout (3 columns) */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-6">
        {desktopColumns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-6">
            {column.map((exp) => (
              <ExperienceCard key={exp.id} {...exp} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}