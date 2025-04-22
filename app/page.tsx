"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import SideMenu from "@/components/side-menu"
import LoadingAnimation from "@/components/loading-animation"
import BackgroundAnimation from "@/components/background-animation"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("about")

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  const sections = [
    { id: "about", label: "About", component: <About /> },
    { id: "skills", label: "Skills", component: <Skills /> },
    { id: "projects", label: "Projects", component: <Projects /> },
    { id: "contact", label: "Contact", component: <Contact /> },
  ]

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingAnimation key="loading" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex h-full"
          >
            <BackgroundAnimation />

            <SideMenu
              sections={sections.map((s) => ({ id: s.id, label: s.label }))}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />

            <main className="flex-1 overflow-y-auto p-8">
              <AnimatePresence mode="wait">
                {sections.map(
                  (section) =>
                    activeSection === section.id && (
                      <motion.div
                        key={section.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                      >
                        {section.component}
                      </motion.div>
                    ),
                )}
              </AnimatePresence>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
