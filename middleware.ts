import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if user is authenticated
  const token = request.cookies.get('auth-token')?.value

  // Protected routes
  const protectedRoutes = ['/users']
  const authRoutes = ['/sign-in', '/sign-up']

  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

  // If accessing protected route without token, redirect to sign-in
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  // If accessing auth route with token, redirect to dashboard
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
} 