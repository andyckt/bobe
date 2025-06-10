import type React from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SocialMediaCardProps {
  platform: string
  username: string
  icon: React.ReactNode
  color: string
}

export default function SocialMediaCard({ platform, username, icon, color }: SocialMediaCardProps) {
  return (
    <Card className="border-4 border-black dark:dark-rounded-gradient-border rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_#ec4899]">
      <div className={cn("p-4 text-white", color)}>
        <div className="flex justify-between items-center">
          {icon}
          <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full">Connected</span>
        </div>
        <h3 className="text-xl font-bold mt-2">{platform}</h3>
        <p className="text-sm opacity-90">{username}</p>
      </div>
      <div className="p-4 bg-white dark:bg-zinc-900">
        <div className="flex justify-between text-sm">
          <div>
            <p className="font-bold">1,234</p>
            <p className="text-gray-600 dark:text-gray-400">Followers</p>
          </div>
          <div>
            <p className="font-bold">56</p>
            <p className="text-gray-600 dark:text-gray-400">Posts</p>
          </div>
          <div>
            <p className="font-bold">7.8%</p>
            <p className="text-gray-600 dark:text-gray-400">Engagement</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
