"use client"
import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Menu, X, ChevronDown, Phone, MapPin, Mail, ChevronRight, LogOut } from "lucide-react"

// Ürünler menüsünü markalar şeklinde değiştirmek için productCategories değişkenini güncelliyorum
const productCategories = [
  {
    title: "Jotun",
    image: "/placeholder.svg?height=80&width=150&text=JOTUN",
    link: "/urunler/jotun",
    items: [
      { name: "İç Cephe Ürünleri", link: "/urunler/jotun/ic-cephe-urunleri" },
      { name: "Dış Cephe Ürünleri", link: "/urunler/jotun/dis-cephe-urunleri" },
      { name: "Ahşap Ürünleri", link: "/urunler/jotun/ahsap-urunleri" },
      { name: "Metal Ürünleri", link: "/urunler/jotun/metal-urunleri" },
    ],
  },
  {
    title: "Filli Boya",
    image: "/placeholder.svg?height=80&width=150&text=FILLI BOYA",
    link: "/urunler/filli-boya",
    items: [
      { name: "İç Cephe Boyaları", link: "/urunler/filli-boya/ic-cephe-boyalari" },
      { name: "Dış Cephe Boyaları", link: "/urunler/filli-boya/dis-cephe-boyalari" },
      { name: "Metal Boyaları", link: "/urunler/filli-boya/metal-boyalari" },
    ],
  },
  {
    title: "Marshall",
    image: "/placeholder.svg?height=80&width=150&text=MARSHALL",
    link: "/urunler/marshall",
    items: [
      { name: "İç Cephe Boyaları", link: "/urunler/marshall/ic-cephe-boyalari" },
      { name: "Dış Cephe Boyaları", link: "/urunler/marshall/dis-cephe-boyalari" },
      { name: "Ahşap Boyaları", link: "/urunler/marshall/ahsap-boyalari" },
    ],
  },
  {
    title: "Hekim Panel",
    image: "/placeholder.svg?height=80&width=150&text=HEKIM PANEL",
    link: "/urunler/hekim-panel",
    items: [
      { name: "Çatı Panelleri", link: "/urunler/hekim-panel/cati-panelleri" },
      { name: "Cephe Panelleri", link: "/urunler/hekim-panel/cephe-panelleri" },
      { name: "Konteyner Paneli", link: "/urunler/hekim-panel/konteyner-paneli" },
    ],
  },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [expandedMobileItems, setExpandedMobileItems] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [showAdminDropdown, setShowAdminDropdown] = useState(false)
  const adminDropdownRef = useRef(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)

    // Admin durumunu kontrol et
    const adminStatus = localStorage.getItem("isAdmin") === "true"
    setIsAdmin(adminStatus)

    // Admin dropdown dışında bir yere tıklandığında dropdown'ı kapat
    const handleClickOutside = (event) => {
      if (adminDropdownRef.current && !adminDropdownRef.current.contains(event.target)) {
        setShowAdminDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleMobileItem = (item) => {
    if (expandedMobileItems.includes(item)) {
      setExpandedMobileItems(expandedMobileItems.filter((i) => i !== item))
    } else {
      setExpandedMobileItems([...expandedMobileItems, item])
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("isAdmin")
    setIsAdmin(false)
    setShowAdminDropdown(false)
    alert("Başarıyla çıkış yapıldı.")
    window.location.reload()
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-black/90" : "bg-black/70"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img src="/placeholder.svg?height=50&width=150&text=LOGO" alt="Logo" className="h-12" />
          </Link>

          {/* Desktop Navigation - Ortalandı */}
          <nav className="hidden lg:flex items-center space-x-8 mx-auto">
            <NavItem href="/" label="Ana Sayfa" active={pathname === "/"} />
            <div className="relative group">
              <NavItem
                href="/urunler"
                label={
                  <div className="flex items-center">
                    Ürünler <ChevronDown className="ml-1 h-4 w-4" />
                  </div>
                }
                active={pathname.startsWith("/urunler")}
              />

              {/* Mega Menu - Boyutu küçültüldü */}
              <div className="absolute left-0 mt-2 w-[600px] bg-white shadow-lg rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 max-h-[400px] overflow-y-auto">
                <div className="p-6">
                  {productCategories.map((category, idx) => (
                    <div key={idx} className="mb-6 last:mb-0">
                      <div className="flex items-center mb-3">
                        <img
                          src={category.image || "/placeholder.svg"}
                          alt={category.title}
                          className="h-10 object-contain"
                        />
                      </div>
                      <div className="border-t border-red-500 pt-2">
                        {category.items.map((item, itemIdx) => (
                          <Link
                            key={itemIdx}
                            href={item.link}
                            className="text-gray-600 hover:text-red-600 transition-colors duration-200 block py-1"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <NavItem href="/projeler" label="Projeler" active={pathname === "/projeler"} />
            <NavItem href="/hakkimizda" label="Hakkımızda" active={pathname === "/hakkimizda"} />
            <NavItem href="/iletisim" label="İletişim" active={pathname === "/iletisim"} />
          </nav>

          <div className="flex items-center">
            {/* Call Us Section - Üç çizginin soluna taşındı */}
            <div className="hidden lg:flex items-center text-white mr-6">
              <Phone className="h-5 w-5 mr-2 text-red-500" />
              <div>
                <div className="text-sm font-medium">7/24 Bizi Arayın</div>
                <div className="text-lg font-bold">0212 123 45 67</div>
              </div>
            </div>

            {/* Admin Badge with Dropdown */}
            {isAdmin && (
              <div className="hidden lg:block relative" ref={adminDropdownRef}>
                <button
                  onClick={() => setShowAdminDropdown(!showAdminDropdown)}
                  className="bg-red-600 text-white px-3 py-1 rounded-md font-medium mr-4 hover:bg-red-700 transition-colors duration-300 flex items-center"
                >
                  ADMIN
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>

                {/* Admin Dropdown */}
                {showAdminDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Çıkış Yap
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button - z-index değeri artırıldı */}
            <button className="text-white relative z-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Fotoğraftaki gibi düzenlendi */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-br from-neutral-800 via-neutral-500 to-neutral-800 min-h-screen text-white transform transition-transform duration-300 ease-in-out z-40 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Kapatma butonu ve logo */}
          <div className="flex justify-between items-start mb-6">
            <div className="w-48">
              <img src="/images/plt-yapi-logo.png?height=80&width=200&text=LOGO" alt="Logo" className="w-full" />
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="text-white">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Admin Badge - Mobile */}
          {isAdmin && (
            <div className="flex justify-between items-center mb-4">
              <div className="bg-red-600 text-white px-3 py-1 rounded-md font-medium inline-block">ADMIN</div>
              <button
                onClick={handleLogout}
                className="flex items-center text-white hover:text-red-300 transition-colors duration-300"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Çıkış Yap
              </button>
            </div>
          )}

          {/* Mobil Menü Öğeleri */}
          <div className="space-y-1 mb-6">
            <Link
              href="/"
              className="block py-3 px-2 text-white hover:bg-white/10 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              ANASAYFA
            </Link>

            <div>
              <Link
                href="/hakkimizda"
                className="block py-3 px-2 text-white hover:bg-white/10 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                KURUMSAL
              </Link>
            </div>

            <div>
              <div
                className="flex justify-between items-center py-3 px-2 text-white hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                onClick={() => toggleMobileItem("urunler")}
              >
                <span>ÜRÜNLER</span>
                <ChevronRight
                  className={`h-5 w-5 transition-transform duration-200 ${
                    expandedMobileItems.includes("urunler") ? "rotate-90" : ""
                  }`}
                />
              </div>

              {expandedMobileItems.includes("urunler") && (
                <div className="pl-4 space-y-1 mt-1">
                  <Link
                    href="/urunler"
                    className="block py-2 px-2 text-white/80 hover:bg-white/10 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Tüm Ürünler
                  </Link>
                  {productCategories.map((category, idx) => (
                    <Link
                      key={idx}
                      href={category.link}
                      className="block py-2 px-2 text-white/80 hover:bg-white/10 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/projeler"
              className="block py-3 px-2 text-white hover:bg-white/10 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              PROJELER
            </Link>

            <Link
              href="/iletisim"
              className="block py-3 px-2 text-white hover:bg-white/10 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              İLETİŞİM
            </Link>
          </div>

          {/* Google Maps */}
          <div className="mb-6 rounded-lg overflow-hidden h-56">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.9533631421576!2d28.979697!3d41.037183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7650656bd63%3A0x8ca058b28c20b6c3!2zVGFrc2ltIE1leWRhbsSxLCBHw7xtw7zFn3N1eXUsIDM0NDM1IEJleW_En2x1L8Swc3RhbmJ1bA!5e0!3m2!1str!2str!4v1620000000000!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* İletişim Bilgileri */}
          <div className="mt-5">
            <h3 className="text-xl font-bold mb-4 border-b border-gray-600 pb-2">İletişim Bilgileri</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-red-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-300">Örnek Mahallesi, Örnek Caddesi No:123, İstanbul, Türkiye</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                <span className="text-gray-300">0212 123 45 67</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                <span className="text-gray-300">info@boyamalzemeleri.com</span>
              </li>
            </ul>

            {/* Sosyal Medya İkonları */}
            <div className="flex space-x-2 mt-6">
              <a
                href="#"
                className="bg-red-600 text-white p-2 rounded-sm hover:bg-red-700 transition-colors duration-300"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="bg-red-600 text-white p-2 rounded-sm hover:bg-red-700 transition-colors duration-300"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="bg-red-600 text-white p-2 rounded-sm hover:bg-red-700 transition-colors duration-300"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a
                href="#"
                className="bg-red-600 text-white p-2 rounded-sm hover:bg-red-700 transition-colors duration-300"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="#"
                className="bg-red-600 text-white p-2 rounded-sm hover:bg-red-700 transition-colors duration-300"
              >
                <span className="sr-only">YouTube</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && <div className="fixed inset-0 bg-black/50 z-30" onClick={() => setIsMenuOpen(false)}></div>}
    </header>
  )
}

function NavItem({ href, label, active }) {
  return (
    <Link href={href} className={`relative text-white font-medium py-2 group`}>
      <span>{typeof label === "string" ? label : label}</span>
      <span
        className={`absolute bottom-0 left-0 w-0 h-0.5 bg-[#ff6900] transition-all duration-300 ${active ? "w-full" : "group-hover:w-full"}`}
      ></span>
    </Link>
  )
}
