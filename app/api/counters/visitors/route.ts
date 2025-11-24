import type { NextRequest } from "next/server"

const counterStore = {
  visitors: 0,
  visitedSessions: new Map<string, number>(),
}

export async function GET() {
  return Response.json({
    count: counterStore.visitors,
    timestamp: new Date().toISOString(),
  })
}

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      return Response.json({ error: "sessionId required" }, { status: 400 })
    }

    if (counterStore.visitedSessions.has(sessionId)) {
      return Response.json({
        count: counterStore.visitors,
        alreadyCounted: true,
      })
    }

    counterStore.visitedSessions.set(sessionId, Date.now())
    counterStore.visitors++

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
