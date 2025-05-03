"use client"

import { motion } from "framer-motion"

interface SideMenuProps {
  sections: { id: string; label: string }[]
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function SideMenu({ sections, activeSection, setActiveSection }: SideMenuProps) {
  return (
    <motion.div
      className="flex h-full w-64 md:w-56 sm:w-48 w-40 flex-col bg-gray-900/50 p-6 backdrop-blur-md"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="mb-12">
        <motion.h1
          className="text-xl sm:text-2xl md:text-3xl font-bold text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          My Portfolio
        </motion.h1>
      </div>

      <nav className="flex-1">
        <ul className="space-y-4">
          {sections.map((section, index) => (
            <motion.li
              key={section.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <button
                onClick={() => setActiveSection(section.id)}
                className={`group relative w-full text-left text-lg font-medium transition-colors ${activeSection === section.id ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
              >
                {activeSection === section.id && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute -left-6 top-1/2 h-4 w-1 -translate-y-1/2 rounded-full bg-gradient-to-b from-purple-500 to-pink-500"
                  />
                )}
                {section.label}
              </button>
            </motion.li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto">
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <a href="#" className="hover:text-white">
            GitHub
          </a>
          <a href="#" className="hover:text-white">
            LinkedIn
          </a>
          <a href="#" className="hover:text-white">
            Twitter
          </a>
        </motion.div>
      </div>
    </motion.div>
  )
}
