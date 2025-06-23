"use client"
import { useState, useEffect } from "react"

export default function EnvSetup() {
  const [envStatus, setEnvStatus] = useState({
    url: false,
    key: false,
  })
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    url: "",
    key: "",
  })

  useEffect(() => {
    // Tarayıcı localStorage'dan çevre değişkenlerini kontrol et
    const storedUrl = localStorage.getItem("SUPABASE_URL")
    const storedKey = localStorage.getItem("SUPABASE_ANON_KEY")

    setEnvStatus({
      url: !!storedUrl,
      key: !!storedKey,
    })

    if (storedUrl && storedKey) {
      setFormData({
        url: storedUrl,
        key: storedKey,
      })
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Değerleri kontrol et
    if (!formData.url.trim() || !formData.key.trim()) {
      alert("Lütfen hem URL hem de API Key değerlerini girin.")
      return
    }

    // URL formatını kontrol et
    if (!formData.url.startsWith("https://")) {
      alert("Supabase URL'si https:// ile başlamalıdır.")
      return
    }

    // Değerleri localStorage'a kaydet
    localStorage.setItem("SUPABASE_URL", formData.url.trim())
    localStorage.setItem("SUPABASE_ANON_KEY", formData.key.trim())

    setEnvStatus({
      url: true,
      key: true,
    })

    // Bağlantıyı test et
    try {
      const { createClient } = await import("@supabase/supabase-js")
      const testClient = createClient(formData.url.trim(), formData.key.trim())

      const { data, error } = await testClient.from("brands").select("count").limit(1)

      if (error) {
        alert(`Bağlantı testi başarısız: ${error.message}`)
      } else {
        alert("Bağlantı testi başarılı! Ayarlar kaydedildi.")

        // Sayfayı yenile
        window.location.reload()
      }
    } catch (error) {
      alert(`Bağlantı testi sırasında hata: ${error.message}`)
    }

    setShowForm(false)
  }

  return (
    <div className="pt-24 pb-16 hidden">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Supabase Yapılandırması</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Çevre Değişkenleri Durumu</h2>

          <div className="space-y-2 mb-4">
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full mr-2 ${envStatus.url ? "bg-green-500" : "bg-red-500"}`}></div>
              <span>Supabase URL: {envStatus.url ? "Ayarlanmış" : "Eksik"}</span>
            </div>

            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full mr-2 ${envStatus.key ? "bg-green-500" : "bg-red-500"}`}></div>
              <span>Supabase Anon Key: {envStatus.key ? "Ayarlanmış" : "Eksik"}</span>
            </div>
          </div>

          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              {envStatus.url && envStatus.key ? "Değişkenleri Düzenle" : "Değişkenleri Ayarla"}
            </button>
          )}

          {showForm && (
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                  Supabase URL
                </label>
                <input
                  type="text"
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="https://your-project.supabase.co"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="key" className="block text-sm font-medium text-gray-700 mb-1">
                  Supabase Anon Key
                </label>
                <input
                  type="text"
                  id="key"
                  name="key"
                  value={formData.key}
                  onChange={handleChange}
                  placeholder="your-anon-key"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                >
                  Kaydet
                </button>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                >
                  İptal
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Yardım</h2>
          <p className="mb-4">Supabase bağlantısını kurmak için aşağıdaki adımları izleyin:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Supabase projenize gidin ve API ayarlarını açın.</li>
            <li>Project URL ve anon/public key değerlerini yukarıdaki forma girin.</li>
            <li>Değerleri kaydettikten sonra sayfayı yenileyin.</li>
            <li>
              Hala sorun yaşıyorsanız, Supabase projenizin aktif olduğundan ve API erişimine izin verdiğinden emin olun.
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
