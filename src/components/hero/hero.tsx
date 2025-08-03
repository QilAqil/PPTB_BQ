import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
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
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/registration">
                <Button
                  size="lg"
                  className="rounded-full text-lg px-8 py-6 shadow-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                >
                  Admisi / Pendaftaran
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - Illustration */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Circular Background */}
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-teal-400/20 to-blue-500/20 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <div className="w-72 h-72 lg:w-88 lg:h-88 rounded-full bg-gradient-to-br from-teal-300/30 to-blue-400/30 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                  <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-teal-200/40 to-blue-300/40 backdrop-blur-sm border border-white/40 flex items-center justify-center">
                    {/* Students Illustration Placeholder */}
                    <div className="text-center text-white/80">
                      <div className="text-6xl mb-4">📚</div>
                      <p className="text-lg font-semibold">Santri Unggulan</p>
                      <p className="text-sm">Tahfidz & Bahasa</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hotline Section */}
      <div className="absolute bottom-4 right-4 lg:bottom-8 lg:right-8">
        <div className="bg-teal-600 rounded-lg p-4 text-white shadow-lg">
          <div className="text-center">
            <h3 className="font-semibold text-sm">PPTB BQ Hotline</h3>
            <p className="text-xs opacity-90">Saluran Siaga Pelayanan</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="text-lg">📞</span>
              <span className="font-mono text-sm">0852-2055-8881</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
