import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  User, 
  GraduationCap, 
  BookOpen, 
  Users, 
  Award, 
  MapPin,
  Phone,
  Mail,
  ArrowLeft
} from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Khodimul Ma'had - PPTB BAROKATUL QUR'AN",
  description: "Profil pengurus dan pengelola Pondok Pesantren Tahfidz Al-Qur'an BAROKATUL QUR'AN",
}

export default function KhodimulMahadPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke Beranda
        </Link>
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            Pengurus Pesantren
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Khodimul Ma&apos;had
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Pengurus dan pengelola Pondok Pesantren Tahfidz Al-Qur&apos;an BAROKATUL QUR&apos;AN
          </p>
        </div>
      </div>

      {/* Pengasuh Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Pengasuh Pesantren</h2>
        
        {/* Ustadz Moh Faesholy */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-4">
                  <div className="w-48 h-48 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                    <User className="h-24 w-24 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Ust. Al Faqir Moh. Faesholi, M.Pd.I.</CardTitle>
                <CardDescription className="text-lg">
                  Pengasuh & Direktur PPTB BAROKATUL QUR&apos;AN
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <span className="text-sm">S2 Magister Pendidikan Islam</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-sm">Ponorogo, Jawa Timur</span>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Kontak:</h4>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>+62 852-2972-2907</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>ustadz.faesholy@barokatulquran.com</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Biografi */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Biografi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Ustadz Moh Faesholy adalah seorang ulama muda yang memiliki dedikasi tinggi dalam bidang pendidikan Islam dan tahfidz Al-Qur&apos;an. 
                  Beliau telah menghabiskan lebih dari 15 tahun dalam dunia pendidikan pesantren dan telah berhasil mencetak ratusan hafidz Al-Qur&apos;an.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Sebagai pengasuh PPTB BAROKATUL QUR&apos;AN, beliau memiliki visi untuk menciptakan generasi muda yang tidak hanya hafal Al-Qur&apos;an 
                  tetapi juga memahami dan mengamalkan nilai-nilai Islam dalam kehidupan sehari-hari.
                </p>
              </CardContent>
            </Card>

            {/* Pendidikan & Sertifikasi */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Pendidikan & Sertifikasi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold">S2 Pendidikan Agama Islam</h4>
                    <p className="text-sm text-muted-foreground">Universitas Sains Al-Qur&apos;an (UNSIQ) </p>
                    <p className="text-xs text-muted-foreground">2010 - 2014</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold">Sertifikasi Metode Tahfidz</h4>
                    <p className="text-sm text-muted-foreground">Lembaga Tahfidz Al-Qur&apos;an Nasional</p>
                    <p className="text-xs text-muted-foreground">2015</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pengalaman */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Pengalaman Mengajar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Pengasuh PPTB BAROKATUL QUR&apos;AN</h4>
                      <p className="text-sm text-muted-foreground">2018 - Sekarang</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Mengasuh dan mengelola pondok pesantren dengan fokus pada tahfidz Al-Qur&apos;an dan pendidikan karakter.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Guru Tahfidz Al-Qur&apos;an</h4>
                      <p className="text-sm text-muted-foreground">2014 - 2018</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Mengajar tahfidz di berbagai pondok pesantren di Jawa Timur.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Pembina Tahfidz</h4>
                      <p className="text-sm text-muted-foreground">2010 - 2014</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Membina program tahfidz di berbagai sekolah dan madrasah.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* Ustadzah Rohatun Nihayah */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-4">
                  <div className="w-48 h-48 mx-auto bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full flex items-center justify-center">
                    <User className="h-24 w-24 text-secondary" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Ustazah. Rohatun Nihayah, Alhz., M.Si.</CardTitle>
                <CardDescription className="text-lg">
                  Pengasuh PPTB BAROKATUL QUR&apos;AN
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-secondary" />
                  <span className="text-sm">S2 Magister Sains</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-secondary" />
                  <span className="text-sm">Hafidzah Al-Qur&apos;an 30 Juz</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-secondary" />
                  <span className="text-sm">Demak, Jawa Tengah</span>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Kontak:</h4>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>+62 852-2055-8881</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>ustadzah.rohatun@barokatulquran.com</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Biografi */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Biografi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Ustadzah Rohatun Nihayah adalah seorang ulama perempuan yang memiliki dedikasi tinggi dalam bidang pendidikan Islam dan tahfidz Al-Qur&apos;an. 
                  Beliau telah menghabiskan lebih dari 12 tahun dalam dunia pendidikan pesantren dan telah berhasil mencetak ratusan hafidzah Al-Qur&apos;an.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Sebagai wakil direktur PPTB BAROKATUL QUR&apos;AN, beliau fokus pada pengembangan pendidikan karakter dan akhlak Islami 
                  serta memastikan kualitas pendidikan tahfidz yang berkualitas tinggi.
                </p>
              </CardContent>
            </Card>

            {/* Pendidikan & Sertifikasi */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Pendidikan & Sertifikasi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-secondary pl-4">
                    <h4 className="font-semibold">S2 Megister Sains</h4>
                    <p className="text-sm text-muted-foreground">Universitas Sains Al-Qur&apos;an (UNSIQ) </p>
                    <p className="text-xs text-muted-foreground">2012 - 2016</p>
                  </div>
                  <div className="border-l-4 border-secondary pl-4">
                    <h4 className="font-semibold">Tahfidz Al-Qur&apos;an 30 Juz</h4>
                    <p className="text-sm text-muted-foreground">Pondok Pesantren Tahfidz Al-Asy&apos;ariyyah Kalibeber Wonosobo</p>
                    <p className="text-xs text-muted-foreground">2008 - 2012</p>
                  </div>
                  <div className="border-l-4 border-secondary pl-4">
                    <h4 className="font-semibold">Sertifikasi Metode Tahfidz</h4>
                    <p className="text-sm text-muted-foreground">Lembaga Tahfidz Al-Qur&apos;an Nasional</p>
                    <p className="text-xs text-muted-foreground">2017</p>
                  </div>
                  <div className="border-l-4 border-secondary pl-4">
                    <h4 className="font-semibold">Sertifikasi Pendidikan Karakter</h4>
                    <p className="text-sm text-muted-foreground">Kementerian Agama RI</p>
                    <p className="text-xs text-muted-foreground">2018</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pengalaman */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Pengalaman Mengajar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Pengasuh PPTB BAROKATUL QUR&apos;AN</h4>
                      <p className="text-sm text-muted-foreground">2019 - Sekarang</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Mengelola aspek pendidikan karakter dan akhlak Islami serta memastikan kualitas pendidikan tahfidz.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Guru Tahfidz Al-Qur&apos;an</h4>
                      <p className="text-sm text-muted-foreground">2016 - 2019</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Mengajar tahfidz di berbagai pondok pesantren putri di Jawa Tengah.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Pembina Akhlak Islami</h4>
                      <p className="text-sm text-muted-foreground">2014 - 2016</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Membina program pendidikan karakter dan akhlak Islami di berbagai sekolah.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Visi & Misi Section */}
      <div className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Visi & Misi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold text-primary mb-2">Visi</h4>
              <p className="text-muted-foreground leading-relaxed">
                &quot;Mencetak generasi hafidz Al-Qur&apos;an yang berakhlak mulia, berwawasan luas, dan siap menjadi pemimpin umat di masa depan.&quot;
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-2">Misi</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Menyelenggarakan pendidikan tahfidz Al-Qur&apos;an berkualitas tinggi</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Membangun karakter Islami yang kuat pada santri</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Mengembangkan potensi akademik dan non-akademik santri</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Menyiapkan santri untuk menjadi pemimpin umat yang berkualitas</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Bergabunglah dengan Kami</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Dapatkan pendidikan tahfidz Al-Qur&apos;an berkualitas tinggi bersama Ustadz Moh Faesholy dan Ustadzah Rohatun Nihayah 
          di PPTB BAROKATUL QUR&apos;AN.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/registration">
            <Button size="lg">
              Daftar Sekarang
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg">
              Hubungi Kami
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 