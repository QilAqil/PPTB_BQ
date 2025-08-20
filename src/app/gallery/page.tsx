"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Portofolio Kami
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Jelajahi Galeri Kreatif Kami
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Temukan proyek terbaru dan solusi kreatif kami. Setiap karya
            mencerminkan komitmen kami untuk keunggulan dan inovasi dalam
            pengembangan web.
          </p>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Portofolio Kami
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Jelajahi Galeri Kreatif Kami
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Temukan proyek terbaru dan solusi kreatif kami. Setiap karya
            mencerminkan komitmen kami untuk keunggulan dan inovasi dalam
            pengembangan web.
          </p>
        </div>
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <Button onClick={() => window.location.reload()}>Coba Lagi</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4">
          Portofolio Kami
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Jelajahi Galeri Kreatif Kami
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Temukan proyek terbaru dan solusi kreatif kami. Setiap karya
          mencerminkan komitmen kami untuk keunggulan dan inovasi dalam
          pengembangan web.
        </p>
      </div>

      {!Array.isArray(gallery) || gallery.length === 0 ? (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Belum Ada Galeri
            </h3>
            <p className="text-muted-foreground mb-4">
              Belum ada item galeri yang dipublikasikan saat ini. Silakan cek
              kembali nanti.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {gallery.map((item) => (
            <Card
              key={item.id}
              className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={400}
                    height={250}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-64 bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">
                      Tidak Ada Gambar
                    </span>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary">Galeri</Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm text-muted-foreground">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{item.author.name}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

    </div>
  );
}
