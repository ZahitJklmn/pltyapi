"use client"

export default function SEOProductSchema({ product, brandId, categoryId }) {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image_url,
    brand: {
      "@type": "Brand",
      name: brandId?.charAt(0).toUpperCase() + brandId?.slice(1),
    },
    category: categoryId?.replace(/-/g, " "),
    offers: product.price
      ? {
          "@type": "Offer",
          price: product.price.replace(/[^\d,]/g, "").replace(",", "."),
          priceCurrency: "TRY",
          availability:
            product.stock_status === "Stokta" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        }
      : undefined,
    manufacturer: {
      "@type": "Organization",
      name: "Plt Yapı Tokat",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(productSchema),
      }}
    />
  )
}
