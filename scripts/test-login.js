const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function testLogin() {
  try {
    const email = 'admin@example.com'
    const password = 'password123'

    console.log('Testing login with:')
    console.log('Email:', email)
    console.log('Password:', password)
    console.log('')

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      console.log('❌ User not found!')
      return
    }

    console.log('✅ User found:')
    console.log('ID:', user.id)
    console.log('Email:', user.email)
    console.log('Name:', user.name)
    console.log('Role:', user.role)
    console.log('Is Active:', user.isActive)
    console.log('Is Verified:', user.isVerified)
    console.log('')

    // Check if user is active
    if (!user.isActive) {
      console.log('❌ User account is deactivated!')
      return
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    
    if (isValidPassword) {
      console.log('✅ Password is valid!')
      console.log('✅ Login should work!')
    } else {
      console.log('❌ Password is invalid!')
      console.log('This might be the cause of the login error.')
    }

  } catch (error) {
    console.error('❌ Error testing login:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testLogin()
