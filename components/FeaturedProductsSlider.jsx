"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase"

export default function FeaturedProductsSlider() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const autoPlayRef = useRef(null)

  // Öne çıkan ürünleri yükle - sadece component mount olduğunda
  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const supabase = getSupabaseClient()
        const { data, error } = await supabase
          .from("featured_products")
          .select("*")
          .order("created_at", { ascending: false })

        if (error) {
          console.error("Featured products yükleme hatası:", error)
          return
        }

        setFeaturedProducts(data || [])
      } catch (error) {
        console.error("Featured products genel hatası:", error)
      } finally {
        setLoading(false)
      }
    }

    loadFeaturedProducts()
  }, []) // Sadece mount olduğunda çalışır

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
    if (isMobile && featuredProducts.length > 0) {
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
  }, [isMobile, featuredProducts.length])

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1
      return newIndex < 0 ? featuredProducts.length - 1 : newIndex
    })
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProducts.length)
  }

  // Loading durumu
  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    )
  }

  // Hiç öne çıkan ürün yoksa
  if (featuredProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">Henüz öne çıkan ürün bulunmuyor.</p>
        <p className="text-gray-400 text-sm mt-2">
          Admin olarak giriş yapıp ürün kartlarındaki yıldız butonuna tıklayarak ürünleri öne çıkarabilirsiniz.
        </p>
      </div>
    )
  }

  // Masaüstü görünümü
  if (!isMobile) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredProducts.map((product) => (
          <Link
            key={product.id}
            href={`/urunler/${product.brand_slug}/${product.category_slug}/${product.product_slug}`}
            className="group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            <div className="p-6">
              <div className="mb-8 overflow-hidden rounded">
                <img
                  src={product.product_image_url || "/placeholder.svg"}
                  alt={product.product_name}
                  className="w-full h-76 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">{product.product_name}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.product_description}</p>
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

  // Mobil slider görünümü - TAMAMEN YENİDEN DÜZENLENDİ
  return (
    <div className="w-full relative">
      {/* Ana slider container - padding yok */}
      <div className="w-full overflow-hidden">
        {/* Slider track */}
        <div
          className="flex w-full transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {/* Her bir slide - tam genişlikte */}
          {featuredProducts.map((product) => (
            <div key={product.id} className="w-full flex-shrink-0 flex justify-center">
              <div className="w-[90%] mx-auto">
                <Link
                  href={`/urunler/${product.brand_slug}/${product.category_slug}/${product.product_slug}`}
                  className="group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl block w-full"
                >
                  <div className="p-4 flex flex-col">
                    <div className="mb-4 overflow-hidden rounded">
                      <img
                        src={product.product_image_url || "/placeholder.svg"}
                        alt={product.product_name}
                        className="w-full h-76 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">{product.product_name}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.product_description}</p>
                    <div className="flex justify-center items-center mt-auto">
                      <span className="bg-red-600 text-white px-10 py-1 rounded text-md font-medium transition-all duration-300 group-hover:bg-red-700">
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

      {/* Navigation Buttons - Sadece birden fazla ürün varsa */}
      {featuredProducts.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-white text-red-600 rounded-full p-2 shadow-lg z-10 backdrop-blur-sm"
            aria-label="Önceki ürün"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-white text-red-600 rounded-full p-2 shadow-lg z-10 backdrop-blur-sm"
            aria-label="Sonraki ürün"
          >
            <ChevronRight className="h-5 w-5" />
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
        </>
      )}
    </div>
  )
}
