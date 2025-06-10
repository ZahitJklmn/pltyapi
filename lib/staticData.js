// Sabit ürün verileri - Veritabanı kullanmıyoruz

// Marka verileri
export const brands = [
  {
    id: 1,
    name: "Jotun",
    slug: "jotun",
    description: "Jotun, yüksek kaliteli iç ve dış cephe boyaları sunan dünya çapında bir markadır.",
    image_url: "/placeholder.svg?height=150&width=250&text=JOTUN",
  },
  {
    id: 2,
    name: "Filli Boya",
    slug: "filli-boya",
    description: "Filli Boya, Türkiye'nin önde gelen boya markalarından biridir.",
    image_url: "/placeholder.svg?height=150&width=250&text=FILLI+BOYA",
  },
  {
    id: 3,
    name: "Marshall",
    slug: "marshall",
    description: "Marshall, geniş renk seçenekleri ve kaliteli ürünleriyle tanınan bir boya markasıdır.",
    image_url: "/placeholder.svg?height=150&width=250&text=MARSHALL",
  },
  {
    id: 4,
    name: "Hekim Panel",
    slug: "hekim-panel",
    description: "Hekim Panel, çatı ve cephe panelleri konusunda uzmanlaşmış bir markadır.",
    image_url: "/placeholder.svg?height=150&width=250&text=HEKIM+PANEL",
  },
]

// Kategori verileri
export const categories = [
  // Jotun kategorileri
  {
    id: 1,
    brand_id: 1,
    name: "İç Cephe Ürünleri",
    slug: "ic-cephe-urunleri",
    description: "Evinizin iç mekanları için yüksek kaliteli boyalar ve kaplamalar.",
    image_url: "/placeholder.svg?height=200&width=300&text=İç+Cephe",
  },
  {
    id: 2,
    brand_id: 1,
    name: "Dış Cephe Ürünleri",
    slug: "dis-cephe-urunleri",
    description: "Binanızın dış cephesi için dayanıklı ve uzun ömürlü boyalar.",
    image_url: "/placeholder.svg?height=200&width=300&text=Dış+Cephe",
  },
  {
    id: 3,
    brand_id: 1,
    name: "Ahşap Ürünleri",
    slug: "ahsap-urunleri",
    description: "Ahşap yüzeyler için koruyucu ve dekoratif boyalar.",
    image_url: "/placeholder.svg?height=200&width=300&text=Ahşap",
  },
  {
    id: 4,
    brand_id: 1,
    name: "Metal Ürünleri",
    slug: "metal-urunleri",
    description: "Metal yüzeyler için pas önleyici ve koruyucu boyalar.",
    image_url: "/placeholder.svg?height=200&width=300&text=Metal",
  },
  // Filli Boya kategorileri
  {
    id: 5,
    brand_id: 2,
    name: "İç Cephe Boyaları",
    slug: "ic-cephe-boyalari",
    description: "İç mekanlar için su bazlı, silinebilir ve anti-bakteriyel boyalar.",
    image_url: "/placeholder.svg?height=200&width=300&text=İç+Cephe",
  },
  {
    id: 6,
    brand_id: 2,
    name: "Dış Cephe Boyaları",
    slug: "dis-cephe-boyalari",
    description: "Dış cepheler için su ve nem dayanımlı, uzun ömürlü boyalar.",
    image_url: "/placeholder.svg?height=200&width=300&text=Dış+Cephe",
  },
  {
    id: 7,
    brand_id: 2,
    name: "Metal Boyaları",
    slug: "metal-boyalari",
    description: "Metal yüzeyler için özel formülasyonlu boyalar.",
    image_url: "/placeholder.svg?height=200&width=300&text=Metal",
  },
  // Marshall kategorileri
  {
    id: 8,
    brand_id: 3,
    name: "İç Cephe Boyaları",
    slug: "ic-cephe-boyalari",
    description: "İç mekanlar için yüksek kapatıcılığa sahip boyalar.",
    image_url: "/placeholder.svg?height=200&width=300&text=İç+Cephe",
  },
  {
    id: 9,
    brand_id: 3,
    name: "Dış Cephe Boyaları",
    slug: "dis-cephe-boyalari",
    description: "Dış cepheler için hava koşullarına dayanıklı boyalar.",
    image_url: "/placeholder.svg?height=200&width=300&text=Dış+Cephe",
  },
  {
    id: 10,
    brand_id: 3,
    name: "Ahşap Boyaları",
    slug: "ahsap-boyalari",
    description: "Ahşap yüzeyler için vernik ve koruyucu boyalar.",
    image_url: "/placeholder.svg?height=200&width=300&text=Ahşap",
  },
  // Hekim Panel kategorileri
  {
    id: 11,
    brand_id: 4,
    name: "Çatı Panelleri",
    slug: "cati-panelleri",
    description: "Dayanıklı ve yalıtımlı çatı panel sistemleri.",
    image_url: "/placeholder.svg?height=200&width=300&text=Çatı+Panelleri",
  },
  {
    id: 12,
    brand_id: 4,
    name: "Cephe Panelleri",
    slug: "cephe-panelleri",
    description: "Modern ve estetik cephe kaplama panelleri.",
    image_url: "/placeholder.svg?height=200&width=300&text=Cephe+Panelleri",
  },
  {
    id: 13,
    brand_id: 4,
    name: "Konteyner Paneli",
    slug: "konteyner-paneli",
    description: "Konteyner yapılar için özel üretilmiş panel sistemleri.",
    image_url: "/placeholder.svg?height=200&width=300&text=Konteyner+Paneli",
  },
]

