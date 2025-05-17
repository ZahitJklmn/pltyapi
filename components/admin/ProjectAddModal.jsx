"use client"
import { useState, useRef } from "react"
import { getSupabaseClient } from "@/lib/supabase"
import { X, Upload, Check } from "lucide-react"
import { compressAndConvertToWebP } from "@/utils/imageCompression"

export default function ProjectAddModal({ isOpen, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  // Form verileri
  const [projectImage, setProjectImage] = useState(null)
  const [projectImagePreview, setProjectImagePreview] = useState(null)
  const [projectTitle, setProjectTitle] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [projectDate, setProjectDate] = useState("")
  const [projectLocation, setProjectLocation] = useState("")

  const fileInputRef = useRef(null)

  // Görsel seçme işlemi
  const handleImageSelect = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      // Görsel önizleme için URL oluştur
      const previewUrl = URL.createObjectURL(file)
      setProjectImagePreview(previewUrl)
      setProjectImage(file)
    } catch (error) {
      console.error("Görsel seçme hatası:", error)
      setError("Görsel seçilirken bir hata oluştu.")
    }
  }

  // Form doğrulama
  const validateForm = () => {
    if (!projectImage) {
      setError("Lütfen bir proje görseli seçin.")
      return false
    }

    if (!projectTitle.trim()) {
      setError("Lütfen proje başlığını girin.")
      return false
    }

    if (!projectDescription.trim()) {
      setError("Lütfen proje açıklamasını girin.")
      return false
    }

    if (!projectDate.trim()) {
      setError("Lütfen proje tarihini girin.")
      return false
    }

    if (!projectLocation.trim()) {
      setError("Lütfen proje konumunu girin.")
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

      if (!supabase) {
        throw new Error("Supabase bağlantısı kurulamadı. Lütfen Supabase yapılandırmanızı kontrol edin.")
      }

      // 1. Görseli sıkıştır ve WebP'ye dönüştür
      const compressedImage = await compressAndConvertToWebP(projectImage)

      // 2. Görseli Supabase Storage'a yükle
      const timestamp = new Date().getTime()
      const randomString = Math.random().toString(36).substring(2, 10)
      const fileName = `projects/${timestamp}_${randomString}.webp`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(fileName, compressedImage, {
          cacheControl: "3600",
          upsert: false,
        })

      if (uploadError) {
        console.error("Görsel yükleme hatası:", uploadError)
        throw new Error(`Görsel yükleme hatası: ${uploadError.message || JSON.stringify(uploadError)}`)
      }

      // Yüklenen görselin public URL'ini al
      const { data: urlData } = supabase.storage.from("project-images").getPublicUrl(fileName)
      const publicUrl = urlData.publicUrl

      // 3. Proje slug'ını oluştur
      const slug = projectTitle
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "")

      // 4. Projeyi veritabanına ekle
      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .insert([
          {
            title: projectTitle,
            slug: slug,
            description: projectDescription,
            image_url: publicUrl,
            date: projectDate,
            location: projectLocation,
          },
        ])
        .select()

      if (projectError) {
        console.error("Proje ekleme hatası:", projectError)
        throw new Error(`Proje ekleme hatası: ${projectError.message || JSON.stringify(projectError)}`)
      }

      // Başarılı mesajı göster
      setSuccess(true)

      // 3 saniye sonra modalı kapat
      setTimeout(() => {
        onClose()
        if (onSuccess) onSuccess()
      }, 2000)
    } catch (error) {
      console.error("Proje ekleme hatası:", error)
      let errorMessage = "Proje eklenirken bir hata oluştu"
      if (error.message) {
        errorMessage += ": " + error.message
      } else if (error.error_description) {
        errorMessage += ": " + error.error_description
      } else if (typeof error === "object") {
        errorMessage += ": " + JSON.stringify(error)
      }
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Arkaplan overlay */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>

      {/* Modal içeriği */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
        {/* Başlık ve kapatma butonu */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Yeni Proje Ekle</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form içeriği */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sol taraf: Görsel yükleme */}
            <div className="flex flex-col items-center">
              <div
                className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-red-500 transition-colors"
                onClick={() => fileInputRef.current.click()}
              >
                {projectImagePreview ? (
                  <div className="relative w-full h-full">
                    <img
                      src={projectImagePreview || "/placeholder.svg"}
                      alt="Proje önizleme"
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        setProjectImage(null)
                        setProjectImagePreview(null)
                      }}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-gray-500">Proje görseli yüklemek için tıklayın</p>
                    <p className="text-gray-400 text-sm mt-1">PNG, JPG veya WebP (max. 5MB)</p>
                  </>
                )}
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageSelect} />
              <p className="text-sm text-gray-500 mt-2">
                Görsel otomatik olarak WebP formatına dönüştürülecek ve boyutu küçültülecektir.
              </p>
            </div>

            {/* Sağ taraf: Proje bilgileri */}
            <div>
              <div className="mb-6">
                <label htmlFor="projectTitle" className="block text-gray-700 font-medium mb-2">
                  Proje Başlığı <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="projectTitle"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Örn: Metropol AVM Dış Cephe Yenileme"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="projectDescription" className="block text-gray-700 font-medium mb-2">
                  Proje Açıklaması <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="projectDescription"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Proje hakkında detaylı bilgi"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="projectDate" className="block text-gray-700 font-medium mb-2">
                    Tarih <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="projectDate"
                    value={projectDate}
                    onChange={(e) => setProjectDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Örn: Haziran 2023"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="projectLocation" className="block text-gray-700 font-medium mb-2">
                    Konum <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="projectLocation"
                    value={projectLocation}
                    onChange={(e) => setProjectLocation(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Örn: İstanbul"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Hata mesajı */}
          {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

          {/* Başarı mesajı */}
          {success && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded flex items-center">
              <Check className="h-5 w-5 mr-2" />
              Proje başarıyla eklendi!
            </div>
          )}

          {/* Butonlar */}
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors mr-3"
              disabled={loading}
            >
              İptal
            </button>

            <button
              type="submit"
              className={`bg-red-600 text-white px-6 py-2 rounded-md font-medium hover:bg-red-700 transition-colors duration-300 flex items-center ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              disabled={loading || success}
            >
              {loading ? "Ekleniyor..." : "Projeyi Ekle"}
              {!loading && <Check className="ml-2 h-4 w-4" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
