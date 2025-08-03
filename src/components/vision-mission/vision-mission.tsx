'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Eye, BookOpen, Users, Award, Heart } from "lucide-react"

export function VisionMission() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Visi & Misi
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Pondok Pesantren Tahfidz & Bahasa &quot;BAROKATUL QUR&apos;AN&quot; 
            berkomitmen membentuk generasi Qur&apos;ani yang unggul dalam tahfidz dan bahasa
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Vision */}
          <Card className="border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-blue-50">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-teal-100 rounded-full">
                  <Eye className="h-8 w-8 text-teal-600" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-teal-800">
                Visi
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-gray-700 leading-relaxed">
                Menjadi Pondok Pesantren Tahfidz dan Bahasa yang <strong>Unggul</strong>, 
                <strong> Profesional</strong>, <strong>Transformatif</strong>, 
                <strong> Humanis</strong> dan <strong>Qur&apos;ani</strong> di Indonesia 
                pada tahun 2031
              </p>
            </CardContent>
          </Card>

          {/* Mission */}
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-blue-800">
                Misi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <BookOpen className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Menyelenggarakan pendidikan tahfidz Al-Qur&apos;an yang berkualitas dan terstruktur</span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Mengembangkan kemampuan bahasa Arab dan Inggris santri secara komprehensif</span>
                </li>
                <li className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Membentuk karakter Islami yang kuat dan berakhlak mulia</span>
                </li>
                <li className="flex items-start gap-3">
                  <Heart className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Menyiapkan santri menjadi generasi yang siap menghadapi tantangan global</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-teal-100 rounded-full">
                  <Award className="h-6 w-6 text-teal-600" />
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-teal-800">Unggul</h3>
              <p className="text-sm text-gray-600">
                Mencapai prestasi terbaik dalam tahfidz dan penguasaan bahasa
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-blue-800">Profesional</h3>
              <p className="text-sm text-gray-600">
                Mengelola pendidikan dengan standar profesional yang tinggi
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-purple-800">Transformatif</h3>
              <p className="text-sm text-gray-600">
                Mengubah dan mengembangkan potensi santri secara menyeluruh
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Heart className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-green-800">Humanis</h3>
              <p className="text-sm text-gray-600">
                Menghargai nilai-nilai kemanusiaan dan keberagaman
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
} 