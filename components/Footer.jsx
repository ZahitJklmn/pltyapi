"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Twitter, X, Eye, EyeOff, LogIn, ArrowUp } from "lucide-react"
import { useAuth } from "./auth/AuthProvider"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

export default function Footer() {
  const [footerRef, isFooterVisible] = useScrollAnimation()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { user, isAdmin, signIn } = useAuth()

  const [dropdownStates, setDropdownStates] = useState({
    facebook: false,
    instagram: false,
  })

  // Sosyal medya linkleri - Kodda sabit olarak tanımlanmış
  const socialLinks = {
    facebook: [
      { title: "Kurumsal Sayfamız", url: "https://www.facebook.com/pltyapisistemleri/?locale=tr_TR" },
      { title: "Jotun Sayfamız", url: "https://www.facebook.com/p/Jotun_tokatpltyap%C4%B1-100063632795286/" },
    ],
    instagram: [
      { title: "Kurumsal Sayfamız", url: "https://instagram.com/yourprofile" },
      { title: "Jotun Sayfamız", url: "https://www.instagram.com/jotuntokat/" },
    ],
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".social-dropdown-container")) {
        setDropdownStates({ facebook: false, instagram: false })
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setLoginError("")

    try {
      const { data, error } = await signIn(email, password)

      if (error) {
        setLoginError(error.message || "Giriş başarısız. Email ve şifrenizi kontrol edin.")
      } else {
        setShowLoginModal(false)
        setEmail("")
        setPassword("")
      }
    } catch (err) {
      setLoginError(err.message || "Bir hata oluştu. Lütfen tekrar deneyin.")
    } finally {
      setLoading(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDropdownToggle = (platform) => {
    setDropdownStates((prev) => ({
      ...prev,
      [platform]: !prev[platform],
      // Diğer dropdown'ları kapat
      ...(platform === "facebook" ? { instagram: false } : { facebook: false }),
    }))
  }

  return (
    <>
      <footer
        ref={footerRef}
        className={`relative select-none bg-gradient-to-br from-black via-gray-900 to-black text-white pt-20 pb-8 transition-all duration-1000 ${
          isFooterVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Background Pattern - Turuncu hover efekti kaldırıldı */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255, 107, 0, 0.05) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(220, 38, 38, 0.05) 0%, transparent 50%)`,
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Top Section */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 transition-all duration-1000 delay-300 ${
              isFooterVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Company Info */}
            <div className="sm:items-center justify-center grid">
              <div className="space-y-6">
                <div className="group">
                <img
                  src="/images/plt-yapi-logo-beyaz.png?height=50&width=150&text=LOGO"
                  alt="Logo"
                  className="h-24 rounded-sm mb-6 transition-all duration-300 group-hover:scale-105"
                  draggable="false"
                />
            </div>

              <p className="text-gray-300 mb-6 leading-relaxed hidden"> {/* hidden div */}
                Kaliteli boya ürünleri ve profesyonel çözümler için 20 yılı aşkın tecrübemizle hizmetinizdeyiz.
              </p>
            </div>
              {/* Social Media - Gradient background hover */}
              <div className="flex space-x-4 ml-3">
                {[
                  {
                    icon: Facebook,
                    platform: "facebook",
                    dropdownItems: socialLinks.facebook,
                  },
                  {
                    icon: Instagram,
                    platform: "instagram",
                    dropdownItems: socialLinks.instagram,
                  },
                  { icon: Twitter, href: "https://x.com/pltyapi", platform: "twitter" },
                ].map((social, index) => (
                  <div key={index} className="relative social-dropdown-container">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        if (social.dropdownItems) {
                          handleDropdownToggle(social.platform)
                        } else if (social.href) {
                          window.open(social.href, "_blank")
                        }
                      }}
                      className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center text-gray-300 transition-all duration-300 hover:scale-110 hover:text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-600 hover:border-orange-400"
                    >
                      <social.icon className="h-5 w-5" />
                    </button>

                    {/* Dropdown */}
                    {social.dropdownItems && dropdownStates[social.platform] && (
                      <div
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-neutral-700/95 backdrop-blur-sm border-2 border-orange-400 rounded-xl shadow-xl z-50 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {social.dropdownItems.map((item, itemIndex) => (
                          <a
                            key={itemIndex}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full px-4 py-3 text-white hover:scale-105 hover:bg-neutral-500 hover:text-orange-600 transition-all duration-200 border-b border-orange-100 last:border-b-0 text-left"
                            onClick={(e) => {
                              e.stopPropagation()
                              setDropdownStates({ facebook: false, instagram: false })
                            }}
                          >
                            {item.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links - Gradient underline hover */}
            <div className="hidden md:block">
              <h3 className="text-xl font-bold mb-6 relative">
                <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  Hızlı Linkler
                </span>
                <div className="absolute -bottom-0.5 left-0 w-12 h-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-full"></div>
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Ana Sayfa", href: "/" },
                  { name: "Ürünler", href: "/urunler" },
                  { name: "Projeler", href: "/projeler" },
                  { name: "Hakkımızda", href: "/hakkimizda" },
                  { name: "İletişim", href: "/iletisim" },
                ].map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-all duration-300 inline-block relative group"
                    >
                      {link.name}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product Categories - Gradient underline hover */}
            <div className="hidden md:block">
              <h3 className="text-xl font-bold mb-6 relative">
                <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  Ürün Kategorileri
                </span>
                <div className="absolute -bottom-0.5 left-0 w-12 h-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-full"></div>
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "İç Cephe Ürünleri", href: "/urunler/jotun/ic-cephe-urunleri" },
                  { name: "Dış Cephe Ürünleri", href: "/urunler/jotun/dis-cephe-urunleri" },
                  { name: "Ahşap Ürünleri", href: "/urunler/jotun/ahsap-urunleri" },
                  { name: "Metal Ürünleri", href: "/urunler/jotun/metal-urunleri" },
                  { name: "Boya Ekipmanları", href: "/urunler/filli-boya/ic-cephe-boyalari" },
                ].map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-all duration-300 text-sm inline-block relative group"
                    >
                      {link.name}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info - Icon gradient hover */}
            <div>
              <h3 className="text-xl font-bold mb-6 relative">
                <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  İletişim Bilgileri
                </span>
                <div className="absolute -bottom-0.5 left-0 w-12 h-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-full"></div>
              </h3>
              <ul className="space-y-4">
                {[
                  {
                    icon: MapPin,
                    text: "Bosna Cd 27, Yeşilırmak Mh., Tokat, Türkiye",
                  },
                  {
                    icon: Phone,
                    text: "(0356) 212 56 60",
                  },
                  {
                    icon: Mail,
                    text: "pltyapitokat@gmail.com",
                  },
                  {
                    icon: Clock,
                    text: "Pazartesi - Cumartesi: 09:00 - 17:00",
                    clickable: true,
                  },
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mr-3 mt-0.5">
                      <item.icon className="h-4 w-4 text-orange-400" />
                    </div>
                    {item.clickable ? (
                      <button
                        onClick={() => setShowLoginModal(true)}
                        className="text-gray-300 transition-colors duration-300 text-left"
                      >
                        {item.text}
                      </button>
                    ) : (
                      <span className="text-gray-300">{item.text}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            className={`border-t border-white/10 pt-8 text-center transition-all duration-1000 delay-700 ${
              isFooterVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} PLT YAPI Sistemleri | Tüm hakları saklıdır
            </p>
          </div>
        </div>

        {/* Scroll to Top Button */} {/* layoutta button var o yüzden bu div hidden */}
        {showScrollTop && (
          <div className="hidden">
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
        )}

        {/* Login Modal */}
        {showLoginModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Admin Girişi</h3>
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                {loginError && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                    {loginError}
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-900"
                    placeholder="admin@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                    Şifre
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-900"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-xl font-medium hover:from-orange-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Giriş yapılıyor...
                    </>
                  ) : (
                    <>
                      <LogIn className="h-5 w-5 mr-2" />
                      Giriş Yap
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </footer>
    </>
  )
}
