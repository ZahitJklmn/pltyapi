"use client"
import { useEffect } from "react"
import HeroSlider from "@/components/HeroSlider"
import ProductGroups from "@/components/ProductGroups"
import FeaturedProductsSlider from "@/components/FeaturedProductsSlider"
import AboutSection from "@/components/AboutSection"
import BrandsSection from "@/components/BrandsSection"

export default function ClientPage() {
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
      {/* SEO için yapılandırılmış veri */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Plt Yapı Tokat",
            description: "Tokat'ın güvenilir boya malzemeleri ve yapı ürünleri tedarikçisi",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Tokat",
              addressCountry: "TR",
            },
            url: "https://pltyapitokat.com",
            sameAs: ["https://www.facebook.com/pltyapitokat", "https://www.instagram.com/pltyapitokat"],
          }),
        }}
      />

      <HeroSlider />

      <section className="animate-on-scroll py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Plt Yapı Tokat - Jotun Boya Ürünleri ve Yapı Malzemeleri
          </h1>
          <p className="text-lg text-center mb-12 text-gray-800 max-w-4xl mx-auto">
            Tokat'ın güvenilir boya malzemeleri tedarikçisi Plt Yapı'da Jotun boya ürünleri, Tepe Betopan, yapı
            malzemeleri ve profesyonel boya çözümlerini keşfedin. Kaliteli ürünler ve uzman hizmetiyle yanınızdayız.
          </p>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Öne Çıkan Ürünlerimiz</h2>
          <FeaturedProductsSlider />
        </div>
      </section>

      <section id="product-groups-section" className="animate-on-scroll py-16 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Boya ve Boya Ürünleri Kategorilerimiz</h2>
          <p className="text-center mb-12 text-gray-800">
            Plt Yapı Tokat olarak geniş ürün yelpazemizle tüm boya ve yapı malzemesi ihtiyaçlarınızı karşılıyoruz.
          </p>
          <ProductGroups />
        </div>
      </section>

      <section className="animate-on-scroll py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Jotun Tokat ve Diğer Markalarımız</h2>
          <p className="text-center mb-12 text-gray-800">
            Jotun başta olmak üzere dünya çapında tanınmış markaların Tokat'taki yetkili satış noktasıyız.
          </p>
          <BrandsSection />
        </div>
      </section>

      <section className="animate-on-scroll py-16 ">
        <div className="container mx-auto px-4">
          <AboutSection />
        </div>
      </section>

      {/* Tokat boya malzemeleri hakkında ek bilgi bölümü */}
      <section className="animate-on-scroll py-16 bg-gradient-to-br from-neutral-800 via-neutral-600 to-neutral-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-white inline-block"><div className="flex items-center">Neden <img src="/images/plt-yapi-text.png" alt="PLT YAPI" width={160} className="mx-3" draggable="false"/> Tokat?</div></h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4 text-neutral-200 underline">Jotun Yetkili Satıcısı</h3>
                <p className="text-gray-300">
                  Tokat'ta Jotun boya ürünlerinin yetkili satış noktası olarak orijinal ve kaliteli ürünler sunuyoruz.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4 text-neutral-200 underline">Tepe Betopan Uzmanı</h3>
                <p className="text-gray-300">
                  Tokat Tepe Betopan ürünlerinde uzman kadromuzla profesyonel çözümler sağlıyoruz.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4 text-neutral-200 underline">Yerel Hizmet</h3>
                <p className="text-gray-300">Tokat boya malzemeleri sektöründe yıllardır güvenilir hizmet veriyoruz.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
