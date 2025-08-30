"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  FileText,
  Heart,
} from "lucide-react";
import Link from "next/link";

export default function RegistrationPage() {
  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Pendaftaran Santri Baru
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Daftar sebagai santri baru di Pondok Pesantren Tahfidz
            Al-Qur&apos;an BAROKATUL QUR&apos;AN
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Information Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
                  Informasi Pendaftaran
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-2 sm:gap-3">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground mt-1" />
                  <div>
                    <h4 className="font-medium text-sm sm:text-base">
                      Periode Pendaftaran
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Januari - Juni 2025
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:gap-3">
                  <User className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground mt-1" />
                  <div>
                    <h4 className="font-medium text-sm sm:text-base">Kuota</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      50 santri baru
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:gap-3">
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground mt-1" />
                  <div>
                    <h4 className="font-medium text-sm sm:text-base">Kontak</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      0852-2055-8881
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:gap-3">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground mt-1" />
                  <div>
                    <h4 className="font-medium text-sm sm:text-base">Email</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      popestahfidzbarokatulquran@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:gap-3">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground mt-1" />
                  <div>
                    <h4 className="font-medium text-sm sm:text-base">Alamat</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Jl. Bawah, RT.05/RW.11, Munggang, Kalibeber, Mojotengah,
                      Wonosobo, Jawa Tengah
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Requirements Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                  Persyaratan Pendaftaran
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                  <li className="flex items-start gap-2 sm:gap-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Usia minimal 7 tahun dan maksimal 18 tahun</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Fotokopi Akta Kelahiran</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Fotokopi Kartu Keluarga</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Fotokopi Ijazah terakhir</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Pas foto 3x4 (2 lembar)</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Surat rekomendasi dari guru/ustadz</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Programs Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                  Program Unggulan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-sm sm:text-base text-blue-800 mb-2">
                      Tahfidz Al-Qur&apos;an
                    </h4>
                    <p className="text-xs sm:text-sm text-blue-600">
                      Program menghafal Al-Qur&apos;an dengan metode yang
                      efektif
                    </p>
                  </div>
                  <div className="p-3 sm:p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-sm sm:text-base text-green-800 mb-2">
                      Bahasa Inggris
                    </h4>
                    <p className="text-xs sm:text-sm text-green-600">
                      Pembelajaran bahasa Inggris untuk komunikasi internasional
                    </p>
                  </div>
                  <div className="p-3 sm:p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-sm sm:text-base text-purple-800 mb-2">
                      Pendidikan Karakter
                    </h4>
                    <p className="text-xs sm:text-sm text-purple-600">
                      Pembentukan akhlak dan karakter Islami
                    </p>
                  </div>
                  <div className="p-3 sm:p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-sm sm:text-base text-orange-800 mb-2">
                      Keterampilan Hidup
                    </h4>
                    <p className="text-xs sm:text-sm text-orange-600">
                      Pengembangan keterampilan praktis untuk kehidupan
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Login Required */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">
                  Login Diperlukan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Anda harus login untuk mengisi formulir pendaftaran
                  </p>
                  <Link href="/sign-in">
                    <Button className="w-full" size="sm">
                      Login Sekarang
                    </Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button variant="outline" className="w-full" size="sm">
                      Daftar Akun
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Important Notice */}
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg text-orange-800">
                  Penting!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs sm:text-sm text-orange-700">
                  Pendaftaran dibuka mulai Januari 2025. Pastikan semua
                  persyaratan telah dipenuhi sebelum mendaftar.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
