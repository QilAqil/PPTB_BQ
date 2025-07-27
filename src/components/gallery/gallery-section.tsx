"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight, Download, Share2 } from "lucide-react";

const galleryData = [
  {
    id: 1,
    title: "Modern Web Design",
    category: "Design",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
    description: "Beautiful and modern web design showcasing the latest trends in UI/UX."
  },
  {
    id: 2,
    title: "Mobile App Development",
    category: "Development",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
    description: "Cutting-edge mobile applications built with the latest technologies."
  },
  {
    id: 3,
    title: "E-commerce Solutions",
    category: "Business",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    description: "Complete e-commerce platforms designed for modern businesses."
  },
  {
    id: 4,
    title: "Data Analytics Dashboard",
    category: "Analytics",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    description: "Advanced analytics dashboards providing real-time insights."
  },
  {
    id: 5,
    title: "Cloud Infrastructure",
    category: "Infrastructure",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    description: "Scalable cloud solutions for enterprise applications."
  },
  {
    id: 6,
    title: "AI & Machine Learning",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    description: "Intelligent systems powered by artificial intelligence."
  },
  {
    id: 7,
    title: "Cybersecurity Solutions",
    category: "Security",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop",
    description: "Robust security measures to protect your digital assets."
  },
  {
    id: 8,
    title: "Blockchain Technology",
    category: "Blockchain",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
    description: "Decentralized applications and blockchain solutions."
  }
];

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryData.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryData.length - 1 : selectedImage - 1);
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Our Portfolio
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Our Creative Gallery
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our latest projects and creative solutions. Each piece represents
            our commitment to excellence and innovation in web development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {galleryData.map((item, index) => (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                          {item.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0 overflow-hidden">
                <div className="relative">
                  <div className="absolute top-4 right-4 z-10 flex gap-2">
                    <Button size="icon" variant="secondary" className="bg-white/20 text-white border-white/30">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="secondary" className="bg-white/20 text-white border-white/30">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-96 object-cover"
                    />
                    
                    {/* Navigation arrows */}
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 text-white border-white/30 hover:bg-white/30"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 text-white border-white/30 hover:bg-white/30"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold">{item.title}</h3>
                      <Badge variant="secondary">{item.category}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {item.description}
                    </p>
                    <div className="flex gap-2">
                      <Button>View Project</Button>
                      <Button variant="outline">Learn More</Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="mr-4">
            View All Projects
          </Button>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Start Your Project
          </Button>
        </div>
      </div>
    </section>
  );
} 