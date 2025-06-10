import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-zinc-900 dark:to-black p-2 sm:p-4 md:p-8">
      {/* Glassmorphic container */}
      <div className="w-full max-w-7xl mx-auto backdrop-blur-xl bg-white/30 dark:bg-zinc-900/30 border-4 border-black dark:dark-rounded-gradient-border rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-lg overflow-hidden">
        {/* Header */}
        <header className="border-b-4 border-black dark:dark-gradient-border p-4 sm:p-6 bg-white/40 dark:bg-transparent backdrop-blur-md">
          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-xl border-2 border-black dark:dark-rounded-gradient-border"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-xl border-2 border-black dark:dark-rounded-gradient-border"
                >
                  <Home className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">POSTCRAFT STUDIO</h1>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <div className="p-4 sm:p-6">{children}</div>
      </div>
    </div>
  )
}
