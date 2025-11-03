"use client"

import { motion } from "framer-motion"
import SiteCard from "./site-card"

interface Site {
  title: string
  description: string
  image: string
  link: string
}

const sites: Site[] = [
  {
    title: "Uzbek Learning Hub",
    description: "O'zbek tilini o'rganish uchun interaktiv platforma",
    image: "/learning-platform.png",
    link: "https://example.com/uzbek-learning",
  },
  {
    title: "Code Academy",
    description: "Dasturlash asoslari va advanced kurslar",
    image: "/coding-academy.jpg",
    link: "https://example.com/code-academy",
  },
  {
    title: "Design Studio",
    description: "UI/UX dizayn va grafik dizayn kurslar",
    image: "/modern-design-studio.png",
    link: "https://example.com/design-studio",
  },
  {
    title: "Business Tools",
    description: "Biznes va marketing uchun amaliy vositalar",
    image: "/business-tools.jpg",
    link: "https://example.com/business-tools",
  },
]

export default function EduResources() {
  return (
    <div className="h-full">
      <motion.h2
        className="mb-8 text-3xl font-bold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        EduResources
      </motion.h2>

      <motion.p
        className="mb-8 text-gray-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Men yaratgan ta'lim va o'rganish platformalari. Faqat ro'yxatdan o'tgan foydalanuvchilar saytlarga kira oladi.
      </motion.p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {sites.map((site, index) => (
          <SiteCard
            key={site.title}
            title={site.title}
            description={site.description}
            image={site.image}
            link={site.link}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}
