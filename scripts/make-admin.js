const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function makeAdmin() {
  const email = process.argv[2]
  
  if (!email) {
    console.log('❌ Please provide an email address')
    console.log('Usage: node scripts/make-admin.js <email>')
    console.log('Example: node scripts/make-admin.js saidaqil140302@gmail.com')
    process.exit(1)
  }

  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true
      }
    })

    if (!user) {
      console.log(`❌ User with email ${email} not found`)
      process.exit(1)
    }

    if (user.role === 'ADMIN') {
      console.log(`✅ User ${email} is already an admin`)
      process.exit(0)
    }

    // Update user role to ADMIN
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { role: 'ADMIN' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true
      }
    })

    console.log('✅ User role updated successfully!')
    console.log(`Email: ${updatedUser.email}`)
    console.log(`Name: ${updatedUser.name || 'N/A'}`)
    console.log(`Role: ${updatedUser.role}`)
    console.log(`Status: ${updatedUser.isActive ? 'Active' : 'Inactive'}`)
    console.log('')
    console.log('You can now login with this account to access the admin panel')

  } catch (error) {
    console.error('❌ Error updating user role:', error)
  } finally {
    await prisma.$disconnect()
  }
}

makeAdmin() 