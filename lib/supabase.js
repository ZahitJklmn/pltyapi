import { createClient } from "@supabase/supabase-js"

// Client-side Supabase client için singleton pattern
let supabaseInstance = null

export const getSupabaseClient = () => {
  try {
    // Server-side'da çalışıyorsa
    if (typeof window === "undefined") {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseAnonKey) {
        console.error("Server-side: Supabase environment variables are missing")
        return null
      }

      if (!supabaseInstance) {
        supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
        console.log("Server-side Supabase client oluşturuldu")
      }
      return supabaseInstance
    }

    // Client-side'da çalışıyorsa
    // Önce localStorage'dan kontrol et
    const storedUrl = localStorage.getItem("SUPABASE_URL")
    const storedKey = localStorage.getItem("SUPABASE_ANON_KEY")

    // Eğer localStorage'da varsa onları kullan
    if (storedUrl && storedKey) {
      if (!supabaseInstance) {
        try {
          supabaseInstance = createClient(storedUrl, storedKey)
          console.log("Supabase client localStorage değerleriyle oluşturuldu")
        } catch (error) {
          console.error("localStorage değerleriyle Supabase client oluşturma hatası:", error)

          // localStorage'daki değerler geçersizse temizle
          localStorage.removeItem("SUPABASE_URL")
          localStorage.removeItem("SUPABASE_ANON_KEY")

          // Kullanıcıyı yapılandırma sayfasına yönlendir
          if (window.location.pathname !== "/env-setup" && window.location.pathname !== "/debug") {
            console.log("Yapılandırma sayfasına yönlendiriliyor...")
            window.location.href = "/env-setup"
          }
          return null
        }
      }
      return supabaseInstance
    }

    // Yoksa env değişkenlerini kontrol et
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Client-side: Supabase environment variables are missing")

      // Kullanıcıyı yapılandırma sayfasına yönlendir
      if (window.location.pathname !== "/env-setup" && window.location.pathname !== "/debug") {
        console.log("Yapılandırma sayfasına yönlendiriliyor...")
        window.location.href = "/env-setup"
      }
      return null
    }

    if (!supabaseInstance) {
      try {
        supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
        console.log("Supabase client env değişkenleriyle oluşturuldu")
      } catch (error) {
        console.error("Env değişkenleriyle Supabase client oluşturma hatası:", error)

        // Kullanıcıyı yapılandırma sayfasına yönlendir
        if (window.location.pathname !== "/env-setup" && window.location.pathname !== "/debug") {
          console.log("Yapılandırma sayfasına yönlendiriliyor...")
          window.location.href = "/env-setup"
        }
        return null
      }
    }

    return supabaseInstance
  } catch (error) {
    console.error("getSupabaseClient genel hatası:", error)
    return null
  }
}

// Çevre değişkenlerini kontrol eden yardımcı fonksiyon
export const checkSupabaseEnv = () => {
  if (typeof window === "undefined") {
    // Server-side
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    return !!supabaseUrl && !!supabaseAnonKey
  } else {
    // Client-side
    // Önce localStorage'dan kontrol et
    const storedUrl = localStorage.getItem("SUPABASE_URL")
    const storedKey = localStorage.getItem("SUPABASE_ANON_KEY")

    if (storedUrl && storedKey) {
      return true
    }

    // Yoksa env değişkenlerini kontrol et
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    return !!supabaseUrl && !!supabaseAnonKey
  }
}
