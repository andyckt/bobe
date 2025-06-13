"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ClubCard from "@/components/ClubCard"
import { motion } from "framer-motion"
import Image from "next/image"

export default function ClubTabContent() {
  const clubContent = {
    hero: {
      title: "INS Park: Shanghai's Wildest Club Playground"
    }
  }

  // Club images for the marquee with Unsplash images
  const clubImages = [
    {
      src: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800&auto=format&fit=crop",
      alt: "Nightclub with colorful lights"
    },
    {
      src: "https://images.unsplash.com/photo-1571266028243-a52c5f753e7c?q=80&w=800&auto=format&fit=crop",
      alt: "DJ booth with crowd"
    },
    {
      src: "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?q=80&w=800&auto=format&fit=crop",
      alt: "Dance floor with people dancing"
    },
    {
      src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
      alt: "Nightclub with laser lights"
    },
    {
      src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
      alt: "People dancing at a nightclub"
    },
    {
      src: "https://images.unsplash.com/photo-1438557068880-c5f474830377?q=80&w=800&auto=format&fit=crop",
      alt: "Colorful nightclub lighting"
    }
  ];

  return (
    <div>
      <motion.h1
        className="text-5xl md:text-7xl font-black mb-8 mt-4 leading-tight text-center"
        style={{
          background: "linear-gradient(45deg, #ff006e, #8338ec, #3a86ff, #06ffa5)",
          backgroundSize: "400% 400%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        {clubContent.hero.title}
      </motion.h1>

      {/* Image Marquee - Improved version for seamless infinite loop */}
      <div className="relative w-full overflow-hidden mb-10 py-4">
        <div className="marquee-track flex gap-4">
          {/* First set of images */}
          {clubImages.map((image, index) => (
            <div key={`image-${index}`} className="marquee-item relative min-w-[250px] h-[180px] rounded-[24px] overflow-hidden border-4 border-black dark:dark-rounded-gradient-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-md">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
          
          {/* Duplicate set for seamless loop */}
          {clubImages.map((image, index) => (
            <div key={`image-dup-${index}`} className="marquee-item relative min-w-[250px] h-[180px] rounded-[24px] overflow-hidden border-4 border-black dark:dark-rounded-gradient-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-md">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          animation: marquee 30s linear infinite;
          width: calc(250px * ${clubImages.length * 2} + 1rem * ${(clubImages.length * 2) - 1});
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-250px * ${clubImages.length} - 1rem * ${clubImages.length - 1}));
          }
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
} 