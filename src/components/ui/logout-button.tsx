"use client";

import { useState } from "react";
import { LogOut, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LogoutButtonProps {
  variant?: "default" | "outline" | "ghost";
  className?: string;
  size?: "sm" | "default" | "lg";
}

export default function LogoutButton({ 
  variant = "default", 
  className = "",
  size = "default"
}: LogoutButtonProps) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = async () => {
    setShowLogoutConfirm(false);
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  };

  const getButtonClasses = () => {
    const baseClasses = "flex items-center gap-2";
    const variantClasses = {
      default: "bg-red-600 text-white hover:bg-red-700",
      outline: "text-red-600 hover:text-red-700 hover:bg-red-50 border-red-600",
      ghost: "text-red-600 hover:text-red-700 hover:bg-red-50"
    };
    return `${baseClasses} ${variantClasses[variant]} ${className}`;
  };

  return (
    <>
      <Button
        variant={variant === "default" ? "default" : variant}
        onClick={() => setShowLogoutConfirm(true)}
        className={getButtonClasses()}
        size={size}
      >
        <LogOut className="h-4 w-4" />
        Logout
      </Button>

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
}
