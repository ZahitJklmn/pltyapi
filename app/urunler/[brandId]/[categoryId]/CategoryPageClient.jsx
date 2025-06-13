"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import ProductCard from "@/components/ProductCard"
import { ArrowBigLeft, ArrowBigRight, ChevronRight } from "lucide-react"

export default function CategoryPageClient({ params }) {
  const { brandId, categoryId } = params || {}
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [brand, setBrand] = useState(null)
  const [category, setCategory] = useState(null)
  const [products, setProducts] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 9

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
      image_url: "/marka-urun-karti/mapei.png?height=150&width=250&text=MAPEI",
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

  // Tüm ürünler - 2'şer fotoğraf ile
  const allProducts = [
    // Jotun İç Cephe Ürünleri
    {
      id: 1,
      category_id: 1,
      name: "Fenomastic Zen",
      slug: "fenomastic-zen",
      description:
        "Daima Güzel ve Temiz Duvarlar",
      image_url: "/jotun/ic-cephe/feno-zen-on.png?height=300&width=300&text=Fenomastic",
      hover_image_url: "/jotun/ic-cephe/feno-zen-arka.png?height=300&width=300&text=Fenomastic+Detay",
    },
    {
      id: 2,
      category_id: 1,
      name: "Fenomastic Güzel Evim Saf İpek", 
      slug: "fenomastic-guzel-evim-saf-ipek",
      description:
        "Yumuşak görünüm ile doğal doku",
      image_url: "/jotun/ic-cephe/gevim-saf-ipek-on.png?height=300&width=300&text=Fenomastic",
      hover_image_url: "/jotun/ic-cephe/gevim-saf-ipek-arka.png?height=300&width=300&text=Fenomastic+Detay",
    },
    {
      id: 3,
      category_id: 1,
      name: "Fenomastic Güzel Evim Mineral", 
      slug: "fenomastic-guzel-evim-mineral",
      description:
        "Benzersiz renk oyunu",
      image_url: "/jotun/ic-cephe/gevim-mineral-on.png?height=300&width=300&text=Fenomastic",
      hover_image_url: "/jotun/ic-cephe/gevim-mineral-arka.png?height=300&width=300&text=Fenomastic+Detay",
    },
    {
      id: 4,
      category_id: 1,
      name: "Fenomastic Güzel Evim Mineral Şeffaf Koruyucu", 
      slug: "fenomastic-guzel-evim-mineral-seffaf-koruyucu",
      description:
        "Mükemmel yüzeyler",
      image_url: "/jotun/ic-cephe/gevim-mineral-seffaf-on.png?height=300&width=300&text=Fenomastic",
      hover_image_url: "/jotun/ic-cephe/gevim-mineral-arka.png?height=300&width=300&text=Fenomastic+Detay",
    },
    {
      id: 5,
      category_id: 1,
      name: "Fenomastic Güzel Evim Zengin Mat", 
      slug: "fenomastic-guzel-evim-zengin-mat",
      description:
        "Uzun ömürlü koruma.",
      image_url: "/jotun/ic-cephe/gevim-zengin-on.png?height=300&width=300&text=Fenomastic",
      hover_image_url: "/jotun/ic-cephe/gevim-zengin-arka.png?height=300&width=300&text=Fenomastic+Detay",
    },
    {
      id: 6,
      category_id: 1,
      name: "Fenomastic Primer", 
      slug: "fenomastic-primer",
      description:
        "Usta Fırçaların Tercihi",
      image_url: "/jotun/ic-cephe/feno-primer-on.png?height=300&width=300&text=Fenomastic",
      hover_image_url: "/jotun/ic-cephe/feno-primer-arka.png?height=300&width=300&text=Fenomastic+Detay",
    },
    {
      id: 7,
      category_id: 1,
      name: "Fenomastic Mat", 
      slug: "fenomastic-mat",
      description:
        "Usta Fırçaların Tercihi",
      image_url: "/jotun/ic-cephe/feno-mat-on.png?height=300&width=300&text=Fenomastic",
      hover_image_url: "/jotun/ic-cephe/feno-mat-arka.png?height=300&width=300&text=Fenomastic+Detay",
    },
    {
      id: 8,
      category_id: 1,
      name: "Fenomastic İpek Mat", 
      slug: "fenomastic-ipek-mat",
      description:
        "Usta Fırçaların Tercihi",
      image_url: "/jotun/ic-cephe/feno-ipek-mat-on.png?height=300&width=300&text=Fenomastic",
      hover_image_url: "/jotun/ic-cephe/feno-ipek-mat-arka.png?height=300&width=300&text=Fenomastic+Detay",
    },
    {
      id: 9,
      category_id: 1,
      name: "Fenomastic Macun", 
      slug: "fenomastic-macun",
      description:
        "Usta Fırçaların Tercihi",
      image_url: "/jotun/ic-cephe/feno-macun-on.webp?height=300&width=300&text=Fenomastic",
      hover_image_url: "/jotun/ic-cephe/feno-macun-arka.png?height=300&width=300&text=Fenomastic+Detay",
    },
    {
      id: 10,
      category_id: 1,
      name: "Fenomastic Macun (Hazırlık)", 
      slug: "fenomastic-macun-hazirlik",
      description:
        "Benzersiz mat doku ile daha güzel renkler",
      image_url: "/jotun/ic-cephe/feno-macun-on.webp?height=300&width=300&text=Fenomastic",
      hover_image_url: "/jotun/ic-cephe/feno-macun-hazirlik-arka.png?height=300&width=300&text=Fenomastic+Detay",
    },
    // Jotun Dış Cephe Ürünleri
    {
      id: 4,
      category_id: 2,
      name: "Jotashield",
      slug: "jotashield",
      description: "Dış cephe için yüksek dayanıklılığa sahip, UV korumalı boya. 15 yıl garanti.",
      image_url: "/placeholder.svg?height=300&width=300&text=Jotashield",
      hover_image_url: "/placeholder.svg?height=300&width=300&text=Jotashield+Detay",
    },
    {
      id: 5,
      category_id: 2,
      name: "Facade",
      slug: "facade",
      description: "Ekonomik dış cephe boyası. Hava koşullarına dayanıklı formül.",
      image_url: "/placeholder.svg?height=300&width=300&text=Facade",
      hover_image_url: "/placeholder.svg?height=300&width=300&text=Facade+Detay",
    },
    // Jotun Ahşap Ürünleri
    {
      id: 6,
      category_id: 3,
      name: "Trebitt",
      slug: "trebitt",
      description: "Ahşap yüzeyler için koruyucu emprenye. Su itici ve mantar önleyici.",
      image_url: "/placeholder.svg?height=300&width=300&text=Trebitt",
      hover_image_url: "/placeholder.svg?height=300&width=300&text=Trebitt+Detay",
    },
    {
      id: 7,
      category_id: 3,
      name: "Visir",
      slug: "visir",
      description: "Şeffaf ahşap koruyucu. Doğal ahşap görünümünü korur.",
      image_url: "/placeholder.svg?height=300&width=300&text=Visir",
      hover_image_url: "/placeholder.svg?height=300&width=300&text=Visir+Detay",
    },
    // Jotun Metal Ürünleri
    {
      id: 8,
      category_id: 4,
      name: "Pilot II",
      slug: "pilot-ii",
      description: "Metal yüzeyler için pas önleyici astar. Uzun ömürlü koruma.",
      image_url: "/placeholder.svg?height=300&width=300&text=Pilot+II",
      hover_image_url: "/placeholder.svg?height=300&width=300&text=Pilot+II+Detay",
    },
    // Filli Boya İç Cephe
    {
      id: 9,
      category_id: 5,
      name: "Momento",
      slug: "momento",
      description: "Ekonomik iç cephe boyası. Kolay uygulama ve hızlı kuruma.",
      image_url: "/placeholder.svg?height=300&width=300&text=Momento",
      hover_image_url: "/placeholder.svg?height=300&width=300&text=Momento+Detay",
    },
    {
      id: 10,
      category_id: 5,
      name: "Tempo",
      slug: "tempo",
      description: "Silinebilir iç cephe boyası. Geniş renk seçeneği.",
      image_url: "/placeholder.svg?height=300&width=300&text=Tempo",
      hover_image_url: "/placeholder.svg?height=300&width=300&text=Tempo+Detay",
    },
    {
      id: 11,
      category_id: 5,
      name: "Clean",
      slug: "clean",
      description: "Anti-bakteriyel iç cephe boyası. Hastane ve okul projeleri için ideal.",
      image_url: "/placeholder.svg?height=300&width=300&text=Clean",
      hover_image_url: "/placeholder.svg?height=300&width=300&text=Clean+Detay",
    },
    // Filli Boya Dış Cephe
    {
      id: 12,
      category_id: 6,
      name: "Exterior",
      slug: "exterior",
      description: "Dış cephe için dayanıklı boya. Türkiye iklim koşullarına uygun.",
      image_url: "/placeholder.svg?height=300&width=300&text=Exterior",
      hover_image_url: "/placeholder.svg?height=300&width=300&text=Exterior+Detay",
    },
    {
      id: 13,
      category_id: 6,
      name: "Silikonlu",
      slug: "silikonlu",
      description: "Silikon katkılı dış cephe boyası. Su itici özellik.",
      image_url: "/placeholder.svg?height=300&width=300&text=Silikonlu",
      hover_image_url: "/placeholder.svg?height=300&width=300&text=Silikonlu+Detay",
    },
    // Marshall İç Cephe
    {
      id: 14,
      category_id: 8,
      name: "Maxima",
      slug: "maxima",
      description: "Yüksek kapatıcılığa sahip iç cephe boyası. Ekonomik çözüm.",
      image_url: "/placeholder.svg?height=300&width=300&text=Maxima",
      hover_image_url: "/placeholder.svg?height=300&width=300&text=Maxima+Detay",
    },
    {
      id: 15,
      category_id: 8,
      name: "Prestij",
      slug: "prestij",
      description: "Premium iç cephe boyası. İpeksi mat görünüm.",
      image_url: "/placeholder.svg?height=300&width=300&text=Prestij",
      hover_image_url: "/placeholder.svg?height=300&width=300&text=Prestij+Detay",
    },
    // Marshall Dış Cephe
    {
      id: 16,
      category_id: 9,
      name: "Dış Cephe",
      slug: "dis-cephe",
      description: "Standart dış cephe boyası. Hava koşullarına dayanıklı.",
      image_url: "/placeholder.svg?height=300&width=300&text=Dış+Cephe",
      hover_image_url: "/placeholder.svg?height=300&width=300&text=Dış+Cephe+Detay",
    },
    // Hekim Panel Ürünleri
    {
      id: 17,
      category_id: 11,
      name: "Çatı Sandviç Panel",
      slug: "cati-sandvic-panel",
      description: "Yalıtımlı çatı sandviç paneli. Enerji tasarrufu sağlar.",
      image_url: "/placeholder.svg?height=300&width=300&text=Çatı+Sandviç+Panel",
      hover_image_url: "/placeholder.svg?height=300&width=300&text=Çatı+Sandviç+Panel+Detay",
    },
    {
      id: 18,
      category_id: 12,
      name: "Cephe Sandviç Panel",
      slug: "cephe-sandvic-panel",
      description: "Modern cephe kaplama paneli. Hızlı montaj.",
      image_url: "/placeholder.svg?height=300&width=300&text=Cephe+Sandviç+Panel",
      hover_image_url: "/placeholder.svg?height=300&width=300&text=Cephe+Sandviç+Panel+Detay",
    },
    {
      id: 19,
      category_id: 13,
      name: "Konteyner Panel",
      slug: "konteyner-panel",
      description: "Konteyner yapılar için özel panel. Modüler sistem.",
      image_url: "/placeholder.svg?height=300&width=300&text=Konteyner+Panel",
      hover_image_url: "/placeholder.svg?height=300&width=300&text=Konteyner+Panel+Detay",
    },
  ]

  const handleProductDelete = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId)
    setProducts(updatedProducts)
  }

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
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-2xl md:text-3xl font-medium text-white">{category.name}</h2>
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
          <Link href={`/urunler/${brandId}`} className="text-black hover:text-red-600 transition-all duration-200">
            {brand.name}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-neutral-900" />
          <span className="text-red-600 font-medium">{category.name}</span>
        </div>

        {/* Brand Info */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-full md:w-1/4 flex justify-center">
              <img
                src={brand.image_url || "/placeholder.svg?height=200&width=200&text=" + encodeURIComponent(brand.name)}
                alt={brand.name}
                className="max-w-full h-auto"
                draggable="false"
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
          (() => {
            const totalPages = Math.ceil(products.length / productsPerPage)
            const startIndex = (currentPage - 1) * productsPerPage
            const endIndex = startIndex + productsPerPage
            const currentProducts = products.slice(startIndex, endIndex)

            return (
              <div>
                {/* Ürün sayısı bilgisi */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">Ürünler</h3>
                  <p className="text-gray-600">
                    {startIndex + 1}-{Math.min(endIndex, products.length)} / {products.length} ürün
                  </p>
                </div>

                {/* Ürün kartları - ProductCard component'ini kullanarak */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                  {currentProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      brandId={brandId}
                      categoryId={categoryId}
                      isAdmin={false}
                      onDelete={handleProductDelete}
                    />
                  ))}
                </div>

                {/* Sayfalandırma */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 bg-white rounded-lg shadow-md p-6">
                    {/* Previous Button */}
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-2 py-2 rounded-full font-medium transition-colors ${
                        currentPage === 1
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      <ArrowBigLeft />
                    </button>

                    {/* Sayfa numaraları */}
                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-full font-medium transition-colors ${
                            currentPage === page
                              ? "bg-red-600 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`px-2 py-2 rounded-full font-medium transition-colors ${
                        currentPage === totalPages
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      <ArrowBigRight />
                    </button>
                  </div>
                )}
              </div>
            )
          })()
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
