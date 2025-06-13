"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react" // İkon yerine başka bir şey de koyabilirsin

export default function ScrollToTopButton() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    showScrollTop && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    )
  )
}
