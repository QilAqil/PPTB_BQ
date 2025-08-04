'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

interface AutoRedirectProps {
  user: {
    role: string
    email: string
  } | null
  loading: boolean
}

export default function AutoRedirect({ user, loading }: AutoRedirectProps) {
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      // Redirect based on role
      if (user.role === 'USER') {
        router.push('/user')
      } else {
        // Default redirect to home page
        router.push('/')
      }
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Mengarahkan ke dashboard...</p>
        </div>
      </div>
    )
  }

  return null
} 