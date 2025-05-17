"use client"
import { useState, useRef } from "react"
import { getSupabaseClient } from "@/lib/supabase"

export default function TestStoragePage() {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState("")
  const [error, setError] = useState("")
  const [buckets, setBuckets] = useState([])
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)

  // Bucket listesini getir
  const fetchBuckets = async () => {
    setLoading(true)
    setError("")

    try {
      const supabase = getSupabaseClient()

      if (!supabase) {
        throw new Error("Supabase client oluşturulamadı")
      }

      const { data, error } = await supabase.storage.listBuckets()

      if (error) {
        throw error
      }

      setBuckets(data || [])
      console.log("Buckets:", data)
    } catch (err) {
      console.error("Bucket listesi alınamadı:", err)
      setError(`Bucket listesi alınamadı: ${err.message || JSON.stringify(err)}`)
    } finally {
      setLoading(false)
    }
  }

  // Dosya seçme
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError("")
    }
  }

  // Dosya yükleme
  const handleUpload = async () => {
    if (!file) {
      setError("Lütfen bir dosya seçin")
      return
    }

    setUploading(true)
    setError("")
    setUploadedUrl("")

    try {
      const supabase = getSupabaseClient()

      if (!supabase) {
        throw new Error("Supabase client oluşturulamadı")
      }

      // Dosyayı yükle
      const timestamp = new Date().getTime()
      const fileName = `test/${timestamp}_${file.name}`

      const { data, error } = await supabase.storage
        .from("product-images") // Bucket adı
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        })

      if (error) {
        throw error
      }

      // Yüklenen dosyanın URL'ini al
      const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(fileName)

      setUploadedUrl(urlData.publicUrl)
      console.log("Uploaded file:", urlData.publicUrl)
    } catch (err) {
      console.error("Dosya yükleme hatası:", err)
      setError(`Dosya yükleme hatası: ${err.message || JSON.stringify(err)}`)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-8">Supabase Storage Test</h1>

      {/* Bucket Listesi */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Bucket Listesi</h2>

        <button
          onClick={fetchBuckets}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors mb-4"
          disabled={loading}
        >
          {loading ? "Yükleniyor..." : "Bucket Listesini Getir"}
        </button>

        {buckets.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Mevcut Bucket'lar:</h3>
            <ul className="list-disc pl-5">
              {buckets.map((bucket) => (
                <li key={bucket.id} className="mb-1">
                  {bucket.name} {bucket.public ? "(Public)" : "(Private)"}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Dosya Yükleme */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Dosya Yükleme Testi</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Test Dosyası Seçin</label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className={`px-4 py-2 rounded font-medium ${
            !file || uploading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          } transition-colors`}
        >
          {uploading ? "Dosyayı Yükle..." : "Dosyayı Yükle"}
        </button>

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
            <p className="font-bold">Hata:</p>
            <p>{error}</p>
          </div>
        )}

        {uploadedUrl && (
          <div className="mt-4">
            <p className="font-semibold mb-2">Yüklenen Dosya:</p>
            <div className="bg-gray-100 p-3 rounded break-all">
              <a href={uploadedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {uploadedUrl}
              </a>
            </div>

            {uploadedUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) && (
              <div className="mt-4">
                <p className="font-semibold mb-2">Önizleme:</p>
                <img
                  src={uploadedUrl || "/placeholder.svg"}
                  alt="Yüklenen dosya"
                  className="max-w-full h-auto max-h-64 border rounded"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
