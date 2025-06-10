"use client"
import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth/AuthProvider"
import { createClient } from "@supabase/supabase-js"
import { ArrowLeft, MessageSquare, Calendar, User, Mail, Phone, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function RequestDetailClient({ params }) {
  const [request, setRequest] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { isAdmin } = useAuth()
  const router = useRouter()

  // Admin kontrolü
  useEffect(() => {
    if (!isAdmin) {
      router.push("/")
      return
    }
  }, [isAdmin, router])

  // İsteği yükle
  useEffect(() => {
    if (!isAdmin || !params.id) return

    const fetchRequest = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase.from("contact_messages").select("*").eq("id", params.id).single()

        if (error) throw error

        setRequest(data)
      } catch (err) {
        console.error("İstek yüklenirken hata:", err)
        setError("İstek bulunamadı veya yüklenirken bir hata oluştu.")
      } finally {
        setLoading(false)
      }
    }

    fetchRequest()
  }, [isAdmin, params.id])

  // İsteği incelenmiş olarak işaretle (sil)
  const handleMarkAsReviewed = async () => {
    if (!confirm("Bu isteği incelenmiş olarak işaretlemek istediğinizden emin misiniz? Bu işlem geri alınamaz.")) {
      return
    }

    try {
      const { error } = await supabase.from("contact_messages").delete().eq("id", request.id)

      if (error) throw error

      // İstekler sayfasına geri dön
      router.push("/istekler")
    } catch (err) {
      console.error("İstek silinirken hata:", err)
      alert("İstek silinirken bir hata oluştu.")
    }
  }

  // Tarih formatla
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Admin değilse yönlendir
  if (!isAdmin) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            <span className="ml-3 text-gray-600">İstek yükleniyor...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error || !request) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-600 via-neutral-200 to-neutral-600 pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600">{error || "İstek bulunamadı."}</p>
            <button
              onClick={() => router.push("/istekler")}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              İstekler Listesine Dön
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-600 via-neutral-200 to-neutral-600 pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/istekler")}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            İstekler Listesine Dön
          </button>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-red-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">İstek Detayı</h1>
            </div>
            <a
              href={`tel:${request.phone}`}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center"
            >
              <Phone className="h-5 w-5 mr-2" />
              Müşteriyle Görüş
            </a>
          </div>
        </div>

        {/* İstek Detayı */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-8">
            {/* Gönderen Bilgileri */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Gönderen Bilgileri</h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Ad Soyad</p>
                    <p className="text-lg text-gray-900">{request.name}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Email</p>
                    <a
                      href={`mailto:${request.email}`}
                      className="text-lg text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      {request.email}
                    </a>
                  </div>
                </div>
                {request.phone && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Telefon</p>
                      <a
                        href={`tel:${request.phone}`}
                        className="text-lg text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      >
                        {request.phone}
                      </a>
                    </div>
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Gönderim Tarihi</p>
                    <p className="text-lg text-gray-900">{formatDate(request.created_at)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Konu */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Konu</h2>
              <p className="text-lg text-gray-700 bg-gray-50 p-4 rounded-lg">{request.subject}</p>
            </div>

            {/* Mesaj */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Mesaj İçeriği</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{request.message}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Butonlar - Yeni Responsive Tasarım */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            {/* Sol Taraf - Geri Dön */}
            <button
              onClick={() => router.push("/istekler")}
              className="w-full sm:w-auto px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium flex items-center justify-center"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Geri Dön
            </button>

            {/* Sağ Taraf - Aksiyon Butonları */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`mailto:${request.email}?subject=Re: ${request.subject}`}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium inline-flex items-center justify-center"
              >
                <Mail className="h-5 w-5 mr-2" />
                Email ile Yanıtla
              </a>
              {request.phone && (
                <a
                  href={`tel:${request.phone}`}
                  className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium inline-flex items-center justify-center"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Telefon Et
                </a>
              )}
              <button
                onClick={handleMarkAsReviewed}
                className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium flex items-center justify-center"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                İncelendi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
