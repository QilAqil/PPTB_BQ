import { Metadata } from "next"
import RegisterForm from "../../components/auth/register-form"

export const metadata: Metadata = {
  title: "Daftar - PPTB BAROKATUL QUR'AN",
  description: "Daftar akun baru untuk akses ke sistem PPTB BAROKATUL QUR'AN",
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-600 via-teal-700 to-purple-800 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Daftar Akun</h1>
            <p className="text-gray-600">Buat akun baru untuk mengakses sistem</p>
          </div>

          <RegisterForm />

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Sudah punya akun?{" "}
              <a href="/sign-in" className="text-teal-600 hover:text-teal-700 font-medium">
                Masuk di sini
              </a>
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-teal-700">Akses penuh ke sistem</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-teal-700">Keamanan data terjamin</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-teal-700">Dukungan 24/7 tersedia</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
