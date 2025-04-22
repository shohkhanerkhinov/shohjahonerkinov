"use client"

import { motion } from "framer-motion"

export default function LoadingAnimation() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className="relative flex items-center justify-center">
        <motion.div
          className="absolute h-32 w-32 rounded-full border-4 border-purple-500"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            opacity: [0, 1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            times: [0, 0.6, 1],
          }}
        />

        <motion.div
          className="h-24 w-24 rounded-full border-4 border-pink-500"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            opacity: [0, 1, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            delay: 0.2,
            times: [0, 0.6, 1],
          }}
        />

        <motion.div
          className="h-16 w-16 rounded-full border-4 border-cyan-500"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            opacity: [0, 1, 1],
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            delay: 0.4,
            times: [0, 0.6, 1],
          }}
        />

        <motion.h1
          className="text-3xl font-bold text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Portfolio
        </motion.h1>
      </motion.div>
    </motion.div>
  )
}
