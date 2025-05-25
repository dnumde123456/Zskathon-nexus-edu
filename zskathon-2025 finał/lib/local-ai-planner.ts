interface StudentProfile {
  name: string
  grade: string
  subjects: string[]
  goals: string
  timeAvailable: number
  learningStyle: string
  challenges: string
}

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
}

export class LocalAIPlanner {
  private subjectActivities: Record<string, string[]> = {
    matematyka: [
      "Rozwiąż równania kwadratowe z zestawu A (zadania 1-15)",
      "Przeanalizuj funkcje liniowe - narysuj wykresy dla 5 funkcji",
      "Wykonaj ćwiczenia z geometrii analitycznej (strona 45-50)",
      "Powtórz wzory skróconego mnożenia i rozwiąż 20 zadań",
      "Przygotuj się do sprawdzianu - rozwiąż test próbny",
      "Zrób notatki z trygonometrii i zapamiętaj podstawowe wzory",
      "Rozwiąż zadania tekstowe z procentów (10 zadań)",
      "Przećwicz działania na potęgach i pierwiastkach",
      "Wykonaj zadania z ciągów arytmetycznych i geometrycznych",
      "Przeanalizuj nierówności kwadratowe (5 przykładów)",
    ],
    fizyka: [
      "Rozwiąż zadania z mechaniki - ruch jednostajny (zadania 1-10)",
      "Przeanalizuj prawa Newtona i rozwiąż 5 problemów praktycznych",
      "Wykonaj ćwiczenia z optyki - soczewki i zwierciadła",
      "Powtórz wzory na energię kinetyczną i potencjalną",
      "Przygotuj eksperyment z wahadłem matematycznym",
      "Zrób notatki z elektrostatyki i praw Coulomba",
      "Rozwiąż zadania z termodynamiki (ciepło właściwe)",
      "Przećwicz obliczenia z fal dźwiękowych",
      "Wykonaj zadania z pola magnetycznego",
      "Przeanalizuj obwody elektryczne (prawo Ohma)",
    ],
    informatyka: [
      "Napisz program w Pythonie sortujący listę liczb (bubble sort)",
      "Stwórz prostą stronę HTML z formularzem kontaktowym",
      "Przećwicz pętle for i while - rozwiąż 10 zadań",
      "Zaimplementuj algorytm wyszukiwania binarnego",
      "Stwórz bazę danych SQLite z tabelą uczniów",
      "Napisz funkcję rekurencyjną obliczającą silnię",
      "Przećwicz CSS - stylizuj stronę internetową",
      "Zrób projekt: kalkulator w JavaScript",
      "Napisz program do zarządzania listą zadań",
      "Stwórz prostą grę w Pythonie (np. zgadywanie liczb)",
    ],
    "język polski": [
      "Przeczytaj rozdział 3 lektury i zrób notatki o bohaterach",
      "Napisz rozprawkę na temat 'Rola kobiety w literaturze romantyzmu'",
      "Przeanalizuj środki stylistyczne w wierszu Mickiewicza",
      "Powtórz zasady ortografii - ć/ci, ż/rz (test 50 słów)",
      "Przygotuj prezentację o epoce oświecenia (10 slajdów)",
      "Napisz charakterystykę literacką głównego bohatera",
      "Przećwicz interpunkcję - popraw 20 zdań",
      "Zrób plan rozprawki o tematyce patriotycznej",
      "Przeanalizuj motyw miłości w literaturze polskiej",
      "Napisz recenzję przeczytanej książki (300 słów)",
    ],
    "język angielski": [
      "Przećwicz Present Perfect - wykonaj ćwiczenia 1-20",
      "Naucz się 30 nowych słówek z działu 'Technology'",
      "Napisz email formalny do pracodawcy (150 słów)",
      "Przeczytaj tekst o kulturze brytyjskiej i odpowiedz na pytania",
      "Przećwicz wymowę - nagraj się czytając dialog",
      "Zrób test gramatyczny z czasów przeszłych",
      "Napisz krótkie opowiadanie używając Past Continuous",
      "Przygotuj prezentację o swoich planach na przyszłość",
      "Przećwicz conditional sentences (tryb warunkowy)",
      "Napisz list nieformalny do przyjaciela (120 słów)",
    ],
    chemia: [
      "Napisz równania reakcji kwasów z zasadami (10 przykładów)",
      "Przećwicz nazewnictwo związków organicznych",
      "Rozwiąż zadania stechiometryczne z molami",
      "Zrób notatki o układzie okresowym pierwiastków",
      "Przygotuj eksperyment z wskaźnikami pH",
      "Przeanalizuj wiązania chemiczne w 5 cząsteczkach",
      "Rozwiąż zadania z termochemii (entalpia)",
      "Powtórz wzory strukturalne węglowodanów",
      "Wykonaj zadania z kinetyki chemicznej",
      "Przeanalizuj równowagę chemiczną (5 przykładów)",
    ],
    biologia: [
      "Przeczytaj rozdział o fotosyntez i zrób schemat procesu",
      "Przeanalizuj budowę komórki roślinnej i zwierzęcej",
      "Rozwiąż zadania z genetyki - krzyżówki mendlowskie",
      "Zrób notatki o układzie krążenia człowieka",
      "Przygotuj prezentację o ekosystemach leśnych",
      "Przećwicz nazewnictwo systematyczne organizmów",
      "Wykonaj zadania z biochemii - enzymy i metabolizm",
      "Przeanalizuj proces ewolucji (teoria Darwina)",
    ],
    geografia: [
      "Przeanalizuj mapę klimatyczną Polski",
      "Zrób notatki o procesach geologicznych",
      "Rozwiąż zadania z kartografii - skala i odległości",
      "Przygotuj prezentację o krajach Unii Europejskiej",
      "Przećwicz nazwy stolic i największych miast świata",
      "Wykonaj zadania z geografii ekonomicznej",
      "Przeanalizuj problemy środowiskowe współczesnego świata",
      "Zrób schemat obiegu wody w przyrodzie",
    ],
    historia: [
      "Przeczytaj rozdział o II wojnie światowej",
      "Przygotuj oś czasu - najważniejsze wydarzenia XX wieku",
      "Przeanalizuj przyczyny i skutki rewolucji francuskiej",
      "Zrób notatki o kulturze starożytnej Grecji",
      "Napisz esej o znaczeniu odkryć geograficznych",
      "Przećwicz daty - najważniejsze wydarzenia w historii Polski",
      "Przygotuj prezentację o życiu codziennym w średniowieczu",
      "Przeanalizuj przemiany społeczne w XIX wieku",
    ],
  }

