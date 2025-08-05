"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, User, ChevronDown, ChevronRight } from "lucide-react";
import { Logo } from "./logo";
import Link from "next/link";
import { useAuth } from '@/hooks/useAuth'

export const NavigationSheet = () => {
  const { user, loading, isAdmin } = useAuth()
  const [showProfileMenu, setShowProfileMenu] = useState(false)

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
                <Link href="/prayers">
                  <Button variant="ghost" className="w-full justify-start text-sm">
                    Do&apos;a-do&apos;a
                  </Button>
                </Link>
              </div>
            )}
          </div>
          

          
          <Link href="/contact">
            <Button variant="ghost" className="w-full justify-start">
              Kontak
            </Button>
          </Link>
          

        </div>
        
        {/* User Dashboard Links */}
        {loading ? (
          <div className="mt-6 pt-6 border-t">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-3" />
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
          </div>
        ) : user ? (
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Dashboard</h3>
            <div className="space-y-2">
              <Link href={isAdmin ? '/admin' : '/dashboard'}>
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-6 pt-6 border-t">
            <Link href="/sign-in">
              <Button variant="outline" className="w-full justify-start">
                <User className="h-4 w-4 mr-2" />
                Masuk
              </Button>
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
