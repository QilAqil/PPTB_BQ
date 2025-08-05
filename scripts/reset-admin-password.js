const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function resetAdminPassword() {
  try {
    const email = 'sa.saidaqil@gmail.com'
    const newPassword = 'admin123' // Password baru yang mudah diingat

    // Check if admin exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email }
    })

    if (!existingAdmin) {
      console.log('❌ Admin user not found!')
      return
    }

    console.log('Found admin user:')
    console.log('Email:', existingAdmin.email)
    console.log('Name:', existingAdmin.name)
    console.log('Role:', existingAdmin.role)
    console.log('Status:', existingAdmin.isActive ? 'Active' : 'Inactive')

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12)

    // Update password
    const updatedAdmin = await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
      },
    })

    console.log('')
    console.log('✅ Admin password reset successfully!')
    console.log('Email:', updatedAdmin.email)
    console.log('Role:', updatedAdmin.role)
    console.log('')
    console.log('You can now login with:')
    console.log('Email: sa.saidaqil@gmail.com')
    console.log('Password: admin123')

  } catch (error) {
    console.error('❌ Error resetting admin password:', error)
  } finally {
    await prisma.$disconnect()
  }
}

resetAdminPassword() 