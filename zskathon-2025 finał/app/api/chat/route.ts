import { type NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"

// Initialize Groq only if API key exists
let groq: Groq | null = null
if (process.env.GROQ_API_KEY) {
  groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  })
}

const SYSTEM_PROMPT = `Jesteś zaawansowanym asystentem AI stworzonym dla innowacyjnej platformy edukacyjnej **Nexus**. Jesteś ekspertem w dziedzinie edukacji, rozwoju kariery, rynku pracy i technologii edukacyjnych. Twoim zadaniem jest udzielanie praktycznych, merytorycznych i inspirujących odpowiedzi w języku **polskim** na wszystkie pytania związane z:

🎓 **EDUKACJA I NAUKA**:
- Metody i techniki nauki (jak się uczyć efektywnie)
- Przygotowanie do egzaminów (matura, egzaminy zawodowe, certyfikaty)
- Wybór kierunku studiów i uczelni
- Kursy online i platformy edukacyjne
- Narzędzia technologiczne w nauce (AI, aplikacje, platformy)
- Rozwiązywanie problemów z konkretnymi przedmiotami
- Organizacja czasu i planowanie nauki
- Motywacja do nauki i przezwyciężanie trudności

💼 **KARIERA I RYNEK PRACY**:
- Planowanie ścieżki kariery zawodowej
- Popularne zawody przyszłości i trendy rynkowe
- Umiejętności poszukiwane przez pracodawców
- Pisanie CV, listów motywacyjnych i profili LinkedIn
- Przygotowanie do rozmów kwalifikacyjnych
- Rozwój umiejętności miękkich (soft skills)
- Networking i budowanie sieci kontaktów
- Praca zdalna i freelancing
- Przedsiębiorczość i zakładanie firm
- Analiza wynagrodzeń i negocjacje

🔧 **TECHNOLOGIE I UMIEJĘTNOŚCI PRZYSZŁOŚCI**:
- Programowanie i rozwój oprogramowania
- Sztuczna inteligencja i machine learning
- Cyberbezpieczeństwo
- Analiza danych i big data
- Robotyka i automatyzacja
- Internet rzeczy (IoT)
- Projektowanie UX/UI
- Marketing cyfrowy
- E-commerce i handel elektroniczny

🌱 **CELE ZRÓWNOWAŻONEGO ROZWOJU**:
- Implementacja SDG w edukacji i biznesie
- Zielone technologie i odnawialne źródła energii
- Zrównoważony rozwój i ekologia
- Odpowiedzialność społeczna biznesu
- Innowacje społeczne

📊 **ANALIZA I DORADZTWO**:
- Analiza mocnych i słabych stron ucznia/absolwenta
- Rekomendacje personalizowanych ścieżek rozwoju
- Porównanie opcji edukacyjnych i zawodowych
- Ocena perspektyw różnych branż
- Planowanie budżetu na edukację

---

## ZASADY ODPOWIEDZI:

✅ **CO ROBIĆ**:
- Udzielaj praktycznych, konkretnych porad z przykładami
- Podawaj aktualne informacje o rynku pracy i trendach
- Polecaj sprawdzone zasoby, kursy, książki, narzędzia
- Dostosowuj odpowiedzi do wieku i poziomu ucznia (szkoła średnia/technikum)
- Motywuj i inspiruj do działania
- Używaj emotikonów i struktury dla lepszej czytelności
- Zadawaj pytania doprecyzowujące, jeśli potrzebujesz więcej informacji
- Podawaj konkretne kroki i plany działania
- Odnosś się do polskiego systemu edukacji i rynku pracy

❌ **CZEGO UNIKAĆ**:
- Treści nielegalnych, szkodliwych lub nieetycznych
- Plagiatów i oszustw akademickich
- Dyskryminacji i stereotypów
- Gwarantowania sukcesu bez pracy
- Zbyt ogólnych porad bez konkretów
- Informacji medycznych (przekieruj do specjalistów)

---

## PRZYKŁADY DOBRYCH ODPOWIEDZI:

**Pytanie**: "Jak przygotować się do matury z matematyki?"
**Odpowiedź**: "🎯 Oto konkretny plan przygotowań do matury z matematyki:

📚 **Plan 6-miesięczny**:
1. **Miesiące 1-2**: Powtórka podstaw (funkcje, równania, geometria)
2. **Miesiące 3-4**: Zadania maturalne z lat poprzednich
3. **Miesiące 5-6**: Intensywne ćwiczenia i testy próbne

🔧 **Najlepsze zasoby**:
- Khan Academy (darmowe kursy)
- Matemaks.pl (zadania maturalne)
- YouTube: kanał "MatFiz24"
- Aplikacja Photomath (pomoc z rozwiązaniami)

💡 **Techniki nauki**:
- 2 godziny dziennie przez 5 dni w tygodniu
- Rozwiązuj po 10 zadań z każdego typu
- Prowadź błędnik (zapisuj błędy i powtarzaj)

Czy chcesz konkretny harmonogram dla swojego poziomu?"

---

Pamiętaj: Jesteś tu, aby pomóc uczniom i nauczycielom odnieść sukces w edukacji i karierze. Bądź profesjonalny, pomocny i inspirujący!`

