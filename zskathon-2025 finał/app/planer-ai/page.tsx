"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Loader2,
  Brain,
  Calendar,
  Clock,
  Target,
  BookOpen,
  Zap,
  Sparkles,
  Star,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

interface Task {
  time: string
  subject: string
  activity: string
  priority: "high" | "medium" | "low"
}

interface DaySchedule {
  day: string
  tasks: Task[]
}

interface StudyPlan {
  personalizedMessage: string
  weeklySchedule: DaySchedule[]
  studyTips: string[]
  motivationalQuotes: string[]
  resources: Array<{
    name: string
    type: string
    subject: string
  }>
  _metadata?: {
    generatedBy: string
    timestamp: string
    version: string
  }
}

export default function AILearningPlannerPage() {
  useEffect(() => {
    // Suppress ResizeObserver errors
    const handleError = (e: ErrorEvent) => {
      if (e.message.includes("ResizeObserver")) {
        e.stopImmediatePropagation()
      }
    }
    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [])

  const [isGenerating, setIsGenerating] = useState(false)
  const [plan, setPlan] = useState<StudyPlan | null>(null)
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")
  const [formData, setFormData] = useState({
    name: "",
    grade: "",
    subjects: "",
    goals: "",
    timeAvailable: "",
    learningStyle: "",
    challenges: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear errors when user starts typing
    if (error) setError("")
  }

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError("Podaj swoje imię")
      return false
    }
    if (!formData.subjects.trim()) {
      setError("Podaj przedmioty do nauki")
      return false
    }
    if (!formData.grade) {
      setError("Wybierz klasę")
      return false
    }
    if (!formData.timeAvailable) {
      setError("Wybierz dostępny czas na naukę")
      return false
    }
    return true
  }

  const generatePlan = async () => {
    setError("")
    setSuccess("")

    if (!validateForm()) {
      return
    }

    setIsGenerating(true)

    try {
      console.log("🚀 Rozpoczynam generowanie planu...")
      console.log("📝 Dane formularza:", formData)

      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      console.log("📡 Odpowiedź serwera:", response.status, response.statusText)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          error: `Błąd HTTP ${response.status}: ${response.statusText}`,
        }))
        throw new Error(errorData.error || `Błąd serwera: ${response.status}`)
      }

      const data = await response.json()
      console.log("✅ Otrzymano dane:", data)

      if (!data.plan) {
        throw new Error("Brak planu w odpowiedzi serwera")
      }

      setPlan(data.plan)
      setSuccess(`Plan został wygenerowany pomyślnie! (Metoda: ${data.method || "nieznana"})`)

      // Scroll to plan
      setTimeout(() => {
        const planElement = document.getElementById("generated-plan")
        if (planElement) {
          planElement.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    } catch (error) {
      console.error("❌ Błąd generowania planu:", error)
      const errorMessage = error instanceof Error ? error.message : "Nieznany błąd"
      setError(`Wystąpił błąd: ${errorMessage}`)
    } finally {
      setIsGenerating(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-300 border-red-400/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-400/30"
      case "low":
        return "bg-green-500/20 text-green-300 border-green-400/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-400/30"
    }
  }

  const resetForm = () => {
    setPlan(null)
    setError("")
    setSuccess("")
    setFormData({
      name: "",
      grade: "",
      subjects: "",
      goals: "",
      timeAvailable: "",
      learningStyle: "",
      challenges: "",
    })
  }

  return (
    <div className="min-h-screen relative overflow-hidden pt-20">
      {/* Particle Background */}
      <div className="particles">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-in-blur">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center animate-pulse-glow hover-glow-intense">
                <Brain className="h-12 w-12 text-white animate-float" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-blue-400 animate-pulse" />
              <Zap className="absolute -bottom-2 -left-2 h-8 w-8 text-purple-400 animate-bounce" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 gradient-text animate-text-glow">Sylph AI</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed animate-slide-in-blur animate-delay-300">
            Spersonalizowany asystent AI od Nexus, który pomoże Ci stworzyć idealny plan nauki i harmonogram dnia.
            Wykorzystaj sztuczną inteligencję do osiągnięcia swoich celów edukacyjnych!
          </p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="max-w-5xl mx-auto mb-8">
            <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-4 flex items-center space-x-3 animate-slide-in-blur">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
              <p className="text-red-300">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="max-w-5xl mx-auto mb-8">
            <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-4 flex items-center space-x-3 animate-slide-in-blur">
              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
              <p className="text-green-300">{success}</p>
            </div>
          </div>
        )}

        {!plan ? (
          /* Form Section */
          <div className="max-w-5xl mx-auto">
            <Card className="glass-morphism-dark border-blue-400/30 hover-glow-intense animate-scale-in-center">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl flex items-center justify-center space-x-3 animate-slide-in-blur">
                  <Zap className="h-8 w-8 text-blue-400 animate-pulse-glow" />
                  <span className="gradient-text-white">Stwórz Swój Spersonalizowany Plan</span>
                  <Star className="h-8 w-8 text-purple-400 animate-pulse" />
                </CardTitle>
                <CardDescription className="text-white/70 text-lg animate-slide-in-blur animate-delay-200">
                  Wypełnij formularz, a Sylph przygotuje dla Ciebie idealny plan nauki
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3 animate-slide-in-blur animate-delay-300">
                    <Label htmlFor="name" className="text-white font-semibold">
                      Twoje Imię *
                    </Label>
                    <Input
                      id="name"
                      placeholder="np. Anna"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="glass-morphism border-blue-400/30 text-white placeholder:text-white/50 hover-glow-intense transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="space-y-3 animate-slide-in-blur animate-delay-400">
                    <Label htmlFor="grade" className="text-white font-semibold">
                      Klasa/Rok *
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("grade", value)} value={formData.grade}>
                      <SelectTrigger className="glass-morphism border-blue-400/30 text-white hover-glow-intense transition-all duration-300">
                        <SelectValue placeholder="Wybierz klasę" />
                      </SelectTrigger>
                      <SelectContent className="glass-morphism-dark border-blue-400/30">
                        <SelectItem value="1">1 klasa technikum</SelectItem>
                        <SelectItem value="2">2 klasa technikum</SelectItem>
                        <SelectItem value="3">3 klasa technikum</SelectItem>
                        <SelectItem value="4">4 klasa technikum</SelectItem>
                        <SelectItem value="5">5 klasa technikum</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3 animate-slide-in-blur animate-delay-500">
                  <Label htmlFor="subjects" className="text-white font-semibold">
                    Przedmioty do nauki (oddziel przecinkami) *
                  </Label>
                  <Input
                    id="subjects"
                    placeholder="np. Matematyka, Fizyka, Informatyka, Język Polski"
                    value={formData.subjects}
                    onChange={(e) => handleInputChange("subjects", e.target.value)}
                    className="glass-morphism border-blue-400/30 text-white placeholder:text-white/50 hover-glow-intense transition-all duration-300"
                    required
                  />
                </div>

                <div className="space-y-3 animate-slide-in-blur animate-delay-600">
                  <Label htmlFor="goals" className="text-white font-semibold">
                    Twoje cele edukacyjne
                  </Label>
                  <Textarea
                    id="goals"
                    placeholder="np. Przygotowanie do egzaminu zawodowego, poprawa ocen z matematyki, nauka programowania"
                    value={formData.goals}
                    onChange={(e) => handleInputChange("goals", e.target.value)}
                    rows={4}
                    className="glass-morphism border-blue-400/30 text-white placeholder:text-white/50 hover-glow-intense transition-all duration-300"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3 animate-slide-in-blur animate-delay-700">
                    <Label htmlFor="timeAvailable" className="text-white font-semibold">
                      Ile czasu dziennie możesz poświęcić na naukę? *
                    </Label>
                    <Select
                      onValueChange={(value) => handleInputChange("timeAvailable", value)}
                      value={formData.timeAvailable}
                    >
                      <SelectTrigger className="glass-morphism border-blue-400/30 text-white hover-glow-intense transition-all duration-300">
                        <SelectValue placeholder="Wybierz czas" />
                      </SelectTrigger>
                      <SelectContent className="glass-morphism-dark border-blue-400/30">
                        <SelectItem value="1">1 godzina</SelectItem>
                        <SelectItem value="2">2 godziny</SelectItem>
                        <SelectItem value="3">3 godziny</SelectItem>
                        <SelectItem value="4">4+ godzin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3 animate-slide-in-blur animate-delay-800">
                    <Label htmlFor="learningStyle" className="text-white font-semibold">
                      Preferowany styl nauki
                    </Label>
                    <Select
                      onValueChange={(value) => handleInputChange("learningStyle", value)}
                      value={formData.learningStyle}
                    >
                      <SelectTrigger className="glass-morphism border-blue-400/30 text-white hover-glow-intense transition-all duration-300">
                        <SelectValue placeholder="Wybierz styl" />
                      </SelectTrigger>
                      <SelectContent className="glass-morphism-dark border-blue-400/30">
                        <SelectItem value="visual">Wizualny (diagramy, mapy myśli)</SelectItem>
                        <SelectItem value="auditory">Słuchowy (nagrania, dyskusje)</SelectItem>
                        <SelectItem value="kinesthetic">Kinestetyczny (praktyka, eksperymenty)</SelectItem>
                        <SelectItem value="reading">Czytanie/pisanie</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3 animate-slide-in-blur animate-delay-1000">
                  <Label htmlFor="challenges" className="text-white font-semibold">
                    Jakie masz trudności w nauce?
                  </Label>
                  <Textarea
                    id="challenges"
                    placeholder="np. Trudności z koncentracją, brak motywacji, problemy z matematyką"
                    value={formData.challenges}
                    onChange={(e) => handleInputChange("challenges", e.target.value)}
                    rows={4}
                    className="glass-morphism border-blue-400/30 text-white placeholder:text-white/50 hover-glow-intense transition-all duration-300"
                  />
                </div>

                <Button
                  onClick={generatePlan}
                  disabled={isGenerating}
                  className="w-full py-6 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl hover-lift-intense animate-slide-in-blur animate-delay-1200 relative overflow-hidden group"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                      Sylph tworzy Twój plan...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-3 h-6 w-6 animate-pulse-glow" />
                      Wygeneruj Plan z AI
                      <Sparkles className="ml-3 h-6 w-6 animate-pulse" />
                    </>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>

                <p className="text-white/60 text-sm text-center animate-slide-in-blur animate-delay-1400">
                  * Pola wymagane
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Generated Plan Section */
          <div id="generated-plan" className="space-y-12">
            {/* Welcome Message */}
            <Card className="glass-morphism-dark border-blue-400/30 hover-glow-intense animate-scale-in-center">
              <CardContent className="py-12 text-center">
                <div className="relative inline-block mb-6">
                  <Brain className="h-20 w-20 mx-auto text-blue-400 animate-float" />
                  <div className="absolute inset-0 bg-blue-500/30 rounded-full animate-pulse-glow"></div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text-white animate-text-glow">
                  Twój Spersonalizowany Plan Gotowy!
                </h2>
                <p className="text-xl text-white/80 animate-slide-in-blur animate-delay-300">
                  {plan.personalizedMessage}
                </p>
                {plan._metadata && (
                  <div className="mt-4 text-sm text-white/60">
                    Wygenerowano przez: {plan._metadata.generatedBy} |{" "}
                    {new Date(plan._metadata.timestamp).toLocaleString("pl-PL")}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Weekly Schedule */}
            {plan.weeklySchedule && plan.weeklySchedule.length > 0 && (
              <Card className="glass-morphism-dark border-blue-400/30 hover-glow-intense animate-slide-in-blur animate-delay-200">
                <CardHeader>
                  <CardTitle className="text-3xl flex items-center space-x-3 gradient-text-white animate-slide-in-blur">
                    <Calendar className="h-8 w-8 text-blue-400 animate-pulse-glow" />
                    <span>Harmonogram Tygodniowy</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {plan.weeklySchedule.map((day, index) => (
                      <div
                        key={index}
                        className={`border-l-4 border-blue-400 pl-6 animate-slide-in-blur animate-delay-${index * 200}`}
                      >
                        <h3 className="text-2xl font-bold text-white mb-4 animate-slide-in-blur">{day.day}</h3>
                        <div className="space-y-3">
                          {day.tasks && day.tasks.length > 0 ? (
                            day.tasks.map((task, taskIndex) => (
                              <div
                                key={taskIndex}
                                className={`flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 glass-morphism rounded-xl hover-lift-intense transition-all duration-300 animate-slide-in-blur animate-delay-${taskIndex * 100}`}
                              >
                                <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                                  <Clock className="h-5 w-5 text-blue-400 animate-pulse flex-shrink-0" />
                                  <span className="font-semibold text-white">{task.time}</span>
                                  <span className="text-white/80">{task.activity}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <Badge className={`${getPriorityColor(task.priority)} animate-scale-in-center`}>
                                    {task.subject}
                                  </Badge>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-white/60 italic">Brak zadań na ten dzień</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Study Tips */}
            {plan.studyTips && plan.studyTips.length > 0 && (
              <Card className="glass-morphism-dark border-blue-400/30 hover-glow-intense animate-slide-in-blur animate-delay-400">
                <CardHeader>
                  <CardTitle className="text-3xl flex items-center space-x-3 gradient-text-white animate-slide-in-blur">
                    <Target className="h-8 w-8 text-green-400 animate-pulse-glow" />
                    <span>Wskazówki do Nauki</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {plan.studyTips.map((tip, index) => (
                      <div
                        key={index}
                        className={`flex items-start space-x-4 p-6 glass-morphism rounded-xl hover-lift-intense transition-all duration-300 animate-slide-in-blur animate-delay-${index * 200}`}
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 animate-pulse-glow">
                          <span className="text-white text-sm font-bold">{index + 1}</span>
                        </div>
                        <p className="text-white/90 leading-relaxed">{tip}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Motivational Quotes */}
            {plan.motivationalQuotes && plan.motivationalQuotes.length > 0 && (
              <Card className="glass-morphism-dark border-blue-400/30 hover-glow-intense animate-slide-in-blur animate-delay-700">
                <CardHeader>
                  <CardTitle className="text-3xl flex items-center space-x-3 gradient-text-white animate-slide-in-blur">
                    <Zap className="h-8 w-8 text-yellow-400 animate-pulse-glow" />
                    <span>Motywacyjne Cytaty</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {plan.motivationalQuotes.map((quote, index) => (
                      <blockquote
                        key={index}
                        className={`text-xl italic text-white/90 border-l-4 border-yellow-400 pl-6 hover-lift-intense transition-all duration-300 animate-slide-in-blur animate-delay-${index * 300}`}
                      >
                        {quote}
                      </blockquote>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recommended Resources */}
            {plan.resources && plan.resources.length > 0 && (
              <Card className="glass-morphism-dark border-blue-400/30 hover-glow-intense animate-slide-in-blur animate-delay-1000">
                <CardHeader>
                  <CardTitle className="text-3xl flex items-center space-x-3 gradient-text-white animate-slide-in-blur">
                    <BookOpen className="h-8 w-8 text-purple-400 animate-pulse-glow" />
                    <span>Polecane Zasoby</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {plan.resources.map((resource, index) => (
                      <div
                        key={index}
                        className={`p-6 glass-morphism rounded-xl hover-lift-intense transition-all duration-300 animate-scale-in-center animate-delay-${index * 200}`}
                      >
                        <h4 className="font-bold text-white text-lg mb-3 animate-slide-in-blur">{resource.name}</h4>
                        <p className="text-white/70 mb-4 animate-slide-in-blur animate-delay-200">{resource.type}</p>
                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30 animate-scale-in-center animate-delay-400">
                          {resource.subject}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-in-blur animate-delay-1200">
              <Button
                onClick={resetForm}
                size="lg"
                className="px-8 py-4 glass-morphism border-2 border-blue-400/50 text-white font-bold text-lg rounded-xl hover-lift-intense hover:border-blue-300 transition-all duration-300"
              >
                <Brain className="mr-2 h-5 w-5" />
                Stwórz Nowy Plan
              </Button>
              <Button
                size="lg"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-lg rounded-xl hover-lift-intense relative overflow-hidden group"
                onClick={() => window.print()}
              >
                <span className="relative z-10 flex items-center">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Pobierz Plan (PDF)
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </div>
          </div>
        )}

        {/* Features Section */}
        <section className="mt-20">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 gradient-text animate-text-glow">
            Dlaczego Sylph od Nexus?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Brain,
                title: "Sztuczna Inteligencja",
                description: "Zaawansowane algorytmy AI analizują Twój styl nauki i tworzą spersonalizowany plan.",
                color: "from-purple-500 to-purple-600",
                delay: "200",
              },
              {
                icon: Target,
                title: "Cele Edukacyjne",
                description: "Wspiera realizację celów zrównoważonego rozwoju poprzez lepszą edukację.",
                color: "from-green-500 to-green-600",
                delay: "400",
              },
              {
                icon: Calendar,
                title: "Elastyczny Harmonogram",
                description: "Dostosowuje się do Twojego trybu życia i dostępnego czasu na naukę.",
                color: "from-blue-500 to-blue-600",
                delay: "600",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className={`glass-morphism-dark border-blue-400/30 hover-lift-intense animate-slide-in-blur animate-delay-${feature.delay} group`}
              >
                <CardHeader className="text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow group-hover:animate-float`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white animate-slide-in-blur animate-delay-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 text-center leading-relaxed animate-slide-in-blur animate-delay-500">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
