"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, LogOut, ChevronDown } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function UserProfile() {
  const { user, logout, isAuthenticated } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  if (!isAuthenticated || !user) return null

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 rounded-full bg-gray-800/50 px-4 py-2 text-white backdrop-blur-sm transition-colors hover:bg-gray-700/50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500">
          <User size={16} />
        </div>
        <span className="hidden sm:block">{user.name}</span>
        <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
      </motion.button>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            className="absolute right-0 top-12 w-48 rounded-lg bg-gray-900/95 p-2 backdrop-blur-md"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="border-b border-gray-700 px-3 py-2">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>

            <button
              onClick={() => {
                logout()
                setIsDropdownOpen(false)
              }}
              className="flex w-full items-center gap-2 rounded px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-gray-800/50 hover:text-white"
            >
              <LogOut size={16} />
              Chiqish
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
