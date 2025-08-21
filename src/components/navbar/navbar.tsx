"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import Link from "next/link";
import { LogOut, AlertTriangle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const { user, loading, logout, isAdmin } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const pathname = usePathname();

  // Don't show navbar on dashboard pages
  const isDashboardPage =
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/user");

  if (isDashboardPage) {
    return null;
  }

  const handleLogout = async () => {
    setShowLogoutConfirm(false);
    await logout();
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-14 sm:h-16 bg-background/95 backdrop-blur-sm border-b z-50">
        <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-3 sm:px-4 lg:px-8">
          <Logo />

          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />

          <div
            className="flex items-center gap-2 sm:gap-3"
            suppressHydrationWarning
          >
            {loading ? (
              // Show loading state to prevent hydration mismatch
              <div className="h-8 w-16 sm:h-9 sm:w-20 bg-gray-200 rounded animate-pulse" />
            ) : user ? (
              <>
                <Link href={isAdmin ? "/admin" : "/dashboard"}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden sm:inline-flex text-xs sm:text-sm"
                  >
                    Dashboard
                  </Button>
                </Link>
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                    {user.name || user.email}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowLogoutConfirm(true)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs sm:text-sm"
                  >
                    <LogOut className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Keluar</span>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs sm:text-sm"
                  >
                    Masuk
                  </Button>
                </Link>
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
          <div className="bg-white rounded-lg p-4 sm:p-6 max-w-md mx-4">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Konfirmasi Keluar
              </h3>
            </div>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
              Apakah Anda yakin ingin keluar? Anda perlu masuk kembali untuk
              mengakses akun Anda.
            </p>
            <div className="flex gap-2 sm:gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 text-xs sm:text-sm"
              >
                Batal
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleLogout}
                className="flex-1 text-xs sm:text-sm"
              >
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
