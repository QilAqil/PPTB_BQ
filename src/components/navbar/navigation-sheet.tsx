"use client"

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, User, ChevronDown, ChevronRight } from "lucide-react";
import { Logo } from "./logo";
import Link from "next/link";

interface User {
  id: string
  email: string
  name: string | null
  role: string
}

export const NavigationSheet = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

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

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <Logo />
        
        {/* Mobile Navigation Menu */}
        <div className="mt-12 space-y-4">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start">
              Beranda
            </Button>
          </Link>
          
          <Link href="/news">
            <Button variant="ghost" className="w-full justify-start">
              Berita
            </Button>
          </Link>
          
          {/* Profile Dropdown */}
          <div className="space-y-2">
            <Button 
              variant="ghost" 
              className="w-full justify-between"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <span>Profil</span>
              {showProfileMenu ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
            
            {showProfileMenu && (
              <div className="ml-4 space-y-2 border-l pl-4">
                <Link href="/khodimul-mahad">
                  <Button variant="ghost" className="w-full justify-start text-sm">
                    Khodimul Ma&apos;had
                  </Button>
                </Link>
                <Link href="/sejarah">
                  <Button variant="ghost" className="w-full justify-start text-sm">
                    Sejarah
                  </Button>
                </Link>
                <Link href="/gallery">
                  <Button variant="ghost" className="w-full justify-start text-sm">
                    Galeri
                  </Button>
                </Link>
                <Link href="/doa">
                  <Button variant="ghost" className="w-full justify-start text-sm">
                    Do&apos;a-do&apos;a
                  </Button>
                </Link>
              </div>
            )}
          </div>
          
          <Link href="#">
            <Button variant="ghost" className="w-full justify-start">
              Tentang
            </Button>
          </Link>
          
          <Link href="/contact">
            <Button variant="ghost" className="w-full justify-start">
              Kontak
            </Button>
          </Link>
          
          {user && user.role === 'ADMIN' && (
            <Link href="/admin">
              <Button variant="ghost" className="w-full justify-start">
                Admin
              </Button>
            </Link>
          )}
        </div>
        
        {/* User Dashboard Links */}
        {!loading && user && (
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Dashboard</h3>
            <div className="space-y-2">
              <Link href="/dashboard">
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
