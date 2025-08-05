"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Users, 
  Search, 
  Loader2, 
  User,
  Plus,
  Shield,
  UserCheck,
  Trash2
} from "lucide-react"
import CreateUserForm from './create-user-form';

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
}

interface Stats {
  totalUsers: number;
  activeUsers: number;
  totalAdmins: number;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  // const [selectedUser, setSelectedUser] = useState<User | null>(null);
  // const [showUserDetail, setShowUserDetail] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setStatsLoading(true);
      const response = await fetch('/api/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else if (response.status === 403) {
        console.error('Access denied: Admin privileges required');
        // Don't show error to user, just don't load stats
      } else {
        console.error('Failed to fetch stats');
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setStatsLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/users');
      if (response.ok) {
        const result = await response.json();
        setUsers(result.data || result || []);
      } else if (response.status === 403) {
        setError('Anda tidak memiliki hak akses admin untuk melihat halaman ini.');
        setUsers([]);
      } else {
        setError('Gagal mengambil data pengguna');
        setUsers([]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Terjadi kesalahan saat mengambil data pengguna');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUserCreated = () => {
    fetchUsers();
    fetchStats();
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
      return;
    }

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers(users.filter(user => user.id !== userId));
        fetchStats(); // Refresh stats
      } else {
        alert('Gagal menghapus pengguna');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Terjadi kesalahan saat menghapus pengguna');
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

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Manajemen Pengguna</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Kelola pengguna dan admin sistem
          </p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(true)}
          className="w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          Tambah Pengguna
        </Button>
      </div>

      {/* Stats Cards */}
      {statsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-4 sm:p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : stats && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Users</p>
                  <div className="text-xl sm:text-2xl font-bold">{stats.totalUsers}</div>
                </div>
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Active Users</p>
                  <div className="text-xl sm:text-2xl font-bold text-green-600">{stats.activeUsers}</div>
                </div>
                <UserCheck className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Admins</p>
                  <div className="text-xl sm:text-2xl font-bold text-purple-600">{stats.totalAdmins}</div>
                </div>
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Search and Users List */}
      <Card>
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Users className="h-5 w-5 sm:h-6 sm:w-6" />
            Daftar Pengguna
          </CardTitle>
          <CardDescription className="text-sm">
            Semua pengguna yang terdaftar dalam sistem
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-6">
          {/* Search */}
          <div className="mb-4 sm:mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari berdasarkan nama atau email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-sm"
              />
            </div>
          </div>

          {/* Users List */}
          {loading ? (
            <div className="flex items-center justify-center py-8 sm:py-12">
              <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-primary mx-auto mb-4" />
              <p className="text-sm sm:text-base text-muted-foreground">Memuat data pengguna...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 sm:py-12">
              <Shield className="h-12 w-12 sm:h-16 sm:w-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Error</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4">{error}</p>
              <Button onClick={fetchUsers} variant="outline">
                Coba Lagi
              </Button>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <Users className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Tidak Ada Pengguna</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4">
                {searchTerm ? 'Tidak ada pengguna yang sesuai dengan pencarian' : 'Belum ada pengguna yang terdaftar'}
              </p>
              {searchTerm && (
                <Button variant="outline" onClick={() => setSearchTerm('')}>
                  Reset Pencarian
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {filteredUsers.map((user) => (
                <Card key={user.id} className="border-l-4 border-l-primary">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <User className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-base sm:text-lg">{user.name || 'N/A'}</h3>
                              <p className="text-xs sm:text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant={user.role === 'ADMIN' ? 'default' : 'secondary'} className="text-xs">
                              {user.role}
                            </Badge>
                            <Badge variant={user.isActive ? 'default' : 'destructive'} className="text-xs">
                              {user.isActive ? 'Aktif' : 'Tidak Aktif'}
                            </Badge>
                            {user.isVerified && (
                              <Badge variant="outline" className="text-xs">
                                Terverifikasi
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">Bergabung:</span> {formatDate(user.createdAt)}
                          </div>
                          <div>
                            <span className="font-medium">Status:</span> {user.isActive ? 'Aktif' : 'Tidak Aktif'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-xs sm:text-sm"
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          Hapus
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create User Dialog */}
      <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
        <DialogContent className="max-w-md sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Tambah Pengguna Baru</DialogTitle>
            <DialogDescription className="text-sm">
              Buat akun pengguna baru untuk sistem
            </DialogDescription>
          </DialogHeader>
          <CreateUserForm onUserCreated={handleUserCreated} onClose={() => setShowCreateForm(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
} 