"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, User, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { login, register } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      let result

      if (isLogin) {
        result = await login(formData.email, formData.password)
      } else {
        if (formData.name.length < 2) {
          setError("Ism kamida 2 ta harf bo'lishi kerak")
          setIsLoading(false)
          return
        }
        result = await register(formData.name, formData.email, formData.password)
      }

      if (result.success) {
        setFormData({ name: "", email: "", password: "" })
        onSuccess()
        onClose()
      } else {
        setError(result.error || "Xatolik yuz berdi")
      }
    } catch (err) {
      console.error("Auth error:", err)
      setError("Kutilmagan xatolik yuz berdi")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError("")
  }

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
              <h2 className="text-2xl font-bold text-white">{isLogin ? "Kirish" : "Ro'yxatdan o'tish"}</h2>
              <p className="mt-2 text-gray-400">
                GitHub havolalarini ko'rish uchun {isLogin ? "kirishingiz" : "ro'yxatdan o'tishingiz"} kerak
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder="To'liq ismingiz"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-700 bg-gray-800/50 py-3 pl-10 pr-4 text-white placeholder-gray-400 backdrop-blur-sm focus:border-purple-500 focus:outline-none"
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email manzilingiz"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-700 bg-gray-800/50 py-3 pl-10 pr-4 text-white placeholder-gray-400 backdrop-blur-sm focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Parolingiz"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800/50 py-3 pl-10 pr-12 text-white placeholder-gray-400 backdrop-blur-sm focus:border-purple-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {error && (
                <motion.p className="text-sm text-red-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {error}
                </motion.p>
              )}

              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 py-3 font-medium text-white transition-transform hover:scale-105 disabled:opacity-70"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span>Kuting...</span>
                  </div>
                ) : isLogin ? (
                  "Kirish"
                ) : (
                  "Ro'yxatdan o'tish"
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                {isLogin ? "Hisobingiz yo'qmi?" : "Allaqachon hisobingiz bormi?"}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin)
                    setError("")
                    setFormData({ name: "", email: "", password: "" })
                  }}
                  className="ml-2 text-purple-400 hover:text-purple-300"
                >
                  {isLogin ? "Ro'yxatdan o'ting" : "Kirish"}
                </button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
