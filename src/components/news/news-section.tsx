"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

export default function NewsSection() {
  const [news, setNews] = useState<News[]>([]);
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

    // Auto-refresh every 30 seconds to get latest news
    const interval = setInterval(fetchNews, 30000);

    return () => clearInterval(interval);
  }, []);

  // Helper function to calculate read time
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Helper function to truncate content
  const truncateContent = (content: string, maxLength: number = 120) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Latest News
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated with Our Latest News
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get the latest insights, tutorials, and updates from our team of experts.
              Stay ahead of the curve with cutting-edge web development knowledge.
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
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Latest News
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated with Our Latest News
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get the latest insights, tutorials, and updates from our team of experts.
              Stay ahead of the curve with cutting-edge web development knowledge.
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">Error: {error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Latest News
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated with Our Latest News
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get the latest insights, tutorials, and updates from our team of experts.
            Stay ahead of the curve with cutting-edge web development knowledge.
          </p>
        </div>

        {news.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No published news available yet.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {news.map((newsItem) => (
                <Card key={newsItem.id} className="group hover:shadow-lg transition-all duration-300">
                  <div className="relative overflow-hidden rounded-t-lg">
                    {newsItem.imageUrl ? (
                      <Image
                        src={newsItem.imageUrl}
                        alt={newsItem.title}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-48 bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground">No Image</span>
                      </div>
                    )}
                    <Badge className="absolute top-3 left-3">
                      News
                    </Badge>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      {newsItem.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {truncateContent(newsItem.content)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{newsItem.author.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{calculateReadTime(newsItem.content)}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {newsItem.publishedAt 
                            ? new Date(newsItem.publishedAt).toLocaleDateString()
                            : new Date(newsItem.createdAt).toLocaleDateString()
                          }
                        </span>
                      </div>
                                          <Link href={`/news/${newsItem.id}`}>
                      <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
                        Read More
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Link href="/news">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  View All News
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
} 