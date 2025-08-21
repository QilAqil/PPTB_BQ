"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, BookOpen, Users, Award, Heart, Flag } from "lucide-react";

export function VisionMission() {
  return (
    <section className="py-8 sm:py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Visi, Misi & Tujuan
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto px-4">
            Pondok Pesantren Tahfidz & Bahasa &quot;BAROKATUL QUR&apos;AN&quot;
            berkomitmen membentuk generasi Qur&apos;ani yang unggul dalam
            tahfidz dan bahasa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Vision */}
          <Card className="border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-blue-50">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-3">
                <div className="p-2 sm:p-3 bg-teal-100 rounded-full">
                  <Eye className="h-6 w-6 sm:h-8 sm:w-8 text-teal-600" />
                </div>
              </div>
              <CardTitle className="text-xl sm:text-2xl font-bold text-teal-800">
                Visi
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center pt-0">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Mendorong terwujudnya generasi bangsa yang{" "}
                <strong>berakhlakul karimah</strong>,<strong> mandiri</strong>,{" "}
                <strong>berpengetahuan luas</strong> yang berlandaskan
                <strong> iman dan takwa</strong> sesuai Al-Qur&apos;an
              </p>
            </CardContent>
          </Card>

          {/* Mission */}
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-3">
                <div className="p-2 sm:p-3 bg-blue-100 rounded-full">
                  <Target className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                </div>
              </div>
              <CardTitle className="text-xl sm:text-2xl font-bold text-blue-800">
                Misi
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2 sm:space-y-3 text-gray-700">
                <li className="flex items-start gap-2 sm:gap-3">
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base">
                    Mengembangkan potensi santri yang berakhlakul karimah,
                    mandiri dan berpengetahuan luas yang berlandaskan iman dan
                    takwa.
                  </span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base">
                    Memberdayakan santri dalam mewujudkan kesalehan individu dan
                    kepekaan sosial melalui pemahaman ajaran Islam berdasarkan
                    Al-Qur&apos;an dan Hadits Nabi Muhammad SAW
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Tujuan */}
          <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-3">
                <div className="p-2 sm:p-3 bg-green-100 rounded-full">
                  <Flag className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-xl sm:text-2xl font-bold text-green-800">
                Tujuan
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center pt-0">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Tujuan Pesantren adalah mencetak manusia yang{" "}
                <strong>beriman</strong>,<strong> bertaqwa</strong>,{" "}
                <strong>berilmu</strong>, <strong>beramal</strong>, dan{" "}
                <strong>berakhlakul karimah</strong> sesuai Al-Qur&apos;an
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-teal-100 rounded-full">
                  <Award className="h-5 w-5 sm:h-6 sm:w-6 text-teal-600" />
                </div>
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-2 text-teal-800">
                Berakhlakul Karimah
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Membentuk karakter dan akhlak yang mulia sesuai ajaran Islam
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-blue-100 rounded-full">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-2 text-blue-800">
                Mandiri
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Mengembangkan kemandirian dan kemampuan mengelola diri sendiri
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-purple-100 rounded-full">
                  <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                </div>
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-2 text-purple-800">
                Berpengetahuan Luas
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Mengembangkan wawasan dan pengetahuan yang komprehensif
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-green-100 rounded-full">
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                </div>
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-2 text-green-800">
                Iman & Takwa
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Menanamkan keimanan dan ketakwaan sebagai fondasi kehidupan
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
