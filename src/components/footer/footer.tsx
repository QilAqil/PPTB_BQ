import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
              Pondok Pesantren Tahfidz & Bahasa
              <br />
              &quot;BAROKATUL QUR&apos;AN&quot;
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Membentuk Generasi Qur&apos;ani yang Unggul dalam Tahfidz dan
              Bahasa. Berkomitmen memberikan pendidikan berkualitas yang
              mengintegrasikan tahfidz Al-Qur&apos;an dengan pembelajaran bahasa
              Inggris.
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
                    Jl. Bawah, RT.05/RW.11, Munggang, Kalibeber
                    <br />
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
                <span className="text-sm text-gray-300">
                  popestahfidzbarokatulquran@gmail.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-teal-400" />
                <span className="text-sm text-gray-300">
                  Senin - Jumat: 08:00 - 16:00
                </span>
              </div>
            </div>
          </div>

          {/* Google Maps Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Lokasi Kami</h3>
            <p className="text-sm text-gray-400">
              Lihat lokasi Pondok Pesantren BAROKATUL QUR&apos;AN di Google Maps
            </p>
            <div className="space-y-3">
              <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-700">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.184393964019!2d109.902387!3d-7.3266552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7aa18e96646f57%3A0xeeac98f14419a201!2sPptb%20barokatul%20Qur'an!5e0!3m2!1sid!2sid!4v1715080000000!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Pondok Pesantren BAROKATUL QUR'AN"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex justify-center items-center">
            <p className="text-sm text-gray-400 text-center">
              © 2025 PPTB BAROKATUL QUR&apos;AN. Developed by{" "}
              <a
                href="https://www.instagram.com/qil.qilaqil"
                className="text-teal-400 hover:text-white transition-colors"
              >
                Sa&apos;id Aqil
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
