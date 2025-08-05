import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kontak - PPTB BAROKATUL QUR'AN",
  description: "Hubungi kami untuk informasi lebih lanjut tentang Pondok Pesantren Tahfidz & Bahasa BAROKATUL QUR'AN",
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 