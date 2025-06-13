"use client"
import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react"
import Image from "next/image"

const colorCollections = [
  {
    id: 1,
    title: "Koleksiyon 1",
    image: "/placeholder.svg?height=600&width=800&text=Renk+Koleksiyonu+1",
  },
  {
    id: 2,
    title: "Koleksiyon 2",
    image: "/placeholder.svg?height=600&width=800&text=Renk+Koleksiyonu+2",
  },
  {
    id: 3,
    title: "Koleksiyon 3",
    image: "/placeholder.svg?height=600&width=800&text=Renk+Koleksiyonu+3",
  },
  {
    id: 4,
    title: "Koleksiyon 4",
    image: "/placeholder.svg?height=600&width=800&text=Renk+Koleksiyonu+4",
  },
  {
    id: 5,
    title: "Koleksiyon 5",
    image: "/placeholder.svg?height=600&width=800&text=Renk+Koleksiyonu+5",
  },
  {
    id: 6,
    title: "Koleksiyon 6",
    image: "/placeholder.svg?height=600&width=800&text=Renk+Koleksiyonu+6",
  },
  {
    id: 7,
    title: "Koleksiyon 7",
    image: "/placeholder.svg?height=600&width=800&text=Renk+Koleksiyonu+7",
  },
  {
    id: 8,
    title: "Koleksiyon 8",
    image: "/placeholder.svg?height=600&width=800&text=Renk+Koleksiyonu+8",
  },
  {
    id: 9,
    title: "Koleksiyon 9",
    image: "/placeholder.svg?height=600&width=800&text=Renk+Koleksiyonu+9",
  },
]

export default function ColorCollectionClient({ params }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { brandId } = params

  const nextSlide = () => {
    if (currentSlide < colorCollections.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-600 via-neutral-200 to-neutral-600">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Link
              href={`/urunler/${brandId}`}
              className="flex items-center text-gray-600 hover:text-orange-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Geri Dön
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {brandId?.charAt(0).toUpperCase() + brandId?.slice(1)} Renk Koleksiyonları
              </h1>
              <p className="text-gray-600">Özel olarak seçilmiş renk paletleri</p>
            </div>
          </div>
        </div>
      </div>

      {/* Color Collection Slider */}
      <div className="container mx-auto px-4 py-12">
        <div className="relative max-w-6xl mx-auto">
          {/* Slider Container */}
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {colorCollections.map((collection, index) => (
                <div key={collection.id} className="w-full flex-shrink-0">
                  <div className="relative h-[500px] md:h-[600px]">
                    <Image
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.title}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {currentSlide > 0 && (
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-gray-700 hover:text-orange-600 z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {currentSlide < colorCollections.length - 1 && (
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-gray-700 hover:text-orange-600 z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 space-x-2">
            {colorCollections.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-orange-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-500">
              {currentSlide + 1} / {colorCollections.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
