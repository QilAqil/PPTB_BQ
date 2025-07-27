"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";

const newsData = [
  {
    id: 1,
    title: "Shadcn UI v1.0 Released with New Components",
    description: "The latest version brings over 50 new components, improved accessibility, and better TypeScript support.",
    category: "Release",
    author: "Sarah Johnson",
    date: "2024-01-15",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop"
  },
  {
    id: 2,
    title: "Building Modern Web Apps with Next.js 15",
    description: "Learn how to leverage the latest features in Next.js 15 for better performance and developer experience.",
    category: "Tutorial",
    author: "Mike Chen",
    date: "2024-01-12",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop"
  },
  {
    id: 3,
    title: "The Future of CSS: What's Coming in 2024",
    description: "Explore upcoming CSS features that will revolutionize how we build user interfaces.",
    category: "Technology",
    author: "Emily Davis",
    date: "2024-01-10",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop"
  },
  {
    id: 4,
    title: "Optimizing React Performance: Best Practices",
    description: "Discover proven techniques to make your React applications faster and more efficient.",
    category: "Performance",
    author: "Alex Thompson",
    date: "2024-01-08",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop"
  }
];

export default function NewsSection() {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {newsData.map((news) => (
            <Card key={news.id} className="group hover:shadow-lg transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 left-3">
                  {news.category}
                </Badge>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                  {news.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {news.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{news.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{news.readTime}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(news.date).toLocaleDateString()}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
                    Read More
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            View All News
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
} 