import Link from "next/link"

export default function AboutSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-3xl font-bold mb-6">Hakkımızda</h2>
        <p className="text-gray-700 mb-4">
          Firmamız, 20 yılı aşkın süredir boya sektöründe faaliyet göstermektedir. Müşterilerimize en kaliteli ürünleri
          sunmak ve profesyonel çözümler üretmek için çalışıyoruz.
        </p>
        <p className="text-gray-700 mb-6">
          Geniş ürün yelpazemiz, uzman kadromuz ve müşteri memnuniyetine verdiğimiz önem ile sektörde öncü konumdayız.
          İç cephe, dış cephe, ahşap ve metal boyaları başta olmak üzere tüm boya ihtiyaçlarınız için yanınızdayız.
        </p>
        <Link
          href="/hakkimizda"
          className="inline-block bg-red-600 text-white px-6 py-3 rounded font-medium transition-all duration-300 hover:bg-red-700"
        >
          Daha Fazla Bilgi
        </Link>
      </div>
      <div className="rounded-lg overflow-hidden shadow-lg">
        <img
          src="/placeholder.svg?height=400&width=600&text=Hakkımızda"
          alt="Hakkımızda"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}
