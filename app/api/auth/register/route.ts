import { type NextRequest, NextResponse } from "next/server"

// Global users array'ni initialize qilish
function initializeUsers() {
  if (typeof global.portfolioUsers === "undefined") {
    global.portfolioUsers = []
  }
  return global.portfolioUsers
}

export async function POST(request: NextRequest) {
  try {
    // Request body'ni parse qilish
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      console.error("JSON parse xatosi:", parseError)
      return NextResponse.json({ error: "Noto'g'ri ma'lumot formati" }, { status: 400 })
    }

    const { name, email, password } = body

    // Validatsiya
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Ism kamida 2 ta harf bo'lishi kerak" }, { status: 400 })
    }

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email manzili kiritilishi shart" }, { status: 400 })
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      return NextResponse.json({ error: "Parol kamida 6 ta belgidan iborat bo'lishi kerak" }, { status: 400 })
    }

    // Email validatsiyasi
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email manzili noto'g'ri formatda" }, { status: 400 })
    }

    // Users array'ni olish
    const users = initializeUsers()

    // Email mavjudligini tekshirish
    const normalizedEmail = email.toLowerCase().trim()
    const existingUser = users.find((user) => user.email === normalizedEmail)

    if (existingUser) {
      return NextResponse.json({ error: "Bu email allaqachon ro'yxatdan o'tgan" }, { status: 400 })
    }

    // Yangi foydalanuvchi yaratish
    const newUser = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      email: normalizedEmail,
      password: password, // Haqiqiy loyihada hash qilish kerak
      createdAt: new Date().toISOString(),
    }

    // Foydalanuvchini qo'shish
    users.push(newUser)

    console.log("Yangi foydalanuvchi qo'shildi:", {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
    })
    console.log("Jami foydalanuvchilar:", users.length)

    // Parolsiz javob qaytarish
    const responseUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
    }

    return NextResponse.json(responseUser, { status: 201 })
  } catch (error) {
    console.error("Register API xatosi:", error)
    return NextResponse.json({ error: "Server xatosi yuz berdi" }, { status: 500 })
  }
}
