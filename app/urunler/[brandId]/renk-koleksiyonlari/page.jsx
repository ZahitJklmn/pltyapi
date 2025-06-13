import ColorCollectionClient from "./ColorCollectionClient"

export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const { brandId } = resolvedParams

  return {
    title: `${brandId?.charAt(0).toUpperCase() + brandId?.slice(1)} Renk Koleksiyonları | Boya ve Yapı Malzemeleri`,
    description: `${brandId?.charAt(0).toUpperCase() + brandId?.slice(1)} markasının özel renk koleksiyonlarını keşfedin.`,
  }
}

export default async function ColorCollectionPage({ params }) {
  const resolvedParams = await params

  return <ColorCollectionClient params={resolvedParams} />
}
