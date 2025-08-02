const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testRegistration() {
  try {
    console.log('🧪 Testing registration functionality...')
    console.log('')

    // Test data
    const testRegistration = {
      fullName: 'Test Santri',
      nik: '3374010101010001',
      birthPlace: 'Jakarta',
      birthDate: new Date('2010-01-01'),
      gender: 'Laki-laki',
      address: 'Jl. Test No. 123, Jakarta',
      phoneNumber: '081234567890',
      parentName: 'Test Parent',
      parentPhone: '081234567891',
      parentAddress: 'Jl. Test No. 123, Jakarta',
      educationLevel: 'SMP',
      schoolName: 'SMP Test',
      schoolAddress: 'Jl. Sekolah No. 456, Jakarta',
      graduationYear: 2023,
      motivation: 'Ingin belajar tahfidz dan bahasa Arab',
      healthCondition: 'Sehat',
      specialNeeds: null
    }

    console.log('📝 Creating test registration...')
    
    // Create test registration
    const registration = await prisma.registration.create({
      data: {
        ...testRegistration,
        status: 'PENDING',
        processedBy: null,
        processedAt: null
      }
    })

    console.log('✅ Test registration created successfully!')
    console.log(`ID: ${registration.id}`)
    console.log(`Name: ${registration.fullName}`)
    console.log(`NIK: ${registration.nik}`)
    console.log(`Status: ${registration.status}`)
    console.log('')

    // Get all registrations
    console.log('📋 Fetching all registrations...')
    const allRegistrations = await prisma.registration.findMany({
      orderBy: { createdAt: 'desc' }
    })

    console.log(`Total registrations: ${allRegistrations.length}`)
    console.log('')

    // Show recent registrations
    console.log('📊 Recent registrations:')
    allRegistrations.slice(0, 5).forEach((reg, index) => {
      console.log(`${index + 1}. ${reg.fullName} (${reg.nik}) - ${reg.status}`)
    })

    console.log('')
    console.log('✅ Registration test completed successfully!')

  } catch (error) {
    console.error('❌ Registration test failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testRegistration() 