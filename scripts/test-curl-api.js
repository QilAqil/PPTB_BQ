const { exec } = require('child_process');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testCurlAPI() {
  try {
    console.log('🧪 Testing API with curl...\n');

    // 1. Get a PENDING registration
    const pendingRegistration = await prisma.registration.findFirst({
      where: { status: 'PENDING' }
    });

    if (!pendingRegistration) {
      console.log('❌ No PENDING registration found');
      return;
    }

    console.log('✅ Found PENDING registration:');
    console.log('   ID:', pendingRegistration.id);
    console.log('   Name:', pendingRegistration.fullName);

    // 2. Test API with curl
    const curlCommand = `curl -X PATCH http://localhost:3000/api/registration/${pendingRegistration.id} \
      -H "Content-Type: application/json" \
      -d '{"status":"APPROVED","notes":"Test via curl","processedBy":"test-user"}' \
      -v`;

    console.log('\n2. Testing API with curl...');
    console.log('Command:', curlCommand);

    exec(curlCommand, (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Curl error:', error.message);
        return;
      }
      
      if (stderr) {
        console.log('Curl stderr:', stderr);
      }
      
      console.log('✅ Curl response:');
      console.log(stdout);
    });

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testCurlAPI(); 