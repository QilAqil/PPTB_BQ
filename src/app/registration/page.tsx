"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Phone, Mail, MapPin, GraduationCap } from "lucide-react"

interface RegistrationFormData {
  fullName: string
  birthDate: string
  gender: string
  phoneNumber: string
  email: string
  address: string
  parentName: string
  parentPhone: string
  educationLevel: string
  previousSchool: string
  motivation: string
}

export default function RegistrationPage() {
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    birthDate: '',
    gender: '',
    phoneNumber: '',
    email: '',
    address: '',
    parentName: '',
    parentPhone: '',
    educationLevel: '',
    previousSchool: '',
    motivation: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (field: keyof RegistrationFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitStatus('success')
      setFormData({
        fullName: '',
        birthDate: '',
        gender: '',
        phoneNumber: '',
        email: '',
        address: '',
        parentName: '',
        parentPhone: '',
        educationLevel: '',
        previousSchool: '',
        motivation: ''
      })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Pendaftaran Santri Baru</h1>
          <p className="text-lg text-muted-foreground">
            Daftar sebagai santri baru di Pondok Pesantren Tahfidz & Bahasa BAROKATUL QUR&apos;AN
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Formulir Pendaftaran
                </CardTitle>
                <CardDescription>
                  Isi data diri Anda dengan lengkap dan benar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Data Pribadi</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Nama Lengkap *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="birthDate">Tanggal Lahir *</Label>
                        <Input
                          id="birthDate"
                          type="date"
                          value={formData.birthDate}
                          onChange={(e) => handleInputChange('birthDate', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="gender">Jenis Kelamin *</Label>
                        <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis kelamin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Laki-laki</SelectItem>
                            <SelectItem value="female">Perempuan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Nomor Telepon *</Label>
                        <Input
                          id="phoneNumber"
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Alamat Lengkap *</Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        rows={3}
                        required
                      />
                    </div>
                  </div>

                  {/* Parent Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Data Orang Tua</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="parentName">Nama Orang Tua *</Label>
                        <Input
                          id="parentName"
                          value={formData.parentName}
                          onChange={(e) => handleInputChange('parentName', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="parentPhone">Nomor Telepon Orang Tua *</Label>
                        <Input
                          id="parentPhone"
                          type="tel"
                          value={formData.parentPhone}
                          onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Education Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Data Pendidikan</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="educationLevel">Tingkat Pendidikan *</Label>
                        <Select value={formData.educationLevel} onValueChange={(value) => handleInputChange('educationLevel', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih tingkat pendidikan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="smp">SMP</SelectItem>
                            <SelectItem value="sma">SMA</SelectItem>
                            <SelectItem value="smk">SMK</SelectItem>
                            <SelectItem value="kuliah">Kuliah</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="previousSchool">Sekolah Sebelumnya</Label>
                        <Input
                          id="previousSchool"
                          value={formData.previousSchool}
                          onChange={(e) => handleInputChange('previousSchool', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="motivation">Motivasi Masuk Pesantren *</Label>
                      <Textarea
                        id="motivation"
                        value={formData.motivation}
                        onChange={(e) => handleInputChange('motivation', e.target.value)}
                        rows={4}
                        placeholder="Ceritakan motivasi Anda ingin masuk pesantren..."
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Mengirim...' : 'Kirim Pendaftaran'}
                  </Button>

                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                      <p className="text-green-800">Pendaftaran berhasil dikirim! Kami akan menghubungi Anda segera.</p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-red-800">Terjadi kesalahan. Silakan coba lagi.</p>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Information Sidebar */}
          <div className="space-y-6">
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
                      Pondok Pesantren Tahfidz & Bahasa BAROKATUL QUR&apos;AN<br />
                      Jl. Pesantren No. 123<br />
                      Kota, Provinsi 12345
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Persyaratan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="w-5 h-5 p-0 flex items-center justify-center text-xs">1</Badge>
                    <span className="text-sm">Fotokopi KK dan Akta Kelahiran</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="w-5 h-5 p-0 flex items-center justify-center text-xs">2</Badge>
                    <span className="text-sm">Fotokopi Ijazah/SKL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="w-5 h-5 p-0 flex items-center justify-center text-xs">3</Badge>
                    <span className="text-sm">Pas foto 3x4 (3 lembar)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="w-5 h-5 p-0 flex items-center justify-center text-xs">4</Badge>
                    <span className="text-sm">Surat rekomendasi dari sekolah</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="w-5 h-5 p-0 flex items-center justify-center text-xs">5</Badge>
                    <span className="text-sm">Surat keterangan sehat</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 