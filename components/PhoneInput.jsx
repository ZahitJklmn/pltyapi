"use client"
import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

const countries = [
  {
    code: "TR",
    name: "Türkiye",
    dialCode: "+90",
    flag: "🇹🇷", // Emoji fallback
    flagImage: "/flags/tr.png", // Gerçek bayrak resmi yolu
    format: "XXX XXX XX XX",
    maxLength: 10,
    placeholder: "555 123 45 67",
  },
  {
    code: "US",
    name: "Amerika Birleşik Devletleri",
    dialCode: "+1",
    flag: "🇺🇸",
    flagImage: "/flags/us.png",
    format: "(XXX) XXX-XXXX",
    maxLength: 10,
    placeholder: "(555) 123-4567",
  },
  {
    code: "GB",
    name: "Birleşik Krallık",
    dialCode: "+44",
    flag: "🇬🇧",
    flagImage: "/flags/gb.png",
    format: "XXXX XXX XXXX",
    maxLength: 10,
    placeholder: "7911 123456",
  },
  {
    code: "DE",
    name: "Almanya",
    dialCode: "+49",
    flag: "🇩🇪",
    flagImage: "/flags/de.png",
    format: "XXX XXXXXXX",
    maxLength: 11,
    placeholder: "151 12345678",
  },
  {
    code: "FR",
    name: "Fransa",
    dialCode: "+33",
    flag: "🇫🇷",
    flagImage: "/flags/fr.png",
    format: "X XX XX XX XX",
    maxLength: 9,
    placeholder: "6 12 34 56 78",
  },
  {
    code: "IT",
    name: "İtalya",
    dialCode: "+39",
    flag: "🇮🇹",
    flagImage: "/flags/it.png",
    format: "XXX XXX XXXX",
    maxLength: 10,
    placeholder: "312 345 6789",
  },
  {
    code: "ES",
    name: "İspanya",
    dialCode: "+34",
    flag: "🇪🇸",
    flagImage: "/flags/es.png",
    format: "XXX XX XX XX",
    maxLength: 9,
    placeholder: "612 34 56 78",
  },
  {
    code: "NL",
    name: "Hollanda",
    dialCode: "+31",
    flag: "🇳🇱",
    flagImage: "/flags/nl.png",
    format: "X XXXX XXXX",
    maxLength: 9,
    placeholder: "6 1234 5678",
  },
  {
    code: "CA",
    name: "Kanada",
    dialCode: "+1",
    flag: "🇨🇦",
    flagImage: "/flags/ca.png",
    format: "(XXX) XXX-XXXX",
    maxLength: 10,
    placeholder: "(416) 123-4567",
  },
  {
    code: "AU",
    name: "Avustralya",
    dialCode: "+61",
    flag: "🇦🇺",
    flagImage: "/flags/au.png",
    format: "XXXX XXX XXX",
    maxLength: 9,
    placeholder: "0412 345 678",
  },
]

// Bayrak komponenti - resim yoksa emoji gösterir
const FlagDisplay = ({ country, size = "sm" }) => {
  const [imageError, setImageError] = useState(false)

  const sizeClasses = {
    sm: "w-5 h-4",
    md: "w-6 h-5",
    lg: "w-8 h-6",
  }

  // Eğer resim yükleme hatası varsa veya resim yoksa emoji göster
  if (imageError || !country.flagImage) {
    return <span className={`text-${size === "sm" ? "sm" : size === "md" ? "base" : "lg"}`}>{country.flag}</span>
  }

  return (
    <div className={`${sizeClasses[size]} relative overflow-hidden border border-gray-200`}>
      <Image
        src={country.flagImage || "/placeholder.svg"}
        alt={`${country.name} bayrağı`}
        fill
        className="object-cover"
        onError={() => setImageError(true)}
        sizes="32px"
      />
    </div>
  )
}

