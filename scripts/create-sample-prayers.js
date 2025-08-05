const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const samplePrayers = [
  {
    title: "Do'a Sebelum Makan",
    arabicText: "بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ",
    latinText: "Bismillahi wa 'ala barakatillah",
    translation: "Dengan nama Allah dan atas berkah Allah",
    category: "Harian",
    isPublished: true,
  },
  {
    title: "Do'a Sesudah Makan",
    arabicText: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
    latinText: "Alhamdulillahilladzi ath'amani haadza wa razaqanihi min ghairi haulin minni wa laa quwwatin",
    translation: "Segala puji bagi Allah yang telah memberiku makan ini dan memberiku rezeki tanpa daya dan kekuatan dariku",
    category: "Harian",
    isPublished: true,
  },
  {
    title: "Do'a Masuk Masjid",
    arabicText: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    latinText: "Allahummaftah li abwaaba rahmatik",
    translation: "Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu",
    category: "Shalat",
    isPublished: true,
  },
  {
    title: "Do'a Keluar Masjid",
    arabicText: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ وَرَحْمَتِكَ",
    latinText: "Allahumma inni as'aluka min fadhlika wa rahmatik",
    translation: "Ya Allah, sesungguhnya aku memohon kepada-Mu dari karunia-Mu dan rahmat-Mu",
    category: "Shalat",
    isPublished: true,
  },
  {
    title: "Do'a Masuk Rumah",
    arabicText: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
    latinText: "Bismillahi wa lajnaa, wa bismillahi kharajnaa, wa 'alallahi rabbina tawakkalnaa",
    translation: "Dengan nama Allah kami masuk, dan dengan nama Allah kami keluar, dan kepada Allah Tuhan kami kami bertawakal",
    category: "Harian",
    isPublished: true,
  },
  {
    title: "Do'a Keluar Rumah",
    arabicText: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    latinText: "Bismillahi tawakkaltu 'alallahi, wa laa haula wa laa quwwata illaa billah",
    translation: "Dengan nama Allah aku bertawakal kepada Allah, dan tidak ada daya dan kekuatan kecuali dengan pertolongan Allah",
    category: "Harian",
    isPublished: true,
  },
  {
    title: "Do'a Sebelum Belajar",
    arabicText: "رَبِّ زِدْنِي عِلْمًا",
    latinText: "Rabbi zidni 'ilman",
    translation: "Ya Tuhanku, tambahkanlah kepadaku ilmu pengetahuan",
    category: "Khusus",
    isPublished: true,
  },
  {
    title: "Do'a Setelah Belajar",
    arabicText: "اللَّهُمَّ إِنِّي أَسْتَوْدِعُكَ مَا عَلَّمْتَنِي فَارْدُدْهُ إِلَيَّ عِنْدَ حَاجَتِي إِلَيْهِ، وَلَا تَنْسَنِيهِ يَا رَبَّ الْعَالَمِينَ",
    latinText: "Allahumma inni astaudi'uka maa 'allamtani fardudhu ilayya 'inda haajati ilaihi, wa laa tansaniihi yaa rabbal 'aalamiin",
    translation: "Ya Allah, sesungguhnya aku menitipkan kepada-Mu apa yang telah Engkau ajarkan kepadaku, maka kembalikanlah kepadaku ketika aku membutuhkannya, dan janganlah Engkau lupakan aku, wahai Tuhan semesta alam",
    category: "Khusus",
    isPublished: true,
  },
  {
    title: "Do'a Dzikir Pagi",
    arabicText: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
    latinText: "Asbahnaa wa asbahal mulku lillah, walhamdu lillah, laa ilaaha illallahu wahdahu laa syariika lah",
    translation: "Kami telah memasuki waktu pagi dan kerajaan hanya milik Allah, segala puji bagi Allah, tidak ada Tuhan yang berhak disembah kecuali Allah semata, tidak ada sekutu bagi-Nya",
    category: "Dzikir",
    isPublished: true,
  },
  {
    title: "Do'a Dzikir Petang",
    arabicText: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
    latinText: "Amsaynaa wa amsal mulku lillah, walhamdu lillah, laa ilaaha illallahu wahdahu laa syariika lah",
    translation: "Kami telah memasuki waktu petang dan kerajaan hanya milik Allah, segala puji bagi Allah, tidak ada Tuhan yang berhak disembah kecuali Allah semata, tidak ada sekutu bagi-Nya",
    category: "Dzikir",
    isPublished: true,
  },
  {
    title: "Do'a Memohon Ampunan",
    arabicText: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
    latinText: "Rabbighfirli wa tub 'alayya innaka antat tawwaabur rahiim",
    translation: "Ya Tuhanku, ampunilah aku dan terimalah taubatku, sesungguhnya Engkau Maha Penerima taubat lagi Maha Penyayang",
    category: "Khusus",
    isPublished: true,
  },
  {
    title: "Do'a Memohon Rezeki",
    arabicText: "اللَّهُمَّ إِنِّي أَسْأَلُكَ رِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا",
    latinText: "Allahumma inni as'aluka rizqan thayyiban wa 'amalan mutaqabbalan",
    translation: "Ya Allah, sesungguhnya aku memohon kepada-Mu rezeki yang baik dan amal yang diterima",
    category: "Khusus",
    isPublished: true,
  }
];

async function createSamplePrayers() {
  try {
    console.log('Mencari admin user...');
    
    // Cari user admin pertama
    const adminUser = await prisma.user.findFirst({
      where: {
        role: 'ADMIN'
      }
    });

    if (!adminUser) {
      console.error('Tidak ada user admin ditemukan. Silakan buat user admin terlebih dahulu.');
      return;
    }

    console.log(`Menggunakan admin: ${adminUser.name} (${adminUser.email})`);

    // Hapus do'a yang sudah ada (opsional)
    console.log('Menghapus do\'a yang sudah ada...');
    await prisma.prayer.deleteMany({});

    // Buat do'a baru
    console.log('Membuat do\'a contoh...');
    
    for (const prayerData of samplePrayers) {
      const prayer = await prisma.prayer.create({
        data: {
          ...prayerData,
          authorId: adminUser.id,
          publishedAt: prayerData.isPublished ? new Date() : null,
        }
      });
      
      console.log(`✓ Do'a "${prayer.title}" berhasil dibuat`);
    }

    console.log(`\n✅ Berhasil membuat ${samplePrayers.length} do'a contoh!`);
    console.log('Do\'a-do\'a ini sudah dipublikasikan dan dapat diakses di halaman /prayers');

  } catch (error) {
    console.error('Error creating sample prayers:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createSamplePrayers(); 