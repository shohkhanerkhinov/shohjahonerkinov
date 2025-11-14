"use client"

import { useEffect, useState } from "react"

export function useSiteCounter(siteTitle: string) {
  const [userCount, setUserCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Session ID yaratish
    const getSessionId = () => {
      let sessionId = sessionStorage.getItem(`site-session-${siteTitle}`)
      if (!sessionId) {
        sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        sessionStorage.setItem(`site-session-${siteTitle}`, sessionId)
      }
      return sessionId
    }

    const sessionId = getSessionId()

    // API'dan site count'ni yangilash
    const updateSiteCount = async () => {
      try {
        const response = await fetch("/api/counters/sites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ siteId: siteTitle, sessionId }),
        })
        const data = await response.json()
        setUserCount(data.count)
      } catch (error) {
        console.error(`Site counter error for ${siteTitle}:`, error)
        // Fallback
        const storedCount = localStorage.getItem(`site-${siteTitle}`)
        setUserCount(storedCount ? Number.parseInt(storedCount) : 0)
      } finally {
        setLoading(false)
      }
    }

    updateSiteCount()
  }, [siteTitle])

  return { userCount, loading }
}
