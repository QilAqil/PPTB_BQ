const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testAPIEndpoint() {
  try {
    console.log('🧪 Testing API Endpoint...\n');

    // 1. Test GET registrations
    console.log('1. Testing GET /api/registration...');
    const getResponse = await fetch('http://localhost:3000/api/registration');
    console.log('   Status:', getResponse.status);
    
    if (getResponse.ok) {
      const getData = await getResponse.json();
      console.log('   ✅ GET successful, found', getData.registrations?.length || 0, 'registrations');
      
      if (getData.registrations && getData.registrations.length > 0) {
        const firstRegistration = getData.registrations[0];
        console.log('   First registration ID:', firstRegistration.id);
        console.log('   First registration status:', firstRegistration.status);
        
        // 2. Test PATCH registration
        if (firstRegistration.status === 'PENDING') {
          console.log('\n2. Testing PATCH /api/registration/[id]...');
          const patchResponse = await fetch(`http://localhost:3000/api/registration/${firstRegistration.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              status: 'APPROVED',
              notes: 'Test approval via API',
              processedBy: 'test-user-id'
            }),
          });
          
          console.log('   Status:', patchResponse.status);
          console.log('   Headers:', Object.fromEntries(patchResponse.headers.entries()));
          
          if (patchResponse.ok) {
            const patchData = await patchResponse.json();
            console.log('   ✅ PATCH successful');
            console.log('   Response:', patchData);
          } else {
            const errorData = await patchResponse.text();
            console.log('   ❌ PATCH failed');
            console.log('   Error response:', errorData);
          }
        } else {
          console.log('   ⚠️  No PENDING registrations found for testing');
        }
      } else {
        console.log('   ⚠️  No registrations found');
      }
    } else {
      const errorData = await getResponse.text();
      console.log('   ❌ GET failed');
      console.log('   Error response:', errorData);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAPIEndpoint(); 