"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { getSupabaseClient } from "@/lib/supabase"
import { getLocalBrandData, getLocalCategoriesByBrand } from "@/lib/localData"

export default function BrandPageClient({ params }) {
  const { brandId } = params || {}
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [brand, setBrand] = useState(null)
  const [categories, setCategories] = useState([])
  const [usingLocalData, setUsingLocalData] = useState(false)
  const [debugInfo, setDebugInfo] = useState({})

  // Parametrelerin undefined olma durumunu daha iyi ele alalım
  useEffect(() => {
    // Parametreleri kontrol et ve konsola yazdır
    console.log("BrandPageClient received params:", JSON.stringify(params))

    if (!params) {
      console.error("Params objesi bulunamadı")
      setError("Params objesi bulunamadı")
      setLoading(false)
      return
    }

    const { brandId } = params

    if (!brandId) {
      console.error(`Geçersiz URL parametresi: brandId=${brandId}`)
      setError(`Geçersiz URL parametresi: brandId=${brandId}`)
      setLoading(false)
      setDebugInfo((prev) => ({ ...prev, params: { brandId } }))
      return
    }

    async function fetchData() {
      try {
        setLoading(true)
        console.log("Veri yükleme başladı:", { brandId })
        setDebugInfo((prev) => ({ ...prev, params: { brandId } }))

        // Önce yerel veriyi hazırla (fallback için)
        const localBrandData = getLocalBrandData(brandId)
        const localCategoriesData = getLocalCategoriesByBrand(brandId)

        setDebugInfo((prev) => ({
          ...prev,
          localData: {
            brand: localBrandData ? true : false,
            categories: localCategoriesData ? localCategoriesData.length : 0,
          },
        }))

        // Supabase'den veri çekmeyi dene
        let brandData = null
        let categoriesData = []
        let useLocalData = false

        const supabase = getSupabaseClient()
        setDebugInfo((prev) => ({ ...prev, supabaseClient: supabase ? true : false }))

        // Supabase bağlantısını kontrol et
        if (!supabase) {
          console.log("Supabase client oluşturulamadı, yerel veri kullanılacak")
          useLocalData = true
        } else {
          try {
            console.log("Marka verisi çekiliyor:", brandId)

            // Marka bilgisini al
            const { data: brandResult, error: brandError } = await supabase
              .from("brands")
              .select("id, name, slug, image_url, description")
              .eq("slug", brandId)

            setDebugInfo((prev) => ({
              ...prev,
              supabaseQueries: {
                ...prev.supabaseQueries,
                brandQuery: {
                  result: brandResult ? brandResult.length : 0,
                  error: brandError ? brandError.message : null,
                },
              },
            }))

            console.log("Marka sorgu sonucu:", { data: brandResult, error: brandError })

            if (brandError) {
              console.error("Marka verisi çekilirken hata:", JSON.stringify(brandError))
              throw new Error(`Marka bulunamadı: ${brandError.message || JSON.stringify(brandError)}`)
            }

            if (!brandResult || brandResult.length === 0) {
              console.log("Marka bulunamadı, yerel veri kullanılacak")
              useLocalData = true
            } else {
              // İlk markayı al (birden fazla olabilir)
              brandData = brandResult[0]
              console.log("Marka verisi (Supabase):", brandData)

              // Kategorileri al
              console.log("Kategori verisi çekiliyor:", brandData.id)
              const { data: categoriesResult, error: categoriesError } = await supabase
                .from("categories")
                .select("id, name, slug, image_url, description")
                .eq("brand_id", brandData.id)

              setDebugInfo((prev) => ({
                ...prev,
                supabaseQueries: {
                  ...prev.supabaseQueries,
                  categoriesQuery: {
                    result: categoriesResult ? categoriesResult.length : 0,
                    error: categoriesError ? categoriesError.message : null,
                  },
                },
              }))

              console.log("Kategori sorgu sonucu:", { data: categoriesResult, error: categoriesError })

              if (categoriesError) {
                console.error("Kategori verisi çekilirken hata:", JSON.stringify(categoriesError))
                // Kategori hatası kritik değil, devam edebiliriz
                categoriesData = []
              } else {
                categoriesData = categoriesResult || []
                console.log("Kategori verisi (Supabase):", categoriesData)
              }
            }
          } catch (err) {
            console.error("Supabase veri çekme hatası:", err)
            setDebugInfo((prev) => ({ ...prev, supabaseError: err.message }))
            useLocalData = true
          }
        }

        // Eğer Supabase'den veri çekemediyse veya eksik veri varsa, yerel veriyi kullan
        if (useLocalData || !brandData) {
          console.log("Yerel veri kullanılıyor...")
          setUsingLocalData(true)

          // Yerel veri kontrolü
          if (!localBrandData) {
            console.error("Yerel marka verisi bulunamadı:", brandId)
            throw new Error(`Marka bulunamadı: ${brandId}`)
          }

          // Yerel veriyi kullan
          brandData = localBrandData
          categoriesData = localCategoriesData || []

          console.log("Yerel veri:", { brandData, categoriesData })
        }

        // Verileri state'e kaydet
        setBrand(brandData)
        setCategories(categoriesData)
      } catch (err) {
        console.error("Veri yükleme hatası:", err)
        setError(err.message || "Bilinmeyen bir hata oluştu")
        setDebugInfo((prev) => ({ ...prev, error: err.message }))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params])

  // Yükleniyor durumu
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

  // Hata durumu
  if (error || !brand) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Marka Bulunamadı</h1>
          <p className="mb-8">{error || "Aradığınız marka sistemimizde bulunamadı."}</p>
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/urunler"
              className="bg-red-600 text-white px-6 py-3 rounded-md font-medium hover:bg-red-700 transition-colors duration-300"
            >
              Tüm Markalar
            </Link>
            <Link
              href="/env-setup"
              className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors duration-300"
            >
              Supabase Yapılandırması
            </Link>
            <div className="text-sm text-gray-500 mt-4">
              <p>Hata Detayları:</p>
              <pre className="bg-gray-100 p-2 rounded mt-2 text-left overflow-auto max-w-full">
                {JSON.stringify({ brandId, error, debugInfo }, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Kategori sayısını hesapla
  const categoryCount = categories.length

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Yerel veri uyarısı */}
        {usingLocalData && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded">
            <p className="font-bold">Bilgi</p>
            <p>
              Veritabanı bağlantısı kurulamadığı için yerel veri kullanılıyor. Gerçek veriler için lütfen{" "}
              <Link href="/env-setup" className="underline font-medium">
                Supabase bağlantınızı kontrol edin
              </Link>
              .
            </p>
          </div>
        )}

        {/* Hero Section */}
        <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-12">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${brand.image_url || "/placeholder.svg?height=400&width=1200&text=Ürünlerimiz"}')`,
            }}
          ></div>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white">{brand.name}</h1>
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
          <span className="text-gray-800 font-medium">{brand.name}</span>
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
                    src={
                      category.image_url ||
                      "/placeholder.svg?height=200&width=300&text=" + encodeURIComponent(category.name) ||
                      "/placeholder.svg" ||
                      "/placeholder.svg"
                    }
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
