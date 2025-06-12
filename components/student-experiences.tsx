"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Wine, Loader2 } from "lucide-react"
import { useExperiences } from "@/hooks/useExperiences"

interface ExperienceCardProps {
  _id: string
  username: string
  userAvatar: string
  image: string
  title: string
  merchant: string
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
  merchant,
  likes,
  aspectRatio,
  hashtags
}: ExperienceCardProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)
  const [imageLoaded, setImageLoaded] = useState(false)

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
      <Card className="border-2 sm:border-4 border-black overflow-hidden rounded-[24px] bg-white dark:bg-zinc-900 dark:dark-rounded-gradient-border">
        {/* Image with dynamic aspect ratio */}
        <div className={`relative ${aspectRatio === "16:9" ? "aspect-video" : "aspect-[3/4] max-h-[360px]"} w-full overflow-hidden`}>
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
          )}
          <img 
            src={image} 
            alt={merchant} 
            className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          {/* Merchant name overlay */}
          <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 bg-black/60 backdrop-blur-sm rounded-full px-2 py-0.5 sm:px-3 sm:py-1 flex items-center">
            <Wine className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white mr-1 sm:mr-1.5" />
            <span className="text-[10px] sm:text-xs font-medium text-white truncate max-w-[80px] sm:max-w-full">{merchant}</span>
          </div>
        </div>
        
        {/* Content area */}
        <div className="p-2 sm:p-3">
          {/* Title */}
          <h3 className="font-medium text-xs sm:text-sm line-clamp-1 sm:line-clamp-2 mb-1 sm:mb-2">
            {title}
          </h3>
          
          {/* User and likes info */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center">
              <Avatar className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-1.5">
                <AvatarImage src={userAvatar} />
                <AvatarFallback className="text-[8px] sm:text-[10px]">{username[0]}</AvatarFallback>
              </Avatar>
              <span className="text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300">{username}</span>
            </div>
            
            <button 
              className="flex items-center text-[10px] sm:text-xs"
              onClick={handleLike}
            >
              <Heart className={`w-3 h-3 sm:w-3.5 sm:h-3.5 mr-0.5 sm:mr-1 ${liked ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
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

export default function StudentExperiences({ aspectRatio = "all" }: StudentExperiencesProps) {
  const { experiences, loading, error, hasMore, loadMore, initialLoadDone } = useExperiences(aspectRatio, 12);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  
  // Set up intersection observer for infinite scrolling
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    if (target.isIntersecting && hasMore && !loading && initialLoadDone) {
      loadMore();
    }
  }, [loadMore, hasMore, loading, initialLoadDone]);
  
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    };
    
    const observer = new IntersectionObserver(handleObserver, options);
    
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [handleObserver]);
  
  // Show initial loading state
  if (loading && experiences.length === 0) {
    return (
      <div className="space-y-6">
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
  if (initialLoadDone && experiences.length === 0) {
    return (
      <div>
        <div className="text-center p-8 border-4 border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
          <p className="text-lg mb-4">No nightlife experiences found</p>
          <Button>Share Your Nightlife Experience</Button>
        </div>
      </div>
    );
  }
  
  // Create separate columns for masonry layout
  const columnsCount = {
    mobile: 2,
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
      
      {/* Mobile layout (2 columns staggered) */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:hidden">
        {mobileColumns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-3 sm:gap-4">
            {column.map((exp) => (
              <ExperienceCard key={exp._id} {...exp} />
            ))}
          </div>
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
      
      {/* Loading indicator and intersection observer target */}
      {hasMore && (
        <div 
          ref={loaderRef} 
          className="flex justify-center items-center py-6"
        >
          {loading && (
            <div className="w-6 h-6 relative">
              {/* Light mode spinner (black with transparent top) */}
              <div className="absolute inset-0 rounded-full animate-spin border-2 border-black border-t-transparent dark:hidden"></div>
              
              {/* Dark mode spinner (gradient) */}
              <div className="hidden dark:block absolute inset-0">
                <div className="w-full h-full rounded-full animate-spin" 
                  style={{ 
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: 'transparent',
                    borderTopColor: 'transparent',
                    borderRightColor: '#ec4899',
                    borderBottomColor: '#9333ea',
                    borderLeftColor: '#9333ea'
                  }}>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}