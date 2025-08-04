'use client'

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

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

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching news from API...');
        // Add cache-busting parameter to ensure fresh data
        const response = await fetch(`/api/news?published=true&limit=20&t=${Date.now()}`);
        console.log('News API response status:', response.status);
        
        if (!response.ok) {
          throw new Error('Gagal mengambil berita');
        }
        const result = await response.json();
        console.log('News API result:', result);
        
        // Handle new API response format with data and pagination
        const newsData = result.data || result;
        console.log('Processed news data:', newsData);
        
        setNews(Array.isArray(newsData) ? newsData : []);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err instanceof Error ? err.message : 'Gagal mengambil berita');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
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
            Berita Terbaru
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Berita dan Informasi Terbaru
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Dapatkan informasi terbaru tentang kegiatan, acara, dan perkembangan di Pondok Pesantren kami.
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
          Berita Terbaru
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Berita dan Informasi Terbaru
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Dapatkan informasi terbaru tentang kegiatan, acara, dan perkembangan di Pondok Pesantren kami.
        </p>
      </div>

      {!Array.isArray(news) || news.length === 0 ? (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <svg className="mx-auto h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Berita</h3>
            <p className="text-muted-foreground mb-4">
              Belum ada berita yang dipublikasikan saat ini. Silakan cek kembali nanti.
            </p>

          </div>
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