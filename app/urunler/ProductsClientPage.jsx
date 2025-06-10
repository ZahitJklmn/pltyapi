"use client"
import Link from "next/link"

export default function ProductsClientPage() {
  // Marka verileri direkt burada tanımlanıyor
  const brands = [
    {
      id: 1,
      name: "Jotun",
      slug: "jotun",
      description:
        "Jotun, yüksek kaliteli iç ve dış cephe boyaları sunan dünya çapında bir markadır. 1926'dan beri faaliyet gösteren Norveç kökenli marka, denizcilik, koruyucu kaplamalar ve dekoratif boyalar alanında lider konumdadır.",
      image_url: "/placeholder.svg?height=150&width=250&text=JOTUN",
    },
    {
      id: 2,
      name: "Filli Boya",
      slug: "filli-boya",
      description:
        "Filli Boya, Türkiye'nin önde gelen boya markalarından biridir. 1962'den beri kaliteli ürünler üreten marka, iç ve dış cephe boyalarında geniş ürün yelpazesi sunar.",
      image_url: "/placeholder.svg?height=150&width=250&text=FILLI+BOYA",
    },
    {
      id: 3,
      name: "Marshall",
      slug: "marshall",
      description:
        "Marshall, geniş renk seçenekleri ve kaliteli ürünleriyle tanınan bir boya markasıdır. İç ve dış cephe boyalarında uzman olan marka, dekoratif çözümler sunar.",
      image_url: "/placeholder.svg?height=150&width=250&text=MARSHALL",
    },
    {
      id: 4,
      name: "Hekim Panel",
      slug: "hekim-panel",
      description:
        "Hekim Panel, çatı ve cephe panelleri konusunda uzmanlaşmış bir markadır. Yalıtımlı panel sistemleri ve modern yapı çözümleri sunar.",
      image_url: "/placeholder.svg?height=150&width=250&text=HEKIM+PANEL",
    },
  ]

  return (
    <div className="pt-24 pb-16 bg-gradient-to-br from-neutral-600 via-neutral-200 to-neutral-600">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-12">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/placeholder.svg?height=400&width=1200&text=Ürünlerimiz')" }}
          ></div>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Ürünlerimiz</h1>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center mb-8 text-sm">
          <Link href="/" className="text-gray-500 hover:text-red-600">
            Anasayfa
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-800 font-medium">Ürünler</span>
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
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/urunler/${brand.slug}`}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg group"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={brand.image_url || "/placeholder.svg"}
                  alt={brand.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-800 group-hover:text-red-600 transition-colors duration-300">
                  {brand.name}
                </h3>
                <p className="text-gray-600 mb-4">{brand.description}</p>
                <div className="flex justify-end">
                  <span className="inline-flex items-center text-red-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                    Ürünleri İncele
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
