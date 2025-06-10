// Sabit veri dosyası - Supabase kullanmıyoruz

// Marka verileri
const brands = [
    {
      id: 1,
      name: "Jotun",
      slug: "jotun",
      description:
        "Jotun, yüksek kaliteli iç ve dış cephe boyaları sunan dünya çapında bir markadır. 1926'dan beri faaliyet gösteren Norveç kökenli marka, denizcilik, koruyucu kaplamalar ve dekoratif boyalar alanında lider konumdadır.",
      image_url: "/placeholder.svg?height=150&width=250&text=JOTUN",
    },
    {
      id: 2,
      name: "Filli Boya",
      slug: "filli-boya",
      description:
        "Filli Boya, Türkiye'nin önde gelen boya markalarından biridir. 1962'den beri kaliteli ürünler üreten marka, iç ve dış cephe boyalarında geniş ürün yelpazesi sunar.",
      image_url: "/placeholder.svg?height=150&width=250&text=FILLI+BOYA",
    },
    {
      id: 3,
      name: "Marshall",
      slug: "marshall",
      description:
        "Marshall, geniş renk seçenekleri ve kaliteli ürünleriyle tanınan bir boya markasıdır. İç ve dış cephe boyalarında uzman olan marka, dekoratif çözümler sunar.",
      image_url: "/placeholder.svg?height=150&width=250&text=MARSHALL",
    },
    {
      id: 4,
      name: "Hekim Panel",
      slug: "hekim-panel",
      description:
        "Hekim Panel, çatı ve cephe panelleri konusunda uzmanlaşmış bir markadır. Yalıtımlı panel sistemleri ve modern yapı çözümleri sunar.",
      image_url: "/placeholder.svg?height=150&width=250&text=HEKIM+PANEL",
    },
  ]
  
  // Kategori verileri
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
      name: "Ahşap Ürünleri",
      slug: "ahsap-urunleri",
      description: "Ahşap yüzeyler için koruyucu ve dekoratif boyalar. Vernik, lak ve emprenye ürünleri.",
      image_url: "/placeholder.svg?height=200&width=300&text=Ahşap+Ürünleri",
    },
    {
      id: 4,
      brand_id: 1,
      name: "Metal Ürünleri",
      slug: "metal-urunleri",
      description: "Metal yüzeyler için pas önleyici ve koruyucu boyalar. Endüstriyel ve dekoratif çözümler.",
      image_url: "/placeholder.svg?height=200&width=300&text=Metal+Ürünleri",
    },
    // Filli Boya kategorileri
    {
      id: 5,
      brand_id: 2,
      name: "İç Cephe Boyaları",
      slug: "ic-cephe-boyalari",
      description: "İç mekanlar için su bazlı, silinebilir ve anti-bakteriyel boyalar. Geniş renk seçenekleri.",
      image_url: "/placeholder.svg?height=200&width=300&text=İç+Cephe+Boyaları",
    },
    {
      id: 6,
      brand_id: 2,
      name: "Dış Cephe Boyaları",
      slug: "dis-cephe-boyalari",
      description: "Dış cepheler için su ve nem dayanımlı, uzun ömürlü boyalar. Türkiye iklim koşullarına uygun.",
      image_url: "/placeholder.svg?height=200&width=300&text=Dış+Cephe+Boyaları",
    },
    {
      id: 7,
      brand_id: 2,
      name: "Metal Boyaları",
      slug: "metal-boyalari",
      description: "Metal yüzeyler için özel formülasyonlu boyalar. Pas önleyici ve koruyucu özellikler.",
      image_url: "/placeholder.svg?height=200&width=300&text=Metal+Boyaları",
    },
    // Marshall kategorileri
    {
      id: 8,
      brand_id: 3,
      name: "İç Cephe Boyaları",
      slug: "ic-cephe-boyalari",
      description: "İç mekanlar için yüksek kapatıcılığa sahip boyalar. Ekonomik ve kaliteli çözümler.",
      image_url: "/placeholder.svg?height=200&width=300&text=İç+Cephe+Boyaları",
    },
    {
      id: 9,
      brand_id: 3,
      name: "Dış Cephe Boyaları",
      slug: "dis-cephe-boyalari",
      description: "Dış cepheler için hava koşullarına dayanıklı boyalar. Uzun ömürlü koruma.",
      image_url: "/placeholder.svg?height=200&width=300&text=Dış+Cephe+Boyaları",
    },
    {
      id: 10,
      brand_id: 3,
      name: "Ahşap Boyaları",
      slug: "ahsap-boyalari",
      description: "Ahşap yüzeyler için vernik ve koruyucu boyalar. Doğal ahşap görünümü.",
      image_url: "/placeholder.svg?height=200&width=300&text=Ahşap+Boyaları",
    },
    // Hekim Panel kategorileri
    {
      id: 11,
      brand_id: 4,
      name: "Çatı Panelleri",
      slug: "cati-panelleri",
      description: "Dayanıklı ve yalıtımlı çatı panel sistemleri. Enerji tasarrufu sağlayan çözümler.",
      image_url: "/placeholder.svg?height=200&width=300&text=Çatı+Panelleri",
    },
    {
      id: 12,
      brand_id: 4,
      name: "Cephe Panelleri",
      slug: "cephe-panelleri",
      description: "Modern ve estetik cephe kaplama panelleri. Hızlı montaj ve uzun ömür.",
      image_url: "/placeholder.svg?height=200&width=300&text=Cephe+Panelleri",
    },
    {
      id: 13,
      brand_id: 4,
      name: "Konteyner Paneli",
      slug: "konteyner-paneli",
      description: "Konteyner yapılar için özel üretilmiş panel sistemleri. Modüler çözümler.",
      image_url: "/placeholder.svg?height=200&width=300&text=Konteyner+Paneli",
    },
  ]
  
  // Ürün verileri
  const products = [
    // Jotun İç Cephe Ürünleri
    {
      id: 1,
      category_id: 1,
      name: "Fenomastic",
      slug: "fenomastic",
      description: "Yüksek kapatıcılığa sahip, silinebilir iç cephe boyası. Kokusuz formülü ile sağlıklı yaşam alanları.",
      image_url: "/placeholder.svg?height=300&width=300&text=Fenomastic",
    },
    {
      id: 2,
      category_id: 1,
      name: "Majestic",
      slug: "majestic",
      description: "Leke tutmayan, ipeksi mat görünümlü iç cephe boyası. Anti-bakteriyel özellikli.",
      image_url: "/placeholder.svg?height=300&width=300&text=Majestic",
    },
    {
      id: 3,
      category_id: 1,
      name: "Lady Pure Colours",
      slug: "lady-pure-colours",
      description: "Çocuk odaları için özel geliştirilmiş, tamamen doğal iç cephe boyası.",
      image_url: "/placeholder.svg?height=300&width=300&text=Lady+Pure+Colours",
    },
    // Jotun Dış Cephe Ürünleri
    {
      id: 4,
      category_id: 2,
      name: "Jotashield",
      slug: "jotashield",
      description: "Dış cephe için yüksek dayanıklılığa sahip, UV korumalı boya. 15 yıl garanti.",
      image_url: "/placeholder.svg?height=300&width=300&text=Jotashield",
    },
    {
      id: 5,
      category_id: 2,
      name: "Facade",
      slug: "facade",
      description: "Ekonomik dış cephe boyası. Hava koşullarına dayanıklı formül.",
      image_url: "/placeholder.svg?height=300&width=300&text=Facade",
    },
    // Jotun Ahşap Ürünleri
    {
      id: 6,
      category_id: 3,
      name: "Trebitt",
      slug: "trebitt",
      description: "Ahşap yüzeyler için koruyucu emprenye. Su itici ve mantar önleyici.",
      image_url: "/placeholder.svg?height=300&width=300&text=Trebitt",
    },
    {
      id: 7,
      category_id: 3,
      name: "Visir",
      slug: "visir",
      description: "Şeffaf ahşap koruyucu. Doğal ahşap görünümünü korur.",
      image_url: "/placeholder.svg?height=300&width=300&text=Visir",
    },
    // Jotun Metal Ürünleri
    {
      id: 8,
      category_id: 4,
      name: "Pilot II",
      slug: "pilot-ii",
      description: "Metal yüzeyler için pas önleyici astar. Uzun ömürlü koruma.",
      image_url: "/placeholder.svg?height=300&width=300&text=Pilot+II",
    },
    // Filli Boya İç Cephe
    {
      id: 9,
      category_id: 5,
      name: "Momento",
      slug: "momento",
      description: "Ekonomik iç cephe boyası. Kolay uygulama ve hızlı kuruma.",
      image_url: "/placeholder.svg?height=300&width=300&text=Momento",
    },
    {
      id: 10,
      category_id: 5,
      name: "Tempo",
      slug: "tempo",
      description: "Silinebilir iç cephe boyası. Geniş renk seçeneği.",
      image_url: "/placeholder.svg?height=300&width=300&text=Tempo",
    },
    {
      id: 11,
      category_id: 5,
      name: "Clean",
      slug: "clean",
      description: "Anti-bakteriyel iç cephe boyası. Hastane ve okul projeleri için ideal.",
      image_url: "/placeholder.svg?height=300&width=300&text=Clean",
    },
    // Filli Boya Dış Cephe
    {
      id: 12,
      category_id: 6,
      name: "Exterior",
      slug: "exterior",
      description: "Dış cephe için dayanıklı boya. Türkiye iklim koşullarına uygun.",
      image_url: "/placeholder.svg?height=300&width=300&text=Exterior",
    },
    {
      id: 13,
      category_id: 6,
      name: "Silikonlu",
      slug: "silikonlu",
      description: "Silikon katkılı dış cephe boyası. Su itici özellik.",
      image_url: "/placeholder.svg?height=300&width=300&text=Silikonlu",
    },
    // Marshall İç Cephe
    {
      id: 14,
      category_id: 8,
      name: "Maxima",
      slug: "maxima",
      description: "Yüksek kapatıcılığa sahip iç cephe boyası. Ekonomik çözüm.",
      image_url: "/placeholder.svg?height=300&width=300&text=Maxima",
    },
    {
      id: 15,
      category_id: 8,
      name: "Prestij",
      slug: "prestij",
      description: "Premium iç cephe boyası. İpeksi mat görünüm.",
      image_url: "/placeholder.svg?height=300&width=300&text=Prestij",
    },
    // Marshall Dış Cephe
    {
      id: 16,
      category_id: 9,
      name: "Dış Cephe",
      slug: "dis-cephe",
      description: "Standart dış cephe boyası. Hava koşullarına dayanıklı.",
      image_url: "/placeholder.svg?height=300&width=300&text=Dış+Cephe",
    },
    // Hekim Panel Ürünleri
    {
      id: 17,
      category_id: 11,
      name: "Çatı Sandviç Panel",
      slug: "cati-sandvic-panel",
      description: "Yalıtımlı çatı sandviç paneli. Enerji tasarrufu sağlar.",
      image_url: "/placeholder.svg?height=300&width=300&text=Çatı+Sandviç+Panel",
    },
    {
      id: 18,
      category_id: 12,
      name: "Cephe Sandviç Panel",
      slug: "cephe-sandvic-panel",
      description: "Modern cephe kaplama paneli. Hızlı montaj.",
      image_url: "/placeholder.svg?height=300&width=300&text=Cephe+Sandviç+Panel",
    },
    {
      id: 19,
      category_id: 13,
      name: "Konteyner Panel",
      slug: "konteyner-panel",
      description: "Konteyner yapılar için özel panel. Modüler sistem.",
      image_url: "/placeholder.svg?height=300&width=300&text=Konteyner+Panel",
    },
  ]
  
  // Yardımcı fonksiyonlar
  export function getAllLocalBrands() {
    return brands
  }
  
  export function getLocalBrandData(brandSlug) {
    return brands.find((brand) => brand.slug === brandSlug)
  }
  
  export function getLocalCategoriesByBrand(brandSlug) {
    const brand = getLocalBrandData(brandSlug)
    if (!brand) return []
    return categories.filter((category) => category.brand_id === brand.id)
  }
  
  export function getLocalCategoryData(brandSlug, categorySlug) {
    const brand = getLocalBrandData(brandSlug)
    if (!brand) return null
    return categories.find((category) => category.brand_id === brand.id && category.slug === categorySlug)
  }
  
  export function getLocalProductsData(brandSlug, categorySlug) {
    const category = getLocalCategoryData(brandSlug, categorySlug)
    if (!category) return []
    return products.filter((product) => product.category_id === category.id)
  }
  
  export function getLocalProductData(brandSlug, categorySlug, productSlug) {
    const category = getLocalCategoryData(brandSlug, categorySlug)
    if (!category) return null
    return products.find((product) => product.category_id === category.id && product.slug === productSlug)
  }
  
  // Öne çıkan ürünler için
  export function getFeaturedProducts() {
    return [
      products[0], // Fenomastic
      products[3], // Jotashield
      products[8], // Momento
      products[13], // Maxima
      products[16], // Çatı Sandviç Panel
      products[17], // Cephe Sandviç Panel
    ]
  }
  