export default function PhoneInput({ value, onChange, error, required = false }) {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]) // Türkiye default
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Value değiştiğinde parse et
  useEffect(() => {
    if (value) {
      // Mevcut değeri parse et
      const country = countries.find((c) => value.startsWith(c.dialCode))
      if (country) {
        setSelectedCountry(country)
        setPhoneNumber(value.replace(country.dialCode, "").trim())
      }
    }
  }, [])

  // Telefon numarasını formatla
  const formatPhoneNumber = (number, country) => {
    // Sadece rakamları al
    const digits = number.replace(/\D/g, "")

    // Maksimum uzunluğu kontrol et
    const limitedDigits = digits.slice(0, country.maxLength)

    let formatted = ""

    switch (country.code) {
      case "TR":
        // XXX XXX XX XX
        if (limitedDigits.length > 0) formatted += limitedDigits.slice(0, 3)
        if (limitedDigits.length > 3) formatted += " " + limitedDigits.slice(3, 6)
        if (limitedDigits.length > 6) formatted += " " + limitedDigits.slice(6, 8)
        if (limitedDigits.length > 8) formatted += " " + limitedDigits.slice(8, 10)
        break

      case "US":
      case "CA":
        // (XXX) XXX-XXXX
        if (limitedDigits.length > 0) formatted += "(" + limitedDigits.slice(0, 3)
        if (limitedDigits.length > 3) formatted += ") " + limitedDigits.slice(3, 6)
        if (limitedDigits.length > 6) formatted += "-" + limitedDigits.slice(6, 10)
        break

      case "GB":
        // XXXX XXX XXXX
        if (limitedDigits.length > 0) formatted += limitedDigits.slice(0, 4)
        if (limitedDigits.length > 4) formatted += " " + limitedDigits.slice(4, 7)
        if (limitedDigits.length > 7) formatted += " " + limitedDigits.slice(7, 11)
        break

      case "DE":
        // XXX XXXXXXX
        if (limitedDigits.length > 0) formatted += limitedDigits.slice(0, 3)
        if (limitedDigits.length > 3) formatted += " " + limitedDigits.slice(3, 11)
        break

      case "FR":
        // X XX XX XX XX
        if (limitedDigits.length > 0) formatted += limitedDigits.slice(0, 1)
        if (limitedDigits.length > 1) formatted += " " + limitedDigits.slice(1, 3)
        if (limitedDigits.length > 3) formatted += " " + limitedDigits.slice(3, 5)
        if (limitedDigits.length > 5) formatted += " " + limitedDigits.slice(5, 7)
        if (limitedDigits.length > 7) formatted += " " + limitedDigits.slice(7, 9)
        break

      case "IT":
        // XXX XXX XXXX
        if (limitedDigits.length > 0) formatted += limitedDigits.slice(0, 3)
        if (limitedDigits.length > 3) formatted += " " + limitedDigits.slice(3, 6)
        if (limitedDigits.length > 6) formatted += " " + limitedDigits.slice(6, 10)
        break

      case "ES":
        // XXX XX XX XX
        if (limitedDigits.length > 0) formatted += limitedDigits.slice(0, 3)
        if (limitedDigits.length > 3) formatted += " " + limitedDigits.slice(3, 5)
        if (limitedDigits.length > 5) formatted += " " + limitedDigits.slice(5, 7)
        if (limitedDigits.length > 7) formatted += " " + limitedDigits.slice(7, 9)
        break

      case "NL":
        // X XXXX XXXX
        if (limitedDigits.length > 0) formatted += limitedDigits.slice(0, 1)
        if (limitedDigits.length > 1) formatted += " " + limitedDigits.slice(1, 5)
        if (limitedDigits.length > 5) formatted += " " + limitedDigits.slice(5, 9)
        break

      case "AU":
        // XXXX XXX XXX
        if (limitedDigits.length > 0) formatted += limitedDigits.slice(0, 4)
        if (limitedDigits.length > 4) formatted += " " + limitedDigits.slice(4, 7)
        if (limitedDigits.length > 7) formatted += " " + limitedDigits.slice(7, 10)
        break

      default:
        formatted = limitedDigits
    }

    return formatted
  }

  // Telefon numarası değiştiğinde
  const handlePhoneChange = (e) => {
    const newNumber = e.target.value
    const formatted = formatPhoneNumber(newNumber, selectedCountry)
    setPhoneNumber(formatted)

    // Parent'a tam numarayı gönder
    const fullNumber = formatted ? `${selectedCountry.dialCode} ${formatted}` : ""
    onChange(fullNumber)
  }

  // Ülke değiştiğinde
  const handleCountryChange = (country) => {
    setSelectedCountry(country)
    setIsDropdownOpen(false)

    // Mevcut numarayı yeni formata çevir
    const digits = phoneNumber.replace(/\D/g, "")
    const formatted = formatPhoneNumber(digits, country)
    setPhoneNumber(formatted)

    // Parent'a tam numarayı gönder
    const fullNumber = formatted ? `${country.dialCode} ${formatted}` : ""
    onChange(fullNumber)
  }

  // Validasyon
  const isValid = () => {
    const digits = phoneNumber.replace(/\D/g, "")
    return digits.length >= selectedCountry.maxLength
  }

  return (
    <div className="relative">
      <div
        className={`flex border ${error ? "border-red-500" : "border-gray-300"} rounded-md focus-within:ring-2 focus-within:ring-red-500 focus-within:border-red-500`}
      >
        {/* Ülke Seçici */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center px-3 py-2 bg-gray-50 border-r border-gray-300 rounded-l-md hover:bg-gray-100 transition-colors duration-200 min-w-[130px]"
          >
            <FlagDisplay country={selectedCountry} size="sm" />
            <span className="text-sm font-medium text-gray-700 ml-2">{selectedCountry.dialCode}</span>
            <ChevronDown
              className={`h-4 w-4 ml-1 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 z-50 w-80 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {countries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountryChange(country)}
                  className="w-full flex items-center px-3 py-2 hover:bg-gray-100 transition-colors duration-200 text-left"
                >
                  <FlagDisplay country={country} size="md" />
                  <div className="flex-1 ml-3">
                    <div className="text-sm font-medium text-gray-900">{country.name}</div>
                    <div className="text-xs text-gray-500">{country.dialCode}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Telefon Numarası Input */}
        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder={selectedCountry.placeholder}
          className="flex-1 px-4 py-2 rounded-r-md focus:outline-none"
          required={required}
        />
      </div>

      {/* Yardımcı Metin */}
      <div className="mt-1 flex justify-between items-center">
        <div className="text-xs text-gray-500">Format: {selectedCountry.format.replace(/X/g, "0")}</div>
        <div className="text-xs text-gray-500">
          {phoneNumber.replace(/\D/g, "").length}/{selectedCountry.maxLength}
        </div>
      </div>

      {/* Hata Mesajı */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      {/* Validasyon Göstergesi */}
      {phoneNumber && (
        <div className="mt-1">
          {isValid() ? (
            <div className="text-xs text-green-600 flex items-center">
              <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Geçerli telefon numarası
            </div>
          ) : (
            <div className="text-xs text-orange-600 flex items-center">
              <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Eksik rakamlar var
            </div>
          )}
        </div>
      )}
    </div>
  )
}
