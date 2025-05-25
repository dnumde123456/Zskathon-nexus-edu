"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Send, Bot, User, Sparkles } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  isTyping?: boolean
}

// Simple markdown renderer component
const MarkdownRenderer = ({ content }: { content: string }) => {
  const renderMarkdown = (text: string) => {
    // Convert markdown to HTML
    const html = text
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mb-2 text-gray-800">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mb-3 text-gray-800">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4 text-gray-800">$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      // Code blocks
      .replace(
        /```([\s\S]*?)```/g,
        '<pre class="bg-gray-100 p-3 rounded-lg my-2 overflow-x-auto"><code class="text-sm">$1</code></pre>',
      )
      // Inline code
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
      // Links
      .replace(
        /\[([^\]]+)\]$$([^)]+)$$/g,
        '<a href="$2" class="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">$1</a>',
      )
      // Lists
      .replace(/^• (.*$)/gim, '<li class="ml-4 mb-1">• $1</li>')
      .replace(/^- (.*$)/gim, '<li class="ml-4 mb-1">• $1</li>')
      // Line breaks
      .replace(/\n\n/g, "<br><br>")
      .replace(/\n/g, "<br>")

    return { __html: html }
  }

  return <div className="prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={renderMarkdown(content)} />
}

// Typing effect component
const TypingEffect = ({ text, onComplete }: { text: string; onComplete: () => void }) => {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 3)

      return () => clearTimeout(timer)
    } else {
      onComplete()
    }
  }, [currentIndex, text, onComplete])

  return <MarkdownRenderer content={displayedText} />
}

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Cześć! 👋 Jestem zaawansowanym asystentem AI dla platformy **Nexus**. Mogę pomóc Ci z:

📚 **Materiałami edukacyjnymi** i metodami nauczania
🎯 **Celami zrównoważonego rozwoju** w edukacji  
📝 **Przygotowaniem do egzaminów** (matura, egzaminy zawodowe)
💼 **Planowaniem kariery** i poszukiwaniem pracy
🎓 **Wyborem studiów** i dalszej edukacji
🔧 **Narzędziami technologicznymi** w edukacji
🤝 **Rozwojem umiejętności miękkich**
📊 **Analizą rynku pracy** i trendów zawodowych
🌱 **Zrównoważonym rozwojem** i ekologią

**Zadaj mi dowolne pytanie związane z edukacją, karierą lub rozwojem osobistym!** 🚀`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom - TYLKO w kontenerze chatboxa
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      // Używamy scrollTop zamiast scrollIntoView aby nie wpływać na całą stronę
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    // Małe opóźnienie aby upewnić się, że DOM został zaktualizowany
    const timer = setTimeout(() => {
      scrollToBottom()
    }, 10)

    return () => clearTimeout(timer)
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Add typing indicator
    const typingMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isTyping: true,
    }
    setMessages((prev) => [...prev, typingMessage])

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input.trim(),
          context: "nexus_school_resources",
        }),
      })

      if (!response.ok) {
        throw new Error("Błąd podczas komunikacji z AI")
      }

      const data = await response.json()

      // Remove typing indicator and add real message
      setMessages((prev) => {
        const withoutTyping = prev.filter((msg) => !msg.isTyping)
        return [
          ...withoutTyping,
          {
            id: (Date.now() + 2).toString(),
            role: "assistant",
            content: data.message,
            timestamp: new Date(),
          },
        ]
      })
    } catch (error) {
      // Remove typing indicator and add error message
      setMessages((prev) => {
        const withoutTyping = prev.filter((msg) => !msg.isTyping)
        return [
          ...withoutTyping,
          {
            id: (Date.now() + 2).toString(),
            role: "assistant",
            content: "Przepraszam, wystąpił błąd. Spróbuj ponownie za chwilę.",
            timestamp: new Date(),
          },
        ]
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleTypingComplete = (messageId: string) => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, isTyping: false } : msg)))
  }

  return (
    <div className="space-y-4">
      {/* Messages Container - z ograniczonym scrollem */}
      <div
        ref={messagesContainerRef}
        className="h-96 overflow-y-auto space-y-4 p-4 bg-gradient-to-b from-gray-50 to-white rounded-lg border border-gray-200"
        style={{
          scrollBehavior: "auto", // Wyłączamy smooth scroll dla tego kontenera
          overflowAnchor: "none", // Zapobiega automatycznemu przewijaniu przeglądarki
        }}
      >
        {messages.map((message, index) => (
          <div key={message.id} className={`flex items-start space-x-3 animate-fadeInUp animate-delay-${index * 100}`}>
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
                message.role === "assistant"
                  ? "bg-gradient-to-br from-purple-600 to-purple-700 text-white"
                  : "bg-gradient-to-br from-blue-600 to-blue-700 text-white"
              }`}
            >
              {message.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
            </div>
            <div className="flex-1 min-w-0">
              <div
                className={`p-4 rounded-lg shadow-sm ${
                  message.role === "assistant"
                    ? "bg-white border border-gray-200"
                    : "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                }`}
              >
                {message.isTyping ? (
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">AI pisze odpowiedź...</span>
                  </div>
                ) : message.role === "assistant" ? (
                  message.content ? (
                    <TypingEffect text={message.content} onComplete={() => handleTypingComplete(message.id)} />
                  ) : (
                    <MarkdownRenderer content={message.content} />
                  )
                ) : (
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2 flex items-center space-x-2">
                <span>
                  {message.timestamp.toLocaleTimeString("pl-PL", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                {message.role === "assistant" && !message.isTyping && (
                  <span className="flex items-center space-x-1">
                    <Sparkles className="h-3 w-3 text-purple-400" />
                    <span className="text-purple-600">AI</span>
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Zadaj pytanie o edukację, karierę lub rozwój..."
          disabled={isLoading}
          className="flex-1 hover-lift transition-all duration-300 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
        />
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white hover-lift animate-pulse-custom shadow-lg"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>

      {/* Quick Questions */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700 animate-fadeInUp">Przykładowe pytania:</p>
        <div className="flex flex-wrap gap-2">
          {[
            "Jak przygotować się do matury z matematyki?",
            "Jakie zawody będą popularne w przyszłości?",
            "Jak napisać dobre CV dla absolwenta?",
            "Które studia wybrać po technikum?",
            "Jak rozwinąć umiejętności miękkie?",
            "Jakie certyfikaty IT warto zdobyć?",
            "Jak przygotować się do rozmowy kwalifikacyjnej?",
            "Które języki programowania się opłacają?",
          ].map((question, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => setInput(question)}
              disabled={isLoading}
              className={`text-xs hover-lift transition-all duration-300 animate-fadeInUp animate-delay-${index * 100} border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300`}
            >
              <Sparkles className="h-3 w-3 mr-1" />
              {question}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
