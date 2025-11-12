"use client"

import { useEffect, useState } from "react"

export function useSiteCounter(siteTitle: string) {
  const [userCount, setUserCount] = useState<number | null>(null)
  const [hasVisited, setHasVisited] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCount = localStorage.getItem(`site-${siteTitle}`)
      setUserCount(storedCount ? Number.parseInt(storedCount) : 0)

      const visitedInSession = sessionStorage.getItem(`site-visited-${siteTitle}`)
      setHasVisited(!!visitedInSession)
    }
  }, [siteTitle])

  const incrementVisitorCount = () => {
    if (!hasVisited && typeof window !== "undefined") {
      const currentCount = (userCount ?? 0) + 1
      localStorage.setItem(`site-${siteTitle}`, currentCount.toString())
      sessionStorage.setItem(`site-visited-${siteTitle}`, "true")
      setUserCount(currentCount)
      setHasVisited(true)
    }
  }

  return { userCount: userCount ?? 0, incrementVisitorCount }
}
