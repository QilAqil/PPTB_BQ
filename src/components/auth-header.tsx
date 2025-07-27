"use client"

import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

interface User {
  id: string
  email: string
  name: string | null
  role: string
}

export function AuthHeader() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me')
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      })
      setUser(null)
      window.location.href = '/'
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <header className="flex justify-end items-center p-4 gap-4 h-16">
      {!loading && !user && (
        <>
          <Link href="/sign-in">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/sign-up">
            <Button className="bg-primary text-primary-foreground rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
              Sign Up
            </Button>
          </Link>
        </>
      )}
      
      {!loading && user && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {user.name || user.email}
          </span>
          <Button variant="ghost" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      )}
    </header>
  )
} 