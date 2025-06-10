import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SocialFixedIcons from "@/components/SocialFixedIcons"
import LoadingScreen from "@/components/LoadingScreen"
import { AuthProvider } from "@/components/auth/AuthProvider"
import Head from "next/head"

export const metadata = {
  title: "Boya Malzemeleri",
  description: "Kaliteli boya ürünleri ve profesyonel çözümler",
  themeColor: '#ea580c', // ← Burası!
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <Head>
        <meta name="theme-color" content="#ea580c" />
      </Head>
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <LoadingScreen />
          <Navbar />
          <main className="flex-grow pt-20">{children}</main>
          <SocialFixedIcons />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
