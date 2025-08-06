import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Amiri } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar/navbar'
import NavbarWrapper from '@/components/navbar/navbar-wrapper'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const amiri = Amiri({
  variable: '--font-amiri',
  subsets: ['arabic'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'PPTB BAROKATUL QUR\'AN',
  description: 'Pondok Pesantren Tahfidz & Bahasa BAROKATUL QUR\'AN',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${amiri.variable} antialiased`}>
        <Navbar />
        <NavbarWrapper>
          <main>
            {children}
          </main>
        </NavbarWrapper>
      </body>
    </html>
  )
}