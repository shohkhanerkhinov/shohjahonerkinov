import { type NextRequest, NextResponse } from "next/server"

// Global users array'ni olish
function getUsers() {
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

    const { email, password } = body

    // Validatsiya
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email manzili kiritilishi shart" }, { status: 400 })
    }

    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "Parol kiritilishi shart" }, { status: 400 })
    }

    // Users array'ni olish
    const users = getUsers()

    console.log("Login urinishi:", email)
    console.log("Mavjud foydalanuvchilar soni:", users.length)

    // Foydalanuvchini topish
    const normalizedEmail = email.toLowerCase().trim()
    const user = users.find((u) => u.email === normalizedEmail && u.password === password)

    if (!user) {
      console.log("Foydalanuvchi topilmadi yoki parol noto'g'ri")
      return NextResponse.json({ error: "Email yoki parol noto'g'ri" }, { status: 401 })
    }

    console.log("Foydalanuvchi muvaffaqiyatli kirdi:", user.email)

    // Parolsiz javob qaytarish
    const responseUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    }

    return NextResponse.json(responseUser)
  } catch (error) {
    console.error("Login API xatosi:", error)
    return NextResponse.json({ error: "Server xatosi yuz berdi" }, { status: 500 })
  }
}
