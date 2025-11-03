"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  createdAt?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Brauzer storage'dan foydalanuvchi ma'lumotlarini yuklash
    const savedUser = localStorage.getItem("portfolio_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Saqlangan foydalanuvchi ma'lumotlarini yuklashda xatolik:", error)
        localStorage.removeItem("portfolio_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log("Login urinishi:", email)

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim(), password }),
      })

      // Response'ni tekshirish
      if (!response.ok) {
        let errorMessage = "Kirishda xatolik yuz berdi"

        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorMessage
        } catch (jsonError) {
          console.error("Error response JSON parse xatosi:", jsonError)
          errorMessage = `Server xatosi (${response.status})`
        }

        console.error("Login xatosi:", errorMessage)
        return { success: false, error: errorMessage }
      }

      // Muvaffaqiyatli response'ni parse qilish
      let userData
      try {
        userData = await response.json()
      } catch (jsonError) {
        console.error("Success response JSON parse xatosi:", jsonError)
        return { success: false, error: "Server javobini o'qishda xatolik" }
      }

      console.log("Login muvaffaqiyatli:", userData)
      setUser(userData)
      localStorage.setItem("portfolio_user", JSON.stringify(userData))
      return { success: true }
    } catch (error) {
      console.error("Login network xatosi:", error)
      return { success: false, error: "Tarmoq xatosi yuz berdi" }
    }
  }

  const register = async (
    name: string,
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log("Register urinishi:", { name: name.trim(), email: email.trim() })

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      })

      // Response'ni tekshirish
      if (!response.ok) {
        let errorMessage = "Ro'yxatdan o'tishda xatolik yuz berdi"

        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorMessage
        } catch (jsonError) {
          console.error("Error response JSON parse xatosi:", jsonError)
          errorMessage = `Server xatosi (${response.status})`
        }

        console.error("Register xatosi:", errorMessage)
        return { success: false, error: errorMessage }
      }

      // Muvaffaqiyatli response'ni parse qilish
      let userData
      try {
        userData = await response.json()
      } catch (jsonError) {
        console.error("Success response JSON parse xatosi:", jsonError)
        return { success: false, error: "Server javobini o'qishda xatolik" }
      }

      console.log("Register muvaffaqiyatli:", userData)
      setUser(userData)
      localStorage.setItem("portfolio_user", JSON.stringify(userData))
      return { success: true }
    } catch (error) {
      console.error("Register network xatosi:", error)
      return { success: false, error: "Tarmoq xatosi yuz berdi" }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("portfolio_user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
