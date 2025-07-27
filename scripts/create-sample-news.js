const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

const sampleNews = [
  {
    title: "Selamat Datang di PPTB BQ - Sistem Berita Baru",
    content: `Kami dengan bangga mengumumkan peluncuran sistem berita baru untuk PPTB BQ. Sistem ini dilengkapi dengan fitur upload gambar menggunakan UploadThing, manajemen berita yang mudah, dan tampilan yang responsif.

Fitur utama yang tersedia:
• Upload gambar dengan drag & drop
• Manajemen berita yang intuitif
• Tampilan responsif untuk semua device
• Sistem autentikasi yang aman
• API yang terstruktur dengan baik

Tim kami telah bekerja keras untuk memastikan pengalaman pengguna yang terbaik. Silakan jelajahi fitur-fitur baru ini dan berikan feedback Anda.`,
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
    isPublished: true,
    publishedAt: new Date(),
  },
  {
    title: "Teknologi UploadThing Terintegrasi dengan Sukses",
    content: `Sistem upload gambar menggunakan UploadThing telah berhasil diintegrasikan ke dalam platform PPTB BQ. Teknologi ini memungkinkan admin untuk mengupload gambar dengan mudah dan aman.

Keunggulan UploadThing:
• Upload file hingga 8MB
• Dukungan format gambar (JPG, PNG, GIF, WebP)
• CDN global untuk performa optimal
• Keamanan file yang terjamin
• Integrasi yang seamless

Dengan teknologi ini, admin dapat dengan mudah menambahkan gambar ke berita tanpa perlu khawatir tentang hosting atau bandwidth.`,
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
    isPublished: true,
    publishedAt: new Date(),
  },
  {
    title: "Sistem Autentikasi JWT yang Aman",
    content: `Platform PPTB BQ kini menggunakan sistem autentikasi JWT (JSON Web Token) yang aman dan modern. Sistem ini memastikan keamanan data pengguna dan admin.

Fitur keamanan yang tersedia:
• Token-based authentication
• Session management yang robust
• Role-based access control
• Password hashing dengan bcrypt
• Cookie-based token storage

Keamanan adalah prioritas utama kami, dan sistem ini telah dirancang dengan standar keamanan tertinggi untuk melindungi data pengguna.`,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    isPublished: true,
    publishedAt: new Date(),
  },
  {
    title: "UI/UX Modern dengan Tailwind CSS",
    content: `Interface pengguna PPTB BQ telah diperbarui dengan desain modern menggunakan Tailwind CSS. Desain ini memberikan pengalaman yang lebih baik untuk pengguna dan admin.

Fitur desain yang baru:
• Responsive design untuk semua device
• Dark/light mode support
• Komponen UI yang konsisten
• Animasi dan transisi yang smooth
• Accessibility yang baik

Tim desain kami telah memastikan bahwa setiap elemen interface memberikan pengalaman yang optimal dan mudah digunakan.`,
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    isPublished: true,
    publishedAt: new Date(),
  }
];

async function createSampleNews() {
  try {
    console.log('🚀 Creating sample news...');

    // Get admin user (assuming admin exists)
    const adminUser = await prisma.user.findFirst({
      where: {
        role: 'ADMIN'
      }
    });

    if (!adminUser) {
      console.error('❌ No admin user found. Please create an admin user first.');
      console.log('Run: node scripts/create-admin.js');
      return;
    }

    // Create sample news
    for (const newsData of sampleNews) {
      const news = await prisma.news.create({
        data: {
          ...newsData,
          authorId: adminUser.id,
        }
      });
      console.log(`✅ Created news: ${news.title}`);
    }

    console.log('🎉 Sample news created successfully!');
    console.log(`📊 Total news created: ${sampleNews.length}`);

  } catch (error) {
    console.error('❌ Error creating sample news:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createSampleNews(); 