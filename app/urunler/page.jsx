import ProductsClientPage from "./ProductsClientPage"

export const metadata = {
  title: "Ürünler | Plt Yapı Tokat",
  description:
    "Plt Yapı Tokat'ta Jotun boya ürünleri, Tepe Betopan, iç cephe boyaları ve tüm yapı malzemeleri. Tokat'ın en geniş boya ürünleri yelpazesi.",
  keywords: "Tokat Boya Ürünleri, Tokat Boya Malzemeleri, Jotun Tokat, Tokat Tepe Betopan, Plt Yapı Tokat",
  alternates: {
    canonical: "https://pltyapitokat.com/urunler",
  },
}

export default function ProductsPage() {
  return <ProductsClientPage />
}
