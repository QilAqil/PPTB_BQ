'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

import { Plus, Edit, Trash2, Eye, BookOpen, Calendar, User } from 'lucide-react';
import Link from 'next/link';

interface Prayer {
  id: string;
  title: string;
  arabicText: string;
  latinText: string;
  translation: string;
  category: string;
  isPublished: boolean;
  createdAt: string;
  publishedAt?: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
}

interface PrayerFormData {
  title: string;
  arabicText: string;
  latinText: string;
  translation: string;
  category: string;
  isPublished: boolean;
}

const categories = [
  'Shalat',
  'Harian',
  'Khusus',
  'Dzikir',
  'Al-Quran',
  'Lainnya'
];

export default function PrayerManagement() {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPrayer, setEditingPrayer] = useState<Prayer | null>(null);
  const [formData, setFormData] = useState<PrayerFormData>({
    title: '',
    arabicText: '',
    latinText: '',
    translation: '',
    category: '',
    isPublished: false,
  });

  const fetchPrayers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/prayers?limit=100');
      if (response.ok) {
        const data = await response.json();
        setPrayers(data.prayers);
      }
    } catch (error) {
      console.error('Error fetching prayers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrayers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingPrayer 
        ? `/api/prayers/${editingPrayer.id}`
        : '/api/prayers';
      
      const method = editingPrayer ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsDialogOpen(false);
        setEditingPrayer(null);
        resetForm();
        fetchPrayers();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error saving prayer:', error);
      alert('Terjadi kesalahan saat menyimpan do\'a');
    }
  };

  const handleEdit = (prayer: Prayer) => {
    setEditingPrayer(prayer);
    setFormData({
      title: prayer.title,
      arabicText: prayer.arabicText,
      latinText: prayer.latinText,
      translation: prayer.translation,
      category: prayer.category,
      isPublished: prayer.isPublished,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus do\'a ini?')) {
      return;
    }

    try {
      const response = await fetch(`/api/prayers/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchPrayers();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error deleting prayer:', error);
      alert('Terjadi kesalahan saat menghapus do\'a');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      arabicText: '',
      latinText: '',
      translation: '',
      category: '',
      isPublished: false,
    });
  };

  const handleDialogOpen = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setEditingPrayer(null);
      resetForm();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Manajemen Do&apos;a</h2>
          <p className="text-gray-600">Kelola do&apos;a-do&apos;a yang tersedia di website</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={handleDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Do&apos;a
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPrayer ? 'Edit Do&apos;a' : 'Tambah Do&apos;a Baru'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="title">Judul Do&apos;a</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Masukkan judul do&apos;a"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Kategori</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="isPublished">Status Publikasi</Label>
                  <Select
                    value={formData.isPublished.toString()}
                    onValueChange={(value) => setFormData({ ...formData, isPublished: value === 'true' })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Dipublikasi</SelectItem>
                      <SelectItem value="false">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="arabicText">Teks Arab</Label>
                  <Textarea
                    id="arabicText"
                    value={formData.arabicText}
                    onChange={(e) => setFormData({ ...formData, arabicText: e.target.value })}
                    placeholder="Masukkan teks Arab do&apos;a"
                    className="text-right text-lg leading-relaxed"
                    rows={3}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="latinText">Transliterasi (Opsional)</Label>
                  <Textarea
                    id="latinText"
                    value={formData.latinText}
                    onChange={(e) => setFormData({ ...formData, latinText: e.target.value })}
                    placeholder="Masukkan transliterasi do&apos;a (opsional)"
                    rows={2}
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="translation">Terjemahan (Opsional)</Label>
                  <Textarea
                    id="translation"
                    value={formData.translation}
                    onChange={(e) => setFormData({ ...formData, translation: e.target.value })}
                    placeholder="Masukkan terjemahan do&apos;a (opsional)"
                    rows={3}
                  />
                </div>


              </div>

              <Separator />

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleDialogOpen(false)}
                >
                  Batal
                </Button>
                <Button type="submit">
                  {editingPrayer ? 'Update Do\'a' : 'Simpan Do\'a'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-20 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {prayers.map((prayer) => (
            <Card key={prayer.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg line-clamp-2 flex-1">
                    {prayer.title}
                  </CardTitle>
                  <Badge variant={prayer.isPublished ? "default" : "secondary"}>
                    {prayer.isPublished ? "Dipublikasi" : "Draft"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <BookOpen className="h-3 w-3" />
                  <span>{prayer.category}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="text-sm text-gray-600">
                    <Calendar className="h-3 w-3 inline mr-1" />
                    {formatDate(prayer.createdAt)}
                  </div>
                  <div className="text-sm text-gray-600">
                    <User className="h-3 w-3 inline mr-1" />
                    {prayer.author.name}
                  </div>
                </div>



                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Teks Arab:</p>
                    <p className="text-right text-sm font-arabic line-clamp-2">
                      {prayer.arabicText}
                    </p>
                  </div>
                  {prayer.latinText && (
                    <div>
                      <p className="text-sm font-medium text-gray-700">Transliterasi:</p>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {prayer.latinText}
                      </p>
                    </div>
                  )}
                  {prayer.translation && (
                    <div>
                      <p className="text-sm font-medium text-gray-700">Terjemahan:</p>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {prayer.translation}
                      </p>
                    </div>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="flex gap-2">
                  <Link href={`/prayers/${prayer.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="h-3 w-3 mr-1" />
                      Lihat
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(prayer)}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(prayer.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && prayers.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Belum ada do&apos;a
            </h3>
            <p className="text-gray-600 mb-4">
                              Mulai dengan menambahkan do&apos;a pertama Anda.
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
                              Tambah Do&apos;a Pertama
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 