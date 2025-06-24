"use client"
import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Plus, Trash2, ChevronRight, ChevronLeft } from "lucide-react"
import { useAuth } from "@/components/auth/AuthProvider"
import { getSupabaseClient } from "@/lib/supabase"
import ProjectAddModal from "@/components/admin/ProjectAddModal"

// Proje kartı için carousel bileşeni
function ProjectImageCarousel({ images, title }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Null olmayan görselleri filtrele
  const validImages = images.filter((img) => img !== null && img !== undefined)

  if (validImages.length === 0) {
    return (
      <div className="aspect-video w-full overflow-hidden bg-gray-100 flex items-center justify-center">
        <span className="text-gray-400">Görsel yok</span>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % validImages.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length)
  }

  return (
    <div className="aspect-video w-full overflow-hidden relative group">
      <img
        src={validImages[currentIndex] || "/placeholder.svg"}
        alt={`${title} - Görsel ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-opacity duration-300"
        loading="lazy"
        draggable="false"
      />

      {validImages.length > 1 && (
        <>
          {/* Sol ok */}
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
            aria-label="Önceki görsel"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Sağ ok */}
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
            aria-label="Sonraki görsel"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Görsel sayacı */}
          <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {currentIndex + 1} / {validImages.length}
          </div>

          {/* Nokta göstergeleri */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {validImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Görsel ${index + 1}'e git`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function ProjectsClientPage() {
  const [supabaseProjects, setSupabaseProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const { isAdmin } = useAuth()

  // 3 sabit proje - memoize edildi
  const staticProjects = useMemo(() => [], [])

  useEffect(() => {
    fetchSupabaseProjects()
  }, [])

  const fetchSupabaseProjects = async () => {
    try {
      const supabase = getSupabaseClient()
      if (!supabase) {
        setLoading(false)
        return
      }

      // Sadece gerekli alanları seç (performans için)
      const { data, error } = await supabase
        .from("projects")
        .select("id, title, description, image_url, image_urls, completion_date, location, slug")
        .order("created_at", { ascending: false })
        .limit(20) // Limit ekle

      if (error) {
        console.error("Projeler yüklenirken hata:", error)
      } else {
        setSupabaseProjects(data || [])
      }
    } catch (error) {
      console.error("Projeler yüklenirken hata:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleProjectAdded = (newProject) => {
    setSupabaseProjects((prev) => [newProject, ...prev])
    setShowAddModal(false)
  }

  const handleProjectDeleted = (deletedProjectId) => {
    setSupabaseProjects((prev) => prev.filter((project) => project.id !== deletedProjectId))
  }

  const handleDeleteProject = async (projectId) => {
    if (!confirm("Bu projeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.")) {
      return
    }

    try {
      const supabase = getSupabaseClient()

      // Önce projeyi veritabanından sil
      const { error } = await supabase.from("projects").delete().eq("id", projectId)

      if (error) {
        throw new Error(`Proje silme hatası: ${error.message}`)
      }

      // Başarılı silme sonrası state'i güncelle
      handleProjectDeleted(projectId)

      console.log("Proje başarıyla silindi:", projectId)
    } catch (error) {
      console.error("Proje silme hatası:", error)
      alert("Proje silinirken bir hata oluştu: " + error.message)
    }
  }

  // Proje görsellerini al (yeni image_urls alanını öncelikle kullan, yoksa eski image_url'i kullan)
  const getProjectImages = (project) => {
    if (project.image_urls && Array.isArray(project.image_urls)) {
      return project.image_urls
    } else if (project.image_url) {
      return [project.image_url]
    }
    return ["/placeholder.svg"]
  }

  // Tüm projeleri birleştir (memoize edildi)
  const allProjects = useMemo(() => [...staticProjects, ...supabaseProjects], [staticProjects, supabaseProjects])

  if (loading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Projeler yükleniyor...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="pt-24 pb-16 bg-gradient-to-br from-neutral-600 via-neutral-200 to-neutral-600">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-12">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('stock/our-projects.jpg?height=400&width=1200&text=Projelerimiz')" }}
            ></div>
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white">Projelerimiz</h1>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center mb-8 text-sm">
            <Link href="/" className="text-black hover:text-red-600 transition-all duration-300">
              Anasayfa
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-neutral-900" />
            <span className="text-red-600 font-medium">Projeler</span>
          </div>

          {/* Intro Text ve Admin Buton */}
          <div className="mb-12 relative">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Tamamladığımız Projeler</h2>
            <p className="text-gray-800 max-w-3xl">
              Firmamız, yılların verdiği tecrübe ve profesyonel ekibiyle birçok büyük ölçekli projeyi başarıyla
              tamamlamıştır. Konut projelerinden ticari binalara, tarihi yapılardan modern yapılara kadar geniş bir
              yelpazede hizmet vermekteyiz.
            </p>

            {/* Admin Proje Ekleme Butonu */}
            {isAdmin && (
              <div className="absolute right-0 top-0">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
                  title="Yeni proje ekle"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          {/* Projects List */}
          <div className="space-y-12">
            {allProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative">
                    <ProjectImageCarousel images={getProjectImages(project)} title={project.title} />

                    {/* Admin silme butonu - sadece Supabase projeler için */}
                    {isAdmin && !project.id.toString().startsWith("static") && (
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-colors z-10"
                        title="Projeyi sil"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">{project.title}</h3>
                    <p className="text-gray-800 mb-6">{project.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold text-gray-700">Tarih</p>
                        <p className="text-gray-600">
                          {project.completion_date
                            ? new Date(project.completion_date).toLocaleDateString("tr-TR", {
                                year: "numeric",
                                month: "long",
                              })
                            : "Tarih belirtilmemiş"}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Konum</p>
                        <p className="text-gray-600">{project.location}</p>
                      </div>
                    </div>
                    <div className="my-6 flex">
                      <div className="text-lg text-black">
                        <p>Projelerinizi Bizimle Güzelleştirmek İçin →</p>
                        <Link
                          href={`/iletisim`}
                          className="flex text-center mt-4 items-center justify-center ml-auto group/btn relative px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105"
                        >
                          <span className="relative z-10 flex items-center ">İletişime Geçin</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Proje Ekleme Modalı */}
      <ProjectAddModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onProjectAdded={handleProjectAdded}
      />
    </>
  )
}
