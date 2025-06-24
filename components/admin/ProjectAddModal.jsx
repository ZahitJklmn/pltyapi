"use client"
import { useState, useRef } from "react"
import React from "react"

import { X, Upload, Check, ChevronLeft, ChevronRight } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase"
import { compressAndConvertToWebP } from "@/utils/imageCompression"
import { generateUniqueFileName, validateFileSize, validateFileType } from "@/utils/fileNameUtils"

export default function ProjectAddModal({ isOpen, onClose, onProjectAdded }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  // Form verileri
  const [projectImages, setProjectImages] = useState(Array(6).fill(null))
  const [projectImagePreviews, setProjectImagePreviews] = useState(Array(6).fill(null))
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [completionDate, setCompletionDate] = useState("")

  const fileInputRefs = useRef(
    Array(6)
      .fill(null)
      .map(() => React.createRef()),
  )

  // Görsel seçme işlemi
  const handleImageSelect = async (e, index) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      // Dosya boyutu kontrolü
      if (!validateFileSize(file, 5)) {
        setError("Dosya boyutu 5MB'dan büyük olamaz.")
        return
      }

      // Dosya tipi kontrolü
      if (!validateFileType(file)) {
        setError("Sadece JPG, PNG ve WebP formatları desteklenmektedir.")
        return
      }

      const previewUrl = URL.createObjectURL(file)

      const newImages = [...projectImages]
      const newPreviews = [...projectImagePreviews]

      newImages[index] = file
      newPreviews[index] = previewUrl

      setProjectImages(newImages)
      setProjectImagePreviews(newPreviews)
      setCurrentImageIndex(index)

      // Hata mesajını temizle
      setError(null)
    } catch (error) {
      console.error("Görsel seçme hatası:", error)
      setError("Görsel seçilirken bir hata oluştu.")
    }
  }

  // Görseli kaldırma
  const removeImage = (index) => {
    const newImages = [...projectImages]
    const newPreviews = [...projectImagePreviews]

    if (newPreviews[index]) {
      URL.revokeObjectURL(newPreviews[index])
    }

    newImages[index] = null
    newPreviews[index] = null

    setProjectImages(newImages)
    setProjectImagePreviews(newPreviews)

    // Eğer mevcut görüntülenen resim silindiyse, ilk mevcut resme geç
    const firstAvailableIndex = newPreviews.findIndex((preview) => preview !== null)
    if (currentImageIndex === index && firstAvailableIndex !== -1) {
      setCurrentImageIndex(firstAvailableIndex)
    } else if (firstAvailableIndex === -1) {
      setCurrentImageIndex(0)
    }
  }

  // Form doğrulama
  const validateForm = () => {
    const hasAtLeastOneImage = projectImages.some((img) => img !== null)
    if (!hasAtLeastOneImage) {
      setError("Lütfen en az bir proje görseli seçin.")
      return false
    }
    if (!title.trim()) {
      setError("Lütfen proje başlığını girin.")
      return false
    }
    if (!description.trim()) {
      setError("Lütfen proje açıklamasını girin.")
      return false
    }
    if (!location.trim()) {
      setError("Lütfen konum bilgisini girin.")
      return false
    }
    if (!completionDate) {
      setError("Lütfen tamamlanma tarihini seçin.")
      return false
    }

    setError(null)
    return true
  }

  // Form gönderme
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const supabase = getSupabaseClient()
      const timestamp = new Date().getTime()
      const imageUrls = []

      // Tüm görselleri yükle
      for (let i = 0; i < projectImages.length; i++) {
        const image = projectImages[i]
        if (image) {
          try {
            // Görseli sıkıştır ve WebP'ye dönüştür
            const compressedImage = await compressAndConvertToWebP(image)

            // Güvenli dosya ismi oluştur
            const fileName = generateUniqueFileName(compressedImage.name, i, timestamp)

            console.log(`Görsel ${i + 1} yükleniyor:`, fileName)

            // Görseli Supabase Storage'a yükle
            const { data: uploadData, error: uploadError } = await supabase.storage
              .from("project-images")
              .upload(fileName, compressedImage, {
                cacheControl: "3600",
                upsert: false,
              })

            if (uploadError) {
              throw new Error(`Görsel ${i + 1} yükleme hatası: ${uploadError.message}`)
            }

            // Yüklenen görselin public URL'ini al
            const { data: urlData } = supabase.storage.from("project-images").getPublicUrl(fileName)
            imageUrls.push(urlData.publicUrl)

            console.log(`Görsel ${i + 1} başarıyla yüklendi:`, urlData.publicUrl)
          } catch (imageError) {
            console.error(`Görsel ${i + 1} yükleme hatası:`, imageError)
            throw new Error(`Görsel ${i + 1} yüklenirken hata oluştu: ${imageError.message}`)
          }
        } else {
          imageUrls.push(null)
        }
      }

      // Proje slug'ını oluştur (Türkçe karakterleri temizle)
      const slug = title
        .toLowerCase()
        .replace(/[çÇ]/g, "c")
        .replace(/[ğĞ]/g, "g")
        .replace(/[ıI]/g, "i")
        .replace(/[İi]/g, "i")
        .replace(/[öÖ]/g, "o")
        .replace(/[şŞ]/g, "s")
        .replace(/[üÜ]/g, "u")
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "")

      console.log("Proje veritabanına ekleniyor...")

      // Projeyi veritabanına ekle
      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .insert({
          title,
          description,
          image_url: imageUrls.find((url) => url !== null) || null, // İlk geçerli görseli ana görsel yap
          image_urls: imageUrls,
          completion_date: completionDate,
          location,
          slug: `${slug}-${timestamp}`,
        })
        .select()

      if (projectError) {
        throw new Error(`Proje ekleme hatası: ${projectError.message}`)
      }

      console.log("Proje başarıyla eklendi:", projectData[0])

      // Başarılı mesajı göster
      setSuccess(true)

      // Parent component'e yeni proje eklendiğini bildir
      if (onProjectAdded && projectData && projectData.length > 0) {
        onProjectAdded(projectData[0])
      }

      // 2 saniye sonra modalı kapat
      setTimeout(() => {
        onClose()
        resetForm()
      }, 2000)
    } catch (error) {
      console.error("Proje ekleme hatası:", error)
      setError(error.message || "Proje eklenirken bir hata oluştu.")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setLocation("")
    setCompletionDate("")
    setProjectImages(Array(6).fill(null))
    setProjectImagePreviews(Array(6).fill(null))
    setCurrentImageIndex(0)
    setError(null)
    setSuccess(false)
  }

  if (!isOpen) return null

  const currentPreview = projectImagePreviews[currentImageIndex]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>

      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-auto mx-4">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Yeni Proje Ekle</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sol taraf: Form alanları */}
            <div className="space-y-6">
              {/* Proje Başlığı */}
              <div>
                <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                  Proje Başlığı <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Örn: Metropol AVM Dış Cephe Yenileme"
                  required
                />
              </div>

              {/* Açıklama */}
              <div>
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                  Açıklama <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Proje hakkında detaylı bilgi"
                  rows="6"
                  required
                ></textarea>
              </div>

              {/* Konum */}
              <div>
                <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
                  Konum <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Örn: İstanbul"
                  required
                />
              </div>

              {/* Tamamlanma Tarihi */}
              <div>
                <label htmlFor="completionDate" className="block text-gray-700 font-medium mb-2">
                  Tamamlanma Tarihi <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  id="completionDate"
                  value={completionDate}
                  onChange={(e) => setCompletionDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
            </div>

            {/* Sağ taraf: Görsel yükleme ve önizleme */}
            <div>
              {/* Görsel Yükleme */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Proje Görselleri <span className="text-red-600">*</span>
                  <span className="text-sm text-gray-500 ml-2">(En az 1, en fazla 6 görsel)</span>
                </label>

                {/* Ana görsel görüntüleme alanı */}
                <div className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-red-500 transition-colors mb-4">
                  {currentPreview ? (
                    <div className="relative w-full h-full">
                      <img
                        src={currentPreview || "/placeholder.svg"}
                        alt={`Proje görseli ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeImage(currentImageIndex)
                        }}
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                        {currentImageIndex + 1} / 6
                      </div>
                    </div>
                  ) : (
                    <div
                      className="flex flex-col items-center justify-center h-full"
                      onClick={() => fileInputRefs.current[currentImageIndex]?.current?.click()}
                    >
                      <Upload className="h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-gray-500">Görsel {currentImageIndex + 1} yüklemek için tıklayın</p>
                      <p className="text-gray-400 text-sm mt-1">PNG, JPG veya WebP (max. 5MB)</p>
                    </div>
                  )}
                </div>

                {/* Görsel seçici daireler */}
                <div className="flex justify-center space-x-2">
                  {Array.from({ length: 6 }, (_, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all ${
                        currentImageIndex === index
                          ? "border-red-500 bg-red-500 text-white"
                          : projectImagePreviews[index]
                            ? "border-green-500 bg-green-500 text-white"
                            : "border-gray-300 bg-white text-gray-500 hover:border-red-300"
                      }`}
                      onClick={() => {
                        setCurrentImageIndex(index)
                        if (!projectImagePreviews[index]) {
                          fileInputRefs.current[index]?.current?.click()
                        }
                      }}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                {/* Gizli file input'ları */}
                {Array.from({ length: 6 }, (_, index) => (
                  <input
                    key={index}
                    type="file"
                    ref={fileInputRefs.current[index]}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleImageSelect(e, index)}
                  />
                ))}
              </div>

              {/* Proje Kartı Önizleme */}
              {title && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Kart Önizleme</h3>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
                      {currentPreview ? (
                        <>
                          <img
                            src={currentPreview || "/placeholder.svg"}
                            alt={title}
                            className="w-full h-full object-cover"
                          />
                          {projectImagePreviews.filter((p) => p !== null).length > 1 && (
                            <>
                              <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full">
                                <ChevronLeft className="h-4 w-4" />
                              </button>
                              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full">
                                <ChevronRight className="h-4 w-4" />
                              </button>
                            </>
                          )}
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">Görsel yok</div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{description || "Açıklama burada görünecek."}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-semibold text-gray-700">Tarih</p>
                          <p className="text-gray-600">
                            {completionDate ? new Date(completionDate).toLocaleDateString("tr-TR") : "Tarih seçilmedi"}
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700">Konum</p>
                          <p className="text-gray-600">{location || "Konum bilgisi"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Hata mesajı */}
          {error && <div className="mt-6 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

          {/* Başarı mesajı */}
          {success && (
            <div className="mt-6 p-3 bg-green-100 text-green-700 rounded flex items-center">
              <Check className="h-5 w-5 mr-2" />
              Proje başarıyla eklendi!
            </div>
          )}

          {/* Butonlar */}
          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              disabled={loading}
            >
              İptal
            </button>
            <button
              type="submit"
              className={`px-6 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors flex items-center ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              disabled={loading || success}
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
                  Ekleniyor...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Projeyi Ekle
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
