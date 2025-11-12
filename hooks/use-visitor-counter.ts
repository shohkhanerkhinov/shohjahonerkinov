"use client"

import { useEffect, useState } from "react"

export function useVisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(0)

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("portfolioVisited")

    if (!hasVisited) {
      // Birinchi marta: counter qo'shish
      const storedCount = localStorage.getItem("portfolioVisitors")
      const currentCount = storedCount ? Number.parseInt(storedCount) : 0
      const newCount = currentCount + 1

      localStorage.setItem("portfolioVisitors", newCount.toString())
      sessionStorage.setItem("portfolioVisited", "true")
      setVisitorCount(newCount)
    } else {
      // Keyingi marta: localStorage'dan o'qish, qo'shmaslik
      const storedCount = localStorage.getItem("portfolioVisitors")
      const currentCount = storedCount ? Number.parseInt(storedCount) : 0
      setVisitorCount(currentCount)
    }
  }, [])

  return visitorCount
}
