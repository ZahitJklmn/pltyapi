"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { getSupabaseClient } from "@/lib/supabase"
import { getAllLocalBrands } from "@/lib/localData"

export default function ProductsClientPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [brands, setBrands] = useState([])
  const [usingLocalData, setUsingLocalData] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        console.log("Marka verileri yükleniyor...")

        // Önce yerel veriyi hazırla (fallback için)
        const localBrandsData = getAllLocalBrands()

        // Supabase'den veri çekmeyi dene
        let brandsData = []
        let useLocalData = false

        const supabase = getSupabaseClient()

        // Supabase bağlantısını kontrol et
        if (!supabase) {
          console.log("Supabase client oluşturulamadı, yerel veri kullanılacak")
          useLocalData = true
        } else {
          try {
            // Marka bilgilerini al
            const { data: brandsResult, error: brandsError } = await supabase
              .from("brands")
              .select("id, name, slug, image_url, description")
              .order("name")

            console.log("Marka sorgu sonucu:", { data: brandsResult, error: brandsError })

            if (brandsError) {
              console.error("Marka verisi çekilirken hata:", JSON.stringify(brandsError))
              throw new Error(`Markalar yüklenirken hata oluştu: ${brandsError.message}`)
            }

            if (!brandsResult || brandsResult.length === 0) {
              console.log("Hiç marka bulunamadı, yerel veri kullanılacak")
              useLocalData = true
            } else {
              brandsData = brandsResult
              console.log("Marka verisi (Supabase):", brandsData)
            }
          } catch (err) {
            console.error("Supabase veri çekme hatası:", err)
            useLocalData = true
          }
        }

        // Eğer Supabase'den veri çekemediyse, yerel veriyi kullan
        if (useLocalData || brandsData.length === 0) {
          console.log("Yerel veri kullanılıyor...")
          setUsingLocalData(true)
          brandsData = localBrandsData
          console.log("Yerel veri:", brandsData)
        }

        // Verileri state'e kaydet
        setBrands(brandsData)
      } catch (err) {
        console.error("Veri yükleme hatası:", err)
        setError(err.message || "Bilinmeyen bir hata oluştu")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

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
  if (error) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Hata</h1>
          <p className="mb-8">{error}</p>
          <div className="flex justify-center">
            <Link
              href="/"
              className="bg-red-600 text-white px-6 py-3 rounded-md font-medium hover:bg-red-700 transition-colors duration-300"
            >
              Anasayfaya Dön
            </Link>
          </div>
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
                  src={
                    brand.image_url || "/placeholder.svg?height=200&width=300&text=" + encodeURIComponent(brand.name)
                  }
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
