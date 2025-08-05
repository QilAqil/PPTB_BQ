const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function testAdminLogin() {
  try {
    const email = 'sa.saidaqil@gmail.com'
    const password = 'admin123'

    console.log('Testing login for admin user...')
    console.log('Email:', email)
    console.log('Password:', password)
    console.log('')

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      console.log('❌ User not found!')
      return
    }

    console.log('✅ User found:')
    console.log('Email:', user.email)
    console.log('Name:', user.name)
    console.log('Role:', user.role)
    console.log('Status:', user.isActive ? 'Active' : 'Inactive')
    console.log('')

    // Check if user is active
    if (!user.isActive) {
      console.log('❌ Account is deactivated!')
      return
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      console.log('❌ Invalid password!')
      return
    }

    console.log('✅ Login successful!')
    console.log('User can login with:')
    console.log('Email: sa.saidaqil@gmail.com')
    console.log('Password: admin123')
    console.log('Role: ADMIN')
    console.log('')
    console.log('After login, user should be redirected to /admin')

  } catch (error) {
    console.error('❌ Error testing login:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testAdminLogin() 