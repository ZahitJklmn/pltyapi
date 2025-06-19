import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SocialFixedIcons from "@/components/SocialFixedIcons"
import ScrollToTopButton from "@/components/ScrollToTopButton"
import { AuthProvider } from "@/components/auth/AuthProvider"

export const metadata = {
  title: "Plt Yapı Tokat | Jotun Boya Ürünleri ve Yapı Malzemeleri",
  description:
    "Plt Yapı Tokat'ta Jotun boya ürünleri, Tepe Betopan, yapı malzemeleri ve profesyonel boya çözümleri. Tokat'ın güvenilir boya malzemeleri tedarikçisi.",
  keywords:
    "Plt Yapı, Plt Yapı Tokat, Tokat Jotun, Tokat Boya Ürünleri, Tokat Boya Malzemeleri, Tokat Boya, Jotun Tokat, Tokat Tepe Betopan, Tokat Tepepan",
  author: "Plt Yapı Tokat",
  robots: "index, follow",
  openGraph: {
    title: "Plt Yapı Tokat | Jotun Boya Ürünleri ve Yapı Malzemeleri",
    description: "Plt Yapı Tokat'ta Jotun boya ürünleri, Tepe Betopan, yapı malzemeleri ve profesyonel boya çözümleri.",
    type: "website",
    locale: "tr_TR",
  },
  icons: {
    icon: "/favicon.png", // bu satır favicon'u ekler
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="geo.region" content="TR-60" />
        <meta name="geo.placename" content="Tokat" />
        <link rel="canonical" href="https://pltyapitokat.com" />
      </head>
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow pt-20">{children}</main>
          <SocialFixedIcons />
          <ScrollToTopButton />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
