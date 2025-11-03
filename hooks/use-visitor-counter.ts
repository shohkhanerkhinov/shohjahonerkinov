"use client"

import { useEffect, useState } from "react"

export function useVisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(0)

  useEffect(() => {
    const sessionKey = "portfolioSessionCounted"
    const alreadyCounted = sessionStorage.getItem(sessionKey)

    if (!alreadyCounted) {
      // Birinchi marta - counter qo'shish
      const storedCount = localStorage.getItem("portfolioVisitors")
      const currentCount = storedCount ? Number.parseInt(storedCount) : 0
      const newCount = currentCount + 1

      localStorage.setItem("portfolioVisitors", newCount.toString())
      sessionStorage.setItem(sessionKey, "true")
      setVisitorCount(newCount)
    } else {
      // Allaqachon hisoblanib bo'lgan - faqat o'qish
      const storedCount = localStorage.getItem("portfolioVisitors")
      const currentCount = storedCount ? Number.parseInt(storedCount) : 0
      setVisitorCount(currentCount)
    }
  }, [])

  return visitorCount
}
