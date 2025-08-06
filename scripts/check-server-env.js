const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function checkServerEnv() {
  try {
    console.log('🔍 Checking Server Environment Variables...')
    console.log('==========================================')
    
    // Check environment variables
    console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ SET' : '❌ NOT SET')
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ SET' : '❌ NOT SET')
    console.log('NODE_ENV:', process.env.NODE_ENV || 'undefined')
    console.log('')
    
    // Test database connection
    console.log('🔗 Testing Database Connection...')
    const userCount = await prisma.user.count()
    console.log('✅ Database connected successfully')
    console.log('Total users:', userCount)
    console.log('')
    
    // Test admin user
    console.log('👤 Testing Admin User...')
    const adminUser = await prisma.user.findUnique({
      where: { email: 'admin@example.com' }
    })
    
    if (adminUser) {
      console.log('✅ Admin user found:')
      console.log('  ID:', adminUser.id)
      console.log('  Email:', adminUser.email)
      console.log('  Role:', adminUser.role)
      console.log('  Is Active:', adminUser.isActive)
      console.log('  Is Verified:', adminUser.isVerified)
      console.log('')
      
      // Test password
      console.log('🔐 Testing Password...')
      const testPassword = 'password123'
      const isValidPassword = await bcrypt.compare(testPassword, adminUser.password)
      console.log('Password test result:', isValidPassword ? '✅ Valid' : '❌ Invalid')
      
    } else {
      console.log('❌ Admin user not found!')
    }
    
    // Test JWT functionality
    console.log('')
    console.log('🎫 Testing JWT...')
    if (process.env.JWT_SECRET) {
      const jwt = require('jsonwebtoken')
      try {
        const token = jwt.sign({ test: 'data' }, process.env.JWT_SECRET)
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log('✅ JWT signing and verification working')
      } catch (error) {
        console.log('❌ JWT error:', error.message)
      }
    } else {
      console.log('❌ JWT_SECRET not set')
    }
    
  } catch (error) {
    console.error('❌ Error checking server environment:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkServerEnv()
