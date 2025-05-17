import ProductDetailClient from "./ProductDetailClient"

export async function generateMetadata({ params }) {
  // params'ı await etmek için Promise.resolve kullanabiliriz
  const resolvedParams = await params
  const { brandId, categoryId, productId } = resolvedParams

  return {
    title: `${productId?.replace(/-/g, " ")} | Boya Malzemeleri`,
    description: "Boya ve boya malzemeleri ürün detayları.",
  }
}

export default async function ProductDetailPage({ params }) {
  // params'ı await ediyoruz
  const resolvedParams = await params

  // Parametreleri konsola yazdıralım
  console.log("ProductDetailPage params:", JSON.stringify(resolvedParams))

  return <ProductDetailClient params={resolvedParams} />
}
