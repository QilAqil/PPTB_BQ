const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testSimpleAPI() {
  try {
    console.log('🧪 Testing Simple API...\n');

    // 1. Get a PENDING registration
    const pendingRegistration = await prisma.registration.findFirst({
      where: { status: 'PENDING' }
    });

    if (!pendingRegistration) {
      console.log('❌ No PENDING registration found');
      return;
    }

    console.log('✅ Found PENDING registration:');
    console.log('   ID:', pendingRegistration.id);
    console.log('   Name:', pendingRegistration.fullName);
    console.log('   Status:', pendingRegistration.status);

    // 2. Test direct database update
    console.log('\n2. Testing direct database update...');
    const updatedRegistration = await prisma.registration.update({
      where: { id: pendingRegistration.id },
      data: {
        status: 'APPROVED',
        notes: 'Test approval via direct DB',
        processedAt: new Date(),
        processedBy: null
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

    console.log('✅ Direct update successful:');
    console.log('   New status:', updatedRegistration.status);
    console.log('   Notes:', updatedRegistration.notes);
    console.log('   Processed at:', updatedRegistration.processedAt);

    // 3. Reset back to PENDING for testing
    console.log('\n3. Resetting back to PENDING...');
    await prisma.registration.update({
      where: { id: pendingRegistration.id },
      data: {
        status: 'PENDING',
        notes: null,
        processedAt: null,
        processedBy: null
      }
    });

    console.log('✅ Reset successful');

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testSimpleAPI(); 