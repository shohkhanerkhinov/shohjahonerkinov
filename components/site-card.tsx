"use client"

import { motion } from "framer-motion"
import ProtectedLink from "./protected-link"
import { useSiteCounter } from "@/hooks/use-site-counter"

interface SiteCardProps {
  title: string
  description: string
  image: string
  link: string
  index: number
}

export default function SiteCard({ title, description, image, link, index }: SiteCardProps) {
  const { userCount } = useSiteCounter(title)

  const handleClick = () => {
    // API avtomatik oldindan yangilangan, bu yerda xech narsa qilmasak bo'ladi
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
          src={image || "/placeholder.svg?height=192&width=400&query=education"}
          alt={title}
          className="h-full w-full object-cover transition-transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>

      {/* Matn qismi */}
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
        <p className="mb-4 text-sm text-gray-400">{description}</p>

        <div className="mb-4 flex items-center gap-2 text-sm text-purple-400">
          <div className="h-2 w-2 rounded-full bg-purple-400" />
          <span>{userCount === 0 ? "..." : userCount} kishi foydalangan</span>
        </div>

        {/* Link tugmasi */}
        <ProtectedLink
          href={link}
          onClick={handleClick}
          className="inline-block rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-105"
        >
          Saytni ochish
        </ProtectedLink>
      </div>
    </motion.div>
  )
}
