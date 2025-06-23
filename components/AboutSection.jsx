import Link from "next/link"

export default function AboutSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Hakkımızda</h2>
        <p className="text-gray-9 00 mb-4">
          Firmamız, 20 yılı aşkın süredir boya sektöründe faaliyet göstermektedir. Müşterilerimize en kaliteli ürünleri
          sunmak ve profesyonel çözümler üretmek için çalışıyoruz.
        </p>
        <p className="text-gray-900 mb-6">
          Geniş ürün yelpazemiz, uzman kadromuz ve müşteri memnuniyetine verdiğimiz önem ile sektörde öncü konumdayız.
          İç cephe, dış cephe, ahşap ve metal boyaları başta olmak üzere tüm boya ihtiyaçlarınız için yanınızdayız.
        </p>
        <div className="flex flex-wrap gap-4 mt-4">
          <Link
            href="/hakkimizda"
            className="flex-1 min-w-[140px] text-center bg-gradient-to-r from-blue-400 to-blue-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:brightness-125 hover:scale-105 shadow-lg"
          >
            Daha Fazla Bilgi
          </Link>

          <Link
            href="/projeler"
            className="flex-1 min-w-[140px] text-center bg-gradient-to-r from-orange-400 to-orange-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:brightness-125 hover:scale-105 shadow-lg"
          >
            Projelerimiz
          </Link>
        </div>
      </div>
      <div className="rounded-lg overflow-hidden shadow-lg">
        <img
          src="/images/slide-1.jpg?height=400&width=600&text=Hakkımızda"
          alt="Hakkımızda"
          className="w-full h-full object-cover"
          draggable="false"
        />
      </div>
    </div>
  )
}
