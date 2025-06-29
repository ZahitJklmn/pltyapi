"use client"
import { useState } from "react"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import PhoneInput from "@/components/PhoneInput"

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })

    // Hata mesajını temizle
    if (formErrors[id]) {
      setFormErrors({ ...formErrors, [id]: "" })
    }

    // Submit error'ı temizle
    if (submitError) {
      setSubmitError("")
    }
  }

  // Telefon numarası değişimi için ayrı handler
  const handlePhoneChange = (phoneValue) => {
    setFormData({ ...formData, phone: phoneValue })

    // Hata mesajını temizle
    if (formErrors.phone) {
      setFormErrors({ ...formErrors, phone: "" })
    }

    // Submit error'ı temizle
    if (submitError) {
      setSubmitError("")
    }
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.name.trim()) {
      errors.name = "Adınız ve soyadınız gereklidir"
    }

    if (!formData.email.trim()) {
      errors.email = "E-posta adresiniz gereklidir"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Geçerli bir e-posta adresi giriniz"
    }

    if (!formData.phone.trim()) {
      errors.phone = "Telefon numaranız gereklidir"
    } else {
      // Telefon numarası validasyonu - en az 8 rakam olmalı
      const phoneDigits = formData.phone.replace(/\D/g, "")
      if (phoneDigits.length < 8) {
        errors.phone = "Geçerli bir telefon numarası giriniz"
      }
    }

    if (!formData.subject.trim()) {
      errors.subject = "Konu gereklidir"
    }

    if (!formData.message.trim()) {
      errors.message = "Mesajınız gereklidir"
    } else if (formData.message.trim().length < 10) {
      errors.message = "Mesajınız en az 10 karakter olmalıdır"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitError("")

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Bir hata oluştu")
      }

      // Başarılı mesajı göster
      setSubmitSuccess(true)

      // Formu temizle
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })

      // 5 saniye sonra başarı mesajını kaldır
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    } catch (error) {
      console.error("Form gönderme hatası:", error)
      setSubmitError(error.message || "Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-24 pb-16 bg-gradient-to-br from-neutral-600 via-neutral-200 to-neutral-600">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-12">
          <div
            className="absolute inset-0 bg-cover bg-top"
            style={{ backgroundImage: "url('/stock/contact.jpg?height=400&width=1200&text=İletişim')" }}
          ></div>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white">İletişim</h1>
          </div>
        </div>

        {/* Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 items-stretch">
          {/* Contact Info */}
          <div className="lg:col-span-1 h-full">
            <div className="bg-white rounded-lg shadow-lg p-8 h-full flex flex-col justify-between">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">İletişim Bilgileri</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-red-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Adres</h3>
                    <p className="text-gray-600">Bosna Cd 27, Yeşilırmak Mh., Tokat, Türkiye</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-red-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Telefon</h3>
                    <p className="text-gray-600">(0356) 212 56 60</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-red-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">E-posta</h3>
                    <p className="text-gray-600">pltyapitokat@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-red-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Çalışma Saatleri</h3>
                    <p className="text-gray-600">Pazartesi - Cuma: 09:00 - 17:00</p>
                    <p className="text-gray-600">Cumartesi: 09:00 - 17:00</p>
                    <p className="text-gray-600">Pazar: Kapalı</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h3 className="font-semibold text-gray-800 mb-3">Sosyal Medya</h3>
                <div className="flex space-x-3">
                  <a
                    href="https://www.facebook.com/pltyapisistemleri/?locale=tr_TR"
                    className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a
  href="https://x.com/pltyapi"
  className="bg-black text-white p-2 rounded-full hover:bg-black transition-all duration-300 hover:scale-105  "
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
</a>
                  <a
                    href="https://www.instagram.com/jotuntokat/"
                    className="bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700 transition-all duration-300 hover:scale-105"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 h-full">
            <div className="bg-white rounded-lg shadow-lg p-8 h-full">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Bize Ulaşın</h2>

              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
                  Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.
                </div>
              )}

              {submitError && <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">{submitError}</div>}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Adınız Soyadınız <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${
                        formErrors.name ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                      placeholder="Adınız Soyadınız"
                      required
                    />
                    {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      E-posta Adresiniz <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${
                        formErrors.email ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                      placeholder="E-posta Adresiniz"
                      required
                    />
                    {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                  </div>
                </div>

                {/* Telefon Numarası - Yeni Komponent */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Telefon Numaranız <span className="text-red-600">*</span>
                  </label>
                  <PhoneInput value={formData.phone} onChange={handlePhoneChange} error={formErrors.phone} required />
                </div>

                <div className="mb-6">
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                    Konu <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${
                      formErrors.subject ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                    placeholder="Konu"
                    required
                  />
                  {formErrors.subject && <p className="text-red-500 text-sm mt-1">{formErrors.subject}</p>}
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Mesajınız <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${
                      formErrors.message ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                    placeholder="Mesajınız"
                    required
                  ></textarea>
                  {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex text-center mt-4 items-center justify-center ml-auto group/btn relative px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Gönderiliyor..." : "Gönder"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="bg-white rounded-lg shadow-lg p-4 overflow-hidden">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 px-4 text-center">Dükkanımızın Konumu</h2>
          <div className="h-[800px] w-full">
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3041.4821996920773!2d36.5446746!3d40.331648!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x407db75a72a89f95%3A0x69af5028f6bdacbd!2sPLT%20YAPI%20S%C4%B0STEMLER%C4%B0%20-%20JOTUN%20BOYA%20SATI%C5%9E%20MA%C4%9EAZASI!5e0!3m2!1str!2str!4v1749754342474!5m2!1str!2str" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }}
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade">
          </iframe>
          </div>
        </div>
      </div>
    </div>
  )
}
  