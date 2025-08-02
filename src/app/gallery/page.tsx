"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Download, Share2, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface GalleryItem {
  id: string;
  title: string;
  description?: string;
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

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/gallery?published=true&t=${Date.now()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch gallery');
        }
        const data = await response.json();
        setGallery(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch gallery');
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
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">Error: {error}</p>
            <Button onClick={() => window.location.reload()}>Coba Lagi</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Galeri</h1>
          <p className="text-muted-foreground">
            Jelajahi proyek terbaru dan solusi kreatif kami.
          </p>
        </div>

        {/* Gallery Grid */}
        {gallery.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Belum ada item galeri yang dipublikasikan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((item, index) => (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="relative overflow-hidden">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          width={400}
                          height={250}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-48 bg-muted flex items-center justify-center">
                          <span className="text-muted-foreground">Tidak Ada Gambar</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                          <h3 className="font-semibold mb-2">{item.title}</h3>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-0 overflow-hidden">
                  <DialogTitle className="sr-only">{item.title || 'Item Galeri'}</DialogTitle>
                  <div className="relative">
                    <div className="absolute top-4 right-4 z-10 flex gap-2">
                      <Button size="icon" variant="secondary" className="bg-white/20 text-white border-white/30">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="secondary" className="bg-white/20 text-white border-white/30">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="relative">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          width={800}
                          height={400}
                          className="w-full h-96 object-cover"
                        />
                      ) : (
                        <div className="w-full h-96 bg-muted flex items-center justify-center">
                          <span className="text-muted-foreground">Tidak Ada Gambar</span>
                        </div>
                      )}
                      
                      {/* Navigation arrows */}
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 text-white border-white/30 hover:bg-white/30"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 text-white border-white/30 hover:bg-white/30"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold">{item.title}</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {item.description || 'Tidak ada deskripsi yang tersedia.'}
                      </p>
                      <div className="flex gap-2">
                       
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 