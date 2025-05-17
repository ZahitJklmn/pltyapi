"use client"
import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import ProductAddModal from "./ProductAddModal"

export default function AdminAddButton({ brandId, categoryId, brandSlug, categorySlug }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Admin durumunu kontrol et
    const adminStatus = localStorage.getItem("isAdmin") === "true"
    setIsAdmin(adminStatus)
  }, [])

  if (!isAdmin) return null

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
        aria-label="Yeni ürün ekle"
      >
        <Plus className="h-5 w-5" />
      </button>

      {showModal && (
        <ProductAddModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          brandId={brandId}
          categoryId={categoryId}
          brandSlug={brandSlug}
          categorySlug={categorySlug}
        />
      )}
    </>
  )
}
