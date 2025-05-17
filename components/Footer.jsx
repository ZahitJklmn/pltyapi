"use client"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Twitter, X, Eye, EyeOff } from "lucide-react"

export default function Footer() {
  const footerRef = useRef(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const contentRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Footer görünür olduğunda animasyonu başlat
            entry.target.classList.add("animate-in")

            // İçerik elemanlarını animasyonla göster
            setTimeout(() => {
              contentRefs.current.forEach((ref, index) => {
                if (ref) {
                  setTimeout(() => {
                    ref.classList.remove("opacity-0", "translate-y-10")
                  }, index * 150) // Her eleman için 150ms gecikme
                }
              })
            }, 300)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current)
      }
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (username === "admin" && password === "pltyapi60tokat") {
      // Başarılı giriş
      setLoginError("")
      localStorage.setItem("isAdmin", "true")
      alert("Giriş başarılı! Admin paneline yönlendiriliyorsunuz.")
      setShowLoginModal(false)
      window.location.reload() // Sayfayı yenile
    } else {
      // Hatalı giriş
      setLoginError("Kullanıcı adı veya şifre hatalı!")
    }
  }

  return (
    <footer
      ref={footerRef}
      className="bg-gray-900 text-white pt-16 pb-8 opacity-0 transform translate-y-20 transition-all duration-700 ease-out select-none"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div
            ref={(el) => (contentRefs.current[0] = el)}
            className="opacity-0 transform translate-y-10 transition-all duration-700"
          >
            <img src="/placeholder.svg?height=50&width=150&text=LOGO" alt="Logo" className="h-12 mb-6" />
            <p className="text-gray-400 mb-6">
              Kaliteli boya ürünleri ve profesyonel çözümler için 20 yılı aşkın tecrübemizle hizmetinizdeyiz.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links - Sadece masaüstünde görünecek */}
          <div
            ref={(el) => (contentRefs.current[1] = el)}
            className="hidden md:block opacity-0 transform translate-y-10 transition-all duration-700"
          >
            <h3 className="text-lg font-bold mb-6 relative">
              Hızlı Linkler
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-red-600"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="/urunler" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Ürünler
                </Link>
              </li>
              <li>
                <Link href="/projeler" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Projeler
                </Link>
              </li>
              <li>
                <Link href="/hakkimizda" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-gray-400 hover:text-white transition-colors duration-300">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Products - Sadece masaüstünde görünecek */}
          <div
            ref={(el) => (contentRefs.current[2] = el)}
            className="hidden md:block opacity-0 transform translate-y-10 transition-all duration-700"
          >
            <h3 className="text-lg font-bold mb-6 relative">
              Ürün Kategorileri
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-red-600"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/urunler/ic-cephe-urunleri"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  İç Cephe Ürünleri
                </Link>
              </li>
              <li>
                <Link
                  href="/urunler/dis-cephe-urunleri"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Dış Cephe Ürünleri
                </Link>
              </li>
              <li>
                <Link
                  href="/urunler/ahsap-urunleri"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Ahşap Ürünleri
                </Link>
              </li>
              <li>
                <Link
                  href="/urunler/metal-urunleri"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Metal Ürünleri
                </Link>
              </li>
              <li>
                <Link
                  href="/urunler/boya-ekipmanlari"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Boya Ekipmanları
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div
            ref={(el) => (contentRefs.current[3] = el)}
            className="opacity-0 transform translate-y-10 transition-all duration-700"
          >
            <h3 className="text-lg font-bold mb-6 relative">
              İletişim Bilgileri
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-red-600"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-red-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">Örnek Mahallesi, Örnek Caddesi No:123, İstanbul, Türkiye</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                <span className="text-gray-400">0212 123 45 67</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="text-gray-400 transition-colors duration-300"
                >
                  info@boyamalzemeleri.com
                </button>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                <span className="text-gray-400">Pazartesi - Cumartesi: 09:00 - 18:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          ref={(el) => (contentRefs.current[4] = el)}
          className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm opacity-0 transform translate-y-10 transition-all duration-700"
        >
          <p>© {new Date().getFullYear()} Boya Malzemeleri. Tüm hakları saklıdır.</p>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Admin Girişi</h3>
              <button onClick={() => setShowLoginModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleLogin}>
              {loginError && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{loginError}</div>}
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                  Kullanıcı Adı
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                  Şifre
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-red-600 text-white px-6 py-2 rounded-md font-medium hover:bg-red-700 transition-colors duration-300"
                >
                  Giriş Yap
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </footer>
  )
}
