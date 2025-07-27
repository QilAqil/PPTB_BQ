import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { authenticate, requireAuth, requireAdmin } from '../../../../lib/middleware'

// GET /api/users/[id] - Get user by ID (Admin or self)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authenticatedRequest = await authenticate(request)
    const authError = requireAuth(authenticatedRequest)
    
    if (authError) {
      return authError
    }

    // Check if user is admin or accessing their own data
    const isAdmin = authenticatedRequest.user!.role === 'ADMIN'
    const isOwnData = authenticatedRequest.user!.id === params.id

    if (!isAdmin && !isOwnData) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isVerified: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

// PUT /api/users/[id] - Update user (Admin or self)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authenticatedRequest = await authenticate(request)
    const authError = requireAuth(authenticatedRequest)
    
    if (authError) {
      return authError
    }

    // Check if user is admin or updating their own data
    const isAdmin = authenticatedRequest.user!.role === 'ADMIN'
    const isOwnData = authenticatedRequest.user!.id === params.id

    if (!isAdmin && !isOwnData) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { email, name, role, isActive, isVerified } = body

    // Only admin can update role, isActive, and isVerified
    const updateData: any = {}
    if (email) updateData.email = email
    if (name !== undefined) updateData.name = name
    
    if (isAdmin) {
      if (role) updateData.role = role
      if (isActive !== undefined) updateData.isActive = isActive
      if (isVerified !== undefined) updateData.isVerified = isVerified
    }

    const user = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isVerified: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error updating user:', error)
    
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}

// DELETE /api/users/[id] - Delete user (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authenticatedRequest = await authenticate(request)
    const adminError = requireAdmin(authenticatedRequest)
    
    if (adminError) {
      return adminError
    }

    // Prevent admin from deleting themselves
    if (authenticatedRequest.user!.id === params.id) {
      return NextResponse.json(
        { error: 'Cannot delete your own account' },
        { status: 400 }
      )
    }

    await prisma.user.delete({
      where: { id: params.id },
    })

    return NextResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting user:', error)
    
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    )
  }
} 