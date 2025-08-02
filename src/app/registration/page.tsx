"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, AlertCircle, Loader2, Check, FileText, User, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function RegistrationPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showRequirements, setShowRequirements] = useState(true);
  const [hasSeenRequirements, setHasSeenRequirements] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    nik: "",
    birthPlace: "",
    birthDate: "",
    gender: "",
    address: "",
    phoneNumber: "",
    parentName: "",
    parentPhone: "",
    parentAddress: "",
    educationLevel: "",
    schoolName: "",
    schoolAddress: "",
    graduationYear: "",
    motivation: "",
    healthCondition: "",
    specialNeeds: ""
  });

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validasi NIK
    const nikRegex = /^\d{16}$/;
    if (!nikRegex.test(formData.nik)) {
      setError('NIK harus berupa 16 digit angka');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Terjadi kesalahan saat mengirim pendaftaran');
      }

      setSuccess(true);
      setFormData({
        fullName: "",
        nik: "",
        birthPlace: "",
        birthDate: "",
        gender: "",
        address: "",
        phoneNumber: "",
        parentName: "",
        parentPhone: "",
        parentAddress: "",
        educationLevel: "",
        schoolName: "",
        schoolAddress: "",
        graduationYear: "",
        motivation: "",
        healthCondition: "",
        specialNeeds: ""
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Memeriksa status login...</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Pendaftaran Berhasil!</h2>
              <p className="text-muted-foreground mb-6">
                Terima kasih telah mendaftar. Tim kami akan menghubungi Anda segera untuk informasi selanjutnya.
              </p>
              <Button 
                onClick={() => setSuccess(false)}
                className="w-full"
              >
                Daftar Lagi
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showRequirements && !hasSeenRequirements) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Pendaftaran Santri Baru</h1>
            <p className="text-muted-foreground text-lg">
              Pondok Pesantren Tahfidz & Bahasa BAROKATUL QUR'AN
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Syarat dan Ketentuan Pendaftaran
              </CardTitle>
              <CardDescription>
                Silakan baca dengan teliti sebelum melanjutkan pendaftaran
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">Syarat Umum:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Usia minimal 7 tahun dan maksimal 18 tahun</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Memiliki NIK (Nomor Induk Kependudukan) yang valid</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Sehat jasmani dan rohani</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Memiliki motivasi yang kuat untuk belajar tahfidz dan bahasa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Mendapat izin dari orang tua/wali</span>
                  </li>
                </ul>

                <h3 className="text-lg font-semibold text-primary">Dokumen yang Diperlukan:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Fotokopi KK (Kartu Keluarga)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Fotokopi Akta Kelahiran</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Fotokopi Ijazah/SKL terakhir</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Surat Keterangan Sehat dari dokter</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Surat Rekomendasi dari sekolah (jika masih sekolah)</span>
                  </li>
                </ul>

                <h3 className="text-lg font-semibold text-primary">Biaya Pendaftaran:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Biaya pendaftaran: Rp 500.000 (non-refundable)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Biaya bulanan: Rp 1.500.000/bulan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Biaya seragam dan buku: Rp 2.000.000 (sekali bayar)</span>
                  </li>
                </ul>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Penting:</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Pendaftaran online ini adalah tahap awal</li>
                    <li>• Setelah pendaftaran diterima, akan ada tes tahfidz dan wawancara</li>
                    <li>• Hasil tes akan diumumkan maksimal 1 minggu setelah tes</li>
                    <li>• Pendaftar yang diterima wajib melengkapi dokumen fisik</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  onClick={() => {
                    setShowRequirements(false);
                    setHasSeenRequirements(true);
                  }}
                  className="flex-1"
                  size="lg"
                >
                  <User className="h-4 w-4 mr-2" />
                  Lanjutkan Pendaftaran
                </Button>
                <Link href="/" className="flex-1">
                  <Button variant="outline" className="w-full" size="lg">
                    Kembali ke Beranda
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              Login Terlebih Dahulu
            </CardTitle>
            <CardDescription>
              Anda harus login terlebih dahulu untuk melanjutkan pendaftaran
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Untuk keamanan dan validasi data, pendaftaran hanya dapat dilakukan oleh user yang sudah terdaftar.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/sign-in">
                <Button className="w-full">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="outline" className="w-full">
                  Daftar Akun Baru
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                className="w-full"
                onClick={() => setShowRequirements(true)}
              >
                Kembali ke Syarat
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Form Pendaftaran Santri</h1>
          <p className="text-muted-foreground text-lg">
            Pondok Pesantren Tahfidz & Bahasa BAROKATUL QUR'AN
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Form Pendaftaran</CardTitle>
            <CardDescription>
              Silakan isi form pendaftaran dengan data yang lengkap dan benar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              {/* Data Pribadi */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Data Pribadi</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Nama Lengkap *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="nik">NIK (Nomor Induk Kependudukan) *</Label>
                    <Input
                      id="nik"
                      value={formData.nik}
                      onChange={(e) => handleInputChange('nik', e.target.value)}
                      placeholder="Contoh: 3374010101010001"
                      maxLength={16}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="birthPlace">Tempat Lahir *</Label>
                    <Input
                      id="birthPlace"
                      value={formData.birthPlace}
                      onChange={(e) => handleInputChange('birthPlace', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="birthDate">Tanggal Lahir *</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="gender">Jenis Kelamin *</Label>
                    <Select 
                      value={formData.gender} 
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      required
                    >
                      <option value="">Pilih jenis kelamin</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="address">Alamat Lengkap *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    required
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="phoneNumber">Nomor Telepon *</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    placeholder="Contoh: 081234567890"
                    required
                  />
                </div>
              </div>

              {/* Data Orang Tua */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Data Orang Tua</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="parentName">Nama Orang Tua *</Label>
                    <Input
                      id="parentName"
                      value={formData.parentName}
                      onChange={(e) => handleInputChange('parentName', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="parentPhone">Nomor Telepon Orang Tua *</Label>
                    <Input
                      id="parentPhone"
                      type="tel"
                      value={formData.parentPhone}
                      onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                      placeholder="Contoh: 081234567890"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="parentAddress">Alamat Orang Tua *</Label>
                  <Textarea
                    id="parentAddress"
                    value={formData.parentAddress}
                    onChange={(e) => handleInputChange('parentAddress', e.target.value)}
                    required
                    rows={3}
                  />
                </div>
              </div>

              {/* Data Pendidikan */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Data Pendidikan</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="educationLevel">Tingkat Pendidikan *</Label>
                    <Select 
                      value={formData.educationLevel} 
                      onChange={(e) => handleInputChange('educationLevel', e.target.value)}
                      required
                    >
                      <option value="">Pilih tingkat pendidikan</option>
                      <option value="SD">SD</option>
                      <option value="SMP">SMP</option>
                      <option value="SMA">SMA</option>
                      <option value="SMK">SMK</option>
                      <option value="MA">MA</option>
                      <option value="Perguruan Tinggi">Perguruan Tinggi</option>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="graduationYear">Tahun Lulus</Label>
                    <Input
                      id="graduationYear"
                      type="number"
                      min="1990"
                      max="2030"
                      value={formData.graduationYear}
                      onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                      placeholder="Contoh: 2023"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="schoolName">Nama Sekolah *</Label>
                  <Input
                    id="schoolName"
                    value={formData.schoolName}
                    onChange={(e) => handleInputChange('schoolName', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="schoolAddress">Alamat Sekolah *</Label>
                  <Textarea
                    id="schoolAddress"
                    value={formData.schoolAddress}
                    onChange={(e) => handleInputChange('schoolAddress', e.target.value)}
                    required
                    rows={2}
                  />
                </div>
              </div>

              {/* Motivasi dan Kesehatan */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Motivasi dan Kesehatan</h3>
                
                <div>
                  <Label htmlFor="motivation">Motivasi Masuk Pesantren *</Label>
                  <Textarea
                    id="motivation"
                    value={formData.motivation}
                    onChange={(e) => handleInputChange('motivation', e.target.value)}
                    required
                    rows={4}
                    placeholder="Jelaskan motivasi Anda untuk masuk pesantren..."
                  />
                </div>
                
                <div>
                  <Label htmlFor="healthCondition">Kondisi Kesehatan</Label>
                  <Textarea
                    id="healthCondition"
                    value={formData.healthCondition}
                    onChange={(e) => handleInputChange('healthCondition', e.target.value)}
                    rows={3}
                    placeholder="Jelaskan kondisi kesehatan (jika ada riwayat penyakit khusus)"
                  />
                </div>
                
                <div>
                  <Label htmlFor="specialNeeds">Kebutuhan Khusus</Label>
                  <Textarea
                    id="specialNeeds"
                    value={formData.specialNeeds}
                    onChange={(e) => handleInputChange('specialNeeds', e.target.value)}
                    rows={3}
                    placeholder="Jelaskan kebutuhan khusus (jika ada)"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setShowRequirements(true)}
                >
                  Kembali ke Syarat
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    'Kirim Pendaftaran'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 