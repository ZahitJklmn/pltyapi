"use client"
import { useState } from "react"
import Link from "next/link"

// Tüm markaların iç cephe ürünleri
const allInteriorProducts = [
  {
    id: "jotun-fenomastic",
    brand: "Jotun",
    name: "Fenomastic",
    image: "/placeholder.svg?height=300&width=300&text=Fenomastic",
    description: "Yüksek kapatıcılığa sahip, silinebilir iç cephe boyası.",
    link: "/urunler/jotun/ic-cephe-urunleri/fenomastic",
  },
  {
    id: "jotun-majestic",
    brand: "Jotun",
    name: "Majestic",
    image: "/placeholder.svg?height=300&width=300&text=Majestic",
    description: "Leke tutmayan, ipeksi mat görünümlü iç cephe boyası.",
    link: "/urunler/jotun/ic-cephe-urunleri/majestic",
  },
  {
    id: "filli-elegans",
    brand: "Filli Boya",
    name: "Elegans",
    image: "/placeholder.svg?height=300&width=300&text=Elegans",
    description: "Silinebilir, yüksek kapatıcılığa sahip iç cephe boyası.",
    link: "/urunler/filli-boya/ic-cephe-boyalari/elegans",
  },
  {
    id: "filli-momento",
    brand: "Filli Boya",
    name: "Momento",
    image: "/placeholder.svg?height=300&width=300&text=Momento",
    description: "Dekoratif, özel dokulu iç cephe boyası.",
    link: "/urunler/filli-boya/ic-cephe-boyalari/momento",
  },
  {
    id: "marshall-maksimum",
    brand: "Marshall",
    name: "Maksimum",
    image: "/placeholder.svg?height=300&width=300&text=Maksimum",
    description: "Maksimum kapatıcılık sağlayan iç cephe boyası.",
    link: "/urunler/marshall/ic-cephe-boyalari/maksimum",
  },
  {
    id: "marshall-elegance",
    brand: "Marshall",
    name: "Elegance",
    image: "/placeholder.svg?height=300&width=300&text=Elegance",
    description: "Silinebilir, ipeksi mat iç cephe boyası.",
    link: "/urunler/marshall/ic-cephe-boyalari/elegance",
  },
  {
    id: "dyo-teknotex",
    brand: "DYO",
    name: "Teknotex",
    image: "/placeholder.svg?height=300&width=300&text=Teknotex",
    description: "Ekonomik, yüksek örtücülüğe sahip iç cephe boyası.",
    link: "/urunler/dyo/ic-cephe-boyalari/teknotex",
  },
  {
    id: "dyo-dyotex",
    brand: "DYO",
    name: "Dyotex",
    image: "/placeholder.svg?height=300&width=300&text=Dyotex",
    description: "Silinebilir, leke tutmayan iç cephe boyası.",
    link: "/urunler/dyo/ic-cephe-boyalari/dyotex",
  },
]

export default function InteriorProductsPage() {
  const [selectedBrand, setSelectedBrand] = useState("all")

  // Filtreleme fonksiyonu
  const filteredProducts =
    selectedBrand === "all"
      ? allInteriorProducts
      : allInteriorProducts.filter((product) => product.brand.toLowerCase() === selectedBrand.toLowerCase())

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-12">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/placeholder.svg?height=400&width=1200&text=İç Cephe Ürünleri')" }}
          ></div>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white">İç Cephe Ürünleri</h1>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center mb-8 text-sm">
          <Link href="/" className="text-gray-500 hover:text-red-600">
            Anasayfa
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link href="/urunler" className="text-gray-500 hover:text-red-600">
            Ürünler
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-800 font-medium">İç Cephe Ürünleri</span>
        </div>

        {/* Intro Text */}
        <div className="mb-12">
          <p className="text-gray-600 max-w-3xl">
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
                className={`px-4 py-2 ${selectedBrand === "all" ? "bg-red-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"} rounded-md`}
                onClick={() => setSelectedBrand("all")}
              >
                Tüm Markalar
              </button>
              <button
                className={`px-4 py-2 ${selectedBrand === "jotun" ? "bg-red-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"} rounded-md`}
                onClick={() => setSelectedBrand("jotun")}
              >
                Jotun
              </button>
              <button
                className={`px-4 py-2 ${selectedBrand === "filli boya" ? "bg-red-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"} rounded-md`}
                onClick={() => setSelectedBrand("filli boya")}
              >
                Filli Boya
              </button>
              <button
                className={`px-4 py-2 ${selectedBrand === "marshall" ? "bg-red-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"} rounded-md`}
                onClick={() => setSelectedBrand("marshall")}
              >
                Marshall
              </button>
              <button
                className={`px-4 py-2 ${selectedBrand === "dyo" ? "bg-red-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"} rounded-md`}
                onClick={() => setSelectedBrand("dyo")}
              >
                DYO
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
              <div className="h-64 overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-red-600 font-medium mb-1">{product.brand}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 h-12 overflow-hidden">{product.description}</p>
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
