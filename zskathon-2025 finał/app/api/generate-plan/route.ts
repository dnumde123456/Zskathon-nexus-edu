import { type NextRequest, NextResponse } from "next/server"
import { localAIPlanner } from "@/lib/local-ai-planner"
import Groq from "groq-sdk"

// Initialize Groq only if API key exists
let groq: Groq | null = null
if (process.env.GROQ_API_KEY) {
  try {
    groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    })
    console.log("✅ Groq API zainicjalizowane")
  } catch (error) {
    console.error("❌ Błąd inicjalizacji Groq API:", error)
    groq = null
  }
} else {
  console.log("⚠️ GROQ_API_KEY nie znalezione w zmiennych środowiskowych")
}

const SYSTEM_PROMPT = `Jesteś ekspertem w dziedzinie edukacji i planowania nauki dla uczniów szkół technicznych. Twoim zadaniem jest stworzenie szczegółowego, praktycznego planu nauki na podstawie podanych informacji.

WAŻNE ZASADY:
1. Plan musi być KONKRETNY i PRAKTYCZNY
2. Każde zadanie musi mieć KONKRETNĄ aktywność (nie ogólniki)
3. Harmonogram musi uwzględniać RZECZYWISTY czas nauki ucznia
4. Wskazówki mają być ACTIONABLE i sprawdzone
5. Zasoby mają być PRAWDZIWE i dostępne

Wygeneruj plan w formacie JSON zawierający:

{
  "personalizedMessage": "Spersonalizowana wiadomość powitalna z imieniem",
  "weeklySchedule": [
    {
      "day": "Nazwa dnia",
      "tasks": [
        {
          "time": "Konkretne godziny (np. 16:00-17:00)",
          "subject": "Konkretny przedmiot",
          "activity": "BARDZO KONKRETNA aktywność (np. 'Rozwiąż zadania 15-20 ze strony 45 podręcznika matematyki')",
          "priority": "high/medium/low"
        }
      ]
    }
  ],
  "studyTips": [
    "Konkretne, praktyczne wskazówki z technikami nauki"
  ],
  "motivationalQuotes": [
    "Inspirujące cytaty związane z edukacją i rozwojem"
  ],
  "resources": [
    {
      "name": "Konkretna nazwa zasobu",
      "type": "Typ zasobu (strona internetowa, aplikacja, książka)",
      "subject": "Przedmiot/dziedzina"
    }
  ]
}

PRZYKŁADY KONKRETNYCH AKTYWNOŚCI:
- "Przeczytaj rozdział 3.2 z podręcznika fizyki i zrób notatki"
- "Rozwiąż 10 równań kwadratowych z zestawu A"
- "Napisz program w Pythonie sortujący listę liczb"
- "Przeanalizuj fragment 'Lalki' - charakterystyka Wokulskiego"
- "Wykonaj ćwiczenia 1-5 z gramatyki angielskiej, unit 7"

Odpowiadaj TYLKO w formacie JSON, bez dodatkowych komentarzy.`

