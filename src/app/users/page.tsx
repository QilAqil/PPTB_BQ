'use client'

import { useState } from 'react'
import UserList from '../../components/users/user-list'
import UserForm from '../../components/users/user-form'
import { Button } from '../../components/ui/button'

interface User {
  id: string
  email: string
  name: string | null
  createdAt: string
  updatedAt: string
}

export default function UsersPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  const handleCreateUser = async (data: { email: string; name?: string }) => {
    try {
      setLoading(true)
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create user')
      }

      setShowForm(false)
      // Refresh the page to show new user
      window.location.reload()
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to create user')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateUser = async (data: { email: string; name?: string }) => {
    if (!editingUser) return

    try {
      setLoading(true)
      const response = await fetch(`/api/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update user')
      }

      setEditingUser(null)
      // Refresh the page to show updated user
      window.location.reload()
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to update user')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingUser(null)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">User Management</h1>
        {!showForm && !editingUser && (
          <Button onClick={() => setShowForm(true)}>
            Add New User
          </Button>
        )}
      </div>

      {(showForm || editingUser) && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {editingUser ? 'Edit User' : 'Create New User'}
          </h2>
          <UserForm
            user={editingUser || undefined}
            onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
            onCancel={handleCancel}
            loading={loading}
          />
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <UserList />
      </div>
    </div>
  )
} 