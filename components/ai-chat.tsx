"use client"
import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Send, Loader2 } from "lucide-react"
import Image from "next/image"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"

interface AiChatProps {
  isOpen: boolean
  onClose: () => void
}

export function AiChat({ isOpen, onClose }: AiChatProps) {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-[380px] h-[600px] glass border-0 flex flex-col overflow-hidden rounded-3xl shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-gray-300 flex items-center gap-3 bg-white/80">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white shadow-md">
            <Image src="/images/img-4271.png" alt="Asistente" fill className="object-cover" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-sm">Asistente IA</h3>
            <p className="text-xs text-gray-600">GPT-5.2 Thinking</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white/90 to-white/70">
          {messages.length === 0 && (
            <div className="flex justify-start">
              <div className="max-w-[85%] p-3 rounded-2xl rounded-bl-md bg-white shadow-md text-gray-800 text-sm leading-relaxed border border-gray-200">
                ¡Hola! Soy tu asistente especializado en ayudarte con tareas diarias, formación y automatización. ¿En
                qué puedo ayudarte hoy?
                {"\n\n"}
                Puedo ayudarte a:{"\n"}• Redactar emails profesionales y resúmenes{"\n"}• Explicar conceptos de
                digitalización{"\n"}• Proponer mejoras en tus procesos de trabajo
              </div>
            </div>
          )}
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-[#FF6B35] to-[#FF006E] text-white rounded-br-md shadow-lg"
                    : "bg-white shadow-md text-gray-800 rounded-bl-md border border-gray-200"
                }`}
              >
                {message.parts.map((part, index) => {
                  if (part.type === "text") {
                    return <span key={index}>{part.text}</span>
                  }
                  return null
                })}
              </div>
            </div>
          ))}
          {status === "in_progress" && (
            <div className="flex justify-start">
              <div className="bg-white shadow-md p-3 rounded-2xl rounded-bl-md border border-gray-200">
                <Loader2 className="h-5 w-5 animate-spin text-[#00D9FF]" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const input = formData.get("message") as string
            if (input.trim()) {
              sendMessage({ text: input })
              e.currentTarget.reset()
            }
          }}
          className="p-4 border-t border-gray-300 bg-white/90"
        >
          <div className="flex gap-2">
            <textarea
              ref={inputRef}
              name="message"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  e.currentTarget.form?.requestSubmit()
                }
              }}
              placeholder="Escribe tu mensaje..."
              className="flex-1 bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00D9FF] focus:border-transparent resize-none min-h-[48px] max-h-[120px]"
              rows={1}
            />
            <Button
              type="submit"
              disabled={status === "in_progress"}
              className="bg-gradient-to-r from-[#FF6B35] to-[#FF006E] hover:opacity-90 rounded-xl px-4 border-0 text-white disabled:opacity-50 shadow-lg"
            >
              {status === "in_progress" ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
