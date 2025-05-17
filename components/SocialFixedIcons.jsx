import { Phone, Instagram } from "lucide-react"

export default function SocialFixedIcons() {
  return (
    <div className="fixed left-4 bottom-4 z-40 flex flex-col space-y-3">
      <a
        href="tel:+905519661626"
        className="bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-800 transition-all duration-300"
        aria-label="Bizi arayın"
      >
        <Phone className="h-5 w-5" />
      </a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gradient-to-tr mt-10 from-purple-600 to-pink-500 text-white p-3 rounded-full shadow-lg hover:from-purple-800 hover:to-pink-700 transition-all duration-300"
        aria-label="Instagram sayfamızı ziyaret edin"
      >
        <Instagram className="h-5 w-5" />
      </a>
    </div>
  )
}
