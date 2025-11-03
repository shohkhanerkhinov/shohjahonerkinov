"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"

interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

export default function AdminPanel() {
  const { user } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/auth/users")
        if (!response.ok) {
          throw new Error("Foydalanuvchilarni yuklashda xatolik")
        }
        const data = await response.json()
        setUsers(data)
      } catch (err) {
        setError("Ma'lumotlarni yuklashda xatolik yuz berdi")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  // Admin emasligini tekshirish
  if (!user || user.email !== "admin@example.com") {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <h2 className="mb-4 text-2xl font-bold text-red-400">Ruxsat yo'q</h2>
        <p className="text-gray-400">Bu sahifani ko'rish uchun admin huquqiga ega bo'lishingiz kerak.</p>
      </div>
    )
  }

  return (
    <div className="h-full">
      <motion.h2
        className="mb-8 text-3xl font-bold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Admin Panel
      </motion.h2>

      <div className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm">
        <h3 className="mb-6 text-xl font-semibold text-purple-400">Ro'yxatdan o'tgan foydalanuvchilar</h3>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-500 border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="rounded-lg bg-red-900/20 p-4 text-center text-red-400">{error}</div>
        ) : users.length === 0 ? (
          <div className="rounded-lg bg-gray-700/30 p-4 text-center text-gray-400">
            Hozircha ro'yxatdan o'tgan foydalanuvchilar yo'q
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-gray-700 text-left">
                  <th className="pb-3 pl-4 pr-2 font-medium text-gray-400">Ism</th>
                  <th className="px-2 pb-3 font-medium text-gray-400">Email</th>
                  <th className="px-2 pb-3 font-medium text-gray-400">Ro'yxatdan o'tgan sana</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-700/50 hover:bg-gray-700/20">
                    <td className="py-3 pl-4 pr-2">{user.name}</td>
                    <td className="px-2 py-3">{user.email}</td>
                    <td className="px-2 py-3">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("uz-UZ", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Ma'lumot yo'q"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
