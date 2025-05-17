"use client"
import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const slides = [
  {
    image: "/images/dukkan-foto2.jpg?height=600&width=1600&text=Slide 1",
    title: "Kaliteli Boya Çözümleri",
    description: "Profesyonel ve amatör kullanıcılar için en kaliteli boya ürünleri",
  },
  {
    image: "/images/dukkan-foto1.png?height=600&width=1600&text=Slide 2",
    title: "Geniş Ürün Yelpazesi",
    description: "İç cephe, dış cephe, ahşap ve metal boyaları tek çatı altında",
  },
  {
    image: "/images/dukkan-foto2.jpg?height=600&width=1600&text=Slide 3",
    title: "Uzman Kadro",
    description: "Deneyimli ekibimiz ile tüm boya ihtiyaçlarınızda yanınızdayız",
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoaded, setIsLoaded] = useState(Array(slides.length).fill(false))
  const autoPlayRef = useRef(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  // Mobil kontrolü
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Görsel yükleme durumunu takip et
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

  // Touch handlers
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

  // Auto play
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
      className="relative overflow-hidden mt-20"
      style={{
        height: isMobile ? "calc(70vh - 80px)" : "calc(100vh - 80px)",
        maxHeight: isMobile ? "400px" : "600px",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slider Track */}
      <div
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative min-w-full h-full flex-shrink-0">
            {/* Fallback Background Color */}
            <div className="absolute inset-0 bg-gray-300"></div>

            {/* Image with Scale Animation */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <div
                className={`w-full h-full transition-transform duration-10000 ease-out ${
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
                  className={`transition-opacity duration-500 ${isLoaded[index] ? "opacity-100" : "opacity-0"}`}
                />
              </div>
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4 z-10">
              <h2
                className={`text-3xl md:text-6xl font-bold mb-4 text-center transition-all duration-700 transform ${
                  currentSlide === index ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
              >
                {slide.title}
              </h2>
              <p
                className={`text-lg md:text-2xl max-w-2xl text-center transition-all duration-700 delay-200 transform ${
                  currentSlide === index ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
              >
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {!isMobile && (
    <>
    {/* Sol ok */}
    <button
      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-all duration-200 z-20"
      onClick={goToPrevSlide}
      aria-label="Önceki slayt"
    >
      <ChevronLeft className="h-6 w-6" />
    </button>

    {/* Sağ ok */}
    <button
      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-all duration-200 z-20"
      onClick={goToNextSlide}
      aria-label="Sonraki slayt"
    >
      <ChevronRight className="h-6 w-6" />
    </button>
  </>
)}


      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-white w-8" : "bg-white/50"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Slayt ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  )
}
