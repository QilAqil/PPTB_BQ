"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Shield, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  role: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          
          // Auto redirect based on role
          setTimeout(() => {
            setRedirecting(true);
            if (data.role === 'ADMIN') {
              router.push('/admin');
            } else if (data.role === 'USER') {
              router.push('/user');
            } else {
              router.push('/');
            }
          }, 2000); // 2 second delay to show the dashboard info
        } else {
          // Not authenticated, redirect to home
          router.push('/');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Memeriksa status login...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Akses Ditolak</h2>
              <p className="text-muted-foreground mb-6">
                Anda harus login terlebih dahulu untuk mengakses dashboard.
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold mb-2">
            Selamat Datang di Dashboard
          </CardTitle>
          <CardDescription>
            Mengarahkan Anda ke dashboard yang sesuai dengan role Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* User Info */}
          <div className="text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              {user.role === 'ADMIN' ? (
                <Shield className="h-10 w-10 text-primary" />
              ) : (
                <User className="h-10 w-10 text-primary" />
              )}
            </div>
            <h3 className="font-semibold text-lg mb-1">{user.name || 'N/A'}</h3>
            <p className="text-sm text-muted-foreground mb-2">{user.email}</p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {user.role === 'ADMIN' ? (
                <>
                  <Shield className="h-4 w-4" />
                  Administrator
                </>
              ) : (
                <>
                  <User className="h-4 w-4" />
                  User
                </>
              )}
            </div>
          </div>

          {/* Dashboard Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Dashboard yang Tersedia:</h4>
            <div className="space-y-2 text-sm text-blue-700">
              {user.role === 'ADMIN' ? (
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Admin Panel - Manajemen user, berita, galeri, dan registrasi</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>User Dashboard - Riwayat pendaftaran dan form pendaftaran</span>
                </div>
              )}
            </div>
          </div>

          {/* Manual Navigation */}
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground text-center">
              Atau klik tombol di bawah untuk navigasi manual:
            </p>
            <div className="flex gap-3">
              {user.role === 'ADMIN' ? (
                <Link href="/admin" className="flex-1">
                  <Button className="w-full">
                    <Shield className="h-4 w-4 mr-2" />
                    Admin Panel
                  </Button>
                </Link>
              ) : (
                <Link href="/user" className="flex-1">
                  <Button className="w-full">
                    <User className="h-4 w-4 mr-2" />
                    User Dashboard
                  </Button>
                </Link>
              )}
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full">
                  Beranda
                </Button>
              </Link>
            </div>
          </div>

          {/* Redirect Status */}
          {redirecting && (
            <div className="text-center">
              <Loader2 className="h-6 w-6 animate-spin text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Mengarahkan ke dashboard...
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 