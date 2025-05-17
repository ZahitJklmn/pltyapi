"use client"
import { useState } from "react"
import { getSupabaseClient } from "@/lib/supabase"

export default function SupabaseTest() {
  const [testResult, setTestResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const testConnection = async () => {
    setIsLoading(true)
    setTestResult(null)

    try {
      // Supabase client'ı al
      const supabase = getSupabaseClient()

      if (!supabase) {
        throw new Error("Supabase client oluşturulamadı")
      }

      // Basit bir sorgu dene
      const { data, error } = await supabase.from("brands").select("count").limit(1)

      if (error) {
        throw error
      }

      // Başarılı sonuç
      setTestResult({
        success: true,
        message: "Supabase bağlantısı başarılı!",
        data: data,
      })
    } catch (error) {
      console.error("Supabase test hatası:", error)

      // Hata detaylarını göster
      setTestResult({
        success: false,
        message: "Supabase bağlantı hatası",
        error: error.message || JSON.stringify(error),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Supabase Bağlantı Testi</h2>

      <button
        onClick={testConnection}
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {isLoading ? "Test Ediliyor..." : "Bağlantıyı Test Et"}
      </button>

      {testResult && (
        <div
          className={`mt-4 p-3 rounded ${testResult.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
          <p className="font-medium">{testResult.message}</p>
          {testResult.success ? (
            <pre className="mt-2 text-sm">{JSON.stringify(testResult.data, null, 2)}</pre>
          ) : (
            <p className="mt-2 text-sm">{testResult.error}</p>
          )}
        </div>
      )}
    </div>
  )
}
