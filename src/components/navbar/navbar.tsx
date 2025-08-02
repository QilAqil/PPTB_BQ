"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import Link from "next/link";
import { LogOut, AlertTriangle } from 'lucide-react'

interface User {
  id: string
  email: string
  name: string | null
  role: string
}

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me')
        if (response.ok) {
          const data = await response.json()
          setUser(data)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      })
      setUser(null)
      setShowLogoutConfirm(false)
      window.location.href = '/'
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 bg-background/95 backdrop-blur-sm border-b z-50">
        <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <Logo />

          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />

          <div className="flex items-center gap-3">
            {!loading && !user && (
              <>
                <Link href="/sign-in">
                  <Button variant="ghost">Masuk</Button>
                </Link>
              </>
            )}
            
            {!loading && user && (
              <>
                <Link href="/dashboard">
                  <Button variant="outline" className="hidden sm:inline-flex">
                    Dashboard
                  </Button>
                </Link>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground hidden sm:block">
                    {user.name || user.email}
                  </span>
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowLogoutConfirm(true)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Keluar
                  </Button>
                </div>
              </>
            )}

            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-900">Konfirmasi Keluar</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin keluar? Anda perlu masuk kembali untuk mengakses akun Anda.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1"
              >
                Batal
              </Button>
              <Button
                onClick={handleLogout}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Keluar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
