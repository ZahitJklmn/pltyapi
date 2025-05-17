"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { getSupabaseClient } from "@/lib/supabase"
import AdminAddButton from "@/components/admin/AdminAddButton"
import ProductCardList from "@/components/ProductCardList"
import { getLocalBrandData, getLocalCategoryData, getLocalProductsData } from "@/lib/localData"

export default function CategoryPageClient({ params }) {
  const { brandId, categoryId } = params || {}
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [brand, setBrand] = useState(null)
  const [category, setCategory] = useState(null)
  const [products, setProducts] = useState([])
  const [usingLocalData, setUsingLocalData] = useState(false)
  const [debugInfo, setDebugInfo] = useState({})

  useEffect(() => {
    // Parametreleri kontrol et ve konsola yazdır
    console.log("CategoryPageClient received params:", JSON.stringify(params))

    if (!params) {
      console.error("Params objesi bulunamadı")
      setError("Params objesi bulunamadı")
      setLoading(false)
      return
    }

    const { brandId, categoryId } = params

    if (!brandId || !categoryId) {
      console.error(`Geçersiz URL parametreleri: brandId=${brandId}, categoryId=${categoryId}`)
      setError(`Geçersiz URL parametreleri: brandId=${brandId}, categoryId=${categoryId}`)
      setLoading(false)
      setDebugInfo((prev) => ({ ...prev, params: { brandId, categoryId } }))
      return
    }

    async function fetchData() {
      try {
        setLoading(true)
        console.log("Veri yükleme başladı:", { brandId, categoryId })
        setDebugInfo((prev) => ({ ...prev, params: { brandId, categoryId } }))

        // Önce yerel veriyi hazırla (fallback için)
        const localBrandData = getLocalBrandData(brandId)
        const localCategoryData = getLocalCategoryData(brandId, categoryId)
        const localProductsData = getLocalProductsData(brandId, categoryId)

        setDebugInfo((prev) => ({
          ...prev,
          localData: {
            brand: localBrandData ? true : false,
            category: localCategoryData ? true : false,
            products: localProductsData ? localProductsData.length : 0,
          },
        }))

        // Supabase'den veri çekmeyi dene
        let brandData = null
        let categoryData = null
        let productsData = []
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

              // Kategori bilgisini al
              console.log("Kategori verisi çekiliyor:", { categoryId, brandId: brandData.id })
              const { data: categoryResult, error: categoryError } = await supabase
                .from("categories")
                .select("id, name, slug, image_url, description")
                .eq("slug", categoryId)
                .eq("brand_id", brandData.id)

              setDebugInfo((prev) => ({
                ...prev,
                supabaseQueries: {
                  ...prev.supabaseQueries,
                  categoryQuery: {
                    result: categoryResult ? categoryResult.length : 0,
                    error: categoryError ? categoryError.message : null,
                  },
                },
              }))

              console.log("Kategori sorgu sonucu:", { data: categoryResult, error: categoryError })

              if (categoryError) {
                console.error("Kategori verisi çekilirken hata:", JSON.stringify(categoryError))
                throw new Error(`Kategori bulunamadı: ${categoryError.message || JSON.stringify(categoryError)}`)
              }

              if (!categoryResult || categoryResult.length === 0) {
                console.log("Kategori bulunamadı, yerel veri kullanılacak")
                useLocalData = true
              } else {
                // İlk kategoriyi al (birden fazla olabilir)
                categoryData = categoryResult[0]
                console.log("Kategori verisi (Supabase):", categoryData)

                // Kategorideki ürünleri al
                console.log("Ürün verisi çekiliyor:", categoryData.id)
                const { data: productsResult, error: productsError } = await supabase
                  .from("products")
                  .select("id, name, slug, description, image_url")
                  .eq("category_id", categoryData.id)

                setDebugInfo((prev) => ({
                  ...prev,
                  supabaseQueries: {
                    ...prev.supabaseQueries,
                    productsQuery: {
                      result: productsResult ? productsResult.length : 0,
                      error: productsError ? productsError.message : null,
                    },
                  },
                }))

                console.log("Ürün sorgu sonucu:", { data: productsResult, error: productsError })

                if (productsError) {
                  console.error("Ürün verisi çekilirken hata:", JSON.stringify(productsError))
                  // Ürün hatası kritik değil, devam edebiliriz
                  productsData = []
                } else {
                  productsData = productsResult || []
                  console.log("Ürün verisi (Supabase):", productsData)
                }
              }
            }
          } catch (err) {
            console.error("Supabase veri çekme hatası:", err)
            setDebugInfo((prev) => ({ ...prev, supabaseError: err.message }))
            useLocalData = true
          }
        }

        // Eğer Supabase'den veri çekemediyse veya eksik veri varsa, yerel veriyi kullan
        if (useLocalData || !brandData || !categoryData) {
          console.log("Yerel veri kullanılıyor...")
          setUsingLocalData(true)

          // Yerel veri kontrolü
          if (!localBrandData) {
            console.error("Yerel marka verisi bulunamadı:", brandId)
            throw new Error(`Marka bulunamadı: ${brandId}`)
          }

          if (!localCategoryData) {
            console.error("Yerel kategori verisi bulunamadı:", categoryId)
            throw new Error(`Kategori bulunamadı: ${categoryId}`)
          }

          // Yerel veriyi kullan
          brandData = localBrandData
          categoryData = localCategoryData
          productsData = localProductsData || []

          console.log("Yerel veri:", { brandData, categoryData, productsData })
        }

        // Verileri state'e kaydet
        setBrand(brandData)
        setCategory(categoryData)
        setProducts(productsData)
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
  if (error || !brand || !category) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Kategori Bulunamadı</h1>
          <p className="mb-8">{error || "Aradığınız ürün kategorisi sistemimizde bulunamadı."}</p>
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
                {JSON.stringify({ brandId, categoryId, error, debugInfo }, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Ürün sayısını hesapla
  const productCount = products.length

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
              <p className="text-gray-600 mb-6">
                {brand.name} markasının {category.name} kategorisindeki ürünlerimizi aşağıda inceleyebilirsiniz. Kalite
                ve güvenin adresi olan firmamız, en uygun fiyatlarla en iyi ürünleri sizlere sunmaktadır.
              </p>
              <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                <p className="text-gray-600">
                  Bu kategoride toplam <span className="font-semibold">{productCount}</span> ürün bulunmaktadır.
                </p>

                {/* Admin Butonu */}
                <div className="relative">
                  <AdminAddButton
                    brandId={brand.id}
                    categoryId={category.id}
                    brandSlug={brand.slug}
                    categorySlug={category.slug}
                  />
                </div>
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
