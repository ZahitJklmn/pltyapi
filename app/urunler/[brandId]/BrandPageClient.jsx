"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronRight, ExternalLink, X } from "lucide-react"

// External Link Badge Component
function ExternalLinkBadge() {
  return (
    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-600 text-white ml-2">
      <ExternalLink className="h-3 w-3 mr-1" />
      Dış bağlantı
    </span>
  )
}

// Link Wrapper Component
function LinkWrapper({ href, externalLink, children, className, title, setConfirmModal, ...props }) {
  const finalHref = externalLink || href
  const isExternal = !!externalLink

  const handleClick = (e) => {
    if (isExternal) {
      e.preventDefault()
      setConfirmModal({
        isOpen: true,
        url: finalHref,
        title: title || "Dış bağlantı",
      })
    }
  }

  if (isExternal) {
    return (
      <a href={finalHref} onClick={handleClick} className={className} {...props}>
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

export default function BrandPageClient({ params }) {
  const { brandId } = params || {}
  const [brand, setBrand] = useState(null)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, url: "", title: "" })

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
      image_url: "/images/mapei-logo.png?height=150&width=250&text=MAPEI",
      external_link: "https://www.mapei.com/tr/tr/urunler-ve-cozumler",
    },
    {
      id: 3,
      name: "Tepe Betopan",
      slug: "tepe-betopan",
      description:
        "Tepe Betopan, prefabrik yapı elemanları ve çatı sistemleri üreten Türkiye merkezli bir markadır. Yüksek kaliteli beton panelleri ile inşaat sektöründe önemli bir yere sahiptir.",
      image_url: "/images/tepe-betopan-logo.png?height=150&width=250&text=TEPE+BETOPAN",
    },
    {
      id: 4,
      name: "Tepepan",
      slug: "tepepan",
      description:
        "Tepepan, prefabrik yapı elemanları ve inşaat malzemeleri üreten bir markadır. Tepe Grubu'nun bir parçası olarak, yüksek kaliteli ürünleri ile sektördeki yerini sağlamlaştırmıştır.",
      image_url: "/images/tepepan-logo.png?height=150&width=250&text=TEPEPAN",
    },
    {
      id: 5,
      name: "Bianca Stella",
      slug: "bianca",
      description:
        "Bianca Stella, iç cephe boyaları ve dekoratif kaplama ürünleri üreten bir markadır. Kaliteli ve estetik çözümleri ile ev dekorasyonunda tercih edilen markalardan biridir.",
      image_url: "/images/bianca-logo.png?height=150&width=250&text=BIANCA+STELLA",
    },
  ]

  // Tüm kategoriler - external_link ile
  const allCategories = [
    // Jotun kategorileri
    {
      id: 1,
      brand_id: 1,
      name: "İç Cephe Ürünleri",
      slug: "ic-cephe-urunleri",
      description:
        "Evinizin iç mekanları için yüksek kaliteli boyalar ve kaplamalar. Silinebilir, kokusuz ve çevre dostu formüller.",
      image_url: "/jotun/ic-cephe/kart-foto.png?height=200&width=300&text=İç+Cephe+Ürünleri",
    },
    {
      id: 2,
      brand_id: 1,
      name: "Dış Cephe Ürünleri",
      slug: "dis-cephe-urunleri",
      description:
        "Binanızın dış cephesi için dayanıklı ve uzun ömürlü boyalar. UV koruması ve hava koşullarına dayanıklılık.",
      image_url: "/jotun/dis-cephe/kart-foto.png?height=200&width=300&text=Dış+Cephe+Ürünleri",
    },
    {
      id: 3,
      brand_id: 1,
      name: "Dış Cephe Renk Koleksiyonları",
      slug: "renk-koleksiyonlari",
      description:
        "Jotun'un dış cepheler için özel olarak geliştirdiği renk koleksiyonları. Estetik ve modern tasarımlar.",
      image_url: "/jotun/dis-cephe/renk-koleksiyonlari.webp?height=200&width=300&text=Metal+Ürünleri",
    },
    // Tepe Betopan kategorileri
    {
      id: 4,
      brand_id: 3,
      name: "Çimentolu Yonga Levhalar",
      slug: "cimentolu-yonga-levhalar",
      description:
        "Tepe Betopan'ın iç ve dış cepheler için sunduğu dayanıklı ve estetik çözümler. Yüksek ses ve ısı yalıtımı sağlar.",
      image_url: "/placeholder.svg?height=200&width=300&text=İç+Cephe+Boyaları",
    },
    // Tepepan kategorileri
    {
      id: 5,
      brand_id: 4,
      name: "Elyaf Takviyeli Çimentolu Levhalar",
      slug: "elyaf-takviyeli-levhalar",
      description:
        "Tepepan'ın hafif ve dayanıklı levhaları, inşaat projelerinizde mükemmel bir çözüm sunar. Yüksek yangın dayanıklılığı ve su itici özellikler.",
      image_url: "/placeholder.svg?height=200&width=300&text=Çatı+Panelleri",
    },
    // Bianca kategorileri
    {
      id: 6,
      brand_id: 5,
      name: "Boyalar",
      slug: "boyalar",
      description: "Bianca'nın iç ve dış cepheler için sunduğu boya yelpazesi. Estetik ve dayanıklı çözümler.",
      image_url: "/placeholder.svg?height=200&width=300&text=Çatı+Panelleri",
    },
    {
      id: 7,
      brand_id: 5,
      name: "Koruyucu Ürünler",
      slug: "koruyucu-urunler",
      description:
        "Yapı elemanlarınızı korumak için özel formüle edilmiş ürünler. Su itici ve leke önleyici özellikler.",
      image_url: "/placeholder.svg?height=200&width=300&text=Cephe+Panelleri",
    },
    {
      id: 8,
      brand_id: 5,
      name: "Diğer Ürünler",
      slug: "diger-urunler",
      description: "Bianca'nın sunduğu diğer yapı malzemeleri. Yüksek kaliteli ve güvenilir çözümler.",
      image_url: "/placeholder.svg?height=200&width=300&text=Konteyner+Paneli",
    },
  ]

  const handleExternalRedirect = (url) => {
    window.open(url, "_blank", "noopener,noreferrer")
    setConfirmModal({ isOpen: false, url: "", title: "" })
  }

  const closeModal = () => {
    setConfirmModal({ isOpen: false, url: "", title: "" })
  }

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
    <>
      <div className="pt-24 pb-16 bg-gradient-to-br from-neutral-600 via-neutral-200 to-neutral-600">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="relative md:h-[400px] rounded-lg overflow-hidden mb-12">
            <div
              className="absolute inset-0 bg-contain bg-no-repeat bg-center"
              style={{
                backgroundImage: `url('${brand.image_url || "/placeholder.svg?height=400&width=1200&text=Ürünlerimiz"}')`,
              }}
            ></div>
            <div className="absolute inset-0 bg-black/0"></div>
            <div className="absolute inset-0 flex items-center justify-center">{/* içerik buraya */}</div>
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
              <div className="w-full md:w-1/4 flex justify-center md:hidden">
                <img
                  src={
                    brand.image_url || "/placeholder.svg?height=200&width=200&text=" + encodeURIComponent(brand.name)
                  }
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
                <LinkWrapper
                  key={category.id}
                  href={`/urunler/${brandId}/${category.slug}`}
                  externalLink={category.external_link}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg group"
                  title={category.name}
                  setConfirmModal={setConfirmModal}
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={category.image_url || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* External link badge */}
                    {category.external_link?.trim() && (
                      <div className="absolute top-3 right-3">
                        <ExternalLinkBadge />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-red-600 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                    <div className="flex justify-end">
                      <span className="inline-flex items-center text-red-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                        {category.external_link?.trim() ? "Siteye Git" : "Ürünleri İncele"}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 ml-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          {category.external_link ? (
                            // External link icon
                            <path
                              fillRule="evenodd"
                              d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                              clipRule="evenodd"
                            />
                          ) : (
                            // Arrow right icon
                            <path
                              fillRule="evenodd"
                              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          )}
                        </svg>
                      </span>
                    </div>
                  </div>
                </LinkWrapper>
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

      {/* Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-white/20 rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <ExternalLink className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Dış Bağlantı Uyarısı</h3>
                </div>
                <button onClick={closeModal} className="text-gray-400 hover:text-white transition-colors duration-200">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <p className="text-gray-300 mb-4">
                <span className="font-medium text-white">{confirmModal.title}</span> sayfasına yönlendirileceksiniz.
              </p>
              <p className="text-sm text-gray-400 mb-6">Bu sayfaya gitmek istediğinize emin misiniz?</p>

              {/* URL Preview */}
              <div className="bg-white/5 rounded-lg p-3 mb-6 border border-white/10">
                <p className="text-xs text-gray-400 mb-1">Hedef URL:</p>
                <p className="text-sm text-blue-400 break-all">{confirmModal.url}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 bg-red-500/60 hover:bg-red-500 text-white rounded-xl font-medium transition-all duration-200 border border-white/20"
                >
                  İptal
                </button>
                <button
                  onClick={() => handleExternalRedirect(confirmModal.url)}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                >
                  Devam Et
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
