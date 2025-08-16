"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  CheckCircle,
  XCircle,
  Search,
  RefreshCw,
  Eye,
  User,
  Calendar,
  MapPin,
  Phone,
  MessageSquare,
  Clock,
  Edit,
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
  status: "PENDING" | "APPROVED" | "REJECTED";
  notes: string | null;
  processedBy: string | null;
  processedAt: string | null;
  createdAt: string;
  updatedAt: string;
  processedByUser?: {
    name: string;
    email: string;
  } | null;
}

export function RegistrationManagement() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "PENDING" | "APPROVED" | "REJECTED"
  >("ALL");
  const [selectedRegistration, setSelectedRegistration] =
    useState<Registration | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [isUpdatingNotes, setIsUpdatingNotes] = useState(false);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/registration");
      
      if (!response.ok) {
        throw new Error("Gagal mengambil data pendaftaran");
      }
      
      const result = await response.json();
      const data = result.data || result;
      setRegistrations(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      setRegistrations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (
    registrationId: string,
    newStatus: "APPROVED" | "REJECTED"
  ) => {
    try {
      const response = await fetch(`/api/registration/${registrationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Gagal mengubah status pendaftaran");
      }

      setRegistrations((prev) =>
        prev.map((reg) =>
          reg.id === registrationId ? { ...reg, status: newStatus } : reg
        )
      );

      // Update selected registration if it's the same one
      if (selectedRegistration?.id === registrationId) {
        setSelectedRegistration((prev) =>
          prev ? { ...prev, status: newStatus } : null
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    }
  };

  const handleUpdateNotes = async (registrationId: string, notes: string) => {
    try {
      setIsUpdatingNotes(true);
      const response = await fetch(`/api/registration/${registrationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes }),
      });

      if (!response.ok) {
        throw new Error("Gagal mengupdate catatan");
      }

      setRegistrations((prev) =>
        prev.map((reg) => (reg.id === registrationId ? { ...reg, notes } : reg))
      );

      // Update selected registration if it's the same one
      if (selectedRegistration?.id === registrationId) {
        setSelectedRegistration((prev) => (prev ? { ...prev, notes } : null));
      }

      setAdminNotes("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsUpdatingNotes(false);
    }
  };

  const openDetailModal = (registration: Registration) => {
    setSelectedRegistration(registration);
    setAdminNotes(registration.notes || "");
    setIsDetailOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Menunggu
          </Badge>
        );
      case "APPROVED":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Diterima
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Ditolak
          </Badge>
        );
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const filteredRegistrations = registrations.filter((registration) => {
    const matchesSearch =
      registration.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         registration.nik.includes(searchTerm) ||
                         registration.parentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || registration.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: registrations.length,
    pending: registrations.filter((r) => r.status === "PENDING").length,
    approved: registrations.filter((r) => r.status === "APPROVED").length,
    rejected: registrations.filter((r) => r.status === "REJECTED").length,
  };

  return (
    <div className="space-y-6">
      {/* Statistics Overview */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Pendaftaran
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.total}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Menunggu Review
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.pending}
                </p>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Diterima</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.approved}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ditolak</p>
                <p className="text-2xl font-bold text-red-600">
                  {stats.rejected}
                </p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div> */}

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
            <RefreshCw
              className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Button
            variant={statusFilter === "ALL" ? "default" : "outline"}
            onClick={() => setStatusFilter("ALL")}
            className="text-sm h-10"
          >
            Semua ({stats.total})
          </Button>
          <Button
            variant={statusFilter === "PENDING" ? "default" : "outline"}
            onClick={() => setStatusFilter("PENDING")}
            className="text-sm h-10"
          >
            Menunggu ({stats.pending})
          </Button>
          <Button
            variant={statusFilter === "APPROVED" ? "default" : "outline"}
            onClick={() => setStatusFilter("APPROVED")}
            className="text-sm h-10"
          >
            Diterima ({stats.approved})
          </Button>
          <Button
            variant={statusFilter === "REJECTED" ? "default" : "outline"}
            onClick={() => setStatusFilter("REJECTED")}
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
              {searchTerm || statusFilter !== "ALL"
                ? "Tidak ada pendaftaran yang sesuai dengan filter"
                : "Belum ada pendaftaran yang terdaftar"}
            </p>
            {(searchTerm || statusFilter !== "ALL") && (
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("ALL");
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
            <Card
              key={registration.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                      <h3 className="font-semibold text-lg text-gray-900">
                        {registration.fullName}
                      </h3>
                      {getStatusBadge(registration.status)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span>NIK: {registration.nik}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>
                            TTL: {registration.birthPlace},{" "}
                            {formatDate(registration.birthDate)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>Alamat: {registration.address}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span>Telepon: {registration.phoneNumber}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span>Orang Tua: {registration.parentName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span>
                            Daftar: {formatDate(registration.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">
                          Motivasi:
                        </span>
                        <p className="text-gray-600 mt-1 line-clamp-2">
                          {registration.motivation.length > 100
                            ? `${registration.motivation.substring(0, 100)}...`
                            : registration.motivation}
                        </p>
                      </div>

                      <div>
                        {/* <span className="font-medium text-gray-700">
                          Status:
                        </span> */}
                        <div className="mt-1">
                  {/* {getStatusBadge(registration.status)} */}
                </div>
                 </div>
              </div>
              
                    {registration.notes && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageSquare className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-800">
                            Catatan Admin:
                          </span>
                        </div>
                        <p className="text-sm text-blue-700">
                          {registration.notes}
                        </p>
                      </div>
                    )}

                    {registration.processedBy && registration.processedAt && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">
                            Diproses:
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                          <span>
                            Oleh:{" "}
                            {registration.processedByUser?.name || "Admin"}
                          </span>
                          <span>
                            Tanggal: {formatDate(registration.processedAt)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 lg:items-end">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openDetailModal(registration)}
                        className="text-blue-600 border-blue-600 hover:bg-blue-50"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Detail
                      </Button>

                      {registration.status === "PENDING" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleStatusChange(registration.id, "APPROVED")
                            }
                            className="text-green-600 border-green-600 hover:bg-green-50"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Terima
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                            onClick={() =>
                              handleStatusChange(registration.id, "REJECTED")
                            }
                        className="text-red-600 border-red-600 hover:bg-red-50"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Tolak
                      </Button>
                        </>
                      )}
                    </div>
                  </div>
              </div>
            </CardContent>
          </Card>
          ))
        )}
      </div>

      {/* Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Detail Pendaftar: {selectedRegistration?.fullName}
            </DialogTitle>
          </DialogHeader>

          {selectedRegistration && (
            <div className="space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informasi Pribadi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Nama Lengkap
                      </label>
                      <p className="text-gray-900">
                        {selectedRegistration.fullName}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        NIK
                      </label>
                      <p className="text-gray-900">
                        {selectedRegistration.nik}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Tempat Lahir
                      </label>
                      <p className="text-gray-900">
                        {selectedRegistration.birthPlace}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Tanggal Lahir
                      </label>
                      <p className="text-gray-900">
                        {formatDate(selectedRegistration.birthDate)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Jenis Kelamin
                      </label>
                      <p className="text-gray-900">
                        {selectedRegistration.gender}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Alamat Lengkap
                    </label>
                    <p className="text-gray-900">
                      {selectedRegistration.address}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informasi Kontak</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Nomor Telepon
                      </label>
                      <p className="text-gray-900">
                        {selectedRegistration.phoneNumber}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Nama Orang Tua
                      </label>
                      <p className="text-gray-900">
                        {selectedRegistration.parentName}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Telepon Orang Tua
                      </label>
                      <p className="text-gray-900">
                        {selectedRegistration.parentPhone}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Motivation */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Motivasi & Alasan Mendaftar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {selectedRegistration.motivation}
                  </p>
                </CardContent>
              </Card>

              {/* Registration Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Status Pendaftaran</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700">
                      Status:
                    </span>
                    {getStatusBadge(selectedRegistration.status)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Tanggal Daftar
                      </label>
                      <p className="text-gray-900">
                        {formatDate(selectedRegistration.createdAt)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Terakhir Diupdate
                      </label>
                      <p className="text-gray-900">
                        {formatDate(selectedRegistration.updatedAt)}
                      </p>
                    </div>
                  </div>

                  {selectedRegistration.processedBy &&
                    selectedRegistration.processedAt && (
                      <div className="pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <label className="text-sm font-medium text-gray-700">
                              Diproses Oleh
                            </label>
                            <p className="text-gray-900">
                              {selectedRegistration.processedByUser?.name ||
                                "Admin"}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">
                              Tanggal Diproses
                            </label>
                            <p className="text-gray-900">
                              {formatDate(selectedRegistration.processedAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                </CardContent>
              </Card>

              {/* Admin Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Catatan Admin</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Tambahkan catatan admin..."
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={4}
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={() =>
                        handleUpdateNotes(selectedRegistration.id, adminNotes)
                      }
                      disabled={isUpdatingNotes}
                      className="flex-1"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      {isUpdatingNotes ? "Menyimpan..." : "Simpan Catatan"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              {selectedRegistration.status === "PENDING" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Aksi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-3">
                      <Button
                        onClick={() =>
                          handleStatusChange(
                            selectedRegistration.id,
                            "APPROVED"
                          )
                        }
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Terima Pendaftaran
                      </Button>
                      <Button
                        onClick={() =>
                          handleStatusChange(
                            selectedRegistration.id,
                            "REJECTED"
                          )
                        }
                        variant="outline"
                        className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Tolak Pendaftaran
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 
