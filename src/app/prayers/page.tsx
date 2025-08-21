"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Prayer {
  id: string;
  title: string;
  arabicText: string;
  latinText: string;
  translation: string;
  category: string;
  imageUrl?: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
}

interface PrayerResponse {
  prayers: Prayer[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const categories = [
  "Semua",
  "Shalat",
  "Harian",
  "Khusus",
  "Dzikir",
  "Al-Quran",
  "Lainnya",
];

export default function PrayersPage() {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPrayers, setTotalPrayers] = useState(0);

  const fetchPrayers = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "12",
      });

      if (selectedCategory !== "Semua") {
        params.append("category", selectedCategory);
      }

      const response = await fetch(`/api/prayers?${params}`);
      if (response.ok) {
        const data: PrayerResponse = await response.json();
        setPrayers(data.prayers);
        setTotalPages(data.pagination.totalPages);
        setTotalPrayers(data.pagination.total);
      }
    } catch (error) {
      console.error("Error fetching prayers:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, selectedCategory]);

  useEffect(() => {
    fetchPrayers();
  }, [currentPage, selectedCategory, fetchPrayers]);

  const filteredPrayers = prayers.filter(
    (prayer) =>
      prayer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (prayer.translation &&
        prayer.translation.toLowerCase().includes(searchTerm.toLowerCase())) ||
      prayer.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Do&apos;a-Do&apos;a
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Kumpulan do&apos;a-do&apos;a yang dapat dipelajari dan diamalkan dalam
          kehidupan sehari-hari
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Cari do'a..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <div className="flex gap-2">
            <Select
              value={selectedCategory}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleSearch} variant="outline">
              Cari
            </Button>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          Menampilkan {filteredPrayers.length} dari {totalPrayers} do&apos;a
        </div>
      </div>

      {/* Prayers Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      ) : filteredPrayers.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredPrayers.map((prayer) => (
              <Card
                key={prayer.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-semibold line-clamp-2">
                      {prayer.title}
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <BookOpen className="h-4 w-4" />
                    <span>{prayer.category}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  {prayer.imageUrl && (
                    <div className="mb-4">
                      <Image
                        src={prayer.imageUrl}
                        alt={prayer.title}
                        width={400}
                        height={128}
                        className="w-full h-32 object-cover rounded-md"
                      />
                    </div>
                  )}
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-1">
                        Teks Arab:
                      </h4>
                      <p className="text-right text-lg leading-relaxed font-arabic">
                        {prayer.arabicText}
                      </p>
                    </div>
                    {prayer.latinText && (
                      <>
                        <Separator />
                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-1">
                            Transliterasi:
                          </h4>
                          <p className="text-sm text-gray-600 italic">
                            {prayer.latinText}
                          </p>
                        </div>
                      </>
                    )}
                    {prayer.translation && (
                      <>
                        <Separator />
                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-1">
                            Terjemahan:
                          </h4>
                          <p className="text-sm text-gray-600 line-clamp-3">
                            {prayer.translation}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <Link href={`/prayers/${prayer.id}`}>
                      <Button className="w-full" variant="outline">
                        Baca Selengkapnya
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Sebelumnya
              </Button>
              <span className="px-4 py-2 text-sm">
                Halaman {currentPage} dari {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
              >
                Selanjutnya
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Tidak ada do&apos;a ditemukan
          </h3>
          <p className="text-gray-600">
            Coba ubah filter atau kata kunci pencarian Anda.
          </p>
        </div>
      )}
    </div>
  );
}
