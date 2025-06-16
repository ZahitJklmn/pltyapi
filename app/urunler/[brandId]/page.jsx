import BrandPageClient from "./BrandPageClient"

// generateMetadata fonksiyonunu düzeltmek için params'ı await etmemiz gerekiyor
export async function generateMetadata({ params }) {
  // params'ı await etmek için Promise.resolve kullanabiliriz
  const resolvedParams = await params
  const { brandId } = resolvedParams

  return {
    title: `${brandId?.charAt(0).toUpperCase() + brandId?.slice(1) || "Marka"} | Plt Yapı Tokat`,
    description: `${brandId?.charAt(0).toUpperCase() + brandId?.slice(1) || "Marka"} markasının kaliteli ve güvenilir ürünlerini keşfedin.`,
  }
}

// Page component'i async yapıyoruz
export default async function BrandPage({ params }) {
  // params'ı await ediyoruz
  const resolvedParams = await params

  // Parametreleri konsola yazdıralım
  console.log("BrandPage params:", JSON.stringify(resolvedParams))

  return <BrandPageClient params={resolvedParams} />
}
