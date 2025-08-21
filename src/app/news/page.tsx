"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface NewsItem {
  id: string;
  title: string;
  content?: string;
  imageUrl?: string;
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
        console.log("Fetching news from API...");
        // Add cache-busting parameter to ensure fresh data
        const response = await fetch(`/api/news?limit=20&t=${Date.now()}`);
        console.log("News API response status:", response.status);

        if (!response.ok) {
          throw new Error("Gagal mengambil berita");
        }
        const result = await response.json();
        console.log("News API result:", result);

        // Handle new API response format with data and pagination
        const newsData = result.data || result;
        console.log("Processed news data:", newsData);

        setNews(Array.isArray(newsData) ? newsData : []);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError(err instanceof Error ? err.message : "Gagal mengambil berita");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Berita dan Informasi Terbaru
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto">
            Dapatkan informasi terbaru tentang kegiatan, acara, dan perkembangan
            di Pondok Pesantren kami.
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
            Berita dan Informasi Terbaru
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto">
            Dapatkan informasi terbaru tentang kegiatan, acara, dan perkembangan
            di Pondok Pesantren kami.
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
          Berita dan Informasi Terbaru
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto">
          Dapatkan informasi terbaru tentang kegiatan, acara, dan perkembangan
          di Pondok Pesantren kami.
        </p>
      </div>

      {news.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <p className="text-muted-foreground text-sm sm:text-base">
            Belum ada berita yang dipublikasikan.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {news.map((item) => (
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
                    className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-40 sm:h-48 bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-xs sm:text-sm">
                      Tidak Ada Gambar
                    </span>
                  </div>
                )}
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                  <span className="text-xs">Berita</span>
                </div>
              </div>
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2 text-sm sm:text-base">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-3">
                  {item.content || "Tidak ada konten tersedia."}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Oleh: {item.author.name}
                  </span>
                  <Link href={`/news/${item.id}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary/80 text-xs sm:text-sm"
                    >
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
  );
}
