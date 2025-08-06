const fetch = require('node-fetch')

async function testApiLogin() {
  try {
    const email = 'admin@example.com'
    const password = 'password123'

    console.log('Testing API login with:')
    console.log('Email:', email)
    console.log('Password:', password)
    console.log('')

    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    console.log('Response status:', response.status)
    console.log('Response headers:', Object.fromEntries(response.headers.entries()))

    const data = await response.json()
    console.log('Response data:', JSON.stringify(data, null, 2))

    if (response.ok) {
      console.log('✅ Login successful!')
      console.log('User role:', data.user.role)
    } else {
      console.log('❌ Login failed!')
      console.log('Error:', data.error)
    }

  } catch (error) {
    console.error('❌ Error testing API login:', error.message)
  }
}

testApiLogin()
