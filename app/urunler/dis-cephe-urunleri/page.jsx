"use client"
import { useState } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

// Tüm markaların iç cephe ürünleri
const allInteriorProducts = [
  {
    id: 11,
    brandId: 1,
    name: "Jotashield Real Matt",
    link: "/urunler/jotun/dis-cephe-urunleri/jotashield-real-matt",
    description: "Mükemmel dış cephe koruması​",
    image: "/jotun/dis-cephe/jota-real-matt-on.png?height=300&width=300&text=Jotashield",
  },
  {
    id: 12,
    brandId: 1,
    name: "Jotashield Tex Medium",
    link: "/urunler/jotun/dis-cephe-urunleri/jotashield-tex-medium",
    description: "Mükemmel dış cephe koruması​",
    image: "/jotun/dis-cephe/jota-tex-medium-on.png?height=300&width=300&text=Jotashield",
  },
  {
    id: 13,
    brandId: 1,
    name: "Jotashield Yüzey Güçlendirici Astar (Su Bazlı)",
    link: "/urunler/jotun/dis-cephe-urunleri/jota-yuzeysel-guclendirici-astar",
    description: "Mükemmel dış cephe koruması​",
    image: "/jotun/dis-cephe/jota-yuzeysel-guclendirici-astar-on.png?height=300&width=300&text=Jotashield",
  },
  {
    id: 14,
    brandId: 1,
    name: "Jotashield Yüzey Güçlendirici Astar (Solvent Bazlı)",
    link: "/urunler/jotun/dis-cephe-urunleri/jota-yuzey-guclendirici",
    description: "Mükemmel dış cephe koruması​",
    image: "/jotun/dis-cephe/jota-yuzey-guclendirici-on.png?height=300&width=300&text=Jotashield",
  },
  {
    id: 15,
    brandId: 1,
    name: "Jotun Aqua Pro Metal",
    link: "/urunler/jotun/dis-cephe-urunleri/jotun-aqua-pro-metal",
    description: "Mükemmel dış cephe koruması​",
    image: "/jotun/dis-cephe/jotun-aqua-pro-metal-on.png?height=300&width=300&text=Jotashield",
    hover_image: "/jotun/dis-cephe/jotun-aqua-pro-metal-arka.png?height=300&width=300&text=Jotashield+Detay",
  },
  {
    id: 16,
    brandId: 1,
    name: "Jotashield Clear",
    link: "/urunler/jotun/dis-cephe-urunleri/jota-clear",
    description: "Mükemmel dış cephe koruması​",
    image: "/jotun/dis-cephe/jota-clear-on.png?height=300&width=300&text=Jotashield",
  },
  {
    id: 17,
    brandId: 1,
    name: "Jotashield Heritage Glaze",
    link: "/urunler/jotun/dis-cephe-urunleri/jota-heritage-glaze",
    description: "Mükemmel dış cephe koruması​",
    image: "/jotun/dis-cephe/jota-heritage-glaze-on.png?height=300&width=300&text=Jotashield",
  },
  {
    id: 18,
    brandId: 1,
    name: "Jotashield SuperDurable",
    link: "/urunler/jotun/dis-cephe-urunleri/jota-superdurable",
    description: "Mükemmel dış cephe koruması​",
    image: "/jotun/dis-cephe/jota-superdrable-on.png?height=300&width=300&text=Jotashield",
  },
  {
    id: 19,
    brandId: 1,
    name: "Jotashield Extreme",
    link: "/urunler/jotun/dis-cephe-urunleri/jota-extreme",
    description: "Mükemmel dış cephe koruması���",
    image: "/jotun/dis-cephe/jota-extreme-on.png?height=300&width=300&text=Jotashield",
  },
  {
    id: 20,
    brandId: 1,
    name: "Jotashield Silk",
    link: "/urunler/jotun/dis-cephe-urunleri/jota-silk",
    description: "Mükemmel dış cephe koruması​",
    image: "/jotun/dis-cephe/jota-silk-on.png?height=300&width=300&text=Jotashield",
  },
  {
    id: 21,
    brandId: 1,
    name: "Jotashield Tex Ultra",
    link: "/urunler/jotun/dis-cephe-urunleri/jota-tex-ultra",
    description: "Mükemmel dış cephe koruması​",
    image: "/jotun/dis-cephe/jota-tex-ultra-on.png?height=300&width=300&text=Jotashield",
  },
  {
    id: 22,
    brandId: 1,
    name: "TREBITT Transparent",
    link: "/urunler/jotun/dis-cephe-urunleri/tre-transparent",
    description: "Mükemmel dış cephe koruması​",
    image: "/jotun/dis-cephe/tre-transparent-on.png?height=300&width=300&text=Jotashield",
  },
  {
    id: 23,
    brandId: 1,
    name: "Jotashield Alkali Dayanımlı Astar",
    link: "/urunler/jotun/dis-cephe-urunleri/jota-alkali-dayanimli-astar",
    description: "Mükemmel dış cephe koruması​",
    image: "/jotun/dis-cephe/jota-alkali-dayanimli-astar-on.png?height=300&width=300&text=Jotashield",
  },
  {
    id: 24,
    brandId: 1,
    name: "Jotashield Matt",
    link: "/urunler/jotun/dis-cephe-urunleri/jota-matt",
    description: "Mükemmel dış cephe koruması​",
    image: "/jotun/dis-cephe/jota-matt-on.png?height=300&width=300&text=Jotashield",
  },
  {
    id: 25,
    brandId: 1,
    name: "VISIR Oljegrunning Klar",
    link: "/urunler/jotun/dis-cephe-urunleri/visir-oljegrunning-klar",
    description: "Mükemmel dış cephe koruması​",
    image: "/jotun/dis-cephe/visir-oljegrunning-klar-on.png?height=300&width=300&text=Jotashield",
  },
  {
    id: 26,
    brandId: 1,
    name: "Demidekk Ultimate Tackfarg",
    link: "/urunler/jotun/dis-cephe-urunleri/demidekk-ultimate-tactfarg",
    description: "Mükemmel dış cephe koruması​",
    image: "/jotun/dis-cephe/demidekk-ultimate-tactfarg-on.png?height=300&width=300&text=Jotashield",
  },
  {
    id: 27,
    brandId: 1,
    name: "Demidekk Infinity Details",
    link: "/urunler/jotun/dis-cephe-urunleri/demidekk-infinity-details",
    description: "Mükemmel dış cephe koruması​",
    image: "/jotun/dis-cephe/demidekk-infinity-details-on.png?height=300&width=300&text=Jotashield",
  },
]

