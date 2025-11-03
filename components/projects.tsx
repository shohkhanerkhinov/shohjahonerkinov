"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import SecurityModal from "./security-modal"
import AuthModal from "./auth-modal"

export default function Projects() {
  const { isAuthenticated } = useAuth()
  const [showSecurityModal, setShowSecurityModal] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)

  const projects = [
    {
      title: "JobHuntly",
      description:
        "A full-featured online store with product catalog, cart, and payment integration.",
      technologies: ["Next.js", "TypeScript", "Shadcn/ui", "Tailwind CSS", "React Hook Form", "Zod"],
      image: "/job-huntly.png",
      githubLink:"https://github.com/shohkhanerkhinov/JobHuntly",
      liveLink: "https://job-huntly-zeta.vercel.app/",
    },
    {
      title: "Invois-App",
      description:
        "Task organization – statuses like To-do / Progress / Done, deadlines, priorities",
      technologies: ["React.js", "TypeScript", "Tailwind CSS", "ShadCN/ui", "React Hook Form", "Zod"],
      image: "/Invoice-app.png",
      githubLink: "https://github.com/shohkhanerkhinov/invois-app-s",
      liveLink: "https://invois-app-s.vercel.app/",
    },
  ];


  const handleGitHubClick = (e: React.MouseEvent) => {
    e.preventDefault()

    if (isAuthenticated) {
      // GitHub havolani ochish
      window.open("https://github.com/yourusername/project", "_blank")
    } else {
      // Xavfsizlik modalini ko'rsatish
      setShowSecurityModal(true)
    }
  }

  const handleSecurityModalRegister = () => {
    setShowSecurityModal(false)
    setShowAuthModal(true)
  }

  const handleAuthSuccess = () => {
    // Muvaffaqiyatli ro'yxatdan o'tgandan keyin GitHub havolani ochish
    setTimeout(() => {
      window.open("https://github.com/yourusername/project", "_blank")
    }, 500)
  }

  return (
    <div className="h-full">
      <motion.h2
        className="mb-8 text-3xl font-bold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Projects
      </motion.h2>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className="group overflow-hidden rounded-xl bg-gray-800/50 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <motion.button
                  onClick={handleGitHubClick}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800/80 text-white backdrop-blur-sm transition-colors hover:bg-purple-500/80"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github className="h-5 w-5" />
                </motion.button>
                <motion.a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800/80 text-white backdrop-blur-sm transition-colors hover:bg-purple-500/80"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ExternalLink className="h-5 w-5" />
                </motion.a>
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-2 text-xl font-semibold text-white">{project.title}</h3>
              <p className="mb-4 text-gray-300">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="rounded-full bg-gray-700/50 px-3 py-1 text-xs text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <SecurityModal
        isOpen={showSecurityModal}
        onClose={() => setShowSecurityModal(false)}
        onRegister={handleSecurityModalRegister}
      />

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onSuccess={handleAuthSuccess} />
    </div>
  )
}
