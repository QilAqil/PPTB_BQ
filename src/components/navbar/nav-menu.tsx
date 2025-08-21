"use client";

import { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  // NavigationMenuTrigger,
  // NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

export const NavMenu = (props: NavigationMenuProps) => {
  const [, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    };

    checkAuth();
  }, []);

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-3 sm:gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/" className="text-xs sm:text-sm">
              Beranda
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/news" className="text-xs sm:text-sm">
              Berita
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/gallery" className="text-xs sm:text-sm">
              Galeri
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* untuk KP */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/prayers" className="text-xs sm:text-sm">
              Doa
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* <NavigationMenuItem>
          <NavigationMenuTrigger>Profil</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <div className="space-y-3">
                <div className="text-sm font-medium leading-none">Profil Pesantren</div>
                <div className="grid gap-2">
                  <NavigationMenuLink asChild>
                    <Link href="/khodimul-mahad" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Khodimul Ma&apos;had</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Pengurus dan pengelola pesantren
                      </p>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/ad-art" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">AD-ART</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Anggaran Dasar dan Anggaran Rumah Tangga
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-sm font-medium leading-none">Konten</div>
                <div className="grid gap-2">
                  <NavigationMenuLink asChild>
                    <Link href="/gallery" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Galeri</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Dokumentasi kegiatan pesantren
                      </p>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/prayers" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Do&apos;a-do&apos;a</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Kumpulan do&apos;a harian
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem> */}

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/registration" className="text-xs sm:text-sm">
              Pendaftaran
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/contact" className="text-xs sm:text-sm">
              Kontak
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
