const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

async function testAPIWithAuth() {
  try {
    console.log('🧪 Testing API with Authentication...\n');

    // 1. Get admin user
    const adminUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (!adminUser) {
      console.log('❌ No admin user found');
      return;
    }

    console.log('✅ Found admin user:', adminUser.name);

    // 2. Create a session for admin user
    const token = jwt.sign({
      userId: adminUser.id,
      email: adminUser.email,
      role: adminUser.role
    }, JWT_SECRET, { expiresIn: '7d' });

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    
    const session = await prisma.session.create({
      data: {
        userId: adminUser.id,
        token,
        expiresAt
      }
    });

    console.log('✅ Created session with token:', token.substring(0, 20) + '...');

    // 3. Get a PENDING registration
    const pendingRegistration = await prisma.registration.findFirst({
      where: { status: 'PENDING' }
    });

    if (!pendingRegistration) {
      console.log('❌ No PENDING registration found');
      return;
    }

    console.log('✅ Found PENDING registration:', pendingRegistration.fullName);

    // 4. Test API with authentication
    console.log('\n4. Testing API with authentication...');
    
    // Simulate the API call
    const testUpdate = await prisma.registration.update({
      where: { id: pendingRegistration.id },
      data: {
        status: 'APPROVED',
        notes: 'Test approval with auth',
        processedAt: new Date(),
        processedBy: adminUser.id
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

    console.log('✅ API test successful:');
    console.log('   New status:', testUpdate.status);
    console.log('   Processed by:', testUpdate.processedByUser?.name);
    console.log('   Notes:', testUpdate.notes);

    // 5. Reset back to PENDING
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

    // 6. Clean up session
    await prisma.session.delete({
      where: { id: session.id }
    });

    console.log('✅ Session cleaned up');

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAPIWithAuth(); 