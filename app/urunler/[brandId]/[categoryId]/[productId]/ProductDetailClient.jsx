"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function ProductDetailClient({ params }) {
  const { brandId, categoryId, productId } = params
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [brand, setBrand] = useState(null)
  const [category, setCategory] = useState(null)
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  // Tüm markalar
  const brands = [
    {
      id: 1,
      name: "Jotun",
      slug: "jotun",
      description:
        "Jotun, yüksek kaliteli iç ve dış cephe boyaları sunan dünya çapında bir markadır. 1926'dan beri faaliyet gösteren Norveç kökenli marka, denizcilik, koruyucu kaplamalar ve dekoratif boyalar alanında lider konumdadır.",
      image_url: "/marka-urun-karti/jotun.png?height=150&width=250&text=JOTUN",
    },
    {
      id: 2,
      name: "Mapei",
      slug: "mapei",
      description:
        "Mapei, inşaat sektöründe yapıştırıcılar, harçlar ve kaplama malzemeleri üreten uluslararası bir markadır. 1937'de İtalya'da kurulan Mapei, yenilikçi ürünleri ve geniş ürün yelpazesi ile tanınır.",
      image_url: "/marka-urun-karti/mapei.png?height=150&width=250&text=MAPEI",
    },
    {
      id: 3,
      name: "Tepe Betopan",
      slug: "tepe-betopan",
      description:
        "Tepe Betopan, prefabrik yapı elemanları ve çatı sistemleri üreten Türkiye merkezli bir markadır. Yüksek kaliteli beton panelleri ile inşaat sektöründe önemli bir yere sahiptir.",
      image_url: "/marka-urun-karti/tepe-betopan.png?height=150&width=250&text=TEPE+BETOPAN",
    },
    {
      id: 4,
      name: "Tepepan",
      slug: "tepepan",
      description:
        "Tepepan, prefabrik yapı elemanları ve inşaat malzemeleri üreten bir markadır. Tepe Grubu'nun bir parçası olarak, yüksek kaliteli ürünleri ile sektördeki yerini sağlamlaştırmıştır.",
      image_url: "/marka-urun-karti/tepepan.png?height=150&width=250&text=TEPEPAN",
    },
    {
      id: 5,
      name: "Bianca Stella",
      slug: "bianca",
      description:
        "Bianca Stella, iç cephe boyaları ve dekoratif kaplama ürünleri üreten bir markadır. Kaliteli ve estetik çözümleri ile ev dekorasyonunda tercih edilen markalardan biridir.",
      image_url: "/marka-urun-karti/bianca.png?height=150&width=250&text=BIANCA+STELLA",
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
      name: "Dış Cephe Renk Kolleksiyonları",
      slug: "renk-koleksiyonlari",
      description: "Dış cepheler için özel renk koleksiyonları. Estetik ve modern tasarımlar.",
      image_url: "/placeholder.svg?height=200&width=300&text=Dış+Cephe+Renk+Kolleksiyonları",
    },

    // Mapei ama dış bağlantı var ondan kategori yok

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
  const products = [
    // Jotun İç Cephe Ürünleri
    {
      id: 1,
      category_id: 1,
      name: "Fenomastic Zen",
      slug: "fenomastic-zen",
      description:
        "Yüksek kapatıcılığa sahip, silinebilir iç cephe boyası. Kokusuz formülü ile sağlıklı yaşam alanları.",
      image_url: "/jotun/ic-cephe/feno-zen-on.png?height=300&width=300&text=Fenomastic",
      gallery: [
        "/jotun/ic-cephe/feno-zen-on.png?height=600&width=600&text=Fenomastic+Ana+Görsel",
        "/jotun/ic-cephe/feno-zen-arka.png?height=600&width=600&text=Fenomastic+Detay",
      ],
    },
    {
      id: 2,
      category_id: 1,
      name: "Fenomastic Güzel Evim Saf İpek",
      slug: "fenomastic-guzel-evim-saf-ipek",
      description:
        "Yüksek kapatıcılığa sahip, silinebilir iç cephe boyası. Kokusuz formülü ile sağlıklı yaşam alanları.",
      image_url: "/jotun/ic-cephe/gevim-saf-ipek-on.png?height=300&width=300&text=Fenomastic",
      gallery: [
        "/jotun/ic-cephe/gevim-saf-ipek-on.png?height=600&width=600&text=Fenomastic+Ana+Görsel",
        "/jotun/ic-cephe/?height=600&width=600&text=Fenomastic+Detay",
      ],
    },
    {
      id: 3,
      category_id: 1,
      name: "Fenomastic Güzel Evim Mineral",
      slug: "fenomastic-guzel-evim-mineral",
      description:
        "Yüksek kapatıcılığa sahip, silinebilir iç cephe boyası. Kokusuz formülü ile sağlıklı yaşam alanları.",
      image_url: "/jotun/ic-cephe/gevim-mineral-on.png?height=300&width=300&text=Fenomastic",
      gallery: [
        "/jotun/ic-cephe/?height=600&width=600&text=Fenomastic+Ana+Görsel",
        "/jotun/ic-cephe/?height=600&width=600&text=Fenomastic+Detay",
      ],
    },
    {
      id: 4,
      category_id: 1,
      name: "Fenomastic Güzel Evim Zengin Mat",
      slug: "fenomastic-guzel-evim-zengin-mat",
      description:
        "Yüksek kapatıcılığa sahip, silinebilir iç cephe boyası. Kokusuz formülü ile sağlıklı yaşam alanları.",
      image_url: "/jotun/ic-cephe/gevim-zengin-on.png?height=300&width=300&text=Fenomastic",
      gallery: [
        "/jotun/ic-cephe/?height=600&width=600&text=Fenomastic+Ana+Görsel",
        "/jotun/ic-cephe/?height=600&width=600&text=Fenomastic+Detay",
      ],
    },
    {
      id: 5,
      category_id: 1,
      name: "Fenomastic Güzel Evim Mineral Şeffaf Koruyucu",
      slug: "fenomastic-guzel-evim-mineral-seffaf-koruyucu",
      description:
        "Yüksek kapatıcılığa sahip, silinebilir iç cephe boyası. Kokusuz formülü ile sağlıklı yaşam alanları.",
      image_url: "/jotun/ic-cephe/gevim-mineral-seffaf-on.png?height=300&width=300&text=Fenomastic",
      gallery: [
        "/jotun/ic-cephe/?height=600&width=600&text=Fenomastic+Ana+Görsel",
        "/jotun/ic-cephe/?height=600&width=600&text=Fenomastic+Detay",
      ],
    },
    {
      id: 6,
      category_id: 1,
      name: "Fenomastic Primer",
      slug: "fenomastic-primer",
      description:
        "Yüksek kapatıcılığa sahip, silinebilir iç cephe boyası. Kokusuz formülü ile sağlıklı yaşam alanları.",
      image_url: "/jotun/ic-cephe/feno-primer-on.png?height=300&width=300&text=Fenomastic",
      gallery: [
        "/jotun/ic-cephe/?height=600&width=600&text=Fenomastic+Ana+Görsel",
        "/jotun/ic-cephe/?height=600&width=600&text=Fenomastic+Detay",
      ],
    },
    {
      id: 7,
      category_id: 1,
      name: "Fenomastic Mat",
      slug: "fenomastic-mat",
      description:
        "Yüksek kapatıcılığa sahip, silinebilir iç cephe boyası. Kokusuz formülü ile sağlıklı yaşam alanları.",
      image_url: "/jotun/ic-cephe/feno-mat-on.png?height=300&width=300&text=Fenomastic",
      gallery: [
        "/jotun/ic-cephe/?height=600&width=600&text=Fenomastic+Ana+Görsel",
        "/jotun/ic-cephe/?height=600&width=600&text=Fenomastic+Detay",
      ],
    },
    {
      id: 8,
      category_id: 1,
      name: "Fenomastic İpek Mat",
      slug: "fenomastic-ipek-mat",
      description:
        "Yüksek kapatıcılığa sahip, silinebilir iç cephe boyası. Kokusuz formülü ile sağlıklı yaşam alanları.",
      image_url: "/jotun/ic-cephe/feno-ipek-on.png?height=300&width=300&text=Fenomastic",
      gallery: [
        "/jotun/ic-cephe/feno-ipek-mat-on.png?height=600&width=600&text=Fenomastic+Ana+Görsel",
        "/jotun/ic-cephe/feno-ipek-mat-arka.png?height=600&width=600&text=Fenomastic+Detay",
      ],
    },
    {
      id: 9,
      category_id: 1,
      name: "Fenomastic Macun",
      slug: "fenomastic-macun",
      description:
        "Yüksek kapatıcılığa sahip, silinebilir iç cephe boyası. Kokusuz formülü ile sağlıklı yaşam alanları.",
      image_url: "/jotun/ic-cephe/?height=300&width=300&text=Fenomastic",
      gallery: [
        "/jotun/ic-cephe/?height=600&width=600&text=Fenomastic+Ana+Görsel",
        "/jotun/ic-cephe/?height=600&width=600&text=Fenomastic+Detay",
      ],
    },
    {
      id: 10,
      category_id: 1,
      name: "Fenomastic Macun (Hazırlık)",
      slug: "fenomastic-macun-hazirlik",
      description:
        "Yüksek kapatıcılığa sahip, silinebilir iç cephe boyası. Kokusuz formülü ile sağlıklı yaşam alanları.",
      image_url: "/?height=300&width=300&text=Fenomastic",
      gallery: [
        "/jotun/ic-cephe/?height=600&width=600&text=Fenomastic+Ana+Görsel",
        "/jotun/ic-cephe/?height=600&width=600&text=Fenomastic+Detay",
      ],
    },
    // Jotun Dış Cephe Ürünleri
    {
      id: 11,
      category_id: 2,
      name: "Jotashield Real Matt",
      slug: "jotashield-real-matt",
      description: "Mükemmel dış cephe koruması​",
      image_url: "/jotun/dis-cephe/jota-real-matt-on.png?height=300&width=300&text=Jotashield",
      gallery: [
        "/jotun/dis-cephe/jota-real-matt-on.png?height=600&width=600&text=Jotashield+Ana+Görsel",
        "/jotun/dis-cephe/jota-real-matt-arka.png/?height=600&width=600&text=Jotashield+Detay",
      ],
    },
    {
      id: 12,
      category_id: 2,
      name: "Jotashield Tex Medium",
      slug: "jotashield-tex-medium",
      description: "Mükemmel dış cephe koruması​",
      image_url: "/jotun/dis-cephe/jota-tex-medium-on.png?height=300&width=300&text=Jotashield",
      gallery: [
        "/jotun/dis-cephe/jota-tex-medium-on.png?height=600&width=600&text=Jotashield+Ana+Görsel",
        "/jotun/dis-cephe/jota-tex-medium-arka.png?height=600&width=600&text=Jotashield+Detay",
      ],
    },
    {
      id: 13,
      category_id: 2,
      name: "Jotashield Yüzey Güçlendirici Astar (Su Bazlı)",
      slug: "jota-yuzeysel-guclendirici-astar",
      description: "Mükemmel dış cephe koruması​",
      image_url: "/jotun/dis-cephe/jota-yuzeysel-guclendirici-astar-on.png?height=300&width=300&text=Jotashield",
      gallery: [
        "/jotun/dis-cephe/jota-yuzeysel-guclendirici-astar-on.png?height=600&width=600&text=Jotashield+Ana+Görsel",
        "/jotun/dis-cephe/jota-yuzeysel-guclendirici-astar-arka.png?height=600&width=600&text=Jotashield+Detay",
      ],
    },
    {
      id: 14,
      category_id: 2,
      name: "Jotashield Yüzey Güçlendirici Astar (Solvent Bazlı)",
      slug: "jota-yuzey-guclendirici",
      description: "Mükemmel dış cephe koruması​",
      image_url: "/jotun/dis-cephe/jota-yuzey-guclendirici-on.png?height=300&width=300&text=Jotashield",
      gallery: [
        "/jotun/dis-cephe/jota-yuzey-guclendirici-on.png?height=600&width=600&text=Jotashield+Ana+Görsel",
        "/jotun/dis-cephe/jota-yuzey-guclendirici-arka.png?height=600&width=600&text=Jotashield+Detay",
      ],
    },
    {
      id: 15,
      category_id: 2,
      name: "Jotun Aqua Pro Metal",
      slug: "jotun-aqua-pro-metal",
      description: "Mükemmel dış cephe koruması​",
      image_url: "/jotun/dis-cephe/jotun-aqua-pro-metal-on.png?height=300&width=300&text=Jotashield",
      gallery: [
        "/jotun/dis-cephe/jotun-aqua-pro-metal-on.png?height=600&width=600&text=Jotashield+Ana+Görsel",
        "/jotun/dis-cephe/jotun-aqua-pro-metal-arka.png?height=600&width=600&text=Jotashield+Detay",
      ],
    },
    {
      id: 16,
      category_id: 2,
      name: "Jotashield Clear",
      slug: "jota-clear",
      description: "Mükemmel dış cephe koruması​",
      image_url: "/jotun/dis-cephe/jota-clear-on.png?height=300&width=300&text=Jotashield",
      gallery: [
        "/jotun/dis-cephe/jota-clear-on.png?height=600&width=600&text=Jotashield+Ana+Görsel",
        "/jotun/dis-cephe/jota-clear-arka.png?height=600&width=600&text=Jotashield+Detay",
      ],
    },
    {
      id: 17,
      category_id: 2,
      name: "Jotashield Heritage Glaze",
      slug: "jota-heritage-glaze",
      description: "Mükemmel dış cephe koruması​",
      image_url: "/jotun/dis-cephe/jota-heritage-glaze-on.png?height=300&width=300&text=Jotashield",
      gallery: [
        "/jotun/dis-cephe/jota-heritage-glaze-on.png?height=600&width=600&text=Jotashield+Ana+Görsel",
        "/jotun/dis-cephe/jota-heritage-glaze-arka.png?height=600&width=600&text=Jotashield+Detay",
      ],
    },
    {
      id: 18,
      category_id: 2,
      name: "Jotashield SuperDurable",
      slug: "jota-superdurable",
      description: "Mükemmel dış cephe koruması​",
      image_url: "/jotun/dis-cephe/jota-superdrable-on.png?height=300&width=300&text=Jotashield",
      gallery: [
        "/jotun/dis-cephe/jota-superdrable-on.png?height=600&width=600&text=Jotashield+Ana+Görsel",
        "/jotun/dis-cephe/jota-superdrable-arka.png?height=600&width=600&text=Jotashield+Detay",
      ],
    },
    {
      id: 19,
      category_id: 2,
      name: "Jotashield Extreme",
      slug: "jota-extreme",
      description: "Mükemmel dış cephe koruması​",
      image_url: "/jotun/dis-cephe/jota-extreme-on.png?height=300&width=300&text=Jotashield",
      gallery: [
        "/jotun/dis-cephe/jota-extreme-on.png?height=600&width=600&text=Jotashield+Ana+Görsel",
        "/jotun/dis-cephe/jota-extreme-arka.png?height=600&width=600&text=Jotashield+Detay",
      ],
    },
    {
      id: 20,
      category_id: 2,
      name: "Jotashield Silk",
      slug: "jota-silk",
      description: "Mükemmel dış cephe koruması​",
      image_url: "/jotun/dis-cephe/jota-silk-on.png?height=300&width=300&text=Jotashield",
      gallery: [
        "/jotun/dis-cephe/jota-silk-on.png?height=600&width=600&text=Jotashield+Ana+Görsel",
        "/jotun/dis-cephe/jota-silk-arka.png?height=600&width=600&text=Jotashield+Detay",
      ],
    },
    {
      id: 21,
      category_id: 2,
      name: "Jotashield Tex Ultra",
      slug: "jota-tex-ultra",
      description: "Mükemmel dış cephe koruması​",
      image_url: "/jotun/dis-cephe/jota-tex-ultra-on.png?height=300&width=300&text=Jotashield",
      gallery: [
        "/jotun/dis-cephe/jota-tex-ultra-on.png?height=600&width=600&text=Jotashield+Ana+Görsel",
        "/jotun/dis-cephe/jota-tex-ultra-arka.png?height=600&width=600&text=Jotashield+Detay",
      ],
    },
    {
      id: 22,
      category_id: 2,
      name: "TREBITT Transparent",
      slug: "tre-transparent",
      description: "Mükemmel dış cephe koruması​",
      image_url: "/jotun/dis-cephe/tre-transparent-on.png?height=300&width=300&text=Jotashield",
      gallery: [
        "/jotun/dis-cephe/tre-transparent-on.png?height=600&width=600&text=Jotashield+Ana+Görsel",
        "/jotun/dis-cephe/tre-transparent-arka.png?height=600&width=600&text=Jotashield+Detay",
      ],
    },
    {
      id: 23,
      category_id: 2,
      name: "Jotashield Alkali Dayanımlı Astar",
      slug: "jota-alkali-dayanimli-astar",
      description: "Mükemmel dış cephe koruması​",
      image_url: "/jotun/dis-cephe/jota-alkali-dayanimli-astar-on.png?height=300&width=300&text=Jotashield",
      gallery: [
        "/jotun/dis-cephe/jota-alkali-dayanimli-astar-on.png?height=600&width=600&text=Jotashield+Ana+Görsel",
        "/jotun/dis-cephe/jota-alkali-dayanimli-astar-arka.png?height=600&width=600&text=Jotashield+Detay",
      ],
    },
    {
      id: 24,
      category_id: 2,
      name: "Jotashield Matt",
      slug: "jota-matt",
      description: "Mükemmel dış cephe koruması​",
      image_url: "/jotun/dis-cephe/jota-matt-on.png?height=300&width=300&text=Jotashield",
      gallery: [
        "/jotun/dis-cephe/jota-matt-on.png?height=600&width=600&text=Jotashield+Ana+Görsel",
        "/jotun/dis-cephe/jota-matt-arka.png?height=600&width=600&text=Jotashield+Detay",
      ],
    },
    {
      id: 25,
      category_id: 2,
      name: "VISIR Oljegrunning Klar",
      slug: "visir-oljegrunning-klar",
      description: "Mükemmel dış cephe koruması​",
      image_url: "/jotun/dis-cephe/visir-oljegrunning-klar-on.png?height=300&width=300&text=Jotashield",
      gallery: [
        "/jotun/dis-cephe/visir-oljegrunning-klar-on.png?height=600&width=600&text=Jotashield+Ana+Görsel",
        "/jotun/dis-cephe/visir-oljegrunning-klar-arka.png?height=600&width=600&text=Jotashield+Detay",
      ],
    },
    {
      id: 26,
      category_id: 2,
      name: "Demidekk Ultimate Tackfarg",
      slug: "demidekk-ultimate-tactfarg",
      description: "Mükemmel dış cephe koruması​",
      image_url: "/jotun/dis-cephe/demidekk-ultimate-tactfarg-on.png?height=300&width=300&text=Jotashield",
      gallery: [
        "/jotun/dis-cephe/demidekk-ultimate-tactfarg-on.png?height=600&width=600&text=Jotashield+Ana+Görsel",
        "/jotun/dis-cephe/demidekk-ultimate-tactfarg-arka.png?height=600&width=600&text=Jotashield+Detay",
      ],
    },
     {
      id: 27,
      category_id: 2,
      name: "Demidekk Infinity Details",
      slug: "demidekk-infinity-details",
      description: "Mükemmel dış cephe koruması​",
      image_url: "/jotun/dis-cephe/demidekk-infinity-details-on.png?height=300&width=300&text=Jotashield",
      gallery: [
        "/jotun/dis-cephe/demidekk-infinity-details-on.png?height=600&width=600&text=Jotashield+Ana+Görsel",
        "/jotun/dis-cephe/demidekk-infinity-details-arka.png?height=600&width=600&text=Jotashield+Detay",
      ],
    },

    // mapei external link var

    // Tepe Betopan çimentolu yonga levha ürünleri
    {
      id: 28,
      category_id: 4,
      name: "Betopan",
      slug: "betopan",
      description:
        "Betopan®, yapılarda temelden çatıya kullanılabilen, düz ve doğal gri yüzeyli, fonksiyonel bir çimentolu yonga levhadır.",
      image_url: "/betopan/betopan.png?height=300&width=300&text=",
      gallery: [
        "/betopan/betopan.png?height=600&width=600&text=+Ana+Görsel",
        "/betopan/betopan.png?height=600&width=600&text=+Detay",
      ],
    },
    {
      id: 29,
      category_id: 4,
      name: "Betopan Plus",
      slug: "betopan-plus",
      description:
        "Betopanplus® her iki yüzeyi doğal minerallerle güçlendirilmiş düz yüzeyli çimentolu yonga levhadır. Çimento ve ahşap karışımından oluşan orta katmana sahiptir.",
      image_url: "/betopan/betopan.png?height=300&width=300&text=",
      gallery: [
        "/betopan/betopan.png?height=600&width=600&text=+Ana+Görsel",
        "/betopan/betopan.png?height=600&width=600&text=+Detay",
      ],
    },
    {
      id: 30,
      category_id: 4,
      name: "Yalıpan",
      slug: "yalipan",
      description:
        "Yalıpan® her iki yüzeyi doğal minerallerle güçlendirilmiş ahşap desenli çimentolu yonga levhadır. Çimento ve ahşap karışımından oluşan orta katmana sahiptir.",
      image_url: "/betopan/yalipan.png?height=300&width=300&text=",
      gallery: [
        "/betopan/yalipan.png?height=600&width=600&text=+Ana+Görsel",
        "/betopan/yalipan.png?height=600&width=600&text=+Detay",
      ],
    },
    {
      id: 31,
      category_id: 4,
      name: "Taşonit",
      slug: "tasonit",
      description:
        "Taşonit® her iki yüzeyi doğal minerallerle güçlendirilmiş taş desenli çimentolu yonga levhadır. Çimento ve ahşap karışımından oluşan orta katmana sahiptir.",
      image_url: "/betopan/tasonit.png?height=300&width=300&text=",
      gallery: [
        "/betopan/tasonit.png?height=600&width=600&text=+Ana+Görsel",
        "/betopan/tasonit.png?height=600&width=600&text=+Detay",
      ],
    },
    // Tepepan elyaf takviyeli levha ürünleri
    {
      id: 32,
      category_id: 5,
      name: "Tepepan",
      slug: "tepepan",
      description: "tepePAN, çimento ve elyaf karışımından oluşan düz yüzeyli, çok amaçlı bir yapı levhasıdır.",
      image_url: "/tepepan/tepepan.png?height=300&width=300&text=",
      gallery: [
        "/tepepan/tepepan.png?height=600&width=600&text=+Ana+Görsel",
        "/tepepan/tepepan.png?height=600&width=600&text=+Detay",
      ],
    },
    {
      id: 33,
      category_id: 5,
      name: "Tepepan Pro",
      slug: "tepepan-pro",
      description:
        "Presli ve üstün dayanım özellikleriyle dış cephe ve iç mekan uygulamaları için  kullanıcılara kalınlık skalası sunan düz yüzeyli, çok amaçlı elyaf takviyeli çimento esaslı yapı levhasıdır.",
      image_url: "/tepepan/tepepan.png?height=300&width=300&text=",
      gallery: [
        "/tepepan/tepepan.png?height=600&width=600&text=+Ana+Görsel",
        "/tepepan/tepepan.png?height=600&width=600&text=+Detay",
      ],
    },
    {
      id: 34,
      category_id: 5,
      name: "Tepepan Wood",
      slug: "tepepan-wood",
      description: "tepePAN Wood®, çimento ve elyaf karışımından oluşan ahşap desenli, çok amaçlı bir yapı levhasıdır.",
      image_url: "/tepepan/tepepan-wood.png?height=300&width=300&text=",
      gallery: [
        "/tepepan/tepepan-wood.png?height=600&width=600&text=+Ana+Görsel",
        "/tepepan/tepepan-wood.png?height=600&width=600&text=+Detay",
      ],
    },
    {
      id: 35,
      category_id: 5,
      name: "Tepepan Stone",
      slug: "tepepan-stone",
      description: "tepePAN Stone®, çimento ve elyaf karışımından oluşan taş desenli, çok amaçlı bir yapı levhasıdır.",
      image_url: "/tepepan/tepepan-stone.png?height=300&width=300&text=",
      gallery: [
        "/tepepan/tepepan-stone.png?height=600&width=600&text=+Ana+Görsel",
        "/tepepan/tepepan-stone.png?height=600&width=600&text=+Detay",
      ],
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
      gallery: [
        "/bianca/saf-akrilik.png?height=600&width=600&text=Prestij+Ana+Görsel",
        "/bianca/saf-akrilik.png?height=600&width=600&text=Prestij+Detay",
      ],
    },
    {
      id: 37,
      category_id: 6,
      name: "Bianca Stella Su Bazlı Saf Akrilik Boya (Ahşap Renkler)",
      slug: "bianca-stella-su-bazli-saf-akrilik-boya-ahsap-renkler",
      description:
        "Bianca Stella boya uygulaması sonrası yüzeylere ahşap desen görünüm vermek için geliştirilmiş özel bir boyadır",
      image_url: "/bianca/saf-akrilik-ahsap.png?height=300&width=300&text=saf+akrilik+ahsap+boya",
      gallery: [
        "/bianca/saf-akrilik-ahsap.png?height=600&width=600&text=Prestij+Ana+Görsel",
        "/bianca/saf-akrilik-ahsap.png?height=600&width=600&text=Prestij+Detay",
      ],
    },
    {
      id: 38,
      category_id: 6,
      name: "Bianca Stella Su Bazlı Saf Akrilik Boya (Metal Renkler)",
      slug: "bianca-stella-su-bazli-saf-akrilik-boya-metal-renkler",
      description:
        "Bianca Stella boya uygulaması sonrası yüzeylere metal görünümü vermek için geliştirilmiş özel bir boyadır.",
      image_url: "/bianca/saf-akrilik-metal.png?height=300&width=300&text=",
      gallery: [
        "/bianca/saf-akrilik-metal.png?height=600&width=600&text=Prestij+Ana+Görsel",
        "/bianca/saf-akrilik-metal.png?height=600&width=600&text=Prestij+Detay",
      ],
    },
    {
      id: 39,
      category_id: 7,
      name: "Bianca Stella Su Bazlı Sıvı Cam",
      slug: "bianca-stella-su-bazli-sivi-cam",
      description:
        "Tüm yüzeylere mükemmel yapışma özelliğine sahip, su bazlı, kokusuz, kullanıma hazır yeni nesil bir koruyucudur.",
      image_url: "/bianca/su-sivicam.png?height=300&width=300&text=",
      gallery: [
        "/bianca/su-sivicam.png?height=600&width=600&text=Prestij+Ana+Görsel",
        "/bianca/su-sivicam.png?height=600&width=600&text=Prestij+Detay",
      ],
    },
    {
      id: 40,
      category_id: 7,
      name: "Bianca Maximo Solvent Bazlı Sıvı Cam",
      slug: "bianca-maximo-solvent-bazli-sivi-cam",
      description:
        "Yüksek su direncinin yanı sıra, kimyasal ve fiziksel dirence sahip, 4 kat daha güçlü, dekoratif ve su yalıtım amaçlı kullanılan çift bileşenli yeni nesil bir koruyucudur.",
      image_url: "/bianca/solvent-sivicam.png?height=300&width=300&text=",
      gallery: [
        "/bianca/solvent-sivicam.png?height=600&width=600&text=Prestij+Ana+Görsel",
        "/bianca/solvent-sivicam.png?height=600&width=600&text=Prestij+Detay",
      ],
    },
    {
      id: 41,
      category_id: 8,
      name: "Bianca Silfex Silikon Sökücü",
      slug: "bianca-silfex-silikon-sokucu",
      description:
        "üzey üzerinden, sertleşmiş silikon, reçine, yapıştırıcı, tutkal, poliüretan, köpük gibi malzemelerin yumuşatarak kolayca sökülmesinde kullanılan bir üründür.",
      image_url: "/bianca/silfex.png?height=300&width=300&text=",
      gallery: [
        "/bianca/silfex.png?height=600&width=600&text=Prestij+Ana+Görsel",
        "/bianca/silfex.png?height=600&width=600&text=Prestij+Detay",
      ],
    },
    {
      id: 42,   
      category_id: 8,
      name: "Bianca Stella Mermer Efekt Spreyi",
      slug: "bianca-stella-mermer-efekt-spreyi",
      description:
        "Kağıt, karton, astarlı kanvas, ahşap, cam, metal, seramik, porselen, taş, akrilik ve diğer boyanabilir malzemeler gibi farklı yüzeylerde kullanılabilir. ",
      image_url: "/bianca/mermer-sprey.png?height=300&width=300&text=",
      gallery: [
        "/bianca/mermer-sprey.png?height=600&width=600&text=Prestij+Ana+Görsel",
        "/bianca/mermer-sprey.png?height=600&width=600&text=Prestij+Detay",
      ],
    },
    {
      id: 43,
      category_id: 8,
      name: "Bianca Stella İpek Fırça",
      slug: "bianca-stella-ipek-firca",
      description: "No: 1 – 25 mm | No: 1,5 – 40 mm",
      image_url: "/bianca/ipek-firca.png?height=300&width=300&text=",
      gallery: [
        "/bianca/ipek-firca.png?height=600&width=600&text=Prestij+Ana+Görsel",
        "/bianca/ipek-firca.png?height=600&width=600&text=Prestij+Detay",
      ],
    },
  ]

  useEffect(() => {
    if (!brandId || !categoryId || !productId) {
      setError("Geçersiz URL parametreleri")
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

      // Ürün bilgisini bul
      const productData = products.find((p) => p.category_id === categoryData.id && p.slug === productId)
      if (!productData) {
        setError(`Ürün bulunamadı: ${productId}`)
        setLoading(false)
        return
      }

      // İlgili ürünleri bul (aynı kategorideki diğer ürünler)
      const related = products.filter((p) => p.category_id === categoryData.id && p.id !== productData.id).slice(0, 3)

      setBrand(brandData)
      setCategory(categoryData)
      setProduct(productData)
      setRelatedProducts(related)
    } catch (err) {
      setError("Veri yüklenirken bir hata oluştu")
    } finally {
      setLoading(false)
    }
  }, [brandId, categoryId, productId])

  // Seçilen fotoğrafı değiştirme fonksiyonu
  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index)
  }

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

  if (error || !brand || !category || !product) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Ürün Bulunamadı</h1>
          <p className="mb-8">{error || "Aradığınız ürün sistemimizde bulunamadı."}</p>
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

  return (
    <div className="pt-24 pb-16 bg-gradient-to-br from-neutral-600 via-neutral-200 to-neutral-600">
      <div className="container mx-auto px-4">
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
          <Link href={`/urunler/${brandId}/${categoryId}`} className="text-black hover:text-red-600 transition-all duration-200">
            {category.name}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-neutral-900" />
          <span className="text-red-700 font-medium">{product.name}</span>
        </div>

        {/* Product Detail */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image Gallery */}
            <div className="flex flex-col">
              {/* Main Image */}
              <div className="flex justify-center mb-4">
                <img
                  src={product.gallery?.[selectedImageIndex] || product.image_url}
                  alt={`${product.name} - Görsel ${selectedImageIndex + 1}`}
                  className="max-w-full h-full rounded-lg shadow-md object-cover"
                  draggable="false"
                />
              </div>

              {/* Thumbnails - Sadece 2 tane */}
              {product.gallery && product.gallery.length > 0 && (
                <div className="flex justify-center gap-4 mt-2">
                  {product.gallery.slice(0, 2).map((image, index) => (
                    <div
                      key={index}
                      onClick={() => handleThumbnailClick(index)}
                      className={`w-20 h-20 cursor-pointer rounded-md overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index
                          ? "border-red-600 scale-105"
                          : "border-gray-200 hover:border-red-300"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} - Küçük Görsel ${index + 1}`}
                        className="w-full h-full object-cover"
                        draggable="false"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <div className="mb-4">
                <span className="inline-block bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
                  {brand.name}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">{product.description}</p>

{/* Product Features */}
<div className="border-t border-gray-200 pt-6">
  <h3 className="text-xl font-semibold mb-6 text-gray-800">Ürün Özellikleri</h3>

  {(() => {
    const productFeatures = {
      1: [
        "Yüksek kapatıcılık",
        "Silinebilir yüzey",
        "Kokusuz formül",
        "Anti-bakteriyel",
        "Hızlı kuruma",
        "UV dayanımı",
        "Çevre dostu",
        "Kolay uygulama",
        "Uzun ömürlü",
        "Renk haslığı",
        "Ekstra dayanıklılık",
        "Nefes alabilir yapı",
        "Kolay temizlenebilir",
        "Solmaz renkler",
        "Düşük VOC",
        "Yüksek örtücülük",
        "Parlak yüzey seçeneği",
        "Aşınmaya dayanıklı",
        "İç/dış mekan uyumu",
        "Antistatik özellik",
      ],
      2: [
        "İpeksi mat görünüm",
        "Leke tutmaz",
        "Anti-bakteriyel",
        "Silinebilir",
        "Yüksek kapatıcılık",
        "Kokusuz",
        "Hızlı kuruma",
        "Çevre dostu",
        "UV koruması",
        "Renk stabilitesi",
        "Kolay uygulanabilir",
        "Yüksek yoğunluk",
      ],
      default: [
        "Yüksek kalite",
        "Uzun ömürlü",
        "Kolay uygulama",
        "Çevre dostu",
        "UV koruması",
        "Hızlı kuruma",
        "Renk haslığı",
        "Ekonomik",
        "Dayanıklı",
        "Güvenli formül",
      ],
    }

    const features = productFeatures[product.id] || productFeatures.default

    const col1 = features.slice(0, 5)
    const col2 = features.slice(5, 10)
    const col3 = features.slice(10, 15)
    const col4 = features.slice(15, 20)

    const renderList = (list) => (
      <ul className="space-y-3">
        {list.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-600">
            <span className="w-2 h-2 bg-red-600 rounded-full mr-3 flex-shrink-0"></span>
            {feature}
          </li>
        ))}
      </ul>
    )

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Üst satır */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>{renderList(col1)}</div>
          <div>{renderList(col2)}</div>
        </div>

        {/* Alt satır */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>{renderList(col3)}</div>
          <div>{renderList(col4)}</div>
        </div>
      </div>
    )
  })()}
</div>


              {/* Contact Button */}
              <div className="mt-8">
                <Link
                  href="/iletisim"
                  className="bg-red-600 text-white px-8 py-3 rounded-md font-medium hover:bg-red-700 transition-colors duration-300 inline-block text-center"
                >
                  Fiyat Bilgisi Al
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="bg-neutral-200 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">İlgili Ürünler</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => {
                // External link kontrolü
                const ProductLink = relatedProduct.external_link ? "a" : Link
                const linkProps = relatedProduct.external_link
                  ? {
                      href: relatedProduct.external_link,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : {
                      href: `/urunler/${brandId}/${categoryId}/${relatedProduct.slug}`,
                    }

                return (
                  <ProductLink key={relatedProduct.id} {...linkProps} className="group">
                  <div className="bg-gray-50 rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
                  <div className="h-48 w-full flex items-center justify-center overflow-hidden bg-white">
                    <img
                      src={relatedProduct.image_url || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      className="h-full max-h-40 object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 group-hover:text-red-600 transition-colors duration-300">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-2">{relatedProduct.description}</p>
                      {relatedProduct.external_link && (
                          <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                            Dış Bağlantı
                          </span>
                        )}
                      </div>
                    </div>
              </ProductLink>
            )
          })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
