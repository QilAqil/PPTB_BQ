// Using built-in fetch (Node.js 18+)

async function testNewsAPI() {
  try {
    console.log('🧪 Testing News API...');
    
    // Test 1: Get published news
    console.log('\n1. Testing GET /api/news?published=true&limit=4...');
    const response = await fetch('http://localhost:3000/api/news?published=true&limit=4');
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ News API response:', JSON.stringify(data, null, 2));
    
    // Test 2: Get all news (without published filter)
    console.log('\n2. Testing GET /api/news...');
    const response2 = await fetch('http://localhost:3000/api/news');
    
    console.log('Response status:', response2.status);
    
    if (!response2.ok) {
      throw new Error(`HTTP error! status: ${response2.status}`);
    }
    
    const data2 = await response2.json();
    console.log('✅ All news response:', JSON.stringify(data2, null, 2));
    
  } catch (error) {
    console.error('❌ Error testing news API:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Make sure the development server is running: npm run dev');
    }
  }
}

testNewsAPI(); 