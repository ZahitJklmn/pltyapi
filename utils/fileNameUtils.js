/**
 * Dosya ismini Supabase Storage için güvenli hale getirir
 * - Türkçe karakterleri İngilizce karşılıklarına çevirir
 * - Boşlukları ve özel karakterleri temizler
 * - Dosya uzantısını korur
 */
export function sanitizeFileName(fileName) {
    if (!fileName) return "unnamed-file"
  
    // Dosya uzantısını ayır
    const lastDotIndex = fileName.lastIndexOf(".")
    const name = lastDotIndex > 0 ? fileName.substring(0, lastDotIndex) : fileName
    const extension = lastDotIndex > 0 ? fileName.substring(lastDotIndex) : ""
  
    // Türkçe karakter dönüşüm tablosu
    const turkishToEnglish = {
      ç: "c",
      Ç: "C",
      ğ: "g",
      Ğ: "G",
      ı: "i",
      I: "I",
      İ: "I",
      i: "i",
      ö: "o",
      Ö: "O",
      ş: "s",
      Ş: "S",
      ü: "u",
      Ü: "U",
      â: "a",
      Â: "A",
      î: "i",
      Î: "I",
      û: "u",
      Û: "U",
    }
  
    // Dosya ismini temizle
    let cleanName = name
      // Türkçe karakterleri değiştir
      .split("")
      .map((char) => turkishToEnglish[char] || char)
      .join("")
      // Özel karakterleri ve boşlukları temizle
      .replace(/[^a-zA-Z0-9.-]/g, "_")
      // Birden fazla alt çizgiyi tek alt çizgiye çevir
      .replace(/_+/g, "_")
      // Başındaki ve sonundaki alt çizgileri kaldır
      .replace(/^_+|_+$/g, "")
      // Küçük harfe çevir
      .toLowerCase()
  
    // Eğer isim boş kaldıysa varsayılan isim ver
    if (!cleanName) {
      cleanName = "unnamed-file"
    }
  
    return cleanName + extension.toLowerCase()
  }
  
  /**
   * Benzersiz dosya ismi oluşturur
   */
  export function generateUniqueFileName(originalFileName, index = null, timestamp = null) {
    const cleanFileName = sanitizeFileName(originalFileName)
    const currentTimestamp = timestamp || new Date().getTime()
  
    if (index !== null) {
      // Proje görselleri için: projects/timestamp_index_filename
      return `projects/${currentTimestamp}_${index + 1}_${cleanFileName}`
    }
  
    // Genel kullanım için: timestamp_filename
    return `${currentTimestamp}_${cleanFileName}`
  }
  
  /**
   * Dosya boyutunu kontrol eder (MB cinsinden)
   */
  export function validateFileSize(file, maxSizeMB = 5) {
    const fileSizeMB = file.size / (1024 * 1024)
    return fileSizeMB <= maxSizeMB
  }
  
  /**
   * Dosya tipini kontrol eder
   */
  export function validateFileType(file, allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]) {
    return allowedTypes.includes(file.type)
  }
  