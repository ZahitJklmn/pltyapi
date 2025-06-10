"use client"
import { useState } from "react"
import { Plus } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import ProjectAddModal from "./ProjectAddModal" // Proje ekleme modalını import et

// brandId, categoryId, brandSlug, categorySlug props'ları kaldırıldı.
// Artık sadece proje ekleme için kullanılacak.
// Hangi sayfada görüneceğine bağlı olarak 'type' prop'u eklenebilir (örn: type="project")
export default function AdminAddButton({ pageType }) {
  const [showProjectModal, setShowProjectModal] = useState(false)
  const { isAdmin } = useAuth()

  if (!isAdmin) return null

  // Sadece proje sayfasında veya genel bir admin panelinde gösterilecekse
  if (pageType === "projects") {
    return (
      <>
        <button
          onClick={() => setShowProjectModal(true)}
          className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50"
          aria-label="Yeni proje ekle"
          title="Yeni Proje Ekle"
        >
          <Plus className="h-6 w-6" />
        </button>

        {showProjectModal && (
          <ProjectAddModal
            isOpen={showProjectModal}
            onClose={() => setShowProjectModal(false)}
            onSuccess={() => {
              setShowProjectModal(false)
              // Proje listesini yenilemek için bir callback veya router.refresh() kullanılabilir.
              // Örneğin: window.location.reload(); veya router.refresh();
              if (typeof window !== "undefined") window.location.reload()
            }}
          />
        )}
      </>
    )
  }

  // Diğer sayfa tipleri için (örn: ürünler) buton gösterilmeyecek
  // veya farklı bir buton gösterilebilir.
  return null
}
