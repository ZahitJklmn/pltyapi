// Yerel veri için yardımcı fonksiyonlar
// Bu dosya, Supabase bağlantısı olmadığında kullanılacak örnek verileri içerir

// Marka verileri
const localBrands = [
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
  const localCategories = [
    // Jotun kategorileri
    {
      id: 1,
      brand_id: 1, // Jotun
      name: "İç Cephe Ürünleri",
      slug: "ic-cephe-urunleri",
      description: "Evinizin iç mekanları için yüksek kaliteli boyalar ve kaplamalar.",
      image_url: "/placeholder.svg?height=200&width=300&text=İç+Cephe",
    },
    {
      id: 2,
      brand_id: 1, // Jotun
      name: "Dış Cephe Ürünleri",
      slug: "dis-cephe-urunleri",
      description: "Binanızın dış cephesi için dayanıklı ve uzun ömürlü boyalar.",
      image_url: "/placeholder.svg?height=200&width=300&text=Dış+Cephe",
    },
    {
      id: 3,
      brand_id: 1, // Jotun
      name: "Ahşap Ürünleri",
      slug: "ahsap-urunleri",
      description: "Ahşap yüzeyler için koruyucu ve dekoratif boyalar.",
      image_url: "/placeholder.svg?height=200&width=300&text=Ahşap",
    },
    {
      id: 4,
      brand_id: 1, // Jotun
      name: "Metal Ürünleri",
      slug: "metal-urunleri",
      description: "Metal yüzeyler için pas önleyici ve koruyucu boyalar.",
      image_url: "/placeholder.svg?height=200&width=300&text=Metal",
    },
  
    // Filli Boya kategorileri
    {
      id: 5,
      brand_id: 2, // Filli Boya
      name: "İç Cephe Boyaları",
      slug: "ic-cephe-boyalari",
      description: "İç mekanlar için su bazlı, silinebilir ve anti-bakteriyel boyalar.",
      image_url: "/placeholder.svg?height=200&width=300&text=İç+Cephe",
    },
    {
      id: 6,
      brand_id: 2, // Filli Boya
      name: "Dış Cephe Boyaları",
      slug: "dis-cephe-boyalari",
      description: "Dış cepheler için su ve nem dayanımlı, uzun ömürlü boyalar.",
      image_url: "/placeholder.svg?height=200&width=300&text=Dış+Cephe",
    },
    {
      id: 7,
      brand_id: 2, // Filli Boya
      name: "Dekoratif Ürünler",
      slug: "dekoratif-urunler",
      description: "Özel efekt ve doku veren dekoratif boya ürünleri.",
      image_url: "/placeholder.svg?height=200&width=300&text=Dekoratif",
    },
  
    // Marshall kategorileri
    {
      id: 8,
      brand_id: 3, // Marshall
      name: "İç Cephe Boyaları",
      slug: "ic-cephe-boyalari",
      description: "İç mekanlar için yüksek kapatıcılığa sahip boyalar.",
      image_url: "/placeholder.svg?height=200&width=300&text=İç+Cephe",
    },
    {
      id: 9,
      brand_id: 3, // Marshall
      name: "Dış Cephe Boyaları",
      slug: "dis-cephe-boyalari",
      description: "Dış cepheler için hava koşullarına dayanıklı boyalar.",
      image_url: "/placeholder.svg?height=200&width=300&text=Dış+Cephe",
    },
    {
      id: 10,
      brand_id: 3, // Marshall
      name: "Ahşap Boyaları",
      slug: "ahsap-boyalari",
      description: "Ahşap yüzeyler için vernik ve koruyucu boyalar.",
      image_url: "/placeholder.svg?height=200&width=300&text=Ahşap",
    },
  
    // Hekim Panel kategorileri
    {
      id: 11,
      brand_id: 4, // Hekim Panel
      name: "Çatı Panelleri",
      slug: "cati-panelleri",
      description: "Dayanıklı ve yalıtımlı çatı panel sistemleri.",
      image_url: "/placeholder.svg?height=200&width=300&text=Çatı+Panelleri",
    },
    {
      id: 12,
      brand_id: 4, // Hekim Panel
      name: "Cephe Panelleri",
      slug: "cephe-panelleri",
      description: "Modern ve estetik cephe kaplama panelleri.",
      image_url: "/placeholder.svg?height=200&width=300&text=Cephe+Panelleri",
    },
    {
      id: 13,
      brand_id: 4, // Hekim Panel
      name: "Konteyner Paneli",
      slug: "konteyner-paneli",
      description: "Konteyner yapılar için özel üretilmiş panel sistemleri.",
      image_url: "/placeholder.svg?height=200&width=300&text=Konteyner+Paneli",
    },
  ]
  
  // Ürün verileri
  const localProducts = [
    // Jotun İç Cephe Ürünleri
    {
      id: 1,
      category_id: 1,
      name: "Fenomastic",
      slug: "fenomastic",
      description: "Yüksek kapatıcılığa sahip, silinebilir iç cephe boyası.",
      image_url: "/placeholder.svg?height=300&width=300&text=Fenomastic",
    },
    {
      id: 2,
      category_id: 1,
      name: "Majestic",
      slug: "majestic",
      description: "Leke tutmayan, ipeksi mat görünümlü iç cephe boyası.",
      image_url: "/placeholder.svg?height=300&width=300&text=Majestic",
    },
    // Jotun Dış Cephe Ürünleri
    {
      id: 3,
      category_id: 2,
      name: "Jotashield",
      slug: "jotashield",
      description: "Dış cephe için yüksek dayanıklılığa sahip, UV korumalı boya.",
      image_url: "/placeholder.svg?height=300&width=300&text=Jotashield",
    },
    // Jotun Ahşap Ürünleri
    {
      id: 4,
      category_id: 3,
      name: "Demidekk",
      slug: "demidekk",
      description: "Ahşap yüzeyler için su bazlı, uzun ömürlü koruyucu.",
      image_url: "/placeholder.svg?height=300&width=300&text=Demidekk",
    },
    // Jotun Metal Ürünleri
    {
      id: 5,
      category_id: 4,
      name: "Jotun Resist",
      slug: "jotun-resist",
      description: "Metal yüzeyler için pas önleyici astar boya.",
      image_url: "/placeholder.svg?height=300&width=300&text=Jotun+Resist",
    },
    // Filli Boya İç Cephe Ürünleri
    {
      id: 6,
      category_id: 5,
      name: "Momento",
      slug: "momento",
      description: "Dekoratif iç cephe boyası.",
      image_url: "/placeholder.svg?height=300&width=300&text=Momento",
    },
    {
      id: 7,
      category_id: 5,
      name: "Elegans",
      slug: "elegans",
      description: "Silinebilir, mat iç cephe boyası.",
      image_url: "/placeholder.svg?height=300&width=300&text=Elegans",
    },
    // Filli Boya Dış Cephe Ürünleri
    {
      id: 8,
      category_id: 6,
      name: "Exelans",
      slug: "exelans",
      description: "Elastik dış cephe boyası.",
      image_url: "/placeholder.svg?height=300&width=300&text=Exelans",
    },
    // Marshall İç Cephe Ürünleri
    {
      id: 9,
      category_id: 8,
      name: "Maxima",
      slug: "maxima",
      description: "Yüksek kapatıcılığa sahip iç cephe boyası.",
      image_url: "/placeholder.svg?height=300&width=300&text=Maxima",
    },
    // Marshall Dış Cephe Ürünleri
    {
      id: 10,
      category_id: 9,
      name: "Weathershield",
      slug: "weathershield",
      description: "Hava koşullarına dayanıklı dış cephe boyası.",
      image_url: "/placeholder.svg?height=300&width=300&text=Weathershield",
    },
  ]
  
  // Marka verisi getir
  export const getLocalBrandData = (brandSlug) => {
    if (!brandSlug) return null
    return localBrands.find((brand) => brand.slug === brandSlug) || null
  }
  
  // Markaya ait kategorileri getir
  export const getLocalCategoriesByBrand = (brandSlug) => {
    if (!brandSlug) return []
    const brand = getLocalBrandData(brandSlug)
    if (!brand) return []
    return localCategories.filter((category) => category.brand_id === brand.id) || []
  }
  
  // Kategori verisi getir
  export const getLocalCategoryData = (brandSlug, categorySlug) => {
    if (!brandSlug || !categorySlug) return null
    const brand = getLocalBrandData(brandSlug)
    if (!brand) return null
    return localCategories.find((category) => category.brand_id === brand.id && category.slug === categorySlug) || null
  }
  
  // Kategoriye ait ürünleri getir
  export const getLocalProductsData = (brandSlug, categorySlug) => {
    if (!brandSlug || !categorySlug) return []
    const category = getLocalCategoryData(brandSlug, categorySlug)
    if (!category) return []
    return localProducts.filter((product) => product.category_id === category.id) || []
  }
  
  // Tüm markaları getir
  export const getAllLocalBrands = () => {
    return localBrands
  }
  
  // Tüm ürünleri getir
  export const getAllLocalProducts = () => {
    return localProducts
  }
  
  // Ürün detayını getir
  export const getLocalProductDetail = (brandSlug, categorySlug, productSlug) => {
    if (!brandSlug || !categorySlug || !productSlug) return null
    const category = getLocalCategoryData(brandSlug, categorySlug)
    if (!category) return null
    return localProducts.find((product) => product.category_id === category.id && product.slug === productSlug) || null
  }
  