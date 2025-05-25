import { Mail, Sparkles, Instagram } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="relative glass-morphism-dark mt-20">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="animate-slide-in-blur">
            <div className="flex items-center space-x-3 mb-6 group hover-glow-intense">
              <div className="relative">
                <Image
                  src="https://media.discordapp.net/attachments/1339890200066785301/1375822148341465189/Nexus.png?ex=683315b9&is=6831c439&hm=3cc48444202376cffed0eec5e6121dca4fac6aacaf48dacb5f2367af5fc58f1b&=&format=webp&quality=lossless&width=625&height=625"
                  alt="Nexus Logo"
                  width={40}
                  height={40}
                  className="rounded-lg animate-float"
                />
                <div className="absolute inset-0 bg-blue-500/20 rounded-lg animate-pulse-glow"></div>
              </div>
              <span className="font-bold text-2xl gradient-text-white">Nexus</span>
              <Sparkles className="h-5 w-5 text-blue-400 animate-pulse" />
            </div>
            <p className="text-white/80 mb-6 leading-relaxed animate-slide-in-blur animate-delay-200">
              Innowacyjna platforma edukacyjna skupiająca się na celach zrównoważonego rozwoju. Tworzymy przyszłość
              edukacji poprzez technologię i współpracę.
            </p>
          </div>

          <div className="animate-slide-in-blur animate-delay-300">
            <h3 className="font-bold text-xl mb-6 gradient-text-white">Informacje o Platformie</h3>
            <div className="space-y-4 text-white/80">
              <div className="flex items-center space-x-3 hover-lift-intense group">
                <div className="p-2 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                  <Mail className="h-5 w-5 text-blue-400" />
                </div>
                <span>kontakt@nexus-edu.pl</span>
              </div>

              {/* Social Media Links */}
              <div className="space-y-3">
                <h4 className="font-semibold text-white text-sm uppercase tracking-wide">Śledź nas:</h4>

                <a
                  href="https://www.tiktok.com/@nexus.dla.mlodych?is_from_webapp=1&sender_device=pc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 hover-lift-intense group transition-all duration-300"
                >
                  <div className="p-2 rounded-lg bg-pink-500/20 group-hover:bg-pink-500/30 transition-colors">
                    <div className="h-5 w-5 text-pink-400 font-bold text-sm flex items-center justify-center">TT</div>
                  </div>
                  <span className="group-hover:text-pink-300 transition-colors">@nexus.dla.mlodych</span>
                </a>

                <a
                  href="https://www.instagram.com/nexus.dlamlodych/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 hover-lift-intense group transition-all duration-300"
                >
                  <div className="p-2 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                    <Instagram className="h-5 w-5 text-purple-400" />
                  </div>
                  <span className="group-hover:text-purple-300 transition-colors">@nexus.dlamlodych</span>
                </a>
              </div>
            </div>
          </div>

          <div className="animate-slide-in-blur animate-delay-500">
            <h3 className="font-bold text-xl mb-6 gradient-text-white">Cele Zrównoważonego Rozwoju</h3>
            <div className="space-y-4 text-white/80">
              <div className="p-4 rounded-lg glass-morphism hover-glow-intense transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🎓</span>
                  <span>Cel 4: Dobra jakość edukacji</span>
                </div>
              </div>
              <div className="p-4 rounded-lg glass-morphism hover-glow-intense transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🏭</span>
                  <span>Cel 9: Przemysł, innowacyjność i infrastruktura</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/60 animate-slide-in-blur animate-delay-700">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <p>&copy; 2025 Nexus. Wszystkie prawa zastrzeżone.</p>
            <Sparkles className="h-4 w-4 text-blue-400" />
          </div>
          <p className="text-sm animate-slide-in-blur animate-delay-1000">
            Innowacyjna platforma edukacyjna - Przyszłość Edukacji - Aplikacja zrobiona w trakcie ZSKathon25
          </p>
        </div>
      </div>
    </footer>
  )
}
