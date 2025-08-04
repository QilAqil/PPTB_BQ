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
    // Check if we're in development or production
    const isDev = process.env.NODE_ENV === 'development';
    
    if (isDev) {
      // In development, try to fetch from API
      const response = await fetch(`/api/news?published=true&limit=20`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Fetch response status:', response.status);
      
      if (!response.ok) {
        console.error('Response not ok:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('Error response body:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      console.log('API Response:', result);
      
      if (Array.isArray(result)) {
        return result;
      } else if (result && result.error) {
        console.error('API returned error:', result.error);
        return [];
      } else {
        console.error('Unexpected response format:', result);
        return [];
      }
    } else {
      // In production (Vercel), return empty array if no database
      console.log('Production environment detected, checking for database...');
      return [];
    }
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
            <p className="text-sm text-muted-foreground">
              Database belum terkonfigurasi di Vercel. Silakan ikuti langkah-langkah berikut:
            </p>
            <div className="mt-4 text-left text-sm text-muted-foreground bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Langkah Setup Database:</h4>
              <ol className="list-decimal list-inside space-y-1">
                <li>Buat database PostgreSQL di Supabase/Neon/Railway</li>
                <li>Buka Vercel Dashboard → Settings → Environment Variables</li>
                <li>Tambahkan: <code className="bg-gray-200 px-1 rounded">DATABASE_URL=postgresql://...</code></li>
                <li>Tambahkan: <code className="bg-gray-200 px-1 rounded">JWT_SECRET=your-secret-key</code></li>
                <li>Redeploy aplikasi</li>
              </ol>
            </div>
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