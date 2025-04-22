"use client"

import { motion } from "framer-motion"
import { User, Mail, MapPin, Calendar } from "lucide-react"

export default function About() {
  return (
    <div className="h-full">
      <motion.h2
        className="mb-8 text-3xl font-bold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About Me
      </motion.h2>

      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-6 flex justify-center">
            <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-purple-500/30">
              <img src="/placeholder.svg?height=128&width=128" alt="Profile" className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-purple-400" />
              <span>John Doe</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-purple-400" />
              <span>john.doe@example.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-purple-400" />
              <span>New York, USA</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-purple-400" />
              <span>5+ Years Experience</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="mb-4 text-xl font-semibold text-purple-400">Full Stack Developer</h3>
          <p className="mb-4 text-gray-300">
            I'm a passionate full-stack developer with expertise in building modern web applications. I specialize in
            React, Next.js, TypeScript, and Node.js, creating responsive and user-friendly interfaces with clean,
            maintainable code.
          </p>
          <p className="text-gray-300">
            When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or
            sharing my knowledge through blog posts and community events.
          </p>

          <motion.button
            className="mt-6 self-start rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 font-medium text-white transition-transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download CV
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
