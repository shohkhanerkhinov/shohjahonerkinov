"use client"

import { motion } from "framer-motion"
import ProtectedLink from "./protected-link"
import { useEffect, useState } from "react"

interface SiteCardProps {
  title: string
  description: string
  image: string
  link: string
  index: number
}

export default function SiteCard({ title, description, image, link, index }: SiteCardProps) {
  const [userCount, setUserCount] = useState(0)

  useEffect(() => {
    // localStorage'dan sayt uchun user count'ni o'qish
    const storedCount = localStorage.getItem(`site-${title}`)
    setUserCount(storedCount ? Number.parseInt(storedCount) : 0)
  }, [title])

  const handleVisit = () => {
    // User count'ni oshirish
    const currentCount = userCount + 1
    localStorage.setItem(`site-${title}`, currentCount.toString())
    setUserCount(currentCount)
  }

  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-purple-500/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      {/* Rasm */}
      <div className="relative h-48 overflow-hidden bg-gray-700">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="h-full w-full object-cover transition-transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>

      {/* Matn qismi */}
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
        <p className="mb-4 text-sm text-gray-400">{description}</p>

        {/* User count */}
        <div className="mb-4 flex items-center gap-2 text-sm text-purple-400">
          <div className="h-2 w-2 rounded-full bg-purple-400" />
          <span>{userCount} kishi foydalangan</span>
        </div>

        {/* Link tugmasi */}
        <ProtectedLink
          href={link}
          onClick={handleVisit}
          className="inline-block rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-105"
        >
          Saytni ochish
        </ProtectedLink>
      </div>
    </motion.div>
  )
}
