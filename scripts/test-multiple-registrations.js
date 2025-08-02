const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testMultipleRegistrations() {
  try {
    console.log('🧪 Testing Multiple Registrations...\n');

    // 1. Get all PENDING registrations
    const pendingRegistrations = await prisma.registration.findMany({
      where: { status: 'PENDING' },
      select: {
        id: true,
        fullName: true,
        status: true
      }
    });

    console.log('✅ Found PENDING registrations:', pendingRegistrations.length);
    pendingRegistrations.forEach(reg => {
      console.log(`   - ${reg.fullName} (ID: ${reg.id})`);
    });

    if (pendingRegistrations.length < 2) {
      console.log('⚠️  Need at least 2 PENDING registrations for testing');
      return;
    }

    // 2. Test updating first registration
    const firstReg = pendingRegistrations[0];
    console.log(`\n2. Testing update for: ${firstReg.fullName}`);
    
    const updatedFirst = await prisma.registration.update({
      where: { id: firstReg.id },
      data: {
        status: 'APPROVED',
        notes: `Test approval for ${firstReg.fullName}`,
        processedAt: new Date(),
        processedBy: null
      }
    });

    console.log(`✅ Updated ${firstReg.fullName} to: ${updatedFirst.status}`);

    // 3. Test updating second registration
    const secondReg = pendingRegistrations[1];
    console.log(`\n3. Testing update for: ${secondReg.fullName}`);
    
    const updatedSecond = await prisma.registration.update({
      where: { id: secondReg.id },
      data: {
        status: 'REJECTED',
        notes: `Test rejection for ${secondReg.fullName}`,
        processedAt: new Date(),
        processedBy: null
      }
    });

    console.log(`✅ Updated ${secondReg.fullName} to: ${updatedSecond.status}`);

    // 4. Verify the updates
    console.log('\n4. Verifying updates...');
    const verifyRegistrations = await prisma.registration.findMany({
      where: { 
        id: { in: [firstReg.id, secondReg.id] }
      },
      select: {
        id: true,
        fullName: true,
        status: true,
        notes: true
      }
    });

    verifyRegistrations.forEach(reg => {
      console.log(`   - ${reg.fullName}: ${reg.status} (${reg.notes})`);
    });

    // 5. Reset back to PENDING
    console.log('\n5. Resetting back to PENDING...');
    await prisma.registration.updateMany({
      where: { 
        id: { in: [firstReg.id, secondReg.id] }
      },
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

testMultipleRegistrations(); 