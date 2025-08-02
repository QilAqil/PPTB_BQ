"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  Calendar,
  Phone,
  MapPin,
  User,
  GraduationCap,
  Heart,
  AlertCircle,
  CreditCard
} from "lucide-react";
import RegistrationDialog from "./registration-dialog";

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
  graduationYear?: number;
  motivation: string;
  healthCondition?: string;
  specialNeeds?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  notes?: string;
  processedBy?: string;
  processedAt?: string;
  createdAt: string;
  processedByUser?: {
    name: string;
    email: string;
  };
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function RegistrationManagement() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [processing, setProcessing] = useState(false);
  const [notes, setNotes] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [processingRegistrationId, setProcessingRegistrationId] = useState<string | null>(null);

  const resetDialog = () => {
    setSelectedRegistration(null);
    setNotes("");
    setDialogOpen(false);
    setProcessing(false);
    setProcessingRegistrationId(null);
  };

  useEffect(() => {
    fetchRegistrations();
  }, [pagination.page, search, statusFilter]);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        search,
        status: statusFilter
      });

      const response = await fetch(`/api/registration?${params}`);
      if (!response.ok) {
        throw new Error('Gagal mengambil data pendaftaran');
      }

      const data = await response.json();
      setRegistrations(data.registrations);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (registrationId: string, status: 'APPROVED' | 'REJECTED', notes?: string) => {
    try {
      setProcessing(true);
      setProcessingRegistrationId(registrationId);
      setError(null); // Clear previous errors
      
      console.log('Updating registration:', registrationId, 'with status:', status, 'notes:', notes);
      
      const response = await fetch(`/api/registration/${registrationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
          notes: notes || ""
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        let errorMessage = 'Gagal mengupdate status pendaftaran';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (parseError) {
          const errorText = await response.text();
          console.error('Error response text:', errorText);
          errorMessage = `HTTP ${response.status}: ${errorText}`;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('Success response:', result);

      // Refresh data
      await fetchRegistrations();
      resetDialog();
      setSuccessMessage(`Pendaftaran berhasil ${status === 'APPROVED' ? 'disetujui' : 'ditolak'}`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Error in handleStatusUpdate:', err);
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setProcessing(false);
      setProcessingRegistrationId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Badge variant="secondary">Menunggu</Badge>;
      case 'APPROVED':
        return <Badge className="bg-green-500">Disetujui</Badge>;
      case 'REJECTED':
        return <Badge variant="destructive">Ditolak</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
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

  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  if (loading && registrations.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {successMessage && (
        <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <p className="text-green-700">{successMessage}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <div className="flex-1">
            <p className="text-red-700 font-medium">Error:</p>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setError(null)}
            className="ml-auto"
          >
            ✕
          </Button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Manajemen Pendaftaran</h2>
          <p className="text-muted-foreground">
            Kelola pendaftaran santri baru
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter & Pencarian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama, NIK, nomor telepon..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="ALL">Semua Status</option>
              <option value="PENDING">Menunggu</option>
              <option value="APPROVED">Disetujui</option>
              <option value="REJECTED">Ditolak</option>
            </Select>
            <Button onClick={fetchRegistrations} variant="outline">
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>



      {/* Registrations List */}
      <div className="grid gap-4">
        {registrations.map((registration) => (
          <Card key={registration.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold">{registration.fullName}</h3>
                      <p className="text-sm text-muted-foreground">
                        NIK: {registration.nik}
                      </p>
                    </div>
                    {getStatusBadge(registration.status)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(registration.birthDate)} ({calculateAge(registration.birthDate)} tahun)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{registration.phoneNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{registration.parentName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <span>{registration.educationLevel} - {registration.schoolName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{registration.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span>{registration.gender}</span>
                    </div>
                  </div>
                  
                  {registration.notes && (
                    <div className="mt-3 p-3 bg-muted rounded-lg">
                      <p className="text-sm">
                        <strong>Catatan:</strong> {registration.notes}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        Detail
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Detail Pendaftaran</DialogTitle>
                        <DialogDescription>
                          Informasi lengkap pendaftar
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Nama Lengkap</label>
                            <p className="text-sm">{registration.fullName}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">NIK</label>
                            <p className="text-sm">{registration.nik}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Tempat Lahir</label>
                            <p className="text-sm">{registration.birthPlace}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Tanggal Lahir</label>
                            <p className="text-sm">{formatDate(registration.birthDate)}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Jenis Kelamin</label>
                            <p className="text-sm">{registration.gender}</p>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium">Alamat</label>
                          <p className="text-sm">{registration.address}</p>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium">Nomor Telepon</label>
                          <p className="text-sm">{registration.phoneNumber}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Nama Orang Tua</label>
                            <p className="text-sm">{registration.parentName}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Telepon Orang Tua</label>
                            <p className="text-sm">{registration.parentPhone}</p>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium">Alamat Orang Tua</label>
                          <p className="text-sm">{registration.parentAddress}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Tingkat Pendidikan</label>
                            <p className="text-sm">{registration.educationLevel}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Tahun Lulus</label>
                            <p className="text-sm">{registration.graduationYear || '-'}</p>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium">Nama Sekolah</label>
                          <p className="text-sm">{registration.schoolName}</p>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium">Alamat Sekolah</label>
                          <p className="text-sm">{registration.schoolAddress}</p>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium">Motivasi</label>
                          <p className="text-sm">{registration.motivation}</p>
                        </div>
                        
                        {registration.healthCondition && (
                          <div>
                            <label className="text-sm font-medium">Kondisi Kesehatan</label>
                            <p className="text-sm">{registration.healthCondition}</p>
                          </div>
                        )}
                        
                        {registration.specialNeeds && (
                          <div>
                            <label className="text-sm font-medium">Kebutuhan Khusus</label>
                            <p className="text-sm">{registration.specialNeeds}</p>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  {registration.status === 'PENDING' && (
                    <RegistrationDialog 
                      registration={registration}
                      onStatusUpdate={handleStatusUpdate}
                      processing={processing && processingRegistrationId === registration.id}
                    />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Menampilkan {((pagination.page - 1) * pagination.limit) + 1} - {Math.min(pagination.page * pagination.limit, pagination.total)} dari {pagination.total} pendaftaran
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page === 1}
            >
              Sebelumnya
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page === pagination.totalPages}
            >
              Selanjutnya
            </Button>
          </div>
        </div>
      )}

      {registrations.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Tidak ada pendaftaran yang ditemukan.</p>
        </div>
      )}
    </div>
  );
} 