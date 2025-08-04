'use client'

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
}

export default function GallerySection() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching gallery from API...');
        // Add cache-busting parameter to ensure fresh data
        const response = await fetch(`/api/gallery?published=true&limit=6&t=${Date.now()}`);
        console.log('Gallery API response status:', response.status);
        
        if (!response.ok) {
          throw new Error('Gagal mengambil galeri');
        }
        const result = await response.json();
        console.log('Gallery API result:', result);
        
        // Handle new API response format with data and pagination
        const galleryData = result.data || result;
        console.log('Processed gallery data:', galleryData);
        
        setGallery(Array.isArray(galleryData) ? galleryData : []);
      } catch (err) {
        console.error('Error fetching gallery:', err);
        setError(err instanceof Error ? err.message : 'Gagal mengambil galeri');
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();

    // Auto-refresh every 30 seconds to get latest gallery items
    const interval = setInterval(fetchGallery, 30000);

    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    if (selectedImage !== null && gallery.length > 0) {
      setSelectedImage((selectedImage + 1) % gallery.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null && gallery.length > 0) {
      setSelectedImage(selectedImage === 0 ? gallery.length - 1 : selectedImage - 1);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Portofolio Kami
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Jelajahi Galeri Kreatif Kami
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Temukan proyek terbaru dan solusi kreatif kami. Setiap karya mencerminkan
              komitmen kami untuk keunggulan dan inovasi dalam pengembangan web.
            </p>
          </div>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Portofolio Kami
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Jelajahi Galeri Kreatif Kami
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Temukan proyek terbaru dan solusi kreatif kami. Setiap karya mencerminkan
              komitmen kami untuk keunggulan dan inovasi dalam pengembangan web.
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">Error: {error}</p>
            <Button onClick={() => window.location.reload()}>Coba Lagi</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Portofolio Kami
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Jelajahi Galeri Kreatif Kami
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Temukan proyek terbaru dan solusi kreatif kami. Setiap karya mencerminkan
            komitmen kami untuk keunggulan dan inovasi dalam pengembangan web.
          </p>
        </div>

        {!Array.isArray(gallery) || gallery.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Belum ada item galeri yang dipublikasikan.</p>
          </div>
        ) : (
          <>
            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {gallery.slice(0, 6).map((item, index) => (
                <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer" onClick={() => setSelectedImage(index)}>
                  <div className="relative overflow-hidden">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-48 bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground">Tidak Ada Gambar</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary">Galeri</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm text-muted-foreground">
                        {item.publishedAt 
                          ? new Date(item.publishedAt).toLocaleDateString()
                          : new Date(item.createdAt).toLocaleDateString()
                        }
                      </span>
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span>{item.author.name}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Link href="/gallery">
                <Button variant="outline" size="lg">
                  Lihat Semua Galeri
                </Button>
              </Link>
            </div>
          </>
        )}

        {/* Modal for Full Image View */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              >
                <X className="h-6 w-6" />
              </button>
              
              <div className="relative">
                {gallery[selectedImage]?.imageUrl ? (
                  <Image
                    src={gallery[selectedImage].imageUrl}
                    alt={gallery[selectedImage].title}
                    width={800}
                    height={600}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                ) : (
                  <div className="w-full h-96 bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">Tidak Ada Gambar</span>
                  </div>
                )}
                
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <button
                    onClick={prevImage}
                    className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <div className="bg-white p-4 mt-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">{gallery[selectedImage]?.title}</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 