// Local knowledge base for fallback responses
const localKnowledgeBase = {
  // Istniejące kategorie
  sdg: "Cele Zrównoważonego Rozwoju (SDG) to 17 globalnych celów ustanowionych przez ONZ...",
  metodyki: "Najlepsze metodyki nauczania w szkołach technicznych to...",
  motywacja: "Aby motywować uczniów...",
  ai: "Narzędzia AI w edukacji...",
  projekty: "Przykłady projektów dla szkół technicznych...",

  // Nowe kategorie
  matura:
    "Przygotowanie do matury wymaga systematycznego planu: 📚 Stwórz harmonogram nauki na 6 miesięcy przed egzaminem, 📝 Rozwiązuj arkusze z poprzednich lat, 🎯 Skup się na zadaniach, które sprawiają Ci trudność, 💡 Używaj technik aktywnego uczenia się, 📱 Korzystaj z aplikacji jak Photomath czy Khan Academy.",

  kariera:
    "Planowanie kariery w XXI wieku: 🚀 Identyfikuj trendy rynkowe, 💼 Rozwijaj umiejętności miękkie, 🌐 Buduj obecność online (LinkedIn), 📈 Ucz się przez całe życie, 🤝 Networking jest kluczowy, 💡 Rozważ pracę zdalną i freelancing.",

  cv: "Dobre CV dla absolwenta: 📄 1 strona A4, 👤 Dane kontaktowe na górze, 🎓 Wykształcenie (jeśli brak doświadczenia), 💼 Praktyki i projekty, 🛠️ Umiejętności techniczne, 🌟 Zainteresowania związane z branżą, ✅ Bez błędów językowych, 📊 Format PDF.",

  studia:
    "Wybór studiów po technikum: 🎯 Dopasuj do swoich zainteresowań i umiejętności, 📊 Sprawdź perspektywy zatrudnienia absolwentów, 💰 Porównaj koszty studiów, 🏫 Odwiedź dni otwarte uczelni, 👥 Porozmawiaj z obecnymi studentami, 📈 Rozważ studia techniczne z wysokim popytem na rynku.",

  programowanie:
    "Języki programowania 2024: 🐍 Python - uczenie maszynowe, data science, 💻 JavaScript - frontend i backend web, ☕ Java - aplikacje enterprise, 📱 Swift/Kotlin - aplikacje mobilne, 🌐 SQL - bazy danych, 🔒 C# - aplikacje Windows, 🦀 Rust - systemy niskopoziomowe.",

  umiejetnosciMiekkie:
    "Najważniejsze soft skills: 🗣️ Komunikacja interpersonalna, 🧩 Rozwiązywanie problemów, 👥 Praca w zespole, ⏰ Zarządzanie czasem, 🎯 Krytyczne myślenie, 🔄 Adaptacyjność, 🎤 Prezentacja, 🤝 Negocjacje, 💡 Kreatywność, 📚 Chęć uczenia się.",

  rozmowa:
    "Przygotowanie do rozmowy kwalifikacyjnej: 🔍 Przeanalizuj firmę i stanowisko, 💡 Przygotuj przykłady z doświadczeń, ❓ Przygotuj pytania do pracodawcy, 👔 Ubierz się odpowiednio, ⏰ Przyjdź 10 minut wcześniej, 😊 Bądź pozytywny i pewny siebie, 📱 Wyłącz telefon.",

  przyszlosc:
    "Zawody przyszłości: 🤖 Inżynier AI/ML, 🔒 Specjalista cyberbezpieczeństwa, 📊 Analityk danych, 🌱 Inżynier energii odnawialnej, 👨‍⚕️ Bioinformatyk, 🎮 Developer gier VR/AR, 💡 Product Manager, 🌐 Cloud Architect, 🎨 UX Designer, 🔬 Inżynier biomedyczny.",

  certyfikaty:
    "Wartościowe certyfikaty IT: ☁️ AWS Cloud Practitioner, 🔒 CompTIA Security+, 📊 Google Analytics, 🐍 Python Institute PCAP, 💻 Microsoft Azure Fundamentals, 🌐 Cisco CCNA, 📱 Google Mobile Web Specialist, 🎨 Adobe Certified Expert.",
}

