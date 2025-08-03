"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  FileText, 
  Calendar, 
  Phone, 
  MapPin, 
  Shield, 
  Loader2,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Check,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';


interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  role: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
}

interface UserRegistration {
  id: string;
  fullName: string;
  nik: string;
  birthPlace: string;
  birthDate: string;
  gender: string;
  address: string;
  phoneNumber: string;
  parentName: string;
  parentPhone: string;
  parentAddress: string;
  educationLevel: string;
  schoolName: string;
  schoolAddress: string;
  graduationYear: string;
  motivation: string;
  healthCondition: string;
  specialNeeds: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function UserPage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRegistrations, setUserRegistrations] = useState<UserRegistration[]>([]);

  const [profileLoading, setProfileLoading] = useState(true);
  const [registrationsLoading, setRegistrationsLoading] = useState(true);
  
  // Form registration states
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
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

  useEffect(() => {
    fetchUserProfile();
    fetchUserRegistrations();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setProfileLoading(true);
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        setUserProfile(data);
      } else {
        // Redirect to login if not authenticated
        window.location.href = '/sign-in';
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      window.location.href = '/sign-in';
    } finally {
      setProfileLoading(false);
    }
  };

  const fetchUserRegistrations = async () => {
    try {
      setRegistrationsLoading(true);
      const response = await fetch('/api/registration/user');
      if (response.ok) {
        const data = await response.json();
        setUserRegistrations(data.registrations || data || []);
      } else {
        setUserRegistrations([]);
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
      setUserRegistrations([]);
    } finally {
      setRegistrationsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    // Validasi NIK
    const nikRegex = /^\d{16}$/;
    if (!nikRegex.test(formData.nik)) {
      setFormError('NIK harus berupa 16 digit angka');
      setFormLoading(false);
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

      setFormSuccess(true);
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
      
      // Refresh registrations list
      fetchUserRegistrations();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setFormLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <Badge className="bg-green-100 text-green-800">Diterima</Badge>;
      case 'REJECTED':
        return <Badge className="bg-red-100 text-red-800">Ditolak</Badge>;
      case 'PENDING':
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Menunggu</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'REJECTED':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'PENDING':
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Memuat profil pengguna...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Akses Ditolak</h2>
              <p className="text-muted-foreground mb-6">
                Anda harus login terlebih dahulu untuk mengakses halaman ini.
              </p>
              <Link href="/sign-in">
                <Button className="w-full">
                  Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-6 w-6" />
                  Profil Pengguna
                </CardTitle>
                <CardDescription>
                  Informasi akun Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{userProfile.name || 'N/A'}</h3>
                  <p className="text-sm text-muted-foreground">{userProfile.email}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Role: {userProfile.role}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Bergabung: {formatDate(userProfile.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Status: {userProfile.isActive ? 'Aktif' : 'Tidak Aktif'}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button 
                    onClick={() => setShowRegistrationForm(true)}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Daftar Santri Baru
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-3xl font-bold mb-2">Dashboard Pengguna</h1>
                <p className="text-muted-foreground">
                  Selamat datang di panel pengguna PPTB BAROKATUL QUR&apos;AN
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Pendaftaran</p>
                        <div className="text-2xl font-bold">
                          {registrationsLoading ? (
                            <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
                          ) : (
                            userRegistrations.length
                          )}
                        </div>
                      </div>
                      <FileText className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Menunggu Review</p>
                        <div className="text-2xl font-bold text-yellow-600">
                          {registrationsLoading ? (
                            <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
                          ) : (
                            userRegistrations.filter(r => r.status === 'PENDING').length
                          )}
                        </div>
                      </div>
                      <Clock className="h-8 w-8 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Diterima</p>
                        <div className="text-2xl font-bold text-green-600">
                          {registrationsLoading ? (
                            <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
                          ) : (
                            userRegistrations.filter(r => r.status === 'APPROVED').length
                          )}
                        </div>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Registrations List */}
              <Card>
                <CardHeader>
                  <CardTitle>Riwayat Pendaftaran</CardTitle>
                  <CardDescription>
                    Daftar semua pendaftaran yang telah Anda ajukan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {registrationsLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
                      <p className="text-muted-foreground">Memuat data pendaftaran...</p>
                    </div>
                  ) : userRegistrations.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">
                        Anda belum memiliki riwayat pendaftaran
                      </p>
                      <Button onClick={() => setShowRegistrationForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Daftar Sekarang
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {userRegistrations.map((registration) => (
                        <Card key={registration.id} className="border-l-4 border-l-primary">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="font-semibold text-lg">{registration.fullName}</h3>
                                  {getStatusBadge(registration.status)}
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">NIK:</span>
                                      <span>{registration.nik}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Phone className="h-3 w-3" />
                                      <span>{registration.phoneNumber}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <MapPin className="h-3 w-3" />
                                      <span>{registration.address}</span>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">Pendidikan:</span>
                                      <span>{registration.educationLevel}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">Sekolah:</span>
                                      <span>{registration.schoolName}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Calendar className="h-3 w-3" />
                                      <span>Daftar: {formatDate(registration.createdAt)}</span>
                                    </div>
                                  </div>
                                </div>

                                {registration.notes && (
                                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <p className="text-sm text-yellow-800">
                                      <strong>Catatan Admin:</strong> {registration.notes}
                                    </p>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-2 ml-4">
                                {getStatusIcon(registration.status)}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Registration Form Modal */}
        {showRegistrationForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Form Pendaftaran Santri</h2>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setShowRegistrationForm(false);
                      setFormSuccess(false);
                      setFormError(null);
                    }}
                  >
                    ✕
                  </Button>
                </div>
                <p className="text-muted-foreground mt-2">
                  Silakan isi form pendaftaran dengan data yang lengkap dan benar
                </p>
              </div>

              <div className="p-6">
                {formSuccess ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Pendaftaran Berhasil!</h3>
                    <p className="text-muted-foreground mb-6">
                      Terima kasih telah mendaftar. Tim kami akan menghubungi Anda segera untuk informasi selanjutnya.
                    </p>
                    <div className="flex gap-3">
                      <Button 
                        onClick={() => {
                          setFormSuccess(false);
                          setShowRegistrationForm(false);
                        }}
                        className="flex-1"
                      >
                        Tutup
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setFormSuccess(false);
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
                        }}
                        className="flex-1"
                      >
                        Daftar Lagi
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {formError && (
                      <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        <p className="text-red-700">{formError}</p>
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
                          <select 
                            id="gender"
                            value={formData.gender} 
                            onChange={(e) => handleInputChange('gender', e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Pilih jenis kelamin</option>
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                          </select>
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
                          <select 
                            id="educationLevel"
                            value={formData.educationLevel} 
                            onChange={(e) => handleInputChange('educationLevel', e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Pilih tingkat pendidikan</option>
                            <option value="SD">SD</option>
                            <option value="SMP">SMP</option>
                            <option value="SMA">SMA</option>
                            <option value="SMK">SMK</option>
                            <option value="MA">MA</option>
                            <option value="Perguruan Tinggi">Perguruan Tinggi</option>
                          </select>
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

                    <div className="flex justify-end gap-4 pt-4 border-t">
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowRegistrationForm(false);
                          setFormError(null);
                        }}
                      >
                        Batal
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={formLoading}
                      >
                        {formLoading ? (
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
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 