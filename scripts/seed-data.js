const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user if not exists
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4tbQJhKz8O', // password123
      role: 'ADMIN',
      isVerified: true,
      isActive: true,
    },
  });

  console.log('✅ Admin user created:', adminUser.email);

  // Create sample news with UploadThing images
  const sampleNews = [
    {
      title: 'Selamat Datang di PPTB BAROKATUL QUR\'AN',
      content: 'Pondok Pesantren Tahfidz & Bahasa "BAROKATUL QUR\'AN" dengan bangga mengumumkan pembukaan pendaftaran santri baru untuk tahun ajaran 2024/2025. Kami berkomitmen untuk memberikan pendidikan berkualitas yang mengintegrasikan tahfidz Al-Qur\'an dengan pembelajaran bahasa Arab dan Inggris.',
      imageUrl: 'https://utfs.io/f/12345678-1234-1234-1234-123456789abc/pondok-pesantren-1.jpg',
      isPublished: true,
      publishedAt: new Date(),
      authorId: adminUser.id,
    },
    {
      title: 'Program Tahfidz Al-Qur\'an',
      content: 'Program tahfidz Al-Qur\'an kami dirancang untuk membantu santri menghafal Al-Qur\'an dengan metode yang efektif dan sistematis. Dengan bimbingan ustadz/ustadzah yang berpengalaman, santri akan dibimbing untuk menghafal Al-Qur\'an dengan tartil dan benar.',
      imageUrl: 'https://utfs.io/f/23456789-2345-2345-2345-234567890bcd/tahfidz-program.jpg',
      isPublished: true,
      publishedAt: new Date(),
      authorId: adminUser.id,
    },
    {
      title: 'Pembelajaran Bahasa Arab dan Inggris',
      content: 'Selain program tahfidz, kami juga menyediakan pembelajaran bahasa Arab dan Inggris yang intensif. Program ini dirancang untuk mempersiapkan santri dalam berkomunikasi dan memahami teks-teks keagamaan dalam bahasa Arab.',
      imageUrl: 'https://utfs.io/f/34567890-3456-3456-3456-345678901cde/bahasa-arab-inggris.jpg',
      isPublished: true,
      publishedAt: new Date(),
      authorId: adminUser.id,
    },
    {
      title: 'Fasilitas dan Akomodasi',
      content: 'PPTB BAROKATUL QUR\'AN menyediakan fasilitas yang nyaman untuk para santri, termasuk asrama yang bersih, perpustakaan, laboratorium bahasa, dan masjid. Semua fasilitas dirancang untuk mendukung proses pembelajaran yang optimal.',
      imageUrl: 'https://utfs.io/f/45678901-4567-4567-4567-456789012def/fasilitas-akomodasi.jpg',
      isPublished: true,
      publishedAt: new Date(),
      authorId: adminUser.id,
    },
  ];

  for (const news of sampleNews) {
    await prisma.news.create({
      data: news,
    });
  }

  console.log('✅ Sample news created');

  // Create sample gallery items with UploadThing images
  const sampleGallery = [
    {
      title: 'Gedung Utama PPTB BAROKATUL QUR\'AN',
      description: 'Gedung utama yang menjadi pusat kegiatan pembelajaran dan administrasi pondok pesantren.',
      imageUrl: 'https://utfs.io/f/56789012-5678-5678-5678-567890123ef0/gedung-utama.jpg',
      isPublished: true,
      publishedAt: new Date(),
      authorId: adminUser.id,
    },
    {
      title: 'Masjid Pondok Pesantren',
      description: 'Masjid yang menjadi pusat ibadah dan kegiatan keagamaan para santri.',
      imageUrl: 'https://utfs.io/f/67890123-6789-6789-6789-678901234f01/masjid-pondok.jpg',
      isPublished: true,
      publishedAt: new Date(),
      authorId: adminUser.id,
    },
    {
      title: 'Asrama Santri',
      description: 'Asrama yang nyaman untuk tempat tinggal para santri selama masa pembelajaran.',
      imageUrl: 'https://utfs.io/f/78901234-7890-7890-7890-789012345f12/asrama-santri.jpg',
      isPublished: true,
      publishedAt: new Date(),
      authorId: adminUser.id,
    },
    {
      title: 'Perpustakaan',
      description: 'Perpustakaan yang menyediakan berbagai buku referensi untuk mendukung pembelajaran.',
      imageUrl: 'https://utfs.io/f/89012345-8901-8901-8901-890123456f23/perpustakaan.jpg',
      isPublished: true,
      publishedAt: new Date(),
      authorId: adminUser.id,
    },
    {
      title: 'Laboratorium Bahasa',
      description: 'Laboratorium bahasa yang dilengkapi dengan peralatan modern untuk pembelajaran bahasa.',
      imageUrl: 'https://utfs.io/f/90123456-9012-9012-9012-901234567f34/laboratorium-bahasa.jpg',
      isPublished: true,
      publishedAt: new Date(),
      authorId: adminUser.id,
    },
    {
      title: 'Kegiatan Santri',
      description: 'Kegiatan santri dalam proses pembelajaran tahfidz dan bahasa.',
      imageUrl: 'https://utfs.io/f/01234567-0123-0123-0123-012345678f45/kegiatan-santri.jpg',
      isPublished: true,
      publishedAt: new Date(),
      authorId: adminUser.id,
    },
    {
      title: 'Halaman Pondok',
      description: 'Halaman yang luas untuk kegiatan outdoor dan rekreasi santri.',
      imageUrl: 'https://utfs.io/f/12345678-1234-1234-1234-123456789f56/halaman-pondok.jpg',
      isPublished: true,
      publishedAt: new Date(),
      authorId: adminUser.id,
    },
    {
      title: 'Kantor Administrasi',
      description: 'Kantor administrasi yang melayani kebutuhan administrasi pondok pesantren.',
      imageUrl: 'https://utfs.io/f/23456789-2345-2345-2345-234567890f67/kantor-administrasi.jpg',
      isPublished: true,
      publishedAt: new Date(),
      authorId: adminUser.id,
    },
  ];

  for (const gallery of sampleGallery) {
    await prisma.gallery.create({
      data: gallery,
    });
  }

  console.log('✅ Sample gallery items created');

  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 