async function tryGroqAPI(formData: any): Promise<any> {
  if (!groq) {
    throw new Error("Groq API not available")
  }

  const userPrompt = `
Stwórz BARDZO SZCZEGÓŁOWY i PRAKTYCZNY plan nauki dla:

DANE UCZNIA:
- Imię: ${formData.name}
- Klasa: ${formData.grade} klasa technikum
- Przedmioty do nauki: ${formData.subjects}
- Cele edukacyjne: ${formData.goals}
- Dostępny czas dziennie: ${formData.timeAvailable} godzin
- Preferowany styl nauki: ${formData.learningStyle}
- Trudności w nauce: ${formData.challenges}

WYMAGANIA:
1. Stwórz harmonogram na 5 dni (poniedziałek-piątek)
2. Każdy dzień powinien mieć 2-4 konkretne zadania
3. Zadania muszą być BARDZO SZCZEGÓŁOWE (nie "nauka matematyki" ale "rozwiąż zadania 15-20 ze strony 45")
4. Uwzględnij dostępny czas ucznia
5. Dostosuj do stylu nauki i trudności
6. Dodaj konkretne zasoby edukacyjne (strony, aplikacje, narzędzia)
7. Wskazówki mają być praktyczne i sprawdzone
8. Plan ma być dla ucznia szkoły technicznej w Polsce

WAŻNE: Każda aktywność musi być tak konkretna, żeby uczeń wiedział dokładnie co ma robić!
`

  console.log("🤖 Próbuję użyć Groq API...")

  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
    model: "llama-3.1-70b-versatile",
    temperature: 0.3,
    max_tokens: 3000,
  })

  const aiResponse = completion.choices[0]?.message?.content

  if (!aiResponse) {
    throw new Error("Brak odpowiedzi od Groq API")
  }

  console.log("✅ Groq API odpowiedział pomyślnie")

  // Clean the response to ensure it's valid JSON
  let cleanedResponse = aiResponse.trim()

  // Remove any markdown formatting if present
  if (cleanedResponse.startsWith("```json")) {
    cleanedResponse = cleanedResponse.replace(/```json\n?/, "").replace(/\n?```$/, "")
  }
  if (cleanedResponse.startsWith("```")) {
    cleanedResponse = cleanedResponse.replace(/```\n?/, "").replace(/\n?```$/, "")
  }

  const plan = JSON.parse(cleanedResponse)

  // Validate the structure
  if (!plan.personalizedMessage || !plan.weeklySchedule || !Array.isArray(plan.weeklySchedule)) {
    throw new Error("Invalid plan structure from Groq")
  }

  // Ensure we have at least some content
  if (plan.weeklySchedule.length === 0) {
    throw new Error("Empty schedule from Groq")
  }

  return plan
}

