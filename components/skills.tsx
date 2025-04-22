"use client"

import { motion } from "framer-motion"

export default function Skills() {
  const skills = [
    { name: "React", level: 90 },
    { name: "Next.js", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "Node.js", level: 75 },
    { name: "CSS/Tailwind", level: 85 },
    { name: "GraphQL", level: 70 },
  ]

  const technologies = [
    "JavaScript",
    "HTML5",
    "CSS3",
    "Redux",
    "MongoDB",
    "PostgreSQL",
    "Git",
    "Docker",
    "AWS",
    "Firebase",
    "REST API",
    "Jest",
    "Framer Motion",
    "Figma",
    "Webpack",
    "CI/CD",
  ]

  return (
    <div className="h-full">
      <motion.h2
        className="mb-8 text-3xl font-bold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Skills & Expertise
      </motion.h2>

      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="mb-6 text-xl font-semibold text-purple-400">Core Skills</h3>

          <div className="space-y-6">
            {skills.map((skill, index) => (
              <div key={skill.name}>
                <div className="mb-2 flex justify-between">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-700">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="mb-6 text-xl font-semibold text-purple-400">Technologies</h3>

          <div className="flex flex-wrap gap-3">
            {technologies.map((tech, index) => (
              <motion.span
                key={tech}
                className="rounded-full bg-gray-800/70 px-4 py-2 text-sm backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(168, 85, 247, 0.2)",
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
