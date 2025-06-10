"use client"
import { useState, useRef } from "react"
import { X, Upload, Check } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase"
import { compressAndConvertToWebP } from "@/utils/imageCompression"

export default function ProjectAddModal({ isOpen, onClose, onProjectAdded }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  // Form verileri
  const [projectImage, setProjectImage] = useState(null)
  const [projectImagePreview, setProjectImagePreview] = useState(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [completionDate, setCompletionDate] = useState("")

  const fileInputRef = useRef(null)

  // Görsel seçme işlemi
  const handleImageSelect = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
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

      // 1. Görseli sıkıştır ve WebP'ye dönüştür
      const compressedImage = await compressAndConvertToWebP(projectImage)

      // 2. Görseli Supabase Storage'a yükle
      const timestamp = new Date().getTime()
      const fileName = `projects/${timestamp}_${compressedImage.name}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(fileName, compressedImage, {
          cacheControl: "3600",
          upsert: false,
        })

      if (uploadError) {
        throw new Error(`Görsel yükleme hatası: ${uploadError.message}`)
      }

      // Yüklenen görselin public URL'ini al
      const { data: urlData } = supabase.storage.from("project-images").getPublicUrl(fileName)
      const publicUrl = urlData.publicUrl

      // 3. Proje slug'ını oluştur
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "")

      // 4. Projeyi veritabanına ekle
      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .insert({
          title,
          description,
          image_url: publicUrl,
          completion_date: completionDate,
          location,
          slug: `${slug}-${timestamp}`, // Benzersizlik için timestamp ekle
        })
        .select()

      if (projectError) {
        throw new Error(`Proje ekleme hatası: ${projectError.message}`)
      }

      // Başarılı mesajı göster
      setSuccess(true)

      // Parent component'e yeni proje eklendiğini bildir
      if (onProjectAdded && projectData && projectData.length > 0) {
        onProjectAdded(projectData[0])
      }

      // 2 saniye sonra modalı kapat
      setTimeout(() => {
        onClose()
        // Form verilerini temizle
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
    setProjectImage(null)
    setProjectImagePreview(null)
    setError(null)
    setSuccess(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>

      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto mx-4">
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
                  Proje Görseli <span className="text-red-600">*</span>
                </label>
                <div
                  className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-red-500 transition-colors"
                  onClick={() => fileInputRef.current.click()}
                >
                  {projectImagePreview ? (
                    <div className="relative w-full h-full">
                      <img
                        src={projectImagePreview || "/placeholder.svg"}
                        alt="Proje önizleme"
                        className="w-full h-full object-cover rounded-lg"
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
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageSelect}
                />
              </div>

              {/* Proje Kartı Önizleme */}
              {title && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Kart Önizleme</h3>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden bg-gray-100">
                      {projectImagePreview ? (
                        <img
                          src={projectImagePreview || "/placeholder.svg"}
                          alt={title}
                          className="w-full h-full object-cover"
                        />
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
