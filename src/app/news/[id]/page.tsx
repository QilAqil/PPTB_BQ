import { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

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

interface NewsDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/news/${id}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return {
        title: "Berita Tidak Ditemukan - PPTB BAROKATUL QUR'AN",
        description: "Berita yang Anda cari tidak ditemukan",
      };
    }
    
    const news = await response.json();
    
    return {
      title: `${news.title} - PPTB BAROKATUL QUR'AN`,
      description: news.content ? news.content.substring(0, 160) + '...' : 'Berita terbaru dari PPTB BAROKATUL QUR\'AN',
    };
  } catch {
    return {
      title: "Berita - PPTB BAROKATUL QUR'AN",
      description: 'Berita terbaru dari PPTB BAROKATUL QUR\'AN',
    };
  }
}

async function getNewsDetail(id: string): Promise<NewsItem | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/news/${id}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return null;
    }
    
    const news = await response.json();
    return news;
  } catch {
    console.error('Error mengambil detail berita');
    return null;
  }
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = await params;
  const news = await getNewsDetail(id);

  if (!news) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/news">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Berita
            </Button>
          </Link>
        </div>

        <Card className="overflow-hidden">
          {/* Image */}
          {news.imageUrl && (
            <div className="relative h-64 md:h-96">
              <Image
                src={news.imageUrl}
                alt={news.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <CardContent className="p-6 md:p-8">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">Berita</Badge>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {news.publishedAt 
                      ? new Date(news.publishedAt).toLocaleDateString()
                      : new Date(news.createdAt).toLocaleDateString()
                    }
                  </span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {news.title}
              </h1>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>Oleh: {news.author.name}</span>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {news.content || 'Tidak ada konten tersedia.'}
              </p>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  <span>Diterbitkan pada: {new Date(news.createdAt).toLocaleDateString()}</span>
                </div>
                
                <Link href="/news">
                  <Button variant="outline">
                    Lihat Semua Berita
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 