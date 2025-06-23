import Link from 'next/link';

export default function NotFound() {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-neutral-800 to-black text-white px-4 text-center select-none">
        <div className='flex items-center'>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <div className="w-px h-24 bg-gray-300 mx-10"></div>
        <p className="text-xl mb-4">Üzgünüz, aradığınız sayfa bulunamadı.</p>
        </div>
        <Link
            href="/"
            className="mt-20 text-center bg-gradient-to-r from-indigo-600 to-indigo-900 text-white px-7 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:brightness-125 hover:scale-105 shadow-lg"
          >
            Anasayfaya Dön
          </Link>
      </div>
    );
  }
  