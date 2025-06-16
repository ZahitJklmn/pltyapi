import AboutPageClient from "./AboutPageClient"

export const metadata = {
  title: "Hakkımızda | Plt Yapı Tokat",
  description:
    "Plt Yapı Tokat olarak 20 yıllık tecrübemizle Jotun boya ürünleri, Tepe Betopan ve yapı malzemelerinde Tokat'ın güvenilir adresi.",
  keywords: "Plt Yapı Tokat, Jotun Tokat, Tokat Boya Malzemeleri, Tokat Tepe Betopan",
  alternates: {
    canonical: "https://pltyapitokat.com/hakkimizda",
  },
}

export default function AboutPage() {
  return <AboutPageClient />
}
