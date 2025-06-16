import Link from "next/link"
import { ExternalLink } from "lucide-react"

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
    link: "/urunler/mapei",
    external_link: "https://www.mapei.com/tr/tr/ana-sayfa",
  },
  {
    id: "tepe-betopan",
    name: "Tepe Betopan",
    image: "/images/tepe-betopan-logo.png?height=80&width=150&text=TEPE BETOPAN",
    link: "/urunler/tepe-betopan",
  },
  {
    id: "tepepan",
    name: "Tepepan",
    image: "/images/tepepan-logo.png?height=80&width=150&text=TEPEPAN",
    link: "/urunler/tepepan",
  },
  {
    id: "bianca",
    name: "Bianca Stella",
    image: "/images/bianca-logo.png?height=80&width=150&text=BIANCA",
    link: "/urunler/bianca",
  },
]

const handleExternalLinkClick = (e, url) => {
  e.preventDefault()
  const confirmed = window.confirm(`${url} adresine gitmek istediğinizden emin misiniz?`)
  if (confirmed) {
    window.open(url, "_blank", "noopener,noreferrer")
  }
}

export default function BrandsSection() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
        {brands.map((brand) => {
          const isExternal = !!brand.external_link?.trim()

          // Eğer dış link varsa "a", yoksa Next.js Link kullanılır
          const Wrapper = isExternal ? "a" : Link
          const props = isExternal
            ? {
                href: brand.external_link,
                onClick: (e) => handleExternalLinkClick(e, brand.external_link),
                target: "_blank",
                rel: "noopener noreferrer",
              }
            : {
                href: brand.link || `/urunler/${brand.slug}`,
              }

          return (
            <Wrapper
              key={brand.id}
              {...props}
              className="bg-neutral-300 py-2 relative rounded-xl flex items-center justify-center hover:shadow-lg transition-shadow duration-300 brand-card"
            >
              {/* External Link Badge */}
              {isExternal && (
                <div className="absolute top-1 right-1 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center shadow-lg">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Dış Bağlantı
                </div>
              )}

              <img
                src={brand.image || "/placeholder.svg"}
                alt={brand.name}
                className="max-h-21 object-contain rounded-xl"
              />
            </Wrapper>
          )
        })}
      </div>
    </div>
  )
}