function getLocalResponse(message: string): string {
  const messageLower = message.toLowerCase()

  const subjects = {
    matematyka: ["matematyk", "algebra", "geometri", "funkcj", "równani", "wzór", "oblicz"],
    fizyka: ["fizyk", "mechanik", "optyk", "elektr", "magnet", "fal", "energi"],
    informatyka: ["programowani", "kod", "algorytm", "python", "java", "javascript", "html", "css"],
    chemia: ["chemi", "reakcj", "pierwiastk", "związek", "kwas", "zasad", "ph"],
    biologia: ["biologi", "komórk", "genetyk", "ewolucj", "ekosystem", "fotosyntez"],
    historia: ["histori", "wojna", "rewolucj", "średniowiecz", "antyk", "współczesn"],
    geografia: ["geografi", "kontynent", "kraj", "klimat", "góry", "rzek", "ocean"],
    polski: ["polski", "literatura", "lektur", "gramatyk", "ortografi", "rozprawka"],
    angielski: ["angielski", "english", "grammar", "vocabulary", "tenses", "słówka"],
  }

  let detectedSubject = ""
  for (const [subject, keywords] of Object.entries(subjects)) {
    if (keywords.some((keyword) => messageLower.includes(keyword))) {
      detectedSubject = subject
      break
    }
  }

  const questionTypes = {
    jak: ["jak", "w jaki sposób", "how"],
    co: ["co to", "czym jest", "what"],
    dlaczego: ["dlaczego", "why", "z jakiego powodu"],
    kiedy: ["kiedy", "when", "w którym"],
    gdzie: ["gdzie", "where", "w jakim"],
    ile: ["ile", "how much", "how many"],
    który: ["który", "which", "jaki"],
  }

  let questionType = ""
  for (const [type, patterns] of Object.entries(questionTypes)) {
    if (patterns.some((pattern) => messageLower.includes(pattern))) {
      questionType = type
      break
    }
  }

  if (messageLower.includes("matur") || messageLower.includes("egzamin")) {
    return generateExamResponse(detectedSubject, questionType, message)
  }

  if (messageLower.includes("kariera") || messageLower.includes("zawod") || messageLower.includes("praca")) {
    return generateCareerResponse(questionType, message)
  }

  if (messageLower.includes("cv") || messageLower.includes("życiorys")) {
    return generateCVResponse(questionType, message)
  }

  if (messageLower.includes("studi") || messageLower.includes("uczelni")) {
    return generateStudiesResponse(questionType, message)
  }

  if (messageLower.includes("programowani") || messageLower.includes("kod")) {
    return generateProgrammingResponse(questionType, message)
  }

  if (detectedSubject) {
    return generateSubjectResponse(detectedSubject, questionType, message)
  }

  if (messageLower.includes("umiejętności") || messageLower.includes("skill")) {
    return generateSkillsResponse(questionType, message)
  }

  if (
    messageLower.includes("przyszłość") ||
    messageLower.includes("trend") ||
    messageLower.includes("2024") ||
    messageLower.includes("2025")
  ) {
    return generateFutureResponse(questionType, message)
  }

  if (messageLower.includes("nauk") || messageLower.includes("uczeni") || messageLower.includes("metod")) {
    return generateLearningResponse(questionType, message)
  }

  if (messageLower.includes("motywacj") || messageLower.includes("inspiracj") || messageLower.includes("chęć")) {
    return generateMotivationResponse(questionType, message)
  }

  return generateGeneralEducationalResponse(questionType, message)
}


