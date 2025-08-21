"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Loader2 } from "lucide-react";
import Image from "next/image";

interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
}

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching gallery from API...");
        // Add cache-busting parameter to ensure fresh data
        const response = await fetch(`/api/gallery?limit=20&t=${Date.now()}`);
        console.log("Gallery API response status:", response.status);

        if (!response.ok) {
          throw new Error("Gagal mengambil galeri");
        }
        const result = await response.json();
        console.log("Gallery API result:", result);

        // Handle new API response format with data and pagination
        const galleryData = result.data || result;
        console.log("Processed gallery data:", galleryData);

        setGallery(Array.isArray(galleryData) ? galleryData : []);
      } catch (err) {
        console.error("Error fetching gallery:", err);
        setError(err instanceof Error ? err.message : "Gagal mengambil galeri");
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Dokumentasi Kegiatan Pesantren
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto">
            Lihat dokumentasi kegiatan dan aktivitas di Pondok Pesantren
            <b>BAROKATUL QUR&apos;AN</b> 
          </p>
        </div>
        <div className="flex items-center justify-center py-8 sm:py-12">
          <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Dokumentasi Kegiatan Pesantren
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto">
            Lihat dokumentasi kegiatan dan aktivitas di Pondok Pesantren
            <b>BAROKATUL QUR&apos;AN</b> .
          </p>
        </div>
        <div className="text-center py-8 sm:py-12">
          <p className="text-red-600 mb-4 text-sm sm:text-base">
            Error: {error}
          </p>
          <Button onClick={() => window.location.reload()} size="sm">
            Coba Lagi
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
          Dokumentasi Kegiatan Pesantren
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto">
          Lihat dokumentasi kegiatan dan aktivitas di Pondok Pesantren BAROKATUL
          <b>BAROKATUL QUR&apos;AN</b>.
        </p>
      </div>

      {gallery.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <p className="text-muted-foreground text-sm sm:text-base">
            Belum ada dokumentasi yang tersedia.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {gallery.map((item) => (
            <Card
              key={item.id}
              className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                  <span className="text-xs">Galeri</span>
                </div>
              </div>
              <CardContent className="p-3 sm:p-4">
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2 text-sm sm:text-base">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <User className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{item.author.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
