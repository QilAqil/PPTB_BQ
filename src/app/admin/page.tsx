import { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Newspaper, Image, UserPlus } from "lucide-react"
import { NewsManagement } from "@/components/admin/news-management"
import { GalleryManagement } from "@/components/admin/gallery-management"
import UserManagement from "@/components/admin/user-management"
import { RegistrationManagement } from "@/components/admin/registration-management"

export const metadata: Metadata = {
  title: "Admin Dashboard - PPTB BAROKATUL QUR'AN",
  description: "Panel administrasi untuk mengelola sistem PPTB BAROKATUL QUR'AN",
}

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard Admin</h1>
        <p className="text-muted-foreground">
          Kelola konten, pengguna, dan sistem PPTB BAROKATUL QUR&apos;AN
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pengguna</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +20.1% dari bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Berita Aktif</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">
              +12 berita baru bulan ini
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Item Galeri</CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" aria-label="icon galeri" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              +8 item baru bulan ini
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendaftaran Baru</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              +5 pendaftaran hari ini
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Ringkasan</TabsTrigger>
          <TabsTrigger value="users">Pengguna</TabsTrigger>
          <TabsTrigger value="registrations">Pendaftaran</TabsTrigger>
          <TabsTrigger value="news">Berita</TabsTrigger>
          <TabsTrigger value="gallery">Galeri</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Aktivitas Terbaru</CardTitle>
                <CardDescription>
                  Aktivitas terbaru di sistem
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Pengguna baru mendaftar</p>
                      <p className="text-xs text-muted-foreground">2 menit yang lalu</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Newspaper className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Berita baru dipublikasikan</p>
                      <p className="text-xs text-muted-foreground">1 jam yang lalu</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Image className="h-4 w-4 text-purple-600" aria-label="icon galeri" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Item galeri ditambahkan</p>
                      <p className="text-xs text-muted-foreground">3 jam yang lalu</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Statistik Cepat</CardTitle>
                <CardDescription>
                  Statistik penting sistem
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Pengguna Aktif</span>
                    <Badge variant="secondary">1,234</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Berita Dipublikasikan</span>
                    <Badge variant="secondary">45</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Item Galeri</span>
                    <Badge variant="secondary">89</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Pendaftaran Pending</span>
                    <Badge variant="destructive">12</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Manajemen Pengguna</h2>
            <p className="text-muted-foreground">
              Kelola pengguna dan admin sistem
            </p>
          </div>
          <UserManagement />
        </TabsContent>

        <TabsContent value="registrations" className="space-y-6">
          <RegistrationManagement />
        </TabsContent>

        <TabsContent value="news" className="space-y-6">
          <NewsManagement />
        </TabsContent>

        <TabsContent value="gallery" className="space-y-6">
          <GalleryManagement />
        </TabsContent>
      </Tabs>
    </div>
  )
} 