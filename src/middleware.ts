import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = [
  '/admin',
  '/user',
  '/users',
]

const adminRoutes = [
  '/admin',
  '/users',
]

const userRoutes = [
  '/user',
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for API routes, static files, and test pages
  if (pathname.startsWith('/api/') || 
      pathname.startsWith('/_next/') || 
      pathname.startsWith('/favicon.ico') ||
      pathname.startsWith('/test-')) {
    return NextResponse.next()
  }

  // Get auth token from cookie
  const authToken = request.cookies.get('auth-token')?.value

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))

  if (isProtectedRoute) {
    if (!authToken) {
      // Redirect to sign-in if no token
      const signInUrl = new URL('/sign-in', request.url)
      signInUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(signInUrl)
    }

    // For admin routes, we'll let the page handle the role check
    // since we can't verify JWT in middleware without Prisma
    if (isAdminRoute) {
      // Just check if token exists, role check will be done in the page
      return NextResponse.next()
    }

    // For regular protected routes, just check if token exists
    return NextResponse.next()
  }

  // For non-protected routes, just pass through
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}