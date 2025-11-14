"use server"

// Global site visitor counters (server-side)
const globalSiteCounters: { [key: string]: number } = {}
const siteVisitedSessions: { [key: string]: Set<string> } = {}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const siteId = searchParams.get("siteId")

  if (!siteId) {
    return Response.json(globalSiteCounters)
  }

  return Response.json({ count: globalSiteCounters[siteId] || 0 })
}

export async function POST(request: Request) {
  try {
    const { siteId, sessionId } = await request.json()

    // Initialize counters agar mavjud bo'lmasa
    if (!globalSiteCounters[siteId]) {
      globalSiteCounters[siteId] = 0
      siteVisitedSessions[siteId] = new Set<string>()
    }

    // Agar bu session allaqachon counted bo'lgan bo'lsa, qaytarish
    if (siteVisitedSessions[siteId].has(sessionId)) {
      return Response.json({
        count: globalSiteCounters[siteId],
        alreadyCounted: true,
      })
    }

    // Yangi visitor - counter qo'shish
    globalSiteCounters[siteId]++
    siteVisitedSessions[siteId].add(sessionId)

    return Response.json({
      count: globalSiteCounters[siteId],
      alreadyCounted: false,
    })
  } catch (error) {
    console.error("Error updating site count:", error)
    return Response.json({ error: "Failed to update count" }, { status: 500 })
  }
}
