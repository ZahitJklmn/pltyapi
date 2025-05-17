"use client"
import { useState, useRef } from "react"
import { compressAndConvertToWebP } from "@/utils/imageCompression"
import { getSupabaseClient } from "@/lib/supabase"
import { X, Upload, ArrowRight, ArrowLeft, Check } from "lucide-react"

const applicationAreaOptions = [
  "İç duvarlar",
  "Alçı yüzeyler",
  "Beton yüzeyler",
  "Sıva yüzeyler",
  "Ahşap yüzeyler",
  "Çocuk odaları",
  "Mutfak ve banyo",
  "Yaşam alanları",
  "Ofisler",
  "Eski boyalı yüzeyler",
]

export default function ProductAddModal({ isOpen, onClose, brandId, categoryId, categorySlug, brandSlug }) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  // Form verileri
  const [productImage, setProductImage] = useState(null)
  const [productImagePreview, setProductImagePreview] = useState(null)
  const [productName, setProductName] = useState("")
  const [productDescription, setProductDescription] = useState("")

  // Özellikler
  const [features, setFeatures] = useState(["", "", "", "", "", ""])

  // Teknik özellikler
  const [technicalSpecs, setTechnicalSpecs] = useState({
    coverageArea: "",
    dryingTime: "",
    recoatTime: "",
    finish: "",
    colors: "",
    dilution: "",
  })

  // Uygulama alanları
  const [applicationAreas, setApplicationAreas] = useState(["", "", "", "", "", ""])

  const fileInputRef = useRef(null)

  // Görsel seçme işlemi
  const handleImageSelect = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      // Görsel önizleme için URL oluştur
      const previewUrl = URL.createObjectURL(file)
      setProductImagePreview(previewUrl)
      setProductImage(file)
    } catch (error) {
      console.error("Görsel seçme hatası:", error)
      setError("Görsel seçilirken bir hata oluştu.")
    }
  }

  // Özellik güncelleme
  const handleFeatureChange = (index, value) => {
    const newFeatures = [...features]
    newFeatures[index] = value
    setFeatures(newFeatures)
  }

  // Teknik özellik güncelleme
  const handleTechnicalSpecChange = (key, value) => {
    setTechnicalSpecs({
      ...technicalSpecs,
      [key]: value,
    })
  }

  // Uygulama alanı güncelleme
  const handleApplicationAreaChange = (index, value) => {
    const newAreas = [...applicationAreas]
    newAreas[index] = value
    setApplicationAreas(newAreas)
  }

  // Form doğrulama
  const validateStep1 = () => {
    if (!productImage) {
      setError("Lütfen bir ürün görseli seçin.")
      return false
    }

    if (!productName.trim()) {
      setError("Lütfen ürün adını girin.")
      return false
    }

    if (!productDescription.trim()) {
      setError("Lütfen ürün açıklamasını girin.")
      return false
    }

    setError(null)
    return true
  }

  const validateStep2 = () => {
    // En az 2 özellik kontrolü
    const validFeatures = features.filter((f) => f.trim() !== "")
    if (validFeatures.length < 2) {
      setError("Lütfen en az 2 ürün özelliği girin.")
      return false
    }

    // Teknik özelliklerin dolu olması kontrolü
    const requiredTechSpecs = ["coverageArea", "dryingTime"]
    for (const spec of requiredTechSpecs) {
      if (!technicalSpecs[spec].trim()) {
        setError(`Lütfen ${spec === "coverageArea" ? "Kaplama Alanı" : "Kuruma Süresi"} bilgisini girin.`)
        return false
      }
    }

    // En az 2 uygulama alanı kontrolü
    const validAreas = applicationAreas.filter((a) => a.trim() !== "")
    if (validAreas.length < 2) {
      setError("Lütfen en az 2 uygulama alanı seçin.")
      return false
    }

    setError(null)
    return true
  }

  // Sonraki adıma geçme
  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2)
    }
  }

  // Önceki adıma dönme
  const handlePrevStep = () => {
    setStep(1)
  }

  // Form gönderme
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateStep2()) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const supabase = getSupabaseClient()

      if (!supabase) {
        throw new Error("Supabase bağlantısı kurulamadı. Lütfen Supabase yapılandırmanızı kontrol edin.")
      }

      // Supabase bağlantısını test et
      console.log("Supabase bağlantısı test ediliyor...")
      const { data: testData, error: testError } = await supabase.from("brands").select("count").limit(1)

      if (testError) {
        console.error("Supabase bağlantı testi hatası:", testError)
        throw new Error(`Supabase bağlantı hatası: ${testError.message || JSON.stringify(testError)}`)
      }

      console.log("Supabase bağlantısı başarılı, ürün ekleme işlemi başlıyor...")

      // 1. Görseli sıkıştır ve WebP'ye dönüştür
      console.log("Görsel sıkıştırılıyor...")
      const compressedImage = await compressAndConvertToWebP(productImage)

      // 2. Görseli Supabase Storage'a yükle
      console.log("Görsel Supabase Storage'a yükleniyor...")
      const timestamp = new Date().getTime()
      const randomString = Math.random().toString(36).substring(2, 10)
      const fileName = `products/${timestamp}_${randomString}.webp`

      console.log("Yüklenecek dosya:", fileName)
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, compressedImage, {
          cacheControl: "3600",
          upsert: false,
        })

      if (uploadError) {
        console.error("Görsel yükleme hatası:", uploadError)
        throw new Error(`Görsel yükleme hatası: ${uploadError.message || JSON.stringify(uploadError)}`)
      }

      console.log("Görsel başarıyla yüklendi:", uploadData)

      // Yüklenen görselin public URL'ini al
      const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(fileName)
      const publicUrl = urlData.publicUrl

      console.log("Görsel URL'i:", publicUrl)

      // 3. Ürün slug'ını oluştur
      const slug = productName
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "")

      // 4. Ürünü veritabanına ekle
      console.log("Ürün veritabanına ekleniyor...")
      console.log("Eklenecek ürün bilgileri:", {
        category_id: categoryId,
        name: productName,
        slug: slug,
        description: productDescription,
        image_url: publicUrl,
      })

      const { data: productData, error: productError } = await supabase
        .from("products")
        .insert([
          {
            category_id: categoryId,
            name: productName,
            slug: slug,
            description: productDescription,
            image_url: publicUrl,
          },
        ])
        .select()

      if (productError) {
        console.error("Ürün ekleme hatası:", productError)
        throw new Error(`Ürün ekleme hatası: ${productError.message || JSON.stringify(productError)}`)
      }

      if (!productData || productData.length === 0) {
        throw new Error("Ürün eklendi ancak ürün ID'si alınamadı")
      }

      console.log("Ürün başarıyla eklendi:", productData)
      const productId = productData[0].id

      // 5. Ürün özelliklerini ekle
      const validFeatures = features.filter((f) => f.trim() !== "")
      for (const feature of validFeatures) {
        const { error: featureError } = await supabase.from("product_features").insert({
          product_id: productId,
          feature: feature,
        })

        if (featureError) {
          console.error("Özellik ekleme hatası:", featureError)
        }
      }

      // 6. Teknik özellikleri ekle
      const techSpecsEntries = Object.entries(technicalSpecs).filter(([_, value]) => value.trim() !== "")
      const techSpecsMap = {
        coverageArea: "Kaplama Alanı",
        dryingTime: "Kuruma Süresi",
        recoatTime: "İkinci Kat",
        finish: "Görünüm",
        colors: "Renkler",
        dilution: "İnceltme",
      }

      for (const [key, value] of techSpecsEntries) {
        const { error: techSpecError } = await supabase.from("product_technical_specs").insert({
          product_id: productId,
          spec_name: techSpecsMap[key],
          spec_value: value,
        })

        if (techSpecError) {
          console.error("Teknik özellik ekleme hatası:", techSpecError)
        }
      }

      // 7. Uygulama alanlarını ekle
      const validAreas = applicationAreas.filter((a) => a.trim() !== "")
      for (const area of validAreas) {
        const { error: areaError } = await supabase.from("product_application_areas").insert({
          product_id: productId,
          application_area: area,
        })

        if (areaError) {
          console.error("Uygulama alanı ekleme hatası:", areaError)
        }
      }

      // Başarılı mesajı göster
      setSuccess(true)

      // 3 saniye sonra modalı kapat
      setTimeout(() => {
        onClose()
        // Sayfayı yenile
        window.location.reload()
      }, 3000)
    } catch (error) {
      console.error("Ürün ekleme hatası:", error)
      // Hata mesajını daha detaylı hale getirelim
      let errorMessage = "Ürün eklenirken bir hata oluştu"
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
          <h2 className="text-xl font-bold">
            {step === 1 ? "Yeni Ürün Ekle - Kart Bilgileri" : "Yeni Ürün Ekle - Detay Bilgileri"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Adım göstergesi */}
        <div className="flex items-center justify-center p-4">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 1 ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            1
          </div>
          <div className={`h-1 w-16 ${step === 1 ? "bg-gray-300" : "bg-red-600"}`}></div>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 2 ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            2
          </div>
        </div>

        {/* Form içeriği */}
        <form onSubmit={handleSubmit}>
          {/* Adım 1: Kart Bilgileri */}
          {step === 1 && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Sol taraf: Görsel yükleme */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-red-500 transition-colors"
                    onClick={() => fileInputRef.current.click()}
                  >
                    {productImagePreview ? (
                      <div className="relative w-full h-full">
                        <img
                          src={productImagePreview || "/placeholder.svg"}
                          alt="Ürün önizleme"
                          className="w-full h-full object-contain"
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation()
                            setProductImage(null)
                            setProductImagePreview(null)
                          }}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-12 w-12 text-gray-400 mb-2" />
                        <p className="text-gray-500">Ürün görseli yüklemek için tıklayın</p>
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
                  <p className="text-sm text-gray-500 mt-2">
                    Görsel otomatik olarak WebP formatına dönüştürülecek ve boyutu küçültülecektir.
                  </p>
                </div>

                {/* Sağ taraf: Kart bilgileri */}
                <div>
                  <div className="mb-6">
                    <label htmlFor="productName" className="block text-gray-700 font-medium mb-2">
                      Ürün Adı <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="productName"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Örn: Fenomastic"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="productDescription" className="block text-gray-700 font-medium mb-2">
                      Ürün Açıklaması (Maksimum 2 satır) <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="productDescription"
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Örn: Yüksek kapatıcılığa sahip, silinebilir iç cephe boyası."
                      rows="2"
                      maxLength="150"
                      required
                    ></textarea>
                    <p className="text-sm text-gray-500 mt-1">{productDescription.length}/150 karakter</p>
                  </div>

                  {/* Kart önizleme */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Kart Önizleme</h3>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
                      <div className="h-48 overflow-hidden bg-gray-100">
                        {productImagePreview ? (
                          <img
                            src={productImagePreview || "/placeholder.svg"}
                            alt={productName || "Ürün"}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">Görsel yok</div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-bold mb-2 text-gray-800">{productName || "Ürün Adı"}</h3>
                        <p className="text-gray-600 text-sm mb-4 h-10 overflow-hidden">
                          {productDescription || "Ürün açıklaması burada görünecek."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hata mesajı */}
              {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

              {/* İleri butonu */}
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="bg-red-600 text-white px-6 py-2 rounded-md font-medium hover:bg-red-700 transition-colors duration-300 flex items-center"
                >
                  İleri
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Adım 2: Detay Bilgileri */}
          {step === 2 && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Sol taraf: Form alanları */}
                <div>
                  {/* Özellikler */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Özellikler (En az 2, en fazla 6)</h3>
                    <div className="space-y-3">
                      {features.map((feature, index) => (
                        <input
                          key={index}
                          type="text"
                          value={feature}
                          onChange={(e) => handleFeatureChange(index, e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder={`Özellik ${index + 1} (Örn: Yüksek kapatıcılık)`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Teknik Özellikler */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Teknik Özellikler</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                          Kaplama Alanı <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          value={technicalSpecs.coverageArea}
                          onChange={(e) => handleTechnicalSpecChange("coverageArea", e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="Örn: 10-12 m²/L"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                          Kuruma Süresi <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          value={technicalSpecs.dryingTime}
                          onChange={(e) => handleTechnicalSpecChange("dryingTime", e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="Örn: 1 saat (dokunma kuruluğu)"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">İkinci Kat</label>
                        <input
                          type="text"
                          value={technicalSpecs.recoatTime}
                          onChange={(e) => handleTechnicalSpecChange("recoatTime", e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="Örn: 4 saat"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Görünüm</label>
                        <input
                          type="text"
                          value={technicalSpecs.finish}
                          onChange={(e) => handleTechnicalSpecChange("finish", e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="Örn: Mat"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Renkler</label>
                        <input
                          type="text"
                          value={technicalSpecs.colors}
                          onChange={(e) => handleTechnicalSpecChange("colors", e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="Örn: Geniş renk seçeneği"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">İnceltme</label>
                        <input
                          type="text"
                          value={technicalSpecs.dilution}
                          onChange={(e) => handleTechnicalSpecChange("dilution", e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="Örn: Su ile %10-15"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Uygulama Alanları */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Uygulama Alanları (En az 2, en fazla 6)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {applicationAreas.map((area, index) => (
                        <div key={index}>
                          <label className="block text-gray-700 text-sm font-medium mb-1">
                            {index + 1}. Uygulama Alanı
                          </label>
                          <select
                            value={area}
                            onChange={(e) => handleApplicationAreaChange(index, e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                          >
                            <option value="">Seçiniz</option>
                            {applicationAreaOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sağ taraf: Önizleme */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Ürün Detay Önizleme</h3>

                  {/* Ürün Adı ve Açıklaması */}
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{productName || "Ürün Adı"}</h2>
                    <p className="text-gray-600">{productDescription || "Ürün açıklaması"}</p>
                  </div>

                  {/* Özellikler */}
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-3">Özellikler</h2>
                    <ul className="grid grid-cols-2 gap-2">
                      {features
                        .filter((f) => f.trim() !== "")
                        .map((feature, index) => (
                          <li key={index} className="flex items-center text-gray-600">
                            <svg
                              className="h-5 w-5 text-green-500 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                            {feature}
                          </li>
                        ))}
                    </ul>
                  </div>

                  {/* Teknik Özellikler */}
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-3">Teknik Özellikler</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(technicalSpecs).map(([key, value]) => {
                        if (!value.trim()) return null

                        const labelMap = {
                          coverageArea: "Kaplama Alanı",
                          dryingTime: "Kuruma Süresi",
                          recoatTime: "İkinci Kat",
                          finish: "Görünüm",
                          colors: "Renkler",
                          dilution: "İnceltme",
                        }

                        return (
                          <div key={key} className="bg-gray-100 p-3 rounded">
                            <span className="text-sm text-gray-500">{labelMap[key]}</span>
                            <p className="font-medium">{value}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Uygulama Alanları */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-3">Uygulama Alanları</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {applicationAreas
                        .filter((a) => a.trim() !== "")
                        .map((area, index) => (
                          <div key={index} className="bg-gray-100 p-3 rounded-lg">
                            <div className="flex items-center">
                              <div className="bg-red-100 rounded-full p-2 mr-3">
                                <svg
                                  className="h-4 w-4 text-red-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                  ></path>
                                </svg>
                              </div>
                              <span className="text-gray-700">{area}</span>
                            </div>
                          </div>
                        ))}
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
                  Ürün başarıyla eklendi! Sayfa yenileniyor...
                </div>
              )}

              {/* Butonlar */}
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md font-medium hover:bg-gray-300 transition-colors duration-300 flex items-center"
                  disabled={loading}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Geri
                </button>

                <button
                  type="submit"
                  className={`bg-red-600 text-white px-6 py-2 rounded-md font-medium hover:bg-red-700 transition-colors duration-300 flex items-center ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                  disabled={loading || success}
                >
                  {loading ? "Ekleniyor..." : "Ürünü Ekle"}
                  {!loading && <Check className="ml-2 h-4 w-4" />}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
