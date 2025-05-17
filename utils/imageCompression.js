import imageCompression from "browser-image-compression"
import { getSupabaseClient } from "./supabaseClient" // Varsayılan olarak supabaseClient.js'den içe aktar

export const compressAndConvertToWebP = async (imageFile) => {
  try {
    // İlk olarak görüntüyü sıkıştır
    const options = {
      maxSizeMB: 1, // maksimum 1MB
      maxWidthOrHeight: 1920, // maksimum genişlik veya yükseklik
      useWebWorker: true,
      fileType: "image/webp", // WebP formatına dönüştür
    }

    const compressedFile = await imageCompression(imageFile, options)

    // Dosya adını .webp uzantısıyla güncelle
    const originalName = imageFile.name.split(".").slice(0, -1).join(".")
    const newFileName = `${originalName}.webp`

    // Yeni bir File nesnesi oluştur
    return new File([compressedFile], newFileName, { type: "image/webp" })
  } catch (error) {
    console.error("Görsel sıkıştırma hatası:", error)
    throw error
  }
}

// Supabase Storage'a görsel yükleme
export const uploadImageToSupabase = async (file, bucket = "product-images", folder = "") => {
  try {
    const supabase = getSupabaseClient()

    if (!supabase) {
      throw new Error("Supabase client oluşturulamadı")
    }

    // Benzersiz bir dosya adı oluştur
    const timestamp = new Date().getTime()
    const fileName = folder ? `${folder}/${timestamp}_${file.name}` : `${timestamp}_${file.name}`

    // Dosyayı yükle
    const { data, error } = await supabase.storage.from(bucket).upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (error) {
      console.error("Dosya yükleme hatası:", error)
      throw error
    }

    // Yüklenen dosyanın public URL'ini al
    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName)

    return urlData.publicUrl
  } catch (error) {
    console.error("Görsel yükleme hatası:", error)
    throw error
  }
}