  private learningStyleActivities: Record<string, string[]> = {
    visual: [
      "Stwórz mapę myśli z kluczowymi pojęciami",
      "Narysuj diagramy i schematy",
      "Użyj kolorowych markerów do oznaczania ważnych informacji",
      "Obejrzyj filmy edukacyjne na YouTube",
      "Stwórz flashcards z obrazkami",
      "Rysuj podczas nauki dla lepszego zapamiętywania",
    ],
    auditory: [
      "Nagraj się podczas czytania notatek i odsłuchaj",
      "Dyskutuj materiał z kolegami z klasy",
      "Słuchaj podcastów edukacyjnych",
      "Powtarzaj głośno kluczowe informacje",
      "Uczesticz w grupach studyjnych",
      "Słuchaj muzyki klasycznej podczas nauki",
    ],
    kinesthetic: [
      "Rób przerwy co 25 minut i się poruszaj",
      "Używaj manipulatywów podczas nauki matematyki",
      "Przeprowadzaj eksperymenty praktyczne",
      "Pisz notatki ręcznie zamiast na komputerze",
      "Ucz się chodząc po pokoju",
      "Używaj gestów do zapamiętywania informacji",
    ],
    reading: [
      "Rób szczegółowe notatki podczas czytania",
      "Twórz streszczenia każdego rozdziału",
      "Używaj techniki SQ3R (Survey, Question, Read, Recite, Review)",
      "Czytaj dodatkowe materiały źródłowe",
      "Pisz eseje i rozprawki dla utrwalenia wiedzy",
      "Prowadź dziennik nauki z refleksjami",
    ],
  }

