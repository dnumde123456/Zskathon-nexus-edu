"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Target, Lightbulb, Download, Play, Sparkles, Brain, Zap, ExternalLink } from "lucide-react"
import { AIAssistant } from "@/components/ai-assistant"
import Image from "next/image"

export default function SchoolResourcesPage() {
  return (
    <div className="min-h-screen relative overflow-hidden pt-20">
      {/* Particle Background */}
      <div className="particles">
        {[...Array(40)].map((_, i) => (
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
                <BookOpen className="h-12 w-12 text-white animate-float" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-blue-400 animate-pulse" />
              <Brain className="absolute -bottom-2 -left-2 h-8 w-8 text-purple-400 animate-bounce" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 gradient-text animate-text-glow">Zasoby dla Szkół</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed animate-slide-in-blur animate-delay-300">
            Kompleksowe materiały edukacyjne, prezentacje i narzędzia wspierające nauczycieli w realizacji celów
            zrównoważonego rozwoju w edukacji technicznej.
          </p>
        </div>

        {/* Canva Presentations Section */}
        <section className="mb-20">
          <div className="text-center mb-12 animate-slide-in-blur">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text animate-text-glow">
              Prezentacje Edukacyjne
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Interaktywne prezentacje przygotowane specjalnie dla nauczycieli szkół technicznych
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* First Presentation */}
            <Card className="glass-morphism-dark border-blue-400/30 hover-glow-intense animate-slide-in-blur animate-delay-200">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center space-x-3 gradient-text-white">
                  <Play className="h-6 w-6 text-blue-400 animate-pulse-glow" />
                  <span>Prezentacja dla uczniów i szkół</span>
                </CardTitle>
                <CardDescription className="text-white/70 text-lg">
                  Kompleksowy przewodnik po motywacji uczniów w szkołach technicznych
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="relative w-full h-96 rounded-xl overflow-hidden glass-morphism animate-scale-in-center animate-delay-300 group cursor-pointer"
                  onClick={() =>
                    window.open(
                      "https://www.canva.com/design/DAGoXLF26NM/m4cWxNfOYDPDzd9neq13jA/view?utm_content=DAGoXLF26NM&utm_campaign=share_your_design&utm_medium=link2&utm_source=shareyourdesignpanel",
                      "_blank",
                    )
                  }
                >
                  <Image
                    src="https://media.discordapp.net/attachments/1349664518061428777/1376114253836193812/1.png?ex=683425c5&is=6832d445&hm=829b5d77492228247343528459f8ad3f32dcd005629fe46c4b147f697766accb&=&format=webp&quality=lossless&width=1258&height=708"
                    alt="Prezentacja Canva - Cele Zrównoważonego Rozwoju"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                      <ExternalLink className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-blue-600/80 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="text-white text-sm font-semibold">Kliknij aby otworzyć</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-500 text-white hover-lift-intense"
                    onClick={() =>
                      window.open(
                        "https://www.canva.com/design/DAGoXLF26NM/Gt4DvFzFp8URZzAE2eDgLQ/view?utm_content=DAGoXLF26NM&utm_campaign=designshare&utm_medium=link&utm_source=editor",
                        "_blank",
                      )
                    }
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Otwórz prezentację
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-400/50 text-blue-300 hover:bg-blue-500/20 hover-lift-intense"
                    onClick={() =>
                      window.open(
                        "https://www.canva.com/design/DAGoXLF26NM/Gt4DvFzFp8URZzAE2eDgLQ/edit?utm_content=DAGoXLF26NM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
                        "_blank",
                      )
                    }
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Edytuj kopię
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Second Presentation */}
            <Card className="glass-morphism-dark border-blue-400/30 hover-glow-intense animate-slide-in-blur animate-delay-400">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center space-x-3 gradient-text-white">
                  <Zap className="h-6 w-6 text-purple-400 animate-pulse-glow" />
                  <span>Innowacyjne Metody Nauczania</span>
                </CardTitle>
                <CardDescription className="text-white/70 text-lg">
                  Praktyczne narzędzia i techniki dla nowoczesnej edukacji technicznej
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-96 rounded-xl overflow-hidden glass-morphism animate-scale-in-center animate-delay-500">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600/20 to-blue-600/20">
                    <div className="text-center">
                      <Brain className="h-16 w-16 text-purple-400 mx-auto mb-4 animate-float" />
                      <p className="text-white/80 text-lg font-semibold">Prezentacja w przygotowaniu</p>
                      <p className="text-white/60 text-sm mt-2">Wkrótce dostępna dla nauczycieli</p>
                      <div className="mt-4 flex justify-center">
                        <div className="bg-purple-500/20 rounded-full px-4 py-2">
                          <span className="text-purple-300 text-sm">Coming Soon</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-purple-400/50 text-purple-300 hover:bg-purple-500/20 hover-lift-intense"
                    disabled
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Wkrótce dostępne
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Educational Resources */}
        <section className="mb-20">
          <div className="text-center mb-12 animate-slide-in-blur">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text animate-text-glow">
              Materiały Edukacyjne
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Przewodnik SDG",
                description: "Kompleksowy przewodnik po celach zrównoważonego rozwoju dla szkół technicznych",
                color: "from-green-500 to-green-600",
                delay: "200",
              },
              {
                icon: Users,
                title: "Metodyki Nauczania",
                description: "Innowacyjne metody nauczania dostosowane do edukacji technicznej",
                color: "from-blue-500 to-blue-600",
                delay: "300",
              },
              {
                icon: Lightbulb,
                title: "Projekty Praktyczne",
                description: "Gotowe projekty i zadania dla uczniów szkół technicznych",
                color: "from-purple-500 to-purple-600",
                delay: "400",
              },
              {
                icon: BookOpen,
                title: "Materiały Źródłowe",
                description: "Zbiór artykułów, badań i publikacji naukowych",
                color: "from-orange-500 to-orange-600",
                delay: "500",
              },
              {
                icon: Brain,
                title: "Narzędzia AI",
                description: "Przewodnik po wykorzystaniu sztucznej inteligencji w edukacji",
                color: "from-cyan-500 to-cyan-600",
                delay: "600",
              },
              {
                icon: Sparkles,
                title: "Inspiracje",
                description: "Przykłady dobrych praktyk z innych szkół i instytucji",
                color: "from-pink-500 to-pink-600",
                delay: "700",
              },
            ].map((resource, index) => (
              <Card
                key={index}
                className={`glass-morphism-dark border-blue-400/30 hover-lift-intense animate-slide-in-blur animate-delay-${resource.delay} group`}
              >
                <CardHeader className="text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${resource.color} rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow group-hover:animate-float`}
                  >
                    <resource.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white animate-slide-in-blur animate-delay-300">
                    {resource.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 text-center leading-relaxed mb-4 animate-slide-in-blur animate-delay-500">
                    {resource.description}
                  </p>
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white hover-lift-intense"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Pobierz
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* AI Assistant Section */}
        <section className="mb-20">
          <Card className="glass-morphism-dark border-blue-400/30 hover-glow-intense animate-scale-in-center">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center animate-pulse-glow">
                    <Brain className="h-10 w-10 text-white animate-float" />
                  </div>
                  <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-purple-400 animate-pulse" />
                </div>
              </div>
              <CardTitle className="text-3xl md:text-4xl gradient-text-white animate-text-glow mb-4">
                Asystent AI dla Nauczycieli
              </CardTitle>
              <CardDescription className="text-white/70 text-lg max-w-2xl mx-auto">
                Zadaj pytanie naszemu asystentowi AI o materiały edukacyjne, metodyki nauczania czy cele zrównoważonego
                rozwoju
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AIAssistant />
            </CardContent>
          </Card>
        </section>

        {/* Quick Start Guide */}
        <section>
          <div className="text-center mb-12 animate-slide-in-blur">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text animate-text-glow">Szybki Start</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="glass-morphism-dark border-blue-400/30 hover-glow-intense animate-slide-in-blur animate-delay-200">
              <CardHeader>
                <CardTitle className="text-2xl gradient-text-white">Dla Nauczycieli</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    "Zapoznaj się z prezentacjami edukacyjnymi",
                    "Pobierz materiały źródłowe",
                    "Skorzystaj z asystenta AI",
                    "Wdróż projekty praktyczne w klasie",
                  ].map((step, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-3 glass-morphism rounded-lg hover-lift-intense transition-all duration-300 animate-slide-in-blur animate-delay-${(index + 1) * 100}`}
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center animate-pulse-glow">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <span className="text-white/90">{step}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-morphism-dark border-blue-400/30 hover-glow-intense animate-slide-in-blur animate-delay-400">
              <CardHeader>
                <CardTitle className="text-2xl gradient-text-white">Dla Dyrektorów</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    "Zapoznaj się z celami platformy",
                    "Przeszkolić zespół nauczycielski",
                    "Wdrożyć SDG w programie szkoły",
                    "Monitorować postępy uczniów",
                  ].map((step, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-3 glass-morphism rounded-lg hover-lift-intense transition-all duration-300 animate-slide-in-blur animate-delay-${(index + 1) * 100}`}
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse-glow">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <span className="text-white/90">{step}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
