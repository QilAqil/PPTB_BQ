const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testAuth() {
  try {
    console.log('🧪 Testing Authentication...\n');

    // 1. Check if there are any users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true
      }
    });

    console.log('✅ Users found:', users.length);
    users.forEach(user => {
      console.log(`   - ${user.name} (${user.email}) - Role: ${user.role} - Active: ${user.isActive}`);
    });

    // 2. Check if there are any sessions
    const sessions = await prisma.session.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    console.log('\n✅ Sessions found:', sessions.length);
    sessions.forEach(session => {
      console.log(`   - User: ${session.user?.name} - Expires: ${session.expiresAt}`);
    });

    // 3. Check registrations
    const registrations = await prisma.registration.findMany({
      select: {
        id: true,
        fullName: true,
        status: true,
        processedBy: true,
        processedAt: true
      }
    });

    console.log('\n✅ Registrations found:', registrations.length);
    registrations.forEach(reg => {
      console.log(`   - ${reg.fullName} - Status: ${reg.status} - Processed by: ${reg.processedBy || 'None'}`);
    });

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAuth(); 