  private studyTipsByTime: Record<number, string[]> = {
    1: [
      "Skup się na najważniejszych tematach - ustal priorytety",
      "Używaj techniki Pomodoro - 25 min nauki, 5 min przerwy",
      "Wybierz jeden przedmiot dziennie i skoncentruj się na nim",
      "Rób krótkie, ale intensywne sesje nauki",
      "Przygotuj wszystkie materiały przed rozpoczęciem nauki",
    ],
    2: [
      "Podziel czas na dwa bloki po 50 minut z przerwą",
      "Pierwszy blok na najtrudniejszy przedmiot",
      "Drugi blok na powtórki i utrwalanie",
      "Zostaw 20 minut na planowanie następnego dnia",
      "Rób aktywne przerwy - spacer lub rozciąganie",
    ],
    3: [
      "Podziel na trzy sesje po godzinie z przerwami",
      "Rano - nowy materiał (najlepsza koncentracja)",
      "Popołudnie - ćwiczenia praktyczne",
      "Wieczorem - powtórki i utrwalanie",
      "Zaplanuj 15-minutowe przerwy między sesjami",
    ],
    4: [
      "Stwórz szczegółowy harmonogram z przerwami",
      "2 godziny rano na najtrudniejsze przedmioty",
      "1 godzina po obiedzie na ćwiczenia",
      "1 godzina wieczorem na powtórki i przygotowanie zadań",
      "Włącz 30-minutową przerwę na posiłek i relaks",
    ],
  }

  private motivationalQuotes = [
    '"Każdy ekspert był kiedyś początkującym" - Helen Hayes',
    '"Sukces to suma małych wysiłków powtarzanych dzień po dniu" - Robert Collier',
    '"Edukacja to najpotężniejsza broń, którą możesz użyć, aby zmienić świat" - Nelson Mandela',
    '"Nie bój się iść powoli, bój się tylko stać w miejscu" - Chińskie przysłowie',
    '"Inwestycja w wiedzę przynosi najlepsze odsetki" - Benjamin Franklin',
    '"Przyszłość należy do tych, którzy wierzą w piękno swoich marzeń" - Eleanor Roosevelt',
    '"Jedyną niemożliwą podróżą jest ta, której nigdy nie rozpoczniesz" - Tony Robbins',
    '"Nauka to skarb, który będzie podążał za swoim właścicielem wszędzie" - Chińskie przysłowie',
    '"Motywacja to to, co pozwala ci zacząć. Nawyk to to, co pozwala ci kontynuować" - Jim Ryun',
    '"Nie czekaj na idealny moment. Weź moment i uczyń go idealnym" - Zoey Sayward',
  ]

  private resources = [
    { name: "Khan Academy", type: "Platforma edukacyjna online", subject: "Matematyka, Fizyka, Informatyka" },
    { name: "Coursera", type: "Kursy online", subject: "Wszystkie przedmioty" },
    { name: "YouTube EDU", type: "Filmy edukacyjne", subject: "Wszystkie przedmioty" },
    { name: "Wolfram Alpha", type: "Kalkulator matematyczny", subject: "Matematyka, Fizyka" },
    { name: "Duolingo", type: "Aplikacja do nauki języków", subject: "Języki obce" },
    { name: "Quizlet", type: "Flashcards i testy", subject: "Wszystkie przedmioty" },
    { name: "PhET Simulations", type: "Symulacje fizyczne", subject: "Fizyka, Chemia" },
    { name: "Codecademy", type: "Nauka programowania", subject: "Informatyka" },
    { name: "Anki", type: "Aplikacja do powtórek", subject: "Wszystkie przedmioty" },
    { name: "Photomath", type: "Rozwiązywanie zadań matematycznych", subject: "Matematyka" },
    { name: "Brilliant", type: "Interaktywne kursy STEM", subject: "Matematyka, Fizyka, Informatyka" },
    { name: "Memrise", type: "Nauka słówek", subject: "Języki obce" },
  ]

  generatePlan(profile: StudentProfile): StudyPlan {
    console.log("🧠 LocalAIPlanner: Rozpoczynam generowanie planu dla", profile.name)

    const subjects = this.parseSubjects(profile.subjects)
    const timePerDay = profile.timeAvailable || 2

    console.log("📚 Przedmioty:", subjects)
    console.log("⏰ Czas dziennie:", timePerDay, "godzin")

    const plan = {
      personalizedMessage: this.generatePersonalizedMessage(profile),
      weeklySchedule: this.generateWeeklySchedule(subjects, timePerDay, profile),
      studyTips: this.generateStudyTips(profile),
      motivationalQuotes: this.selectMotivationalQuotes(),
      resources: this.selectRelevantResources(subjects),
    }

    console.log("✅ LocalAIPlanner: Plan wygenerowany pomyślnie")
    console.log("📅 Dni w harmonogramie:", plan.weeklySchedule.length)

    return plan
  }

