import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SocialFixedIcons from "@/components/SocialFixedIcons"
import LoadingScreen from "@/components/LoadingScreen"
import { AuthProvider } from "@/components/auth/AuthProvider"
import ScrollToTopButton from "@/components/ScrollToTopButton"

export const metadata = {
  title: "Boya Malzemeleri",
  description: "Kaliteli boya ürünleri ve profesyonel çözümler",
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <LoadingScreen />
          <Navbar />
          <main className="flex-grow pt-20">{children}</main>
          <SocialFixedIcons />
          <Footer />
        </AuthProvider>
        <ScrollToTopButton />
      </body>
    </html>
  )
}
