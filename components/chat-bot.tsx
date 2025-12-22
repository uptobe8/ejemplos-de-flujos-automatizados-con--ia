"use client"

import type React from "react"

import { useState } from "react"
import { useChat } from "@ai-sdk/react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, X, Send, Loader2 } from "lucide-react"

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")

  const { messages, sendMessage, status } = useChat({
    api: "/api/chat",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || status === "loading") return

    sendMessage({
      role: "user",
      content: input.trim(),
    })
    setInput("")
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:shadow-xl transition-all hover:scale-110"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      ) : (
        <Card className="w-96 h-[600px] shadow-2xl border-0 bg-slate-900/95 backdrop-blur-sm flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 p-2">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Asistente IA</h3>
                <p className="text-xs text-gray-400">GPT-5.2 Thinking</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white hover:bg-slate-800"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <div className="rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 p-4 inline-flex mb-4">
                    <MessageSquare className="h-8 w-8 text-cyan-400" />
                  </div>
                  <p className="text-gray-400 text-sm">Hola, soy tu asistente especializado en:</p>
                  <div className="mt-4 space-y-2 text-left">
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <p className="text-cyan-400 text-xs font-semibold">Tareas Diarias</p>
                      <p className="text-gray-400 text-xs">Redacción y resúmenes</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <p className="text-purple-400 text-xs font-semibold">Formación</p>
                      <p className="text-gray-400 text-xs">Conceptos digitales</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <p className="text-pink-400 text-xs font-semibold">Automatización</p>
                      <p className="text-gray-400 text-xs">Mejoras en procesos</p>
                    </div>
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                        : "bg-slate-800 text-gray-200"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}

              {status === "loading" && (
                <div className="flex justify-start">
                  <div className="rounded-lg px-4 py-2 bg-slate-800">
                    <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-slate-700">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta..."
                className="flex-1 bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus-visible:ring-cyan-500"
                disabled={status === "loading"}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || status === "loading"}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  )
}
