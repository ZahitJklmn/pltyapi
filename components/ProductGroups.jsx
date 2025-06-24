import Link from "next/link"

const productGroups = [
  {
    id: 1,
    title: "İç Cephe Ürünleri",
    image: "/images/ic-cephe-kart.jpg?height=300&width=400&text=İç Cephe",
    link: "/urunler/ic-cephe-urunleri",
  },
  {
    id: 2,
    title: "Dış Cephe Ürünleri",
    image: "/images/dis-cephe-kart.png?height=300&width=400&text=Dış Cephe",
    link: "/urunler/dis-cephe-urunleri",
  },
  {
    id: 3,
    title: "Çimentolu Levhalar",
    image: "/stock/cimentolu-levhalar.jpg?height=300&width=400&text=Çimentolu Levhalar",
    link: "/urunler/cimentolu-levhalar",
  },
  {
    id: 4,
    title: "Boya Ekipmanları",
    image: "/stock/boya-ekipmanlari.webp?height=300&width=400&text=Ekipman",
    link: "/urunler/boya-ekipmanlari",
  },
  {
    id: 5,
    title: "Özel Efekt Boyaları",
    image: "/stock/ozel-efekt-boyasi.jpg?height=300&width=400&text=Özel Efekt",
    link: "/urunler/ozel-efekt-boyalari",
  },
  {
    id: 6,
    title: "Diğer Ürünler",
    image: "/stock/our-products2.jpg?height=300&width=400&text=Diğer Ürünler",
    link: "/urunler/diger-urunler",
  },
]

export default function ProductGroups() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {productGroups.map((group) => (
        <Link
          href={group.link}
          key={group.id}
          className="group overflow-hidden rounded-lg shadow-lg bg-white transition-all duration-300 hover:shadow-xl"
        >
          <div className="relative h-64 overflow-hidden">
            <img
              src={group.image || "/placeholder.svg"}
              alt={group.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{group.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
}
