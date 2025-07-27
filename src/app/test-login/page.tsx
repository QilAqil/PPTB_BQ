'use client'

import { useState } from 'react'

export default function TestLoginPage() {
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('password123')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleTestLogin = async () => {
    setLoading(true)
    setResult('Testing login...')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult(`✅ Login successful!\nUser: ${data.user.name}\nRole: ${data.user.role}\nEmail: ${data.user.email}`)
      } else {
        setResult(`❌ Login failed: ${data.error}`)
      }
    } catch (error) {
      setResult(`❌ Network error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const handleTestMe = async () => {
    setLoading(true)
    setResult('Testing /api/auth/me...')

    try {
      const response = await fetch('/api/auth/me')
      const data = await response.json()

      if (response.ok) {
        setResult(`✅ /api/auth/me successful!\nUser: ${data.name}\nRole: ${data.role}\nEmail: ${data.email}`)
      } else {
        setResult(`❌ /api/auth/me failed: ${data.error}`)
      }
    } catch (error) {
      setResult(`❌ Network error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Login Test Page</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="space-y-2">
            <button
              onClick={handleTestLogin}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Test Login'}
            </button>
            
            <button
              onClick={handleTestMe}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Test /api/auth/me'}
            </button>
          </div>
        </div>
        
        {result && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Result:</h3>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto max-h-40">
              {result}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
} 