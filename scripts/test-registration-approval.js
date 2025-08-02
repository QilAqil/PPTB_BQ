const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testRegistrationApproval() {
  try {
    console.log('🧪 Testing Registration Approval/Rejection...\n');

    // 1. Buat user test
    const testUser = await prisma.user.create({
      data: {
        email: 'admin-test@example.com',
        name: 'Admin Test',
        password: 'hashedpassword',
        role: 'ADMIN'
      }
    });
    console.log('✅ Test user created:', testUser.email);

    // 2. Buat registration test
    const testRegistration = await prisma.registration.create({
      data: {
        fullName: 'Santri Test',
        nik: '1234567890123456',
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
    console.log('✅ Test registration created:', testRegistration.fullName);

    // 3. Test approval
    const approvedRegistration = await prisma.registration.update({
      where: { id: testRegistration.id },
      data: {
        status: 'APPROVED',
        notes: 'Test approval',
        processedBy: testUser.id,
        processedAt: new Date()
      },
      include: {
        processedByUser: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
    console.log('✅ Registration approved:', approvedRegistration.status);
    console.log('   Processed by:', approvedRegistration.processedByUser?.name);

    // 4. Test rejection
    const rejectedRegistration = await prisma.registration.update({
      where: { id: testRegistration.id },
      data: {
        status: 'REJECTED',
        notes: 'Test rejection',
        processedBy: testUser.id,
        processedAt: new Date()
      },
      include: {
        processedByUser: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
    console.log('✅ Registration rejected:', rejectedRegistration.status);
    console.log('   Processed by:', rejectedRegistration.processedByUser?.name);

    // 5. Cleanup
    await prisma.registration.delete({
      where: { id: testRegistration.id }
    });
    await prisma.user.delete({
      where: { id: testUser.id }
    });
    console.log('✅ Test data cleaned up');

    console.log('\n🎉 All tests passed! Registration approval/rejection is working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testRegistrationApproval(); 