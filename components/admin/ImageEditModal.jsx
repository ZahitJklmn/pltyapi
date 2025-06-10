"use client"
import { useState, useRef } from "react"
import { X, Upload, Check } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase"
import { compressAndConvertToWebP } from "@/utils/imageCompression"

export default function ImageEditModal({ isOpen, onClose, productId, currentImageUrl }) {
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef(null)

  // Modal kapatma - event propagation'ı durdur
  const handleBackdropClick = (e) => {
    e.stopPropagation()
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Modal içeriği tıklaması - propagation'ı durdur
  const handleModalContentClick = (e) => {
    e.stopPropagation()
  }

  // Kapatma butonu
  const handleCloseClick = (e) => {
    e.stopPropagation()
    onClose()
  }

  // Görsel seçme işlemi
  const handleImageSelect = async (e) => {
    e.stopPropagation()
    const file = e.target.files[0]
    if (!file) return

    try {
      // Görsel önizleme için URL oluştur
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
      setImageFile(file)
      setError(null)
    } catch (error) {
      console.error("Görsel seçme hatası:", error)
      setError("Görsel seçilirken bir hata oluştu.")
    }
  }

  // Dosya input'a tıklama
  const handleFileInputClick = (e) => {
    e.stopPropagation()
    fileInputRef.current?.click()
  }

  // Görsel güncelleme işlemi
  const handleUpdateImage = async (e) => {
    e.stopPropagation()

    if (!imageFile) {
      setError("Lütfen bir görsel seçin.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const supabase = getSupabaseClient()

      // 1. Görseli sıkıştır ve WebP'ye dönüştür
      const compressedImage = await compressAndConvertToWebP(imageFile)

      // 2. Görseli Supabase Storage'a yükle
      const timestamp = new Date().getTime()
      const fileName = `products/${timestamp}_${compressedImage.name}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, compressedImage, {
          cacheControl: "3600",
          upsert: false,
        })

      if (uploadError) {
        console.error("Görsel yükleme hatası:", uploadError)
        throw uploadError
      }

      console.log("Görsel yüklendi:", uploadData)

      // Yüklenen görselin public URL'ini al
      const {
        data: { publicUrl },
      } = supabase.storage.from("product-images").getPublicUrl(fileName)

      console.log("Görsel URL:", publicUrl)

      // 3. Ürün bilgisini güncelle
      const { data: updateData, error: updateError } = await supabase
        .from("products")
        .update({ image_url: publicUrl })
        .eq("id", productId)
        .select()

      if (updateError) {
        console.error("Ürün güncelleme hatası:", updateError)
        throw updateError
      }

      console.log("Ürün güncellendi:", updateData)

      // Başarılı mesajı göster
      setSuccess(true)

      // 2 saniye sonra modalı kapat
      setTimeout(() => {
        onClose()
        // Sayfayı yenile
        window.location.reload()
      }, 2000)
    } catch (error) {
      console.error("Görsel güncelleme hatası:", error)
      setError("Görsel güncellenirken bir hata oluştu: " + (error.message || JSON.stringify(error)))
    } finally {
      setLoading(false)
    }
  }

  // Görsel kaldırma
  const handleRemoveImage = (e) => {
    e.stopPropagation()
    setImageFile(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" onClick={handleBackdropClick}>
      {/* Arkaplan overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Modal içeriği */}
      <div
        className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
        onClick={handleModalContentClick}
      >
        {/* Başlık ve kapatma butonu */}
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-bold">Ürün Görselini Güncelle</h2>
          <button
            onClick={handleCloseClick}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1"
            type="button"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form içeriği */}
        <div className="p-6">
          {/* Mevcut görsel */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Mevcut Görsel</h3>
            <div className="h-48 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={currentImageUrl || "/placeholder.svg"}
                alt="Mevcut görsel"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Yeni görsel yükleme */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Yeni Görsel</h3>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex flex-col items-center justify-center cursor-pointer hover:border-red-500 transition-colors"
              onClick={handleFileInputClick}
            >
              {imagePreview ? (
                <div className="relative w-full h-full">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Yeni görsel önizleme"
                    className="w-full h-full object-contain"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-gray-500">Yeni görsel yüklemek için tıklayın</p>
                  <p className="text-gray-400 text-sm mt-1">PNG, JPG veya WebP (max. 5MB)</p>
                </>
              )}
            </div>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageSelect} />
            <p className="text-sm text-gray-500 mt-2">
              Görsel otomatik olarak WebP formatına dönüştürülecek ve boyutu küçültülecektir.
            </p>
          </div>

          {/* Hata mesajı */}
          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

          {/* Başarı mesajı */}
          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded flex items-center">
              <Check className="h-5 w-5 mr-2" />
              Görsel başarıyla güncellendi! Sayfa yenileniyor...
            </div>
          )}

          {/* Butonlar */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleCloseClick}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              disabled={loading}
              type="button"
            >
              İptal
            </button>
            <button
              onClick={handleUpdateImage}
              className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center ${
                loading || !imageFile ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={loading || !imageFile || success}
              type="button"
            >
              {loading ? (
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
                  Güncelleniyor...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Görseli Güncelle
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
