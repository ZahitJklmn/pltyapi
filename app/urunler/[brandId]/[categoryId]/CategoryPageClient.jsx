"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import ProductCard from "@/components/ProductCard"
import { ArrowBigLeft, ArrowBigRight, ChevronRight, ExternalLink, X } from "lucide-react"

// External Link Badge Component
function ExternalLinkBadge() {
  return (
    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-600 text-white ml-2">
      <ExternalLink className="h-3 w-3 mr-1" />
      Dış bağlantı
    </span>
  )
}

export default function CategoryPageClient({ params }) {
  const { brandId, categoryId } = params || {}
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [brand, setBrand] = useState(null)
  const [category, setCategory] = useState(null)
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, url: "", title: "" })
  const productsPerPage = 9

  // Tüm markalar
  const brands = [
    {
      id: 1,
      name: "Jotun",
      slug: "jotun",
      description:
        "Jotun, yüksek kaliteli iç ve dış cephe boyaları sunan dünya çapında bir markadır. 1926'dan beri faaliyet gösteren Norveç kökenli marka, denizcilik, koruyucu kaplamalar ve dekoratif boyalar alanında lider konumdadır.",
      image_url: "/images/jotun-logo.png?height=150&width=250&text=JOTUN",
    },
    {
      id: 2,
      name: "Mapei",
      slug: "mapei",
      description:
        "Mapei, inşaat sektöründe yapıştırıcılar, harçlar ve kaplama malzemeleri üreten uluslararası bir markadır. 1937'de İtalya'da kurulan Mapei, yenilikçi ürünleri ve geniş ürün yelpazesi ile tanınır.",
      image_url: "/images/mapei-logo.png?height=150&width=250&text=MAPEI",
    },
    {
      id: 3,
      name: "Tepe Betopan",
      slug: "tepe-betopan",
      description:
        "Tepe Betopan, prefabrik yapı elemanları ve çatı sistemleri üreten Türkiye merkezli bir markadır. Yüksek kaliteli beton panelleri ile inşaat sektöründe önemli bir yere sahiptir.",
      image_url: "/images/tepe-betopan-logo.png?height=150&width=250&text=TEPE+BETOPAN",
    },
    {
      id: 4,
      name: "Tepepan",
      slug: "tepepan",
      description:
        "Tepepan, prefabrik yapı elemanları ve inşaat malzemeleri üreten bir markadır. Tepe Grubu'nun bir parçası olarak, yüksek kaliteli ürünleri ile sektördeki yerini sağlamlaştırmıştır.",
      image_url: "/images/tepepan-logo.png?height=150&width=250&text=TEPEPAN",
    },
    {
      id: 5,
      name: "Bianca Stella",
      slug: "bianca",
      description:
        "Bianca Stella, iç cephe boyaları ve dekoratif kaplama ürünleri üreten bir markadır. Kaliteli ve estetik çözümleri ile ev dekorasyonunda tercih edilen markalardan biridir.",
      image_url: "/images/bianca-logo.png?height=150&width=250&text=BIANCA+STELLA",
    },
  ]

  // Tüm kategoriler
  const categories = [
    // Jotun kategorileri
    {
      id: 1,
      brand_id: 1,
      name: "İç Cephe Ürünleri",
      slug: "ic-cephe-urunleri",
      description:
        "Evinizin iç mekanları için yüksek kaliteli boyalar ve kaplamalar. Silinebilir, kokusuz ve çevre dostu formüller.",
      image_url: "/placeholder.svg?height=200&width=300&text=İç+Cephe+Ürünleri",
    },
    {
      id: 2,
      brand_id: 1,
      name: "Dış Cephe Ürünleri",
      slug: "dis-cephe-urunleri",
      description:
        "Binanızın dış cephesi için dayanıklı ve uzun ömürlü boyalar. UV koruması ve hava koşullarına dayanıklılık.",
      image_url: "/placeholder.svg?height=200&width=300&text=Dış+Cephe+Ürünleri",
    },
    {
      id: 3,
      brand_id: 1,
      name: "Dış Cephe Renk Koleksiyonları",
      slug: "renk-koleksiyonlari",
      description:
        "Jotun'un dış cepheler için özel olarak geliştirdiği renk koleksiyonları. Estetik ve modern tasarımlar.",
      image_url: "/placeholder.svg?height=200&width=300&text=Metal+Ürünleri",
    },
    // Tepe Betopan kategorileri
    {
      id: 4,
      brand_id: 3,
      name: "Çimentolu Yonga Levhalar",
      slug: "cimentolu-yonga-levhalar",
      description:
        "Tepe Betopan'ın iç ve dış cepheler için sunduğu dayanıklı ve estetik çözümler. Yüksek ses ve ısı yalıtımı sağlar.",
      image_url: "/placeholder.svg?height=200&width=300&text=İç+Cephe+Boyaları",
      external_link: "",
    },
    // Tepepan kategorileri
    {
      id: 5,
      brand_id: 4,
      name: "Elyaf Takviyeli Çimentolu Levhalar",
      slug: "elyaf-takviyeli-levhalar",
      description:
        "Tepepan'ın hafif ve dayanıklı levhaları, inşaat projelerinizde mükemmel bir çözüm sunar. Yüksek yangın dayanıklılığı ve su itici özellikler.",
      image_url: "/placeholder.svg?height=200&width=300&text=Çatı+Panelleri",
    },
    // Bianca kategorileri
    {
      id: 6,
      brand_id: 5,
      name: "Boyalar",
      slug: "boyalar",
      description: "Bianca'nın iç ve dış cepheler için sunduğu ürün yelpazesi. Kaliteli ve estetik çözümler.",
      image_url: "/placeholder.svg?height=200&width=300&text=Çatı+Panelleri",
    },
    {
      id: 7,
      brand_id: 5,
      name: "Koruyucu Ürünler",
      slug: "koruyucu-urunler",
      description: "Yapı elemanlarınızı korumak için özel formüller. Su itici ve UV korumalı kaplamalar.",
      image_url: "/placeholder.svg?height=200&width=300&text=Cephe+Panelleri",
    },
    {
      id: 8,
      brand_id: 5,
      name: "Diğer Ürünler",
      slug: "diger-urunler",
      description: "Bianca'nın sunduğu diğer yapı malzemeleri. Estetik ve kaliteli çözümler.",
      image_url: "/placeholder.svg?height=200&width=300&text=Konteyner+Paneli",
    },
  ]

  // Tüm ürünler - 2'şer fotoğraf ile
  const allProducts = [
    // Jotun İç Cephe Ürünleri
    {
      id: 1,
      category_id: 1,
      name: "Fenomastic Zen",
      slug: "fenomastic-zen",
      description: "Daima Güzel ve Temiz Duvarlar",
      image_url: "/jotun/ic-cephe/feno-zen-on.png?height=300&width=300&text=Fenomastic",
      hover_image_url: "/jotun/ic-cephe/feno-zen-arka.png?height=300&width=300&text=Fenomastic+Detay",
    },
    {
      id: 2,
      category_id: 1,
      name: "Fenomastic Güzel Evim Saf İpek",
      slug: "fenomastic-guzel-evim-saf-ipek",
      description: "Yumuşak görünüm ile doğal doku",
      image_url: "/jotun/ic-cephe/gevim-saf-ipek-on.png?height=300&width=300&text=Fenomastic",
      hover_image_url: "/jotun/ic-cephe/gevim-saf-ipek-arka.png?height=300&width=300&text=Fenomastic+Detay",
    },
    {
      id: 3,
      category_id: 1,
      name: "Fenomastic Güzel Evim Mineral",
      slug: "fenomastic-guzel-evim-mineral",
      description: "Benzersiz renk oyunu",
      image_url: "/jotun/ic-cephe/gevim-mineral-on.png?height=300&width=300&text=Fenomastic",
      hover_image_url: "/jotun/ic-cephe/gevim-mineral-arka.png?height=300&width=300&text=Fenomastic+Detay",
    },
    {
      id: 4,
      category_id: 1,
      name: "Fenomastic Güzel Evim Mineral Şeffaf Koruyucu",
      slug: "fenomastic-guzel-evim-mineral-seffaf-koruyucu",
      description: "Mükemmel yüzeyler",
      image_url: "/jotun/ic-cephe/gevim-mineral-seffaf-on.png?height=300&width=300&text=Fenomastic",
      hover_image_url: "/jotun/ic-cephe/gevim-mineral-arka.png?height=300&width=300&text=Fenomastic+Detay",
    },
    {
      id: 5,
      category_id: 1,
      name: "Fenomastic Güzel Evim Zengin Mat",
      slug: "fenomastic-guzel-evim-zengin-mat",
      description: "Uzun ömürlü koruma.",
      image_url: "/jotun/ic-cephe/gevim-zengin-on.png?height=300&width=300&text=Fenomastic",
      hover_image_url: "/jotun/ic-cephe/gevim-zengin-arka.png?height=300&width=300&text=Fenomastic+Detay",
    },
    {
      id: 6,
      category_id: 1,
      name: "Fenomastic Primer",
      slug: "fenomastic-primer",
      description: "Usta Fırçaların Tercihi",
      image_url: "/jotun/ic-cephe/feno-primer-on.png?height=300&width=300&text=Fenomastic",
      hover_image_url: "/jotun/ic-cephe/feno-primer-arka.png?height=300&width=300&text=Fenomastic+Detay",
    },
    {
      id: 7,
      category_id: 1,
      name: "Fenomastic Mat",
      slug: "fenomastic-mat",
      description: "Usta Fırçaların Tercihi",
      image_url: "/jotun/ic-cephe/feno-mat-on.png?height=300&width=300&text=Fenomastic",
      hover_image_url: "/jotun/ic-cephe/feno-mat-arka.png?height=300&width=300&text=Fenomastic+Detay",
    },
    {
      id: 8,
      category_id: 1,
      name: "Fenomastic İpek Mat",
      slug: "fenomastic-ipek-mat",
      description: "Usta Fırçaların Tercihi",
      image_url: "/jotun/ic-cephe/feno-ipek-mat-on.png?height=300&width=300&text=Fenomastic",
      hover_image_url: "/jotun/ic-cephe/feno-ipek-mat-arka.png?height=300&width=300&text=Fenomastic+Detay",
    },
    {
      id: 9,
      category_id: 1,
      name: "Fenomastic Macun",
      slug: "fenomastic-macun",
      description: "Usta Fırçaların Tercihi",
      image_url: "/jotun/ic-cephe/feno-macun-on.webp?height=300&width=300&text=Fenomastic",
      hover_image_url: "/jotun/ic-cephe/feno-macun-arka.png?height=300&width=300&text=Fenomastic+Detay",
    },
    {
      id: 10,
      category_id: 1,
      name: "Fenomastic Macun (Hazırlık)",
      slug: "fenomastic-macun-hazirlik",
      description: "Benzersiz mat doku ile daha güzel renkler",
      image_url: "/jotun/ic-cephe/feno-macun-on.webp?height=300&width=300&text=Fenomastic",
      hover_image_url: "/jotun/ic-cephe/feno-macun-hazirlik-arka.png?height=300&width=300&text=Fenomastic+Detay",
    },
    // Jotun Dış Cephe Ürünleri
    {
      id: 11,
      category_id: 2,
      name: "Jotashield Real Matt",
      slug: "jotashield-real-matt",
      description: "Mükemmel dış cephe koruması​",
      image_url: "/jotun/dis-cephe/jota-real-matt-on.png?height=300&width=300&text=Jotashield",
      hover_image_url: "/jotun/dis-cephe/jota-real-matt-arka.png?height=300&width=300&text=Jotashield+Detay",
    },
    {
      id: 12,
      category_id: 2,
      name: "Jotashield Tex Medium",
      slug: "jotashield-tex-medium",
      description: "Mükemmel dış cephe koruması​",
      image_url: "/jotun/dis-cephe/jota-tex-medium-on.png?height=300&width=300&text=Jotashield",
      hover_image_url: "/jotun/dis-cephe/jota-tex-medium-arka.png?height=300&width=300&text=Jotashield+Detay",
    },
    {
      id: 13,
      category_id: 2,
      name: "Jotashield Yüzey Güçlendirici Astar (Su Bazlı)",
      slug: "jota-yuzeysel-guclendirici-astar",
      description: "Mükemmel dış cephe koruması​",
      image_url: "/jotun/dis-cephe/jota-yuzeysel-guclendirici-astar-on.png?height=300&width=300&text=Jotashield",
      hover_image_url:
        "/jotun/dis-cephe/jota-yuzeysel-guclendirici-astar-arka.png?height=300&width=300&text=Jotashield+Detay",
    },
    {
      id: 14,
      category_id: 2,
      name: "Jotashield Yüzey Güçlendirici Astar (Solvent Bazlı)",
      slug: "jota-yuzey-guclendirici",
      description: "Mükemmel dış cephe koruması​",
      image_url: "/jotun/dis-cephe/jota-yuzey-guclendirici-on.png?height=300&width=300&text=Jotashield",
      hover_image_url: "/jotun/dis-cephe/jota-yuzey-guclendirici-arka.png?height=300&width=300&text=Jotashield+Detay",
    },
    {
      id: 15,
      category_id: 2,
      name: "Jotun Aqua Pro Metal",
      slug: "jotun-aqua-pro-metal",
      description: "Mükemmel dış cephe koruması​",
      image_url: "/jotun/dis-cephe/jotun-aqua-pro-metal-on.png?height=300&width=300&text=Jotashield",
      hover_image_url: "/jotun/dis-cephe/jotun-aqua-pro-metal-arka.png?height=300&width=300&text=Jotashield+Detay",
    },
    {
      id: 16,
      category_id: 2,
      name: "Jotashield Clear",
      slug: "jota-clear",
      description: "Mükemmel dış cephe koruması​",
      image_url: "/jotun/dis-cephe/jota-clear-on.png?height=300&width=300&text=Jotashield",
      hover_image_url: "/jotun/dis-cephe/jota-clear-arka.png?height=300&width=300&text=Jotashield+Detay",
    },
    {
      id: 17,
      category_id: 2,
      name: "Jotashield Heritage Glaze",
      slug: "jota-heritage-glaze",
      description: "Mükemmel dış cephe koruması​",
      image_url: "/jotun/dis-cephe/jota-heritage-glaze-on.png?height=300&width=300&text=Jotashield",
      hover_image_url: "/jotun/dis-cephe/jota-heritage-glaze-arka.png?height=300&width=300&text=Jotashield+Detay",
    },
    {
      id: 18,
      category_id: 2,
      name: "Jotashield SuperDurable",
      slug: "jota-superdurable",
      description: "Mükemmel dış cephe koruması​",
      image_url: "/jotun/dis-cephe/jota-superdrable-on.png?height=300&width=300&text=Jotashield",
      hover_image_url: "/jotun/dis-cephe/jota-superdrable-arka.png?height=300&width=300&text=Jotashield+Detay",
    },
    {
      id: 19,
      category_id: 2,
      name: "Jotashield Extreme",
      slug: "jota-extreme",
      description: "Mükemmel dış cephe koruması",
      image_url: "/jotun/dis-cephe/jota-extreme-on.png?height=300&width=300&text=Jotashield",
      hover_image_url: "/jotun/dis-cephe/jota-extreme-arka.png?height=300&width=300&text=Jotashield+Detay",
    },
    {
      id: 20,
      category_id: 2,
      name: "Jotashield Silk",
      slug: "jota-silk",
      description: "Mükemmel dış cephe koruması​",
      image_url: "/jotun/dis-cephe/jota-silk-on.png?height=300&width=300&text=Jotashield",
      hover_image_url: "/jotun/dis-cephe/jota-silk-arka.png?height=300&width=300&text=Jotashield+Detay",
    },
    {
      id: 21,
      category_id: 2,
      name: "Jotashield Tex Ultra",
      slug: "jota-tex-ultra",
      description: "Mükemmel dış cephe koruması​",
      image_url: "/jotun/dis-cephe/jota-tex-ultra-on.png?height=300&width=300&text=Jotashield",
      hover_image_url: "/jotun/dis-cephe/jota-tex-ultra-arka.png?height=300&width=300&text=Jotashield+Detay",
    },
    {
      id: 22,
      category_id: 2,
      name: "TREBITT Transparent",
      slug: "tre-transparent",
      description: "Mükemmel dış cephe koruması​",
      image_url: "/jotun/dis-cephe/tre-transparent-on.png?height=300&width=300&text=Jotashield",
      hover_image_url: "/jotun/dis-cephe/tre-transparent-arka.png?height=300&width=300&text=Jotashield+Detay",
    },
    {
      id: 23,
      category_id: 2,
      name: "Jotashield Alkali Dayanımlı Astar",
      slug: "jota-alkali-dayanimli-astar",
      description: "Mükemmel dış cephe koruması​",
      image_url: "/jotun/dis-cephe/jota-alkali-dayanimli-astar-on.png?height=300&width=300&text=Jotashield",
      hover_image_url:
        "/jotun/dis-cephe/jota-alkali-dayanimli-astar-arka.png?height=300&width=300&text=Jotashield+Detay",
    },
    {
      id: 24,
      category_id: 2,
      name: "Jotashield Matt",
      slug: "jota-matt",
      description: "Mükemmel dış cephe koruması​",
      image_url: "/jotun/dis-cephe/jota-matt-on.png?height=300&width=300&text=Jotashield",
      hover_image_url: "/jotun/dis-cephe/jota-matt-arka.png?height=300&width=300&text=Jotashield+Detay",
    },
    {
      id: 25,
      category_id: 2,
      name: "VISIR Oljegrunning Klar",
      slug: "visir-oljegrunning-klar",
      description: "Mükemmel dış cephe koruması​",
      image_url: "/jotun/dis-cephe/visir-oljegrunning-klar-on.png?height=300&width=300&text=Jotashield",
      hover_image_url: "/jotun/dis-cephe/visir-oljegrunning-klar-arka.png?height=300&width=300&text=Jotashield+Detay",
    },
    {
      id: 26,
      category_id: 2,
      name: "Demidekk Ultimate Tackfarg",
      slug: "demidekk-ultimate-tactfarg",
      description: "Mükemmel dış cephe koruması​",
      image_url: "/jotun/dis-cephe/demidekk-ultimate-tactfarg-on.png?height=300&width=300&text=Jotashield",
      hover_image_url:
        "/jotun/dis-cephe/demidekk-ultimate-tactfarg-arka.png?height=300&width=300&text=Jotashield+Detay",
    },
    {
      id: 27,
      category_id: 2,
      name: "Demidekk Infinity Details",
      slug: "demidekk-infinity-details",
      description: "Mükemmel dış cephe koruması​",
      image_url: "/jotun/dis-cephe/demidekk-infinity-details-on.png?height=300&width=300&text=Jotashield",
      hover_image_url: "/jotun/dis-cephe/demidekk-infinity-details-arka.png?height=300&width=300&text=Jotashield+Detay",
    },

    // Tepe Betopan Çimentolu Yonga Levhalar
    {
      id: 28,
      category_id: 4,
      name: "Betopan",
      slug: "betopan",
      description:
        "Betopan®, yapılarda temelden çatıya kullanılabilen, düz ve doğal gri yüzeyli, fonksiyonel bir çimentolu yonga levhadır.",
      image_url: "/betopan/betopan.png?height=300&width=300&text=",
      hover_image_url: "/betopan/betopan.png?height=300&width=300&text=+Detay",
    },
    {
      id: 29,
      category_id: 4,
      name: "Betopan Plus",
      slug: "betopan-plus",
      description:
        "Betopanplus® her iki yüzeyi doğal minerallerle güçlendirilmiş düz yüzeyli çimentolu yonga levhadır. Çimento ve ahşap karışımından oluşan orta katmana sahiptir.",
      image_url: "/betopan/betopan.png?height=300&width=300&text=",
      hover_image_url: "/betopan/betopan.png?height=300&width=300&text=+Detay",
    },
    {
      id: 30,
      category_id: 4,
      name: "Yalıpan",
      slug: "yalipan",
      description:
        "Yalıpan® her iki yüzeyi doğal minerallerle güçlendirilmiş ahşap desenli çimentolu yonga levhadır. Çimento ve ahşap karışımından oluşan orta katmana sahiptir.",
      image_url: "/betopan/yalipan.png?height=300&width=300&text=",
      hover_image_url: "/betopan/yalipan.png?height=300&width=300&text=+Detay",
    },
    {
      id: 31,
      category_id: 4,
      name: "Taşonit",
      slug: "tasonit",
      description:
        "Taşonit® her iki yüzeyi doğal minerallerle güçlendirilmiş taş desenli çimentolu yonga levhadır. Çimento ve ahşap karışımından oluşan orta katmana sahiptir.",
      image_url: "/betopan/tasonit.png?height=300&width=300&text=",
      hover_image_url: "/betopan/tasonit.png?height=300&width=300&text=+Detay",
    },

    // Tepepan Elyaf Takviyeli Çimentolu Levhalar
    {
      id: 32,
      category_id: 5,
      name: "Tepepan",
      slug: "tepepan",
      description: "tepePAN, çimento ve elyaf karışımından oluşan düz yüzeyli, çok amaçlı bir yapı levhasıdır.",
      image_url: "/tepepan/tepepan.png?height=300&width=300&text=",
      hover_image_url: "/tepepan/tepepan.png?height=300&width=300&text=+Detay",
    },
    {
      id: 33,
      category_id: 5,
      name: "Tepepan Pro",
      slug: "tepepan-pro",
      description:
        "Presli ve üstün dayanım özellikleriyle dış cephe ve iç mekan uygulamaları için  kullanıcılara kalınlık skalası sunan düz yüzeyli, çok amaçlı elyaf takviyeli çimento esaslı yapı levhasıdır.",
      image_url: "/tepepan/tepepan.png?height=300&width=300&text=",
      hover_image_url: "/tepepan/tepepan.png?height=300&width=300&text=+Detay",
    },
    {
      id: 34,
      category_id: 5,
      name: "Tepepan Wood",
      slug: "tepepan-wood",
      description: "tepePAN Wood®, çimento ve elyaf karışımından oluşan ahşap desenli, çok amaçlı bir yapı levhasıdır.",
      image_url: "/tepepan/tepepan-wood.png?height=300&width=300&text=",
      hover_image_url: "/tepepan/tepepan-wood.png?height=300&width=300&text=+Detay",
    },
    {
      id: 35,
      category_id: 5,
      name: "Tepepan Stone",
      slug: "tepepan-stone",
      description: "tepePAN Stone®, çimento ve elyaf karışımından oluşan taş desenli, çok amaçlı bir yapı levhasıdır.",
      image_url: "/tepepan/tepepan-stone.png?height=300&width=300&text=",
      hover_image_url: "/tepepan/tepepan-stone.png?height=300&width=300&text=+Detay",
    },

    // Bianca Ürünleri
    {
      id: 36,
      category_id: 6,
      name: "Bianca Stella Su Bazlı Saf Akrilik Boya",
      slug: "bianca-stella-su-bazli-saf-akrilik-boya",
      description:
        "Tüm yüzeylere mükemmel yapışma özelliğine sahip, su bazlı, saf akrilik esaslı yeni nesil dönüşüm boyasıdır.",
      image_url: "/bianca/saf-akrilik.png?height=300&width=300&text=saf+akrilik+boya",
      hover_image_url: "/bianca/saf-akrilik.png?height=300&width=300&text=saf+akrilik+boya+Detay",
    },
    {
      id: 37,
      category_id: 6,
      name: "Bianca Stella Su Bazlı Saf Akrilik Boya (Ahşap Renkler)",
      slug: "bianca-stella-su-bazli-saf-akrilik-boya-ahsap-renkler",
      description:
        "Bianca Stella boya uygulaması sonrası yüzeylere ahşap desen görünüm vermek için geliştirilmiş özel bir boyadır",
      image_url: "/bianca/saf-akrilik-ahsap.png?height=300&width=300&text=saf+akrilik+ahsap+boya",
      hover_image_url: "/bianca/saf-akrilik-ahsap.png?height=300&width=300&text=saf+akrilik+ahsap+boya+Detay",
    },
    {
      id: 38,
      category_id: 6,
      name: "Bianca Stella Su Bazlı Saf Akrilik Boya (Metal Renkler)",
      slug: "bianca-stella-su-bazli-saf-akrilik-boya-metal-renkler",
      description:
        "Bianca Stella boya uygulaması sonrası yüzeylere metal görünümü vermek için geliştirilmiş özel bir boyadır.",
      image_url: "/bianca/saf-akrilik-metal.png?height=300&width=300&text=",
      hover_image_url: "/bianca/saf-akrilik-metal.png?height=300&width=300&text=+Detay",
    },
    {
      id: 39,
      category_id: 7,
      name: "Bianca Stella Su Bazlı Sıvı Cam",
      slug: "bianca-stella-su-bazli-sivi-cam",
      description:
        "Tüm yüzeylere mükemmel yapışma özelliğine sahip, su bazlı, kokusuz, kullanıma hazır yeni nesil bir koruyucudur.",
      image_url: "/bianca/su-sivicam.png?height=300&width=300&text=",
      hover_image_url: "/bianca/su-sivicam.png?height=300&width=300&text=+Detay",
    },
    {
      id: 40,
      category_id: 7,
      name: "Bianca Maximo Solvent Bazlı Sıvı Cam",
      slug: "bianca-maximo-solvent-bazli-sivi-cam",
      description:
        "Yüksek su direncinin yanı sıra, kimyasal ve fiziksel dirence sahip, 4 kat daha güçlü, dekoratif ve su yalıtım amaçlı kullanılan çift bileşenli yeni nesil bir koruyucudur.",
      image_url: "/bianca/solvent-sivicam.png?height=300&width=300&text=",
      hover_image_url: "/bianca/solvent-sivicam.png?height=300&width=300&text=+Detay",
    },
    {
      id: 41,
      category_id: 8,
      name: "Bianca Silfex Silikon Sökücü",
      slug: "bianca-silfex-silikon-sokucu",
      description:
        "üzey üzerinden, sertleşmiş silikon, reçine, yapıştırıcı, tutkal, poliüretan, köpük gibi malzemelerin yumuşatarak kolayca sökülmesinde kullanılan bir üründür.",
      image_url: "/bianca/silfex.png?height=300&width=300&text=",
      hover_image_url: "/bianca/silfex.png?height=300&width=300&text=+Detay",
    },
    {
      id: 42,
      category_id: 8,
      name: "Bianca Stella Mermer Efekt Spreyi",
      slug: "bianca-stella-mermer-efekt-spreyi",
      description:
        "Kağıt, karton, astarlı kanvas, ahşap, cam, metal, seramik, porselen, taş, akrilik ve diğer boyanabilir malzemeler gibi farklı yüzeylerde kullanılabilir. ",
      image_url: "/bianca/mermer-sprey.png?height=300&width=300&text=",
      hover_image_url: "/bianca/mermer-sprey.png?height=300&width=300&text=+Detay",
    },
    {
      id: 43,
      category_id: 8,
      name: "Bianca Stella İpek Fırça",
      slug: "bianca-stella-ipek-firca",
      description: "No: 1 – 25 mm | No: 1,5 – 40 mm",
      image_url: "/bianca/ipek-firca.png?height=300&width=300&text=",
      hover_image_url: "/bianca/ipek-firca.png?height=300&width=300&text=+Detay",
    },
  ]

  const handleExternalRedirect = (url) => {
    window.open(url, "_blank", "noopener,noreferrer")
    setConfirmModal({ isOpen: false, url: "", title: "" })
  }

  const closeModal = () => {
    setConfirmModal({ isOpen: false, url: "", title: "" })
  }

  const handleProductDelete = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId)
    setProducts(updatedProducts)
  }

  useEffect(() => {
    if (!brandId || !categoryId) {
      setError(`Geçersiz URL parametreleri: brandId=${brandId}, categoryId=${categoryId}`)
      setLoading(false)
      return
    }

    try {
      // Marka bilgisini bul
      const brandData = brands.find((b) => b.slug === brandId)
      if (!brandData) {
        setError(`Marka bulunamadı: ${brandId}`)
        setLoading(false)
        return
      }

      // Kategori bilgisini bul
      const categoryData = categories.find((c) => c.brand_id === brandData.id && c.slug === categoryId)
      if (!categoryData) {
        setError(`Kategori bulunamadı: ${categoryId}`)
        setLoading(false)
        return
      }

      // Kategoriye ait ürünleri filtrele
      const categoryProducts = allProducts.filter((p) => p.category_id === categoryData.id)

      setBrand(brandData)
      setCategory(categoryData)
      setProducts(categoryProducts)
    } catch (err) {
      setError("Veri yüklenirken bir hata oluştu")
    } finally {
      setLoading(false)
    }
  }, [brandId, categoryId])

  if (loading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600 mb-4"></div>
            <p className="text-gray-600">Yükleniyor...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !brand || !category) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Kategori Bulunamadı</h1>
          <p className="mb-8">{error || "Aradığınız ürün kategorisi sistemimizde bulunamadı."}</p>
          <Link
            href="/urunler"
            className="bg-red-600 text-white px-6 py-3 rounded-md font-medium hover:bg-red-700 transition-colors duration-300"
          >
            Tüm Markalar
          </Link>
        </div>
      </div>
    )
  }

  const productCount = products.length

  return (
    <>
      <div className="pt-24 pb-16 bg-gradient-to-br from-neutral-600 via-neutral-200 to-neutral-600">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="relative md:h-[400px] rounded-lg overflow-hidden mb-12">
            <div
              className="absolute inset-0 bg-contain bg-no-repeat bg-center"
              style={{
                backgroundImage: `url('${brand.image_url || "/placeholder.svg?height=400&width=1200&text=Ürünlerimiz"}')`,
              }}
            ></div>
            <div className="absolute inset-0 bg-black/0"></div>
            <div className="absolute inset-0 flex items-center justify-center">{/* içerik buraya */}</div>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center mb-8 text-sm">
            <Link href="/" className="text-black hover:text-red-600 transition-all duration-200">
              Anasayfa
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-neutral-900" />
            <Link href="/urunler" className="text-black hover:text-red-600 transition-all duration-200">
              Ürünler
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-neutral-900" />
            <Link href={`/urunler/${brandId}`} className="text-black hover:text-red-600 transition-all duration-200">
              {brand.name}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-neutral-900" />
            <span className="text-red-600 font-medium">{category.name}</span>
          </div>

          {/* Brand Info */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-full md:w-1/4 flex justify-center md:hidden">
                <img
                  src={
                    brand.image_url || "/placeholder.svg?height=200&width=200&text=" + encodeURIComponent(brand.name)
                  }
                  alt={brand.name}
                  className="max-w-full h-auto rounded-sm"
                  draggable="false"
                />
              </div>
              <div className="w-full md:w-3/4">
                <h2 className="text-3xl font-bold mb-2 text-gray-800">{brand.name}</h2>
                <h3 className="text-xl font-semibold mb-4 text-gray-700">{category.name}</h3>
                <p className="text-gray-600 mb-6">{category.description}</p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-gray-600">
                    Bu kategoride toplam <span className="font-semibold">{productCount}</span> ürün bulunmaktadır.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {products && products.length > 0 ? (
            (() => {
              const totalPages = Math.ceil(products.length / productsPerPage)
              const startIndex = (currentPage - 1) * productsPerPage
              const endIndex = startIndex + productsPerPage
              const currentProducts = products.slice(startIndex, endIndex)

              return (
                <div>
                  {/* Ürün sayısı bilgisi */}
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">Ürünler</h3>
                    <p className="text-gray-600">
                      {startIndex + 1}-{Math.min(endIndex, products.length)} / {products.length} ürün
                    </p>
                  </div>

                  {/* Ürün kartları - ProductCard component'ini kullanarak */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                    {currentProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        brandId={brandId}
                        categoryId={categoryId}
                        isAdmin={false}
                        onDelete={handleProductDelete}
                        externalLink={category.external_link}
                        setConfirmModal={setConfirmModal}
                      />
                    ))}
                  </div>

                  {/* Sayfalandırma */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 bg-white rounded-lg shadow-md p-6">
                      {/* Previous Button */}
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-2 py-2 rounded-full font-medium transition-colors ${
                          currentPage === 1
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        <ArrowBigLeft />
                      </button>

                      {/* Sayfa numaraları */}
                      <div className="flex gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-full font-medium transition-colors ${
                              currentPage === page
                                ? "bg-red-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      {/* Next Button */}
                      <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-2 py-2 rounded-full font-medium transition-colors ${
                          currentPage === totalPages
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        <ArrowBigRight />
                      </button>
                    </div>
                  )}
                </div>
              )
            })()
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Bu kategoride henüz ürün bulunmamaktadır</h3>
              <p className="text-gray-600">Yakında yeni ürünler eklenecektir.</p>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-white/20 rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <ExternalLink className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Dış Bağlantı Uyarısı</h3>
                </div>
                <button onClick={closeModal} className="text-gray-400 hover:text-white transition-colors duration-200">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <p className="text-gray-300 mb-4">
                <span className="font-medium text-white">{confirmModal.title}</span> sayfasına yönlendirileceksiniz.
              </p>
              <p className="text-sm text-gray-400 mb-6">Bu sayfaya gitmek istediğinize emin misiniz?</p>

              {/* URL Preview */}
              <div className="bg-white/5 rounded-lg p-3 mb-6 border border-white/10">
                <p className="text-xs text-gray-400 mb-1">Hedef URL:</p>
                <p className="text-sm text-blue-400 break-all">{confirmModal.url}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 bg-red-500/60 hover:bg-red-500 text-white rounded-xl font-medium transition-all duration-200 border border-white/20"
                >
                  İptal
                </button>
                <button
                  onClick={() => handleExternalRedirect(confirmModal.url)}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                >
                  Devam Et
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
