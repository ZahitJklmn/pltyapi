"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Trash2, Edit2, Star } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase"
import ImageEditModal from "./admin/ImageEditModal"

export default function ProductCard({ product, brandId, categoryId, isAdmin = false, onDelete, onFeaturedChange }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showImageEditModal, setShowImageEditModal] = useState(false)
  const [isFeatured, setIsFeatured] = useState(false)
  const [isTogglingFeatured, setIsTogglingFeatured] = useState(false)

  // Ürünün öne çıkan olup olmadığını kontrol et
  useEffect(() => {
    const checkFeaturedStatus = async () => {
      try {
        const supabase = getSupabaseClient()
        const { data, error } = await supabase
          .from("featured_products")
          .select("id")
          .eq("product_id", product.id)
          .single()

        if (!error && data) {
          setIsFeatured(true)
        }
      } catch (error) {
        console.error("Öne çıkan ürün kontrolü hatası:", error)
      }
    }

    if (isAdmin && product.id) {
      checkFeaturedStatus()
    }
  }, [isAdmin, product.id])

  // Öne çıkan durumunu değiştir
  const toggleFeatured = async () => {
    if (isTogglingFeatured) return
    setIsTogglingFeatured(true)

    try {
      const supabase = getSupabaseClient()

      if (isFeatured) {
        // Öne çıkan ürünlerden kaldır
        const { error } = await supabase.from("featured_products").delete().eq("product_id", product.id)

        if (error) throw error
        setIsFeatured(false)
      } else {
        // Öne çıkan ürünlere ekle
        // Önce mevcut öne çıkan ürün sayısını kontrol et
        const { data: featuredCount, error: countError } = await supabase
          .from("featured_products")
          .select("id", { count: "exact" })

        if (countError) throw countError

        if (featuredCount.length >= 4) {
          alert("En fazla 4 ürün öne çıkarılabilir. Lütfen önce bir ürünü öne çıkarılanlardan kaldırın.")
          setIsTogglingFeatured(false)
          return
        }

        // Öne çıkan ürünlere ekle
        const { error } = await supabase.from("featured_products").insert({ product_id: product.id })

        if (error) throw error
        setIsFeatured(true)
      }

      // Callback fonksiyonunu çağır
      if (onFeaturedChange) {
        onFeaturedChange(product.id, !isFeatured)
      }
    } catch (error) {
      console.error("Öne çıkan ürün değiştirme hatası:", error)
      alert("Öne çıkan ürün durumu değiştirilirken bir hata oluştu.")
    } finally {
      setIsTogglingFeatured(false)
    }
  }

  // Silme işlemi
  const handleDelete = async () => {
    if (isDeleting) return

    setIsDeleting(true)
    try {
      const supabase = getSupabaseClient()

      // Önce ilişkili kayıtları sil
      await supabase.from("product_features").delete().eq("product_id", product.id)
      await supabase.from("product_technical_specs").delete().eq("product_id", product.id)
      await supabase.from("product_application_areas").delete().eq("product_id", product.id)
      await supabase.from("featured_products").delete().eq("product_id", product.id)

      // Ürünü veritabanından sil
      const { error } = await supabase.from("products").delete().eq("id", product.id)

      if (error) {
        console.error("Ürün silme hatası:", error)
        throw error
      }

      // Silme işlemi başarılı olduğunda onDelete callback'ini çağır
      if (onDelete) onDelete(product.id)
    } catch (error) {
      console.error("Ürün silme hatası:", error)
      alert("Ürün silinirken bir hata oluştu: " + error.message)
    } finally {
      setIsDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg relative">
      {/* Görsel Alanı */}
      <div className="h-64 overflow-hidden relative">
        <img
          src={product.image_url || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />

        {/* Admin Kontrolleri */}
        {isAdmin && (
          <div className="absolute top-2 right-2 flex space-x-2">
            <button
              onClick={() => setShowImageEditModal(true)}
              className="bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100 transition-colors"
              title="Görseli Düzenle"
            >
              <Edit2 className="h-4 w-4 text-gray-700" />
            </button>
          </div>
        )}
      </div>

      {/* İçerik Alanı */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 h-12 overflow-hidden">{product.description}</p>

        <div className="flex justify-between items-center">
          {/* Admin için kontroller */}
          {isAdmin && (
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleFeatured}
                className={`text-yellow-500 hover:text-yellow-600 transition-colors ${isTogglingFeatured ? "opacity-50 cursor-not-allowed" : ""}`}
                title={isFeatured ? "Öne çıkarılanlardan kaldır" : "Öne çıkanlara ekle"}
                disabled={isTogglingFeatured}
              >
                <Star className={`h-5 w-5 ${isFeatured ? "fill-yellow-500" : ""}`} />
              </button>

              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="text-red-600 hover:text-red-800 transition-colors"
                title="Ürünü Sil"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* İncele butonu */}
          <Link
            href={`/urunler/${brandId}/${categoryId}/${product.slug}`}
            className="bg-red-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-red-700 transition-colors duration-300 ml-auto"
          >
            İncele
          </Link>
        </div>
      </div>

      {/* Silme Onay Modalı */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Ürünü Silmek İstediğinize Emin Misiniz?</h3>
            <p className="text-gray-600 mb-6">
              "{product.name}" ürünü kalıcı olarak silinecektir. Bu işlem geri alınamaz.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                disabled={isDeleting}
              >
                İptal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Siliniyor...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Eminim, Sil
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Görsel Düzenleme Modalı */}
      {showImageEditModal && (
        <ImageEditModal
          isOpen={showImageEditModal}
          onClose={() => setShowImageEditModal(false)}
          productId={product.id}
          currentImageUrl={product.image_url}
        />
      )}
    </div>
  )
}
