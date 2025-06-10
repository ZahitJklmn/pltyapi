"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Trash2, Star, Eye, Heart } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase"
import { useAuth } from "@/components/auth/AuthProvider"
import ImageEditModal from "./admin/ImageEditModal"

export default function ProductCard({ product, brandId, categoryId, onDelete }) {
  const { isAdmin, user } = useAuth()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showImageEditModal, setShowImageEditModal] = useState(false)
  const [isFeatured, setIsFeatured] = useState(false)
  const [isTogglingFeatured, setIsTogglingFeatured] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isAdmin && product?.slug && brandId && categoryId) {
      const checkFeaturedStatus = async () => {
        try {
          const supabase = getSupabaseClient()
          const { data, error } = await supabase
            .from("featured_products")
            .select("id")
            .eq("product_slug", product.slug)
            .eq("brand_slug", brandId)
            .eq("category_slug", categoryId)
            .maybeSingle()

          if (data) {
            setIsFeatured(true)
          } else {
            setIsFeatured(false)
          }
        } catch (error) {
          console.error("Featured status kontrol hatası:", error)
          setIsFeatured(false)
        }
      }
      checkFeaturedStatus()
    }
  }, [isAdmin, product?.slug, brandId, categoryId])

  const handleToggleFeatured = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (isTogglingFeatured) return

    setIsTogglingFeatured(true)
    try {
      const supabase = getSupabaseClient()

      if (isFeatured) {
        const { error } = await supabase
          .from("featured_products")
          .delete()
          .eq("product_slug", product.slug)
          .eq("brand_slug", brandId)
          .eq("category_slug", categoryId)

        if (error) throw error
        setIsFeatured(false)
      } else {
        const { error } = await supabase.from("featured_products").insert({
          product_name: product.name,
          product_slug: product.slug,
          product_description: product.description,
          product_image_url: product.image_url,
          brand_slug: brandId,
          category_slug: categoryId,
          created_by: user?.id,
        })

        if (error) throw error
        setIsFeatured(true)
      }
    } catch (error) {
      console.error("Featured toggle hatası:", error)
      alert("İşlem sırasında bir hata oluştu: " + error.message)
    } finally {
      setIsTogglingFeatured(false)
    }
  }

  const handleEditClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowImageEditModal(true)
  }

  const handleDelete = async () => {
    if (isDeleting) return

    setIsDeleting(true)
    try {
      const supabase = getSupabaseClient()

      await supabase.from("product_features").delete().eq("product_id", product.id)
      await supabase.from("product_technical_specs").delete().eq("product_id", product.id)
      await supabase.from("product_application_areas").delete().eq("product_id", product.id)

      const { error } = await supabase.from("products").delete().eq("id", product.id)

      if (error) {
        console.error("Ürün silme hatası:", error)
        throw error
      }

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
    <div
      className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={product.image_url || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Floating Action Buttons */}
        <div
          className={`absolute top-4 right-4 flex flex-col space-y-2 transition-all duration-300 ${isHovered ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
        >
          {isAdmin && (
            <button
              onClick={handleToggleFeatured}
              disabled={isTogglingFeatured}
              className={`w-10 h-10 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 flex items-center justify-center ${
                isFeatured
                  ? "bg-yellow-500/90 text-white shadow-lg shadow-yellow-500/25"
                  : "bg-black/30 text-white hover:bg-black/50"
              }`}
              title={isFeatured ? "Öne çıkanlardan kaldır" : "Öne çıkanlara ekle"}
            >
              {isTogglingFeatured ? (
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
              ) : (
                <Star className={`h-4 w-4 ${isFeatured ? "fill-current" : ""}`} />
              )}
            </button>
          )}

          <button className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
            <Heart className="h-4 w-4" />
          </button>

          <button className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
            <Eye className="h-4 w-4" />
          </button>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-black/80 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/20">
            {brandId?.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{product.description}</p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-2 py-1 bg-orange-50 text-orange-600 text-xs font-medium rounded-lg">Kaliteli</span>
          <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-lg">Dayanıklı</span>
          <span className="px-2 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-lg">Çevre Dostu</span>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between">
          {/* Admin Controls */}
          {isAdmin && (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleEditClick}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors duration-200 flex items-center justify-center"
                title="Düzenle"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>

              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-8 h-8 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors duration-200 flex items-center justify-center"
                title="Sil"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* View Product Button */}
          <Link
            href={`/urunler/${brandId}/${categoryId}/${product.slug}`}
            className="ml-auto group/btn relative px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105"
          >
            <span className="relative z-10 flex items-center">
              İncele
              <Eye className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Ürünü Sil</h3>
              <p className="text-gray-600 mb-6">
                "{product.name}" ürünü kalıcı olarak silinecektir. Bu işlem geri alınamaz.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
                  disabled={isDeleting}
                >
                  İptal
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors duration-200 flex items-center justify-center"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  ) : (
                    "Sil"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Edit Modal */}
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
