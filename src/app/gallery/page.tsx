import { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Galeri - PPTB BAROKATUL QUR'AN",
  description: "Jelajahi galeri aktivitas dan acara kami di PPTB BAROKATUL QUR'AN",
}

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

async function getGalleryData(): Promise<GalleryItem[]> {
  try {
    // Gunakan relative URL untuk menghindari masalah dengan environment variables di Vercel
    const response = await fetch(`/api/gallery?published=true&limit=20`, {
      cache: 'no-store' // Disable cache to avoid large data issues
    });
    
    if (!response.ok) {
      throw new Error('Gagal mengambil data galeri');
    }
    
    const result = await response.json();
    // API gallery mengembalikan { data: [...], pagination: {...} }
    return result.data || [];
  } catch (error) {
    console.error('Error mengambil data galeri:', error);
    return [];
  }
}

export default async function GalleryPage() {
  const gallery = await getGalleryData();

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
          Temukan proyek terbaru dan solusi kreatif kami. Setiap karya mencerminkan
          komitmen kami untuk keunggulan dan inovasi dalam pengembangan web.
        </p>
      </div>

      {gallery.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Belum ada item galeri yang dipublikasikan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {gallery.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
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
                    <User className="h-4 w-4" />
                    <span>{item.author.name}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="text-center mt-12">
        <Link href="/">
          <Button variant="outline" size="lg">
            <ArrowRight className="h-4 w-4 mr-2" />
            Kembali ke Beranda
          </Button>
        </Link>
      </div>
    </div>
  )
} 