"use client"

import { useEffect, useState } from "react"

const STORAGE_PREFIX = "portfolio_site_count_"
const SESSION_PREFIX = "portfolio_site_session_"

export function useSiteCounter(siteTitle: string) {
  const [userCount, setUserCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Session ID yaratish
    const getSessionId = () => {
      const key = `${SESSION_PREFIX}${siteTitle}`
      let sessionId = sessionStorage.getItem(key)
      if (!sessionId) {
        sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        sessionStorage.setItem(key, sessionId)
      }
      return sessionId
    }

    const getLocalCount = (): number => {
      try {
        const stored = localStorage.getItem(`${STORAGE_PREFIX}${siteTitle}`)
        return stored ? Number.parseInt(stored, 10) : 0
      } catch {
        return 0
      }
    }

    const setLocalCount = (count: number) => {
      try {
        localStorage.setItem(`${STORAGE_PREFIX}${siteTitle}`, count.toString())
      } catch {
        // Ignore storage errors
      }
    }

    const sessionId = getSessionId()
    const localCount = getLocalCount()

    // API'dan site count'ni yangilash
    const updateSiteCount = async () => {
      try {
        const response = await fetch("/api/counters/sites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            siteId: siteTitle,
            sessionId,
            clientCount: localCount,
          }),
        })
        const data = await response.json()

        setUserCount(data.count)
        setLocalCount(data.count)
      } catch (error) {
        console.error(`Site counter error for ${siteTitle}:`, error)
        // Fallback
        setUserCount(localCount)
      } finally {
        setLoading(false)
      }
    }

    updateSiteCount()
  }, [siteTitle])

  return { userCount, loading }
}
