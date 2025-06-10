"use client"
import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth/AuthProvider"
import { createClient } from "@supabase/supabase-js"
import { MessageSquare, Calendar, User, Mail, Phone, Search, Filter, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function RequestsClientPage() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [deletingId, setDeletingId] = useState(null)
  const { isAdmin } = useAuth()
  const router = useRouter()

  // Admin kontrolü
  useEffect(() => {
    if (!isAdmin) {
      window.location.href = "/"
      return
    }
  }, [isAdmin])

  // İstekleri yükle
  const fetchRequests = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error

      setRequests(data || [])
    } catch (err) {
      console.error("İstekler yüklenirken hata:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!isAdmin) return
    fetchRequests()
  }, [isAdmin])

  // İsteği kalıcı olarak sil
  const handleMarkAsReviewed = async (id, e) => {
    e.preventDefault() // Link tıklamasını engelle
    e.stopPropagation() // Event bubbling'i engelle

    if (!confirm("Bu isteği incelendi olarak işaretlemek ve silmek istediğinizden emin misiniz?")) {
      return
    }

    try {
      setDeletingId(id)
      const { error } = await supabase.from("contact_messages").delete().eq("id", id)

      if (error) throw error

      setRequests((prevRequests) => prevRequests.filter((request) => request.id !== id))
    } catch (err) {
      console.error("İstek silinirken hata:", err)
      alert("İstek silinirken bir hata oluştu: " + err.message)
    } finally {
      setDeletingId(null)
    }
  }

  // Filtreleme ve sıralama
  const filteredRequests = requests
    .filter((request) => {
      const searchLower = searchTerm.toLowerCase()
      return (
        request.name.toLowerCase().includes(searchLower) ||
        request.email.toLowerCase().includes(searchLower) ||
        request.subject.toLowerCase().includes(searchLower) ||
        (request.phone && request.phone.toLowerCase().includes(searchLower))
      )
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.created_at) - new Date(a.created_at)
        case "oldest":
          return new Date(a.created_at) - new Date(b.created_at)
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

  // Tarih formatla
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "short",
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
            <span className="ml-3 text-gray-600">İstekler yükleniyor...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-neutral-600 via-neutral-200 to-neutral-600">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <MessageSquare className="h-8 w-8 text-red-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">İletişim İstekleri</h1>
            <span className="ml-4 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              {filteredRequests.length} İstek
            </span>
          </div>

          {/* Arama ve Filtreler */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 h-5 w-5" />
              <input
                type="text"
                placeholder="Ad, email, konu veya telefon ile ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border text-neutral-900 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-black" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 text-neutral-700 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="newest">En Yeni</option>
                <option value="oldest">En Eski</option>
                <option value="name">İsme Göre</option>
              </select>
            </div>
          </div>
        </div>

        {/* İstekler Listesi */}
        {filteredRequests.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {searchTerm ? "Arama sonucu bulunamadı" : "Henüz iletişim isteği yok"}
            </h3>
            <p className="text-gray-500">
              {searchTerm ? "Farklı anahtar kelimeler deneyin" : "İletişim formundan gelen istekler burada görünecek"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                className="block bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <User className="h-5 w-5 text-gray-400 mr-2" />
                        <h3 className="text-lg font-semibold text-gray-900">{request.name}</h3>
                        <span className="ml-3 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                          Yeni
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 text-gray-400 mr-2" />
                          <a
                            href={`mailto:${request.email}`}
                            className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {request.email}
                          </a>
                        </div>
                        {request.phone && (
                          <div className="items-center hidden"> {/* Bu satır, telefon numarasının gizlenmesini sağlar */}
                            <Phone className="h-4 w-4 text-gray-400 mr-2" />
                            <a
                              href={`tel:${request.phone}`}
                              className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {request.phone}
                            </a>
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <h4 className="font-medium text-gray-900 mb-1">Konu:</h4>
                        <p className="text-gray-700">{request.subject}</p>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-1">Mesaj:</h4>
                        <p className="text-gray-600 line-clamp-2">
                          {request.message.length > 150 ? `${request.message.substring(0, 150)}...` : request.message}
                        </p>
                      </div>
                    </div>

                    <div className="ml-6 text-right">
                      <div className="flex items-center text-gray-500 mb-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="text-sm">{formatDate(request.created_at)}</span>
                      </div>
                      <Link
                        href={`/istekler/${request.id}`}
                        className="text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors duration-200"
                      >
                        Detayları Görüntüle →
                      </Link>
                    </div>
                  </div>

                  {/* İncelendi Butonu */}
                  <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={(e) => handleMarkAsReviewed(request.id, e)}
                      disabled={deletingId === request.id}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50"
                    >
                      {deletingId === request.id ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          İşleniyor...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          İncelendi Olarak İşaretle
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
