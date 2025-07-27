'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Eye, Award, Users, Lightbulb, Heart } from "lucide-react"

export default function VisionMission() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Target className="h-4 w-4 mr-2" />
            Tentang Kami
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Visi & Misi Kami
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mengembangkan solusi teknologi yang inovatif dan berkualitas tinggi untuk membantu bisnis Anda berkembang di era digital.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Vision Card */}
          <Card className="relative overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16"></div>
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-primary/10 rounded-full mr-4">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Visi</h3>
                  <Badge variant="outline" className="text-primary border-primary">
                    Masa Depan
                  </Badge>
                </div>
              </div>
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                Menjadi perusahaan teknologi terdepan yang menginspirasi dan memimpin transformasi digital di Indonesia, 
                dengan fokus pada inovasi, kualitas, dan dampak positif bagi masyarakat.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Award className="h-4 w-4 text-primary mr-3" />
                  <span>Terdepan dalam inovasi teknologi</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 text-primary mr-3" />
                  <span>Menginspirasi transformasi digital</span>
                </div>
                <div className="flex items-center text-sm">
                  <Heart className="h-4 w-4 text-primary mr-3" />
                  <span>Dampak positif bagi masyarakat</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mission Card */}
          <Card className="relative overflow-hidden border-2 border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover:shadow-lg">
            <div className="absolute top-0 left-0 w-32 h-32 bg-secondary/5 rounded-full -translate-y-16 -translate-x-16"></div>
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-secondary/10 rounded-full mr-4">
                  <Target className="h-8 w-8 text-secondary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Misi</h3>
                  <Badge variant="outline" className="text-secondary border-secondary">
                    Tujuan
                  </Badge>
                </div>
              </div>
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                Memberikan solusi teknologi yang berkualitas tinggi, inovatif, dan terjangkau untuk membantu 
                bisnis dan organisasi mencapai tujuan mereka dengan efisien dan efektif.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Lightbulb className="h-4 w-4 text-secondary mr-3" />
                  <span>Solusi teknologi inovatif</span>
                </div>
                <div className="flex items-center text-sm">
                  <Award className="h-4 w-4 text-secondary mr-3" />
                  <span>Kualitas tinggi dan terjangkau</span>
                </div>
                <div className="flex items-center text-sm">
                  <Target className="h-4 w-4 text-secondary mr-3" />
                  <span>Membantu mencapai tujuan bisnis</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-8">Nilai-Nilai Kami</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="p-4 bg-primary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Lightbulb className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Inovasi</h4>
              <p className="text-sm text-muted-foreground">Terus berinovasi dalam teknologi</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-secondary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-secondary" />
              </div>
              <h4 className="font-semibold mb-2">Kualitas</h4>
              <p className="text-sm text-muted-foreground">Menjaga standar kualitas tinggi</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-green-500/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-green-500" />
              </div>
              <h4 className="font-semibold mb-2">Kolaborasi</h4>
              <p className="text-sm text-muted-foreground">Bekerja sama dengan klien</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-orange-500/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-8 w-8 text-orange-500" />
              </div>
              <h4 className="font-semibold mb-2">Integritas</h4>
              <p className="text-sm text-muted-foreground">Menjaga kepercayaan klien</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 