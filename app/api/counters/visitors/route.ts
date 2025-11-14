"use server"

// Global visitor counter (server-side)
let globalVisitorCount = 0
const visitedSessions = new Set<string>()

export async function GET() {
  return Response.json({ count: globalVisitorCount })
}

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json()

    // Agar bu session allaqachon counted bo'lgan bo'lsa, qaytarish
    if (visitedSessions.has(sessionId)) {
      return Response.json({ count: globalVisitorCount, alreadyCounted: true })
    }

    // Yangi visitor - counter qo'shish
    globalVisitorCount++
    visitedSessions.add(sessionId)

    return Response.json({ count: globalVisitorCount, alreadyCounted: false })
  } catch (error) {
    console.error("Error updating visitor count:", error)
    return Response.json({ error: "Failed to update count" }, { status: 500 })
  }
}
