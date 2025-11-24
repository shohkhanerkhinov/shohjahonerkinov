import type { NextRequest } from "next/server"

const siteCounterStore: Record<
  string,
  {
    count: number
    visitedSessions: Map<string, number>
  }
> = {}

function initializeSite(siteId: string) {
  if (!siteCounterStore[siteId]) {
    siteCounterStore[siteId] = {
      count: 0,
      visitedSessions: new Map(),
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
    const { siteId, sessionId } = await request.json()

    if (!siteId || !sessionId) {
      return Response.json({ error: "siteId and sessionId required" }, { status: 400 })
    }

    initializeSite(siteId)

    if (siteCounterStore[siteId].visitedSessions.has(sessionId)) {
      return Response.json({
        count: siteCounterStore[siteId].count,
        alreadyCounted: true,
        timestamp: new Date().toISOString(),
      })
    }

    siteCounterStore[siteId].visitedSessions.set(sessionId, Date.now())
    siteCounterStore[siteId].count++

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
