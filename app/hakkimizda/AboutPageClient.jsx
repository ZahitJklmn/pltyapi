"use client"
import { useState } from "react"
import Link from "next/link"
import { Phone } from "lucide-react"

export default function AboutPageClient() {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="pt-24 pb-16 bg-gradient-to-br from-neutral-600 via-neutral-200 to-neutral-600">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-12">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/stock/about-us.webp?height=400&width=1200&text=Hakkımızda')" }}
          ></div>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Hakkımızda</h1>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="border border-black/30 border-dashed p-6 rounded-xl">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Firmamız</h2>
            <div className="space-y-4 text-gray-800">
              <p>
                Firmamız, 2003 yılında kurulmuş olup, boya ve boya malzemeleri sektöründe 20 yılı aşkın süredir faaliyet
                göstermektedir. Kurulduğumuz günden bu yana müşteri memnuniyetini ön planda tutarak, kaliteli ürün ve
                hizmet anlayışımızla sektörde öncü konuma gelmiş bulunmaktayız.
              </p>
              <p>
                İç cephe, dış cephe, ahşap ve metal boyaları başta olmak üzere, geniş ürün yelpazemiz ile hem bireysel
                hem de kurumsal müşterilerimizin ihtiyaçlarına cevap vermekteyiz. Alanında uzman kadromuz ile
                müşterilerimize en doğru ürünü sunmak için çalışıyoruz.
              </p>
              <p>
                Sektördeki gelişmeleri yakından takip ederek, ürün çeşitliliğimizi sürekli genişletiyor ve yenilikleri
                müşterilerimizle buluşturuyoruz. Kalite standartlarından ödün vermeden, uygun fiyat politikamızla her
                bütçeye uygun çözümler sunmaktayız.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            {/* Flip Card */}
            <div
              className="w-full h-[400px] perspective-1000 cursor-pointer"
              onMouseEnter={() => setIsFlipped(true)}
              onMouseLeave={() => setIsFlipped(false)}
            >
              <div
                className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? "rotate-y-180" : ""}`}
              >
                {/* Front Side */}
                <div className="absolute w-full h-full backface-hidden rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="/images/slide-1.jpg?height=500&width=600&text=Firmamız Ön"
                    alt="Firmamız"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Back Side */}
                <div className="absolute w-full h-full backface-hidden rounded-lg overflow-hidden shadow-lg rotate-y-180">
                  <img
                    src="/images/dukkan-adres.png?height=500&width=600&text=Firmamız Arka"
                    alt="Firmamız"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Misyon & Vizyon */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Misyonumuz</h3>
            <p className="text-gray-600">
              Müşterilerimize en kaliteli ürünleri sunmak, ihtiyaçlarına uygun çözümler üretmek ve sektörde güvenilir
              bir marka olmak. Çevreye duyarlı ürünleri tercih ederek, sürdürülebilir bir gelecek için katkıda bulunmak.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Vizyonumuz</h3>
            <p className="text-gray-600">
              Boya ve boya malzemeleri sektöründe lider konuma gelmek, yenilikçi ürünlerle müşteri memnuniyetini en üst
              seviyeye çıkarmak ve global pazarda söz sahibi olmak. Kalite ve güven denince akla gelen ilk marka olmak.
            </p>
          </div>
        </div>

        {/* Neden Biz */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Neden Bizi Tercih Etmelisiniz?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-600"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Kaliteli Ürünler</h3>
              <p className="text-gray-600">
                Sektörün önde gelen markalarının ürünlerini müşterilerimizle buluşturuyoruz. Kaliteden ödün vermiyoruz.
              </p>
              <Link
                href="/projeler"
                className="mx-10 mt-5 px-10 inline-block bg-gradient-to-r from-green-500 to-green-700 text-white py-3 rounded-full font-medium transition-all duration-300 hover:brightness-125 hover:scale-105 shadow-lg"
              >
                Projelerimiz
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-yellow-600"
  >
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </svg>
</div>

              <h3 className="text-xl font-bold mb-2 text-gray-800">Geniş Ürün Yelpazesi</h3>
              <p className="text-gray-600">
              İhtiyacınıza uygun onlarca farklı ürün seçeneği ile her türlü boya ve yapı malzemesi ihtiyacınızı karşılıyoruz.
              </p>
              <Link
                href="/urunler"
                className="mx-10 mt-5 px-10 inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-3 rounded-full font-medium transition-all duration-300 hover:brightness-125 hover:scale-105 shadow-lg"
              >
                Ürünlerimiz
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-red-600"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Teknik Destek</h3>
              <p className="text-gray-600">
                Uzman ekibimiz, ürünlerimiz hakkında her türlü teknik desteği sağlamaktadır. Sorularınız için bize
                ulaşabilirsiniz.
              </p>
              <Link
                href="/iletisim"
                className="inline-block mx-10 mt-5 px-9 bg-gradient-to-r from-red-400 to-red-600 text-white py-3 rounded-full font-medium transition-all duration-300 hover:brightness-125 hover:scale-105 shadow-lg"
              >
                <div className="flex">
                <Phone className="mr-3"/>İletişim
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
