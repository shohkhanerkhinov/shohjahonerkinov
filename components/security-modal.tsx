"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Shield, X, Lock } from "lucide-react"

interface SecurityModalProps {
  isOpen: boolean
  onClose: () => void
  onRegister: () => void
}

export default function SecurityModal({ isOpen, onClose, onRegister }: SecurityModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-md rounded-2xl bg-gray-900/95 p-8 backdrop-blur-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-white">
              <X size={24} />
            </button>

            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
                <Shield className="h-8 w-8 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Xavfsizlik Ogohlantirishi</h2>
              <p className="mt-4 text-gray-300">
                Kechirasiz, xavfsizlik sabablariga ko'ra GitHub havolalarini ko'rish uchun ro'yxatdan o'tishingiz kerak.
              </p>
            </div>

            <div className="mb-6 rounded-lg bg-gray-800/50 p-4">
              <div className="flex items-start gap-3">
                <Lock className="mt-1 h-5 w-5 text-purple-400" />
                <div>
                  <h3 className="font-medium text-white">Nima uchun ro'yxatdan o'tish kerak?</h3>
                  <ul className="mt-2 space-y-1 text-sm text-gray-400">
                    <li>• Kodlarimni himoya qilish uchun</li>
                    <li>• Faqat haqiqiy dasturchilar ko'rishi uchun</li>
                    <li>• Loyihalarimni noto'g'ri ishlatishning oldini olish uchun</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <motion.button
                onClick={onRegister}
                className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 py-3 font-medium text-white transition-transform hover:scale-105"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Ro'yxatdan o'tish
              </motion.button>

              <button
                onClick={onClose}
                className="w-full rounded-lg border border-gray-700 py-3 font-medium text-gray-300 transition-colors hover:bg-gray-800/50"
              >
                Keyinroq
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
