"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, MapPin, Star, Wine, Plus } from "lucide-react"

interface ExperienceCardProps {
  username: string
  userAvatar: string
  location: string
  image: string
  description: string
  venue: string
  rating: number
  time: string
  likes: number
  comments: number
}

function ExperienceCard({
  username,
  userAvatar,
  location,
  image,
  description,
  venue,
  rating,
  time,
  likes,
  comments,
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
      <Card className="border-4 dark:dark-rounded-gradient-border overflow-hidden rounded-xl bg-white dark:bg-zinc-900">
        {/* User info header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={userAvatar} />
              <AvatarFallback>{username[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-bold">{username}</div>
              <div className="flex justify-between items-center w-full">
                <div className="text-xs text-muted-foreground flex items-center">
                  <MapPin className="h-3 w-3 mr-1" /> {location}
                </div>
                <div className="text-xs text-muted-foreground">
                  {time}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="aspect-video w-full relative overflow-hidden">
          <img 
            src={image} 
            alt={venue} 
            className="object-cover w-full h-full transform transition-transform duration-700 hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Wine className="h-4 w-4" />
            <h3 className="font-bold">{venue}</h3>
            <div className="flex ml-auto">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < rating
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          
          <p className="text-sm mb-4">{description}</p>

          <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="ghost"
              size="sm"
              className={`gap-1 ${liked ? "text-red-500" : ""}`}
              onClick={handleLike}
            >
              <Heart className={`h-5 w-5 ${liked ? "fill-red-500" : ""}`} />
              {likeCount}
            </Button>
            <Button variant="ghost" size="sm" className="gap-1">
              <MessageCircle className="h-5 w-5" />
              {comments}
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default function StudentExperiences() {
  const experiences = [
    {
      id: 1,
      username: "Emma_Lin",
      userAvatar: "https://i.pravatar.cc/150?img=1",
      location: "Jing'an, Shanghai",
      image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=2274&auto=format&fit=crop",
      description: "The DJ set was incredible! Met students from all over the world. The drinks were reasonably priced for such a high-end club.",
      venue: "TAXX Nightclub",
      rating: 5,
      time: "2 days ago",
      likes: 127,
      comments: 24,
    },
    {
      id: 2,
      username: "Marco_Li",
      userAvatar: "https://i.pravatar.cc/150?img=8",
      location: "The Bund, Shanghai",
      image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=2276&auto=format&fit=crop",
      description: "The view of the Pudong skyline at night is breathtaking. Perfect spot to start the evening before heading to clubs. Cocktails are pricey but worth it.",
      venue: "Bar Rouge",
      rating: 4,
      time: "1 week ago",
      likes: 89,
      comments: 13,
    },
    {
      id: 3,
      username: "Sophie_Zhang",
      userAvatar: "https://i.pravatar.cc/150?img=5",
      location: "Found 158, Shanghai",
      image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2069&auto=format&fit=crop",
      description: "This underground venue is a hidden treasure! So many bars and clubs in one place. We started at Shrine and ended at ARKHAM. Great prices for students!",
      venue: "Found 158",
      rating: 5,
      time: "3 days ago",
      likes: 156,
      comments: 31,
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-black">STUDENT EXPERIENCES</h2>
        <Button className="bg-black hover:bg-black/80 text-white dark:bg-gradient-to-r dark:from-gradient-pink dark:to-gradient-purple dark:text-black dark:hover:brightness-110 rounded-xl border-2 dark:dark-rounded-gradient-border font-bold">
          <Plus className="h-4 w-4 mr-2" /> Share Experience
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((exp) => (
          <ExperienceCard key={exp.id} {...exp} />
        ))}
      </div>
    </div>
  )
} 