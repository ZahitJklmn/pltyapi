"use client"
import { useState } from "react"
import Link from "next/link"
import { ChevronRight, ExternalLink, ArrowRight, X } from "lucide-react"

// Link Wrapper Component
function LinkWrapper({ href, externalLink, children, className, ...props }) {
  const finalHref = externalLink || href
  const isExternal = !!externalLink

  if (isExternal) {
    return (
      <a
        href={finalHref}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={finalHref} className={className} {...props}>
      {children}
    </Link>
  )
}


export default function ProductsClientPage() {

  // Marka verileri direkt burada tanımlanıyor
  const brands = [
    {
      id: 1,
      name: "Jotun",
      slug: "jotun",
      description:
        "Jotun, yüksek kaliteli iç ve dış cephe boyaları sunan dünya çapında bir markadır. 1926'dan beri faaliyet gösteren Norveç kökenli marka, denizcilik, koruyucu kaplamalar ve dekoratif boyalar alanında lider konumdadır.",
      image_url: "/marka-urun-karti/jotun.png?height=150&width=250&text=JOTUN",
    },
    {
      id: 2,
      name: "Mapei",
      slug: "mapei",
      description:
        "Mapei, inşaat sektöründe yapıştırıcılar, harçlar ve kaplama malzemeleri üreten uluslararası bir markadır. 1937'de İtalya'da kurulan Mapei, yenilikçi ürünleri ve geniş ürün yelpazesi ile tanınır.",
      image_url: "/marka-urun-karti/mapei.png?height=150&width=250&text=MAPEI",
      external_link: "https://www.mapei.com/tr/tr/urunler-ve-cozumler",
    },
    {
      id: 3,
      name: "Tepe Betopan",
      slug: "tepe-betopan",
      description:
        "Tepe Betopan, prefabrik yapı elemanları ve çatı sistemleri üreten Türkiye merkezli bir markadır. Yüksek kaliteli beton panelleri ile inşaat sektöründe önemli bir yere sahiptir.",
      image_url: "/marka-urun-karti/tepe-betopan.png?height=150&width=250&text=TEPE+BETOPAN",
    },
    {
      id: 4,
      name: "Tepepan",
      slug: "tepepan",
      description:
        "Tepepan, prefabrik yapı elemanları ve inşaat malzemeleri üreten bir markadır. Tepe Grubu'nun bir parçası olarak, yüksek kaliteli ürünleri ile sektördeki yerini sağlamlaştırmıştır.",
      image_url: "/marka-urun-karti/tepepan.png?height=150&width=250&text=TEPEPAN",
    },
    {
      id: 5,
      name: "Bianca Stella",
      slug: "bianca",
      description:
        "Bianca Stella, iç cephe boyaları ve dekoratif kaplama ürünleri üreten bir markadır. Kaliteli ve estetik çözümleri ile ev dekorasyonunda tercih edilen markalardan biridir.",
      image_url: "/marka-urun-karti/bianca.png?height=150&width=250&text=BIANCA+STELLA",
    },
  ]

  // Marka verilerinin hemen altına eklenmeli
const categories = [
  {
    id: 1,
    name: "İç Cephe Ürünleri",
    image_url: "/images/ic-cephe-kart.jpg?height=300&width=400&text=İç Cephe",
    slug: "ic-cephe-urunleri",
    description: "İç mekanlar için kaliteli boya ve kaplama çözümleri.",
  },
  {
    id: 2,
    name: "Dış Cephe Ürünleri",
    image_url: "/images/dis-cephe-kart.png?height=300&width=400&text=Dış Cephe",
    slug: "dis-cephe-urunleri",
    description: "Dış cephelerde uzun ömürlü dayanıklılık ve estetik sağlayan ürünler.",
  },
  {
    id: 3,
    name: "Çimentolu Levhalar",
    image_url: "/stock/cimentolu-levhalar.jpg?height=300&width=400&text=Çimentolu Levhalar",
    slug: "cimentolu-levhalar",
    description: "Çimentolu levhalar, dayanıklı ve çok yönlü yapı malzemeleri.",
  },
  {
    id: 4,
    name: "Boya Ekipmanları",
    image_url: "/stock/boya-ekipmanlari.webp?height=300&width=400&text=Ekipman",
    slug: "boya-ekipmanlari",
    description: "Boya uygulamaları için gerekli tüm ekipmanlar ve araçlar.",
  },
  {
    id: 5,
    name: "Özel Efekt Boyaları",
    image_url: "/stock/ozel-efekt-boyasi.jpg?height=300&width=400&text=Özel Efekt",
    slug: "ozel-efekt-boyalari",
    description: "Özel efekt boyaları, dekoratif ve estetik çözümler sunar. Bu boyalar, iç mekanlarda farklı dokular ve görünümler elde etmek için kullanılır.",
  },
  {
    id: 6,
    name: "Diğer Ürünler",
    image_url: "/stock/our-products2.jpg?height=300&width=400&text=Diğer Ürünler",
    slug: "diger-urunler",
    description: "Diğer ürünler, markalarımızın sunduğu çeşitli yapı malzemeleri ve dekorasyon çözümlerini içerir. Bu kategoride, farklı ihtiyaçlara yönelik ürünler bulabilirsiniz.",
  },
]


  const handleExternalRedirect = (url) => {
    window.open(url, "_blank", "noopener,noreferrer")
    setConfirmModal({ isOpen: false, url: "", title: "" })
  }

  const closeModal = () => {
    setConfirmModal({ isOpen: false, url: "", title: "" })
  }

  return (
    <>
      <div className="pt-24 pb-16 bg-gradient-to-br from-neutral-600 via-neutral-200 to-neutral-600">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-12">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/stock/our-products.jpg?height=400&width=1200&text=Ürünlerimiz')" }}
            ></div>
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white">Ürünlerimiz</h1>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center mb-8 text-sm">
            <Link href="/" className="text-black hover:text-red-600 transition-all duration-200">
              Anasayfa
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-neutral-900" />
            <span className="text-red-600 font-medium">Ürünler</span>
          </div>

          {/* Intro */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Markalarımız</h2>
            <p className="text-gray-800 mb-4">
              Aşağıda yer alan markalarımızın ürünlerini inceleyebilir, detaylı bilgi alabilirsiniz. Kalite ve güvenin
              adresi olan firmamız, en uygun fiyatlarla en iyi ürünleri sizlere sunmaktadır.
            </p>
            <p className="text-gray-800">
              Herhangi bir marka hakkında daha fazla bilgi almak veya ürünlerimizi incelemek için aşağıdaki markalardan
              birini seçebilirsiniz.
            </p>
          </div>

          {/* Brands Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((brand) => {
              const hasExternalLink = brand.external_link?.trim()

              return (
                <LinkWrapper
                  key={brand.id}
                  href={`/urunler/${brand.slug}`}
                  externalLink={brand.external_link}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg group"
                  title={brand.name}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={brand.image_url || "/placeholder.svg"}
                      alt={brand.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-gray-800 group-hover:text-red-600 transition-colors duration-300">
                      {brand.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{brand.description}</p>
                    <div className="flex justify-end">
                      <span className="inline-flex items-center text-red-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                        {hasExternalLink ? (
                          <>
                            <ExternalLink className="w-5 h-5 mr-1" />
                            Ürünleri İncele
                          </>
                        ) : (
                          <>
                            Ürünleri İncele
                            <ArrowRight className="w-5 h-5 ml-1" />
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </LinkWrapper>
              )
            })}
          </div>
{/* Kategoriler Bölümü */}
<div className="mt-20">
  <div className="bg-white rounded-lg shadow-md p-8 mb-12">
    <h2 className="text-3xl font-bold mb-4 text-gray-800">Ürün Kategorilerimiz</h2>
    <p className="text-gray-800">
      Aşağıdaki ürün kategorilerimizi keşfedin. Her biri farklı ihtiyaçlara uygun özel çözümler sunar.
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {categories.map((cat) => (
      <Link
        key={cat.id}
        href={`/urunler/${cat.slug}`}
        className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg group"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={cat.image_url || "/placeholder.svg"}
            alt={cat.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2 text-gray-800 group-hover:text-red-600 transition-colors duration-300">
            {cat.name}
          </h3>
          <p className="text-gray-600">{cat.description}</p>
          <div className="flex justify-end">
          <span className="inline-flex items-center text-red-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                    Ürünleri İncele
                    <ArrowRight className="w-5 h-5 ml-1" />
          </span>
          </div>
        </div>
      </Link>
    ))}
  </div>
</div>

        </div>
      </div>
    </>
  )
}
