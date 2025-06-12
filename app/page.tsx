"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Instagram, Linkedin, Menu, Plus, Twitter, Youtube } from "lucide-react"
import SocialMediaCard from "@/components/social-media-card"
import StudentExperiences from "@/components/student-experiences"
import StudioSelector from "@/components/studio-selector"
import MobileNavigation from "@/components/mobile-navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import DynamicFrameLayout from "@/components/DynamicFrameLayout"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-zinc-900 dark:to-black p-2 sm:p-4 md:p-8">
      {/* Glassmorphic container */}
      <div className="w-full max-w-7xl mx-auto backdrop-blur-xl bg-white/30 dark:bg-zinc-900/30 border-4 border-black dark:dark-rounded-gradient-border rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-lg overflow-hidden">
        {/* Header */}
        <header className="border-b-4 border-black dark:dark-gradient-border p-4 sm:p-6 bg-white/40 dark:bg-transparent backdrop-blur-md">
          <div className="flex justify-between items-center gap-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">Bobe.co</h1>

            {/* Mobile menu */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-xl border-2 border-black dark:dark-rounded-gradient-border"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="border-r-4 border-black dark:border-white p-0">
                  <MobileNavigation onTabChange={setActiveTab} activeTab={activeTab} />
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <ThemeToggle />
              <Button className="bg-black hover:bg-black/80 text-white dark:bg-gradient-to-r dark:from-gradient-pink dark:to-gradient-purple dark:text-black dark:hover:brightness-110 rounded-xl border-2 border-black dark:dark-rounded-gradient-border font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-sm">
                Connect Account
              </Button>
              <Button
                variant="outline"
                className="rounded-xl border-2 border-black dark:dark-rounded-gradient-border font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-sm"
              >
                Settings
              </Button>
            </div>
          </div>
        </header>

        <div className="grid md:grid-cols-[280px_1fr] h-[calc(100vh-6rem)]">
          {/* Sidebar - Desktop only */}
          <div className="hidden md:block border-r-4 border-black dark:dark-gradient-border bg-white/40 dark:bg-transparent p-4">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex items-center gap-2 text-lg font-bold p-3 w-full text-left rounded-xl ${activeTab === "dashboard" ? "bg-black text-white dark:bg-white dark:text-black" : "hover:bg-black/10 dark:hover:bg-white/10"}`}
              >
                Discovery
              </button>
              <button
                onClick={() => setActiveTab("club")}
                className={`flex items-center gap-2 text-lg font-bold p-3 w-full text-left rounded-xl ${activeTab === "club" ? "bg-black text-white dark:bg-white dark:text-black" : "hover:bg-black/10 dark:hover:bg-white/10"}`}
              >
                Club
              </button>
              <button
                onClick={() => setActiveTab("bar")}
                className={`flex items-center gap-2 text-lg font-bold p-3 w-full text-left rounded-xl ${activeTab === "bar" ? "bg-black text-white dark:bg-white dark:text-black" : "hover:bg-black/10 dark:hover:bg-white/10"}`}
              >
                Bar
              </button>
              <button
                onClick={() => setActiveTab("who-are-we")}
                className={`flex items-center gap-2 text-lg font-bold p-3 w-full text-left rounded-xl ${activeTab === "who-are-we" ? "bg-black text-white dark:bg-white dark:text-black" : "hover:bg-black/10 dark:hover:bg-white/10"}`}
              >
                Who are we?
              </button>
            </nav>

            <div className="mt-8">
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

          {/* Main content */}
          <div className="overflow-auto p-4 sm:p-6">
            {activeTab === "dashboard" && (
              <>
                <div className="mb-16">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 text-center">SHANGHAI CLUBS</h2>
                  <div className="aspect-[16/9] w-full h-[calc(100vh-12rem)]">
                    <DynamicFrameLayout />
                  </div>
                </div>
                
                <div>
                  <StudentExperiences />
                </div>
              </>
            )}

            {activeTab === "club" && (
              <div className="flex flex-col items-center justify-center min-h-[500px] text-center">
                <div className="bg-white/70 dark:bg-zinc-800/70 p-10 border-4 border-black dark:dark-rounded-gradient-border rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-lg">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">Club Content</h2>
                  <p className="text-xl mb-6">Discover Shanghai's best nightclubs!</p>
                  <Button className="bg-black hover:bg-black/80 text-white dark:bg-gradient-to-r dark:from-gradient-pink dark:to-gradient-purple dark:text-black dark:hover:brightness-110 rounded-xl border-2 border-black dark:dark-rounded-gradient-border font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-sm">
                    {/* Removed href for now */}
                    View nightclubs Page
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "bar" && (
              <div className="flex flex-col items-center justify-center min-h-[500px] text-center">
                <div className="bg-white/70 dark:bg-zinc-800/70 p-10 border-4 border-black dark:dark-rounded-gradient-border rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-lg">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">Bar Content</h2>
                  <p className="text-xl mb-6">Discover Shanghai's best bars!</p>
                  <Button className="bg-black hover:bg-black/80 text-white dark:bg-gradient-to-r dark:from-gradient-pink dark:to-gradient-purple dark:text-black dark:hover:brightness-110 rounded-xl border-2 border-black dark:dark-rounded-gradient-border font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-sm">
                    <Link href="/bar" className="text-lg px-6 py-2">View Bar Page</Link>
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "who-are-we" && (
              <div className="flex flex-col items-center justify-center min-h-[500px] text-center">
                <div className="bg-white/70 dark:bg-zinc-800/70 p-10 border-4 border-black dark:dark-rounded-gradient-border rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-lg">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">Who Are We?</h2>
                  <p className="text-xl mb-6">Learn about our mission and team!</p>
                  <Button className="bg-black hover:bg-black/80 text-white dark:bg-gradient-to-r dark:from-gradient-pink dark:to-gradient-purple dark:text-black dark:hover:brightness-110 rounded-xl border-2 border-black dark:dark-rounded-gradient-border font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-sm">
                    <Link href="/who-are-we" className="text-lg px-6 py-2">View Team Page</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
