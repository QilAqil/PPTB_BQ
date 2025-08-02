const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function updateUserRole() {
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
    const adminUser = users.find(user => user.role === 'ADMIN')
    if (adminUser) {
      console.log('✅ Admin user found:')
      console.log(`Email: ${adminUser.email}`)
      console.log(`Name: ${adminUser.name || 'N/A'}`)
      console.log(`Role: ${adminUser.role}`)
      console.log('')
      console.log('You can login with this admin account to access the admin panel.')
    } else {
      console.log('❌ No admin user found!')
      console.log('')
      console.log('To create an admin user, run: node scripts/create-admin.js')
    }

  } catch (error) {
    console.error('❌ Error fetching users:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateUserRole() 