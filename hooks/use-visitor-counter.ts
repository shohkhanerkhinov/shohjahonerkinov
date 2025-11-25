"use client"

import { useEffect, useState } from "react"

const STORAGE_KEY = "portfolio_visitor_count"
const SESSION_KEY = "portfolio_visitor_session"

export function useVisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Session ID yaratish - har qurilma/brauzer uchun unique
    const getSessionId = () => {
      let sessionId = sessionStorage.getItem(SESSION_KEY)
      if (!sessionId) {
        sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        sessionStorage.setItem(SESSION_KEY, sessionId)
      }
      return sessionId
    }

    const getLocalCount = (): number => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        return stored ? Number.parseInt(stored, 10) : 0
      } catch {
        return 0
      }
    }

    const setLocalCount = (count: number) => {
      try {
        localStorage.setItem(STORAGE_KEY, count.toString())
      } catch {
        // Ignore storage errors
      }
    }

    const sessionId = getSessionId()
    const localCount = getLocalCount()

    // API'dan visitor count'ni yangilash
    const updateVisitorCount = async () => {
      try {
        const response = await fetch("/api/counters/visitors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, clientCount: localCount }),
        })
        const data = await response.json()

        setVisitorCount(data.count)
        setLocalCount(data.count)
      } catch (error) {
        console.error("Visitor counter error:", error)
        // Fallback - localStorage'dan o'qish
        setVisitorCount(localCount)
      } finally {
        setLoading(false)
      }
    }

    updateVisitorCount()
  }, [])

  return visitorCount
}