  private parseSubjects(subjectsInput: string[] | string): string[] {
    if (Array.isArray(subjectsInput)) {
      return subjectsInput.map((s) => s.toLowerCase().trim()).filter((s) => s.length > 0)
    }

    return subjectsInput
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter((s) => s.length > 0)
  }

  private generatePersonalizedMessage(profile: StudentProfile): string {
    const timeMessages = {
      1: "Widzę, że masz ograniczony czas, ale to nie problem! Skoncentrujemy się na najważniejszych rzeczach.",
      2: "Dwie godziny dziennie to świetna podstawa do systematycznej nauki.",
      3: "Trzy godziny dziennie dają nam dużo możliwości - stworzymy zrównoważony plan.",
      4: "Z czterema godzinami dziennie możemy naprawdę pogłębić Twoją wiedzę!",
    }

    const styleMessages = {
      visual: "Jako osoba ucząca się wzrokowo, będziemy używać dużo diagramów i map myśli.",
      auditory: "Skoro najlepiej uczysz się słuchając, włączymy nagrania i dyskusje.",
      kinesthetic: "Jako kinesteta, będziemy łączyć naukę z aktywnością fizyczną.",
      reading: "Jako miłośnik czytania, przygotowałem dużo materiałów tekstowych.",
    }

    const time = profile.timeAvailable || 2
    const timeMsg = timeMessages[time as keyof typeof timeMessages] || timeMessages[2]
    const styleMsg = styleMessages[profile.learningStyle as keyof typeof styleMessages] || ""

    return `Cześć ${profile.name}! 🎓 Przygotowałem dla Ciebie spersonalizowany plan nauki. ${timeMsg} ${styleMsg} Razem osiągniemy Twoje cele: ${profile.goals || "sukces w nauce"}. Zaczynamy!`
  }

  private generateWeeklySchedule(subjects: string[], timePerDay: number, profile: StudentProfile): DaySchedule[] {
    const days = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek"]
    const schedule: DaySchedule[] = []

    console.log("📅 Generuję harmonogram dla", days.length, "dni")

    days.forEach((day, dayIndex) => {
      const tasks = this.generateDayTasks(subjects, timePerDay, dayIndex, profile)
      schedule.push({ day, tasks })
      console.log(`📝 ${day}: ${tasks.length} zadań`)
    })

    return schedule
  }

  private generateDayTasks(subjects: string[], timePerDay: number, dayIndex: number, profile: StudentProfile): Task[] {
    const tasks: Task[] = []
    const startHour = 16 // Start at 4 PM

    if (subjects.length === 0) {
      console.warn("⚠️ Brak przedmiotów do nauki")
      return []
    }

    // Distribute time among subjects
    const timeSlots = this.distributeTimeSlots(timePerDay, subjects.length)
    let currentHour = startHour

    subjects.forEach((subject, index) => {
      if (timeSlots[index] > 0) {
        const activity = this.selectActivity(subject, dayIndex, profile)
        const priority = this.determinePriority(subject, profile.goals)

        const endHour = currentHour + timeSlots[index]
        const timeRange = `${currentHour.toString().padStart(2, "0")}:00-${endHour.toString().padStart(2, "0")}:00`

        tasks.push({
          time: timeRange,
          subject: this.capitalizeSubject(subject),
          activity,
          priority,
        })

        currentHour = endHour + 0.5 // 30 min break
      }
    })

    // Add learning style specific activity
    if (tasks.length > 0 && profile.learningStyle) {
      const styleActivity = this.getLearningStyleActivity(profile.learningStyle)
      if (styleActivity) {
        tasks[0].activity += ` ${styleActivity}`
      }
    }

    return tasks
  }

