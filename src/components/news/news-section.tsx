'use client'

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        // Add cache-busting parameter to ensure fresh data
        const response = await fetch(`/api/news?published=true&limit=4&t=${Date.now()}`);
        if (!response.ok) {
          throw new Error('Gagal mengambil berita');
        }
        const result = await response.json();
        // Handle new API response format with data and pagination
        const newsData = result.data || result;
        setNews(Array.isArray(newsData) ? newsData : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Gagal mengambil berita');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();

    // Auto-refresh every 30 seconds to get latest news
    const interval = setInterval(fetchNews, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Berita Terbaru
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tetap Terinformasi dengan Berita Terbaru Kami
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dapatkan informasi terbaru tentang kegiatan, acara, dan perkembangan di Pondok Pesantren kami.
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
              Berita Terbaru
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tetap Terinformasi dengan Berita Terbaru Kami
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dapatkan informasi terbaru tentang kegiatan, acara, dan perkembangan di Pondok Pesantren kami.
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
            Berita Terbaru
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tetap Terinformasi dengan Berita Terbaru Kami
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dapatkan informasi terbaru tentang kegiatan, acara, dan perkembangan di Pondok Pesantren kami.
          </p>
        </div>

        {!Array.isArray(news) || news.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Belum ada berita yang dipublikasikan.</p>
          </div>
        ) : (
          <>
            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                      <span className="text-xs text-muted-foreground">
                        Oleh: {item.author.name}
                      </span>
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

            {/* View All Button */}
            <div className="text-center">
              <Link href="/news">
                <Button variant="outline" size="lg">
                  Lihat Semua Berita
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
} 