export async function POST(request: NextRequest) {
  try {
    console.log("🚀 API Route: Otrzymano żądanie generowania planu")

    const formData = await request.json()
    console.log("📝 Dane formularza:", {
      name: formData.name,
      subjects: formData.subjects,
      grade: formData.grade,
      timeAvailable: formData.timeAvailable,
    })

    // Validate required fields
    if (!formData.name || !formData.subjects) {
      console.log("❌ Brak wymaganych pól")
      return NextResponse.json({ error: "Imię i przedmioty są wymagane" }, { status: 400 })
    }

    console.log("📚 Rozpoczynam generowanie planu nauki...")

    let plan: any = null
    let usedMethod = "unknown"

    // Strategy 1: Try Groq API first
    if (groq) {
      try {
        console.log("🤖 Próbuję użyć Groq API...")
        plan = await tryGroqAPI(formData)
        usedMethod = "groq"
        console.log("🎯 Użyto Groq API pomyślnie")
      } catch (groqError) {
        console.log("⚠️ Groq API nie działa:", groqError)
        console.log("🔄 Przełączam na lokalny AI...")
      }
    } else {
      console.log("⚠️ Groq API nie jest dostępne")
      console.log("🔄 Używam lokalnego AI...")
    }

    // Strategy 2: Use Local AI Planner (ALWAYS WORKS)
    if (!plan) {
      try {
        console.log("🧠 Używam lokalnego AI plannera...")

        const profile = {
          name: formData.name,
          grade: formData.grade || "3",
          subjects: formData.subjects.split(",").map((s: string) => s.trim()),
          goals: formData.goals || "Poprawa wyników w nauce",
          timeAvailable: Number.parseInt(formData.timeAvailable) || 2,
          learningStyle: formData.learningStyle || "visual",
          challenges: formData.challenges || "Brak szczególnych trudności",
        }

        console.log("👤 Profil ucznia:", profile)

        plan = localAIPlanner.generatePlan(profile)
        usedMethod = "local"
        console.log("✅ Lokalny AI wygenerował plan pomyślnie")
      } catch (localError) {
        console.error("❌ Błąd lokalnego AI:", localError)
        throw new Error("Wszystkie metody generowania planu zawiodły")
      }
    }

    // Add metadata about which method was used
    plan._metadata = {
      generatedBy: usedMethod,
      timestamp: new Date().toISOString(),
      version: "2.0",
    }

    console.log("🎉 Plan nauki został wygenerowany pomyślnie!")
    console.log("📊 Metoda:", usedMethod)
    console.log("📅 Dni w harmonogramie:", plan.weeklySchedule?.length || 0)
    console.log("💡 Wskazówki:", plan.studyTips?.length || 0)
    console.log("📚 Zasoby:", plan.resources?.length || 0)

    return NextResponse.json({
      plan,
      success: true,
      method: usedMethod,
    })
  } catch (error) {
    console.error("💥 Krytyczny błąd podczas generowania planu:", error)

    // Last resort: Ultra-simple fallback plan
    const fallbackPlan = {
      personalizedMessage: `Cześć ${"Uczniu"}! Przygotowałem dla Ciebie podstawowy plan nauki. Dostosuj go do swoich potrzeb!`,
      weeklySchedule: [
        {
          day: "Poniedziałek",
          tasks: [
            {
              time: "16:00-17:00",
              subject: "Matematyka",
              activity: "Przeczytaj rozdział z podręcznika i rozwiąż 10 zadań z podstawowych działań",
              priority: "high",
            },
            {
              time: "17:30-18:30",
              subject: "Fizyka",
              activity: "Powtórz wzory z mechaniki i rozwiąż 5 zadań z ruchu jednostajnego",
              priority: "medium",
            },
          ],
        },
        {
          day: "Wtorek",
          tasks: [
            {
              time: "16:00-17:30",
              subject: "Informatyka",
              activity: "Napisz prosty program w Pythonie - kalkulator podstawowych działań",
              priority: "high",
            },
          ],
        },
        {
          day: "Środa",
          tasks: [
            {
              time: "16:00-17:00",
              subject: "Język Polski",
              activity: "Przeczytaj rozdział lektury i napisz krótkie streszczenie",
              priority: "medium",
            },
            {
              time: "17:30-18:30",
              subject: "Język Angielski",
              activity: "Naucz się 20 nowych słówek i przećwicz Present Simple",
              priority: "medium",
            },
          ],
        },
        {
          day: "Czwartek",
          tasks: [
            {
              time: "16:00-17:00",
              subject: "Matematyka",
              activity: "Powtórz materiał z poniedziałku i rozwiąż dodatkowe zadania",
              priority: "high",
            },
            {
              time: "17:30-18:30",
              subject: "Chemia",
              activity: "Przeczytaj o układzie okresowym i zapamiętaj pierwsze 20 pierwiastków",
              priority: "low",
            },
          ],
        },
        {
          day: "Piątek",
          tasks: [
            {
              time: "16:00-17:00",
              subject: "Powtórki",
              activity: "Przejrzyj notatki z całego tygodnia i przygotuj się na sprawdziany",
              priority: "medium",
            },
            {
              time: "17:30-18:30",
              subject: "Planowanie",
              activity: "Zaplanuj naukę na następny tydzień i oceń postępy",
              priority: "low",
            },
          ],
        },
      ],
      studyTips: [
        "Używaj techniki Pomodoro - 25 minut nauki, 5 minut przerwy",
        "Rób regularne powtórki materiału co 3 dni",
        "Znajdź spokojne miejsce do nauki bez rozpraszaczy",
        "Planuj naukę w stałych godzinach każdego dnia",
        "Rób notatki ręcznie dla lepszego zapamiętywania",
        "Nagradzaj się po ukończeniu każdej sesji nauki",
      ],
      motivationalQuotes: [
        '"Każdy ekspert był kiedyś początkującym" - Helen Hayes',
        '"Sukces to suma małych wysiłków powtarzanych dzień po dniu" - Robert Collier',
        '"Edukacja to najpotężniejsza broń, którą możesz użyć, aby zmienić świat" - Nelson Mandela',
      ],
      resources: [
        { name: "Khan Academy", type: "Platforma edukacyjna", subject: "Matematyka, Fizyka" },
        { name: "YouTube EDU", type: "Filmy edukacyjne", subject: "Wszystkie przedmioty" },
        { name: "Quizlet", type: "Flashcards i testy", subject: "Wszystkie przedmioty" },
        { name: "Duolingo", type: "Nauka języków", subject: "Języki obce" },
        { name: "Photomath", type: "Pomoc z matematyką", subject: "Matematyka" },
        { name: "Codecademy", type: "Nauka programowania", subject: "Informatyka" },
      ],
      _metadata: {
        generatedBy: "fallback",
        timestamp: new Date().toISOString(),
        version: "1.0",
      },
    }

    console.log("🆘 Używam awaryjnego planu")

    return NextResponse.json({
      plan: fallbackPlan,
      success: true,
      method: "fallback",
      warning: "Użyto podstawowego planu z powodu błędów API",
    })
  }
}
