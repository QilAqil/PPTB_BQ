import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  ArrowRight
} from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="PPTB BAROKATUL QUR'AN Logo"
                width={124}
                height={32}
                className="h-8 w-auto"
              />
            </div>
            <p className="text-muted-foreground mb-4 font-semibold">
              Pondok Pesantren Tahfidz & Bahasa<br />
              &quot;BAROKATUL QUR&apos;AN&quot;
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Membentuk Generasi Qur&apos;ani yang Unggul dalam Tahfidz dan Bahasa. 
              Berkomitmen memberikan pendidikan berkualitas yang mengintegrasikan 
              tahfidz Al-Qur&apos;an dengan pembelajaran bahasa Inggris.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informasi Kontak</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-teal-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-300">
                    Jl. Bawah, RT.05/RW.11, Munggang, Kalibeber<br />
                    Mojotengah, Wonosobo, Jawa Tengah
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-teal-400" />
                <span className="text-sm text-gray-300">+62 852-2055-8881</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-teal-400" />
                <span className="text-sm text-gray-300">popestahfidzbarokatulquran@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-teal-400" />
                <span className="text-sm text-gray-300">Senin - Jumat: 08:00 - 16:00</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Berita
                </Link>
              </li>
              <li>
                <a href="/gallery" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Galeri
                </a>
              </li>
              <li>
                <a href="/registration" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Pendaftaran
                </a>
              </li>
              <li>
                <a href="/about" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Tentang Kami
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-sm text-gray-400">
              Dapatkan informasi terbaru tentang kegiatan dan program kami.
            </p>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-gray-300">
                Email
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="Masukkan email Anda"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                />
                <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-gray-400">
              © 2025 PPTB BAROKATUL QUR&apos;AN. Developed by <a href="https://www.instagram.com/qil.qilaqil" className="text-teal-400 hover:text-white transition-colors">Sa&apos;id Aqil</a>.
            </p>
            <div className="flex space-x-6">
              <a href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Kebijakan Privasi
              </a>
              <a href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Syarat & Ketentuan
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