function generateExamResponse(subject: string, questionType: string, originalMessage: string): string {
  const subjectSpecific = {
    matematyka:
      "📐 **Przygotowanie do matury z matematyki:**\n• Rozwiązuj arkusze z poprzednich lat\n• Skup się na zadaniach otwartych (więcej punktów)\n• Używaj Photomath do sprawdzania obliczeń\n• Ćwicz geometrię analityczną i funkcje",
    fizyka:
      "⚡ **Przygotowanie do matury z fizyki:**\n• Naucz się wzorów na pamięć\n• Rysuj schematy i diagramy\n• Ćwicz zadania z mechaniki (najczęściej na maturze)\n• Używaj symulacji PhET do zrozumienia zjawisk",
    informatyka:
      "💻 **Przygotowanie do egzaminu z informatyki:**\n• Ćwicz algorytmy sortowania i wyszukiwania\n• Naucz się podstaw SQL i baz danych\n• Programuj w Pythonie lub C++\n• Rozwiązuj zadania z poprzednich sesji",
    chemia:
      "🧪 **Przygotowanie do matury z chemii:**\n• Naucz się układu okresowego\n• Ćwicz pisanie równań reakcji\n• Rozwiązuj zadania stechiometryczne\n• Zapamiętaj wzory związków organicznych",
  }

  const general =
    "🎯 **Ogólne zasady przygotowania do egzaminów:**\n\n📅 **Plan 6-miesięczny:**\n• Miesiące 1-2: Powtórka podstaw\n• Miesiące 3-4: Rozwiązywanie zadań maturalnych\n• Miesiące 5-6: Testy próbne i utrwalanie\n\n💡 **Skuteczne techniki:**\n• Aktywne powtórki co 3 dni\n• Flashcards z kluczowymi pojęciami\n• Grupy studyjne z kolegami\n• Symulacja warunków egzaminacyjnych"

  const subjectResponse = subject ? subjectSpecific[subject as keyof typeof subjectSpecific] : ""

  return `${subjectResponse || general}\n\n🔗 **Przydatne zasoby:**\n• CKE.gov.pl - oficjalne arkusze\n• Khan Academy - darmowe kursy\n• YouTube: kanały edukacyjne\n• Aplikacje: Photomath, Quizlet\n\nCzy potrzebujesz konkretnego planu przygotowań?`
}

function generateCareerResponse(questionType: string, originalMessage: string): string {
  return `💼 **Planowanie kariery w 2024:**\n\n🚀 **Najważniejsze kroki:**\n• Zidentyfikuj swoje mocne strony i zainteresowania\n• Przeanalizuj trendy rynkowe w swojej branży\n• Zbuduj portfolio swoich projektów\n• Rozwijaj umiejętności miękkie\n• Nawiąż kontakty w branży (networking)\n\n📈 **Najbardziej poszukiwane umiejętności:**\n• Programowanie (Python, JavaScript, Java)\n• Analiza danych i AI\n• Cyberbezpieczeństwo\n• Zarządzanie projektami\n• Komunikacja międzykulturowa\n\n🎯 **Konkretne działania:**\n• Stwórz profil na LinkedIn\n• Weź udział w projektach open source\n• Zdobądź certyfikaty branżowe\n• Aplikuj na staże i praktyki\n\nW jakiej branży chciałbyś rozwijać karierę?`
}

function generateCVResponse(questionType: string, originalMessage: string): string {
  return `📄 **Jak napisać skuteczne CV:**\n\n✅ **Struktura (1 strona A4):**\n1. **Dane kontaktowe** - imię, telefon, email, LinkedIn\n2. **Podsumowanie** - 2-3 zdania o Tobie\n3. **Doświadczenie** - praktyki, projekty, wolontariat\n4. **Wykształcenie** - szkoła, kierunek, średnia (jeśli dobra)\n5. **Umiejętności** - techniczne i językowe\n6. **Zainteresowania** - związane z branżą\n\n💡 **Wskazówki dla absolwentów:**\n• Skup się na projektach szkolnych i osobistych\n• Podkreśl praktyki i staże\n• Wymień kursy online i certyfikaty\n• Dodaj linki do portfolio/GitHub\n• Użyj słów kluczowych z ogłoszenia\n\n🚫 **Czego unikać:**\n• Zdjęcia (chyba że wymagane)\n• Błędów językowych\n• Zbyt długich opisów\n• Nieaktualnych informacji\n\nChcesz, żebym pomógł z konkretną sekcją CV?`
}

