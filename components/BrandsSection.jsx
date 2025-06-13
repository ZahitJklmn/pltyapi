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
    id: "mapei",
    name: "Mapei",
    image: "/images/mapei-logo.png?height=80&width=150&text=MAPEI",
    link: "/urunler/dyo",
  },
  {
    id: "tepe-betopan",
    name: "Tepe Betopan",
    image: "/images/tepe-betopan-logo.png?height=80&width=150&text=TEPE BETOPAN",
    link: "/urunler/filli-boya",
  },
  {
    id: "tepepan",
    name: "Tepepan",
    image: "/images/tepepan-logo.png?height=80&width=150&text=TEPEPAN",
    link: "/urunler/polisan",
  },
  {
    id: "bianca",
    name: "Bianca",
    image: "/images/bianca-logo.png?height=80&width=150&text=BIANCA",
    link: "/urunler/marshall",
  },
]

export default function BrandsSection() {
  return (
  <div className="w-full">
     {/* Mobil: 2 sütun, Tablet: 3 sütun, Masaüstü: 5 sütun */}
     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
      {brands.map((brand) => (
        <Link
          key={brand.id}
          href={brand.link}
          className="bg-neutral-300 rounded-xl flex items-center justify-center hover:shadow-lg transition-shadow duration-300 brand-card"
        >
          <img src={brand.image || "/placeholder.svg"} alt={brand.name} className="max-h-20 object-contain rounded-xl" />
        </Link>
      ))}
    </div>
  </div>
  )
}