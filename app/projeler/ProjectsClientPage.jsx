"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { getSupabaseClient } from "@/lib/supabase"
import { Plus } from "lucide-react"
import ProjectAddModal from "@/components/admin/ProjectAddModal"

export default function ProjectsClientPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)

  // Admin durumunu kontrol et
  useEffect(() => {
    const checkAdminStatus = () => {
      const isAdminUser = localStorage.getItem("isAdmin") === "true"
      setIsAdmin(isAdminUser)
    }

    checkAdminStatus()
    window.addEventListener("storage", checkAdminStatus)

    return () => {
      window.removeEventListener("storage", checkAdminStatus)
    }
  }, [])

  // Projeleri getir
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const supabase = getSupabaseClient()

        const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

        if (error) throw error

        setProjects(data || [])
      } catch (error) {
        console.error("Projeleri getirme hatası:", error)
        setError("Projeler yüklenirken bir hata oluştu.")
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Proje ekleme başarılı olduğunda
  const handleProjectAdded = async () => {
    try {
      setLoading(true)
      const supabase = getSupabaseClient()

      const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

      if (error) throw error

      setProjects(data || [])
    } catch (error) {
      console.error("Projeleri yenileme hatası:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-12">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/placeholder.svg?height=400&width=1200&text=Projelerimiz')" }}
          ></div>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Projelerimiz</h1>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center mb-8 text-sm">
          <Link href="/" className="text-gray-500 hover:text-red-600">
            Anasayfa
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-800 font-medium">Projeler</span>
        </div>

        {/* Intro Text ve Admin Buton */}
        <div className="mb-12 relative">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Tamamladığımız Projeler</h2>
          <p className="text-gray-600 max-w-3xl">
            Firmamız, yılların verdiği tecrübe ve profesyonel ekibiyle birçok büyük ölçekli projeyi başarıyla
            tamamlamıştır. Konut projelerinden ticari binalara, tarihi yapılardan modern yapılara kadar geniş bir
            yelpazede hizmet vermekteyiz. Aşağıda tamamladığımız bazı önemli projelerimizi inceleyebilirsiniz.
          </p>

          {/* Admin Buton */}
          {isAdmin && (
            <button
              onClick={() => setShowAddModal(true)}
              className="absolute right-0 top-0 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
              title="Yeni Proje Ekle"
            >
              <Plus className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="space-y-12">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="aspect-video w-full bg-gray-200"></div>
                  <div className="p-8">
                    <div className="h-8 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
                    <div className="h-4 bg-gray-200 rounded mb-6 w-2/3"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-12 bg-gray-200 rounded"></div>
                      <div className="h-12 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 p-4 rounded-lg text-red-700 mb-8">
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="mt-2 text-red-600 underline hover:text-red-800">
              Yeniden Dene
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && projects.length === 0 && (
          <div className="text-center p-12 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Henüz Proje Bulunmuyor</h3>
            <p className="text-gray-600 mb-6">Şu anda gösterilecek tamamlanmış proje bulunmamaktadır.</p>
            {isAdmin && (
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-red-600 text-white px-6 py-3 rounded font-medium hover:bg-red-700 transition-all duration-300 inline-flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                İlk Projeyi Ekle
              </button>
            )}
          </div>
        )}

        {/* Projects List */}
        {!loading && !error && projects.length > 0 && (
          <div className="space-y-12">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={project.image_url || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">{project.title}</h3>
                    <p className="text-gray-600 mb-6">{project.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold text-gray-700">Tarih</p>
                        <p className="text-gray-600">{project.date}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Konum</p>
                        <p className="text-gray-600">{project.location}</p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Link
                        href={`/projeler/${project.id}`}
                        className="inline-block bg-red-600 text-white px-6 py-3 rounded font-medium transition-all duration-300 hover:bg-red-700"
                      >
                        Detayları Gör
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Proje Ekleme Modalı */}
      {showAddModal && (
        <ProjectAddModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onSuccess={handleProjectAdded} />
      )}
    </div>
  )
}
