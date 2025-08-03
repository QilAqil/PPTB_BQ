'use client'

import { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { RefreshCw, AlertCircle, User, Shield, CheckCircle, XCircle, Lock } from 'lucide-react'

interface User {
  id: string
  email: string
  name: string | null
  role: string
  isActive: boolean
  isVerified: boolean
  lastLoginAt: string | null
  createdAt: string
  updatedAt: string
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  // Get current user first
  const getCurrentUser = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const userData = await response.json()
        setCurrentUser(userData)
        return userData
      }
      return null
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  }

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Get current user first
      const user = await getCurrentUser()
      if (!user) {
        throw new Error('Authentication required')
      }

      // Check if user is admin
      if (user.role !== 'ADMIN') {
        throw new Error('Admin access required')
      }

      const response = await fetch('/api/users')
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to fetch users')
      }
      
      const result = await response.json()
      setUsers(result.data || result)
    } catch (err) {
      console.error('Error fetching users:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Delete user
  const deleteUser = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return
    }

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to delete user')
      }

      // Remove user from state
      setUsers(users.filter(user => user.id !== id))
    } catch (err) {
      console.error('Error deleting user:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete user')
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const getRoleIcon = (role: string) => {
    return role === 'ADMIN' ? <Shield className="h-4 w-4" /> : <User className="h-4 w-4" />
  }

  const getStatusIcon = (isActive: boolean, isVerified: boolean) => {
    if (!isActive) return <XCircle className="h-4 w-4 text-red-500" />
    if (!isVerified) return <AlertCircle className="h-4 w-4 text-yellow-500" />
    return <CheckCircle className="h-4 w-4 text-green-500" />
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-2" />
          <div className="text-gray-600">Loading users...</div>
        </div>
      </div>
    )
  }

  if (error) {
    // Special handling for admin access required
    if (error === 'Admin access required') {
      return (
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <Lock className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <div className="text-lg font-medium text-gray-900 mb-2">Admin Access Required</div>
            <div className="text-gray-600 mb-4 max-w-md">
              You need administrator privileges to view and manage users. 
              Please contact your system administrator for access.
            </div>
            <div className="text-sm text-gray-500">
              Current role: <Badge variant="outline">{currentUser?.role || 'Unknown'}</Badge>
            </div>
          </div>
        </div>
      )
    }

    // General error handling
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
          <div className="text-red-600 font-medium mb-2">Error: {error}</div>
          <Button onClick={fetchUsers} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Users ({users.length})</h2>
        <Button onClick={fetchUsers} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {users.length === 0 ? (
        <div className="text-center p-8 text-gray-500">
          <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <div className="text-lg font-medium">No users found</div>
          <div className="text-sm">Users will appear here once they are created.</div>
        </div>
      ) : (
        <div className="grid gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {getRoleIcon(user.role)}
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {user.name || 'No name'}
                      </h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(user.isActive, user.isVerified)}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant={user.role === 'ADMIN' ? 'default' : 'secondary'}>
                    {user.role}
                  </Badge>
                  <Badge variant={user.isActive ? 'default' : 'destructive'}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                  <Badge variant={user.isVerified ? 'default' : 'outline'}>
                    {user.isVerified ? 'Verified' : 'Unverified'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">
                    Created: {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
              
              {user.lastLoginAt && (
                <div className="text-xs text-gray-500">
                  Last login: {new Date(user.lastLoginAt).toLocaleString()}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 