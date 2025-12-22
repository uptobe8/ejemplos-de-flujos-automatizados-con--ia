"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface AnimatedAvatarProps {
  isChatActive: boolean
  onAvatarClick: () => void
}

export function AnimatedAvatar({ isChatActive, onAvatarClick }: AnimatedAvatarProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  if (isChatActive) return null

  return (
    <Button
      onClick={onAvatarClick}
      className={`fixed bottom-6 right-6 w-16 h-16 rounded-full bg-white hover:scale-110 shadow-2xl transition-all duration-300 border-2 border-[#00D9FF] z-50 p-0 overflow-hidden ${
        isVisible ? "animate-in fade-in zoom-in duration-500" : "opacity-0"
      }`}
      aria-label="Abrir chat con asistente IA"
    >
      <Image src="/images/img-4271.png" alt="Asistente IA" fill className="object-cover" />
    </Button>
  )
}