function generateStudiesResponse(questionType: string, originalMessage: string): string {
  return `🎓 **Wybór studiów po technikum:**\n\n🔍 **Kryteria wyboru:**\n• Zgodność z zainteresowaniami i umiejętnościami\n• Perspektywy zatrudnienia absolwentów\n• Jakość uczelni i kadry\n• Lokalizacja i koszty\n• Możliwości rozwoju (staże, wymiany)\n\n📊 **Najpopularniejsze kierunki techniczne:**\n• **Informatyka** - programowanie, AI, cyberbezpieczeństwo\n• **Automatyka i robotyka** - przemysł 4.0\n• **Elektrotechnika** - energetyka, elektronika\n• **Mechatronika** - połączenie mechaniki i elektroniki\n• **Inżynieria biomedyczna** - technologie medyczne\n• **Energetyka odnawialna** - zielone technologie\n\n💰 **Finansowanie studiów:**\n• Stypendia socjalne i naukowe\n• Programy rządowe (500+ na studia)\n• Kredyty studenckie\n• Praca w niepełnym wymiarze\n\n🎯 **Następne kroki:**\n• Odwiedź dni otwarte uczelni\n• Porozmawiaj z obecnymi studentami\n• Sprawdź rankingi uczelni\n• Przygotuj się do egzaminów wstępnych\n\nO który kierunek studiów chciałbyś dowiedzieć się więcej?`
}

function generateProgrammingResponse(questionType: string, originalMessage: string): string {
  return `💻 **Programowanie w 2024:**\n\n🚀 **Najpopularniejsze języki:**\n• **Python** - AI, data science, backend\n• **JavaScript** - frontend, backend (Node.js)\n• **Java** - aplikacje enterprise\n• **C#** - aplikacje Windows, gry\n• **Swift/Kotlin** - aplikacje mobilne\n• **Rust** - systemy niskopoziomowe\n\n📚 **Ścieżki nauki:**\n\n**Frontend Developer:**\n1. HTML/CSS → JavaScript → React/Vue → TypeScript\n\n**Backend Developer:**\n2. Python/Java → Framework → Bazy danych → API\n\n**Mobile Developer:**\n3. Swift (iOS) lub Kotlin (Android) → UI/UX → App Store\n\n**Data Scientist:**\n4. Python → Pandas → Machine Learning → AI\n\n🛠️ **Darmowe zasoby:**\n• freeCodeCamp - interaktywne kursy\n• Codecademy - podstawy programowania\n• YouTube - kanały edukacyjne\n• GitHub - projekty open source\n• Stack Overflow - pomoc społeczności\n\n🎯 **Pierwszy projekt:**\n• Kalkulator (podstawy)\n• Lista zadań (To-Do App)\n• Prosta gra (np. kółko i krzyżyk)\n• Portfolio website\n\nKtóry język programowania Cię najbardziej interesuje?`
}

