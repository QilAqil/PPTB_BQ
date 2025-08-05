const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testPrayerFeature() {
  try {
    console.log('🔍 Testing prayer feature after removing imageUrl...')
    console.log('')

    // Check if prayers exist
    const prayers = await prisma.prayer.findMany({
      take: 5,
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    if (prayers.length === 0) {
      console.log('❌ No prayers found in database')
      console.log('Run: node scripts/create-sample-prayers.js')
      return
    }

    console.log(`✅ Found ${prayers.length} prayers in database`)
    console.log('')

    // Check prayer structure
    const samplePrayer = prayers[0]
    console.log('📋 Sample prayer structure:')
    console.log('ID:', samplePrayer.id)
    console.log('Title:', samplePrayer.title)
    console.log('Arabic Text:', samplePrayer.arabicText.substring(0, 50) + '...')
    console.log('Latin Text:', samplePrayer.latinText.substring(0, 50) + '...')
    console.log('Translation:', samplePrayer.translation.substring(0, 50) + '...')
    console.log('Category:', samplePrayer.category)
    console.log('Is Published:', samplePrayer.isPublished)
    console.log('Author:', samplePrayer.author.name)
    console.log('Created At:', samplePrayer.createdAt)
    console.log('')

    // Check if imageUrl field is removed
    if ('imageUrl' in samplePrayer) {
      console.log('❌ imageUrl field still exists in database!')
      console.log('This should have been removed by migration.')
    } else {
      console.log('✅ imageUrl field successfully removed from database')
    }

    console.log('')
    console.log('🎉 Prayer feature test completed!')
    console.log('')
    console.log('📋 Available endpoints:')
    console.log('• GET /api/prayers - List all prayers')
    console.log('• GET /api/prayers/[id] - Get specific prayer')
    console.log('• POST /api/prayers - Create new prayer (admin only)')
    console.log('• PUT /api/prayers/[id] - Update prayer (admin only)')
    console.log('• DELETE /api/prayers/[id] - Delete prayer (admin only)')
    console.log('')
    console.log('🌐 Frontend pages:')
    console.log('• /prayers - Public prayer list')
    console.log('• /prayers/[id] - Prayer detail page')
    console.log('• /admin (tab: Do\'a) - Admin management')

  } catch (error) {
    console.error('❌ Error testing prayer feature:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testPrayerFeature() 