"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  CheckCircle,
  XCircle,
  Search,
  RefreshCw
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
  motivation: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export function RegistrationManagement() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL');

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
      const data = result.data || result;
      setRegistrations(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
      setRegistrations([]);
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Menunggu</Badge>;
      case 'APPROVED':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Diterima</Badge>;
      case 'REJECTED':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Ditolak</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const filteredRegistrations = registrations.filter(registration => {
    const matchesSearch = registration.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         registration.nik.includes(searchTerm) ||
                         registration.parentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || registration.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: registrations.length,
    pending: registrations.filter(r => r.status === 'PENDING').length,
    approved: registrations.filter(r => r.status === 'APPROVED').length,
    rejected: registrations.filter(r => r.status === 'REJECTED').length,
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Cari berdasarkan nama, NIK, atau nama orang tua..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button 
            onClick={fetchRegistrations} 
            variant="outline" 
            size="sm"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Button
            variant={statusFilter === 'ALL' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('ALL')}
            className="text-sm h-10"
          >
            Semua ({stats.total})
          </Button>
          <Button
            variant={statusFilter === 'PENDING' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('PENDING')}
            className="text-sm h-10"
          >
            Menunggu ({stats.pending})
          </Button>
          <Button
            variant={statusFilter === 'APPROVED' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('APPROVED')}
            className="text-sm h-10"
          >
            Diterima ({stats.approved})
          </Button>
          <Button
            variant={statusFilter === 'REJECTED' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('REJECTED')}
            className="text-sm h-10"
          >
            Ditolak ({stats.rejected})
          </Button>
        </div>
      </div>

      {/* Registrations List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat data pendaftaran...</p>
                  </div>
                </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchRegistrations} variant="outline">
              Coba Lagi
            </Button>
          </div>
        ) : filteredRegistrations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">
              {searchTerm || statusFilter !== 'ALL' 
                ? 'Tidak ada pendaftaran yang sesuai dengan filter'
                : 'Belum ada pendaftaran yang terdaftar'
              }
            </p>
            {(searchTerm || statusFilter !== 'ALL') && (
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('ALL');
                }} 
                variant="outline" 
                className="mt-4"
              >
                Reset Filter
              </Button>
            )}
          </div>
        ) : (
          filteredRegistrations.map((registration) => (
            <Card key={registration.id}>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{registration.fullName}</h3>
                  {getStatusBadge(registration.status)}
                </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>NIK: {registration.nik}</p>
                      <p>Alamat: {registration.address}</p>
                      <p>Orang Tua: {registration.parentName}</p>
                      <p>Telepon: {registration.phoneNumber}</p>
                      <p>Daftar: {formatDate(registration.createdAt)}</p>
                 </div>
              </div>
              
                  {registration.status === 'PENDING' && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(registration.id, 'APPROVED')}
                        className="text-green-600 border-green-600 hover:bg-green-50"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Terima
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(registration.id, 'REJECTED')}
                        className="text-red-600 border-red-600 hover:bg-red-50"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Tolak
                      </Button>
                    </div>
                  )}
              </div>
            </CardContent>
          </Card>
          ))
        )}
      </div>
    </div>
  );
} 