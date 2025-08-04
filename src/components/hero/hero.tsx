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

      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Pondok Pesantren Tahfidz & Bahasa
                <br />
                <span className="text-teal-200">BAROKATUL QUR&apos;AN</span>
              </h1>
              <p className="text-xl md:text-2xl text-teal-100 leading-relaxed italic">
                Menjadi Pondok Pesantren Tahfidz dan Bahasa yang Unggul, Profesional, 
                Transformatif, Humanis dan Qur&apos;ani
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Link href="/registration">
                <Button
                  size="lg"
                  className="rounded-full text-lg px-8 py-6 shadow-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all duration-300 hover:scale-105"
                >
                  Pendaftaran
                </Button>
              </Link>
              
              {/* Hotline Section - More precise styling */}
              <button
                onClick={handleWhatsAppClick}
                className="bg-teal-600/90 backdrop-blur-sm rounded-lg px-6 py-4 text-white shadow-lg border border-white/20 hover:bg-teal-500/90 transition-all duration-300 hover:scale-105 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full group-hover:bg-green-400 transition-colors duration-300">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm">Telepon</p>
                    <p className="font-mono text-sm opacity-90">0852-2055-8881</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column - Logo */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Circular Background */}
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-teal-400/20 to-blue-500/20 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <div className="w-72 h-72 lg:w-88 lg:h-88 rounded-full bg-gradient-to-br from-teal-300/30 to-blue-400/30 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                  <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-teal-200/40 to-blue-300/40 backdrop-blur-sm border border-white/40 flex items-center justify-center">
                    {/* Logo */}
                    <div className="relative w-48 h-48 lg:w-56 lg:h-56 flex items-center justify-center">
                      <Image
                        src="/logo.png"
                        alt="PPTB BQ Logo"
                        width={224}
                        height={224}
                        className="w-full h-full object-contain"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
