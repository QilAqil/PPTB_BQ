"use client";

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Phone, Mail, MapPin, GraduationCap, FileText, Heart, Lock, ArrowRight } from "lucide-react"
import Link from "next/link"

interface User {
  id: string
  email: string
  name: string | null
  role: string
}

export default function RegistrationPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me')
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memeriksa status login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Pendaftaran Santri Baru</h1>
          <p className="text-lg text-muted-foreground">
            Daftar sebagai santri baru di Pondok Pesantren Tahfidz Al-Qur&apos;an BAROKATUL QUR&apos;AN
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Information Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Informasi Pendaftaran
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground mt-1" />
                  <div>
                    <h4 className="font-medium">Periode Pendaftaran</h4>
                    <p className="text-sm text-muted-foreground">Januari - Juni 2024</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <User className="h-4 w-4 text-muted-foreground mt-1" />
                  <div>
                    <h4 className="font-medium">Kuota</h4>
                    <p className="text-sm text-muted-foreground">100 santri baru</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground mt-1" />
                  <div>
                    <h4 className="font-medium">Kontak</h4>
                    <p className="text-sm text-muted-foreground">0852-2055-8881</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground mt-1" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-sm text-muted-foreground">info@pptb-bq.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                  <div>
                    <h4 className="font-medium">Alamat</h4>
                    <p className="text-sm text-muted-foreground">
                      Pondok Pesantren Tahfidz Al-Qur&apos;an BAROKATUL QUR&apos;AN<br />
                      Jl. Pesantren No. 123<br />
                      Kota, Provinsi 12345
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Requirements Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Persyaratan Pendaftaran
                </CardTitle>
                <CardDescription>
                  Dokumen yang harus disiapkan untuk pendaftaran
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-primary">Dokumen Pribadi</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="w-5 h-5 p-0 flex items-center justify-center text-xs">1</Badge>
                          <span className="text-sm">Fotokopi KK (Kartu Keluarga)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="w-5 h-5 p-0 flex items-center justify-center text-xs">2</Badge>
                          <span className="text-sm">Fotokopi Akta Kelahiran</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="w-5 h-5 p-0 flex items-center justify-center text-xs">3</Badge>
                          <span className="text-sm">Pas foto 3x4 (3 lembar)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="w-5 h-5 p-0 flex items-center justify-center text-xs">4</Badge>
                          <span className="text-sm">Fotokopi KTP (jika sudah punya)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-primary">Dokumen Pendidikan</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="w-5 h-5 p-0 flex items-center justify-center text-xs">5</Badge>
                          <span className="text-sm">Fotokopi Ijazah/SKL</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="w-5 h-5 p-0 flex items-center justify-center text-xs">6</Badge>
                          <span className="text-sm">Surat rekomendasi dari sekolah</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="w-5 h-5 p-0 flex items-center justify-center text-xs">7</Badge>
                          <span className="text-sm">Surat keterangan sehat</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="w-5 h-5 p-0 flex items-center justify-center text-xs">8</Badge>
                          <span className="text-sm">Surat izin orang tua</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Catatan Penting:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Semua dokumen harus dalam bentuk fotokopi yang jelas</li>
                      <li>• Pas foto harus berwarna dengan latar belakang merah</li>
                      <li>• Surat keterangan sehat dari dokter/puskesmas</li>
                      <li>• Surat rekomendasi dari kepala sekolah</li>
                      <li>• Semua dokumen akan diverifikasi saat wawancara</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Process Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowRight className="h-5 w-5" />
                  Proses Pendaftaran
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-primary">Tahap 1: Pendaftaran Online</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="w-5 h-5 p-0 flex items-center justify-center text-xs">1</Badge>
                          <span className="text-sm">Login ke sistem</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="w-5 h-5 p-0 flex items-center justify-center text-xs">2</Badge>
                          <span className="text-sm">Isi formulir pendaftaran</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="w-5 h-5 p-0 flex items-center justify-center text-xs">3</Badge>
                          <span className="text-sm">Upload dokumen pendukung</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-primary">Tahap 2: Seleksi</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="w-5 h-5 p-0 flex items-center justify-center text-xs">4</Badge>
                          <span className="text-sm">Verifikasi dokumen</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="w-5 h-5 p-0 flex items-center justify-center text-xs">5</Badge>
                          <span className="text-sm">Tes kemampuan dasar</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="w-5 h-5 p-0 flex items-center justify-center text-xs">6</Badge>
                          <span className="text-sm">Wawancara dengan pengasuh</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Login Required Card */}
            {!user ? (
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-800">
                    <Lock className="h-5 w-5" />
                    Login Diperlukan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-orange-700">
                    Anda harus login terlebih dahulu untuk mengisi formulir pendaftaran.
                  </p>
                  <div className="space-y-2">
                    <Link href="/sign-in">
                      <Button className="w-full" variant="outline">
                        Login
                      </Button>
                    </Link>
                    <Link href="/sign-up">
                      <Button className="w-full">
                        Daftar Akun
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <User className="h-5 w-5" />
                    Siap Mendaftar
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-green-700">
                    Selamat datang, {user.name || user.email}! Anda dapat mengisi formulir pendaftaran sekarang.
                  </p>
                  <Link href="/user">
                    <Button className="w-full">
                      Isi Formulir Pendaftaran
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Advantages Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Keunggulan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="w-5 h-5 p-0 flex items-center justify-center text-xs">✓</Badge>
                    <span className="text-sm">Program Tahfidz Al-Qur&apos;an</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="w-5 h-5 p-0 flex items-center justify-center text-xs">✓</Badge>
                    <span className="text-sm">Pendidikan Karakter Islami</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="w-5 h-5 p-0 flex items-center justify-center text-xs">✓</Badge>
                    <span className="text-sm">Fasilitas Lengkap</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="w-5 h-5 p-0 flex items-center justify-center text-xs">✓</Badge>
                    <span className="text-sm">Pengajar Berpengalaman</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="w-5 h-5 p-0 flex items-center justify-center text-xs">✓</Badge>
                    <span className="text-sm">Biaya Terjangkau</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="w-5 h-5 p-0 flex items-center justify-center text-xs">✓</Badge>
                    <span className="text-sm">Asrama Nyaman</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="w-5 h-5 p-0 flex items-center justify-center text-xs">✓</Badge>
                    <span className="text-sm">Program Ekstrakurikuler</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle>Butuh Bantuan?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Jika Anda mengalami kesulitan dalam proses pendaftaran, silakan hubungi kami:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>0852-2055-8881</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>info@pptb-bq.com</span>
                  </div>
                </div>
                <Link href="/contact">
                  <Button variant="outline" className="w-full">
                    Hubungi Kami
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 