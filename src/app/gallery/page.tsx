import { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PrismaClient } from '@prisma/client'

export const metadata: Metadata = {
  title: "Gallery - PPTB BAROKATUL QUR'AN",
  description: "Explore our gallery of activities and events at PPTB BAROKATUL QUR'AN",
}

interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
}

async function getGalleryData(): Promise<GalleryItem[]> {
  try {
    const prisma = new PrismaClient();
    
    const gallery = await prisma.gallery.findMany({
      where: {
        isPublished: true,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    await prisma.$disconnect();
    
    return gallery;
  } catch (error) {
    console.error('Error fetching gallery data from Prisma:', error);
    return [];
  }
}

export default async function GalleryPage() {
  const gallery = await getGalleryData();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4">
          Our Portfolio
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Explore Our Creative Gallery
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Discover our latest projects and creative solutions. Each piece represents
          our commitment to excellence and innovation in web development.
        </p>
      </div>

      {gallery.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No published gallery items available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {gallery.map((item) => (
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
                    <span className="text-muted-foreground">No Image</span>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary">Gallery</Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm text-muted-foreground">
                    {item.publishedAt 
                      ? new Date(item.publishedAt).toLocaleDateString()
                      : new Date(item.createdAt).toLocaleDateString()
                    }
                  </span>
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {item.description || 'No description available.'}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{item.author.name}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="text-center mt-12">
        <Link href="/">
          <Button variant="outline" size="lg">
            <ArrowRight className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
} 