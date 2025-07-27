const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function checkAuthStatus() {
  try {
    console.log('🔍 Checking authentication status...\n');

    // Check if there are any users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        isVerified: true,
      }
    });

    console.log(`👥 Total users: ${users.length}`);
    users.forEach(user => {
      console.log(`  - ${user.name} (${user.email}) - Role: ${user.role} - Active: ${user.isActive} - Verified: ${user.isVerified}`);
    });

    // Check if there are any active sessions
    const sessions = await prisma.session.findMany({
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

    console.log(`\n🔐 Total sessions: ${sessions.length}`);
    sessions.forEach(session => {
      const isExpired = session.expiresAt < new Date();
      console.log(`  - User: ${session.user.name} (${session.user.email})`);
      console.log(`    Token: ${session.token.substring(0, 20)}...`);
      console.log(`    Expires: ${session.expiresAt.toISOString()}`);
      console.log(`    Expired: ${isExpired ? '❌ YES' : '✅ NO'}`);
    });

    // Check for admin users
    const adminUsers = users.filter(user => user.role === 'ADMIN');
    console.log(`\n👑 Admin users: ${adminUsers.length}`);
    adminUsers.forEach(user => {
      console.log(`  - ${user.name} (${user.email})`);
    });

    // Recommendations
    console.log('\n💡 Recommendations:');
    if (users.length === 0) {
      console.log('  ❌ No users found. Create an admin user first:');
      console.log('     node scripts/create-admin.js');
    } else if (adminUsers.length === 0) {
      console.log('  ⚠️  No admin users found. Create an admin user:');
      console.log('     node scripts/create-admin.js');
    } else if (sessions.length === 0) {
      console.log('  ℹ️  No active sessions. Users need to login first.');
      console.log('     Visit: http://localhost:3000/sign-in');
    } else {
      console.log('  ✅ Users and sessions found. Check if sessions are expired.');
    }

  } catch (error) {
    console.error('❌ Error checking auth status:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAuthStatus(); 