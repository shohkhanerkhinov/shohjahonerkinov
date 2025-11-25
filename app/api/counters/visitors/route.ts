import type { NextRequest } from "next/server"

// Server xotirasida saqlanadi
const counterStore = {
  visitors: 0,
  visitedSessions: new Set<string>(),
  lastSync: 0,
}

export async function GET() {
  return Response.json({
    count: counterStore.visitors,
    timestamp: new Date().toISOString(),
  })
}

export async function POST(request: NextRequest) {
  try {
    const { sessionId, clientCount } = await request.json()

    if (!sessionId) {
      return Response.json({ error: "sessionId required" }, { status: 400 })
    }

    // Bu server restart bo'lganda localStorage'dan tiklanishga yordam beradi
    if (clientCount && typeof clientCount === "number" && clientCount > counterStore.visitors) {
      counterStore.visitors = clientCount
    }

    // Agar bu session allaqachon sanab bo'lgan bo'lsa, qayta qo'shmaymiz
    if (counterStore.visitedSessions.has(sessionId)) {
      return Response.json({
        count: counterStore.visitors,
        alreadyCounted: true,
      })
    }

    // Yangi session - counter'ni oshiramiz
    counterStore.visitedSessions.add(sessionId)
    counterStore.visitors++

    if (counterStore.visitedSessions.size > 10000) {
      const sessionsArray = Array.from(counterStore.visitedSessions)
      counterStore.visitedSessions = new Set(sessionsArray.slice(-5000))
    }

    return Response.json({
      count: counterStore.visitors,
      alreadyCounted: false,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Visitor counter error:", error)
    return Response.json({ error: "Failed to update count" }, { status: 500 })
  }
}
