"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Wine, Hash } from "lucide-react"
import { useExperiences } from "@/hooks/useExperiences"

interface ExperienceCardProps {
  _id: string
  username: string
  userAvatar: string
  image: string
  title: string
  description: string
  venue: string
  likes: number
  aspectRatio: "3:4" | "16:9"
  hashtags?: string[]
}

function ExperienceCard({
  _id,
  username,
  userAvatar,
  image,
  title,
  description,
  venue,
  likes,
  aspectRatio,
  hashtags
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
      <Card className="border-4 border-black overflow-hidden rounded-xl bg-white dark:bg-zinc-900 dark:dark-rounded-gradient-border">
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
          
          {/* GetDrunk badge */}
          <div className="absolute top-2 right-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full px-3 py-1 flex items-center">
            <Hash className="h-3 w-3 text-white mr-1.5" />
            <span className="text-xs font-bold text-white">getdrunk</span>
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

interface StudentExperiencesProps {
  aspectRatio?: "3:4" | "16:9" | "all";
  limit?: number;
}

export default function StudentExperiences({ aspectRatio = "all", limit }: StudentExperiencesProps) {
  const { experiences, loading, error } = useExperiences(aspectRatio, limit);
  
  // Show loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-black mb-4">GETDRUNK EXPERIENCES</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-64 w-full"></div>
              <div className="mt-2 bg-gray-200 dark:bg-gray-700 h-4 w-3/4 rounded"></div>
              <div className="mt-2 flex justify-between">
                <div className="bg-gray-200 dark:bg-gray-700 h-4 w-1/4 rounded"></div>
                <div className="bg-gray-200 dark:bg-gray-700 h-4 w-1/4 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div>
        <h2 className="text-xl sm:text-2xl font-black mb-4">GETDRUNK EXPERIENCES</h2>
        <div className="p-4 border-2 border-red-500 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300">
          <p>Error loading experiences: {error}</p>
          <Button variant="outline" className="mt-2" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }
  
  // If no experiences found, show empty state
  if (experiences.length === 0) {
    return (
      <div>
        <h2 className="text-xl sm:text-2xl font-black mb-4">GETDRUNK EXPERIENCES</h2>
        <div className="text-center p-8 border-4 border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
          <p className="text-lg mb-4">No getdrunk experiences found</p>
          <Button>Share Your Nightlife Experience</Button>
        </div>
      </div>
    );
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
      <h2 className="text-xl sm:text-2xl font-black mb-4">GETDRUNK EXPERIENCES</h2>
      
      {/* Mobile layout (1 column) */}
      <div className="grid grid-cols-1 gap-6 md:hidden">
        {mobileColumns[0].map((exp) => (
          <ExperienceCard key={exp._id} {...exp} />
        ))}
      </div>
      
      {/* Tablet layout (2 columns) */}
      <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-6">
        {tabletColumns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-6">
            {column.map((exp) => (
              <ExperienceCard key={exp._id} {...exp} />
            ))}
          </div>
        ))}
      </div>
      
      {/* Desktop layout (3 columns) */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-6">
        {desktopColumns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-6">
            {column.map((exp) => (
              <ExperienceCard key={exp._id} {...exp} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}