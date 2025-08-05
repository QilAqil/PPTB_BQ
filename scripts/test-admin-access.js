const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function testAdminAccess() {
  try {
    console.log('🔍 Testing admin access...')
    console.log('')

    // Check admin user
    const adminUser = await prisma.user.findUnique({
      where: { email: 'sa.saidaqil@gmail.com' }
    })

    if (!adminUser) {
      console.log('❌ Admin user not found!')
      return
    }

    console.log('✅ Admin user found:')
    console.log('Email:', adminUser.email)
    console.log('Name:', adminUser.name)
    console.log('Role:', adminUser.role)
    console.log('Status:', adminUser.isActive ? 'Active' : 'Inactive')
    console.log('')

    // Test password
    const testPassword = 'admin123'
    const isValidPassword = await bcrypt.compare(testPassword, adminUser.password)
    
    if (!isValidPassword) {
      console.log('❌ Password test failed!')
      console.log('Expected password: admin123')
      return
    }

    console.log('✅ Password test passed!')
    console.log('')

    // Check if user can access admin features
    if (adminUser.role !== 'ADMIN') {
      console.log('❌ User is not admin!')
      console.log('Current role:', adminUser.role)
      console.log('Expected role: ADMIN')
      return
    }

    console.log('✅ User has admin role!')
    console.log('')

    console.log('🎉 Admin access test completed successfully!')
    console.log('')
    console.log('📋 Login credentials:')
    console.log('Email: sa.saidaqil@gmail.com')
    console.log('Password: admin123')
    console.log('')
    console.log('🌐 Access admin dashboard at: http://localhost:3000/admin')

  } catch (error) {
    console.error('❌ Error testing admin access:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testAdminAccess() 