import Link from "next/link"

// Her marka için ayrı fotoğraf ve bilgiler
const brands = [
  {
    id: "jotun",
    name: "Jotun",
    image: "/images/jotun-logo.png?height=160&width=300&text=JOTUN",
    link: "/urunler/jotun",
  },
  {
    id: "tepe-betopan",
    name: "Tepe Betopan",
    image: "/images/tepe-betopan-logo.png?height=80&width=150&text=TEPE BETOPAN",
    link: "/urunler/filli-boya",
  },
  {
    id: "bianca",
    name: "Bianca",
    image: "/images/bianca-logo.png?height=80&width=150&text=BIANCA",
    link: "/urunler/marshall",
  },
  {
    id: "mapei",
    name: "Mapei",
    image: "/images/mapei-logo.png?height=80&width=150&text=MAPEI",
    link: "/urunler/dyo",
  },
  {
    id: "tepepan",
    name: "Tepepan",
    image: "/images/tepepan-logo.jpg?height=80&width=150&text=TEPEPAN",
    link: "/urunler/polisan",
  },
]

export default function BrandsSection() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-10">
      {brands.map((brand) => (
        <Link
          key={brand.id}
          href={brand.link}
          className="bg-white rounded-xl flex items-center justify-center hover:shadow-lg transition-shadow duration-300 brand-card"
        >
          <img src={brand.image || "/placeholder.svg"} alt={brand.name} className="max-h-20 object-contain rounded-xl" />
        </Link>
      ))}
    </div>
  )
}
