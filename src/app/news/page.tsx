import { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Berita - PPTB BAROKATUL QUR'AN",
  description: "Berita terbaru dan informasi seputar kegiatan PPTB BAROKATUL QUR'AN",
}

interface NewsItem {
  id: string;
  title: string;
  content?: string;
  imageUrl?: string;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
}

async function getNewsData(): Promise<NewsItem[]> {
  try {
    // Gunakan relative URL untuk menghindari masalah dengan environment variables di Vercel
    const response = await fetch(`/api/news?published=true&limit=20`, {
      cache: 'no-store' // Disable cache to avoid large data issues
    });
    
    if (!response.ok) {
      throw new Error('Gagal mengambil data berita');
    }
    
    const result = await response.json();
    // API mengembalikan array langsung, bukan { data: [...] }
    return Array.isArray(result) ? result : [];
  } catch (error) {
    console.error('Error mengambil data berita:', error);
    return [];
  }
}

export default async function NewsPage() {
  const news = await getNewsData();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4">
          Berita Terbaru
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Berita dan Informasi Terbaru
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Dapatkan informasi terbaru tentang kegiatan, acara, dan perkembangan di Pondok Pesantren kami.
        </p>
      </div>

      {news.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Belum ada berita yang dipublikasikan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
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
                  <Badge variant="secondary">Berita</Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {item.publishedAt 
                      ? new Date(item.publishedAt).toLocaleDateString()
                      : new Date(item.createdAt).toLocaleDateString()
                    }
                  </span>
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {item.content || 'Tidak ada konten tersedia.'}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{item.author.name}</span>
                  </div>
                  <Link href={`/news/${item.id}`}>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                      Baca Selengkapnya
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 