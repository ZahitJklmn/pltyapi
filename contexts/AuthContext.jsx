"use client"
import { createContext, useContext, useEffect, useState } from "react"
import { getSupabaseClient } from "@/lib/supabase"

const AuthContext = createContext({
  user: null,
  userProfile: null,
  loading: true,
  isAdmin: false,
  signIn: async () => {},
  signOut: async () => {},
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  const supabase = getSupabaseClient()

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    // Mevcut session'ı kontrol et
    const getSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          console.error("Session alma hatası:", error)
          return
        }

        if (session?.user) {
          setUser(session.user)
          await fetchUserProfile(session.user.id)
        }
      } catch (error) {
        console.error("Session kontrol hatası:", error)
      } finally {
        setLoading(false)
      }
    }

    getSession()

    // Auth state değişikliklerini dinle
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email)

      if (session?.user) {
        setUser(session.user)
        await fetchUserProfile(session.user.id)
      } else {
        setUser(null)
        setUserProfile(null)
        setIsAdmin(false)
        localStorage.removeItem("isAdmin")
      }

      setLoading(false)
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [supabase])

  // Kullanıcı profilini getir
  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase.from("user_profiles").select("*").eq("id", userId).single()

      if (error) {
        console.error("Profil getirme hatası:", error)
        return
      }

      setUserProfile(data)
      setIsAdmin(data?.is_admin || false)

      // localStorage'a da kaydet (backward compatibility için)
      localStorage.setItem("isAdmin", data?.is_admin ? "true" : "false")
    } catch (error) {
      console.error("Profil getirme exception:", error)
    }
  }

  // Giriş yap
  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      return { data, error: null }
    } catch (error) {
      console.error("Giriş hatası:", error)
      return { data: null, error }
    }
  }

  // Çıkış yap
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) throw error

      // localStorage'ı temizle
      localStorage.removeItem("isAdmin")

      setUser(null)
      setUserProfile(null)
      setIsAdmin(false)

      return { error: null }
    } catch (error) {
      console.error("Çıkış hatası:", error)
      return { error }
    }
  }

  const value = {
    user,
    userProfile,
    isAdmin,
    loading,
    signIn,
    signOut,
    fetchUserProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
