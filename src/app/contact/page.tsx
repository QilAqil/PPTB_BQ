"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
          Hubungi Kami
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Silakan hubungi kami untuk informasi lebih lanjut tentang pendaftaran
          dan kegiatan pesantren.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Information */}
          <div className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl font-semibold">
                  Informasi Kontak
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center text-white">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">
                      Telepon
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      0852-2055-8881
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Hubungi kami untuk informasi pendaftaran
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center text-white">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">
                      Email
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      popestahfidzbarokatulquran@gmail.com
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Kirim email untuk pertanyaan umum
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center text-white">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">
                      Alamat
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      Pondok Pesantren Tahfidz & Bahasa BAROKATUL QUR&apos;AN
                      <br />
                      Jl. Bawah, RT.05/RW.11, Munggang
                      <br />
                      Kalibeber, Kec. Mojotengah, Kabupaten Wonosobo, Jawa
                      Tengah
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center text-white">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">
                      Jam Operasional
                    </h3>
                    <div className="text-muted-foreground space-y-1 text-sm sm:text-base">
                      <p>Senin - Jumat: 08:00 - 17:00</p>
                      <p>Sabtu: 08:00 - 15:00</p>
                      <p>Minggu: Tutup</p>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                      Kunjungan di luar jam operasional dapat diatur sebelumnya
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Google Maps */}
          <div className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl font-semibold">
                  Lokasi Kami
                </CardTitle>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Lihat lokasi Pondok Pesantren BAROKATUL QUR&apos;AN di Google
                  Maps
                </p>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden border">
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
                <div className="mt-4">
                  <Button className="w-full" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Buka di Google Maps
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
