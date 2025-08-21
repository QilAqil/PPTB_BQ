"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
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

  // Fallback data jika API tidak tersedia
  const fallbackNews: NewsItem[] = useMemo(
    () => [
      {
        id: "fallback-1",
        title: "Selamat Datang di PPTB Barokatul Qur'an",
        content:
          "Pondok Pesantren Tahfidz & Bahasa BAROKATUL QUR'AN mengucapkan selamat datang kepada semua pengunjung website kami.",
        isPublished: true,
        createdAt: new Date().toISOString(),
        author: {
          id: "admin",
          name: "Admin",
          email: "admin@pptb.com",
        },
      },
      {
        id: "fallback-2",
        title: "Program Tahfidz Al-Qur'an",
        content:
          "Program unggulan kami dalam menghafal Al-Qur'an dengan metode yang efektif dan terstruktur.",
        isPublished: true,
        createdAt: new Date().toISOString(),
        author: {
          id: "admin",
          name: "Admin",
          email: "admin@pptb.com",
        },
      },
    ],
    []
  );

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching news from API...");

      // Check if we're in browser environment
      if (typeof window === "undefined") {
        console.log("Not in browser environment, skipping fetch");
        setLoading(false);
        return;
      }

      // Add cache-busting parameter to ensure fresh data
      const response = await fetch(
        `/api/news?published=true&limit=4&t=${Date.now()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // Add timeout
          signal: AbortSignal.timeout(10000), // 10 second timeout
        }
      );

      console.log("News API response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("News API result:", result);

      // Handle new API response format with data and pagination
      const newsData = result.data || result;
      console.log("Processed news data:", newsData);

      setNews(Array.isArray(newsData) ? newsData : []);
    } catch (err) {
      console.error("Error fetching news:", err);

      // Handle different types of errors
      let errorMessage = "Gagal mengambil berita";

      if (err instanceof Error) {
        if (err.name === "AbortError") {
          errorMessage = "Koneksi timeout, menggunakan data contoh";
        } else if (err.message.includes("fetch")) {
          errorMessage =
            "Tidak dapat terhubung ke server, menggunakan data contoh";
        } else {
          errorMessage = err.message;
        }
      }

      setError(errorMessage);
      setNews(fallbackNews);
    } finally {
      setLoading(false);
    }
  }, [fallbackNews]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  if (loading) {
    return (
      <section className="py-8 sm:py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
              Tetap Terinformasi dengan Berita Terbaru Kami
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto px-4 text-sm sm:text-base">
              Dapatkan informasi terbaru tentang kegiatan, acara, dan
              perkembangan di Pondok Pesantren kami.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded mb-4"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error && news.length === 0) {
    return (
      <section className="py-8 sm:py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
              Tetap Terinformasi dengan Berita Terbaru Kami
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              Dapatkan informasi terbaru tentang kegiatan, acara, dan
              perkembangan di Pondok Pesantren kami.
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
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12 bg-background">
      <div className="container mx-auto px-4">
        {error && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-xs sm:text-sm">
              ⚠️ {error} - Menampilkan data contoh
            </p>
          </div>
        )}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
            Tetap Terinformasi dengan Berita Terbaru Kami
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto px-4 text-sm sm:text-base">
            Dapatkan informasi terbaru tentang kegiatan, acara, dan perkembangan
            di Pondok Pesantren kami.
          </p>
        </div>

        {!Array.isArray(news) || news.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <p className="text-muted-foreground text-sm sm:text-base">
              Belum ada berita yang dipublikasikan.
            </p>
          </div>
        ) : (
          <>
            {/* News Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
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
                        {item.publishedAt
                          ? new Date(item.publishedAt).toLocaleDateString()
                          : new Date(item.createdAt).toLocaleDateString()}
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

            {/* View All Button */}
            <div className="text-center">
              <Link href="/news">
                <Button variant="outline" size="sm" className="sm:size-default">
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
