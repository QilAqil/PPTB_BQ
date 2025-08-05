"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  FileText, 
  Calendar, 
  MapPin, 
  Shield, 
  Loader2,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Search } from 'lucide-react';


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
  motivation: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function UserPage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRegistrations, setUserRegistrations] = useState<UserRegistration[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

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
    motivation: ""
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
        motivation: ""
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

  // Filter registrations based on search term
  const filteredRegistrations = userRegistrations.filter(registration =>
    registration.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:w-80 order-2 lg:order-1">
            <Card>
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <User className="h-5 w-5 sm:h-6 sm:w-6" />
                  Profil Pengguna
                </CardTitle>
                <CardDescription className="text-sm">
                  Informasi akun Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 px-4 sm:px-6 pb-6">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg">{userProfile.name || 'N/A'}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{userProfile.email}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Role: {userProfile.role}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Bergabung: {formatDate(userProfile.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Status: {userProfile.isActive ? 'Aktif' : 'Tidak Aktif'}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button 
                    onClick={() => setShowRegistrationForm(true)}
                    className="w-full text-sm sm:text-base"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Daftar Santri Baru
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1 order-1 lg:order-2">
            <div className="space-y-4 sm:space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">Dashboard Pengguna</h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Selamat datang di panel pengguna PPTB BAROKATUL QUR&apos;AN
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Pendaftaran</p>
                        <div className="text-xl sm:text-2xl font-bold">
                          {registrationsLoading ? (
                            <div className="animate-pulse bg-gray-200 h-6 sm:h-8 w-12 sm:w-16 rounded"></div>
                          ) : (
                            userRegistrations.length
                          )}
                        </div>
                      </div>
                      <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-muted-foreground">Menunggu Review</p>
                        <div className="text-xl sm:text-2xl font-bold text-yellow-600">
                          {registrationsLoading ? (
                            <div className="animate-pulse bg-gray-200 h-6 sm:h-8 w-12 sm:w-16 rounded"></div>
                          ) : (
                            userRegistrations.filter(r => r.status === 'PENDING').length
                          )}
                        </div>
                      </div>
                      <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-muted-foreground">Disetujui</p>
                        <div className="text-xl sm:text-2xl font-bold text-green-600">
                          {registrationsLoading ? (
                            <div className="animate-pulse bg-gray-200 h-6 sm:h-8 w-12 sm:w-16 rounded"></div>
                          ) : (
                            userRegistrations.filter(r => r.status === 'APPROVED').length
                          )}
                        </div>
                      </div>
                      <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Search and Registration List */}
              <Card>
                <CardHeader className="px-4 sm:px-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
                    Riwayat Pendaftaran
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Daftar semua pendaftaran yang telah Anda ajukan
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-4 sm:px-6 pb-6">
                  {/* Search */}
                  <div className="mb-4 sm:mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Cari berdasarkan nama..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 text-sm"
                      />
                    </div>
                  </div>

                  {/* Registration List */}
                  {registrationsLoading ? (
                    <div className="flex items-center justify-center py-8 sm:py-12">
                      <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-primary mx-auto mb-4" />
                      <p className="text-sm sm:text-base text-muted-foreground">Memuat data pendaftaran...</p>
                    </div>
                  ) : userRegistrations.length === 0 ? (
                    <div className="text-center py-8 sm:py-12">
                      <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm sm:text-base text-muted-foreground mb-4">
                        Anda belum memiliki riwayat pendaftaran
                      </p>
                      <Button onClick={() => setShowRegistrationForm(true)} className="text-sm sm:text-base">
                        <Plus className="h-4 w-4 mr-2" />
                        Daftar Sekarang
                      </Button>
                    </div>
                  ) : filteredRegistrations.length === 0 ? (
                    <div className="text-center py-8 sm:py-12">
                      <Search className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm sm:text-base text-muted-foreground mb-4">
                        Tidak ada pendaftaran yang sesuai dengan pencarian
                      </p>
                      <Button variant="outline" onClick={() => setSearchTerm('')} className="text-sm sm:text-base">
                        Reset Pencarian
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3 sm:space-y-4">
                      {filteredRegistrations.map((registration) => (
                        <Card key={registration.id} className="border-l-4 border-l-primary">
                          <CardContent className="p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                              <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                                  <h3 className="font-semibold text-base sm:text-lg">{registration.fullName}</h3>
                                  {getStatusBadge(registration.status)}
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <MapPin className="h-3 w-3 flex-shrink-0" />
                                      <span className="truncate">{registration.address}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">Tempat Lahir:</span>
                                      <span>{registration.birthPlace}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">Tanggal Lahir:</span>
                                      <span>{formatDate(registration.birthDate)}</span>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">Orang Tua:</span>
                                      <span>{registration.parentName}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">Telepon:</span>
                                      <span>{registration.parentPhone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Calendar className="h-3 w-3 flex-shrink-0" />
                                      <span>Daftar: {formatDate(registration.createdAt)}</span>
                                    </div>
                                  </div>
                                </div>

                                {registration.notes && (
                                  <div className="mt-3 sm:mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <p className="text-xs sm:text-sm text-yellow-800">
                                      <strong>Catatan Admin:</strong> {registration.notes}
                                    </p>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-2 sm:ml-4">
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
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto mx-2 sm:mx-4">
              <div className="p-4 sm:p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-bold">Form Pendaftaran Santri</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowRegistrationForm(false);
                      setFormSuccess(false);
                      setFormError(null);
                    }}
                  >
                    ✕
                  </Button>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground mt-2">
                  Silakan isi form pendaftaran dengan data yang lengkap dan benar
                </p>
              </div>

              <div className="p-4 sm:p-6">
                {formSuccess ? (
                  <div className="text-center py-8 sm:py-12">
                    <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">Pendaftaran Berhasil!</h3>
                    <p className="text-sm sm:text-base text-muted-foreground mb-6">
                      Terima kasih telah mendaftar. Tim kami akan menghubungi Anda segera untuk informasi selanjutnya.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button 
                        onClick={() => {
                          setFormSuccess(false);
                          setShowRegistrationForm(false);
                        }}
                        className="flex-1 text-sm sm:text-base"
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
                            motivation: ""
                          });
                        }}
                        className="flex-1 text-sm sm:text-base"
                      >
                        Daftar Lagi
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    {formError && (
                      <div className="flex items-center gap-2 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                        <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 flex-shrink-0" />
                        <p className="text-sm sm:text-base text-red-700">{formError}</p>
                      </div>
                    )}

                    {/* Data Pribadi */}
                    <div className="space-y-3 sm:space-y-4">
                      <h3 className="text-base sm:text-lg font-semibold border-b pb-2">Data Pribadi</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <Label htmlFor="fullName" className="text-sm">Nama Lengkap *</Label>
                          <Input
                            id="fullName"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            required
                            className="text-sm"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="nik" className="text-sm">NIK (Nomor Induk Kependudukan) *</Label>
                          <Input
                            id="nik"
                            value={formData.nik}
                            onChange={(e) => handleInputChange('nik', e.target.value)}
                            placeholder="Contoh: 3374010101010001"
                            maxLength={16}
                            required
                            className="text-sm"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="birthPlace" className="text-sm">Tempat Lahir *</Label>
                          <Input
                            id="birthPlace"
                            value={formData.birthPlace}
                            onChange={(e) => handleInputChange('birthPlace', e.target.value)}
                            required
                            className="text-sm"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="birthDate" className="text-sm">Tanggal Lahir *</Label>
                          <Input
                            id="birthDate"
                            type="date"
                            value={formData.birthDate}
                            onChange={(e) => handleInputChange('birthDate', e.target.value)}
                            required
                            className="text-sm"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="gender" className="text-sm">Jenis Kelamin *</Label>
                          <select 
                            id="gender"
                            value={formData.gender} 
                            onChange={(e) => handleInputChange('gender', e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          >
                            <option value="">Pilih jenis kelamin</option>
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="address" className="text-sm">Alamat Lengkap *</Label>
                        <Textarea
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          required
                          rows={3}
                          className="text-sm"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phoneNumber" className="text-sm">Nomor Telepon *</Label>
                        <Input
                          id="phoneNumber"
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                          placeholder="Contoh: 081234567890"
                          required
                          className="text-sm"
                        />
                      </div>
                    </div>

                    {/* Data Orang Tua */}
                    <div className="space-y-3 sm:space-y-4">
                      <h3 className="text-base sm:text-lg font-semibold border-b pb-2">Data Orang Tua</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <Label htmlFor="parentName" className="text-sm">Nama Orang Tua *</Label>
                          <Input
                            id="parentName"
                            value={formData.parentName}
                            onChange={(e) => handleInputChange('parentName', e.target.value)}
                            required
                            className="text-sm"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="parentPhone" className="text-sm">Nomor Telepon Orang Tua *</Label>
                          <Input
                            id="parentPhone"
                            type="tel"
                            value={formData.parentPhone}
                            onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                            placeholder="Contoh: 081234567890"
                            required
                            className="text-sm"
                          />
                        </div>
                      </div>
                      
                    </div>

                    {/* Motivasi */}
                    <div className="space-y-3 sm:space-y-4">
                      <h3 className="text-base sm:text-lg font-semibold border-b pb-2">Motivasi</h3>
                      
                      <div>
                        <Label htmlFor="motivation" className="text-sm">Motivasi Masuk Pesantren *</Label>
                        <Textarea
                          id="motivation"
                          value={formData.motivation}
                          onChange={(e) => handleInputChange('motivation', e.target.value)}
                          required
                          rows={4}
                          placeholder="Jelaskan motivasi Anda untuk masuk pesantren..."
                          className="text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 border-t">
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowRegistrationForm(false);
                          setFormError(null);
                        }}
                        className="text-sm sm:text-base"
                      >
                        Batal
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={formLoading}
                        className="text-sm sm:text-base"
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