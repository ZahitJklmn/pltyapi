"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import ProductCardList from "@/components/ProductCardList"

export default function CategoryPageClient({ params }) {
  const { brandId, categoryId } = params || {}
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [brand, setBrand] = useState(null)
  const [category, setCategory] = useState(null)
  const [products, setProducts] = useState([])

  // Tüm markalar
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

  // Tüm kategoriler
  const categories = [
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
      name: "Ahşap Ürünleri",
      slug: "ahsap-urunleri",
      description: "Ahşap yüzeyler için koruyucu ve dekoratif boyalar. Vernik, lak ve emprenye ürünleri.",
      image_url: "/placeholder.svg?height=200&width=300&text=Ahşap+Ürünleri",
    },
    {
      id: 4,
      brand_id: 1,
      name: "Metal Ürünleri",
      slug: "metal-urunleri",
      description: "Metal yüzeyler için pas önleyici ve koruyucu boyalar. Endüstriyel ve dekoratif çözümler.",
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

  // Tüm ürünler
  const allProducts = [
    // Jotun İç Cephe Ürünleri
    {
      id: 1,
      category_id: 1,
      name: "Fenomastic",
      slug: "fenomastic",
      description:
        "Yüksek kapatıcılığa sahip, silinebilir iç cephe boyası. Kokusuz formülü ile sağlıklı yaşam alanları.",
      image_url: "/placeholder.svg?height=300&width=300&text=Fenomastic",
    },
    {
      id: 2,
      category_id: 1,
      name: "Majestic",
      slug: "majestic",
      description: "Leke tutmayan, ipeksi mat görünümlü iç cephe boyası. Anti-bakteriyel özellikli.",
      image_url: "/placeholder.svg?height=300&width=300&text=Majestic",
    },
    {
      id: 3,
      category_id: 1,
      name: "Lady Pure Colours",
      slug: "lady-pure-colours",
      description: "Çocuk odaları için özel geliştirilmiş, tamamen doğal iç cephe boyası.",
      image_url: "/placeholder.svg?height=300&width=300&text=Lady+Pure+Colours",
    },
    // Jotun Dış Cephe Ürünleri
    {
      id: 4,
      category_id: 2,
      name: "Jotashield",
      slug: "jotashield",
      description: "Dış cephe için yüksek dayanıklılığa sahip, UV korumalı boya. 15 yıl garanti.",
      image_url: "/placeholder.svg?height=300&width=300&text=Jotashield",
    },
    {
      id: 5,
      category_id: 2,
      name: "Facade",
      slug: "facade",
      description: "Ekonomik dış cephe boyası. Hava koşullarına dayanıklı formül.",
      image_url: "/placeholder.svg?height=300&width=300&text=Facade",
    },
    // Jotun Ahşap Ürünleri
    {
      id: 6,
      category_id: 3,
      name: "Trebitt",
      slug: "trebitt",
      description: "Ahşap yüzeyler için koruyucu emprenye. Su itici ve mantar önleyici.",
      image_url: "/placeholder.svg?height=300&width=300&text=Trebitt",
    },
    {
      id: 7,
      category_id: 3,
      name: "Visir",
      slug: "visir",
      description: "Şeffaf ahşap koruyucu. Doğal ahşap görünümünü korur.",
      image_url: "/placeholder.svg?height=300&width=300&text=Visir",
    },
    // Jotun Metal Ürünleri
    {
      id: 8,
      category_id: 4,
      name: "Pilot II",
      slug: "pilot-ii",
      description: "Metal yüzeyler için pas önleyici astar. Uzun ömürlü koruma.",
      image_url: "/placeholder.svg?height=300&width=300&text=Pilot+II",
    },
    // Filli Boya İç Cephe
    {
      id: 9,
      category_id: 5,
      name: "Momento",
      slug: "momento",
      description: "Ekonomik iç cephe boyası. Kolay uygulama ve hızlı kuruma.",
      image_url: "/placeholder.svg?height=300&width=300&text=Momento",
    },
    {
      id: 10,
      category_id: 5,
      name: "Tempo",
      slug: "tempo",
      description: "Silinebilir iç cephe boyası. Geniş renk seçeneği.",
      image_url: "/placeholder.svg?height=300&width=300&text=Tempo",
    },
    {
      id: 11,
      category_id: 5,
      name: "Clean",
      slug: "clean",
      description: "Anti-bakteriyel iç cephe boyası. Hastane ve okul projeleri için ideal.",
      image_url: "/placeholder.svg?height=300&width=300&text=Clean",
    },
    // Filli Boya Dış Cephe
    {
      id: 12,
      category_id: 6,
      name: "Exterior",
      slug: "exterior",
      description: "Dış cephe için dayanıklı boya. Türkiye iklim koşullarına uygun.",
      image_url: "/placeholder.svg?height=300&width=300&text=Exterior",
    },
    {
      id: 13,
      category_id: 6,
      name: "Silikonlu",
      slug: "silikonlu",
      description: "Silikon katkılı dış cephe boyası. Su itici özellik.",
      image_url: "/placeholder.svg?height=300&width=300&text=Silikonlu",
    },
    // Marshall İç Cephe
    {
      id: 14,
      category_id: 8,
      name: "Maxima",
      slug: "maxima",
      description: "Yüksek kapatıcılığa sahip iç cephe boyası. Ekonomik çözüm.",
      image_url: "/placeholder.svg?height=300&width=300&text=Maxima",
    },
    {
      id: 15,
      category_id: 8,
      name: "Prestij",
      slug: "prestij",
      description: "Premium iç cephe boyası. İpeksi mat görünüm.",
      image_url: "/placeholder.svg?height=300&width=300&text=Prestij",
    },
    // Marshall Dış Cephe
    {
      id: 16,
      category_id: 9,
      name: "Dış Cephe",
      slug: "dis-cephe",
      description: "Standart dış cephe boyası. Hava koşullarına dayanıklı.",
      image_url: "/placeholder.svg?height=300&width=300&text=Dış+Cephe",
    },
    // Hekim Panel Ürünleri
    {
      id: 17,
      category_id: 11,
      name: "Çatı Sandviç Panel",
      slug: "cati-sandvic-panel",
      description: "Yalıtımlı çatı sandviç paneli. Enerji tasarrufu sağlar.",
      image_url: "/placeholder.svg?height=300&width=300&text=Çatı+Sandviç+Panel",
    },
    {
      id: 18,
      category_id: 12,
      name: "Cephe Sandviç Panel",
      slug: "cephe-sandvic-panel",
      description: "Modern cephe kaplama paneli. Hızlı montaj.",
      image_url: "/placeholder.svg?height=300&width=300&text=Cephe+Sandviç+Panel",
    },
    {
      id: 19,
      category_id: 13,
      name: "Konteyner Panel",
      slug: "konteyner-panel",
      description: "Konteyner yapılar için özel panel. Modüler sistem.",
      image_url: "/placeholder.svg?height=300&width=300&text=Konteyner+Panel",
    },
  ]

  useEffect(() => {
    if (!brandId || !categoryId) {
      setError(`Geçersiz URL parametreleri: brandId=${brandId}, categoryId=${categoryId}`)
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

      // Kategori bilgisini bul
      const categoryData = categories.find((c) => c.brand_id === brandData.id && c.slug === categoryId)
      if (!categoryData) {
        setError(`Kategori bulunamadı: ${categoryId}`)
        setLoading(false)
        return
      }

      // Kategoriye ait ürünleri filtrele
      const categoryProducts = allProducts.filter((p) => p.category_id === categoryData.id)

      setBrand(brandData)
      setCategory(categoryData)
      setProducts(categoryProducts)
    } catch (err) {
      setError("Veri yüklenirken bir hata oluştu")
    } finally {
      setLoading(false)
    }
  }, [brandId, categoryId])

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

  if (error || !brand || !category) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Kategori Bulunamadı</h1>
          <p className="mb-8">{error || "Aradığınız ürün kategorisi sistemimizde bulunamadı."}</p>
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

  const productCount = products.length

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
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{brand.name}</h1>
            <h2 className="text-2xl md:text-3xl font-medium text-white">{category.name}</h2>
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
          <Link href={`/urunler/${brandId}`} className="text-gray-500 hover:text-red-600">
            {brand.name}
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-800 font-medium">{category.name}</span>
        </div>

        {/* Brand Info */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-full md:w-1/4 flex justify-center">
              <img
                src={brand.image_url || "/placeholder.svg?height=200&width=200&text=" + encodeURIComponent(brand.name)}
                alt={brand.name}
                className="max-w-full h-auto"
              />
            </div>
            <div className="w-full md:w-3/4">
              <h2 className="text-3xl font-bold mb-2 text-gray-800">{brand.name}</h2>
              <h3 className="text-xl font-semibold mb-4 text-gray-700">{category.name}</h3>
              <p className="text-gray-600 mb-6">{category.description}</p>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-gray-600">
                  Bu kategoride toplam <span className="font-semibold">{productCount}</span> ürün bulunmaktadır.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products && products.length > 0 ? (
          <ProductCardList initialProducts={products} brandId={brandId} categoryId={categoryId} />
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Bu kategoride henüz ürün bulunmamaktadır</h3>
            <p className="text-gray-600">Yakında yeni ürünler eklenecektir.</p>
          </div>
        )}
      </div>
    </div>
  )
}
