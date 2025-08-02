const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkCurrentUser() {
  try {
    // List all users first
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    console.log('📋 Current users in database:')
    console.log('')
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.email}`)
      console.log(`   Name: ${user.name || 'N/A'}`)
      console.log(`   Role: ${user.role}`)
      console.log(`   Status: ${user.isActive ? 'Active' : 'Inactive'}`)
      console.log(`   Created: ${user.createdAt.toLocaleDateString()}`)
      console.log('')
    })

    // Check if admin exists
    const adminUsers = users.filter(user => user.role === 'ADMIN')
    if (adminUsers.length > 0) {
      console.log('✅ Admin users found:')
      adminUsers.forEach(admin => {
        console.log(`• Email: ${admin.email}`)
        console.log(`  Name: ${admin.name || 'N/A'}`)
        console.log(`  Role: ${admin.role}`)
        console.log('')
      })
    } else {
      console.log('❌ No admin user found!')
    }

    // Ask user which account to make admin
    console.log('🔧 To make a user admin, run:')
    console.log('node scripts/make-admin.js <email>')
    console.log('')
    console.log('Example: node scripts/make-admin.js saidaqil140302@gmail.com')

  } catch (error) {
    console.error('❌ Error fetching users:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkCurrentUser() 