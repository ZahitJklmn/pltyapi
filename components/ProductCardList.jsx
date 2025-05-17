"use client"
import { useState, useEffect } from "react"
import ProductCard from "./ProductCard"

export default function ProductCardList({ initialProducts, brandId, categoryId }) {
  const [products, setProducts] = useState(initialProducts)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Admin durumunu kontrol et
    const adminStatus = localStorage.getItem("isAdmin") === "true"
    setIsAdmin(adminStatus)
  }, [])

  // Ürün silme işlemi
  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          brandId={brandId}
          categoryId={categoryId}
          isAdmin={isAdmin}
          onDelete={handleDeleteProduct}
        />
      ))}
    </div>
  )
}