function generateSubjectResponse(subject: string, questionType: string, originalMessage: string): string {
  const subjectResponses = {
    matematyka: `📐 **Matematyka - wskazówki do nauki:**\n\n💡 **Skuteczne metody:**\n• Rozwiązuj zadania krok po kroku\n• Prowadź zeszyt z wzorami\n• Ćwicz codziennie po 30 minut\n• Używaj aplikacji Photomath do sprawdzania\n\n🎯 **Najważniejsze tematy:**\n• Funkcje i ich własności\n• Równania i nierówności\n• Geometria analityczna\n• Trygonometria\n• Rachunek prawdopodobieństwa\n\n📱 **Przydatne narzędzia:**\n• GeoGebra - wizualizacja funkcji\n• Khan Academy - darmowe lekcje\n• Wolfram Alpha - rozwiązywanie równań`,

    fizyka: `⚡ **Fizyka - jak się uczyć skutecznie:**\n\n🔬 **Metody nauki:**\n• Zrozum zjawiska przed zapamiętaniem wzorów\n• Rysuj diagramy i schematy\n• Łącz teorię z eksperymentami\n• Używaj symulacji online\n\n📊 **Kluczowe działy:**\n• Mechanika - ruch, siły, energia\n• Termodynamika - ciepło, temperatura\n• Elektromagnetyzm - prąd, pole\n• Optyka - światło, soczewki\n• Fizyka współczesna - atom, kwanty\n\n🌐 **Zasoby online:**\n• PhET Simulations - interaktywne symulacje\n• YouTube: kanał "Fizyka z Fizykiem"\n• Khan Academy Physics`,

    informatyka: `💻 **Informatyka - praktyczne podejście:**\n\n⌨️ **Podstawy programowania:**\n• Zacznij od Pythona (łatwy składnia)\n• Ćwicz algorytmy i struktury danych\n• Twórz małe projekty\n• Czytaj kod innych programistów\n\n🗄️ **Bazy danych:**\n• Naucz się SQL\n• Zrozum relacje między tabelami\n• Ćwicz na przykładowych bazach\n\n🌐 **Technologie webowe:**\n• HTML/CSS - struktura i wygląd\n• JavaScript - interaktywność\n• Frameworki - React, Vue\n\n📚 **Zasoby:**\n• Codecademy - interaktywne kursy\n• freeCodeCamp - projekty praktyczne\n• GitHub - portfolio kodu`,
  }

  return (
    subjectResponses[subject as keyof typeof subjectResponses] ||
    `📚 **${subject.charAt(0).toUpperCase() + subject.slice(1)} - ogólne wskazówki:**\n\n💡 **Uniwersalne metody nauki:**\n• Rób regularne powtórki\n• Łącz teorię z praktyką\n• Twórz notatki i mapy myśli\n• Ćwicz aktywnie, nie tylko czytaj\n• Szukaj połączeń z innymi przedmiotami\n\n🎯 **Skuteczne techniki:**\n• Technika Pomodoro (25 min nauki + 5 min przerwy)\n• Flashcards z kluczowymi pojęciami\n• Nauczanie innych (metoda Feynmana)\n• Rozwiązywanie zadań praktycznych\n\nCzy masz konkretne trudności z tym przedmiotem?`
  )
}

function generateSkillsResponse(questionType: string, originalMessage: string): string {
  return `🌟 **Rozwój umiejętności w XXI wieku:**\n\n🧠 **Umiejętności miękkie (Soft Skills):**\n• **Komunikacja** - jasne wyrażanie myśli\n• **Praca w zespole** - współpraca i kompromis\n• **Rozwiązywanie problemów** - kreatywne myślenie\n• **Zarządzanie czasem** - priorytetyzacja zadań\n• **Adaptacyjność** - elastyczność w zmianach\n• **Przywództwo** - motywowanie innych\n\n💻 **Umiejętności techniczne (Hard Skills):**\n• **Programowanie** - Python, JavaScript, Java\n• **Analiza danych** - Excel, SQL, Python\n• **Cyberbezpieczeństwo** - ochrona systemów\n• **AI/ML** - sztuczna inteligencja\n• **Cloud Computing** - AWS, Azure\n• **Projektowanie UX/UI** - doświadczenie użytkownika\n\n🎯 **Jak rozwijać umiejętności:**\n• Bierz udział w projektach zespołowych\n• Zapisz się na kursy online (Coursera, Udemy)\n• Ćwicz prezentacje publiczne\n• Angażuj się w wolontariat\n• Szukaj mentora w branży\n• Czytaj książki o rozwoju osobistym\n\nNa której umiejętności chciałbyś się skupić?`
}

