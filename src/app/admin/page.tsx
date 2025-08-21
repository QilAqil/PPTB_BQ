import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Newspaper,
  Image,
  UserPlus,
  CheckCircle,
  AlertCircle,
  Activity,
} from "lucide-react";
import LogoutButton from "@/components/admin/logout-button";
import { NewsManagement } from "@/components/admin/news-management";
import { GalleryManagement } from "@/components/admin/gallery-management";
import UserManagement from "@/components/admin/user-management";
import { RegistrationManagement } from "@/components/admin/registration-management";
import PrayerManagement from "@/components/admin/prayer-management";

export const metadata: Metadata = {
  title: "Admin Dashboard - PPTB BAROKATUL QUR&apos;AN",
  description:
    "Panel administrasi untuk mengelola sistem PPTB BAROKATUL QUR&apos;AN",
};

export default async function AdminPage() {
  // Ambil token dari cookie
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  let user = null;
  if (token) {
    const payload = verifyToken(token);
    if (payload) {
      user = await prisma.user.findUnique({
        where: { id: payload.userId },
        select: { id: true, email: true, role: true, isActive: true },
      });
    }
  }

  // Jika user tidak login atau bukan admin, redirect
  if (!user || user.role !== "ADMIN") {
    redirect("/sign-in");
  }

  // Fetch real data from database
  try {
    const [
      latestUser,
      latestNews,
      latestGallery,
      latestRegistration,
      latestProcessedRegistration,
    ] = await Promise.all([
      // Latest activities
      prisma.user.findFirst({
        orderBy: { createdAt: "desc" },
        select: { name: true, email: true, createdAt: true },
      }),
      prisma.news.findFirst({
        orderBy: { createdAt: "desc" },
        select: { title: true, createdAt: true },
      }),
      prisma.gallery.findFirst({
        orderBy: { createdAt: "desc" },
        select: { title: true, createdAt: true },
      }),
      prisma.registration.findFirst({
        orderBy: { createdAt: "desc" },
        select: { fullName: true, createdAt: true, status: true },
      }),
      prisma.registration.findFirst({
        where: { status: { in: ["APPROVED", "REJECTED"] } },
        orderBy: { processedAt: "desc" },
        select: { fullName: true, processedAt: true, status: true },
      }),
    ]);

    // Calculate growth percentages (mock data for now)
    // const userGrowth = 12; // +12%
    // const newsGrowth = 5; // +5%
    // const galleryGrowth = 8; // +8%

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Top Navigation Bar */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">
                      Admin Dashboard
                    </h1>
                    <p className="text-sm text-gray-500">
                      PPTB BAROKATUL QUR&apos;AN
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6">
          {/* Stats Overview */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">
                      Total Pengguna
                    </p>
                    <p className="text-3xl font-bold">{totalUsers}</p>
                    <p className="text-blue-100 text-xs mt-1">
                      +{userGrowth}% dari bulan lalu
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-400/30 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">
                      Total Berita
                    </p>
                    <p className="text-3xl font-bold">{totalNews}</p>
                    <p className="text-green-100 text-xs mt-1">
                      +{newsGrowth}% dari bulan lalu
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-400/30 rounded-lg flex items-center justify-center">
                    <Newspaper className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">
                      Total Galeri
                    </p>
                    <p className="text-3xl font-bold">{totalGallery}</p>
                    <p className="text-purple-100 text-xs mt-1">
                      +{galleryGrowth}% dari bulan lalu
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-400/30 rounded-lg flex items-center justify-center">
                    <Image className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm font-medium">
                      Total Pendaftaran
                    </p>
                    <p className="text-3xl font-bold">{totalRegistrations}</p>
                    <p className="text-orange-100 text-xs mt-1">
                      {pendingRegistrations} pending
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-400/30 rounded-lg flex items-center justify-center">
                    <UserPlus className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div> */}

          {/* Quick Stats Row */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Pendaftaran Pending
                    </p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {pendingRegistrations}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Konten Terbit
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {publishedNews + publishedPrayers}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-indigo-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Doa
                    </p>
                    <p className="text-2xl font-bold text-indigo-600">
                      {totalPrayers}
                    </p>
                  </div>
                  <BookOpen className="h-8 w-8 text-indigo-500" />
                </div>
              </CardContent>
            </Card>
          </div> */}

          {/* Main Navigation Tabs */}
          <Card className="shadow-sm">
            <Tabs defaultValue="overview" className="w-full">
              <div className="border-b border-gray-200">
                <div className="container mx-auto px-4">
                  <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 h-auto bg-transparent border-b-0 p-0">
                    <TabsTrigger
                      value="overview"
                      className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-b-2 border-transparent py-4 text-sm font-medium"
                    >
                      Ringkasan Dashboard
                    </TabsTrigger>
                    <TabsTrigger
                      value="users"
                      className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-b-2 border-transparent py-4 text-sm font-medium"
                    >
                      Pengguna Sistem
                    </TabsTrigger>
                    <TabsTrigger
                      value="registrations"
                      className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-b-2 border-transparent py-4 text-sm font-medium"
                    >
                      Pendaftaran
                    </TabsTrigger>
                    <TabsTrigger
                      value="news"
                      className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-b-2 border-transparent py-4 text-sm font-medium"
                    >
                      Berita
                    </TabsTrigger>
                    <TabsTrigger
                      value="gallery"
                      className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-b-2 border-transparent py-4 text-sm font-medium"
                    >
                      Galeri
                    </TabsTrigger>

                    <TabsTrigger
                      value="prayers"
                      className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-b-2 border-transparent py-4 text-sm font-medium"
                    >
                      Doa
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>

              <div className="p-6">
                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Activities */}
                    <Card className="border-0 shadow-sm">
                      <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Activity className="h-5 w-5 text-blue-600" />
                          Aktivitas Terbaru
                        </CardTitle>
                        <CardDescription>
                          Aktivitas terbaru dalam sistem
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {latestUser && (
                          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <Users className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">
                                User baru terdaftar
                              </p>
                              <p className="text-sm text-gray-500">
                                {latestUser.name || latestUser.email} -{" "}
                                {new Date(
                                  latestUser.createdAt
                                ).toLocaleDateString("id-ID")}
                              </p>
                            </div>
                            <Badge
                              variant="secondary"
                              className="bg-blue-100 text-blue-700"
                            >
                              Baru
                            </Badge>
                          </div>
                        )}

                        {latestNews && (
                          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <Newspaper className="h-5 w-5 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">
                                Berita baru dipublikasi
                              </p>
                              <p className="text-sm text-gray-500">
                                {latestNews.title} -{" "}
                                {new Date(
                                  latestNews.createdAt
                                ).toLocaleDateString("id-ID")}
                              </p>
                            </div>
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-700"
                            >
                              Baru
                            </Badge>
                          </div>
                        )}

                        {latestGallery && (
                          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                              <Image className="h-5 w-5 text-purple-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">
                                Item galeri baru ditambahkan
                              </p>
                              <p className="text-sm text-gray-500">
                                {latestGallery.title} -{" "}
                                {new Date(
                                  latestGallery.createdAt
                                ).toLocaleDateString("id-ID")}
                              </p>
                            </div>
                            <Badge
                              variant="secondary"
                              className="bg-purple-100 text-purple-700"
                            >
                              Baru
                            </Badge>
                          </div>
                        )}

                        {latestRegistration && (
                          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                              <UserPlus className="h-5 w-5 text-orange-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">
                                Pendaftaran baru
                              </p>
                              <p className="text-sm text-gray-500">
                                {latestRegistration.fullName} -{" "}
                                {new Date(
                                  latestRegistration.createdAt
                                ).toLocaleDateString("id-ID")}
                              </p>
                            </div>
                            <Badge
                              variant="secondary"
                              className="bg-orange-100 text-orange-700"
                            >
                              Baru
                            </Badge>
                          </div>
                        )}

                        {latestProcessedRegistration && (
                          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <CheckCircle className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">
                                Pendaftaran diproses
                              </p>
                              <p className="text-sm text-gray-500">
                                {latestProcessedRegistration.fullName} -{" "}
                                {latestProcessedRegistration.status ===
                                "APPROVED"
                                  ? "Diterima"
                                  : "Ditolak"}{" "}
                                pada{" "}
                                {latestProcessedRegistration.processedAt
                                  ? new Date(
                                      latestProcessedRegistration.processedAt
                                    ).toLocaleDateString("id-ID")
                                  : "Baru saja"}
                              </p>
                            </div>
                            <Badge
                              variant="secondary"
                              className={`${
                                latestProcessedRegistration.status ===
                                "APPROVED"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {latestProcessedRegistration.status === "APPROVED"
                                ? "Diterima"
                                : "Ditolak"}
                            </Badge>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="users" className="mt-0">
                  <UserManagement />
                </TabsContent>

                <TabsContent value="news" className="mt-0">
                  <NewsManagement />
                </TabsContent>

                <TabsContent value="gallery" className="mt-0">
                  <GalleryManagement />
                </TabsContent>

                <TabsContent value="registrations" className="mt-0">
                  <RegistrationManagement />
                </TabsContent>

                <TabsContent value="prayers" className="mt-0">
                  <PrayerManagement />
                </TabsContent>
              </div>
            </Tabs>
          </Card>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching dashboard data:", error);

    // Fallback dengan data minimal jika ada error
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-gray-600 mb-4">
            Terjadi kesalahan saat memuat data dashboard
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }
}
