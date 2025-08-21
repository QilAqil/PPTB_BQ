"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";

export function Hero() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "6285220558881";
    const message =
      "Halo, saya ingin bertanya tentang pendaftaran santri baru di PPTB BAROKATUL QUR'AN";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="relative bg-gradient-to-r from-teal-600 via-teal-700 to-purple-800 text-white overflow-hidden min-h-[80vh] flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1">
            <div className="space-y-4 lg:space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Pondok Pesantren Tahfidz & Bahasa
                <br />
                <span className="text-teal-200">BAROKATUL QUR&apos;AN</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-teal-100 leading-relaxed italic max-w-2xl mx-auto lg:mx-0">
                Menjadi Pondok Pesantren Tahfidz dan Bahasa yang Unggul,
                Profesional, Transformatif, Humanis dan Qur&apos;ani
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
              <Link href="/registration">
                <Button
                  size="lg"
                  className="rounded-full text-sm sm:text-base px-6 py-3 shadow-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                >
                  Pendaftaran
                </Button>
              </Link>

              {/* Hotline Section */}
              <button
                onClick={handleWhatsAppClick}
                className="bg-teal-600/90 backdrop-blur-sm rounded-lg px-4 py-3 text-white shadow-lg border border-white/20 hover:bg-teal-500/90 transition-all duration-300 hover:scale-105 cursor-pointer group w-full sm:w-auto"
              >
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full group-hover:bg-green-400 transition-colors duration-300">
                    <Phone className="w-3 h-3 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-xs">Telepon</p>
                    <p className="font-mono text-xs opacity-90">
                      0852-2055-8881
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column - Logo */}
          <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative">
              {/* Logo */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="PPTB BQ Logo"
                  width={256}
                  height={256}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
