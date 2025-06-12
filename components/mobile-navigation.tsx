"use client"

import { Button } from "@/components/ui/button"
import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

interface MobileNavigationProps {
  activeTab: string;
  onTabChange: Dispatch<SetStateAction<string>>;
}

export default function MobileNavigation({ activeTab, onTabChange }: MobileNavigationProps) {
  return (
    <div className="h-full bg-white/40 dark:bg-zinc-900/80 backdrop-blur-md flex flex-col">
      <div className="p-6 border-b-4 border-black dark:dark-gradient-border">
        <h2 className="text-2xl font-black">Bobe.co</h2>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <nav className="space-y-2 mb-8">
          <button
            onClick={() => onTabChange("dashboard")}
            className={`flex items-center gap-2 text-lg font-bold p-3 w-full text-left rounded-xl ${activeTab === "dashboard" ? "bg-black text-white dark:bg-gradient-to-r dark:from-gradient-pink dark:to-gradient-purple" : "hover:bg-black/10 dark:hover:bg-white/10"}`}
          >
            Discovery
          </button>
          <button
            onClick={() => onTabChange("club")}
            className={`flex items-center gap-2 text-lg font-bold p-3 w-full text-left rounded-xl ${activeTab === "club" ? "bg-black text-white dark:bg-gradient-to-r dark:from-gradient-pink dark:to-gradient-purple" : "hover:bg-black/10 dark:hover:bg-white/10"}`}
          >
            Club
          </button>
          <button
            onClick={() => onTabChange("bar")}
            className={`flex items-center gap-2 text-lg font-bold p-3 w-full text-left rounded-xl ${activeTab === "bar" ? "bg-black text-white dark:bg-gradient-to-r dark:from-gradient-pink dark:to-gradient-purple" : "hover:bg-black/10 dark:hover:bg-white/10"}`}
          >
            Bar
          </button>
          <button
            onClick={() => onTabChange("who-are-we")}
            className={`flex items-center gap-2 text-lg font-bold p-3 w-full text-left rounded-xl ${activeTab === "who-are-we" ? "bg-black text-white dark:bg-gradient-to-r dark:from-gradient-pink dark:to-gradient-purple" : "hover:bg-black/10 dark:hover:bg-white/10"}`}
          >
            Who are we?
          </button>
        </nav>

        <div>
          <h2 className="text-xl font-black mb-4">PLATFORMS</h2>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start gap-2 rounded-xl border-2 border-black dark:dark-rounded-gradient-border font-bold"
            >
              <Instagram className="h-5 w-5" /> Instagram
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 rounded-xl border-2 border-black dark:dark-rounded-gradient-border font-bold"
            >
              <Twitter className="h-5 w-5" /> Twitter
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 rounded-xl border-2 border-black dark:dark-rounded-gradient-border font-bold"
            >
              <Linkedin className="h-5 w-5" /> LinkedIn
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 rounded-xl border-2 border-black dark:dark-rounded-gradient-border font-bold"
            >
              <Youtube className="h-5 w-5" /> YouTube
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 border-t-4 border-black dark:dark-gradient-border">
        <div className="grid grid-cols-2 gap-2">
          <Button className="bg-black hover:bg-black/80 text-white dark:bg-gradient-to-r dark:from-gradient-pink dark:to-gradient-purple dark:hover:brightness-110 rounded-xl border-2 border-black dark:dark-rounded-gradient-border font-bold">
            Connect
          </Button>
          <Button
            variant="outline"
            className="rounded-xl border-2 border-black dark:dark-rounded-gradient-border font-bold"
          >
            Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
