const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function testAuthMe() {
  try {
    console.log('🔍 Testing /api/auth/me endpoint...\n');

    // Get a valid session token
    const session = await prisma.session.findFirst({
      where: {
        expiresAt: {
          gt: new Date()
        }
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          }
        }
      }
    });

    if (!session) {
      console.log('❌ No valid sessions found');
      return;
    }

    console.log(`👤 Using session for: ${session.user.name} (${session.user.email})`);
    console.log(`🔑 Token: ${session.token.substring(0, 30)}...`);
    console.log(`⏰ Expires: ${session.expiresAt.toISOString()}\n`);

    // Test the endpoint
    const response = await fetch('http://localhost:3000/api/auth/me', {
      method: 'GET',
      headers: {
        'Cookie': `auth-token=${session.token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log(`📡 Response Status: ${response.status}`);
    console.log(`📡 Response Headers:`, Object.fromEntries(response.headers.entries()));

    const data = await response.json();
    console.log(`📄 Response Body:`, JSON.stringify(data, null, 2));

    if (response.ok) {
      console.log('\n✅ Success! User data retrieved successfully');
    } else {
      console.log('\n❌ Error! Failed to get user data');
    }

  } catch (error) {
    console.error('❌ Error testing auth/me:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAuthMe(); 