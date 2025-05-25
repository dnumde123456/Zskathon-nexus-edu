import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Zap, Brain, CheckCircle, Heart, ShieldCheck } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Particle Background */}
      <div className="particles">
        {[...Array(50)].map((_, i) => (
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-800/30 to-blue-800/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="mb-12">
            <div className="relative inline-block animate-float">
              <Image
                src="https://media.discordapp.net/attachments/1339890200066785301/1375822148341465189/Nexus.png?ex=683315b9&is=6831c439&hm=3cc48444202376cffed0eec5e6121dca4fac6aacaf48dacb5f2367af5fc58f1b&=&format=webp&quality=lossless&width=625&height=625"
                alt="Nexus Logo"
                width={200}
                height={200}
                className="mx-auto mb-8 hover-glow-intense"
              />
              <div className="absolute inset-0 bg-blue-500/30 rounded-full animate-morphing-bg"></div>
              <Sparkles className="absolute -top-4 -right-4 h-8 w-8 text-blue-400 animate-pulse" />
              <Zap className="absolute -bottom-4 -left-4 h-8 w-8 text-blue-300 animate-bounce" />
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight animate-scale-in-center">
              <span className="gradient-text animate-text-glow">Nexus</span>
            </h1>

            <div className="relative">
              <p className="text-2xl md:text-4xl text-white/90 mb-4 animate-slide-in-blur animate-delay-300">
                Platforma Edukacyjna
              </p>
              <p className="text-3xl md:text-5xl font-bold gradient-text animate-slide-in-blur animate-delay-500">
                Przyszłości
              </p>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-transparent to-blue-400/20 rounded-lg animate-wave"></div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16 animate-slide-in-blur animate-delay-700">
            <div className="glass-morphism rounded-2xl p-8 hover-glow-intense">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text animate-text-glow">NASZA MISJA</h2>
              <p className="text-xl text-white/90 leading-relaxed">
                Nexus to innowacyjna platforma edukacyjna, która łączy technologię z celami zrównoważonego rozwoju.
                Wspieramy uczniów i nauczycieli w tworzeniu lepszej przyszłości poprzez edukację, innowacje i
                współpracę.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20 animate-slide-in-blur animate-delay-1000">
            <Button
              asChild
              size="lg"
              className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-lg rounded-xl hover-lift-intense group overflow-hidden"
            >
              <Link href="/zasoby-szkol">
                <span className="relative z-10 flex items-center">
                  <Brain className="mr-2 h-5 w-5" />
                  Zasoby dla Szkół
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              className="relative px-8 py-4 glass-morphism text-white font-bold text-lg rounded-xl hover-lift-intense group border-2 border-blue-400/50 hover:border-blue-300"
            >
              <Link href="/motywacja-uczniow">
                <span className="relative z-10 flex items-center">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Motywacja dla Uczniów
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SDG Goals Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-slate-800/20 to-blue-800/10"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-in-blur">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 gradient-text animate-text-glow">
              Cele Zrównoważonego Rozwoju
            </h2>
            <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              Nexus koncentruje się na dwóch kluczowych celach ONZ w dziedzinie zrównoważonego rozwoju
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="glass-morphism-dark border-blue-400/30 hover-lift-intense animate-slide-in-blur animate-delay-200 group">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center animate-pulse-glow group-hover:animate-float">
                      <span className="text-white font-black text-2xl">4</span>
                    </div>
                    <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-red-400 animate-pulse" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-white mb-2 animate-slide-in-blur animate-delay-300">
                      Dobra Jakość Edukacji
                    </CardTitle>
                    <CardDescription className="text-white/70 text-lg animate-slide-in-blur animate-delay-400">
                      Zapewnienie sprawiedliwej i wysokiej jakości edukacji
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 text-lg leading-relaxed animate-slide-in-blur animate-delay-500">
                  Promowanie możliwości uczenia się przez całe życie dla wszystkich. Tworzenie innowacyjnych rozwiązań
                  edukacyjnych i narzędzi wspierających proces nauki.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-morphism-dark border-blue-400/30 hover-lift-intense animate-slide-in-blur animate-delay-400 group">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center animate-pulse-glow group-hover:animate-float">
                      <span className="text-white font-black text-2xl">9</span>
                    </div>
                    <Zap className="absolute -top-2 -right-2 h-6 w-6 text-orange-400 animate-pulse" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-white mb-2 animate-slide-in-blur animate-delay-500">
                      Przemysł, Innowacyjność i Infrastruktura
                    </CardTitle>
                    <CardDescription className="text-white/70 text-lg animate-slide-in-blur animate-delay-600">
                      Budowanie odpornej infrastruktury i wspieranie innowacji
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 text-lg leading-relaxed animate-slide-in-blur animate-delay-700">
                  Promowanie zrównoważonej industrializacji i wspieranie innowacji. Rozwój technologii i rozwiązań dla
                  przyszłości przemysłu.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center animate-scale-in-center animate-delay-700">
            <div className="relative inline-block">
              <Image
                src="/images/sdg-goals.png"
                alt="Cele Zrównoważonego Rozwoju ONZ"
                width={900}
                height={500}
                className="rounded-2xl shadow-2xl hover-glow-intense"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Showcase */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-in-blur">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 gradient-text animate-text-glow">
              Innowacje w Edukacji
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                image:
                  "https://media.discordapp.net/attachments/1299263793536307302/1375799969281347735/pexels-vanessa-loring-7868883.jpg?ex=68330111&is=6831af91&hm=fe439a1b322e7b9bf7fef35a281ee49134a2a29a947720dd0f0d7691a687e42a&=&format=webp&width=1061&height=708",
                title: "Współpraca i Innowacje",
                description:
                  "Uczniowie współpracują nad projektami technologicznymi, rozwijając umiejętności przyszłości.",
                delay: "200",
              },
              {
                image:
                  "https://media.discordapp.net/attachments/1299263793536307302/1375799970145239060/pexels-mikhail-nilov-9242849.jpg?ex=68330112&is=6831af92&hm=e749520973b6dcb8f84870ef0646eabb44226f11c979b5eee5003a5a7d241285&=&format=webp&width=1061&height=708",
                title: "Praktyczna Nauka",
                description:
                  "Hands-on doświadczenia w laboratoriach technicznych przygotowują do rzeczywistych wyzwań.",
                delay: "400",
              },
              {
                image:
                  "https://media.discordapp.net/attachments/1299263793536307302/1375799043103526963/pexels-cup-of-couple-6963695.jpg?ex=68330034&is=6831aeb4&hm=d801ad0bd7ab1afdab3c1467b66f43329d9689589c0b59c360987335c7aed73f&=&format=webp&width=1061&height=708",
                title: "Zrównoważony Rozwój",
                description: "Integrujemy cele zrównoważonego rozwoju w codzienną edukację i projekty uczniów.",
                delay: "600",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className={`glass-morphism-dark border-blue-400/30 overflow-hidden hover-lift-intense animate-slide-in-blur animate-delay-${item.delay} group`}
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <Sparkles className="h-6 w-6 text-blue-400 animate-pulse" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 animate-slide-in-blur animate-delay-300">
                    {item.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed animate-slide-in-blur animate-delay-500">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-slate-800/20 to-blue-800/10"></div>
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-slide-in-blur">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 gradient-text animate-text-glow">Nasze Wartości</h2>
          </div>

          <div className="space-y-8">
            {[
              {
                title: "Wysoka Jakość",
                description: "Dążymy do doskonałości w każdym aspekcie naszej platformy.",
                icon: CheckCircle,
                color: "from-green-500 to-green-600",
              },
              {
                title: "Zaangażowanie",
                description: "Jesteśmy oddani wspieraniu uczniów i nauczycieli.",
                icon: Heart,
                color: "from-red-500 to-red-600",
              },
              {
                title: "Bezpieczeństwo",
                description: "Zapewniamy bezpieczne i chronione środowisko nauki.",
                icon: ShieldCheck,
                color: "from-blue-500 to-blue-600",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex items-center space-x-6 animate-slide-in-blur animate-delay-${index * 200} group hover-lift-intense`}
              >
                <div className="flex-shrink-0">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center animate-pulse-glow group-hover:animate-float shadow-lg`}
                  >
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="flex-1 glass-morphism rounded-xl p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-xl font-bold text-white mb-2 sm:mb-0 animate-slide-in-blur animate-delay-300">
                      {item.title}
                    </h3>
                    <span className="text-blue-400 font-bold text-lg animate-slide-in-blur animate-delay-500">
                      {item.description}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-blue-500/30 to-blue-400/20"></div>
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="glass-morphism rounded-3xl p-12 hover-glow-intense animate-scale-in-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 gradient-text animate-text-glow">Gotowy na Wyzwanie?</h2>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-in-blur animate-delay-300">
              Dołącz do Nexus i twórz innowacyjne rozwiązania dla zrównoważonego rozwoju. Razem możemy zmienić świat!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-in-blur animate-delay-500">
              <Button
                asChild
                size="lg"
                className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-lg rounded-xl hover-lift-intense group overflow-hidden"
              >
                <Link href="/planer-ai">
                  <span className="relative z-10 flex items-center">
                    <Brain className="mr-2 h-5 w-5" />
                    Wypróbuj Planer AI
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                className="relative px-8 py-4 glass-morphism text-white font-bold text-lg rounded-xl hover-lift-intense group border-2 border-blue-400/50 hover:border-blue-300"
              >
                <Link href="/motywacja-uczniow">
                  <span className="relative z-10 flex items-center">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Znajdź Motywację
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