function generateFutureResponse(questionType: string, originalMessage: string): string {
  return `🚀 **Przyszłość pracy i edukacji:**\n\n🔮 **Trendy na 2024-2030:**\n• **Automatyzacja** - roboty przejmą rutynowe zadania\n• **AI i Machine Learning** - wszędzie będzie sztuczna inteligencja\n• **Praca zdalna** - hybrydowe modele pracy\n• **Zielone technologie** - odnawialne źródła energii\n• **Cyberbezpieczeństwo** - ochrona danych\n• **Biotechnologia** - medycyna personalizowana\n\n💼 **Zawody przyszłości:**\n• **AI Engineer** - tworzenie systemów AI\n• **Data Scientist** - analiza big data\n• **Cybersecurity Specialist** - ochrona cybernetyczna\n• **UX Designer** - projektowanie doświadczeń\n• **Sustainability Manager** - zrównoważony rozwój\n• **Robotics Engineer** - projektowanie robotów\n\n🎓 **Jak się przygotować:**\n• Ucz się przez całe życie (lifelong learning)\n• Rozwijaj kreatywność i krytyczne myślenie\n• Łącz umiejętności techniczne z miękkimi\n• Bądź otwarty na zmiany\n• Buduj sieć kontaktów\n• Eksperymentuj z nowymi technologiami\n\nKtóry trend Cię najbardziej interesuje?`
}

function generateLearningResponse(questionType: string, originalMessage: string): string {
  return `📚 **Skuteczne metody nauki:**\n\n🧠 **Techniki oparte na nauce:**\n• **Aktywne przypominanie** - testuj się zamiast tylko czytać\n• **Rozłożone powtórki** - powtarzaj w odstępach czasowych\n• **Technika Feynmana** - wytłumacz komuś prostymi słowami\n• **Pomodoro** - 25 min nauki + 5 min przerwy\n• **Mapy myśli** - wizualizuj połączenia między pojęciami\n\n🎯 **Style uczenia się:**\n• **Wizualny** - diagramy, kolory, mapy\n• **Słuchowy** - nagrania, dyskusje, muzyka\n• **Kinestetyczny** - ruch, eksperymenty, praktyka\n• **Czytanie/pisanie** - notatki, listy, teksty\n\n⏰ **Organizacja czasu:**\n• Zaplanuj naukę w kalendarzu\n• Ustal stałe godziny nauki\n• Przygotuj materiały wcześniej\n• Usuń rozpraszacze (telefon, social media)\n• Rób regularne przerwy\n\n🏠 **Środowisko nauki:**\n• Znajdź ciche, dobrze oświetlone miejsce\n• Utrzymuj porządek na biurku\n• Zapewnij wygodne krzesło\n• Miej pod ręką wodę i zdrowe przekąski\n\n📱 **Przydatne aplikacje:**\n• Anki - flashcards z algorytmem powtórek\n• Forest - blokowanie rozpraszaczy\n• Notion - organizacja notatek\n• Quizlet - nauka słówek\n\nJakie masz największe trudności z nauką?`
}

function generateMotivationResponse(questionType: string, originalMessage: string): string {
  return `🔥 **Jak znaleźć motywację do nauki:**\n\n🎯 **Ustal jasne cele:**\n• Napisz, dlaczego się uczysz\n• Podziel duże cele na małe kroki\n• Wyznacz terminy realizacji\n• Wizualizuj sukces\n\n🏆 **System nagród:**\n• Nagradzaj się po każdej sesji nauki\n• Ustaw większe nagrody za większe osiągnięcia\n• Świętuj małe sukcesy\n• Dziel się postępami z innymi\n\n👥 **Wsparcie społeczne:**\n• Znajdź partnera do nauki\n• Dołącz do grupy studyjnej\n• Poproś rodzinę o wsparcie\n• Znajdź mentora lub korepetytora\n\n💡 **Zmiana perspektywy:**\n• Skup się na procesie, nie tylko na wynikach\n• Traktuj błędy jako lekcje\n• Pamiętaj o swoich mocnych stronach\n• Porównuj się z sobą z przeszłości, nie z innymi\n\n⚡ **Praktyczne wskazówki:**\n• Zacznij od 15 minut dziennie\n• Ucz się o stałych porach\n• Przygotuj materiały wieczorem\n• Usuń rozpraszacze z otoczenia\n• Rób przerwy na ruch i świeże powietrze\n\n📖 **Inspirujące cytaty:**\n• "Sukces to suma małych wysiłków powtarzanych dzień po dniu"\n• "Nie bój się iść powoli, bój się tylko stać w miejscu"\n• "Każdy ekspert był kiedyś początkującym"\n\nCo najbardziej Cię demotywuje w nauce?`
}

