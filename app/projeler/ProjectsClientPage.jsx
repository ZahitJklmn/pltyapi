"use client"
import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Plus, Trash2 } from "lucide-react"
import { useAuth } from "@/components/auth/AuthProvider"
import { getSupabaseClient } from "@/lib/supabase"
import ProjectAddModal from "@/components/admin/ProjectAddModal"

export default function ProjectsClientPage() {
  const [supabaseProjects, setSupabaseProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const { isAdmin } = useAuth()

  // 3 sabit proje - memoize edildi
  const staticProjects = useMemo(
    () => [
      {
        id: "static-1",
        title: "Metropol AVM Dış Cephe Yenileme",
        description:
          "İstanbul'un en büyük alışveriş merkezlerinden biri olan Metropol AVM'nin dış cephe boyama ve yenileme projesi. 15.000 m² alanın boyanması ve yenilenmesi 45 günde tamamlanmıştır.",
        image_url: "/placeholder.svg?height=500&width=800&text=Metropol AVM",
        completion_date: "2023-06-15",
        location: "İstanbul",
        slug: "metropol-avm-dis-cephe-yenileme",
      },
      {
        id: "static-2",
        title: "Yeşil Vadi Konutları",
        description:
          "Toplam 12 blok ve 480 daireden oluşan Yeşil Vadi Konutları'nın iç ve dış cephe boya işleri. Özel renk kartelası ile her blok için farklı renk kombinasyonları uygulanmıştır.",
        image_url: "/placeholder.svg?height=500&width=800&text=Yeşil Vadi Konutları",
        completion_date: "2023-03-20",
        location: "Ankara",
        slug: "yesil-vadi-konutlari",
      },
      {
        id: "static-3",
        title: "Mavi Deniz Oteli Renovasyonu",
        description:
          "Antalya'nın en lüks otellerinden biri olan Mavi Deniz Oteli'nin tüm odalarının ve ortak alanlarının boya ve dekorasyon işleri. Özel efekt boyalar ve duvar kağıtları kullanılarak modern bir görünüm elde edilmiştir.",
        image_url: "/placeholder.svg?height=500&width=800&text=Mavi Deniz Oteli",
        completion_date: "2022-11-10",
        location: "Antalya",
        slug: "mavi-deniz-oteli-renovasyonu",
      },
    ],
    [],
  )

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
        .select("id, title, description, image_url, completion_date, location, slug")
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
                  <div className="aspect-video w-full overflow-hidden relative">
                    <img
                      src={project.image_url || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy" // Lazy loading ekle
                    />

                    {/* Admin silme butonu - sadece Supabase projeler için */}
                    {isAdmin && !project.id.toString().startsWith("static") && (
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-colors"
                        title="Projeyi sil"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">{project.title}</h3>
                    <p className="text-gray-600 mb-6">{project.description}</p>
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
                    <div className="mt-6">
                      <Link
                        href={`/projeler/${project.slug}`}
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
