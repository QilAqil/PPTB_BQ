"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Shield, User } from 'lucide-react';
import LogoutButton from '@/components/ui/logout-button';
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
            if (data.role === 'USER') {
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
        <Card className="w-full max-w-sm sm:max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <Shield className="h-12 w-12 sm:h-16 sm:w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Akses Ditolak</h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-6">
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-3 sm:p-4">
      <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl">
        <CardHeader className="text-center px-4 sm:px-6">
          <CardTitle className="text-2xl sm:text-3xl font-bold mb-2">
            Selamat Datang di Dashboard
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Mengarahkan Anda ke dashboard yang sesuai dengan role Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6 pb-6">
          {/* User Info */}
          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <User className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
            </div>
            <h3 className="font-semibold text-base sm:text-lg mb-1">{user.name || 'N/A'}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-2">{user.email}</p>
            <div className="inline-flex items-center gap-2 px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-medium">
              <User className="h-3 w-3 sm:h-4 sm:w-4" />
              User
            </div>
          </div>

          {/* Dashboard Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
            <h4 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">Dashboard yang Tersedia:</h4>
            <div className="space-y-2 text-xs sm:text-sm text-blue-700">
              <div className="flex items-center gap-2">
                <User className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span>User Dashboard - Riwayat pendaftaran dan form pendaftaran</span>
              </div>
            </div>
          </div>

          {/* Manual Navigation */}
          <div className="space-y-3">
            <p className="text-xs sm:text-sm text-muted-foreground text-center">
              Atau klik tombol di bawah untuk navigasi manual:
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/user" className="flex-1">
                <Button className="w-full text-sm sm:text-base">
                  <User className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  User Dashboard
                </Button>
              </Link>
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full text-sm sm:text-base">
                  Beranda
                </Button>
              </Link>
            </div>
            
            <div className="pt-4 border-t">
              <LogoutButton 
                variant="outline"
                className="w-full text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Redirect Status */}
          {redirecting && (
            <div className="text-center">
              <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin text-primary mx-auto mb-2" />
              <p className="text-xs sm:text-sm text-muted-foreground">
                Mengarahkan ke dashboard...
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 