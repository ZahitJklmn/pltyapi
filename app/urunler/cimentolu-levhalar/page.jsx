"use client"
import { useState } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

// Tüm markaların iç cephe ürünleri
const allInteriorProducts = [

        // Tepe Betopan Çimentolu Yonga Levhalar 
    {
        id: 28,
        brandId: 1,
        name: "Betopan",
        link: "/urunler/tepe-betopan/cimentolu-yonga-levhalar/betopan",
        description:
          "Betopan®, yapılarda temelden çatıya kullanılabilen, düz ve doğal gri yüzeyli, fonksiyonel bir çimentolu yonga levhadır.",
        image: "/betopan/betopan.png?height=300&width=300&text=",
      },
      {
        id: 29,
        brandId: 1,
        name: "Betopan Plus",
        link: "/urunler/tepe-betopan/cimentolu-yonga-levhalar/betopan-plus",
        description:
          "Betopanplus® her iki yüzeyi doğal minerallerle güçlendirilmiş düz yüzeyli çimentolu yonga levhadır. Çimento ve ahşap karışımından oluşan orta katmana sahiptir.",
        image: "/betopan/betopan.png?height=300&width=300&text=",
      },
      {
        id: 30,
        brandId: 1,
        name: "Yalıpan",
        link: "/urunler/tepe-betopan/cimentolu-yonga-levhalar/yalipan",
        description:
          "Yalıpan® her iki yüzeyi doğal minerallerle güçlendirilmiş ahşap desenli çimentolu yonga levhadır. Çimento ve ahşap karışımından oluşan orta katmana sahiptir.",
        image: "/betopan/yalipan.png?height=300&width=300&text=",
      },
      {
        id: 31,
        brandId: 1,
        name: "Taşonit",
        link: "/urunler/tepe-betopan/cimentolu-yonga-levhalar/tasonit",
        description:
          "Taşonit® her iki yüzeyi doğal minerallerle güçlendirilmiş taş desenli çimentolu yonga levhadır. Çimento ve ahşap karışımından oluşan orta katmana sahiptir.",
        image: "/betopan/tasonit.png?height=300&width=300&text=",
      },

          // Tepepan Elyaf Takviyeli Çimentolu Levhalar
    {
      id: 32,
      brandId: 2,
      name: "Tepepan",
      link: "/urunler/tepepan/elyaf-takviyeli-levhalar/tepepan",
      description: "tepePAN, çimento ve elyaf karışımından oluşan düz yüzeyli, çok amaçlı bir yapı levhasıdır.",
      image: "/tepepan/tepepan.png?height=300&width=300&text=",
    },
    {
      id: 33,
      brandId: 2,
      name: "Tepepan Pro",
      link: "/urunler/tepepan/elyaf-takviyeli-levhalar/tepepan-pro",
      description:
        "Presli ve üstün dayanım özellikleriyle dış cephe ve iç mekan uygulamaları için  kullanıcılara kalınlık skalası sunan düz yüzeyli, çok amaçlı elyaf takviyeli çimento esaslı yapı levhasıdır.",
      image: "/tepepan/tepepan.png?height=300&width=300&text=",
    },
    {
      id: 34,
      brandId: 2,
      name: "Tepepan Wood",
      link: "/urunler/tepepan/elyaf-takviyeli-levhalar/tepepan-wood",
      description: "tepePAN Wood®, çimento ve elyaf karışımından oluşan ahşap desenli, çok amaçlı bir yapı levhasıdır.",
      image: "/tepepan/tepepan-wood.png?height=300&width=300&text=",
    },
    {
      id: 35,
      brandId: 2,
      name: "Tepepan Stone",
      link: "/urunler/tepepan/elyaf-takviyeli-levhalar/tepepan-stone",
      description: "tepePAN Stone®, çimento ve elyaf karışımından oluşan taş desenli, çok amaçlı bir yapı levhasıdır.",
      image: "/tepepan/tepepan-stone.png?height=300&width=300&text=",
    }, 
]

export default function InteriorProductsPage() {
  const [selectedBrand, setSelectedBrand] = useState("all")

  const brandMap = {
    1: "Tepe Betopan",
    2: "Tepepan",
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
            style={{ backgroundImage: "url('/placeholder.svg?height=400&width=1200&text=İç Cephe Ürünleri')" }}
          ></div>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Çimentolu Levhalar</h1>
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
  Tepe Betopan
</button>

<button
  className={`px-4 py-2 ${selectedBrand === 2 ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700 border border-black/20"} rounded-md`}
  onClick={() => setSelectedBrand(2)}
>
  Tepepan
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
