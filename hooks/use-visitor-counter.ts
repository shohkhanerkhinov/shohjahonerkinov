"use client"

import { useEffect, useState } from "react"

export function useVisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Session ID yaratish - har qurilma/brauzer uchun unique
    const getSessionId = () => {
      let sessionId = sessionStorage.getItem("visitSessionId")
      if (!sessionId) {
        sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        sessionStorage.setItem("visitSessionId", sessionId)
      }
      return sessionId
    }

    const sessionId = getSessionId()

    // API'dan visitor count'ni yangilash
    const updateVisitorCount = async () => {
      try {
        const response = await fetch("/api/counters/visitors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        })
        const data = await response.json()
        setVisitorCount(data.count)
      } catch (error) {
        console.error("Visitor counter error:", error)
        // Fallback - localStorage'dan o'qish
        const storedCount = localStorage.getItem("portfolioVisitors")
        setVisitorCount(storedCount ? Number.parseInt(storedCount) : 0)
      } finally {
        setLoading(false)
      }
    }

    updateVisitorCount()
  }, [])

  return visitorCount
}
