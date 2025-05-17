"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase"
import { getLocalBrandData, getLocalCategoryData, getLocalProductsData } from "@/lib/localData"

export default function ProductDetailClient({ params }) {
  const { brandId, categoryId, productId } = params
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [brand, setBrand] = useState(null)
  const [category, setCategory] = useState(null)
  const [product, setProduct] = useState(null)
  const [features, setFeatures] = useState([])
  const [technicalSpecs, setTechnicalSpecs] = useState([])
  const [applicationAreas, setApplicationAreas] = useState([])
  const [relatedProducts, setRelatedProducts] = useState([])
  const [usingLocalData, setUsingLocalData] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        console.log("Veri yükleme başladı:", { brandId, categoryId, productId })

        // Önce yerel veriyi hazırla (fallback için)
        const localBrandData = getLocalBrandData(brandId)
        const localCategoryData = getLocalCategoryData(brandId, categoryId)
        const localProductsData = getLocalProductsData(brandId, categoryId)
        const localProductData = localProductsData.find((p) => p.slug === productId)

        // Supabase'den veri çekmeyi dene
        let brandData = null
        let categoryData = null
        let productData = null
        let featuresData = []
        let techSpecsData = []
        let areasData = []
        let relatedData = []
        let useLocalData = false

        const supabase = getSupabaseClient()

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
              .select("name, slug")
              .eq("slug", brandId)

            if (brandError) {
              console.error("Marka verisi çekilirken hata:", JSON.stringify(brandError))
              throw new Error(`Marka bulunamadı: ${brandError.message || JSON.stringify(brandError)}`)
            }

            if (!brandResult || brandResult.length === 0) {
              console.log("Marka bulunamadı, yerel veri kullanılacak")
              useLocalData = true
            } else if (brandResult.length > 1) {
              console.warn("Birden fazla marka bulundu, ilki kullanılacak:", brandResult)
              brandData = brandResult[0]
            } else {
              brandData = brandResult[0]
              console.log("Marka verisi (Supabase):", brandData)

              // Kategori bilgisini al
              console.log("Kategori verisi çekiliyor:", categoryId)
              const { data: categoryResult, error: categoryError } = await supabase
                .from("categories")
                .select("id, name, slug")
                .eq("slug", categoryId)

              if (categoryError) {
                console.error("Kategori verisi çekilirken hata:", JSON.stringify(categoryError))
                throw new Error(`Kategori bulunamadı: ${categoryError.message || JSON.stringify(categoryError)}`)
              }

              if (!categoryResult || categoryResult.length === 0) {
                console.log("Kategori bulunamadı, yerel veri kullanılacak")
                useLocalData = true
              } else if (categoryResult.length > 1) {
                console.warn("Birden fazla kategori bulundu, ilki kullanılacak:", categoryResult)
                categoryData = categoryResult[0]
              } else {
                categoryData = categoryResult[0]
                console.log("Kategori verisi (Supabase):", categoryData)

                // Ürün bilgisini al
                console.log("Ürün verisi çekiliyor:", { productId, categoryId: categoryData.id })
                const { data: productResult, error: productError } = await supabase
                  .from("products")
                  .select("id, name, description, image_url")
                  .eq("slug", productId)
                  .eq("category_id", categoryData.id)

                if (productError) {
                  console.error("Ürün verisi çekilirken hata:", JSON.stringify(productError))
                  throw new Error(`Ürün bulunamadı: ${productError.message || JSON.stringify(productError)}`)
                }

                if (!productResult || productResult.length === 0) {
                  console.log("Ürün bulunamadı, yerel veri kullanılacak")
                  useLocalData = true
                } else if (productResult.length > 1) {
                  console.warn("Birden fazla ürün bulundu, ilki kullanılacak:", productResult)
                  productData = productResult[0]
                } else {
                  productData = productResult[0]
                  console.log("Ürün verisi (Supabase):", productData)

                  // Ürün özelliklerini al
                  try {
                    const { data: featuresResult, error: featuresError } = await supabase
                      .from("product_features")
                      .select("feature")
                      .eq("product_id", productData.id)

                    if (featuresError) {
                      console.error("Özellik verisi çekilirken hata:", JSON.stringify(featuresError))
                    } else {
                      featuresData = featuresResult || []
                    }
                  } catch (featuresErr) {
                    console.error("Özellik verisi exception:", featuresErr)
                  }

                  // Ürün teknik özelliklerini al
                  try {
                    const { data: techSpecsResult, error: techSpecsError } = await supabase
                      .from("product_technical_specs")
                      .select("spec_name, spec_value")
                      .eq("product_id", productData.id)

                    if (techSpecsError) {
                      console.error("Teknik özellik verisi çekilirken hata:", JSON.stringify(techSpecsError))
                    } else {
                      techSpecsData = techSpecsResult || []
                    }
                  } catch (techSpecsErr) {
                    console.error("Teknik özellik verisi exception:", techSpecsErr)
                  }

                  // Ürün uygulama alanlarını al
                  try {
                    const { data: areasResult, error: areasError } = await supabase
                      .from("product_application_areas")
                      .select("application_area")
                      .eq("product_id", productData.id)

                    if (areasError) {
                      console.error("Uygulama alanı verisi çekilirken hata:", JSON.stringify(areasError))
                    } else {
                      areasData = areasResult || []
                    }
                  } catch (areasErr) {
                    console.error("Uygulama alanı verisi exception:", areasErr)
                  }

                  // Benzer ürünleri al
                  try {
                    const { data: relatedResult, error: relatedError } = await supabase
                      .from("products")
                      .select("id, name, slug, image_url")
                      .eq("category_id", categoryData.id)
                      .neq("id", productData.id)
                      .limit(4)

                    if (relatedError) {
                      console.error("Benzer ürün verisi çekilirken hata:", JSON.stringify(relatedError))
                    } else {
                      relatedData = relatedResult || []
                    }
                  } catch (relatedErr) {
                    console.error("Benzer ürün verisi exception:", relatedErr)
                  }
                }
              }
            }
          } catch (err) {
            console.error("Supabase veri çekme hatası:", err)
            useLocalData = true
          }
        }

        // Eğer Supabase'den veri çekemediyse, yerel veriyi kullan
        if (useLocalData || !brandData || !categoryData || !productData) {
          console.log("Yerel veri kullanılıyor...")
          setUsingLocalData(true)

          if (!localBrandData) {
            throw new Error(`Marka bulunamadı: ${brandId}`)
          }

          if (!localCategoryData) {
            throw new Error(`Kategori bulunamadı: ${categoryId}`)
          }

          if (!localProductData) {
            throw new Error(`Ürün bulunamadı: ${productId}`)
          }

          // Yerel veriyi kullan
          brandData = localBrandData
          categoryData = localCategoryData
          productData = localProductData

          // Benzer ürünleri al
          relatedData = localProductsData.filter((p) => p.id !== productData.id).slice(0, 4)

          // Örnek özellikler
          featuresData = [
            { feature: "Yüksek kapatıcılık" },
            { feature: "Silinebilir yüzey" },
            { feature: "Kolay uygulama" },
            { feature: "Solmaya karşı dayanıklı" },
          ]

          // Örnek teknik özellikler
          techSpecsData = [
            { spec_name: "Kaplama Alanı", spec_value: "10-12 m²/L" },
            { spec_name: "Kuruma Süresi", spec_value: "1 saat (dokunma kuruluğu)" },
            { spec_name: "İkinci Kat", spec_value: "4 saat" },
            { spec_name: "Görünüm", spec_value: "Mat" },
          ]

          // Örnek uygulama alanları
          areasData = [
            { application_area: "İç duvarlar" },
            { application_area: "Alçı yüzeyler" },
            { application_area: "Beton yüzeyler" },
          ]

          console.log("Yerel veri:", { brandData, categoryData, productData, relatedData })
        }

        // Verileri state'e kaydet
        setBrand(brandData)
        setCategory(categoryData)
        setProduct(productData)
        setFeatures(featuresData)
        setTechnicalSpecs(techSpecsData)
        setApplicationAreas(areasData)
        setRelatedProducts(relatedData)
      } catch (err) {
        console.error("Veri yükleme hatası:", err)
        setError(err.message || "Bilinmeyen bir hata oluştu")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [brandId, categoryId, productId])

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
  if (error || !brand || !category || !product) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Ürün Bulunamadı</h1>
          <p className="mb-8">{error || "Aradığınız ürün sistemimizde bulunamadı."}</p>
          <Link
            href="/urunler"
            className="bg-red-600 text-white px-6 py-3 rounded-md font-medium hover:bg-red-700 transition-colors duration-300"
          >
            Tüm Ürünler
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Yerel veri uyarısı */}
        {usingLocalData && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded">
            <p className="font-bold">Bilgi</p>
            <p>
              Veritabanı bağlantısı kurulamadığı için yerel veri kullanılıyor. Gerçek veriler için lütfen Supabase
              bağlantınızı kontrol edin.
            </p>
          </div>
        )}

        {/* Breadcrumb */}
        <div className="flex items-center mb-8 text-sm">
          <Link href="/" className="text-gray-500 hover:text-red-600">
            Anasayfa
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          <Link href="/urunler" className="text-gray-500 hover:text-red-600">
            Ürünler
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          <Link href={`/urunler/${brandId}`} className="text-gray-500 hover:text-red-600">
            {brand.name}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          <Link href={`/urunler/${brandId}/${categoryId}`} className="text-gray-500 hover:text-red-600">
            {category.name}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          <span className="text-gray-800 font-medium">{product.name}</span>
        </div>

        {/* Product Info */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div>
              <div className="rounded-lg overflow-hidden">
                <img
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Product Details */}
            <div>
              <div className="mb-2">
                <span className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                  {brand.name}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
              <div className="border-b border-gray-200 pb-4 mb-4">
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Features */}
              {features && features.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Özellikler</h2>
                  <ul className="grid grid-cols-2 gap-2">
                    {features.map((item, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {item.feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technical Specifications */}
              {technicalSpecs && technicalSpecs.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Teknik Özellikler</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {technicalSpecs.map((spec, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded">
                        <span className="text-sm text-gray-500">{spec.spec_name}</span>
                        <p className="font-medium">{spec.spec_value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Call to Action */}
              <div className="flex space-x-4">
                <Link
                  href="/iletisim"
                  className="bg-red-600 text-white px-6 py-3 rounded-md font-medium hover:bg-red-700 transition-colors duration-300 inline-flex items-center"
                >
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                  Fiyat Bilgisi İçin Arayın
                </Link>
                <Link
                  href={`/iletisim?product=${product.name}`}
                  className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors duration-300"
                >
                  Bilgi İsteyin
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Applications */}
        {applicationAreas && applicationAreas.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Uygulama Alanları</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {applicationAreas.map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-red-100 rounded-full p-3 mr-4">
                      <svg
                        className="h-6 w-6 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">{item.application_area}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">İlgili Ürünler</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/urunler/${brandId}/${categoryId}/${relatedProduct.slug}`}
                  className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={relatedProduct.image_url || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{relatedProduct.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
