import { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, User, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface NewsItem {
  id: string;
  title: string;
  content: string;
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

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/news/${id}`, {
      cache: 'no-store'
    });
    
    if (response.ok) {
      const news: NewsItem = await response.json();
      return {
        title: `${news.title} - PPTB BAROKATUL QUR&apos;AN`,
        description: news.content.substring(0, 160),
      };
    }
  } catch (error) {
    console.error('Error fetching news for metadata:', error);
  }
  
  return {
    title: 'News - PPTB BAROKATUL QUR&apos;AN',
    description: 'Latest news from PPTB BAROKATUL QUR&apos;AN',
  };
}

async function getNewsData(id: string): Promise<NewsItem | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/news/${id}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch news data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching news data:', error);
    return null;
  }
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params;
  const news = await getNewsData(id);

  if (!news) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">News Not Found</h1>
          <p className="text-muted-foreground mb-8">The news article you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/news">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to News
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Helper function to calculate read time
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/news">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to News
            </Button>
          </Link>
        </div>

        {/* News Content */}
        <Card className="overflow-hidden">
          {news.imageUrl && (
            <div className="relative h-64 md:h-96 w-full">
              <Image
                src={news.imageUrl}
                alt={news.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          <CardHeader className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">News</Badge>
              <span className="text-sm text-muted-foreground">
                {news.publishedAt 
                  ? new Date(news.publishedAt).toLocaleDateString()
                  : new Date(news.createdAt).toLocaleDateString()
                }
              </span>
            </div>
            
            <CardTitle className="text-3xl md:text-4xl font-bold mb-4">
              {news.title}
            </CardTitle>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>By {news.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{calculateReadTime(news.content)}</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed">
                {news.content}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 