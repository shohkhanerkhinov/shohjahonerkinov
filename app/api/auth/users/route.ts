import { NextResponse } from "next/server"

// Global users array'ni olish
function getUsers() {
  if (typeof global.portfolioUsers === "undefined") {
    global.portfolioUsers = []
  }
  return global.portfolioUsers
}

export async function GET() {
  try {
    // Users array'ni olish
    const users = getUsers()

    console.log("Foydalanuvchilar so'raldi, jami:", users.length)

    // Parollarni olib tashlash
    const safeUsers = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    }))

    return NextResponse.json(safeUsers)
  } catch (error) {
    console.error("Users API xatosi:", error)
    return NextResponse.json({ error: "Server xatosi yuz berdi" }, { status: 500 })
  }
}
