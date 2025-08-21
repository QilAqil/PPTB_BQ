"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  FileText,
  Heart,
  Lock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

export default function RegistrationPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-primary mx-auto mb-3 sm:mb-4"></div>
          <p className="text-muted-foreground text-sm sm:text-base">
            Memeriksa status login...
          </p>
        </div>
      </div>
    );
  }

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
            {/* Registration Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">
                  Status Pendaftaran
                </CardTitle>
              </CardHeader>
              <CardContent>
                {user ? (
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm sm:text-base">
                        Sudah terdaftar
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Anda sudah terdaftar sebagai {user.name || user.email}
                    </p>
                    <Link href="/dashboard">
                      <Button className="w-full" size="sm">
                        Lihat Dashboard
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm sm:text-base">
                        Belum terdaftar
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Silakan daftar untuk mengakses pendaftaran santri
                    </p>
                    <Link href="/sign-up">
                      <Button className="w-full" size="sm">
                        Daftar Sekarang
                      </Button>
                    </Link>
                    <Link href="/sign-in">
                      <Button variant="outline" className="w-full" size="sm">
                        Masuk
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">
                  Kontak Cepat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm sm:text-base">0852-2055-8881</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    popestahfidzbarokatulquran@gmail.com
                  </span>
                </div>
                <Button variant="outline" className="w-full" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Hubungi Kami
                </Button>
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
