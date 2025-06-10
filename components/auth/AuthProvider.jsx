"use client"
import { createContext, useContext, useEffect, useState } from "react"
import { getSupabaseClient } from "@/lib/supabase"

// Context'i oluştur
const AuthContext = createContext(null)

// Hook
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  if (!context) {
    return {
      user: null,
      isAdmin: false,
      loading: false,
      signIn: async () => ({ error: { message: "AuthProvider not initialized" } }),
      signOut: async () => ({ error: { message: "AuthProvider not initialized" } }),
    }
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)
  const supabase = getSupabaseClient()

  // Admin durumunu localStorage'dan oku
  const loadAdminFromStorage = () => {
    if (typeof window !== "undefined") {
      const storedAdmin = localStorage.getItem("isAdmin")
      const storedUserId = localStorage.getItem("adminUserId")
      return {
        isAdmin: storedAdmin === "true",
        userId: storedUserId,
      }
    }
    return { isAdmin: false, userId: null }
  }

  // Admin durumunu localStorage'a kaydet
  const saveAdminToStorage = (isAdmin, userId) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isAdmin", isAdmin.toString())
      if (userId) {
        localStorage.setItem("adminUserId", userId)
      } else {
        localStorage.removeItem("adminUserId")
      }
    }
  }

  // Admin durumunu kontrol et (cache ile)
  const checkAdminStatus = async (userId) => {
    if (!userId || !supabase) return false

    // Önce localStorage'dan kontrol et
    const stored = loadAdminFromStorage()
    if (stored.userId === userId && stored.isAdmin) {
      console.log("Admin durumu cache'den yüklendi")
      return true
    }

    try {
      console.log("Admin durumu veritabanından kontrol ediliyor:", userId)

      const { data, error } = await supabase.from("user_profiles").select("is_admin").eq("id", userId).single()

      if (error) {
        console.error("Admin durumu kontrol hatası:", error)
        return false
      }

      const adminStatus = data?.is_admin || false
      console.log("Admin durumu sonucu:", adminStatus)

      // Sonucu localStorage'a kaydet
      saveAdminToStorage(adminStatus, userId)

      return adminStatus
    } catch (error) {
      console.error("Admin durumu kontrol exception:", error)
      return false
    }
  }

  // Oturum durumunu kontrol et
  useEffect(() => {
    if (!supabase || initialized) return

    const initializeAuth = async () => {
      setLoading(true)

      try {
        // Önce localStorage'dan admin durumunu yükle
        const stored = loadAdminFromStorage()
        if (stored.isAdmin) {
          setIsAdmin(true)
        }

        // Mevcut oturumu kontrol et
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) {
          console.error("Oturum hatası:", sessionError)
          setLoading(false)
          return
        }

        const session = sessionData?.session

        if (session?.user) {
          console.log("Aktif oturum bulundu:", session.user.email)
          setUser(session.user)

          // Admin durumunu kontrol et
          const adminStatus = await checkAdminStatus(session.user.id)
          setIsAdmin(adminStatus)
        } else {
          // Oturum yoksa localStorage'ı temizle
          saveAdminToStorage(false, null)
          setIsAdmin(false)
        }
      } catch (error) {
        console.error("Auth başlatma hatası:", error)
      } finally {
        setLoading(false)
        setInitialized(true)
      }
    }

    // Auth durumu değişikliklerini dinle
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth durumu değişti:", event, session?.user?.email)

      if (event === "SIGNED_IN" && session?.user) {
        setUser(session.user)
        const adminStatus = await checkAdminStatus(session.user.id)
        setIsAdmin(adminStatus)
      } else if (event === "SIGNED_OUT") {
        setUser(null)
        setIsAdmin(false)
        saveAdminToStorage(false, null)
      }
    })

    initializeAuth()

    // Cleanup
    return () => {
      authListener?.subscription?.unsubscribe()
    }
  }, [supabase, initialized])

  // Giriş fonksiyonu
  const signIn = async (email, password) => {
    if (!supabase) return { error: { message: "Supabase client bulunamadı" } }

    try {
      console.log("Giriş yapılıyor:", email)

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (error) {
        console.error("Giriş hatası:", error)
        return { error }
      }

      console.log("Giriş başarılı:", data)

      if (data?.user) {
        setUser(data.user)
        const adminStatus = await checkAdminStatus(data.user.id)
        setIsAdmin(adminStatus)
      }

      return { data }
    } catch (error) {
      console.error("Giriş exception:", error)
      return { error: { message: error.message } }
    }
  }

  // Çıkış fonksiyonu
  const signOut = async () => {
    if (!supabase) return { error: { message: "Supabase client bulunamadı" } }

    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        console.error("Çıkış hatası:", error)
        return { error }
      }

      setUser(null)
      setIsAdmin(false)
      saveAdminToStorage(false, null)
      return { success: true }
    } catch (error) {
      console.error("Çıkış exception:", error)
      return { error: { message: error.message } }
    }
  }

  // Context değeri
  const value = {
    user,
    isAdmin,
    loading,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
