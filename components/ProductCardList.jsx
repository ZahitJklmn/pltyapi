"use client"
import { useState, useEffect } from "react"
import { useStaggeredAnimation } from "@/hooks/useScrollAnimation"
import ProductCard from "./ProductCard"

export default function ProductCardList({ initialProducts, brandId, categoryId }) {
  const [products, setProducts] = useState(initialProducts || [])
  const [filteredProducts, setFilteredProducts] = useState(initialProducts || [])

  // Animasyon hook'u - products varsa length'ini kullan, yoksa 0
  const [containerRef, visibleItems] = useStaggeredAnimation(filteredProducts?.length || 0, 100)

  useEffect(() => {
    setProducts(initialProducts || [])
    setFilteredProducts(initialProducts || [])
  }, [initialProducts])

  const handleProductDelete = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId)
    setProducts(updatedProducts)
    setFilteredProducts(updatedProducts)
  }

  // Eğer ürün yoksa boş state göster
  if (!filteredProducts || filteredProducts.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Bu kategoride henüz ürün bulunmamaktadır</h3>
        <p className="text-gray-600">Yakında yeni ürünler eklenecektir.</p>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredProducts.map((product, index) => (
        <div
          key={product.id}
          className={`transition-all duration-700 ease-out ${
            visibleItems.has(index) ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          }`}
          style={{
            transitionDelay: `${index * 100}ms`,
            willChange: "transform, opacity",
          }}
        >
          <ProductCard
            product={product}
            brandId={brandId}
            categoryId={categoryId}
            isAdmin={false}
            onDelete={handleProductDelete}
          />
        </div>
      ))}
    </div>
  )
}
