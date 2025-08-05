'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, BookOpen, Calendar, User, Share2, Copy } from 'lucide-react';
import Link from 'next/link';

interface Prayer {
  id: string;
  title: string;
  arabicText: string;
  latinText: string;
  translation: string;
  category: string;
  imageUrl?: string;
  isPublished: boolean;
  createdAt: string;
  publishedAt?: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
}

export default function PrayerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [prayer, setPrayer] = useState<Prayer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrayer = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/prayers/${params.id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Do\'a tidak ditemukan');
          } else {
            setError('Terjadi kesalahan saat memuat do\'a');
          }
          return;
        }

        const data = await response.json();
        setPrayer(data);
      } catch (error) {
        console.error('Error fetching prayer:', error);
        setError('Terjadi kesalahan saat memuat do\'a');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPrayer();
    }
  }, [params.id]);

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // You could add a toast notification here
      alert(`${label} berhasil disalin!`);
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: prayer?.title || 'Do\'a',
          text: `${prayer?.title}\n\n${prayer?.arabicText}\n\n${prayer?.translation}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      handleCopyText(window.location.href, 'Link do\'a');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !prayer) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Button>
          </div>
          <Card>
            <CardContent className="pt-6">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {error || 'Do\'a tidak ditemukan'}
              </h2>
              <p className="text-gray-600 mb-4">
                Do'a yang Anda cari tidak dapat ditemukan atau telah dihapus.
              </p>
              <Link href="/prayers">
                <Button>
                  Lihat Semua Do'a
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Daftar Do'a
          </Button>
        </div>

        {/* Prayer Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-3xl font-bold mb-2">
                  {prayer.title}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{prayer.category}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(prayer.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{prayer.author.name}</span>
                  </div>
                </div>
              </div>
              <Badge variant={prayer.isPublished ? "default" : "secondary"}>
                {prayer.isPublished ? "Dipublikasi" : "Draft"}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Prayer Image */}
        {prayer.imageUrl && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <img
                src={prayer.imageUrl}
                alt={prayer.title}
                className="w-full max-h-96 object-contain rounded-lg mx-auto"
              />
            </CardContent>
          </Card>
        )}

        {/* Prayer Content */}
        <div className="space-y-6">
          {/* Arabic Text */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Teks Arab</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <p className="text-right text-2xl leading-relaxed font-arabic mb-4">
                  {prayer.arabicText}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopyText(prayer.arabicText, 'Teks Arab')}
                  className="absolute top-0 right-0"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Latin Text */}
          {prayer.latinText && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Transliterasi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <p className="text-lg text-gray-700 italic leading-relaxed mb-4">
                    {prayer.latinText}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyText(prayer.latinText, 'Transliterasi')}
                    className="absolute top-0 right-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Translation */}
          {prayer.translation && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Terjemahan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    {prayer.translation}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyText(prayer.translation, 'Terjemahan')}
                    className="absolute top-0 right-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleShare} variant="outline" className="flex-1 sm:flex-none">
            <Share2 className="h-4 w-4 mr-2" />
            Bagikan Do'a
          </Button>
          <Link href="/prayers" className="flex-1 sm:flex-none">
            <Button variant="outline" className="w-full">
              Lihat Do'a Lainnya
            </Button>
          </Link>
        </div>

        {/* Related Prayers Section */}
        <div className="mt-12">
          <Separator className="mb-6" />
          <h3 className="text-xl font-semibold mb-4">Do'a Terkait</h3>
          <p className="text-gray-600 mb-4">
            Temukan do'a-do'a lainnya dalam kategori yang sama.
          </p>
          <Link href={`/prayers?category=${encodeURIComponent(prayer.category)}`}>
            <Button variant="outline">
              Lihat Do'a {prayer.category}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 