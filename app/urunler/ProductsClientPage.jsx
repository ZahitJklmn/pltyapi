"use client"
import Link from "next/link"
import { ChevronRight, ExternalLink, ArrowRight } from "lucide-react"

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

  const handleExternalLinkClick = (e, url) => {
    e.preventDefault()
    const confirmed = window.confirm(`${url} adresine gitmek istediğinizden emin misiniz?`)
    if (confirmed) {
      window.open(url, "_blank", "noopener,noreferrer")
    }
  }

  return (
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
          <p className="text-gray-600 mb-4">
            Aşağıda yer alan markalarımızın ürünlerini inceleyebilir, detaylı bilgi alabilirsiniz. Kalite ve güvenin
            adresi olan firmamız, en uygun fiyatlarla en iyi ürünleri sizlere sunmaktadır.
          </p>
          <p className="text-gray-600">
            Herhangi bir marka hakkında daha fazla bilgi almak veya ürünlerimizi incelemek için aşağıdaki markalardan
            birini seçebilirsiniz.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {brands.map((brand) => {
            // External link kontrolü
            const hasExternalLink = brand.external_link?.trim()
            const LinkComponent = hasExternalLink ? "a" : Link
            const linkProps = hasExternalLink
              ? {
                  href: brand.external_link,
                  onClick: (e) => handleExternalLinkClick(e, brand.external_link),
                }
              : {
                  href: `/urunler/${brand.slug}`,
                }

            return (
              <LinkComponent
              key={brand.id}
              {...linkProps}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={brand.image_url || "/placeholder.svg"}
                  alt={brand.name}
                  className="w-full h-full object-cover  transition-transform duration-500 group-hover:scale-110"
                />
                {/* External Link Badge */}
                {hasExternalLink && (
                    <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center shadow-lg">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Dış Bağlantı
                    </div>
                  )}
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
                          Siteye Git
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
              </LinkComponent>
            )
          })}
        </div>
      </div>
    </div>
  )
}