function generateGeneralEducationalResponse(questionType: string, originalMessage: string): string {
  return `🎓 **Ogólne wskazówki edukacyjne:**\n\n💡 **Uniwersalne zasady nauki:**\n• **Regularność** - lepiej 30 minut dziennie niż 5 godzin raz w tygodniu\n• **Aktywność** - rób notatki, zadawaj pytania, testuj się\n• **Zrozumienie** - nie ucz się na pamięć, zrozum logikę\n• **Praktyka** - stosuj wiedzę w rzeczywistych sytuacjach\n• **Powtórki** - wracaj do materiału w regularnych odstępach\n\n🔍 **Jak znaleźć odpowiedzi:**\n• **Google Scholar** - artykuły naukowe\n• **Khan Academy** - darmowe kursy\n• **YouTube** - kanały edukacyjne\n• **Wikipedia** - podstawowe informacje\n• **Coursera/edX** - kursy uniwersyteckie\n\n🎯 **Rozwój umiejętności:**\n• Czytaj książki z różnych dziedzin\n• Ucz się języków obcych\n• Rozwijaj krytyczne myślenie\n• Ćwicz komunikację\n• Bądź ciekawy świata\n\n🌟 **Pamiętaj:**\n• Każdy ma swoje tempo nauki\n• Błędy to część procesu uczenia się\n• Najważniejsza jest konsystencja\n• Ucz się tego, co Cię interesuje\n• Dziel się wiedzą z innymi\n\nCzy masz konkretne pytanie, z którym mogę Ci pomóc? Opisz swoją sytuację, a postaram się udzielić bardziej szczegółowej odpowiedzi! 😊`
}

async function tryGroqChat(message: string): Promise<string> {
  if (!groq) {
    throw new Error("Sylph not available")
  }

  console.log(" Próbuję użyć Sylph dla chatu...")

  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: message,
      },
    ],
    model: "llama-3.1-70b-versatile",
    temperature: 0.7,
    max_tokens: 1000,
  })

  const aiResponse = completion.choices[0]?.message?.content

  if (!aiResponse) {
    throw new Error("Brak odpowiedzi od Sylph")
  }

  console.log("Sylph odpowiedział pomyślnie")
  return aiResponse
}

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Wiadomość jest wymagana" }, { status: 400 })
    }

    console.log("💬 Otrzymano wiadomość:", message.substring(0, 50) + "...")

    let response = ""
    let usedMethod = "unknown"

    if (groq) {
      try {
        response = await tryGroqChat(message)
        usedMethod = "groq"
        console.log("🎯 Użyto Groq API dla chatu")
      } catch (groqError) {
        console.log("⚠️ Groq API nie działa dla chatu:", groqError)
        console.log("🔄 Przełączam na lokalną bazę wiedzy...")
      }
    } else {
      console.log("⚠️ Groq API nie jest skonfigurowane")
      console.log("🔄 Używam lokalnej bazy wiedzy...")
    }

    if (!response) {
      try {
        console.log("🧠 Używam lokalnej bazy wiedzy...")
        response = getLocalResponse(message)
        usedMethod = "local"
        console.log("✅ Lokalna baza wiedzy odpowiedziała pomyślnie")
      } catch (localError) {
        console.error("❌ Błąd lokalnej bazy wiedzy:", localError)
        response = "Przepraszam, wystąpił błąd. Spróbuj zadać pytanie ponownie lub skontaktuj się z administratorem."
        usedMethod = "fallback"
      }
    }

    console.log("🎉 Odpowiedź została wygenerowana pomyślnie!")
    console.log("📊 Metoda:", usedMethod)

    return NextResponse.json({
      message: response,
      success: true,
      method: usedMethod,
    })
  } catch (error) {
    console.error("💥 Krytyczny błąd podczas przetwarzania chatu:", error)

    const errorMessage = error instanceof Error ? error.message : "Nieznany błąd"

    const fallbackResponse =
      "Cześć! Jestem Sylph, asystent AI platformy Nexus. Obecnie mam problemy techniczne, ale nadal mogę pomóc! Zadaj mi pytanie o edukację, cele zrównoważonego rozwoju, metodyki nauczania lub narzędzia AI w edukacji. Postaram się odpowiedzieć na podstawie mojej wiedzy!"

    return NextResponse.json({
      message: fallbackResponse,
      success: true,
      method: "emergency_fallback",
      error: errorMessage,
    })
  }
}
