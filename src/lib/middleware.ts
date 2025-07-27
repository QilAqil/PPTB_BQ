import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from './auth'

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string
    email: string
    name: string | null
    role: string
    isActive: boolean
  }
}

// Middleware untuk autentikasi
export async function authenticate(request: NextRequest): Promise<AuthenticatedRequest> {
  const token = request.headers.get('authorization')?.replace('Bearer ', '') ||
                request.cookies.get('auth-token')?.value

  if (!token) {
    return request as AuthenticatedRequest
  }

  const user = await validateSession(token)
  if (user) {
    (request as AuthenticatedRequest).user = user
  }

  return request as AuthenticatedRequest
}

// Middleware untuk memastikan user sudah login
export function requireAuth(request: AuthenticatedRequest) {
  if (!request.user) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }

  if (!request.user.isActive) {
    return NextResponse.json(
      { error: 'Account is deactivated' },
      { status: 403 }
    )
  }

  return null
}

// Middleware untuk memastikan user adalah admin
export function requireAdmin(request: AuthenticatedRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  if (request.user!.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Admin access required' },
      { status: 403 }
    )
  }

  return null
}

// Helper function untuk mendapatkan user dari request
export function getCurrentUser(request: AuthenticatedRequest) {
  return request.user
} 