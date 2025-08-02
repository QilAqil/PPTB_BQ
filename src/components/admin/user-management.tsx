"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Plus, 
  Search, 
  Filter,
  Eye,
  Edit,
  Trash2,
  Loader2,
  AlertCircle,
  Shield,
  Mail,
  Calendar
} from 'lucide-react';
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
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserDetail, setShowUserDetail] = useState(false);

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
      const response = await fetch('/api/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || data || []);
      } else if (response.status === 403) {
        console.error('Access denied: Admin privileges required');
        // Show access denied message
        setUsers([]);
      } else {
        console.error('Failed to fetch users');
        setUsers([]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUserCreated = () => {
    fetchUsers();
    fetchStats();
    setShowCreateForm(false);
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus user ini?')) return;

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchUsers();
        fetchStats();
      } else {
        alert('Gagal menghapus user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Terjadi kesalahan saat menghapus user');
    }
  };

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Memuat data pengguna...</p>
        </div>
      </div>
    );
  }

  // Check if user has access (if no users loaded and not loading, likely no access)
  if (users.length === 0 && !loading && !statsLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center max-w-md">
          <Shield className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Akses Ditolak</h2>
          <p className="text-muted-foreground mb-6">
            Anda tidak memiliki hak akses admin untuk melihat halaman ini. 
            Silakan login dengan akun yang memiliki role ADMIN.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-800 mb-2">Akun Admin yang Tersedia:</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p>• Email: sa.saidaqil@gmail.com</p>
              <p>• Email: admin@example.com</p>
              <p>• Password: password123 (untuk admin@example.com)</p>
            </div>
          </div>
          <Button onClick={() => window.location.href = '/sign-in'}>
            Login dengan Akun Admin
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                                 <div className="text-2xl font-bold">
                   {statsLoading ? (
                     <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
                   ) : (
                     stats?.totalUsers || 0
                   )}
                 </div>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                                 <div className="text-2xl font-bold text-green-600">
                   {statsLoading ? (
                     <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
                   ) : (
                     stats?.activeUsers || 0
                   )}
                 </div>
              </div>
              <UserCheck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Admins</p>
                                 <div className="text-2xl font-bold text-purple-600">
                   {statsLoading ? (
                     <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
                   ) : (
                     stats?.totalAdmins || 0
                   )}
                 </div>
              </div>
              <Shield className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Daftar Pengguna</CardTitle>
              <CardDescription>
                Kelola semua pengguna dalam sistem
              </CardDescription>
            </div>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari user berdasarkan nama, email, atau role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">User</th>
                  <th className="text-left py-3 px-4 font-medium">Role</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Joined</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{user.name || 'N/A'}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant={user.role === 'ADMIN' ? 'default' : 'secondary'}
                        className={user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : ''}
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {user.isActive ? (
                          <UserCheck className="h-4 w-4 text-green-500" />
                        ) : (
                          <UserX className="h-4 w-4 text-red-500" />
                        )}
                        <Badge variant={user.isActive ? 'default' : 'destructive'}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(user.createdAt)}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setShowUserDetail(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            // Handle edit user
                            alert('Edit user functionality coming soon');
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {searchTerm ? 'Tidak ada user yang sesuai dengan pencarian' : 'Belum ada user terdaftar'}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Create User Form Modal */}
      {showCreateForm && (
        <CreateUserForm
          onUserCreated={handleUserCreated}
          onClose={() => setShowCreateForm(false)}
        />
      )}

      {/* User Detail Modal */}
      <Dialog open={showUserDetail} onOpenChange={setShowUserDetail}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Detail User</DialogTitle>
            <DialogDescription>
              Informasi lengkap tentang user
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nama</label>
                <p className="text-sm text-muted-foreground">{selectedUser.name || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Role</label>
                <Badge variant={selectedUser.role === 'ADMIN' ? 'default' : 'secondary'}>
                  {selectedUser.role}
                </Badge>
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <div className="flex items-center gap-2">
                  {selectedUser.isActive ? (
                    <UserCheck className="h-4 w-4 text-green-500" />
                  ) : (
                    <UserX className="h-4 w-4 text-red-500" />
                  )}
                  <Badge variant={selectedUser.isActive ? 'default' : 'destructive'}>
                    {selectedUser.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Email Verified</label>
                <Badge variant={selectedUser.isVerified ? 'default' : 'secondary'}>
                  {selectedUser.isVerified ? 'Verified' : 'Not Verified'}
                </Badge>
              </div>
              <div>
                <label className="text-sm font-medium">Tanggal Bergabung</label>
                <p className="text-sm text-muted-foreground">{formatDate(selectedUser.createdAt)}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUserDetail(false)}>
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 