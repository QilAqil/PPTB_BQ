'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Phone } from "lucide-react"

export function Hero() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "6285220558881"
    const message = "Halo, saya ingin bertanya tentang pendaftaran santri baru di PPTB BAROKATUL QUR'AN"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <section className="relative bg-gradient-to-r from-teal-600 via-teal-700 to-purple-800 text-white overflow-hidden min-h-screen flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="space-y-4 lg:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                Pondok Pesantren Tahfidz & Bahasa
                <br />
                <span className="text-teal-200">BAROKATUL QUR&apos;AN</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-teal-100 leading-relaxed italic">
                Menjadi Pondok Pesantren Tahfidz dan Bahasa yang Unggul, Profesional, 
                Transformatif, Humanis dan Qur&apos;ani
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
              <Link href="/registration">
                <Button
                  size="lg"
                  className="rounded-full text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 shadow-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                >
                  Pendaftaran
                </Button>
              </Link>
              
              {/* Hotline Section - More precise styling */}
              <button
                onClick={handleWhatsAppClick}
                className="bg-teal-600/90 backdrop-blur-sm rounded-lg px-4 sm:px-6 py-3 sm:py-4 text-white shadow-lg border border-white/20 hover:bg-teal-500/90 transition-all duration-300 hover:scale-105 cursor-pointer group w-full sm:w-auto"
              >
                <div className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start">
                  <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full group-hover:bg-green-400 transition-colors duration-300">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-xs sm:text-sm">Telepon</p>
                    <p className="font-mono text-xs sm:text-sm opacity-90">0852-2055-8881</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column - Logo */}
          <div className="relative flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="relative">
              {/* Logo */}
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="PPTB BQ Logo"
                  width={384}
                  height={384}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
