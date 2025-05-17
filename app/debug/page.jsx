"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { checkSupabaseEnv, getSupabaseClient } from "@/lib/supabase"

export default function DebugPage() {
  const [envStatus, setEnvStatus] = useState(null)
  const [connectionStatus, setConnectionStatus] = useState(null)
  const [testResult, setTestResult] = useState(null)
  const [envDetails, setEnvDetails] = useState({
    storedUrl: null,
    storedKey: null,
    envUrl: null,
    envKey: null,
  })

  useEffect(() => {
    // Çevre değişkenlerini kontrol et
    const envCheck = checkSupabaseEnv()
    setEnvStatus(envCheck)

    // Detaylı bilgileri topla
    if (typeof window !== "undefined") {
      setEnvDetails({
        storedUrl: localStorage.getItem("SUPABASE_URL") ? "Ayarlanmış" : "Eksik",
        storedKey: localStorage.getItem("SUPABASE_ANON_KEY") ? "Ayarlanmış" : "Eksik",
        envUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? "Ayarlanmış" : "Eksik",
        envKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Ayarlanmış" : "Eksik",
      })
    }

    // Supabase bağlantısını test et
    async function testConnection() {
      try {
        console.log("Supabase bağlantısı test ediliyor...")
        const supabase = getSupabaseClient()

        if (!supabase) {
          setConnectionStatus(false)
          setTestResult("Supabase client oluşturulamadı. Lütfen yapılandırma ayarlarınızı kontrol edin.")
          return
        }

        console.log("Supabase client oluşturuldu, sorgu yapılıyor...")

        // Basit bir sorgu deneyelim
        const { data, error } = await supabase.from("brands").select("count").limit(1)

        console.log("Sorgu sonucu:", { data, error })

        if (error) {
          setConnectionStatus(false)
          setTestResult(`Bağlantı hatası: ${error.message || JSON.stringify(error)}`)
        } else {
          setConnectionStatus(true)
          setTestResult("Bağlantı başarılı! Sorgu sonucu: " + JSON.stringify(data))

          // Tabloları kontrol edelim
          const tables = ["brands", "categories", "products"]
          const tableResults = {}

          for (const table of tables) {
            const { data: tableData, error: tableError } = await supabase.from(table).select("count").limit(1)

            tableResults[table] = {
              success: !tableError,
              message: tableError ? tableError.message : `${tableData?.length || 0} kayıt bulundu`,
            }
          }

          setTestResult((prev) => prev + "\n\nTablo kontrolleri: " + JSON.stringify(tableResults, null, 2))
        }
      } catch (err) {
        console.error("Test bağlantısı exception:", err)
        setConnectionStatus(false)
        setTestResult(`Test hatası: ${err.message || JSON.stringify(err)}`)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Supabase Debug Sayfası</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Çevre Değişkenleri Durumu</h2>
          <div className="flex items-center mb-4">
            <div
              className={`w-4 h-4 rounded-full mr-2 ${
                envStatus === null ? "bg-gray-400" : envStatus ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span>
              {envStatus === null
                ? "Kontrol ediliyor..."
                : envStatus
                  ? "Çevre değişkenleri ayarlanmış"
                  : "Çevre değişkenleri eksik"}
            </span>
          </div>

          <div className="mt-4 bg-gray-50 p-4 rounded-md">
            <h3 className="font-semibold mb-2">Detaylı Bilgi:</h3>
            <ul className="space-y-1 text-sm">
              <li>localStorage SUPABASE_URL: {envDetails.storedUrl}</li>
              <li>localStorage SUPABASE_ANON_KEY: {envDetails.storedKey}</li>
              <li>NEXT_PUBLIC_SUPABASE_URL: {envDetails.envUrl}</li>
              <li>NEXT_PUBLIC_SUPABASE_ANON_KEY: {envDetails.envKey}</li>
            </ul>
          </div>

          <div className="mt-4">
            <Link
              href="/env-setup"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors inline-block"
            >
              Çevre Değişkenlerini Yapılandır
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Supabase Bağlantı Durumu</h2>
          <div className="flex items-center">
            <div
              className={`w-4 h-4 rounded-full mr-2 ${
                connectionStatus === null ? "bg-gray-400" : connectionStatus ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span>
              {connectionStatus === null
                ? "Test ediliyor..."
                : connectionStatus
                  ? "Bağlantı başarılı"
                  : "Bağlantı başarısız"}
            </span>
          </div>
          {testResult && <p className="mt-2 text-sm">{testResult}</p>}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Yardım</h2>
          <p className="mb-4">
            Eğer çevre değişkenleri veya bağlantı ile ilgili sorunlar yaşıyorsanız, aşağıdaki adımları kontrol edin:
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <Link href="/env-setup" className="text-blue-600 hover:underline">
                Çevre Değişkenleri Yapılandırma
              </Link>{" "}
              sayfasını kullanarak Supabase bilgilerinizi ayarlayın.
            </li>
            <li>Supabase projenizin aktif olduğundan emin olun.</li>
            <li>Firewall veya ağ kısıtlamalarının Supabase'e erişimi engellemediğinden emin olun.</li>
            <li>
              Tarayıcı konsolunda ağ isteklerini kontrol edin ve Supabase API çağrılarında herhangi bir hata olup
              olmadığını görün.
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