  private distributeTimeSlots(totalTime: number, subjectCount: number): number[] {
    if (subjectCount === 0) return []

    const baseTime = Math.floor(totalTime / subjectCount)
    const remainder = totalTime % subjectCount

    const slots = new Array(subjectCount).fill(baseTime)

    // Distribute remainder to first subjects
    for (let i = 0; i < remainder; i++) {
      slots[i] += 1
    }

    return slots
  }

  private selectActivity(subject: string, dayIndex: number, profile: StudentProfile): string {
    const activities = this.subjectActivities[subject] || [
      "Przeczytaj materiał z podręcznika i zrób notatki",
      "Rozwiąż zadania praktyczne z zestawu ćwiczeń",
      "Powtórz materiał z poprzednich lekcji",
      "Przygotuj się do sprawdzianu lub kartkówki",
      "Wykonaj projekt lub pracę domową",
    ]

    // Select activity based on day to ensure variety
    const activityIndex = (dayIndex * 2) % activities.length
    return activities[activityIndex]
  }

  private determinePriority(subject: string, goals: string): "high" | "medium" | "low" {
    const goalsLower = goals.toLowerCase()
    const subjectLower = subject.toLowerCase()

    if (goalsLower.includes(subjectLower) || goalsLower.includes("egzamin") || goalsLower.includes("matura")) {
      return "high"
    }

    if (["matematyka", "fizyka", "informatyka"].includes(subjectLower)) {
      return "high"
    }

    return Math.random() > 0.5 ? "medium" : "low"
  }

  private capitalizeSubject(subject: string): string {
    return subject.charAt(0).toUpperCase() + subject.slice(1)
  }

  private getLearningStyleActivity(style: string): string {
    const activities = this.learningStyleActivities[style] || []
    if (activities.length === 0) return ""

    const randomIndex = Math.floor(Math.random() * activities.length)
    return `(${activities[randomIndex]})`
  }

  private generateStudyTips(profile: StudentProfile): string[] {
    const timeBasedTips = this.studyTipsByTime[profile.timeAvailable || 2] || this.studyTipsByTime[2]
    const styleBasedTips = this.learningStyleActivities[profile.learningStyle] || []
    const challengeTips = this.getChallengeSpecificTips(profile.challenges)

    return [...timeBasedTips.slice(0, 2), ...styleBasedTips.slice(0, 2), ...challengeTips.slice(0, 2)].filter(
      (tip) => tip && tip.length > 0,
    )
  }

  private getChallengeSpecificTips(challenges: string): string[] {
    const challengesLower = challenges.toLowerCase()
    const tips: string[] = []

    if (challengesLower.includes("koncentracja")) {
      tips.push("Usuń wszystkie rozpraszacze - telefon, social media, hałas")
      tips.push("Zacznij od 15-minutowych sesji i stopniowo wydłużaj czas")
    }

    if (challengesLower.includes("motywacja")) {
      tips.push("Ustaw małe, osiągalne cele dzienne")
      tips.push("Nagradzaj się po ukończeniu każdej sesji nauki")
    }

    if (challengesLower.includes("matematyka")) {
      tips.push("Rozwiązuj zadania krok po kroku, nie przeskakuj etapów")
      tips.push("Używaj kalkulatora tylko do sprawdzenia wyników")
    }

    if (challengesLower.includes("czas")) {
      tips.push("Planuj naukę w kalendarzu jak ważne spotkanie")
      tips.push("Przygotuj materiały wieczorem na następny dzień")
    }

    return tips.length > 0
      ? tips
      : ["Rób regularne przerwy co 45-60 minut", "Znajdź spokojne miejsce do nauki bez rozpraszaczy"]
  }

  private selectMotivationalQuotes(): string[] {
    const shuffled = [...this.motivationalQuotes].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 3)
  }

  private selectRelevantResources(subjects: string[]): Array<{ name: string; type: string; subject: string }> {
    const relevant = this.resources.filter((resource) => {
      return subjects.some(
        (subject) => resource.subject.toLowerCase().includes(subject) || resource.subject.includes("Wszystkie"),
      )
    })

    // Add some general resources
    const general = this.resources.filter((r) => r.subject.includes("Wszystkie"))

    return [...relevant, ...general].slice(0, 6)
  }
}

export const localAIPlanner = new LocalAIPlanner()
