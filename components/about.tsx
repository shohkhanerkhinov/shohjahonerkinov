"use client";

import { motion } from "framer-motion";
import { User, Mail, MapPin, Calendar, Users } from "lucide-react";
import { useVisitorCounter } from "@/hooks/use-visitor-counter";

export default function About() {
  const visitorCount = useVisitorCounter();

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
              <img
                src="/photo_2025-03-04_14-11-26.jpg"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-purple-400" />
              <span>Shohjahon Erkinov</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-purple-400" />
              <span>shohkxanerkhinov@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-purple-400" />
              <span>Farg'ona, Toshloq</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-purple-400" />
              <span>1+ Yillik Tajriba</span>
            </div>
            <div className="flex items-center gap-3 border-t border-gray-700 pt-3">
              <Users className="h-5 w-5 text-purple-400" />
              <span>{visitorCount === 0 ? "..." : visitorCount} kishi portfoliyoni ko'rgan</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="mb-4 text-xl font-semibold text-purple-400">
            Frontend Developer
          </h3>
          <p className="mb-4 text-gray-300">
            I'm a frontend developer specialized in creating modern web
            interfaces. I work with React, Next.js, and TypeScript technologies,
            focused on building user-friendly and aesthetically pleasing
            interfaces.
          </p>
          <p className="text-gray-300">
            When I'm not coding, I enjoy learning new frontend technologies and
            exploring open-source projects. I'm planning to start sharing my
            knowledge through blog posts in the near future.
          </p>

          <motion.a
            href="/resume.pdf"
            download
            className="mt-6 self-start rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 font-medium text-white transition-transform hover:scale-105 inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download CV
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
