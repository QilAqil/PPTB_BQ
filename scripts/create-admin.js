const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createAdmin() {
  try {
    const email = 'admin@example.com'
    const password = 'password123'
    const name = 'Admin User'

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email }
    })

    if (existingAdmin) {
      console.log('Admin user already exists!')
      console.log('Email:', existingAdmin.email)
      console.log('Role:', existingAdmin.role)
      console.log('Status:', existingAdmin.isActive ? 'Active' : 'Inactive')
      return
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'ADMIN',
        isVerified: true,
        isActive: true,
      },
    })

    console.log('✅ Admin user created successfully!')
    console.log('Email:', admin.email)
    console.log('Name:', admin.name)
    console.log('Role:', admin.role)
    console.log('Status:', admin.isActive ? 'Active' : 'Inactive')
    console.log('')
    console.log('You can now login with:')
    console.log('Email: admin@example.com')
    console.log('Password: password123')

  } catch (error) {
    console.error('❌ Error creating admin user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin() 