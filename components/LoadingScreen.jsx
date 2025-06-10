"use client"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(false)
  const [showLogo, setShowLogo] = useState(false)
  const [showPLT, setShowPLT] = useState(false)
  const [showYAPI, setShowYAPI] = useState(false)
  const pathname = usePathname()

  // Sayfa değiştiğinde loading ekranını göster
  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true)

      // Logo animasyonu için zamanlayıcılar
      setTimeout(() => setShowLogo(true), 50)
      setTimeout(() => setShowPLT(true), 150)
      setTimeout(() => setShowYAPI(true), 250)
    }

    const handleComplete = () => {
      // Loading ekranını 800ms sonra kapat (toplam süre ~1s)
      setTimeout(() => {
        setShowYAPI(false)
        setTimeout(() => setShowPLT(false), 100)
        setTimeout(() => {
          setShowLogo(false)
          setTimeout(() => setIsLoading(false), 100)
        }, 100)
      }, 800)
    }

    // İlk yükleme için
    handleStart()
    handleComplete()

    // Sayfa değişikliklerini dinle
    window.addEventListener("beforeunload", handleStart)
    window.addEventListener("load", handleComplete)

    return () => {
      window.removeEventListener("beforeunload", handleStart)
      window.removeEventListener("load", handleComplete)
    }
  }, [pathname])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-neutral-800 z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Logo Container - Daha geniş alan */}
        <div className="relative w-80 h-32 flex items-center justify-center mb-8">
          <div
            className={`transition-all duration-500 ${
              showLogo ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              {/* PLT kısmı - Turuncu */}
              <div
                className={`text-6xl font-bold transition-all duration-300 ${
                  showPLT ? "text-orange-500 opacity-100" : "text-transparent opacity-0"
                }`}
                style={{
                  textShadow: showPLT ? "0 0 20px rgba(249, 115, 22, 0.6)" : "none",
                  transform: `translateY(${showPLT ? 0 : -30}px) scale(${showPLT ? 1 : 0.8})`,
                  letterSpacing: "0.1em",
                }}
              >
                PLT
              </div>

              {/* YAPI kısmı - Beyaz */}
              <div
                className={`text-6xl font-bold transition-all duration-300 ${
                  showYAPI ? "text-white opacity-100" : "text-transparent opacity-0"
                }`}
                style={{
                  textShadow: showYAPI ? "0 0 20px rgba(255, 255, 255, 0.6)" : "none",
                  transform: `translateY(${showYAPI ? 0 : -30}px) scale(${showYAPI ? 1 : 0.8})`,
                  letterSpacing: "0.1em",
                }}
              >
                YAPI
              </div>
            </div>
          </div>
        </div>

    <div className="hidden"> {/* tüm yükleniyor simgesini ve yazısını hidden ile sakladık */}
        {/* Yükleniyor metni */}
        <div
          className={`mb-6 text-white text-lg font-medium transition-opacity duration-300 ${
            showLogo ? "opacity-100" : "opacity-0"
          }`}
        >
          Yükleniyor...
        </div>

        {/* Loading Spinner - Basit Turuncu Çember */}
        <div className={`transition-opacity duration-300 ${showLogo ? "opacity-100" : "opacity-0"}`}>
          <div className="relative w-12 h-12 mx-auto">
            <div
              className="w-12 h-12 border-4 border-orange-500 rounded-full animate-spin"
              style={{
                borderTopColor: "transparent",
                borderRightColor: "transparent",
                borderBottomColor: "#f97316",
                borderLeftColor: "#f97316",
              }}
            />
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
