"use client"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import Image from "next/image"

const slides = [
  {
    image: "/images/slide-1.jpg?height=600&width=1600&text=Slide+3",
    title: "Uzman Kadro",
    description: "Deneyimli ekibimiz ile tüm boya ihtiyaçlarınızda yanınızdayız",
    cta: "İletişime Geç",
    path: "/iletisim",
  },
  {
    image: "/images/slide-2.jpg?height=600&width=1600&text=Slide+1",
    title: "Kaliteli Boya Çözümleri",
    description: "Profesyonel ve amatör kullanıcılar için en kaliteli boya ürünleri",
    cta: "Ürünleri Keşfet",
    path: "/urunler",
  },
  {
    image: "/images/genis-urun-yelpazesi.jpg?height=600&width=1600&text=Slide+2",
    title: "Geniş Ürün Yelpazesi",
    description: "İç cephe, dış cephe, ahşap ve metal boyaları tek çatı altında",
    cta: "Katalog İncele",
    path: "/urunler",
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(Array(slides.length).fill(false))
  const autoPlayRef = useRef(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const router = useRouter()

  const handleImageLoad = (index) => {
    const newLoadedState = [...isLoaded]
    newLoadedState[index] = true
    setIsLoaded(newLoadedState)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const handleCTAClick = (path, index) => {
    if (index === 2) {
      // 3. slayttaki buton
      const element = document.getElementById("product-groups-section")
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      router.push(path)
    }
  }
  
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      goToNextSlide()
    } else if (touchStartX.current - touchEndX.current < -50) {
      goToPrevSlide()
    }
    touchStartX.current = 0
    touchEndX.current = 0
  }

  useEffect(() => {
    autoPlayRef.current = setInterval(goToNextSlide, 5000)
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [currentSlide])

  return (
    <div
      className="relative overflow-hidden mt-0 bg-black aspect-[10/12] md:aspect-[16/7] "
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slider Track */}
      <div
        className="absolute inset-0 flex transition-transform duration-1000 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative min-w-full h-full flex-shrink-0">
            {/* Image with Parallax Effect */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <div
                className={`relative w-full h-full transition-all duration-12000 ease-out ${
                  currentSlide === index ? "scale-110" : "scale-100"
                }`}
              >
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  style={{ objectFit: "cover" }}
                  onLoad={() => handleImageLoad(index)}
                  className="transition-opacity duration-500"
                />
              </div>
            </div>

            {/* Modern Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

            {/* Content with Modern Layout */}
            <div className="absolute inset-0 flex items-center z-10">
              <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-3xl">
                  {/* Animated Line */}
                  <div
                    className={`w-20 h-1 bg-gradient-to-r from-orange-500 to-red-600 mb-6 transition-all duration-1000 delay-300 ${
                      currentSlide === index ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                    }`}
                  ></div>

                  {/* Title */}
                  <h1
                    className={`text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-white leading-tight transition-all duration-1000 delay-500 ${
                      currentSlide === index ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                  >
                    <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {slide.title}
                    </span>
                  </h1>

                  {/* Description */}
                  <p
                    className={`text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 max-w-2xl leading-relaxed transition-all duration-1000 delay-700 ${
                      currentSlide === index ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                  >
                    {slide.description}
                  </p>

                  {/* CTA Button */}
                  <div
                    className={`transition-all duration-1000 delay-900 ${
                      currentSlide === index ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                  >
                    <button
                      onClick={() => handleCTAClick(slide.path, index)}
                      className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-lg rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/25 hover:scale-105"
                    >
                      <span className="relative z-10 flex items-center">
                        {slide.cta}
                        <Play className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modern Navigation Arrows */}
      <button
        className="hidden md:block absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-black/30 backdrop-blur-sm border border-white/20 hover:bg-black/50 text-white rounded-full transition-all duration-300 z-20 group hover:scale-110"
        onClick={goToPrevSlide}
        aria-label="Önceki slayt"
      >
        <ChevronLeft className="h-4 w-4 md:h-6 md:w-6 mx-auto transition-transform group-hover:-translate-x-0.5" />
      </button>

      <button
        className="hidden md:block absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-black/30 backdrop-blur-sm border border-white/20 hover:bg-black/50 text-white rounded-full transition-all duration-300 z-20 group hover:scale-110"
        onClick={goToNextSlide}
        aria-label="Sonraki slayt"
      >
        <ChevronRight className="h-4 w-4 md:h-6 md:w-6 mx-auto transition-transform group-hover:translate-x-0.5" />
      </button>

      {/* Modern Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`relative transition-all duration-500 ${
              currentSlide === index
                ? "w-12 h-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-full"
                : "w-3 h-3 bg-white/40 rounded-full hover:bg-white/60"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Slayt ${index + 1}`}
          >
            {currentSlide === index && (
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-full animate-pulse"></div>
            )}
          </button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 text-white/60 text-sm font-medium z-20">
        <div className="flex items-center space-x-2">
          <span>{String(currentSlide + 1).padStart(2, "0")}</span>
          <div className="w-8 h-px bg-white/40"></div>
          <span>{String(slides.length).padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  )
}
