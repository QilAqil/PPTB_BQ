"use client";

import { useState, useEffect, use } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface News {
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

interface NewsDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = use(params);
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/news/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            notFound();
          }
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        setNews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  // Helper function to calculate read time
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
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

  if (error || !news) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">Error: {error || 'News not found'}</p>
            <Link href="/news">
              <Button>Back to News</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/news" className="inline-flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to News
          </Link>
        </div>

        {/* News Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            {/* Image */}
            {news.imageUrl && (
              <div className="relative h-64 md:h-96">
                <Image
                  src={news.imageUrl}
                  alt={news.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <CardHeader className="pb-4">
              <div className="flex items-center gap-2 mb-4">
                <Badge>News</Badge>
                <span className="text-sm text-muted-foreground">
                  {news.publishedAt 
                    ? new Date(news.publishedAt).toLocaleDateString()
                    : new Date(news.createdAt).toLocaleDateString()
                  }
                </span>
              </div>
              <CardTitle className="text-3xl md:text-4xl font-bold leading-tight">
                {news.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Author and Read Time */}
              <div className="flex items-center justify-between text-sm text-muted-foreground border-b pb-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>By {news.author.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{calculateReadTime(news.content)}</span>
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-wrap leading-relaxed">
                  {news.content}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Published on {new Date(news.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <Link href="/news">
                    <Button variant="outline">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to News
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 