import { NextRequest, NextResponse } from 'next/server'
import { deleteSession } from '../../../../lib/auth'

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value

    if (token) {
      await deleteSession(token)
    }

    const response = NextResponse.json({
      message: 'Logout successful',
    })

    // Clear cookie
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
    })

    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    )
  }
} 