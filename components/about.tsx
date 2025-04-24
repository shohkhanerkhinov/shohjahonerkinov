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
              <img src="/photo_2025-03-04_14-11-26.jpg" alt="Profil rasmi" className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-purple-400" />
              <span>Shohjahon Erkinov</span>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-purple-400 mt-0.5" />
              <span className="break-all">shohjahonerkinov200710@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-purple-400" />
              <span>Farg'ona, Toshloq</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-purple-400" />
              <span>1+ Yillik Tajriba</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="mb-4 text-xl font-semibold text-purple-400">Frontend Dasturchi</h3>
          <p className="mb-4 text-gray-300">
            Men zamonaviy veb interfeyslar yaratishga ixtisoslashgan frontend dasturchiman. React, Next.js va TypeScript texnologiyalarida ishlayman, foydalanuvchilar uchun qulay va chiroyli interfeyslar yaratishga qaratilganman.
          </p>
          <p className="text-gray-300">
            Kod yozishdan tashqari vaqtimda yangi frontend texnologiyalarini o'rganish va ochiq manbali loyihalarni o'rganishni yoqtiraman. Tez orada o'zim bilimlarimni blog postlar orqali ulashishni rejalashtiryapman.
          </p>

          <motion.button
            className="mt-6 self-start rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 font-medium text-white transition-transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="/resume.pdf" download>
              CV Yuklab Olish
            </a>
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