// Ürün verileri
export const products = [
  // Jotun İç Cephe Ürünleri
  {
    id: 1,
    category_id: 1,
    name: "Fenomastic",
    slug: "fenomastic",
    description: "Yüksek kapatıcılığa sahip, silinebilir iç cephe boyası.",
    image_url: "/placeholder.svg?height=300&width=300&text=Fenomastic",
    features: ["Yüksek kapatıcılık", "Silinebilir yüzey", "Kolay uygulama", "Hızlı kuruma", "Kokusuz formül"],
    technical_specs: [
      { name: "Kaplama Alanı", value: "10-12 m²/L" },
      { name: "Kuruma Süresi", value: "1 saat (dokunma kuruluğu)" },
      { name: "İkinci Kat", value: "4 saat" },
      { name: "Görünüm", value: "Mat" },
      { name: "Renkler", value: "Geniş renk seçeneği" },
    ],
    application_areas: ["İç duvarlar", "Alçı yüzeyler", "Beton yüzeyler", "Yaşam alanları"],
  },
  {
    id: 2,
    category_id: 1,
    name: "Majestic",
    slug: "majestic",
    description: "Leke tutmayan, ipeksi mat görünümlü iç cephe boyası.",
    image_url: "/placeholder.svg?height=300&width=300&text=Majestic",
    features: ["Leke tutmaz", "İpeksi mat görünüm", "Anti-bakteriyel", "Nefes alabilir", "Çevre dostu"],
    technical_specs: [
      { name: "Kaplama Alanı", value: "12-14 m²/L" },
      { name: "Kuruma Süresi", value: "45 dakika" },
      { name: "İkinci Kat", value: "3 saat" },
      { name: "Görünüm", value: "İpeksi Mat" },
      { name: "Renkler", value: "500+ renk seçeneği" },
    ],
    application_areas: ["Çocuk odaları", "Mutfak ve banyo", "Yaşam alanları", "Ofisler"],
  },
  // Jotun Dış Cephe Ürünleri
  {
    id: 3,
    category_id: 2,
    name: "Jotashield",
    slug: "jotashield",
    description: "Dış cephe için yüksek dayanıklılığa sahip, UV korumalı boya.",
    image_url: "/placeholder.svg?height=300&width=300&text=Jotashield",
    features: ["UV koruması", "Yüksek dayanıklılık", "Su itici özellik", "Renk haslığı", "Çatlama direnci"],
    technical_specs: [
      { name: "Kaplama Alanı", value: "8-10 m²/L" },
      { name: "Kuruma Süresi", value: "2 saat" },
      { name: "İkinci Kat", value: "6 saat" },
      { name: "Görünüm", value: "Mat/İpek Mat" },
      { name: "Dayanıklılık", value: "15+ yıl" },
    ],
    application_areas: ["Dış duvarlar", "Beton yüzeyler", "Sıva yüzeyler", "Eski boyalı yüzeyler"],
  },
  // Filli Boya ürünleri
  {
    id: 4,
    category_id: 5,
    name: "Momento",
    slug: "momento",
    description: "Dekoratif iç cephe boyası.",
    image_url: "/placeholder.svg?height=300&width=300&text=Momento",
    features: ["Dekoratif görünüm", "Kolay uygulama", "Hızlı kuruma", "Ekonomik", "Geniş renk seçeneği"],
    technical_specs: [
      { name: "Kaplama Alanı", value: "10-12 m²/L" },
      { name: "Kuruma Süresi", value: "1 saat" },
      { name: "İkinci Kat", value: "4 saat" },
      { name: "Görünüm", value: "Mat" },
      { name: "İnceltme", value: "Su ile %10-15" },
    ],
    application_areas: ["İç duvarlar", "Yaşam alanları", "Ofisler", "Alçı yüzeyler"],
  },
  // Marshall ürünleri
  {
    id: 5,
    category_id: 8,
    name: "Maxima",
    slug: "maxima",
    description: "Yüksek kapatıcılığa sahip iç cephe boyası.",
    image_url: "/placeholder.svg?height=300&width=300&text=Maxima",
    features: ["Yüksek kapatıcılık", "Silinebilir", "Kokusuz", "Hızlı kuruma", "Ekonomik"],
    technical_specs: [
      { name: "Kaplama Alanı", value: "11-13 m²/L" },
      { name: "Kuruma Süresi", value: "1 saat" },
      { name: "İkinci Kat", value: "4 saat" },
      { name: "Görünüm", value: "Mat" },
      { name: "Renkler", value: "Geniş renk karteli" },
    ],
    application_areas: ["İç duvarlar", "Beton yüzeyler", "Sıva yüzeyler", "Yaşam alanları"],
  },
]

// Yardımcı fonksiyonlar
export const getBrandBySlug = (slug) => {
  return brands.find((brand) => brand.slug === slug)
}

export const getCategoriesByBrandSlug = (brandSlug) => {
  const brand = getBrandBySlug(brandSlug)
  if (!brand) return []
  return categories.filter((category) => category.brand_id === brand.id)
}

export const getCategoryBySlug = (brandSlug, categorySlug) => {
  const brand = getBrandBySlug(brandSlug)
  if (!brand) return null
  return categories.find((category) => category.brand_id === brand.id && category.slug === categorySlug)
}

export const getProductsByCategory = (categoryId) => {
  return products.filter((product) => product.category_id === categoryId)
}

export const getProductBySlug = (brandSlug, categorySlug, productSlug) => {
  const category = getCategoryBySlug(brandSlug, categorySlug)
  if (!category) return null
  return products.find((product) => product.category_id === category.id && product.slug === productSlug)
}

export const getAllBrands = () => brands
export const getAllProducts = () => products
