const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function seedData() {
  try {
    console.log('🌱 Seeding sample data...');
    console.log('');

    // Check if data already exists
    const newsCount = await prisma.news.count();
    const galleryCount = await prisma.gallery.count();
    const prayerCount = await prisma.prayer.count();

    if (newsCount > 0 || galleryCount > 0 || prayerCount > 0) {
      console.log('⚠️  Sample data already exists, skipping...');
      console.log(`News: ${newsCount} items`);
      console.log(`Gallery: ${galleryCount} items`);
      console.log(`Prayers: ${prayerCount} items`);
      return;
    }

    // Get admin user
    const adminUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (!adminUser) {
      console.log('❌ Admin user not found. Please run: node scripts/create-admin.js');
      return;
    }

    console.log('📰 Creating sample news...');
    await prisma.news.createMany({
      data: [
        {
          title: 'Selamat Datang di PPTB BQ',
          content: 'Selamat datang di website resmi PPTB BQ. Kami berkomitmen untuk memberikan pendidikan berkualitas dan membentuk karakter siswa yang unggul dalam prestasi dan berakhlak mulia.',
          authorId: adminUser.id,
      isPublished: true,
          publishedAt: new Date()
        },
        {
          title: 'Pendaftaran Siswa Baru 2024/2025',
          content: 'Pendaftaran siswa baru untuk tahun ajaran 2024/2025 sudah dibuka. Segera daftarkan putra-putri Anda untuk mendapatkan pendidikan terbaik di PPTB BQ.',
          authorId: adminUser.id,
      isPublished: true,
          publishedAt: new Date()
        },
        {
          title: 'Kegiatan Ekstrakurikuler',
          content: 'Berbagai kegiatan ekstrakurikuler tersedia untuk mengembangkan bakat dan minat siswa, termasuk olahraga, seni, dan kegiatan keagamaan.',
      authorId: adminUser.id,
      isPublished: true,
          publishedAt: new Date()
        }
      ]
    });

    console.log('🖼️  Creating sample gallery...');
    await prisma.gallery.createMany({
      data: [
        {
          title: 'Gedung Sekolah PPTB BQ',
          imageUrl: '/images/school-building.jpg',
          authorId: adminUser.id,
      isPublished: true,
          publishedAt: new Date()
        },
        {
          title: 'Kegiatan Belajar Mengajar',
          imageUrl: '/images/learning-activity.jpg',
          authorId: adminUser.id,
      isPublished: true,
          publishedAt: new Date()
        },
        {
          title: 'Kegiatan Ekstrakurikuler',
          imageUrl: '/images/extracurricular.jpg',
          authorId: adminUser.id,
      isPublished: true,
          publishedAt: new Date()
        },
        {
          title: 'Fasilitas Sekolah',
          imageUrl: '/images/facilities.jpg',
          authorId: adminUser.id,
      isPublished: true,
          publishedAt: new Date()
        }
      ]
    });

    console.log('🙏 Creating sample prayers...');
    await prisma.prayer.createMany({
      data: [
        {
          title: 'Doa Sebelum Belajar',
          arabicText: 'رَبِّ زِدْنِي عِلْمًا',
          latinText: 'Rabbii zidnii \'ilmaa',
          translation: 'Ya Tuhanku, tambahkanlah kepadaku ilmu pengetahuan',
          category: 'Pendidikan',
      authorId: adminUser.id,
          isPublished: true,
          publishedAt: new Date()
        },
        {
          title: 'Doa Sesudah Belajar',
          arabicText: 'اَللّٰهُمَّ اِنِّى اِسْتَوْدِعُكَ مَاعَلَّمْتَنِيْهِ فَارْدُدْهُ اِلَىَّ عِنْدَ حَاجَتِيْ وَلاَ تَنْسَنِيْهِ يَارَبَّ الْعَالَمِيْنَ',
          latinText: 'Allahumma innii istawdi\'uka maa \'allamtaniihi fardudhu ilayya \'inda haajatii wa laa tansanii hi yaa rabbal \'aalamiin',
          translation: 'Ya Allah, sesungguhnya aku menitipkan kepada Engkau ilmu yang telah Engkau ajarkan kepadaku, maka kembalikanlah kepadaku di saat aku membutuhkannya. Janganlah Engkau lupakan aku kepada ilmu itu, wahai Tuhan semesta alam',
          category: 'Pendidikan',
          authorId: adminUser.id,
      isPublished: true,
          publishedAt: new Date()
        },
        {
          title: 'Doa Masuk Masjid',
          arabicText: 'اَللّٰهُمَّ افْتَحْ لِيْ اَبْوَابَ رَحْمَتِكَ',
          latinText: 'Allahummaftah lii abwaaba rahmatik',
          translation: 'Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu',
          category: 'Masjid',
          authorId: adminUser.id,
      isPublished: true,
          publishedAt: new Date()
        },
        {
          title: 'Doa Keluar Masjid',
          arabicText: 'اَللّٰهُمَّ اِنِّى اَسْأَلُكَ مِنْ فَضْلِكَ وَرَحْمَتِكَ',
          latinText: 'Allahumma innii as-aluka min fadlik wa rahmatik',
          translation: 'Ya Allah, sesungguhnya aku memohon kepada-Mu akan keutamaan dan rahmat-Mu',
          category: 'Masjid',
      authorId: adminUser.id,
      isPublished: true,
          publishedAt: new Date()
        }
      ]
    });

    console.log('✅ Sample data created successfully!');
    console.log('');
    console.log('📊 Data Summary:');
    console.log('- 3 News articles');
    console.log('- 4 Gallery items');
    console.log('- 4 Prayers');
    console.log('');
    console.log('🚀 You can now start the development server: npm run dev');

  } catch (error) {
    console.error('❌ Error seeding data:', error.message);
    
    if (error.code === 'P2002') {
      console.log('💡 Some data already exists');
    } else if (error.code === 'P2021') {
      console.log('💡 Database tables do not exist. Run migrations first:');
      console.log('   npx prisma migrate dev --name init');
    }
  } finally {
    await prisma.$disconnect();
  }
}

seedData(); 