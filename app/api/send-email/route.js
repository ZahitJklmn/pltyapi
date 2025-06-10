export async function POST(request) {
  try {
    const { name, email, phone, subject, message } = await request.json()

    // Form verilerini doğrula
    if (!name || !email || !phone || !subject || !message) {
      return Response.json({ error: "Tüm alanlar zorunludur" }, { status: 400 })
    }

    // Email formatını kontrol et
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return Response.json({ error: "Geçerli bir email adresi giriniz" }, { status: 400 })
    }

    // Telefon formatını kontrol et
    const phoneNumbers = phone.replace(/\D/g, "")
    if (phoneNumbers.length < 8) {
      return Response.json({ error: "Geçerli bir telefon numarası giriniz" }, { status: 400 })
    }

    // Veritabanına kaydet
    const { createClient } = await import("@supabase/supabase-js")
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

    const { data: dbResult, error: dbError } = await supabase.from("contact_messages").insert([
      {
        name,
        email,
        phone,
        subject,
        message,
        created_at: new Date().toISOString(),
      },
    ])

    if (dbError) {
      console.error("Veritabanı hatası:", dbError)
      return Response.json({ error: "Mesaj kaydedilirken bir hata oluştu." }, { status: 500 })
    }

    return Response.json({
      success: true,
      message: "Mesajınız başarıyla alındı. Admin panelinden incelenecektir.",
    })
  } catch (error) {
    console.error("Genel hata:", error)
    return Response.json(
      { error: "Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin." },
      { status: 500 },
    )
  }
}
