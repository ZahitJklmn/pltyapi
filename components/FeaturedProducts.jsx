"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { getSupabaseClient } from "@/lib/supabase"

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const supabase = getSupabaseClient()

        // Öne çıkan ürünleri getir
        const { data: featuredData, error: featuredError } = await supabase
          .from("featured_products")
          .select("product_id")
          .order("created_at", { ascending: false })
          .limit(4)

        if (featuredError) throw featuredError

        if (featuredData && featuredData.length > 0) {
          // Ürün detaylarını getir
          const productIds = featuredData.map((item) => item.product_id)

          const { data: productsData, error: productsError } = await supabase
            .from("products")
            .select(`
              id, 
              name, 
              description, 
              slug, 
              image_url,
              categories:category_id (
                id,
                name,
                slug,
                brands:brand_id (
                  id,
                  name,
                  slug
                )
              )
            `)
            .in("id", productIds)

          if (productsError) throw productsError

          // Ürünleri formatla
          const formattedProducts = productsData.map((product) => ({
            id: product.id,
            title: product.name,
            description: product.description,
            price: "", // Fiyat bilgisi yoksa boş bırak
            image: product.image_url || "/placeholder.svg?height=300&width=300&text=Ürün",
            link: `/urunler/${product.categories?.brands?.slug}/${product.categories?.slug}/${product.slug}`,
          }))

          setFeaturedProducts(formattedProducts)
        }
      } catch (error) {
        console.error("Öne çıkan ürünleri getirme hatası:", error)
        setError("Öne çıkan ürünler yüklenirken bir hata oluştu.")
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4">
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-3"></div>
              <div className="flex justify-between items-center">
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
                <div className="h-8 w-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-red-600 p-4 bg-red-100 rounded">{error}</div>
  }

  if (featuredProducts.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-600">Henüz öne çıkan ürün bulunmamaktadır.</p>
        <p className="text-gray-500 text-sm mt-2">Admin panelinden ürünleri öne çıkarabilirsiniz.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {featuredProducts.map((product) => (
        <Link
          href={product.link}
          key={product.id}
          className="group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
        >
          <div className="p-4">
            <div className="mb-4 overflow-hidden rounded">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">{product.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{product.description}</p>
            <div className="flex justify-between items-center">
              {product.price && <span className="text-xl font-bold text-red-600">{product.price} TL</span>}
              <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-all duration-300 group-hover:bg-red-700 ml-auto">
                İncele
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
