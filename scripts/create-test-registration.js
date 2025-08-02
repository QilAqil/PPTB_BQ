const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createTestRegistration() {
  try {
    console.log('🧪 Creating test registration...\n');

    // Buat registration test
    const testRegistration = await prisma.registration.create({
      data: {
        fullName: 'Santri Test untuk Approval',
        nik: '1234567890123457',
        birthPlace: 'Jakarta',
        birthDate: new Date('2000-01-01'),
        gender: 'Laki-laki',
        address: 'Jl. Test No. 123',
        phoneNumber: '081234567890',
        parentName: 'Orang Tua Test',
        parentPhone: '081234567891',
        parentAddress: 'Jl. Test No. 124',
        educationLevel: 'SMA',
        schoolName: 'SMA Test',
        schoolAddress: 'Jl. Sekolah No. 1',
        motivation: 'Ingin belajar agama',
        status: 'PENDING'
      }
    });
    
    console.log('✅ Test registration created successfully!');
    console.log('   ID:', testRegistration.id);
    console.log('   Name:', testRegistration.fullName);
    console.log('   Status:', testRegistration.status);
    console.log('\n🎯 You can now test the approval/rejection functionality with this registration ID.');

  } catch (error) {
    console.error('❌ Failed to create test registration:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestRegistration(); 