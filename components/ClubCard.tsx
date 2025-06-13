import React from 'react'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Music, Users, Wine, Clock, MapPin } from "lucide-react"

interface ClubCardProps {
  name: string
  description: string
  tags: string[]
  coverInfo: {
    weekday?: string
    weekend?: string
    fullPass?: boolean
    drinks?: string
  }
  crowdInfo?: string
  musicInfo?: string
  finalThoughts?: string
  imageUrl?: string
}

export default function ClubCard({
  name,
  description,
  tags,
  coverInfo,
  crowdInfo,
  musicInfo,
  finalThoughts,
  imageUrl
}: ClubCardProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl sm:text-3xl font-black">{name}</h3>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          {tags.map((tag, index) => {
            // Determine color based on tag content
            const colors = {
              'LGBTQ+': 'bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300',
              'Dancing': 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
              'Hip-Hop': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
              'Crowded': 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
              'EDM': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
              'Pop': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
              'Business': 'bg-gray-100 dark:bg-gray-700/50 text-gray-800 dark:text-gray-300',
              'K-pop': 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300',
              default: 'bg-gray-100 dark:bg-gray-700/50 text-gray-800 dark:text-gray-300',
            }
            
            const colorClass = colors[tag as keyof typeof colors] || colors.default
            
            return (
              <span 
                key={index} 
                className={`inline-block px-3 py-1 ${colorClass} rounded-full text-sm font-medium`}
              >
                {tag}
              </span>
            )
          })}
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <p className="text-lg">{description}</p>
          
          <div className="mt-6 space-y-4">
            {musicInfo && (
              <div className="flex items-start">
                <Music className="h-5 w-5 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold">The Music</h4>
                  <p>{musicInfo}</p>
                </div>
              </div>
            )}
            
            {crowdInfo && (
              <div className="flex items-start">
                <Users className="h-5 w-5 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold">The Crowd</h4>
                  <p>{crowdInfo}</p>
                </div>
              </div>
            )}
            
            {coverInfo && (
              <div className="flex items-start">
                <Wine className="h-5 w-5 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold">Cover & Drinks</h4>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    {coverInfo.weekday && <li>Weekdays: {coverInfo.weekday}</li>}
                    {coverInfo.weekend && <li>Weekends: {coverInfo.weekend}</li>}
                    {coverInfo.drinks && <li>{coverInfo.drinks}</li>}
                    {coverInfo.fullPass && <li>Full Pass: free entry</li>}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <div className="aspect-video bg-black/20 dark:bg-white/10 rounded-2xl overflow-hidden mb-4">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt={`${name} club`} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="h-full flex items-center justify-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Club Image Coming Soon</span>
              </div>
            )}
          </div>
          
          {finalThoughts && (
            <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-xl">
              <h4 className="font-bold text-lg mb-2">Final Thoughts</h4>
              <p>{finalThoughts}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
} 