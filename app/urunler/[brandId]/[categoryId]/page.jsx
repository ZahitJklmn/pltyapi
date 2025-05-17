import CategoryPageClient from "./CategoryPageClient"

// generateMetadata fonksiyonunu düzeltmek için params'ı await etmemiz gerekiyor
export async function generateMetadata({ params }) {
  // params'ı await etmek için Promise.resolve kullanabiliriz
  const resolvedParams = await params
  const { brandId, categoryId } = resolvedParams

  return {
    title: `${brandId?.charAt(0).toUpperCase() + brandId?.slice(1) || "Kategori"} ${categoryId?.replace(/-/g, " ") || ""} | Boya ve Yapı Malzemeleri`,
    description: `${brandId?.charAt(0).toUpperCase() + brandId?.slice(1) || "Kategori"} markasının ${categoryId?.replace(/-/g, " ") || ""} kategorisindeki ürünlerini keşfedin.`,
  }
}

// Page component'i async yapıyoruz
export default async function CategoryPage({ params }) {
  // params'ı await ediyoruz
  const resolvedParams = await params

  // Parametreleri konsola yazdıralım
  console.log("CategoryPage params:", JSON.stringify(resolvedParams))

  return <CategoryPageClient params={resolvedParams} />
}
