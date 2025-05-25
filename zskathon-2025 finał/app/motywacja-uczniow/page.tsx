import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Target, Users, Trophy, Rocket, Heart, Brain, Star } from "lucide-react"
import Link from "next/link"

export default function StudentMotivationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/globe-minimal.webp"
              alt="Globalna perspektywa edukacji"
              width={120}
              height={120}
              className="rounded-full object-cover animate-float hover-glow"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 gradient-text-purple animate-fadeInUp animate-delay-200">
            Motywacja dla Uczniów
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto animate-fadeInUp animate-delay-400">
            Odkryj swoją pasję do nauki i technologii! Nexus to Twoja szansa na stworzenie czegoś wyjątkowego i
            zmienianie świata na lepsze poprzez edukację i innowacje.
          </p>
        </div>

        {/* Motivation Challenge */}
        <section className="mb-16">
          <Card className="shadow-xl bg-gradient-to-r from-red-500 to-pink-500 text-white max-w-4xl mx-auto hover-lift animate-scaleIn">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Heart className="h-16 w-16 animate-pulse-custom" />
              </div>
              <CardTitle className="text-3xl mb-4 animate-fadeInUp">Czy Brakuje Ci Motywacji do Nauki?</CardTitle>
              <CardDescription className="text-red-100 text-lg animate-fadeInUp animate-delay-200">
                Nie jesteś sam! Wielu uczniów nie widzi sensu nauki i nie czuje się przygotowanych do egzaminów.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="bg-white/10 rounded-lg p-6 mb-6 animate-scaleIn animate-delay-300">
                <Image
                  src="https://media.discordapp.net/attachments/1349664518061428777/1376114256013033562/6.png?ex=683425c5&is=6832d445&hm=b4ed369b309c1dbaf5f5416ddfa32ee703ed7b7b0565d36b75e54130e5c90711&=&format=webp&quality=lossless&width=1258&height=708"
                  alt="Brak motywacji do nauki"
                  width={600}
                  height={200}
                  className="mx-auto rounded-lg hover-scale transition-transform duration-500"
                />
              </div>
              <p className="text-lg mb-6 animate-fadeInUp animate-delay-500">
                <strong>Trzeba pomyśleć jakie problemy i rozwiązania mogą okazać się potrzebne!</strong>
              </p>
              <p className="text-red-100 animate-fadeInUp animate-delay-700">
                Nexus to Twoja szansa na odkrycie, że nauka może być fascynująca, praktyczna i naprawdę zmieniać świat!
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Main Challenge */}
        <section className="mb-16">
          <Card className="shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white max-w-4xl mx-auto hover-lift animate-slideInUp">
            <CardHeader className="text-center">
              <Target className="h-16 w-16 mx-auto mb-4 animate-bounce-custom" />
              <CardTitle className="text-3xl mb-4 animate-fadeInUp">Główne Wyzwanie</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="bg-white/10 rounded-lg p-6 mb-6 animate-scaleIn animate-delay-300">
                <Image
                  src="https://media.discordapp.net/attachments/1349664518061428777/1376114368399409223/25.png?ex=683425e0&is=6832d460&hm=44552f22e5cdca37805d5543043e65bfb3a27de65da169c2ea690709a3d0df73&=&format=webp&quality=lossless&width=1258&height=708"
                  alt="Jak skuteczniej przygotować uczniów do egzaminów zawodowych?"
                  width={600}
                  height={150}
                  className="mx-auto rounded-lg hover-scale transition-transform duration-500"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 animate-fadeInUp animate-delay-500">
                "Jak skuteczniej przygotować uczniów do egzaminów zawodowych?"
              </h3>
              <p className="text-blue-100 text-lg animate-fadeInUp animate-delay-700">
                To nie tylko pytanie - to Twoja misja! Stwórz rozwiązanie, które pomoże Tobie i innym uczniom lepiej się
                przygotować do egzaminów i odkryć radość z nauki.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Why Participate */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center animate-fadeInUp gradient-text-purple">
            Dlaczego Warto Używać Nexus?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="shadow-lg hover:shadow-xl transition-all hover:scale-105 hover-lift animate-fadeInLeft">
              <CardHeader>
                <Lightbulb className="h-12 w-12 text-yellow-500 mb-2 animate-glow" />
                <CardTitle className="text-xl animate-fadeInUp">Odkryj Swoją Kreatywność</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 animate-fadeInUp animate-delay-200">
                  Platforma edukacyjna to miejsce, gdzie Twoje najśmielsze pomysły mogą stać się rzeczywistością. Nie ma
                  złych pomysłów - tylko nieodkryte możliwości!
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all hover:scale-105 hover-lift animate-fadeInUp animate-delay-200">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-500 mb-2 animate-bounce-custom" />
                <CardTitle className="text-xl animate-fadeInUp">Poznaj Nowych Ludzi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 animate-fadeInUp animate-delay-200">
                  Pracuj w zespole z uczniami z różnych szkół i kierunków. Znajdź przyjaciół, którzy podzielają Twoje
                  pasje!
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all hover:scale-105 hover-lift animate-fadeInRight animate-delay-400">
              <CardHeader>
                <Brain className="h-12 w-12 text-purple-500 mb-2 animate-pulse-custom" />
                <CardTitle className="text-xl animate-fadeInUp">Rozwijaj Umiejętności</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 animate-fadeInUp animate-delay-200">
                  Naucz się programowania, designu, zarządzania projektami i prezentacji. Umiejętności, które przydadzą
                  Ci się w przyszłości!
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all hover:scale-105 hover-lift animate-fadeInLeft animate-delay-700">
              <CardHeader>
                <Trophy className="h-12 w-12 text-gold-500 mb-2 animate-float" />
                <CardTitle className="text-xl animate-fadeInUp">Wygraj Nagrody</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 animate-fadeInUp animate-delay-200">
                  Najlepsze projekty otrzymają nagrody, ale prawdziwą nagrodą jest doświadczenie i poczucie, że
                  stworzyłeś coś wartościowego.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all hover:scale-105 hover-lift animate-fadeInUp animate-delay-1000">
              <CardHeader>
                <Rocket className="h-12 w-12 text-red-500 mb-2 animate-bounce-custom" />
                <CardTitle className="text-xl animate-fadeInUp">Zmień Świat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 animate-fadeInUp animate-delay-200">
                  Twój projekt może naprawdę pomóc innym uczniom w nauce. To szansa na stworzenie czegoś, co ma realny
                  wpływ!
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all hover:scale-105 hover-lift animate-fadeInRight animate-delay-1000">
              <CardHeader>
                <Star className="h-12 w-12 text-indigo-500 mb-2 animate-glow" />
                <CardTitle className="text-xl animate-fadeInUp">Buduj Przyszłość</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 animate-fadeInUp animate-delay-200">
                  Doświadczenie z platformy edukacyjnej to świetny punkt w CV i pierwszy krok w karierze w branży
                  technologicznej.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Success Stories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center animate-fadeInUp gradient-text-purple">
            Historie Sukcesu
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 hover-lift animate-slideInLeft">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center animate-pulse-custom">
                    <span className="text-white font-bold">A</span>
                  </div>
                  <div>
                    <CardTitle className="animate-fadeInUp">Anna, 17 lat</CardTitle>
                    <CardDescription className="animate-fadeInUp animate-delay-200">
                      Technikum Informatyczne
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 italic mb-4 animate-fadeInUp animate-delay-300">
                  "Myślałam, że programowanie to nie dla mnie. Po platformie edukacyjnej stworzyłam aplikację, która
                  pomaga uczniom w nauce matematyki. Teraz studiuję informatykę!"
                </p>
                <Badge variant="secondary" className="animate-scaleIn animate-delay-500">
                  Zwycięzca kategorii 'Najlepsze UI/UX'
                </Badge>
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 hover-lift animate-slideInRight">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center animate-bounce-custom">
                    <span className="text-white font-bold">M</span>
                  </div>
                  <div>
                    <CardTitle className="animate-fadeInUp">Michał, 18 lat</CardTitle>
                    <CardDescription className="animate-fadeInUp animate-delay-200">
                      Technikum Mechatroniczne
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 italic mb-4 animate-fadeInUp animate-delay-300">
                  "Nigdy nie myślałem o łączeniu mechaniki z programowaniem. Nasz projekt IoT dla szkół wygrał główną
                  nagrodę!"
                </p>
                <Badge variant="secondary" className="animate-scaleIn animate-delay-500">
                  Główna nagroda Konkurs Nexus 2024
                </Badge>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Practical Tips */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center animate-fadeInUp gradient-text-purple">
            Praktyczne Wskazówki
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="shadow-lg hover-lift animate-slideInLeft">
              <CardHeader>
                <CardTitle className="text-2xl text-green-600 animate-fadeInUp">Przed Platformą</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start space-x-2 hover-lift transition-all duration-300 animate-fadeInUp animate-delay-200">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>Zapoznaj się z celami zrównoważonego rozwoju</span>
                  </li>
                  <li className="flex items-start space-x-2 hover-lift transition-all duration-300 animate-fadeInUp animate-delay-300">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>Pomyśl o problemach w Twojej szkole</span>
                  </li>
                  <li className="flex items-start space-x-2 hover-lift transition-all duration-300 animate-fadeInUp animate-delay-400">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>Przygotuj podstawowe narzędzia (laptop, notatnik)</span>
                  </li>
                  <li className="flex items-start space-x-2 hover-lift transition-all duration-300 animate-fadeInUp animate-delay-500">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>Znajdź zespół lub bądź otwarty na nowe znajomości</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover-lift animate-slideInRight">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-600 animate-fadeInUp">Podczas Platformy</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start space-x-2 hover-lift transition-all duration-300 animate-fadeInUp animate-delay-200">
                    <span className="text-blue-500 font-bold">✓</span>
                    <span>Nie bój się zadawać pytań mentorom</span>
                  </li>
                  <li className="flex items-start space-x-2 hover-lift transition-all duration-300 animate-fadeInUp animate-delay-300">
                    <span className="text-blue-500 font-bold">✓</span>
                    <span>Skup się na rozwiązaniu problemu, nie na technologii</span>
                  </li>
                  <li className="flex items-start space-x-2 hover-lift transition-all duration-300 animate-fadeInUp animate-delay-400">
                    <span className="text-blue-500 font-bold">✓</span>
                    <span>Rób przerwy i dbaj o siebie</span>
                  </li>
                  <li className="flex items-start space-x-2 hover-lift transition-all duration-300 animate-fadeInUp animate-delay-500">
                    <span className="text-blue-500 font-bold">✓</span>
                    <span>Przygotuj prostą, ale przekonującą prezentację</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="shadow-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white max-w-4xl mx-auto overflow-hidden hover-lift animate-scaleIn">
            <div className="absolute inset-0 opacity-20">
              <Image src="/images/digital-innovation.webp" alt="Innowacje cyfrowe" fill className="object-cover" />
            </div>
            <CardContent className="py-12 relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-bounce-custom">Gotowy na Przygodę?</h2>
              <p className="text-lg mb-8 text-purple-100 max-w-2xl mx-auto animate-fadeInUp animate-delay-300">
                Nexus to nie tylko platforma edukacyjna - to doświadczenie, które może zmienić Twoje życie. Dołącz do
                nas i odkryj, jak fascynująca może być nauka!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animate-delay-500">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 hover-lift animate-pulse-custom"
                >
                  <Link href="/planer-ai">Wypróbuj Sylph AI</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-600 hover-lift animate-glow"
                >
                  <Link href="/zasoby-szkol">Zobacz Zasoby</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