export default function InteriorProductsPage() {
  const [selectedBrand, setSelectedBrand] = useState("all")

  const brandMap = {
    1: "Jotun",
    2: "Bianca",
    3: "Mapei",
    // ...diğer markalar
  }
  

  // Filtreleme fonksiyonu
  const filteredProducts =
  selectedBrand === "all"
    ? allInteriorProducts
    : allInteriorProducts.filter((product) => product.brandId === selectedBrand)

  return (
    <div className="pt-24 pb-16 bg-gradient-to-br from-neutral-600 via-neutral-200 to-neutral-600">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-12">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/stock/dis-cephe.jpg?height=400&width=1200&text=İç Cephe Ürünleri')" }}
          ></div>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Dış Cephe Ürünleri</h1>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center mb-8 text-sm">
          <Link href="/" className="text-black hover:text-red-600 transition-all duration-200">
            Anasayfa
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-neutral-900" />
          <Link href="/urunler" className="text-black hover:text-red-600 transition-all duration-200">
            Ürünler
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-neutral-900" />
          <span className="text-red-600 font-medium">İç Cephe Ürünleri</span>
        </div>

        {/* Intro Text */}
        <div className="mb-12">
          <p className="text-neutral-800 max-w-3xl">
            İç cephe ürünlerimiz, evinizin duvarlarına mükemmel bir görünüm kazandırmak için tasarlanmıştır. Yüksek
            kapatıcılık, silinebilirlik ve dayanıklılık özellikleriyle öne çıkan ürünlerimiz, farklı markaların en
            kaliteli seçeneklerini bir araya getirmektedir.
          </p>
        </div>

        {/* Filter Options */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="font-medium text-gray-700">Filtrele:</div>
            <div className="flex flex-wrap gap-2">
            <button
  className={`px-4 py-2 ${selectedBrand === "all" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700 border border-black/20"} rounded-md`}
  onClick={() => setSelectedBrand("all")}
>
  Tüm Markalar
</button>

<button
  className={`px-4 py-2 ${selectedBrand === 1 ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700 border border-black/20"} rounded-md`}
  onClick={() => setSelectedBrand(1)}
>
  Jotun
</button>

            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="h-94 overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
              <div className="text-sm text-red-600 font-medium mb-1">
  {brandMap[product.brandId]}
</div>

                <h3 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 h-16 overflow-hidden">{product.description}</p>
                <div className="flex justify-end items-center">
                  <Link
                    href={product.link}
                    className="bg-red-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-red-700 transition-colors duration-300"
                  >
                    İncele
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ürün bulunamadı mesajı */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Ürün Bulunamadı</h3>
            <p className="text-gray-600">Seçilen filtrelere uygun ürün bulunmamaktadır.</p>
          </div>
        )}
      </div>
    </div>
  )
}
