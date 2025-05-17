import { getSupabaseClient } from "@/lib/supabase"

/**
 * Görseli Supabase Storage'a yükler
 * @param {File} file - Yüklenecek dosya
 * @param {string} bucketName - Bucket adı
 * @param {string} folderPath - Klasör yolu (opsiyonel)
 * @returns {Promise<string>} - Yüklenen dosyanın public URL'i
 */
export async function uploadImageToSupabase(file, bucketName, folderPath = "") {
  if (!file) {
    throw new Error("Dosya belirtilmedi")
  }

  const supabase = getSupabaseClient()
  if (!supabase) {
    throw new Error("Supabase bağlantısı kurulamadı")
  }

  // Dosya adını oluştur
  const timestamp = new Date().getTime()
  const fileExtension = file.name.split(".").pop()
  const fileName = `${folderPath ? folderPath + "/" : ""}${timestamp}_${Math.random().toString(36).substring(2, 10)}.${fileExtension}`

  console.log(`Dosya yükleniyor: ${fileName} (${bucketName} bucket'ına)`)

  try {
    // Dosyayı yükle
    const { data, error } = await supabase.storage.from(bucketName).upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (error) {
      console.error("Dosya yükleme hatası:", error)
      throw error
    }

    console.log("Dosya başarıyla yüklendi:", data)

    // Public URL'i al
    const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(fileName)

    if (!urlData || !urlData.publicUrl) {
      throw new Error("Dosya URL'i alınamadı")
    }

    return urlData.publicUrl
  } catch (error) {
    console.error("Dosya yükleme işlemi başarısız:", error)
    throw error
  }
}
