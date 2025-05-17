"use client"
import { useEffect } from "react"
import HeroSlider from "@/components/HeroSlider"
import ProductGroups from "@/components/ProductGroups"
import FeaturedProductsSlider from "@/components/FeaturedProductsSlider"
import AboutSection from "@/components/AboutSection"
import BrandsSection from "@/components/BrandsSection"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Supabase yapılandırmasını kontrol et
    const storedUrl = localStorage.getItem("SUPABASE_URL")
    const storedKey = localStorage.getItem("SUPABASE_ANON_KEY")

    // Eğer Supabase yapılandırması yoksa, yapılandırma sayfasına yönlendir
    if (!storedUrl || !storedKey) {
      router.push("/env-setup")
    }
  }, [router])

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
    <div className="min-h-screen">
      <HeroSlider />

      <section className="animate-on-scroll py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Öne Çıkan Ürünlerimiz</h2>
          <FeaturedProductsSlider />
        </div>
      </section>

      <section className="animate-on-scroll py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Ürün Gruplarımız</h2>
          <ProductGroups />
        </div>
      </section>

      <section className="animate-on-scroll py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Markalar</h2>
          <BrandsSection />
        </div>
      </section>

      <section className="animate-on-scroll py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <AboutSection />
        </div>
      </section>
    </div>
  )
}
