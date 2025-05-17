import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SocialFixedIcons from "@/components/SocialFixedIcons"

export const metadata = {
  title: "PLT Yapı",
  description: "Boya Malzemeleri | Jotun ",
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <SocialFixedIcons />
      </body>
    </html>
  )
}
