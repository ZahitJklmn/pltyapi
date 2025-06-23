"use client"
import { useState } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

// Tüm markaların iç cephe ürünleri
const allInteriorProducts = [
  {
    id: 1,
    brandId: 1,
    name: "Fenomastic Zen",
    link: "/urunler/jotun/ic-cephe-urunleri/fenomastic-zen",
    description: "Daima Güzel ve Temiz Duvarlar",
    image: "/jotun/ic-cephe/feno-zen-on.png?height=300&width=300&text=Fenomastic",
  },
  {
    id: 2,
    brandId: 1,
    name: "Fenomastic Güzel Evim Saf İpek",
    link: "/urunler/jotun/ic-cephe-urunleri/fenomastic-guzel-evim-saf-ipek",
    description: "Yumuşak görünüm ile doğal doku",
    image: "/jotun/ic-cephe/gevim-saf-ipek-on.png?height=300&width=300&text=Fenomastic",
  },
  {
    id: 3,
    brandId: 1,
    name: "Fenomastic Güzel Evim Mineral",
    link: "/urunler/jotun/ic-cephe-urunleri/fenomastic-guzel-evim-mineral",
    description: "Benzersiz renk oyunu",
    image: "/jotun/ic-cephe/gevim-mineral-on.png?height=300&width=300&text=Fenomastic",
  },
  {
    id: 4,
    brandId: 1,
    name: "Fenomastic Güzel Evim Mineral Şeffaf Koruyucu",
    link: "/urunler/jotun/ic-cephe-urunleri/fenomastic-guzel-evim-mineral-seffaf-koruyucu",
    description: "Mükemmel yüzeyler",
    image: "/jotun/ic-cephe/gevim-mineral-seffaf-on.png?height=300&width=300&text=Fenomastic",
  },
  {
    id: 5,
    brandId: 1,
    name: "Fenomastic Güzel Evim Zengin Mat",
    link: "/urunler/jotun/ic-cephe-urunleri/fenomastic-guzel-evim-zengin-mat",
    description: "Uzun ömürlü koruma.",
    image: "/jotun/ic-cephe/gevim-zengin-on.png?height=300&width=300&text=Fenomastic",
  },
  {
    id: 6,
    brandId: 1,
    name: "Fenomastic Primer",
    link: "/urunler/jotun/ic-cephe-urunleri/fenomastic-primer",
    description: "Usta Fırçaların Tercihi",
    image: "/jotun/ic-cephe/feno-primer-on.png?height=300&width=300&text=Fenomastic",  },
  {
    id: 7,
    brandId: 1,
    name: "Fenomastic Mat",
    link: "/urunler/jotun/ic-cephe-urunleri/fenomastic-mat",
    description: "Usta Fırçaların Tercihi",
    image: "/jotun/ic-cephe/feno-mat-on.png?height=300&width=300&text=Fenomastic",
  },
  {
    id: 8,
    brandId: 1,
    name: "Fenomastic İpek Mat",
    link: "/urunler/jotun/ic-cephe-urunleri/fenomastic-ipek-mat",
    description: "Usta Fırçaların Tercihi",
    image: "/jotun/ic-cephe/feno-ipek-mat-on.png?height=300&width=300&text=Fenomastic",
  },
  {
    id: 9,
    brandId: 1,
    name: "Fenomastic Macun",
    link: "/urunler/jotun/ic-cephe-urunleri/fenomastic-macun",
    description: "Usta Fırçaların Tercihi",
    image: "/jotun/ic-cephe/feno-macun-on.webp?height=300&width=300&text=Fenomastic",
  },
  {
    id: 10,
    brandId: 1,
    name: "Fenomastic Macun (Hazırlık)",
    link: "/urunler/jotun/ic-cephe-urunleri/fenomastic-macun-hazirlik",
    description: "Benzersiz mat doku ile daha güzel renkler",
    image: "/jotun/ic-cephe/feno-macun-on.webp?height=300&width=300&text=Fenomastic",
  },
  {
      id: 36,
      brandId: 2,
      name: "Bianca Stella Su Bazlı Saf Akrilik Boya",
      link: "bianca-stella-su-bazli-saf-akrilik-boya",
      description:
        "Tüm yüzeylere mükemmel yapışma özelliğine sahip, su bazlı, saf akrilik esaslı yeni nesil dönüşüm boyasıdır.",
      image: "/bianca/saf-akrilik.png?height=300&width=300&text=saf+akrilik+boya",
  },
  {
      id: 37,
      brandId: 2,
      name: "Bianca Stella Su Bazlı Saf Akrilik Boya (Ahşap Renkler)",
      link: "bianca-stella-su-bazli-saf-akrilik-boya-ahsap-renkler",
      description:
        "Bianca Stella boya uygulaması sonrası yüzeylere ahşap desen görünüm vermek için geliştirilmiş özel bir boyadır",
      image: "/bianca/saf-akrilik-ahsap.png?height=300&width=300&text=saf+akrilik+ahsap+boya",
  },
  {
      id: 38,
      brandId: 2,
      name: "Bianca Stella Su Bazlı Saf Akrilik Boya (Metal Renkler)",
      link: "bianca-stella-su-bazli-saf-akrilik-boya-metal-renkler",
      description:
        "Bianca Stella boya uygulaması sonrası yüzeylere metal görünümü vermek için geliştirilmiş özel bir boyadır.",
      image: "/bianca/saf-akrilik-metal.png?height=300&width=300&text=",
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
            style={{ backgroundImage: "url('/stock/ic-cephe.jpg?height=400&width=1200&text=İç Cephe Ürünleri')" }}
          ></div>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white">İç Cephe Ürünleri</h1>
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

<button
  className={`px-4 py-2 ${selectedBrand === 2 ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700 border border-black/20"} rounded-md`}
  onClick={() => setSelectedBrand(2)}
>
  Bianca
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
