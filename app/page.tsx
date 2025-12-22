"use client"

import { useState } from "react"
import { FlowsGuide } from "@/components/flows-guide"
import { AnimatedAvatar } from "@/components/animated-avatar"
import { AiChat } from "@/components/ai-chat"

export default function Home() {
  const [isChatActive, setIsChatActive] = useState(false)

  return (
    <>
      <FlowsGuide />
      <AnimatedAvatar isChatActive={isChatActive} onAvatarClick={() => setIsChatActive(true)} />
      <AiChat isOpen={isChatActive} onClose={() => setIsChatActive(false)} />
    </>
  )
}
