"use client"
import { useEffect } from "react"
import HeroSlider from "@/components/HeroSlider"
import ProductGroups from "@/components/ProductGroups"
import FeaturedProductsSlider from "@/components/FeaturedProductsSlider"
import AboutSection from "@/components/AboutSection"
import BrandsSection from "@/components/BrandsSection"

export default function Home() {
  useEffect(() => {
    // Animation for sections when they come into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll(".animate-on-scroll").forEach((section) => {
      observer.observe(section)
    })

    return () => {
      document.querySelectorAll(".animate-on-scroll").forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-600 via-neutral-200 to-neutral-600">
      <HeroSlider />

      <section className="animate-on-scroll py-16 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Öne Çıkan Ürünlerimiz</h2>
          <FeaturedProductsSlider />
        </div>
      </section>

      <section className="animate-on-scroll py-16 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Ürün Gruplarımız</h2>
          <ProductGroups />
        </div>
      </section>

      <section className="animate-on-scroll py-16 mx-50 rounded-2xl bg-neutral-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Markalarımız</h2>
          <BrandsSection />
        </div>
      </section>

      <section className="animate-on-scroll py-16 ">
        <div className="container mx-auto px-4">
          <AboutSection />
        </div>
      </section>
    </div>
  )
}
