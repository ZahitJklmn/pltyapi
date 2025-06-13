"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function BrandPageClient({ params }) {
  const { brandId } = params || {}
  const [brand, setBrand] = useState(null)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Tüm markalar
  const brands = [
 {
      id: 1,
      name: "Jotun",
      slug: "jotun",
      description:
        "Jotun, yüksek kaliteli iç ve dış cephe boyaları sunan dünya çapında bir markadır. 1926'dan beri faaliyet gösteren Norveç kökenli marka, denizcilik, koruyucu kaplamalar ve dekoratif boyalar alanında lider konumdadır.",
      image_url: "/images/jotun-logo.png?height=150&width=250&text=JOTUN",
    },
    {
      id: 2,
      name: "Mapei",
      slug: "mapei",
      description:
        "Mapei, inşaat sektöründe yapıştırıcılar, harçlar ve kaplama malzemeleri üreten uluslararası bir markadır. 1937'de İtalya'da kurulan Mapei, yenilikçi ürünleri ve geniş ürün yelpazesi ile tanınır.",
      image_url: "/images/?height=150&width=250&text=MAPEI",
    },
    {
      id: 3,
      name: "Tepe Betopan",
      slug: "tepe-betopan",
      description:
        "Tepe Betopan, prefabrik yapı elemanları ve çatı sistemleri üreten Türkiye merkezli bir markadır. Yüksek kaliteli beton panelleri ile inşaat sektöründe önemli bir yere sahiptir.",
      image_url: "/images/?height=150&width=250&text=TEPE+BETOPAN",
    },
    {
      id: 4,
      name: "Tepepan",
      slug: "tepepan",
      description:
        "Tepepan, prefabrik yapı elemanları ve inşaat malzemeleri üreten bir markadır. Tepe Grubu'nun bir parçası olarak, yüksek kaliteli ürünleri ile sektördeki yerini sağlamlaştırmıştır.",
      image_url: "/images/?height=150&width=250&text=TEPEPAN",
    },
    {
      id: 5,
      name: "Bianca Stella",
      slug: "bianca",
      description:
        "Bianca Stella, iç cephe boyaları ve dekoratif kaplama ürünleri üreten bir markadır. Kaliteli ve estetik çözümleri ile ev dekorasyonunda tercih edilen markalardan biridir.",
      image_url: "/images/?height=150&width=250&text=BIANCA+STELLA",
    },
  ]

  // Tüm kategoriler
  const allCategories = [
    // Jotun kategorileri
    {
      id: 1,
      brand_id: 1,
      name: "İç Cephe Ürünleri",
      slug: "ic-cephe-urunleri",
      description:
        "Evinizin iç mekanları için yüksek kaliteli boyalar ve kaplamalar. Silinebilir, kokusuz ve çevre dostu formüller.",
      image_url: "/placeholder.svg?height=200&width=300&text=İç+Cephe+Ürünleri",
    },
    {
      id: 2,
      brand_id: 1,
      name: "Dış Cephe Ürünleri",
      slug: "dis-cephe-urunleri",
      description:
        "Binanızın dış cephesi için dayanıklı ve uzun ömürlü boyalar. UV koruması ve hava koşullarına dayanıklılık.",
      image_url: "/placeholder.svg?height=200&width=300&text=Dış+Cephe+Ürünleri",
    },
    {
      id: 3,
      brand_id: 1,
      name: "Dış Cephe Renk Koleksiyonları",
      slug: "renk-koleksiyonlari",
      description: "Jotun'un dış cepheler için özel olarak geliştirdiği renk koleksiyonları. Estetik ve modern tasarımlar.",
      image_url: "/placeholder.svg?height=200&width=300&text=Metal+Ürünleri",
    },
    // Filli Boya kategorileri
    {
      id: 5,
      brand_id: 2,
      name: "İç Cephe Boyaları",
      slug: "ic-cephe-boyalari",
      description: "İç mekanlar için su bazlı, silinebilir ve anti-bakteriyel boyalar. Geniş renk seçenekleri.",
      image_url: "/placeholder.svg?height=200&width=300&text=İç+Cephe+Boyaları",
    },
    {
      id: 6,
      brand_id: 2,
      name: "Dış Cephe Boyaları",
      slug: "dis-cephe-boyalari",
      description: "Dış cepheler için su ve nem dayanımlı, uzun ömürlü boyalar. Türkiye iklim koşullarına uygun.",
      image_url: "/placeholder.svg?height=200&width=300&text=Dış+Cephe+Boyaları",
    },
    {
      id: 7,
      brand_id: 2,
      name: "Metal Boyaları",
      slug: "metal-boyalari",
      description: "Metal yüzeyler için özel formülasyonlu boyalar. Pas önleyici ve koruyucu özellikler.",
      image_url: "/placeholder.svg?height=200&width=300&text=Metal+Boyaları",
    },
    // Marshall kategorileri
    {
      id: 8,
      brand_id: 3,
      name: "İç Cephe Boyaları",
      slug: "ic-cephe-boyalari",
      description: "İç mekanlar için yüksek kapatıcılığa sahip boyalar. Ekonomik ve kaliteli çözümler.",
      image_url: "/placeholder.svg?height=200&width=300&text=İç+Cephe+Boyaları",
    },
    {
      id: 9,
      brand_id: 3,
      name: "Dış Cephe Boyaları",
      slug: "dis-cephe-boyalari",
      description: "Dış cepheler için hava koşullarına dayanıklı boyalar. Uzun ömürlü koruma.",
      image_url: "/placeholder.svg?height=200&width=300&text=Dış+Cephe+Boyaları",
    },
    {
      id: 10,
      brand_id: 3,
      name: "Ahşap Boyaları",
      slug: "ahsap-boyalari",
      description: "Ahşap yüzeyler için vernik ve koruyucu boyalar. Doğal ahşap görünümü.",
      image_url: "/placeholder.svg?height=200&width=300&text=Ahşap+Boyaları",
    },
    // Hekim Panel kategorileri
    {
      id: 11,
      brand_id: 4,
      name: "Çatı Panelleri",
      slug: "cati-panelleri",
      description: "Dayanıklı ve yalıtımlı çatı panel sistemleri. Enerji tasarrufu sağlayan çözümler.",
      image_url: "/placeholder.svg?height=200&width=300&text=Çatı+Panelleri",
    },
    {
      id: 12,
      brand_id: 4,
      name: "Cephe Panelleri",
      slug: "cephe-panelleri",
      description: "Modern ve estetik cephe kaplama panelleri. Hızlı montaj ve uzun ömür.",
      image_url: "/placeholder.svg?height=200&width=300&text=Cephe+Panelleri",
    },
    {
      id: 13,
      brand_id: 4,
      name: "Konteyner Paneli",
      slug: "konteyner-paneli",
      description: "Konteyner yapılar için özel üretilmiş panel sistemleri. Modüler çözümler.",
      image_url: "/placeholder.svg?height=200&width=300&text=Konteyner+Paneli",
    },
  ]

  useEffect(() => {
    if (!brandId) {
      setError("Geçersiz marka ID'si")
      setLoading(false)
      return
    }

    try {
      // Marka bilgisini bul
      const brandData = brands.find((b) => b.slug === brandId)
      if (!brandData) {
        setError(`Marka bulunamadı: ${brandId}`)
        setLoading(false)
        return
      }

      // Markaya ait kategorileri filtrele
      const brandCategories = allCategories.filter((c) => c.brand_id === brandData.id)

      setBrand(brandData)
      setCategories(brandCategories)
    } catch (err) {
      setError("Veri yüklenirken bir hata oluştu")
    } finally {
      setLoading(false)
    }
  }, [brandId])

  if (loading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600 mb-4"></div>
            <p className="text-gray-600">Yükleniyor...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !brand) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Marka Bulunamadı</h1>
          <p className="mb-8">{error || "Aradığınız marka sistemimizde bulunamadı."}</p>
          <Link
            href="/urunler"
            className="bg-red-600 text-white px-6 py-3 rounded-md font-medium hover:bg-red-700 transition-colors duration-300"
          >
            Tüm Markalar
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16 bg-gradient-to-br from-neutral-600 via-neutral-200 to-neutral-600">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-12">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${brand.image_url || "/placeholder.svg?height=400&width=1200&text=Ürünlerimiz"}')`,
            }}
          ></div>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 flex items-center justify-center">
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
          <span className="text-red-600 font-medium">{brand.name}</span>
        </div>

        {/* Brand Info */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-full md:w-1/4 flex justify-center">
              <img
                src={brand.image_url || "/placeholder.svg?height=200&width=200&text=" + encodeURIComponent(brand.name)}
                alt={brand.name}
                className="max-w-full h-auto rounded-lg shadow-lg"
                draggable="false"
              />
            </div>
            <div className="w-full md:w-3/4">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">{brand.name}</h2>
              <p className="text-gray-600 mb-6">{brand.description}</p>
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Ürün Kategorileri</h3>
                <p className="text-gray-600">
                  Aşağıdaki kategorilerden birini seçerek {brand.name} ürünlerini inceleyebilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        {categories && categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/urunler/${brandId}/${category.slug}`}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg group"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={category.image_url || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-red-600 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{category.description}</p>
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
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Bu markada henüz kategori bulunmamaktadır</h3>
            <p className="text-gray-600">Yakında yeni kategoriler eklenecektir.</p>
          </div>
        )}
      </div>
    </div>
  )
}
