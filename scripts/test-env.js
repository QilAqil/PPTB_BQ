const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testEnv() {
  try {
    console.log('Testing environment variables...')
    console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'SET' : 'NOT SET')
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET')
    console.log('NODE_ENV:', process.env.NODE_ENV)
    console.log('')
    
    console.log('Testing database connection...')
    const userCount = await prisma.user.count()
    console.log('Total users in database:', userCount)
    
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
    } else {
      console.log('❌ Admin user not found!')
    }

  } catch (error) {
    console.error('❌ Error testing environment:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testEnv()
