"use client"
import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Menu, X, ChevronDown, Phone, MapPin, Mail, ChevronRight, LogOut, MessageSquare } from "lucide-react"
import { useAuth } from "./auth/AuthProvider"


// Ürünler menüsünü markalar şeklinde değiştirmek için productCategories değişkenini güncelliyorum
const productCategories = [
  {
    title: "",
    image: "/images/jotun-logo.png?height=80&width=150&text=JOTUN",
    link: "/urunler/jotun",
    items: [
      { name: "İç Cephe Ürünleri", link: "/urunler/jotun/ic-cephe-urunleri" },
      { name: "Dış Cephe Ürünleri", link: "/urunler/jotun/dis-cephe-urunleri" },
      { name: "Dış Cephe Renk Koleksiyonları", link: "/urunler/jotun/renk-koleksiyonlari" },
    ],
  },
  {
    title: "",
    image: "/images/mapei-logo.png?height=80&width=150&text=MAPEI",
    link: "/urunler/mapei",
    items: [
      { name: "İç Cephe Boyaları", link: "/urunler/mapei/" },
      { name: "Dış Cephe Boyaları", link: "/urunler/mapei/" },
      { name: "Metal Boyaları", link: "/urunler/mapei/" },
    ],
  },
  {
    title: "Tepe Betopan",
    image: "/images/tepe-betopan-logo.png?height=80&width=150&text=TEPE+BETOPAN",
    link: "/urunler/tepe-betopan",
    items: [
      { name: "İç Cephe Boyaları", link: "/urunler/marshall/ic-cephe-boyalari" },
      { name: "Dış Cephe Boyaları", link: "/urunler/marshall/dis-cephe-boyalari" },
      { name: "Ahşap Boyaları", link: "/urunler/marshall/ahsap-boyalari" },
    ],
  },
  {
    title: "Tepepan",
    image: "/images/tepepan-logo.png?height=80&width=150&text=TEPEPAN",
    link: "/urunler/tepepan",
    items: [
      { name: "Çatı Panelleri", link: "/urunler/hekim-panel/cati-panelleri" },
      { name: "Cephe Panelleri", link: "/urunler/hekim-panel/cephe-panelleri" },
      { name: "Konteyner Paneli", link: "/urunler/hekim-panel/konteyner-paneli" },
    ],
  },
  {
    title: "",
    image: "/images/bianca-logo.png?height=80&width=150&text=BIANCA+STELLA",
    link: "/urunler/bianca",
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
  const [showAdminDropdown, setShowAdminDropdown] = useState(false)
  const adminDropdownRef = useRef(null)
  const pathname = usePathname()
  const { user, isAdmin, signOut } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    

    window.addEventListener("scroll", handleScroll)

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

  const handleLogout = async () => {
    const { error } = await signOut()
    if (error) {
      console.error("Çıkış hatası:", error)
      alert("Çıkış yapılırken bir hata oluştu.")
    } else {
      setShowAdminDropdown(false)
    }
  }

  return (
    <header
      className={`select-none fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-gradient-to-b from-black to-black/5" : "bg-neutral-500 transition-transform duration-500  "}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <div className="relative">
              <img
                src="/images/plt-yapi-logo-beyaz.png?height=50&width=150&text=LOGO"
                alt="Logo"
                className="h-12 transition-all duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </Link>

          {/* Desktop Navigation - Ortalandı */}
          <nav className="hidden lg:flex items-center space-x-8 mx-auto">
            <NavItem href="/" label="Ana Sayfa" active={pathname === "/"} />
            <div className="relative group">
              <NavItem
                href="/urunler"
                label={
                  <div className="flex items-center">
                    Ürünler <ChevronDown className="ml-1 h-10 w-4 transition-transform group-hover:rotate-180" />
                  </div>
                }
                active={pathname.startsWith("/urunler")}
              />

              {/* Mega Menu - Modern tasarım */}
              <div className="absolute left-0 mt-0.5 w-[700px] bg-gradient-to-br from-neutral-900 via-neutral-600 to-neutral-900 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 z-50 max-h-[400px] overflow-y-auto">
                <div className="p-8">
                  <div className="grid grid-cols-2 gap-8">
                    {productCategories.map((category, idx) => (
                      <div key={idx} className="group/item">
                      <Link
                      href={category.link} className="block text-white hover:text-orange-400 transition-all duration-200 mb-4" title={category.title} draggable="false"
                      >
                        <div className="flex items-center mb-4 p-3 rounded-xl bg-gradient-to-r from-white/5 to-transparent hover:from-orange-500/10 hover:to-red-600/10 transition-all duration-300">

                          <img
                            src={category.image || "/placeholder.svg"}
                            alt={category.title}
                            className="h-8 object-contain mr-3"
                          />
                          <h3 className="text-white font-bold text-lg">{category.title}</h3>
                        </div>
                      </Link>
                        <div className="space-y-2 ml-4">
                          {category.items.map((item, itemIdx) => (
                            <Link
                              key={itemIdx}
                              href={item.link}
                              className="block text-gray-300 hover:text-orange-400 transition-all duration-200 py-1 px-2 rounded-lg hover:bg-white/5 text-sm"
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
            </div>
            <NavItem href="/projeler" label="Projeler" active={pathname === "/projeler"} />
            <NavItem href="/hakkimizda" label="Hakkımızda" active={pathname === "/hakkimizda"} />
            <NavItem href="/iletisim" label="İletişim" active={pathname === "/iletisim"} />
            {isAdmin && (
              <NavItem
                href="/istekler"
                label={
                  <div className="flex items-center">
                    İstekler
                  </div>
                }
                active={pathname.startsWith("/istekler")}
              />
            )}
          </nav>

          <div className="flex items-center">
            {/* Call Us Section - Modern tasarım */}
            <div className="hidden lg:flex items-center text-white mr-6">
              <Link
              href={"tel:02121234567"}
              >
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mr-3">
                <Phone className="h-5 w-5" />
              </div>
              </Link>
              <div>
                <div className="text-xs text-gray-300 font-medium">7/24 Bizi Arayın</div>
                <div className="text-lg font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  0212 123 45 67
                </div>
              </div>
            </div>

            {/* Admin Badge with Dropdown */}
            {isAdmin && (
              <div className="hidden lg:block relative" ref={adminDropdownRef}>
                <button
                  onClick={() => setShowAdminDropdown(!showAdminDropdown)}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center shadow-lg hover:shadow-green-500/25 hover:scale-105 mr-4"
                >
                  ADMIN
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>

                {showAdminDropdown && (
  <div className="absolute right-0 mt-2 w-48 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50">
    <div className="py-2">
      <button
        onClick={handleLogout}
        className="flex items-center px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 w-full text-left transition-all duration-200"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Çıkış Yap
      </button>
        <Link
        href={'/istekler'}
        className="flex items-center px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 w-full text-left transition-all duration-200"
        >
        <MessageSquare className="h-4 w-4 mr-2" /> İstekler
        </Link>
    </div>
  </div>
)}


              </div>
            )}

            {/* Mobile Menu Button - Orijinal yapı korundu */}
            <button
              className="text-white w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

        {/* Mobile Menu - Modern tasarım */}
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-br from-neutral-900 via-neutral-600 to-neutral-900 backdrop-blur-xl border-l border-white/10 text-white transform transition-transform duration-500 ease-out z-50 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 flex flex-col h-full overflow-y-auto">
            {/* Kapatma butonu ve logo */}
            <div className="flex justify-between items-start mb-8">
              <div className="w-48">
                <img src="/images/plt-yapi-logo-beyaz.png?height=80&width=200&text=LOGO" alt="Logo" className="w-full rounded-sm" draggable="false" />
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Admin Badge - Mobile */}
            {isAdmin && (
              <div className="flex justify-between items-center mb-6 p-4 bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-xl border border-green-500/30">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full font-medium text-sm">
                  ADMIN
                </div>
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
            <div className="space-y-2 mb-8">
              <div>
                <div
                  className="flex justify-between items-center py-4 px-4 text-white hover:bg-white/10 transition-all duration-300 cursor-pointer rounded-xl"
                  onClick={() => toggleMobileItem("urunler")}
                >
                  <span className="font-medium">ÜRÜNLER</span>
                  <ChevronRight
                    className={`h-5 w-5 transition-transform duration-300 ${
                      expandedMobileItems.includes("urunler") ? "rotate-90" : ""
                    }`}
                  />
                </div>

                {expandedMobileItems.includes("urunler") && (
                  <div className="pl-4 space-y-1 mt-2 bg-white/5 rounded-xl p-3">
                    <Link
                      href="/urunler"
                      className="block py-2 px-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 rounded-lg text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Tüm Ürünler
                    </Link>
                    {productCategories.map((category, idx) => (
                      <Link
                        key={idx}
                        href={category.link}
                        className="block py-2 px-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 rounded-lg text-sm"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <MobileNavItem href="/projeler" label="PROJELER" onClick={() => setIsMenuOpen(false)} />
              <MobileNavItem href="/hakkimizda" label="HAKKIMIZDA" onClick={() => setIsMenuOpen(false)} />
              <MobileNavItem href="/iletisim" label="İLETİŞİM" onClick={() => setIsMenuOpen(false)} />
              {isAdmin && (
                <MobileNavItem
                  href="/istekler"
                  label={
                    <div className="flex items-center">
                      İSTEKLER
                      <MessageSquare className="h-4 w-4 ml-2" />
                    </div>
                  }
                  onClick={() => setIsMenuOpen(false)}
                />
              )}

          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3041.4821996920773!2d36.5446746!3d40.331648!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x407db75a72a89f95%3A0x69af5028f6bdacbd!2sPLT%20YAPI%20S%C4%B0STEMLER%C4%B0%20-%20JOTUN%20BOYA%20SATI%C5%9E%20MA%C4%9EAZASI!5e0!3m2!1str!2str!4v1749754342474!5m2!1str!2str" 
            width="253" 
            height="250" 
            style={{ border: 0, borderRadius: '8px', pointerEvents: 'revert' }}
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
            </div>
                  
            {/* İletişim Bilgileri */}
            <div className="mt-auto">
              <h3 className="text-xl font-bold mb-4 bg-white bg-clip-text text-transparent">
                İletişim Bilgileri
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start p-3 bg-white/5 rounded-xl">
                  <MapPin className="h-4 w-4 text-orange-400 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">Bosna Cd 27, Yeşilırmak Mh., Tokat, Türkiye</span>
                </div>
                <div className="flex items-center p-3 bg-white/5 rounded-xl">
                <Link
                className="flex items-center text-gray-300 hover:text-orange-400 transition-all duration-300"
                href={"tel:03562125660"}
                >
                  <Phone className="h-4 w-4 text-orange-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-300 hover:text-orange-400 transition-all duration-300">(0356) 212 56 60</span>
                </Link>
                </div>
                <div className="flex items-center p-3 bg-white/5 rounded-xl">
                  <Mail className="h-4 w-4 text-orange-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-300">pltyapitokat@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setIsMenuOpen(false)}></div>
      )}
    </header>
  )
}

function NavItem({ href, label, active }) {
  return (
    <Link
      href={href}
      className={`relative text-white font-medium py-2 group transition-all duration-300 ${
        active ? "text-orange-400" : "hover:text-orange-400"
      }`}
    >
      <span>{typeof label === "string" ? label : label}</span>
      <span
        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-600 transition-all duration-300 ${
          active ? "w-full" : "w-0 group-hover:w-full"
        }`}
      ></span>
    </Link>
  )
}

function MobileNavItem({ href, label, onClick }) {
  return (
    <Link
      href={href}
      className="block py-4 px-4 text-white hover:bg-white/10 transition-all duration-300 rounded-xl font-medium"
      onClick={onClick}
    >
      {typeof label === "string" ? label : label}
    </Link>
  )
}
