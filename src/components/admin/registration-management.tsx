"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Users, 
  Calendar, 
  Phone, 
  MapPin, 
  User, 
  FileText, 
  GraduationCap,
  Clock,
  AlertCircle,
  AlertTriangle
} from "lucide-react";

interface Registration {
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

export function RegistrationManagement() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/registration');
      
      if (!response.ok) {
        throw new Error('Gagal mengambil data pendaftaran');
      }
      
      const result = await response.json();
      // API mengembalikan { data: [...] }, jadi kita ambil data.data
      const data = result.data || result;
      // Memastikan data adalah array
      setRegistrations(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
      setRegistrations([]); // Set empty array jika error
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (registrationId: string, newStatus: 'APPROVED' | 'REJECTED') => {
    try {
      const response = await fetch(`/api/registration/${registrationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Gagal mengubah status pendaftaran');
      }

      // Update local state
      setRegistrations(prev => 
        prev.map(reg => 
          reg.id === registrationId 
            ? { ...reg, status: newStatus }
            : reg
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    }
  };

  const handleViewDetails = (registration: Registration) => {
    setSelectedRegistration(registration);
    setDialogOpen(true);
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
      case 'PENDING':
        return <Badge variant="secondary">Menunggu</Badge>;
      case 'APPROVED':
        return <Badge variant="default">Diterima</Badge>;
      case 'REJECTED':
        return <Badge variant="destructive">Ditolak</Badge>;
      default:
        return <Badge variant="outline">Tidak Diketahui</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'APPROVED':
        return <AlertCircle className="h-4 w-4 text-green-500" />;
      case 'REJECTED':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat data pendaftaran...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchRegistrations}>Coba Lagi</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Manajemen Pendaftaran</h2>
          <p className="text-muted-foreground">
            Kelola pendaftaran santri baru
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            Total: {Array.isArray(registrations) ? registrations.length : 0}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6">
        {Array.isArray(registrations) && registrations.map((registration) => (
          <Card key={registration.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{registration.fullName}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      NIK: {registration.nik}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(registration.status)}
                  {getStatusBadge(registration.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{registration.birthDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{registration.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{registration.birthPlace}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{registration.educationLevel}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Didaftar pada: {formatDate(registration.createdAt)}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(registration)}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Lihat Detail
                  </Button>
                  {registration.status === 'PENDING' && (
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleStatusChange(registration.id, 'APPROVED')}
                      >
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Terima
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleStatusChange(registration.id, 'REJECTED')}
                      >
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Tolak
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(!Array.isArray(registrations) || registrations.length === 0) && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Belum Ada Pendaftaran</h3>
            <p className="text-muted-foreground text-center">
              Belum ada data pendaftaran santri baru yang tersedia.
            </p>
          </CardContent>
        </Card>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detail Pendaftaran</DialogTitle>
          </DialogHeader>
          {selectedRegistration && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Nama Lengkap</Label>
                  <p className="text-sm">{selectedRegistration.fullName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">NIK</Label>
                  <p className="text-sm">{selectedRegistration.nik}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Tempat Lahir</Label>
                  <p className="text-sm">{selectedRegistration.birthPlace}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Tanggal Lahir</Label>
                  <p className="text-sm">{selectedRegistration.birthDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Jenis Kelamin</Label>
                  <p className="text-sm">{selectedRegistration.gender}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Nomor Telepon</Label>
                  <p className="text-sm">{selectedRegistration.phoneNumber}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Alamat</Label>
                <p className="text-sm">{selectedRegistration.address}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Nama Orang Tua</Label>
                  <p className="text-sm">{selectedRegistration.parentName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Telepon Orang Tua</Label>
                  <p className="text-sm">{selectedRegistration.parentPhone}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Alamat Orang Tua</Label>
                <p className="text-sm">{selectedRegistration.parentAddress}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Tingkat Pendidikan</Label>
                  <p className="text-sm">{selectedRegistration.educationLevel}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Nama Sekolah</Label>
                  <p className="text-sm">{selectedRegistration.schoolName}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Alamat Sekolah</Label>
                <p className="text-sm">{selectedRegistration.schoolAddress}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Tahun Lulus</Label>
                <p className="text-sm">{selectedRegistration.graduationYear}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Motivasi</Label>
                <p className="text-sm">{selectedRegistration.motivation}</p>
              </div>
              
              {selectedRegistration.healthCondition && (
                <div>
                  <Label className="text-sm font-medium">Kondisi Kesehatan</Label>
                  <p className="text-sm">{selectedRegistration.healthCondition}</p>
                </div>
              )}
              
              {selectedRegistration.specialNeeds && (
                <div>
                  <Label className="text-sm font-medium">Kebutuhan Khusus</Label>
                  <p className="text-sm">{selectedRegistration.specialNeeds}</p>
                </div>
              )}
              
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Status: {getStatusBadge(selectedRegistration.status)}
                </div>
                <div className="flex items-center gap-2">
                  {selectedRegistration.status === 'PENDING' && (
                    <>
                      <Button
                        onClick={() => handleStatusChange(selectedRegistration.id, 'APPROVED')}
                      >
                        Terima
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleStatusChange(selectedRegistration.id, 'REJECTED')}
                      >
                        Tolak
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 