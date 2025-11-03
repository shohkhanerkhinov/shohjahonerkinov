import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

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

    const { name, email, subject, message } = body

    // Validatsiya
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Ism kamida 2 ta harf bo'lishi kerak" }, { status: 400 })
    }

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email manzili kiritilishi shart" }, { status: 400 })
    }

    if (!subject || typeof subject !== "string" || subject.trim().length < 3) {
      return NextResponse.json({ error: "Mavzu kamida 3 ta harf bo'lishi kerak" }, { status: 400 })
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json({ error: "Xabar kamida 10 ta harf bo'lishi kerak" }, { status: 400 })
    }

    // Email validatsiyasi
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email manzili noto'g'ri formatda" }, { status: 400 })
    }

    // Email ma'lumotlari (to'g'ridan-to'g'ri kodda)
    const EMAIL_USER = process.env.EMAIL_USER || "shohkxanerkhinov@gmail.com"
    const EMAIL_PASS = process.env.EMAIL_PASS || "your_app_password_here" // Bu yerga haqiqiy parolni kiriting

    // Agar parol hali ham o'rnatilmagan bo'lsa, faqat console'ga yozish
    if (EMAIL_PASS === "your_app_password_here") {
      console.log("=== EMAIL YUBORILMADI (Parol o'rnatilmagan) ===")
      console.log("Yuboruvchi:", name, "-", email)
      console.log("Mavzu:", subject)
      console.log("Xabar:", message)
      console.log("Qabul qiluvchi: shohkxanerkhinov@gmail.com")
      console.log("=== EMAIL TUGADI ===")

      // Fake success response
      return NextResponse.json({
        message: "Xabar qabul qilindi! (Demo rejimida - haqiqiy email yuborilmadi)",
      })
    }

    try {
      // Nodemailer transporter yaratish
      const transporter = nodemailer.createTransporter({
        service: "gmail",
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS,
        },
      })

      // Email yuborish
      const mailOptions = {
        from: EMAIL_USER,
        to: "shohkxanerkhinov@gmail.com",
        subject: `Portfolio Contact: ${subject.trim()}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #7c3aed; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">
              Yangi Portfolio Xabari
            </h2>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #7c3aed;">
              <p style="margin: 5px 0;"><strong>👤 Ism:</strong> ${name.trim()}</p>
              <p style="margin: 5px 0;"><strong>📧 Email:</strong> ${email.trim()}</p>
              <p style="margin: 5px 0;"><strong>📝 Mavzu:</strong> ${subject.trim()}</p>
              <p style="margin: 5px 0;"><strong>📅 Sana:</strong> ${new Date().toLocaleString("uz-UZ")}</p>
            </div>
            
            <div style="background: white; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e293b; margin-top: 0; margin-bottom: 15px;">💬 Xabar:</h3>
              <div style="line-height: 1.6; color: #475569; white-space: pre-wrap;">${message.trim()}</div>
            </div>
            
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
              <p style="margin: 0; color: #92400e; font-size: 14px;">
                <strong>📌 Eslatma:</strong> Bu xabar sizning portfolio saytingizdan yuborildi.<br>
                Javob berish uchun to'g'ridan-to'g'ri <strong>${email.trim()}</strong> manziliga yozing.
              </p>
            </div>
          </div>
        `,
      }

      await transporter.sendMail(mailOptions)

      console.log("Email muvaffaqiyatli yuborildi:", {
        to: "shohkxanerkhinov@gmail.com",
        from: email.trim(),
        subject: subject.trim(),
      })

      return NextResponse.json({
        message: "Xabaringiz muvaffaqiyatli yuborildi! Tez orada javob beraman.",
      })
    } catch (emailError) {
      console.error("Email yuborishda xatolik:", emailError)

      // Email yuborilmasa ham, ma'lumotlarni console'ga yozish
      console.log("=== EMAIL YUBORILMADI (Xatolik) ===")
      console.log("Yuboruvchi:", name, "-", email)
      console.log("Mavzu:", subject)
      console.log("Xabar:", message)
      console.log("Xatolik:", emailError)
      console.log("=== EMAIL TUGADI ===")

      return NextResponse.json({
        message: "Xabar qabul qilindi! (Email yuborishda muammo bo'ldi, lekin ma'lumotlar saqlandi)",
      })
    }
  } catch (error) {
    console.error("Contact API xatosi:", error)
    return NextResponse.json({ error: "Server xatosi yuz berdi" }, { status: 500 })
  }
}
