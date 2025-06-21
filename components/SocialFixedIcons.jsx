import { Phone, Instagram, Facebook } from "lucide-react"

export default function SocialFixedIcons() {
  return (
    <div className="fixed left-4 bottom-4 z-40 flex flex-col space-y-3">
      <a
        href="tel:+905519661626"
        className="bg-gradient-to-tr from-red-700 to-red-500 text-white p-3 rounded-full shadow-lg hover:from-red-800 hover:to-red-600 transition-all duration-300"
        aria-label="Bizi arayın"
      >
        <Phone className="h-5 w-5" />
      </a>
      <a
        href="https://www.facebook.com/pltyapisistemleri/?locale=tr_TR"
        className="bg-gradient-to-tr mt-5 from-blue-700 to-blue-500 text-white p-3 rounded-full shadow-lg hover:from-blue-900 hover:to-blue-500 transition-all duration-300"
        aria-label="Bizi arayın"
      >
        <Facebook className="h-5 w-5" />
      </a>
      <a
        href="https://www.instagram.com/jotuntokat/"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gradient-to-tr mt-5 from-purple-700 to-pink-500 text-white p-3 rounded-full shadow-lg hover:from-purple-800 hover:to-pink-700 transition-all duration-300"
        aria-label="Instagram sayfamızı ziyaret edin"
      >
        <Instagram className="h-5 w-5" />
      </a>
    </div>
  )
}
