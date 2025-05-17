"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const featuredProducts = [
  {
    id: 1,
    title: "Premium İç Cephe Boyası",
    description: "Yüksek kapatıcılık ve dayanıklılık",
    image: "/placeholder.svg?height=300&width=300&text=Ürün 1",
    link: "/urunler/ic-cephe-boyalari/premium-ic-cephe-boyasi",
  },
  {
    id: 2,
    title: "Dış Cephe Silikonlu Boya",
    description: "Hava koşullarına dayanıklı, su itici",
    image: "/placeholder.svg?height=300&width=300&text=Ürün 2",
    link: "/urunler/dis-cephe-boyalari/dis-cephe-silikonlu-boya",
  },
  {
    id: 3,
    title: "Ahşap Vernik",
    description: "Doğal ahşap dokusu, UV korumalı",
    image: "/placeholder.svg?height=300&width=300&text=Ürün 3",
    link: "/urunler/ahsap-boyalari/ahsap-vernik",
  },
  {
    id: 4,
    title: "Metal Antipas",
    description: "Pas önleyici, uzun ömürlü koruma",
    image: "/placeholder.svg?height=300&width=300&text=Ürün 4",
    link: "/urunler/metal-boyalari/metal-antipas",
  },
]

export default function FeaturedProductsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const autoPlayRef = useRef(null)

  // Responsive ayarları
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Otomatik ilerleme (sadece mobilde)
  useEffect(() => {
    if (isMobile) {
      const play = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProducts.length)
      }

      autoPlayRef.current = setInterval(play, 5000)

      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current)
        }
      }
    }
  }, [isMobile])

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1
      return newIndex < 0 ? featuredProducts.length - 1 : newIndex
    })
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProducts.length)
  }

  // Masaüstü görünümü
  if (!isMobile) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredProducts.map((product) => (
          <Link
            key={product.id}
            href={product.link}
            className="group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            <div className="p-4">
              <div className="mb-4 overflow-hidden rounded">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">{product.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{product.description}</p>
              <div className="flex justify-end items-center mt-auto">
                <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-all duration-300 group-hover:bg-red-700">
                  İncele
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    )
  }

  // Mobil slider görünümü
  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${featuredProducts.length * 100}%`,
          }}
        >
          {featuredProducts.map((product) => (
            <div key={product.id} className="w-full flex-shrink-0">
              <div className="p-2">
                <Link
                  href={product.link}
                  className="group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl block h-full"
                >
                  <div className="p-4 flex flex-col h-full">
                    <div className="mb-4 overflow-hidden rounded">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">{product.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                    <div className="flex justify-end items-center mt-auto">
                      <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-all duration-300 group-hover:bg-red-700">
                        İncele
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md z-10 -ml-3"
        aria-label="Önceki ürün"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md z-10 -mr-3"
        aria-label="Sonraki ürün"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {featuredProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentIndex === index ? "bg-red-600 w-4" : "bg-gray-300"
            }`}
            aria-label={`Ürün ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
