import type { NextRequest } from "next/server"

const siteCounterStore: Record<
  string,
  {
    count: number
    visitedSessions: Set<string>
  }
> = {}

function initializeSite(siteId: string) {
  if (!siteCounterStore[siteId]) {
    siteCounterStore[siteId] = {
      count: 0,
      visitedSessions: new Set(),
    }
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const siteId = searchParams.get("siteId")

  if (!siteId) {
    return Response.json({ error: "siteId required" }, { status: 400 })
  }

  initializeSite(siteId)
  return Response.json({
    count: siteCounterStore[siteId].count,
    timestamp: new Date().toISOString(),
  })
}

export async function POST(request: NextRequest) {
  try {
    const { siteId, sessionId, clientCount } = await request.json()

    if (!siteId || !sessionId) {
      return Response.json({ error: "siteId and sessionId required" }, { status: 400 })
    }

    initializeSite(siteId)

    if (clientCount && typeof clientCount === "number" && clientCount > siteCounterStore[siteId].count) {
      siteCounterStore[siteId].count = clientCount
    }

    // Agar bu session allaqachon sanab bo'lgan bo'lsa, qayta qo'shmaymiz
    if (siteCounterStore[siteId].visitedSessions.has(sessionId)) {
      return Response.json({
        count: siteCounterStore[siteId].count,
        alreadyCounted: true,
        timestamp: new Date().toISOString(),
      })
    }

    // Yangi session - counter'ni oshiramiz
    siteCounterStore[siteId].visitedSessions.add(sessionId)
    siteCounterStore[siteId].count++

    if (siteCounterStore[siteId].visitedSessions.size > 5000) {
      const sessionsArray = Array.from(siteCounterStore[siteId].visitedSessions)
      siteCounterStore[siteId].visitedSessions = new Set(sessionsArray.slice(-2500))
    }

    return Response.json({
      count: siteCounterStore[siteId].count,
      alreadyCounted: false,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Site counter error:", error)
    return Response.json({ error: "Failed to update count" }, { status: 500 })
  }
}
